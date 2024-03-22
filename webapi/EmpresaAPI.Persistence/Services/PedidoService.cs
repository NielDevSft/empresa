using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Domain.Pedidos.ItensPedidos;
using EmpresaAPI.Domain.Pedidos.ItensPedidos.Repository;
using EmpresaAPI.Domain.Pedidos.Repository;
using EmpresaAPI.Domain.Pedidos.Service;

namespace EmpresaAPI.Persistence.Services
{
    public class PedidoService(IPedidoRepository pedidoRepository,
        IItemPedidoRepository itemPedidoRepository,
        IItemRepository itemRepository) : IPedidoService
    {
        public async Task<Pedido> Create(Pedido pedido)
        {

            var itensPedidosTratados = new List<ItemPedido>();
            foreach (var itemPedido in pedido
            .ItensPedido)
            {
                var item = await itemRepository.GetByIdAsync(itemPedido.Item!.Uuid);
                itemPedido.ItemUuid = itemPedido.Item!.Uuid;
                itemPedido.Item = null;
                itensPedidosTratados.Add(itemPedido);
            }
            pedido.ItensPedido = itensPedidosTratados;
            pedidoRepository.Add(pedido);

            itemPedidoRepository.SaveChanges();

            itemPedidoRepository.Dispose();
            return pedido;
        }

        public async Task Delete(Guid uuid)
        {

            var pedido = pedidoRepository.GetById(uuid);
            if (pedido! != null!)
            {
                pedidoRepository.Remove(pedido.Uuid);
                await Task.Run(() => pedidoRepository.SaveChanges());

            }

            pedidoRepository.Dispose();
        }

        public async Task<List<Pedido>> GetAll()
        {
            var pedidoDict = new Dictionary<Guid, Pedido>();


            var itemPedidoList = await itemPedidoRepository.FindAllWhereAsync(i => !i.Pedido!.Removed, "Pedido", "Item");

            foreach (var itemPedido in itemPedidoList)
            {
                if (!pedidoDict.TryGetValue(itemPedido.Pedido!.Uuid, out var pedido))
                {
                    pedido = itemPedido.Pedido;
                    pedido.ItensPedido = new List<ItemPedido>();
                    pedidoDict.Add(pedido.Uuid, pedido);
                }

                pedido.ItensPedido.Add(itemPedido);
            }


            return pedidoDict.Values.ToList();
        }

        public async Task<Pedido> GetById(Guid uuid)
        {
            Pedido? pedidoFound = null;

            pedidoFound = await pedidoRepository
                .GetByIdAsync(uuid);

            if (pedidoFound! == null!)
            {
                throw new Exception("Item não encontrado");
            }

            pedidoRepository.Dispose();
            return pedidoFound;
        }

        public async Task<Pedido> Update(Guid uuid, Pedido item)
        {
            Pedido? pedidoFound = null;

            pedidoFound = pedidoRepository.GetById(uuid);
            if (pedidoFound! != null!)
            {
                pedidoFound.ProfissionalResponsavel = item.ProfissionalResponsavel;
                pedidoFound.ItensPedido = item.ItensPedido;
                pedidoFound.ValorTotal = item.ValorTotal;
                pedidoRepository.Update(pedidoFound);
                await Task.Run(() => pedidoRepository.SaveChanges());
            }

            pedidoRepository.Dispose();
            return pedidoFound!;
        }
    }
}
