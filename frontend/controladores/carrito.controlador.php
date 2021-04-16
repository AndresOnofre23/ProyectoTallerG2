<?php

    class ControladorCarrito{

        /*=============================================
	    MOSTRAR TARIFAS
	    =============================================*/

        public function ctrMostrarTarifas(){

            $tabla = "comercio";

            $respuesta = ModeloCarrito::mdlMostrarTarifas($tabla);

            return $respuesta;
        }

    }

?>