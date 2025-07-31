using CoreBackend.BLLayer.Service;
using CoreBackend.DataLayer.RequestModel;
using CoreBackend.DataLayer.ResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CoreBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IConfiguration _configuration;

        // ✅ Constructor injection of AuthService
        public AuthController(AuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);
            if (!result.Success)
                return BadRequest(new { result.Message });

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var jwtSecret = _configuration["Jwt:Secret"];
            var result = await _authService.LoginAsync(request, jwtSecret);

            if (!result.Success)
                return Unauthorized(result);

            return Ok(result);
        }

        [HttpGet("validate")]
        public IActionResult ValidateToken()
        {
            return Ok(new { status = true, message = "Token is valid." });
        }


    }
}
