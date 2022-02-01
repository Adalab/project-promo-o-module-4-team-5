'use strict';
// VARIABLES
// Collapsables variables
const collapsableTitle = document.querySelector('.js-arrowCollapsable');
const collapsableTitle2 = document.querySelector('.js-arrowCollapsable2');
const collapsableTitle3 = document.querySelector('.js-arrowCollapsable3');

// const createBtn= document.querySelector('.js-createBtn');
// const collapsableShareSection= document.querySelector('.js-shareSection');

//botón reset
const resetBtn = document.querySelector('.js-reset');

// Input variables
// const inputPalette = document.querySelector('.js-inputgithub');
const inputName = document.querySelector('.js-inputName');
const inputJob = document.querySelector('.js-inputJob');
const inputEmail = document.querySelector('.js-inputEmail');
const inputPhone = document.querySelector('.js-inputPhone');
const inputLinkedin = document.querySelector('.js-inputLinkedin');
const inputgithub = document.querySelector('.js-inputgithub');

//const allInputs= document.querySelectorAll('.js-allInputs');

// Preview variables
const cardName = document.querySelector('.js-cardName');
const cardJob = document.querySelector('.js-cardJob');
const cardEmail = document.querySelector('.js-cardEmail');
const cardPhone = document.querySelector('.js-cardPhone');
const cardLinkedin = document.querySelector('.js-cardLinkedin');
const cardgithub = document.querySelector('.js-cardgithub');
const cardPhoto = document.querySelector('.js__profile-image');
const cardPreviewPhoto = document.querySelector('.js__profile-preview');
const defaultImageUrl = './assets/images/fondo.jpg';

// Palettes
const choiceColours = document.querySelectorAll('.js-choiceColours');

const palettesRadio = document.querySelectorAll('.js-palette');

// FUNCTIONS
// Collapsed containers function
function handlerClickHeader(event) {
  if (event.currentTarget === collapsableTitle) {
    event.currentTarget.parentNode.parentNode.classList.toggle('collapsed');
    collapsableTitle2.parentNode.parentNode.classList.add('collapsed');
    collapsableTitle3.parentNode.parentNode.classList.add('collapsed');
  } else if (event.currentTarget === collapsableTitle2) {
    event.currentTarget.parentNode.parentNode.classList.toggle('collapsed');
    collapsableTitle.parentNode.parentNode.classList.add('collapsed');
    collapsableTitle3.parentNode.parentNode.classList.add('collapsed');
  } else if (event.currentTarget === collapsableTitle3) {
    event.currentTarget.parentNode.parentNode.classList.toggle('collapsed');
    collapsableTitle.parentNode.parentNode.classList.add('collapsed');
    collapsableTitle2.parentNode.parentNode.classList.add('collapsed');
  }
  if (event.currentTarget) {
    event.currentTarget.classList.toggle('rotateArrow');
  }
}

// Form objet

let formObject = {
  palette: 1,
  name: '',
  job: '',
  phone: '',
  email: '',
  linkedin: '',
  github: '',
  photo: defaultImageUrl,
};

// Function palette

function paintCardPreview(event) {
  const paletteChecked = parseInt(event.currentTarget.id);
  if (paletteChecked === 1) {
    paintDefault();
    formObject.palette = 1;
  } else if (paletteChecked === 2) {
    paintChoice2();
    formObject.palette = 2;
  } else {
    paintChoice3();
    formObject.palette = 3;
  }
  setInLocalStorage();
}

function paintChoice2() {
  for (const eachPalette of choiceColours) {
    eachPalette.classList.remove('colorDefault');
    eachPalette.classList.remove('colorChoice3');
    eachPalette.classList.add('colorChoice2');
  }
}

function paintChoice3() {
  for (const eachPalette of choiceColours) {
    eachPalette.classList.remove('colorDefault');
    eachPalette.classList.remove('colorChoice2');
    eachPalette.classList.add('colorChoice3');
  }
}

function paintDefault() {
  for (const eachPalette of choiceColours) {
    eachPalette.classList.remove('colorChoice2');
    eachPalette.classList.remove('colorChoice3');
    eachPalette.classList.add('colorDefault');
  }
}

for (const eachRadio of palettesRadio) {
  eachRadio.addEventListener('click', paintCardPreview);
}

function nameInputPreview() {
  formObject.name = inputName.value;
  const namePreview = formObject.name;
  if (namePreview === '') {
    cardName.innerHTML = 'Nombre Apellido';
  } else {
    cardName.innerHTML = namePreview;
  }
}

function jobInputPreview() {
  formObject.job = inputJob.value;
  const jobPreview = formObject.job;
  if (jobPreview === '') {
    cardJob.innerHTML = 'Front developer';
  } else {
    cardJob.innerHTML = jobPreview;
  }
}
function emailInputPreview() {
  formObject.email = inputEmail.value;
  const emailPreview = formObject.email;
  if (emailPreview === '') {
    cardEmail.href = ``;
  } else {
    cardEmail.href = `mailto:${emailPreview}`;
  }
}

function phoneInputPreview() {
  formObject.phone = inputPhone.value;
  const phonePreview = formObject.phone;
  if (phonePreview === '') {
    cardPhone.href = ``;
  } else {
    cardPhone.href = `${phonePreview}`;
  }
}

