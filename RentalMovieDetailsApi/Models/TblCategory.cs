using System;
using System.Collections.Generic;

namespace RentalMovieDetailsApi.Models;

public partial class TblCategory
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public ICollection<TblCategoryMovie> CategoryMovies { get; set; }
}
