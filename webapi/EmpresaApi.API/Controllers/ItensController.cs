using AutoMapper;
using EmpresaApi.API.Dtos;
using EmpresaAPI.Domain.Pedidos.Itens;
using EmpresaAPI.Domain.Pedidos.Itens.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpresaApi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensController(ILogger<ItensController> logger,
        IItemService itemService,
        IMapper mapper) : ControllerBase
    {
        // GET: api/<ItensController>
        [HttpGet]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<IEnumerable<ItemDto>>> Get()
        {

            return Ok((await itemService.GetAll()).Select(i => mapper.Map<ItemDto>(i)));
        }

        // GET api/<ItensController>/5
        [HttpGet("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<ItemDto>> Get(Guid uuid)
        {
            var itemFound = await itemService.GetById(uuid);
            return Ok(mapper.Map<ItemDto>(itemFound));
        }

        // POST api/<ItensController>
        [HttpPost]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<ItemDto>> Post([FromBody] ItemDto value)
        {
            var item = mapper.Map<Item>(value);

            if (!item.IsValid())
                return BadRequest(item.ValidationResult.Errors);

            var itemCreated = await itemService.Create(item);
            return Created("success", mapper.Map<ItemDto>(itemCreated));
        }

        // PUT api/<ItensController>/5
        [HttpPut("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<ItemDto>> Put(Guid uuid, [FromBody] ItemDto value)
        {
            var item = mapper.Map<Item>(value);

            if (!item.IsValid())
                return BadRequest(item.ValidationResult.Errors);

            var itemCreated = await itemService.Update(uuid, item);
            return mapper.Map<ItemDto>(itemCreated);
        }

        // DELETE api/<ItensController>/5
        [HttpDelete("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult> Delete(Guid uuid)
        {
            await itemService.Delete(uuid);
            return Ok();
        }
    }
}
