import { FormComponent } from "./CoreComponents/FormComponent.js";
import { TableComponet } from "./CoreComponents/TableComponent.js";
import { AjaxTool, Render } from "./Modules/util.js";
import { CatCategoria, TblProducto, CatProveedor, CatUnidadMedida, CatPresentacion, CatMarca, CatBodega, TblConversionUnits, CatEmpleado } from "./Model/DatabaseModel.js";
import { ModalComponent } from "./CoreComponents/ModalComponent.js";

window.onload = async () => {
    const values = window.location.search;
    const URLParams = new URLSearchParams(values);
    var catalogo = URLParams.get('cat');

    AppMain.innerHTML = "";
    
    if (catalogo != null) {
        
        switch (catalogo.toString().toLowerCase()) {
            case "categoria":
                Title("Categorias");

                ChargeCatalogo(new CatCategoria());
                break;

            case "unidadmedida":
                Title("Unidades de Medida");

                ChargeCatalogo(new CatUnidadMedida());
                break;

            case "presentacion":
                Title("Presentaciones");

                ChargeCatalogo(new CatPresentacion());
                break;

            case "marca":
                Title("Marcas");

                ChargeCatalogo(new CatMarca());
                break;
              
            case "bodega":
                Title("Bodegas");

                ChargeCatalogo(new CatBodega());
                break;

            case "proveedores":
                Title("Proveedores");

                ChargeCatalogo(new CatProveedor());
                break;

            case "empleados":
                Title("Empleados");

                ChargeCatalogo(new CatEmpleado());
                break;

            case "producto":
                Title("Productos");

                //For list plegable 
                const data1= await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatCategoria");
                
                ChargeCatalogo(new TblProducto(
                    {
                        PKCategoria: {
                            type: "select",
                            Dataset: data1.map(c => ({ id: c.PKCategoria, desc: c.NombreCategoria }))
                        }
                    }
                ));
                break;

            case "conversion":
                Title("Conversiones");

                //For list plegable 
                const data = await AjaxTool.PostResquest("../api/AdminCatalogos/GetCatUnidadMedida");

                ChargeCatalogo(new TblConversionUnits({
                    FKUnidadMedida: {
                        type: "select",
                        Dataset: data.map(c => ({ id: c.PKUnidadMedida, desc: c.Descripcion }))
                    }
                }));
                break;

            default:
                console.log("Ningun catalogo seleccionado :(");
                break;
        }

    }

}

const FormOption = (form, table, action = "Save", Modal) => {
    return Render.Create({
        class: "FormContainer2",
        children: [{
            tagName: "input",
            type: "button",
            className: "btn_primary",
            value: "Guardar",
            onclick: async () => {

                const data = await AjaxTool.PostResquest(
                    "../api/AdminCatalogos/" + action +
                    form.Model.constructor.name,
                    form.FormObject
                );

                console.log(form.FormObject);

                if (data) {
                    if (action == "Save") {
                        table.config.Dataset.push(data);
                    }

                    Modal.Close();
                    table.DrawTableComponent();
                } else {
                    alert("Error");
                }

            }
        }]
    });
}

function ChangeForm(dato, table, action, Model) {
    const form = new FormComponent({
        EditObject: dato,
        Model: Model
    });

    const FormContainer = Render.Create({});
    const Modal = new ModalComponent(FormContainer);

    FormContainer.append(form, FormOption(form, table, action, Modal));
    AppMain.append(Modal);
}

async function ChargeCatalogo(Model){

    const data = await AjaxTool.PostResquest("../api/AdminCatalogos/Get" + Model.constructor.name);

    const table = new TableComponet({
        ModelObject: Model,
        Dataset: data, Functions: [
            {
                name: "Editar", action: async (dato) => {
                    ChangeForm(dato, table, "Update", Model);
                }
            }
        ]
    });

    const NewBtn = {
        tagName: "input",
        type: "button",
        className: "btn_primary",
        value: "Nuevo Registro", onclick: async () => {
            ChangeForm({}, table, "Save", Model);
        }
    };

    AppMain.append(Render.Create({ className: "FormContainer2", children: [NewBtn] }));

    AppMain.append(table);
}

function Title(value) {
    AppMain.append(Render.Create({ tagName: "h1", innerText: "Mantenimiento de " + value, class: "header1" }));
}