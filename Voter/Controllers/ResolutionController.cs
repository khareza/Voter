using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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
        #region getters without grouping
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
        public IEnumerable<ResolutionDTO> GetExpiredResolutions()
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
        #endregion


        [HttpGet]
        [Route("GetResolutionById/{id}")]
        [Authorize]
        public Resolution GetResolutionById(int id)
        {
            return _context.GetResolutionById(id);
        }

        [HttpGet]
        [Route("GetGroupedResolutions")]
        [Authorize]
        public IEnumerable<IGrouping<DateTime, Resolution>> GetGroupedResolutions()
        {
            return _context.GetResolutionsGroupedByCreationDate();
        }
        [HttpGet]
        [Route("GetGroupedActiveResolutions")]
        [Authorize]
        public IEnumerable<IGrouping<DateTime, Resolution>> GetGroupedActiveResolutions()
        {
            return _context.GetActiveResolutionsGroupedByCreationDate();
        }

        [HttpGet]
        [Route("GetGroupedExpiredResolutions")]
        [Authorize]
        public IEnumerable<IGrouping<DateTime, Resolution>> GetGroupedExpiredResolutions()
        {
            return _context.GetExpiredResolutionsGroupedByCreationDate();
        }

        [HttpGet]
        [Route("GetGroupedResolutionsWithoutUserVote/{userId}")]
        [Authorize]
        public IEnumerable<IGrouping<DateTime, Resolution>> GetGroupedResolutionsWithoutUserVote(string userId)
        {
            return _context.GetResolutionsWithoutUserVoteGroupedByCreationDate(userId);
        }

        [HttpGet]
        [Route("GetExpiredResolutionsWithUserVote/{userId}")]
        [Authorize]
        public IEnumerable<ResidentVoteResolutionDTO> GetExpiredResolutionsWithUserVote(string userId)
        {
            return _context.GetExpiredResolutionsWithUserVote(userId);
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