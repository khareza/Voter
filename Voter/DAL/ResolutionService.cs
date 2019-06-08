﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.DAL.ServiceInterfaces;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.DAL
{
    public class ResolutionService : IResolutionService
    {
        private AuthenticationContext _context;

        public ResolutionService(AuthenticationContext context)
        {
            _context = context;
        }

        public Resolution CreateResolution(ResolutionFormData formData)
        {
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
            return newResolution;
        }

        public Resolution DeleteResolution(int id)
        {
            var resolution = _context.Resolutions.FirstOrDefault(r => r.Id == id);

            if (resolution != null)
            {
                _context.Resolutions.Remove(resolution);
                _context.SaveChanges();

                return resolution;
            }
            else
            {
                return null;
            }

        }

        public Resolution EditResolution(ResolutionFormData formData)
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
                return resolution;
            }
            else
            {
                return null;
            }

        }

        public IEnumerable<Resolution> GetResolutions()
        {
            return _context.Resolutions.ToList();
        }
    }
}