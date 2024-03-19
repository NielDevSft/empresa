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
        // GET: api/<ItemEstoqueController>
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<ItemEstoqueDto>>> Get()
        {
            return Ok((await itemEstoqueService.GetAll()).Select(p => mapper.Map<ItemEstoqueDto>(p)));
        }

        // GET api/<ItemEstoqueController>/5
        [HttpGet("{id}")]
        
        public async Task<ActionResult<ItemEstoqueDto>> Get(int id)
        {
            var itemFound = await itemEstoqueService.GetById(id);
            return Ok(mapper.Map<ItemEstoqueDto>(itemFound));
        }

        // POST api/<ItemEstoqueController>
        [HttpPost]
        
        public async Task<ActionResult<ItemEstoqueDto>> Post([FromBody] ItemEstoqueDto value)
        {
            var itemCreated = await itemEstoqueService.Create(mapper.Map<ItemEstoque>(value));
            return Created("sucsess", mapper.Map<ItemEstoqueDto>(itemCreated));
        }

        // PUT api/<ItemEstoqueController>/5
        [HttpPut("{id}")]
        
        public async Task<ActionResult<ItemEstoqueDto>>  Put(int id, [FromBody] ItemEstoqueDto value)
        {
            var itemUpdate = await itemEstoqueService.Update(id, mapper.Map<ItemEstoque>(value));
            return Ok(mapper.Map<ItemEstoqueDto>(itemUpdate));
        }

        // DELETE api/<ItemEstoqueController>/5
        [HttpDelete("{id}")]
        
        public async Task<ActionResult> Delete(int id)
        {
            await itemEstoqueService.Delete(id);
            return Ok();
        }
    }
}
