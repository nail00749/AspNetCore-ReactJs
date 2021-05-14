using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetReactKyrsovaya.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetReactKyrsovaya.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private RoleManager<IdentityRole> _roleManager;
        private UserManager<ApplicationUser> _userManager;

        public UsersController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        
        public class UsersRole
        {
            public ApplicationUser ApplicationUser { get; set; }
            public IEnumerable<IdentityRole> Roles { get; set; }
        }
        
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Get()
        {
            //var roles = await _roleManager.Roles.ToListAsync();
            //var rolesUser =await _userManager.GetRolesAsync();
            return await _userManager.Users.ToListAsync();
        }

        /*// GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }*/

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                _userManager.DeleteAsync(user);
                return Ok();
            }

            return BadRequest();

        }
    }
}
