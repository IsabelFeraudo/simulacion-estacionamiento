// src/components/table.js
import React from 'react';

const ResultadoTabla = ({ resultados }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre del evento</th>
                    <th>Reloj</th>
                    <th>Número random llegada auto</th>
                    <th>Tiempo entre llegadas auto</th>
                    <th>Próxima llegada auto</th>
                    <th>Random fin estacionamiento</th>
                    <th>Tiempo estacionamiento</th>
                    <th>Fin estacionamiento</th>
                    <th>Random tamaño vehículo</th>
                    <th>Tamaño vehículo</th>
                    <th>Fin cobro</th>
                    <th>Estado empleado</th>
                    <th>Cola</th>
                    <th>Disponibilidad grande</th>
                    <th>Disponibilidad pequeño</th>
                    <th>Disponibilidad utilitarios</th>
                    <th>Estado playa</th>
                    <th>Cantidad conductores</th>
                    <th>Acum recaudación</th>
                </tr>
            </thead>
            <tbody>
                {resultados.map((resultado, index) => (
                    <tr key={index}>
                        {Object.values(resultado).map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ResultadoTabla;
