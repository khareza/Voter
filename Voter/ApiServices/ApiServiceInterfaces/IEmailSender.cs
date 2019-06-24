using System.Threading.Tasks;

namespace Voter.ApiServices.ApiServiceInterfaces
{
    public interface IEmailSender
    {
        Task SendLoginAndPassword(string login, string password, string userEmail);
    }
}