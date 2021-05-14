using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetReactKyrsovaya.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AspNetReactKyrsovaya.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok("ok");
        }
        
        
        [HttpPost]
        public async Task<AcceptedResult> Post([FromForm] IFormFile file, [FromForm]string jsonString)
        {
            Film film = JsonConvert.DeserializeObject<Film>(jsonString);
            
            return new AcceptedResult();
        }
    }
}