using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.ApiServices.ApiServiceInterfaces;
using Voter.Common;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.DAL
{
    public class ResidentService : IResidentService
    {
        private AuthenticationContext _context;
        private UserManager<Resident> _userManager;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly ILoginPasswordGenerator _loginPasswordGenerator;

        public ResidentService(AuthenticationContext context,
            UserManager<Resident> userManager,
            IMapper mapper,
            IEmailSender emailSender,
            ILoginPasswordGenerator loginPasswordGenerator)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _emailSender = emailSender;
            _loginPasswordGenerator = loginPasswordGenerator;
        }

        public async Task<Resident> RegisterNewUser(RegisterFormData formData)
        {
            var role = UserRole.USER;
            var userName = _loginPasswordGenerator.GenerateLogin(formData.FirstName, formData.LastName);
            var password = _loginPasswordGenerator.GeneratePassword();

            var newResident = _mapper.Map<Resident>(formData);
            newResident.RegisterDate = DateTime.Now;
            newResident.UserName = userName;
            try
            {
                var result = await _userManager.CreateAsync(newResident, password);
                await _userManager.AddToRoleAsync(newResident, role);
                _emailSender.SendLoginAndPassword(userName, password, formData.Email);
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

        public async Task<object> EditUser(EditUserFormData formData)
        {
            var user = _userManager.Users.Where(u => u.Id == formData.Id).FirstOrDefault();

            if (user != null)
            {
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

        public void Vote(UserVoteFormData formData)
        {
            var resolution = _context.Resolutions.FirstOrDefault(x => x.Id == formData.ResolutionId);
            if (resolution.ExpirationDate > DateTime.Now)
            {
                var newVote = _mapper.Map<ResidentResolution>(formData);
                newVote.VoteDate = DateTime.Now;
                _context.ResidentResolution.Add(newVote);
                _context.SaveChanges();
            }

        }

    }
}
