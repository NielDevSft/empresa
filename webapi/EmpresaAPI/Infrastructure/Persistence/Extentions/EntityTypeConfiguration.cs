using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmpresaAPI.Infrastructure.Persistence.Extentions
{
    public abstract class EntityTypeConfiguration<TEntity> where TEntity : class
    {
        public abstract void Map(EntityTypeBuilder<TEntity> builder);
    }
}
