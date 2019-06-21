using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Voter.Models;
using Voter.Models.FormsData;

namespace Voter.AppSettings.Validators
{
    public class RegisterFormValidator : AbstractValidator<RegisterFormData>
    {
        readonly Regex usernameRegex = new Regex(@"^[a-zA-Z0-9]*$");
        readonly Regex passwordUppercase = new Regex(@"(?=.*[A-Z])");
        readonly Regex passwordLowerCase = new Regex(@"(?=.*[a-z])");
        readonly Regex passwordDigit = new Regex(@"(?=.*\d)");
        readonly Regex passwordSpecial = new Regex(@"(?=.*\W)");
        readonly Regex nameRegex = new Regex(@"^[a-zA-Z]*$");
        readonly Regex phoneNumber = new Regex(@"\(?\d{3}\)?-? *\d{3}-? *-?\d{3}");
        readonly Regex emailRegex =
           new Regex(@"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

        public RegisterFormValidator()
        {
            RuleFor(registerForm => registerForm.UserName)
               .NotNull()
               .WithMessage("Enter username")
               .NotEmpty()
               .WithMessage("Enter username")
               .MinimumLength(4)
               .WithMessage("Username must be at least 4 characters long")
               .Matches(usernameRegex)
               .WithMessage("Username cant contain special characters");

            RuleFor(registerForm => registerForm.Password)
                .NotNull()
                .NotEmpty()
                .WithMessage("Enter password")
                .MinimumLength(6)
                .WithMessage("Password must be at least 6 characters long")
                .Matches(passwordUppercase)
                .WithMessage("Password must contain uppercase letter.")
                .Matches(passwordLowerCase)
                .WithMessage("Password must contain lowercase letter")
                .Matches(passwordDigit)
                .WithMessage("Password must contain digit")
                .Matches(passwordSpecial)
                .WithMessage("Password must contain special character");

            RuleFor(registerForm => registerForm.Email)
                .NotNull()
                .WithMessage("Enter email")
                .NotEmpty()
                .WithMessage("Enter email")
                .Matches(emailRegex)
                .WithMessage("Enter valid email");

            RuleFor(registerForm => registerForm.FirstName)
                .NotNull()
                .WithMessage("Enter first name")
                .NotEmpty()
                .WithMessage("Enter first name")
                .Matches(nameRegex)
                .WithMessage("First name cant contain special characters or digits");

            RuleFor(registerForm => registerForm.LastName)
                .NotNull()
                .WithMessage("Enter last name")
                .NotEmpty()
                .WithMessage("Enter last name")
                .Matches(nameRegex)
                .WithMessage("Last name cant contain special characters or digits");

            RuleFor(registerForm => registerForm.PhoneNumber)
                .NotNull()
                .WithMessage("Enter number")
                .NotEmpty()
                .WithMessage("Enter number")
                .Matches(phoneNumber)
                .WithMessage("Enter valid phone number");

            RuleFor(registerForm => registerForm.Address)
                .NotNull()
                .WithMessage("Enter address")
                .NotEmpty()
                .WithMessage("Enter address")
                .Matches(passwordDigit)
                .WithMessage("Enter address number");

            RuleFor(registerForm => registerForm.BirthDate)
                .NotNull()
                .WithMessage("Enter birth date")
                .NotEmpty()
                .WithMessage("Enter birth date")
                .LessThan(DateTime.Now)
                .WithMessage("Enter correct birth date");
        }
    }
}
