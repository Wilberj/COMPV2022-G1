using CAPA_DATOS;
using CAPA_NEGOCIO.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.SECURITY
{
    public class AuthNetCore
    {
        static public UserModel User;
        static public bool VerifyAuthenticate()
        {
            if (SqlADOConexion.SQLM == null)
            {
                SqlADOConexion.SQLM = null;
                return false;
            }

            return true;
        }
        static public bool LoginIn(string user, string password)
        {
            try
            {
                SqlADOConexion.IniciarConexion(user, password);

                User = new UserModel(
                    new CatEmpleado() { NombreEmpleado = user }.FindObject<CatEmpleado>()
                    );

                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }

    public class UserModel
    {
        public UserModel(CatEmpleado User)
        {
            this.user = User.NombreEmpleado;
            this.success = true;
            this.UserId = User.PKEmpleado;
            this.Roles = new List<string> { "EMPLEADO", "ADMON", "USUARIO" };
        }

        public string user { get; set; }
        public int? UserId { get; set; }
        public bool success { get; set; }
        public List<String> Roles { get; set; }
    }
}
