using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.ItensPedidos;
using EmpresaAPI.Persistence.Extentions;
using EmpresaAPI.Persistence.Mapping;
using Microsoft.EntityFrameworkCore;

namespace EmpresaAPI.Persistence.Contexts
{
    public class EmpresaOrganizationContext : DbContext
    {
        public EmpresaOrganizationContext()
        {
        }

        public EmpresaOrganizationContext(DbContextOptions<EmpresaOrganizationContext> options) : base(options)
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

            modelBuilder.AddConfiguration(new DefaultMap<Item>());
            modelBuilder.AddConfiguration(new DefaultMap<ItemPedido>());
            modelBuilder.AddConfiguration(new DefaultMap<ItemEstoque>());
            modelBuilder.AddConfiguration(new DefaultMap<Pedido>());

            modelBuilder.Entity<Item>();
            modelBuilder.Entity<ItemPedido>();
            modelBuilder.Entity<ItemEstoque>();
            modelBuilder.Entity<Pedido>();


            base.OnModelCreating(modelBuilder);
        }
    }
}
