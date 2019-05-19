using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Voter.Models;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {

        private UserManager<Resident> _userManager;
        private SignInManager<Resident> _signInManager;


        public UserProfileController(UserManager<Resident> userManager, SignInManager<Resident> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        [Authorize]
        [Route("GetUserProfile")]
        public async Task<object> GetUserProfile()
        {

            string userId = User.Claims.First().Value;
            var user = await _userManager.FindByIdAsync(userId);

            return new
            {
                user.FirstName,
                user.LastName,
                user.Email
            };
        }

    }
}