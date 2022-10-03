using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_DATOS
{
    public class SqlADOConexion
    {
        private static string UserSQLConexion = "";
        public static SqlServerGDatos SQLM;

        public static string DataBaseName = "Distribuidora";
        static string SQLServer = ".";

        static public bool IniciarConexion(string user, string password)
        {
            try
            {
                UserSQLConexion = "Data Source=" + SQLServer + "; Initial Catalog=" +
                    DataBaseName + "; User ID=" + user + ";Password=" + password + "; Encrypt=False";
                SQLM = new SqlServerGDatos(UserSQLConexion);

                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }

    }
}
