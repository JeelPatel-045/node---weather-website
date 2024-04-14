console.log("Client side javascript file ");


const weatherform = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent='From Javascript'

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchElement.value;
    messageOne.textContent='Loading....'
    messageTwo.textContent= ' '

  fetch("http://localhost:3000/weather?address="+location).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent=data.error
      }
      messageOne.textContent=data.location
      messageTwo.textContent=data.forecast
      
    })
  )
})
