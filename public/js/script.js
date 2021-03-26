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
        } else {
            ID = Idstring
            Name = document.getElementById(`name${ID}`).innerText
            Price = document.getElementById(`price${ID}`).innerText
            qty = 1;
            Cart[Idstring] = [qty, Name, Price]
        }
        localStorage.setItem('Cart', JSON.stringify(Cart));
    })
})

function updateCart(Cart) {
    for (var item in Cart) {
        // console.log(`div${item}`)
        let d = document.getElementById(`div${item}`)
        if (d) {
            d.innerHTML = `
            <button type="btn"  id='minus${item}' class="btn btn-sm bg-secondary mx-1 minus"> - </button>
            <button type="btn"  id='val${item}' class="btn btn-sm btn-outline-secondary disabled mx-1"> ${Cart[item][0]} </button>
            <button type="btn" id='plus${item}' class="btn btn-sm bg-secondary mx-1 plus"> + </button>  
        `
        }
    }

    document.getElementById('cart').innerHTML = Object.keys(Cart).length;

}