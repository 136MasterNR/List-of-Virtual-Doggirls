/* Enable Tooltips */
$('[data-toggle="tooltip"]').tooltip()

/* Copy Function */
function copy(link,profile) {
    navigator.clipboard.writeText(link);
    if (profile) {
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
