using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Common;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.DAL
{
    public class ResidentService : IResidentService
    {
        private UserManager<Resident> _userManager;
        private readonly IMapper _mapper;

        public ResidentService(UserManager<Resident> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;

        }

        public async Task<Resident> RegisterNewUser(RegisterFormData formData)
        {
            var role = UserRole.USER;

            var newResident = _mapper.Map<Resident>(formData);

            try
            {
                var result = await _userManager.CreateAsync(newResident, formData.Password);
                await _userManager.AddToRoleAsync(newResident, role);
                return newResident;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Resident>> GetUsers()
        {
            return await _userManager.GetUsersInRoleAsync(UserRole.USER);
        }

        public async Task<object> DeleteUser(string id)
        {
            var user = _userManager.Users.Where(u => u.Id == id).FirstOrDefault();
            if (user != null)
            {
                return await _userManager.DeleteAsync(user);
            }
            else
            {
                return null;
            }

        }

        public async Task<object> EditUser(EditFormData formData)
        {
            var user = _userManager.Users.Where(u => u.Id == formData.Id).FirstOrDefault();

            if (user != null)
            {
                user.UserName = formData.UserName;
                user.Email = formData.Email;
                user.FirstName = formData.FirstName;
                user.LastName = formData.LastName;
                user.Address = formData.Address;
                user.PhoneNumber = formData.PhoneNumber;
                return await _userManager.UpdateAsync(user);
            }
            else
            {
                return null;
            }

        }

    }
}
