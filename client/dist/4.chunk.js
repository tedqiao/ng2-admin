webpackJsonpac__name_([4],{

/***/ "./node_modules/ng2-ui-auth/dist/ng2-ui-auth.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _angular_core = __webpack_require__("./node_modules/@angular/core/index.js");
var rxjs_Observable = __webpack_require__("./node_modules/rxjs/Observable.js");
var _angular_http = __webpack_require__("./node_modules/@angular/http/index.js");
var rxjs_add_operator_switchMap = __webpack_require__("./node_modules/rxjs/add/operator/switchMap.js");
var rxjs_add_observable_interval = __webpack_require__("./node_modules/rxjs/add/observable/interval.js");
var rxjs_add_observable_fromEvent = __webpack_require__("./node_modules/rxjs/add/observable/fromEvent.js");
var rxjs_add_observable_empty = __webpack_require__("./node_modules/rxjs/add/observable/empty.js");
var rxjs_add_operator_take = __webpack_require__("./node_modules/rxjs/add/operator/take.js");
var rxjs_add_operator_takeWhile = __webpack_require__("./node_modules/rxjs/add/operator/takeWhile.js");
var rxjs_add_observable_of = __webpack_require__("./node_modules/rxjs/add/observable/of.js");
var rxjs_add_operator_do = __webpack_require__("./node_modules/rxjs/add/operator/do.js");

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

var CustomConfig = (function () {
    function CustomConfig() {
    }
    return CustomConfig;
}());
var ConfigService = (function () {
    function ConfigService(config) {
        var _this = this;
        this.withCredentials = false;
        this.tokenRoot = null;
        this.baseUrl = '/';
        this.loginUrl = '/auth/login';
        this.signupUrl = '/auth/signup';
        this.unlinkUrl = '/auth/unlink/';
        this.refreshUrl = '/auth/refresh';
        this.tokenName = 'token';
        this.tokenSeparator = '_';
        this.tokenPrefix = 'ng2-ui-auth';
        this.authHeader = 'Authorization';
        this.authToken = 'Bearer';
        this.storageType = 'localStorage';
        this.defaultHeaders = null;
        this.autoRefreshToken = false;
        this.cordova = !!window['cordova'];
        this.resolveToken = function (response) {
            var accessToken = response && response.json() &&
                (response.json().access_token || response.json().token || response.json().data);
            if (!accessToken) {
                console.warn('No token found');
                return null;
            }
            if (typeof accessToken === 'string') {
                return accessToken;
            }
            if (typeof accessToken !== 'object') {
                console.warn('No token found');
                return null;
            }
            var tokenRootData = _this.tokenRoot &&
                _this.tokenRoot.split('.').reduce(function (o, x) {
                    return o[x];
                }, accessToken);
            var token = tokenRootData ? tokenRootData[_this.tokenName] : accessToken[_this.tokenName];
            if (token) {
                return token;
            }
            var tokenPath = _this.tokenRoot ? _this.tokenRoot + '.' + _this.tokenName : _this.tokenName;
            console.warn('Expecting a token named "' + tokenPath);
            return null;
        };
        this.providers = {
            facebook: {
                name: 'facebook',
                url: '/auth/facebook',
                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 580, height: 400 }
            },
            google: {
                name: 'google',
                url: '/auth/google',
                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                optionalUrlParams: ['display', 'state'],
                scope: ['profile', 'email'],
                scopePrefix: 'openid',
                scopeDelimiter: ' ',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 452, height: 633 },
                state: function () { return encodeURIComponent(Math.random().toString(36).substr(2)); },
            },
            github: {
                name: 'github',
                url: '/auth/github',
                authorizationEndpoint: 'https://github.com/login/oauth/authorize',
                redirectUri: window.location.origin,
                optionalUrlParams: ['scope'],
                scope: ['user:email'],
                scopeDelimiter: ' ',
                oauthType: '2.0',
                popupOptions: { width: 1020, height: 618 }
            },
            instagram: {
                name: 'instagram',
                url: '/auth/instagram',
                authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                scope: ['basic'],
                scopeDelimiter: '+',
                oauthType: '2.0'
            },
            linkedin: {
                name: 'linkedin',
                url: '/auth/linkedin',
                authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
                redirectUri: window.location.origin,
                requiredUrlParams: ['state'],
                scope: ['r_emailaddress'],
                scopeDelimiter: ' ',
                state: 'STATE',
                oauthType: '2.0',
                popupOptions: { width: 527, height: 582 }
            },
            twitter: {
                name: 'twitter',
                url: '/auth/twitter',
                authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
                redirectUri: window.location.origin,
                oauthType: '1.0',
                popupOptions: { width: 495, height: 645 }
            },
            twitch: {
                name: 'twitch',
                url: '/auth/twitch',
                authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
                redirectUri: window.location.origin,
                requiredUrlParams: ['scope'],
                scope: ['user_read'],
                scopeDelimiter: ' ',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 500, height: 560 }
            },
            live: {
                name: 'live',
                url: '/auth/live',
                authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
                redirectUri: window.location.origin,
                requiredUrlParams: ['display', 'scope'],
                scope: ['wl.emails'],
                scopeDelimiter: ' ',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 500, height: 560 }
            },
            yahoo: {
                name: 'yahoo',
                url: '/auth/yahoo',
                authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
                redirectUri: window.location.origin,
                scope: [],
                scopeDelimiter: ',',
                oauthType: '2.0',
                popupOptions: { width: 559, height: 519 }
            },
            bitbucket: {
                name: 'bitbucket',
                url: '/auth/bitbucket',
                authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                oauthType: '2.0',
                popupOptions: { width: 1028, height: 529 }
            },
            spotify: {
                name: 'spotify',
                url: '/auth/spotify',
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                redirectUri: window.location.origin,
                optionalUrlParams: ['state'],
                requiredUrlParams: ['scope'],
                scope: ['user-read-email'],
                scopePrefix: '',
                scopeDelimiter: ',',
                oauthType: '2.0',
                popupOptions: { width: 500, height: 530 },
                state: function () { return encodeURIComponent(Math.random().toString(36).substr(2)); }
            }
        };
        Object.keys(config).forEach(function (key) {
            if (typeof config[key] === "undefined") {
                return;
            }
            if (key !== 'providers') {
                _this[key] = config[key];
            }
            else {
                Object.keys(config[key]).forEach(function (provider) {
                    if (typeof _this.providers[provider] === 'undefined') {
                        _this.providers[provider] = config.providers[provider];
                    }
                    else {
                        Object.keys(config.providers[provider]).forEach(function (prop) {
                            _this.providers[provider][prop] = config.providers[provider][prop];
                        });
                    }
                });
            }
        });
    }
    ConfigService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [CustomConfig])
    ], ConfigService);
    return ConfigService;
}());

