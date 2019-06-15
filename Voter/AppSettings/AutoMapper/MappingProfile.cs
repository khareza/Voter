using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.AppSettings.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ResolutionFormData, Resolution>();
            CreateMap<UserVoteFormData, ResidentResolution>()
                .ForMember(dest => dest.Answer, opt => opt.MapFrom(src =>Enum.Parse(typeof(ActAnswer), src.Vote) ));

            CreateMap<RegisterFormData, Resident>();
            CreateMap<EditFormData, Resident>();

        }
    }
}

