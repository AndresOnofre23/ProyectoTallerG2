/***********************************
 VISUALIZAR LA CESTA DEL CARRITO DE COMPRAS
 **********************************/
if (localStorage.getItem("cantidadCesta") != null) {

    $(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
    $(".sumaCesta").html(localStorage.getItem("sumaCesta"));

} else {
    $(".cantidadCesta").html("0");
    $(".sumaCesta").html("0");

}



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

            '<p class="subTotal' + item.idProducto + ' subtotales">' +

            '<strong>USD $<span>' + item.precio + '</span></strong>' +

            '</p>' +

            '</div>' +

            '</div>' +

            '<div class="clearfix"></div>' +

            '<hr>');


        // EVITAR MANIPULAR LA CANTIDAD EN PRODUCTOS VIRTUALES

        $(".cantidadItem[tipo='virtual']").attr("readonly", "true");


    }

} else {
    $(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras.</div>')
    $(".sumaCarrito").hide();
    $(".cabeceraCheckout").hide();
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

            var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

            for (var i = 0; i < listaProductos.length; i++) {
                if (listaProductos[i]["idProducto"] == idProducto /*&& listaProductos[i]["tipo"] == "virtual"*/ ) {
                    swal({
                        title: "El producto ya está agregado en el carrito de compras",
                        text: "",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "!Volver!",
                        closeOnConfirme: false

                    })
                    return;
                }

            }
            listaCarrito.concat(localStorage.getItem("listaProductos"));

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

        // ACTUALIZAR CESTA

        var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
        var sumaCesta = Number($(".sumaCesta").html()) + Number(precio);

        $(".cantidadCesta").html(cantidadCesta);
        $(".sumaCesta").html(sumaCesta);

        localStorage.setItem("cantidadCesta", cantidadCesta);
        localStorage.setItem("sumaCesta", sumaCesta);


        // MOSTRAR ALERTA DE QUE EL PRODUCTO YA FUE AGREGADO

        swal({
                title: "",
                text: "¡Se ha agregado un nuevo producto al carrito de compras!",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                cancelButtonText: "¡Continuar comprando!",
                confirmButtonText: "¡Ir a mi carrito de compras!",
                closeOnConfirm: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    window.location = rutaOculta + "carrito-de-compras";
                }
            });

    }



})



// QUITAR PRODUCTOS DEL CARRITO

$(".quitarItemCarrito").click(function() {
    $(this).parent().parent().parent().remove();

    var idProducto = $(".cuerpoCarrito button");
    var imagen = $(".cuerpoCarrito img");
    var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
    var precio = $(".cuerpoCarrito .precioCarritoCompra span");
    var cantidad = $(".cuerpoCarrito .cantidadItem");

    // SI AUN QUEDAN PRODUCTOS VOLVERLOS AGREGAR AL CARRITO (LOCALSTORAGE)
    listaCarrito = [];
    if (idProducto.length != 0) {
        for (var i = 0; i < idProducto.length; i++) {
            var idProductoArray = $(idProducto[i]).attr("idProducto");
            var imagenArray = $(imagen[i]).attr("src");
            var tituloArray = $(titulo[i]).html();
            var precioArray = $(precio[i]).html();
            var pesoArray = $(idProducto[i]).attr("peso");
            var tipoArray = $(cantidad[i]).attr("tipo");
            var cantidadArray = $(cantidad[i]).val();
            listaCarrito.push({
                "idProducto": idProductoArray,
                "imagen": imagenArray,
                "titulo": tituloArray,
                "precio": precioArray,
                "tipo": tipoArray,
                "peso": pesoArray,
                "cantidad": cantidadArray
            });
        }
        localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));
        sumaSubtotales();
        cestaCarrito(listaCarrito.length);

    } else {

        // SI YA NO QUEDAN PRODUCTOS HAY QUE REMOVER TODO

        localStorage.removeItem("listaProductos");

        localStorage.setItem("cantidadCesta", "0");

        localStorage.setItem("sumaCesta", "0");

        $(".cuerpoCarrito").html('<div class="wel">Aún no hay productos en el carrito de compras.</div>');
        $(".sumaCarrito").hide();
        $(".cabeceraCheckout").hide();

    }
})


// GENERAR SUBTOTAL DESPUES DE CAMBIAR CANTIDAD

$(".cantidadItem").change(function() {

    var cantidad = $(this).val();
    var precio = $(this).attr("precio");
    var idProducto = $(this).attr("idProducto");
    var item = $(this).attr("item");


    $(".subTotal" + idProducto).html('<strong>USD $<span>' + (cantidad * precio) + '</span></strong>');


    // ACTUALIZAR LA CANTIDAD EN EL LOCALSTORAGE

    var idProducto = $(".cuerpoCarrito button");
    var imagen = $(".cuerpoCarrito img");
    var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
    var precio = $(".cuerpoCarrito .precioCarritoCompra span");
    var cantidad = $(".cuerpoCarrito .cantidadItem");

    listaCarrito = [];

    for (var i = 0; i < idProducto.length; i++) {

        var idProductoArray = $(idProducto[i]).attr("idProducto");
        var imagenArray = $(imagen[i]).attr("src");
        var tituloArray = $(titulo[i]).html();
        var precioArray = $(precio[i]).html();
        var pesoArray = $(idProducto[i]).attr("peso");
        var tipoArray = $(cantidad[i]).attr("tipo");
        var cantidadArray = $(cantidad[i]).val();

        listaCarrito.push({
            "idProducto": idProductoArray,
            "imagen": imagenArray,
            "titulo": tituloArray,
            "precio": precioArray,
            "tipo": tipoArray,
            "peso": pesoArray,
            "cantidad": cantidadArray
        });

    }

    localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

    sumaSubtotales();

    cestaCarrito(listaCarrito.length);


})


