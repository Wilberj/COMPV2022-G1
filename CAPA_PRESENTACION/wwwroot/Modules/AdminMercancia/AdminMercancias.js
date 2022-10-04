import { TableComponet } from "../../CoreComponents/TableComponent.js";
import { /*ViewCompra,*/ ViewMercancias } from "../../Model/ViewDBModels.js";
import { AjaxTool, Render } from "../util.js";

window.onload = async () => {
    Title("Modulo de Administracion de mercancias", "h1");

    AppMain.append(Render.Create({
        class: "FormContainer2",
        children: [{
            tagName: "input",
            type: "button",
            className: "btn_primary",
            value: "Productos dados de baja",
            onclick: async () => {
                //Modal de formulario de compra...
                window.location = "./ProductoBajas";
            }
        }]
    }));

    const list_mercancias = await AjaxTool.PostResquest("../api/ModuloMercancias/GetMercancias");

    AppMain.append(new TableComponet({
        Dataset: list_mercancias,
        ModelObject: new ViewMercancias(),
        Functions: [
            {
                name: "Ver", action: async (value) => {
                    //Load details compra...
                }
            }
        ]
    }));
}


function Title(value, size) {
    AppMain.append(Render.Create({ tagName: size, innerText: value, class: "header1" }));
}