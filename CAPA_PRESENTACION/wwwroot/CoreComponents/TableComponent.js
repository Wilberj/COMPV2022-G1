import { Render } from '../Modules/util.js';

class TableComponet extends HTMLElement {
    constructor(config = {
        Dataset: [],
        Functions: [],
        ModelObject: {}
    }) {
        super();

        this.config = config;

        this.table = Render.Create({ tagName: "table", class: "table1" });
        this.thead = Render.Create({ tagName: "thead" });
        this.tbody = Render.Create({ tagName: "tbody" });

        this.filter = Render.Create({
            className: "FormContainer1", children: [
                {
                    tagName: "input", type: "text", className: "text_primary",
                    placeholder: "Buscar", onchange: (ev) => {
                        const Dataset = this.config.Dataset.filter((element) => {

                            for (const prop in element) {
                                if (element[prop] != null) {
                                    if (element[prop].
                                        toString().
                                        toUpperCase().
                                        includes(ev.target.value.toUpperCase())) {
                                        return element;
                                    }
                                }
                            }

                        });

                        this.DrawTableComponent(Dataset);
                    }
                }
            ]
        });

        this.table.append(this.thead, this.tbody);
        this.append(this.filter, this.table);

        this.DrawTableComponent();

    }
    connectedCallBack() {
       
    }

    DrawTableComponent = async (Dataset = this.config.Dataset) => {

        this.thead.innerHTML = "";
        this.tbody.innerHTML = "";

        Dataset.forEach((data, index) => {

            const tr = Render.Create({ tagName: "tr" });

            for (const prop in data) {

                if (this.config.ModelObject != null
                    && this.config.ModelObject != undefined
                    && this.config.ModelObject[prop].__proto__ == Object.prototype
                    && this.config.ModelObject[prop].hidden || this.config.ModelObject[prop].primary) {
                    
                    continue;
                }

                if (index == 0) {
                    this.thead.append(Render.Create({
                        tagName: "th", innerHTML: prop
                    }));
                }

                tr.append(Render.Create({
                    tagName: "td", innerHTML: data[prop]
                }));
            }

            if (this.config.Functions) {
                if (index == 0) {
                    this.thead.append(Render.Create({ tagName: "th", innerHTML: "Opciones" }));
                }

                tr.append(Render.Create({
                    tagName: "td", children: this.config.Functions.map(f => {
                        return {
                            tagName: "input",
                            type: "button",
                            className: "btn_primary", value: f.name, onclick: async () => {
                                f.action(data);
                            }
                        }
                    })
                }));
            }

            this.tbody.append(tr);
        });
    }
}

customElements.define('w-table', TableComponet);
export { TableComponet }