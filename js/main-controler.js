// 'use strict';




function onLogin(ev) {
    ev.preventDefault();
    var elUsernameTxt = document.querySelector('input[name=usernameTxt]');
    var elPasswordTxt = document.querySelector('input[name=passwordTxt]');
    var username = elUsernameTxt.value;
    var password = elPasswordTxt.value;
    elUsernameTxt.value = '';
    elPasswordTxt.value = '';
    var loggedInUser = doLogin(username, password);
    console.log('loggedInUser', loggedInUser);
    if (!loggedInUser) {
        alert('Incorrect user or password, please try again.');
        return;
    }
    else {
        updateTimeStamp(loggedInUser);
        _saveUserToStorage(loggedInUser);
        showSecretPage(loggedInUser);
    }
}

function renderUsersTable() {
    var elTable = document.querySelector('tbody');
    console.log('elTable', elTable);

    var users = getUsersToShow();
    console.log('users', users);
    var strHTMLs = users.map(function (user) {
        return `<tr>
        <td>${user.id}</td>
        <td>${user.userName}</td>
        <td>${user.password}</td>
        <td>${user.lastLoginTime}</td>
        <td>${user.isAdmin}</td>
        </tr>`
    });
    var elTable = document.querySelector('.table-body');
    console.log('elTable', elTable);
    elTable.innerHTML = strHTMLs.join('');
}


function onSetFilter() {
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderUsersTable();
}

function showSecretPage(loggedInUser) {
    document.querySelector('.secret-page').style.display = 'block';
    document.querySelector('.welcome-user').innerText = 'Welcome, ' + loggedInUser.userName;
    document.querySelector('.login-screen').style.display = 'none';
    if (!loggedInUser.isAdmin) document.querySelector('.admin-link').style.display = 'none';
    else document.querySelector('.admin-link').style.display = 'block';
}
function hideSecretPage() {
    document.querySelector('.secret-page').style.display = 'none';
    document.querySelector('.login-screen').style.display = 'block';
}

function goBackToLoginPage() {
    window.location.replace("index.html");
}


window.addEventListener('popstate', function (event) {
    history.pushState(null, document.title, location.href);
});