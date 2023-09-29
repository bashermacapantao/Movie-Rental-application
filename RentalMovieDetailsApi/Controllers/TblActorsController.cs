using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalMovieDetailsApi.Models;
using RentalMovieDetailsApi.ViewModel;

namespace RentalMovieDetailsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TblActorsController : ControllerBase
    {
        private readonly RentalMovieDetailsDatabaseContext _context;

        public TblActorsController(RentalMovieDetailsDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TblActors
        [HttpGet]
        [Route("GetAllActors")]
        public async Task<ActionResult<IEnumerable<ActorVM>>> GetTblActors()
        {
            var actors = await _context.TblActors
                .Select(a => new ActorVM
                {
                    ActorId = a.ActorId,
                    ActorFullName = a.ActorFullName
                })
                .ToListAsync();

            return actors;
        }

        // GET: api/TblActors/5
        [HttpGet]
        [Route("GetActorById/{id}")]
        public async Task<ActionResult<ActorVM>> GetActorById(int id)
        {
            var actor = await _context.TblActors
                  .Where(a => a.ActorId == id)
                  .Select(a => new ActorVM
                  {
                      ActorId = a.ActorId,
                      ActorFullName = a.ActorFullName
                  })
                  .FirstOrDefaultAsync();

            if (actor == null)
            {
                return NotFound();
            }

            return actor;
        }

        // PUT: api/TblActors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("UpdateActor/{id}")]
        public async Task<IActionResult> UpdateActor(int id, ActorVM actorViewModel)
        {
            if (id != actorViewModel.ActorId)
            {
                return BadRequest();
            }

            var actor = await _context.TblActors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            actor.ActorFullName = actorViewModel.ActorFullName;

            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblActorExists(id))
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

        // POST: api/TblActors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("CreateActor")]
        public async Task<ActionResult<ActorVM>> CreateActor(ActorVM actorViewModel)
        {
            var actor = new TblActor
            {
                ActorFullName = actorViewModel.ActorFullName
            };

            _context.TblActors.Add(actor);
            await _context.SaveChangesAsync();

            actorViewModel.ActorId = actor.ActorId; // Update the ID in the view model

            return CreatedAtAction("GetActorById", new { id = actor.ActorId }, actorViewModel);
        }

        // DELETE: api/TblActors/5
        [HttpDelete]
        [Route("DeleteActor/{id}")]
        public async Task<IActionResult> DeleteActor(int id)
        {
            if (_context.TblActors == null)
            {
                return NotFound();
            }
            var tblActor = await _context.TblActors.FindAsync(id);
            if (tblActor == null)
            {
                return NotFound();
            }

            _context.TblActors.Remove(tblActor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblActorExists(int id)
        {
            return (_context.TblActors?.Any(e => e.ActorId == id)).GetValueOrDefault();
        }
    }
}
