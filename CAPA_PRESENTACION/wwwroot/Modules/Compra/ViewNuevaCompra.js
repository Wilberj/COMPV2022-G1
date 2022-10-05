import { FormComponent } from "../../CoreComponents/FormComponent.js";
import { ModalComponent } from "../../CoreComponents/ModalComponent.js";
import { TableComponet } from "../../CoreComponents/TableComponent.js";
import { TblCompra, TblDetalleCompra } from "../../Model/DatabaseModel.js";
import { AjaxTool, Render } from "../util.js";
import { AddDetalleStock } from "./Components/AddDetalleStock.js";
import { AddProducto } from "./Components/AddProducto.js";

window.onload = async () => {

    const StockDetalle = [];
    const DetalleCompra = [];

    const NuevaCompra = {
        SubTotal: "",
        ViewStock: StockDetalle
    };

    Title("Nueva Compra", "h1");
    
    //Lista plegable, proveedor y empleado
    const ListProveedor = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatProveedor");
    const ListEmpleado = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatEmpleado");

    const FormCompra = new FormComponent({
        EditObject: NuevaCompra,
        Model: new TblCompra({
            PKProveedor: {
                type: "select",
                Dataset: ListProveedor.map(c => ({ id: c.PKProveedor, desc: c.NombreProveedor }))
            },
            PKEmpleado: {
                type: "select",
                Dataset: ListEmpleado.map(c => ({ id: c.PKEmpleado, desc: c.NombreEmpleado }))
            }

        })
    });

    const BtnGuardar = Render.Create({
        tagName: "input",
        type: "button",
        className: "btn_primary",
        value: "Guardar Compra",
        onclick: async () => {
            //console.log(NuevaCompra);
            const response = await AjaxTool.PostResquest("../api/ModuloCompra/SaveTblCompra", NuevaCompra); 

            if (response) {
                window.location = "./Compra";

                alert("Compra realizada con exito");
            }
        }
    });

    AppMain.append(FormCompra, BtnGuardar);

    Title("Agregar detalle de compra", "h2");

    const table_detalle = new TableComponet({
        ModelObject: new TblDetalleCompra(),
        Dataset: DetalleCompra,
        Functions: [{
            name: "Remover", action: async (detalle) => {
                const details = DetalleCompra.find(x => x.PKProducto == detalle.PKProducto);

                if (details != null) {
                    DetalleCompra.splice(DetalleCompra.indexOf(details), 1);
                    StockDetalle.splice(StockDetalle.indexOf(details), 1);


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

                if (DetalleCompra.filter(x => x.PKProducto == producto.PKProducto).length > 0) {
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
                    NuevaCompra.SubTotal = 0;
                    StockDetalle.forEach(x => {
                        NuevaCompra.SubTotal += x.SubTotal 
                    })

                    FormCompra.DrawFormCompnent(NuevaCompra);
                }
                );

                AppMain.append(DetalleComp);

            }), "Seleccionar producto");

            AppMain.append(Modal);
        }
    }));

    AppMain.append(table_detalle);
   
}


function Title(value, size) {
    AppMain.append(Render.Create({ tagName: size, innerText: value, class: "header1" }));
}