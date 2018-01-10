// メッセージが来たら、現在開いているページのurlをコピーする。

{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const util = require('./util')


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.method == "copyUrlOfActiveTab"){
        chrome.tabs.query({active: true, currentWindow: true}, function(result){
            const activeTab = result[0];
            const url = decodeURIComponent(activeTab.url);
            util.copyTextToClipboard(url);
        })
    }
    if (request.method == "copyUrlOfAllTab"){
        chrome.tabs.query({currentWindow: true}, function(result){
            let urlsText = "";
            for(let activeTab of result){
                const url = decodeURIComponent(activeTab.url);
                if(url.match(/chrome:\/\/extensions\/.*/)){   // google searchの結果ページはコピーしない。
                    continue
                }
                if(url.match(/.*google.*search?.*/)){   // google searchの結果ページはコピーしない。
                    continue
                }
                urlsText = urlsText + url + "\n";
            }
            util.copyTextToClipboard(urlsText);
        })
    }

    sendResponse({});
});

}
