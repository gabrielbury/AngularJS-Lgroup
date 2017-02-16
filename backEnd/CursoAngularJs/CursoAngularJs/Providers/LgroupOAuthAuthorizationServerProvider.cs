using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace CursoAngularJs.Providers
{
    //Esta classe irá autenticar o usuario
    //Será responsavel por receber o usuario e a senha e verificar
    // se o usuário existe
    public class LgroupOAuthAuthorizationServerProvider
        : OAuthAuthorizationServerProvider
    {
        //Validar o cliente => validar quem esta chegando!!!
        //override => Extender o método pai!! Extendendo o comportamento do método pai.
        public override Task ValidateClientAuthentication(
            OAuthValidateClientAuthenticationContext context)
        {
            //Vai deixar passar qualquer origem!!
            context.Validated();

            //Retornando uma tarefa nula
            return Task.FromResult<object>(null);
        }

        //Validar o usuario e a senha
        //Iremos criar o token a partir deste método
        public override Task GrantResourceOwnerCredentials(
            OAuthGrantResourceOwnerCredentialsContext context){

            //Virá dentro do body da requisição (Protocolo OAuth2)
            var usuario = context.UserName;
            var senha = context.Password;

            //Regra de negócio
            if (usuario != "ffonseca" || senha != "123456")
                context.SetError("invalid_grant", "usuário não encontrado!");
            else
            {
                //Definir uma identidade no sistema para o usuário!!
                //Definir quem somos
                var claim1 = new Claim(ClaimTypes.Name, "Fábio Fonseca");

                //Definir o que podemos
                var claim2 = new Claim(ClaimTypes.Role, "Administrador");

                //Precisamos criar um token colocar nossa identidade nele
                var claims = new List<Claim>(){
                    claim1, claim2
                };
                //Criamos agora uma identidade para o usuario a partir de suas 
                //declarações (claims)
                var identidade = new ClaimsIdentity(claims, context.Options.AuthenticationType);

                //Definindo algumas propriedades que irão junto do token (via response)
                var propriedades = GetProperties(usuario, identidade.Claims);

                //Token
                var token = new AuthenticationTicket(identidade, propriedades);

                //Retoná-lo validado
                context.Validated(token);
            }

            return Task.FromResult<object>(null);
        }

        //Para que o GetPropert funcione é necessário sobreescrever o método abaixo
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var propert in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(propert.Key, propert.Value);
            }
            return Task.FromResult<object>(null);
        }
        //Mostrando itens adicionais no response (quando gerar o token)
        private static AuthenticationProperties GetProperties(string usuario,
            IEnumerable<Claim> claims)
        {
            IDictionary<string, string> dict = new Dictionary<string, string>()
            {
                {"UsuarioNome", usuario},
            };

            foreach (var item in claims)
            {
                dict.Add(item.Type.ToString(), item.Value);
            }

            return new AuthenticationProperties(dict);
        }

    }
}