using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.DTOs
{
    public class VotingResultsDTO
    {
        public ResolutionDTO Resolution { get; set; }
        public int ForVotes { get; set; }
        public int AgainstVotes { get; set; }
        public int HoldVotes { get; set; }
        public int UnsignedVotes { get; set; }
    }
}
