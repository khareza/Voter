using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Voter.Common;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.DTOs;
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
        public IEnumerable<Resolution> GetResolutions()
        {
            return _context.GetResolutions();
        }

        [HttpGet]
        [Route("GetActiveResolutions")]
        [Authorize]
        public IEnumerable<Resolution> GetActiveResolutions()
        {
            return _context.GetActiveResolutions();
        }

        [HttpGet]
        [Route("GetExpiredResolutions")]
        [Authorize]
        public IEnumerable<Resolution> GetExpiredResolutions()
        {
            return _context.GetExpiredResolutions();
        }

        [HttpGet]
        [Route("GetResolutionsWithoutUserVote/{userId}")]
        [Authorize]
        public IEnumerable<Resolution> GetResolutionsWithoutUserVote(string userId)
        {
            return _context.GetResolutionsWithoutUserVote(userId);
        }

        [HttpGet]
        [Route("GetResolutionWithResults/{resolutionId}")]
        [Authorize]
        public IActionResult GetResolutionWithResults(int resolutionId)
        {
            var result = _context.GetResolutionWithResults(resolutionId);
            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("GetResidentsWithVotes/{resolutionId}")]
        [Authorize]
        public IEnumerable<ResidentsVotesDTO> GetResidentsWithVotes(int resolutionId)
        {
            return _context.GetResidentsWithVotes(resolutionId);
        }

    }
}