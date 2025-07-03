const ObligacionesTributarias = ({ 
    user, 
    handleChange, 
    selectedObligaciones, 
    setSelectedObligaciones, 
    obligaciones 
  }) => {
    const handleClickAgregarObligaciones = () => {
      if (user.obligacion_tributaria && user.obligacion_tributaria !== "obligaciones") {
        const selectedObligacion = obligaciones.find(
          obli => obli.codigo === user.obligacion_tributaria
        );
        
        if (selectedObligacion && !selectedObligaciones.find(o => o.codigo === selectedObligacion.codigo)) {
          setSelectedObligaciones(prev => [...prev, selectedObligacion]);
        }
      }
    };
  
    const handleEliminarObligacion = (codigo) => {
      setSelectedObligaciones(prev => prev.filter(o => o.codigo !== codigo));
    };
  
    return (
      <div className="mb-4 w-full">
        <label className="block text-gray-200 font-semibold mb-2">
          Obligaciones Tributarias
        </label>
        <div className="flex items-center gap-2 mb-4">
          <select
            id="obligacion_tributaria"
            name="obligacion_tributaria"
            value={user.obligacion_tributaria}
            onChange={handleChange}
            className="p-2 rounded-lg bg-slate-800 text-gray-300 border border-slate-700 flex-grow"
          >
            <option value="obligaciones">Seleccione obligaciones</option>
            {obligaciones.map((obli) => (
              <option key={obli.codigo} value={obli.codigo}>
                {obli.nombre} - {obli.codigo}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleClickAgregarObligaciones}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Agregar
          </button>
        </div>
  
        {selectedObligaciones.length > 0 && (
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-gray-200 font-semibold mb-3">
              Obligaciones Seleccionadas:
            </h4>
            <div className="space-y-2">
              {selectedObligaciones.map((obligacion) => (
                <div
                  key={obligacion.codigo}
                  className="flex items-center justify-between bg-slate-700/50 rounded-lg p-2 text-gray-300"
                >
                  <span>{obligacion.nombre} - {obligacion.codigo}</span>
                  <button
                    type="button"
                    onClick={() => handleEliminarObligacion(obligacion.codigo)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ObligacionesTributarias;