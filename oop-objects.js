// En lugar de arrays simples, crearemos objetos con comportamientos
const miPresupuesto = new Presupuesto();

// Agregar varios movimientos
miPresupuesto.agregarMovimiento(new Movimiento('Salario', 'ingreso', 3000));
miPresupuesto.agregarMovimiento(new Movimiento('Freelance', 'ingreso', 500));
miPresupuesto.agregarMovimiento(new Movimiento('Comida', 'gasto', 200));
miPresupuesto.agregarMovimiento(new Movimiento('Transporte', 'gasto', 150));
 // Función constructora para Movimiento
function Movimiento(nombre, tipo, valor) {
  // ✅ Usar this.propiedad para el estado
  this.nombre = nombre;
  this.tipo = tipo;
  this.valor = valor;
  this.fecha = new Date().toLocaleDateString();
  
  // ✅ Usar this.metodo = function() {} para comportamientos
  this.esIngreso = function() {
    return this.tipo === 'ingreso';
  };
  
  this.esGasto = function() {
    return this.tipo === 'gasto';
  };
  this.formatear = function() {
  if (this.esIngreso()) {
    return `${this.nombre}: +$${this.valor}`;
  } else {
    return `${this.nombre}: -$${this.valor}`;
  }
};
}

// ✅ Usar new Constructor() para crear instancias
const salario = new Movimiento('Salario', 'ingreso', 3000);
const comida = new Movimiento('Comida', 'gasto', 200);

console.log('Salario es ingreso:', salario.esIngreso()); // true
console.log('Comida es gasto:', comida.esGasto()); // true
console.log(salario.formatear());
console.log(comida.formatear());
console.log('Salario:', salario);
console.log('Tipo de salario:', typeof salario); // object
console.log('Propiedades:', salario.nombre, salario.tipo, salario.valor);

function Presupuesto() {
  // Estado: array de movimientos
  this.movimientos = [];
  this.fechaCreacion = new Date().toLocaleDateString();
  
  // Comportamiento: agregar movimientos
  this.agregarMovimiento = function(movimiento) {
    if (movimiento instanceof Movimiento) {
      this.movimientos.push(movimiento);
      return true;
    }
    return false;
  };
  
  // Comportamiento: obtener totales
  this.obtenerTotalIngresos = function() {
    return this.movimientos
      .filter(mov => mov.esIngreso())
      .reduce((total, mov) => total + mov.valor, 0);
  };
  
  this.obtenerTotalGastos = function() {
    return this.movimientos
      .filter(mov => mov.esGasto())
      .reduce((total, mov) => total + mov.valor, 0);
  };
   this.obtenerMovimientosPorTipo = function(tipo) {
    return this.movimientos.filter(mov => mov.tipo === tipo);
  };

  this.eliminarMovimiento = function(indice) {
  if (indice >= 0 && indice < this.movimientos.length) {
    return this.movimientos.splice(indice, 1)[0];
  }
  return null;
};
// 3.2. Validación y Métodos Auxiliares
// Agrega métodos de validación y utilidad:
this.buscarMovimiento = function(nombre) {
  return this.movimientos.find(mov => 
    mov.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
};

this.validarPresupuesto = function() {
  return this.movimientos.every(mov => mov instanceof Movimiento);
};
// Continúa en el constructor Presupuesto
this.calcularBalance = function() {
  return this.obtenerTotalIngresos() - this.obtenerTotalGastos();
};

this.obtenerResumen = function() {
  return {
    totalIngresos: this.obtenerTotalIngresos(),
    totalGastos: this.obtenerTotalGastos(),
    balance: this.calcularBalance(),
    cantidadMovimientos: this.movimientos.length
  };
};
}

const ingresos = miPresupuesto.obtenerMovimientosPorTipo('ingreso');
const gastos = miPresupuesto.obtenerMovimientosPorTipo('gasto');

console.log('Ingresos:', ingresos);
console.log('Gastos:', gastos);