var StorageService = (function () {
    function StorageService(config) {
        var _this = this;
        this.config = config;
        this.store = {};
        this.isStorageAvailable = (function () {
            try {
                var supported = config.storageType in window && window[config.storageType] !== null;
                if (supported) {
                    var key = Math.random().toString(36).substring(7);
                    window[_this.config.storageType].setItem(key, '');
                    window[_this.config.storageType].removeItem(key);
                }
                return supported;
            }
            catch (e) {
                return false;
            }
        })();
        if (!this.isStorageAvailable) {
            console.warn(config.storageType + ' is not available.');
        }
    }
    StorageService.prototype.get = function (key) {
        return this.isStorageAvailable ? window[this.config.storageType].getItem(key) : this.store[key];
    };
    StorageService.prototype.set = function (key, value) {
        return this.isStorageAvailable ? window[this.config.storageType].setItem(key, value) : this.store[key] = value;
    };
    StorageService.prototype.remove = function (key) {
        return this.isStorageAvailable ? window[this.config.storageType].removeItem(key) : delete this.store[key];
    };
    StorageService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _a) || Object])
    ], StorageService);
    return StorageService;
    var _a;
}());

var SharedService = (function () {
    function SharedService(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join(this.config.tokenSeparator) : this.config.tokenName;
    }
    SharedService.prototype.getToken = function () {
        return this.storage.get(this.tokenName);
    };
    SharedService.prototype.getPayload = function () {
        var token = this.getToken();
        if (token && token.split('.').length === 3) {
            try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
            }
            catch (e) {
                return undefined;
            }
        }
    };
    SharedService.prototype.setToken = function (response) {
        if (!response) {
            console.warn('Can\'t set token without passing a value');
            return;
        }
        var token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            token = this.config.resolveToken(response);
        }
        this.storage.set(this.tokenName, token);
    };
    SharedService.prototype.removeToken = function () {
        this.storage.remove(this.tokenName);
    };
    SharedService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        if (token) {
            if (token.split('.').length === 3) {
                try {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var exp = JSON.parse(window.atob(base64)).exp;
                    if (exp) {
                        var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                        if (isExpired) {
                            this.storage.remove(this.tokenName);
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
                catch (e) {
                    return true;
                }
            }
            return true;
        }
        return false;
    };
    SharedService.prototype.getExpirationDate = function () {
        var payload = this.getPayload();
        if (payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            var date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    };
    SharedService.prototype.logout = function () {
        this.storage.remove(this.tokenName);
        return rxjs_Observable.Observable.create(function (observer) {
            observer.next();
            observer.complete();
        });
    };
    SharedService.prototype.setStorageType = function (type) {
        this.config.storageType = type;
    };
    SharedService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof StorageService !== 'undefined' && StorageService) === 'function' && _a) || Object, (typeof (_b = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _b) || Object])
    ], SharedService);
    return SharedService;
    var _a, _b;
}());

