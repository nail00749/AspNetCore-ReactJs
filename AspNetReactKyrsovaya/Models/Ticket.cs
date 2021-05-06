namespace AspNetReactKyrsovaya.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int Row { get; set; }
        public int Seat { get; set; }
        public int SessionId { get; set; }
    
        public Session Session { get; set; }
    }
}