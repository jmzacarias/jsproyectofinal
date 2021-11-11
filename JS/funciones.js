let valorTotal = (productos)=>{
    costo = 0;
    for (const producto of productos) {
        costo += producto.precio;
        }
} 
//Funcion que renderiza los objetos para que se muestren al usuario
const renderOfertas = (elementos)=>{
    //Itero los objetos en [Productos]
    for (const e of elementos) {
        //Paso a minúsculas la propiedad productos.destino y le quito los espacios
        //Guardo lo anterior en una variable para usarlo luego como ID dinámico
        let destinoId = e.destino.toLowerCase().replace(' ', '-' );
        //Agrego cada objeto al DOM llamando al contenedor correspondiente
       $('#js-ofertas').append(
            `<div class="ofertaDestino" id="${e.id}Contenedor">
                    <img src="../imagenes/fotoscompras/${destinoId}.jpg" alt="">
                    <div>
                        <h3>${e.destino}</h3>
                        <p>¡Volá a ${e.destino} en </p>
                        <p>Marzo por $${e.precio.toFixed(0)}!</p>
                        <p class="textoImpuesto">(no incluye impuesto PAIS)</p>
                        <button id="js-pasaje${destinoId}">Agregar al carrito</button>
                    </div>
            </div>`);
            //Le asigno un evento al boton recién creado que primero agrega el producto a [carrito] y guarda esto en Local Storage, ejecutando luego un condicional
            $(`#js-pasaje${destinoId}`).on('click', ()=>{
                carrito.push(e);
                guardarCarritoLocal('carritoUsuario',JSON.stringify(carrito));
                valorTotal(carrito);
                //Si a [carrito] se agregó su primer elemento, muestra el contenedor de carrito en el DOM (que tenía un 'display: none' en css) y reorganiza el DOM
                if(window.getComputedStyle(comprobacionCarritoDisplay).display === 'none') {
                    $('#js-carrito').css("display", "block");
                    $('#js-ofertas').css("width", "75%");
                    //Llamo a showCart para que muestre en el contenedor correspondiente lo que hay en el carrito
                    showCart(carrito);
                    $(()=>{
                        //Asigno evento al boton "Finalizar Compra" para que despliegue un cartel con el importe total
                        $('#js-botonFinalizar').on('click', ()=>{     
                            $('#js-carrito').css('display', 'none');                   
                            if(comprobacion.length === 0) {
                                $('body').append(
                                    `<div class='importe'>
                                        <div id="textoImporte">
                                            <p>El total de tu compra es</p>
                                            <p>$${costo.toFixed(0)}</p>
                                        <div>
                                        <button class="botonCerrar" id="js-botonPagar">Pagar</button>
                                    </div> `                               
                                ),
                                //Asigno estilo a la ventana
                                $(()=>{
                                    $('.importe').css("display", "none")
                                    .slideDown(2000)
                                    .delay(2000); 
                                    //Asigno evento al botón "pagar" para que cierre la ventana
                                    $('#js-botonPagar').on('click', ()=>{
                                        $('.importe').remove();
                                        //Vacio el carrito
                                        carrito.splice(0, carrito.length);
                                        //Abre ventana de pago
                                        window.open("http://mercadopago.com.ar" , "ventana1" , "width=120,height=300,scrollbars=NO");
                                    }                                
                                    )
                                })
                            }
                            else {
                                $('.importe').remove();
                                $('body').append(
                                    `<div class='importe'>
                                        <div id="textoImporte">
                                            <p>El total de tu compra es</p>
                                            <p>$${costo.toFixed(0)}</p>
                                        <div>
                                        <button class="botonCerrar" id="js-botonPagar">Pagar</button>
                                    </div> `                               
                                ),
                                //Asigno estilo a la ventana
                                $(()=>{
                                    $('.importe').css("display", "none")
                                    .slideDown(2000)
                                    .delay(2000); 
                                    //Asigno evento al botón "pagar" para que cierre la ventana
                                    $('#js-botonPagar').on('click', ()=>{
                                        $('.importe').remove();
                                        //Vacío el carrito
                                        carrito.splice(0, carrito.length);
                                        //Abre ventana de pago
                                        window.open("http://mercadopago.com.ar" , "ventana1" , "width=1000, height=700");
                                    }                                
                                    )
                                })
                                
                            }
                        })
                    })
                }
                //Cierro el condicional con la orden de que si ya existia un elemento en [carrito], solamente renderice en el contenedor lo existente en [carrito]
                else {
                    showCart(carrito);
                    $('.importe').remove();
                }
            })
    }    
}
//Funcion que agrega a la vista del carrito de usuario cada producto que se encuentra en el array "carrito"
const showCart = (productos)=>{
    //Asigno una variable para sumar en cada iteración y que asignar id dinamica a un boton
    let orden = 0;
    //vacío el contenedor correspondiente en el DOM
    $('#js-agregados').empty();
    $('#js-valorTotal').empty();
    //Llamo a la función que calcula el precio final
    valorTotal(productos);
    //Iteración para que cada producto agregado al carrito se agregue al DOM
    for (const producto of productos) {
        //sumo 1 en cada iteración a esta variable
        orden += 1;
        //Agrego el objeto al DOM
        $('#js-agregados').append(`
                <div class="productoMasBoton">
                    <p class="productoCarrito">- 1 pasaje a ${producto.destino} por $${producto.precio.toFixed(0)}</p>
                    <button class="botonEliminar" id='borrar${producto.id}${orden}'> X </button>
                </div>
        `);
        //Asigno evento a cada botón creado para eliminar producto
        $(`#borrar${producto.id}${orden}`).on('click', ()=> {
            //Declaro variable como STRING
            let eliminar = '';
            //Guardo en la variable el número de INDEX del producto a eliminar
            eliminar = productos.indexOf(producto);
            //Elimino del [] el objeto para lo cual al método SPLICE le paso el número de index con la variable eliminar y le paso 1 como la cantidad de elementos a eliminar
            productos.splice(eliminar, 1);
            //Llamo a la funcion que itera todo lo existente en carrito para actualizar el DOM
            showCart(productos);
            //Agrego un condicional para que cuando el carrito vuelva a quedar vacío se oculte el contenedor correspondiente
            if (productos.length === 0) {
                $("#js-carrito").css("display", "none");
            }
        });
    }
    $('#js-valorTotal').append(`TOTAL: $${costo.toFixed(0)}`);
}