var JwtHttp = (function (_super) {
    __extends(JwtHttp, _super);
    function JwtHttp(_backend, _defaultOptions, _shared, _config) {
        _super.call(this, _backend, _defaultOptions);
        this._shared = _shared;
        this._config = _config;
    }
    JwtHttp.prototype.request = function (url, options) {
        var _this = this;
        if (this._shared.getToken() && !this._shared.getExpirationDate() &&
            options.autoRefreshToken ||
            typeof options.autoRefreshToken === 'undefined' && this._config.autoRefreshToken) {
            return this.refreshToken()
                .switchMap(function () { return _this.actualRequest(url, options); });
        }
        return this.actualRequest(url, options);
    };
    JwtHttp.prototype.get = function (url, options) {
        options = options || {};
        options.method = _angular_http.RequestMethod.Get;
        return this.request(url, options);
    };
    JwtHttp.prototype.post = function (url, body, options) {
        options = options || {};
        options.method = _angular_http.RequestMethod.Post;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.put = function (url, body, options) {
        options = options || {};
        options.method = _angular_http.RequestMethod.Put;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.delete = function (url, options) {
        options = options || {};
        options.method = _angular_http.RequestMethod.Delete;
        return this.request(url, options);
    };
    JwtHttp.prototype.patch = function (url, body, options) {
        options = options || {};
        options.method = _angular_http.RequestMethod.Patch;
        options.body = body;
        return this.request(url, options);
    };
    JwtHttp.prototype.head = function (url, options) {
        options = options || {};
        options.method = _angular_http.RequestMethod.Head;
        return this.request(url, options);
    };
    JwtHttp.prototype.refreshToken = function () {
        var _this = this;
        var authHeader = new _angular_http.Headers();
        authHeader.append(this._config.authHeader, (this._config.authToken + ' ' + this._shared.getToken()));
        return _super.prototype
            .get.call(this, this._config.refreshUrl, {
            headers: authHeader
        })
            .do(function (res) { return _this._shared.setToken(res); });
    };
    JwtHttp.prototype.actualRequest = function (url, options) {
        if (url instanceof _angular_http.Request) {
            url.headers = url.headers || new _angular_http.Headers();
            this.setHeaders(url);
        }
        else {
            options = options || {};
            this.setHeaders(options);
        }
        return _super.prototype.request.call(this, url, options);
    };
    JwtHttp.prototype.setHeaders = function (obj) {
        var _this = this;
        obj.headers = obj.headers || new _angular_http.Headers();
        if (this._config.defaultHeaders) {
            Object.keys(this._config.defaultHeaders).forEach(function (defaultHeader) {
                if (!obj.headers.has(defaultHeader)) {
                    obj.headers.set(defaultHeader, _this._config.defaultHeaders[defaultHeader]);
                }
            });
        }
        if (this._shared.isAuthenticated()) {
            obj.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
        }
    };
    JwtHttp = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.ConnectionBackend !== 'undefined' && _angular_http.ConnectionBackend) === 'function' && _a) || Object, (typeof (_b = typeof _angular_http.RequestOptions !== 'undefined' && _angular_http.RequestOptions) === 'function' && _b) || Object, (typeof (_c = typeof SharedService !== 'undefined' && SharedService) === 'function' && _c) || Object, (typeof (_d = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _d) || Object])
    ], JwtHttp);
    return JwtHttp;
    var _a, _b, _c, _d;
}(_angular_http.Http));

function assign(target) {
    var src = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        src[_i - 1] = arguments[_i];
    }
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}
function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    var joined = [baseUrl, url].join('/');
    var normalize = function (str) {
        return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
    };
    return normalize(joined);
}
function merge(obj1, obj2) {
    var result = {};
    for (var i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
                result[i] = merge(obj1[i], obj2[i]);
            }
            else {
                result[i] = obj1[i];
            }
        }
    }
    for (i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            if (i in result) {
                continue;
            }
            result[i] = obj2[i];
        }
    }
    return result;
}
function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    });
}

var PopupService = (function () {
    function PopupService(config) {
        this.config = config;
        this.url = '';
        this.popupWindow = null;
    }
    PopupService.prepareOptions = function (options) {
        options = options || {};
        var width = options.width || 500;
        var height = options.height || 500;
        return assign({
            width: width,
            height: height,
            left: window.screenX + ((window.outerWidth - width) / 2),
            top: window.screenY + ((window.outerHeight - height) / 2.5)
        }, options);
    };
    PopupService.stringifyOptions = function (options) {
        return Object.keys(options).map(function (key) {
            return key + '=' + options[key];
        }).join(',');
    };
    PopupService.parseQueryString = function (joinedKeyValue) {
        var key, value;
        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, {});
    };
    PopupService.prototype.open = function (url, name, options) {
        this.url = url;
        var stringifiedOptions = PopupService.stringifyOptions(PopupService.prepareOptions(options));
        var UA = window.navigator.userAgent;
        var windowName = (this.config.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;
        this.popupWindow = window.open(url, windowName, stringifiedOptions);
        window['popup'] = this.popupWindow;
        if (this.popupWindow && this.popupWindow.focus) {
            this.popupWindow.focus();
        }
        return this;
    };
    PopupService.prototype.eventListener = function (redirectUri) {
        var _this = this;
        return rxjs_Observable.Observable
            .fromEvent(this.popupWindow, 'loadstart')
            .switchMap(function (event) {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return rxjs_Observable.Observable.of('Popup Window Closed');
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return rxjs_Observable.Observable.empty();
            }
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                var hash = PopupService.parseQueryString(hashParams);
                var qs = PopupService.parseQueryString(queryParams);
                var allParams = assign({}, qs, hash);
                _this.popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return rxjs_Observable.Observable.of(allParams);
                }
            }
            return rxjs_Observable.Observable.empty();
        })
            .take(1)
            .takeWhile(function (response) { return response !== 'Popup Window Closed'; });
    };
    PopupService.prototype.pollPopup = function () {
        var _this = this;
        return rxjs_Observable.Observable
            .interval(50)
            .switchMap(function () {
            if (!_this.popupWindow || _this.popupWindow.closed) {
                return rxjs_Observable.Observable.of('Popup Window Closed');
            }
            var documentOrigin = document.location.host;
            var popupWindowOrigin = '';
            try {
                popupWindowOrigin = _this.popupWindow.location.host;
            }
            catch (error) {
            }
            if (popupWindowOrigin === documentOrigin && (_this.popupWindow.location.search || _this.popupWindow.location.hash)) {
                var queryParams = _this.popupWindow.location.search.substring(1).replace(/\/$/, '');
                var hashParams = _this.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                var hash = PopupService.parseQueryString(hashParams);
                var qs = PopupService.parseQueryString(queryParams);
                _this.popupWindow.close();
                var allParams = assign({}, qs, hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return rxjs_Observable.Observable.of(allParams);
                }
            }
            return rxjs_Observable.Observable.empty();
        })
            .take(1)
            .takeWhile(function (response) { return response !== 'Popup Window Closed'; });
    };
    PopupService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _a) || Object])
    ], PopupService);
    return PopupService;
    var _a;
}());

