using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.FormsData
{
    public class UserVoteFormData
    {
        public string VoterId { get; set; }
        public int  ResolutionId { get; set; }
        public string Vote { get; set; }

    }
}
