/***********************************
 VISUALIZAR LOS PRODUCTOS EN LA PAGINA CARRITO DE COMPRAS
 **********************************/

var listaCarrito = [];
if (localStorage.getItem("listaProductos") != null) {
    var listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));

    listaCarrito.forEach(funcionForEach);

    function funcionForEach(item, index) {
        $(".cuerpoCarrito").append(

            '<div clas="row itemCarrito">' +

            '<div class="col-sm-1 col-xs-12">' +

            '<br>' +

            '<center>' +

            '<button class="btn btn-default backColor quitarItemCarrito" idProducto="' + item.idProducto + '" peso="' + item.peso + '">' +

            '<i class="fa fa-times"></i>' +

            '</button>' +

            '</center>' +

            '</div>' +
            '<div class="col-sm-1 col-xs-12">' +

            '<figure>' +

            '<img src="' + item.imagen + '" class="img-thumbnail">' +

            '</figure>' +

            '</div>' +

            '<div class="col-sm-4 col-xs-12">' +

            '<br>' +

            '<p class="tituloCarritoCompra text-left">' + item.titulo + '</p>' +

            '</div>' +

            '<div class="col-md-2 col-sm-1 col-xs-12">' +

            '<br>' +

            '<p class="precioCarritoCompra text-center">USD $<span>' + item.precio + '</span></p>' +

            '</div>' +

            '<div class="col-md-2 col-sm-3 col-xs-8">' +

            '<br>' +

            '<div class="col-xs-8">' +

            '<center>' +

            '<input type="number" class="form-control cantidadItem" min="1" value="' + item.cantidad + '" tipo="' + item.tipo + '" precio="' + item.precio + '" idProducto="' + item.idProducto + '" item="' + index + '">' +

            '</center>' +

            '</div>' +

            '</div>' +

            '<div class="col-md-2 col-sm-1 col-xs-4 text-center">' +

            '<br>' +

            '<p class="subTotal' + index + ' subtotales">' +

            '<strong>USD $<span>' + (Number(item.cantidad) * Number(item.precio)) + '</span></strong>' +

            '</p>' +

            '</div>' +

            '</div>' +

            '<div class="clearfix"></div>' +

            '<hr>');


        // EVITAR MANIPULAR LA CANTIDAD EN PRODUCTOS VIRTUALES

        $(".cantidadItem[tipo='virtual']").attr("readonly", "true");

    }

}


// AGREGAR AL CARRITO

$(".agregarCarrito").click(function() {
    var idProducto = $(this).attr("idProducto");
    var imagen = $(this).attr("imagen");
    var titulo = $(this).attr("titulo");
    var precio = $(this).attr("precio");
    var tipo = $(this).attr("tipo");
    var peso = $(this).attr("peso");

    var agregarAlCarrito = false;


    /*
    if (tipo == "virtual") {
        agregarAlCarrito = true;
    } else {
        var seleccionarDetalle = $(".seleccionarDetalle");

        for (var i = 0; i < seleccionarDetalle.length; i++) {
            if ($(seleccionarDetalle[i]).val() == "") {
                swal({
                    title: "Debe seleccionar Talla y color",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "!Seleccionar!",
                    closeOnConfirme: false

                })
            } else {
                titulo = titulo + "-" + $(seleccionarDetalle[i]).val();
                agregarAlCarrito = true;
            }
        }
    }*/

    //CAPTURAR DETALLES

    if (tipo == "virtual" || tipo == "fisico") {
        agregarAlCarrito = true;
    }

    // RECUPERAR ALMACENAMIENTO DEL LOCALSTORAGE


    // ALMACENAR EN EL LOCALSTORAGE LOS PRODUCTOS AGREGADOS AL CARRITO

    if (agregarAlCarrito) {

        // RECUPERAR ALMACENAMIENTO DEL LOCALSTORAGE
        if (localStorage.getItem("listaProductos") == null) {
            listaCarrito = [];
        } else {
            listaCarrito.concat(localStorage.getItem("listaProductos"));
            console.log("listaCarrito", listaCarrito);
        }


        listaCarrito.push({
            "idProducto": idProducto,
            "imagen": imagen,
            "titulo": titulo,
            "precio": precio,
            "tipo": tipo,
            "peso": peso,
            "cantidad": "1"
        });

        console.log("listaCarrito", listaCarrito)

        localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

        // MOSTRAR ALERTA DE QUE EL PRODUCTO YA FUE AGREGADO

        swal({
                title: "",
                text: "¡Se ha agregado un nuevo producto al carrito de compras!",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                cancelButtonText: "!Continuar comprando!",
                confirmButtonText: "!Ir a mi carrito de compras!",
                closeOnConfirme: false

            }),
            function(isConfirm) {
                if (isConfirm) {
                    window.location = rutaOculta + "carrito-de-compras";
                }
            }

    }



})