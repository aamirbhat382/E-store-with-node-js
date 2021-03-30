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
        }
        localStorage.setItem('Cart', JSON.stringify(Cart));
        updateCart(Cart)
    })
})

function updateCart(Cart) {
    document.getElementById('cart-length').innerHTML = Object.keys(Cart).length;
}