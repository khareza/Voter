using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Common;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.DTOs;
using Voter.Models.FormsData;

namespace Voter.DAL
{
    public class ResolutionService : IResolutionService
    {
        private AuthenticationContext _context;
        private readonly IMapper _mapper;
        private UserManager<Resident> _userManager;

        public ResolutionService(AuthenticationContext context, IMapper mapper, UserManager<Resident> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;

        }

        public Resolution CreateResolution(ResolutionFormData formData)
        {
            var newResolution = _mapper.Map<Resolution>(formData);
            newResolution.CreationDate = DateTime.Now;
            newResolution.ResolutionNumber = generateResolutionNumber();

            _context.Resolutions.Add(newResolution);
            _context.SaveChanges();
            return newResolution;
        }
        private string generateResolutionNumber()
        {
            var resolutionNumber = "";
            var todayDate = DateTime.Now;
            var todayResolutions = _context.Resolutions
                .Where(r => r.CreationDate.Date == todayDate.Date)
                .ToList();
            var todayResolutionsCount = todayResolutions.Count;
            resolutionNumber = (todayResolutionsCount + 1) + "/" + todayDate.Month + "/" + todayDate.Year;
            //If we have 2 resolutions and delete first we need to set different number for the last one
            while (todayResolutions.Any(r=>r.ResolutionNumber == resolutionNumber))
            {
                todayResolutionsCount++;
                resolutionNumber = (todayResolutionsCount + 1) + "/" + todayDate.Month + "/" + todayDate.Year;
            }

            return resolutionNumber;
        }


        public Resolution DeleteResolution(int id)
        {
            var resolution = _context.Resolutions.FirstOrDefault(r => r.Id == id);

            if (resolution != null)
            {
                _context.Resolutions.Remove(resolution);
                _context.SaveChanges();

                return resolution;
            }
            else
            {
                return null;
            }

        }

        public Resolution EditResolution(ResolutionFormData formData)
        {
            var resolution = _context.Resolutions.FirstOrDefault(u => u.Id == formData.Id);

            if (resolution != null)
            {
                resolution.Title = formData.Title;
                resolution.Description = formData.Description;
                resolution.ExpirationDate = formData.ExpirationDate;
                _context.SaveChanges();
                return resolution;
            }
            else
            {
                return null;
            }

        }
        #region Resolutions getters without grouping
        public IEnumerable<Resolution> GetResolutions()
        {
            return _context.Resolutions
                .ToList();
        }
        public IEnumerable<Resolution> GetActiveResolutions()
        {
            return _context.Resolutions
                .Where(r => r.ExpirationDate > DateTime.Now)
                .ToList();
        }
        public IEnumerable<ResolutionDTO> GetExpiredResolutions()
        {
            return _mapper.Map<IEnumerable<ResolutionDTO>>(_context.Resolutions
                .Where(r => r.ExpirationDate <= DateTime.Now)
                .ToList());
        }
        public IEnumerable<Resolution> GetResolutionsWithoutUserVote(string userId)
        {
            return _context.Resolutions
                .Where(r => !r.Residents.Any(x => x.Voter.Id == userId) && r.ExpirationDate > DateTime.Now)
                .ToList();
        }
        #endregion
        public Resolution GetResolutionById(int id)
        {
            return _context.Resolutions.FirstOrDefault(r=>r.Id == id);
        }


        public IEnumerable<IGrouping<DateTime,Resolution>> GetResolutionsGroupedByCreationDate()
        {
            return _context.Resolutions
                .GroupBy(x=>x.CreationDate.Date)
                .ToList();
        }

        public IEnumerable<IGrouping<DateTime, Resolution>> GetActiveResolutionsGroupedByCreationDate()
        {
            return _context.Resolutions
                .Where(r => r.ExpirationDate > DateTime.Now)
                .GroupBy(x => x.CreationDate.Date)
                .ToList();
        }

        public IEnumerable<IGrouping<DateTime, Resolution>> GetExpiredResolutionsGroupedByCreationDate()
        {
            return _context.Resolutions
                .Where(r => r.ExpirationDate <= DateTime.Now)
                .GroupBy(x => x.CreationDate.Date)
                .ToList();
        }

