import data from './globalVar.js';

console.log('cart data: ', data);
let db = data['db'];
let auth = data['auth'];
// let productDetails = data['productDetails'];

// let productDetails = JSON.parse(localStorage.getItem('productDetails'));
var productDetails = JSON.parse(localStorage.getItem('productDetails'));

let productDetailsDiv = document.querySelector('#productDetailsDiv');

let joker = '';

db.collection('userProducts').get().then(snapshot => {
    console.log('snap in cart');
    console.log(snapshot.docs);
})

console.log(db);
console.log('in cart.js ', productDetails);





// imgSrc = './images/product-11.jpg';
// prodDesc = 'lorem imwemm mkd';
// prodPrice = '30';
// qty = 4;

// console.log(db);

// let ele = `<div class="row d-flex justify-content-between mt-4" style="height: 90px;">
//             <div class="d-flex mr-0">
//             <img src="${imgSrc}" alt="" style="height: 90px">
//             <div class="ml-2">
//                 <p class="mr-2 my-0 py-0">${prodDesc}</p>
//                 <small class="mr-2 my-0">price $${prodPrice}</small><br>
//                 <a href=""><small>Remove</small></a>
//             </div>
//         </div>
//         <!-- <p class="my-auto ml-0 pl-0">1</p> -->
//         <input class="mx-auto my-auto" type="number" name="nqty" id="qty12" style="width: 30px; height : 30px" placeholder="0">
//         <p class="my-auto pr-4">$${qty * prodPrice} </p>
//     </div>`


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('cart user email', auth.currentUser.email);
        var docRef = db.collection("userProducts").doc(auth.currentUser.email);

        docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data(), typeof doc.data());

                    for (let i in doc.data()) {

                        console.log('i', doc.data()[i], i);
                        joker = i;
                        let prodDesc = productDetails[i]['prodDesc'];
                        let prodPrice = Number(productDetails[i]['prodPrice'].substring(1));
                        let imgSrc = productDetails[i]['imgSrc'];
                        let qty = doc.data()[i];


                        console.log('prodDEsc', prodDesc);
                        let ele = document.createElement('div');
                        ele.className = "row d-flex justify-content-between mt-4";
                        ele.style.height = '90px';
                        ele.innerHTML = `<div class="d-flex mr-0">
                                         <img src="${imgSrc}" alt="" style="height: 90px">
                                        <div class="ml-2">
                                            <p class="mr-2 my-0 py-0">${prodDesc}</p>
                                            <small class="mr-2 my-0">price $${prodPrice}</small><br>
                                            <a href=""><small>Remove</small></a>
                                        </div>
                                    </div>
                                    
                                    <input class="mx-auto my-auto" type="number" name="nqty" id="qty${i}" style="width: 30px; height : 30px" value=${qty}>
                                    <p class="my-auto pr-4" id = 'price${i}'>$${qty * prodPrice} </p>`
                        productDetailsDiv.appendChild(ele);

                    }


                    // productDetailsDiv.innerHTML += ele;




                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");

                }

                let input = document.querySelectorAll("input[type = 'number']"); //[0].value
                // console.log('ip', ip);
                console.log(input);
                for (let ip of input) {
                    ip.addEventListener('change', (e) => {

                        let quantity = ip.value;
                        let quantityId = ip.getAttribute('id').substring(3);

                        console.log('walah', quantity, quantityId, typeof quantityId);
                        // console.log('1', price, quantity);
                        // let productDetails = JSON.parse(localStorage.getItem('productDetails'));
                        let price = Number(productDetails[`${quantityId}`]['prodPrice'].substring(1));

                        console.log('2', price, quantity);
                        price = quantity * price;
                        document.querySelector(`#price${quantityId}`).innerText = price.toFixed(2);
                        console.log('3', price, quantity);

                        // let prodPrice = Number(productDetails[i]['prodPrice'].substring(1));
                        // let qty = Number(doc.data()[i]);

                        let sum = price * quantity;


                        let tax = 0.1 * sum;
                        let payable = document.querySelector('#payable');
                        let subtotal = document.querySelector('#subtotal');
                        let taxField = document.querySelector('#tax');

                        taxField.innerText += Number(tax.toFixed(2));
                        subtotal.innerText += Number(sum.toFixed(2));
                        payable.innerText = (sum + tax).toFixed(2);


                        // let total = document.querySelector('#')



                    })
                }
            }

        ).catch(function(error) {
            console.log("Error getting document:", error);
        });

    } else {
        // No user is signed in.
        console.log('cart user email nooooo', auth.currentUser.email);
    }
});




console.log('yayaoo', productDetailsDiv);


// productDetailsDiv.appendChild(ele);





auth.onAuthStateChanged(user => {
    // console.log(user);
    if (user) //checks is user is null or not
    {
        var docRef = db.collection("userProducts").doc(auth.currentUser.email);

        let ret = docRef.get().then(function(doc) {
            if (doc.exists) {
                var sum = 0;
                var tax = 0;
                // var productDetails = JSON.parse(localStorage.getItem('productDetails'));

                for (let i in doc.data()) {

                    let prodPrice = Number(productDetails[i]['prodPrice'].substring(1));
                    let qty = Number(doc.data()[i]);

                    sum += prodPrice * qty;


                }
                tax = 0.1 * sum;
                let payable = document.querySelector('#payable');
                let subtotal = document.querySelector('#subtotal');
                let taxField = document.querySelector('#tax');

                taxField.innerText = tax.toFixed(2);
                subtotal.innerText = sum.toFixed(2);
                payable.innerText = (sum + tax).toFixed(2);

            }
        })

    }
})




// document.querySelector('#qty12').value = qty;