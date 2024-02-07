using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Infrastructure.Persistence.Contexts;
using EmpresaAPI.Models;

namespace EmpresaAPI.Infrastructure.Persistence.Repository
{
    public class UserRoleRepository : Repository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(LojaOrganizationContext context) : base(context)
        {
        }
    }
}
