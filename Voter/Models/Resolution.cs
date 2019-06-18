using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Voter.Models
{
    public enum ResolutionStatus {
        Accepted,
        Rejected,
        Unresolved,
    }

    public class Resolution
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ResolutionNumber { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public List<ResidentResolution> Residents { get; set; }

        public ResolutionStatus ResolutionStatus { get; set; }

    }
}
