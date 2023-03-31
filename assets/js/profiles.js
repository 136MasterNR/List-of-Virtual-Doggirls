const screenWidth = window.innerWidth;
const animationDuration = screenWidth < 500 ? '0.5s' : '0.75s';

// Wait for the page to finish loading before adding the image loading event listener

function transition(modal) {
    sessionStorage.setItem("scrollPosition", window.scrollY || document.documentElement.scrollTop);
    let vtubers=document.getElementById('vtubers')
    let content=document.getElementById(modal)
    let bottom=document.getElementById('bottom')
    vtubers.style.animation=`offscreen ${animationDuration} ease-in forwards 1`;
    bottom.style.animation=`offscreen ${animationDuration} ease-in forwards 1`;
    const transitionFinalize = function() {
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
  let page = searchParams.get('page');
  if (page) {
    page=page.toLowerCase()
    let pagePath = document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_text .${page}`);
    if (pagePath) {
      document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_text .content`).style.display = "none";
      let buttons = document.querySelectorAll(`#${modal}.profile .profile_items .profile_about .profile_nav .wrapper button`);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      }
      document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_nav .wrapper .${page}`).style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      console.log(pagePath)
      pagePath.style.display = 'block';
      pagePath.style.opacity = '1';
    }
  }
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

function page(modal, page, btn) {

  let pagePath = document.querySelector(`#${modal}.profile .profile_items .profile_about .profile_text .${page}`);

  let pagePathDisplay = window.getComputedStyle(pagePath).getPropertyValue('display');
  if (pagePathDisplay === 'block') {
    return;
  }

  if (page!="content") {
    try {
        history.pushState(null, null, `https://136masternr.github.io/doggirls/?dog=${modal}&page=${page}`)
    } catch(err) {
        history.pushState(null, null, `${location.protocol}//${location.host}/?dog=${modal}&page=${page}`)
    }
  } else {
    try {
        history.pushState(null, null, `https://136masternr.github.io/doggirls/?dog=${modal}`)
    } catch(err) {
        history.pushState(null, null, `${location.protocol}//${location.host}/?dog=${modal}`)
    }
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
}
