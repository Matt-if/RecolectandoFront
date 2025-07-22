import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const fetchRows = async (type, year = null, month = null) => {
    try {
        // Construir URL con parámetros de filtro
        const params = new URLSearchParams();
        params.append('type', type);
        if (year) params.append('year', year);
        if (month) params.append('month', month);

        const response = await fetch(`${import.meta.env.VITE_ANALYTICS_URL}/weight-wasteType-by-sector?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error('Error fetching data:', response.msg);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        //console.log('API Response:', result);
        
        // Extraer los datos de la estructura {data: [{row: {...}}]}
        const rows = result.data.map(item => item.row);
        //console.log('Processed data:', rows);
        
        return rows;
    } catch (error) {
        console.error('Error fetching chart data:', error);
        return [];
    }
};

export default function WeightWasteTypeBySector({ type = 'COMPOSTABLE', year = 2025, month = null, className = '' }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const fetchingRef = useRef(false); // para prevenir multiples fetchs

    // Efecto separado para cargar datos de la API
    useEffect(() => {
        const loadData = async () => {

            if (fetchingRef.current) {
                console.log('Fetch already in progress, skipping...');
                return;
            }

            console.log('Fetching data for:', { type, year, month });
            fetchingRef.current = true;
            setLoading(true);
            
            try {
                const rows = await fetchRows(type, year, month);
                
                if (!rows || rows.length === 0) {
                    setError('No hay datos disponibles para los filtros seleccionados');
                    setData(null);
                } 
                else {
                    setData(rows);
                    setError(null);
                }
            } 
            catch (err) {
                console.error('Error loading data:', err);
                setError('Error loading chart data');
                setData(null);
            } finally {
                setLoading(false);
                fetchingRef.current = false; // Liberar el flag
            }
        };

        loadData();

        return () => { fetchingRef.current = false; }; // Cleanup flag function

    }, [type, year, month]); // Ahora depende de los tres parámetros

    // Efecto separado para crear el chart cuando hay datos
    useEffect(() => {
        const createChart = () => {
            if (!data || !canvasRef.current) {
                return;
            }

            console.log('Creating chart with data');

            // Destruir chart anterior si existe
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = canvasRef.current.getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(row => `${row.sector_name} - ${row.building_name}`),
                    datasets: [{
                        label: `Total Recolectado [kg] - ${type}`,
                        data: data.map(row => row.total_kg),
                        backgroundColor: [
                            '#10B981', '#059669', '#047857', '#065F46', 
                            '#6EE7B7', '#34D399', '#A7F3D0'
                        ],
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.y} kg`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { display: true },
                            ticks: { display: true }
                        },
                        x: {
                            grid: { display: true },
                            ticks: { display: true }
                        }
                    }
                }
            });
            
            console.log('Chart created successfully');
        };

        if (data) {
            createChart();
        }

        // Cleanup
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, type]);

    if (loading) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <canvas ref={canvasRef} />
        </div>
    );
}