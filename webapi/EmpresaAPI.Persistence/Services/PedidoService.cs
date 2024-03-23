using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Domain.Pedidos.ItensPedidos;
using EmpresaAPI.Domain.Pedidos.ItensPedidos.Repository;
using EmpresaAPI.Domain.Pedidos.Repository;
using EmpresaAPI.Domain.Pedidos.Service;
using System.Collections.Generic;

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
                var item = await itemRepository.GetById(itemPedido.Item!.Uuid);
                itemPedido.ItemUuid = itemPedido.Item!.Uuid;
                itemPedido.Item = null;
                itensPedidosTratados.Add(itemPedido);
            }
            pedido.ItensPedido = itensPedidosTratados;
            await pedidoRepository.Add(pedido);

            await itemPedidoRepository.SaveChanges();
            return pedido;
        }

        public async Task Delete(Guid uuid)
        {
            var pedido = await pedidoRepository.GetById(uuid);
            if (pedido! != null!)
            {
                await pedidoRepository.Remove(pedido.Uuid);
                await pedidoRepository.SaveChanges();

            }
        }

        public async Task<List<Pedido>> GetAll()
        {
            var pedidoDict = new Dictionary<Guid, Pedido>();


            var itemPedidoList = await itemPedidoRepository.FindAllWhere(i => !i.Pedido!.Removed, "Pedido", "Item");

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
                .GetById(uuid);

            if (pedidoFound! == null!)
            {
                throw new Exception("Item não encontrado");
            }


            return pedidoFound;
        }

        public async Task<Pedido> Update(Guid uuid, Pedido pedido)
        {
            var pedidoFoundTk = pedidoRepository.GetById(uuid, "ItensPedido");
            var itensPedidoFoundTk = itemPedidoRepository.FindAllWhere(ip => ip.PedidoUuid == pedido.Uuid);
            Pedido? pedidoFound;
            List<ItemPedido> itensPedidoFound = new List<ItemPedido>();
            await Task.WhenAll(itensPedidoFoundTk, pedidoFoundTk);

            pedidoFound = pedidoFoundTk.Result;
            itensPedidoFound = itensPedidoFoundTk.Result;

            if (itensPedidoFound.Count > pedido.ItensPedido.Count)
            {
                var itensARemover = itensPedidoFound.ToList();
                itensARemover.RemoveAll(ip =>
                   pedido.ItensPedido.FirstOrDefault(ipf => ipf.QtdItem == ip.QtdItem
                   && ipf.ItemUuid == ip.ItemUuid) is null);
                itensARemover.ForEach(ip =>
                {
                    itemPedidoRepository.Remove(ip.Uuid);
                });
            }
            else
            {
                var itensExcedentes = pedido.ItensPedido.ToList();
                var itens = itensExcedentes.RemoveAll(ip =>
                    itensPedidoFound.FirstOrDefault(ipf => ipf.QtdItem == ip.QtdItem
                    && ipf.ItemUuid == ip.ItemUuid) is not null) ;

                itensPedidoFound.AddRange(itensExcedentes);
            }
            if (pedidoFound is null)
            {
                throw new Exception("Pedido não encontrado");
            }
            else
            {
                pedidoFound.ProfissionalResponsavel = pedido.ProfissionalResponsavel;
                pedidoFound.ValorTotal = pedido.ValorTotal;
                pedidoFound.ItensPedido = itensPedidoFound;
                await pedidoRepository.Update(pedidoFound);
                await pedidoRepository.SaveChanges();
                await itemPedidoRepository.SaveChanges();

            }
            return pedidoFound!;
        }
    }
}
