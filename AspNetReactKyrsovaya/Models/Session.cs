using System.Collections.Generic;

namespace AspNetReactKyrsovaya.Models
{
    public class Session
    {
        public int SessionId { get; set; }
        public System.DateTime Date { get; set; }
        public int Price { get; set; }
        public int FilmId { get; set; }
        public int HallId { get; set; }
        
        
        public  Film Film { get; set; }
        public  Hall Hall { get; set; }
        public  ICollection<Ticket> Tickets { get; set; }
    }
}