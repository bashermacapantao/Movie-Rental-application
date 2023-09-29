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
    public class TblMoviesController : ControllerBase
    {
        private readonly RentalMovieDetailsDatabaseContext _context;

        public TblMoviesController(RentalMovieDetailsDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TblMovies
        [HttpGet]
        [Route("GetAllMovies")]
        public async Task<ActionResult<IEnumerable<MovieVM>>> GetAllMovies()
        {
            var movies = await _context.TblMovies
                  .Include(m => m.ActorMovies)
                  .Include(m => m.CategoryMovies)
                  .Select(m => new MovieVM
                  {
                      MovieId = m.MovieId,
                      MovieName = m.MovieName,
                      MovieDescription = m.MovieDescription,
                      MovieReleaseDate = DateOnly.FromDateTime(m.MovieReleaseDate),
                      MoviePrice = m.MoviePrice,
                      ActorIds = m.ActorMovies.Select(ac => ac.ActorId).ToList(),
                      CategoryIds = m.CategoryMovies.Select(cm => cm.CategoryId).ToList()
                      //Actors = m.ActorMovies.Select(am => am.Actors.ActorFullName).ToList(),
                      //Categories = m.CategoryMovies.Select(cm => cm.Categories.CategoryName).ToList(),
                  })
                  .ToListAsync();

            return movies;
        }

        // GET: api/TblMovies/5
        [HttpGet]
        [Route("GetMovieById/{id}")]
        public async Task<ActionResult<MovieVM>> GetMovieById(int id)
        {
            var movie = await _context.TblMovies
                  .Include(m => m.ActorMovies)
                  .Include(m => m.CategoryMovies)
                  .Where(m => m.MovieId == id)
                  .Select(m => new MovieVM
                  {
                      MovieId = m.MovieId,
                      MovieName = m.MovieName,
                      MovieDescription = m.MovieDescription,
                      MovieReleaseDate = DateOnly.FromDateTime(m.MovieReleaseDate),
                      MoviePrice = m.MoviePrice,
                      ActorIds = m.ActorMovies.Select(ac => ac.ActorId).ToList(),
                      CategoryIds = m.CategoryMovies.Select(cm => cm.CategoryId).ToList()
                  })
                  .FirstOrDefaultAsync();

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // PUT: api/TblMovies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("UpdateMovie/{id}")]
        public async Task<IActionResult> UpdateMovie(int id, MovieVM movieViewModel)
        {
            if (id != movieViewModel.MovieId)
            {
                return BadRequest();
            }

            var movie = await _context.TblMovies
                .Include(m => m.ActorMovies)
                .Include(m => m.CategoryMovies)
                .FirstOrDefaultAsync(m => m.MovieId == id);

            if (movie == null)
            {
                return NotFound();
            }

            movie.MovieName = movieViewModel.MovieName;
            movie.MovieDescription = movieViewModel.MovieDescription;
            //movie.MovieReleaseDate = movieViewModel.MovieReleaseDate;
            movie.MovieReleaseDate = DateTime.Parse(movieViewModel.MovieReleaseDate.ToString());
            movie.MoviePrice = (double)movieViewModel.MoviePrice;

            // Update the actor movies
            if (movieViewModel.ActorIds != null)
            {
                movie.ActorMovies.Clear();

                foreach (var actorId in movieViewModel.ActorIds)
                {
                    var actor = await _context.TblActors.FindAsync(actorId);
                    if (actor != null)
                    {
                        movie.ActorMovies.Add(new TblActorMovie { ActorId = actorId });
                    }
                }
            }

            // Update the category movies
            if (movieViewModel.CategoryIds != null)
            {
                movie.CategoryMovies.Clear();

                foreach (var categoryId in movieViewModel.CategoryIds)
                {
                    var category = await _context.TblCategories.FindAsync(categoryId);
                    if (category != null)
                    {
                        movie.CategoryMovies.Add(new TblCategoryMovie { CategoryId = categoryId });
                    }
                }
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblMovieExists(id))
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

        // POST: api/TblMovies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("CreateMovie")]
        public async Task<ActionResult<MovieVM>> CreateMovie(MovieVM movieViewModel)
        {
            var movie = new TblMovie
            {
                MovieName = movieViewModel.MovieName,
                MovieDescription = movieViewModel.MovieDescription,
                //MovieReleaseDate = movieViewModel.MovieReleaseDate,
                MovieReleaseDate = DateTime.Parse(movieViewModel.MovieReleaseDate.ToString()),
                MoviePrice = (double)movieViewModel.MoviePrice
            };

            _context.TblMovies.Add(movie);
            await _context.SaveChangesAsync();

            // Set the actor movies
            if (movieViewModel.ActorIds != null)
            {
                foreach (var actorId in movieViewModel.ActorIds)
                {
                    var actor = await _context.TblActors.FindAsync(actorId);
                    if (actor != null)
                    {
                        var actorMovie = new TblActorMovie
                        {
                            MovieId = movie.MovieId,
                            ActorId = actorId
                        };
                        _context.TblActorMovies.Add(actorMovie);
                    }
                }
            }

            // Set the category movies
            if (movieViewModel.CategoryIds != null)
            {
                foreach (var categoryId in movieViewModel.CategoryIds)
                {
                    var category = await _context.TblCategories.FindAsync(categoryId);
                    if (category != null)
                    {
                        var categoryMovie = new TblCategoryMovie
                        {
                            MovieId = movie.MovieId,
                            CategoryId = categoryId
                        };
                        _context.TblCategoryMovies.Add(categoryMovie);
                    }
                }
            }

            await _context.SaveChangesAsync();

            movieViewModel.MovieId = movie.MovieId; // Update the ID in the view model

            return CreatedAtAction("GetMovieById", new { id = movie.MovieId }, movieViewModel);
        }

        // DELETE: api/TblMovies/5
        [HttpDelete]
        [Route("DeleteMovie/{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.TblMovies
               .Include(m => m.ActorMovies)
               .Include(m => m.CategoryMovies)
               .FirstOrDefaultAsync(m => m.MovieId == id);

            if (movie == null)
            {
                return NotFound();
            }

            // Remove the associated ActorMovies
            _context.TblActorMovies.RemoveRange(movie.ActorMovies);

            // Remove the associated CategoryMovies
            _context.TblCategoryMovies.RemoveRange(movie.CategoryMovies);

            // Remove the movie
            _context.TblMovies.Remove(movie);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblMovieExists(int id)
        {
            return (_context.TblMovies?.Any(e => e.MovieId == id)).GetValueOrDefault();
        }
    }
}
