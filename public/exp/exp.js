// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, query, orderByChild, child, get, onValue, set, remove } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
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



let studio = 0;
function fetalldata() {
    const dbRef = ref(db);
    get(child(dbRef, "login/"))
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val().userget;
                const childDatapic = childSnapshot.val().profile;
                loopslist(childData,childDatapic)

            });
        })
      
}
fetalldata()


function loopslist(childData,childDatapic){
    for(let i=0;i<=1;i++){
        console.log(childData)
        const dbRef = ref(db);
        get(child(dbRef, `login/${childData}/post/video`))
            .then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const icon = childSnapshot.val().profile_picture;
                    const name = childSnapshot.val().postnameid;
                    const decid =childSnapshot.val().decid;
                    const id =childData;
                    const picc = childDatapic;
                   additemTolist(icon,name,decid,id,picc)
    
                });
            })
    }
}




var postboxlist;
var postlistusers;
var userposts;
var usernamesdata;
var space;
var follows;
var saved;
var iconuserspost;
var boxsize;
var boxsizename;
function additemTolist(icon, name, decid, id,picc) {
    postboxlist = document.getElementById("notificatons");
    boxsize = document.createElement('div');
    boxsizename = document.createElement('div');
    postlistusers = document.createElement('div');
    iconuserspost = document.createElement('video');
    userposts = document.createElement('img');
    usernamesdata = document.createElement('p');
    space = document.createElement('br');
    follows = document.createElement('button');
    saved = document.createElement('button');

    postlistusers.id = "postlistusers";

    iconuserspost.id ="iconuserspost";
    iconuserspost.src = icon;
    iconuserspost.alt = id;
    iconuserspost.controls =true;
 
    boxsize.id ="boxsize";
    boxsizename.id ="boxsizename";
    userposts.src = picc;
    userposts.id = "imgiconsd";
    userposts.alt = id;
    //users check
    userposts.addEventListener("click", dosomethingicon);
    // followaccept
    usernamesdata.id = "usernamesid";
    usernamesdata.innerHTML = name;

    follows.innerHTML = "forum";
    follows.alt = id;
    follows.name = decid;
    follows.icon = name;
    follows.id = 'followid';
    follows.className ="material-symbols-outlined";
    follows.addEventListener("click", playsomething);

    saved.innerHTML = " favorite";
    saved.className ="material-symbols-outlined";
    saved.alt = id;
    follows.icon = name;
    saved.id = 'deleteid';
    saved.addEventListener("click", savedomething);


    postboxlist.appendChild(postlistusers);
    postlistusers.appendChild(boxsize);
    boxsize.appendChild(boxsizename);
    boxsizename.appendChild(userposts);
    boxsizename.appendChild(usernamesdata);
    boxsize.appendChild(iconuserspost);
    boxsize.appendChild(space);
    boxsize.appendChild(follows);
    boxsize.appendChild(saved);
  


}
function dosomethingicon(e) {
  if (e.target.userposts !== e.currentTarget) {

    var clickedItem = e.target.alt;
    window.location.href = "/users/user.html?name=" + clickedItem;
    //document.location.href = url;
    //console.log(clickedItem);

  }

  e.stopPropagation();
}

function savedomething(e) {
  if (e.target.saved !== e.currentTarget) {

    var clickedItem = e.target.alt;
    var currentuserid =e.target.icon;
    window.location.href = "/users/userphoto.html?name=" + currentuserid + "&age=image" + "&currentuserid=" + clickedItem;
    //document.location.href = url;
    //console.log(clickedItem);

  }

  e.stopPropagation();
}


function playsomething(e) {
  if (e.target.follows !== e.currentTarget) {

    var clickedItem = e.target.alt;
    var currentuserid =e.target.icon;
    window.location.href = "/users/userphoto.html?name=" + currentuserid + "&age=image" + "&currentuserid=" + clickedItem;
    //document.location.href = url;
    //console.log(clickedItem);

  }

  e.stopPropagation();
}
