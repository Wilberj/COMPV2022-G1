import { TableComponet } from "../../../CoreComponents/TableComponent.js";
import { TblProducto } from "../../../Model/DatabaseModel.js";
import { AjaxTool } from "../../util.js";

class AddProducto extends HTMLElement {
    constructor(action = () => { }) {
        super();
        this.Dataset = [];
        this.action = action;
        this.Draw();
    }

    connectedCallBack() { }

    Draw = async () => {
        this.Dataset = await AjaxTool.PostResquest("../api/AdminCatalogos/GetTblProducto");
        this.Table = new TableComponet({
            ModelObject: new TblProducto(),
            Dataset: this.Dataset,
            Functions: [
                {
                    name: "Seleccionar", action: async (dato) => {
                        this.action(dato);
                    }
                }
            ]
        });

        this.append(this.Table);
    }
}

customElements.define('w-addproduct', AddProducto);
export { AddProducto }