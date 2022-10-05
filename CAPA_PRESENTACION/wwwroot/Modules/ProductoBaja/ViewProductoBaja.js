import { TableComponet } from "../../CoreComponents/TableComponent.js";
import { TblProductoBaja } from "../../Model/DatabaseModel.js";
import { AjaxTool, Render } from "../util.js";

window.onload = async () => {
    Title("Modulo compra", "h1");

    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [{
            tagName: "input",
            type: "button",
            className: "btn_primary",
            value: "Dar de baja producto",
            onclick: async () => {
                //Modal de formulario dar baja producto...
                window.location = "./DarBajaProducto";
            }
        }]
    }));

    Title("Historial de productos dados de baja", "h2");

    const response = await AjaxTool.PostResquest("../api/BajaProducto/GetTblProductoBaja");

    AppMain.append(new TableComponet({
        Dataset: response,
        ModelObject: new TblProductoBaja(),
        Functions: [
            {
                name: "Ver detalle", action: async (obj) => {
                    //Load details ...
                }
            }
        ]
    }));
}


function Title(value, size) {
    AppMain.append(Render.Create({ tagName: size, innerText: value, class: "header1" }));
}