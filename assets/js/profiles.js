const screenWidth = window.innerWidth;
const animationDuration = screenWidth < 500 ? '0.5s' : '0.75s';

const transition = (modal) => {
    sessionStorage.setItem("scrollPosition", window.scrollY || document.documentElement.scrollTop);
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    vtubers.style.animation=`offscreen ${animationDuration} ease-in forwards 1`;
    bottom.style.animation=`offscreen ${animationDuration} ease-in forwards 1`;
    document.getElementById("list").classList.add("disabled");
    const transitionFinalize = () => {
        document.querySelector('#loading').style.display="none";
        content.style.display = "block";
        content.style.animation = `onscreen ${animationDuration} ease-out forwards 1`;
    }
    vtubers.addEventListener("animationend", () => {
        bottom.style.display="none"
        document.getElementsByTagName("body")[0].style.overflow = null
        vtubers.style.animation=null;
        bottom.style.animation=null;
        vtubers.style.display="none"
        document.getElementById("list").classList.remove("disabled");
        let profileImg = document.querySelector(`#${modal}.profile .profile_items .profile_img img`);
        if (profileImg) {
            document.querySelector('#loading').style.display="block";
            document.querySelector('#loading').style.animation="fadeIn 0.36s ease-out forwards 1";
            let img = new Image();
            img.src = profileImg.getAttribute('src');
            img.addEventListener('load', () => {
                transitionFinalize()
            });
            img.addEventListener('error', () => {
                transitionFinalize()
            });
        } else {
            transitionFinalize()
        }
        const webflowInput = document.querySelector('.webflow-style-input');
        if (webflowInput.style.display === 'flex') {
            webflowInput.style.display = ''
            vtuberDivs.forEach(vtuberDiv => {
                const nameElement = vtuberDiv.querySelector('.text .name');
                if (nameElement !== null) {
                    vtuberDiv.style.display = '';
                }
            });
            noResultsMessage.style.display = 'none';
        };
    }, {
        once: true
    });
    try {
        history.pushState(null, null, `${location.protocol}//${location.host}/?dog=${modal}`)
    } catch(err) {
        console.log("%c\u26A0 %cUnable to pushState... Are you on the right domain?", "color: orange; font-size: 20px;", "color: red; font-size: 19px; font-weight: bold");
    }
    fetch('./doggirls.json')
        .then(response => response.json())
        .then(data => {
        let dog = data.doggirls.find(dog => dog.username === modal);
        document.title = `Virtual Doggirls - ${dog.name}`;
    })
    .catch(error => console.error(error));
    return;
}

const transitionAlone = (modal) => {
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
    let page = searchParams.get('page');
    if (page) {
        page=page.toLowerCase()
        let pagePath = document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_text .${page}`);
        if (pagePath) {
            document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_text .content`).style.display = "none";
            document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_nav .wrapper button.content`).style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_nav .wrapper .${page}`).style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            pagePath.style.display = 'block';
            pagePath.style.opacity = '1';
        }
    }
    return;
}

const transitionOff = (modal) => {
    let vtubers=document.getElementById('vtubers')
    let bottom=document.getElementById('bottom')
    let content=document.getElementById(modal)
    document.title = `Virtual Doggirls`;
    content.classList.add("disabled");
    content.style.animation=`offscreenRev ${animationDuration} ease-in forwards 1`
    content.addEventListener("animationend", () => {
        document.getElementsByTagName("body")[0].style.overflow = null
        bottom.style.display="block"
        vtubers.style.display="block"
        content.style.animation=null
        vtubers.style.animation=`onscreenRev ${animationDuration} ease-out forwards 1`
        bottom.style.animation=`onscreenRev ${animationDuration} ease-out forwards 1`
        content.style.display="none"
        content.classList.remove("disabled");
        let savedScrollPosition = sessionStorage.getItem("scrollPosition");
        if (savedScrollPosition) {
            window.scrollTo({top: savedScrollPosition, behavior: 'instant'})
        }
    }, {
        once: true
    });
    history.pushState(null, null, `${location.protocol}//${location.host}`)
    return;
}

const page = (modal, page, btn) => {

    let pagePath = document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_text .${page}`);

    let pagePathDisplay = window.getComputedStyle(pagePath).getPropertyValue('display');
    if (pagePathDisplay === 'block') {
        return;
    }

    if (page!="content") {
        history.pushState(null, null, `${location.protocol}//${location.host}/?dog=${modal}&page=${page}`)
    } else {
        history.pushState(null, null, `${location.protocol}//${location.host}/?dog=${modal}`)
    }

    btn.disabled = true;

    let buttons = document.querySelectorAll(`#${modal}.profile .profile_items .profile_about .profile_nav button`);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }

    btn.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

    let parentDiv = document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_text`);
    let childDivs = parentDiv.children;

    for (let i = 0; i < childDivs.length; i++) {
        if (childDivs[i].tagName === 'DIV') {
        childDivs[i].style.opacity = '0';
        childDivs[i].style.transition = 'opacity 0.3s';
        }
    }

    setTimeout(() => {
        for (let i = 0; i < childDivs.length; i++) {
            if (childDivs[i].tagName === 'DIV' && childDivs[i] !== pagePath) {
                childDivs[i].style.display = 'none';
            }
        }

        pagePath.style.display = 'block';
        pagePath.style.opacity = '0';

        setTimeout(() => {
            pagePath.style.opacity = '1';
            pagePath.style.transition = 'opacity 0.3s';

            btn.disabled = false;
        }, 35);

    }, 200);
    return;
}
