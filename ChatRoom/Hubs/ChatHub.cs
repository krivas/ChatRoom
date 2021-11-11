using ChatRoom.Data.Repositories;
using ChatRoom.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoom.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IRepository<ChatHistory> _chatHistoryRepository;
        public ChatHub(IRepository<ChatHistory> chatHistoryRepository)
        {
            this._chatHistoryRepository = chatHistoryRepository;
        }
        public async Task SendMessage(string user, string message)
        {
            var chatHistory = new ChatHistory(){
                                                    userName = user, 
                                                    Message = message,
                                                    MessageDateTime = DateTime.Now };
            _chatHistoryRepository.Create(chatHistory);
            _chatHistoryRepository.SaveChanges();

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
