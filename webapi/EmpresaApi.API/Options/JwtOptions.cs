﻿using Microsoft.Extensions.Options;

namespace EmpresaApi.API.Options
{
    public class JwtOptions : IOptions<JwtOptions>
    {
        public string Issuer { get; init; } = string.Empty;
        public string Audience { get; init; } = string.Empty;
        public string SecretKey { get; init; } = string.Empty;

        public JwtOptions Value => this;
    }
}
