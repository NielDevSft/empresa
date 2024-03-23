using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Repository;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Service;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;

namespace EmpresaAPI.Persistence.Services
{
    public class ItemEstoqueService(IItemEstoqueRepository itemEstoqueRepository, IItemRepository itemRepository) : IItemEstoqueService
    {
        public async Task<ItemEstoque> Create(ItemEstoque itemEstoque)
        {

            var itemEstoqueExisting = await itemEstoqueRepository
               .FirstOrDefault(ie => !ie.Removed &&
               ie.Item!.Uuid == itemEstoque.Item!.Uuid);
               

            if (itemEstoqueExisting! != null!)
            {
                itemEstoqueExisting.QtdItem = itemEstoque.QtdItem;
                await itemEstoqueRepository.Update(itemEstoqueExisting);
            }
            else
            {
                var item = await itemRepository.GetById(itemEstoque.Item!.Uuid);
                if (item! == null!)
                    throw new ArgumentException("Item não encontrado");
                item.ItemEstoque.Add(itemEstoque);
                itemEstoque.UpdateAt = DateTime.UtcNow;
                itemEstoque.CreateAt = DateTime.UtcNow;
                await itemRepository.Update(item);
            }
            await Task.Run(() => itemRepository.SaveChanges());




            return itemEstoque;
        }

        public async Task Delete(Guid uuid)
        {
            await itemEstoqueRepository.Remove(uuid);
            await itemEstoqueRepository.SaveChanges();
        }

        public async Task<List<ItemEstoque>> GetAll()
        {
            var itemEstoque = new List<ItemEstoque>();

            itemEstoque.AddRange(await itemEstoqueRepository.FindAllWhere(i => !i.Removed, "Item"));




            return itemEstoque;

        }

        public async Task<ItemEstoque> GetById(Guid uuid)
        {
            var itemFound = await itemEstoqueRepository.GetById(uuid);
            if (itemFound! == null!)
            {
                throw new Exception("Item Estoque não encontrado");
            }

            return itemFound!;
        }

        public async Task<ItemEstoque> Update(Guid uuid, ItemEstoque item)
        {
            ItemEstoque? itemEstoqueFound = null;

            itemEstoqueFound = await itemEstoqueRepository.GetById(uuid);

            if (itemEstoqueFound! != null!)
            {
                itemEstoqueFound!.Item = item.Item;
                itemEstoqueFound!.QtdItem = item.QtdItem;
                await itemEstoqueRepository.Update(itemEstoqueFound);
                await itemEstoqueRepository.SaveChanges();
            }


            return itemEstoqueFound!;
        }
    }
}
