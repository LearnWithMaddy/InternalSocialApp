using CoreBackend.DataLayer.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CoreBackend.DataLayer.Repository
{
    public class AuthRepository
    {
        private readonly ApplicationDbContext _db;

        public AuthRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<bool> UserExistsAsync(string email, string username)
        {
            return await _db.Users.AnyAsync(u => u.Email == email || u.Username == username);
        }

        public async Task<bool> CreateUserAsync(User user)
        {
            _db.Users.Add(user);
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<User?> GetUserByEmailOrUsernameAsync(string identifier)
        {
            return await _db.Users
                            .Include(u => u.Role)
                            .FirstOrDefaultAsync(u => u.Email == identifier || u.Username == identifier);
        }
    }
}