var Oauth1Service = (function () {
    function Oauth1Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    Oauth1Service.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = assign({}, Oauth1Service.base, options);
        var popupWindow;
        var serverUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        if (!this.config.cordova) {
            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions);
        }
        return this.http.post(serverUrl, JSON.stringify(this.defaults))
            .switchMap(function (response) {
            if (_this.config.cordova) {
                popupWindow = _this.popup.open([_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?'), _this.defaults.name, _this.defaults.popupOptions);
            }
            else {
                popupWindow.popupWindow.location =
                    [_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?');
            }
            return _this.config.cordova ? popupWindow.eventListener(_this.defaults.redirectUri) : popupWindow.pollPopup();
        })
            .switchMap(function (response) {
            var exchangeForToken = options.exchangeForToken;
            if (typeof exchangeForToken !== 'function') {
                exchangeForToken = _this.exchangeForToken.bind(_this);
            }
            return exchangeForToken(response, userData);
        });
    };
    Oauth1Service.prototype.exchangeForToken = function (oauthData, userData) {
        var data = assign({}, this.defaults, oauthData, userData);
        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, data, { withCredentials: this.config.withCredentials });
    };
    Oauth1Service.prototype.buildQueryString = function (obj) {
        return Object.keys(obj).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    };
    Oauth1Service.base = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
    };
    Oauth1Service = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof JwtHttp !== 'undefined' && JwtHttp) === 'function' && _a) || Object, (typeof (_b = typeof PopupService !== 'undefined' && PopupService) === 'function' && _b) || Object, (typeof (_c = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _c) || Object])
    ], Oauth1Service);
    return Oauth1Service;
    var _a, _b, _c;
}());

var Oauth2Service = (function () {
    function Oauth2Service(http, popup, storage, config) {
        this.http = http;
        this.popup = popup;
        this.storage = storage;
        this.config = config;
    }
    Oauth2Service.prototype.open = function (options, userData) {
        var _this = this;
        this.defaults = merge(options, Oauth2Service.base);
        var url;
        var openPopup;
        var stateName = this.defaults.name + '_state';
        var state = this.defaults.state;
        if (typeof state === 'string') {
            this.storage.set(stateName, state);
        }
        else if (typeof state === 'function') {
            this.storage.set(stateName, state());
        }
        url = [this.defaults.authorizationEndpoint, this.buildQueryString()].join('?');
        if (this.config.cordova) {
            openPopup = this.popup
                .open(url, this.defaults.name, this.defaults.popupOptions)
                .eventListener(this.defaults.redirectUri);
        }
        else {
            openPopup = this.popup
                .open(url, this.defaults.name, this.defaults.popupOptions)
                .pollPopup();
        }
        return openPopup
            .switchMap(function (oauthData) {
            if (!options.exchangeForToken && (_this.defaults.responseType === 'token' || !_this.defaults.url)) {
                return rxjs_Observable.Observable.of(oauthData);
            }
            if (oauthData.state && oauthData.state !== _this.storage.get(stateName)) {
                throw 'OAuth "state" mismatch';
            }
            var exchangeForToken = options.exchangeForToken;
            if (typeof exchangeForToken !== 'function') {
                exchangeForToken = _this.exchangeForToken.bind(_this);
            }
            return exchangeForToken(oauthData, userData);
        });
    };
    Oauth2Service.prototype.exchangeForToken = function (oauthData, userData) {
        var data = assign({}, this.defaults, oauthData, userData);
        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
        return this.http.post(exchangeForTokenUrl, JSON.stringify(data), { withCredentials: this.config.withCredentials });
    };
    Oauth2Service.prototype.buildQueryString = function () {
        var _this = this;
        var keyValuePairs = [];
        var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
        urlParams.forEach(function (params) {
            if (_this.defaults[params]) {
                _this.defaults[params].forEach(function (paramName) {
                    var camelizedName = camelCase(paramName);
                    var paramValue = typeof _this.defaults[paramName] === 'function' ?
                        _this.defaults[paramName]() :
                        _this.defaults[camelizedName];
                    if (paramName === 'state') {
                        var stateName = _this.defaults.name + '_state';
                        paramValue = encodeURIComponent(_this.storage.get(stateName));
                    }
                    if (paramName === 'scope' && Array.isArray(paramValue)) {
                        paramValue = paramValue.join(_this.defaults.scopeDelimiter);
                        if (_this.defaults.scopePrefix) {
                            paramValue = [_this.defaults.scopePrefix, paramValue].join(_this.defaults.scopeDelimiter);
                        }
                    }
                    keyValuePairs.push([paramName, paramValue]);
                });
            }
        });
        return keyValuePairs.map(function (pair) {
            return pair.join('=');
        }).join('&');
    };
    Oauth2Service.base = {
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        responseType: 'code',
        responseParams: {
            code: 'code',
            clientId: 'clientId',
            redirectUri: 'redirectUri'
        }
    };
    Oauth2Service = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof JwtHttp !== 'undefined' && JwtHttp) === 'function' && _a) || Object, (typeof (_b = typeof PopupService !== 'undefined' && PopupService) === 'function' && _b) || Object, (typeof (_c = typeof StorageService !== 'undefined' && StorageService) === 'function' && _c) || Object, (typeof (_d = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _d) || Object])
    ], Oauth2Service);
    return Oauth2Service;
    var _a, _b, _c, _d;
}());

