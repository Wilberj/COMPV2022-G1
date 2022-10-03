using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class ViewStock : EntityClass
    {
        public int? PKCompra { get; set; }
        public int? PKProducto { get; set; }
        public int? PKBodega { get; set; }
        public string? Descripcion { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public Decimal? Descuento { get; set; }
        public Decimal? Cantidad { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Total { get; set; }
        public Decimal? SubTotal { get; set; }
        public bool? EstadoDetalleCompra { get; set; }
        public string? UnidadMedidaCompra { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public DateTime? FechaIngreso { get; set; }
        public int? ExistenciasMinimas { get; set; }
        public int? UnidadesExistencias { get; set; }
        public int? FKMarca { get; set; }
        public int? FKUnidadMedida { get; set; }
        public int? FKPresentacion { get; set; }
        public Decimal? PrecioVenta { get; set; }

        public Object SaveDetalleCompra(int? key)
        {
            var detalle = new TblDetalleCompra();

            detalle.PKCompra = key;
            detalle.PKProducto = this.PKProducto;
            detalle.Descripcion = this.Descripcion;
            detalle.UnidadMedidaCompra = this.UnidadMedidaCompra;
            detalle.PrecioCompra = this.PrecioCompra;
            detalle.Cantidad = this.Cantidad;
            detalle.Descuento = this.Descuento;
            detalle.IVA = this.IVA;
            detalle.SubTotal = this.SubTotal;
            detalle.Total = this.Total;
            detalle.EstadoDetalleCompra = this.EstadoDetalleCompra;

            detalle.PKDetalleCompra = (Int32)detalle.Save();

            return true;
        }

        public Object SaveInventario()
        {
            var inventario = new TblProductosBodega();

            inventario.FKPresentacion = this.FKPresentacion;
            inventario.FKMarca = this.FKMarca;
            inventario.PKProducto = this.PKProducto;
            inventario.FKUnidadMedida = this.FKUnidadMedida;
            inventario.PKBodega = this.PKBodega;

            inventario.FechaIngreso = this.FechaIngreso;
            inventario.UnidadesExistencias = (short?)this.UnidadesExistencias;
            inventario.ExistenciasMinimas = this.ExistenciasMinimas;
            inventario.FechaVencimiento = this.FechaVencimiento;

            inventario.PKProductoBodega = (Int32)inventario.Save();

            return true;
        }

        public Object SavePrice(int? prov)
        {
            var p = new TblProductosProveedores();

            p.PKProducto = this.PKProducto;
            p.PKProveedor = prov;
            p.Descuento = (int?)this.Descuento;
            p.PrecioCompra = this.PrecioCompra;
            p.PrecioVenta = this.PrecioVenta;

            p.Save();


            return true;
        }

    }

    public class ViewCompra : EntityClass
    {
        public string? NombreProveedor { get; set; }
        public string? NombreEmpleado { get; set; }
        public int? PKCompra { get; set; }
        public DateTime? FechaCompra { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? Total { get; set; }
        public bool? EstadoCompra { get; set; }
        public int? PKEmpleado { get; set; }
    }

}

public class ViewMercancias : EntityClass
{
    public int? PKProducto { get; set; }
    public int? PKBodega { get; set; }
    public short? UnidadesExistencias { get; set; }
    public DateTime? FechaIngreso { get; set; }
    public DateTime? FechaVencimiento { get; set; }
    public int? ExistenciasMinimas { get; set; }
    public int? FKMarca { get; set; }
    public int? FKUnidadMedida { get; set; }
    public int? FKPresentacion { get; set; }
    public Decimal? PrecioVenta { get; set; }
}
