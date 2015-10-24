var authTabId, kostil; //ужас

/**
 * Retrieve a value of a parameter from the given URL string
 *
 * @param  {string} url           Url string
 * @param  {string} parameterName Name of the parameter
 *
 * @return {string}               Value of the parameter
 */
function getUrlParameterValue(url, parameterName) {
  "use strict";

  var urlParameters  = url.substr(url.indexOf("#") + 1),
      parameterValue = "",
      index,
      temp;

  urlParameters = urlParameters.split("&");

  for (index = 0; index < urlParameters.length; index += 1) {
    temp = urlParameters[index].split("=");

    if (temp[0] === parameterName) {
      return temp[1];
    }
  }

  return parameterValue;
}

chrome.notifications.onClicked.addListener(function (id) {
    chrome.notifications.clear(id);

    chrome.tabs.create({ url: "event.html#" + id, active: true }, function (tab) {
      chrome.tabs.sendMessage(tab.id, { action: "focus_window" });
    });
});

//пару хандлеров для ajax запросов на сервер для ДА и нЕТ, а еще закрыть нотифицацию

chrome.storage.onChanged.addListener(function (changes) {
  chrome.storage.local.get('accesss_token', function (result) {
    console.log(result);
    if (!result.access_token) {
      kostil = setInterval(function () {
        //делаем запрос на сервер
        //выводить последне сообщение ЛОЛ
        // пишем вместо ивет - id
        chrome.notifications.create('event', {
          type: 'basic',
          iconUrl: 'img/48.png',
          title: 'Go!',
          message: 'Time to make the toast.',
          isClickable: true,
          buttons: [{ title: 'Иду' }, { title: 'Не иду' }]
        });
      }, 10000);
    } else {
      clearInterval(kostil);
    }
  });
});

chrome.tabs.onUpdated.addListener(function handler(tabId, changeInfo) {
  if(tabId == authTabId && changeInfo.url != undefined && changeInfo.status == "loading") {
    if (changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
      vkAccessToken = getUrlParameterValue(changeInfo.url, 'access_token');

      if (vkAccessToken.length) {
        // expiration!
        chrome.storage.local.set({'access_token': vkAccessToken}, function () {
          console.log(vkAccessToken);
          chrome.tabs.onUpdated.removeListener(handler);
          chrome.tabs.remove(tabId);
        });
      }
    }
  }
});

chrome.runtime.onInstalled.addListener(function () {
  //chrome.tabs.create({ url: "chrome://extensions/?options=" + chrome.runtime.id, active: true });
  var authUrl = 'https://oauth.vk.com/authorize?client_id=5118943&scope=friends,offline&' +
      'redirect_uri=http%3A%2F%2Foauth.vk.com%2Fblank.html&display=page&response_type=token';

  chrome.tabs.create({ url: authUrl, active: true }, function(tab) {
    authTabId = tab.id;
  });

});