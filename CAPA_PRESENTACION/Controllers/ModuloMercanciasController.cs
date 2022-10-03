using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAPA_PRESENTACION.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ModuloMercanciasController : ControllerBase
    {
        public ModuloMercanciasController()
        {
            AuthNetCore.LoginIn("admin", "12341234");
        }

        [HttpPost]
        //Vista en base de datos pendiente
        public Object GetMercancias(ViewMercancias obj)
        {
            return obj.Get<ViewMercancias>();
        }
    }
}
