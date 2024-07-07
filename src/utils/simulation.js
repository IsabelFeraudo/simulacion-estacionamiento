// src/utils/simulacion.js

export const realizarSimulacion = (filas, tiempo) => {
    const resultados = [];
    let reloj = 0;

    for (let i = 0; i < filas; i++) {
        const randomLlegada = Math.random();
        const tiempoEntreLlegadas = 12 + randomLlegada * (14 - 12);
        const proximaLlegada = reloj + tiempoEntreLlegadas;

        const randomFinEstacionamiento = Math.random();
        let tiempoEstacionamiento;
        if (randomFinEstacionamiento < 0.5) tiempoEstacionamiento = 1;
        else if (randomFinEstacionamiento < 0.8) tiempoEstacionamiento = 2;
        else if (randomFinEstacionamiento < 0.95) tiempoEstacionamiento = 3;
        else tiempoEstacionamiento = 4;

        const finEstacionamiento = reloj + tiempoEstacionamiento;

        const randomTamañoVehiculo = Math.random();
        let tamañoVehiculo;
        if (randomTamañoVehiculo < 0.6) tamañoVehiculo = "pequeño";
        else if (randomTamañoVehiculo < 0.85) tamañoVehiculo = "grande";
        else tamañoVehiculo = "utilitario";

        const finCobro = reloj + 2 / 60;
        const estadoEmpleado = "libre"; // Este es un simplificación, deberías implementar la lógica de cola y estado del empleado

        resultados.push({
            evento: `Llegada de auto ${i + 1}`,
            reloj: reloj.toFixed(2),
            randomLlegada: randomLlegada.toFixed(2),
            tiempoEntreLlegadas: tiempoEntreLlegadas.toFixed(2),
            proximaLlegada: proximaLlegada.toFixed(2),
            randomFinEstacionamiento: randomFinEstacionamiento.toFixed(2),
            tiempoEstacionamiento,
            finEstacionamiento: finEstacionamiento.toFixed(2),
            randomTamañoVehiculo: randomTamañoVehiculo.toFixed(2),
            tamañoVehiculo,
            finCobro: finCobro.toFixed(2),
            estadoEmpleado,
            cola: 0, // Simplificación
            disponibilidadGrande: 6, // Simplificación
            disponibilidadPequeño: 10, // Simplificación
            disponibilidadUtilitarios: 4, // Simplificación
            estadoPlaya: "hay lugar", // Simplificación
            cantidadConductores: 0, // Simplificación
            acumRecaudacion: 0 // Simplificación
        });

        reloj = proximaLlegada;
    }

    return resultados;
};
