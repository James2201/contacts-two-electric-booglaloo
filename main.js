// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

//GLOBAL VARIABLES
let contacts = loadcontacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  }
}

// MENU FUNCTIONS

//DISPLAY CONTACTS
function displayContacts() {
  let output = "";
  for (let i = 0; i < contacts.length; i++){
    output += gethtmlstr(contacts[i], i);
  }
  outputEl.innerHTML = output;
}

//ADD A CONTACT
function addContact() {
  let name = prompt("say your name");
  let number = prompt("what is your number");
  let email = prompt("EMAIL");
  let contry = prompt("where do you live");
  contacts.push(newcontact(name, number, email, contry));
  let ip = contacts.length - 1;
  outputEl.innerHTML = `contact has been addded(${contacts[ip].name})`;
  savecontacts();
}

//REMOVE A CONTACT
function removeContact() {
  let index = +prompt("enter the number of the contact");
    if (index >= 0 && index < contacts.length){
      contacts.splice(index, 1);
      outputEl.innerHTML = `contact removed contact number: (${contacts[index]})`;
    } else {
      alert("no");
    }
  
  savecontacts();
}

//DISPLAY BY NAME
function displayByName() {
  let inputel = prompt("what is name");
  let divstr = "";
  for (let i = 0; i < contacts.length; i++){ 
    if (contacts.includes(inputel)){
        divstr += `<div>${contacts[i]}</div>`;
    }           
}
  outputEl.innerHTML = divstr;
}

//DISPLAY BY COUNTRY
function displayByCountry() {
  let inputel = prompt("what is contry");
  let divstr = "";
  for (let i = 0; i < contacts.length; i++){ 
    if (contacts.includes(inputel)){
        divstr += `<div>${contacts[i]}</div>`;
    }           
}
  outputEl.innerHTML = divstr;
}

//OTHER FUNCTIONS

function newcontact(contactname, contactnumber, contactemail, contactcontry){
  return {
    name: contactname,
    number: contactnumber,
    email: contactemail,
    contry: contactcontry,
  } 
}

function gethtmlstr(contacts, i){
  return `
    <div> 
      ${i}: ${contacts.name + ", Number: " + contacts.number + ", Email: " + contacts.email + ", Location: " + contacts.contry}
    </div>
  `
}

//STORAGE FUNCTIONS

function savecontacts(){
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadcontacts(){
  let contactstr = localStorage.getItem("contacts");
  return JSON.parse(contactstr) ?? [];
}