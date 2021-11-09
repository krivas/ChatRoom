

using Microsoft.AspNetCore.Identity;

namespace ChatRoom.Data
{
    public class ApplicationUser :IdentityUser
    {
        public string FirstName { get; set; }
    }
}