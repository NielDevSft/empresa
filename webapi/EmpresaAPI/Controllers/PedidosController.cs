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
    public class PedidosController(ILogger<PedidosController> logger,
        IPedidoService pedidoService,
        IMapper mapper) : ControllerBase
    {
        // GET: api/<PedidoController>
        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<PedidoDto>> Get()
        {
            return Ok(pedidoService.GetAll().Select(p => mapper.Map<PedidoDto>(p)));
        }

        // GET api/<PedidoController>/5
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<PedidoDto> Get(int id)
        {
            var itemFound = pedidoService.GetById(id);
            return Ok(mapper.Map<PedidoDto>(itemFound));
        }

        // POST api/<PedidoController>
        [HttpPost]
        [Authorize]
        public ActionResult<PedidoDto> Post([FromBody] PedidoDto value)
        {
            var itemCreated = pedidoService.Create(mapper.Map<Pedido>(value));
            return Ok(mapper.Map<PedidoDto>(itemCreated));
        }

        // PUT api/<PedidoController>/5
        [HttpPut("{id}")]
        [Authorize]
        public ActionResult<PedidoDto> Put(int id, [FromBody] PedidoDto value)
        {
            var itemUpdate = pedidoService.Update(id, mapper.Map<Pedido>(value));
            return Ok(mapper.Map<ItemDto>(itemUpdate));
        }

        // DELETE api/<PedidoController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult Delete(int id)
        {
            pedidoService.Delete(id);
            return Ok();
        }
    }
}
