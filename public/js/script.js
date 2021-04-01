let hamberger = document.querySelector('.hamburger');
let times = document.querySelector('.times');
let mobileNav = document.querySelector('.mobile-nav');

hamberger.addEventListener('click', function() {
    console.log('clicked');
    mobileNav.classList.toggle('open');

});

times.addEventListener('click', function() {
    mobileNav.classList.remove('open');
});

let alertClose = document.querySelector('.alert-close').addEventListener('click', () => {
    let alert = document.getElementById('alert')
    alert.style.display = 'none'
})


if (localStorage.getItem('Cart') == null) {
    var Cart = {}
        // updateCart(Cart)
} else {

    Cart = JSON.parse(localStorage.getItem('Cart'));
    document.getElementById('cart-length').innerHTML = Object.keys(Cart).length;
}


let addToCart = document.querySelectorAll(".Add_to_Cart")
addToCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let Idstring = btn.id.toString()
        if (Cart[Idstring] != undefined) {
            Cart[Idstring][0] = Cart[Idstring][0] + 1
            updateCart(Cart)
        } else {
            ID = Idstring
            Name = document.getElementById(`name${ID}`).innerText
            Price = document.getElementById(`price${ID}`).innerText
            qty = 1;
            Cart[Idstring] = [qty, Name, Price]
            updateCart(Cart)
        }
        localStorage.setItem('Cart', JSON.stringify(Cart));

    })
})

function updateCart(Cart) {
    document.getElementById('cart-length').innerHTML = Object.keys(Cart).length;
    new Noty({
        theme: 'mint',
        type: 'success',
        timeout: 1000,
        text: 'Item added to cart',
        progressBar: false,
    }).show();
}