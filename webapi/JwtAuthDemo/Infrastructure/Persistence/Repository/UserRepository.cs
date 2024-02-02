using JwtAuthDemo.Contracts.Repositories;
using JwtAuthDemo.Infrastructure.Persistence.Contexts;
using JwtAuthDemo.Models;
using Microsoft.IdentityModel.Tokens;

namespace JwtAuthDemo.Infrastructure.Persistence.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(LojaOrganizationContext context) : base(context)
        {
        }

        public bool TryGetValue(string username, string password)
        {
            return FirstOrDefault(u => u.Username == username && u.PasswordHash == password)
                .IsNullOrEmpty();
        }

        public bool TryGetValue(string username)
        {
            return FirstOrDefault(u => u.Username == username)
                .IsNullOrEmpty();
        }
    }
}
