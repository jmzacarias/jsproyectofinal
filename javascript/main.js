// Agrego a los precios el impuesto correspondiente
let barcelonaImpuesto = barcelona.impuestoPais ();
let torontoImpuesto = toronto.impuestoPais ();
let sanAndresImpuesto = sanAndres.impuestoPais ();
let berlinImpuesto = berlin.impuestoPais ();
//Agrego los objetos al array "PRODUCTOS"
productos.push(barcelona);
productos.push(toronto);
productos.push(sanAndres);
productos.push(berlin);
//Llamo a la funcion que renderiza los productos en el DOM
renderOfertas(productos);
guardarCarritoLocal('carritoUsuario',JSON.stringify(carrito));
$('.volverArriba').click( function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#arriba').offset().top
    }, 4000);
});