const screenWidth = window.innerWidth;
const animationDuration = screenWidth < 500 ? '0.5s' : '0.75s';
let profileImg = document.querySelector('.profile .profile_items .profile_img img');

// Wait for the page to finish loading before adding the image loading event listener

function transition(modal) {
    sessionStorage.setItem("scrollPosition", window.scrollY || document.documentElement.scrollTop);
    const img = document.querySelector('.profile_img img');
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    vtubers.style.animation=`offscreen ${animationDuration} ease-in forwards 1`;
    bottom.style.animation=`offscreen ${animationDuration} ease-in forwards 1`;
    vtubers.addEventListener("animationend", () => {
        bottom.style.display="none"
        document.getElementsByTagName("body")[0].style.overflow = null
        vtubers.style.animation=null;
        bottom.style.animation=null;
        vtubers.style.display="none"
        if (profileImg.complete) {
            content.style.animation=`onscreen ${animationDuration} ease-out forwards 1`;
        } else {
            profileImg.addEventListener('load', function() {
              content.style.animation=`onscreen ${animationDuration} ease-out forwards 1`;
            });
        }
        content.style.display="block"
        content.style.animation=`onscreen ${animationDuration} ease-out forwards 1`;
    }, {
        once: true
    });
    try {
        history.pushState(null, null, `https://136masternr.github.io/doggirls/?dog=${modal}`)
    } catch(err) {
        history.pushState(null, null, `${location.protocol}//${location.host}/?dog=${modal}`)
    }
    fetch('./doggirls.json')
      .then(response => response.json())
      .then(data => {
      let dog = data.doggirls.find(dog => dog.username === modal);
      document.title = `Virtual Doggirls - ${dog.name}`;
    })
    .catch(error => console.error(error));
    return false;
}

function transitionAlone(modal) {
    let content=document.getElementById(modal)
    fetch('./doggirls.json')
      .then(response => response.json())
      .then(data => {
        let dog = data.doggirls.find(dog => dog.username === modal);
        document.title = `Virtual Doggirls - ${dog.name}`;
      })
    .catch(error => console.error(error));
    document.getElementsByTagName("body")[0].style.overflow = null
    content.style.display="block"
    content.style.animation="firstOnScreen 0.75s ease-out forwards 1";
    return false;
}

function transitionOff(modal) {
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    document.title = `Virtual Doggirls`;
    content.style.animation=`offscreenRev ${animationDuration} ease-in forwards 1`
    content.addEventListener("animationend", () => {
        document.getElementsByTagName("body")[0].style.overflow = null
        bottom.style.display="block"
        vtubers.style.display="block"
        content.style.animation=null
        vtubers.style.animation=`onscreenRev ${animationDuration} ease-out forwards 1`
        bottom.style.animation=`onscreenRev ${animationDuration} ease-out forwards 1`
        content.style.display="none"
        let savedScrollPosition = sessionStorage.getItem("scrollPosition");
        if (savedScrollPosition) {
            window.scrollTo({top: savedScrollPosition, behavior: 'instant'})
        }
    }, {
        once: true
    });
    try {
        history.pushState(null, null, `https://136masternr.github.io/doggirls`)
    } catch(err) {
        history.pushState(null, null, `${location.protocol}//${location.host}`)
    }
    return false;
}
