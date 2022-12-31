// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, push, set, onChildAdded, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getStorage, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";
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
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage();
const db = getDatabase();


var profileicons = document.getElementById('profileicons');
var name = document.getElementById('username');

var usericons = document.getElementById('usericons');
var counts = document.getElementById('likecount');
var commentid = document.getElementById('commentid');

var commentbtn = document.getElementById('commentbtn');



const myname = window.location.search;
const urlparams = new URLSearchParams(myname);
const param3 = urlparams.get('name');
const param2 = urlparams.get('age');
const param1 = urlparams.get('currentuserid');

onAuthStateChanged(auth, (user) => {
  if (user) {

    const userid = user.uid;

    //post photo and like count
    function getuserdatas() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `/login/${param1}/post/${param2}/${param3}`)).then((snapshot) => {
        if (snapshot.exists()) {
          usericons.src = snapshot.val().profile_picture;
          counts.innerHTML = snapshot.val().count;
        } else {
          console.log("No data available");
        }
      });

    }

    getuserdatas();

    //userid profile 
    function getuserdata() {

      return onValue(ref(db, `login/${param1}`), (snapshot) => {
        profileicons.src = (snapshot.val() && snapshot.val().profile) || 'Anonymous';
        name.innerHTML = (snapshot.val() && snapshot.val().username_id) || 'Anonymous';
      }, {
        onlyOnce: true
      });
    }


    //login users data get
var currentloginuser = document.getElementById('iconsget');

var useridcurrent=document.getElementById('nameget');
var currentusernameid =document.getElementById('namegets');

    getuserdata();
    function currentTargetusers() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `login/${userid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          currentloginuser.innerHTML = snapshot.val().profile;
          currentusernameid.innerHTML = snapshot.val().username_id;
          useridcurrent.innerHTML = snapshot.val().userget;
        } else {
          console.log("No data available");
        }
      });

    }


    currentTargetusers();

    const dbRef = ref(db, `login/${param1}/post/${param2}/${param3}/comment`);


    //getdata if users are login 

    let studio = 0;
    commentbtn.addEventListener('click', (e) => {
      const postListRef = ref(db, `login/${param1}/post/${param2}/${param3}/comment/`);
      const newPostRef = push(postListRef);

      var d = new Date();
      d.toLocaleTimeString();
      set(newPostRef, {
        icons:currentloginuser.innerHTML,
        meassage: commentid.value,
        id:useridcurrent.innerHTML,
        time:d.toLocaleTimeString(),
        nameid:currentusernameid.innerHTML


      });
      alert('send data');


    });
    onChildAdded(dbRef, (data) => {
      if (data.val().id == userid) {
        var divdata = ' <div class="box-output-right"> <div  class="img-counter"><a class="time-right">'+ data.val().time +' </a><a href=" /users/user.html?name='+ data.val().id +'" class="time-rights">'+ data.val().nameid +' </a><img src="'+ data.val().icons +'" alt="" class="logo-users"></div><div class="text-box-input-show"><a class="user-output-right">'+data.val().meassage+'</a></div> </div>';
        var d1 = document.getElementById('getusers');
        d1.insertAdjacentHTML('beforebegin', divdata);
      }
      else {
        var divdata = '<div class="box-output" > <div class="img-counter"><img src="'+ data.val().icons +'" alt="" class="logo-users"><a href=" /users/user.html?name='+ data.val().id +'" class="time-lefts">'+ data.val().nameid +' </a><a class="time-left">'+ data.val().time +' </a></div><div class="text-box-input-show"><a class="user-output">'+data.val().meassage+'</a></div> </div>';
        var d1 = document.getElementById('getusers');
        d1.insertAdjacentHTML('beforebegin', divdata);
      }

    });

    //push like count
    document.getElementById('pushlike').onclick=function(){
      set(ref(db, `login/${userid}/likeliist`), {
        
    });
    }

    //

   

    


    var userdataboxs;
    var peruserbox;
    var userprofile;

    function additemTolist(profile, nameuser, usergetid) {
      userdataboxs = document.getElementById('postnumberid');
      peruserbox = document.createElement('div');
      userprofile = document.createElement('img');

      peruserbox.id = "peruserbox";


      userprofile.src = profile;
      userprofile.id = "imgicons";
      userprofile.alt = usergetid;
      userprofile.controls = false;
      userprofile.addEventListener("click", dosomething);
      userdataboxs.appendChild(peruserbox);
      peruserbox.appendChild(userprofile);

    }


    // user profile button click go to user.html get user detils

    function dosomething(e) {
      if (e.target.buttonusers !== e.currentTarget) {

        var clickedItem = e.target.alt;
        window.location.href = "/users/user.html?name=" + clickedItem;
        //document.location.href = url;
        //console.log(clickedItem);

      }

      e.stopPropagation();
    }

  } else {
    // User is signed out
    window.location = "/loginpage/register.html";
    // ...
  }
});


