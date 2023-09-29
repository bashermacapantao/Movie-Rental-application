using System;
using System.Collections.Generic;
using System.Linq;
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
    public class TblRentalsController : ControllerBase
    {
        private readonly RentalMovieDetailsDatabaseContext _context;

        public TblRentalsController(RentalMovieDetailsDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TblRentals
        [HttpGet]
        [Route("GetAllRentals")]
        public async Task<ActionResult<IEnumerable<RentalDTO>>> GetAllRentals()
        {
            var rentals = await _context.TblRentals
                  .Include(r => r.TblCustomer)
                  .Select(r => new RentalDTO
                  {
                      RentalId = r.RentalId,
                      RentalRentDate = DateOnly.FromDateTime(r.RentalRentDate),
                      RentalReturnDate = DateOnly.FromDateTime(r.RentalReturnDate),
                      RentalTotalPrice = r.RentalTotalPrice,
                      RentalStatus = r.RentalStatus,
                      CustomerFullName = r.TblCustomer.CustomerFirstName + " " + r.TblCustomer.CustomerMiddleName + " " + r.TblCustomer.CustomerLastName
                  })
                  .ToListAsync();

            return Ok(rentals);
        }


        // GET: api/TblRentals/5
        [HttpGet]
        [Route("GetRentalById/{id}")]
        public async Task<ActionResult<RentalDTO>> GetRentalById(int id)
        {
            var rental = await _context.TblRentals
                  .Include(r => r.TblCustomer)
                  .FirstOrDefaultAsync(r => r.RentalId == id);

            if (rental == null)
            {
                return NotFound();
            }

            var rentalDto = new RentalDTO
            {
                RentalId = rental.RentalId,
                RentalRentDate = DateOnly.FromDateTime(rental.RentalRentDate),
                RentalReturnDate = DateOnly.FromDateTime(rental.RentalReturnDate),
                RentalTotalPrice = rental.RentalTotalPrice,
                RentalStatus = rental.RentalStatus,
                CustomerFullName = rental.TblCustomer.CustomerFirstName + " " + rental.TblCustomer.CustomerMiddleName + " " + rental.TblCustomer.CustomerLastName
            };

            return Ok(rentalDto);
        }

        // PUT: api/TblRentals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("UpdateRental/{id}")]
        public async Task<IActionResult> UpdateRental(int id, RentalDTO rentalDto)
        {
            if (id != rentalDto.RentalId)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rental = await _context.TblRentals.FindAsync(id);

            if (rental == null)
            {
                return NotFound();
            }

            rental.RentalRentDate = DateTime.Parse(rentalDto.RentalRentDate.ToString());
            rental.RentalReturnDate = DateTime.Parse(rentalDto.RentalReturnDate.ToString());

            _context.Entry(rental).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblRentalExists(id))
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

        // POST: api/TblRentals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("CreateRental")]
        public async Task<ActionResult<RentalDTO>> CreateRental(RentalDTO rentalDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rental = new TblRental
            {
                RentalRentDate = DateTime.Parse(rentalDto.RentalRentDate.ToString()),
                RentalReturnDate = DateTime.Parse(rentalDto.RentalReturnDate.ToString()),
                RentalStatus = "Incomplete",
                CustomerId = rentalDto.CustomerId
            };

            _context.TblRentals.Add(rental);
            await _context.SaveChangesAsync();

            rentalDto.RentalId = rental.RentalId;
            rentalDto.RentalTotalPrice = rental.RentalTotalPrice;
            //rentalDto.CustomerFullName = rental.TblCustomer.CustomerFirstName + " " + rental.TblCustomer.CustomerMiddleName + " " + rental.TblCustomer.CustomerLastName;

            if (rentalDto.MovieList != null && rentalDto.MovieList.Any())
            {
                foreach (var movieId in rentalDto.MovieList)
                {
                    var rentalDetail = new TblRentalDetail
                    {
                        RentalId = rental.RentalId,
                        MovieId = movieId,
                        RentalDetailStatus = "Active"
                    };

                    _context.TblRentalDetails.Add(rentalDetail);
                }

                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetRentalById), new { id = rental.RentalId }, rentalDto);
        }

        [HttpPost]
        [Route("ReturnMovie/{id}")]
        public async Task<IActionResult> ReturnMovie(int id)
        {
            var rental = await _context.TblRentals.Include(r => r.TblRentalDetail).FirstOrDefaultAsync(r => r.RentalId == id);

            if (rental == null)
            {
                return NotFound();
            }

            foreach (var rentalDetail in rental.TblRentalDetail)
            {
                rentalDetail.RentalDetailStatus = "Returned";
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TblRentals/5
        [HttpDelete]
        [Route("DeleteRental/{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            if (_context.TblRentals == null)
            {
                return NotFound();
            }
            var tblRental = await _context.TblRentals.FindAsync(id);
            if (tblRental == null)
            {
                return NotFound();
            }

            _context.TblRentals.Remove(tblRental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblRentalExists(int id)
        {
            return (_context.TblRentals?.Any(e => e.RentalId == id)).GetValueOrDefault();
        }
    }
}
