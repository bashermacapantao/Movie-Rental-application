using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RentalMovieDetailsApi.Models;

public partial class TblRentalDetail
{
    [Key]
    public int RentalDetailId { get; set; }

    public int RentalId { get; set; }

    public int MovieId { get; set; }

    public string RentalDetailStatus { get; set; } = null!;

    public TblRental TblRental { get; set; }
    public TblMovie TblMovie { get; set; }


}
