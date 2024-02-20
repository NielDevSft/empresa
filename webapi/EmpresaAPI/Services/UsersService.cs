using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Models;

namespace EmpresaAPI.Services;


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

    public Role? GetUserRole(string userName)
    {
        if (!IsAnExistingUser(userName))
        {
            return null;
        }

        var user = _userRepository.FirstOrDefault(u => u.Username == userName);
        var userRole = _userRoleRepository.FirstOrDefault(ur => ur.UserId == user.Id, "Role");

        return userRole?.Role;
    }

    public int GetUserId(string userName)
    {
        User user;
        user = _userRepository.FirstOrDefault(u => u.Username == userName);
        if (IsAnExistingUser(userName))
            return user.Id;
        return 0;
    }

    string IUserService.GetUserRole(string userName)
    {
        
        var userRole = _userRoleRepository
            .FirstOrDefault(ur => ur.User.Username == userName, "Role");
        if (IsAnExistingUser(userName))
            return userRole.Role.Name;
        return "";
    }
}

public static class UserRoles
{
    public const string Admin = nameof(Admin);
    public const string BasicUser = nameof(BasicUser);
}