using EmpresaAPI.Domain.Core.Models;
using EmpresaAPI.Domain.Pedidos.ItensPedidos;
using FluentValidation;

namespace EmpresaAPI.Domain.Pedidos
{
    public class Pedido : Entity<Pedido>
    {
        public Pedido()
        {
            RuleFor(p => p.ProfissionalResponsavel)
                .NotEmpty()
                .MinimumLength(5).WithMessage("Por favor, insira o nome completo do responsável.");
            RuleFor(p => p.ItensPedido)
                .NotEmpty()
                .Must(p => p.Count > 0)
                .WithMessage("Nessessário ao ao menos um item par ao pedido.");
            RuleFor(p => p.ValorTotal)
                .NotEmpty()
                .Must((p, v) => v == p.ItensPedido.Select(ip => ip.Item!.ValItem * ip.QtdItem).Sum())
                .WithMessage("O valor total do pedido precisar ser compativel com o dos itens.");

        }
        public required string ProfissionalResponsavel { get; set; }
        public ICollection<ItemPedido> ItensPedido { get; set; } = new List<ItemPedido>();
        public decimal ValorTotal { get; set; }
        public override bool IsValid()
        {
            var validatorResult = Validate(this);
            ValidationResult = validatorResult;
            return ValidationResult.IsValid;
        }
    }
}
