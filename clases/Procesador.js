const Proceso = require('./proceso.js');
let Procesador = (function () {
    let inicio = null;
    var NumeroT = 1;
    var ciclosV = 0;
    var procesosC = 0;
    var procesosP = 0;
    const iniciar = () => {
        for (let ciclos = 0; ciclos <= 300; ciclos++) {
            if ((Math.ceil(Math.random() * 100)) <= 39) {
                let nuevaProceso = new Proceso(NumeroT);
                agregar(nuevaProceso);
                NumeroT++;
                procesosP++;
            }
            if (inicio != null) {
                if (inicio.ciclosR == 0) {
                    eliminar(inicio);
                    procesosC++;
                    procesosP--;
                }
                inicio.ciclosR--;
                inicio = inicio.siguiente;
            }
            if (inicio == null) {
                ciclosV++;
            }
            mostrar();
        }
    }
    const mostrar = () => {
        console.log(`Ciclos vacíos: ${ciclosV}\nProcesos realizados: ${procesosC}\nProcesos pendientes: ${procesosP}\n`);
    }
    const agregar = (proceso) => {
        if (inicio == null) {
            inicio = proceso;
            inicio.siguiente = inicio;
            inicio.anterior = inicio;
        } else {
            let aux = inicio;
            while (aux.siguiente != inicio) {
                aux = aux.siguiente;
            }
            aux.siguiente = proceso;
            aux.siguiente.anterior = aux;
            aux.siguiente.siguiente = inicio;
            inicio.anterior = proceso;
        }
        return proceso;
    }
    const buscar = (proceso) => {
        let aux = inicio;
        if (aux != null) {
            while (aux != proceso && aux.siguiente != inicio) {
                aux = aux.siguiente;
            }
            if (aux == proceso) {
                return aux;
            } else {
                return console.error('Error', 'buscar');
            }
        }
    }
    const eliminar = (proceso) => {
        if (proceso == inicio && inicio.anterior == inicio && inicio.siguiente == inicio) {
            inicio = null;
        } else if (inicio == proceso) {
            inicio.siguiente.anterior = inicio.anterior;
            inicio.anterior.siguiente = inicio.siguiente;
            inicio = inicio.siguiente;
        } else {
            let aux = inicio;
            while (aux.siguiente != proceso && aux.siguiente != inicio) {
                aux = aux.siguiente;
            }
            if (aux.siguiente == proceso) {
                aux.siguiente = aux.siguiente.siguiente;
                aux.siguiente.anterior = aux;
            } else {
                return console.error('Error', 'eliminar');
            }
        }
    }
    return {
        iniciar: iniciar,
        mostrar: mostrar,
    };
});
module.exports = Procesador;