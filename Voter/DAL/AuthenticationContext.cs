
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.AppSettings.EntityConfigurations;
using Voter.Models;

namespace Voter.DAL
{
    public class AuthenticationContext : IdentityDbContext
    {
        public DbSet<Resident> Residents { get; set; }
        public DbSet<Resolution> Resolutions { get; set; }
        public DbSet<ResidentResolution> ResidentResolution { get; set; }

        public AuthenticationContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ResolutionConfiguration());
            modelBuilder.ApplyConfiguration(new ResidentConfiguration());
            modelBuilder.ApplyConfiguration(new ResidentResolutionConfiguration());
        }
    }
}
