const form = document.querySelector('.footer-form');
const popupForm = document.querySelector('.popup-form');
const telInputs = document.querySelectorAll('.tel-input');

const bot_token = '6406654898:AAH01hMh8y8CqJP55D6XtLUYOan7DQh-KeU'
const chat_id = '928132950'

const forms = [form, popupForm];

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!forms.every(form => form.checkValidity())) {
            alert('Будь ласка, заповніть всі поля форми');
            return;
        }
        
        const formData = {
            name: form.elements['name'].value,
            phone: form.elements['phone'].value,
        }

        const message = `%0AІм'я: ${formData.name}%0AНомер телефону: ${formData.phone}`;

        const url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${message}`;

        fetch(url, {
            method: 'POST',
        })
            .then((response) => {
                if (response.status == 404) {
                    alert('Помилка при надсиланні даних');
                } else if (response.status == 200) {
                    alert('Дані успішно надіслано на Telegram бота');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Помилка при надсиланні даних:', error);
            });
    });
});

telInputs.forEach(telInput => {
    telInput.addEventListener('input', () => {
        telInput.value = telInput.value.replace(/(?!^\+)\D/g, '');

        if (telInput.value.length > 15) {
            telInput.value = telInput.value.slice(0, 15);
        }
    });
});