using FluentValidation;
using Microsoft.IdentityModel.Tokens;

namespace EmpresaAPI.Models
{
    public class Item : Entity<Item>
    {
        public Item()
        {
            RuleFor(i => i.NomItem)
                .NotEmpty()
                .MinimumLength(3).WithMessage("O nome do item precisa ter ao menos 3 caracteres.");
            RuleFor(i => i.ValItem)
                .GreaterThan(3).WithMessage("A quantidade do item deve ser maior que 3.");
            RuleFor(i => i.DesItem)
                .MinimumLength(10).WithMessage("A descrição precisa ser mais detalhada");

        }
        public required string NomItem { get; set; }
        public decimal ValItem { get; set; }
        public required string DesItem { get; set; }
        public virtual ICollection<ItemEstoque> ItemEstoque { get; set; } = new List<ItemEstoque>();
        public override bool IsValid()
        {
            var validatorResult = Validate(this);
            ValidationResult = validatorResult;
            return ValidationResult.IsValid;
        }
    }
}
