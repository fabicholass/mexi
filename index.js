const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Reemplaza por la URL de tu webhook de Discord
const discordWebhookUrl = 'https://discord.com/api/webhooks/1287944037503860847/0_tVpz49cXlLD-CrPW9lyF_IO2_rOZ0qNYNhLan2Si9VaNpTrOsoB7pRsDVj-9aDZQq2';

app.get('/', async (req, res) => {
    try {
        // Enviar mensaje al servidor de Discord
        await axios.post(discordWebhookUrl, {
            content: 'Hola, alguien entró al sitio.'
        });

        // Responder al navegador
        res.send('Página cargada, mensaje enviado al servidor de Discord.');
    } catch (error) {
        console.error('Error al enviar mensaje a Discord:', error);
        res.status(500).send('Hubo un error al enviar el mensaje a Discord.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});