import { FormComponent } from "../../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../../CoreComponents/ModalComponent.js";
import { TblDetalleCompra } from "../../../Model/DatabaseModel.js";
import { ViewStock } from "../../../Model/ViewDBModels.js";
import { AjaxTool, Render } from "../../util.js";

class AddDetalleStock extends HTMLElement {
    constructor(producto, detalle = () => { }, stock = () => {}) {
        super();
        this.Dataset = [];
        this.producto = producto;

        //Functions retornadas 
        this.detalle = detalle;
        this.stock = stock;

        this.Draw();
    }

    connectedCallBack() { }

    Draw = async () => {

        this.formDetalle = {
            PKProducto: this.producto.PKProducto,
            Descuento: 0
        };

        this.listBodega = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatBodega");
        this.listMarca = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatMarca");
        this.listUnidadMedida = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatUnidadMedida");
        this.listPresentacion = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatPresentacion");
        this.listUnitsConvert = await AjaxTool.PostResquest("../api/AdminCatalogos/GetTblConversionUnits");

        //Creacion de formularo de detalle de compra.
        this.form = new FormComponent({
            containerClass: "InitContainer",
            EditObject: this.formDetalle,
            Model: new ViewStock({
                Descripcion: {
                    type: "text",
                    value: this.producto.NombreProducto
                },
                UnidadMedidaCompra: {
                    type: "select",
                    Dataset: this.listUnitsConvert.map(c => ({ id: c.Descripcion, desc: c.Descripcion }))
                },
                PKBodega: {
                    type: "select",
                    Dataset: this.listBodega.map(c => ({ id: c.PKBodega, desc: c.Descripcion }))
                },
                FKMarca: {
                    type: "select",
                    Dataset: this.listMarca.map(c => ({ id: c.PKMarca, desc: c.NombreMarca }))
                },
                FKUnidadMedida: {
                    type: "select",
                    Dataset: this.listUnidadMedida.map(c => ({ id: c.PKUnidadMedida, desc: c.Descripcion }))
                },
                FKPresentacion: {
                    type: "select",
                    Dataset: this.listPresentacion.map(c => ({ id: c.PKPresentacion, desc: c.NombrePresentacion }))
                }
            })
        });

        this.form.append(Render.Create({
            class: "FormContainer2",
            children: [{
                tagName: "input",
                type: "button",
                className: "btn_primary",
                value: "Agregar",
                onclick: async () => {

                    this.tbldetalle = new TblDetalleCompra();
                    this.equivalencia = await AjaxTool.PostResquest("../api/AdminCatalogos/GetTblConversionUnits", { Descripcion: this.formDetalle.UnidadMedidaCompra });

                    //Calculos de la transaccion realizada.....
                    //this.formDetalle.PKProducto = this.producto.PKProducto;
                    this.formDetalle.UnidadesExistencias = (this.equivalencia[0].Equivalencia * this.formDetalle.Cantidad);
                    //Iva
                    this.formDetalle.IVA = ((this.formDetalle.PrecioCompra * this.formDetalle.Cantidad) * 0.15);
                    this.formDetalle.SubTotal = (this.formDetalle.PrecioCompra * this.formDetalle.Cantidad);
                    this.formDetalle.Total = (this.formDetalle.IVA + this.formDetalle.SubTotal);

                    //Asignacion de los datos del detalle de compra solamente, para visualizar solamente...
                    this.tbldetalle.PKProducto = this.formDetalle.PKProducto;
                    this.tbldetalle.Descripcion = this.formDetalle.Descripcion;
                    this.tbldetalle.UnidadMedidaCompra = this.formDetalle.UnidadMedidaCompra;
                    this.tbldetalle.Cantidad = this.formDetalle.Cantidad;
                    this.tbldetalle.PrecioCompra = this.formDetalle.PrecioCompra;
                    this.tbldetalle.IVA = this.formDetalle.IVA;
                    this.tbldetalle.Descuento = this.formDetalle.Descuento;
                    this.tbldetalle.SubTotal = this.formDetalle.SubTotal;
                    this.tbldetalle.Total = this.formDetalle.Total;
                    this.tbldetalle.EstadoDetalleCompra = this.formDetalle.EstadoDetalleCompra;

                    this.detallemodal.Close();

                    console.log(this.formDetalle);

                    this.detalle(this.tbldetalle);
                    this.stock(this.formDetalle);

                }
            }]
        }));

        this.detallemodal = new ModalComponent(this.form, "Detalle de compra");
        this.append(this.detallemodal);
    }
}

customElements.define('w-adddetallestock', AddDetalleStock);
export { AddDetalleStock }