class CatPresentacion {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKPresentacion = { type: "number", primary: true };

    NombrePresentacion = { type: "text" };

    DetallePresentacion = { type: "text" };

    EstadoPresentacion = { type: "checkbox" };

}
export { CatPresentacion }

class TblProductosBodega {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKProductoBodega = { type: "number", primary: true };

    PKProducto = { type: "number" };

    PKBodega = { type: "number" };

    Existencias = { type: "number" };

    FechaIngreso = { type: "date" };

    FechaVencimiento = { type: "date" };

    ExistenciasMinimas = { type: "number" };

    FKMarca = { type: "number" };

    FKUnidadMedia = { type: "number" };

    FKPresentacion = { type: "number" };

}
export { TblProductosBodega }

class CatBodega {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKBodega = { type: "number", primary: true };

    Descripcion = { type: "text" };

    Ubicacion = { type: "text" };

}
export { CatBodega }
class CatCategoria {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKCategoria = { type: "number", primary: true };

    NombreCategoria = { type: "text" };

    DetalleCategoria = { type: "text" };

    EstadoCategoria = { type: "checkbox" };

}
export { CatCategoria }
class CatEmpleado {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKEmpleado = { type: "number", primary: true };

    NombreEmpleado = { type: "text" };

    DireccionEmpleado = { type: "text" };

    TelefonoEmpleado = { type: "number" };

    EmailEmpleado = { type: "text" };

    PasswordEmpleado = { type: "text" };

}
export { CatEmpleado }
class CatMarca {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKMarca = { type: "number", primary: true };

    NombreMarca = { type: "text" };

    DetalleMarca = { type: "text" };

    EstadoMarca = { type: "checkbox" };

}
export { CatMarca }
class CatProveedor {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKProveedor = { type: "number", primary: true };

    NombreProveedor = { type: "text" };

    TelefonoProveedor = { type: "number" };

    DireccionProveedor = { type: "text" };

    EmailProveedor = { type: "text" };

    EstadoProveedor = { type: "checkbox" };

}
export { CatProveedor }
class CatUnidadMedida {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKUnidadMedida = { type: "number", primary: true };

    Descripcion = { type: "text" };

    Abreviacion = { type: "text" };

    Estado = { type: "checkbox" };

}
export { CatUnidadMedida }
class TblCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKCompra = { type: "number", primary: true };

    PKProveedor = { type: "number" };

    PKEmpleado = { type: "number" };

    FechaCompra = { type: "date" };

    Descuento = { type: "number" };

    IVA = { type: "number" };

    SubTotal = { type: "number" };

    Total = { type: "number" };

    EstadoCompra = { type: "checkbox" };

}
export { TblCompra }
class TblConversionUnits {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKConversionUnits = { type: "number", primary: true };

    FKUnidadMedida = { type: "number" };

    Descripcion = { type: "text" };

    Abreviacion = { type: "text" };

    Equivalencia = { type: "number" };

    Estado = { type: "checkbox" };

}
export { TblConversionUnits }
class TblDetalleDevCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKDetDevCompra = { type: "number", primary: true };

    PKDevCompra = { type: "number" };

    PKProducto = { type: "number" };

    Cantidad = { type: "number" };

    DescripcionDev = { type: "text" };

}
export { TblDetalleDevCompra }
class TblDetalleDevVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKDetDevVenta = { type: "number", primary: true };

    PKDevVenta = { type: "number" };

    PKProducto = { type: "number" };

    Cantidad = { type: "number" };

    DescripcionDev = { type: "text" };

}
export { TblDetalleDevVenta }
class TblDevCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKDevCompra = { type: "number", primary: true };

    PKProveedor = { type: "number" };

    PKCompra = { type: "number" };

    PKEmpleado = { type: "number" };

    FechaDevolucionCompra = { type: "date" };

    Estado = { type: "checkbox" };

}
export { TblDevCompra }
class TblDevVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKDevVenta = { type: "number", primary: true };

    PKVenta = { type: "number" };

    PKEmpleado = { type: "number" };

    FechaDevolucionVenta = { type: "date" };

    Estado = { type: "checkbox" };

}
export { TblDevVenta }
class TblProducto {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKProducto = { type: "number", primary: true };

    PKCategoria = { type: "number" };

    NombreProducto = { type: "text" };

    EstadoProducto = { type: "checkbox" };

}
export { TblProducto }
class TblProductosProveedores {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKProducto = { type: "number", primary: true };

    PKProveedor = { type: "number" };

    PrecioCompra = { type: "number" };

    Descuento = { type: "number" };

    PrecioVenta = { type: "number" };

}
export { TblProductosProveedores }
class TblVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKVenta = { type: "number", primary: true };

    PKEmpleado = { type: "number" };

    NombreCliente = { type: "text" };

    FechaVenta = { type: "date" };

    Descuento = { type: "number" };

    IVA = { type: "number" };

    Subtotal = { type: "number" };

    Total = { type: "number" };

    EstadoVenta = { type: "checkbox" };

}
export { TblVenta }

class TblDetalleVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKDetalleVenta = { type: "number", primary: true };

    PKVenta = { type: "number" };

    PKProductoBodega = { type: "number" };

    Descripcion = { type: "text" };

    Cantidad = { type: "number" };

    Descuento = { type: "number" };

    SubTotal = { type: "number" };

    IVA = { type: "number" };

    Total = { type: "number" };

    UnidadMedidaVenta = { type: "text" };

}
export { TblDetalleVenta }

class TblDetalleCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }

    PKDetalleCompra = { type: "number", primary: true };

    PKCompra = { type: "number", hidden: true };

    PKProducto = { type: "number", hidden: true };

    Descripcion = { type: "text" };

    UnidadMedidaCompra = { type: "text" };

    PrecioCompra = { type: "number" };

    Cantidad = { type: "number" };

    Descuento = { type: "number" };

    IVA = { type: "number" };

    SubTotal = { type: "number" };

    Total = { type: "number" };

    EstadoDetalleCompra = { type: "checkbox" };

}

export { TblDetalleCompra }

class TblProductoBaja {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKProductoBaja = { type: "number", primary: true };

    FKEmpleado = { type: "number" };

    FechaBaja = { type: "date" };

}
export { TblProductoBaja }

class TblDetalleProductoBaja {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    PKDetalleProductoBaja = { type: "number", primary: true };

    FKProductoBodega = { type: "number" };

    DescripcionBaja = { type: "number" };

    Cantidad = { type: "number" };

    FKProductoBaja = { type: "number" };

}
export { TblDetalleProductoBaja }