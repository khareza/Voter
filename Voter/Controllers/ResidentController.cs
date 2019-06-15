using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Voter.Common;
using Voter.DAL.ServiceInterfaces;
using Voter.Models.FormsData;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRole.USER)]
    public class ResidentController : ControllerBase
    {
        private IResidentService _context;

        public ResidentController(IResidentService context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("Vote")]
        public IActionResult Vote(UserVoteFormData formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Vote(formData);

            return Ok();

        }
    }
}