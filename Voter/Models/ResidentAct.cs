using System;

namespace Voter.Models
{
    public enum ActAnswer
    {
        For,
        Against,
        Hold
    }

    public class ResidentAct
    {
        public int Id { get; set; }
        public Resident Voter { get; set; }
        public Resolution Resolution { get; set; }
        public DateTime VoteDate { get; set; }
        public ActAnswer Answer { get; set; }
    }
}
