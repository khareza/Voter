using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Voter.ApiServices.ApiServiceInterfaces;
using Voter.DAL;

namespace Voter.ApiServices
{
    public class LoginPasswordGenerator : ILoginPasswordGenerator
    {
        AuthenticationContext _context;
        public LoginPasswordGenerator(AuthenticationContext context)
        {
            _context = context;
        }

        public string GeneratePassword()
        {
            int passwordLength = 10;
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < passwordLength--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();

        }

        public string GenerateLogin(string firstName, string lastName)
        {
            int amountOfNumbers = 4;
            Random rnd = new Random();
            StringBuilder res;
            do
            {
                res = new StringBuilder();


                res.Append(firstName.Substring(0, 3));
                res.Append(lastName.Substring(0, 3));

                while (0 < amountOfNumbers--)
                {
                    res.Append(rnd.Next(0, 9));
                }

            } while (_context.Residents.Any(r => r.UserName == res.ToString()));

            return res.ToString();
        }

    }

}
