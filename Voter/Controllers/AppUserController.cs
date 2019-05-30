﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Voter.DAL;
using Voter.Models;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private UserManager<Resident> _userManager;
        private AuthenticationContext _context;

        public AppUserController(UserManager<Resident> userManager, AuthenticationContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("Register")]
        [Authorize(Roles = "Admin")]
        public async Task<object> RegisterNewUser(RegisterFormData formData)
        {
            var role = "User";

            var newResident = new Resident
            {
                UserName = formData.UserName,
                Email = formData.Email,
                FirstName = formData.FirstName,
                LastName = formData.LastName,
                PhoneNumber = formData.Phone,
                Address = formData.Address,
                BirthDate = formData.BirthDate
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

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<object> DeleteUser(string id)
        {
            var user = _userManager.Users.Where(u => u.Id == id).FirstOrDefault();
            if (user != null)
            {
                return await _userManager.DeleteAsync(user);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        [Route("EditUser")]
        [Authorize(Roles = "Admin")]
        public async Task<object> EditUser(EditFormData formData)
        {
            var user = _userManager.Users.Where(u => u.Id == formData.Id).FirstOrDefault();


            if (user != null)
            {
                //use object mapper here :)

                user.UserName = formData.UserName;
                user.Email = formData.Email;
                user.FirstName = formData.FirstName;
                user.LastName = formData.LastName;
                user.Address = formData.Address;
                user.PhoneNumber = formData.PhoneNumber;
                return Ok(await _userManager.UpdateAsync(user));
            }
            else
            {
                return BadRequest();
            }

        }
    }
}