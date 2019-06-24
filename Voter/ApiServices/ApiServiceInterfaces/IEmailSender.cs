namespace Voter.ApiServices.ApiServiceInterfaces
{
    public interface IEmailSender
    {
        void SendLoginAndPassword(string login, string password, string userEmail);
    }
}