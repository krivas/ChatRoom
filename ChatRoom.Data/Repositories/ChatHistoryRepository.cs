using ChatRoom.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatRoom.Data.Repositories
{
    public class ChatHistoryRepository : GenericRepository<ChatHistory>
    {
        private readonly ApplicationContext _context;

        public ChatHistoryRepository(ApplicationContext context) : base(context)
        {
        }


    } 
}
