using CoreBackend.BLLayer.Service;
using CoreBackend.DataLayer.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace CoreBackend.BLLayer.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterApplicationServices(this IServiceCollection services)
        {
            // Services
            services.AddScoped<AuthService>();
            // Add more services like:
            // services.AddScoped<UserService>();
             services.AddScoped<PostService>();

            // Repositories
            services.AddScoped<AuthRepository>();
            // services.AddScoped<UserRepository>();
             services.AddScoped<PostRepository>();

            return services;
        }
    }
}
