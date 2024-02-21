using EmpresaAPI.Contracts.Repositories;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Infrastructure.Persistence.Repository;
using EmpresaAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace EmpresaAPI.Services
{
    public class ItemEstoqueService(IItemEstoqueRepository itemEstoqueRepository, IItemRepository itemRepository) : IItemEstoqueService
    {
        public ItemEstoque Create(ItemEstoque itemEstoque)
        {
            var item = itemRepository.FirstOrDefault(item => item.Id == itemEstoque.Item.Id);
            if(item.IsNullOrEmpty() != null) {
                item.ItemEstoque.Add(itemEstoque);
            }
            itemRepository.Update(item);
            itemRepository.SaveChanges();
            itemRepository.Dispose();
            return itemEstoque;
        }

        public void Delete(int id)
        {
            itemEstoqueRepository.Remove(id);
            itemEstoqueRepository.SaveChanges();
            itemEstoqueRepository.Dispose();
        }

        public List<ItemEstoque> GetAll()
        {
            var itemList = itemEstoqueRepository.FindAllWhere(i => !i.Removed, "Item");
            itemEstoqueRepository.Dispose();
            return itemList.ToList();

        }

        public ItemEstoque GetById(int id)
        {
            var itemFound = itemEstoqueRepository.FirstOrDefault(i => i.Id == id && !i.Removed);
            if (itemFound.IsNullOrEmpty())
            {
                throw new Exception("Item Estoque não encontrado");
            }
            itemEstoqueRepository.Dispose();
            return itemFound!;
        }

        public ItemEstoque Update(int id, ItemEstoque item)
        {
            var itemFound = itemEstoqueRepository.GetById(id);
            if (itemFound != null)
            {
                itemFound!.Item = item.Item;
                itemFound!.QtdItem = item.QtdItem;
                itemEstoqueRepository.Update(itemFound);
                itemEstoqueRepository.SaveChanges();
            }
            itemEstoqueRepository.Dispose();
            return itemFound!;
        }
    }
}
