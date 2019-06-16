using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.DTOs
{
    public class ResidentResolutionDTO
    {
        public string VoterId { get; set; }
        public ResidentDTO Voter { get; set; }
        public DateTime VoteDate { get; set; }
        public ActAnswer Answer { get; set; }
    }
}
