using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Domain.Pedidos.ItensPedidos.Repository;
using EmpresaAPI.Domain.Pedidos.ItensPedidos;
using EmpresaAPI.Domain.Pedidos.Repository;
using EmpresaAPI.Domain.Pedidos.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpresaAPI.Persistence.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly IItemPedidoRepository _itemPedidoRepository;
        private readonly IItemRepository _itemRepository;

        public PedidoService(
            IPedidoRepository pedidoRepository,
            IItemPedidoRepository itemPedidoRepository,
            IItemRepository itemRepository)
        {
            _pedidoRepository = pedidoRepository;
            _itemPedidoRepository = itemPedidoRepository;
            _itemRepository = itemRepository;
        }

        public async Task<Pedido> Create(Pedido pedido)
        {
            var itensPedidosTratados = new List<ItemPedido>();
            foreach (var itemPedido in pedido.ItensPedido)
            {
                var item = await _itemRepository.GetById(itemPedido.Item!.Uuid);
                itemPedido.ItemUuid = itemPedido.Item!.Uuid;
                itemPedido.Item = null;
                itensPedidosTratados.Add(itemPedido);
            }
            pedido.ItensPedido = itensPedidosTratados;
            await _pedidoRepository.Add(pedido);
            await _itemPedidoRepository.SaveChanges();
            return pedido;
        }

        public async Task Delete(Guid uuid)
        {
            var pedido = await _pedidoRepository.GetById(uuid);
            if (pedido != null)
            {
                await _pedidoRepository.Remove(pedido.Uuid);
                await _pedidoRepository.SaveChanges();
            }
        }

        public async Task<List<Pedido>> GetAll()
        {
            var pedidoDict = new Dictionary<Guid, Pedido>();
            var itemPedidoList = await _itemPedidoRepository.FindAllWhere(i => !i.Pedido!.Removed, "Pedido", "Item");

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
            var pedidoFound = await _pedidoRepository.GetById(uuid);
            if (pedidoFound == null)
            {
                throw new Exception("Pedido não encontrado");
            }
            return pedidoFound;
        }

        public async Task<Pedido> Update(Guid uuid, Pedido pedido)
        {
            var pedidoFound = await _pedidoRepository.GetById(uuid, "ItensPedido");
            var itensPedidoFound = await _itemPedidoRepository.FindAllWhere(ip => ip.PedidoUuid == pedido.Uuid);

            itensPedidoFound = UpdateItemPedidoList(pedido, itensPedidoFound);

            if (pedidoFound == null)
            {
                throw new Exception("Pedido não encontrado");
            }
            else
            {
                pedidoFound.ProfissionalResponsavel = pedido.ProfissionalResponsavel;
                pedidoFound.ValorTotal = pedido.ValorTotal;
                pedidoFound.ItensPedido = itensPedidoFound;

                await _pedidoRepository.Update(pedidoFound);
                await _pedidoRepository.SaveChanges();
                await _itemPedidoRepository.SaveChanges();
            }
            return pedidoFound;
        }

        private List<ItemPedido> UpdateItemPedidoList(Pedido pedido, List<ItemPedido> itensPedidoFound)
        {
            if (itensPedidoFound.Count > pedido.ItensPedido.Count)
            {
                var itensARemover = itensPedidoFound.ToList();
                itensARemover.RemoveAll(ip => pedido.ItensPedido.FirstOrDefault(ipf => ipf.QtdItem == ip.QtdItem && ipf.ItemUuid == ip.ItemUuid) == null);

                foreach (var ip in itensARemover)
                {
                    _itemPedidoRepository.Remove(ip.Uuid);
                }

                itensPedidoFound = itensPedidoFound.FindAll(ipf => pedido.ItensPedido.FirstOrDefault(ip => ipf.ItemUuid == ip.ItemUuid && ip.QtdItem == ip.QtdItem) != null);
            }
            else
            {
                var itensExcedentes = pedido.ItensPedido.ToList();
                itensExcedentes.RemoveAll(ip => itensPedidoFound.FirstOrDefault(ipf => ipf.QtdItem == ip.QtdItem && ipf.ItemUuid == ip.ItemUuid) != null);

                itensPedidoFound.AddRange(itensExcedentes);
            }
            return itensPedidoFound;
        }
    }
}
