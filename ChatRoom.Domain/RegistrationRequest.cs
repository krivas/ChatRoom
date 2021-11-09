using System;
using System.Collections.Generic;
using System.Text;

namespace ChatRoom.Domain
{
    public class RegistrationRequest
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
