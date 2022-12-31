// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9_HQKZyMZPPG9721IAkuo2pIp9ZmOL1A",
    authDomain: "video8-599ee.firebaseapp.com",
    databaseURL: "https://video8-599ee.firebaseio.com",
    projectId: "video8-599ee",
    storageBucket: "video8-599ee.appspot.com",
    messagingSenderId: "144664529191",
    appId: "1:144664529191:web:80dc2ed7468f950ded4102",
    measurementId: "G-BXCWPL8JCN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const auth = getAuth();
const analytics = getAnalytics(app);


let email = document.getElementById('email');
let password = document.getElementById('password');



//button click send data 




document.getElementById('login').onclick = function () {

    if (email.value.length <= 10) {
        document.getElementById("showhint2").style.visibility = "visible";
    }
    else if (password.value.length <= 8) {
        document.getElementById("showhint4").style.visibility = "visible";
    }
    else {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const uid = user.uid;
                localStorage.setItem("userid", uid);
                //localStorage.getItem("userid");
                window.location="/home/home.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode);
                alert(errorMessage);
            });

    }
}
document.getElementById('register').onclick = function () {
    window.location="/loginpage/register.html";
}