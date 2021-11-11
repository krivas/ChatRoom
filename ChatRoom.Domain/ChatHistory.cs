using System;
using System.Collections.Generic;
using System.Text;

namespace ChatRoom.Domain
{
    public class ChatHistory
    {
        public int Id { get; set; }
        public string userName { get; set; }
        public string Message { get; set; }
        public DateTime MessageDateTime { get; set; }
    }
}
