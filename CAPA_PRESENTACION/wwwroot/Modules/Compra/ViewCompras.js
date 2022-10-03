import { TableComponet } from "../../CoreComponents/TableComponent.js";
import { ViewCompra } from "../../Model/ViewDBModels.js";
import { AjaxTool, Render } from "../util.js";

window.onload = async () => {
    Title("Modulo compra", "h1");

    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [{
            tagName: "input",
            type: "button",
            className: "btn_primary",
            value: "Nueva Compra",
            onclick: async () => {
                //Modal de formulario de compra...
                window.location = "./CrearCompra";
            }
        }]
    }));

    Title("Historial de Compras", "h2");

    const mycompras = await AjaxTool.PostResquest("../api/ModuloCompra/MisCompras");

    AppMain.append(new TableComponet({
        Dataset: mycompras,
        ModelObject: new ViewCompra(),
        Functions: [
            {
                name: "Ver detalle", action: async (Compra) => {
                    //Load details compra...
                }
            }
        ]
    }));
}


function Title(value, size) {
    AppMain.append(Render.Create({ tagName: size, innerText: value, class: "header1" }));
}