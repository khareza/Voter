using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Voter.Models.DTOs
{
    public class GroupedResolutions
    {
        public DateTime CreationDate { get; set; }
        public List<Resolution> Resolutions { get; set; }
    }
}
