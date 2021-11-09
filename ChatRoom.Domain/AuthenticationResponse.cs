using System;
using System.Collections.Generic;
using System.Text;

namespace ChatRoom.Domain
{
    public class AuthenticationResponse
    {
        public string UserName { get; set; }
        public string Email { get; set; }

        public Guid Id { get; set; }
    }
}
