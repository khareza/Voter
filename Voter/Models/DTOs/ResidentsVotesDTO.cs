using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.DTOs
{
    public class ResidentsVotesDTO
    {
        public ResidentDTO Resident { get; set; }
        public string Vote { get; set; }
    }
}
