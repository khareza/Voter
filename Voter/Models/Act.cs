using System.Collections.Generic;

namespace Voter.Models
{
    public class Act
    {
        public int Id { get; set; }
        public string ActNumber { get; set; }
        public string Description { get; set; }
        public List<User> Voters { get; set; }

    }
}
