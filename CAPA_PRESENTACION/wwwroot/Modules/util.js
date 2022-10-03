class AjaxTool {

    static GetResquest = async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responsejson = await response.json();

        return responsejson;

    }

    static PostResquest = async (url, data = {}) => {
        console.log(url);
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responsejson = await response.json();

        return responsejson;
    }

    static PutResquest = async (url, data = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responsejson = await response.json();

        return responsejson;
    }

}

export { AjaxTool }

class Render {
    static Create = (Node) => {
        try {
            if (typeof Node == "undefined" || typeof Node == null) {
                return document.createTextNode("Nodo nulo o indefinido");
            } else if (typeof Node == "string" || Node == "number") {
                return Node;
            } else {
                Node.tagName = Node.tagName ?? "div";
                const element = document.createElement(Node.tagName);

                for (const prop in Node) {
                    if (prop == "tagName") { continue; }
                    else if (prop == "class") { element.className = Node[prop]; }
                    else if (prop == "children" && Node.children.__proto__ == Array.prototype) {
                        Node.children.forEach(Child => {
                           
                            element.appendChild(Render.Create(Child));
                        });
                    }
                    else element[prop] = Node[prop];
                }

                return element;
            }
        } catch (error) {
            console.log(error, Node);
            return document.createTextNode("Problema en la contrudccion del Nodo");
        }
   }
}

export { Render }

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }

    return number;
}

Date.prototype.toISO = function () {
    return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth + 1) +
        '-' + pad(this.getUTCDate()) /* +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + pad(this.getUTCMilliseconds() / 1000).tofixed(3).slice(2, 5) +
        'Z' */;
         ;
}