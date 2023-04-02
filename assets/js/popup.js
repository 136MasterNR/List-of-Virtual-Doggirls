const warn = (link) => {
  document.getElementById("warn_url").href=`${link}`; 
  return false;
};

const dismissWarn = () => {
  $('#warnModal').modal('hide');
  return false;
};