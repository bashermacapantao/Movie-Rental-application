using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentalMovieDetailsApi.Models;

public partial class TblActorMovie
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int ActorMovieId { get; set; }

    public int ActorId { get; set; }

    public int MovieId { get; set; }

    public TblActor Actors { get; set; }

    public TblMovie Movies { get; set; }
}
