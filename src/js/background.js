import { API } from './core/helpers/config';

var authTabId, kostil; //ужас

chrome.notifications.onClicked.addListener(function (id) {
    chrome.notifications.clear(id);

    chrome.tabs.create({ url: "event.html#" + id, active: true }, function (tab) {
      chrome.tabs.sendMessage(tab.id, { action: "focus_window" });
    });
});

chrome.notifications.onButtonClicked.addListener(function (id, button) {
  chrome.notifications.clear(id);

  //отправляет запрос на сервер в зависимости от кнопки
});

chrome.storage.onChanged.addListener(function (changes) {
  chrome.storage.local.get('access_token', function (result) {
    if (result.access_token) {
      kostil = setInterval(function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', API + 'events', true);
        xhr.setRequestHeader('token', result.access_token);
        xhr.send();
        xhr.onreadystatechange = function() {
          if (this.readyState != 4) { return; }

          let {description, place, time} = JSON.parse(this.responseText)[0];

          chrome.notifications.create('event', {
            type: 'basic',
            iconUrl: 'img/48.png',
            title: 'Go!',
            //message: `${description} at ${place}! ${time}`,
            message: 'Идем гулять на петроградке, сейчас.',
            isClickable: true,
            buttons: [{ title: 'Иду' }, { title: 'Не иду' }]
          });

        };
      }, 10000);
    } else {
      clearInterval(kostil);
    }
  });
});

chrome.tabs.onUpdated.addListener(function handler(tabId, changeInfo) {
  if(tabId == authTabId && changeInfo.url != undefined && changeInfo.status == "loading") {
    if (changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
      var vkAccessToken = getUrlParameterValue(changeInfo.url, 'access_token');

      if (vkAccessToken.length) {
        // expiration!
        chrome.storage.local.set({ 'access_token': vkAccessToken }, function () {
          chrome.tabs.onUpdated.removeListener(handler);
          chrome.tabs.remove(tabId);
        });
      }
    }
  }
});

chrome.runtime.onInstalled.addListener(function () {
  var authUrl = 'https://oauth.vk.com/authorize?client_id=5118943&scope=friends,offline&' +
      'redirect_uri=http%3A%2F%2Foauth.vk.com%2Fblank.html&display=page&response_type=token';

  chrome.tabs.create({ url: authUrl, active: true }, function(tab) {
    authTabId = tab.id;
  });

  console.log(a);

});

function getUrlParameterValue(url, parameterName) {
  var temp, index, parameterValue, urlParameters;

  urlParameters = url.substr(url.indexOf("#") + 1).split("&");

  for (index = 0; index < urlParameters.length; index += 1) {
    temp = urlParameters[index].split("=");

    if (temp[0] === parameterName) {
      return temp[1];
    }
  }

  return parameterValue;
}