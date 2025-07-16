import { useState, useEffect } from 'react';

const ChartFilter = ({ onFilterChange, initialFilters = {} }) => {
    const [filters, setFilters] = useState({
        type: initialFilters.type || 'COMPOSTABLE',
        year: initialFilters.year || 2025,
        month: initialFilters.month || null
    });

    // Opciones para los filtros
    const wasteTypes = [
        { value: 'COMPOSTABLE', label: 'Compostable' },
        { value: 'RECICLABLE', label: 'Reciclable' },
        { value: 'NO_RECICLABLE', label: 'No Reciclable' }
    ];

    // Generar opciones de años (últimos 5 años)
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 5; year--) {
        years.push({ value: year, label: year.toString() });
    }

    const months = [
        { value: null, label: 'Todos los meses' },
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
    ];

    // Notificar cambios al componente padre
    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filtro de Tipo de Residuo */}
                <div>
                    <label htmlFor="waste-type" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Residuo *
                    </label>
                    <select
                        id="waste-type"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        {wasteTypes.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro de Año */}
                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                        Año
                    </label>
                    <select
                        id="year"
                        value={filters.year || ''}
                        onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Todos los años</option>
                        {years.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro de Mes */}
                <div>
                    <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                        Mes
                    </label>
                    <select
                        id="month"
                        value={filters.month || ''}
                        onChange={(e) => handleFilterChange('month', e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        {months.map(option => (
                            <option key={option.value || 'all'} value={option.value || ''}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Información adicional */}
            <div className="mt-4 text-sm text-gray-600">
                
                <p className="mt-1">
                    Filtros activos: Tipo <strong>{wasteTypes.find(t => t.value === filters.type)?.label}</strong>
                    {filters.year && `, Año ${filters.year}`}
                    {filters.month && `, ${months.find(m => m.value === filters.month)?.label}`}
                </p>
            </div>
        </div>
    );
};

export default ChartFilter;
