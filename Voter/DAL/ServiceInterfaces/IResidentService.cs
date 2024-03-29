﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.DAL.ServiceInterfaces
{
    public interface IResidentService
    {
        Task<object> DeleteUser(string id);
        Task<object> EditUser(EditUserFormData formData);
        Task<IEnumerable<Resident>> GetUsers();
        Task<Resident> RegisterNewUser(RegisterFormData formData);
        void Vote(UserVoteFormData formData);
    }
}