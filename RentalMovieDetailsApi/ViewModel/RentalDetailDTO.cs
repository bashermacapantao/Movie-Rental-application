namespace RentalMovieDetailsApi.ViewModel
{
    public class RentalDetailDTO
    {
        public int RentalDetailId { get; set; }
        public int RentalId { get; set; }
        public int MovieId { get; set; }
        public string RentalDetailStatus { get; set; }
        public string MovieName { get; set; }
    }
}
