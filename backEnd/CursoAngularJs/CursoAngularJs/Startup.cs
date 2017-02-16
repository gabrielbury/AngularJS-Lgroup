
using System.Runtime.Remoting.Contexts;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http;
using Microsoft.Owin.Cors;
using Newtonsoft.Json.Serialization;
using Owin;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin;
using System;
using CursoAngularJs.Providers;

namespace CursoAngularJs
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //É esta variavel que iremos configurar e colocá-la em memória
            var config = new HttpConfiguration();

            //Configurar rota
            ConfigRoute(config);

            //Configurar formato de retorno
            ConfigureFormat(config);

            //Configurar Cors
            EnableCors(app);

            //Configurar a parte de autenticação
            ConfigureOauth(app);

            //Colocando as configurações do backend no Middleware do WebApi
            app.UseWebApi(config);
        }

        //IAppBuilder => é um global que irá configurar as requisições
        //Criar um token (bearer => jwt)
        //Middlewares de autenticação
        public void ConfigureOauth(IAppBuilder app)
        {

            //objeto de configuração do UseOAuthAuthorizationServer
            // namespace => using Microsoft.Owin.Security.OAuth;
            var options = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true, //Aceita requisiçoes nao seguras
                TokenEndpointPath = new PathString("/api/login"), //local de autenticação (virtual)
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1), //tempo de Expiração
                Provider = new LgroupOAuthAuthorizationServerProvider() //Classe de autenticação. Quando o usuario acessar /api/login=>
 
                //Será redirecionado para a classe provider
            };

            //O middleware que chamará o provider (classe) de autenticação
            //Nele definiremos tempo de expiração, caminho do login etc.
            app.UseOAuthAuthorizationServer(options);

            //irá retornar o token gerado pelo UseOAuthAuthorizationServer
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

        }

        public void EnableCors(IAppBuilder app)
        {
            //var corsPolice = new CorsPolicy()
            //{
            //    AllowAnyMethod = true
            //};
            //corsPolice.Origins.Add("url");

            //var option = new CorsOptions()
            //{
            //    PolicyProvider = new CorsPolicyProvider()
            //    {
            //        PolicyResolver = context => Task.FromResult(corsPolice)
            //    }
            //};

            ////Habilitar Tudo
            //app.UseCors(option);
            app.UseCors(CorsOptions.AllowAll);
        }

        public void ConfigureFormat(HttpConfiguration config)
        {
            //Definir que o retorno sera camelCase: ewewDweweQdsA 
            //Removendo o formato xml;
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            //resgantando as configurações de serializacao
            //Newtonsoft.Json.Serialization;
            var settings = config.Formatters.JsonFormatter.SerializerSettings;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        public void ConfigRoute(HttpConfiguration config)
        {
            //Habilitar a rota
            config.MapHttpAttributeRoutes();

            //Configurar o roteamento
            //Para configurar a rota
            //Preciso de um nome
            //Preciso de um padrão de rota
            //http://localhost:2234/api/usuario => Get
            config.Routes.MapHttpRoute("Default", 
                "api/{controller}/{id}", 
                new { id = RouteParameter.Optional});
        }
    }
}
