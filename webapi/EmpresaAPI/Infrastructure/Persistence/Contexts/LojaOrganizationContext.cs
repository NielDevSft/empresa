using EmpresaAPI.Infrastructure.Persistence.Extentions;
using EmpresaAPI.Infrastructure.Persistence.Mapping;
using EmpresaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace EmpresaAPI.Infrastructure.Persistence.Contexts
{
    public class LojaOrganizationContext : DbContext
    {
        public LojaOrganizationContext()
        {
        }

        public LojaOrganizationContext(DbContextOptions<LojaOrganizationContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.EnableSensitiveDataLogging();
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("app");
            modelBuilder.AddConfiguration(new DefaultMap<User>());
            modelBuilder.AddConfiguration(new DefaultMap<UserRole>());
            modelBuilder.AddConfiguration(new DefaultMap<JwtClaim>());
            modelBuilder.AddConfiguration(new DefaultMap<Role>());
            modelBuilder.AddConfiguration(new DefaultMap<Item>());
            modelBuilder.AddConfiguration(new DefaultMap<ItemPedido>());
            modelBuilder.AddConfiguration(new DefaultMap<ItemEstoque>());
            modelBuilder.AddConfiguration(new DefaultMap<Pedido>());

            modelBuilder.AddConfiguration(new UserMap());
            modelBuilder.AddConfiguration(new UserRoleMap());
            modelBuilder.AddConfiguration(new JwtClaimMap());
            modelBuilder.AddConfiguration(new RoleMap());

            modelBuilder.Entity<Item>();
            modelBuilder.Entity<ItemPedido>();
            modelBuilder.Entity<ItemEstoque>();
            modelBuilder.Entity<Pedido>();


            base.OnModelCreating(modelBuilder);
        }
    }
}
