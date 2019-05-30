using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Voter.Common;
using Voter.DAL;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResolutionController : ControllerBase
    {
        private AuthenticationContext _context;

        public ResolutionController(AuthenticationContext context)
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

            var newResolution = new Resolution
            {
                Title = formData.Title,
                ResolutionNumber = formData.ResolutionNumber,
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
        [Authorize(Roles = UserRole.ADMIN)]
        public IActionResult DeleteResolution(int id)
        {
            var resolution = _context.Resolutions.FirstOrDefault(r=>r.Id == id);

            if (resolution != null)
            {
                _context.Resolutions.Remove(resolution);
                _context.SaveChanges();
                    
                return Ok(resolution);
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
            var resolution = _context.Resolutions.FirstOrDefault(u => u.Id == formData.Id);

            if (resolution != null)
            {
                //use object mapper here :)

                resolution.Title = formData.Title;
                resolution.ResolutionNumber = formData.ResolutionNumber;
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