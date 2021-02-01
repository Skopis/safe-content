'use strict';


const STORAGE_KEY = 'usersDB';
const STORAGE_KEY2 = 'loggedInUser';
var gUsers;
var gFilterBy = 'none';

_createUsers();
console.log('gUsers', gUsers);



function doLogin(username, password) {
    console.log('username', username);
    var user = gUsers.find(function (user) {
        console.log('user', user);
        return (user.userName === username);
    })
    console.log('user', user);
    if (!user) return null;
    if (username === user.userName && password === user.password) return user;
}


function updateTimeStamp(loggedInUser) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = minTwoDigits(today.getHours()) + ":" + minTwoDigits(today.getMinutes()) + ":" + minTwoDigits(today.getSeconds());
    var dateTime = date + ' ' + time;

    var userId = gUsers.findIndex(function (user) {
        console.log('user', user);
        return (user.userName === loggedInUser.userName);
    })
    gUsers[userId].lastLoginTime = dateTime;
    _saveUsersToStorage();
}
function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getUsersToShow() { //returns users by the current sorting
    if (gFilterBy === 'none') return gUsers;
    if (gFilterBy === 'name') return sortUsersByName();
    if (gFilterBy === 'last-login') return sortUsersByLastLogin();
}

function sortUsersByLastLogin() {
    var users = gUsers.sort(function (user1, user2) {
        if (user1.lastLoginTime > user2.lastLoginTime) {
            return 1;
        }
        if (user1.lastLoginTime < user2.lastLoginTime) {
            return -1;
        }
        return 0;
    });
    console.log('users by lastLoginTime', users);
    return users;
}

function sortUsersByName() {
    var users = gUsers.sort(function (user1, user2) {
        if (user1.userName.toLowerCase() > user2.userName.toLowerCase()) {
            return 1;
        }
        if (user1.userName.toLowerCase() < user2.userName.toLowerCase()) {
            return -1;
        }
        return 0;
    })
    console.log('todos', users);
    return users;
}



// These functions are private
function _createUsers() {
    var users = loadFromStorage(STORAGE_KEY);
    if (!users || !users.length) {
        users = [
            { name: 'Tesla', pass: 'secret', isAdmin: false },
            { name: 'Morph', pass: 'morphmorph', isAdmin: false },
            { name: 'Leaf', pass: 'admin', isAdmin: true }
        ].map(_createUser);
    }
    gUsers = users;
    _saveUsersToStorage();
}

function _createUser(userObj) {//populates users array with user objects (gUsers array with 3 users)
    console.log('userArr', userObj);
    var user = {
        id: _makeId(),
        userName: userObj.name,
        password: userObj.pass,
        lastLoginTime: null,
        isAdmin: userObj.isAdmin
    }
    console.log('user at create user', user);
    return user;
}


function _saveUsersToStorage() { //saves the users to localStorage
    saveToStorage(STORAGE_KEY, gUsers);
}
function _saveUserToStorage(user) {
    saveToStorage(STORAGE_KEY2, user);
}
function _clearLocalStorage() {
    clearStorage(STORAGE_KEY2);
}

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}