using System;
using System.Collections.Generic;

namespace RentalMovieDetailsApi.Models;

public partial class TblActor
{
    public int ActorId { get; set; }

    public string ActorFullName { get; set; } = null!;

    public ICollection<TblActorMovie> ActorMovies { get; set; }
}
