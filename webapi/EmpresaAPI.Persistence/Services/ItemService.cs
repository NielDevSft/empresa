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

            await itemRepository.Add(item);
            await itemRepository.SaveChanges();

            item.ItemEstoque.Add(new ItemEstoque
            {
                QtdItem = 0,
                UpdateAt = DateTime.UtcNow,
                CreateAt = DateTime.UtcNow,
            });
            await itemRepository.Update(item);
            await Task.Run(() => itemRepository.SaveChanges());


            return item;
        }

        public async Task Delete(Guid uuid)
        {
            var item = await itemRepository.GetById(uuid, "ItemEstoque");
            if (item! != null! && item.ItemEstoque != null!)
                item.ItemEstoque.First().Removed = true;
            item!.Removed = true;
            await itemRepository.Update(item);
            await Task.Run(() => itemRepository.SaveChanges());




        }

        public async Task<List<Item>> GetAll()
        {
            var itemList = new List<Item>();
            itemList.AddRange(await itemRepository.FindAllWhere(i => !i.Removed));


            return itemList;
        }

        public async Task<Item> GetById(Guid uuid)
        {
            Item? itemFound = null;

            itemFound = (await itemRepository
                .FindAllWhere(i => i.Uuid == uuid && !i.Removed)).FirstOrDefault();

            if (itemFound! == null!)
            {
                throw new Exception("Item não encontrado");
            }


            return itemFound;
        }

        public async Task<Item> Update(Guid uuid, Item item)
        {
            Item? itemFound = null;
            itemFound = await itemRepository.GetById(uuid)!;
            itemFound!.NomItem = item.NomItem;
            itemFound!.ValItem = item.ValItem;
            itemFound!.DesItem = item.DesItem;
            await itemRepository.Update(itemFound);
            await itemRepository.SaveChanges();

            return itemFound;
        }
    }
}
