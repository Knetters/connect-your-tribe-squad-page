// select all like buttons
const likeBtns = document.querySelectorAll('.like-btn');

// loop through all like buttons and add event listener
likeBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // toggle the 'like' and 'fill-heart' classes on the clicked button
    btn.classList.toggle('like');
    btn.classList.toggle('fill-heart');

    // add a unique animation class based on the button's index
    btn.classList.add(`animate-${index + 1}`);
  });
});