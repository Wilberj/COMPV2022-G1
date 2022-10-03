class ViewCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    NombreProveedor = { type: "text", primary: true };

    NombreEmpleado = { type: "text" };

    PKCompra = { type: "number", hidden: true };

    FechaCompra = { type: "date" };

    SubTotal = { type: "number" };

    Total = { type: "number" };

    EstadoCompra = { type: "checkbox" };

    PKEmpleado = { type: "number", hidden: true};

}

export { ViewCompra }

class ViewStock {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKCompra = { type: "number", primary: true };

    PKProducto = { type: "number", hidden: true};

    Descripcion = { type: "text" };

    PKBodega = { type: "number" };

    FKMarca = { type: "number" };

    FKUnidadMedida = { type: "number" };

    FKPresentacion = { type: "number" };

    UnidadMedidaCompra = { type: "text" };

    Cantidad = { type: "number" };

    UnidadesExistencias = { type: "number", hidden: true}

    ExistenciasMinimas = { type: "number" };

    FechaIngreso = { type: "date" };

    FechaVencimiento = { type: "date" };

    PrecioCompra = { type: "number" };

    PrecioVenta = { type: "number" };

    IVA = { type: "number", hidden: true};

    Descuento = { type: "number" };

    SubTotal = { type: "number", hidden: true};

    Total = { type: "number", hidden: true };

    EstadoDetalleCompra = { type: "checkbox" };

}

export { ViewStock }


class ViewMercancias {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }

    PKProducto = { type: "number"};

    PKBodega = { type: "number" };

    UnidadesExistencias = { type: "number" };

    FechaIngreso = { type: "date" };

    FechaVencimiento = { type: "date", hidden: true};

    ExistenciasMinimas = { type: "number" };

    FKMarca = { type: "number" };

    FKUnidadMedida = { type: "number" };

    FKPresentacion = { type: "number" };

    PrecioVenta = { type: "number" };

}

export { ViewMercancias }