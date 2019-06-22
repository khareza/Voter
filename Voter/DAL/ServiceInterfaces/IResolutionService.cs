using System;
using System.Collections.Generic;
using System.Linq;
using Voter.Models;
using Voter.Models.DTOs;
using Voter.Models.FormsData;

namespace Voter.DAL.ServiceInterfaces
{
    public interface IResolutionService
    {
        Resolution CreateResolution(ResolutionFormData formData);
        Resolution DeleteResolution(int id);
        Resolution EditResolution(ResolutionFormData formData);
        IEnumerable<ResidentsVotesDTO> GetResidentsWithVotes(int resolutionId);
        VotingResultsDTO GetResolutionWithResults(int resolutionId);
        Resolution GetResolutionById(int id);
        IEnumerable<Resolution> GetResolutions();
        IEnumerable<Resolution> GetActiveResolutions();
        IEnumerable<Resolution> GetExpiredResolutions();
        IEnumerable<Resolution> GetResolutionsWithoutUserVote(string userId);

        IEnumerable<IGrouping<DateTime, Resolution>> GetResolutionsGroupedByCreationDate();
        IEnumerable<IGrouping<DateTime, Resolution>> GetActiveResolutionsGroupedByCreationDate();
        IEnumerable<IGrouping<DateTime, Resolution>> GetExpiredResolutionsGroupedByCreationDate();
        IEnumerable<IGrouping<DateTime, Resolution>> GetResolutionsWithoutUserVoteGroupedByCreationDate(string userId);

        IEnumerable<ResidentVoteResolutionDTO> GetExpiredResolutionsWithUserVote(string userId);
    }
}