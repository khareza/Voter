using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Voter.Models
{
    public class Resident : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public List<ResidentAct> Acts { get; set; }
    }
}
