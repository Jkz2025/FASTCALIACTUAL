import React from 'react'
import useDianIntegration from './useDianIntegration'

const FacturaDianButton = ({ facturaId, onSuccess, onError }) => {

    const { loading, error, enviarFacturaDian, consultarEstadoDian } = useDianIntegration()
    const [trackId, setTrackId] = useState(null)
    const [estadoDian, setEstadoDian] = useState(null)

    const handleEnviarDian = async () => {
        try {
            const result = await enviarFacturaDian(facturaId)
            setTrackId(result.trackId)

            if (onSuccess) {
                onSuccess(result);
            }

            //Auto-consultar estado despues de 5 segundos
            setTimeout(() => {
                consultarEstadoDian(result.trackId)
            }, 5000)

        } catch (error) {
            if (onError) {
                onError(error)
            }
        }
    }

    const consultarEstado = async (id = trackId) => {
        try {
            const result = await consultarEstadoDian(id)
            setEstadoDian(result);
        } catch (error) {
            console.error('Error consultando estado:', error)

        }
    }

    return (

        <div className="dian-integration">
            <button onClick={handleEnviarDian}
                disabled={loading}
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700
            disabled:opacity-50'
            >
                {loading ? 'Enviando...' : 'Enviar a DIAN'}
            </button>

            {error && (
                <div className="text-red-600 mt-2">
                    Error: {error}
                </div>
            )}

            {trackId && (
                <div className="mt-4">
                    <p className="text-green-600">
                        Factura enviada correctamente !
                    </p>
                    <p className="text-sm text-gray-600">
                        Track ID: {trackId}
                    </p>

                    <button
                        onClick={() => consultarEstado()}
                        disabled={loading}
                        className='bg-gray-600 text-white px-3 py-1 rounded text-sm mt-2 hover:bg-gray-700
        '
                    >

                        Consultar Estado
                    </button>
                </div>
            )}
            {estadoDian && (
                <div className="mt-4 p-4 border rounded">
                    <h4 className='font-bold'>
                        Estado DIAN:
                        <pre className="text-sm mt-2 bg-gray-100 p-2 rounded">
                            {JSON.stringify(estadoDian, null, 2)}
                        </pre>
                    </h4>
                </div>
            )}

        </div>


    )
}

export default FacturaDianButton