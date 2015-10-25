window.addEventListener('load', function() {
  var wrap = document.getElementById("wrap");
  chrome.storage.local.get('access_token', function (result) {
    if (result.access_token) {
      wrap.innerHTML = '<a href="#">Выйти</a>';
    } else {
      wrap.innerHTML = '<a href="#">Подключить ВК</a>';
    }
  });
});