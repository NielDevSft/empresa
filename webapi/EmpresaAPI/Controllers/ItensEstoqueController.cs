using AutoMapper;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Dtos;
using EmpresaAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpresaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensEstoqueController(ILogger<ItensEstoqueController> logger,
        IItemEstoqueService itemEstoqueService,
        IMapper mapper) : ControllerBase
    {
        // GET: api/<ItemEstoqueController>
        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<ItemEstoqueDto>> Get()
        {
            return Ok(itemEstoqueService.GetAll().Select(p => mapper.Map<ItemEstoqueDto>(p)));
        }

        // GET api/<ItemEstoqueController>/5
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<ItemEstoqueDto> Get(int id)
        {
            var itemFound = itemEstoqueService.GetById(id);
            return Ok(mapper.Map<ItemEstoqueDto>(itemFound));
        }

        // POST api/<ItemEstoqueController>
        [HttpPost]
        [Authorize]
        public ActionResult<ItemEstoqueDto> Post([FromBody] ItemEstoqueDto value)
        {
            var itemCreated = itemEstoqueService.Create(mapper.Map<ItemEstoque>(value));
            return Ok(mapper.Map<ItemEstoqueDto>(itemCreated));
        }

        // PUT api/<ItemEstoqueController>/5
        [HttpPut("{id}")]
        [Authorize]
        public ActionResult<ItemEstoqueDto> Put(int id, [FromBody] ItemEstoqueDto value)
        {
            var itemUpdate = itemEstoqueService.Update(id, mapper.Map<ItemEstoque>(value));
            return Ok(mapper.Map<ItemEstoqueDto>(itemUpdate));
        }

        // DELETE api/<ItemEstoqueController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult Delete(int id)
        {
            itemEstoqueService.Delete(id);
            return Ok();
        }
    }
}
