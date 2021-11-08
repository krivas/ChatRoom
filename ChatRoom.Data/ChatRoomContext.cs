using ChatRoom.Domain;
using ChatRoom.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace ChatRoom.Data
{
    public class ChatRoomContext:DbContext
    {
        public DbSet<ApplicationUser> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=SERSQLDEV02\\DEV12INS01;Database=Sentinel_Intermedia;User Id=SentinelRiesgo;Password=SentinelRiesgo;");
        }
    }
}
