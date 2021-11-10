using ChatRoom.Data.Services;
using ChatRoom.Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoom.Controllers
{
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
      
        public AccountController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult<AuthenticationResponse>> AuthenticateAsync([FromBody] AuthenticationRequest request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = await _authenticationService.AuthenticateAsync(request);
                       return Ok(response);
                }
                else
                    return StatusCode(400);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegistrationResponse>> RegisterAsync([FromBody]  RegistrationRequest request)
         {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = await _authenticationService.RegisterAsync(request);
                    return Ok(response);
                }
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
  
        }
    }
}
