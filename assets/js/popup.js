function warn(link) {
  document.getElementById("warn_url").href=`${link}`; 
  return false;
};

function dismissWarn() {
  $('#warnModal').modal('hide');
  return false;
};