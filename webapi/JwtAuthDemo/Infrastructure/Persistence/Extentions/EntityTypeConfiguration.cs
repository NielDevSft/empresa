using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JwtAuthDemo.Infrastructure.Persistence.Extentions
{
    public abstract class EntityTypeConfiguration<TEntity> where TEntity : class
    {
        public abstract void Map(EntityTypeBuilder<TEntity> builder);
    }
}
