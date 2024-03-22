using AutoMapper;
using EmpresaApi.API.Dtos;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque;
using EmpresaAPI.Domain.Pedidos.Itens.ItensEstoque.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpresaApi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensEstoqueController(ILogger<ItensEstoqueController> logger,
        IItemEstoqueService itemEstoqueService,
        IMapper mapper) : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<IEnumerable<ItemEstoqueDto>>> Get()
        {
            return Ok((await itemEstoqueService.GetAll()).Select(p => mapper.Map<ItemEstoqueDto>(p)));
        }

        [HttpGet("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<ItemEstoqueDto>> Get(Guid uuid)
        {
            var itemFound = await itemEstoqueService.GetById(uuid);
            return Ok(mapper.Map<ItemEstoqueDto>(itemFound));
        }

        [HttpPost]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<ItemEstoqueDto>> Post([FromBody] ItemEstoqueDto value)
        {
            var itemCreated = await itemEstoqueService.Create(mapper.Map<ItemEstoque>(value));
            return Created("sucsess", mapper.Map<ItemEstoqueDto>(itemCreated));
        }

        [HttpPut("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<ItemEstoqueDto>> Put(Guid uuid, [FromBody] ItemEstoqueDto value)
        {
            var itemUpdate = await itemEstoqueService.Update(uuid, mapper.Map<ItemEstoque>(value));
            return Ok(mapper.Map<ItemEstoqueDto>(itemUpdate));
        }

        [HttpDelete("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult> Delete(Guid uuid)
        {
            await itemEstoqueService.Delete(uuid);
            return Ok();
        }
    }
}
