using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Voter.Models;

namespace Voter.AppSettings.Validators
{
    public class LoginFormValidator : AbstractValidator<LoginFormData> 
    {
        public LoginFormValidator()
        {
            RuleFor(editForm => editForm.UserName)
               .NotNull()
               .WithMessage("Enter username")
               .NotEmpty()
               .WithMessage("Enter username");

            RuleFor(editForm => editForm.Password)
                .NotNull()
                .WithMessage("Enter username")
                .NotEmpty()
                .WithMessage("Enter username");
        }
    }
}
