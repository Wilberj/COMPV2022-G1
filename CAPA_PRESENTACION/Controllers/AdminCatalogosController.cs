using CAPA_NEGOCIO.MODEL;
using CAPA_NEGOCIO.SECURITY;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAPA_PRESENTACION.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminCatalogosController : ControllerBase
    {

        public AdminCatalogosController()
        {
            AuthNetCore.LoginIn("admin", "12341234");
        }

        #region "Catalogo Categorias"

        [HttpPost]
        public Object GetCatCategoria(CatCategoria obj)
        {
            return obj.Get<CatCategoria>();
        }
        public Object SaveCatCategoria(CatCategoria obj)
        {
            obj.PKCategoria = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateCatCategoria(CatCategoria obj)
        {
            return obj.Update("PKCategoria");
        }

        #endregion

        #region "Catalogo Unidad Medida"
        public Object GetCatUnidadMedida(CatUnidadMedida obj)
        {
            return obj.Get<CatUnidadMedida>();
        }
        public Object SaveCatUnidadMedida(CatUnidadMedida obj)
        {
            obj.PKUnidadMedida = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateCatUnidadMedida(CatUnidadMedida obj)
        {
            return obj.Update("PKUnidadMedida");
        }
        #endregion

        #region "Catalogo Presentacion"
        public Object GetCatPresentacion(CatPresentacion obj)
        {
            return obj.Get<CatPresentacion>();
        }
        public Object SaveCatPresentacion(CatPresentacion obj)
        {
            obj.PKPresentacion = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateCatPresentacion(CatPresentacion obj)
        {
            return obj.Update("PKPresentacion");
        }
        #endregion

        #region "Catalogo Marca"
        public Object GetCatMarca(CatMarca obj)
        {
            return obj.Get<CatMarca>();
        }
        public Object SaveCatMarca(CatMarca obj)
        {
            obj.PKMarca = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateCatMarca(CatMarca obj)
        {
            return obj.Update("PKMarca");
        }
        #endregion

        #region "Catalogo Bodega"
        public Object GetCatBodega(CatBodega obj)
        {
            return obj.Get<CatBodega>();
        }
        public Object SaveCatBodega(CatBodega obj)
        {
            obj.PKBodega = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateCatBodega(CatBodega obj)
        {
            return obj.Update("PKBodega");
        }
        #endregion

        #region "Catalogo Proveedor"
        public Object GetCatProveedor(CatProveedor obj)
        {
            return obj.Get<CatProveedor>();
        }
        public Object SaveCatProveedor(CatProveedor obj)
        {
            obj.PKProveedor = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateCatProveedor(CatProveedor obj)
        {
            return obj.Update("PKProveedor");
        }
        #endregion

        #region "Catalogo Empleado"
        public Object GetCatEmpleado(CatEmpleado obj)
        {
            return obj.Get<CatEmpleado>();
        }
        public Object SaveCatEmpleado(CatEmpleado obj)
        {
            obj.PKEmpleado = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateCatEmpleado(CatEmpleado obj)
        {
            return obj.Update("PKEmpleado");
        }
        #endregion

        #region "Tbl Producto"
        public Object GetTblProducto(TblProducto obj)
        {
            return obj.Get<TblProducto>();
        }
        public Object SaveTblProducto(TblProducto obj)
        {
            obj.PKProducto = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateTblProudcto(TblProducto obj)
        {
            return obj.Update("PKProducto");
        }
        #endregion

        #region "Tbl Conversion"
        public Object GetTblConversionUnits(TblConversionUnits obj)
        {
            return obj.Get<TblConversionUnits>();
        }
        public Object SaveTblConversionUnits(TblConversionUnits obj)
        {
            obj.PKConversionUnits = (Int32)obj.Save();

            return obj;
        }
        public Object UpdateTblConversionUnits(TblConversionUnits obj)
        {
            return obj.Update("PKConversionUnits");
        }
        #endregion


    }
}
