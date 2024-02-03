using JwtAuthDemo.Contracts.Repositories;
using JwtAuthDemo.Infrastructure.Persistence.Contexts;
using JwtAuthDemo.Models;

namespace JwtAuthDemo.Infrastructure.Persistence.Repository
{
    public class UserRoleRepository : Repository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(LojaOrganizationContext context) : base(context)
        {
        }
    }
}
