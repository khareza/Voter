using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Voter.Common;
using Voter.DAL;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRole.ADMIN)]
    public class AppUserController : ControllerBase
    {
        private IResidentService _context;

        public AppUserController(IResidentService context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> RegisterNewUser(RegisterFormData formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
               var createdResident = await _context.RegisterNewUser(formData);
                return Ok(createdResident);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IEnumerable<Resident>> GetUsers()
        {
            return await _context.GetUsers();
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _context.DeleteUser(id);
            if (result != null)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        [Route("EditUser")]
        public async Task<IActionResult> EditUser(EditFormData formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _context.EditUser(formData);

            if (result != null)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }
    }
}