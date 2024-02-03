using JwtAuthDemo.Contracts.Repositories;
using JwtAuthDemo.Contracts.Services;

namespace JwtAuthDemo.Services;


public class UserService(ILogger<UserService> logger, 
    IUserRepository _userRepository, 
    IUserRoleRepository _userRoleRepository) : IUserService
{
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

        var user = _userRepository.FirstOrDefault(u => u.Username == userName);
        var userRole = _userRoleRepository.FirstOrDefault(ur => ur.UserId == user.Id, "Role");

        return userRole.Role.Name;
    }
}

public static class UserRoles
{
    public const string Admin = nameof(Admin);
    public const string BasicUser = nameof(BasicUser);
}