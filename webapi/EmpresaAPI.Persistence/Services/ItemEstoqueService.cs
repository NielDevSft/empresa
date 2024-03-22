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

            var itemEstoqueExisting = itemEstoqueRepository
               .FindAllWhere(ie => !ie.Removed &&
               ie.Item!.Uuid == itemEstoque.Item!.Uuid)
               .FirstOrDefault();

            if (itemEstoqueExisting! != null!)
            {
                itemEstoqueExisting.QtdItem = itemEstoque.QtdItem;
                itemEstoqueRepository.Update(itemEstoqueExisting);
            }
            else
            {
                var item = itemRepository.GetById(itemEstoque.Item!.Uuid);
                if (item! == null!)
                    throw new ArgumentException("Item não encontrado");
                item.ItemEstoque.Add(itemEstoque);
                itemEstoque.UpdateAt = DateTime.UtcNow;
                itemEstoque.CreateAt = DateTime.UtcNow;
                itemRepository.Update(item);
            }
            await Task.Run(() => itemRepository.SaveChanges());


            itemRepository.Dispose();

            return itemEstoque;
        }

        public async Task Delete(Guid uuid)
        {

            itemEstoqueRepository.Remove(uuid);
            itemEstoqueRepository.SaveChanges();
            await Task.Run(() => itemEstoqueRepository.SaveChanges());


            itemRepository.Dispose();


        }

        public async Task<List<ItemEstoque>> GetAll()
        {
            var itemEstoque = new List<ItemEstoque>();

            itemEstoque.AddRange(await itemEstoqueRepository.FindAllWhereAsync(i => !i.Removed, "Item"));


            itemEstoqueRepository.Dispose();

            return itemEstoque;

        }

        public async Task<ItemEstoque> GetById(Guid uuid)
        {
            var itemFound = await itemEstoqueRepository.GetByIdAsync(uuid);
            if (itemFound! == null!)
            {
                throw new Exception("Item Estoque não encontrado");
            }
            itemEstoqueRepository.Dispose();
            return itemFound!;
        }

        public async Task<ItemEstoque> Update(Guid uuid, ItemEstoque item)
        {
            ItemEstoque? itemEstoqueFound = null;

            itemEstoqueFound = await itemEstoqueRepository.GetByIdAsync(uuid);

            if (itemEstoqueFound! != null!)
            {
                itemEstoqueFound!.Item = item.Item;
                itemEstoqueFound!.QtdItem = item.QtdItem;
                itemEstoqueRepository.Update(itemEstoqueFound);
                itemEstoqueRepository.SaveChanges();
            }

            itemEstoqueRepository.Dispose();
            return itemEstoqueFound!;
        }
    }
}
