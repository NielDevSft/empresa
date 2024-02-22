using AutoMapper;
using EmpresaAPI.Contracts.Services;
using EmpresaAPI.Dtos;
using EmpresaAPI.Models;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpresaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensController(ILogger<ItensController> logger,
        IItemService itemService,
        IMapper mapper) : ControllerBase
        
        
    {
        // GET: api/<ItensController>
        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<ItemDto>> Get()
        {
            return Ok(itemService.GetAll().Select(i => mapper.Map<ItemDto>(i)));
        }

        // GET api/<ItensController>/5
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<ItemDto> Get(int id)
        {
            var itemFound = itemService.GetById(id);
            return Ok(mapper.Map<ItemDto>(itemFound));
        }        

        // POST api/<ItensController>
        [HttpPost]
        [Authorize]
        public ActionResult<ItemDto> Post([FromBody] ItemDto value)
        {
            var item = mapper.Map<Item>(value);
            
            if (!item.IsValid())
                return BadRequest(item.ValidationResult.Errors);

            var itemCreated = itemService.Create(item);
            return Ok(mapper.Map<ItemDto>(itemCreated));
        }

        // PUT api/<ItensController>/5
        [HttpPut("{id}")]
        [Authorize]
        public ActionResult<ItemDto> Put(int id, [FromBody] ItemDto value)
        {
            var itemUpdate = itemService.Update(id, mapper.Map<Item>(value));
            return Ok(mapper.Map<ItemDto>(itemUpdate));
        }

        // DELETE api/<ItensController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult Delete(int id)
        {
            itemService.Delete(id);
            return Ok();
        }
    }
}
