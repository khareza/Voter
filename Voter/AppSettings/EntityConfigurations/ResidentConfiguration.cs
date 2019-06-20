using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models;

namespace Voter.AppSettings.EntityConfigurations
{
    public class ResidentConfiguration : IEntityTypeConfiguration<Resident>
    {
        public void Configure(EntityTypeBuilder<Resident> builder)
        {
            builder
                .Property(r => r.BirthDate)
                .HasColumnType("date");

            builder.Property(r => r.RegisterDate)
                  .HasColumnType("datetime");
        }
    }
}
