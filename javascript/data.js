//Creo el array "productos" donde se agruparán los objetos de la clase "Pasajes"
const productos = [];
// Creo la clase Pasajes
class Pasajes{
    constructor(id, destino, precio, stock) {
        this.id = id;
        this.destino = destino;
        this.precio = precio;
        this.stock = stock;
        }
        impuestoPais() {
            this.precio = this.precio * 1.35;};
}
//Creo mis objetos o productos
const barcelona = new Pasajes(1, 'Barcelona', 95923, 23);
const sanAndres = new Pasajes(2, 'San Andres', 87653, 12);
const toronto = new Pasajes(3, 'Toronto', 104623, 55);
const berlin = new Pasajes(4, 'Berlin', 99820, 33);
// Creo el array Carrito que estará compuesto por los pasajes que el usuario desee comprar
const carrito = [];
let comprobacion = document.getElementsByClassName('importe');
let comprobacionCarritoDisplay = document.getElementById('js-carrito');
let costo = 0;
const guardarCarritoLocal = (elementos,valor) => {localStorage.setItem(elementos,valor)};