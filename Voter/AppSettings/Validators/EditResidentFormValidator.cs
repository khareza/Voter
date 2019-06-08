using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Voter.Models;

namespace Voter.AppSettings.Validators
{
    public class EditResidentFormValidator : AbstractValidator<EditFormData>
    {
        readonly Regex usernameRegex = new Regex(@"^[a-zA-Z0-9]*$");

        readonly Regex nameRegex = new Regex(@"^[a-zA-Z]*$");
        readonly Regex phoneNumber = new Regex(@"\(?\d{3}\)?-? *\d{3}-? *-?\d{3}");
        readonly Regex emailRegex =
           new Regex(@"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

        public EditResidentFormValidator()
        {
            RuleFor(editForm => editForm.UserName)
                .NotNull()
                .WithMessage("Enter username")
                .NotEmpty()
                .WithMessage("Enter username")
                .MinimumLength(4)
                .WithMessage("Username must be at least 4 characters long")
                .Matches(usernameRegex)
                .WithMessage("Username cant contain special characters");

            RuleFor(editForm => editForm.Email)
                .NotNull()
                .WithMessage("Enter email")
                .NotEmpty()
                .WithMessage("Enter email")
                .Matches(emailRegex)
                .WithMessage("Enter valid email");

            RuleFor(editForm => editForm.FirstName)
                .NotNull()
                .WithMessage("Enter first name")
                .NotEmpty()
                .WithMessage("Enter first name")
                .Matches(nameRegex)
                .WithMessage("First name cant contain special characters or digits");

            RuleFor(editForm => editForm.LastName)
                .NotNull()
                .WithMessage("Enter last name")
                .NotEmpty()
                .WithMessage("Enter last name")
                .Matches(nameRegex)
                .WithMessage("Last name cant contain special characters or digits");

            RuleFor(editForm => editForm.PhoneNumber)
                .NotNull()
                .WithMessage("Enter number")
                .NotEmpty()
                .WithMessage("Enter number")
                .Matches(phoneNumber)
                .WithMessage("Enter valid phone number");

            RuleFor(editForm => editForm.Address)
                .NotNull()
                .WithMessage("Enter address")
                .NotEmpty()
                .WithMessage("Enter address");
        }
    }
}
