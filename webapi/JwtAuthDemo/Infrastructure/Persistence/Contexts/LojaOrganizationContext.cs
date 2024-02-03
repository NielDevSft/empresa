using JwtAuthDemo.Infrastructure.Persistence.Extentions;
using JwtAuthDemo.Infrastructure.Persistence.Mapping;
using JwtAuthDemo.Models;
using Microsoft.EntityFrameworkCore;

namespace JwtAuthDemo.Infrastructure.Persistence.Contexts
{
    public class LojaOrganizationContext : DbContext
    {
        public virtual DbSet<User> User { get; set; }

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
            modelBuilder.AddConfiguration(new DefaultMap<User>());
            modelBuilder.AddConfiguration(new DefaultMap<JwtClaims>());
            modelBuilder.AddConfiguration(new DefaultMap<Role>());
            modelBuilder.AddConfiguration(new DefaultMap<UserRole>());

            modelBuilder.Entity<User>();
            modelBuilder.Entity<JwtClaims>();
            modelBuilder.Entity<Role>();
            modelBuilder.Entity<UserRole>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
