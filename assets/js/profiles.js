function transition(modal) {
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    vtubers.style.animation="offscreen 0.75s ease-in forwards 1";
    bottom.style.animation="offscreen 0.75s ease-in forwards 1";
    vtubers.addEventListener("animationend", function() {
        bottom.style.display="none"
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
        content.style.display="block"
        vtubers.style.animation=null;
        bottom.style.animation=null;
        content.style.animation="onscreen 0.75s ease-out forwards 1";
        vtubers.style.display="none"
    }, {
        once: true
    });
    try {
        history.pushState("bar", "Virtual Doggirls", `https://136masternr.github.io/doggirls/?dog=${modal}`)
    } catch(err) {
        history.pushState("bar", "Virtual Doggirls", `http://127.0.0.1:5500/?dog=${modal}`)
    }
    return false;
}

function transitionAlone(modal) {
    let content=document.getElementById(modal)
    document.getElementsByTagName("body")[0].style.overflow = "hidden"
    content.style.display="block"
    content.style.animation="onscreen 0.75s ease-out forwards 1";
    return false;
}

function transitionOff(modal) {
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    content.style.animation="offscreenRev 0.75s ease-in forwards 1"
    content.addEventListener("animationend", function() {
        document.getElementsByTagName("body")[0].style.overflow = null
        bottom.style.display="block"
        vtubers.style.display="block"
        content.style.animation=null
        vtubers.style.animation="onscreenRev 0.75s ease-out forwards 1"
        bottom.style.animation="onscreenRev 0.75s ease-out forwards 1"
        content.style.display="none"
    }, {
        once: true
    });
    try {
        history.pushState("bar", "Virtual Doggirls", `https://136masternr.github.io/doggirls`)
    } catch(err) {
        history.pushState("bar", "Virtual Doggirls", `http://127.0.0.1:5500`)
    }
    return false;
}