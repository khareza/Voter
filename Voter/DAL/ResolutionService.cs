using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.DAL
{
    public class ResolutionService : IResolutionService
    {
        private AuthenticationContext _context;
        private readonly IMapper _mapper;
        public ResolutionService(AuthenticationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public Resolution CreateResolution(ResolutionFormData formData)
        {
            var newResolution = _mapper.Map<Resolution>(formData);
            newResolution.CreationDate = DateTime.Now;

            _context.Resolutions.Add(newResolution);
            _context.SaveChanges();
            return newResolution;
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
                resolution.ResolutionNumber = formData.ResolutionNumber;
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

        public IEnumerable<Resolution> GetResolutions()
        {
            return _context.Resolutions.ToList();
        }

        public IEnumerable<Resolution> GetActiveResolutions()
        {
            return _context.Resolutions.Where(r=>r.ExpirationDate > DateTime.Now).ToList();
        }

        public IEnumerable<Resolution> GetExpiredResolutions()
        {
            return _context.Resolutions.Where(r => r.ExpirationDate <= DateTime.Now).ToList();

        }

        public IEnumerable<Resolution> GetResolutionsWithoutUserVote(string userId)
        {
            return _context.Resolutions
                .Where(r => !r.Residents.Any(x=>x.Voter.Id == userId) && r.ExpirationDate > DateTime.Now )
                .ToList();
        }

    }
}
