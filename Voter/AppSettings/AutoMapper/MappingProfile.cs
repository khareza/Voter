using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models;
using Voter.Models.DTOs;
using Voter.Models.FormsData;

namespace Voter.AppSettings.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ResolutionFormData, Resolution>();
            CreateMap<UserVoteFormData, ResidentResolution>()
                .ForMember(dest => dest.Vote, opt => opt.MapFrom(src =>Enum.Parse(typeof(ResolutionVote), src.Vote) ));

            CreateMap<RegisterFormData, Resident>();
            CreateMap<EditUserFormData, Resident>();

            CreateMap<Resolution, ResolutionDTO>();
            CreateMap<Resident, ResidentDTO>();
            CreateMap<ResidentResolution, ResidentResolutionDTO>();

        }
    }
}

