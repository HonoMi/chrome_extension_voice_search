/**
* クリップボードコピー関数
* 入力値をクリップボードへコピーする
* [引数]   textVal: 入力値
* [返却値] true: 成功　false: 失敗
*/


exports.copyTextToClipboard = function(textVal){
    const copyFrom = document.createElement("textarea");
    copyFrom.textContent = textVal;

    const bodyElm = document.getElementsByTagName("body")[0];
    bodyElm.appendChild(copyFrom);

    copyFrom.select();
    const retVal = document.execCommand('copy');
    bodyElm.removeChild(copyFrom);

    return retVal;
}
