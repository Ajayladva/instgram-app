// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, child, get, onValue, set, remove } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
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




onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.uid)
        //userid get

        const userid = user.uid;

        const dbRef = ref(db, `login/${userid}/followlist`);
        let studio = 0;

        function getData() {
            onValue(dbRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    var icon = childSnapshot.val().icon;
                    var name = childSnapshot.val().name;
                    var follow = childSnapshot.val().active;
                    var id = childSnapshot.val().id;
                    additemTolist(icon, name, follow, id);

                    // ...
                });
            }, {
                onlyOnce: true
            });
        }
        getData()

        var userdataboxs;
        var peruserbox;
        var userprofile;
        var nameusers;
        var space;
        var follows;
        var deletes;
        function additemTolist(icon, name, follow, id) {
            userdataboxs = document.getElementById("notificatons");
            peruserbox = document.createElement('div');
            userprofile = document.createElement('img');
            nameusers = document.createElement('a');
            space = document.createElement('br');
            follows = document.createElement('button');
            deletes = document.createElement('button');

            peruserbox.id = "peruserbox";

            userprofile.src = icon;
            userprofile.id = "imgicons";
            userprofile.alt = id;
            //users check
            userprofile.addEventListener("click", dosomething);
            // followaccept
            nameusers.id = "names"
            nameusers.innerHTML = name;

            follows.innerHTML = follow;
            follows.alt = id;
            follows.name = name;
            follows.icon = icon;
            follows.id = 'followid';
            follows.addEventListener("click", playsomething);

            deletes.innerHTML = "delete";
            deletes.alt = id;
            deletes.id = 'deleteid';
            deletes.addEventListener("click", deletesomething);


            userdataboxs.appendChild(peruserbox);
            peruserbox.appendChild(userprofile);
            peruserbox.appendChild(nameusers);
            peruserbox.appendChild(space);
            peruserbox.appendChild(follows);
            peruserbox.appendChild(deletes);

        }

        var currentsendid;
        var currentsendname;
        var currentsendicon;
        function getowndata() {
            return onValue(ref(db, 'login/' + userid), (snapshot) => {
                currentsendicon = (snapshot.val() && snapshot.val().profile) || 'Anonymous';
                currentsendname = (snapshot.val() && snapshot.val().username_id) || 'Anonymous';
                currentsendid = (snapshot.val() && snapshot.val().userget) || 'Anonymous';
            }, {
                onlyOnce: true
            });
        }
        getowndata()

        function playsomething(e) {
            if (e.target.follow !== e.currentTarget) {
                var clickedItem = e.target.alt;
                var icon = e.target.icon;
                var name = e.target.name;
                var clickedItems = e.target.innerHTML;
                if (clickedItems == "followBack") {

                }
                else {
                    //sender user database accpet confim
                    set(ref(db, 'login/' + clickedItem + "/followlist/" + currentsendid), {
                        name: currentsendname,
                        id: currentsendid,
                        icon: currentsendicon,
                        active: "following"
                    });
                    ownset(clickedItem, icon, name);
                    // userset(clickedItem,icon)
                }
            }

            e.stopPropagation();
        }
        //set owndatabase request accpect
        function ownset(clickedItem, icon, name) {
            set(ref(db, 'login/' + userid + "/followlist/" + clickedItem), {
                name: name,
                id: clickedItem,
                icon: icon,
                active: "following"
            });
            // listid(clickedItem);
        }

        // function listid(clickedItem,icon){
        //     set(ref(db, 'login/' + userid + "/listid/" + clickedItem), {
        //         clickedItem
        //     });
        // }
        // //userlist set
        // function userset(clickedItem,icon){
        //     set(ref(db, 'login/' + clickedItem + "/listid/" + currentsendid), {
        //       icon:clickedItem
        //     });
        // }







        //delete records
        function deletesomething(e) {
            if (e.target.deletes !== e.currentTarget) {
                var clickedItem = e.target.alt;
                var icon = e.target.icon;
                var name = e.target.name;
                var clickedItems = e.target.innerHTML;

                remove(ref(db, 'login/' + clickedItem + "/followlist/" + currentsendid), {
                    name: currentsendname,
                    id: currentsendid,
                    icon: currentsendicon,
                    active: "followBack"
                });
                ownsetsusers(clickedItem, icon, name, clickedItems);
            }

            e.stopPropagation();
        }


        function ownsetsusers(clickedItem, icon, name) {
            remove(ref(db, 'login/' + userid + "/followlist/" + clickedItem), {
                name: name,
                id: clickedItem,
                icon: icon,
                active: "follow"
            });
        }


        function dosomething(e) {
            if (e.target.userprofile !== e.currentTarget) {

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