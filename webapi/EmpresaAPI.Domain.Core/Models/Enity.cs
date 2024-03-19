﻿using FluentValidation;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using ValidationResult = FluentValidation.Results.ValidationResult;
namespace EmpresaAPI.Domain.Core.Models
{
    public abstract class Entity<T> : AbstractValidator<T> where T : Entity<T>
    {
        protected Entity()
        {
            ValidationResult = new ValidationResult();
        }

        public int Id { get; set; }
        [DefaultValue(1)]
        public bool Active { get; set; } = true;
        [DefaultValue(0)]
        public bool Removed { get; set; } = false;

        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        public abstract bool IsValid();

        [NotMapped]
        public ValidationResult ValidationResult { get; protected set; }


        public override bool Equals(object? obj)
        {
            var compareTo = obj as Entity<T>;

            if (ReferenceEquals(this, compareTo)) return true;
            if (ReferenceEquals(null, compareTo)) return false;

            return Id.Equals(compareTo.Id);
        }

        public static bool operator ==(Entity<T> a, Entity<T> b)
        {
            if (ReferenceEquals(a, null) && ReferenceEquals(b, null))
                return true;

            if (ReferenceEquals(a, null) || ReferenceEquals(b, null))
                return false;

            return a.Equals(b);
        }

        public static bool operator !=(Entity<T> a, Entity<T> b)
        {
            return !(a == b);
        }

        public override int GetHashCode() => GetType().GetHashCode() * 907 + Id.GetHashCode();

        public override string ToString() => GetType().Name + "[Id = " + Id + "]";
    }
}