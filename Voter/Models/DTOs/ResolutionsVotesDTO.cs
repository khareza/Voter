using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.DTOs
{
    public class ResolutionsVotesDTO
    {
        public string Title { get; set; }
        public string ResolutionNumber { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public List<ResidentResolution> Residents { get; set; }
    }
}
