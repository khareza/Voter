using System;
using System.Collections.Generic;

namespace Voter.Models
{
    public class Resolution
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ResolutionNumber { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public List<ResidentAct> Residents { get; set; }

    }
}
