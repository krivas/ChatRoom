using ChatRoom.Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ChatRoom.Data.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthenticationService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            var response = new AuthenticationResponse();
            response.Code = 0;

            if (user == null)
            {
                response.Description=$"User with {request.Email} not found.";
                return response;
            }

            var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                response.Description=$"Credentials for '{request.Email} aren't valid'.";
                return response;
            }

            response.Id = Guid.Parse(user.Id);
            response.Email = user.Email;
            response.UserName = user.UserName;
            response.Code = 1;
           
            return response;
        }

        public async Task<RegistrationResponse> RegisterAsync(RegistrationRequest request)
        {
            var existingUser = await _userManager.FindByNameAsync(request.UserName);
            var response = new RegistrationResponse();
            response.Code = 0;
            if (existingUser != null)
            {
                response.Description = $"Username '{request.UserName}' already exists.";
                return response;
            }

            var user = new ApplicationUser
            {
                Email = request.Email,
                UserName = request.UserName,
                EmailConfirmed = true
            };

            var existingEmail = await _userManager.FindByEmailAsync(request.Email);

            if (existingEmail == null)
            {
                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    response.UserId = user.Id;
                    response.Code = 1;
                    return response;
                }
                else
                {
                    foreach (IdentityError error in result.Errors)
                    {
                        response.Description += $"{error.Description} \n";
                    }
                    return response;
                }
            }
            else
            {
                response.Description= $"Email {request.Email } already exists.";
                return response;
            }
        }
    }
}