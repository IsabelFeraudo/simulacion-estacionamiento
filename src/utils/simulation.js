// src/components/Simulador.js
import React, { useState } from 'react';
import { realizarSimulacion } from '../utils/simulacion';
import ResultadoTabla from './ResultadoTabla';

const Simulador = () => {
    const [filas, setFilas] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [resultados, setResultados] = useState([]);

    const handleSimular = () => {
        const resultadosSimulacion = realizarSimulacion(filas, tiempo);
        setResultados(resultadosSimulacion);
    };

    return (
        <div className="container">
            <h1>Simulador de Estacionamiento</h1>
            <div className="mb-3">
                <label className="form-label">Cantidad de filas a simular</label>
                <input
                    type="number"
                    className="form-control"
                    value={filas}
                    onChange={(e) => setFilas(Number(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Cantidad de tiempo a simular</label>
                <input
                    type="number"
                    className="form-control"
                    value={tiempo}
                    onChange={(e) => setTiempo(Number(e.target.value))}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSimular}>
                Simular
            </button>
            <ResultadoTabla resultados={resultados} />
        </div>
    );
};

export default Simulador;
