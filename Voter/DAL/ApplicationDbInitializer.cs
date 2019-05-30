using Microsoft.AspNetCore.Identity;
using Voter.Models;

namespace Voter.DAL
{
    public static class ApplicationDbInitializer
    {
        public static void SeedUsers(UserManager<Resident> userManager)
        {
            if (userManager.FindByNameAsync("Admin").Result == null)
            {

                var newResident = new Resident
                {
                    UserName = "Admin",
                    Email = "admin@gmail.com"
                };

                userManager.CreateAsync(newResident, "1234").Wait();

                userManager.AddToRoleAsync(newResident, "Admin").Wait();
            }
        }
    }
}