        public IEnumerable<IGrouping<DateTime, Resolution>> GetResolutionsWithoutUserVoteGroupedByCreationDate(string userId)
        {
            return _context.Resolutions
                .Where(r => !r.Residents.Any(x => x.Voter.Id == userId) && r.ExpirationDate > DateTime.Now)
                .GroupBy(x => x.CreationDate.Date)
                .ToList();
        }

        public IEnumerable<ResidentVoteResolutionDTO> GetExpiredResolutionsWithUserVote(string userId)
        {
            var userRegisterDate = _context.Residents.FirstOrDefault(r => r.Id == userId).RegisterDate;
            var resolutions = _context.Resolutions.Where(r=>r.CreationDate > userRegisterDate && r.ExpirationDate<DateTime.Now);
            var votes = _context.ResidentResolution.Include(rr=>rr.Resolution).Where(rr => rr.VoterId == userId);

            List<ResidentVoteResolutionDTO> resultList = new List<ResidentVoteResolutionDTO>();

            foreach (var res in resolutions)
            {
                var residentVote = new ResidentVoteResolutionDTO();
                residentVote.Resolution = _mapper.Map<ResolutionDTO>(res);
                residentVote.Vote = "Unsigned";
                resultList.Add(residentVote);
            }


            foreach (var resolution in votes)
            {
                var resolutionId = resolution.ResolutionId;
                var userVote = resolution.Answer.ToString();

                var index = resultList.FindIndex(x => x.Resolution.Id == resolutionId);
                if (index != -1)
                {
                    resultList[index].Vote = userVote;

                }
                else
                {
                    resultList.Add(new ResidentVoteResolutionDTO { Resolution = _mapper.Map<ResolutionDTO>(resolution.Resolution), Vote = userVote });

                }
            }

            return resultList;
        }

        public VotingResultsDTO GetResolutionWithResults(int resolutionId)
        {
            var votes = _context.ResidentResolution.Where(rr => rr.ResolutionId == resolutionId);
            var resolution = _context.Resolutions.FirstOrDefault(r => r.Id == resolutionId);

            if (resolution == null)
            {
                return null;
            }

            var votingResults = new VotingResultsDTO();
            votingResults.Resolution =_mapper.Map<ResolutionDTO>(resolution);
            votingResults.ForVotes = votes.Where(v => v.Answer == ActAnswer.For).Count();
            votingResults.AgainstVotes = votes.Where(v => v.Answer == ActAnswer.Against).Count();
            votingResults.HoldVotes = votes.Where(v => v.Answer == ActAnswer.Hold).Count();
            votingResults.UnsignedVotes = _userManager.GetUsersInRoleAsync(UserRole.USER)
                .Result.Where(u=>u.RegisterDate < resolution.ExpirationDate)
                .Count() - votes.Count();
            votingResults.NumberOfUsers = _userManager.GetUsersInRoleAsync(UserRole.USER).Result
                .Where(u => u.RegisterDate < resolution.ExpirationDate)
                .Count();
            return votingResults;
        }



        public IEnumerable<ResidentsVotesDTO> GetResidentsWithVotes(int resolutionId)
        {
            List<ResidentsVotesDTO> resultList = new List<ResidentsVotesDTO>();

            var resolution = _context.Resolutions.FirstOrDefault(r => r.Id == resolutionId);
            var votes = _context.ResidentResolution.Include(rr=>rr.Voter).Where(rr => rr.ResolutionId == resolutionId);
            var allResidents = _userManager.GetUsersInRoleAsync(UserRole.USER).Result
                .Where(u => u.RegisterDate < resolution.ExpirationDate);

            foreach (var resident in allResidents)
            {
                ResidentsVotesDTO residentWithVote = new ResidentsVotesDTO();
                residentWithVote.Resident = _mapper.Map<ResidentDTO>(resident);
                residentWithVote.Vote = "Unsigned";
                resultList.Add(residentWithVote);
            }

            foreach (var resident in votes)
            {
                ResidentsVotesDTO residentWithVote = new ResidentsVotesDTO();
                residentWithVote.Resident = _mapper.Map<ResidentDTO>(resident.Voter);
                residentWithVote.Vote = resident.Answer.ToString();

                var index = resultList.FindIndex(x=>x.Resident.Id == residentWithVote.Resident.Id);
                resultList[index] = residentWithVote;
            }

            return resultList;

        }

    }
}
