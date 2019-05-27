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
using Voter.Models.FormsData;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResolutionController : ControllerBase
    {
        private UserManager<Resident> _userManager;
        private AuthenticationContext _context;

        public ResolutionController(UserManager<Resident> userManager, AuthenticationContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        [Route("CreateResolution")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateResolution(ResolutionFormData formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var newResolution = new Resolution
            {
                Title = formData.Title,
                ActNumber = formData.ActNumber,
                Description = formData.Description,
                ExpirationDate = formData.ExpirationDate,
                CreationDate = DateTime.Now
            };

            _context.Resolutions.Add(newResolution);
            _context.SaveChanges();
            return Ok(newResolution);
        }

        [HttpDelete]
        [Route("DeleteResolution/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteResolution(int id)
        {
            var resolution = _context.Resolutions.FirstOrDefault(r=>r.Id == id);

            if (resolution != null)
            {
                return Ok(_context.Resolutions.Remove(resolution));
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        [Route("EditResolution")]
        [Authorize(Roles = "Admin")]
        public IActionResult EditResolution(ResolutionFormData formData)
        {
            var resolution = _context.Resolutions.FirstOrDefault(u => u.Id == formData.Id);

            if (resolution != null)
            {
                //use object mapper here :)

                resolution.Title = formData.Title;
                resolution.ActNumber = formData.ActNumber;
                resolution.Description = formData.Description;
                resolution.ExpirationDate = formData.ExpirationDate;
                _context.SaveChanges();
                return Ok(resolution);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("GetResolutions")]
        [Authorize]
        public IEnumerable<Resolution> GetResolutions()
        {
            return _context.Resolutions.ToList();
        }

    }
}