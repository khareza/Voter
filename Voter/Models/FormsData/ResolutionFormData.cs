using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.FormsData
{
    public class ResolutionFormData
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ActNumber { get; set; }
        public string Description { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
