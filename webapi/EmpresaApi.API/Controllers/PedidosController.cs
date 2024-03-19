using AutoMapper;
using EmpresaApi.API.Dtos;
using EmpresaAPI.Domain.Pedidos;
using EmpresaAPI.Domain.Pedidos.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpresaApi.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController(ILogger<PedidosController> logger,
        IPedidoService pedidoService,
        IMapper mapper) : ControllerBase
    {
        // GET: api/<PedidoController>
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<PedidoDto>>>  Get()
        {
            return Ok((await pedidoService.GetAll()).Select(p => mapper.Map<PedidoDto>(p)));
        }

        // GET api/<PedidoController>/5
        [HttpGet("{id}")]
        
        public async Task<ActionResult<PedidoDto>>  Get(int id)
        {
            var itemFound = await pedidoService.GetById(id);
            return Ok(mapper.Map<PedidoDto>(itemFound));
        }

        // POST api/<PedidoController>
        [HttpPost]
        
        public async Task<ActionResult<PedidoDto>>  Post([FromBody] PedidoDto value)
        {
            var pedido = mapper.Map<Pedido>(value);
            if (!pedido.IsValid())
                return BadRequest(pedido.ValidationResult.Errors);

            var pedidoCreated = await pedidoService.Create(pedido);
            return Created("success", mapper.Map<PedidoDto>(pedidoCreated));
        }

        // PUT api/<PedidoController>/5
        [HttpPut("{id}")]
        
        public async Task<ActionResult<PedidoDto>>  Put(int id, [FromBody] PedidoDto value)
        {
            var pedido = mapper.Map<Pedido>(value);
            if (!pedido.IsValid())
                return BadRequest(pedido.ValidationResult.Errors);

            var pedidoCreated = await pedidoService.Update(id, pedido);
            return Ok(mapper.Map<PedidoDto>(pedidoCreated));
        }

        // DELETE api/<PedidoController>/5
        [HttpDelete("{id}")]
        
        public async Task<ActionResult>  Delete(int id)
        {
            await pedidoService.Delete(id);
            return Ok();
        }
    }
}
