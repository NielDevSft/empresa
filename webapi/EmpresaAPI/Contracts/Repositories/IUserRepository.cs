using EmpresaAPI.Models;

namespace EmpresaAPI.Contracts.Repositories
{
    public interface IUserRepository: IRepository<User>
    {
        bool TryGetValue(string username, string password);
        bool TryGetValue(string username);
    }
}
