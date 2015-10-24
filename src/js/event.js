chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'focus_window') {
        window.focus();
    }
});

//если токена нет пересылай на вк или на options?id

window.addEventListener('load', function() {
    //делаем запрос на сервер по хешу
    //засунуть дату в ДОМ
    //пару хандлеров для ajax запросов на сервер для ДА и НЕТ
});