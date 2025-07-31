using CoreBackend.BLLayer.Helper;
using CoreBackend.DataLayer.Model;
using CoreBackend.DataLayer.Repository;
using CoreBackend.DataLayer.RequestModel;
using CoreBackend.DataLayer.ResponseModel;
using System;
using System.Threading.Tasks;

namespace CoreBackend.BLLayer.Service
{
    public class AuthService
    {
        private readonly AuthRepository _repo;

        public AuthService(AuthRepository repo)
        {
            _repo = repo;
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                bool exists = await _repo.UserExistsAsync(request.Email, request.Username);
                if (exists)
                    throw new InvalidOperationException("Email or username already exists.");

                var hashedPassword = CommonHelper.HashPassword(request.Password);

                var newUser = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    HashedPassword = hashedPassword,
                    RoleId = 1 // Default: User role
                };

                bool success = await _repo.CreateUserAsync(newUser);
                if (!success)
                    throw new Exception("Failed to create user account.");

                return new RegisterResponse
                {
                    Success = true,
                    Message = "User registered successfully."
                };
            }
            catch (Exception ex)
            {
                // Let global handler log and return a clean error response
                throw new Exception("Registration failed. " + ex.Message, ex);
            }
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request, string jwtSecret)
        {
            try
            {
                var user = await _repo.GetUserByEmailOrUsernameAsync(request.Username);
                if (user == null)
                {
                    return new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid credentials.",
                        Token = null
                    };
                }

                bool passwordValid = CommonHelper.VerifyPassword(request.Password, user.HashedPassword);
                if (!passwordValid)
                {
                    return new LoginResponse
                    {
                        Success = false,
                        Message = "Invalid credentials.",
                        Token = null
                    };
                }

                string token = JwtHelper.GenerateJwtToken(user, jwtSecret);

                return new LoginResponse
                {
                    Success = true,
                    Message = "Login successful.",
                    Token = token
                };
            }
            catch (Exception ex)
            {
                // Log error as needed
                return new LoginResponse
                {
                    Success = false,
                    Message = "Login failed. " + ex.Message,
                    Token = null
                };
            }
        }
    }
}

