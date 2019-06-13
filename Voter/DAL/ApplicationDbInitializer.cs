using Microsoft.AspNetCore.Identity;
using Voter.Common;
using Voter.Models;

namespace Voter.DAL
{
    public static class ApplicationDbInitializer
    {
        public static void SeedUsers(UserManager<Resident> userManager)
        {
            if (userManager.GetUsersInRoleAsync("Admin").Result.Count==0)
            {

                var newResident = new Resident
                {
                    UserName = "Admin",
                    Email = "admin@gmail.com"
                };

                userManager.CreateAsync(newResident, "1234").Wait();

                userManager.AddToRoleAsync(newResident, UserRole.ADMIN).Wait();
            }
        }
    }
}
