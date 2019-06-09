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
        }
    }
}
