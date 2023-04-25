/* Enable Tooltips */
$('[data-toggle="tooltip"]').tooltip({
    animated: 'fade',
    html: true
});

/* Detect Back Button */
window.addEventListener('popstate', () => {
    location.reload();
});

/* Copy Function */
const copy = (profile) => {
    if (profile) {
        navigator.clipboard.writeText(`https://doggirls.pages.dev/?dog=${profile}`);
        $(document.querySelector(`#${profile} .profile_items .profile_text .title snap`)).tooltip('hide')
            .attr('data-original-title', 'Copied!')
            .tooltip('show');
        setTimeout(
            () => {
                $(document.querySelector(`#${profile} .profile_items .profile_text .title snap`)).tooltip('hide')
                    .attr('data-original-title', 'Copy Profile Link')
        }, 2000);
    }
}

/* Secure Mails */
const secure = (element, domain, at, event) => {
    event.preventDefault();
    element.outerHTML = `<a href="mailto:${domain}&#64;${at}&#46;com">${domain}&#64;${at}&#46;com</a> <i class="fa-solid fa-envelope fa-sm" aria-hidden="true"></i>`;
}

/* Search Features */
const searchBox = document.getElementById('search-box');
const vtuberDivs = document.querySelectorAll('.vtuber');
const noResultsMessage = document.getElementById('no-results-message');

searchBox.addEventListener('input', () => {
  const searchTerm = searchBox.value.toLowerCase();
  let hasResults = false;

  vtuberDivs.forEach(vtuberDiv => {
    const nameElement = vtuberDiv.querySelector('.text .name');
    if (nameElement !== null) {
      const name = nameElement.textContent.toLowerCase();
      if (name.includes(searchTerm) && (vtuberDiv.id !=='introduce-your-self')) {
        vtuberDiv.style.display = '';
        hasResults = true;
      } else {
        vtuberDiv.style.display = 'none';
      }
      if (hasResults==true) {document.getElementById('introduce-your-self').style.display = '';}
    }
  });

  if (hasResults) {
    noResultsMessage.style.display = 'none';
  } else {
    noResultsMessage.style.display = 'block';
  }
});

const search = () => {
  const searchContainer = document.querySelector('.webflow-style-input');
  const vtubers = document.getElementById('vtubers');
  vtubers.style.animation = '';
  if (searchContainer.style.display === 'flex') {
    vtubers.style.transition = 'transform 0.5s ease';
    vtubers.style.transform = 'translateY(-85px)';
    setTimeout(() => {
      searchContainer.style.display = 'none';
      vtubers.style.transition = 'transform 0s';
      vtubers.style.transform = 'translateY(0)';
    }, 500);
    vtuberDivs.forEach(vtuberDiv => {
      const nameElement = vtuberDiv.querySelector('.text .name');
      if (nameElement !== null) {
        vtuberDiv.style.display = '';
      }
    });
    noResultsMessage.style.display = 'none';
  } else {
    searchContainer.style.display = 'flex';
    vtubers.style.transition = 'transform 0s';
    vtubers.style.transform = 'translateY(-85px)';
    setTimeout(() => {
      vtubers.style.transition = 'transform 0.5s ease';
      vtubers.style.transform = 'translateY(0)';
    }, 25);
  }

  searchBox.value = '';
};
