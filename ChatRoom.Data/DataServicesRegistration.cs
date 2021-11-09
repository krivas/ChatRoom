

using ChatRoom.Data.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.DependencyInjection;


namespace ChatRoom.Data
{
    public static class DataServicesRegistration
    {
        public static void AddDataServicesRegistration(this IServiceCollection services)
        {
            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddDbContext<ApplicationContext>(opt => opt.UseSqlServer("Server=KEVIN-PC\\SQLEXPRESS;Database=ChatRoom;Trusted_Connection=True;"));
            services.AddIdentity<ApplicationUser,IdentityRole>(cfg=> cfg.User.RequireUniqueEmail =true) .AddEntityFrameworkStores<ApplicationContext>();

        }
    }
}
