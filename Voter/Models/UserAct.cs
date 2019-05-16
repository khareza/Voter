using System;

namespace Voter.Models
{
    public enum ActAnswer
    {
        For,
        Against,
        Hold
    }

    public class UserAct
    {
        public int Id { get; set; }
        public User Voter { get; set; }
        public Act Act { get; set; }
        public DateTime VoteDate { get; set; }
        public ActAnswer Answer { get; set; }
    }
}