// ACTUALIZAR SUBTOTAL

var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");
var cantidadItem = $(".cuerpoCarrito .cantidadItem");

for (var i = 0; i < precioCarritoCompra.length; i++) {
    var precioCarritoCompraArray = $(precioCarritoCompra[i]).html();
    var cantidadItemArray = $(cantidadItem[i]).val();
    var idProductoArray = $(cantidadItem[i]).attr("idProducto");

    $(".subTotal" + idProductoArray).html('<strong>USD $<span>' + (precioCarritoCompraArray * cantidadItemArray) + '</span></strong>');
    sumaSubtotales();

    cestaCarrito(precioCarritoCompra.length);

}

//SUMA DE TODOS LOS SUBTOTALES

function sumaSubtotales() {

    var subtotales = $(".subtotales span");

    var arraySumaSubtotales = [];

    for (var i = 0; i < subtotales.length; i++) {

        var subtotalesArray = $(subtotales[i]).html();
        arraySumaSubtotales.push(Number(subtotalesArray));

    }



    function sumaArraySubtotales(total, numero) {

        return total + numero;

    }

    var sumaTotal = arraySumaSubtotales.reduce(sumaArraySubtotales);

    $(".sumaSubTotal").html('<strong>USD $<span>' + (sumaTotal).toFixed(2) + '</span></strong>');

    $(".sumaCesta").html($(".sumaSubTotal span").html());

    localStorage.setItem("sumaCesta", (sumaTotal).toFixed(2));


}

// ACTUALIZAR CESTA AL CAMBIAR CANTIDAD


function cestaCarrito(cantidadProductos) {

    /*=============================================
    SI HAY PRODUCTOS EN EL CARRITO
    =============================================*/

    if (cantidadProductos != 0) {

        var cantidadItem = $(".cuerpoCarrito .cantidadItem");

        var arraySumaCantidades = [];

        for (var i = 0; i < cantidadItem.length; i++) {

            var cantidadItemArray = $(cantidadItem[i]).val();
            arraySumaCantidades.push(Number(cantidadItemArray));

        }

        function sumaArrayCantidades(total, numero) {

            return total + numero;

        }

        var sumaTotalCantidades = arraySumaCantidades.reduce(sumaArrayCantidades);

        $(".cantidadCesta").html(sumaTotalCantidades);
        localStorage.setItem("cantidadCesta", sumaTotalCantidades);

    }

}
/*=========================================
CHECKOUT
=============================================*/

$("#btnCheckout").click(function() {

    $(".listaProductos table.tablaProductos tbody").html("");

    $("#checkPaypal").prop("checked", true);
    $("#checkPayu").prop("checked", false);

    var idUsuario = $(this).attr("idUsuario");
    var peso = $(".cuerpoCarrito button, .comprarAhora button");
    var titulo = $(".cuerpoCarrito .tituloCarritoCompra, .comprarAhora .tituloCarritoCompra");
    var cantidad = $(".cuerpoCarrito .cantidadItem, .comprarAhora .cantidadItem");
    var subtotal = $(".cuerpoCarrito .subtotales span, .comprarAhora .subtotales span");
    var tipoArray = [];
    var cantidadPeso = [];

    /*=============================================
    SUMA SUBTOTAL
    =============================================*/

    var sumaSubTotal = $(".sumaSubTotal span")

    $(".valorSubtotal").html($(sumaSubTotal).html());
    $(".valorSubtotal").attr("valor", $(sumaSubTotal).html());

    /*=============================================
    TASAS DE IMPUESTO
    =============================================*/

    var impuestoTotal = ($(".valorSubtotal").html() * $("#tasaImpuesto").val()) / 100;

    $(".valorTotalImpuesto").html((impuestoTotal).toFixed(2));
    $(".valorTotalImpuesto").attr("valor", (impuestoTotal).toFixed(2));

    sumaTotalCompra()

    /*=============================================
    VARIABLES ARRAY 
    =============================================*/

    for (var i = 0; i < titulo.length; i++) {

        var pesoArray = $(peso[i]).attr("peso");
        var tituloArray = $(titulo[i]).html();
        var cantidadArray = $(cantidad[i]).val();
        var subtotalArray = $(subtotal[i]).html();

        /*=============================================
        EVALUAR EL PESO DE ACUERDO A LA CANTIDAD DE PRODUCTOS
        =============================================*/

        cantidadPeso[i] = pesoArray * cantidadArray;

        function sumaArrayPeso(total, numero) {

            return total + numero;

        }

        var sumaTotalPeso = cantidadPeso.reduce(sumaArrayPeso);

        /*=============================================
        MOSTRAR PRODUCTOS DEFINITIVOS A COMPRAR
        =============================================*/

        $(".listaProductos table.tablaProductos tbody").append('<tr>' +
            '<td class="valorTitulo">' + tituloArray + '</td>' +
            '<td class="valorCantidad">' + cantidadArray + '</td>' +
            '<td>$<span class="valorItem" valor="' + subtotalArray + '">' + subtotalArray + '</span></td>' +
            '<tr>');

        /*=============================================
        SELECCIONAR PAÍS DE ENVÍO SI HAY PRODUCTOS FÍSICOS
        =============================================*/

        tipoArray.push($(cantidad[i]).attr("tipo"));

        function checkTipo(tipo) {

            return tipo == "fisico";

        }

    }
});