var OauthService = (function () {
    function OauthService(http, injector, shared, config) {
        this.http = http;
        this.injector = injector;
        this.shared = shared;
        this.config = config;
    }
    OauthService.prototype.authenticate = function (name, userData) {
        var _this = this;
        var provider = this.config.providers[name].oauthType === '1.0' ? this.injector.get(Oauth1Service) : this.injector.get(Oauth2Service);
        return provider.open(this.config.providers[name], userData || {})
            .do(function (response) {
            if (_this.config.providers[name].url) {
                _this.shared.setToken(response);
            }
        });
    };
    OauthService.prototype.unlink = function (provider, opts) {
        opts = opts || {};
        var url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.unlinkUrl);
        opts.body = JSON.stringify({ provider: provider }) || opts.body;
        opts.method = opts.method || 'POST';
        return this.http.request(url, opts);
    };
    OauthService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof JwtHttp !== 'undefined' && JwtHttp) === 'function' && _a) || Object, (typeof (_b = typeof _angular_core.Injector !== 'undefined' && _angular_core.Injector) === 'function' && _b) || Object, (typeof (_c = typeof SharedService !== 'undefined' && SharedService) === 'function' && _c) || Object, (typeof (_d = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _d) || Object])
    ], OauthService);
    return OauthService;
    var _a, _b, _c, _d;
}());

function getFullOpts(user, userOpts) {
    var opts = userOpts || {};
    if (user) {
        opts.body = typeof user === 'string' ? user : JSON.stringify(user);
    }
    opts.method = opts.method || 'POST';
    return opts;
}
var LocalService = (function () {
    function LocalService(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    LocalService.prototype.login = function (user, opts) {
        var _this = this;
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.loginUrl);
        return this.http.request(url, fullOpts)
            .do(function (response) { return _this.shared.setToken(response); });
    };
    LocalService.prototype.signup = function (user, opts) {
        var fullOpts = getFullOpts(user, opts);
        var url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.signupUrl);
        return this.http.request(url, getFullOpts(user, fullOpts));
    };
    LocalService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof JwtHttp !== 'undefined' && JwtHttp) === 'function' && _a) || Object, (typeof (_b = typeof SharedService !== 'undefined' && SharedService) === 'function' && _b) || Object, (typeof (_c = typeof ConfigService !== 'undefined' && ConfigService) === 'function' && _c) || Object])
    ], LocalService);
    return LocalService;
    var _a, _b, _c;
}());

var AuthService = (function () {
    function AuthService(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    AuthService.prototype.login = function (user, opts) {
        return this.local.login(user, opts);
    };
    AuthService.prototype.signup = function (user, opts) {
        return this.local.signup(user, opts);
    };
    AuthService.prototype.logout = function () {
        return this.shared.logout();
    };
    AuthService.prototype.authenticate = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    AuthService.prototype.link = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    AuthService.prototype.unlink = function (provider, opts) {
        return this.oauth.unlink(provider, opts);
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.shared.isAuthenticated();
    };
    AuthService.prototype.getToken = function () {
        return this.shared.getToken();
    };
    AuthService.prototype.setToken = function (token) {
        this.shared.setToken(token);
    };
    AuthService.prototype.removeToken = function () {
        this.shared.removeToken();
    };
    AuthService.prototype.getPayload = function () {
        return this.shared.getPayload();
    };
    AuthService.prototype.setStorageType = function (type) {
        this.shared.setStorageType(type);
    };
    AuthService.prototype.getExpirationDate = function () {
        return this.shared.getExpirationDate();
    };
    AuthService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof SharedService !== 'undefined' && SharedService) === 'function' && _a) || Object, (typeof (_b = typeof LocalService !== 'undefined' && LocalService) === 'function' && _b) || Object, (typeof (_c = typeof OauthService !== 'undefined' && OauthService) === 'function' && _c) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b, _c;
}());

