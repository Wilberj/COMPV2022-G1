import { FormComponent } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent";
import { TblDetalleProductoBaja, TblProductoBaja } from "../../Model/DatabaseModel.js";
import { AjaxTool, Render } from "../util.js";

window.onload = async () => {
    const DetalleBaja = [];

    const NuevaBaja = {
        
    }

    const ListEmpleado = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatEmpleado");

    const Form = new FormComponent({
        EditObject: NuevaBaja,
        Model: new TblProductoBaja({
            FKEmpleado: {
                type: "select",
                Dataset: ListEmpleado.map(c => ({ id: c.PKEmpleado, desc: c.NombreEmpleado }))
            }

        })
    });

    const BtnGuardar = Render.Create({
        tagName: "input",
        type: "button",
        className: "btn_primary",
        value: "Dar baja",
        onclick: async () => {
           
            const response = await AjaxTool.PostResquest("../api/BajaProducto/SaveTblProductoBaja", NuevaBaja);

            if (response) {
                window.location = "./ProductoBajas";

                alert("Bajas realizada con exito");
            }
        }
    });

    AppMain.append(Form, BtnGuardar);


    //////////////////////////////////////////

    Title("Agregar producto a dar de baja", "h2");

    const table = new TableComponet({
        ModelObject: new TblDetalleProductoBaja(),
        Dataset: DetalleBaja,
        Functions: [{
            name: "Remover", action: async (detalle) => {
                const details = DetalleBaja.find(x => x.FKProductoBodega == detalle.FKProductoBodega);

                if (details != null) {

                    //DetalleCompra.splice(DetalleCompra.indexOf(details), 1);
                    //StockDetalle.splice(StockDetalle.indexOf(details), 1);

                    table.DrawTableComponent();

                }
            }
        }]
    });

    table_detalle.filter.append(Render.Create({
        tagName: "input",
        type: "button",
        className: "btn_neutral",
        value: "Agregar producto",
        onclick: async () => {

            const Modal = new ModalComponent(new AddProducto(async (producto) => {

                if (DetalleBaja.filter(x => x.FKProductoBodega == producto.FKProductoBodega).length > 0) {
                    alert("El producto ya esta seleccionado");
                    return;
                }

                //Una ves seleccionado el producto
                Modal.Close();

                const DetalleComp = new AddDetalleStock(producto, async (detalle) => {
                    DetalleCompra.push(detalle);
                    table_detalle.DrawTableComponent();
                },
                    async (stock) => {
                        StockDetalle.push(stock);

                        //NuevaCompra.SubTotal = "8";
                        //FormCompra.FormChange("SubTotal", 8);
                    }
                );

                AppMain.append(DetalleComp);

            }), "Seleccionar producto");

            AppMain.append(Modal);
        }
    }));

    AppMain.append(table_detalle);

    ////////////////////////


}

function Title(value, size) {
    AppMain.append(Render.Create({ tagName: size, innerText: value, class: "header1" }));
}