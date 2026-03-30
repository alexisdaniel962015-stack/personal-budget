const movimientos = [
  { nombre: "Salario", tipo: "ingreso", valor: 3000 },
  { nombre: "Comida", tipo: "gasto", valor: 200 },
  { nombre: "Freelance", tipo: "ingreso", valor: 500 },
  { nombre: "Transporte", tipo: "gasto", valor: 150 }
];

// functional-utils.js
function obtenerNombres(movimientos) {
  return movimientos.map(mov => mov.nombre);
}

function obtenerValores(movimientos) {
  return movimientos.map(mov => mov.valor);
}

function calcularTotal(valores) {
  return valores.reduce((total, valor) => total + valor, 0);
}


console.log("Nombres:", obtenerNombres(movimientos));
console.log("Valores:", obtenerValores(movimientos));
console.log("Total:", calcularTotal(obtenerValores(movimientos)));

//obtenerNombres(movimientos);
const obtenerNombres = (movimientos) => {
  return movimientos.map(mov => mov.nombre)
}
//obtenerValores(movimientos);
const obtenerValores = (movimientos) => {
  return movimientos.map(mov => mov.valor);
}
//calcularTotal(valores);
const calcularTotal = (valores) => {
  return valores.reduce((total, valor) => total + valor, 0);
}
// Funciones con arrow functions
const calcularTotal = (valores) => {
  return valores.reduce((total, valor) => total + valor, 0);
}
// Contar por tipo
const contarPorTipo = (movimientos) => {
    let ingresos = 0
    let gastos   = 0

    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].tipo === "ingreso") {
            ingresos = ingresos + 1
        } else {
            gastos = gastos + 1
        }
    }

    return { ingresos: ingresos, gastos: gastos }
}
console.log("Nombres:", obtenerNombres(movimientos));
console.log("Valores:", obtenerValores(movimientos));
console.log("Total:", calcularTotal(obtenerValores(movimientos)));
console.log("Conteo por tipo:", contarPorTipo(movimientos));



//Parte 2: Filtrado y Búsqueda 
function obtenerIngresos(movimientos) {
  return movimientos.filter(mov => mov.tipo === 'ingreso');
}

function obtenerGastos(movimientos) {
  return movimientos.filter(mov => mov.tipo === 'gasto');
}

function filtrarPorMonto(movimientos, minimo) {
  return movimientos.filter(mov => mov.valor >= minimo);
}

// Búsqueda por nombre (case-insensitive)
function buscarPorNombre(movimientos, nombre) {
  return movimientos.find(mov => 
    mov.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

function obtenerPrimero(movimientos, tipo) {
  return movimientos.find(mov => mov.tipo === tipo);
}

