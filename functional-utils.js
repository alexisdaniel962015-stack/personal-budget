const movimientos = [
  { nombre: "Salario", tipo: "ingreso", valor: 3000 },
  { nombre: "Comida", tipo: "gasto", valor: 200 },
  { nombre: "Freelance", tipo: "ingreso", valor: 500 },
  { nombre: "Transporte", tipo: "gasto", valor: 150 }
];

// functional-utils.js
// function obtenerNombres(movimientos) {
//   return movimientos.map(mov => mov.nombre);
// }

// function obtenerValores(movimientos) {
//   return movimientos.map(mov => mov.valor);
// }

// function calcularTotal(valores) {
//   return valores.reduce((total, valor) => total + valor, 0);
// }


// console.log("Nombres:", obtenerNombres(movimientos));
// console.log("Valores:", obtenerValores(movimientos));
// console.log("Total:", calcularTotal(obtenerValores(movimientos)));

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
// function obtenerIngresos(movimientos) {
//   return movimientos.filter(mov => mov.tipo === 'ingreso');
// }

// function obtenerGastos(movimientos) {
//   return movimientos.filter(mov => mov.tipo === 'gasto');
// }

// function filtrarPorMonto(movimientos, minimo) {
//   return movimientos.filter(mov => mov.valor >= minimo);
// }

// // Búsqueda por nombre (case-insensitive)
// function buscarPorNombre(movimientos, nombre) {
//   return movimientos.find(mov => 
//     mov.nombre.toLowerCase().includes(nombre.toLowerCase())
//   );
// }

// function obtenerPrimero(movimientos, tipo) {
//   return movimientos.find(mov => mov.tipo === tipo);
// }

const obtenerIngresos    = (movimientos) => movimientos.filter(mov => mov.tipo === "ingreso");
const obtenerGastos      = (movimientos) => movimientos.filter(mov => mov.tipo === "gasto");
const filtrarPorMonto    = (movimientos, minimo) => movimientos.filter(mov => mov.valor >= minimo);
const buscarPorNombre    = (movimientos, nombre) =>
  movimientos.find(mov => mov.nombre.toLowerCase().includes(nombre.toLowerCase()));
const obtenerPrimero     = (movimientos, tipo) => movimientos.find(mov => mov.tipo === tipo);

// Desafío: Implementa obtenerTotalPorTipo(movimientos, tipo) que calcule el total de un tipo específico.
const obtenerTotalPorTipo = (movimientos, tipo) => {
  return movimientos
    .filter(mov => mov.tipo === tipo)
    .reduce((total, mov) => total + mov.valor, 0);
};

// Pruebas
console.log("Total ingresos:", obtenerTotalPorTipo(movimientos, "ingreso")); // 3500
console.log("Total gastos:",   obtenerTotalPorTipo(movimientos, "gasto"));   // 350

// 3.-

function generarReporte(movimientos) {
  const ingresos = obtenerIngresos(movimientos);
  const gastos = obtenerGastos(movimientos);
  
  return {
    totalIngresos: calcularTotal(obtenerValores(ingresos)),
    totalGastos: calcularTotal(obtenerValores(gastos)),
    cantidad: movimientos.length
  };
}
// 3.2. Funciones de Resumen
function calcularBalance(movimientos) {
  const reporte = generarReporte(movimientos);
  return reporte.totalIngresos - reporte.totalGastos;
}

function obtenerPromedio(movimientos, tipo) {
  const filtrados = movimientos.filter(mov => mov.tipo === tipo);
  if (filtrados.length === 0) return 0;
  return calcularTotal(obtenerValores(filtrados)) / filtrados.length;
}

const validarPresupuesto = (movimientos, limite) => {
  const totalGastos = obtenerTotalPorTipo(movimientos, "gasto");
  
  return {
    totalGastos,
    limite,
    superado: totalGastos > limite,
    mensaje: totalGastos > limite
      ? `⚠️ Presupuesto superado por S/${totalGastos - limite}`
      : `✅ Dentro del presupuesto, te sobran S/${limite - totalGastos}`
  };
};

// Pruebas
console.log(validarPresupuesto(movimientos, 300)); // no superado, sobran S/50 (gastos = 350... espera)
console.log(validarPresupuesto(movimientos, 200)); // superado

// Básico: categorizarPorMonto
const categorizarPorMonto = (movimientos) => {
  return {
    bajo:  movimientos.filter(mov => mov.valor < 200),
    medio: movimientos.filter(mov => mov.valor >= 200 && mov.valor < 1000),
    alto:  movimientos.filter(mov => mov.valor >= 1000)
  };
};

// Prueba
console.log(categorizarPorMonto(movimientos));

// Intermedio: analizarPatrones
const analizarPatrones = (movimientos) => {
  const soloGastos = movimientos.filter(mov => mov.tipo === "gasto");

  const ordenados = [...soloGastos].sort((a, b) => b.valor - a.valor); // mayor a menor

  const totalGastos = obtenerTotalPorTipo(movimientos, "gasto");
  const promedio    = totalGastos / soloGastos.length;

  return {
    masAlto:   ordenados[0],                    // el primer elemento tras ordenar
    masBajo:   ordenados[ordenados.length - 1], // el último
    promedio:  promedio.toFixed(2),
    ordenados
  };
};

// Prueba
console.log(analizarPatrones(movimientos));

















// const receta = async () => {
//   try {
//     const consulta = await fetch("https://dummyjson.com/recipes")
//     const data = await consulta.json()
//       }

//   catch (error) {    console.error("Error al obtener la receta:", error)
//   }
// }
