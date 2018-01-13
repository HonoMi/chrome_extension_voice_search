// キーボードリスナーを登録する。
{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const Rx = require('rxjs');

function sendMessage(keyboardEvent){
    if(keyboardEvent.ctrlKey){
        if(keyboardEvent.key === "m"){
            chrome.runtime.sendMessage({method: "createTab"}, function(response) {});
        }
    }
}

$(document).ready(()=>{
    Rx.Observable.fromEvent(document, 'keydown')
        .subscribe(
            event => sendMessage(event),
            err => console.log('[Error] ' + err),
            () => console.log('[complete]'));
    }
)

}
