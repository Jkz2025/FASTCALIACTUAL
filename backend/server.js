const express = require("express");
const cors = require("cors");
const soap = require("soap");
const app = express();

app.use(cors());
app.use(express.text({ type: ['application/xml', 'text/xml'] }));

app.post("/api/send-invoice", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No se recibió contenido XML" });
    }

    const url = "https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc?wsdl";
    
    // Crear cliente SOAP con las opciones correctas
    const client = await soap.createClientAsync(url, {
      forceSoap12Headers: true,
      wsdl_options: {
        strictSSL: false, // Para ambiente de pruebas
        rejectUnauthorized: false // Para ambiente de pruebas
      }
    });

    // Configurar el endpoint correcto para ambiente de pruebas
    client.setEndpoint('https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc');

    // Convertir el XML a base64
    const base64Invoice = Buffer.from(req.body).toString('base64');

    // Crear el envelope SOAP con el formato correcto
    const args = {
      fileName: 'invoice.xml',
      contentFile: base64Invoice
    };

    // Hacer la llamada al servicio de forma asíncrona
    const result = await client.SendBillSyncAsync(args);

    // Enviar respuesta al frontend
    res.json({
      success: true,
      result: result[0] // El resultado real está en el primer elemento del array
    });

  } catch (error) {
    console.error("Error en el servidor:", error);
    
    // Mejorar el manejo de errores
    const errorResponse = {
      success: false,
      error: error.message || 'Error desconocido',
      code: error.code,
      detail: error.detail || error.stack
    };

    res.status(500).json(errorResponse);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});