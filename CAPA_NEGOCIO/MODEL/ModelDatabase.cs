using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class CatPresentacion : EntityClass
    {
        public int? PKPresentacion { get; set; }
        public string? NombrePresentacion { get; set; }
        public string? DetallePresentacion { get; set; }
        public bool? EstadoPresentacion { get; set; }
    }

    public class TblProductosBodega : EntityClass
    {
        public int? PKProductoBodega { get; set; }
        public int? PKProducto { get; set; }
        public int? PKBodega { get; set; }
        public short? UnidadesExistencias { get; set; }
        public DateTime? FechaIngreso { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public int? ExistenciasMinimas { get; set; }
        public int? FKMarca { get; set; }
        public int? FKUnidadMedida { get; set; }
        public int? FKPresentacion { get; set; }
    }

    public class TblProductoBaja: EntityClass {
     public int? PKProductoBaja { get; set; }
     public int? FKEmpleado { get; set; }
     public DateTime? FechaBaja { get; set; }
    }
 
    public class TblDetalleProductoBaja: EntityClass {
     public int? PKDetalleProductoBaja { get; set; }
     public int? FKProductoBodega { get; set; }
     public int? DescripcionBaja { get; set; }
     public int? Cantidad { get; set; }
     public int? FKProductoBaja { get; set; }
    }

    public class CatBodega : EntityClass
    {
        public int? PKBodega { get; set; }
        public string? Descripcion { get; set; }
        public string? Ubicacion { get; set; }
    }

    public class CatCategoria : EntityClass
    {
        public int? PKCategoria { get; set; }
        public string? NombreCategoria { get; set; }
        public string? DetalleCategoria { get; set; }
        public bool? EstadoCategoria { get; set; }
    }

    public class CatEmpleado : EntityClass
    {
        public int? PKEmpleado { get; set; }
        public string? NombreEmpleado { get; set; }
        public string? DireccionEmpleado { get; set; }
        public int? TelefonoEmpleado { get; set; }
        public string? EmailEmpleado { get; set; }
        public string? PasswordEmpleado { get; set; }
    }

    public class CatMarca : EntityClass
    {
        public int? PKMarca { get; set; }
        public string? NombreMarca { get; set; }
        public string? DetalleMarca { get; set; }
        public bool? EstadoMarca { get; set; }
    }

    public class CatProveedor : EntityClass
    {
        public int? PKProveedor { get; set; }
        public string? NombreProveedor { get; set; }
        public int? TelefonoProveedor { get; set; }
        public string? DireccionProveedor { get; set; }
        public string? EmailProveedor { get; set; }
        public bool? EstadoProveedor { get; set; }
    }

    public class CatUnidadMedida : EntityClass
    {
        public int? PKUnidadMedida { get; set; }
        public string? Descripcion { get; set; }
        public string? Abreviacion { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblCompra : EntityClass
    {
        public int? PKCompra { get; set; }
        public int? PKProveedor { get; set; }
        public int? PKEmpleado { get; set; }
        public DateTime? FechaCompra { get; set; }
        public Decimal? Descuento { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? Total { get; set; }
        public bool? EstadoCompra { get; set; }
        public List<ViewStock>? ViewStock { get; set; }

        public Object SaveCompra()
        {
            this.PKCompra = (Int32)this.Save();

            if (ViewStock != null)
            {
                foreach (var i in ViewStock)
                {
                    i.SaveDetalleCompra(this.PKCompra);
                    i.SaveInventario();
                    i.SavePrice(this.PKProveedor);
                }
            }

            return true;
        }
    }

    public class TblConversionUnits : EntityClass
    {
        public int? PKConversionUnits { get; set; }
        public int? FKUnidadMedida { get; set; }
        public string? Descripcion { get; set; }
        public string? Abreviacion { get; set; }
        public int? Equivalencia { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblDetalleDevCompra : EntityClass
    {
        public int? PKDetDevCompra { get; set; }
        public int? PKDevCompra { get; set; }
        public int? PKProducto { get; set; }
        public int? Cantidad { get; set; }
        public string? DescripcionDev { get; set; }
    }

    public class TblDetalleDevVenta : EntityClass
    {
        public int? PKDetDevVenta { get; set; }
        public int? PKDevVenta { get; set; }
        public int? PKProducto { get; set; }
        public int? Cantidad { get; set; }
        public string? DescripcionDev { get; set; }
    }

    public class TblDevCompra : EntityClass
    {
        public int? PKDevCompra { get; set; }
        public int? PKProveedor { get; set; }
        public int? PKCompra { get; set; }
        public int? PKEmpleado { get; set; }
        public DateTime? FechaDevolucionCompra { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblDevVenta : EntityClass
    {
        public int? PKDevVenta { get; set; }
        public int? PKVenta { get; set; }
        public int? PKEmpleado { get; set; }
        public DateTime? FechaDevolucionVenta { get; set; }
        public bool? Estado { get; set; }
    }

    public class TblProducto : EntityClass
    {
        public int? PKProducto { get; set; }
        public int? PKCategoria { get; set; }
        public string? NombreProducto { get; set; }
        public bool? EstadoProducto { get; set; }
    }

    public class TblProductosProveedores : EntityClass
    {
        public int? PKProducto { get; set; }
        public int? PKProveedor { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public int? Descuento { get; set; }
        public Decimal? PrecioVenta { get; set; }
    }

    public class TblVenta : EntityClass
    {
        public int? PKVenta { get; set; }
        public int? PKEmpleado { get; set; }
        public string? NombreCliente { get; set; }
        public DateTime? FechaVenta { get; set; }
        public Decimal? Descuento { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Subtotal { get; set; }
        public Decimal? Total { get; set; }
        public bool? EstadoVenta { get; set; }
    }

    public class TblDetalleVenta : EntityClass
    {
        public int? PKDetalleVenta { get; set; }
        public int? PKVenta { get; set; }
        public int? PKProductoBodega { get; set; }
        public string? Descripcion { get; set; }
        public Decimal? Cantidad { get; set; }
        public Decimal? Descuento { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Total { get; set; }
        public string? UnidadMedidaVenta { get; set; }
    }

    public class TblDetalleCompra : EntityClass
    {
        public int? PKDetalleCompra { get; set; }
        public int? PKCompra { get; set; }
        public int? PKProducto { get; set; }
        public string? Descripcion { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public Decimal? Descuento { get; set; }
        public Decimal? Cantidad { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Total { get; set; }
        public Decimal? SubTotal { get; set; }
        public bool? EstadoDetalleCompra { get; set; }
        public string? UnidadMedidaCompra { get; set; }
    }

}
