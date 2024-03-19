using Microsoft.OpenApi.Models;

namespace EmpresaAPI.Configurations
{
    public static class SwaggerConfiguration
    {
        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Empresa API", Version = "v1" });
                
                //var securityscheme = new openapisecurityscheme
                //{
                //    name = "jwt authentication",
                //    description = "enter jwt bearer token **_only_**",
                //    in = parameterlocation.header,
                //    type = securityschemetype.http,
                //    scheme = "bearer", // must be lowercase
                //    bearerformat = "jwt",
                //    reference = new openapireference
                //    {
                //        id = jwtbearerdefaults.authenticationscheme,
                //        type = referencetype.securityscheme
                //    }
                //};
                //c.addsecuritydefinition(securityscheme.reference.id, securityscheme);
                //    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                //{
                //    {securityScheme, Array.Empty<string>()}
                //});
            });

        }
    }
}
