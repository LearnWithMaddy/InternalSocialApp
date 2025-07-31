using Microsoft.AspNetCore.Mvc;

namespace CoreBackend.Controllers
{
    [Route("/")]
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            // Optional: redirect to Swagger UI
            return Redirect("/swagger");
        }
    }
}
