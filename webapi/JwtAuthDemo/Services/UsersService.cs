using JwtAuthDemo.Contracts.Repositories;
using JwtAuthDemo.Contracts.Services;

namespace JwtAuthDemo.Services;


public class UserService(ILogger<UserService> logger) : IUserService
{
    private readonly IUserRepository _userRepository;

    public bool IsValidUserCredentials(string userName, string password)
    {
        logger.LogInformation("Validating user [{userName}]", userName);
        if (string.IsNullOrWhiteSpace(userName))
        {
            return false;
        }

        if (string.IsNullOrWhiteSpace(password))
        {
            return false;
        }
        
        return _userRepository.TryGetValue(userName, password);
    }

    public bool IsAnExistingUser(string userName)
    {
        return _userRepository.TryGetValue(userName);
    }

    public string GetUserRole(string userName)
    {
        if (!IsAnExistingUser(userName))
        {
            return string.Empty;
        }

        if (userName == "admin")
        {
            return UserRoles.Admin;
        }

        return UserRoles.BasicUser;
    }
}

public static class UserRoles
{
    public const string Admin = nameof(Admin);
    public const string BasicUser = nameof(BasicUser);
}