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

        public async Task<ActionResult<IEnumerable<PedidoDto>>> Get()
        {
            return Ok((await pedidoService.GetAll()).Select(p => mapper.Map<PedidoDto>(p)));
        }

        [HttpGet("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<PedidoDto>> Get(Guid uuid)
        {
            var itemFound = await pedidoService.GetById(uuid);
            return Ok(mapper.Map<PedidoDto>(itemFound));
        }

        [HttpPost]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<PedidoDto>> Post([FromBody] PedidoDto value)
        {
            var pedido = mapper.Map<Pedido>(value);
            if (!pedido.IsValid())
                return BadRequest(pedido.ValidationResult.Errors);

            var pedidoCreated = await pedidoService.Create(pedido);
            return Created("success", mapper.Map<PedidoDto>(pedidoCreated));
        }

        [HttpPut("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult<PedidoDto>> Put(Guid uuid, [FromBody] PedidoDto value)
        {
            var pedido = mapper.Map<Pedido>(value);
            if (!pedido.IsValid())
                return BadRequest(pedido.ValidationResult.Errors);

            var pedidoCreated = await pedidoService.Update(uuid, pedido);
            return Ok(mapper.Map<PedidoDto>(pedidoCreated));
        }

        [HttpDelete("{uuid}")]
        [Authorize(Roles = "CLIENTE_ADM_EMPRESA")]
        public async Task<ActionResult> Delete(Guid uuid)
        {
            await pedidoService.Delete(uuid);
            return Ok();
        }
    }
}
