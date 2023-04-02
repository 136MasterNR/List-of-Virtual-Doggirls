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
