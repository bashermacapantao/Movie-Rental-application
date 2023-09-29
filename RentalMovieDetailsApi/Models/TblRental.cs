using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RentalMovieDetailsApi.Models;

public partial class TblRental
{
    [Key]
    public int RentalId { get; set; }

    public DateTime RentalRentDate { get; set; }

    public DateTime RentalReturnDate { get; set; }

    public double RentalTotalPrice { get; set; }

    public string RentalStatus { get; set; } = null!;

    public int CustomerId { get; set; }

    public TblCustomer TblCustomer { get; set; }

    public ICollection<TblRentalDetail> TblRentalDetail { get; set; }
}