var Ng2UiAuthModule = (function () {
    function Ng2UiAuthModule() {
    }
    Ng2UiAuthModule.getWithConfig = function (config) {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                { provide: CustomConfig, useClass: config },
                { provide: ConfigService, useClass: ConfigService, deps: [CustomConfig] },
                { provide: StorageService, useClass: StorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                { provide: JwtHttp, useClass: JwtHttp, deps: [_angular_http.XHRBackend, _angular_http.RequestOptions, SharedService, ConfigService] },
                { provide: OauthService, useClass: OauthService, deps: [JwtHttp, _angular_core.Injector, SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: Oauth1Service, useClass: Oauth1Service, deps: [JwtHttp, PopupService, ConfigService] },
                { provide: Oauth2Service, useClass: Oauth2Service, deps: [JwtHttp, PopupService, StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [JwtHttp, SharedService, ConfigService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },]
        };
    };
    Ng2UiAuthModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_http.HttpModule]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2UiAuthModule);
    return Ng2UiAuthModule;
}());

exports.Ng2UiAuthModule = Ng2UiAuthModule;
exports.LocalService = LocalService;
exports.Oauth2Service = Oauth2Service;
exports.Oauth1Service = Oauth1Service;
exports.PopupService = PopupService;
exports.OauthService = OauthService;
exports.JwtHttp = JwtHttp;
exports.SharedService = SharedService;
exports.StorageService = StorageService;
exports.AuthService = AuthService;
exports.ConfigService = ConfigService;
exports.CustomConfig = CustomConfig;
//# sourceMappingURL=ng2-ui-auth.js.map


/***/ },

/***/ "./node_modules/rxjs/Scheduler.js":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/empty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var empty_1 = __webpack_require__("./node_modules/rxjs/observable/empty.js");
Observable_1.Observable.empty = empty_1.empty;
//# sourceMappingURL=empty.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/fromEvent.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var fromEvent_1 = __webpack_require__("./node_modules/rxjs/observable/fromEvent.js");
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/interval.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var interval_1 = __webpack_require__("./node_modules/rxjs/observable/interval.js");
Observable_1.Observable.interval = interval_1.interval;
//# sourceMappingURL=interval.js.map

/***/ },

