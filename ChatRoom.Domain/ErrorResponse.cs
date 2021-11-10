using System;
using System.Collections.Generic;
using System.Text;

namespace ChatRoom.Domain
{
    public class ErrorResponse
    {
        public int Code { get; set; }

        public string Description { get; set; }
    }
}
