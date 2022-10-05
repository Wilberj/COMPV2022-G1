import { Render } from "../Modules/util.js";

class FormComponent extends HTMLElement {
    constructor(config = { EditObject: {}, Model: {}, containerClass: ""}) {
        super();

        this.config = config;
        this.Model = config.Model ?? config.EditObject;
        this.FormObject = config.EditObject ?? {};
        this.containerClass = config.containerClass ?? "FormContainer2";

        this.FormContainer = Render.Create({ class: this.containerClass });

        this.append(this.FormContainer);

        this.DrawFormCompnent(this.FormObject);
    }

    connectedCallBack() { }

    DrawFormCompnent = async (ObjectF = {}) => {
        this.FormContainer.innerHTML = "";
        for (const prop in this.Model) {

            if (this.Model[prop] != null
                && this.Model[prop].hidden || this.Model[prop].primary) {

                continue;
            }

            const controlContainer = Render.Create(
                {
                    class: "FormElement", children: [{
                        tagName: "label", class: "inputTitle",
                        innerText: prop
                    }]
                });

            let val = ObjectF[prop] == undefined || ObjectF == null ? "" : ObjectF[prop];
            
            let InputControl = Render.Create({
                tagName: "input", className: "text_primary",
                value: val, type: "text"
            });

            if (this.Model[prop] != null && this.Model[prop].__proto__ == Object.prototype) {

                if (this.Model[prop].value != null && this.Model[prop].value != undefined) {
                    val = this.Model[prop].value;
                }
                
                InputControl = this.DefineInputType(prop, val, ObjectF, InputControl);

            }

            InputControl.id = "ControlValue" + prop;

            if (this.Model[prop].type == "checkbox" || this.Model[prop].type == "radio") {
                ObjectF[prop] = false;
            }

            if (this.Model[prop].type == "text" || this.Model[prop].type == "number" && this.Model[prop].value != null && this.Model[prop].value != undefined) {
                ObjectF[prop] = this.Model[prop].value;
            }

            InputControl.onchange = async (ev) => {

                ObjectF[prop] = ev.target.value;

                if (ev.target.type == "checkbox") {
                    ObjectF[prop] = ev.target.checked;
                }

                if (ev.target.pattern) {
                    let regex = new RegExp(ev.target.pattern);

                    if (regex.test(ObjectF[prop])) {
                        const tool = ev.target.parentNode.querySelector(".ToolTip");
                        if (tool) tool.remove();
                        ev.target.style.boxShadow = "0 0px 2px 1px rgba(0, 0, 0, 0.2)";
                    } else {

                        if (!ev.target.parentNode.querySelector(".ToolTip")) {
                            ev.target.parentNode.append(Render.Create({
                                tagName: "span",
                                innerHTML: `Ingresar formato correcto: ${ev.target.placeholder}`,
                                className: "ToolTip"
                            }));

                            ev.target.style.boxShadow = "0 0 3px #ef4d00";
                        }
                    }
                }

            }

            controlContainer.append(InputControl);
            this.FormContainer.append(controlContainer);
        }
    }

    DefineInputType(prop, val, ObjectF, InputControl) {
        switch (this.Model[prop].type.toUpperCase()) {
            case "DATE":
                let date_val = val == "" ? (new Date()).toISO() : ObjectF[prop];
                InputControl = Render.Create({
                    tagName: "input",
                    className: "text_primary",
                    type: this.Model[prop].type
                });

                ObjectF[prop] = InputControl.value = (new Date(date_val).toISO());

                break;
            case "SELECT":
                InputControl = this.CreateSelect(InputControl, this.Model[prop].Dataset, prop, ObjectF);
                ObjectF[prop] = InputControl.value;
                break;
            case "CHECKBOX": case "RADIO":
                InputControl = Render.Create({
                    tagName: "input", className: "checkbox",
                    checked: val, type: this.Model[prop].type,
                    placeholder: prop
                });
                break;
            case "EMAIL":
                InputControl = Render.Create({
                    tagName: "input",
                    className: "text_primary",
                    placeholder: "contact@gmail.com",
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                });

                break;
            default:
                InputControl = Render.Create({
                    tagName: "input", className: "text_primary",
                    value: val, type: this.Model[prop].type,
                    placeholder: prop
                });
                break;
        }
        return InputControl;
    }

    CreateSelect(InputControl, Dataset, prop, ObjectF) {

        InputControl = Render.Create({
            tagName: "select", value: null, className: "text_primary",
            children: Dataset.map(option => {
                let OValue, ODisplay;

                if (option.__proto__ == Object.prototype) {
                    OValue = option["id"];
                    ODisplay = option["desc"];
                } else {
                    OValue = option;
                    ODisplay = option;
                }
                
                const OptionObject = {
                    tagName: "option",
                    value: OValue,
                    innerText: ODisplay
                };

                if (ObjectF[prop] != undefined && ObjectF[prop].toString() == OValue.toString()) {
                    OptionObject.selected = "true";
                }
                
                return OptionObject;
            })
        });

        return InputControl;
    }

    FormChange = async (change = "", val) => {
        var valor = document.getElementById("ControlValue" + change);

        valor.value = val;
    }
}

customElements.define("w-form", FormComponent);
export { FormComponent }