/***/ "./node_modules/rxjs/add/observable/of.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var of_1 = __webpack_require__("./node_modules/rxjs/observable/of.js");
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/do.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var do_1 = __webpack_require__("./node_modules/rxjs/operator/do.js");
Observable_1.Observable.prototype.do = do_1._do;
Observable_1.Observable.prototype._do = do_1._do;
//# sourceMappingURL=do.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/switchMap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var switchMap_1 = __webpack_require__("./node_modules/rxjs/operator/switchMap.js");
Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/take.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var take_1 = __webpack_require__("./node_modules/rxjs/operator/take.js");
Observable_1.Observable.prototype.take = take_1.take;
//# sourceMappingURL=take.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/takeWhile.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var takeWhile_1 = __webpack_require__("./node_modules/rxjs/operator/takeWhile.js");
Observable_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
//# sourceMappingURL=takeWhile.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/FromEventObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @parm {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/IntervalObservable.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__("./node_modules/rxjs/util/isNumeric.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var async_1 = __webpack_require__("./node_modules/rxjs/scheduler/async.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IntervalObservable = (function (_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = async_1.async;
        }
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified Scheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` Scheduler to provide a notion of time, but you may pass any
     * Scheduler to it.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link delay}
     *
     * @param {number} [period=0] The interval size in milliseconds (by default)
     * or the time unit determined by the scheduler's clock.
     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a sequential number each time
     * interval.
     * @static true
     * @name interval
     * @owner Observable
     */
    IntervalObservable.create = function (period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
        var index = state.index, subscriber = state.subscriber, period = state.period;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };
    return IntervalObservable;
}(Observable_1.Observable));
exports.IntervalObservable = IntervalObservable;
//# sourceMappingURL=IntervalObservable.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/empty.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
exports.empty = EmptyObservable_1.EmptyObservable.create;
//# sourceMappingURL=empty.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/fromEvent.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromEventObservable_1 = __webpack_require__("./node_modules/rxjs/observable/FromEventObservable.js");
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ },

/***/ "./node_modules/rxjs/observable/interval.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var IntervalObservable_1 = __webpack_require__("./node_modules/rxjs/observable/IntervalObservable.js");
exports.interval = IntervalObservable_1.IntervalObservable.create;
//# sourceMappingURL=interval.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/do.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}
exports._do = _do;
var DoOperator = (function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DoSubscriber = (function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _super.call(this, destination);
        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function (value) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.next(value);
        }
    };
    DoSubscriber.prototype._error = function (err) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.error(err);
        }
    };
    DoSubscriber.prototype._complete = function () {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.complete();
        }
    };
    return DoSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=do.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/switchMap.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/take.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var ArgumentOutOfRangeError_1 = __webpack_require__("./node_modules/rxjs/util/ArgumentOutOfRangeError.js");
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of `next` values to emit.
 * @return {Observable<T>} An Observable that emits only the first `count`
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @method take
 * @owner Observable
 */
function take(count) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(count));
    }
}
exports.take = take;
var TakeOperator = (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeSubscriber = (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        if (++this.count <= total) {
            this.destination.next(value);
            if (this.count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=take.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/takeWhile.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Emits values emitted by the source Observable so long as each value satisfies
 * the given `predicate`, and then completes as soon as this `predicate` is not
 * satisfied.
 *
 * <span class="informal">Takes values from the source only while they pass the
 * condition given. When the first value does not satisfy, it completes.</span>
 *
 * <img src="./img/takeWhile.png" width="100%">
 *
 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
 * emitted on the source is given to the `predicate` function which returns a
 * boolean, representing a condition to be satisfied by the source values. The
 * output Observable emits the source values until such time as the `predicate`
 * returns false, at which point `takeWhile` stops mirroring the source
 * Observable and completes the output Observable.
 *
 * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.takeWhile(ev => ev.clientX > 200);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates a value emitted by the source Observable and returns a boolean.
 * Also takes the (zero-based) index as the second argument.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable so long as each value satisfies the condition defined by the
 * `predicate`, then completes.
 * @method takeWhile
 * @owner Observable
 */
function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
}
exports.takeWhile = takeWhile;
var TakeWhileOperator = (function () {
    function TakeWhileOperator(predicate) {
        this.predicate = predicate;
    }
    TakeWhileOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
    };
    return TakeWhileOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeWhileSubscriber = (function (_super) {
    __extends(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.index = 0;
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;
        try {
            result = this.predicate(value, this.index++);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        }
        else {
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=takeWhile.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/Action.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AsyncAction.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var Action_1 = __webpack_require__("./node_modules/rxjs/scheduler/Action.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.delay = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/AsyncScheduler.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__("./node_modules/rxjs/Scheduler.js");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ },

/***/ "./node_modules/rxjs/scheduler/async.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var AsyncAction_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncAction.js");
var AsyncScheduler_1 = __webpack_require__("./node_modules/rxjs/scheduler/AsyncScheduler.js");
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=async.js.map

/***/ },

/***/ "./node_modules/rxjs/util/ArgumentOutOfRangeError.js":
/***/ function(module, exports) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var err = _super.call(this, 'argument out of range');
        this.name = err.name = 'ArgumentOutOfRangeError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ },

/***/ "./node_modules/rxjs/util/isNumeric.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
exports.isNumeric = isNumeric;
;
//# sourceMappingURL=isNumeric.js.map

/***/ },

/***/ "./src/app/pages/login/login.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var authentication_service_1 = __webpack_require__("./src/app/core/authentication.service.ts");
var ng2_ui_auth_1 = __webpack_require__("./node_modules/ng2-ui-auth/dist/ng2-ui-auth.js");
var Login = (function () {
    function Login(fb, _auth, auth) {
        this._auth = _auth;
        this.auth = auth;
        this.submitted = false;
        this.form = fb.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'password': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }
    Login.prototype.onSubmit = function (values) {
        this.submitted = true;
        if (this.form.valid) {
            this._auth.login(this.form.value.email, this.form.value.password).subscribe(function (data) {
            });
        }
    };
    Login.prototype.loginWithGoogle = function (social) {
        this.auth.authenticate(social)
            .subscribe({
            error: function (err) { console.log(err); },
            complete: function () { console.log("ok"); }
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/pages/login/login.scss")],
            template: __webpack_require__("./src/app/pages/login/login.html"),
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof authentication_service_1.AuthenticationService !== 'undefined' && authentication_service_1.AuthenticationService) === 'function' && _b) || Object, (typeof (_c = typeof ng2_ui_auth_1.AuthService !== 'undefined' && ng2_ui_auth_1.AuthService) === 'function' && _c) || Object])
    ], Login);
    return Login;
    var _a, _b, _c;
}());
exports.Login = Login;


/***/ },

/***/ "./src/app/pages/login/login.html":
/***/ function(module, exports) {

module.exports = "<div class=\"auth-main\">\n  <div class=\"auth-block\">\n    <h1>Sign in to ng2-admin</h1>\n    <a routerLink=\"/register\" class=\"auth-link\">New to ng2-admin? Sign up!</a>\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(form.value)\" class=\"form-horizontal\">\n      <div class=\"form-group row\" [ngClass]=\"{'has-error': (!email.valid && email.touched), 'has-success': (email.valid && email.touched)}\">\n        <label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Email</label>\n\n        <div class=\"col-sm-10\">\n          <input [formControl]=\"email\" type=\"email\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Email\">\n        </div>\n      </div>\n      <div class=\"form-group row\" [ngClass]=\"{'has-error': (!password.valid && password.touched), 'has-success': (password.valid && password.touched)}\">\n        <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\n\n        <div class=\"col-sm-10\">\n          <input [formControl]=\"password\" type=\"password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Password\">\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-sm-offset-2 col-sm-10\">\n          <button [disabled]=\"!form.valid\" type=\"submit\" class=\"btn btn-default btn-auth\">Sign in</button>\n          <a routerLink=\"/login\" class=\"forgot-pass\">Forgot password?</a>\n        </div>\n      </div>\n    </form>\n\n    <div class=\"auth-sep\"><span><span>or Sign in with one click</span></span></div>\n\n    <div class=\"al-share-auth\">\n      <ul class=\"al-share clearfix\">\n        <li><i class=\"socicon socicon-facebook\" title=\"Share on Facebook\"></i></li>\n        <li><i class=\"socicon socicon-twitter\" title=\"Share on Twitter\"></i></li>\n        <li><i class=\"socicon socicon-google\" (click)=\"loginWithGoogle('google')\" title=\"Share on Google Plus\"></i></li>\n      </ul>\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ "./src/app/pages/login/login.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var nga_module_1 = __webpack_require__("./src/app/theme/nga.module.ts");
var login_component_1 = __webpack_require__("./src/app/pages/login/login.component.ts");
var login_routing_1 = __webpack_require__("./src/app/pages/login/login.routing.ts");
var core_module_1 = __webpack_require__("./src/app/core/core.module.ts");
var ng2_ui_auth_1 = __webpack_require__("./node_modules/ng2-ui-auth/dist/ng2-ui-auth.js");
exports.GOOGLE_CLIENT_ID = '698746417760-t7ac2jmprhkpvrp4m3f1g8h410m08r4f.apps.googleusercontent.com';
var MyAuthConfig = (function (_super) {
    __extends(MyAuthConfig, _super);
    function MyAuthConfig() {
        _super.apply(this, arguments);
        this.defaultHeaders = { 'Content-Type': 'application/json' };
        this.providers = { google: { clientId: exports.GOOGLE_CLIENT_ID, redirectUri: 'http://localhost:3000', url: 'oauth/token/google' } };
    }
    return MyAuthConfig;
}(ng2_ui_auth_1.CustomConfig));
exports.MyAuthConfig = MyAuthConfig;
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                nga_module_1.NgaModule,
                core_module_1.CoreModule,
                login_routing_1.routing,
                ng2_ui_auth_1.Ng2UiAuthModule.getWithConfig(MyAuthConfig)
            ],
            declarations: [
                login_component_1.Login
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModule;


/***/ },

/***/ "./src/app/pages/login/login.routing.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var login_component_1 = __webpack_require__("./src/app/pages/login/login.component.ts");
// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: login_component_1.Login
    }
];
exports.routing = router_1.RouterModule.forChild(routes);


/***/ },

/***/ "./src/app/pages/login/login.scss":
/***/ function(module, exports) {

module.exports = ".auth-main {\n  display: flex;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  position: absolute; }\n\n.auth-block {\n  width: 540px;\n  margin: 0 auto;\n  border-radius: 5px;\n  background: rgba(0, 0, 0, 0.55);\n  color: #fff;\n  padding: 32px; }\n  .auth-block h1 {\n    font-weight: 300;\n    margin-bottom: 28px;\n    text-align: center; }\n  .auth-block p {\n    font-size: 16px; }\n  .auth-block a {\n    text-decoration: none;\n    outline: none;\n    transition: all 0.2s ease;\n    color: #209e91; }\n    .auth-block a:hover {\n      color: #1b867b; }\n  .auth-block .control-label {\n    padding-top: 11px;\n    color: #ffffff; }\n  .auth-block .form-group {\n    margin-bottom: 12px; }\n\n.auth-input {\n  width: 300px;\n  margin-bottom: 24px; }\n  .auth-input input {\n    display: block;\n    width: 100%;\n    border: none;\n    font-size: 16px;\n    padding: 4px 10px;\n    outline: none; }\n\na.forgot-pass {\n  display: block;\n  text-align: right;\n  margin-bottom: -20px;\n  float: right;\n  z-index: 2;\n  position: relative; }\n\n.auth-link {\n  display: block;\n  font-size: 16px;\n  text-align: center;\n  margin-bottom: 33px; }\n\n.auth-sep {\n  margin-top: 36px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  font-size: 16px;\n  text-align: center;\n  display: block;\n  position: relative; }\n  .auth-sep > span {\n    display: table-cell;\n    width: 30%;\n    white-space: nowrap;\n    padding: 0 24px;\n    color: #ffffff; }\n    .auth-sep > span > span {\n      margin-top: -12px;\n      display: block; }\n  .auth-sep:before, .auth-sep:after {\n    border-top: solid 1px #ffffff;\n    content: \"\";\n    height: 1px;\n    width: 35%;\n    display: table-cell; }\n\n.al-share-auth {\n  text-align: center; }\n  .al-share-auth .al-share {\n    float: none;\n    margin: 0;\n    padding: 0;\n    display: inline-block; }\n    .al-share-auth .al-share li {\n      margin-left: 24px; }\n      .al-share-auth .al-share li:first-child {\n        margin-left: 0; }\n      .al-share-auth .al-share li i {\n        font-size: 24px; }\n\n.btn-auth {\n  color: #ffffff !important; }\n"

/***/ }

});
//# sourceMappingURL=4.map