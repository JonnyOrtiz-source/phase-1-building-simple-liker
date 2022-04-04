// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
const errorModal = document.querySelector('#modal');
errorModal.className = 'hidden';

/*
When a user clicks on an empty heart:
Invoke mimicServerCall to simulate making a server request
When the "server" returns a failure status:
Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
Display the error modal by removing the .hidden class
Display the server error message in the modal
Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
When the "server" returns a success status:
Change the heart to a full heart
Add the .activated-heart class to make the heart appear red
*/

const likeEls = document.querySelectorAll('.like-glyph');

function handleLike(heart) {
    mimicServerCall()
        .then(() => {
            if (heart.textContent === EMPTY_HEART) {
                heart.textContent = FULL_HEART;
                heart.className = 'activated-heart';
            } else {
                heart.textContent = EMPTY_HEART;
                heart.classList.remove('activated-heart');
            }
        })
        .catch((error) => {
            errorModal.classList.remove('hidden');
            errorModal.textContent = error;
            setTimeout(() => {
                errorModal.className = 'hidden';
            }, 3000);
        });
}

likeEls.forEach((heart) =>
    heart.addEventListener('click', () => handleLike(heart))
);

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = 'http://mimicServer.example.com', config = {}) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let isRandomFailure = Math.random() < 0.2;
            if (isRandomFailure) {
                reject('Random server error. Try again.');
            } else {
                resolve('Pretend remote server notified of action!');
            }
        }, 300);
    });
}
