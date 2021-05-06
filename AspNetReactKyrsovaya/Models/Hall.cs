using System.Collections.Generic;

namespace AspNetReactKyrsovaya.Models
{
    public class Hall
    {
        public int HallId { get; set; }
        public int CountRows { get; set; }
        public int CountSeat { get; set; }
        public string Name { get; set; }
        
        public ICollection<Session> Sessions { get; set; }
        
    }
}