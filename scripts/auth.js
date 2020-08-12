let signUpForm = document.querySelector('#signUpForm');
let signInForm = document.querySelector('#signInForm');

let signup_btn = document.querySelector('#signup');
let signin_btn = document.querySelector('#signin');
let logout_btn = document.querySelector('#logout');

let profile = document.querySelector('.profile');
let userName = document.querySelector('#userName');
let cart = document.querySelector('.cart');

import data from './globalVar.js';

console.log('auth data: ', data);

let db = data['db'];
let auth = data['auth'];

console.log(auth, db);
console.log('ffgfgfggg');

auth.onAuthStateChanged(user => {
    // console.log(user);
    if (user) //checks is user is null or not
    {

        //after signup/login changing btn , profile and cart
        logout_btn.className = logout_btn.className.replace(' hidden', '');
        signin_btn.className += ' hidden';
        signup_btn.className += ' hidden';

        profile.className = profile.className.replace(' hidden', '');
        cart.className = cart.className.replace(' hidden', '');

        console.log('auth.currentUser.displayName ', auth.currentUser.displayName, typeof auth.currentUser.displayName);

        userName.innerHTML = `Hi, ${(auth.currentUser.displayName).split(' ')[0]}`; //${}


    } else {

        //show login/signup btn and remove cart and profile name
        signin_btn.className = signin_btn.className.replace(' hidden', '');
        signup_btn.className = signup_btn.className.replace(' hidden', '');

        logout_btn.className += ' hidden';
        profile.className += ' hidden';
        cart.className += ' hidden';

    }

})





// sign up form event listerner

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let newEmail = signUpForm['newEmail'].value;
    let newUser = signUpForm['newUser'].value;
    let newPassword = signUpForm['newPassword'].value;

    if (newPassword.length <= 5) alert('short Password');

    console.log(newUser, newEmail);

    // SignUp User

    auth.createUserWithEmailAndPassword(newEmail, newPassword).then((cred) => {

        // try {
        newUser = signUpForm['newUser'].value;
        signUpForm.reset();
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: newUser,
            //   photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
            // Update successful.
        }).catch(function(error) {
            // An error happened.
        });



        // userName.innerHTML += `, ${newUser}`;


        $('#signUpModal').modal('hide');


        // adding username in alert modal

        let temp = document.querySelector('#putNameHere');
        temp.innerHTML = ` ${auth.currentUser.displayName}, you have signed up!`;
        $('#alertModal').modal('show');

        // modal hiding function
        setTimeout(function() {
            $('#alertModal').modal('hide');
        }, 1500);
        // } catch (err) {
        //     alert('something went wrong', err);
        // }

    })
})



//logout btn event listener


logout_btn.addEventListener('click', (e) => {

    console.log('logout btn fired!!!!!');
    e.preventDefault();

    // log out function
    auth.signOut().then(() => {
        try {

            //alert modal update
            let temp = document.querySelector('#putNameHere');
            temp.innerHTML = `Successfully logged out!`;
            $('#alertModal').modal('show');

            // alert modal hiding function
            setTimeout(function() {
                $('#alertModal').modal('hide');
            }, 1500);

            // after logging out showing signin, signup button and hiding logout and others


        } catch {
            alert('could not logout!!')
        }
    })


})

// login btn event listener

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = signInForm['signEmail'].value;
    // let user = signInForm['signUser'].value;
    let password = signInForm['signPassword'].value;



    console.log(password, email);

    // LogIn User

    auth.signInWithEmailAndPassword(email, password).then((cred) => {

        try {
            signInForm.reset();


            $('#signInModal').modal('hide');


            // adding username in alert modal

            let temp = document.querySelector('#putNameHere'); //${}
            temp.innerHTML = `${auth.currentUser.displayName}, you have signed In!!`;
            $('#alertModal').modal('show');

            // modal hiding function
            setTimeout(function() {
                $('#alertModal').modal('hide');
            }, 1500);

        } catch {
            alert('something went wrong');
        }

    })
})