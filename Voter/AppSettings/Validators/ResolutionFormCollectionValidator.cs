using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models.FormsData;

namespace Voter.AppSettings.Validators
{
    public class ResolutionFormCollectionValidator : AbstractValidator<IEnumerable<ResolutionFormData>>
    {
        public ResolutionFormCollectionValidator()
        {
            //RuleFor(x => x).SetCollectionValidator(new ResolutionFormValidator());
            RuleForEach(x => x).SetValidator(new ResolutionFormValidator());
        }
    }
}
