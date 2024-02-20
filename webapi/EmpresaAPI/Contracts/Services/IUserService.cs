namespace EmpresaAPI.Contracts.Services
{
    public interface IUserService
    {
        bool IsAnExistingUser(string userName);
        bool IsValidUserCredentials(string userName, string password);
        int GetUserId(string userName);
        string GetUserRole(string userName);
    }

}
