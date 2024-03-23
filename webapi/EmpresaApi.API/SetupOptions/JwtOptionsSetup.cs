using EmpresaApi.API.Options;
using Microsoft.Extensions.Options;

namespace EmpresaApi.API.SetupOptions
{
    public class JwtOptionsSetup : IConfigureOptions<JwtOptions>
    {
        private readonly IConfiguration _configuration;
        public JwtOptionsSetup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void Configure(JwtOptions options)
        {
            _configuration.GetSection("JwtConfig").Bind(options);
        }
    }
}
