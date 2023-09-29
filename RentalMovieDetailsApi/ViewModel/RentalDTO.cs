using System.ComponentModel.DataAnnotations;

namespace RentalMovieDetailsApi.ViewModel
{
    public class RentalDTO
    {
        public int RentalId { get; set; }

        [Display(Name = "Rent Date")]
        [DataType(DataType.Date)]
        public DateOnly RentalRentDate { get; set; }

        [Display(Name = "Return Date")]
        [DataType(DataType.Date)]
        public DateOnly RentalReturnDate { get; set; }
        public double RentalTotalPrice { get; set; }
        public string RentalStatus { get; set; }
        public int CustomerId { get; set; }
        public string CustomerFullName { get; set; }
        public List<int> MovieList { get; set; }
    }
}
