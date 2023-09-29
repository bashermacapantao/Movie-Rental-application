using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RentalMovieDetailsApi.ViewModel
{
    public class CustomerVM
    {
        public int CustomerId { get; set; }

        public string CustomerFirstName { get; set; }

        public string CustomerMiddleName { get; set; }

        public string CustomerLastName { get; set; }

        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public DateOnly CustomerDateBirth { get; set; }

        public string CustomerStreet { get; set; }

        public string CustomerCity { get; set; }

        public string CustomerCellphone { get; set; }

        public string CustomerTelephone { get; set; }

        public int CustomerAge { get; set; }
    }
}
