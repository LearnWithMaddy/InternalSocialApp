using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CoreBackend.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected int GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                throw new UnauthorizedAccessException("Invalid or missing user ID in token.");
            return userId;
        }
    }
}
