using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Voter.DAL;
using Voter.Models;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoterController : ControllerBase
    {
        private UserManager<Resident> _userManager;
        private SignInManager<Resident> _signInManager;
        private AuthenticationContext _context;
        private ApplicationSettings _appSettings;

        public VoterController(UserManager<Resident> userManager, SignInManager<Resident> signInManager, AuthenticationContext context, IOptions<ApplicationSettings> appSettings )
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public List<Resident> GetUsers()
        {
            return _context.Residents.ToList();
        }

        [HttpPost]
        [Route("Register")]
        [Authorize(Roles ="Admin")]
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


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginFormData formData)
        {
            var user = await _userManager.FindByNameAsync(formData.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user,formData.Password))
            {

                var role = await _userManager.GetRolesAsync(user);

                IdentityOptions identityOptions = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserID", user.Id),
                        new Claim(identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.Now.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JwtKey)),SecurityAlgorithms.HmacSha256Signature)

                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect"});
            }

        }

    }
}