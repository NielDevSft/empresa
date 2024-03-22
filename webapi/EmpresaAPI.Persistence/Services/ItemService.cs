using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.Itens.Repository;
using EmpresaAPI.Domain.Pedidos.Itens.Service;

namespace EmpresaAPI.Persistence.Services
{
    public class ItemService(IItemRepository itemRepository) : IItemService
    {
        public async Task<Item> Create(Item item)
        {

            itemRepository.Add(item);
            itemRepository.SaveChanges();

            item.ItemEstoque.Add(new ItemEstoque
            {
                QtdItem = 0,
                UpdateAt = DateTime.UtcNow,
                CreateAt = DateTime.UtcNow,
            });
            itemRepository.Update(item);
            await Task.Run(() => itemRepository.SaveChanges());

            itemRepository.Dispose();
            return item;
        }

        public async Task Delete(Guid uuid)
        {
            var item = itemRepository.GetById(uuid, "ItemEstoque");
            if (item! != null! && item.ItemEstoque != null!)
                item.ItemEstoque.First().Removed = true;
            item!.Removed = true;
            itemRepository.Update(item);
            await Task.Run(() => itemRepository.SaveChanges());


            itemRepository.Dispose();

        }

        public async Task<List<Item>> GetAll()
        {
            var itemList = new List<Item>();
            itemList.AddRange(await itemRepository.FindAllWhereAsync(i => !i.Removed));

            itemRepository.Dispose();
            return itemList;
        }

        public async Task<Item> GetById(Guid uuid)
        {
            Item? itemFound = null;

            itemFound = (await itemRepository
                .FindAllWhereAsync(i => i.Uuid == uuid && !i.Removed)).FirstOrDefault();

            if (itemFound! == null!)
            {
                throw new Exception("Item não encontrado");
            }
            itemRepository.Dispose();

            return itemFound;
        }

        public async Task<Item> Update(Guid uuid, Item item)
        {
            Item? itemFound = null;
            itemFound = await itemRepository.GetByIdAsync(uuid)!;
            itemFound!.NomItem = item.NomItem;
            itemFound!.ValItem = item.ValItem;
            itemFound!.DesItem = item.DesItem;
            itemRepository.Update(itemFound);
            itemRepository.SaveChanges();

            itemRepository.Dispose();

            return itemFound;
        }
    }
}
