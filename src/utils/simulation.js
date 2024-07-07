// src/utils/simulation.js
//ESTA VERSION NO FUNCIONA

const generarTiempoEntreLlegadas = () => 12 + Math.random() * (14 - 12);
const generarTiempoEstacionamiento = () => {
    const random = Math.random();
    if (random < 0.5) return 1;
    if (random < 0.8) return 2;
    if (random < 0.95) return 3;
    return 4;
};
const generarTamañoVehiculo = () => {
    const random = Math.random();
    if (random < 0.6) return 'pequeño';
    if (random < 0.85) return 'grande';
    return 'utilitario';
};

export const realizarSimulacion = (filas, tiempo) => {
    const resultados = [];
    let reloj = 0;
    let proximaLlegada = generarTiempoEntreLlegadas();
    const autos = [];
    let proximoFinCobro = Infinity;
    let cola = 0;
    let disponibilidadPequeno = 10;
    let disponibilidadGrande = 6;
    let disponibilidadUtilitarios = 4;
    let cantidadConductores = 0;
    let acumRecaudacion = 0;

    for (let i = 0; i < filas; i++) {
        const siguienteEvento = Math.min(proximaLlegada, proximoFinCobro, ...autos.map(auto => auto.finEstacionamiento));
        const evento = {
            evento: '',
            reloj: siguienteEvento.toFixed(2),
            randomLlegada: '',
            tiempoEntreLlegadas: '',
            proximaLlegada: '',
            randomFinEstacionamiento: '',
            tiempoEstacionamiento: '',
            finEstacionamiento: '',
            randomTamañoVehiculo: '',
            tamañoVehiculo: '',
            finCobro: '',
            estadoEmpleado: '',
            cola: cola,
            disponibilidadGrande: disponibilidadGrande,
            disponibilidadPequeno: disponibilidadPequeno,
            disponibilidadUtilitarios: disponibilidadUtilitarios,
            estadoPlaya: '',
            cantidadConductores: cantidadConductores,
            acumRecaudacion: acumRecaudacion,
        };

        if (siguienteEvento === proximaLlegada) {
            // Evento: Llegada de auto
            evento.evento = 'llegada_auto';
            evento.randomLlegada = Math.random().toFixed(2);
            evento.tiempoEntreLlegadas = generarTiempoEntreLlegadas().toFixed(2);
            evento.proximaLlegada = (reloj + Number(evento.tiempoEntreLlegadas)).toFixed(2);

            const tamañoVehiculo = generarTamañoVehiculo();
            evento.randomTamañoVehiculo = Math.random().toFixed(2);
            evento.tamañoVehiculo = tamañoVehiculo;

            let estadoAuto = '';
            if (tamañoVehiculo === 'pequeño' && disponibilidadPequeno > 0) {
                disponibilidadPequeno--;
                estadoAuto = 'estacionado';
            } else if (tamañoVehiculo === 'grande' && disponibilidadGrande > 0) {
                disponibilidadGrande--;
                estadoAuto = 'estacionado';
            } else if (tamañoVehiculo === 'utilitario' && disponibilidadUtilitarios > 0) {
                disponibilidadUtilitarios--;
                estadoAuto = 'estacionado';
            } else {
                estadoAuto = 'rechazado';
            }

            if (estadoAuto === 'estacionado') {
                const tiempoEstacionamiento = generarTiempoEstacionamiento();
                const finEstacionamiento = reloj + tiempoEstacionamiento;
                autos.push({ tamañoVehiculo, finEstacionamiento, tiempoEstacionamiento, estado: 'estacionado' });
                evento.finEstacionamiento = finEstacionamiento.toFixed(2);
                evento.tiempoEstacionamiento = tiempoEstacionamiento;
            }

            proximaLlegada = Number(evento.proximaLlegada);
        } else if (autos.some(auto => auto.finEstacionamiento === siguienteEvento)) {
            // Evento: Fin de estacionamiento
            evento.evento = 'fin_estacionamiento';
            const auto = autos.find(auto => auto.finEstacionamiento === siguienteEvento);
            auto.estado = 'esperando cobro';
            cola++;
        } else if (siguienteEvento === proximoFinCobro) {
            // Evento: Fin de cobro
            evento.evento = 'fin_cobro';
            cola--;
            cantidadConductores++;
            acumRecaudacion += autos[0].tamañoVehiculo === 'pequeño' ? 1 : autos[0].tamañoVehiculo === 'grande' ? 1.2 : 1.5;
            autos.shift();
        }

        evento.estadoPlaya = disponibilidadPequeno > 0 || disponibilidadGrande > 0 || disponibilidadUtilitarios > 0 ? 'hay lugar' : 'llena';
        evento.cantidadConductores = cantidadConductores;
        evento.acumRecaudacion = acumRecaudacion.toFixed(2);

        resultados.push(evento);
        reloj = siguienteEvento;
    }

    return resultados;
};
