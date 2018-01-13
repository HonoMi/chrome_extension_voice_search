{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.method !== "createTab"){
        sendResponse({});
    }
    chrome.tabs.create({url: "https://www.google.co.jp/", active:true }, function(tab){
            const newtabTabId = tab.id;
            const storageKey = "extension_OpenGoogleResults__tabKey_" + newtabTabId;
            // 新規タブのロードが完了したら、click_voice_search.js を実行。
            chrome.tabs.onUpdated.addListener(function (tabId , info) {
                if (tabId === newtabTabId && info.status === 'complete') {
                    chrome.tabs.executeScript(null, {file: "scripts/click_voice_search.js"});
                }
            });
        });
    sendResponse({});
});

}
