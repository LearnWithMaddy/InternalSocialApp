using Microsoft.Extensions.DependencyInjection;

namespace CoreBackend.BLLayer.Configuration
{
    public static class CorsConfig
    {
        private const string FrontendOrigin = "http://localhost:5173"; // React dev origin

        public static void AddCustomCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontendDev", policy =>
                {
                    policy.WithOrigins(FrontendOrigin)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });
        }
    }
}
