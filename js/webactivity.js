var platform = getDevice();

function setPlatform(input) {
    platform = input;
}

function getDevice () {
    var ua = navigator.userAgent;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var device = {
    ios: ipad || iphone || ipod,
    android: android
    };
    return device.ios ? "ios" : "android";
}

function getPlatform() {
    switch (platform) {
        case "android": alert("Android is current platform!"); break;
        case "ios": alert("iOS is current platform!"); break;
    }
}

localStorage.removeItem = function(key) {
    delete localStorage[key];
    if (typeof MyJS != "undefined") MyJS.localStorageChanged(key);
}

//Возвращает значение по заданному ключу
function getLocalStorageValue(key) {
    return localStorage.getItem(key);
}

localStorage.setItem = function(key, value) {
    localStorage[key] = value;
    if (typeof MyJS != "undefined") MyJS.localStorageChanged(key);
}

//Возвращает список ключей в localStorage
function getLocalStorageKeys() {
    var str = '';
    for (var key in localStorage){
        str += key + ","
    }
    str = str.slice(0, -1);
    return str;
}

//Обёртка для функции добавления в localStorage
function localStorageSetItem(key, value) {
    localStorage.setItem(key, value);
    if (typeof MyJS != "undefined") MyJS.localStorageChanged(key);
}


var menuButtonEvent;
var backButtonEvent;
var volumeUpEvent;
var volumeDownEvent;

var deviceReadyEvent;

var batteryLevelChangedEvent;

var locationChangedEvent;
var magneticHeadingEvent;

var appCloseEvent;
var appMaximizeEvent;


var localeVar = parseGET()['locale'];


function parseGET() {
    var tmp = new Array();
    var tmp2 = new Array();
    var get = new Array();
    
    var url = location.search;
    
    if (url != '') {
        tmp = (url.substr(1)).split('&');
        
        for(var i=0; i < tmp.length; i++) {
            tmp2 = tmp[i].split('=');
            
            get[tmp2[0]] = tmp2[1];
        }
    }
    
    return get;
}


var bufferEventVar = {
speed: 0,
longitude: 0,
latitude: 0,
altitude: 0,
magneticHeading: 0,
trueHeading: 0,
batteryLevel: 0,
deviceID: 0,
batteryLevel: 0,
flashLightWork: 0,
brightnessLevel: 0
};


function getBufferEventVar(){
    return bufferEventVar;
}




document.addEventListener('DOMContentLoaded', function(){
                          menuButtonEvent = document.createEvent('Event');
                          menuButtonEvent.initEvent('menubutton', false, false);
                          
                          backButtonEvent = document.createEvent('Event');
                          backButtonEvent.initEvent('backbutton', false, false);
                          
                          volumeUpEvent = document.createEvent('Event');
                          volumeUpEvent.initEvent('volumeup', false, false);
                          
                          volumeDownEvent = document.createEvent('Event');
                          volumeDownEvent.initEvent('volumedown', false, false);
                          
                          deviceReadyEvent = document.createEvent('Event');
                          deviceReadyEvent.initEvent('deviceready', false, false);
                          
                          batteryLevelChangedEvent = document.createEvent('Event');
                          batteryLevelChangedEvent.initEvent('batteryLevelChangedEvent', false, false);
                          
                          locationChangedEvent = document.createEvent('Event');
                          locationChangedEvent.initEvent('locationChangedEvent', false, false);
                          
                          magneticHeadingEvent = document.createEvent('Event');
                          magneticHeadingEvent.initEvent('magneticHeadingEvent', false, false);
                          
                          providerDisabledEvent = document.createEvent('Event');
                          providerDisabledEvent.initEvent('providerDisabledEvent', false, false);
                          
                          providerEnabledEvent = document.createEvent('Event');
                          providerEnabledEvent.initEvent('providerEnabledEvent', false, false);
                          
                          magneticFieldChangedEvent = document.createEvent('Event');
                          magneticFieldChangedEvent.initEvent('magneticFieldChangedEvent', false, false);
                          
                          alarmEvent = document.createEvent('Event');
                          alarmEvent.initEvent('alarmEvent', false, false);
                          
                          cameraCapturedImageEvent = document.createEvent('Event');
                          cameraCapturedImageEvent.initEvent('cameraCapturedImageEvent', false, false);
                          
                          pickedImageEvent = document.createEvent('Event');
                          pickedImageEvent.initEvent('pickedImageEvent', false, false);
                          
                          pickedImageErrorEvent = document.createEvent('Event');
                          pickedImageErrorEvent.initEvent('pickedImageErrorEvent', false, false);
                          
                          filePartCopyEvent = document.createEvent('Event');
                          filePartCopyEvent.initEvent('filePartCopyEvent', false, false);
                          
                          finishFileCopyEvent = document.createEvent('Event');
                          finishFileCopyEvent.initEvent('finishFileCopyEvent', false, false);
                          
                          fakeUpdateStarted = document.createEvent('Event');
                          fakeUpdateStarted.initEvent('fakeUpdateStarted', false, false);
                          
                          fakeUpdateFinished = document.createEvent('Event');
                          fakeUpdateFinished.initEvent('fakeUpdateFinished', false, false);
                          
                          handMoveEvent = document.createEvent('Event');
                          handMoveEvent.initEvent('handMoveEvent', false, false);
                          
                          pedometrEvent = document.createEvent('Event');
                          pedometrEvent.initEvent('pedometrEvent', false, false);
                          
                          callMoveEvent = document.createEvent('Event');
                          callMoveEvent.initEvent('callMoveEvent', false, false);
                          
                          appCloseEvent = document.createEvent('Event');
                          appCloseEvent.initEvent('appCloseEvent', false, false);
                          
                          appMaximizeEvent = document.createEvent('Event');
                          appMaximizeEvent.initEvent('appMaximizeEvent', false, false);
                          
                          mediaPrepared = document.createEvent('Event');
                          mediaPrepared.initEvent('mediaPrepared', false, false);
                          
                          if (typeof MyJS != "undefined") {
                          MyJS.checkFakeUpdate();
                          }
                          }, false);

