// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
// Import the functions you need from the SDKs you need
import { getStorage,ref as Refs, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";


//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
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
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
const storage = getStorage();

//storage ima

let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let password = document.getElementById('password');


//button click send data 
var file;
var upload = document.getElementById('upload');
upload.addEventListener('change', (e) => {
    file = e.target.files[0];
    console.log(file);
});

var pro = document.getElementById('getp');

document.getElementById('register').onclick = function () {

    if (name.value.length <= 6) {
        document.getElementById("showhint1").style.visibility = "visible";

    }
    else if (phone.value.length <= 9) {
        document.getElementById("showhint2").style.visibility = "visible";
    }
    else if (email.value.length <= 10) {
        document.getElementById("showhint3").style.visibility = "visible";
    }
    else if (password.value.length <= 8) {
        document.getElementById("showhint4").style.visibility = "visible";
    }
    else if(storeimg.src != " "){
        imgstore();
    }
    
}

var storeimg = document.getElementById('Myimg');

function datauserstore(){
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        set(ref(db, 'login/' + uid), {
            username_id: name.value,
            email_id: email.value,
            phone_id: phone.value,
            password_id: password.value,
            profile: storeimg.src,
            userget:uid

        });
       // alert('hello guys ')
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
    });

    
}


function imgstore(){
    var storageRef = Refs(storage, 'images/' + file.name);
    var uploaddata = uploadBytesResumable(storageRef, file);

    uploaddata.on('state-changed', (sanpshot) => {
        var progess = (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
        pro.innerHTML = "upload"+progess+"%";

    }, (error) => {
        alert('error: image not uploaded !')
    },
        () => {


            getDownloadURL(Refs(storage, storageRef))
                .then((url) => {
                  // const img = document.getElementById('Myimg');
                   storeimg.setAttribute('src', url);
                   checkimg();
                })
                .catch((error) => {
                    // Handle any errors
                    console.log('not this image get')
                });

        }

    )

};

function checkimg(){
    if(storeimg.src != " "){
        //alert('upload img');
        datauserstore();
    }
}



document.getElementById('login').onclick = function () {
    window.location = "/loginpage/login.html";

}








