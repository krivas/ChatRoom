using System.ComponentModel.DataAnnotations;

namespace ChatRoom.Domain
{
    public class AuthenticationRequest
    {

        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
