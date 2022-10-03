using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAPA_PRESENTACION.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ModuloCompraController : ControllerBase
    {
        public ModuloCompraController()
        {
            AuthNetCore.LoginIn("admin", "12341234");
        }

        [HttpPost]
        //Vista en base de datos pendiente
        public Object MisCompras(ViewCompra obj)
        {
            obj.PKEmpleado = AuthNetCore.User.UserId;

            return obj.Get<ViewCompra>();
        }
        public Object GetTblCompra(TblCompra obj)
        {
            return obj.Get<TblCompra>();
        }

        public Object SaveTblCompra(TblCompra obj)
        {
            return obj.SaveCompra();
        }

    }
}
