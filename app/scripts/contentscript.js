// キーボードリスナーを登録する。
{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const util = require('./util');

$(document).keydown(function(event){
    if(event.ctrlKey){
        if(event.key === "m"){
            chrome.runtime.sendMessage({method: "createTab"}, function(response) {});
        }
    }

})

}
