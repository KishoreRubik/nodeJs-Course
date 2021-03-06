console.log('client side js file loaded');

//fetch api
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// })

const weatherForm = document.querySelector('form');
const searchParam = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchParam.value;

    messageOne.textContent = 'Loading..';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
})
})