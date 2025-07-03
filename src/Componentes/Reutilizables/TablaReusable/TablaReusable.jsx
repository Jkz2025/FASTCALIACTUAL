import React from 'react'
import { useState } from 'react';

// Componente tabla reutilizable con estilo similar a PedidosForm
export const ReusableTable = ({
    columns,
    data,
    onSelectionChange,
    selectable = false,
    rowActions = null,
    rowStyle = null
}) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectRow = (id) => {
        let newSelectedIds;
        if (selectedIds.includes(id)) {
            newSelectedIds = selectedIds.filter(selectedId => selectedId !== id);
        } else {
            newSelectedIds = [...selectedIds, id];
        }
        setSelectedIds(newSelectedIds);
        if (onSelectionChange) onSelectionChange(newSelectedIds);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]);
            if (onSelectionChange) onSelectionChange([]);
        } else {
            const allIds = data.map(item => item.id)
            setSelectedIds(allIds);
            if (onSelectionChange) onSelectionChange(allIds);
        }
        setSelectAll(!selectAll);
    }

    const getCellValue = (item, column)=> {
        const value = item[column.key]

        //Si la columna tiene una función render, la usamos
        if(column.render) {
            return column.render(item);
        }

        //Si la columna tiene una función format, la usamos
        if(column.format && value !== null && value !== undefined) {
            return column.format(value)
        }

        //Retornar el valor original
        return value;
    };


    return (
        <div className="max-w-4xl mx-auto my-8 mt-10">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-700">
                            <tr>
                                {selectable && (
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAll}
                                                checked={selectAll}
                                                className="mr-2 bg-gray-800 border-gray-600 text-gray-300 focus:ring-gray-500"
                                            />
                                            <span className="text-gray-300">ID</span>
                                        </div>
                                    </th>
                                )}
                                {columns.map((column) => (
                                    <th key={column.key} className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        {column.title}
                                    </th>
                                ))}
                                {rowActions && (
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                            {data.slice(0, 10).map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={rowStyle ? rowStyle(item, index) : 
                                        (index % 2 === 0 ? "bg-gray-800 hover:bg-gray-750" : "bg-gray-900 hover:bg-gray-850")
                                    }
                                >
                                    {selectable && (
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleSelectRow(item.id)}
                                                    checked={selectedIds.includes(item.id)}
                                                    className="mr-2 bg-gray-800 border-gray-600 text-gray-300 focus:ring-gray-500"
                                                />
                                                <span className="text-gray-300 font-medium">{item.id}</span>
                                            </div>
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td key={`${item.id}-${column.key}`} className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                            {getCellValue(item, column)}
                                        </td>
                                    ))}
                                    {rowActions && (
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            {rowActions(item)}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};