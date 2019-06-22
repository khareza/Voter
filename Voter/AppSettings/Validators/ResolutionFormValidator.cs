using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models.FormsData;

namespace Voter.AppSettings.Validators
{
    public class ResolutionFormValidator : AbstractValidator<ResolutionFormData>
    {
        public ResolutionFormValidator()
        {
            RuleFor(formData=>formData.Title)
                .NotNull()
                .WithMessage("Enter title")
                .NotEmpty()
                .WithMessage("Enter title");
            //RuleFor(formData=>formData.ResolutionNumber)
            //    .NotNull()
            //    .WithMessage("Enter resolution number")
            //    .NotEmpty()
            //    .WithMessage("Enter resolution number");
            RuleFor(formData=>formData.Description)
                .NotNull()
                .WithMessage("Enter description")
                .NotEmpty()
                .WithMessage("Enter description");

            RuleFor(formData => formData.ExpirationDate)
                .NotNull()
                .WithMessage("Enter date")
                .NotEmpty()
                .WithMessage("Enter date")
                .GreaterThan(DateTime.Now)
                .WithMessage("Enter correct date");

        }
    }
}
