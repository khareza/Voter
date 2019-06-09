using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models;

namespace Voter.AppSettings.EntityConfigurations
{
    public class ResolutionConfiguration : IEntityTypeConfiguration<Resolution>
    {
        public void Configure(EntityTypeBuilder<Resolution> builder)
        {
            builder
                .Property(r => r.CreationDate)
                .HasColumnType("date");

            builder
              .Property(r => r.ExpirationDate)
              .HasColumnType("date");
        }
    }
}
