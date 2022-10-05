using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAPA_PRESENTACION.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BajaProductoController : ControllerBase
    {
        public BajaProductoController()
        {
            AuthNetCore.LoginIn("admin", "12341234");
        }

        [HttpPost]
        //Vista en base de datos pendiente
        public Object GetTblProductoBaja(TblProductoBaja obj)
        {
            return obj.Get<TblProductoBaja>();
        }

        public Object SaveTblProductoBaja(TblProductoBaja obj)
        {
            return obj.SaveBaja();
        }
    }
}
