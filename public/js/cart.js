var stripe = Stripe('pk_test_51IYFtRSI0lvf2NrEGpfxGqoqIH2sNWsRfWyWy8SSkWSCvHUC9ZnggksSAJOk6ibEYFWBVqFwR1SV7tmAwM0DEWaS00tUWlxj1q');
var elements = stripe.elements();
let style = {
    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};

let card = elements.create('card', { style, hidePostalCode: true })
const cardElement = document.getElementById('card-element')
if (cardElement) {
    card.mount('#card-element')
}
let items = document.getElementById('items')
if (items) {
    items.value = localStorage.getItem('Cart')
}



// Ajax call
const paymentForm = document.querySelector('#payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        let formData = new FormData(paymentForm);
        let formObject = {}
        for (let [key, value] of formData.entries()) {
            formObject[key] = value
        }

        stripe.createToken(card).then((result) => {
            formObject.stripeToken = result.token.id;
            // placeOrder(formObject);
            fetch('/orders', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formObject),
                })
                .then(response => response.json())
                .then(data => {
                    new Noty({
                        type: 'success',
                        timeout: 1000,
                        text: data.message,
                        progressBar: false,
                    }).show();
                    if (data.success === 'True') {
                        console.log('Success:', data)
                    };
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }).catch((err) => {
            console.log(err)
        })






    })
}