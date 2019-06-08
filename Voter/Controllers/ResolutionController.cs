using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voter.Common;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResolutionController : ControllerBase
    {
        private IResolutionService _context;

        public ResolutionController(IResolutionService context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("CreateResolution")]
        [Authorize(Roles = UserRole.ADMIN)]
        public IActionResult CreateResolution(ResolutionFormData formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

           var result = _context.CreateResolution(formData);
           return Ok(result);
        }

        [HttpDelete]
        [Route("DeleteResolution/{id}")]
        [Authorize(Roles = UserRole.ADMIN)]
        public IActionResult DeleteResolution(int id)
        {
            var result = _context.DeleteResolution(id);

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        [Route("EditResolution")]
        [Authorize(Roles = UserRole.ADMIN)]
        public IActionResult EditResolution(ResolutionFormData formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = _context.EditResolution(formData);

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("GetResolutions")]
        [Authorize]
        public List<Resolution> GetResolutions()
        {
            return _context.GetResolutions().ToList();
        }

    }
}