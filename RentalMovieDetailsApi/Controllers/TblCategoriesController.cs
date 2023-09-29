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
    public class TblCategoriesController : ControllerBase
    {
        private readonly RentalMovieDetailsDatabaseContext _context;

        public TblCategoriesController(RentalMovieDetailsDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TblCategories
        [HttpGet]
        [Route("GetAllCategories")]
        public async Task<ActionResult<IEnumerable<CategoryVM>>> GetAllCategories()
        {
            var categories = await _context.TblCategories
                .Select(c => new CategoryVM
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName
                })
                .ToListAsync();

            return categories;
        }

        // GET: api/TblCategories/5
        [HttpGet]
        [Route("GetCategoryById/{id}")]
        public async Task<ActionResult<CategoryVM>> GetCategoryById(int id)
        {
            var category = await _context.TblCategories
                 .Where(c => c.CategoryId == id)
                 .Select(c => new CategoryVM
                 {
                     CategoryId = c.CategoryId,
                     CategoryName = c.CategoryName
                 })
                 .FirstOrDefaultAsync();

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/TblCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("UpdateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CategoryVM categoryViewModel)
        {
            if (id != categoryViewModel.CategoryId)
            {
                return BadRequest();
            }

            var category = await _context.TblCategories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            category.CategoryName = categoryViewModel.CategoryName;

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCategoryExists(id))
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

        // POST: api/TblCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("CreateCategory")]
        public async Task<ActionResult<CategoryVM>> CreateCategory(CategoryVM categoryViewModel)
        {
            var category = new TblCategory
            {
                CategoryName = categoryViewModel.CategoryName
            };

            _context.TblCategories.Add(category);
            await _context.SaveChangesAsync();

            categoryViewModel.CategoryId = category.CategoryId; // Update the ID in the view model

            return CreatedAtAction("GetCategoryById", new { id = category.CategoryId }, categoryViewModel);
        }

        // DELETE: api/TblCategories/5
        [HttpDelete]
        [Route("DeleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (_context.TblCategories == null)
            {
                return NotFound();
            }
            var tblCategory = await _context.TblCategories.FindAsync(id);
            if (tblCategory == null)
            {
                return NotFound();
            }

            _context.TblCategories.Remove(tblCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblCategoryExists(int id)
        {
            return (_context.TblCategories?.Any(e => e.CategoryId == id)).GetValueOrDefault();
        }
    }
}
