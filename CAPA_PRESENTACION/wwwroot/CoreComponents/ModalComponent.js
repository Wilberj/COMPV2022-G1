import { Render } from "../Modules/util.js";

class ModalComponent extends HTMLElement {
    constructor(Component, title = "Modal") {
        super();
        this.title = title;
        this.ModalContent = Render.Create({
            className: "ModalContent", children: [
                this.ModalHeader()
            ]
        });

        this.ModalContentComp = Render.Create({
            className: "ModalContentComp"
        });

        this.ModalContentComp.append(Component);
        this.ModalContent.append(this.ModalContentComp);

        this.append(this.ModalContent);
    }

    connectedCallback() {
        setTimeout(() => {
            this.style.opacity = 1;
        }, 100);
    }

    ModalHeader = () => {
        return {
            class: "ModalHeader",
            children: [
                { tagName: "label", innerText: this.title },
                { tagName: "input", type: "button",
                    className: "btn_secundary", value: "X",
                    onclick: async () => {
                        this.Close();
                    }
                }
            ]
        }
    }

    Close = () => {
        this.style.opacity = 0;
        setTimeout(() => {
            this.remove();
        }, 1000);
    }

}

customElements.define("w-modal", ModalComponent);
export { ModalComponent }