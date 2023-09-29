using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RentalMovieDetailsApi.Models;

public partial class TblCustomer
{
    [Key]
    public int CustomerId { get; set; }

    public string CustomerFirstName { get; set; } = null!;

    public string CustomerMiddleName { get; set; } = null!;

    public string CustomerLastName { get; set; } = null!;

    [DataType(DataType.Date)]
    //[DisplayFormat(DataFormatString = "{yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    public DateTime CustomerDateBirth { get; set; }

    public int CustomerAge { get; set; }

    public string CustomerStreet { get; set; } = null!;

    public string CustomerCity { get; set; } = null!;

    public string CustomerCellphone { get; set; } = null!;

    public string CustomerTelephone { get; set; } = null!;

    public ICollection<TblRental> TblRental { get; set; }

}
