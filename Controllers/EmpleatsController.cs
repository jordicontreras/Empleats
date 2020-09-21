using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Empleats.Models;

namespace Empleats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleatsController : ControllerBase
    {
        private readonly EmpleatsContext _context;

        public EmpleatsController(EmpleatsContext context)
        {
            _context = context;
        }

        // GET: api/Empleats
        /*
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleat>>> GetEmpleats()
        {
            return await _context.Empleats.ToListAsync();
        }
        */

        // GET: api/Empleats
        [HttpGet]
        public string GetEmpleats()
        {
            return "Hola mundo";
        }

        // GET: api/Empleats/5
        /*
        [HttpGet("{id}")]
        public async Task<ActionResult<Empleat>> GetEmpleat(int id)
        {
            var empleat = await _context.Empleats.FindAsync(id);

            if (empleat == null)
            {
                return NotFound();
            }

            return empleat;
        }
        */

        // GET: api/Empleats/Jordi
        [HttpGet("{name}")]
        public string GetEmpleat(string name)
        {
            return "Hola " + name;
        }

        // PUT: api/Empleats/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleat(int id, Empleat empleat)
        {
            if (id != empleat.ID)
            {
                return BadRequest();
            }

            _context.Entry(empleat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Empleats
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Empleat>> PostEmpleat(Empleat empleat)
        {
            _context.Empleats.Add(empleat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpleat", new { id = empleat.ID }, empleat);
        }

        // DELETE: api/Empleats/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Empleat>> DeleteEmpleat(int id)
        {
            var empleat = await _context.Empleats.FindAsync(id);
            if (empleat == null)
            {
                return NotFound();
            }

            _context.Empleats.Remove(empleat);
            await _context.SaveChangesAsync();

            return empleat;
        }

        private bool EmpleatExists(int id)
        {
            return _context.Empleats.Any(e => e.ID == id);
        }
    }
}
