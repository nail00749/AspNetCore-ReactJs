using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace AspNetReactKyrsovaya.Models
{
    public class Film
    {
        public int FilmId { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public string Director { get; set; }
        public string Poster { get; set; }
        public string Genre { get; set; }
        public string Country { get; set; }
        
        public  ICollection<Session> Sessions { get; set; }
    }
}