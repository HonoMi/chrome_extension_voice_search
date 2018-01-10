// メッセージが来たら、現在開いているページのurlをコピーする。

{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const util = require('./util')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "createTab"){
        chrome.tabs.create({url: "https://www.google.co.jp/", active:true }, function(tab){
            const newtabTabId = tab.id;
            const storageKey = "extension_OpenGoogleResults__tabKey_" + newtabTabId;
            localStorage[storageKey] = "not done";   // Done or not.
            // 新規タブのロードが完了したら、click_voice_search.js を実行。
            chrome.tabs.onUpdated.addListener(function (tabId , info) {
                if (tabId === newtabTabId && info.status === 'complete' && localStorage[storageKey]==="not done") {
                    chrome.tabs.executeScript(null, {file: "click_voice_search.js"});
                    localStorage[storageKey] = "Done";
                }
            });
        });
    }
    sendResponse({});
});

}
