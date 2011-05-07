var oldVal= "";
var sendMessageP = false
var selectNotify = function(inArray,badgeType){
  if(sendMessageP){
     var notification = webkitNotifications.createNotification(
        'icons/icon-48.png',  // icon url - can be relative
        'you have selected',  // notification title
        inArray.value  // notification body text
      );
      notification.ondisplay = function(){
        chrome.browserAction.setBadgeBackgroundColor({color: [218 , 17 , 2 , 255]});
        chrome.browserAction.setBadgeText({text:badgeType});
        chrome.browserAction.setPopup({popup: 'popup.html'});
      }
      notification.show();
      sendMessageP = false;
  }
  return "SelectNotify()";
}

$(function() {
	chrome.extension.onConnect.addListener(function(port) {
     if(port.name == "selectedText"){
       port.onMessage.addListener(function(msg) {
         if(msg.value.length && oldVal != msg.value)
           sendMessageP = true;
           oldVal = msg.value;
       });
     }
  });
  
  var allYourContext = chrome.contextMenus.create({title: "type of data to send", contexts:['selection']});
  var stringContext = chrome.contextMenus.create({title: "ASCII", parentId: allYourContext, contexts:['selection'],onclick:function(){selectNotify(oldVal,'str')}});
    var base64Context = chrome.contextMenus.create({title: "Base64", parentId: allYourContext, contexts:['selection'],onclick:function(){selectNotify(oldVal,'b64')}});
    var binaryContext = chrome.contextMenus.create({title: "Binary", parentId: allYourContext, contexts:['selection'],onclick:function(){selectNotify(oldVal,'010')}});
    var decimalContext = chrome.contextMenus.create({title: "Decimal", parentId: allYourContext, contexts:['selection'],onclick:function(){selectNotify(oldVal,'dec')}});
    var hexContext = chrome.contextMenus.create({title: "Hexadecimal", parentId: allYourContext, contexts:['selection'],onclick:function(){selectNotify(oldVal,'hex')}});
    var urlContext = chrome.contextMenus.create({title: "URL Encoded", parentId: allYourContext, contexts:['selection'],onclick:function(){selectNotify(oldVal,'url')}});
    var urlComponentContext = chrome.contextMenus.create({title: "URL Component", parentId: allYourContext, contexts:['selection'],onclick:function(){selectNotify(oldVal,'url+')}});
});