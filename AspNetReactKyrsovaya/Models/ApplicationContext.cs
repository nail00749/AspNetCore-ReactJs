using Microsoft.EntityFrameworkCore;

namespace AspNetReactKyrsovaya.Models
{
    public sealed class ApplicationContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Hall> Halls { get; set; } 
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Film>().HasMany(s => s.Sessions).WithOne(s => s.Film);
            modelBuilder.Entity<Hall>().ToTable("Halls");
            modelBuilder.Entity<Session>().ToTable("Session").HasMany(s => s.Tickets).WithOne();
            modelBuilder.Entity<Ticket>().HasOne(t => t.Session).WithMany(t=>t.Tickets);
        }
    }
}