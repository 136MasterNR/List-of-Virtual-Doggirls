function transition(modal) {
    sessionStorage.setItem("scrollPosition", window.scrollY || document.documentElement.scrollTop);
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    vtubers.style.animation="offscreen 0.75s ease-in forwards 1";
    bottom.style.animation="offscreen 0.75s ease-in forwards 1";
    vtubers.addEventListener("animationend", () => {
        bottom.style.display="none"
        document.getElementsByTagName("body")[0].style.overflow = null
        content.style.display="block"
        vtubers.style.animation=null;
        bottom.style.animation=null;
        content.style.animation="onscreen 0.75s ease-out forwards 1";
        vtubers.style.display="none"
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
    content.style.animation="offscreenRev 0.75s ease-in forwards 1"
    content.addEventListener("animationend", () => {
        document.getElementsByTagName("body")[0].style.overflow = null
        bottom.style.display="block"
        vtubers.style.display="block"
        content.style.animation=null
        vtubers.style.animation="onscreenRev 0.75s ease-out forwards 1"
        bottom.style.animation="onscreenRev 0.75s ease-out forwards 1"
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
