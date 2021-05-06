using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspNetReactKyrsovaya.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public FileController(ApplicationContext context)
        {
            _context = context;
        }
        
        [HttpGet("{id}")]
        public FileResult Get(int id)
        {
            var film = _context.Films.Find(id);
            string path = "./Content/Image/" + film.Poster;
            string file_type = "application/jpg";
            FileStream fs = new FileStream(path, FileMode.Open);
            return File(fs,file_type);
        }
        
        
    }
}