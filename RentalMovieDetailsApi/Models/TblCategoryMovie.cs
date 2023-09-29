using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentalMovieDetailsApi.Models;

public partial class TblCategoryMovie
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int CategoryMovieId { get; set; }

    public int CategoryId { get; set; }

    public int MovieId { get; set; }

    public TblCategory Categories { get; set; }

    public TblMovie Movies { get; set; }
}
