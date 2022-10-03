using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_DATOS
{
    public abstract class GDatosAbstract
    {
        protected IDbConnection SQLMCon;
        protected IDbTransaction dbTransacion;
        protected bool EnTransaccion;

        protected abstract IDbConnection CrearConexion(string cadena);
        protected abstract IDbCommand ComandoSql(string comandoSql, IDbConnection connection);
        protected abstract IDataAdapter CrearDataAdapterSql(string comandoSql, IDbConnection connection);
        protected abstract IDataAdapter CrearDataAdapterSql(IDbCommand comandoSql);

        protected abstract List<EntityProps> DescribeEntity(string entityNane);
        protected abstract private DataTable BuildTable(object Inst, ref string CondSQL);
        protected abstract string BuildInsertQueryByObjet(object Inst);
        protected abstract string BuildUpdateQueryByObject(object Inst, string WhereProp);
        protected abstract string BuildUpdateQueryByObject(object Inst, string[] WhereProps);
        protected abstract string BuildDeleteQuery(object Inst);

        public object ExcuteSqlQuery(string strQuery)
        {
            var com = ComandoSql(strQuery, SQLMCon);
            var scalar = com.ExecuteScalar();

            SQLMCon.Close();

            if (scalar == (object)DBNull.Value) return true;
            else return Convert.ToInt32(scalar);

        }

        //Insercion de un objecto 
        public Object InsertObject(Object Inst)
        {
            try
            {
                SQLMCon.Open();

                string strQuery = BuildInsertQueryByObjet(Inst);
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }

        //Para actualizar
        public Object UpdateObject(Object Inst, string[] whereParams)
        {
            try
            {
                SQLMCon.Open();

                string strQuery = BuildUpdateQueryByObject(Inst, whereParams);
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }

        //Para actualizar
        public Object UpdateObject(Object Inst, string whereParam)
        {
            try
            {
                SQLMCon.Open();

                string strQuery = BuildUpdateQueryByObject(Inst, whereParam);
                return ExcuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }

        //Para Eliminar registro
        public Object Delete(Object Inst)
        {
            string strQuery = BuildDeleteQuery(Inst);
            return ExcuteSqlQuery(strQuery);
        }

        public DataTable TraerDatosSQL(string queryString)
        {
            DataSet ObjDS = new DataSet();
            CrearDataAdapterSql(queryString, SQLMCon).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();

        }

        public DataTable TraerDatosSQL(IDbCommand Command)
        {
            DataSet ObjDS = new DataSet();
            CrearDataAdapterSql(Command).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();
        }

        public List<T> TakeList<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, ref CondSQL);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }

        public T TakeObject<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, ref CondSQL);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD[0];
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }

        protected List<T> ConvertDataTable<T>(DataTable dt, Object Inst)
        {
            List<T> data = new List<T>();

            foreach (DataRow dr in dt.Rows)
            {
                T obj = ConvertRow<T>(Inst, dr);
                data.Add(obj);
            }
            return data;
        }

        private static T ConvertRow<T>(object Inst, DataRow dr)
        {
            var obj = Activator.CreateInstance<T>();

            Type temp = Inst.GetType();

            foreach (DataColumn column in dr.Table.Columns)
            {
                if (!string.IsNullOrEmpty(dr[column.ColumnName].ToString()))
                {
                    foreach (PropertyInfo pro in temp.GetProperties())
                    {
                        if (pro.Name == column.ColumnName)
                        {
                            pro.SetValue(obj, GetValue(dr[column.ColumnName], pro.PropertyType));
                        }
                        else continue;
                    }
                }
                else continue;

            }
            return obj;
        }

        private static Object GetValue(Object DefaultValue, Type type)
        {
            string Literal = DefaultValue.ToString();

            if (Literal == null || Literal == "" || Literal == string.Empty) return DefaultValue;
            IConvertible obj = Literal;

            Type u = Nullable.GetUnderlyingType(type);
            if (u != null)
            {
                return (obj == null) ? DefaultValue : Convert.ChangeType(obj, u);
            }
            else
            {
                return Convert.ChangeType(obj, type);
            }

        }

    }
}
