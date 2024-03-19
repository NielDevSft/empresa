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
            try
            {
                var itensPedidosTratados = new List<ItemPedido>();
                foreach (var itemPedido in pedido
                .ItensPedido)
                {
                    var item = itemRepository.GetById(itemPedido.Item!.Id);
                    itemPedido.ItemId = itemPedido.Item!.Id;
                    itemPedido.Item = null;
                    itensPedidosTratados.Add(itemPedido);
                }
                pedido.ItensPedido = itensPedidosTratados;
                pedidoRepository.Add(pedido);

                itemPedidoRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                itemPedidoRepository.Dispose();
            }
            return pedido;
        }

        public async Task Delete(int id)
        {
            try
            {
                var pedido = pedidoRepository.GetById(id);
                if (pedido != null)
                {
                    pedidoRepository.Remove(pedido.Id);
                    pedidoRepository.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally { pedidoRepository.Dispose(); }
        }

        public async Task<List<Pedido>> GetAll()
        {
            var pedidoDict = new Dictionary<int, Pedido>();

            try
            {
                var itemPedidoList = itemPedidoRepository.FindAllWhere(i => !i.Pedido!.Removed, "Pedido", "Item");

                foreach (var itemPedido in itemPedidoList)
                {
                    if (!pedidoDict.TryGetValue(itemPedido.Pedido.Id, out var pedido))
                    {
                        pedido = itemPedido.Pedido;
                        pedido.ItensPedido = new List<ItemPedido>();
                        pedidoDict.Add(pedido.Id, pedido);
                    }

                    pedido.ItensPedido.Add(itemPedido);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return pedidoDict.Values.ToList();
        }

        public async Task<Pedido> GetById(int id)
        {
            Pedido? pedidoFound = null;
            try
            {
                pedidoFound = pedidoRepository
                    .FirstOrDefault(p => p.Id == id && p.Removed);

                if (pedidoFound! == null)
                {
                    throw new Exception("Item não encontrado");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally { pedidoRepository.Dispose(); }
            return pedidoFound;
        }

        public async Task<Pedido> Update(int id, Pedido item)
        {
            Pedido? pedidoFound = null;
            try
            {
                pedidoFound = pedidoRepository.GetById(id);
                if (pedidoFound! != null)
                {
                    pedidoFound.ProfissionalResponsavel = item.ProfissionalResponsavel;
                    pedidoFound.ItensPedido = item.ItensPedido;
                    pedidoFound.ValorTotal = item.ValorTotal;
                    pedidoRepository.Update(pedidoFound);
                    pedidoRepository.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally { pedidoRepository.Dispose(); }
            return pedidoFound;
        }
    }
}
