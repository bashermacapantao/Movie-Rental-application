using System.ComponentModel.DataAnnotations;

namespace RentalMovieDetailsApi.ViewModel
{
    public class MovieVM
    {
        public int MovieId { get; set; }

        public string MovieName { get; set; }

        public string MovieDescription { get; set; }

        //[DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{MM-dd-yyyy}", ApplyFormatInEditMode = true)]
        //public DateTime MovieReleaseDate { get; set; }

        [Display(Name = "Release Date")]
        [DataType(DataType.Date)]
        public DateOnly MovieReleaseDate { get; set; }

        public double MoviePrice { get; set; }

        public List<int> ActorIds { get; set; }

        public List<int> CategoryIds { get; set; }

        //public List<string> Actors { get; set; }

        //public List<string> Categories { get; set; }
    }
}
