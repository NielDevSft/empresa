using FluentValidation;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;

namespace EmpresaAPI.Models
{
    public class ItemEstoque : Entity<ItemEstoque>
    {
        public ItemEstoque() {
            RuleFor(ie => ie.Item)
                .NotEmpty()
                .NotNull()
                .WithErrorCode("O item é obrigatório para o estoque");
            RuleFor(ie => ie.QtdItem)
                .NotNull()
                .WithMessage("Quantidade requerida.");
        }
        public virtual Item Item { get; set; } = null;
        public decimal QtdItem { get; set; }
        public override bool IsValid()
        {
            var validatorResult = Validate(this);
            ValidationResult = validatorResult;
            return ValidationResult.IsValid;
        }
    }
}
