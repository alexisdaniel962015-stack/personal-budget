
// Array donde se guardan los movimientos
let movimientos = [];

// ─────────────────────────────────────────
// FUNCIÓN 1: registrar movimiento
// ─────────────────────────────────────────
const registrarMovimiento = () => {
    let nombre = document.getElementById("gasto").value.trim()
    let tipo   = document.getElementById("tipo").value
    let monto  = parseFloat(document.getElementById("monto").value)

    // Validaciones
    if (nombre === "") {
        alert("Por favor, ingrese una descripción")
        return
    }
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido")
        return
    }

    // Guardar el movimiento
    let movimiento = { nombre, tipo, monto }
    movimientos.push(movimiento)

    // Limpiar los campos después de agregar
    document.getElementById("gasto").value = ""
    document.getElementById("monto").value = ""

    // Actualizar el resumen en pantalla
    mostrarResumen()
}

// ─────────────────────────────────────────
// FUNCIÓN 2: calcular el saldo total
// ─────────────────────────────────────────
const calcularTotalSaldo = () => {
    let saldo = 0

    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].tipo === "ingreso") {
            saldo = saldo + movimientos[i].monto
        } else {
            saldo = saldo - movimientos[i].monto
        }
    }

    return saldo // devuelve el resultado
}

// ─────────────────────────────────────────
// FUNCIÓN 3: mostrar resumen en pantalla
// ─────────────────────────────────────────
const mostrarResumen = () => {
    let saldo = calcularTotalSaldo()

    // Calcular ingresos y egresos por separado
    let totalIngresos = 0
    let totalEgresos  = 0

    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].tipo === "ingreso") {
            totalIngresos = totalIngresos + movimientos[i].monto
        } else {
            totalEgresos = totalEgresos + movimientos[i].monto
        }
    }

    // Mostrar en pantalla
    document.getElementById("cantidad").textContent = movimientos.length
    document.getElementById("saldo").textContent = "S/" + saldo.toFixed(2)
    document.getElementById("totalIngresos").textContent = "S/" + totalIngresos.toFixed(2)
    document.getElementById("totalEgresos").textContent  = "S/" + totalEgresos.toFixed(2)
}

// ─────────────────────────────────────────
// EVENTO: escucha el click del botón
// ─────────────────────────────────────────
let boton = document.getElementById("boton")
boton.addEventListener("click", () => {
    registrarMovimiento() // llama a la función 1
})
