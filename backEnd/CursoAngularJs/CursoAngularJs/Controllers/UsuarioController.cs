using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CursoAngularJs.Models;

namespace CursoAngularJs.Controllers
{
    //Exemplo: http://localhost:1234/api/usuario
    [Authorize] //Somente pessoas autorizadas serão capazes de acessar esta controller
    public class UsuarioController : ApiController
    {
        public HttpResponseMessage Get()
        {
            //vamos retornar os usuarios
            var usuarios = UsuarioModel.GetAll();
            //Retornando para o usuario
            return Request.CreateResponse(HttpStatusCode.OK, usuarios);
        }

        //referenciar using System.Linq;
        public HttpResponseMessage Get(int id)
        {
            //vamos retornar os usuarios
            var usuario = UsuarioModel.GetAll().FirstOrDefault(x=>x.Id == id);
            //Retornando para o usuario
            return Request.CreateResponse(HttpStatusCode.OK, usuario);
        }

        public HttpResponseMessage Post(UsuarioModel usuario)
        {
            HttpResponseMessage response;

            try
            {
                var usuarios = UsuarioModel.Add(usuario);
                response = Request.CreateResponse(HttpStatusCode.OK, usuarios);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }

            return response;
        }
    }
}