document.addEventListener("DOMContentLoaded", function() {
                          if (platform == "android") {
                          if (typeof JSAPI == 'object') {
                          return;
                          }
                          (function() {
                           JSAPI = function() {
                           function bridge(func) {
                           var args = Array.prototype.slice.call(arguments.callee.caller.arguments, 0);
                           var res = prompt("jsapi."+func, JSON.stringify(args));
                           try {
                           res = JSON.parse(res);
                           res = (res && res.result) ? res.result : null;
                           }
                           catch (e) {
                           res = null;
                           }
                           return JSON.parse(res);
                           }
                           
                           this.clearCookies = function() {
                           return bridge('clearCookies');
                           }
                           
                           this.newSound = function() {
                           return bridge('newSound');
                           }
                           
                           this.playSound = function(id, vol) {
                           return bridge("playSound");
                           }
                           
                           this.playLoopedSound = function(id, vol) {
                           return bridge("playLoopedSound");
                           }
                           
                           this.playLoopedSound = function(id, vol) {
                           return bridge("playLoopedSound");
                           }
                           
                           this.stopSound = function(id) {
                           return bridge("stopSound");
                           }
                           
                           this.newMedia = function(link) {
                           return bridge("createMedia");
                           }
                           
                           this.mediaLoop = function(id, state) {
                           return bridge("mediaLoop");
                           }
                           
                           this.mediaPlay = function(id) {
                           bridge("mediaPlay");
                           }
                           
                           this.mediaStop = function(id) {
                           bridge("mediaStop");
                           }
                           
                           this.mediaPause = function(id) {
                           bridge("mediaPause");
                           }
                           
                           this.mediaRelease = function(id) {
                           bridge("mediaRelease");
                           }
                           
                           this.mediaSetVolume = function(count, id) {
                           bridge("mediaSetVolume");
                           }
                           
                           
                           this.mediaSeekTo = function(id, time) {
                           bridge("mediaSeekTo");
                           }
                           
                           
                           this.vibrate = function(time) {
                           return bridge('vibration');
                           }
                           
                           
                           this.toast = function(message) {
                           return bridge('toast');
                           }
                           
                           
                           this.changeOrientation = function(orientation) {
                           return bridge('changeOrientation');
                           }
                           
                           
                           this.flashLightOn = function() {
                           return bridge('flashLightOn');
                           }
                           
                           
                           this.flashLightOff = function() {
                           return bridge('flashLightOff');
                           }
                           
                           
                           this.keepScreenOn = function() {
                           bridge('keepScreenOn');
                           }
                           
                           
                           this.setFullScreen = function() {
                           bridge('setFullScreen');
                           }
                           
                           
                           this.setButtonHandler = function(input) {
                           bridge('setButtonHandler');
                           }
                           
                           this.unsetButtonHandler = function(input) {
                           bridge('unsetButtonHandler');
                           }
                           
                           
                           this.mediaGetPosition = function(mid) {
                           return bridge('mediaGetPosition');
                           }
                           
                           
                           this.mediaGetDuration = function(mid) {
                           return bridge('mediaGetDuration');
                           }
                           
                           this.listenLocation = function(minTime,  minDistance, providerStr) {
                           return bridge('listenLocation');
                           }
                           
                           this.stopListenLocation = function() {
                           return bridge('stopListenLocation');
                           }
                           
                           this.takePhoto = function() {
                           return bridge('takePhoto');
                           }
                           
                           this.listenMagneticField = function(delayMicrosec) {
                           return bridge('listenMagneticField');
                           }
                           
                           this.stopListenMagneticField = function() {
                           return bridge('stopListenMagneticField');
                           }
                           
                           this.getContactList = function(params) {
                           return bridge('getContactList');
                           }
                           
                           this.getCallList = function(params) {
                           return bridge('getCallList');
                           }
                           
                           
                           this.getInSmsList = function(params) {
                           return bridge('getInSmsList');
                           }
                           
                           this.getOutSmsList = function(params) {
                           return bridge('getOutSmsList');
                           }
                           
                           this.makePhoneCall = function(params) {
                           return bridge('makePhoneCall');
                           }
                           
                           this.sendSms = function(number,msg) {
                           return bridge('sendSms');
                           }
                           
                           this.createUnitAlarm = function(type,time,alarmId) {
                           return bridge('createUnitAlarm');
                           }
                           
                           this.createRepeatAlarm = function(type,time,timeInterval,alarmId) {
                           return bridge('createRepeatAlarm');
                           }
                           
                           this.cancelAlarm = function(alarmId) {
                           return bridge('cancelAlarm');
                           }
                           
                           this.cancelAlarm = function(alarmId) {
                           return bridge('cancelAlarm');
                           }
                           
                           this.createUnitNotif = function( type,  time,  alarmId,  title,	 text) {
                           return bridge('createUnitNotif');
                           }
                           
                           this.createUnitNotif = function( type,  time,  alarmId,  title,	 text) {
                           return bridge('createUnitNotif');
                           }
                           
                           this.cancelNotif = function(alarmId) {
                           return bridge('cancelNotif');
                           }
                           
                           this.takePhoto = function() {
                           return bridge('takePhoto');
                           }
                           
                           this.pickPhoto = function() {
                           return bridge('pickPhoto');
                           }
                           
                           this.getFileListForDir = function(dir) {
                           return bridge('getFileListForDir');
                           }
                           
                           this.getSdDir = function() {
                           return bridge('getSdDir');
                           }
                           
                           this.getRootDir = function() {
                           return bridge('getRootDir');
                           }
                           
                           this.copy = function(from, to) {
                           return bridge('copy');
                           }
                           
                           this.createDir = function(folder) {
                           return bridge('createDir');
                           }
                           
                           this.createFile = function(path) {
                           return bridge('createFile');
                           }
                           
                           this.deleteFile = function(path) {
                           return bridge('deleteFile');
                           }
                           
                           this.move = function(from, to) {
                           return bridge('move');
                           }
                           
                           this.getFileSize = function(path) {
                           return bridge('getFileSize');
                           }
                           
                           this.startListenGesture = function() {
                           return bridge('startListenGesture');
                           }
                           
                           this.stopListenGesture = function() {
                           return bridge('stopListenGesture');
                           }
                           
                           this.startListenPedometrPeriodic = function(interval,isSendUniqOnly) {
                           return bridge('startListenPedometrPeriodic');
                           }
                           
                           this.stopListenPedometr = function() {
                           return bridge('stopListenPedometr');
                           }
                           
                           this.startListenCallMove = function() {
                           return bridge('startListenCallMove');
                           }
                           
                           this.stopListenCallMove = function() {
                           return bridge('stopListenCallMove');
                           }
                           
                           this.isSDMounted = function() {
                           return bridge('isSDMounted');
                           }
                           
                           this.writeFileSD = function(filePath, text,isAppend) {
                           return bridge('writeFileSD');
                           }
                           
                           this.getTextFromFileSD = function(filePath ) {
                           return bridge('getTextFromFileSD');
                           }
                           
                           this.writeFileInternal = function(filePath, text, isAppend ) {
                           return bridge('writeFileInternal');
                           }
                           
                           this.getTextFromFileInternal = function(filePath) {
                           return bridge('getTextFromFileInternal');
                           }
                           
                           this.exit = function() {
                           return bridge('exit');
                           }
                           
                           this.openDatabase = function(dbName) {
                           return bridge('openDatabase');
                           }
                           
                           this.showAd = function() {
                           return bridge('showAd');
                           }
                           
                           this.closeDatabase = function(dbName) {
                           return bridge('openDatabase');
                           }
                           
                           this.deleteDatabase = function(dbName) {
                           return bridge('deleteDatabase');
                           }
                           
                           this.rawQuery = function(dbName, query) {
                           return bridge('rawQuery');
                           }
                           
                           this.beginTransaction = function(dbName) {
                           return bridge('beginTransaction');
                           }
                           
                           this.endTransaction = function(dbName) {
                           return bridge('endTransaction');
                           }
                           
                           this.setTransactionSuccessful = function(dbName) {
                           return bridge('setTransactionSuccessful');
                           }
                           
                           this.insertInTable = function(dbName, tableName, data) {
                           return bridge('insertInTable');
                           }
                           
                           this.updateInTable = function(dbName, tableName, data,where) {
                           return bridge('updateInTable');
                           }
                           
                           this.deleteInTable = function(dbName, tableName,where) {
                           return bridge('deleteInTable');
                           }
                           
                           this.getActiveNetworkList = function() {
                           return bridge('getActiveNetworkList');
                           }
                           
                           this.getAvailableNetworkList = function() {
                           return bridge('getAvailableNetworkList');
                           }
                           
                           this.testMethod1 = function() {
                           return bridge('testMethod1');
                           }
                           
                           this.testMethod2 = function() {
                           return bridge('testMethod2');
                           }
                           
                           this.testMethod3 = function() {
                           return bridge('testMethod3');
                           }

                           this.saveImage = function(path, data) {
                              return bridge('saveImage');
                           }
                           
                           this.getSettings = function() {
                           }
                           
                           this.setStatusBarColor = function(input) {
                           }
                           };
                           window.JSAPI = new JSAPI();
                           })(window);
                          window.dispatchEvent(deviceReadyEvent);
                          }
                          else if (platform == "ios") {
                          if (typeof JSAPI == 'object') {
                          return;
                          }
                          (function() {
                           JSAPI = function() {
                           this.console = true;
                           
                           this.test = function() {
                           if (this.console) console.log("JSAPI: test() invoked.");
                           if (typeof MyJS != "undefined") MyJS.test();
                           }
                           
                           this.vibrate = function(input) {
                           if (this.console) console.log("JSAPI: vibrate(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.vibrate(input);
                           }
                           
                           this.pickPhoto = function() {
                           if (this.console) console.log("JSAPI: pickPhoto() invoked.");
                           if (typeof MyJS != "undefined") MyJS.showPhotoView();
                           }
                           
                           this.takePhoto = function() {
                           if (this.console) console.log("JSAPI: takePhoto() invoked.");
                           if (typeof MyJS != "undefined") MyJS.takePhoto();
                           }
                           
                           this.reload = function() {
                           if (this.console) console.log("JSAPI: reload() invoked.");
                           if (typeof MyJS != "undefined") MyJS.reload();
                           }
                           
                           this.sharing = function (text, img) {
                           if (this.console) console.log("JSAPI: share(" + text + ")");
                           if (typeof MyJS != "undefined") MyJS.sharingwithImg(text, img);
                           }
                           
                           this.showAd = function() {
                           if (this.console) console.log("JSAPI: showAd() invoked.");
                           if (typeof MyJS != "undefined") MyJS.showAd();
                           }
                           
                           this.newMedia = function(link) {
                           if (this.console) console.log("JSAPI: newMedia(" + link + ") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.newSound(link);
                           }
                           
                           this.mediaPlay = function(id) {
                           if (this.console) console.log("JSAPI: mediaPlay("+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.playMedia(id);
                           }
                           
                           this.mediaStop = function(id) {
                           if (this.console) console.log("JSAPI: mediaStop("+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopSound(id);
                           }
                           
                           this.mediaPause = function(id) {
                           if (this.console) console.log("JSAPI: mediaPause("+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.pauseSound(id);
                           }
                           
                           this.mediaSetVolume = function(id, volume) {
                           if (this.console) console.log("JSAPI: mediaSetVolume("+volume+", "+id+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.changeVolume(volume, id);
                           }
                           
                           this.mediaSeekTo = function(id, position) {
                           if (this.console) console.log("JSAPI: mediaSeekTo("+id+", "+position+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setPosition(id, position);
                           }
                           
                           this.mediaLoop = function(id, state) {
                           if (this.console) console.log("JSAPI: mediaLoop("+id+", "+state+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setLoop(id, state);
                           }
                           
                           this.mediaGetDuration = function(id) {
                           if (this.console) console.log("JSAPI: mediaGetDuration("+id+") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.getDuration(id);
                           }
                           
                           this.mediaGetPosition = function(id) {
                           if (this.console) console.log("JSAPI: mediaGetPosition("+id+") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.getPosition(id);
                           }
                           
                           this.newSound = function(link) {
                           if (this.console) console.log("JSAPI: newSound(" + link + ") invoked.");
                           if (typeof MyJS != "undefined") return MyJS.newSound(link);
                           }
                           
                           this.playSound = function(id, volume) {
                           if (this.console) console.log("JSAPI: playSound("+id+", "+volume+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.playSoundwithVolume(id, volume);
                           }
                           
                           this.setVolume = function(id, volume) {
                           if (this.console) console.log("JSAPI: setVolume("+id+", "+volume+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.changeVolume(id, volume);
                           }
                           
                           this.playLoopedSound = function(id, volume) {
                           if (this.console) console.log("JSAPI: playLoopedSound("+id+", "+volume+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.playLoopedSoundwithVolume(id, volume);
                           }
                           
                           this.stopSound = function(id) {
                           if (this.console) console.log("JSAPI: stopSound(" + id + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopSound(id);
                           }
                           
                           this.createUnitNotif = function(notificationMode, notTime, notifierId, topText, statusBar, fullText, vibrationTime, soundLink) {
                           if (this.console) console.log("JSAPI: createUnitNotif("+notificationMode+", "+notTime+", "+notifierId+", "+topText+", "+statusBar+", "+fullText+", "+vibrationTime+", "+soundLink+") invoked.");
                           var noTime = notTime/1000;
                           if (typeof MyJS != "undefined") MyJS.createNotificationwithIdwithDate(fullText, notifierId, noTime);
                           }
                           
                           this.cancelNotif = function(input) {
                           if (this.console) console.log("JSAPI: cancelNotif(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.cancelNotification(input);
                           }
                           
                           this.setButtonHandler = function(input){
                           if (this.console) console.log("JSAPI: setButtonHandler(" + input + ") invoked.");
                           return (input);
                           }
                           
                           this.listenLocation = function(minDelay, minDistance, locationProvider){
                           if (this.console) console.log("JSAPI: listenLocation("+minDelay+", "+minDistance+", "+locationProvider+") invoked.");
                           if (typeof MyJS != "undefined") MyJS.listenLocation(locationProvider);
                           }
                           
                           this.stopListenLocation = function() {
                           if (this.console) console.log("JSAPI: stopListenLocation() invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopListenLocation();
                           }
                           
                           this.log = function(input) {
                           console.log(input);
                           if (typeof MyJS != "undefined") MyJS.log("JSAPI: "+ input);
                           }
                           
                           this.keepScreenOn = function() {
                           if (this.console) console.log("JSAPI: keepScreenOn() invoked.");
                           if (typeof MyJS != "undefined") MyJS.setLockDisabled();
                           }
                           
                           this.unsetScreenOn = function() {
                           if (this.console) console.log("JSAPI: unsetScreenOn() invoked.");
                           if (typeof MyJS != "undefined") MyJS.setLockEnabled();
                           }
                           
                           this.getDeviceId = function() {
                           if (this.console) console.log("JSAPI: getDeviceId() invoked.");
                           if (typeof MyJS != "undefined") MyJS.getDeviceId();
                           }
                           
                           this.setFullScreen = function() {
                           if (this.console) console.log("JSAPI: setFullScreen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.hideStatusBar();
                           }
                           
                           this.unsetFullScreen = function() {
                           if (this.console) console.log("JSAPI: unsetFullScreen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.showStatusBar();
                           }
                           
                           this.getSettings = function() {
                           if (this.console) console.log("JSAPI: getNotificationSettings() invoked.");
                           if (typeof MyJS != "undefined") MyJS.getNotificationSettings();
                           }
                           
                           this.setStatusBarColor = function(input) {
                           if (this.console) console.log("JSAPI: setStatusBarColor(\""+input+"\") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setStatusBarColor(input);
                           }
                           
                           this.flashLightOn = function() {
                           if (this.console) console.log("JSAPI: flashLightOn() invoked.");
                           if (typeof MyJS != "undefined") MyJS.flashLightOn();
                           }
                           
                           this.flashLightOff = function() {
                           if (this.console) console.log("JSAPI: flashLightOff() invoked.");
                           if (typeof MyJS != "undefined") MyJS.flashLightOff();
                           }
                           
                           this.isFlashLight = function() {
                           if (this.console) console.log("JSAPI: isFlashLight() invoked.");
                           if (typeof MyJS != "undefined") MyJS.isFlashLight();
                           }
                           
                           this.flashLightLevel = function(input) {
                           if (this.console) console.log("JSAPI: flashLightLevel(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.flashLightLevel(input);
                           }
                           
                           this.setScreenBrightness = function(input) {
                           if (this.console) console.log("JSAPI: setScreenBrightness(" + input + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.setScreenBrightness(input);
                           }
                           
                           this.getScreenBrightness = function() {
                           if (this.console) console.log("JSAPI: getScreenBrightness() invoked.");
                           if (typeof MyJS != "undefined") MyJS.getScreenBrightness();
                           }
                           
                           this.getBatteryLevel = function() {
                           if (this.console) console.log("JSAPI: getBatteryLevel() invoked.");
                           if (typeof MyJS != "undefined") MyJS.getBatteryLevel();
                           }
                           
                           this.startBatteryLevelChangedListen = function() {
                           if (this.console) console.log("JSAPI: startBatteryLevelChangedListen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.startBatteryLevelChangedListen();
                           }
                           
                           this.stopBatteryLevelChangedListen = function() {
                           if (this.console) console.log("JSAPI: stopBatteryLevelChangedListen() invoked.");
                           if (typeof MyJS != "undefined") MyJS.stopBatteryLevelChangedListen();
                           }
                           
                           this.resaveDataFromWatch = function() {
                           if (this.console) console.log("JSAPI: resaveDataFromWatch() invoked.");
                           if (typeof MyJS != "undefined") MyJS.resaveDataFromWatch();
                           }

                           this.saveDataToWormHole = function(data) {
                           if (this.console) console.log("JSAPI: saveDataToWormHole(" + data + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.saveDataToWormHole(data);
                           }

                           this.saveDataToWormHoleWithIdentifier = function(data, identifier) {
                           if (this.console) console.log("JSAPI: saveDataToWormHole(" + data + ", " + identifier + ") invoked.");
                           if (typeof MyJS != "undefined") MyJS.saveDataToWormHolewithIdentifier(data, identifier);
                           }


                           };
                           window.JSAPI = new JSAPI();
                           })(window);
                          }
                          });


function Sound(link) {
    
    this.id = JSAPI.newSound(link);
    this.mvolume = "1";
    
    this.volume = function(input) {
        this.mvolume = "" + input;
    }
    
    this.play = function() {
        JSAPI.playSound(this.id, this.mvolume);
    }
    
    this.playLooped = function() {
        JSAPI.playLoopedSound(this.id, this.mvolume);
    }
    
    this.stop = function() {
        JSAPI.stopSound(this.id);
    }
    
}


function Media(link) {
    this.id = "" + JSAPI.newMedia(link);
    
    this.play = function() {
        JSAPI.mediaPlay(this.id);
    }
    
    this.loop = function(state) {
        JSAPI.mediaLoop(this.id, state);
    }
    
    this.stop = function() {
        JSAPI.mediaStop(this.id);
    }
    
    this.pause = function() {
        JSAPI.mediaPause(this.id);
    }
    
    this.volume = function(count) {
        JSAPI.mediaSetVolume(""+count, this.id);
    }
    
    this.seekto = function(time) {
        JSAPI.mediaSeekTo(this.id, ""+time);
    }
    
    this.duration = function() {
        return JSAPI.mediaGetDuration(this.id);
    }
    
    this.position = function() {
        return JSAPI.mediaGetPosition(this.id);
    }
    
    this.release = function() {
        JSAPI.mediaRelease(this.id);
    }
    
}
