// キーボードリスナーを登録する。
{
"use strict";
const jquery = require('jquery');
window.$ = window.jQuery = jquery;
const util = require('./util');


function getHeadingText(){
    return $("title").text().replace(/\n/g, "").replace(/^ +/, "").replace(/ +$/g, "")
}

$(document).keydown(function(event){
    if(event.ctrlKey){
        if(event.shiftKey){
            if(event.key === "Y"){
                chrome.runtime.sendMessage({method: "copyUrlOfAllTab"}, function(response) {});
            }
        }else{
            if(event.key === "y"){
                util.copyTextToClipboard("- [" + getHeadingText() + "](" + decodeURIComponent(location.href) + ")");
            }else if(event.key === "c"){
                util.copyTextToClipboard(getHeadingText());
            }else if(event.key === "q"){
                util.copyTextToClipboard(decodeURIComponent(location.href));
            }
        }
    }
})

}
