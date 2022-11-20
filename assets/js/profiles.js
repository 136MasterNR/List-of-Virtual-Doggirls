function transition(modal) {
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    vtubers.style.animation="offscreen 0.9s ease-in forwards 1";
    bottom.style.animation="offscreen 0.9s ease-in forwards 1";
    vtubers.addEventListener("animationend", function() {
        bottom.style.display="none"
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
        content.style.display="block"
        vtubers.style.animation=null;
        bottom.style.animation=null;
        content.style.animation="onscreen 0.9s ease-out forwards 1";
        vtubers.style.display="none"
    }, {
        once: true
    });
    return false;
}

function transitionOff(modal) {
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    content.style.animation="offscreenRev 0.9s ease-in forwards 1"
    content.addEventListener("animationend", function() {
        document.getElementsByTagName("body")[0].style.overflow = null
        bottom.style.display="block"
        vtubers.style.display="block"
        content.style.animation=null
        vtubers.style.animation="onscreenRev 0.9s ease-out forwards 1"
        bottom.style.animation="onscreenRev 0.9s ease-out forwards 1"
        content.style.display="none"
    }, {
        once: true
    });
    return false;
}