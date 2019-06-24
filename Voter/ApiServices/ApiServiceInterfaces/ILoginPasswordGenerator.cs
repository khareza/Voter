namespace Voter.ApiServices.ApiServiceInterfaces
{
    public interface ILoginPasswordGenerator
    {
        string GenerateLogin(string firstName, string lastName);
        string GeneratePassword();
    }
}