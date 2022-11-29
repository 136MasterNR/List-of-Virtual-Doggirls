const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string' ? document.querySelector(elementOrSelector) : elementOrSelector).style.display = visible ? 'block' : 'none';

setVisible('#loading', true);

window.addEventListener('load', () => {
  let dog = searchParams.get('dog');
  if (dog && document.getElementById(dog.toLowerCase())) { transitionAlone(dog.toLowerCase()) } else {
    document.querySelector('#vtubers').style.display = "block";
    document.querySelector('#bottom').style.display = "block";
    document.querySelector('#vtubers').style.animation="onscreenRev 0.75s ease-out 1";
    document.querySelector('#bottom').style.animation="onscreenRev 0.75s ease-out 1";
  }
  document.querySelector('#loading').style.animation="fadeOut 0.12s ease-out forwards 1";
  document.querySelector('#loading').addEventListener("animationend", function() {
    document.querySelector('#loading').style.display="none";
  }, {
    once: true
  });
});