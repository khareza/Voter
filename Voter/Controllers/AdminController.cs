using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Voter.DAL;
using Voter.Models;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private UserManager<Resident> _userManager;
        private SignInManager<Resident> _signInManager;
        private AuthenticationContext _context;

        public AdminController(UserManager<Resident> userManager, SignInManager<Resident> signInManager, AuthenticationContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;

        }


        [HttpPost]
        [Route("Register")]
        public async Task<object> RegisterNewUser(RegisterFormData formData)
        {
            var role = "User";

            var newResident = new Resident
            {
                UserName = formData.UserName,
                Email = formData.Email,
                FirstName = formData.FirstName,
                LastName = formData.LastName
            };

            try
            {
                var result = await _userManager.CreateAsync(newResident, formData.Password);
                await _userManager.AddToRoleAsync(newResident, role);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GetUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<Resident>> GetUsers()
        {
            return await _userManager.GetUsersInRoleAsync("User");
        }
    }
}