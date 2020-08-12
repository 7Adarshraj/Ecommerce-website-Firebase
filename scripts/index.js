    // db.collection('userProducts').get().then(snapshot => {
    //         let userProducts = snapshot.docs;
    //     })
    //     // import { auth, db } from './globalVar.js';

    import data from './globalVar.js';

    console.log('index data: ', data);
    let db = data['db'];
    let auth = data['auth'];

    // const aaa = require('globalVar');


    // console.log(aaa);

    let cartBtn = document.querySelectorAll('.pbtn');
    let wishBtn = document.querySelectorAll('.pbtn1');
    let cartLogoNo = document.querySelector('#cartLogoNo');

    console.log(cartBtn);

    cartLogoNo.innerText =
        console.log(firebase.auth().currentUser);

    for (let button of cartBtn) {
        button.addEventListener('click', (e) => {

            let cartItemCount = Number(cartLogoNo.innerText);
            cartItemCount += 1;

            cartLogoNo.innerText = cartItemCount;

            // console.log('printin button!!! ', button);

            // console.log(button.getAttribute('for'));


            let pid = button.getAttribute('for');


            // let productDetailsDiv = document.querySelector('#productDetailsDiv');
            console.log(pid, ' wofof');

            // setup userProducts on button click

            // let currentUserEmail = auth.currentUser.email;
            // console.log(firebase.auth().currentUser.email);



            var docRef = db.collection("userProducts").doc(auth.currentUser.email);

            let ret = docRef.get().then(function(doc) {
                    if (doc.exists) {



                        pid = button.getAttribute('for');
                        docRef.update({

                            [pid]: firebase.firestore.FieldValue.increment(1)

                        });
                        console.log('updated value');


                    } else {
                        // console.log('doesnt have own prop');
                        // pid = button.getAttribute('for');
                        // var setData = { 'qty': 1, 'prodDesc': `${prodDesc}`, 'prodPrice': `${prodPrice}`, 'imgSrc': `${imgSrc}` }
                        console.log('doesnt have own the user');
                        pid = button.getAttribute('for');
                        db.collection("userProducts").doc(auth.currentUser.email).set({
                                [pid]: Number(1),

                            })
                            .then(function() {
                                pid = button.getAttribute('for');
                                console.log('Document successfully written olllla ! pid', pid);
                            })
                            .catch(function(error) {
                                console.error("Error writing document noooooo  : ", error);
                            });
                    }


                }

            )
        })
    }
    auth.onAuthStateChanged(user => {
        // console.log(user);
        if (user) //checks is user is null or not
        {
            var docRef = db.collection("userProducts").doc(auth.currentUser.email);

            let ret = docRef.get().then(function(doc) {
                if (doc.exists) {
                    let sum = 0;
                    console.log('zaaz', doc.data());
                    for (let i in doc.data()) {
                        sum += Number(doc.data()[i])
                    }
                    cartLogoNo.innerText = sum;
                }
            })

        }
    })

    // email = {
    //     p11: { qty: 2, desc: lorem, price: $70, imgSrc: './images/p11.jpg' },

    //     p7: { qty: 3, desc: lorem, price: $7, imgSrc: './images/p7.jpg' }
    // }


    // console.log(typeof doc, doc.data());
    //                 let pid = button.getAttribute('for');
    //                 console.log(pid)

    //                 if (doc.data().hasOwnProperty(pid)) {
    //                     console.log('has own prop');
    //                     let uu = doc.data();
    //                     console.log(pid);
    //                     console.log('uu ', uu.pid);
    //                     console.log('jhola', doc.data()[pid]['qty']);
    //                     let oldqty = doc.data()[pid]['qty'];
    //                     docRef.update({
    //                         // doc[pid]['qty']: firebase.firestore.FieldValue.increment(1)
    //                         // [pid[qty]]: firebase.firestore.FieldValue.increment(1)
    //                         [pid]: firebase.firestore.FieldValue.increment(1)
    //                     });
    //                     var newQty = oldqty + 1;


    //                     var upData = { 'qty': `${newQty}`, 'prodDesc': `${prodDesc}`, 'prodPrice': `${prodPrice}`, 'imgSrc': `${imgSrc}` };
    //                     db.collection("userProducts").doc(auth.currentUser.email).set({
    //                             [pid]: upData
    //                         }, { merge: true })
    //                         .then(function() {
    //                             console.log("Document successfully written!, after increment", pid);
    //                         })
    //                         .catch(function(error) {
    //                             console.error("Error writing document x x x : ", error);
    //                         });s