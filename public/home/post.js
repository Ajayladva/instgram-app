// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref,set, onValue, get, query, orderByChild } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getStorage, ref as Refs, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";


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

const db = getDatabase();
const dbRef = ref(db, 'login/');
const auth = getAuth(app);
const analytics = getAnalytics(app);

const storage = getStorage();

function getdata() {

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // var stdno = 0;
      console.log(user.uid);
      var icon = document.getElementById('usersicons');
      const dbRefs = ref(db, `login/${user.uid}/`);
      //getdata if users are login 
     

 
      //hover auto play event


      //upload data post into database 
      //open and hide
      document.getElementById('createbtn').onclick = function () {
       window.location= '/home/post.html';

      }
      var videoimage = document.getElementById('videoimage');

      
      document.getElementById('upload-video-post').onclick = function () {
        var boxopen = document.getElementById('show-after');
        
        if (boxopen.style.display == "block") {
          boxopen.style.display = "none";
          videoimage.innerHTML = "video";
        }
        else {
          boxopen.style.display = "block";
          videoimage.innerHTML = "video";
        }

      }
      document.getElementById('upload-image-post').onclick = function () {
        var boxopen = document.getElementById('show-after');

        if (boxopen.style.display == "block") {
          boxopen.style.display = "none";
          videoimage.innerHTML = "image";

        }
        else {
          boxopen.style.display = "block";
          videoimage.innerHTML = "image";

        }

      }
      document.getElementById('upload-image-post-hide').onclick = function () {
        var boxopen = document.getElementById('float-box-upload');
        window.location= '/home/home.html';
         

      }

      //menubar code

       //end  code

       
      //upload img
      var file;
      var files = document.getElementById('iconsid');
      var storeimg = document.getElementById('selectimg');
      var nameid = document.getElementById('nameid');
      var videoimages = document.getElementById('videoimage');
      var decid = document.getElementById('decid');


      files.addEventListener('change', (e) => {
        file = e.target.files[0];
        console.log(file);
        imgstore();

      });
      var pro = document.getElementById('getp');


      //  upload img store checking
      function checkimg() {
        if (storeimg.src != " ") {
          datauserstore();
        }
       
      }
      //if img visible after store 
      function datauserstore() {
        const db = getDatabase();
        set(ref(db, `login/${user.uid}/post/${videoimages.innerHTML}/${nameid.value}`), {
          postnameid: nameid.value,
          decid:decid.value,
          profile_picture: storeimg.src,
          count:0

        });
        document.getElementById('float-box-upload').style.display = "none";
        files.style.display = "block";
        storeimg.style.display ="none";
        window.location= '/home/home.html';

      }


      function imgstore() {
        var storageRef = Refs(storage,`${user.uid}/post/${videoimages.innerHTML}/${file.name}`);
        var uploaddata = uploadBytesResumable(storageRef, file);

        uploaddata.on('state-changed', (sanpshot) => {
          var progess = (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
          pro.innerHTML = "upload" + progess + "%";

        }, (error) => {
          alert('error: image not uploaded !')
        },
          () => {


            getDownloadURL(Refs(storage, storageRef))
              .then((url) => {
                // const img = document.getElementById('Myimg');
                storeimg.setAttribute('src', url);
                files.style.display = "none";
                storeimg.style.display ="block";
              })
              .catch((error) => {
                // Handle any errors
                console.log('not this image get')
              });

          }

        )

      };




      //datasend post 
      document.getElementById('uploads-post').onclick = function () {
        if (nameid.value.length <= 8) {
          nameid.style.borderBottom = "1px solid red";
        }
        else if (decid.value.length <= 8) {
          decid.style.borderBottom = "1px solid red";
        }
        else{
          checkimg();
        }
      }
      //rangs video 




      // ...
    } else {
      // User is signed out
      window.location = "/loginpage/register.html";
      // ...
    }
  });

}
getdata()

//load all uers post only