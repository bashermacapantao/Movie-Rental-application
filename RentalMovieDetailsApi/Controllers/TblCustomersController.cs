using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalMovieDetailsApi.Models;
using RentalMovieDetailsApi.ViewModel;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RentalMovieDetailsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TblCustomersController : ControllerBase
    {
        private readonly RentalMovieDetailsDatabaseContext _context;

        public TblCustomersController(RentalMovieDetailsDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TblCustomers
        [HttpGet]
        [Route("GetAllCustomers")]
        public async Task<ActionResult<IEnumerable<CustomerVM>>> GetAllCustomers()
        {
            var customers = await _context.TblCustomers
                .Select(c => new CustomerVM
                {
                    CustomerId = c.CustomerId,
                    CustomerFirstName = c.CustomerFirstName,
                    CustomerMiddleName = c.CustomerMiddleName,
                    CustomerLastName = c.CustomerLastName,
                    //CustomerDateBirth = new DateOnly(c.CustomerDateBirth.Year, c.CustomerDateBirth.Month, c.CustomerDateBirth.Day),
                    CustomerDateBirth = DateOnly.FromDateTime(c.CustomerDateBirth),
                    CustomerAge = c.CustomerAge,
                    CustomerStreet = c.CustomerStreet,
                    CustomerCity = c.CustomerCity,
                    CustomerCellphone = c.CustomerCellphone,
                    CustomerTelephone = c.CustomerTelephone
                })
                .ToListAsync();

            return customers;
        }

        // GET: api/TblCustomers/5
        [HttpGet]
        [Route("GetCustomerById/{id}")]
        public async Task<ActionResult<CustomerVM>> GetCustomerById(int id)
        {
            var customer = await _context.TblCustomers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            var customerViewModel = new CustomerVM
            {
                CustomerId = customer.CustomerId,
                CustomerFirstName = customer.CustomerFirstName,
                CustomerMiddleName = customer.CustomerMiddleName,
                CustomerLastName = customer.CustomerLastName,
                CustomerDateBirth = DateOnly.FromDateTime(customer.CustomerDateBirth),
                CustomerAge = customer.CustomerAge,
                CustomerStreet = customer.CustomerStreet,
                CustomerCity = customer.CustomerCity,
                CustomerCellphone = customer.CustomerCellphone,
                CustomerTelephone = customer.CustomerTelephone
            };

            return customerViewModel;
        }

        // PUT: api/TblCustomers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("UpdateCustomer/{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, CustomerVM customerViewModel)
        {
            if (id != customerViewModel.CustomerId)
            {
                return BadRequest();
            }

            var customer = await _context.TblCustomers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            customer.CustomerFirstName = customerViewModel.CustomerFirstName;
            customer.CustomerMiddleName = customerViewModel.CustomerMiddleName;
            customer.CustomerLastName = customerViewModel.CustomerLastName;
            //customer.CustomerDateBirth = customerViewModel.CustomerDateBirth.ToDateTime();
            customer.CustomerDateBirth = DateTime.Parse(customerViewModel.CustomerDateBirth.ToString());
            customer.CustomerAge = customerViewModel.CustomerAge;
            customer.CustomerStreet = customerViewModel.CustomerStreet;
            customer.CustomerCity = customerViewModel.CustomerCity;
            customer.CustomerCellphone = customerViewModel.CustomerCellphone;
            customer.CustomerTelephone = customerViewModel.CustomerTelephone;

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCustomerExists(id))
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

        // POST: api/TblCustomers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("CreateCustomer")]
        public async Task<ActionResult<CustomerVM>> CreateCustomer(CustomerVM customerViewModel)
        {
            var customer = new TblCustomer
            {
                CustomerFirstName = customerViewModel.CustomerFirstName,
                CustomerMiddleName = customerViewModel.CustomerMiddleName,
                CustomerLastName = customerViewModel.CustomerLastName,
                //CustomerDateBirth = customerViewModel.CustomerDateBirth.ToDateTime(),
                CustomerDateBirth = DateTime.Parse(customerViewModel.CustomerDateBirth.ToString()),
                CustomerAge = customerViewModel.CustomerAge,
                CustomerStreet = customerViewModel.CustomerStreet,
                CustomerCity = customerViewModel.CustomerCity,
                CustomerCellphone = customerViewModel.CustomerCellphone,
                CustomerTelephone = customerViewModel.CustomerTelephone
            };

            _context.TblCustomers.Add(customer);
            await _context.SaveChangesAsync();

            customerViewModel.CustomerId = customer.CustomerId;


            return CreatedAtAction(nameof(GetCustomerById), new { id = customer.CustomerId }, customerViewModel);
        }

        // DELETE: api/TblCustomers/5
        [HttpDelete]
        [Route("DeleteCustomer/{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            if (_context.TblCustomers == null)
            {
                return NotFound();
            }
            var tblCustomer = await _context.TblCustomers.FindAsync(id);
            if (tblCustomer == null)
            {
                return NotFound();
            }

            _context.TblCustomers.Remove(tblCustomer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblCustomerExists(int id)
        {
            return (_context.TblCustomers?.Any(e => e.CustomerId == id)).GetValueOrDefault();
        }
    }
}
