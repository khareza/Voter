using System;

namespace Voter.Models
{
    public enum ResolutionVote
    {
        For,
        Against,
        Hold
    }

    public class ResidentResolution
    {
        public int Id { get; set; }
        public string VoterId { get; set; }
        public Resident Voter { get; set; }
        public int ResolutionId { get; set; }
        public Resolution Resolution { get; set; }
        public DateTime VoteDate { get; set; }
        public ResolutionVote Vote { get; set; }
    }
}
