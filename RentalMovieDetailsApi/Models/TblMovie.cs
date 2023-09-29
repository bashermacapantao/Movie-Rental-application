using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RentalMovieDetailsApi.Models;

public partial class TblMovie
{
    [Key]
    public int MovieId { get; set; }

    public string MovieName { get; set; } = null!;

    public string MovieDescription { get; set; } = null!;

    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{MM-dd-yyyy}", ApplyFormatInEditMode = true)]
    public DateTime MovieReleaseDate { get; set; }

    public double MoviePrice { get; set; }

    public ICollection<TblActorMovie> ActorMovies { get; set; }

    public ICollection<TblCategoryMovie> CategoryMovies { get; set; }

    public ICollection<TblRentalDetail> TblRentalDetail { get; set; }
}
