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
let paymentSuccess = document.querySelector('.payment-success')
let paymentMessage = document.getElementById('payment-message')
let trackID = document.getElementById('trackID')
let spinner = document.querySelector('.spinner')
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
            spinner.style.display = 'flex'
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
                        paymentMessage.innerText = data.message
                        trackID.innerHTML = `<a href="/${data.id}"> Track Order Status</a> `
                        spinner.style.display = 'none'
                        paymentSuccess.style.display = 'flex'
                        localStorage.clear('Cart')
                    } else {
                        paymentMessage.innerText = data.message
                        spinner.style.display = 'none'
                        paymentSuccess.style.display = 'flex'
                    };
                })
                .catch((error) => {
                    paymentMessage.innerText = error
                    spinner.style.display = 'none'
                    paymentSuccess.style.display = 'flex'
                    console.error('Error:', error);
                });
        }).catch((err) => {
            paymentMessage.innerText = `Something Went Wrong`
            spinner.style.display = 'none'
            paymentSuccess.style.display = 'flex'
            console.log(err)
        })






    })
}