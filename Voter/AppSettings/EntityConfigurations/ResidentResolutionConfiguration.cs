using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models;

namespace Voter.AppSettings.EntityConfigurations
{
    public class ResidentResolutionConfiguration : IEntityTypeConfiguration<ResidentResolution>
    {
        public void Configure(EntityTypeBuilder<ResidentResolution> builder)
        {
            builder
                .HasKey(rr => rr.Id);

            builder
                .HasOne(rr => rr.Voter)
                .WithMany(v => v.Resolutions)
                .HasForeignKey(rr => rr.VoterId)
                .OnDelete(DeleteBehavior.Cascade); ;

            builder
                .HasOne(rr => rr.Resolution)
                .WithMany(v => v.Residents)
                .HasForeignKey(rr => rr.ResolutionId)
                .OnDelete(DeleteBehavior.Cascade); ;

            builder
                .Property(r => r.VoteDate)
                .HasColumnType("Datetime");
        }
    }
}
