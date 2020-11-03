import axios from 'axios'
import Noty from 'noty'
let addToCart = document.querySelectorAll('.add-to-cart')
let cartcounter = document.querySelector('#cartcounter')

function updateCart(foowings){
    axios.post('/update-cart', foowings).then( res => {
       
    cartcounter.innerText = res.data.totalQty
   
    new Noty({

        text:'hurray! spicy choice',
        timeout:1000,
    }).show();
    })

}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let foowings = JSON.parse(btn.dataset.foowings)
        updateCart(foowings)
    })
})