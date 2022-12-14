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
  } else if (selection === "find-by-email"){
    findbyemail();
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
  let result = 0;
  for (let i = 0; i < contacts.length; i++){
    if (contacts[i].email === email){
      result = 1;
    }
  }
  if (result === 1){
    outputEl.innerHTML = "NO"
  } else {
  contacts.push(newcontact(name, number, email, contry));
  let ip = contacts.length - 1;
  outputEl.innerHTML = `contact has been addded(${contacts[ip].name})`;
  savecontacts();
  }
} 
 
//REMOVE A CONTACT
function removeContact() {
  let index = prompt("enter the email of the contact");
  let answer = -1;
  for (let i = 0; i < contacts.length; i++){
    if (contacts[i].email.includes(index)){
      answer = i;
      outputEl.innerHTML = `contact removed, contact email: (${contacts[i].name})`
      contacts.splice(answer, 1);
    } else if (answer === -1) {
      outputEl.innerHTML = "NO"
    }
  } 
  savecontacts();
} 
 
//DISPLAY BY NAME
function displayByName() {
  let inputel = prompt("what is name");
  let divstr = "";
  for (let i = 0; i < contacts.length; i++){ 
    if (contacts[i].name.includes(inputel)){
        divstr += gethtmlstr(contacts[i], [i]);//`<div>${contacts[i]}</div>`;
    }          
  }
  outputEl.innerHTML = divstr;
} 
 
//DISPLAY BY COUNTRY
function displayByCountry() {
  let inputel = prompt("what is contry");
  let divstr = "";
  for (let i = 0; i < contacts.length; i++){ 
    if (contacts[i].contry.includes(inputel)){
        divstr += gethtmlstr(contacts[i], i);//`<div>${contacts[i]}</div>`;
    }           
  }
  outputEl.innerHTML = divstr;
} 
 
//FIND BY EMAIL

function findbyemail(){
  let input = prompt("EMAIL");
  let index = -1;
  let divstr = "";
  for (let i = 0; i < contacts.length; i++){ 
    if (contacts[i].email.includes(input)){
        index = i;
    }           
  }
  if (index === -1) {
    divstr = "NO"
  } else {
    divstr = gethtmlstr(contacts[index], index);
  } 
  outputEl.innerHTML = divstr
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
 