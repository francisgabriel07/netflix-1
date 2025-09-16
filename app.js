document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscription-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe realmente

        // Obtener los valores de todos los campos
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        // Simulación de validación
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

        // Simulación de un proceso de pago exitoso
        // En un caso real, aquí se haría una llamada a una API de pagos
        setTimeout(() => {
            showMessage(`¡Pago exitoso! Bienvenido a Netflix.`, 'success');
        }, 2000); // Retraso de 2 segundos para simular una carga
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = ''; // Limpia las clases previas
        messageDiv.classList.add(type);
        messageDiv.classList.remove('hidden');
    }
});