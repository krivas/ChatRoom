using ChatRoom.Data.Repositories;
using ChatRoom.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoom.Controllers
{
    [Authorize]
    [ApiController]
    public class ChatHistoryController : Controller
    {
        private readonly IRepository<ChatHistory> _chatHistoryRepository;
        public ChatHistoryController(IRepository<ChatHistory> chatHistoryRepository)
        {
            this._chatHistoryRepository = chatHistoryRepository;
        }

        [HttpGet("chatHistory")]
        public IActionResult GetAll()
        {
            try
            {
                var chats = _chatHistoryRepository.GetAll().OrderBy(x => x.MessageDateTime);
                var count=chats.Count();
                if (chats.Count() > 30)
                    return Ok(chats.Skip(count - 30).Take(30));
                else
                    return Ok(chats);
                }
            catch (Exception ex)
            {

                return StatusCode(500,ex);
            }
            
        }
    }
}
