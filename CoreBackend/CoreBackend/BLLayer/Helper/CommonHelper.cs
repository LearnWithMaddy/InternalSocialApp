using BCrypt.Net;


namespace CoreBackend.BLLayer.Helper
{
    public static class CommonHelper
    {
        public static string HashPassword(string plainPassword)
        {
            return BCrypt.Net.BCrypt.HashPassword(plainPassword);
        }

        public static bool VerifyPassword(string input, string hashed)
        {
            return BCrypt.Net.BCrypt.Verify(input, hashed);
        }

    }
}
