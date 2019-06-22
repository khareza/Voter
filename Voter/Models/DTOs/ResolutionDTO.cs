using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.DTOs
{
    public class ResolutionDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ResolutionNumber { get; set; }
        public string Description { get; set; }
        public string ResolutionStatus { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public List<ResidentResolutionDTO> Residents { get; set; }
    }
}