function linkedinInputPreview() {
  formObject.linkedin = inputLinkedin.value;
  const linkedinPreview = formObject.linkedin;
  if (linkedinPreview === '') {
    cardLinkedin.href = ``;
  } else {
    cardLinkedin.href = `${linkedinPreview}`;
  }
}

function githubInputPreview() {
  formObject.github = inputgithub.value;
  const githubPreview = formObject.github;
  if (githubPreview === '') {
    cardgithub.href = ``;
  } else {
    cardgithub.href = `${githubPreview}`;
  }
}

function handlerInputPreview() {
  nameInputPreview();
  jobInputPreview();
  emailInputPreview();
  phoneInputPreview();
  linkedinInputPreview();
  githubInputPreview();

  //save input values
  setInLocalStorage();
}

const setInLocalStorage = () => {
  const stringifyformObject = JSON.stringify(formObject);
  localStorage.setItem('formObject', stringifyformObject);
};

//función botón reset

function handlerClickResetBtn() {
  formObject.palette = 1;
  paintDefault();
  palettesRadio[0].checked = true;

  formObject.name = '';
  inputName.value = formObject.name;

  formObject.job = '';
  inputJob.value = formObject.job;

  formObject.phone = '';
  inputPhone.value = formObject.phone;

  formObject.email = '';
  inputEmail.value = formObject.email;

  formObject.linkedin = '';
  inputLinkedin.value = formObject.linkedin;

  formObject.github = '';
  inputgithub.value = formObject.github;

  formObject.photo = '';
  cardPhoto.style.backgroundImage = `url(${defaultImageUrl})`;
  cardPreviewPhoto.style.backgroundImage = '';

  handlerInputPreview();

  //coger valores
}

// Recover saved input value (localStorage):
function loadSavedUserData() {
  const savedUserData = localStorage.getItem('formObject');
  if (savedUserData !== null) {
    formObject = JSON.parse(savedUserData);
    renderLSValues();
  }
}

function renderLSValues() {
  renderLSName();
  renderLSJob();
  renderLSEmail();
  renderLSPhone();
  renderLSLinkedin();
  renderLSgithub();
  renderLSPalette();
  renderLSPhoto();

  setInLocalStorage();
}

function renderLSPhoto() {
  if (formObject.photo) {
    cardPhoto.style.backgroundImage = `url(${formObject.photo})`;
    cardPreviewPhoto.style.backgroundImage = `url(${formObject.photo})`;
  } else {
    cardPhoto.style.backgroundImage = `url(${defaultImageUrl})`;
    cardPreviewPhoto.style.backgroundImage = '';
  }
}

function renderLSName() {
  inputName.value = formObject.name;
  const namePreview = inputName.value;
  if (namePreview === '') {
    cardName.innerHTML = 'Nombre Apellido';
  } else {
    cardName.innerHTML = namePreview;
  }
}

function renderLSJob() {
  inputJob.value = formObject.job;
  const jobPreview = inputJob.value;
  if (jobPreview === '') {
    cardJob.innerHTML = 'Front developer';
  } else {
    cardJob.innerHTML = inputJob.value;
  }
}

function renderLSEmail() {
  inputEmail.value = formObject.email;
  const emailPreview = inputEmail.value;
  if (emailPreview === '') {
    cardEmail.href = ``;
  } else {
    cardEmail.href = `mailto:${emailPreview}`;
  }
}

function renderLSPhone() {
  inputPhone.value = formObject.phone;
  const phonePreview = inputPhone.value;
  if (phonePreview === '') {
    cardPhone.href = ``;
  } else {
    cardPhone.href = `${phonePreview}`;
  }
}

function renderLSLinkedin() {
  inputLinkedin.value = formObject.linkedin;
  const linkedinPreview = inputLinkedin.value;
  if (linkedinPreview === '') {
    cardLinkedin.href = ``;
  } else {
    cardLinkedin.href = `${linkedinPreview}`;
  }
}

function renderLSgithub() {
  inputgithub.value = formObject.github;
  const githubPreview = inputgithub.value;
  if (githubPreview === '') {
    cardgithub.href = ``;
  } else {
    cardgithub.href = `${githubPreview}`;
  }
}

function renderLSPalette() {
  const paletteChecked = formObject.palette;
  if (paletteChecked === 1) {
    paintDefault();
  } else if (paletteChecked === 2) {
    paintChoice2();
  } else {
    paintChoice3();
  }
  palettesRadio[paletteChecked - 1].checked = true;
}

// start app
loadSavedUserData();

// LISTENERS:
// Collapsed function Listeners
collapsableTitle.addEventListener('click', handlerClickHeader);
collapsableTitle2.addEventListener('click', handlerClickHeader);
collapsableTitle3.addEventListener('click', handlerClickHeader);

// createBtn.addEventListener('click',palettePreview);

//Reset Btn Listener
resetBtn.addEventListener('click', handlerClickResetBtn);

// Fill function Listeners

inputName.addEventListener('keyup', handlerInputPreview);
inputJob.addEventListener('keyup', handlerInputPreview);
inputEmail.addEventListener('keyup', handlerInputPreview);
inputPhone.addEventListener('keyup', handlerInputPreview);
inputLinkedin.addEventListener('keyup', handlerInputPreview);
inputgithub.addEventListener('keyup', handlerInputPreview);

// function handlerUpdatePreview(){
//   cardName.innerHTML= formObject.nameSurname.value;
// }
