using System.Collections.Generic;
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
        IEnumerable<Resolution> GetResolutions();
        IEnumerable<Resolution> GetActiveResolutions();
        IEnumerable<Resolution> GetExpiredResolutions();
        IEnumerable<Resolution> GetResolutionsWithoutUserVote(string userId);
        IEnumerable<ResidentsVotesDTO> GetResidentsWithVotes(int resolutionId);
        VotingResultsDTO GetResolutionWithResults(int resolutionId);
    }
}