using EmpresaAPI.Infrastructure.Persistence.Extentions;
using EmpresaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmpresaAPI.Infrastructure.Persistence.Mapping
{
    public class UserRoleMap : EntityTypeConfiguration<UserRole>
    {
        public override void Map(EntityTypeBuilder<UserRole> builder)
        {
            builder.HasKey(e => e.Id).HasName("PK__UserRole__3214EC07D81BBE41");

            builder.ToTable("UserRole");

            builder.HasOne(d => d.Role).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__UserRole__RoleId__3E52440B");

            builder.HasOne(d => d.User).WithMany(p => p.UserRoles)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__UserRole__UserId__3D5E1FD2");
        }
    }
}
