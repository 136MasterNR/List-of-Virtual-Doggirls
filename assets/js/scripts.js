/* Enable Tooltips */ $('[data-toggle="tooltip"]').tooltip()

/* Copy Function */
function copy(link,profile) {
    navigator.clipboard.writeText(link);
    if (profile) {
        $(document.querySelector(`#${profile} .profile_items .profile_text .title snap`)).tooltip('hide')
            .attr('data-original-title', 'Copied!')
            .tooltip('show');
        setTimeout(
            function() {
                $(document.querySelector(`#${profile} .profile_items .profile_text .title snap`)).tooltip('hide')
                    .attr('data-original-title', 'Copy Profile Link')
        }, 2000);
    }
}

/* Incopatibilty Changes for Experimental Updates

if (window.innerWidth < 1100) {
    document.getElementById('list_pochi_wanmaru').onclick=null
    document.getElementById('list_pochi_wanmaru').href="https://www.youtube.com/channel/UCP0csSl19lOSNwJGCFsJqAQ"
}

*/