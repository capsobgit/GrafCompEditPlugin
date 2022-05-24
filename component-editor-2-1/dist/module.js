define(["@grafana/data","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/axios/index.js":
/*!**************************************!*\
  !*** ../node_modules/axios/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "../node_modules/axios/lib/defaults/transitional.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "../node_modules/axios/lib/core/AxiosError.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "../node_modules/axios/lib/cancel/CanceledError.js");
var parseProtocol = __webpack_require__(/*! ../helpers/parseProtocol */ "../node_modules/axios/lib/helpers/parseProtocol.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/axios.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "../node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "../node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = __webpack_require__(/*! ./cancel/CanceledError */ "../node_modules/axios/lib/cancel/CanceledError.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = __webpack_require__(/*! ./env/data */ "../node_modules/axios/lib/env/data.js").version;
axios.toFormData = __webpack_require__(/*! ./helpers/toFormData */ "../node_modules/axios/lib/helpers/toFormData.js");

// Expose AxiosError class
axios.AxiosError = __webpack_require__(/*! ../lib/core/AxiosError */ "../node_modules/axios/lib/core/AxiosError.js");

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "../node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "../node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CanceledError = __webpack_require__(/*! ./CanceledError */ "../node_modules/axios/lib/cancel/CanceledError.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/CanceledError.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CanceledError.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "../node_modules/axios/lib/core/AxiosError.js");
var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/*!***********************************************!*\
  !*** ../node_modules/axios/lib/core/Axios.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
var buildFullPath = __webpack_require__(/*! ./buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "../node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;


/***/ }),

/***/ "../node_modules/axios/lib/core/AxiosError.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/core/AxiosError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;


/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "../node_modules/axios/lib/core/buildFullPath.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/buildFullPath.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "../node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults/index.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "../node_modules/axios/lib/cancel/CanceledError.js");

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/core/mergeConfig.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/mergeConfig.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/*!************************************************!*\
  !*** ../node_modules/axios/lib/core/settle.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(/*! ./AxiosError */ "../node_modules/axios/lib/core/AxiosError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "../node_modules/axios/lib/core/transformData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "../node_modules/axios/lib/defaults/index.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/defaults/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "../node_modules/axios/lib/helpers/normalizeHeaderName.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "../node_modules/axios/lib/core/AxiosError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "../node_modules/axios/lib/defaults/transitional.js");
var toFormData = __webpack_require__(/*! ../helpers/toFormData */ "../node_modules/axios/lib/helpers/toFormData.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "../node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: __webpack_require__(/*! ./env/FormData */ "../node_modules/axios/lib/helpers/null.js")
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/axios/lib/defaults/transitional.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/defaults/transitional.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "../node_modules/axios/lib/env/data.js":
/*!*********************************************!*\
  !*** ../node_modules/axios/lib/env/data.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "version": "0.27.2"
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/*!********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAxiosError.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAxiosError.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!****************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/null.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/null.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// eslint-disable-next-line strict
module.exports = null;


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseProtocol.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseProtocol.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/spread.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/toFormData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/helpers/toFormData.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "../node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../node_modules/axios/lib/helpers/validator.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/helpers/validator.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION = __webpack_require__(/*! ../env/data */ "../node_modules/axios/lib/env/data.js").version;
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "../node_modules/axios/lib/core/AxiosError.js");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};


/***/ }),

/***/ "../node_modules/base64-js/index.js":
/*!******************************************!*\
  !*** ../node_modules/base64-js/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "../node_modules/buffer/index.js":
/*!***************************************!*\
  !*** ../node_modules/buffer/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "../node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "../node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "../node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/classcat/index.js":
/*!*****************************************!*\
  !*** ../node_modules/classcat/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cc; });
function cc(names) {
  if (typeof names === "string" || typeof names === "number") return "" + names

  let out = ""

  if (Array.isArray(names)) {
    for (let i = 0, tmp; i < names.length; i++) {
      if ((tmp = cc(names[i])) !== "") {
        out += (out && " ") + tmp
      }
    }
  } else {
    for (let k in names) {
      if (names[k]) out += (out && " ") + k
    }
  }

  return out
}


/***/ }),

/***/ "../node_modules/clsx/dist/clsx.m.js":
/*!*******************************************!*\
  !*** ../node_modules/clsx/dist/clsx.m.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x
			}
		}
	}
	return str;
});


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./styles/index.css":
/*!****************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/dist/cjs.js!./styles/index.css ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(true);
// Module
exports.push([module.i, ".save__controls {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  z-index: 4;\n  font-size: 12px;\n}\n\n.save__controls button {\n  margin-left: 5px;\n}\n\n.view-control {\n  width: 100%;\n  height: 100%;\n}", "",{"version":3,"sources":["index.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,WAAW;EACX,SAAS;EACT,UAAU;EACV,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;AACd","file":"index.css","sourcesContent":[".save__controls {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  z-index: 4;\n  font-size: 12px;\n}\n\n.save__controls button {\n  margin-left: 5px;\n}\n\n.view-control {\n  width: 100%;\n  height: 100%;\n}"]}]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/d3-color/src/color.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-color/src/color.js ***!
  \*********************************************/
/*! exports provided: Color, darker, brighter, default, rgbConvert, rgb, Rgb, hslConvert, hsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darker", function() { return darker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brighter", function() { return brighter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbConvert", function() { return rgbConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rgb", function() { return Rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslConvert", function() { return hslConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "../node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Rgb, rgb, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hsl, hsl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "../node_modules/d3-color/src/cubehelix.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-color/src/cubehelix.js ***!
  \*************************************************/
/*! exports provided: default, Cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cubehelix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cubehelix", function() { return Cubehelix; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "../node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "../node_modules/d3-color/src/math.js");




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * _math_js__WEBPACK_IMPORTED_MODULE_2__["rad2deg"] - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Cubehelix, cubehelix, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__["brighter"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__["brighter"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__["darker"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__["darker"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math_js__WEBPACK_IMPORTED_MODULE_2__["deg2rad"],
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));


/***/ }),

/***/ "../node_modules/d3-color/src/define.js":
/*!**********************************************!*\
  !*** ../node_modules/d3-color/src/define.js ***!
  \**********************************************/
/*! exports provided: default, extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony default export */ __webpack_exports__["default"] = (function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "../node_modules/d3-color/src/index.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-color/src/index.js ***!
  \*********************************************/
/*! exports provided: color, rgb, hsl, lab, hcl, lch, gray, cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-color/src/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "color", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["rgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["hsl"]; });

/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lab.js */ "../node_modules/d3-color/src/lab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lab", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["hcl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["lch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["gray"]; });

/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubehelix.js */ "../node_modules/d3-color/src/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cubehelix", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "../node_modules/d3-color/src/lab.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-color/src/lab.js ***!
  \*******************************************/
/*! exports provided: gray, default, Lab, lch, hcl, Hcl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return gray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lab", function() { return Lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return lch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return hcl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hcl", function() { return Hcl; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "../node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "../node_modules/d3-color/src/math.js");




// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Lab, lab, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math_js__WEBPACK_IMPORTED_MODULE_2__["rad2deg"];
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math_js__WEBPACK_IMPORTED_MODULE_2__["deg2rad"];
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hcl, hcl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));


/***/ }),

/***/ "../node_modules/d3-color/src/math.js":
/*!********************************************!*\
  !*** ../node_modules/d3-color/src/math.js ***!
  \********************************************/
/*! exports provided: deg2rad, rad2deg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deg2rad", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rad2deg", function() { return rad2deg; });
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


/***/ }),

/***/ "../node_modules/d3-dispatch/src/dispatch.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-dispatch/src/dispatch.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ __webpack_exports__["default"] = (dispatch);


/***/ }),

/***/ "../node_modules/d3-dispatch/src/index.js":
/*!************************************************!*\
  !*** ../node_modules/d3-dispatch/src/index.js ***!
  \************************************************/
/*! exports provided: dispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dispatch.js */ "../node_modules/d3-dispatch/src/dispatch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return _dispatch_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "../node_modules/d3-ease/src/back.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-ease/src/back.js ***!
  \*******************************************/
/*! exports provided: backIn, backOut, backInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backIn", function() { return backIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backOut", function() { return backOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backInOut", function() { return backInOut; });
var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);


/***/ }),

/***/ "../node_modules/d3-ease/src/bounce.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-ease/src/bounce.js ***!
  \*********************************************/
/*! exports provided: bounceIn, bounceOut, bounceInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceIn", function() { return bounceIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceOut", function() { return bounceOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceInOut", function() { return bounceInOut; });
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}


/***/ }),

/***/ "../node_modules/d3-ease/src/circle.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-ease/src/circle.js ***!
  \*********************************************/
/*! exports provided: circleIn, circleOut, circleInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleIn", function() { return circleIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleOut", function() { return circleOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleInOut", function() { return circleInOut; });
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}


/***/ }),

/***/ "../node_modules/d3-ease/src/cubic.js":
/*!********************************************!*\
  !*** ../node_modules/d3-ease/src/cubic.js ***!
  \********************************************/
/*! exports provided: cubicIn, cubicOut, cubicInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicIn", function() { return cubicIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicOut", function() { return cubicOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicInOut", function() { return cubicInOut; });
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),

/***/ "../node_modules/d3-ease/src/elastic.js":
/*!**********************************************!*\
  !*** ../node_modules/d3-ease/src/elastic.js ***!
  \**********************************************/
/*! exports provided: elasticIn, elasticOut, elasticInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticIn", function() { return elasticIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticOut", function() { return elasticOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticInOut", function() { return elasticInOut; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "../node_modules/d3-ease/src/math.js");


var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(-(--t)) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(t = +t) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(-t) * Math.sin((s - t) / p)
        : 2 - a * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);


/***/ }),

/***/ "../node_modules/d3-ease/src/exp.js":
/*!******************************************!*\
  !*** ../node_modules/d3-ease/src/exp.js ***!
  \******************************************/
/*! exports provided: expIn, expOut, expInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expIn", function() { return expIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expOut", function() { return expOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expInOut", function() { return expInOut; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "../node_modules/d3-ease/src/math.js");


function expIn(t) {
  return Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(1 - +t);
}

function expOut(t) {
  return 1 - Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(1 - t) : 2 - Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tpmt"])(t - 1)) / 2;
}


/***/ }),

/***/ "../node_modules/d3-ease/src/index.js":
/*!********************************************!*\
  !*** ../node_modules/d3-ease/src/index.js ***!
  \********************************************/
/*! exports provided: easeLinear, easeQuad, easeQuadIn, easeQuadOut, easeQuadInOut, easeCubic, easeCubicIn, easeCubicOut, easeCubicInOut, easePoly, easePolyIn, easePolyOut, easePolyInOut, easeSin, easeSinIn, easeSinOut, easeSinInOut, easeExp, easeExpIn, easeExpOut, easeExpInOut, easeCircle, easeCircleIn, easeCircleOut, easeCircleInOut, easeBounce, easeBounceIn, easeBounceOut, easeBounceInOut, easeBack, easeBackIn, easeBackOut, easeBackInOut, easeElastic, easeElasticIn, easeElasticOut, easeElasticInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _linear_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linear.js */ "../node_modules/d3-ease/src/linear.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeLinear", function() { return _linear_js__WEBPACK_IMPORTED_MODULE_0__["linear"]; });

/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quad.js */ "../node_modules/d3-ease/src/quad.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuad", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__["quadInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadIn", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__["quadIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadOut", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__["quadOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadInOut", function() { return _quad_js__WEBPACK_IMPORTED_MODULE_1__["quadInOut"]; });

/* harmony import */ var _cubic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubic.js */ "../node_modules/d3-ease/src/cubic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubic", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__["cubicInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicIn", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__["cubicIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicOut", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__["cubicOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicInOut", function() { return _cubic_js__WEBPACK_IMPORTED_MODULE_2__["cubicInOut"]; });

/* harmony import */ var _poly_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./poly.js */ "../node_modules/d3-ease/src/poly.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePoly", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__["polyInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyIn", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__["polyIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyOut", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__["polyOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyInOut", function() { return _poly_js__WEBPACK_IMPORTED_MODULE_3__["polyInOut"]; });

/* harmony import */ var _sin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sin.js */ "../node_modules/d3-ease/src/sin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSin", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__["sinInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinIn", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__["sinIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinOut", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__["sinOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinInOut", function() { return _sin_js__WEBPACK_IMPORTED_MODULE_4__["sinInOut"]; });

/* harmony import */ var _exp_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./exp.js */ "../node_modules/d3-ease/src/exp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExp", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__["expInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpIn", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__["expIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpOut", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__["expOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpInOut", function() { return _exp_js__WEBPACK_IMPORTED_MODULE_5__["expInOut"]; });

/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./circle.js */ "../node_modules/d3-ease/src/circle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircle", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__["circleInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleIn", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__["circleIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleOut", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__["circleOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleInOut", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_6__["circleInOut"]; });

/* harmony import */ var _bounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bounce.js */ "../node_modules/d3-ease/src/bounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounce", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__["bounceOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceIn", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__["bounceIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceOut", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__["bounceOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceInOut", function() { return _bounce_js__WEBPACK_IMPORTED_MODULE_7__["bounceInOut"]; });

/* harmony import */ var _back_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./back.js */ "../node_modules/d3-ease/src/back.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBack", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__["backInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackIn", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__["backIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackOut", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__["backOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackInOut", function() { return _back_js__WEBPACK_IMPORTED_MODULE_8__["backInOut"]; });

/* harmony import */ var _elastic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./elastic.js */ "../node_modules/d3-ease/src/elastic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElastic", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__["elasticOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticIn", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__["elasticIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticOut", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__["elasticOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticInOut", function() { return _elastic_js__WEBPACK_IMPORTED_MODULE_9__["elasticInOut"]; });






















/***/ }),

/***/ "../node_modules/d3-ease/src/linear.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-ease/src/linear.js ***!
  \*********************************************/
/*! exports provided: linear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
function linear(t) {
  return +t;
}


/***/ }),

/***/ "../node_modules/d3-ease/src/math.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-ease/src/math.js ***!
  \*******************************************/
/*! exports provided: tpmt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tpmt", function() { return tpmt; });
// tpmt is two power minus ten times t scaled to [0,1]
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}


/***/ }),

/***/ "../node_modules/d3-ease/src/poly.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-ease/src/poly.js ***!
  \*******************************************/
/*! exports provided: polyIn, polyOut, polyInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyIn", function() { return polyIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyOut", function() { return polyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyInOut", function() { return polyInOut; });
var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);


/***/ }),

/***/ "../node_modules/d3-ease/src/quad.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-ease/src/quad.js ***!
  \*******************************************/
/*! exports provided: quadIn, quadOut, quadInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadIn", function() { return quadIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadOut", function() { return quadOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadInOut", function() { return quadInOut; });
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}


/***/ }),

/***/ "../node_modules/d3-ease/src/sin.js":
/*!******************************************!*\
  !*** ../node_modules/d3-ease/src/sin.js ***!
  \******************************************/
/*! exports provided: sinIn, sinOut, sinInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sinIn", function() { return sinIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sinOut", function() { return sinOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sinInOut", function() { return sinInOut; });
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return (+t === 1) ? 1 : 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/array.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/array.js ***!
  \***************************************************/
/*! exports provided: default, genericArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genericArray", function() { return genericArray; });
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "../node_modules/d3-interpolate/src/value.js");
/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numberArray.js */ "../node_modules/d3-interpolate/src/numberArray.js");



/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return (Object(_numberArray_js__WEBPACK_IMPORTED_MODULE_1__["isNumberArray"])(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_1__["default"] : genericArray)(a, b);
});

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = Object(_value_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/basis.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/basis.js ***!
  \***************************************************/
/*! exports provided: basis, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basis", function() { return basis; });
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ __webpack_exports__["default"] = (function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/basisClosed.js":
/*!*********************************************************!*\
  !*** ../node_modules/d3-interpolate/src/basisClosed.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis.js */ "../node_modules/d3-interpolate/src/basis.js");


/* harmony default export */ __webpack_exports__["default"] = (function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return Object(_basis_js__WEBPACK_IMPORTED_MODULE_0__["basis"])((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/color.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/color.js ***!
  \***************************************************/
/*! exports provided: hue, gamma, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hue", function() { return hue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gamma", function() { return gamma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nogamma; });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "../node_modules/d3-interpolate/src/constant.js");


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/constant.js":
/*!******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/constant.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/cubehelix.js":
/*!*******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/cubehelix.js ***!
  \*******************************************************/
/*! exports provided: default, cubehelixLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubehelixLong", function() { return cubehelixLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(end)).h),
          s = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.s, end.s),
          l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
          opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* harmony default export */ __webpack_exports__["default"] = (cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var cubehelixLong = cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/date.js":
/*!**************************************************!*\
  !*** ../node_modules/d3-interpolate/src/date.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/discrete.js":
/*!******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/discrete.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/hcl.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/hcl.js ***!
  \*************************************************/
/*! exports provided: default, hclLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hclLong", function() { return hclLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function hcl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hcl"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hcl"])(end)).h),
        c = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.c, end.c),
        l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var hclLong = hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/hsl.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/hsl.js ***!
  \*************************************************/
/*! exports provided: default, hslLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslLong", function() { return hslLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function hsl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hsl"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hsl"])(end)).h),
        s = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.s, end.s),
        l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var hslLong = hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/hue.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/hue.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var i = Object(_color_js__WEBPACK_IMPORTED_MODULE_0__["hue"])(+a, +b);
  return function(t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/index.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/index.js ***!
  \***************************************************/
/*! exports provided: interpolate, interpolateArray, interpolateBasis, interpolateBasisClosed, interpolateDate, interpolateDiscrete, interpolateHue, interpolateNumber, interpolateNumberArray, interpolateObject, interpolateRound, interpolateString, interpolateTransformCss, interpolateTransformSvg, interpolateZoom, interpolateRgb, interpolateRgbBasis, interpolateRgbBasisClosed, interpolateHsl, interpolateHslLong, interpolateLab, interpolateHcl, interpolateHclLong, interpolateCubehelix, interpolateCubehelixLong, piecewise, quantize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "../node_modules/d3-interpolate/src/value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return _value_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array.js */ "../node_modules/d3-interpolate/src/array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateArray", function() { return _array_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ "../node_modules/d3-interpolate/src/basis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasis", function() { return _basis_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ "../node_modules/d3-interpolate/src/basisClosed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasisClosed", function() { return _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date.js */ "../node_modules/d3-interpolate/src/date.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateDate", function() { return _date_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _discrete_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./discrete.js */ "../node_modules/d3-interpolate/src/discrete.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateDiscrete", function() { return _discrete_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _hue_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hue.js */ "../node_modules/d3-interpolate/src/hue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHue", function() { return _hue_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number.js */ "../node_modules/d3-interpolate/src/number.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateNumber", function() { return _number_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./numberArray.js */ "../node_modules/d3-interpolate/src/numberArray.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateNumberArray", function() { return _numberArray_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./object.js */ "../node_modules/d3-interpolate/src/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateObject", function() { return _object_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _round_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./round.js */ "../node_modules/d3-interpolate/src/round.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRound", function() { return _round_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./string.js */ "../node_modules/d3-interpolate/src/string.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateString", function() { return _string_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _transform_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./transform/index.js */ "../node_modules/d3-interpolate/src/transform/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return _transform_index_js__WEBPACK_IMPORTED_MODULE_12__["interpolateTransformCss"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return _transform_index_js__WEBPACK_IMPORTED_MODULE_12__["interpolateTransformSvg"]; });

/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./zoom.js */ "../node_modules/d3-interpolate/src/zoom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateZoom", function() { return _zoom_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./rgb.js */ "../node_modules/d3-interpolate/src/rgb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgb", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasis", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__["rgbBasis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasisClosed", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__["rgbBasisClosed"]; });

/* harmony import */ var _hsl_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./hsl.js */ "../node_modules/d3-interpolate/src/hsl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHsl", function() { return _hsl_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHslLong", function() { return _hsl_js__WEBPACK_IMPORTED_MODULE_15__["hslLong"]; });

/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lab.js */ "../node_modules/d3-interpolate/src/lab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateLab", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _hcl_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./hcl.js */ "../node_modules/d3-interpolate/src/hcl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHcl", function() { return _hcl_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHclLong", function() { return _hcl_js__WEBPACK_IMPORTED_MODULE_17__["hclLong"]; });

/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cubehelix.js */ "../node_modules/d3-interpolate/src/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelix", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixLong", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__["cubehelixLong"]; });

/* harmony import */ var _piecewise_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./piecewise.js */ "../node_modules/d3-interpolate/src/piecewise.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "piecewise", function() { return _piecewise_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./quantize.js */ "../node_modules/d3-interpolate/src/quantize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantize", function() { return _quantize_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });
























/***/ }),

/***/ "../node_modules/d3-interpolate/src/lab.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/lab.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lab; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function lab(start, end) {
  var l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["lab"])(start)).l, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["lab"])(end)).l),
      a = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.a, end.a),
      b = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.b, end.b),
      opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/number.js":
/*!****************************************************!*\
  !*** ../node_modules/d3-interpolate/src/number.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/numberArray.js":
/*!*********************************************************!*\
  !*** ../node_modules/d3-interpolate/src/numberArray.js ***!
  \*********************************************************/
/*! exports provided: default, isNumberArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberArray", function() { return isNumberArray; });
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
});

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/object.js":
/*!****************************************************!*\
  !*** ../node_modules/d3-interpolate/src/object.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "../node_modules/d3-interpolate/src/value.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = Object(_value_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/piecewise.js":
/*!*******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/piecewise.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return piecewise; });
function piecewise(interpolate, values) {
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/quantize.js":
/*!******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/quantize.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/rgb.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/rgb.js ***!
  \*************************************************/
/*! exports provided: default, rgbBasis, rgbBasisClosed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbBasis", function() { return rgbBasis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbBasisClosed", function() { return rgbBasisClosed; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basis.js */ "../node_modules/d3-interpolate/src/basis.js");
/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basisClosed.js */ "../node_modules/d3-interpolate/src/basisClosed.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");





/* harmony default export */ __webpack_exports__["default"] = ((function rgbGamma(y) {
  var color = Object(_color_js__WEBPACK_IMPORTED_MODULE_3__["gamma"])(y);

  function rgb(start, end) {
    var r = color((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(start)).r, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_3__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var rgbBasisClosed = rgbSpline(_basisClosed_js__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/round.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/round.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/string.js":
/*!****************************************************!*\
  !*** ../node_modules/d3-interpolate/src/string.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "../node_modules/d3-interpolate/src/number.js");


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/transform/decompose.js":
/*!*****************************************************************!*\
  !*** ../node_modules/d3-interpolate/src/transform/decompose.js ***!
  \*****************************************************************/
/*! exports provided: identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ __webpack_exports__["default"] = (function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/transform/index.js":
/*!*************************************************************!*\
  !*** ../node_modules/d3-interpolate/src/transform/index.js ***!
  \*************************************************************/
/*! exports provided: interpolateTransformCss, interpolateTransformSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return interpolateTransformCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return interpolateTransformSvg; });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number.js */ "../node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "../node_modules/d3-interpolate/src/transform/parse.js");



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__["parseCss"], "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__["parseSvg"], ", ", ")", ")");


/***/ }),

/***/ "../node_modules/d3-interpolate/src/transform/parse.js":
/*!*************************************************************!*\
  !*** ../node_modules/d3-interpolate/src/transform/parse.js ***!
  \*************************************************************/
/*! exports provided: parseCss, parseSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCss", function() { return parseCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSvg", function() { return parseSvg; });
/* harmony import */ var _decompose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose.js */ "../node_modules/d3-interpolate/src/transform/decompose.js");


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return _decompose_js__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return Object(_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__["identity"];
  value = value.matrix;
  return Object(_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/value.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/value.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rgb.js */ "../node_modules/d3-interpolate/src/rgb.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ "../node_modules/d3-interpolate/src/array.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date.js */ "../node_modules/d3-interpolate/src/date.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number.js */ "../node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object.js */ "../node_modules/d3-interpolate/src/object.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string.js */ "../node_modules/d3-interpolate/src/string.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constant.js */ "../node_modules/d3-interpolate/src/constant.js");
/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./numberArray.js */ "../node_modules/d3-interpolate/src/numberArray.js");










/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? Object(_constant_js__WEBPACK_IMPORTED_MODULE_7__["default"])(b)
      : (t === "number" ? _number_js__WEBPACK_IMPORTED_MODULE_4__["default"]
      : t === "string" ? ((c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["color"])(b)) ? (b = c, _rgb_js__WEBPACK_IMPORTED_MODULE_1__["default"]) : _string_js__WEBPACK_IMPORTED_MODULE_6__["default"])
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_0__["color"] ? _rgb_js__WEBPACK_IMPORTED_MODULE_1__["default"]
      : b instanceof Date ? _date_js__WEBPACK_IMPORTED_MODULE_3__["default"]
      : Object(_numberArray_js__WEBPACK_IMPORTED_MODULE_8__["isNumberArray"])(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_8__["default"]
      : Array.isArray(b) ? _array_js__WEBPACK_IMPORTED_MODULE_2__["genericArray"]
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object_js__WEBPACK_IMPORTED_MODULE_5__["default"]
      : _number_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a, b);
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/zoom.js":
/*!**************************************************!*\
  !*** ../node_modules/d3-interpolate/src/zoom.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
/* harmony default export */ __webpack_exports__["default"] = (function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    }
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    }
  }

  i.duration = S * 1000;

  return i;
});


/***/ }),

/***/ "../node_modules/d3-timer/src/index.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-timer/src/index.js ***!
  \*********************************************/
/*! exports provided: now, timer, timerFlush, timeout, interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "../node_modules/d3-timer/src/timer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "now", function() { return _timer_js__WEBPACK_IMPORTED_MODULE_0__["now"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return _timer_js__WEBPACK_IMPORTED_MODULE_0__["timer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timerFlush", function() { return _timer_js__WEBPACK_IMPORTED_MODULE_0__["timerFlush"]; });

/* harmony import */ var _timeout_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeout.js */ "../node_modules/d3-timer/src/timeout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeout", function() { return _timeout_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _interval_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interval.js */ "../node_modules/d3-timer/src/interval.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _interval_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });








/***/ }),

/***/ "../node_modules/d3-timer/src/interval.js":
/*!************************************************!*\
  !*** ../node_modules/d3-timer/src/interval.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "../node_modules/d3-timer/src/timer.js");


/* harmony default export */ __webpack_exports__["default"] = (function(callback, delay, time) {
  var t = new _timer_js__WEBPACK_IMPORTED_MODULE_0__["Timer"], total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? Object(_timer_js__WEBPACK_IMPORTED_MODULE_0__["now"])() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
});


/***/ }),

/***/ "../node_modules/d3-timer/src/timeout.js":
/*!***********************************************!*\
  !*** ../node_modules/d3-timer/src/timeout.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "../node_modules/d3-timer/src/timer.js");


/* harmony default export */ __webpack_exports__["default"] = (function(callback, delay, time) {
  var t = new _timer_js__WEBPACK_IMPORTED_MODULE_0__["Timer"];
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
});


/***/ }),

/***/ "../node_modules/d3-timer/src/timer.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-timer/src/timer.js ***!
  \*********************************************/
/*! exports provided: now, Timer, timer, timerFlush */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timerFlush", function() { return timerFlush; });
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


/***/ }),

/***/ "../node_modules/ieee754/index.js":
/*!****************************************!*\
  !*** ../node_modules/ieee754/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "../node_modules/isarray/index.js":
/*!****************************************!*\
  !*** ../node_modules/isarray/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "../node_modules/object-assign/index.js":
/*!**********************************************!*\
  !*** ../node_modules/object-assign/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/prop-types/checkPropTypes.js":
/*!****************************************************!*\
  !*** ../node_modules/prop-types/checkPropTypes.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "../node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "../node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "../node_modules/prop-types/factoryWithTypeCheckers.js":
/*!*************************************************************!*\
  !*** ../node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "../node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "../node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "../node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "../node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "../node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "../node_modules/prop-types/index.js":
/*!*******************************************!*\
  !*** ../node_modules/prop-types/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "../node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "../node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "../node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!**************************************************************!*\
  !*** ../node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "../node_modules/prop-types/lib/has.js":
/*!*********************************************!*\
  !*** ../node_modules/prop-types/lib/has.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/Draggable.js":
/*!**************************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/Draggable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DraggableCore", {
  enumerable: true,
  get: function get() {
    return _DraggableCore.default;
  }
});
exports.default = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "react-dom"));

var _clsx2 = _interopRequireDefault(__webpack_require__(/*! clsx */ "../node_modules/clsx/dist/clsx.m.js"));

var _domFns = __webpack_require__(/*! ./utils/domFns */ "../node_modules/react-draggable/build/cjs/utils/domFns.js");

var _positionFns = __webpack_require__(/*! ./utils/positionFns */ "../node_modules/react-draggable/build/cjs/utils/positionFns.js");

var _shims = __webpack_require__(/*! ./utils/shims */ "../node_modules/react-draggable/build/cjs/utils/shims.js");

var _DraggableCore = _interopRequireDefault(__webpack_require__(/*! ./DraggableCore */ "../node_modules/react-draggable/build/cjs/DraggableCore.js"));

var _log = _interopRequireDefault(__webpack_require__(/*! ./utils/log */ "../node_modules/react-draggable/build/cjs/utils/log.js"));

var _excluded = ["axis", "bounds", "children", "defaultPosition", "defaultClassName", "defaultClassNameDragging", "defaultClassNameDragged", "position", "positionOffset", "scale"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// Define <Draggable>
//
var Draggable = /*#__PURE__*/function (_React$Component) {
  _inherits(Draggable, _React$Component);

  var _super = _createSuper(Draggable);

  function Draggable(props
  /*: DraggableProps*/
  ) {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e, coreData) {
      (0, _log.default)('Draggable: onDragStart: %j', coreData); // Short-circuit if user's callback killed it.

      var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData)); // Kills start event on core as well, so move handlers are never bound.


      if (shouldStart === false) return false;

      _this.setState({
        dragging: true,
        dragged: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDrag", function (e, coreData) {
      if (!_this.state.dragging) return false;
      (0, _log.default)('Draggable: onDrag: %j', coreData);
      var uiData = (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData);
      var newState
      /*: $Shape<DraggableState>*/
      = {
        x: uiData.x,
        y: uiData.y
      }; // Keep within bounds.

      if (_this.props.bounds) {
        // Save original x and y.
        var x = newState.x,
            y = newState.y; // Add slack to the values used to calculate bound position. This will ensure that if
        // we start removing slack, the element won't react to it right away until it's been
        // completely removed.

        newState.x += _this.state.slackX;
        newState.y += _this.state.slackY; // Get bound position. This will ceil/floor the x and y within the boundaries.

        var _getBoundPosition = (0, _positionFns.getBoundPosition)(_assertThisInitialized(_this), newState.x, newState.y),
            _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2),
            newStateX = _getBoundPosition2[0],
            newStateY = _getBoundPosition2[1];

        newState.x = newStateX;
        newState.y = newStateY; // Recalculate slack by noting how much was shaved by the boundPosition handler.

        newState.slackX = _this.state.slackX + (x - newState.x);
        newState.slackY = _this.state.slackY + (y - newState.y); // Update the event we fire to reflect what really happened after bounds took effect.

        uiData.x = newState.x;
        uiData.y = newState.y;
        uiData.deltaX = newState.x - _this.state.x;
        uiData.deltaY = newState.y - _this.state.y;
      } // Short-circuit if user's callback killed it.


      var shouldUpdate = _this.props.onDrag(e, uiData);

      if (shouldUpdate === false) return false;

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStop", function (e, coreData) {
      if (!_this.state.dragging) return false; // Short-circuit if user's callback killed it.

      var shouldContinue = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData));

      if (shouldContinue === false) return false;
      (0, _log.default)('Draggable: onDragStop: %j', coreData);
      var newState
      /*: $Shape<DraggableState>*/
      = {
        dragging: false,
        slackX: 0,
        slackY: 0
      }; // If this is a controlled component, the result of this operation will be to
      // revert back to the old position. We expect a handler on `onDragStop`, at the least.

      var controlled = Boolean(_this.props.position);

      if (controlled) {
        var _this$props$position = _this.props.position,
            x = _this$props$position.x,
            y = _this$props$position.y;
        newState.x = x;
        newState.y = y;
      }

      _this.setState(newState);
    });

    _this.state = {
      // Whether or not we are currently dragging.
      dragging: false,
      // Whether or not we have been dragged before.
      dragged: false,
      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,
      prevPropsPosition: _objectSpread({}, props.position),
      // Used for compensating for out-of-bounds drags
      slackX: 0,
      slackY: 0,
      // Can only determine if SVG after mounting
      isElementSVG: false
    };

    if (props.position && !(props.onDrag || props.onStop)) {
      // eslint-disable-next-line no-console
      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
    }

    return _this;
  }

  _createClass(Draggable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Check to see if the element passed is an instanceof SVGElement
      if (typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
        this.setState({
          isElementSVG: true
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        dragging: false
      }); // prevents invariant if unmounted while dragging
    } // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
    // the underlying DOM node ourselves. See the README for more information.

  }, {
    key: "findDOMNode",
    value: function findDOMNode()
    /*: ?HTMLElement*/
    {
      var _this$props$nodeRef$c, _this$props, _this$props$nodeRef;

      return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$nodeRef = _this$props.nodeRef) === null || _this$props$nodeRef === void 0 ? void 0 : _this$props$nodeRef.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render()
    /*: ReactElement<any>*/
    {
      var _clsx;

      var _this$props2 = this.props,
          axis = _this$props2.axis,
          bounds = _this$props2.bounds,
          children = _this$props2.children,
          defaultPosition = _this$props2.defaultPosition,
          defaultClassName = _this$props2.defaultClassName,
          defaultClassNameDragging = _this$props2.defaultClassNameDragging,
          defaultClassNameDragged = _this$props2.defaultClassNameDragged,
          position = _this$props2.position,
          positionOffset = _this$props2.positionOffset,
          scale = _this$props2.scale,
          draggableCoreProps = _objectWithoutProperties(_this$props2, _excluded);

      var style = {};
      var svgTransform = null; // If this is controlled, we don't want to move it - unless it's dragging.

      var controlled = Boolean(position);
      var draggable = !controlled || this.state.dragging;
      var validPosition = position || defaultPosition;
      var transformOpts = {
        // Set left if horizontal drag is enabled
        x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
        // Set top if vertical drag is enabled
        y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
      }; // If this element was SVG, we use the `transform` attribute.

      if (this.state.isElementSVG) {
        svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
      } else {
        // Add a CSS transform to move the element around. This allows us to move the element around
        // without worrying about whether or not it is relatively or absolutely positioned.
        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
        // has a clean slate.
        style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
      } // Mark with class while dragging


      var className = (0, _clsx2.default)(children.props.className || '', defaultClassName, (_clsx = {}, _defineProperty(_clsx, defaultClassNameDragging, this.state.dragging), _defineProperty(_clsx, defaultClassNameDragged, this.state.dragged), _clsx)); // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)

      return /*#__PURE__*/React.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
        onStart: this.onDragStart,
        onDrag: this.onDrag,
        onStop: this.onDragStop
      }), /*#__PURE__*/React.cloneElement(React.Children.only(children), {
        className: className,
        style: _objectSpread(_objectSpread({}, children.props.style), style),
        transform: svgTransform
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: // React 16.3+
    // Arity (props, state)
    function getDerivedStateFromProps(_ref, _ref2)
    /*: ?$Shape<DraggableState>*/
    {
      var position = _ref.position;
      var prevPropsPosition = _ref2.prevPropsPosition;

      // Set x/y if a new position is provided in props that is different than the previous.
      if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
        (0, _log.default)('Draggable: getDerivedStateFromProps %j', {
          position: position,
          prevPropsPosition: prevPropsPosition
        });
        return {
          x: position.x,
          y: position.y,
          prevPropsPosition: _objectSpread({}, position)
        };
      }

      return null;
    }
  }]);

  return Draggable;
}(React.Component);

exports.default = Draggable;

_defineProperty(Draggable, "displayName", 'Draggable');

_defineProperty(Draggable, "propTypes", _objectSpread(_objectSpread({}, _DraggableCore.default.propTypes), {}, {
  /**
   * `axis` determines which axis the draggable can move.
   *
   *  Note that all callbacks will still return data as normal. This only
   *  controls flushing to the DOM.
   *
   * 'both' allows movement horizontally and vertically.
   * 'x' limits movement to horizontal axis.
   * 'y' limits movement to vertical axis.
   * 'none' limits all movement.
   *
   * Defaults to 'both'.
   */
  axis: _propTypes.default.oneOf(['both', 'x', 'y', 'none']),

  /**
   * `bounds` determines the range of movement available to the element.
   * Available values are:
   *
   * 'parent' restricts movement within the Draggable's parent node.
   *
   * Alternatively, pass an object with the following properties, all of which are optional:
   *
   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
   *
   * All values are in px.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable bounds={{right: 300, bottom: 300}}>
   *              <div>Content</div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  bounds: _propTypes.default.oneOfType([_propTypes.default.shape({
    left: _propTypes.default.number,
    right: _propTypes.default.number,
    top: _propTypes.default.number,
    bottom: _propTypes.default.number
  }), _propTypes.default.string, _propTypes.default.oneOf([false])]),
  defaultClassName: _propTypes.default.string,
  defaultClassNameDragging: _propTypes.default.string,
  defaultClassNameDragged: _propTypes.default.string,

  /**
   * `defaultPosition` specifies the x and y that the dragged item should start at
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  defaultPosition: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),
  positionOffset: _propTypes.default.shape({
    x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
  }),

  /**
   * `position`, if present, defines the current position of the element.
   *
   *  This is similar to how form elements in React work - if no `position` is supplied, the component
   *  is uncontrolled.
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable position={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  position: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
}));

_defineProperty(Draggable, "defaultProps", _objectSpread(_objectSpread({}, _DraggableCore.default.defaultProps), {}, {
  axis: 'both',
  bounds: false,
  defaultClassName: 'react-draggable',
  defaultClassNameDragging: 'react-draggable-dragging',
  defaultClassNameDragged: 'react-draggable-dragged',
  defaultPosition: {
    x: 0,
    y: 0
  },
  scale: 1
}));

/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/DraggableCore.js":
/*!******************************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/DraggableCore.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "react-dom"));

var _domFns = __webpack_require__(/*! ./utils/domFns */ "../node_modules/react-draggable/build/cjs/utils/domFns.js");

var _positionFns = __webpack_require__(/*! ./utils/positionFns */ "../node_modules/react-draggable/build/cjs/utils/positionFns.js");

var _shims = __webpack_require__(/*! ./utils/shims */ "../node_modules/react-draggable/build/cjs/utils/shims.js");

var _log = _interopRequireDefault(__webpack_require__(/*! ./utils/log */ "../node_modules/react-draggable/build/cjs/utils/log.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Simple abstraction for dragging events names.
var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
}; // Default to mouse events.

var dragEventFor = eventsFor.mouse;
/*:: type DraggableCoreState = {
  dragging: boolean,
  lastX: number,
  lastY: number,
  touchIdentifier: ?number
};*/

/*:: export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};*/

/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;*/

/*:: export type ControlPosition = {x: number, y: number};*/

/*:: export type PositionOffsetControlPosition = {x: number|string, y: number|string};*/

/*:: export type DraggableCoreDefaultProps = {
  allowAnyClick: boolean,
  disabled: boolean,
  enableUserSelectHack: boolean,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  scale: number,
};*/

/*:: export type DraggableCoreProps = {
  ...DraggableCoreDefaultProps,
  cancel: string,
  children: ReactElement<any>,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  nodeRef?: ?React.ElementRef<any>,
};*/

//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//
var DraggableCore = /*#__PURE__*/function (_React$Component) {
  _inherits(DraggableCore, _React$Component);

  var _super = _createSuper(DraggableCore);

  function DraggableCore() {
    var _this;

    _classCallCheck(this, DraggableCore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dragging: false,
      // Used while dragging to determine deltas.
      lastX: NaN,
      lastY: NaN,
      touchIdentifier: null
    });

    _defineProperty(_assertThisInitialized(_this), "mounted", false);

    _defineProperty(_assertThisInitialized(_this), "handleDragStart", function (e) {
      // Make it possible to attach event handlers on top of this one.
      _this.props.onMouseDown(e); // Only accept left-clicks.


      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false; // Get nodes. Be sure to grab relative document (could be iframed)

      var thisNode = _this.findDOMNode();

      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }

      var ownerDocument = thisNode.ownerDocument; // Short circuit if handle or cancel prop was provided and selector doesn't match.

      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, thisNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, thisNode)) {
        return;
      } // Prevent scrolling on mobile devices, like ipad/iphone.
      // Important that this is after handle/cancel.


      if (e.type === 'touchstart') e.preventDefault(); // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.

      var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);

      _this.setState({
        touchIdentifier: touchIdentifier
      }); // Get the current drag point from the event. This is used as the offset.


      var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _assertThisInitialized(_this));
      if (position == null) return; // not possible but satisfies flow

      var x = position.x,
          y = position.y; // Create an event object with all the data parents need to make a decision here.

      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
      (0, _log.default)('DraggableCore: handleDragStart: %j', coreEvent); // Call event handler. If it returns explicit false, cancel.

      (0, _log.default)('calling', _this.props.onStart);

      var shouldUpdate = _this.props.onStart(e, coreEvent);

      if (shouldUpdate === false || _this.mounted === false) return; // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.

      if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument); // Initiate dragging. Set the current x and y as offsets
      // so we know how much we've moved during the drag. This allows us
      // to drag elements around even if they have been moved, without issue.

      _this.setState({
        dragging: true,
        lastX: x,
        lastY: y
      }); // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.


      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDrag", function (e) {
      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
      if (position == null) return;
      var x = position.x,
          y = position.y; // Snap to grid if prop has been provided

      if (Array.isArray(_this.props.grid)) {
        var deltaX = x - _this.state.lastX,
            deltaY = y - _this.state.lastY;

        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);

        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);

        deltaX = _snapToGrid2[0];
        deltaY = _snapToGrid2[1];
        if (!deltaX && !deltaY) return; // skip useless drag

        x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
      }

      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
      (0, _log.default)('DraggableCore: handleDrag: %j', coreEvent); // Call event handler. If it returns explicit false, trigger end.

      var shouldUpdate = _this.props.onDrag(e, coreEvent);

      if (shouldUpdate === false || _this.mounted === false) {
        try {
          // $FlowIgnore
          _this.handleDragStop(new MouseEvent('mouseup'));
        } catch (err) {
          // Old browsers
          var event = ((document.createEvent('MouseEvents')
          /*: any*/
          )
          /*: MouseTouchEvent*/
          ); // I see why this insanity was deprecated
          // $FlowIgnore

          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          _this.handleDragStop(event);
        }

        return;
      }

      _this.setState({
        lastX: x,
        lastY: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragStop", function (e) {
      if (!_this.state.dragging) return;
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
      if (position == null) return;
      var x = position.x,
          y = position.y;
      var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y); // Call event handler

      var shouldContinue = _this.props.onStop(e, coreEvent);

      if (shouldContinue === false || _this.mounted === false) return false;

      var thisNode = _this.findDOMNode();

      if (thisNode) {
        // Remove user-select hack
        if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
      }

      (0, _log.default)('DraggableCore: handleDragStop: %j', coreEvent); // Reset the el.

      _this.setState({
        dragging: false,
        lastX: NaN,
        lastY: NaN
      });

      if (thisNode) {
        // Remove event handlers
        (0, _log.default)('DraggableCore: Removing handlers');
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

      return _this.handleDragStart(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (e) {
      dragEventFor = eventsFor.mouse;
      return _this.handleDragStop(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchStart", function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return _this.handleDragStart(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return _this.handleDragStop(e);
    });

    return _this;
  }

  _createClass(DraggableCore, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true; // Touch handlers must be added with {passive: false} to be cancelable.
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention

      var thisNode = this.findDOMNode();

      if (thisNode) {
        (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
          passive: false
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false; // Remove any leftover event handlers. Remove both touch and mouse handlers in case
      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.

      var thisNode = this.findDOMNode();

      if (thisNode) {
        var ownerDocument = thisNode.ownerDocument;
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
          passive: false
        });
        if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
      }
    } // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
    // the underlying DOM node ourselves. See the README for more information.

  }, {
    key: "findDOMNode",
    value: function findDOMNode()
    /*: ?HTMLElement*/
    {
      var _this$props$nodeRef$c, _this$props, _this$props$nodeRef;

      return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$nodeRef = _this$props.nodeRef) === null || _this$props$nodeRef === void 0 ? void 0 : _this$props$nodeRef.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
    }
  }, {
    key: "render",
    value: function render()
    /*: React.Element<any>*/
    {
      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return /*#__PURE__*/React.cloneElement(React.Children.only(this.props.children), {
        // Note: mouseMove handler is attached to document so it will still function
        // when the user drags quickly and leaves the bounds of the element.
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        // onTouchStart is added on `componentDidMount` so they can be added with
        // {passive: false}, which allows it to cancel. See
        // https://developers.google.com/web/updates/2017/01/scrolling-intervention
        onTouchEnd: this.onTouchEnd
      });
    }
  }]);

  return DraggableCore;
}(React.Component);

exports.default = DraggableCore;

_defineProperty(DraggableCore, "displayName", 'DraggableCore');

_defineProperty(DraggableCore, "propTypes", {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes.default.bool,

  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes.default.bool,

  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes.default.bool,

  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function offsetParent(props
  /*: DraggableCoreProps*/
  , propName
  /*: $Keys<DraggableCoreProps>*/
  ) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },

  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes.default.arrayOf(_propTypes.default.number),

  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: _propTypes.default.string,

  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: _propTypes.default.string,

  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: _propTypes.default.object,

  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes.default.func,

  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes.default.func,

  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes.default.func,

  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes.default.func,

  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: _propTypes.default.number,

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});

_defineProperty(DraggableCore, "defaultProps", {
  allowAnyClick: false,
  // by default only accept left click
  disabled: false,
  enableUserSelectHack: true,
  onStart: function onStart() {},
  onDrag: function onDrag() {},
  onStop: function onStop() {},
  onMouseDown: function onMouseDown() {},
  scale: 1
});

/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/cjs.js":
/*!********************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/cjs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ./Draggable */ "../node_modules/react-draggable/build/cjs/Draggable.js"),
    Draggable = _require.default,
    DraggableCore = _require.DraggableCore; // Previous versions of this lib exported <Draggable> as the root export. As to no-// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266


module.exports = Draggable;
module.exports.default = Draggable;
module.exports.DraggableCore = DraggableCore;

/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/utils/domFns.js":
/*!*****************************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/utils/domFns.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchesSelector = matchesSelector;
exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.innerHeight = innerHeight;
exports.innerWidth = innerWidth;
exports.offsetXYFromParent = offsetXYFromParent;
exports.createCSSTransform = createCSSTransform;
exports.createSVGTransform = createSVGTransform;
exports.getTranslation = getTranslation;
exports.getTouch = getTouch;
exports.getTouchIdentifier = getTouchIdentifier;
exports.addUserSelectStyles = addUserSelectStyles;
exports.removeUserSelectStyles = removeUserSelectStyles;
exports.addClassName = addClassName;
exports.removeClassName = removeClassName;

var _shims = __webpack_require__(/*! ./shims */ "../node_modules/react-draggable/build/cjs/utils/shims.js");

var _getPrefix = _interopRequireWildcard(__webpack_require__(/*! ./getPrefix */ "../node_modules/react-draggable/build/cjs/utils/getPrefix.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var matchesSelectorFunc = '';

function matchesSelector(el
/*: Node*/
, selector
/*: string*/
)
/*: boolean*/
{
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return (0, _shims.isFunction)(el[method]);
    });
  } // Might not be found entirely (not an Element?) - in that case, bail
  // $FlowIgnore: Doesn't think elements are indexable


  if (!(0, _shims.isFunction)(el[matchesSelectorFunc])) return false; // $FlowIgnore: Doesn't think elements are indexable

  return el[matchesSelectorFunc](selector);
} // Works up the tree to the draggable itself attempting to match selector.


function matchesSelectorAndParentsTo(el
/*: Node*/
, selector
/*: string*/
, baseNode
/*: Node*/
)
/*: boolean*/
{
  var node = el;

  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}

function addEvent(el
/*: ?Node*/
, event
/*: string*/
, handler
/*: Function*/
, inputOptions
/*: Object*/
)
/*: void*/
{
  if (!el) return;

  var options = _objectSpread({
    capture: true
  }, inputOptions); // $FlowIgnore[method-unbinding]


  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

function removeEvent(el
/*: ?Node*/
, event
/*: string*/
, handler
/*: Function*/
, inputOptions
/*: Object*/
)
/*: void*/
{
  if (!el) return;

  var options = _objectSpread({
    capture: true
  }, inputOptions); // $FlowIgnore[method-unbinding]


  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}

function outerHeight(node
/*: HTMLElement*/
)
/*: number*/
{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims.int)(computedStyle.borderTopWidth);
  height += (0, _shims.int)(computedStyle.borderBottomWidth);
  return height;
}

function outerWidth(node
/*: HTMLElement*/
)
/*: number*/
{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims.int)(computedStyle.borderLeftWidth);
  width += (0, _shims.int)(computedStyle.borderRightWidth);
  return width;
}

function innerHeight(node
/*: HTMLElement*/
)
/*: number*/
{
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims.int)(computedStyle.paddingTop);
  height -= (0, _shims.int)(computedStyle.paddingBottom);
  return height;
}

function innerWidth(node
/*: HTMLElement*/
)
/*: number*/
{
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims.int)(computedStyle.paddingLeft);
  width -= (0, _shims.int)(computedStyle.paddingRight);
  return width;
}
/*:: interface EventWithOffset {
  clientX: number, clientY: number
}*/


// Get from offsetParent
function offsetXYFromParent(evt
/*: EventWithOffset*/
, offsetParent
/*: HTMLElement*/
, scale
/*: number*/
)
/*: ControlPosition*/
{
  var isBody = offsetParent === offsetParent.ownerDocument.body;
  var offsetParentRect = isBody ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  var x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  var y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
  return {
    x: x,
    y: y
  };
}

function createCSSTransform(controlPos
/*: ControlPosition*/
, positionOffset
/*: PositionOffsetControlPosition*/
)
/*: Object*/
{
  var translation = getTranslation(controlPos, positionOffset, 'px');
  return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)('transform', _getPrefix.default), translation);
}

function createSVGTransform(controlPos
/*: ControlPosition*/
, positionOffset
/*: PositionOffsetControlPosition*/
)
/*: string*/
{
  var translation = getTranslation(controlPos, positionOffset, '');
  return translation;
}

function getTranslation(_ref2, positionOffset
/*: PositionOffsetControlPosition*/
, unitSuffix
/*: string*/
)
/*: string*/
{
  var x = _ref2.x,
      y = _ref2.y;
  var translation = "translate(".concat(x).concat(unitSuffix, ",").concat(y).concat(unitSuffix, ")");

  if (positionOffset) {
    var defaultX = "".concat(typeof positionOffset.x === 'string' ? positionOffset.x : positionOffset.x + unitSuffix);
    var defaultY = "".concat(typeof positionOffset.y === 'string' ? positionOffset.y : positionOffset.y + unitSuffix);
    translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")") + translation;
  }

  return translation;
}

function getTouch(e
/*: MouseTouchEvent*/
, identifier
/*: number*/
)
/*: ?{clientX: number, clientY: number}*/
{
  return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function (t) {
    return identifier === t.identifier;
  }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function (t) {
    return identifier === t.identifier;
  });
}

function getTouchIdentifier(e
/*: MouseTouchEvent*/
)
/*: ?number*/
{
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
} // User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.
// Note we're passing `document` b/c we could be iframed


function addUserSelectStyles(doc
/*: ?Document*/
) {
  if (!doc) return;
  var styleEl = doc.getElementById('react-draggable-style-el');

  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }

  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}

function removeUserSelectStyles(doc
/*: ?Document*/
) {
  if (!doc) return;

  try {
    if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection'); // $FlowIgnore: IE

    if (doc.selection) {
      // $FlowIgnore: IE
      doc.selection.empty();
    } else {
      // Remove selection caused by scroll, unless it's a focused input
      // (we use doc.defaultView in case we're in an iframe)
      var selection = (doc.defaultView || window).getSelection();

      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    }
  } catch (e) {// probably IE
  }
}

function addClassName(el
/*: HTMLElement*/
, className
/*: string*/
) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) {
      el.className += " ".concat(className);
    }
  }
}

function removeClassName(el
/*: HTMLElement*/
, className
/*: string*/
) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), 'g'), '');
  }
}

/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/utils/getPrefix.js":
/*!********************************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/utils/getPrefix.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrefix = getPrefix;
exports.browserPrefixToKey = browserPrefixToKey;
exports.browserPrefixToStyle = browserPrefixToStyle;
exports.default = void 0;
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];

function getPrefix()
/*: string*/
{
  var _window$document, _window$document$docu;

  var prop
  /*: string*/
  = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
  // Ensure we're running in an environment where there is actually a global
  // `window` obj
  if (typeof window === 'undefined') return ''; // If we're in a pseudo-browser server-side environment, this access
  // path may not exist, so bail out if it doesn't.

  var style = (_window$document = window.document) === null || _window$document === void 0 ? void 0 : (_window$document$docu = _window$document.documentElement) === null || _window$document$docu === void 0 ? void 0 : _window$document$docu.style;
  if (!style) return '';
  if (prop in style) return '';

  for (var i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }

  return '';
}

function browserPrefixToKey(prop
/*: string*/
, prefix
/*: string*/
)
/*: string*/
{
  return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
}

function browserPrefixToStyle(prop
/*: string*/
, prefix
/*: string*/
)
/*: string*/
{
  return prefix ? "-".concat(prefix.toLowerCase(), "-").concat(prop) : prop;
}

function kebabToTitleCase(str
/*: string*/
)
/*: string*/
{
  var out = '';
  var shouldCapitalize = true;

  for (var i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }

  return out;
} // Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`


var _default = (getPrefix()
/*: string*/
);

exports.default = _default;

/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/utils/log.js":
/*!**************************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/utils/log.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

/*eslint no-console:0*/
function log() {
  var _console;

  if (undefined) (_console = console).log.apply(_console, arguments);
}

/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/utils/positionFns.js":
/*!**********************************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/utils/positionFns.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoundPosition = getBoundPosition;
exports.snapToGrid = snapToGrid;
exports.canDragX = canDragX;
exports.canDragY = canDragY;
exports.getControlPosition = getControlPosition;
exports.createCoreData = createCoreData;
exports.createDraggableData = createDraggableData;

var _shims = __webpack_require__(/*! ./shims */ "../node_modules/react-draggable/build/cjs/utils/shims.js");

var _domFns = __webpack_require__(/*! ./domFns */ "../node_modules/react-draggable/build/cjs/utils/domFns.js");

function getBoundPosition(draggable
/*: Draggable*/
, x
/*: number*/
, y
/*: number*/
)
/*: [number, number]*/
{
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y]; // Clone new bounds

  var bounds = draggable.props.bounds;
  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  var node = findDOMNode(draggable);

  if (typeof bounds === 'string') {
    var ownerDocument = node.ownerDocument;
    var ownerWindow = ownerDocument.defaultView;
    var boundNode;

    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }

    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }

    var boundNodeEl
    /*: HTMLElement*/
    = boundNode; // for Flow, can't seem to refine correctly

    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl); // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.

    bounds = {
      left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
      right: (0, _domFns.innerWidth)(boundNodeEl) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
      bottom: (0, _domFns.innerHeight)(boundNodeEl) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
    };
  } // Keep x and y below right and bottom limits...


  if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
  if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom); // But above left and top limits.

  if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
  if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);
  return [x, y];
}

function snapToGrid(grid
/*: [number, number]*/
, pendingX
/*: number*/
, pendingY
/*: number*/
)
/*: [number, number]*/
{
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

function canDragX(draggable
/*: Draggable*/
)
/*: boolean*/
{
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}

function canDragY(draggable
/*: Draggable*/
)
/*: boolean*/
{
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
} // Get {x, y} positions from event.


function getControlPosition(e
/*: MouseTouchEvent*/
, touchIdentifier
/*: ?number*/
, draggableCore
/*: DraggableCore*/
)
/*: ?ControlPosition*/
{
  var touchObj = typeof touchIdentifier === 'number' ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch

  var node = findDOMNode(draggableCore); // User can provide an offsetParent if desired.

  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
} // Create an data object exposed by <DraggableCore>'s events


function createCoreData(draggable
/*: DraggableCore*/
, x
/*: number*/
, y
/*: number*/
)
/*: DraggableData*/
{
  var state = draggable.state;
  var isStart = !(0, _shims.isNum)(state.lastX);
  var node = findDOMNode(draggable);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node: node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x: x,
      y: y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node: node,
      deltaX: x - state.lastX,
      deltaY: y - state.lastY,
      lastX: state.lastX,
      lastY: state.lastY,
      x: x,
      y: y
    };
  }
} // Create an data exposed by <Draggable>'s events


function createDraggableData(draggable
/*: Draggable*/
, coreData
/*: DraggableData*/
)
/*: DraggableData*/
{
  var scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX / scale,
    y: draggable.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
} // A lot faster than stringify/parse


function cloneBounds(bounds
/*: Bounds*/
)
/*: Bounds*/
{
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}

function findDOMNode(draggable
/*: Draggable | DraggableCore*/
)
/*: HTMLElement*/
{
  var node = draggable.findDOMNode();

  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  } // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME


  return node;
}

/***/ }),

/***/ "../node_modules/react-draggable/build/cjs/utils/shims.js":
/*!****************************************************************!*\
  !*** ../node_modules/react-draggable/build/cjs/utils/shims.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findInArray = findInArray;
exports.isFunction = isFunction;
exports.isNum = isNum;
exports.int = int;
exports.dontSetMe = dontSetMe;

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array
/*: Array<any> | TouchList*/
, callback
/*: Function*/
)
/*: any*/
{
  for (var i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

function isFunction(func
/*: any*/
)
/*: boolean %checks*/
{
  // $FlowIgnore[method-unbinding]
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

function isNum(num
/*: any*/
)
/*: boolean %checks*/
{
  return typeof num === 'number' && !isNaN(num);
}

function int(a
/*: string*/
)
/*: number*/
{
  return parseInt(a, 10);
}

function dontSetMe(props
/*: Object*/
, propName
/*: string*/
, componentName
/*: string*/
)
/*: ?Error*/
{
  if (props[propName]) {
    return new Error("Invalid prop ".concat(propName, " passed to ").concat(componentName, " - do not set this, set it on the child."));
  }
}

/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js":
/*!**********************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js ***!
  \**********************************************************************/
/*! exports provided: A, B, C, D, E, F, G, H, M, P, _, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return getBoundsofRects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return BackgroundVariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return ConnectionMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return _arrayLikeToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return _unsupportedIterableToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return getD3Transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return fitView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return pointToRendererPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return MarkerType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return _slicedToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getMarkerId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getConnectedEdges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getDimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getHostForElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PanOnScrollMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getNodesInside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getSelectionChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return getRectOfNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return ConnectionLineType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return isNumeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return Provider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return createStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return applyEdgeChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return rectToBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return applyNodeChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return isNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return useStoreApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return isEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return getOutgoers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return getIncomers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return updateEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return getTransformForBounds; });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");




function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var ConnectionMode;

(function (ConnectionMode) {
  ConnectionMode["Strict"] = "strict";
  ConnectionMode["Loose"] = "loose";
})(ConnectionMode || (ConnectionMode = {}));

var BackgroundVariant;

(function (BackgroundVariant) {
  BackgroundVariant["Lines"] = "lines";
  BackgroundVariant["Dots"] = "dots";
})(BackgroundVariant || (BackgroundVariant = {}));

var PanOnScrollMode;

(function (PanOnScrollMode) {
  PanOnScrollMode["Free"] = "free";
  PanOnScrollMode["Vertical"] = "vertical";
  PanOnScrollMode["Horizontal"] = "horizontal";
})(PanOnScrollMode || (PanOnScrollMode = {}));

var ConnectionLineType;

(function (ConnectionLineType) {
  ConnectionLineType["Bezier"] = "default";
  ConnectionLineType["Straight"] = "straight";
  ConnectionLineType["Step"] = "step";
  ConnectionLineType["SmoothStep"] = "smoothstep";
  ConnectionLineType["SimpleBezier"] = "simplebezier";
})(ConnectionLineType || (ConnectionLineType = {}));

var MarkerType;

(function (MarkerType) {
  MarkerType["Arrow"] = "arrow";
  MarkerType["ArrowClosed"] = "arrowclosed";
})(MarkerType || (MarkerType = {}));

var Position;

(function (Position) {
  Position["Left"] = "left";
  Position["Top"] = "top";
  Position["Right"] = "right";
  Position["Bottom"] = "bottom";
})(Position || (Position = {}));

var getDimensions = function getDimensions(node) {
  return {
    width: node.offsetWidth,
    height: node.offsetHeight
  };
};
var clamp = function clamp(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Math.min(Math.max(val, min), max);
};
var clampPosition = function clampPosition(position, extent) {
  return {
    x: clamp(position.x, extent[0][0], extent[1][0]),
    y: clamp(position.y, extent[0][1], extent[1][1])
  };
};
var getHostForElement = function getHostForElement(element) {
  var _element$getRootNode, _window;

  return ((_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element)) || ((_window = window) === null || _window === void 0 ? void 0 : _window.document);
};
var getBoundsOfBoxes = function getBoundsOfBoxes(box1, box2) {
  return {
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2)
  };
};
var rectToBox = function rectToBox(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height;
  return {
    x: x,
    y: y,
    x2: x + width,
    y2: y + height
  };
};
var boxToRect = function boxToRect(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      x2 = _ref2.x2,
      y2 = _ref2.y2;
  return {
    x: x,
    y: y,
    width: x2 - x,
    height: y2 - y
  };
};
var getBoundsofRects = function getBoundsofRects(rect1, rect2) {
  return boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
};
var isNumeric = function isNumeric(n) {
  return !isNaN(n) && isFinite(n);
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function handleParentExpand(res, updateItem) {
  var parent = res.find(function (e) {
    return e.id === updateItem.parentNode;
  });

  if (parent) {
    var extendWidth = updateItem.position.x + updateItem.width - parent.width;
    var extendHeight = updateItem.position.y + updateItem.height - parent.height;

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      parent.style = _objectSpread$4({}, parent.style) || {};

      if (extendWidth > 0) {
        if (!parent.style.width) {
          parent.style.width = parent.width;
        }

        parent.style.width += extendWidth;
      }

      if (extendHeight > 0) {
        if (!parent.style.height) {
          parent.style.height = parent.height;
        }

        parent.style.height += extendHeight;
      }

      if (updateItem.position.x < 0) {
        var xDiff = Math.abs(updateItem.position.x);
        parent.position.x = parent.position.x - xDiff;
        parent.style.width += xDiff;
        updateItem.position.x = 0;
      }

      if (updateItem.position.y < 0) {
        var yDiff = Math.abs(updateItem.position.y);
        parent.position.y = parent.position.y - yDiff;
        parent.style.height += yDiff;
        updateItem.position.y = 0;
      }

      parent.width = parent.style.width;
      parent.height = parent.style.height;
    }
  }
}

function applyChanges(changes, elements) {
  // unfortunately we need this hack to handle the setNodes and setEdges function of the
  // useReactFlow hook.
  if (changes.some(function (c) {
    return c.type === 'reset';
  })) {
    return changes.filter(function (c) {
      return c.type === 'reset';
    }).map(function (c) {
      return c.item;
    });
  }

  var initElements = changes.filter(function (c) {
    return c.type === 'add';
  }).map(function (c) {
    return c.item;
  });
  return elements.reduce(function (res, item) {
    var currentChange = changes.find(function (c) {
      return c.id === item.id;
    });

    if (currentChange) {
      switch (currentChange.type) {
        case 'select':
          {
            res.push(_objectSpread$4(_objectSpread$4({}, item), {}, {
              selected: currentChange.selected
            }));
            return res;
          }

        case 'position':
          {
            var updateItem = _objectSpread$4({}, item);

            if (typeof currentChange.position !== 'undefined') {
              updateItem.position = currentChange.position;
            }

            if (typeof currentChange.dragging !== 'undefined') {
              updateItem.dragging = currentChange.dragging;
            }

            if (updateItem.expandParent) {
              handleParentExpand(res, updateItem);
            }

            res.push(updateItem);
            return res;
          }

        case 'dimensions':
          {
            var _updateItem = _objectSpread$4({}, item);

            if (typeof currentChange.dimensions !== 'undefined') {
              _updateItem.width = currentChange.dimensions.width;
              _updateItem.height = currentChange.dimensions.height;
            }

            if (_updateItem.expandParent) {
              handleParentExpand(res, _updateItem);
            }

            res.push(_updateItem);
            return res;
          }

        case 'remove':
          {
            return res;
          }
      }
    }

    res.push(item);
    return res;
  }, initElements);
}

function applyNodeChanges(changes, nodes) {
  return applyChanges(changes, nodes);
}
function applyEdgeChanges(changes, edges) {
  return applyChanges(changes, edges);
}
var createSelectionChange = function createSelectionChange(id, selected) {
  return {
    id: id,
    type: 'select',
    selected: selected
  };
};
function getSelectionChanges(items, selectedIds) {
  return items.reduce(function (res, item) {
    var willBeSelected = selectedIds.includes(item.id);

    if (!item.selected && willBeSelected) {
      item.selected = true;
      res.push(createSelectionChange(item.id, true));
    } else if (item.selected && !willBeSelected) {
      item.selected = false;
      res.push(createSelectionChange(item.id, false));
    }

    return res;
  }, []);
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var getHandleBounds = function getHandleBounds(nodeElement, scale) {
  var bounds = nodeElement.getBoundingClientRect();
  return {
    source: getHandleBoundsByHandleType('.source', nodeElement, bounds, scale),
    target: getHandleBoundsByHandleType('.target', nodeElement, bounds, scale)
  };
};
var getHandleBoundsByHandleType = function getHandleBoundsByHandleType(selector, nodeElement, parentBounds, k) {
  var handles = nodeElement.querySelectorAll(selector);

  if (!handles || !handles.length) {
    return null;
  }

  var handlesArray = Array.from(handles);
  return handlesArray.map(function (handle) {
    var bounds = handle.getBoundingClientRect();
    var dimensions = getDimensions(handle);
    var handleId = handle.getAttribute('data-handleid');
    var handlePosition = handle.getAttribute('data-handlepos');
    return _objectSpread$3({
      id: handleId,
      position: handlePosition,
      x: (bounds.left - parentBounds.left) / k,
      y: (bounds.top - parentBounds.top) / k
    }, dimensions);
  });
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var isEdge = function isEdge(element) {
  return 'id' in element && 'source' in element && 'target' in element;
};
var isNode = function isNode(element) {
  return 'id' in element && !('source' in element) && !('target' in element);
};
var getOutgoers = function getOutgoers(node, nodes, edges) {
  if (!isNode(node)) {
    return [];
  }

  var outgoerIds = edges.filter(function (e) {
    return e.source === node.id;
  }).map(function (e) {
    return e.target;
  });
  return nodes.filter(function (n) {
    return outgoerIds.includes(n.id);
  });
};
var getIncomers = function getIncomers(node, nodes, edges) {
  if (!isNode(node)) {
    return [];
  }

  var incomersIds = edges.filter(function (e) {
    return e.target === node.id;
  }).map(function (e) {
    return e.source;
  });
  return nodes.filter(function (n) {
    return incomersIds.includes(n.id);
  });
};

var getEdgeId = function getEdgeId(_ref) {
  var source = _ref.source,
      sourceHandle = _ref.sourceHandle,
      target = _ref.target,
      targetHandle = _ref.targetHandle;
  return "reactflow__edge-".concat(source).concat(sourceHandle || '', "-").concat(target).concat(targetHandle || '');
};

var getMarkerId = function getMarkerId(marker) {
  if (typeof marker === 'undefined') {
    return '';
  }

  if (typeof marker === 'string') {
    return marker;
  }

  return Object.keys(marker).sort().map(function (key) {
    return "".concat(key, "=").concat(marker[key]);
  }).join('&');
};

var connectionExists = function connectionExists(edge, edges) {
  return edges.some(function (el) {
    return el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle);
  });
};

var addEdge = function addEdge(edgeParams, edges) {
  if (!edgeParams.source || !edgeParams.target) {
    console.warn("Can't create edge. An edge needs a source and a target.");
    return edges;
  }

  var edge;

  if (isEdge(edgeParams)) {
    edge = _objectSpread$2({}, edgeParams);
  } else {
    edge = _objectSpread$2(_objectSpread$2({}, edgeParams), {}, {
      id: getEdgeId(edgeParams)
    });
  }

  if (connectionExists(edge, edges)) {
    return edges;
  }

  return edges.concat(edge);
};
var updateEdge = function updateEdge(oldEdge, newConnection, edges) {
  if (!newConnection.source || !newConnection.target) {
    console.warn("Can't create new edge. An edge needs a source and a target.");
    return edges;
  }

  var foundEdge = edges.find(function (e) {
    return e.id === oldEdge.id;
  });

  if (!foundEdge) {
    console.warn("The old edge with id=".concat(oldEdge.id, " does not exist."));
    return edges;
  } // Remove old edge and create the new edge with parameters of old edge.


  var edge = _objectSpread$2(_objectSpread$2({}, oldEdge), {}, {
    id: getEdgeId(newConnection),
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle
  });

  return edges.filter(function (e) {
    return e.id !== oldEdge.id;
  }).concat(edge);
};
var pointToRendererPoint = function pointToRendererPoint(_ref2, _ref3, snapToGrid, _ref4) {
  var x = _ref2.x,
      y = _ref2.y;

  var _ref5 = _slicedToArray(_ref3, 3),
      tx = _ref5[0],
      ty = _ref5[1],
      tScale = _ref5[2];

  var _ref6 = _slicedToArray(_ref4, 2),
      snapX = _ref6[0],
      snapY = _ref6[1];

  var position = {
    x: (x - tx) / tScale,
    y: (y - ty) / tScale
  };

  if (snapToGrid) {
    return {
      x: snapX * Math.round(position.x / snapX),
      y: snapY * Math.round(position.y / snapY)
    };
  }

  return position;
};
var getRectOfNodes = function getRectOfNodes(nodes) {
  var box = nodes.reduce(function (currBox, _ref7) {
    var positionAbsolute = _ref7.positionAbsolute,
        position = _ref7.position,
        width = _ref7.width,
        height = _ref7.height;
    return getBoundsOfBoxes(currBox, rectToBox({
      x: positionAbsolute ? positionAbsolute.x : position.x,
      y: positionAbsolute ? positionAbsolute.y : position.y,
      width: width || 0,
      height: height || 0
    }));
  }, {
    x: Infinity,
    y: Infinity,
    x2: -Infinity,
    y2: -Infinity
  });
  return boxToRect(box);
};
var getNodesInside = function getNodesInside(nodeInternals, rect) {
  var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0, 1],
      _ref9 = _slicedToArray(_ref8, 3),
      tx = _ref9[0],
      ty = _ref9[1],
      tScale = _ref9[2];

  var partially = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var excludeNonSelectableNodes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var rBox = rectToBox({
    x: (rect.x - tx) / tScale,
    y: (rect.y - ty) / tScale,
    width: rect.width / tScale,
    height: rect.height / tScale
  });
  var visibleNodes = [];
  nodeInternals.forEach(function (node) {
    var positionAbsolute = node.positionAbsolute,
        width = node.width,
        height = node.height,
        dragging = node.dragging,
        _node$selectable = node.selectable,
        selectable = _node$selectable === void 0 ? true : _node$selectable;

    if (excludeNonSelectableNodes && !selectable) {
      return false;
    }

    var nBox = rectToBox(_objectSpread$2(_objectSpread$2({}, positionAbsolute), {}, {
      width: width || 0,
      height: height || 0
    }));
    var xOverlap = Math.max(0, Math.min(rBox.x2, nBox.x2) - Math.max(rBox.x, nBox.x));
    var yOverlap = Math.max(0, Math.min(rBox.y2, nBox.y2) - Math.max(rBox.y, nBox.y));
    var overlappingArea = Math.ceil(xOverlap * yOverlap);
    var notInitialized = typeof width === 'undefined' || typeof height === 'undefined' || width === null || height === null || dragging;
    var partiallyVisible = partially && overlappingArea > 0;
    var area = (width || 0) * (height || 0);
    var isVisible = notInitialized || partiallyVisible || overlappingArea >= area;

    if (isVisible) {
      visibleNodes.push(node);
    }
  });
  return visibleNodes;
};
var getConnectedEdges = function getConnectedEdges(nodes, edges) {
  var nodeIds = nodes.map(function (node) {
    return node.id;
  });
  return edges.filter(function (edge) {
    return nodeIds.includes(edge.source) || nodeIds.includes(edge.target);
  });
};
var getTransformForBounds = function getTransformForBounds(bounds, width, height, minZoom, maxZoom) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.1;
  var xZoom = width / (bounds.width * (1 + padding));
  var yZoom = height / (bounds.height * (1 + padding));
  var zoom = Math.min(xZoom, yZoom);
  var clampedZoom = clamp(zoom, minZoom, maxZoom);
  var boundsCenterX = bounds.x + bounds.width / 2;
  var boundsCenterY = bounds.y + bounds.height / 2;
  var x = width / 2 - boundsCenterX * clampedZoom;
  var y = height / 2 - boundsCenterY * clampedZoom;
  return [x, y, clampedZoom];
};
var getD3Transition = function getD3Transition(selection) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return selection.transition().duration(duration);
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function calculateXYZPosition(node, nodeInternals, parentNodes, result) {
  var _result$x, _parentNode$position$, _parentNode$position, _result$y, _parentNode$position$2, _parentNode$position2, _parentNode$z, _result$z, _parentNode$z2, _result$z2;

  if (!node.parentNode) {
    return result;
  }

  var parentNode = nodeInternals.get(node.parentNode);
  return calculateXYZPosition(parentNode, nodeInternals, parentNodes, {
    x: ((_result$x = result.x) !== null && _result$x !== void 0 ? _result$x : 0) + ((_parentNode$position$ = (_parentNode$position = parentNode.position) === null || _parentNode$position === void 0 ? void 0 : _parentNode$position.x) !== null && _parentNode$position$ !== void 0 ? _parentNode$position$ : 0),
    y: ((_result$y = result.y) !== null && _result$y !== void 0 ? _result$y : 0) + ((_parentNode$position$2 = (_parentNode$position2 = parentNode.position) === null || _parentNode$position2 === void 0 ? void 0 : _parentNode$position2.y) !== null && _parentNode$position$2 !== void 0 ? _parentNode$position$2 : 0),
    z: ((_parentNode$z = parentNode.z) !== null && _parentNode$z !== void 0 ? _parentNode$z : 0) > ((_result$z = result.z) !== null && _result$z !== void 0 ? _result$z : 0) ? (_parentNode$z2 = parentNode.z) !== null && _parentNode$z2 !== void 0 ? _parentNode$z2 : 0 : (_result$z2 = result.z) !== null && _result$z2 !== void 0 ? _result$z2 : 0
  });
}

function createNodeInternals(nodes, nodeInternals) {
  var nextNodeInternals = new Map();
  var parentNodes = {};
  nodes.forEach(function (node) {
    var z = isNumeric(node.zIndex) ? node.zIndex : node.dragging || node.selected ? 1000 : 0;

    var internals = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, nodeInternals.get(node.id)), node), {}, {
      positionAbsolute: {
        x: node.position.x,
        y: node.position.y
      },
      z: z
    });

    if (node.parentNode) {
      internals.parentNode = node.parentNode;
      parentNodes[node.parentNode] = true;
    }

    nextNodeInternals.set(node.id, internals);
  });
  nextNodeInternals.forEach(function (node) {
    if (node.parentNode && !nextNodeInternals.has(node.parentNode)) {
      throw new Error("Parent node ".concat(node.parentNode, " not found"));
    }

    if (node.parentNode || parentNodes[node.id]) {
      var _node$z;

      var _calculateXYZPosition = calculateXYZPosition(node, nextNodeInternals, parentNodes, _objectSpread$1(_objectSpread$1({}, node.position), {}, {
        z: (_node$z = node.z) !== null && _node$z !== void 0 ? _node$z : 0
      })),
          x = _calculateXYZPosition.x,
          y = _calculateXYZPosition.y,
          z = _calculateXYZPosition.z;

      node.positionAbsolute = {
        x: x,
        y: y
      };
      node.z = z;

      if (parentNodes[node.id]) {
        node.isParent = true;
      }
    }
  });
  return nextNodeInternals;
}
function isParentSelected(node, nodeInternals) {
  if (!node.parentNode) {
    return false;
  }

  var parentNode = nodeInternals.get(node.parentNode);

  if (!parentNode) {
    return false;
  }

  if (parentNode.selected) {
    return true;
  }

  return isParentSelected(parentNode, nodeInternals);
}
function createPositionChange(_ref) {
  var node = _ref.node,
      diff = _ref.diff,
      dragging = _ref.dragging,
      nodeExtent = _ref.nodeExtent,
      nodeInternals = _ref.nodeInternals;
  var change = {
    id: node.id,
    type: 'position',
    dragging: !!dragging
  };

  if (diff) {
    var nextPosition = {
      x: node.position.x + diff.x,
      y: node.position.y + diff.y
    };
    var currentExtent = node.extent || nodeExtent;

    if (node.extent === 'parent') {
      if (node.parentNode && node.width && node.height) {
        var parent = nodeInternals.get(node.parentNode);
        currentExtent = parent !== null && parent !== void 0 && parent.width && parent !== null && parent !== void 0 && parent.height ? [[0, 0], [parent.width - node.width, parent.height - node.height]] : currentExtent;
      } else {
        console.warn('Only child nodes can use parent extent');
        currentExtent = nodeExtent;
      }
    }

    change.position = currentExtent ? clampPosition(nextPosition, currentExtent) : nextPosition;
  }

  return change;
}
function fitView(get) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _get = get(),
      nodeInternals = _get.nodeInternals,
      width = _get.width,
      height = _get.height,
      minZoom = _get.minZoom,
      maxZoom = _get.maxZoom,
      d3Zoom = _get.d3Zoom,
      d3Selection = _get.d3Selection,
      fitViewOnInitDone = _get.fitViewOnInitDone,
      fitViewOnInit = _get.fitViewOnInit;

  if (options.initial && !fitViewOnInitDone && fitViewOnInit || !options.initial) {
    if (d3Zoom && d3Selection) {
      var nodes = Array.from(nodeInternals.values()).filter(function (n) {
        return options.includeHiddenNodes ? !n.parentNode && n.width && n.height : !n.parentNode && !n.hidden;
      });
      var nodesInitialized = nodes.every(function (n) {
        return n.width && n.height;
      });

      if (nodes.length > 0 && nodesInitialized) {
        var _options$minZoom, _options$maxZoom, _options$padding;

        var bounds = getRectOfNodes(nodes);

        var _getTransformForBound = getTransformForBounds(bounds, width, height, (_options$minZoom = options.minZoom) !== null && _options$minZoom !== void 0 ? _options$minZoom : minZoom, (_options$maxZoom = options.maxZoom) !== null && _options$maxZoom !== void 0 ? _options$maxZoom : maxZoom, (_options$padding = options.padding) !== null && _options$padding !== void 0 ? _options$padding : 0.1),
            _getTransformForBound2 = _slicedToArray(_getTransformForBound, 3),
            x = _getTransformForBound2[0],
            y = _getTransformForBound2[1],
            zoom = _getTransformForBound2[2];

        var nextTransform = d3_zoom__WEBPACK_IMPORTED_MODULE_2__["zoomIdentity"].translate(x, y).scale(zoom);

        if (typeof options.duration === 'number' && options.duration > 0) {
          d3Zoom.transform(getD3Transition(d3Selection, options.duration), nextTransform);
        } else {
          d3Zoom.transform(d3Selection, nextTransform);
        }

        return true;
      }
    }
  }

  return false;
}
function handleControlledNodeSelectionChange(nodeChanges, nodeInternals) {
  nodeChanges.forEach(function (change) {
    var node = nodeInternals.get(change.id);

    if (node) {
      nodeInternals.set(node.id, _objectSpread$1(_objectSpread$1({}, node), {}, {
        selected: change.selected
      }));
    }
  });
  return new Map(nodeInternals);
}
function handleControlledEdgeSelectionChange(edgeChanges, edges) {
  return edges.map(function (e) {
    var change = edgeChanges.find(function (change) {
      return change.id === e.id;
    });

    if (change) {
      e.selected = change.selected;
    }

    return e;
  });
}

var infiniteExtent = [[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY], [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]];
var initialState = {
  width: 0,
  height: 0,
  transform: [0, 0, 1],
  nodeInternals: new Map(),
  edges: [],
  onNodesChange: null,
  onEdgesChange: null,
  hasDefaultNodes: false,
  hasDefaultEdges: false,
  selectedNodesBbox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  d3Zoom: null,
  d3Selection: null,
  d3ZoomHandler: undefined,
  minZoom: 0.5,
  maxZoom: 2,
  translateExtent: infiniteExtent,
  nodeExtent: infiniteExtent,
  nodesSelectionActive: false,
  userSelectionActive: false,
  connectionNodeId: null,
  connectionHandleId: null,
  connectionHandleType: 'source',
  connectionPosition: {
    x: 0,
    y: 0
  },
  connectionMode: ConnectionMode.Strict,
  snapGrid: [15, 15],
  snapToGrid: false,
  nodesDraggable: true,
  nodesConnectable: true,
  elementsSelectable: true,
  fitViewOnInit: false,
  fitViewOnInitDone: false,
  fitViewOnInitOptions: undefined,
  multiSelectionActive: false,
  reactFlowVersion: "10.0.6" ,
  connectionStartHandle: null,
  connectOnClick: true
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _createContext = zustand_context__WEBPACK_IMPORTED_MODULE_1___default()(),
    Provider = _createContext.Provider,
    useStore = _createContext.useStore,
    useStoreApi = _createContext.useStoreApi;

var createStore = function createStore() {
  return zustand__WEBPACK_IMPORTED_MODULE_0___default()(function (set, get) {
    return _objectSpread(_objectSpread({}, initialState), {}, {
      setNodes: function setNodes(nodes) {
        set({
          nodeInternals: createNodeInternals(nodes, get().nodeInternals)
        });
      },
      setEdges: function setEdges(edges) {
        var _get = get(),
            defaultEdgeOptions = _get.defaultEdgeOptions;

        if (defaultEdgeOptions) {
          set({
            edges: edges.map(function (e) {
              return _objectSpread(_objectSpread({}, defaultEdgeOptions), e);
            })
          });
        } else {
          set({
            edges: edges
          });
        }
      },
      setDefaultNodesAndEdges: function setDefaultNodesAndEdges(nodes, edges) {
        var hasDefaultNodes = typeof nodes !== 'undefined';
        var hasDefaultEdges = typeof edges !== 'undefined';
        var nodeInternals = hasDefaultNodes ? createNodeInternals(nodes, new Map()) : new Map();
        var nextEdges = hasDefaultEdges ? edges : [];
        set({
          nodeInternals: nodeInternals,
          edges: nextEdges,
          hasDefaultNodes: hasDefaultNodes,
          hasDefaultEdges: hasDefaultEdges
        });
      },
      updateNodeDimensions: function updateNodeDimensions(updates) {
        var _get2 = get(),
            onNodesChange = _get2.onNodesChange,
            transform = _get2.transform,
            nodeInternals = _get2.nodeInternals,
            fitViewOnInit = _get2.fitViewOnInit,
            fitViewOnInitDone = _get2.fitViewOnInitDone,
            fitViewOnInitOptions = _get2.fitViewOnInitOptions;

        var changes = updates.reduce(function (res, update) {
          var node = nodeInternals.get(update.id);

          if (node) {
            var dimensions = getDimensions(update.nodeElement);
            var doUpdate = !!(dimensions.width && dimensions.height && (node.width !== dimensions.width || node.height !== dimensions.height || update.forceUpdate));

            if (doUpdate) {
              var handleBounds = getHandleBounds(update.nodeElement, transform[2]);
              nodeInternals.set(node.id, _objectSpread(_objectSpread({}, node), {}, {
                handleBounds: handleBounds
              }, dimensions));
              res.push({
                id: node.id,
                type: 'dimensions',
                dimensions: dimensions
              });
            }
          }

          return res;
        }, []);
        var nextFitViewOnInitDone = fitViewOnInitDone || fitViewOnInit && !fitViewOnInitDone && fitView(get, _objectSpread({
          initial: true
        }, fitViewOnInitOptions));
        set({
          nodeInternals: new Map(nodeInternals),
          fitViewOnInitDone: nextFitViewOnInitDone
        });

        if ((changes === null || changes === void 0 ? void 0 : changes.length) > 0) {
          onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changes);
        }
      },
      updateNodePosition: function updateNodePosition(_ref) {
        var id = _ref.id,
            diff = _ref.diff,
            dragging = _ref.dragging;

        var _get3 = get(),
            onNodesChange = _get3.onNodesChange,
            nodeExtent = _get3.nodeExtent,
            nodeInternals = _get3.nodeInternals,
            hasDefaultNodes = _get3.hasDefaultNodes;

        if (hasDefaultNodes || onNodesChange) {
          var changes = [];
          nodeInternals.forEach(function (node) {
            if (node.selected) {
              if (!node.parentNode || !isParentSelected(node, nodeInternals)) {
                changes.push(createPositionChange({
                  node: node,
                  diff: diff,
                  dragging: dragging,
                  nodeExtent: nodeExtent,
                  nodeInternals: nodeInternals
                }));
              }
            } else if (node.id === id) {
              changes.push(createPositionChange({
                node: node,
                diff: diff,
                dragging: dragging,
                nodeExtent: nodeExtent,
                nodeInternals: nodeInternals
              }));
            }
          });

          if (changes !== null && changes !== void 0 && changes.length) {
            if (hasDefaultNodes) {
              var nodes = applyNodeChanges(changes, Array.from(nodeInternals.values()));
              var nextNodeInternals = createNodeInternals(nodes, nodeInternals);
              set({
                nodeInternals: nextNodeInternals
              });
            }

            onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changes);
          }
        }
      },
      // @TODO: can we unify addSelectedNodes and addSelectedEdges somehow?
      addSelectedNodes: function addSelectedNodes(selectedNodeIds) {
        var _changedEdges;

        var _get4 = get(),
            multiSelectionActive = _get4.multiSelectionActive,
            onNodesChange = _get4.onNodesChange,
            nodeInternals = _get4.nodeInternals,
            hasDefaultNodes = _get4.hasDefaultNodes,
            onEdgesChange = _get4.onEdgesChange,
            hasDefaultEdges = _get4.hasDefaultEdges,
            edges = _get4.edges;

        var changedNodes;
        var changedEdges = null;

        if (multiSelectionActive) {
          changedNodes = selectedNodeIds.map(function (nodeId) {
            return createSelectionChange(nodeId, true);
          });
        } else {
          changedNodes = getSelectionChanges(Array.from(nodeInternals.values()), selectedNodeIds);
          changedEdges = getSelectionChanges(edges, []);
        }

        if (changedNodes.length) {
          if (hasDefaultNodes) {
            set({
              nodeInternals: handleControlledNodeSelectionChange(changedNodes, nodeInternals)
            });
          }

          onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changedNodes);
        }

        if ((_changedEdges = changedEdges) !== null && _changedEdges !== void 0 && _changedEdges.length) {
          if (hasDefaultEdges) {
            set({
              edges: handleControlledEdgeSelectionChange(changedEdges, edges)
            });
          }

          onEdgesChange === null || onEdgesChange === void 0 ? void 0 : onEdgesChange(changedEdges);
        }
      },
      addSelectedEdges: function addSelectedEdges(selectedEdgeIds) {
        var _changedNodes;

        var _get5 = get(),
            multiSelectionActive = _get5.multiSelectionActive,
            onEdgesChange = _get5.onEdgesChange,
            edges = _get5.edges,
            hasDefaultEdges = _get5.hasDefaultEdges,
            nodeInternals = _get5.nodeInternals,
            hasDefaultNodes = _get5.hasDefaultNodes,
            onNodesChange = _get5.onNodesChange;

        var changedEdges;
        var changedNodes = null;

        if (multiSelectionActive) {
          changedEdges = selectedEdgeIds.map(function (edgeId) {
            return createSelectionChange(edgeId, true);
          });
        } else {
          changedEdges = getSelectionChanges(edges, selectedEdgeIds);
          changedNodes = getSelectionChanges(Array.from(nodeInternals.values()), []);
        }

        if (changedEdges.length) {
          if (hasDefaultEdges) {
            set({
              edges: handleControlledEdgeSelectionChange(changedEdges, edges)
            });
          }

          onEdgesChange === null || onEdgesChange === void 0 ? void 0 : onEdgesChange(changedEdges);
        }

        if ((_changedNodes = changedNodes) !== null && _changedNodes !== void 0 && _changedNodes.length) {
          if (hasDefaultNodes) {
            set({
              nodeInternals: handleControlledNodeSelectionChange(changedNodes, nodeInternals)
            });
          }

          onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changedNodes);
        }
      },
      unselectNodesAndEdges: function unselectNodesAndEdges() {
        var _get6 = get(),
            nodeInternals = _get6.nodeInternals,
            edges = _get6.edges,
            onNodesChange = _get6.onNodesChange,
            onEdgesChange = _get6.onEdgesChange,
            hasDefaultNodes = _get6.hasDefaultNodes,
            hasDefaultEdges = _get6.hasDefaultEdges;

        var nodes = Array.from(nodeInternals.values());
        var nodesToUnselect = nodes.map(function (n) {
          n.selected = false;
          return createSelectionChange(n.id, false);
        });
        var edgesToUnselect = edges.map(function (edge) {
          return createSelectionChange(edge.id, false);
        });

        if (nodesToUnselect.length) {
          if (hasDefaultNodes) {
            set({
              nodeInternals: handleControlledNodeSelectionChange(nodesToUnselect, nodeInternals)
            });
          }

          onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(nodesToUnselect);
        }

        if (edgesToUnselect.length) {
          if (hasDefaultEdges) {
            set({
              edges: handleControlledEdgeSelectionChange(edgesToUnselect, edges)
            });
          }

          onEdgesChange === null || onEdgesChange === void 0 ? void 0 : onEdgesChange(edgesToUnselect);
        }
      },
      setMinZoom: function setMinZoom(minZoom) {
        var _get7 = get(),
            d3Zoom = _get7.d3Zoom,
            maxZoom = _get7.maxZoom;

        d3Zoom === null || d3Zoom === void 0 ? void 0 : d3Zoom.scaleExtent([minZoom, maxZoom]);
        set({
          minZoom: minZoom
        });
      },
      setMaxZoom: function setMaxZoom(maxZoom) {
        var _get8 = get(),
            d3Zoom = _get8.d3Zoom,
            minZoom = _get8.minZoom;

        d3Zoom === null || d3Zoom === void 0 ? void 0 : d3Zoom.scaleExtent([minZoom, maxZoom]);
        set({
          maxZoom: maxZoom
        });
      },
      setTranslateExtent: function setTranslateExtent(translateExtent) {
        var _get9 = get(),
            d3Zoom = _get9.d3Zoom;

        d3Zoom === null || d3Zoom === void 0 ? void 0 : d3Zoom.translateExtent(translateExtent);
        set({
          translateExtent: translateExtent
        });
      },
      resetSelectedElements: function resetSelectedElements() {
        var _get10 = get(),
            nodeInternals = _get10.nodeInternals,
            edges = _get10.edges,
            onNodesChange = _get10.onNodesChange,
            onEdgesChange = _get10.onEdgesChange,
            hasDefaultNodes = _get10.hasDefaultNodes,
            hasDefaultEdges = _get10.hasDefaultEdges;

        var nodes = Array.from(nodeInternals.values());
        var nodesToUnselect = nodes.filter(function (e) {
          return e.selected;
        }).map(function (n) {
          return createSelectionChange(n.id, false);
        });
        var edgesToUnselect = edges.filter(function (e) {
          return e.selected;
        }).map(function (e) {
          return createSelectionChange(e.id, false);
        });

        if (nodesToUnselect.length) {
          if (hasDefaultNodes) {
            set({
              nodeInternals: handleControlledNodeSelectionChange(nodesToUnselect, nodeInternals)
            });
          }

          onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(nodesToUnselect);
        }

        if (edgesToUnselect.length) {
          if (hasDefaultEdges) {
            set({
              edges: handleControlledEdgeSelectionChange(edgesToUnselect, edges)
            });
          }

          onEdgesChange === null || onEdgesChange === void 0 ? void 0 : onEdgesChange(edgesToUnselect);
        }
      },
      setNodeExtent: function setNodeExtent(nodeExtent) {
        var _get11 = get(),
            nodeInternals = _get11.nodeInternals;

        nodeInternals.forEach(function (node) {
          node.positionAbsolute = clampPosition(node.position, nodeExtent);
        });
        set({
          nodeExtent: nodeExtent,
          nodeInternals: new Map(nodeInternals)
        });
      },
      reset: function reset() {
        return set(_objectSpread({}, initialState));
      }
    });
  });
};


//# sourceMappingURL=index-5236d2af.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/index.js":
/*!*************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/index.js ***!
  \*************************************************************/
/*! exports provided: BackgroundVariant, ConnectionLineType, ConnectionMode, MarkerType, PanOnScrollMode, Position, addEdge, applyEdgeChanges, applyNodeChanges, getConnectedEdges, getIncomers, getOutgoers, getRectOfNodes, getTransformForBounds, isEdge, isNode, updateEdge, useStore, useStoreApi, useReactFlow, MiniMap, ControlButton, Controls, Background, useUpdateNodeInternals, useNodes, useEdges, useViewport, BezierEdge, EdgeText, Handle, ReactFlowProvider, SimpleBezierEdge, SmoothStepEdge, StepEdge, StraightEdge, default, getBezierEdgeCenter, getBezierPath, getEdgeCenter, getMarkerEnd, getSimpleBezierEdgeCenter, getSimpleBezierPath, getSmoothStepPath, useEdgesState, useKeyPress, useNodesState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BezierEdge", function() { return BezierEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdgeText", function() { return EdgeText$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handle", function() { return Handle$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactFlowProvider", function() { return ReactFlowProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleBezierEdge", function() { return SimpleBezierEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmoothStepEdge", function() { return SmoothStepEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StepEdge", function() { return StepEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StraightEdge", function() { return StraightEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReactFlow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBezierEdgeCenter", function() { return getBezierCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBezierPath", function() { return getBezierPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEdgeCenter", function() { return getCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMarkerEnd", function() { return getMarkerEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSimpleBezierEdgeCenter", function() { return getSimpleBezierCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSimpleBezierPath", function() { return getSimpleBezierPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSmoothStepPath", function() { return getSmoothStepPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEdgesState", function() { return useEdgesState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useKeyPress", function() { return useKeyPress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNodesState", function() { return useNodesState; });
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BackgroundVariant", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["B"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConnectionLineType", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConnectionMode", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["C"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkerType", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["M"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanOnScrollMode", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addEdge", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyEdgeChanges", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["q"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyNodeChanges", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["s"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getConnectedEdges", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIncomers", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["x"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOutgoers", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["w"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRectOfNodes", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTransformForBounds", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["z"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEdge", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["v"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNode", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["t"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateEdge", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["y"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useStore", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useStoreApi", function() { return _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"]; });

/* harmony import */ var _useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useReactFlow-ad36feba.js */ "../node_modules/react-flow-renderer/dist/esm/useReactFlow-ad36feba.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReactFlow", function() { return _useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["u"]; });

/* harmony import */ var classcat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classcat */ "../node_modules/classcat/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/shallow */ "../node_modules/zustand/shallow.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(zustand_shallow__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-draggable */ "../node_modules/react-draggable/build/cjs/cjs.js");
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _index2_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./index2.js */ "../node_modules/react-flow-renderer/dist/esm/index2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MiniMap", function() { return _index2_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _index3_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index3.js */ "../node_modules/react-flow-renderer/dist/esm/index3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControlButton", function() { return _index3_js__WEBPACK_IMPORTED_MODULE_9__["ControlButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controls", function() { return _index3_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _index4_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./index4.js */ "../node_modules/react-flow-renderer/dist/esm/index4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Background", function() { return _index4_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _useUpdateNodeInternals_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./useUpdateNodeInternals.js */ "../node_modules/react-flow-renderer/dist/esm/useUpdateNodeInternals.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUpdateNodeInternals", function() { return _useUpdateNodeInternals_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _useNodes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./useNodes.js */ "../node_modules/react-flow-renderer/dist/esm/useNodes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useNodes", function() { return _useNodes_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _useEdges_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./useEdges.js */ "../node_modules/react-flow-renderer/dist/esm/useEdges.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEdges", function() { return _useEdges_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _useViewport_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./useViewport.js */ "../node_modules/react-flow-renderer/dist/esm/useViewport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useViewport", function() { return _useViewport_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_16__);




















function Attribution(_ref) {
  var proOptions = _ref.proOptions,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'bottom-right' : _ref$position;

  if (((proOptions === null || proOptions === void 0 ? void 0 : proOptions.account) === 'paid-sponsor' || (proOptions === null || proOptions === void 0 ? void 0 : proOptions.account) === 'paid-enterprise' || (proOptions === null || proOptions === void 0 ? void 0 : proOptions.account) === 'paid-custom') && proOptions !== null && proOptions !== void 0 && proOptions.hideAttribution) {
    return null;
  }

  var positionClasses = "".concat(position).split('-');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__attribution'].concat(Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["_"])(positionClasses))),
    "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev/pricing"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("a", {
    href: "https://reactflow.dev",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "React Flow"));
}

var _excluded$2 = ["x", "y", "label", "labelStyle", "labelShowBg", "labelBgStyle", "labelBgPadding", "labelBgBorderRadius", "children", "className"];

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var EdgeText = function EdgeText(_ref) {
  var x = _ref.x,
      y = _ref.y,
      label = _ref.label,
      _ref$labelStyle = _ref.labelStyle,
      labelStyle = _ref$labelStyle === void 0 ? {} : _ref$labelStyle,
      _ref$labelShowBg = _ref.labelShowBg,
      labelShowBg = _ref$labelShowBg === void 0 ? true : _ref$labelShowBg,
      _ref$labelBgStyle = _ref.labelBgStyle,
      labelBgStyle = _ref$labelBgStyle === void 0 ? {} : _ref$labelBgStyle,
      _ref$labelBgPadding = _ref.labelBgPadding,
      labelBgPadding = _ref$labelBgPadding === void 0 ? [2, 4] : _ref$labelBgPadding,
      _ref$labelBgBorderRad = _ref.labelBgBorderRadius,
      labelBgBorderRadius = _ref$labelBgBorderRad === void 0 ? 2 : _ref$labelBgBorderRad,
      children = _ref.children,
      className = _ref.className,
      rest = Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["a"])(_ref, _excluded$2);

  var edgeRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }),
      _useState2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useState, 2),
      edgeTextBbox = _useState2[0],
      setEdgeTextBbox = _useState2[1];

  var edgeTextClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__edge-textwrapper', className]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (edgeRef.current) {
      var textBbox = edgeRef.current.getBBox();
      setEdgeTextBbox({
        x: textBbox.x,
        y: textBbox.y,
        width: textBbox.width,
        height: textBbox.height
      });
    }
  }, [label]);

  if (typeof label === 'undefined' || !label) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("g", _objectSpread$a({
    transform: "translate(".concat(x - edgeTextBbox.width / 2, " ").concat(y - edgeTextBbox.height / 2, ")"),
    className: edgeTextClasses
  }, rest), labelShowBg && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("rect", {
    width: edgeTextBbox.width + 2 * labelBgPadding[0],
    x: -labelBgPadding[0],
    y: -labelBgPadding[1],
    height: edgeTextBbox.height + 2 * labelBgPadding[1],
    className: "react-flow__edge-textbg",
    style: labelBgStyle,
    rx: labelBgBorderRadius,
    ry: labelBgBorderRadius
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("text", {
    className: "react-flow__edge-text",
    y: edgeTextBbox.height / 2,
    dy: "0.3em",
    ref: edgeRef,
    style: labelStyle
  }, label), children);
};

var EdgeText$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(EdgeText);

var BaseEdge = (function (_ref) {
  var path = _ref.path,
      centerX = _ref.centerX,
      centerY = _ref.centerY,
      label = _ref.label,
      labelStyle = _ref.labelStyle,
      labelShowBg = _ref.labelShowBg,
      labelBgStyle = _ref.labelBgStyle,
      labelBgPadding = _ref.labelBgPadding,
      labelBgBorderRadius = _ref.labelBgBorderRadius,
      style = _ref.style,
      markerEnd = _ref.markerEnd,
      markerStart = _ref.markerStart;
  var text = label ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(EdgeText$1, {
    x: centerX,
    y: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius
  }) : null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("path", {
    style: style,
    d: path,
    className: "react-flow__edge-path",
    markerEnd: markerEnd,
    markerStart: markerStart
  }), text);
});

function getControl(_ref) {
  var pos = _ref.pos,
      x1 = _ref.x1,
      y1 = _ref.y1,
      x2 = _ref.x2,
      y2 = _ref.y2;
  var ctX, ctY;

  switch (pos) {
    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left:
    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right:
      {
        ctX = 0.5 * (x1 + x2);
        ctY = y1;
      }
      break;

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top:
    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom:
      {
        ctX = x1;
        ctY = 0.5 * (y1 + y2);
      }
      break;
  }

  return [ctX, ctY];
}

function getSimpleBezierPath(_ref2) {
  var sourceX = _ref2.sourceX,
      sourceY = _ref2.sourceY,
      _ref2$sourcePosition = _ref2.sourcePosition,
      sourcePosition = _ref2$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref2$sourcePosition,
      targetX = _ref2.targetX,
      targetY = _ref2.targetY,
      _ref2$targetPosition = _ref2.targetPosition,
      targetPosition = _ref2$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref2$targetPosition;

  var _getControl = getControl({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY
  }),
      _getControl2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControl, 2),
      sourceControlX = _getControl2[0],
      sourceControlY = _getControl2[1];

  var _getControl3 = getControl({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY
  }),
      _getControl4 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControl3, 2),
      targetControlX = _getControl4[0],
      targetControlY = _getControl4[1];

  return "M".concat(sourceX, ",").concat(sourceY, " C").concat(sourceControlX, ",").concat(sourceControlY, " ").concat(targetControlX, ",").concat(targetControlY, " ").concat(targetX, ",").concat(targetY);
} // @TODO: this function will recalculate the control points
// one option is to let getXXXPath() return center points
// but will introduce breaking changes
// the getCenter() of other types of edges might need to change, too

function getSimpleBezierCenter(_ref3) {
  var sourceX = _ref3.sourceX,
      sourceY = _ref3.sourceY,
      _ref3$sourcePosition = _ref3.sourcePosition,
      sourcePosition = _ref3$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref3$sourcePosition,
      targetX = _ref3.targetX,
      targetY = _ref3.targetY,
      _ref3$targetPosition = _ref3.targetPosition,
      targetPosition = _ref3$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref3$targetPosition;

  var _getControl5 = getControl({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY
  }),
      _getControl6 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControl5, 2),
      sourceControlX = _getControl6[0],
      sourceControlY = _getControl6[1];

  var _getControl7 = getControl({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY
  }),
      _getControl8 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControl7, 2),
      targetControlX = _getControl8[0],
      targetControlY = _getControl8[1]; // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve


  var centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
  var centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
  var xOffset = Math.abs(centerX - sourceX);
  var yOffset = Math.abs(centerY - sourceY);
  return [centerX, centerY, xOffset, yOffset];
}
var SimpleBezierEdge = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(function (_ref4) {
  var sourceX = _ref4.sourceX,
      sourceY = _ref4.sourceY,
      targetX = _ref4.targetX,
      targetY = _ref4.targetY,
      _ref4$sourcePosition = _ref4.sourcePosition,
      sourcePosition = _ref4$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref4$sourcePosition,
      _ref4$targetPosition = _ref4.targetPosition,
      targetPosition = _ref4$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref4$targetPosition,
      label = _ref4.label,
      labelStyle = _ref4.labelStyle,
      labelShowBg = _ref4.labelShowBg,
      labelBgStyle = _ref4.labelBgStyle,
      labelBgPadding = _ref4.labelBgPadding,
      labelBgBorderRadius = _ref4.labelBgBorderRadius,
      style = _ref4.style,
      markerEnd = _ref4.markerEnd,
      markerStart = _ref4.markerStart;
  var params = {
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition
  };
  var path = getSimpleBezierPath(params);

  var _getSimpleBezierCente = getSimpleBezierCenter(params),
      _getSimpleBezierCente2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getSimpleBezierCente, 2),
      centerX = _getSimpleBezierCente2[0],
      centerY = _getSimpleBezierCente2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

var getMarkerEnd = function getMarkerEnd(markerType, markerEndId) {
  if (typeof markerEndId !== 'undefined' && markerEndId) {
    return "url(#".concat(markerEndId, ")");
  }

  return typeof markerType !== 'undefined' ? "url(#react-flow__".concat(markerType, ")") : 'none';
};
var LeftOrRight = [_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left, _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right];
var getCenter = function getCenter(_ref) {
  var sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref$sourcePosition,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref$targetPosition;
  var sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
  var targetIsLeftOrRight = LeftOrRight.includes(targetPosition); // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
  // a mixed edge is when one the source is on the left and the target is on the top for example.

  var mixedEdge = sourceIsLeftOrRight && !targetIsLeftOrRight || targetIsLeftOrRight && !sourceIsLeftOrRight;

  if (mixedEdge) {
    var _xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;

    var _centerX = sourceX > targetX ? sourceX - _xOffset : sourceX + _xOffset;

    var _yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);

    var _centerY = sourceY < targetY ? sourceY + _yOffset : sourceY - _yOffset;

    return [_centerX, _centerY, _xOffset, _yOffset];
  }

  var xOffset = Math.abs(targetX - sourceX) / 2;
  var centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  var yOffset = Math.abs(targetY - sourceY) / 2;
  var centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  return [centerX, centerY, xOffset, yOffset];
};

// The name indicates the direction of the path. "bottomLeftCorner" goes
// from bottom to the left and "leftBottomCorner" goes from left to the bottom.
// We have to consider the direction of the paths because of the animated lines.

var bottomLeftCorner = function bottomLeftCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y - size, "Q ").concat(x, ",").concat(y, " ").concat(x + size, ",").concat(y);
};

var leftBottomCorner = function leftBottomCorner(x, y, size) {
  return "L ".concat(x + size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y - size);
};

var bottomRightCorner = function bottomRightCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y - size, "Q ").concat(x, ",").concat(y, " ").concat(x - size, ",").concat(y);
};

var rightBottomCorner = function rightBottomCorner(x, y, size) {
  return "L ".concat(x - size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y - size);
};

var leftTopCorner = function leftTopCorner(x, y, size) {
  return "L ".concat(x + size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y + size);
};

var topLeftCorner = function topLeftCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y + size, "Q ").concat(x, ",").concat(y, " ").concat(x + size, ",").concat(y);
};

var topRightCorner = function topRightCorner(x, y, size) {
  return "L ".concat(x, ",").concat(y + size, "Q ").concat(x, ",").concat(y, " ").concat(x - size, ",").concat(y);
};

var rightTopCorner = function rightTopCorner(x, y, size) {
  return "L ".concat(x - size, ",").concat(y, "Q ").concat(x, ",").concat(y, " ").concat(x, ",").concat(y + size);
};

function getSmoothStepPath(_ref) {
  var sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref$sourcePosition,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref$targetPosition,
      _ref$borderRadius = _ref.borderRadius,
      borderRadius = _ref$borderRadius === void 0 ? 5 : _ref$borderRadius,
      centerX = _ref.centerX,
      centerY = _ref.centerY;

  var _getCenter = getCenter({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY
  }),
      _getCenter2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getCenter, 4),
      _centerX = _getCenter2[0],
      _centerY = _getCenter2[1],
      offsetX = _getCenter2[2],
      offsetY = _getCenter2[3];

  var cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
  var cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
  var cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
  var leftAndRight = [_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left, _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right];
  var cX = typeof centerX !== 'undefined' ? centerX : _centerX;
  var cY = typeof centerY !== 'undefined' ? centerY : _centerY;
  var firstCornerPath = null;
  var secondCornerPath = null;

  if (sourceX <= targetX) {
    firstCornerPath = sourceY <= targetY ? bottomLeftCorner(sourceX, cY, cornerSize) : topLeftCorner(sourceX, cY, cornerSize);
    secondCornerPath = sourceY <= targetY ? rightTopCorner(targetX, cY, cornerSize) : rightBottomCorner(targetX, cY, cornerSize);
  } else {
    firstCornerPath = sourceY < targetY ? bottomRightCorner(sourceX, cY, cornerSize) : topRightCorner(sourceX, cY, cornerSize);
    secondCornerPath = sourceY < targetY ? leftTopCorner(targetX, cY, cornerSize) : leftBottomCorner(targetX, cY, cornerSize);
  }

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? rightTopCorner(cX, sourceY, cornerSize) : rightBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath = sourceY <= targetY ? bottomLeftCorner(cX, targetY, cornerSize) : topLeftCorner(cX, targetY, cornerSize);
    } else if (sourcePosition === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right && targetPosition === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left || sourcePosition === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left && targetPosition === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right || sourcePosition === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left && targetPosition === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left) {
      // and sourceX > targetX
      firstCornerPath = sourceY <= targetY ? leftTopCorner(cX, sourceY, cornerSize) : leftBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath = sourceY <= targetY ? bottomRightCorner(cX, targetY, cornerSize) : topRightCorner(cX, targetY, cornerSize);
    }
  } else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? rightTopCorner(targetX, sourceY, cornerSize) : rightBottomCorner(targetX, sourceY, cornerSize);
    } else {
      firstCornerPath = sourceY <= targetY ? leftTopCorner(targetX, sourceY, cornerSize) : leftBottomCorner(targetX, sourceY, cornerSize);
    }

    secondCornerPath = '';
  } else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? bottomLeftCorner(sourceX, targetY, cornerSize) : topLeftCorner(sourceX, targetY, cornerSize);
    } else {
      firstCornerPath = sourceY <= targetY ? bottomRightCorner(sourceX, targetY, cornerSize) : topRightCorner(sourceX, targetY, cornerSize);
    }

    secondCornerPath = '';
  }

  return "M ".concat(sourceX, ",").concat(sourceY).concat(firstCornerPath).concat(secondCornerPath, "L ").concat(targetX, ",").concat(targetY);
}
var SmoothStepEdge = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(function (_ref2) {
  var sourceX = _ref2.sourceX,
      sourceY = _ref2.sourceY,
      targetX = _ref2.targetX,
      targetY = _ref2.targetY,
      label = _ref2.label,
      labelStyle = _ref2.labelStyle,
      labelShowBg = _ref2.labelShowBg,
      labelBgStyle = _ref2.labelBgStyle,
      labelBgPadding = _ref2.labelBgPadding,
      labelBgBorderRadius = _ref2.labelBgBorderRadius,
      style = _ref2.style,
      _ref2$sourcePosition = _ref2.sourcePosition,
      sourcePosition = _ref2$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref2$sourcePosition,
      _ref2$targetPosition = _ref2.targetPosition,
      targetPosition = _ref2$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref2$targetPosition,
      markerEnd = _ref2.markerEnd,
      markerStart = _ref2.markerStart,
      _ref2$borderRadius = _ref2.borderRadius,
      borderRadius = _ref2$borderRadius === void 0 ? 5 : _ref2$borderRadius;

  var _getCenter3 = getCenter({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY,
    sourcePosition: sourcePosition,
    targetPosition: targetPosition
  }),
      _getCenter4 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getCenter3, 2),
      centerX = _getCenter4[0],
      centerY = _getCenter4[1];

  var path = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition,
    borderRadius: borderRadius
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StepEdge = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(function (props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(SmoothStepEdge, _objectSpread$9(_objectSpread$9({}, props), {}, {
    borderRadius: 0
  }));
});

var StraightEdge = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(function (_ref) {
  var sourceX = _ref.sourceX,
      sourceY = _ref.sourceY,
      targetX = _ref.targetX,
      targetY = _ref.targetY,
      label = _ref.label,
      labelStyle = _ref.labelStyle,
      labelShowBg = _ref.labelShowBg,
      labelBgStyle = _ref.labelBgStyle,
      labelBgPadding = _ref.labelBgPadding,
      labelBgBorderRadius = _ref.labelBgBorderRadius,
      style = _ref.style,
      markerEnd = _ref.markerEnd,
      markerStart = _ref.markerStart;
  var yOffset = Math.abs(targetY - sourceY) / 2;
  var centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  var xOffset = Math.abs(targetX - sourceX) / 2;
  var centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  var path = "M ".concat(sourceX, ",").concat(sourceY, "L ").concat(targetX, ",").concat(targetY);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

function calculateControlOffset(distance, curvature) {
  if (distance >= 0) {
    return 0.5 * distance;
  } else {
    return curvature * 25 * Math.sqrt(-distance);
  }
}

function getControlWithCurvature(_ref) {
  var pos = _ref.pos,
      x1 = _ref.x1,
      y1 = _ref.y1,
      x2 = _ref.x2,
      y2 = _ref.y2,
      c = _ref.c;
  var ctX, ctY;

  switch (pos) {
    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left:
      {
        ctX = x1 - calculateControlOffset(x1 - x2, c);
        ctY = y1;
      }
      break;

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right:
      {
        ctX = x1 + calculateControlOffset(x2 - x1, c);
        ctY = y1;
      }
      break;

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top:
      {
        ctX = x1;
        ctY = y1 - calculateControlOffset(y1 - y2, c);
      }
      break;

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom:
      {
        ctX = x1;
        ctY = y1 + calculateControlOffset(y2 - y1, c);
      }
      break;
  }

  return [ctX, ctY];
}

function getBezierPath(_ref2) {
  var sourceX = _ref2.sourceX,
      sourceY = _ref2.sourceY,
      _ref2$sourcePosition = _ref2.sourcePosition,
      sourcePosition = _ref2$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref2$sourcePosition,
      targetX = _ref2.targetX,
      targetY = _ref2.targetY,
      _ref2$targetPosition = _ref2.targetPosition,
      targetPosition = _ref2$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref2$targetPosition,
      _ref2$curvature = _ref2.curvature,
      curvature = _ref2$curvature === void 0 ? 0.25 : _ref2$curvature;

  var _getControlWithCurvat = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
    c: curvature
  }),
      _getControlWithCurvat2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControlWithCurvat, 2),
      sourceControlX = _getControlWithCurvat2[0],
      sourceControlY = _getControlWithCurvat2[1];

  var _getControlWithCurvat3 = getControlWithCurvature({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
    c: curvature
  }),
      _getControlWithCurvat4 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControlWithCurvat3, 2),
      targetControlX = _getControlWithCurvat4[0],
      targetControlY = _getControlWithCurvat4[1];

  return "M".concat(sourceX, ",").concat(sourceY, " C").concat(sourceControlX, ",").concat(sourceControlY, " ").concat(targetControlX, ",").concat(targetControlY, " ").concat(targetX, ",").concat(targetY);
} // @TODO: this function will recalculate the control points
// one option is to let getXXXPath() return center points
// but will introduce breaking changes
// the getCenter() of other types of edges might need to change, too

function getBezierCenter(_ref3) {
  var sourceX = _ref3.sourceX,
      sourceY = _ref3.sourceY,
      _ref3$sourcePosition = _ref3.sourcePosition,
      sourcePosition = _ref3$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref3$sourcePosition,
      targetX = _ref3.targetX,
      targetY = _ref3.targetY,
      _ref3$targetPosition = _ref3.targetPosition,
      targetPosition = _ref3$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref3$targetPosition,
      _ref3$curvature = _ref3.curvature,
      curvature = _ref3$curvature === void 0 ? 0.25 : _ref3$curvature;

  var _getControlWithCurvat5 = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
    c: curvature
  }),
      _getControlWithCurvat6 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControlWithCurvat5, 2),
      sourceControlX = _getControlWithCurvat6[0],
      sourceControlY = _getControlWithCurvat6[1];

  var _getControlWithCurvat7 = getControlWithCurvature({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
    c: curvature
  }),
      _getControlWithCurvat8 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getControlWithCurvat7, 2),
      targetControlX = _getControlWithCurvat8[0],
      targetControlY = _getControlWithCurvat8[1]; // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve


  var centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
  var centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
  var xOffset = Math.abs(centerX - sourceX);
  var yOffset = Math.abs(centerY - sourceY);
  return [centerX, centerY, xOffset, yOffset];
}
var BezierEdge = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(function (_ref4) {
  var sourceX = _ref4.sourceX,
      sourceY = _ref4.sourceY,
      targetX = _ref4.targetX,
      targetY = _ref4.targetY,
      _ref4$sourcePosition = _ref4.sourcePosition,
      sourcePosition = _ref4$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref4$sourcePosition,
      _ref4$targetPosition = _ref4.targetPosition,
      targetPosition = _ref4$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref4$targetPosition,
      label = _ref4.label,
      labelStyle = _ref4.labelStyle,
      labelShowBg = _ref4.labelShowBg,
      labelBgStyle = _ref4.labelBgStyle,
      labelBgPadding = _ref4.labelBgPadding,
      labelBgBorderRadius = _ref4.labelBgBorderRadius,
      style = _ref4.style,
      markerEnd = _ref4.markerEnd,
      markerStart = _ref4.markerStart,
      curvature = _ref4.curvature;
  var params = {
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition,
    curvature: curvature
  };
  var path = getBezierPath(params);

  var _getBezierCenter = getBezierCenter(params),
      _getBezierCenter2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getBezierCenter, 2),
      centerX = _getBezierCenter2[0],
      centerY = _getBezierCenter2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(BaseEdge, {
    path: path,
    centerX: centerX,
    centerY: centerY,
    label: label,
    labelStyle: labelStyle,
    labelShowBg: labelShowBg,
    labelBgStyle: labelBgStyle,
    labelBgPadding: labelBgPadding,
    labelBgBorderRadius: labelBgBorderRadius,
    style: style,
    markerEnd: markerEnd,
    markerStart: markerStart
  });
});

var NodeIdContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["createContext"])(null);
var Provider = NodeIdContext.Provider;
NodeIdContext.Consumer;

function checkElementBelowIsValid(event, connectionMode, isTarget, nodeId, handleId, isValidConnection, doc) {
  var elementBelow = doc.elementFromPoint(event.clientX, event.clientY);
  var elementBelowIsTarget = (elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('target')) || false;
  var elementBelowIsSource = (elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('source')) || false;
  var result = {
    elementBelow: elementBelow,
    isValid: false,
    connection: {
      source: null,
      target: null,
      sourceHandle: null,
      targetHandle: null
    },
    isHoveringHandle: false
  };

  if (elementBelow && (elementBelowIsTarget || elementBelowIsSource)) {
    result.isHoveringHandle = true; // in strict mode we don't allow target to target or source to source connections

    var isValid = connectionMode === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["C"].Strict ? isTarget && elementBelowIsSource || !isTarget && elementBelowIsTarget : true;

    if (isValid) {
      var elementBelowNodeId = elementBelow.getAttribute('data-nodeid');
      var elementBelowHandleId = elementBelow.getAttribute('data-handleid');
      var connection = isTarget ? {
        source: elementBelowNodeId,
        sourceHandle: elementBelowHandleId,
        target: nodeId,
        targetHandle: handleId
      } : {
        source: nodeId,
        sourceHandle: handleId,
        target: elementBelowNodeId,
        targetHandle: elementBelowHandleId
      };
      result.connection = connection;
      result.isValid = isValidConnection(connection);
    }
  }

  return result;
}

function resetRecentHandle(hoveredHandle) {
  hoveredHandle === null || hoveredHandle === void 0 ? void 0 : hoveredHandle.classList.remove('react-flow__handle-valid');
  hoveredHandle === null || hoveredHandle === void 0 ? void 0 : hoveredHandle.classList.remove('react-flow__handle-connecting');
}

function onMouseDown(event, handleId, nodeId, setState, onConnect, isTarget, isValidConnection, connectionMode, elementEdgeUpdaterType, onEdgeUpdateEnd, onConnectStart, onConnectStop, onConnectEnd) {
  var reactFlowNode = event.target.closest('.react-flow'); // when react-flow is used inside a shadow root we can't use document

  var doc = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["g"])(event.target);

  if (!doc) {
    return;
  }

  var elementBelow = doc.elementFromPoint(event.clientX, event.clientY);
  var elementBelowIsTarget = elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('target');
  var elementBelowIsSource = elementBelow === null || elementBelow === void 0 ? void 0 : elementBelow.classList.contains('source');

  if (!reactFlowNode || !elementBelowIsTarget && !elementBelowIsSource && !elementEdgeUpdaterType) {
    return;
  }

  var handleType = elementEdgeUpdaterType ? elementEdgeUpdaterType : elementBelowIsTarget ? 'target' : 'source';
  var containerBounds = reactFlowNode.getBoundingClientRect();
  var recentHoveredHandle;
  setState({
    connectionPosition: {
      x: event.clientX - containerBounds.left,
      y: event.clientY - containerBounds.top
    },
    connectionNodeId: nodeId,
    connectionHandleId: handleId,
    connectionHandleType: handleType
  });
  onConnectStart === null || onConnectStart === void 0 ? void 0 : onConnectStart(event, {
    nodeId: nodeId,
    handleId: handleId,
    handleType: handleType
  });

  function onMouseMove(event) {
    setState({
      connectionPosition: {
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top
      }
    });

    var _checkElementBelowIsV = checkElementBelowIsValid(event, connectionMode, isTarget, nodeId, handleId, isValidConnection, doc),
        connection = _checkElementBelowIsV.connection,
        elementBelow = _checkElementBelowIsV.elementBelow,
        isValid = _checkElementBelowIsV.isValid,
        isHoveringHandle = _checkElementBelowIsV.isHoveringHandle;

    if (!isHoveringHandle) {
      return resetRecentHandle(recentHoveredHandle);
    }

    var isOwnHandle = connection.source === connection.target;

    if (!isOwnHandle && elementBelow) {
      recentHoveredHandle = elementBelow;
      elementBelow.classList.add('react-flow__handle-connecting');
      elementBelow.classList.toggle('react-flow__handle-valid', isValid);
    }
  }

  function onMouseUp(event) {
    var _checkElementBelowIsV2 = checkElementBelowIsValid(event, connectionMode, isTarget, nodeId, handleId, isValidConnection, doc),
        connection = _checkElementBelowIsV2.connection,
        isValid = _checkElementBelowIsV2.isValid;

    onConnectStop === null || onConnectStop === void 0 ? void 0 : onConnectStop(event);

    if (isValid) {
      onConnect === null || onConnect === void 0 ? void 0 : onConnect(connection);
    }

    onConnectEnd === null || onConnectEnd === void 0 ? void 0 : onConnectEnd(event);

    if (elementEdgeUpdaterType && onEdgeUpdateEnd) {
      onEdgeUpdateEnd(event);
    }

    resetRecentHandle(recentHoveredHandle);
    setState({
      connectionNodeId: null,
      connectionHandleId: null,
      connectionHandleType: null
    });
    doc.removeEventListener('mousemove', onMouseMove);
    doc.removeEventListener('mouseup', onMouseUp);
  }

  doc.addEventListener('mousemove', onMouseMove);
  doc.addEventListener('mouseup', onMouseUp);
}

var _excluded$1 = ["type", "position", "isValidConnection", "isConnectable", "id", "onConnect", "children", "className"];

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var alwaysValid = function alwaysValid() {
  return true;
};

var selector$d = function selector(s) {
  return {
    onConnectAction: s.onConnect,
    onConnectStart: s.onConnectStart,
    onConnectStop: s.onConnectStop,
    onConnectEnd: s.onConnectEnd,
    connectionMode: s.connectionMode,
    connectionStartHandle: s.connectionStartHandle,
    connectOnClick: s.connectOnClick,
    hasDefaultEdges: s.hasDefaultEdges
  };
};

var Handle = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function (_ref, ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'source' : _ref$type,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref$position,
      _ref$isValidConnectio = _ref.isValidConnection,
      isValidConnection = _ref$isValidConnectio === void 0 ? alwaysValid : _ref$isValidConnectio,
      _ref$isConnectable = _ref.isConnectable,
      isConnectable = _ref$isConnectable === void 0 ? true : _ref$isConnectable,
      id = _ref.id,
      onConnect = _ref.onConnect,
      children = _ref.children,
      className = _ref.className,
      rest = Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["a"])(_ref, _excluded$1);

  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();
  var nodeId = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(NodeIdContext);

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$d, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      onConnectAction = _useStore.onConnectAction,
      onConnectStart = _useStore.onConnectStart,
      onConnectStop = _useStore.onConnectStop,
      onConnectEnd = _useStore.onConnectEnd,
      connectionMode = _useStore.connectionMode,
      connectionStartHandle = _useStore.connectionStartHandle,
      connectOnClick = _useStore.connectOnClick,
      hasDefaultEdges = _useStore.hasDefaultEdges;

  var handleId = id || null;
  var isTarget = type === 'target';
  var onConnectExtended = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (params) {
    var _store$getState = store.getState(),
        defaultEdgeOptions = _store$getState.defaultEdgeOptions;

    var edgeParams = _objectSpread$8(_objectSpread$8({}, defaultEdgeOptions), params);

    if (hasDefaultEdges) {
      var _store$getState2 = store.getState(),
          edges = _store$getState2.edges;

      store.setState({
        edges: Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["c"])(edgeParams, edges)
      });
    }

    onConnectAction === null || onConnectAction === void 0 ? void 0 : onConnectAction(edgeParams);
    onConnect === null || onConnect === void 0 ? void 0 : onConnect(edgeParams);
  }, [hasDefaultEdges, onConnectAction, onConnect]);
  var onMouseDownHandler = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    if (event.button === 0) {
      onMouseDown(event, handleId, nodeId, store.setState, onConnectExtended, isTarget, isValidConnection, connectionMode, undefined, undefined, onConnectStart, onConnectStop, onConnectEnd);
    }
  }, [handleId, nodeId, onConnectExtended, isTarget, isValidConnection, connectionMode, onConnectStart, onConnectStop, onConnectEnd]);
  var onClick = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    if (!connectionStartHandle) {
      onConnectStart === null || onConnectStart === void 0 ? void 0 : onConnectStart(event, {
        nodeId: nodeId,
        handleId: handleId,
        handleType: type
      });
      store.setState({
        connectionStartHandle: {
          nodeId: nodeId,
          type: type,
          handleId: handleId
        }
      });
    } else {
      var doc = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["g"])(event.target);

      var _checkElementBelowIsV = checkElementBelowIsValid(event, connectionMode, connectionStartHandle.type === 'target', connectionStartHandle.nodeId, connectionStartHandle.handleId || null, isValidConnection, doc),
          connection = _checkElementBelowIsV.connection,
          isValid = _checkElementBelowIsV.isValid;

      onConnectStop === null || onConnectStop === void 0 ? void 0 : onConnectStop(event);

      if (isValid) {
        onConnectExtended(connection);
      }

      onConnectEnd === null || onConnectEnd === void 0 ? void 0 : onConnectEnd(event);
      store.setState({
        connectionStartHandle: null
      });
    }
  }, [connectionStartHandle, onConnectStart, onConnectExtended, onConnectStop, onConnectEnd, isTarget, nodeId, handleId, type]);
  var handleClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__handle', "react-flow__handle-".concat(position), 'nodrag', className, {
    source: !isTarget,
    target: isTarget,
    connectable: isConnectable,
    connecting: (connectionStartHandle === null || connectionStartHandle === void 0 ? void 0 : connectionStartHandle.nodeId) === nodeId && (connectionStartHandle === null || connectionStartHandle === void 0 ? void 0 : connectionStartHandle.handleId) === handleId && (connectionStartHandle === null || connectionStartHandle === void 0 ? void 0 : connectionStartHandle.type) === type
  }]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", _objectSpread$8({
    "data-handleid": handleId,
    "data-nodeid": nodeId,
    "data-handlepos": position,
    className: handleClasses,
    onMouseDown: onMouseDownHandler,
    onClick: connectOnClick ? onClick : undefined,
    ref: ref
  }, rest), children);
});
Handle.displayName = 'Handle';
var Handle$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(Handle);

var DefaultNode = function DefaultNode(_ref) {
  var data = _ref.data,
      isConnectable = _ref.isConnectable,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref$targetPosition,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref$sourcePosition;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Handle$1, {
    type: "target",
    position: targetPosition,
    isConnectable: isConnectable
  }), data === null || data === void 0 ? void 0 : data.label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Handle$1, {
    type: "source",
    position: sourcePosition,
    isConnectable: isConnectable
  }));
};

DefaultNode.displayName = 'DefaultNode';
var DefaultNode$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(DefaultNode);

var InputNode = function InputNode(_ref) {
  var data = _ref.data,
      isConnectable = _ref.isConnectable,
      _ref$sourcePosition = _ref.sourcePosition,
      sourcePosition = _ref$sourcePosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom : _ref$sourcePosition;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, data === null || data === void 0 ? void 0 : data.label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Handle$1, {
    type: "source",
    position: sourcePosition,
    isConnectable: isConnectable
  }));
};

InputNode.displayName = 'InputNode';
var InputNode$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(InputNode);

var OutputNode = function OutputNode(_ref) {
  var data = _ref.data,
      isConnectable = _ref.isConnectable,
      _ref$targetPosition = _ref.targetPosition,
      targetPosition = _ref$targetPosition === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top : _ref$targetPosition;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Handle$1, {
    type: "target",
    position: targetPosition,
    isConnectable: isConnectable
  }), data === null || data === void 0 ? void 0 : data.label);
};

OutputNode.displayName = 'OutputNode';
var OutputNode$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(OutputNode);

var selector$c = function selector(s) {
  return {
    selectedNodes: Array.from(s.nodeInternals.values()).filter(function (n) {
      return n.selected;
    }),
    selectedEdges: s.edges.filter(function (e) {
      return e.selected;
    })
  };
};

var areEqual = function areEqual(objA, objB) {
  var selectedNodeIdsA = objA.selectedNodes.map(function (n) {
    return n.id;
  });
  var selectedNodeIdsB = objB.selectedNodes.map(function (n) {
    return n.id;
  });
  var selectedEdgeIdsA = objA.selectedEdges.map(function (e) {
    return e.id;
  });
  var selectedEdgeIdsB = objB.selectedEdges.map(function (e) {
    return e.id;
  });
  return zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default()(selectedNodeIdsA, selectedNodeIdsB) && zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default()(selectedEdgeIdsA, selectedEdgeIdsB);
}; // This is just a helper component for calling the onSelectionChange listener.
// @TODO: Now that we have the onNodesChange and on EdgesChange listeners, do we still need this component?


function SelectionListener(_ref) {
  var onSelectionChange = _ref.onSelectionChange;

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$c, areEqual),
      selectedNodes = _useStore.selectedNodes,
      selectedEdges = _useStore.selectedEdges;

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    onSelectionChange({
      nodes: selectedNodes,
      edges: selectedEdges
    });
  }, [selectedNodes, selectedEdges]);
  return null;
}

var SelectionListener$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(SelectionListener);

var selector$b = function selector(s) {
  return {
    setNodes: s.setNodes,
    setEdges: s.setEdges,
    setDefaultNodesAndEdges: s.setDefaultNodesAndEdges,
    setMinZoom: s.setMinZoom,
    setMaxZoom: s.setMaxZoom,
    setTranslateExtent: s.setTranslateExtent,
    setNodeExtent: s.setNodeExtent,
    reset: s.reset
  };
};

function useStoreUpdater(value, setStoreState) {
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (typeof value !== 'undefined') {
      setStoreState(value);
    }
  }, [value]);
}

function useDirectStoreUpdater(key, value, setState) {
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (typeof value !== 'undefined') {
      // @ts-ignore
      setState(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])({}, key, value));
    }
  }, [value]);
}

var StoreUpdater = function StoreUpdater(_ref) {
  var nodes = _ref.nodes,
      edges = _ref.edges,
      defaultNodes = _ref.defaultNodes,
      defaultEdges = _ref.defaultEdges,
      onConnect = _ref.onConnect,
      onConnectStart = _ref.onConnectStart,
      onConnectStop = _ref.onConnectStop,
      onConnectEnd = _ref.onConnectEnd,
      nodesDraggable = _ref.nodesDraggable,
      nodesConnectable = _ref.nodesConnectable,
      minZoom = _ref.minZoom,
      maxZoom = _ref.maxZoom,
      nodeExtent = _ref.nodeExtent,
      onNodesChange = _ref.onNodesChange,
      onEdgesChange = _ref.onEdgesChange,
      elementsSelectable = _ref.elementsSelectable,
      connectionMode = _ref.connectionMode,
      snapGrid = _ref.snapGrid,
      snapToGrid = _ref.snapToGrid,
      translateExtent = _ref.translateExtent,
      connectOnClick = _ref.connectOnClick,
      defaultEdgeOptions = _ref.defaultEdgeOptions,
      fitView = _ref.fitView,
      fitViewOptions = _ref.fitViewOptions,
      onNodesDelete = _ref.onNodesDelete,
      onEdgesDelete = _ref.onEdgesDelete;

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$b, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      setNodes = _useStore.setNodes,
      setEdges = _useStore.setEdges,
      setDefaultNodesAndEdges = _useStore.setDefaultNodesAndEdges,
      setMinZoom = _useStore.setMinZoom,
      setMaxZoom = _useStore.setMaxZoom,
      setTranslateExtent = _useStore.setTranslateExtent,
      setNodeExtent = _useStore.setNodeExtent,
      reset = _useStore.reset;

  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    setDefaultNodesAndEdges(defaultNodes, defaultEdges);
    return function () {
      reset();
    };
  }, []);
  useDirectStoreUpdater('defaultEdgeOptions', defaultEdgeOptions, store.setState);
  useDirectStoreUpdater('connectionMode', connectionMode, store.setState);
  useDirectStoreUpdater('onConnect', onConnect, store.setState);
  useDirectStoreUpdater('onConnectStart', onConnectStart, store.setState);
  useDirectStoreUpdater('onConnectStop', onConnectStop, store.setState);
  useDirectStoreUpdater('onConnectEnd', onConnectEnd, store.setState);
  useDirectStoreUpdater('nodesDraggable', nodesDraggable, store.setState);
  useDirectStoreUpdater('nodesConnectable', nodesConnectable, store.setState);
  useDirectStoreUpdater('elementsSelectable', elementsSelectable, store.setState);
  useDirectStoreUpdater('snapToGrid', snapToGrid, store.setState);
  useDirectStoreUpdater('snapGrid', snapGrid, store.setState);
  useDirectStoreUpdater('onNodesChange', onNodesChange, store.setState);
  useDirectStoreUpdater('onEdgesChange', onEdgesChange, store.setState);
  useDirectStoreUpdater('connectOnClick', connectOnClick, store.setState);
  useDirectStoreUpdater('fitViewOnInit', fitView, store.setState);
  useDirectStoreUpdater('fitViewOnInitOptions', fitViewOptions, store.setState);
  useDirectStoreUpdater('onNodesDelete', onNodesDelete, store.setState);
  useDirectStoreUpdater('onEdgesDelete', onEdgesDelete, store.setState);
  useStoreUpdater(nodes, setNodes);
  useStoreUpdater(edges, setEdges);
  useStoreUpdater(defaultNodes, setNodes);
  useStoreUpdater(defaultEdges, setEdges);
  useStoreUpdater(minZoom, setMinZoom);
  useStoreUpdater(maxZoom, setMaxZoom);
  useStoreUpdater(translateExtent, setTranslateExtent);
  useStoreUpdater(nodeExtent, setNodeExtent);
  return null;
};

var css_248z$1 = ".react-flow{height:100%;overflow:hidden;position:relative;width:100%}.react-flow__container{height:100%;left:0;position:absolute;top:0;width:100%}.react-flow__pane{z-index:1}.react-flow__viewport{pointer-events:none;transform-origin:0 0;z-index:2}.react-flow__renderer{z-index:4}.react-flow__selectionpane{z-index:5}.react-flow__edges{overflow:visible;pointer-events:none}.react-flow__edge{pointer-events:visibleStroke}.react-flow__edge.inactive{pointer-events:none}@-webkit-keyframes dashdraw{0%{stroke-dashoffset:10}}@keyframes dashdraw{0%{stroke-dashoffset:10}}.react-flow__edge-path{fill:none}.react-flow__edge-textwrapper{pointer-events:all}.react-flow__edge-text{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.react-flow__connection{pointer-events:none}.react-flow__connection .animated{stroke-dasharray:5;-webkit-animation:dashdraw .5s linear infinite;animation:dashdraw .5s linear infinite}.react-flow__connection-path{fill:none}.react-flow__nodes{pointer-events:none;transform-origin:0 0}.react-flow__node{box-sizing:border-box;pointer-events:all;position:absolute;transform-origin:0 0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.react-flow__nodesselection{pointer-events:none;transform-origin:left top;z-index:3}.react-flow__nodesselection-rect{cursor:-webkit-grab;cursor:grab;pointer-events:all;position:absolute}.react-flow__handle{pointer-events:none}.react-flow__handle.connectable{pointer-events:all}.react-flow__handle-bottom{bottom:-4px;left:50%;top:auto;transform:translate(-50%)}.react-flow__handle-top{left:50%;top:-4px;transform:translate(-50%)}.react-flow__handle-left{left:-4px;top:50%;transform:translateY(-50%)}.react-flow__handle-right{right:-4px;top:50%;transform:translateY(-50%)}.react-flow__edgeupdater{cursor:move;pointer-events:all}.react-flow__controls{bottom:20px;left:15px;position:absolute;z-index:5}.react-flow__controls-button{border:none;height:24px;width:24px}.react-flow__controls-button svg{width:100%}.react-flow__minimap{bottom:20px;position:absolute;right:15px;z-index:5}.react-flow__attribution{background:hsla(0,0%,100%,.5);color:#999;font-size:10px;padding:2px 3px;position:absolute;z-index:1000}.react-flow__attribution a{color:#555;text-decoration:none}.react-flow__attribution.top{top:0}.react-flow__attribution.bottom{bottom:0}.react-flow__attribution.left{left:0}.react-flow__attribution.right{right:0}.react-flow__attribution.center{left:50%;transform:translateX(-50%)}";

var css_248z = ".react-flow__edge.selected .react-flow__edge-path{stroke:#555}.react-flow__edge.animated path{stroke-dasharray:5;-webkit-animation:dashdraw .5s linear infinite;animation:dashdraw .5s linear infinite}.react-flow__edge.updating .react-flow__edge-path{stroke:#777}.react-flow__edge-path{stroke:#b1b1b7;stroke-width:1}.react-flow__edge-text{font-size:10px}.react-flow__edge-textbg{fill:#fff}.react-flow__connection-path{stroke:#b1b1b7;stroke-width:1}.react-flow__node{cursor:-webkit-grab;cursor:grab}.react-flow__node-default,.react-flow__node-group,.react-flow__node-input,.react-flow__node-output{background:#fff;border:1px solid #1a192b;border-radius:3px;color:#222;font-size:12px;padding:10px;text-align:center;width:150px}.react-flow__node-default.selected,.react-flow__node-default.selected:hover,.react-flow__node-group.selected,.react-flow__node-group.selected:hover,.react-flow__node-input.selected,.react-flow__node-input.selected:hover,.react-flow__node-output.selected,.react-flow__node-output.selected:hover{box-shadow:0 0 0 .5px #1a192b}.react-flow__node-default .react-flow__handle,.react-flow__node-group .react-flow__handle,.react-flow__node-input .react-flow__handle,.react-flow__node-output .react-flow__handle{background:#1a192b}.react-flow__node-default.selectable:hover,.react-flow__node-group.selectable:hover,.react-flow__node-input.selectable:hover,.react-flow__node-output.selectable:hover{box-shadow:0 1px 4px 1px rgba(0,0,0,.08)}.react-flow__node-group{background:hsla(0,0%,94%,.25);border-color:#1a192b}.react-flow__node-group.selected,.react-flow__node-group.selected:hover{box-shadow:0 0 0 .5px #1a192b}.react-flow__nodesselection-rect,.react-flow__selection{background:rgba(0,89,220,.08);border:1px dotted rgba(0,89,220,.8)}.react-flow__handle{background:#555;border:1px solid #fff;border-radius:100%;height:6px;position:absolute;width:6px}.react-flow__handle.connectable{cursor:crosshair}.react-flow__minimap{background-color:#fff}.react-flow__controls{box-shadow:0 0 2px 1px rgba(0,0,0,.08)}.react-flow__controls-button{align-items:center;background:#fefefe;border-bottom:1px solid #eee;box-sizing:content-box;cursor:pointer;display:flex;height:16px;justify-content:center;padding:5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:16px}.react-flow__controls-button svg{max-height:12px;max-width:12px}.react-flow__controls-button:hover{background:#f4f4f4}";

var shiftX = function shiftX(x, shift, position) {
  if (position === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left) return x - shift;
  if (position === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right) return x + shift;
  return x;
};

var shiftY = function shiftY(y, shift, position) {
  if (position === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top) return y - shift;
  if (position === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom) return y + shift;
  return y;
};

var EdgeAnchor = function EdgeAnchor(_ref) {
  var className = _ref.className,
      position = _ref.position,
      centerX = _ref.centerX,
      centerY = _ref.centerY,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? 10 : _ref$radius;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("circle", {
    className: Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__edgeupdater', className]),
    cx: shiftX(centerX, radius, position),
    cy: shiftY(centerY, radius, position),
    r: radius,
    stroke: "transparent",
    fill: "transparent"
  });
};

var selector$a = function selector(s) {
  return {
    addSelectedEdges: s.addSelectedEdges,
    connectionMode: s.connectionMode
  };
};

var wrapEdge = (function (EdgeComponent) {
  var EdgeWrapper = function EdgeWrapper(_ref) {
    var id = _ref.id,
        className = _ref.className,
        type = _ref.type,
        data = _ref.data,
        onClick = _ref.onClick,
        onEdgeDoubleClick = _ref.onEdgeDoubleClick,
        selected = _ref.selected,
        animated = _ref.animated,
        label = _ref.label,
        labelStyle = _ref.labelStyle,
        labelShowBg = _ref.labelShowBg,
        labelBgStyle = _ref.labelBgStyle,
        labelBgPadding = _ref.labelBgPadding,
        labelBgBorderRadius = _ref.labelBgBorderRadius,
        style = _ref.style,
        source = _ref.source,
        target = _ref.target,
        sourceX = _ref.sourceX,
        sourceY = _ref.sourceY,
        targetX = _ref.targetX,
        targetY = _ref.targetY,
        sourcePosition = _ref.sourcePosition,
        targetPosition = _ref.targetPosition,
        elementsSelectable = _ref.elementsSelectable,
        hidden = _ref.hidden,
        sourceHandleId = _ref.sourceHandleId,
        targetHandleId = _ref.targetHandleId,
        onContextMenu = _ref.onContextMenu,
        onMouseEnter = _ref.onMouseEnter,
        onMouseMove = _ref.onMouseMove,
        onMouseLeave = _ref.onMouseLeave,
        edgeUpdaterRadius = _ref.edgeUpdaterRadius,
        onEdgeUpdate = _ref.onEdgeUpdate,
        onEdgeUpdateStart = _ref.onEdgeUpdateStart,
        onEdgeUpdateEnd = _ref.onEdgeUpdateEnd,
        markerEnd = _ref.markerEnd,
        markerStart = _ref.markerStart;
    var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();

    var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$a, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
        addSelectedEdges = _useStore.addSelectedEdges,
        connectionMode = _useStore.connectionMode;

    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
        _useState2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useState, 2),
        updating = _useState2[0],
        setUpdating = _useState2[1];

    var inactive = !elementsSelectable && !onClick;
    var handleEdgeUpdate = typeof onEdgeUpdate !== 'undefined';
    var edgeClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__edge', "react-flow__edge-".concat(type), className, {
      selected: selected,
      animated: animated,
      inactive: inactive,
      updating: updating
    }]);
    var edgeElement = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
      var el = {
        id: id,
        source: source,
        target: target,
        type: type
      };

      if (sourceHandleId) {
        el.sourceHandle = sourceHandleId;
      }

      if (targetHandleId) {
        el.targetHandle = targetHandleId;
      }

      if (typeof data !== 'undefined') {
        el.data = data;
      }

      return el;
    }, [id, source, target, type, sourceHandleId, targetHandleId, data]);
    var onEdgeClick = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      if (elementsSelectable) {
        store.setState({
          nodesSelectionActive: false
        });
        addSelectedEdges([edgeElement.id]);
      }

      onClick === null || onClick === void 0 ? void 0 : onClick(event, edgeElement);
    }, [elementsSelectable, edgeElement, onClick]);
    var onEdgeDoubleClickHandler = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      onEdgeDoubleClick === null || onEdgeDoubleClick === void 0 ? void 0 : onEdgeDoubleClick(event, edgeElement);
    }, [edgeElement, onEdgeDoubleClick]);
    var onEdgeContextMenu = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      onContextMenu === null || onContextMenu === void 0 ? void 0 : onContextMenu(event, edgeElement);
    }, [edgeElement, onContextMenu]);
    var onEdgeMouseEnter = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(event, edgeElement);
    }, [edgeElement, onContextMenu]);
    var onEdgeMouseMove = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      onMouseMove === null || onMouseMove === void 0 ? void 0 : onMouseMove(event, edgeElement);
    }, [edgeElement, onContextMenu]);
    var onEdgeMouseLeave = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(event, edgeElement);
    }, [edgeElement, onContextMenu]);
    var handleEdgeUpdater = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event, isSourceHandle) {
      var nodeId = isSourceHandle ? target : source;
      var handleId = isSourceHandle ? targetHandleId : sourceHandleId;

      var isValidConnection = function isValidConnection() {
        return true;
      };

      var isTarget = isSourceHandle;
      onEdgeUpdateStart === null || onEdgeUpdateStart === void 0 ? void 0 : onEdgeUpdateStart(event, edgeElement);

      var _onEdgeUpdate = onEdgeUpdateEnd ? function (evt) {
        return onEdgeUpdateEnd(evt, edgeElement);
      } : undefined;

      var onConnectEdge = function onConnectEdge(connection) {
        var _store$getState = store.getState(),
            edges = _store$getState.edges;

        var edge = edges.find(function (e) {
          return e.id === id;
        });

        if (edge && onEdgeUpdate) {
          onEdgeUpdate(edge, connection);
        }
      };

      onMouseDown(event, handleId, nodeId, store.setState, onConnectEdge, isTarget, isValidConnection, connectionMode, isSourceHandle ? 'target' : 'source', _onEdgeUpdate, store.getState);
    }, [id, source, target, type, sourceHandleId, targetHandleId, edgeElement, onEdgeUpdate]);
    var onEdgeUpdaterSourceMouseDown = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      handleEdgeUpdater(event, true);
    }, [id, source, sourceHandleId, handleEdgeUpdater]);
    var onEdgeUpdaterTargetMouseDown = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      handleEdgeUpdater(event, false);
    }, [id, target, targetHandleId, handleEdgeUpdater]);
    var onEdgeUpdaterMouseEnter = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
      return setUpdating(true);
    }, [setUpdating]);
    var onEdgeUpdaterMouseOut = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
      return setUpdating(false);
    }, [setUpdating]);
    var markerStartUrl = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
      return "url(#".concat(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["d"])(markerStart), ")");
    }, [markerStart]);
    var markerEndUrl = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
      return "url(#".concat(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["d"])(markerEnd), ")");
    }, [markerEnd]);

    if (hidden) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("g", {
      className: edgeClasses,
      onClick: onEdgeClick,
      onDoubleClick: onEdgeDoubleClickHandler,
      onContextMenu: onEdgeContextMenu,
      onMouseEnter: onEdgeMouseEnter,
      onMouseMove: onEdgeMouseMove,
      onMouseLeave: onEdgeMouseLeave
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(EdgeComponent, {
      id: id,
      source: source,
      target: target,
      selected: selected,
      animated: animated,
      label: label,
      labelStyle: labelStyle,
      labelShowBg: labelShowBg,
      labelBgStyle: labelBgStyle,
      labelBgPadding: labelBgPadding,
      labelBgBorderRadius: labelBgBorderRadius,
      data: data,
      style: style,
      sourceX: sourceX,
      sourceY: sourceY,
      targetX: targetX,
      targetY: targetY,
      sourcePosition: sourcePosition,
      targetPosition: targetPosition,
      sourceHandleId: sourceHandleId,
      targetHandleId: targetHandleId,
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl
    }), handleEdgeUpdate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("g", {
      onMouseDown: onEdgeUpdaterSourceMouseDown,
      onMouseEnter: onEdgeUpdaterMouseEnter,
      onMouseOut: onEdgeUpdaterMouseOut
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(EdgeAnchor, {
      position: sourcePosition,
      centerX: sourceX,
      centerY: sourceY,
      radius: edgeUpdaterRadius
    })), handleEdgeUpdate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("g", {
      onMouseDown: onEdgeUpdaterTargetMouseDown,
      onMouseEnter: onEdgeUpdaterMouseEnter,
      onMouseOut: onEdgeUpdaterMouseOut
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(EdgeAnchor, {
      position: targetPosition,
      centerX: targetX,
      centerY: targetY,
      radius: edgeUpdaterRadius
    })));
  };

  EdgeWrapper.displayName = 'EdgeWrapper';
  return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(EdgeWrapper);
});

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function createEdgeTypes(edgeTypes) {
  var standardTypes = {
    "default": wrapEdge(edgeTypes["default"] || BezierEdge),
    straight: wrapEdge(edgeTypes.bezier || StraightEdge),
    step: wrapEdge(edgeTypes.step || StepEdge),
    smoothstep: wrapEdge(edgeTypes.step || SmoothStepEdge),
    simplebezier: wrapEdge(edgeTypes.simplebezier || SimpleBezierEdge)
  };
  var wrappedTypes = {};
  var specialTypes = Object.keys(edgeTypes).filter(function (k) {
    return !['default', 'bezier'].includes(k);
  }).reduce(function (res, key) {
    res[key] = wrapEdge(edgeTypes[key] || BezierEdge);
    return res;
  }, wrappedTypes);
  return _objectSpread$7(_objectSpread$7({}, standardTypes), specialTypes);
}
function getHandlePosition(position, nodeRect) {
  var handle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var x = ((handle === null || handle === void 0 ? void 0 : handle.x) || 0) + nodeRect.x;
  var y = ((handle === null || handle === void 0 ? void 0 : handle.y) || 0) + nodeRect.y;
  var width = (handle === null || handle === void 0 ? void 0 : handle.width) || nodeRect.width;
  var height = (handle === null || handle === void 0 ? void 0 : handle.height) || nodeRect.height;

  switch (position) {
    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top:
      return {
        x: x + width / 2,
        y: y
      };

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right:
      return {
        x: x + width,
        y: y + height / 2
      };

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom:
      return {
        x: x + width / 2,
        y: y + height
      };

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left:
      return {
        x: x,
        y: y + height / 2
      };
  }
}
function getHandle(bounds, handleId) {
  if (!bounds) {
    return null;
  } // there is no handleId when there are no multiple handles/ handles with ids
  // so we just pick the first one


  var handle = null;

  if (bounds.length === 1 || !handleId) {
    handle = bounds[0];
  } else if (handleId) {
    handle = bounds.find(function (d) {
      return d.id === handleId;
    });
  }

  return typeof handle === 'undefined' ? null : handle;
}
var getEdgePositions = function getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition) {
  var sourceHandlePos = getHandlePosition(sourcePosition, sourceNodeRect, sourceHandle);
  var targetHandlePos = getHandlePosition(targetPosition, targetNodeRect, targetHandle);
  return {
    sourceX: sourceHandlePos.x,
    sourceY: sourceHandlePos.y,
    targetX: targetHandlePos.x,
    targetY: targetHandlePos.y
  };
};
function isEdgeVisible(_ref) {
  var sourcePos = _ref.sourcePos,
      targetPos = _ref.targetPos,
      sourceWidth = _ref.sourceWidth,
      sourceHeight = _ref.sourceHeight,
      targetWidth = _ref.targetWidth,
      targetHeight = _ref.targetHeight,
      width = _ref.width,
      height = _ref.height,
      transform = _ref.transform;
  var edgeBox = {
    x: Math.min(sourcePos.x, targetPos.x),
    y: Math.min(sourcePos.y, targetPos.y),
    x2: Math.max(sourcePos.x + sourceWidth, targetPos.x + targetWidth),
    y2: Math.max(sourcePos.y + sourceHeight, targetPos.y + targetHeight)
  };

  if (edgeBox.x === edgeBox.x2) {
    edgeBox.x2 += 1;
  }

  if (edgeBox.y === edgeBox.y2) {
    edgeBox.y2 += 1;
  }

  var viewBox = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["r"])({
    x: (0 - transform[0]) / transform[2],
    y: (0 - transform[1]) / transform[2],
    width: width / transform[2],
    height: height / transform[2]
  });
  var xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x));
  var yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y));
  var overlappingArea = Math.ceil(xOverlap * yOverlap);
  return overlappingArea > 0;
}
function getNodeData(nodeInternals, nodeId) {
  var _node$positionAbsolut, _node$positionAbsolut2, _node$positionAbsolut3, _node$positionAbsolut4;

  var node = nodeInternals.get(nodeId);
  var handleBounds = node === null || node === void 0 ? void 0 : node.handleBounds;
  var isInvalid = !node || !node.handleBounds || !node.width || !node.height || typeof ((_node$positionAbsolut = node.positionAbsolute) === null || _node$positionAbsolut === void 0 ? void 0 : _node$positionAbsolut.x) === 'undefined' || typeof ((_node$positionAbsolut2 = node.positionAbsolute) === null || _node$positionAbsolut2 === void 0 ? void 0 : _node$positionAbsolut2.y) === 'undefined';
  return [{
    x: (node === null || node === void 0 ? void 0 : (_node$positionAbsolut3 = node.positionAbsolute) === null || _node$positionAbsolut3 === void 0 ? void 0 : _node$positionAbsolut3.x) || 0,
    y: (node === null || node === void 0 ? void 0 : (_node$positionAbsolut4 = node.positionAbsolute) === null || _node$positionAbsolut4 === void 0 ? void 0 : _node$positionAbsolut4.y) || 0,
    width: (node === null || node === void 0 ? void 0 : node.width) || 0,
    height: (node === null || node === void 0 ? void 0 : node.height) || 0
  }, handleBounds || null, !isInvalid];
}

var doc = typeof document !== 'undefined' ? document : null; // the keycode can be a string 'a' or an array of strings ['a', 'a+d']
// a string means a single key 'a' or a combination when '+' is used 'a+d'
// an array means different possibilites. Explainer: ['a', 'd+s'] here the
// user can use the single key 'a' or the combination 'd' + 's'

var useKeyPress = (function () {
  var keyCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    target: doc
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useState, 2),
      keyPressed = _useState2[0],
      setKeyPressed = _useState2[1]; // we need to remember the pressed keys in order to support combinations


  var pressedKeys = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(new Set([])); // keyCodes = array with single keys [['a']] or key combinations [['a', 's']]
  // keysToWatch = array with all keys flattened ['a', 'd', 'ShiftLeft']
  // used to check if we store event.code or event.key. When the code is in the list of keysToWatch
  // we use the code otherwise the key. Explainer: When you press the left "command" key, the code is "MetaLeft"
  // and the key is "Meta". We want users to be able to pass keys and codes so we assume that the key is meant when
  // we can't find it in the list of keysToWatch.

  var _useMemo = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    if (keyCode !== null) {
      var keyCodeArr = Array.isArray(keyCode) ? keyCode : [keyCode];
      var keys = keyCodeArr.filter(function (kc) {
        return typeof kc === 'string';
      }).map(function (kc) {
        return kc.split('+');
      });
      var keysFlat = keys.reduce(function (res, item) {
        return res.concat.apply(res, Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["_"])(item));
      }, []);
      return [keys, keysFlat];
    }

    return [[], []];
  }, [keyCode]),
      _useMemo2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useMemo, 2),
      keyCodes = _useMemo2[0],
      keysToWatch = _useMemo2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (keyCode !== null) {
      var _options$target, _options$target2;

      var downHandler = function downHandler(event) {
        var keyOrCode = useKeyOrCode(event.code, keysToWatch);
        pressedKeys.current.add(event[keyOrCode]);

        if (isMatchingKey(event, keyCodes, pressedKeys.current)) {
          event.preventDefault();
          setKeyPressed(true);
        }
      };

      var upHandler = function upHandler(event) {
        var keyOrCode = useKeyOrCode(event.code, keysToWatch);

        if (isMatchingKey(event, keyCodes, pressedKeys.current)) {
          setKeyPressed(false);
        }

        pressedKeys.current["delete"](event[keyOrCode]);
      };

      var resetHandler = function resetHandler() {
        pressedKeys.current.clear();
        setKeyPressed(false);
      };

      options === null || options === void 0 ? void 0 : (_options$target = options.target) === null || _options$target === void 0 ? void 0 : _options$target.addEventListener('keydown', downHandler);
      options === null || options === void 0 ? void 0 : (_options$target2 = options.target) === null || _options$target2 === void 0 ? void 0 : _options$target2.addEventListener('keyup', upHandler);
      window.addEventListener('blur', resetHandler);
      return function () {
        var _options$target3, _options$target4;

        pressedKeys.current.clear();
        options === null || options === void 0 ? void 0 : (_options$target3 = options.target) === null || _options$target3 === void 0 ? void 0 : _options$target3.removeEventListener('keydown', downHandler);
        options === null || options === void 0 ? void 0 : (_options$target4 = options.target) === null || _options$target4 === void 0 ? void 0 : _options$target4.removeEventListener('keyup', upHandler);
        window.removeEventListener('blur', resetHandler);
      };
    }
  }, [keyCode, setKeyPressed]);
  return keyPressed;
}); // utils

function isMatchingKey(event, keyCodes, pressedKeys) {
  if (isInputDOMNode(event)) {
    return false;
  }

  return keyCodes // we only want to compare same sizes of keyCode definitions
  // and pressed keys. When the user specified 'Meta' as a key somewhere
  // this would also be truthy without this filter when user presses 'Meta' + 'r'
  .filter(function (keys) {
    return keys.length === pressedKeys.size;
  }) // since we want to support multiple possibilities only one of the
  // combinations need to be part of the pressed keys
  .some(function (keys) {
    return keys.every(function (k) {
      return pressedKeys.has(k);
    });
  });
}

function useKeyOrCode(eventCode, keysToWatch) {
  return keysToWatch.includes(eventCode) ? 'code' : 'key';
}

function isInputDOMNode(e) {
  var target = e === null || e === void 0 ? void 0 : e.target;
  return ['INPUT', 'SELECT', 'TEXTAREA'].includes(target === null || target === void 0 ? void 0 : target.nodeName) || (target === null || target === void 0 ? void 0 : target.hasAttribute('contenteditable'));
}

var selector$9 = function selector(s) {
  return {
    resetSelectedElements: s.resetSelectedElements,
    onNodesChange: s.onNodesChange,
    onEdgesChange: s.onEdgesChange
  };
};

var useGlobalKeyHandler = (function (_ref) {
  var deleteKeyCode = _ref.deleteKeyCode,
      multiSelectionKeyCode = _ref.multiSelectionKeyCode;
  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$9, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      resetSelectedElements = _useStore.resetSelectedElements,
      onNodesChange = _useStore.onNodesChange,
      onEdgesChange = _useStore.onEdgesChange;

  var deleteKeyPressed = useKeyPress(deleteKeyCode);
  var multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var _store$getState = store.getState(),
        nodeInternals = _store$getState.nodeInternals,
        edges = _store$getState.edges,
        hasDefaultNodes = _store$getState.hasDefaultNodes,
        hasDefaultEdges = _store$getState.hasDefaultEdges,
        onNodesDelete = _store$getState.onNodesDelete,
        onEdgesDelete = _store$getState.onEdgesDelete;

    var nodes = Array.from(nodeInternals.values());
    var nodesToRemove = nodes.reduce(function (res, node) {
      if (!node.selected && node.parentNode && res.find(function (n) {
        return n.id === node.parentNode;
      })) {
        res.push(node);
      } else if (node.selected) {
        res.push(node);
      }

      return res;
    }, []);
    var selectedEdges = edges.filter(function (e) {
      return e.selected;
    });

    if (deleteKeyPressed && (nodesToRemove || selectedEdges)) {
      var connectedEdges = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["e"])(nodesToRemove, edges);
      var edgesToRemove = [].concat(Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["_"])(selectedEdges), Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["_"])(connectedEdges));
      var edgeIdsToRemove = edgesToRemove.map(function (e) {
        return e.id;
      });

      if (hasDefaultEdges || hasDefaultNodes) {
        if (hasDefaultEdges) {
          store.setState({
            edges: edges.filter(function (e) {
              return !edgeIdsToRemove.includes(e.id);
            })
          });
        }

        if (hasDefaultNodes) {
          nodesToRemove.forEach(function (node) {
            nodeInternals["delete"](node.id);
          });
          store.setState({
            nodeInternals: new Map(nodeInternals)
          });
        }
      }

      if (edgeIdsToRemove.length > 0) {
        onEdgesDelete === null || onEdgesDelete === void 0 ? void 0 : onEdgesDelete(edgesToRemove);

        if (onEdgesChange) {
          var edgeChanges = edgeIdsToRemove.map(function (id) {
            return {
              id: id,
              type: 'remove'
            };
          });
          onEdgesChange(edgeChanges);
        }
      }

      if (nodesToRemove.length > 0) {
        onNodesDelete === null || onNodesDelete === void 0 ? void 0 : onNodesDelete(nodesToRemove);

        if (onNodesChange) {
          var nodeChanges = nodesToRemove.map(function (n) {
            return {
              id: n.id,
              type: 'remove'
            };
          });
          onNodesChange(nodeChanges);
        }
      }

      store.setState({
        nodesSelectionActive: false
      });
      resetSelectedElements();
    }
  }, [deleteKeyPressed, onNodesChange, onEdgesChange]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    store.setState({
      multiSelectionActive: multiSelectionKeyPressed
    });
  }, [multiSelectionKeyPressed]);
});

function useResizeHandler(rendererNode) {
  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var resizeObserver;

    var updateDimensions = function updateDimensions() {
      if (!rendererNode.current) {
        return;
      }

      var size = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["f"])(rendererNode.current);

      if (size.height === 0 || size.width === 0) {
        console.warn('The React Flow parent container needs a width and a height to render the graph.');
      }

      store.setState({
        width: size.width || 500,
        height: size.height || 500
      });
    };

    updateDimensions();
    window.onresize = updateDimensions;

    if (rendererNode.current) {
      resizeObserver = new ResizeObserver(function () {
        return updateDimensions();
      });
      resizeObserver.observe(rendererNode.current);
    }

    return function () {
      window.onresize = null;

      if (resizeObserver && rendererNode.current) {
        resizeObserver.unobserve(rendererNode.current);
      }
    };
  }, []);
}

var viewChanged = function viewChanged(prevViewport, eventViewport) {
  return prevViewport.x !== eventViewport.x || prevViewport.y !== eventViewport.y || prevViewport.zoom !== eventViewport.k;
};

var eventToFlowTransform = function eventToFlowTransform(eventViewport) {
  return {
    x: eventViewport.x,
    y: eventViewport.y,
    zoom: eventViewport.k
  };
};

var isWrappedWithClass = function isWrappedWithClass(event, className) {
  return event.target.closest(".".concat(className));
};

var selector$8 = function selector(s) {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection,
    d3ZoomHandler: s.d3ZoomHandler
  };
};

var ZoomPane = function ZoomPane(_ref) {
  var onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      _ref$zoomOnScroll = _ref.zoomOnScroll,
      zoomOnScroll = _ref$zoomOnScroll === void 0 ? true : _ref$zoomOnScroll,
      _ref$zoomOnPinch = _ref.zoomOnPinch,
      zoomOnPinch = _ref$zoomOnPinch === void 0 ? true : _ref$zoomOnPinch,
      _ref$panOnScroll = _ref.panOnScroll,
      panOnScroll = _ref$panOnScroll === void 0 ? false : _ref$panOnScroll,
      _ref$panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollSpeed = _ref$panOnScrollSpeed === void 0 ? 0.5 : _ref$panOnScrollSpeed,
      _ref$panOnScrollMode = _ref.panOnScrollMode,
      panOnScrollMode = _ref$panOnScrollMode === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["h"].Free : _ref$panOnScrollMode,
      _ref$zoomOnDoubleClic = _ref.zoomOnDoubleClick,
      zoomOnDoubleClick = _ref$zoomOnDoubleClic === void 0 ? true : _ref$zoomOnDoubleClic,
      selectionKeyPressed = _ref.selectionKeyPressed,
      elementsSelectable = _ref.elementsSelectable,
      _ref$panOnDrag = _ref.panOnDrag,
      panOnDrag = _ref$panOnDrag === void 0 ? true : _ref$panOnDrag,
      _ref$defaultPosition = _ref.defaultPosition,
      defaultPosition = _ref$defaultPosition === void 0 ? [0, 0] : _ref$defaultPosition,
      _ref$defaultZoom = _ref.defaultZoom,
      defaultZoom = _ref$defaultZoom === void 0 ? 1 : _ref$defaultZoom,
      zoomActivationKeyCode = _ref.zoomActivationKeyCode,
      _ref$preventScrolling = _ref.preventScrolling,
      preventScrolling = _ref$preventScrolling === void 0 ? true : _ref$preventScrolling,
      children = _ref.children,
      noWheelClassName = _ref.noWheelClassName,
      noPanClassName = _ref.noPanClassName;
  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();
  var zoomPane = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var prevTransform = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])({
    x: 0,
    y: 0,
    zoom: 0
  });

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$8, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      d3Zoom = _useStore.d3Zoom,
      d3Selection = _useStore.d3Selection,
      d3ZoomHandler = _useStore.d3ZoomHandler;

  var zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
  useResizeHandler(zoomPane);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (zoomPane.current) {
      var _store$getState = store.getState(),
          minZoom = _store$getState.minZoom,
          maxZoom = _store$getState.maxZoom,
          translateExtent = _store$getState.translateExtent;

      var d3ZoomInstance = Object(d3_zoom__WEBPACK_IMPORTED_MODULE_5__["zoom"])().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent);
      var selection = Object(d3_selection__WEBPACK_IMPORTED_MODULE_6__["select"])(zoomPane.current).call(d3ZoomInstance);
      var clampedX = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["i"])(defaultPosition[0], translateExtent[0][0], translateExtent[1][0]);
      var clampedY = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["i"])(defaultPosition[1], translateExtent[0][1], translateExtent[1][1]);
      var clampedZoom = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["i"])(defaultZoom, minZoom, maxZoom);
      var updatedTransform = d3_zoom__WEBPACK_IMPORTED_MODULE_5__["zoomIdentity"].translate(clampedX, clampedY).scale(clampedZoom);
      d3ZoomInstance.transform(selection, updatedTransform);
      store.setState({
        d3Zoom: d3ZoomInstance,
        d3Selection: selection,
        d3ZoomHandler: selection.on('wheel.zoom'),
        // we need to pass transform because zoom handler is not registered when we set the initial transform
        transform: [clampedX, clampedY, clampedZoom]
      });
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (d3Selection && d3Zoom) {
      if (panOnScroll && !zoomActivationKeyPressed) {
        d3Selection.on('wheel', function (event) {
          if (isWrappedWithClass(event, noWheelClassName)) {
            return false;
          }

          event.preventDefault();
          event.stopImmediatePropagation();
          var currentZoom = d3Selection.property('__zoom').k || 1;

          if (event.ctrlKey && zoomOnPinch) {
            var point = Object(d3_selection__WEBPACK_IMPORTED_MODULE_6__["pointer"])(event); // taken from https://github.com/d3/d3-zoom/blob/master/src/zoom.js

            var pinchDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * 10;

            var _zoom = currentZoom * Math.pow(2, pinchDelta);

            d3Zoom.scaleTo(d3Selection, _zoom, point);
            return;
          } // increase scroll speed in firefox
          // firefox: deltaMode === 1; chrome: deltaMode === 0


          var deltaNormalize = event.deltaMode === 1 ? 20 : 1;
          var deltaX = panOnScrollMode === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["h"].Vertical ? 0 : event.deltaX * deltaNormalize;
          var deltaY = panOnScrollMode === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["h"].Horizontal ? 0 : event.deltaY * deltaNormalize;
          d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed);
        }).on('wheel.zoom', null);
      } else if (typeof d3ZoomHandler !== 'undefined') {
        d3Selection.on('wheel', function (event) {
          if (!preventScrolling || isWrappedWithClass(event, noWheelClassName)) {
            return null;
          }

          event.preventDefault();
        }).on('wheel.zoom', d3ZoomHandler);
      }
    }
  }, [panOnScroll, panOnScrollMode, d3Selection, d3Zoom, d3ZoomHandler, zoomActivationKeyPressed, zoomOnPinch, preventScrolling, noWheelClassName]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (d3Zoom) {
      if (selectionKeyPressed) {
        d3Zoom.on('zoom', null);
      } else {
        d3Zoom.on('zoom', function (event) {
          store.setState({
            transform: [event.transform.x, event.transform.y, event.transform.k]
          });

          if (onMove) {
            var flowTransform = eventToFlowTransform(event.transform);
            onMove(event.sourceEvent, flowTransform);
          }
        });
      }
    }
  }, [selectionKeyPressed, d3Zoom, onMove]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (d3Zoom) {
      if (onMoveStart) {
        d3Zoom.on('start', function (event) {
          var flowTransform = eventToFlowTransform(event.transform);
          prevTransform.current = flowTransform;
          onMoveStart(event.sourceEvent, flowTransform);
        });
      } else {
        d3Zoom.on('start', null);
      }
    }
  }, [d3Zoom, onMoveStart]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (d3Zoom) {
      if (onMoveEnd) {
        d3Zoom.on('end', function (event) {
          if (viewChanged(prevTransform.current, event.transform)) {
            var flowTransform = eventToFlowTransform(event.transform);
            prevTransform.current = flowTransform;
            onMoveEnd(event.sourceEvent, flowTransform);
          }
        });
      } else {
        d3Zoom.on('end', null);
      }
    }
  }, [d3Zoom, onMoveEnd]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (d3Zoom) {
      d3Zoom.filter(function (event) {
        var zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
        var pinchZoom = zoomOnPinch && event.ctrlKey; // if all interactions are disabled, we prevent all zoom events

        if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) {
          return false;
        } // during a selection we prevent all other interactions


        if (selectionKeyPressed) {
          return false;
        } // if zoom on double click is disabled, we prevent the double click event


        if (!zoomOnDoubleClick && event.type === 'dblclick') {
          return false;
        } // if the target element is inside an element with the nowheel class, we prevent zooming


        if (isWrappedWithClass(event, noWheelClassName) && event.type === 'wheel') {
          return false;
        } // if the target element is inside an element with the nopan class, we prevent panning


        if (isWrappedWithClass(event, noPanClassName) && event.type !== 'wheel') {
          return false;
        }

        if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') {
          return false;
        } // when there is no scroll handling enabled, we prevent all wheel events


        if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') {
          return false;
        } // if the pane is not movable, we prevent dragging it with mousestart or touchstart


        if (!panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) {
          return false;
        } // default filter for d3-zoom


        return (!event.ctrlKey || event.type === 'wheel') && !event.button;
      });
    }
  }, [d3Zoom, zoomOnScroll, zoomOnPinch, panOnScroll, zoomOnDoubleClick, panOnDrag, selectionKeyPressed, elementsSelectable, zoomActivationKeyPressed]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "react-flow__renderer react-flow__container",
    ref: zoomPane
  }, children);
};

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getMousePosition(event, containerBounds) {
  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top
  };
}

var selector$7 = function selector(s) {
  return {
    userSelectionActive: s.userSelectionActive,
    elementsSelectable: s.elementsSelectable
  };
};

var initialRect = {
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  draw: false
};
var UserSelection = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(function (_ref) {
  var selectionKeyPressed = _ref.selectionKeyPressed;
  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();
  var prevSelectedNodesCount = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(0);
  var prevSelectedEdgesCount = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(0);
  var containerBounds = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(initialRect),
      _useState2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useState, 2),
      userSelectionRect = _useState2[0],
      setUserSelectionRect = _useState2[1];

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$7, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      userSelectionActive = _useStore.userSelectionActive,
      elementsSelectable = _useStore.elementsSelectable;

  var renderUserSelectionPane = userSelectionActive || selectionKeyPressed;
  var resetUserSelection = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
    setUserSelectionRect(initialRect);
    store.setState({
      userSelectionActive: false
    });
    prevSelectedNodesCount.current = 0;
    prevSelectedEdgesCount.current = 0;
  }, []);
  var onMouseDown = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    var reactFlowNode = event.target.closest('.react-flow');
    containerBounds.current = reactFlowNode.getBoundingClientRect();
    var mousePos = getMousePosition(event, containerBounds.current);
    setUserSelectionRect({
      width: 0,
      height: 0,
      startX: mousePos.x,
      startY: mousePos.y,
      x: mousePos.x,
      y: mousePos.y,
      draw: true
    });
    store.setState({
      userSelectionActive: true,
      nodesSelectionActive: false
    });
  }, []);

  var onMouseMove = function onMouseMove(event) {
    var _userSelectionRect$st, _userSelectionRect$st2;

    if (!selectionKeyPressed || !userSelectionRect.draw || !containerBounds.current) {
      return;
    }

    var mousePos = getMousePosition(event, containerBounds.current);
    var startX = (_userSelectionRect$st = userSelectionRect.startX) !== null && _userSelectionRect$st !== void 0 ? _userSelectionRect$st : 0;
    var startY = (_userSelectionRect$st2 = userSelectionRect.startY) !== null && _userSelectionRect$st2 !== void 0 ? _userSelectionRect$st2 : 0;

    var nextUserSelectRect = _objectSpread$6(_objectSpread$6({}, userSelectionRect), {}, {
      x: mousePos.x < startX ? mousePos.x : startX,
      y: mousePos.y < startY ? mousePos.y : startY,
      width: Math.abs(mousePos.x - startX),
      height: Math.abs(mousePos.y - startY)
    });

    var _store$getState = store.getState(),
        nodeInternals = _store$getState.nodeInternals,
        edges = _store$getState.edges,
        transform = _store$getState.transform,
        onNodesChange = _store$getState.onNodesChange,
        onEdgesChange = _store$getState.onEdgesChange;

    var nodes = Array.from(nodeInternals).map(function (_ref2) {
      var _ref3 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref2, 2);
          _ref3[0];
          var node = _ref3[1];

      return node;
    });
    var selectedNodes = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["j"])(nodeInternals, nextUserSelectRect, transform, false, true);
    var selectedEdgeIds = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["e"])(selectedNodes, edges).map(function (e) {
      return e.id;
    });
    var selectedNodeIds = selectedNodes.map(function (n) {
      return n.id;
    });

    if (prevSelectedNodesCount.current !== selectedNodeIds.length) {
      prevSelectedNodesCount.current = selectedNodeIds.length;
      var changes = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["k"])(nodes, selectedNodeIds);

      if (changes.length) {
        onNodesChange === null || onNodesChange === void 0 ? void 0 : onNodesChange(changes);
      }
    }

    if (prevSelectedEdgesCount.current !== selectedEdgeIds.length) {
      prevSelectedEdgesCount.current = selectedEdgeIds.length;

      var _changes = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["k"])(edges, selectedEdgeIds);

      if (_changes.length) {
        onEdgesChange === null || onEdgesChange === void 0 ? void 0 : onEdgesChange(_changes);
      }
    }

    setUserSelectionRect(nextUserSelectRect);
  };

  var onMouseUp = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
    store.setState({
      nodesSelectionActive: prevSelectedNodesCount.current > 0
    });
    resetUserSelection();
  }, []);
  var onMouseLeave = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function () {
    store.setState({
      nodesSelectionActive: false
    });
    resetUserSelection();
  }, []);

  if (!elementsSelectable || !renderUserSelectionPane) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "react-flow__selectionpane react-flow__container",
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    onMouseLeave: onMouseLeave
  }, userSelectionRect.draw && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "react-flow__selection react-flow__container",
    style: {
      width: userSelectionRect.width,
      height: userSelectionRect.height,
      transform: "translate(".concat(userSelectionRect.x, "px, ").concat(userSelectionRect.y, "px)")
    }
  }));
});

var selector$6 = function selector(s) {
  return {
    transform: s.transform,
    selectedNodesBbox: s.selectedNodesBbox,
    userSelectionActive: s.userSelectionActive,
    selectedNodes: Array.from(s.nodeInternals).filter(function (_ref) {
      var _ref2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref, 2);
          _ref2[0];
          var n = _ref2[1];

      return n.selected;
    }).map(function (_ref3) {
      var _ref4 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref3, 2);
          _ref4[0];
          var n = _ref4[1];

      return n;
    }),
    snapToGrid: s.snapToGrid,
    snapGrid: s.snapGrid,
    updateNodePosition: s.updateNodePosition
  };
};

function NodesSelection(_ref5) {
  var onSelectionDragStart = _ref5.onSelectionDragStart,
      onSelectionDrag = _ref5.onSelectionDrag,
      onSelectionDragStop = _ref5.onSelectionDragStop,
      onSelectionContextMenu = _ref5.onSelectionContextMenu,
      noPanClassName = _ref5.noPanClassName;

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$6, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      transform = _useStore.transform,
      userSelectionActive = _useStore.userSelectionActive,
      selectedNodes = _useStore.selectedNodes,
      snapToGrid = _useStore.snapToGrid,
      snapGrid = _useStore.snapGrid,
      updateNodePosition = _useStore.updateNodePosition;

  var _transform = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(transform, 3),
      tX = _transform[0],
      tY = _transform[1],
      tScale = _transform[2];

  var nodeRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var grid = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return snapToGrid ? snapGrid : [1, 1];
  }, [snapToGrid, snapGrid]);
  var style = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      transform: "translate(".concat(tX, "px,").concat(tY, "px) scale(").concat(tScale, ")")
    };
  }, [tX, tY, tScale]);
  var selectedNodesBbox = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["l"])(selectedNodes);
  }, [selectedNodes]);
  var innerStyle = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      width: selectedNodesBbox.width,
      height: selectedNodesBbox.height,
      top: selectedNodesBbox.y,
      left: selectedNodesBbox.x
    };
  }, [selectedNodesBbox]);

  var _onStart = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    onSelectionDragStart === null || onSelectionDragStart === void 0 ? void 0 : onSelectionDragStart(event, selectedNodes);
  }, [onSelectionDragStart, selectedNodes]);

  var _onDrag = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event, data) {
    updateNodePosition({
      diff: {
        x: data.deltaX,
        y: data.deltaY
      },
      dragging: true
    });
    onSelectionDrag === null || onSelectionDrag === void 0 ? void 0 : onSelectionDrag(event, selectedNodes);
  }, [onSelectionDrag, selectedNodes, updateNodePosition]);

  var _onStop = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    updateNodePosition({
      dragging: false
    });
    onSelectionDragStop === null || onSelectionDragStop === void 0 ? void 0 : onSelectionDragStop(event, selectedNodes);
  }, [selectedNodes, onSelectionDragStop]);

  var onContextMenu = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    onSelectionContextMenu === null || onSelectionContextMenu === void 0 ? void 0 : onSelectionContextMenu(event, selectedNodes);
  }, [onSelectionContextMenu, selectedNodes]);

  if (!(selectedNodes !== null && selectedNodes !== void 0 && selectedNodes.length) || userSelectionActive) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__nodesselection', 'react-flow__container', noPanClassName]),
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_draggable__WEBPACK_IMPORTED_MODULE_7__["DraggableCore"], {
    scale: tScale,
    grid: grid,
    onStart: function onStart(event) {
      return _onStart(event);
    },
    onDrag: function onDrag(event, data) {
      return _onDrag(event, data);
    },
    onStop: function onStop(event) {
      return _onStop(event);
    },
    nodeRef: nodeRef,
    enableUserSelectHack: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    ref: nodeRef,
    className: "react-flow__nodesselection-rect",
    onContextMenu: onContextMenu,
    style: innerStyle
  })));
}

var NodesSelection$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(NodesSelection);

var selector$5 = function selector(s) {
  return {
    resetSelectedElements: s.resetSelectedElements,
    nodesSelectionActive: s.nodesSelectionActive
  };
};

var FlowRenderer = function FlowRenderer(_ref) {
  var children = _ref.children,
      onPaneClick = _ref.onPaneClick,
      onPaneContextMenu = _ref.onPaneContextMenu,
      onPaneScroll = _ref.onPaneScroll,
      deleteKeyCode = _ref.deleteKeyCode,
      onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      selectionKeyCode = _ref.selectionKeyCode,
      multiSelectionKeyCode = _ref.multiSelectionKeyCode,
      zoomActivationKeyCode = _ref.zoomActivationKeyCode,
      elementsSelectable = _ref.elementsSelectable,
      zoomOnScroll = _ref.zoomOnScroll,
      zoomOnPinch = _ref.zoomOnPinch,
      panOnScroll = _ref.panOnScroll,
      panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollMode = _ref.panOnScrollMode,
      zoomOnDoubleClick = _ref.zoomOnDoubleClick,
      panOnDrag = _ref.panOnDrag,
      defaultPosition = _ref.defaultPosition,
      defaultZoom = _ref.defaultZoom,
      preventScrolling = _ref.preventScrolling,
      onSelectionDragStart = _ref.onSelectionDragStart,
      onSelectionDrag = _ref.onSelectionDrag,
      onSelectionDragStop = _ref.onSelectionDragStop,
      onSelectionContextMenu = _ref.onSelectionContextMenu,
      noWheelClassName = _ref.noWheelClassName,
      noPanClassName = _ref.noPanClassName;
  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$5, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      resetSelectedElements = _useStore.resetSelectedElements,
      nodesSelectionActive = _useStore.nodesSelectionActive;

  var selectionKeyPressed = useKeyPress(selectionKeyCode);
  useGlobalKeyHandler({
    deleteKeyCode: deleteKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode
  });
  var onClick = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    onPaneClick === null || onPaneClick === void 0 ? void 0 : onPaneClick(event);
    resetSelectedElements();
    store.setState({
      nodesSelectionActive: false
    });
  }, [onPaneClick]);
  var onContextMenu = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    return onPaneContextMenu === null || onPaneContextMenu === void 0 ? void 0 : onPaneContextMenu(event);
  }, [onPaneContextMenu]);
  var onWheel = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    return onPaneScroll === null || onPaneScroll === void 0 ? void 0 : onPaneScroll(event);
  }, [onPaneScroll]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ZoomPane, {
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    selectionKeyPressed: selectionKeyPressed,
    elementsSelectable: elementsSelectable,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnDrag: panOnDrag,
    defaultPosition: defaultPosition,
    defaultZoom: defaultZoom,
    zoomActivationKeyCode: zoomActivationKeyCode,
    preventScrolling: preventScrolling,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName
  }, children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(UserSelection, {
    selectionKeyPressed: selectionKeyPressed
  }), nodesSelectionActive && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(NodesSelection$1, {
    onSelectionDragStart: onSelectionDragStart,
    onSelectionDrag: onSelectionDrag,
    onSelectionDragStop: onSelectionDragStop,
    onSelectionContextMenu: onSelectionContextMenu,
    noPanClassName: noPanClassName
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "react-flow__pane react-flow__container",
    onClick: onClick,
    onContextMenu: onContextMenu,
    onWheel: onWheel
  }));
};

FlowRenderer.displayName = 'FlowRenderer';
var FlowRenderer$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(FlowRenderer);

function useVisibleNodes(onlyRenderVisible) {
  var nodes = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (s) {
    return onlyRenderVisible ? Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["j"])(s.nodeInternals, {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }, s.transform, true) : Array.from(s.nodeInternals).map(function (_ref) {
      var _ref2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref, 2);
          _ref2[0];
          var node = _ref2[1];

      return node;
    });
  }, [onlyRenderVisible]));
  return nodes;
}

var selector$4 = function selector(s) {
  return {
    scale: s.transform[2],
    nodesDraggable: s.nodesDraggable,
    nodesConnectable: s.nodesConnectable,
    elementsSelectable: s.elementsSelectable,
    updateNodeDimensions: s.updateNodeDimensions,
    snapGrid: s.snapGrid,
    snapToGrid: s.snapToGrid,
    nodeInternals: s.nodeInternals
  };
};

var NodeRenderer = function NodeRenderer(props) {
  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$4, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      scale = _useStore.scale,
      nodesDraggable = _useStore.nodesDraggable,
      nodesConnectable = _useStore.nodesConnectable,
      elementsSelectable = _useStore.elementsSelectable,
      updateNodeDimensions = _useStore.updateNodeDimensions,
      snapGrid = _useStore.snapGrid,
      snapToGrid = _useStore.snapToGrid;

  var nodes = useVisibleNodes(props.onlyRenderVisibleElements);
  var resizeObserverRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();
  var resizeObserver = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    if (typeof ResizeObserver === 'undefined') {
      return null;
    }

    var observer = new ResizeObserver(function (entries) {
      var updates = entries.map(function (entry) {
        return {
          id: entry.target.getAttribute('data-id'),
          nodeElement: entry.target,
          forceUpdate: true
        };
      });
      updateNodeDimensions(updates);
    });
    resizeObserverRef.current = observer;
    return observer;
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    return function () {
      var _resizeObserverRef$cu;

      resizeObserverRef === null || resizeObserverRef === void 0 ? void 0 : (_resizeObserverRef$cu = resizeObserverRef.current) === null || _resizeObserverRef$cu === void 0 ? void 0 : _resizeObserverRef$cu.disconnect();
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "react-flow__nodes react-flow__container"
  }, nodes.map(function (node) {
    var _node$positionAbsolut, _node$positionAbsolut2, _node$positionAbsolut3, _node$positionAbsolut4, _node$z;

    var nodeType = node.type || 'default';

    if (!props.nodeTypes[nodeType]) {
      console.warn("Node type \"".concat(nodeType, "\" not found. Using fallback type \"default\"."));
    }

    var NodeComponent = props.nodeTypes[nodeType] || props.nodeTypes["default"];
    var isDraggable = !!(node.draggable || nodesDraggable && typeof node.draggable === 'undefined');
    var isSelectable = !!(node.selectable || elementsSelectable && typeof node.selectable === 'undefined');
    var isConnectable = !!(node.connectable || nodesConnectable && typeof node.connectable === 'undefined');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(NodeComponent, {
      key: node.id,
      id: node.id,
      className: node.className,
      style: node.style,
      type: nodeType,
      data: node.data,
      sourcePosition: node.sourcePosition || _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom,
      targetPosition: node.targetPosition || _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top,
      hidden: node.hidden,
      xPos: (_node$positionAbsolut = (_node$positionAbsolut2 = node.positionAbsolute) === null || _node$positionAbsolut2 === void 0 ? void 0 : _node$positionAbsolut2.x) !== null && _node$positionAbsolut !== void 0 ? _node$positionAbsolut : 0,
      yPos: (_node$positionAbsolut3 = (_node$positionAbsolut4 = node.positionAbsolute) === null || _node$positionAbsolut4 === void 0 ? void 0 : _node$positionAbsolut4.y) !== null && _node$positionAbsolut3 !== void 0 ? _node$positionAbsolut3 : 0,
      dragging: !!node.dragging,
      snapGrid: snapGrid,
      snapToGrid: snapToGrid,
      selectNodesOnDrag: props.selectNodesOnDrag,
      onClick: props.onNodeClick,
      onMouseEnter: props.onNodeMouseEnter,
      onMouseMove: props.onNodeMouseMove,
      onMouseLeave: props.onNodeMouseLeave,
      onContextMenu: props.onNodeContextMenu,
      onNodeDoubleClick: props.onNodeDoubleClick,
      onNodeDragStart: props.onNodeDragStart,
      onNodeDrag: props.onNodeDrag,
      onNodeDragStop: props.onNodeDragStop,
      scale: scale,
      selected: !!node.selected,
      isDraggable: isDraggable,
      isSelectable: isSelectable,
      isConnectable: isConnectable,
      resizeObserver: resizeObserver,
      dragHandle: node.dragHandle,
      zIndex: (_node$z = node.z) !== null && _node$z !== void 0 ? _node$z : 0,
      isParent: !!node.isParent,
      noDragClassName: props.noDragClassName,
      noPanClassName: props.noPanClassName
    });
  }));
};

NodeRenderer.displayName = 'NodeRenderer';
var NodeRenderer$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(NodeRenderer);

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var selector$3 = function selector(s) {
  return {
    nodeInternals: s.nodeInternals,
    transform: s.transform
  };
};

var ConnectionLine = (function (_ref) {
  var _fromNode$current$han, _fromNode$current$han2, _fromNode$current$wid, _fromNode$current, _fromNode$current$hei, _fromNode$current2, _fromNode$current$pos, _fromNode$current$pos2;

  var connectionNodeId = _ref.connectionNodeId,
      connectionHandleId = _ref.connectionHandleId,
      connectionHandleType = _ref.connectionHandleType,
      connectionLineStyle = _ref.connectionLineStyle,
      connectionPositionX = _ref.connectionPositionX,
      connectionPositionY = _ref.connectionPositionY,
      _ref$connectionLineTy = _ref.connectionLineType,
      connectionLineType = _ref$connectionLineTy === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["m"].Bezier : _ref$connectionLineTy,
      isConnectable = _ref.isConnectable,
      CustomConnectionLineComponent = _ref.CustomConnectionLineComponent;
  var nodeId = connectionNodeId;
  var handleId = connectionHandleId;

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$3, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      nodeInternals = _useStore.nodeInternals,
      transform = _useStore.transform;

  var fromNode = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(nodeInternals.get(nodeId));

  if (!fromNode.current || !fromNode.current || !isConnectable || !((_fromNode$current$han = fromNode.current.handleBounds) !== null && _fromNode$current$han !== void 0 && _fromNode$current$han[connectionHandleType])) {
    return null;
  }

  var handleBound = (_fromNode$current$han2 = fromNode.current.handleBounds) === null || _fromNode$current$han2 === void 0 ? void 0 : _fromNode$current$han2[connectionHandleType];
  var fromHandle = handleId ? handleBound === null || handleBound === void 0 ? void 0 : handleBound.find(function (d) {
    return d.id === handleId;
  }) : handleBound === null || handleBound === void 0 ? void 0 : handleBound[0];
  var fromHandleX = fromHandle ? fromHandle.x + fromHandle.width / 2 : ((_fromNode$current$wid = (_fromNode$current = fromNode.current) === null || _fromNode$current === void 0 ? void 0 : _fromNode$current.width) !== null && _fromNode$current$wid !== void 0 ? _fromNode$current$wid : 0) / 2;
  var fromHandleY = fromHandle ? fromHandle.y + fromHandle.height / 2 : (_fromNode$current$hei = (_fromNode$current2 = fromNode.current) === null || _fromNode$current2 === void 0 ? void 0 : _fromNode$current2.height) !== null && _fromNode$current$hei !== void 0 ? _fromNode$current$hei : 0;
  var fromX = (((_fromNode$current$pos = fromNode.current.positionAbsolute) === null || _fromNode$current$pos === void 0 ? void 0 : _fromNode$current$pos.x) || 0) + fromHandleX;
  var fromY = (((_fromNode$current$pos2 = fromNode.current.positionAbsolute) === null || _fromNode$current$pos2 === void 0 ? void 0 : _fromNode$current$pos2.y) || 0) + fromHandleY;
  var toX = (connectionPositionX - transform[0]) / transform[2];
  var toY = (connectionPositionY - transform[1]) / transform[2];
  var fromPosition = fromHandle === null || fromHandle === void 0 ? void 0 : fromHandle.position;
  var toPosition;

  switch (fromPosition) {
    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left:
      toPosition = _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right;
      break;

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Right:
      toPosition = _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Left;
      break;

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top:
      toPosition = _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom;
      break;

    case _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom:
      toPosition = _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top;
      break;
  }

  var sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition;

  switch (connectionHandleType) {
    case 'source':
      {
        sourceX = fromX;
        sourceY = fromY;
        sourcePosition = fromPosition;
        targetX = toX;
        targetY = toY;
        targetPosition = toPosition;
      }
      break;

    case 'target':
      {
        sourceX = toX;
        sourceY = toY;
        sourcePosition = toPosition;
        targetX = fromX;
        targetY = fromY;
        targetPosition = fromPosition;
      }
      break;
  }

  if (CustomConnectionLineComponent) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("g", {
      className: "react-flow__connection"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(CustomConnectionLineComponent, {
      sourceX: sourceX,
      sourceY: sourceY,
      sourcePosition: sourcePosition,
      targetX: targetX,
      targetY: targetY,
      targetPosition: targetPosition,
      connectionLineType: connectionLineType,
      connectionLineStyle: connectionLineStyle,
      fromNode: fromNode.current,
      fromHandle: fromHandle,
      // backward compatibility, mark as deprecated?
      sourceNode: fromNode.current,
      sourceHandle: fromHandle
    }));
  }

  var dAttr = '';
  var pathParams = {
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: sourcePosition,
    targetX: targetX,
    targetY: targetY,
    targetPosition: targetPosition
  };

  if (connectionLineType === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["m"].Bezier) {
    // we assume the destination position is opposite to the source position
    dAttr = getBezierPath(pathParams);
  } else if (connectionLineType === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["m"].Step) {
    dAttr = getSmoothStepPath(_objectSpread$5(_objectSpread$5({}, pathParams), {}, {
      borderRadius: 0
    }));
  } else if (connectionLineType === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["m"].SmoothStep) {
    dAttr = getSmoothStepPath(pathParams);
  } else if (connectionLineType === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["m"].SimpleBezier) {
    dAttr = getSimpleBezierPath(pathParams);
  } else {
    dAttr = "M".concat(sourceX, ",").concat(sourceY, " ").concat(targetX, ",").concat(targetY);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("g", {
    className: "react-flow__connection"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("path", {
    d: dAttr,
    className: "react-flow__connection-path",
    style: connectionLineStyle
  }));
});

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var _MarkerSymbols;

var ArrowSymbol = function ArrowSymbol(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'none' : _ref$color,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("polyline", {
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: strokeWidth,
    fill: "none",
    points: "-5,-4 0,0 -5,4"
  });
};

var ArrowClosedSymbol = function ArrowClosedSymbol(_ref2) {
  var _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? 'none' : _ref2$color,
      _ref2$strokeWidth = _ref2.strokeWidth,
      strokeWidth = _ref2$strokeWidth === void 0 ? 1 : _ref2$strokeWidth;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("polyline", {
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: strokeWidth,
    fill: color,
    points: "-5,-4 0,0 -5,4 -5,-4"
  });
};

var MarkerSymbols = (_MarkerSymbols = {}, Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(_MarkerSymbols, _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["M"].Arrow, ArrowSymbol), Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(_MarkerSymbols, _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["M"].ArrowClosed, ArrowClosedSymbol), _MarkerSymbols);
function useMarkerSymbol(type) {
  var symbol = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    var symbolExists = MarkerSymbols.hasOwnProperty(type);

    if (!symbolExists) {
      console.warn("marker type \"".concat(type, "\" doesn't exist."));
      return function () {
        return null;
      };
    }

    return MarkerSymbols[type];
  }, [type]);
  return symbol;
}

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Marker = function Marker(_ref) {
  var id = _ref.id,
      type = _ref.type,
      color = _ref.color,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 12.5 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 12.5 : _ref$height,
      _ref$markerUnits = _ref.markerUnits,
      markerUnits = _ref$markerUnits === void 0 ? 'strokeWidth' : _ref$markerUnits,
      strokeWidth = _ref.strokeWidth,
      _ref$orient = _ref.orient,
      orient = _ref$orient === void 0 ? 'auto' : _ref$orient;

  var _Symbol = useMarkerSymbol(type);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("marker", {
    className: "react-flow__arrowhead",
    id: id,
    markerWidth: "".concat(width),
    markerHeight: "".concat(height),
    viewBox: "-10 -10 20 20",
    markerUnits: markerUnits,
    orient: orient,
    refX: "0",
    refY: "0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Symbol, {
    color: color,
    strokeWidth: strokeWidth
  }));
};

var edgesSelector = function edgesSelector(s) {
  return s.edges;
};

var MarkerDefinitions = function MarkerDefinitions(_ref2) {
  var defaultColor = _ref2.defaultColor;
  var edges = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(edgesSelector);
  var markers = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    var ids = [];
    return edges.reduce(function (markers, edge) {
      [edge.markerStart, edge.markerEnd].forEach(function (marker) {
        if (marker && _typeof(marker) === 'object') {
          var markerId = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["d"])(marker);

          if (!ids.includes(markerId)) {
            markers.push(_objectSpread$4({
              id: markerId,
              color: marker.color || defaultColor
            }, marker));
            ids.push(markerId);
          }
        }
      });
      return markers.sort(function (a, b) {
        return a.id.localeCompare(b.id);
      });
    }, []);
  }, [edges, defaultColor]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("defs", null, markers.map(function (marker) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Marker, {
      id: marker.id,
      key: marker.id,
      type: marker.type,
      color: marker.color,
      width: marker.width,
      height: marker.height,
      markerUnits: marker.markerUnits,
      strokeWidth: marker.strokeWidth,
      orient: marker.orient
    });
  }));
};

MarkerDefinitions.displayName = 'MarkerDefinitions';

var defaultEdgeTree = [{
  level: 0,
  isMaxLevel: true,
  edges: []
}];

function groupEdgesByZLevel(edges, nodeInternals) {
  var maxLevel = -1;
  var levelLookup = edges.reduce(function (tree, edge) {
    var _nodeInternals$get, _nodeInternals$get2;

    var z = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["n"])(edge.zIndex) ? edge.zIndex : Math.max(((_nodeInternals$get = nodeInternals.get(edge.source)) === null || _nodeInternals$get === void 0 ? void 0 : _nodeInternals$get.z) || 0, ((_nodeInternals$get2 = nodeInternals.get(edge.target)) === null || _nodeInternals$get2 === void 0 ? void 0 : _nodeInternals$get2.z) || 0);

    if (tree[z]) {
      tree[z].push(edge);
    } else {
      tree[z] = [edge];
    }

    maxLevel = z > maxLevel ? z : maxLevel;
    return tree;
  }, {});
  var edgeTree = Object.entries(levelLookup).map(function (_ref) {
    var _ref2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref, 2),
        key = _ref2[0],
        edges = _ref2[1];

    var level = +key;
    return {
      edges: edges,
      level: level,
      isMaxLevel: level === maxLevel
    };
  });

  if (edgeTree.length === 0) {
    return defaultEdgeTree;
  }

  return edgeTree;
}

function useVisibleEdges(onlyRenderVisible, nodeInternals) {
  var edges = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (s) {
    if (!onlyRenderVisible) {
      return s.edges;
    }

    return s.edges.filter(function (e) {
      var sourceNode = nodeInternals.get(e.source);
      var targetNode = nodeInternals.get(e.target);
      return (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.width) && (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.height) && (targetNode === null || targetNode === void 0 ? void 0 : targetNode.width) && (targetNode === null || targetNode === void 0 ? void 0 : targetNode.height) && isEdgeVisible({
        sourcePos: sourceNode.position || {
          x: 0,
          y: 0
        },
        targetPos: targetNode.position || {
          x: 0,
          y: 0
        },
        sourceWidth: sourceNode.width,
        sourceHeight: sourceNode.height,
        targetWidth: targetNode.width,
        targetHeight: targetNode.height,
        width: s.width,
        height: s.height,
        transform: s.transform
      });
    });
  }, [onlyRenderVisible, nodeInternals]));
  return groupEdgesByZLevel(edges, nodeInternals);
}

var selector$2 = function selector(s) {
  return {
    connectionNodeId: s.connectionNodeId,
    connectionHandleId: s.connectionHandleId,
    connectionHandleType: s.connectionHandleType,
    connectionPosition: s.connectionPosition,
    nodesConnectable: s.nodesConnectable,
    elementsSelectable: s.elementsSelectable,
    width: s.width,
    height: s.height,
    connectionMode: s.connectionMode,
    nodeInternals: s.nodeInternals
  };
};

var EdgeRenderer = function EdgeRenderer(props) {
  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$2, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
      connectionNodeId = _useStore.connectionNodeId,
      connectionHandleId = _useStore.connectionHandleId,
      connectionHandleType = _useStore.connectionHandleType,
      connectionPosition = _useStore.connectionPosition,
      nodesConnectable = _useStore.nodesConnectable,
      elementsSelectable = _useStore.elementsSelectable,
      width = _useStore.width,
      height = _useStore.height,
      connectionMode = _useStore.connectionMode,
      nodeInternals = _useStore.nodeInternals;

  var edgeTree = useVisibleEdges(props.onlyRenderVisibleElements, nodeInternals);

  if (!width) {
    return null;
  }

  var connectionLineType = props.connectionLineType,
      defaultMarkerColor = props.defaultMarkerColor,
      connectionLineStyle = props.connectionLineStyle,
      connectionLineComponent = props.connectionLineComponent;
  var renderConnectionLine = connectionNodeId && connectionHandleType;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, edgeTree.map(function (_ref) {
    var level = _ref.level,
        edges = _ref.edges,
        isMaxLevel = _ref.isMaxLevel;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("svg", {
      key: level,
      style: {
        zIndex: level
      },
      width: width,
      height: height,
      className: "react-flow__edges react-flow__container"
    }, isMaxLevel && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(MarkerDefinitions, {
      defaultColor: defaultMarkerColor
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("g", null, edges.map(function (edge) {
      var _getNodeData = getNodeData(nodeInternals, edge.source),
          _getNodeData2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getNodeData, 3),
          sourceNodeRect = _getNodeData2[0],
          sourceHandleBounds = _getNodeData2[1],
          sourceIsValid = _getNodeData2[2];

      var _getNodeData3 = getNodeData(nodeInternals, edge.target),
          _getNodeData4 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getNodeData3, 3),
          targetNodeRect = _getNodeData4[0],
          targetHandleBounds = _getNodeData4[1],
          targetIsValid = _getNodeData4[2];

      if (!sourceIsValid || !targetIsValid) {
        return null;
      }

      var edgeType = edge.type || 'default';
      var EdgeComponent = props.edgeTypes[edgeType] || props.edgeTypes["default"]; // when connection type is loose we can define all handles as sources

      var targetNodeHandles = connectionMode === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["C"].Strict ? targetHandleBounds.target : targetHandleBounds.target || targetHandleBounds.source;
      var sourceHandle = getHandle(sourceHandleBounds.source, edge.sourceHandle || null);
      var targetHandle = getHandle(targetNodeHandles, edge.targetHandle || null);
      var sourcePosition = (sourceHandle === null || sourceHandle === void 0 ? void 0 : sourceHandle.position) || _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Bottom;
      var targetPosition = (targetHandle === null || targetHandle === void 0 ? void 0 : targetHandle.position) || _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["P"].Top;

      if (!sourceHandle) {
        console.warn("couldn't create edge for source handle id: ".concat(edge.sourceHandle, "; edge id: ").concat(edge.id));
        return null;
      }

      if (!targetHandle) {
        console.warn("couldn't create edge for target handle id: ".concat(edge.targetHandle, "; edge id: ").concat(edge.id));
        return null;
      }

      var _getEdgePositions = getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition),
          sourceX = _getEdgePositions.sourceX,
          sourceY = _getEdgePositions.sourceY,
          targetX = _getEdgePositions.targetX,
          targetY = _getEdgePositions.targetY;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(EdgeComponent, {
        key: edge.id,
        id: edge.id,
        className: Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])([edge.className, props.noPanClassName]),
        type: edgeType,
        data: edge.data,
        selected: !!edge.selected,
        animated: !!edge.animated,
        hidden: !!edge.hidden,
        label: edge.label,
        labelStyle: edge.labelStyle,
        labelShowBg: edge.labelShowBg,
        labelBgStyle: edge.labelBgStyle,
        labelBgPadding: edge.labelBgPadding,
        labelBgBorderRadius: edge.labelBgBorderRadius,
        style: edge.style,
        source: edge.source,
        target: edge.target,
        sourceHandleId: edge.sourceHandle,
        targetHandleId: edge.targetHandle,
        markerEnd: edge.markerEnd,
        markerStart: edge.markerStart,
        sourceX: sourceX,
        sourceY: sourceY,
        targetX: targetX,
        targetY: targetY,
        sourcePosition: sourcePosition,
        targetPosition: targetPosition,
        elementsSelectable: elementsSelectable,
        onEdgeUpdate: props.onEdgeUpdate,
        onContextMenu: props.onEdgeContextMenu,
        onMouseEnter: props.onEdgeMouseEnter,
        onMouseMove: props.onEdgeMouseMove,
        onMouseLeave: props.onEdgeMouseLeave,
        onClick: props.onEdgeClick,
        edgeUpdaterRadius: props.edgeUpdaterRadius,
        onEdgeDoubleClick: props.onEdgeDoubleClick,
        onEdgeUpdateStart: props.onEdgeUpdateStart,
        onEdgeUpdateEnd: props.onEdgeUpdateEnd
      });
    }), renderConnectionLine && isMaxLevel && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ConnectionLine, {
      connectionNodeId: connectionNodeId,
      connectionHandleId: connectionHandleId,
      connectionHandleType: connectionHandleType,
      connectionPositionX: connectionPosition.x,
      connectionPositionY: connectionPosition.y,
      connectionLineStyle: connectionLineStyle,
      connectionLineType: connectionLineType,
      isConnectable: nodesConnectable,
      CustomConnectionLineComponent: connectionLineComponent
    })));
  }));
};

EdgeRenderer.displayName = 'EdgeRenderer';
var EdgeRenderer$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(EdgeRenderer);

var selector$1 = function selector(s) {
  return s.transform;
};

function Viewport(_ref) {
  var children = _ref.children;
  var transform = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector$1);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "react-flow__viewport react-flow__container",
    style: {
      transform: "translate(".concat(transform[0], "px,").concat(transform[1], "px) scale(").concat(transform[2], ")")
    }
  }, children);
}

function useOnInitHandler(onInit) {
  var ReactFlowInstance = Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["u"])();
  var isInitialized = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (!isInitialized.current && ReactFlowInstance.viewportInitialized && onInit) {
      setTimeout(function () {
        return onInit(ReactFlowInstance);
      }, 1);
      isInitialized.current = true;
    }
  }, [onInit, ReactFlowInstance.viewportInitialized]);
}

var GraphView = function GraphView(_ref) {
  var nodeTypes = _ref.nodeTypes,
      edgeTypes = _ref.edgeTypes,
      onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      onInit = _ref.onInit,
      onNodeClick = _ref.onNodeClick,
      onEdgeClick = _ref.onEdgeClick,
      onNodeDoubleClick = _ref.onNodeDoubleClick,
      onEdgeDoubleClick = _ref.onEdgeDoubleClick,
      onNodeMouseEnter = _ref.onNodeMouseEnter,
      onNodeMouseMove = _ref.onNodeMouseMove,
      onNodeMouseLeave = _ref.onNodeMouseLeave,
      onNodeContextMenu = _ref.onNodeContextMenu,
      onNodeDragStart = _ref.onNodeDragStart,
      onNodeDrag = _ref.onNodeDrag,
      onNodeDragStop = _ref.onNodeDragStop,
      onSelectionDragStart = _ref.onSelectionDragStart,
      onSelectionDrag = _ref.onSelectionDrag,
      onSelectionDragStop = _ref.onSelectionDragStop,
      onSelectionContextMenu = _ref.onSelectionContextMenu,
      connectionLineType = _ref.connectionLineType,
      connectionLineStyle = _ref.connectionLineStyle,
      connectionLineComponent = _ref.connectionLineComponent,
      selectionKeyCode = _ref.selectionKeyCode,
      multiSelectionKeyCode = _ref.multiSelectionKeyCode,
      zoomActivationKeyCode = _ref.zoomActivationKeyCode,
      deleteKeyCode = _ref.deleteKeyCode,
      onlyRenderVisibleElements = _ref.onlyRenderVisibleElements,
      elementsSelectable = _ref.elementsSelectable,
      selectNodesOnDrag = _ref.selectNodesOnDrag,
      defaultZoom = _ref.defaultZoom,
      defaultPosition = _ref.defaultPosition,
      preventScrolling = _ref.preventScrolling,
      defaultMarkerColor = _ref.defaultMarkerColor,
      zoomOnScroll = _ref.zoomOnScroll,
      zoomOnPinch = _ref.zoomOnPinch,
      panOnScroll = _ref.panOnScroll,
      panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollMode = _ref.panOnScrollMode,
      zoomOnDoubleClick = _ref.zoomOnDoubleClick,
      panOnDrag = _ref.panOnDrag,
      onPaneClick = _ref.onPaneClick,
      onPaneScroll = _ref.onPaneScroll,
      onPaneContextMenu = _ref.onPaneContextMenu,
      onEdgeUpdate = _ref.onEdgeUpdate,
      onEdgeContextMenu = _ref.onEdgeContextMenu,
      onEdgeMouseEnter = _ref.onEdgeMouseEnter,
      onEdgeMouseMove = _ref.onEdgeMouseMove,
      onEdgeMouseLeave = _ref.onEdgeMouseLeave,
      edgeUpdaterRadius = _ref.edgeUpdaterRadius,
      onEdgeUpdateStart = _ref.onEdgeUpdateStart,
      onEdgeUpdateEnd = _ref.onEdgeUpdateEnd,
      noDragClassName = _ref.noDragClassName,
      noWheelClassName = _ref.noWheelClassName,
      noPanClassName = _ref.noPanClassName;
  useOnInitHandler(onInit);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(FlowRenderer$1, {
    onPaneClick: onPaneClick,
    onPaneContextMenu: onPaneContextMenu,
    onPaneScroll: onPaneScroll,
    deleteKeyCode: deleteKeyCode,
    selectionKeyCode: selectionKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode,
    zoomActivationKeyCode: zoomActivationKeyCode,
    elementsSelectable: elementsSelectable,
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    panOnDrag: panOnDrag,
    defaultPosition: defaultPosition,
    defaultZoom: defaultZoom,
    onSelectionDragStart: onSelectionDragStart,
    onSelectionDrag: onSelectionDrag,
    onSelectionDragStop: onSelectionDragStop,
    onSelectionContextMenu: onSelectionContextMenu,
    preventScrolling: preventScrolling,
    noDragClassName: noDragClassName,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Viewport, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(EdgeRenderer$1, {
    edgeTypes: edgeTypes,
    onEdgeClick: onEdgeClick,
    onEdgeDoubleClick: onEdgeDoubleClick,
    connectionLineType: connectionLineType,
    connectionLineStyle: connectionLineStyle,
    connectionLineComponent: connectionLineComponent,
    onEdgeUpdate: onEdgeUpdate,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    onEdgeContextMenu: onEdgeContextMenu,
    onEdgeMouseEnter: onEdgeMouseEnter,
    onEdgeMouseMove: onEdgeMouseMove,
    onEdgeMouseLeave: onEdgeMouseLeave,
    onEdgeUpdateStart: onEdgeUpdateStart,
    onEdgeUpdateEnd: onEdgeUpdateEnd,
    edgeUpdaterRadius: edgeUpdaterRadius,
    defaultMarkerColor: defaultMarkerColor,
    noPanClassName: noPanClassName
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(NodeRenderer$1, {
    nodeTypes: nodeTypes,
    onNodeClick: onNodeClick,
    onNodeDoubleClick: onNodeDoubleClick,
    onNodeMouseEnter: onNodeMouseEnter,
    onNodeMouseMove: onNodeMouseMove,
    onNodeMouseLeave: onNodeMouseLeave,
    onNodeContextMenu: onNodeContextMenu,
    onNodeDragStop: onNodeDragStop,
    onNodeDrag: onNodeDrag,
    onNodeDragStart: onNodeDragStart,
    selectNodesOnDrag: selectNodesOnDrag,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    noPanClassName: noPanClassName,
    noDragClassName: noDragClassName
  })));
};

GraphView.displayName = 'GraphView';
var GraphView$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(GraphView);

var GroupNode = function GroupNode() {
  return null;
};

GroupNode.displayName = 'GroupNode';

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function useMemoizedMouseHandler(id, dragging, getState, handler) {
  var memoizedHandler = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
    if (typeof handler !== 'undefined' && !dragging) {
      var node = getState().nodeInternals.get(id);
      handler(event, _objectSpread$3({}, node));
    }
  }, [handler, dragging, id]);
  return memoizedHandler;
}

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var selector = function selector(s) {
  return {
    addSelectedNodes: s.addSelectedNodes,
    updateNodePosition: s.updateNodePosition,
    unselectNodesAndEdges: s.unselectNodesAndEdges,
    updateNodeDimensions: s.updateNodeDimensions
  };
};

var wrapNode = (function (NodeComponent) {
  var NodeWrapper = function NodeWrapper(_ref) {
    var id = _ref.id,
        type = _ref.type,
        data = _ref.data,
        scale = _ref.scale,
        xPos = _ref.xPos,
        yPos = _ref.yPos,
        selected = _ref.selected,
        onClick = _ref.onClick,
        onMouseEnter = _ref.onMouseEnter,
        onMouseMove = _ref.onMouseMove,
        onMouseLeave = _ref.onMouseLeave,
        onContextMenu = _ref.onContextMenu,
        onNodeDoubleClick = _ref.onNodeDoubleClick,
        onNodeDragStart = _ref.onNodeDragStart,
        onNodeDrag = _ref.onNodeDrag,
        onNodeDragStop = _ref.onNodeDragStop,
        style = _ref.style,
        className = _ref.className,
        isDraggable = _ref.isDraggable,
        isSelectable = _ref.isSelectable,
        isConnectable = _ref.isConnectable,
        selectNodesOnDrag = _ref.selectNodesOnDrag,
        sourcePosition = _ref.sourcePosition,
        targetPosition = _ref.targetPosition,
        hidden = _ref.hidden,
        snapToGrid = _ref.snapToGrid,
        snapGrid = _ref.snapGrid,
        dragging = _ref.dragging,
        resizeObserver = _ref.resizeObserver,
        dragHandle = _ref.dragHandle,
        zIndex = _ref.zIndex,
        isParent = _ref.isParent,
        noPanClassName = _ref.noPanClassName,
        noDragClassName = _ref.noDragClassName;
    var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();

    var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector, zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default.a),
        addSelectedNodes = _useStore.addSelectedNodes,
        unselectNodesAndEdges = _useStore.unselectNodesAndEdges,
        updateNodePosition = _useStore.updateNodePosition,
        updateNodeDimensions = _useStore.updateNodeDimensions;

    var nodeElement = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
    var prevSourcePosition = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(sourcePosition);
    var prevTargetPosition = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(targetPosition);
    var prevType = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(type);
    var hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
    var nodeStyle = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
      return _objectSpread$2({
        zIndex: zIndex,
        transform: "translate(".concat(xPos, "px,").concat(yPos, "px)"),
        pointerEvents: hasPointerEvents ? 'all' : 'none'
      }, style);
    }, [zIndex, xPos, yPos, hasPointerEvents, style]);
    var grid = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
      return snapToGrid ? snapGrid : [1, 1];
    }, [snapToGrid, snapGrid === null || snapGrid === void 0 ? void 0 : snapGrid[0], snapGrid === null || snapGrid === void 0 ? void 0 : snapGrid[1]]);
    var onMouseEnterHandler = useMemoizedMouseHandler(id, dragging, store.getState, onMouseEnter);
    var onMouseMoveHandler = useMemoizedMouseHandler(id, dragging, store.getState, onMouseMove);
    var onMouseLeaveHandler = useMemoizedMouseHandler(id, dragging, store.getState, onMouseLeave);
    var onContextMenuHandler = useMemoizedMouseHandler(id, false, store.getState, onContextMenu);
    var onNodeDoubleClickHandler = useMemoizedMouseHandler(id, false, store.getState, onNodeDoubleClick);
    var onSelectNodeHandler = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      if (!isDraggable) {
        if (isSelectable) {
          store.setState({
            nodesSelectionActive: false
          });

          if (!selected) {
            addSelectedNodes([id]);
          }
        }

        if (onClick) {
          var node = store.getState().nodeInternals.get(id);
          onClick(event, _objectSpread$2({}, node));
        }
      }
    }, [isSelectable, selected, isDraggable, onClick, id]);
    var onDragStart = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      if (selectNodesOnDrag && isSelectable) {
        store.setState({
          nodesSelectionActive: false
        });

        if (!selected) {
          addSelectedNodes([id]);
        }
      } else if (!selectNodesOnDrag && !selected && isSelectable) {
        var _store$getState = store.getState(),
            multiSelectionActive = _store$getState.multiSelectionActive;

        if (multiSelectionActive) {
          addSelectedNodes([id]);
        } else {
          unselectNodesAndEdges();
          store.setState({
            nodesSelectionActive: false
          });
        }
      }

      if (onNodeDragStart) {
        var node = store.getState().nodeInternals.get(id);
        onNodeDragStart(event, _objectSpread$2({}, node));
      }
    }, [id, selected, selectNodesOnDrag, isSelectable, onNodeDragStart]);
    var onDrag = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event, draggableData) {
      updateNodePosition({
        id: id,
        dragging: true,
        diff: {
          x: draggableData.deltaX,
          y: draggableData.deltaY
        }
      });

      if (onNodeDrag) {
        var _node$positionAbsolut, _node$positionAbsolut2;

        var node = store.getState().nodeInternals.get(id);
        onNodeDrag(event, _objectSpread$2(_objectSpread$2({}, node), {}, {
          dragging: true,
          position: {
            x: node.position.x + draggableData.deltaX,
            y: node.position.y + draggableData.deltaY
          },
          positionAbsolute: {
            x: (((_node$positionAbsolut = node.positionAbsolute) === null || _node$positionAbsolut === void 0 ? void 0 : _node$positionAbsolut.x) || 0) + draggableData.deltaX,
            y: (((_node$positionAbsolut2 = node.positionAbsolute) === null || _node$positionAbsolut2 === void 0 ? void 0 : _node$positionAbsolut2.y) || 0) + draggableData.deltaY
          }
        }));
      }
    }, [id, onNodeDrag]);
    var onDragStop = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (event) {
      // onDragStop also gets called when user just clicks on a node.
      // Because of that we set dragging to true inside the onDrag handler and handle the click here
      var node;

      if (onClick || onNodeDragStop) {
        node = store.getState().nodeInternals.get(id);
      }

      if (!dragging) {
        if (isSelectable && !selectNodesOnDrag && !selected) {
          addSelectedNodes([id]);
        }

        if (onClick && node) {
          onClick(event, _objectSpread$2({}, node));
        }

        return;
      }

      updateNodePosition({
        id: id,
        dragging: false
      });

      if (onNodeDragStop && node) {
        onNodeDragStop(event, _objectSpread$2(_objectSpread$2({}, node), {}, {
          dragging: false
        }));
      }
    }, [id, isSelectable, selectNodesOnDrag, onClick, onNodeDragStop, dragging, selected]);
    Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
      if (nodeElement.current && !hidden) {
        var currNode = nodeElement.current;
        resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(currNode);
        return function () {
          return resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.unobserve(currNode);
        };
      }
    }, [hidden]);
    Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
      // when the user programmatically changes the source or handle position, we re-initialize the node
      var typeChanged = prevType.current !== type;
      var sourcePosChanged = prevSourcePosition.current !== sourcePosition;
      var targetPosChanged = prevTargetPosition.current !== targetPosition;

      if (nodeElement.current && (typeChanged || sourcePosChanged || targetPosChanged)) {
        if (typeChanged) {
          prevType.current = type;
        }

        if (sourcePosChanged) {
          prevSourcePosition.current = sourcePosition;
        }

        if (targetPosChanged) {
          prevTargetPosition.current = targetPosition;
        }

        updateNodeDimensions([{
          id: id,
          nodeElement: nodeElement.current,
          forceUpdate: true
        }]);
      }
    }, [id, type, sourcePosition, targetPosition]);

    if (hidden) {
      return null;
    }

    var nodeClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__node', "react-flow__node-".concat(type), noPanClassName, className, {
      selected: selected,
      selectable: isSelectable,
      parent: isParent
    }]);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_draggable__WEBPACK_IMPORTED_MODULE_7__["DraggableCore"], {
      onStart: onDragStart,
      onDrag: onDrag,
      onStop: onDragStop,
      scale: scale,
      disabled: !isDraggable,
      cancel: ".".concat(noDragClassName),
      nodeRef: nodeElement,
      grid: grid,
      enableUserSelectHack: false,
      handle: dragHandle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      className: nodeClasses,
      ref: nodeElement,
      style: nodeStyle,
      onMouseEnter: onMouseEnterHandler,
      onMouseMove: onMouseMoveHandler,
      onMouseLeave: onMouseLeaveHandler,
      onContextMenu: onContextMenuHandler,
      onClick: onSelectNodeHandler,
      onDoubleClick: onNodeDoubleClickHandler,
      "data-id": id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Provider, {
      value: id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(NodeComponent, {
      id: id,
      data: data,
      type: type,
      xPos: xPos,
      yPos: yPos,
      selected: selected,
      isConnectable: isConnectable,
      sourcePosition: sourcePosition,
      targetPosition: targetPosition,
      dragging: dragging,
      dragHandle: dragHandle,
      zIndex: zIndex
    }))));
  };

  NodeWrapper.displayName = 'NodeWrapper';
  return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["memo"])(NodeWrapper);
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function createNodeTypes(nodeTypes) {
  var standardTypes = {
    input: wrapNode(nodeTypes.input || InputNode$1),
    "default": wrapNode(nodeTypes["default"] || DefaultNode$1),
    output: wrapNode(nodeTypes.output || OutputNode$1),
    group: wrapNode(nodeTypes.group || GroupNode)
  };
  var wrappedTypes = {};
  var specialTypes = Object.keys(nodeTypes).filter(function (k) {
    return !['input', 'default', 'output', 'group'].includes(k);
  }).reduce(function (res, key) {
    res[key] = wrapNode(nodeTypes[key] || DefaultNode$1);
    return res;
  }, wrappedTypes);
  return _objectSpread$1(_objectSpread$1({}, standardTypes), specialTypes);
}

function useNodeOrEdgeTypes(nodeOrEdgeTypes, createTypes) {
  var typesKeysRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var typesParsed = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    if (true) {
      var typeKeys = Object.keys(nodeOrEdgeTypes);

      if (zustand_shallow__WEBPACK_IMPORTED_MODULE_4___default()(typesKeysRef.current, typeKeys)) {
        console.warn("React Flow: It looks like that you created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.");
      }

      typesKeysRef.current = typeKeys;
    }

    return createTypes(nodeOrEdgeTypes);
  }, [nodeOrEdgeTypes]);
  return typesParsed;
}
function injectStyle(css) {
  if (!css || typeof document === 'undefined') return;
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children;
  var isWrapped = true;

  try {
    Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();
  } catch (e) {
    isWrapped = false;
  }

  if (isWrapped) {
    // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, children);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["o"], {
    createStore: _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["p"]
  }, children);
};

Wrapper.displayName = 'ReactFlowWrapper';

var _excluded = ["nodes", "edges", "defaultNodes", "defaultEdges", "className", "nodeTypes", "edgeTypes", "onNodeClick", "onEdgeClick", "onInit", "onMove", "onMoveStart", "onMoveEnd", "onConnect", "onConnectStart", "onConnectStop", "onConnectEnd", "onNodeMouseEnter", "onNodeMouseMove", "onNodeMouseLeave", "onNodeContextMenu", "onNodeDoubleClick", "onNodeDragStart", "onNodeDrag", "onNodeDragStop", "onNodesDelete", "onEdgesDelete", "onSelectionChange", "onSelectionDragStart", "onSelectionDrag", "onSelectionDragStop", "onSelectionContextMenu", "connectionMode", "connectionLineType", "connectionLineStyle", "connectionLineComponent", "deleteKeyCode", "selectionKeyCode", "multiSelectionKeyCode", "zoomActivationKeyCode", "snapToGrid", "snapGrid", "onlyRenderVisibleElements", "selectNodesOnDrag", "nodesDraggable", "nodesConnectable", "elementsSelectable", "minZoom", "maxZoom", "defaultZoom", "defaultPosition", "translateExtent", "preventScrolling", "nodeExtent", "defaultMarkerColor", "zoomOnScroll", "zoomOnPinch", "panOnScroll", "panOnScrollSpeed", "panOnScrollMode", "zoomOnDoubleClick", "panOnDrag", "onPaneClick", "onPaneScroll", "onPaneContextMenu", "children", "onEdgeUpdate", "onEdgeContextMenu", "onEdgeDoubleClick", "onEdgeMouseEnter", "onEdgeMouseMove", "onEdgeMouseLeave", "onEdgeUpdateStart", "onEdgeUpdateEnd", "edgeUpdaterRadius", "onNodesChange", "onEdgesChange", "noDragClassName", "noWheelClassName", "noPanClassName", "fitView", "fitViewOptions", "connectOnClick", "attributionPosition", "proOptions", "defaultEdgeOptions"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

{
  injectStyle(css_248z$1);
  injectStyle(css_248z);
}

var defaultNodeTypes = {
  input: InputNode$1,
  "default": DefaultNode$1,
  output: OutputNode$1
};
var defaultEdgeTypes = {
  "default": BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
  simplebezier: SimpleBezierEdge
};
var initSnapGrid = [15, 15];
var initDefaultPosition = [0, 0];
var ReactFlow = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function (_ref, ref) {
  var nodes = _ref.nodes,
      edges = _ref.edges,
      defaultNodes = _ref.defaultNodes,
      defaultEdges = _ref.defaultEdges,
      className = _ref.className,
      _ref$nodeTypes = _ref.nodeTypes,
      nodeTypes = _ref$nodeTypes === void 0 ? defaultNodeTypes : _ref$nodeTypes,
      _ref$edgeTypes = _ref.edgeTypes,
      edgeTypes = _ref$edgeTypes === void 0 ? defaultEdgeTypes : _ref$edgeTypes,
      onNodeClick = _ref.onNodeClick,
      onEdgeClick = _ref.onEdgeClick,
      onInit = _ref.onInit,
      onMove = _ref.onMove,
      onMoveStart = _ref.onMoveStart,
      onMoveEnd = _ref.onMoveEnd,
      onConnect = _ref.onConnect,
      onConnectStart = _ref.onConnectStart,
      onConnectStop = _ref.onConnectStop,
      onConnectEnd = _ref.onConnectEnd,
      onNodeMouseEnter = _ref.onNodeMouseEnter,
      onNodeMouseMove = _ref.onNodeMouseMove,
      onNodeMouseLeave = _ref.onNodeMouseLeave,
      onNodeContextMenu = _ref.onNodeContextMenu,
      onNodeDoubleClick = _ref.onNodeDoubleClick,
      onNodeDragStart = _ref.onNodeDragStart,
      onNodeDrag = _ref.onNodeDrag,
      onNodeDragStop = _ref.onNodeDragStop,
      onNodesDelete = _ref.onNodesDelete,
      onEdgesDelete = _ref.onEdgesDelete,
      onSelectionChange = _ref.onSelectionChange,
      onSelectionDragStart = _ref.onSelectionDragStart,
      onSelectionDrag = _ref.onSelectionDrag,
      onSelectionDragStop = _ref.onSelectionDragStop,
      onSelectionContextMenu = _ref.onSelectionContextMenu,
      _ref$connectionMode = _ref.connectionMode,
      connectionMode = _ref$connectionMode === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["C"].Strict : _ref$connectionMode,
      _ref$connectionLineTy = _ref.connectionLineType,
      connectionLineType = _ref$connectionLineTy === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["m"].Bezier : _ref$connectionLineTy,
      connectionLineStyle = _ref.connectionLineStyle,
      connectionLineComponent = _ref.connectionLineComponent,
      _ref$deleteKeyCode = _ref.deleteKeyCode,
      deleteKeyCode = _ref$deleteKeyCode === void 0 ? 'Backspace' : _ref$deleteKeyCode,
      _ref$selectionKeyCode = _ref.selectionKeyCode,
      selectionKeyCode = _ref$selectionKeyCode === void 0 ? 'Shift' : _ref$selectionKeyCode,
      _ref$multiSelectionKe = _ref.multiSelectionKeyCode,
      multiSelectionKeyCode = _ref$multiSelectionKe === void 0 ? 'Meta' : _ref$multiSelectionKe,
      _ref$zoomActivationKe = _ref.zoomActivationKeyCode,
      zoomActivationKeyCode = _ref$zoomActivationKe === void 0 ? 'Meta' : _ref$zoomActivationKe,
      _ref$snapToGrid = _ref.snapToGrid,
      snapToGrid = _ref$snapToGrid === void 0 ? false : _ref$snapToGrid,
      _ref$snapGrid = _ref.snapGrid,
      snapGrid = _ref$snapGrid === void 0 ? initSnapGrid : _ref$snapGrid,
      _ref$onlyRenderVisibl = _ref.onlyRenderVisibleElements,
      onlyRenderVisibleElements = _ref$onlyRenderVisibl === void 0 ? false : _ref$onlyRenderVisibl,
      _ref$selectNodesOnDra = _ref.selectNodesOnDrag,
      selectNodesOnDrag = _ref$selectNodesOnDra === void 0 ? true : _ref$selectNodesOnDra,
      nodesDraggable = _ref.nodesDraggable,
      nodesConnectable = _ref.nodesConnectable,
      elementsSelectable = _ref.elementsSelectable,
      minZoom = _ref.minZoom,
      maxZoom = _ref.maxZoom,
      _ref$defaultZoom = _ref.defaultZoom,
      defaultZoom = _ref$defaultZoom === void 0 ? 1 : _ref$defaultZoom,
      _ref$defaultPosition = _ref.defaultPosition,
      defaultPosition = _ref$defaultPosition === void 0 ? initDefaultPosition : _ref$defaultPosition,
      translateExtent = _ref.translateExtent,
      _ref$preventScrolling = _ref.preventScrolling,
      preventScrolling = _ref$preventScrolling === void 0 ? true : _ref$preventScrolling,
      nodeExtent = _ref.nodeExtent,
      _ref$defaultMarkerCol = _ref.defaultMarkerColor,
      defaultMarkerColor = _ref$defaultMarkerCol === void 0 ? '#b1b1b7' : _ref$defaultMarkerCol,
      _ref$zoomOnScroll = _ref.zoomOnScroll,
      zoomOnScroll = _ref$zoomOnScroll === void 0 ? true : _ref$zoomOnScroll,
      _ref$zoomOnPinch = _ref.zoomOnPinch,
      zoomOnPinch = _ref$zoomOnPinch === void 0 ? true : _ref$zoomOnPinch,
      _ref$panOnScroll = _ref.panOnScroll,
      panOnScroll = _ref$panOnScroll === void 0 ? false : _ref$panOnScroll,
      _ref$panOnScrollSpeed = _ref.panOnScrollSpeed,
      panOnScrollSpeed = _ref$panOnScrollSpeed === void 0 ? 0.5 : _ref$panOnScrollSpeed,
      _ref$panOnScrollMode = _ref.panOnScrollMode,
      panOnScrollMode = _ref$panOnScrollMode === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["h"].Free : _ref$panOnScrollMode,
      _ref$zoomOnDoubleClic = _ref.zoomOnDoubleClick,
      zoomOnDoubleClick = _ref$zoomOnDoubleClic === void 0 ? true : _ref$zoomOnDoubleClic,
      _ref$panOnDrag = _ref.panOnDrag,
      panOnDrag = _ref$panOnDrag === void 0 ? true : _ref$panOnDrag,
      onPaneClick = _ref.onPaneClick,
      onPaneScroll = _ref.onPaneScroll,
      onPaneContextMenu = _ref.onPaneContextMenu,
      children = _ref.children,
      onEdgeUpdate = _ref.onEdgeUpdate,
      onEdgeContextMenu = _ref.onEdgeContextMenu,
      onEdgeDoubleClick = _ref.onEdgeDoubleClick,
      onEdgeMouseEnter = _ref.onEdgeMouseEnter,
      onEdgeMouseMove = _ref.onEdgeMouseMove,
      onEdgeMouseLeave = _ref.onEdgeMouseLeave,
      onEdgeUpdateStart = _ref.onEdgeUpdateStart,
      onEdgeUpdateEnd = _ref.onEdgeUpdateEnd,
      _ref$edgeUpdaterRadiu = _ref.edgeUpdaterRadius,
      edgeUpdaterRadius = _ref$edgeUpdaterRadiu === void 0 ? 10 : _ref$edgeUpdaterRadiu,
      onNodesChange = _ref.onNodesChange,
      onEdgesChange = _ref.onEdgesChange,
      _ref$noDragClassName = _ref.noDragClassName,
      noDragClassName = _ref$noDragClassName === void 0 ? 'nodrag' : _ref$noDragClassName,
      _ref$noWheelClassName = _ref.noWheelClassName,
      noWheelClassName = _ref$noWheelClassName === void 0 ? 'nowheel' : _ref$noWheelClassName,
      _ref$noPanClassName = _ref.noPanClassName,
      noPanClassName = _ref$noPanClassName === void 0 ? 'nopan' : _ref$noPanClassName,
      _ref$fitView = _ref.fitView,
      fitView = _ref$fitView === void 0 ? false : _ref$fitView,
      fitViewOptions = _ref.fitViewOptions,
      _ref$connectOnClick = _ref.connectOnClick,
      connectOnClick = _ref$connectOnClick === void 0 ? true : _ref$connectOnClick,
      attributionPosition = _ref.attributionPosition,
      proOptions = _ref.proOptions,
      defaultEdgeOptions = _ref.defaultEdgeOptions,
      rest = Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["a"])(_ref, _excluded);

  var nodeTypesParsed = useNodeOrEdgeTypes(nodeTypes, createNodeTypes);
  var edgeTypesParsed = useNodeOrEdgeTypes(edgeTypes, createEdgeTypes);
  var reactFlowClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow', className]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", _objectSpread(_objectSpread({}, rest), {}, {
    ref: ref,
    className: reactFlowClasses
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Wrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(GraphView$1, {
    onInit: onInit,
    onMove: onMove,
    onMoveStart: onMoveStart,
    onMoveEnd: onMoveEnd,
    onNodeClick: onNodeClick,
    onEdgeClick: onEdgeClick,
    onNodeMouseEnter: onNodeMouseEnter,
    onNodeMouseMove: onNodeMouseMove,
    onNodeMouseLeave: onNodeMouseLeave,
    onNodeContextMenu: onNodeContextMenu,
    onNodeDoubleClick: onNodeDoubleClick,
    onNodeDragStart: onNodeDragStart,
    onNodeDrag: onNodeDrag,
    onNodeDragStop: onNodeDragStop,
    nodeTypes: nodeTypesParsed,
    edgeTypes: edgeTypesParsed,
    connectionLineType: connectionLineType,
    connectionLineStyle: connectionLineStyle,
    connectionLineComponent: connectionLineComponent,
    selectionKeyCode: selectionKeyCode,
    deleteKeyCode: deleteKeyCode,
    multiSelectionKeyCode: multiSelectionKeyCode,
    zoomActivationKeyCode: zoomActivationKeyCode,
    onlyRenderVisibleElements: onlyRenderVisibleElements,
    selectNodesOnDrag: selectNodesOnDrag,
    defaultZoom: defaultZoom,
    defaultPosition: defaultPosition,
    preventScrolling: preventScrolling,
    zoomOnScroll: zoomOnScroll,
    zoomOnPinch: zoomOnPinch,
    zoomOnDoubleClick: zoomOnDoubleClick,
    panOnScroll: panOnScroll,
    panOnScrollSpeed: panOnScrollSpeed,
    panOnScrollMode: panOnScrollMode,
    panOnDrag: panOnDrag,
    onPaneClick: onPaneClick,
    onPaneScroll: onPaneScroll,
    onPaneContextMenu: onPaneContextMenu,
    onSelectionDragStart: onSelectionDragStart,
    onSelectionDrag: onSelectionDrag,
    onSelectionDragStop: onSelectionDragStop,
    onSelectionContextMenu: onSelectionContextMenu,
    onEdgeUpdate: onEdgeUpdate,
    onEdgeContextMenu: onEdgeContextMenu,
    onEdgeDoubleClick: onEdgeDoubleClick,
    onEdgeMouseEnter: onEdgeMouseEnter,
    onEdgeMouseMove: onEdgeMouseMove,
    onEdgeMouseLeave: onEdgeMouseLeave,
    onEdgeUpdateStart: onEdgeUpdateStart,
    onEdgeUpdateEnd: onEdgeUpdateEnd,
    edgeUpdaterRadius: edgeUpdaterRadius,
    defaultMarkerColor: defaultMarkerColor,
    noDragClassName: noDragClassName,
    noWheelClassName: noWheelClassName,
    noPanClassName: noPanClassName
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(StoreUpdater, {
    nodes: nodes,
    edges: edges,
    defaultNodes: defaultNodes,
    defaultEdges: defaultEdges,
    onConnect: onConnect,
    onConnectStart: onConnectStart,
    onConnectStop: onConnectStop,
    onConnectEnd: onConnectEnd,
    nodesDraggable: nodesDraggable,
    nodesConnectable: nodesConnectable,
    elementsSelectable: elementsSelectable,
    minZoom: minZoom,
    maxZoom: maxZoom,
    nodeExtent: nodeExtent,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    snapToGrid: snapToGrid,
    snapGrid: snapGrid,
    connectionMode: connectionMode,
    translateExtent: translateExtent,
    connectOnClick: connectOnClick,
    defaultEdgeOptions: defaultEdgeOptions,
    fitView: fitView,
    fitViewOptions: fitViewOptions,
    onNodesDelete: onNodesDelete,
    onEdgesDelete: onEdgesDelete
  }), onSelectionChange && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(SelectionListener$1, {
    onSelectionChange: onSelectionChange
  }), children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Attribution, {
    proOptions: proOptions,
    position: attributionPosition
  })));
});
ReactFlow.displayName = 'ReactFlow';

var ReactFlowProvider = function ReactFlowProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["o"], {
    createStore: _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["p"]
  }, children);
};

ReactFlowProvider.displayName = 'ReactFlowProvider';

function createUseItemsState(applyChanges) {
  return function (initialItems) {
    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(initialItems),
        _useState2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useState, 2),
        items = _useState2[0],
        setItems = _useState2[1];

    var onItemsChange = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (changes) {
      return setItems(function (items) {
        return applyChanges(changes, items);
      });
    }, []);
    return [items, setItems, onItemsChange];
  };
}

var useNodesState = createUseItemsState(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["s"]);
var useEdgesState = createUseItemsState(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["q"]);


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/index2.js":
/*!**************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/index2.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classcat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classcat */ "../node_modules/classcat/index.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand/shallow */ "../node_modules/zustand/shallow.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(zustand_shallow__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");








var MiniMapNode = function MiniMapNode(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style,
      color = _ref.color,
      strokeColor = _ref.strokeColor,
      strokeWidth = _ref.strokeWidth,
      className = _ref.className,
      borderRadius = _ref.borderRadius,
      shapeRendering = _ref.shapeRendering;

  var _ref2 = style || {},
      background = _ref2.background,
      backgroundColor = _ref2.backgroundColor;

  var fill = color || background || backgroundColor;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", {
    className: Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__minimap-node', className]),
    x: x,
    y: y,
    rx: borderRadius,
    ry: borderRadius,
    width: width,
    height: height,
    fill: fill,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    shapeRendering: shapeRendering
  });
};

MiniMapNode.displayName = 'MiniMapNode';
var MiniMapNode$1 = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["memo"])(MiniMapNode);

var defaultWidth = 200;
var defaultHeight = 150;

var selector = function selector(s) {
  return {
    width: s.width,
    height: s.height,
    transform: s.transform,
    nodeInternals: s.nodeInternals
  };
};

var MiniMap = function MiniMap(_ref) {
  var style = _ref.style,
      className = _ref.className,
      _ref$nodeStrokeColor = _ref.nodeStrokeColor,
      nodeStrokeColor = _ref$nodeStrokeColor === void 0 ? '#555' : _ref$nodeStrokeColor,
      _ref$nodeColor = _ref.nodeColor,
      nodeColor = _ref$nodeColor === void 0 ? '#fff' : _ref$nodeColor,
      _ref$nodeClassName = _ref.nodeClassName,
      nodeClassName = _ref$nodeClassName === void 0 ? '' : _ref$nodeClassName,
      _ref$nodeBorderRadius = _ref.nodeBorderRadius,
      nodeBorderRadius = _ref$nodeBorderRadius === void 0 ? 5 : _ref$nodeBorderRadius,
      _ref$nodeStrokeWidth = _ref.nodeStrokeWidth,
      nodeStrokeWidth = _ref$nodeStrokeWidth === void 0 ? 2 : _ref$nodeStrokeWidth,
      _ref$maskColor = _ref.maskColor,
      maskColor = _ref$maskColor === void 0 ? 'rgb(240, 242, 243, 0.7)' : _ref$maskColor;

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector, zustand_shallow__WEBPACK_IMPORTED_MODULE_3___default.a),
      containerWidth = _useStore.width,
      containerHeight = _useStore.height,
      transform = _useStore.transform,
      nodeInternals = _useStore.nodeInternals;

  var _transform = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(transform, 3),
      tX = _transform[0],
      tY = _transform[1],
      tScale = _transform[2];

  var mapClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__minimap', className]);
  var elementWidth = (style === null || style === void 0 ? void 0 : style.width) || defaultWidth;
  var elementHeight = (style === null || style === void 0 ? void 0 : style.height) || defaultHeight;
  var nodeColorFunc = nodeColor instanceof Function ? nodeColor : function () {
    return nodeColor;
  };
  var nodeStrokeColorFunc = nodeStrokeColor instanceof Function ? nodeStrokeColor : function () {
    return nodeStrokeColor;
  };
  var nodeClassNameFunc = nodeClassName instanceof Function ? nodeClassName : function () {
    return nodeClassName;
  };
  var hasNodes = nodeInternals && nodeInternals.size > 0; // @TODO: work with nodeInternals instead of converting it to an array

  var nodes = Array.from(nodeInternals).map(function (_ref2) {
    var _ref3 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref2, 2);
        _ref3[0];
        var node = _ref3[1];

    return node;
  });
  var bb = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["l"])(nodes);
  var viewBB = {
    x: -tX / tScale,
    y: -tY / tScale,
    width: containerWidth / tScale,
    height: containerHeight / tScale
  };
  var boundingRect = hasNodes ? Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["A"])(bb, viewBB) : viewBB;
  var scaledWidth = boundingRect.width / elementWidth;
  var scaledHeight = boundingRect.height / elementHeight;
  var viewScale = Math.max(scaledWidth, scaledHeight);
  var viewWidth = viewScale * elementWidth;
  var viewHeight = viewScale * elementHeight;
  var offset = 5 * viewScale;
  var x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
  var y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
  var width = viewWidth + offset * 2;
  var height = viewHeight + offset * 2;
  var shapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", {
    width: elementWidth,
    height: elementHeight,
    viewBox: "".concat(x, " ").concat(y, " ").concat(width, " ").concat(height),
    style: style,
    className: mapClasses
  }, Array.from(nodeInternals).filter(function (_ref4) {
    var _ref5 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref4, 2);
        _ref5[0];
        var node = _ref5[1];

    return !node.hidden && node.width && node.height;
  }).map(function (_ref6) {
    var _nodeInternals$get;

    var _ref7 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_ref6, 2);
        _ref7[0];
        var node = _ref7[1];

    var positionAbsolute = (_nodeInternals$get = nodeInternals.get(node.id)) === null || _nodeInternals$get === void 0 ? void 0 : _nodeInternals$get.positionAbsolute;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MiniMapNode$1, {
      key: node.id,
      x: (positionAbsolute === null || positionAbsolute === void 0 ? void 0 : positionAbsolute.x) || 0,
      y: (positionAbsolute === null || positionAbsolute === void 0 ? void 0 : positionAbsolute.y) || 0,
      width: node.width,
      height: node.height,
      style: node.style,
      className: nodeClassNameFunc(node),
      color: nodeColorFunc(node),
      borderRadius: nodeBorderRadius,
      strokeColor: nodeStrokeColorFunc(node),
      strokeWidth: nodeStrokeWidth,
      shapeRendering: shapeRendering
    });
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    className: "react-flow__minimap-mask",
    d: "M".concat(x - offset, ",").concat(y - offset, "h").concat(width + offset * 2, "v").concat(height + offset * 2, "h").concat(-width - offset * 2, "z\n        M").concat(viewBB.x, ",").concat(viewBB.y, "h").concat(viewBB.width, "v").concat(viewBB.height, "h").concat(-viewBB.width, "z"),
    fill: maskColor,
    fillRule: "evenodd"
  }));
};

MiniMap.displayName = 'MiniMap';
var index = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["memo"])(MiniMap);


//# sourceMappingURL=index2.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/index3.js":
/*!**************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/index3.js ***!
  \**************************************************************/
/*! exports provided: ControlButton, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlButton", function() { return ControlButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var _useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useReactFlow-ad36feba.js */ "../node_modules/react-flow-renderer/dist/esm/useReactFlow-ad36feba.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classcat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classcat */ "../node_modules/classcat/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! zustand/shallow */ "../node_modules/zustand/shallow.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(zustand_shallow__WEBPACK_IMPORTED_MODULE_7__);










var _path$4;

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var SvgPlus = function SvgPlus(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("path", {
    d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"
  })));
};

var _path$3;

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var SvgMinus = function SvgMinus(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 5"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("path", {
    d: "M0 0h32v4.2H0z"
  })));
};

var _path$2;

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var SvgFitview = function SvgFitview(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 30"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("path", {
    d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0 0 27.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94a.919.919 0 0 1-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"
  })));
};

var _path$1;

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var SvgLock = function SvgLock(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("path", {
    d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.533a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"
  })));
};

var _path;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgUnlock = function SvgUnlock(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("path", {
    d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.533a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047z"
  })));
};

var _excluded = ["children", "className"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ControlButton = function ControlButton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      rest = Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["a"])(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", _objectSpread({
    type: "button",
    className: Object(classcat__WEBPACK_IMPORTED_MODULE_3__["default"])(['react-flow__controls-button', className])
  }, rest), children);
};

var isInteractiveSelector = function isInteractiveSelector(s) {
  return s.nodesDraggable && s.nodesConnectable && s.elementsSelectable;
};

var Controls = function Controls(_ref2) {
  var style = _ref2.style,
      _ref2$showZoom = _ref2.showZoom,
      showZoom = _ref2$showZoom === void 0 ? true : _ref2$showZoom,
      _ref2$showFitView = _ref2.showFitView,
      showFitView = _ref2$showFitView === void 0 ? true : _ref2$showFitView,
      _ref2$showInteractive = _ref2.showInteractive,
      showInteractive = _ref2$showInteractive === void 0 ? true : _ref2$showInteractive,
      fitViewOptions = _ref2.fitViewOptions,
      onZoomIn = _ref2.onZoomIn,
      onZoomOut = _ref2.onZoomOut,
      onFitView = _ref2.onFitView,
      onInteractiveChange = _ref2.onInteractiveChange,
      className = _ref2.className,
      children = _ref2.children;
  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      _useState2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useState, 2),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var isInteractive = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(isInteractiveSelector);

  var _useReactFlow = Object(_useReactFlow_ad36feba_js__WEBPACK_IMPORTED_MODULE_1__["u"])(),
      zoomIn = _useReactFlow.zoomIn,
      zoomOut = _useReactFlow.zoomOut,
      fitView = _useReactFlow.fitView;

  var mapClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_3__["default"])(['react-flow__controls', className]);
  var onZoomInHandler = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    zoomIn === null || zoomIn === void 0 ? void 0 : zoomIn();
    onZoomIn === null || onZoomIn === void 0 ? void 0 : onZoomIn();
  }, [zoomIn, onZoomIn]);
  var onZoomOutHandler = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    zoomOut === null || zoomOut === void 0 ? void 0 : zoomOut();
    onZoomOut === null || onZoomOut === void 0 ? void 0 : onZoomOut();
  }, [zoomOut, onZoomOut]);
  var onFitViewHandler = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    fitView === null || fitView === void 0 ? void 0 : fitView(fitViewOptions);
    onFitView === null || onFitView === void 0 ? void 0 : onFitView();
  }, [fitView, fitViewOptions, onFitView]);
  var onInteractiveChangeHandler = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive
    });
    onInteractiveChange === null || onInteractiveChange === void 0 ? void 0 : onInteractiveChange(!isInteractive);
  }, [isInteractive, onInteractiveChange]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    setIsVisible(true);
  }, []);

  if (!isVisible) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: mapClasses,
    style: style
  }, showZoom && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ControlButton, {
    onClick: onZoomInHandler,
    className: "react-flow__controls-zoomin",
    title: "zoom in",
    "aria-label": "zoom in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SvgPlus, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ControlButton, {
    onClick: onZoomOutHandler,
    className: "react-flow__controls-zoomout",
    title: "zoom out",
    "aria-label": "zoom out"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SvgMinus, null))), showFitView && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ControlButton, {
    className: "react-flow__controls-fitview",
    onClick: onFitViewHandler,
    title: "fit view",
    "aria-label": "fit view"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SvgFitview, null)), showInteractive && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ControlButton, {
    className: "react-flow__controls-interactive",
    onClick: onInteractiveChangeHandler,
    title: "toggle interactivity",
    "aria-label": "toggle interactivity"
  }, isInteractive ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SvgUnlock, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SvgLock, null)), children);
};

Controls.displayName = 'Controls';
var index = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_2__["memo"])(Controls);


//# sourceMappingURL=index3.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/index4.js":
/*!**************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/index4.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classcat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classcat */ "../node_modules/classcat/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");







var createGridLinesPath = function createGridLinesPath(size, strokeWidth, stroke) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    stroke: stroke,
    strokeWidth: strokeWidth,
    d: "M".concat(size / 2, " 0 V").concat(size, " M0 ").concat(size / 2, " H").concat(size)
  });
};
var createGridDotsPath = function createGridDotsPath(size, fill) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("circle", {
    cx: size,
    cy: size,
    r: size,
    fill: fill
  });
};

var _defaultColors;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var defaultColors = (_defaultColors = {}, Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(_defaultColors, _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["B"].Dots, '#81818a'), Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(_defaultColors, _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["B"].Lines, '#eee'), _defaultColors);

var transformSelector = function transformSelector(s) {
  return s.transform;
};

var Background = function Background(_ref) {
  var _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["B"].Dots : _ref$variant,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 15 : _ref$gap,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 0.4 : _ref$size,
      color = _ref.color,
      style = _ref.style,
      className = _ref.className;

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(transformSelector),
      _useStore2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_useStore, 3),
      x = _useStore2[0],
      y = _useStore2[1],
      scale = _useStore2[2]; // when there are multiple flows on a page we need to make sure that every background gets its own pattern.


  var patternId = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    return "pattern-".concat(Math.floor(Math.random() * 100000));
  }, []);
  var bgClasses = Object(classcat__WEBPACK_IMPORTED_MODULE_2__["default"])(['react-flow__background', 'react-flow__container', className]);
  var scaledGap = gap * scale;
  var xOffset = x % scaledGap;
  var yOffset = y % scaledGap;
  var isLines = variant === _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["B"].Lines;
  var bgColor = color ? color : defaultColors[variant];
  var path = isLines ? createGridLinesPath(scaledGap, size, bgColor) : createGridDotsPath(size * scale, bgColor);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", {
    className: bgClasses,
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: '100%',
      height: '100%'
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pattern", {
    id: patternId,
    x: xOffset,
    y: yOffset,
    width: scaledGap,
    height: scaledGap,
    patternUnits: "userSpaceOnUse"
  }, path), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "url(#".concat(patternId, ")")
  }));
};

Background.displayName = 'Background';
var index = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["memo"])(Background);


//# sourceMappingURL=index4.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/useEdges.js":
/*!****************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/useEdges.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useEdges; });
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");





var edgesSelector = function edgesSelector(state) {
  return state.edges;
};

function useEdges() {
  var edges = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(edgesSelector);
  return edges;
}


//# sourceMappingURL=useEdges.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/useNodes.js":
/*!****************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/useNodes.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useNodes; });
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");





var nodesSelector = function nodesSelector(state) {
  return Array.from(state.nodeInternals.values());
};

function useNodes() {
  var nodes = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(nodesSelector);
  return nodes;
}


//# sourceMappingURL=useNodes.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/useReactFlow-ad36feba.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/useReactFlow-ad36feba.js ***!
  \*****************************************************************************/
/*! exports provided: _, a, u */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_", function() { return _toConsumableArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectWithoutProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return useReactFlow; });
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand/shallow */ "../node_modules/zustand/shallow.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(zustand_shallow__WEBPACK_IMPORTED_MODULE_3__);





function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["D"])(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["E"])(arr) || _nonIterableSpread();
}

var initialViewportHelper = {
  zoomIn: function zoomIn() {},
  zoomOut: function zoomOut() {},
  zoomTo: function zoomTo(_) {},
  getZoom: function getZoom() {
    return 1;
  },
  setViewport: function setViewport(_) {},
  getViewport: function getViewport() {
    return {
      x: 0,
      y: 0,
      zoom: 1
    };
  },
  fitView: function fitView() {
  },
  setCenter: function setCenter(_, __) {},
  fitBounds: function fitBounds(_) {},
  project: function project(position) {
    return position;
  },
  initialized: false
};

var selector = function selector(s) {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection
  };
};

var useViewportHelper = function useViewportHelper() {
  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();

  var _useStore = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["b"])(selector, zustand_shallow__WEBPACK_IMPORTED_MODULE_3___default.a),
      d3Zoom = _useStore.d3Zoom,
      d3Selection = _useStore.d3Selection;

  var viewportHelperFunctions = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
    if (d3Selection && d3Zoom) {
      return {
        zoomIn: function zoomIn(options) {
          return d3Zoom.scaleBy(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["F"])(d3Selection, options === null || options === void 0 ? void 0 : options.duration), 1.2);
        },
        zoomOut: function zoomOut(options) {
          return d3Zoom.scaleBy(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["F"])(d3Selection, options === null || options === void 0 ? void 0 : options.duration), 1 / 1.2);
        },
        zoomTo: function zoomTo(zoomLevel, options) {
          return d3Zoom.scaleTo(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["F"])(d3Selection, options === null || options === void 0 ? void 0 : options.duration), zoomLevel);
        },
        getZoom: function getZoom() {
          var _store$getState$trans = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(store.getState().transform, 3),
              zoom = _store$getState$trans[2];

          return zoom;
        },
        setViewport: function setViewport(transform, options) {
          var nextTransform = d3_zoom__WEBPACK_IMPORTED_MODULE_2__["zoomIdentity"].translate(transform.x, transform.y).scale(transform.zoom);
          d3Zoom.transform(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["F"])(d3Selection, options === null || options === void 0 ? void 0 : options.duration), nextTransform);
        },
        getViewport: function getViewport() {
          var _store$getState$trans2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(store.getState().transform, 3),
              x = _store$getState$trans2[0],
              y = _store$getState$trans2[1],
              zoom = _store$getState$trans2[2];

          return {
            x: x,
            y: y,
            zoom: zoom
          };
        },
        fitView: function fitView$1(options) {
          return Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["G"])(store.getState, options);
        },
        setCenter: function setCenter(x, y, options) {
          var _store$getState = store.getState(),
              width = _store$getState.width,
              height = _store$getState.height,
              maxZoom = _store$getState.maxZoom;

          var nextZoom = typeof (options === null || options === void 0 ? void 0 : options.zoom) !== 'undefined' ? options.zoom : maxZoom;
          var centerX = width / 2 - x * nextZoom;
          var centerY = height / 2 - y * nextZoom;
          var transform = d3_zoom__WEBPACK_IMPORTED_MODULE_2__["zoomIdentity"].translate(centerX, centerY).scale(nextZoom);
          d3Zoom.transform(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["F"])(d3Selection, options === null || options === void 0 ? void 0 : options.duration), transform);
        },
        fitBounds: function fitBounds(bounds, options) {
          var _options$padding;

          var _store$getState2 = store.getState(),
              width = _store$getState2.width,
              height = _store$getState2.height,
              minZoom = _store$getState2.minZoom,
              maxZoom = _store$getState2.maxZoom;

          var _getTransformForBound = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["z"])(bounds, width, height, minZoom, maxZoom, (_options$padding = options === null || options === void 0 ? void 0 : options.padding) !== null && _options$padding !== void 0 ? _options$padding : 0.1),
              _getTransformForBound2 = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(_getTransformForBound, 3),
              x = _getTransformForBound2[0],
              y = _getTransformForBound2[1],
              zoom = _getTransformForBound2[2];

          var transform = d3_zoom__WEBPACK_IMPORTED_MODULE_2__["zoomIdentity"].translate(x, y).scale(zoom);
          d3Zoom.transform(Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["F"])(d3Selection, options === null || options === void 0 ? void 0 : options.duration), transform);
        },
        project: function project(position) {
          var _store$getState3 = store.getState(),
              transform = _store$getState3.transform,
              snapToGrid = _store$getState3.snapToGrid,
              snapGrid = _store$getState3.snapGrid;

          return Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["H"])(position, transform, snapToGrid, snapGrid);
        },
        initialized: true
      };
    }

    return initialViewportHelper;
  }, [d3Zoom, d3Selection]);
  return viewportHelperFunctions;
};

var _excluded = ["initialized"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["a"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useReactFlow() {
  var _useViewportHelper = useViewportHelper(),
      viewportInitialized = _useViewportHelper.initialized,
      viewportHelperFunctions = _objectWithoutProperties(_useViewportHelper, _excluded);

  var store = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["u"])();
  var getNodes = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    var _store$getState = store.getState(),
        nodeInternals = _store$getState.nodeInternals;

    var nodes = Array.from(nodeInternals.values());
    return nodes.map(function (n) {
      return _objectSpread({}, n);
    });
  }, []);
  var getNode = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (id) {
    var _store$getState2 = store.getState(),
        nodeInternals = _store$getState2.nodeInternals;

    return nodeInternals.get(id);
  }, []);
  var getEdges = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    var _store$getState3 = store.getState(),
        _store$getState3$edge = _store$getState3.edges,
        edges = _store$getState3$edge === void 0 ? [] : _store$getState3$edge;

    return edges.map(function (e) {
      return _objectSpread({}, e);
    });
  }, []);
  var getEdge = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (id) {
    var _store$getState4 = store.getState(),
        _store$getState4$edge = _store$getState4.edges,
        edges = _store$getState4$edge === void 0 ? [] : _store$getState4$edge;

    return edges.find(function (e) {
      return e.id === id;
    });
  }, []);
  var setNodes = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (payload) {
    var _store$getState5 = store.getState(),
        nodeInternals = _store$getState5.nodeInternals,
        setNodes = _store$getState5.setNodes,
        hasDefaultNodes = _store$getState5.hasDefaultNodes,
        onNodesChange = _store$getState5.onNodesChange;

    var nodes = Array.from(nodeInternals.values());
    var nextNodes = typeof payload === 'function' ? payload(nodes) : payload;

    if (hasDefaultNodes) {
      setNodes(nextNodes);
    } else if (onNodesChange) {
      var changes = nextNodes.map(function (node) {
        return {
          item: node,
          type: 'reset'
        };
      });
      onNodesChange(changes);
    }
  }, []);
  var setEdges = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (payload) {
    var _store$getState6 = store.getState(),
        _store$getState6$edge = _store$getState6.edges,
        edges = _store$getState6$edge === void 0 ? [] : _store$getState6$edge,
        setEdges = _store$getState6.setEdges,
        hasDefaultEdges = _store$getState6.hasDefaultEdges,
        onEdgesChange = _store$getState6.onEdgesChange;

    var nextEdges = typeof payload === 'function' ? payload(edges) : payload;

    if (hasDefaultEdges) {
      setEdges(nextEdges);
    } else if (onEdgesChange) {
      var changes = nextEdges.map(function (edge) {
        return {
          item: edge,
          type: 'reset'
        };
      });
      onEdgesChange(changes);
    }
  }, []);
  var addNodes = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (payload) {
    var nodes = Array.isArray(payload) ? payload : [payload];

    var _store$getState7 = store.getState(),
        nodeInternals = _store$getState7.nodeInternals,
        setNodes = _store$getState7.setNodes,
        hasDefaultNodes = _store$getState7.hasDefaultNodes,
        onNodesChange = _store$getState7.onNodesChange;

    if (hasDefaultNodes) {
      var currentNodes = Array.from(nodeInternals.values());
      var nextNodes = [].concat(_toConsumableArray(currentNodes), _toConsumableArray(nodes));
      setNodes(nextNodes);
    } else if (onNodesChange) {
      var changes = nodes.map(function (node) {
        return {
          item: node,
          type: 'add'
        };
      });
      onNodesChange(changes);
    }
  }, []);
  var addEdges = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (payload) {
    var nextEdges = Array.isArray(payload) ? payload : [payload];

    var _store$getState8 = store.getState(),
        _store$getState8$edge = _store$getState8.edges,
        edges = _store$getState8$edge === void 0 ? [] : _store$getState8$edge,
        setEdges = _store$getState8.setEdges,
        hasDefaultEdges = _store$getState8.hasDefaultEdges,
        onEdgesChange = _store$getState8.onEdgesChange;

    if (hasDefaultEdges) {
      setEdges([].concat(_toConsumableArray(edges), _toConsumableArray(nextEdges)));
    } else if (onEdgesChange) {
      var changes = nextEdges.map(function (edge) {
        return {
          item: edge,
          type: 'add'
        };
      });
      onEdgesChange(changes);
    }
  }, []);
  var toObject = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    var _store$getState9 = store.getState(),
        nodeInternals = _store$getState9.nodeInternals,
        _store$getState9$edge = _store$getState9.edges,
        edges = _store$getState9$edge === void 0 ? [] : _store$getState9$edge,
        transform = _store$getState9.transform;

    var nodes = Array.from(nodeInternals.values());

    var _transform = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_0__["_"])(transform, 3),
        x = _transform[0],
        y = _transform[1],
        zoom = _transform[2];

    return {
      nodes: nodes.map(function (n) {
        return _objectSpread({}, n);
      }),
      edges: edges.map(function (e) {
        return _objectSpread({}, e);
      }),
      viewport: {
        x: x,
        y: y,
        zoom: zoom
      }
    };
  }, []);
  return _objectSpread(_objectSpread({}, viewportHelperFunctions), {}, {
    viewportInitialized: viewportInitialized,
    getNodes: getNodes,
    getNode: getNode,
    getEdges: getEdges,
    getEdge: getEdge,
    setNodes: setNodes,
    setEdges: setEdges,
    addNodes: addNodes,
    addEdges: addEdges,
    toObject: toObject
  });
}


//# sourceMappingURL=useReactFlow-ad36feba.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/useUpdateNodeInternals.js":
/*!******************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/useUpdateNodeInternals.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useUpdateNodeInternals; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");






var selector = function selector(state) {
  return state.updateNodeDimensions;
};

function useUpdateNodeInternals() {
  var updateNodeDimensions = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_1__["b"])(selector);
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (id) {
    var nodeElement = document.querySelector(".react-flow__node[data-id=\"".concat(id, "\"]"));

    if (nodeElement) {
      updateNodeDimensions([{
        id: id,
        nodeElement: nodeElement,
        forceUpdate: true
      }]);
    }
  }, []);
}


//# sourceMappingURL=useUpdateNodeInternals.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/dist/esm/useViewport.js":
/*!*******************************************************************!*\
  !*** ../node_modules/react-flow-renderer/dist/esm/useViewport.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useViewport; });
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand/shallow */ "../node_modules/zustand/shallow.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zustand_shallow__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_5236d2af_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-5236d2af.js */ "../node_modules/react-flow-renderer/dist/esm/index-5236d2af.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/index.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(zustand__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand/context */ "../node_modules/zustand/context.js");
/* harmony import */ var zustand_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(zustand_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-zoom */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js");






var viewportSelector = function viewportSelector(state) {
  return {
    x: state.transform[0],
    y: state.transform[1],
    zoom: state.transform[2]
  };
};

function useViewport() {
  var viewport = Object(_index_5236d2af_js__WEBPACK_IMPORTED_MODULE_1__["b"])(viewportSelector, zustand_shallow__WEBPACK_IMPORTED_MODULE_0___default.a);
  return viewport;
}


//# sourceMappingURL=useViewport.js.map


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/constant.js":
/*!********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-drag/src/constant.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (x => () => x);


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/drag.js":
/*!****************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-drag/src/drag.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ "../node_modules/d3-dispatch/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _nodrag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodrag.js */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/nodrag.js");
/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./noevent.js */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/noevent.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constant.js */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/constant.js");
/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./event.js */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/event.js");







// Ignore right-click, since that should open the context menu.
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(event, d) {
  return d == null ? {x: event.x, y: event.y} : d;
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var filter = defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable,
      gestures = {},
      listeners = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved, _noevent_js__WEBPACK_IMPORTED_MODULE_3__["nonpassive"])
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(event.view)
      .on("mousemove.drag", mousemoved, _noevent_js__WEBPACK_IMPORTED_MODULE_3__["nonpassivecapture"])
      .on("mouseup.drag", mouseupped, _noevent_js__WEBPACK_IMPORTED_MODULE_3__["nonpassivecapture"]);
    Object(_nodrag_js__WEBPACK_IMPORTED_MODULE_2__["default"])(event.view);
    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__["nopropagation"])(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }

  function mousemoved(event) {
    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }

  function mouseupped(event) {
    Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(event.view).on("mousemove.drag mouseup.drag", null);
    Object(_nodrag_js__WEBPACK_IMPORTED_MODULE_2__["yesdrag"])(event.view, mousemoving);
    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(event);
    gestures.mouse("end", event);
  }

  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
        c = container.call(this, event, d),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__["nopropagation"])(event);
        gesture("start", event, touches[i]);
      }
    }
  }

  function touchmoved(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(event);
        gesture("drag", event, touches[i]);
      }
    }
  }

  function touchended(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        Object(_noevent_js__WEBPACK_IMPORTED_MODULE_3__["nopropagation"])(event);
        gesture("end", event, touches[i]);
      }
    }
  }

  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["pointer"])(touch || event, container), dx, dy,
        s;

    if ((s = subject.call(that, new _event_js__WEBPACK_IMPORTED_MODULE_5__["default"]("beforestart", {
        sourceEvent: event,
        target: drag,
        identifier,
        active,
        x: p[0],
        y: p[1],
        dx: 0,
        dy: 0,
        dispatch
      }), d)) == null) return;

    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;

    return function gesture(type, event, touch) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[identifier] = gesture, n = active++; break;
        case "end": delete gestures[identifier], --active; // falls through
        case "drag": p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["pointer"])(touch || event, container), n = active; break;
      }
      dispatch.call(
        type,
        that,
        new _event_js__WEBPACK_IMPORTED_MODULE_5__["default"](type, {
          sourceEvent: event,
          subject: s,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch
        }),
        d
      );
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__["default"])(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_4__["default"])(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/event.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-drag/src/event.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DragEvent; });
function DragEvent(type, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x, y, dx, dy,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    subject: {value: subject, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    identifier: {value: identifier, enumerable: true, configurable: true},
    active: {value: active, enumerable: true, configurable: true},
    x: {value: x, enumerable: true, configurable: true},
    y: {value: y, enumerable: true, configurable: true},
    dx: {value: dx, enumerable: true, configurable: true},
    dy: {value: dy, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-drag/src/index.js ***!
  \*****************************************************************************/
/*! exports provided: drag, dragDisable, dragEnable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag.js */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/drag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drag", function() { return _drag_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _nodrag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodrag.js */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/nodrag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragDisable", function() { return _nodrag_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragEnable", function() { return _nodrag_js__WEBPACK_IMPORTED_MODULE_1__["yesdrag"]; });





/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/nodrag.js":
/*!******************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-drag/src/nodrag.js ***!
  \******************************************************************************/
/*! exports provided: default, yesdrag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yesdrag", function() { return yesdrag; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noevent.js */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/noevent.js");



/* harmony default export */ __webpack_exports__["default"] = (function(view) {
  var root = view.document.documentElement,
      selection = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(view).on("dragstart.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__["default"], _noevent_js__WEBPACK_IMPORTED_MODULE_1__["nonpassivecapture"]);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__["default"], _noevent_js__WEBPACK_IMPORTED_MODULE_1__["nonpassivecapture"]);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
});

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__["default"], _noevent_js__WEBPACK_IMPORTED_MODULE_1__["nonpassivecapture"]);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/noevent.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-drag/src/noevent.js ***!
  \*******************************************************************************/
/*! exports provided: nonpassive, nonpassivecapture, nopropagation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonpassive", function() { return nonpassive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonpassivecapture", function() { return nonpassivecapture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nopropagation", function() { return nopropagation; });
// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassive = {passive: false};
const nonpassivecapture = {capture: true, passive: false};

function nopropagation(event) {
  event.stopImmediatePropagation();
}

/* harmony default export */ __webpack_exports__["default"] = (function(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/array.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/array.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return array; });
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/constant.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/constant.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/create.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/create.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./creator.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/creator.js");
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/select.js");



/* harmony default export */ __webpack_exports__["default"] = (function(name) {
  return Object(_select_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_creator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name).call(document.documentElement));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/creator.js":
/*!************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/creator.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespace.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespace.js");
/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./namespaces.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespaces.js");



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === _namespaces_js__WEBPACK_IMPORTED_MODULE_1__["xhtml"] && document.documentElement.namespaceURI === _namespaces_js__WEBPACK_IMPORTED_MODULE_1__["xhtml"]
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name) {
  var fullname = Object(_namespace_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js ***!
  \**********************************************************************************/
/*! exports provided: create, creator, local, matcher, namespace, namespaces, pointer, pointers, select, selectAll, selection, selector, selectorAll, style, window */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/create.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "create", function() { return _create_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./creator.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/creator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "creator", function() { return _creator_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _local_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/local.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "local", function() { return _local_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./matcher.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/matcher.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matcher", function() { return _matcher_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./namespace.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespace.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return _namespace_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./namespaces.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespaces.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "namespaces", function() { return _namespaces_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _pointer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pointer.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/pointer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pointer", function() { return _pointer_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _pointers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pointers.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/pointers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pointers", function() { return _pointers_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/select.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _select_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./selectAll.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selectAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectAll", function() { return _selectAll_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./selection/index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return _selection_index_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./selector.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selector", function() { return _selector_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _selectorAll_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./selectorAll.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selectorAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectorAll", function() { return _selectorAll_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _selection_style_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./selection/style.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/style.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "style", function() { return _selection_style_js__WEBPACK_IMPORTED_MODULE_13__["styleValue"]; });

/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./window.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/window.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "window", function() { return _window_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });


















/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/local.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/local.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return local; });
var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/matcher.js":
/*!************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/matcher.js ***!
  \************************************************************************************/
/*! exports provided: default, childMatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "childMatcher", function() { return childMatcher; });
/* harmony default export */ __webpack_exports__["default"] = (function(selector) {
  return function() {
    return this.matches(selector);
  };
});

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}



/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespace.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespace.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespaces.js");


/* harmony default export */ __webpack_exports__["default"] = (function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProperty(prefix) ? {space: _namespaces_js__WEBPACK_IMPORTED_MODULE_0__["default"][prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespaces.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespaces.js ***!
  \***************************************************************************************/
/*! exports provided: xhtml, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xhtml", function() { return xhtml; });
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ __webpack_exports__["default"] = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/pointer.js":
/*!************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/pointer.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceEvent.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/sourceEvent.js");


/* harmony default export */ __webpack_exports__["default"] = (function(event, node) {
  event = Object(_sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/pointers.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/pointers.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pointer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pointer.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/pointer.js");
/* harmony import */ var _sourceEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sourceEvent.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/sourceEvent.js");



/* harmony default export */ __webpack_exports__["default"] = (function(events, node) {
  if (events.target) { // i.e., instanceof Event, not TouchList or iterable
    events = Object(_sourceEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => Object(_pointer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(event, node));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/select.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/select.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function(selector) {
  return typeof selector === "string"
      ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"]([[document.querySelector(selector)]], [document.documentElement])
      : new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"]([[selector]], _selection_index_js__WEBPACK_IMPORTED_MODULE_0__["root"]);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selectAll.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selectAll.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/array.js");
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selection/index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function(selector) {
  return typeof selector === "string"
      ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_1__["Selection"]([document.querySelectorAll(selector)], [document.documentElement])
      : new _selection_index_js__WEBPACK_IMPORTED_MODULE_1__["Selection"]([Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["default"])(selector)], _selection_index_js__WEBPACK_IMPORTED_MODULE_1__["root"]);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/append.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/append.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/creator.js");


/* harmony default export */ __webpack_exports__["default"] = (function(name) {
  var create = typeof name === "function" ? name : Object(_creator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/attr.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/attr.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../namespace.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/namespace.js");


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value) {
  var fullname = Object(_namespace_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/call.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/call.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/classed.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/classed.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/clone.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/clone.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

/* harmony default export */ __webpack_exports__["default"] = (function(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/data.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/data.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enter.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/enter.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/constant.js");




function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_1__["EnterNode"](parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_1__["EnterNode"](parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

/* harmony default export */ __webpack_exports__["default"] = (function(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = Object(_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new _index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"](update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
});

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/datum.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/datum.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/dispatch.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/dispatch.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/window.js");


function dispatchEvent(node, type, params) {
  var window = Object(_window_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/each.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/each.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/empty.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/empty.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {
  return !this.node();
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/enter.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/enter.js ***!
  \********************************************************************************************/
/*! exports provided: default, EnterNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnterNode", function() { return EnterNode; });
/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sparse.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/sparse.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function() {
  return new _index_js__WEBPACK_IMPORTED_MODULE_1__["Selection"](this._enter || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_0__["default"]), this._parents);
});

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/exit.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/exit.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sparse.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/sparse.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function() {
  return new _index_js__WEBPACK_IMPORTED_MODULE_1__["Selection"](this._exit || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_0__["default"]), this._parents);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/filter.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/filter.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../matcher.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/matcher.js");



/* harmony default export */ __webpack_exports__["default"] = (function(match) {
  if (typeof match !== "function") match = Object(_matcher_js__WEBPACK_IMPORTED_MODULE_1__["default"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"](subgroups, this._parents);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/html.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/html.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js ***!
  \********************************************************************************************/
/*! exports provided: root, Selection, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "root", function() { return root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return Selection; });
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/select.js");
/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectAll.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectAll.js");
/* harmony import */ var _selectChild_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectChild.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectChild.js");
/* harmony import */ var _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectChildren.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectChildren.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/filter.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/data.js");
/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enter.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/enter.js");
/* harmony import */ var _exit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exit.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/exit.js");
/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./join.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/join.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./merge.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/merge.js");
/* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/order.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sort.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/sort.js");
/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./call.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/call.js");
/* harmony import */ var _nodes_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/nodes.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/node.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./size.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/size.js");
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./empty.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/empty.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./each.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/each.js");
/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./attr.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/attr.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./style.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/style.js");
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./property.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/property.js");
/* harmony import */ var _classed_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./classed.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/classed.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./text.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/text.js");
/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./html.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/html.js");
/* harmony import */ var _raise_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./raise.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/raise.js");
/* harmony import */ var _lower_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lower.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/lower.js");
/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./append.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/append.js");
/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./insert.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/insert.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./remove.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/remove.js");
/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./clone.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/clone.js");
/* harmony import */ var _datum_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./datum.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/datum.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./on.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/on.js");
/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./dispatch.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/dispatch.js");
/* harmony import */ var _iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./iterator.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/iterator.js");



































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectChild: _selectChild_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  selectChildren: _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  filter: _filter_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  data: _data_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  enter: _enter_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  exit: _exit_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  join: _join_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  merge: _merge_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  selection: selection_selection,
  order: _order_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  sort: _sort_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  call: _call_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  nodes: _nodes_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  node: _node_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  size: _size_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  empty: _empty_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  each: _each_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  attr: _attr_js__WEBPACK_IMPORTED_MODULE_18__["default"],
  style: _style_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  property: _property_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  classed: _classed_js__WEBPACK_IMPORTED_MODULE_21__["default"],
  text: _text_js__WEBPACK_IMPORTED_MODULE_22__["default"],
  html: _html_js__WEBPACK_IMPORTED_MODULE_23__["default"],
  raise: _raise_js__WEBPACK_IMPORTED_MODULE_24__["default"],
  lower: _lower_js__WEBPACK_IMPORTED_MODULE_25__["default"],
  append: _append_js__WEBPACK_IMPORTED_MODULE_26__["default"],
  insert: _insert_js__WEBPACK_IMPORTED_MODULE_27__["default"],
  remove: _remove_js__WEBPACK_IMPORTED_MODULE_28__["default"],
  clone: _clone_js__WEBPACK_IMPORTED_MODULE_29__["default"],
  datum: _datum_js__WEBPACK_IMPORTED_MODULE_30__["default"],
  on: _on_js__WEBPACK_IMPORTED_MODULE_31__["default"],
  dispatch: _dispatch_js__WEBPACK_IMPORTED_MODULE_32__["default"],
  [Symbol.iterator]: _iterator_js__WEBPACK_IMPORTED_MODULE_33__["default"]
};

/* harmony default export */ __webpack_exports__["default"] = (selection);


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/insert.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/insert.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/creator.js");
/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selector.js");



function constantNull() {
  return null;
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, before) {
  var create = typeof name === "function" ? name : Object(_creator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name),
      select = before == null ? constantNull : typeof before === "function" ? before : Object(_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/iterator.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/iterator.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function*() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/join.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/join.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/lower.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/lower.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return this.each(lower);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/merge.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/merge.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"](merges, this._parents);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/node.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/node.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/nodes.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/nodes.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Array.from(this);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/on.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/on.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/order.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/order.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/property.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/property.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/raise.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/raise.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return this.each(raise);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/remove.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/remove.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return this.each(remove);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/select.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/select.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selector.js");



/* harmony default export */ __webpack_exports__["default"] = (function(select) {
  if (typeof select !== "function") select = Object(_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"](subgroups, this._parents);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectAll.js":
/*!************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectAll.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../array.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/array.js");
/* harmony import */ var _selectorAll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../selectorAll.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selectorAll.js");




function arrayAll(select) {
  return function() {
    return Object(_array_js__WEBPACK_IMPORTED_MODULE_1__["default"])(select.apply(this, arguments));
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = Object(_selectorAll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"](subgroups, parents);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectChild.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectChild.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/matcher.js");


var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

/* harmony default export */ __webpack_exports__["default"] = (function(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : Object(_matcher_js__WEBPACK_IMPORTED_MODULE_0__["childMatcher"])(match)));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectChildren.js":
/*!*****************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/selectChildren.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/matcher.js");


var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : Object(_matcher_js__WEBPACK_IMPORTED_MODULE_0__["childMatcher"])(match)));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/size.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/size.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/sort.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/sort.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Selection"](sortgroups, this._parents).order();
});

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/sparse.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/sparse.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(update) {
  return new Array(update.length);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/style.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/style.js ***!
  \********************************************************************************************/
/*! exports provided: default, styleValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleValue", function() { return styleValue; });
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/window.js");


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
});

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || Object(_window_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).getComputedStyle(node, null).getPropertyValue(name);
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/text.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selection/text.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selector.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selector.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function none() {}

/* harmony default export */ __webpack_exports__["default"] = (function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/selectorAll.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/selectorAll.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function empty() {
  return [];
}

/* harmony default export */ __webpack_exports__["default"] = (function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/sourceEvent.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/sourceEvent.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/window.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-selection/src/window.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/active.js":
/*!************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/active.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");



var root = [null];

/* harmony default export */ __webpack_exports__["default"] = (function(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__["SCHEDULED"] && schedule.name === name) {
        return new _transition_index_js__WEBPACK_IMPORTED_MODULE_0__["Transition"]([[node]], root, name, +i);
      }
    }
  }

  return null;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/index.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/index.js ***!
  \***********************************************************************************/
/*! exports provided: transition, active, interrupt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/index.js");
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return _transition_index_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _active_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./active.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/active.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "active", function() { return _active_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interrupt.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/interrupt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interrupt", function() { return _interrupt_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/interrupt.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/interrupt.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


/* harmony default export */ __webpack_exports__["default"] = (function(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__["STARTING"] && schedule.state < _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__["ENDING"];
    schedule.state = _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__["ENDED"];
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/index.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/index.js ***!
  \*********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interrupt.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/interrupt.js");
/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transition.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/transition.js");




d3_selection__WEBPACK_IMPORTED_MODULE_0__["selection"].prototype.interrupt = _interrupt_js__WEBPACK_IMPORTED_MODULE_1__["default"];
d3_selection__WEBPACK_IMPORTED_MODULE_0__["selection"].prototype.transition = _transition_js__WEBPACK_IMPORTED_MODULE_2__["default"];


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/interrupt.js":
/*!*************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/interrupt.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interrupt.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/interrupt.js");


/* harmony default export */ __webpack_exports__["default"] = (function(name) {
  return this.each(function() {
    Object(_interrupt_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, name);
  });
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/transition.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/selection/transition.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transition/index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transition/schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");
/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-ease */ "../node_modules/d3-ease/src/index.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-timer */ "../node_modules/d3-timer/src/index.js");





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: d3_ease__WEBPACK_IMPORTED_MODULE_2__["easeCubicInOut"]
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

/* harmony default export */ __webpack_exports__["default"] = (function(name) {
  var id,
      timing;

  if (name instanceof _transition_index_js__WEBPACK_IMPORTED_MODULE_0__["Transition"]) {
    id = name._id, name = name._name;
  } else {
    id = Object(_transition_index_js__WEBPACK_IMPORTED_MODULE_0__["newId"])(), (timing = defaultTiming).time = Object(d3_timer__WEBPACK_IMPORTED_MODULE_3__["now"])(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        Object(_transition_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new _transition_index_js__WEBPACK_IMPORTED_MODULE_0__["Transition"](groups, this._parents, name, id);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/attr.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/attr.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ "../node_modules/d3-interpolate/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tween.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interpolate.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/interpolate.js");





function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value) {
  var fullname = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["namespace"])(name), i = fullname === "transform" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_0__["interpolateTransformSvg"] : _interpolate_js__WEBPACK_IMPORTED_MODULE_3__["default"];
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, Object(_tween_js__WEBPACK_IMPORTED_MODULE_2__["tweenValue"])(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/attrTween.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/attrTween.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");


function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["namespace"])(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/delay.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/delay.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


function delayFunction(id, value) {
  return function() {
    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["init"])(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["init"])(this, id).delay = value;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["get"])(this.node(), id).delay;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/duration.js":
/*!*************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/duration.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


function durationFunction(id, value) {
  return function() {
    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id).duration = value;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["get"])(this.node(), id).duration;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/ease.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/ease.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id).ease = value;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["get"])(this.node(), id).ease;
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/easeVarying.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/easeVarying.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id).ease = v;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/end.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/end.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/filter.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/filter.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function(match) {
  if (typeof match !== "function") match = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["matcher"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__["Transition"](subgroups, this._parents, this._name, this._id);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js ***!
  \**********************************************************************************************/
/*! exports provided: Transition, default, newId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transition", function() { return Transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newId", function() { return newId; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attr.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/attr.js");
/* harmony import */ var _attrTween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attrTween.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/attrTween.js");
/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delay.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/delay.js");
/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./duration.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/duration.js");
/* harmony import */ var _ease_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ease.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/ease.js");
/* harmony import */ var _easeVarying_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./easeVarying.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/easeVarying.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./filter.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/filter.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./merge.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/merge.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./on.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/on.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./remove.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/remove.js");
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./select.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/select.js");
/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./selectAll.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/selectAll.js");
/* harmony import */ var _selection_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./selection.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/selection.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./style.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/style.js");
/* harmony import */ var _styleTween_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./styleTween.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/styleTween.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./text.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/text.js");
/* harmony import */ var _textTween_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./textTween.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/textTween.js");
/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./transition.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/transition.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./tween.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _end_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./end.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/end.js");






















var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selection"])().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = d3_selection__WEBPACK_IMPORTED_MODULE_0__["selection"].prototype;

Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: _select_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: _filter_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  merge: _merge_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  selection: _selection_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  transition: _transition_js__WEBPACK_IMPORTED_MODULE_18__["default"],
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: _on_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  attr: _attr_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  attrTween: _attrTween_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  style: _style_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  styleTween: _styleTween_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  text: _text_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  textTween: _textTween_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  remove: _remove_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  tween: _tween_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  delay: _delay_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  duration: _duration_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  ease: _ease_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  easeVarying: _easeVarying_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  end: _end_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/interpolate.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/interpolate.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "../node_modules/d3-interpolate/src/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var c;
  return (typeof b === "number" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateNumber"]
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_0__["color"] ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateRgb"]
      : (c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["color"])(b)) ? (b = c, d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateRgb"])
      : d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateString"])(a, b);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/merge.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/merge.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Transition"](merges, this._parents, this._name, this._id);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/on.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/on.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? _schedule_js__WEBPACK_IMPORTED_MODULE_0__["init"] : _schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"];
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["get"])(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/remove.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/remove.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return this.on("end.remove", removeFunction(this._id));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js":
/*!*************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js ***!
  \*************************************************************************************************/
/*! exports provided: CREATED, SCHEDULED, STARTING, STARTED, RUNNING, ENDING, ENDED, default, init, set, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATED", function() { return CREATED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCHEDULED", function() { return SCHEDULED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STARTING", function() { return STARTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STARTED", function() { return STARTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RUNNING", function() { return RUNNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDING", function() { return ENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDED", function() { return ENDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ "../node_modules/d3-dispatch/src/index.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-timer */ "../node_modules/d3-timer/src/index.js");



var emptyOn = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ __webpack_exports__["default"] = (function(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
});

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = Object(d3_timer__WEBPACK_IMPORTED_MODULE_1__["timer"])(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return Object(d3_timer__WEBPACK_IMPORTED_MODULE_1__["timeout"])(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    Object(d3_timer__WEBPACK_IMPORTED_MODULE_1__["timeout"])(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/select.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/select.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");




/* harmony default export */ __webpack_exports__["default"] = (function(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selector"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__["default"])(subgroup[i], name, id, i, subgroup, Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__["get"])(node, id));
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__["Transition"](subgroups, this._parents, name, id);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/selectAll.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/selectAll.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");




/* harmony default export */ __webpack_exports__["default"] = (function(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectorAll"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__["get"])(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__["default"])(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__["Transition"](subgroups, parents, name, id);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/selection.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/selection.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");


var Selection = d3_selection__WEBPACK_IMPORTED_MODULE_0__["selection"].prototype.constructor;

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return new Selection(this._groups, this._parents);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/style.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/style.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ "../node_modules/d3-interpolate/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tween.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interpolate.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/interpolate.js");






function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["style"])(this, name),
        string1 = (this.style.removeProperty(name), Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["style"])(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["style"])(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["style"])(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["style"])(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_2__["set"])(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value, priority) {
  var i = (name += "") === "transform" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_0__["interpolateTransformCss"] : _interpolate_js__WEBPACK_IMPORTED_MODULE_4__["default"];
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction(name, i, Object(_tween_js__WEBPACK_IMPORTED_MODULE_3__["tweenValue"])(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/styleTween.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/styleTween.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/text.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/text.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tween.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/tween.js");


function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(Object(_tween_js__WEBPACK_IMPORTED_MODULE_0__["tweenValue"])(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/textTween.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/textTween.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ __webpack_exports__["default"] = (function(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/transition.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/transition.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");



/* harmony default export */ __webpack_exports__["default"] = (function() {
  var name = this._name,
      id0 = this._id,
      id1 = Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["newId"])();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_1__["get"])(node, id0);
        Object(_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Transition"](groups, this._parents, name, id1);
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/tween.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/tween.js ***!
  \**********************************************************************************************/
/*! exports provided: default, tweenValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tweenValue", function() { return tweenValue; });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/transition/schedule.js");


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["get"])(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
});

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["set"])(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return Object(_schedule_js__WEBPACK_IMPORTED_MODULE_0__["get"])(node, id).value[name];
  };
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/constant.js":
/*!********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-zoom/src/constant.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (x => () => x);


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/event.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-zoom/src/event.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ZoomEvent; });
function ZoomEvent(type, {
  sourceEvent,
  target,
  transform,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    transform: {value: transform, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-zoom/src/index.js ***!
  \*****************************************************************************/
/*! exports provided: zoom, zoomTransform, zoomIdentity, ZoomTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/zoom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoom", function() { return _zoom_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomTransform", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomIdentity", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_1__["identity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZoomTransform", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_1__["Transform"]; });





/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/noevent.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-zoom/src/noevent.js ***!
  \*******************************************************************************/
/*! exports provided: nopropagation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nopropagation", function() { return nopropagation; });
function nopropagation(event) {
  event.stopImmediatePropagation();
}

/* harmony default export */ __webpack_exports__["default"] = (function(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
});


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/transform.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-zoom/src/transform.js ***!
  \*********************************************************************************/
/*! exports provided: Transform, identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return transform; });
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity;
  return node.__zoom;
}


/***/ }),

/***/ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/zoom.js":
/*!****************************************************************************!*\
  !*** ../node_modules/react-flow-renderer/node_modules/d3-zoom/src/zoom.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ "../node_modules/d3-dispatch/src/index.js");
/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-drag */ "../node_modules/react-flow-renderer/node_modules/d3-drag/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ "../node_modules/d3-interpolate/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-selection */ "../node_modules/react-flow-renderer/node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-transition */ "../node_modules/react-flow-renderer/node_modules/d3-transition/src/index.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constant.js */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/constant.js");
/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event.js */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/event.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transform.js */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/transform.js");
/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./noevent.js */ "../node_modules/react-flow-renderer/node_modules/d3-zoom/src/noevent.js");










// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || _transform_js__WEBPACK_IMPORTED_MODULE_7__["identity"];
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_2__["interpolateZoom"],
      listeners = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("start", "zoom", "end"),
      touchstarting,
      touchfirst,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0,
      tapDistance = 10;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled, {passive: false})
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p, event) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };

  zoom.scaleTo = function(selection, k, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };

  zoom.translateBy = function(selection, x, y, event) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };

  zoom.translateTo = function(selection, x, y, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(_transform_js__WEBPACK_IMPORTED_MODULE_7__["identity"].translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_7__["Transform"](k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_7__["Transform"](transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args).event(event),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new _transform_js__WEBPACK_IMPORTED_MODULE_7__["Transform"](k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this.that).datum();
      listeners.call(
        type,
        this.that,
        new _event_js__WEBPACK_IMPORTED_MODULE_6__["default"](type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["pointer"])(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
      g.start();
    }

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
        g = gesture(this, args, true).event(event),
        v = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["pointer"])(event, currentTarget),
        x0 = event.clientX,
        y0 = event.clientY;

    Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__["dragDisable"])(event.view);
    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["nopropagation"])(event);
    g.mouse = [p, this.__zoom.invert(p)];
    Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
    g.start();

    function mousemoved(event) {
      Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])(event);
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event)
       .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["pointer"])(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__["dragEnable"])(event.view, g.moved);
      Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["pointer"])(event.changedTouches ? event.changedTouches[0] : event, this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])(event);
    if (duration > 0) Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).transition().duration(duration).call(schedule, t1, p0, event);
    else Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
        n = touches.length,
        g = gesture(this, args, event.changedTouches.length === n).event(event),
        started, i, t, p;

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["nopropagation"])(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["pointer"])(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["pointer"])(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;

    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t;

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["nopropagation"])(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["pointer"])(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };

  return zoom;
});


/***/ }),

/***/ "../node_modules/react-is/cjs/react-is.development.js":
/*!************************************************************!*\
  !*** ../node_modules/react-is/cjs/react-is.development.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "../node_modules/react-is/index.js":
/*!*****************************************!*\
  !*** ../node_modules/react-is/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "../node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../node_modules/zustand/context.js":
/*!******************************************!*\
  !*** ../node_modules/zustand/context.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var react = __webpack_require__(/*! react */ "react");

function createContext() {
  var ZustandContext = react.createContext(undefined);

  var Provider = function Provider(_ref) {
    var initialStore = _ref.initialStore,
        createStore = _ref.createStore,
        children = _ref.children;
    var storeRef = react.useRef();

    if (!storeRef.current) {
      if (initialStore) {
        console.warn('Provider initialStore is deprecated and will be removed in the next version.');

        if (!createStore) {
          createStore = function createStore() {
            return initialStore;
          };
        }
      }

      storeRef.current = createStore();
    }

    return react.createElement(ZustandContext.Provider, {
      value: storeRef.current
    }, children);
  };

  var useStore = function useStore(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = Object.is;
    }

    var useProviderStore = react.useContext(ZustandContext);

    if (!useProviderStore) {
      throw new Error('Seems like you have not used zustand provider as an ancestor.');
    }

    return useProviderStore(selector, equalityFn);
  };

  var useStoreApi = function useStoreApi() {
    var useProviderStore = react.useContext(ZustandContext);

    if (!useProviderStore) {
      throw new Error('Seems like you have not used zustand provider as an ancestor.');
    }

    return react.useMemo(function () {
      return {
        getState: useProviderStore.getState,
        setState: useProviderStore.setState,
        subscribe: useProviderStore.subscribe,
        destroy: useProviderStore.destroy
      };
    }, [useProviderStore]);
  };

  return {
    Provider: Provider,
    useStore: useStore,
    useStoreApi: useStoreApi
  };
}

exports["default"] = createContext;


/***/ }),

/***/ "../node_modules/zustand/index.js":
/*!****************************************!*\
  !*** ../node_modules/zustand/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var react = __webpack_require__(/*! react */ "react");

function createStore(createState) {
  var state;
  var listeners = new Set();

  var setState = function setState(partial, replace) {
    var nextState = typeof partial === 'function' ? partial(state) : partial;

    if (nextState !== state) {
      var _previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach(function (listener) {
        return listener(state, _previousState);
      });
    }
  };

  var getState = function getState() {
    return state;
  };

  var subscribeWithSelector = function subscribeWithSelector(listener, selector, equalityFn) {
    if (selector === void 0) {
      selector = getState;
    }

    if (equalityFn === void 0) {
      equalityFn = Object.is;
    }

    console.warn('[DEPRECATED] Please use `subscribeWithSelector` middleware');
    var currentSlice = selector(state);

    function listenerToAdd() {
      var nextSlice = selector(state);

      if (!equalityFn(currentSlice, nextSlice)) {
        var _previousSlice = currentSlice;
        listener(currentSlice = nextSlice, _previousSlice);
      }
    }

    listeners.add(listenerToAdd);
    return function () {
      return listeners.delete(listenerToAdd);
    };
  };

  var subscribe = function subscribe(listener, selector, equalityFn) {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }

    listeners.add(listener);
    return function () {
      return listeners.delete(listener);
    };
  };

  var destroy = function destroy() {
    return listeners.clear();
  };

  var api = {
    setState: setState,
    getState: getState,
    subscribe: subscribe,
    destroy: destroy
  };
  state = createState(setState, getState, api);
  return api;
}

var isSSR = typeof window === 'undefined' || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var useIsomorphicLayoutEffect = isSSR ? react.useEffect : react.useLayoutEffect;

function create(createState) {
  var api = typeof createState === 'function' ? createStore(createState) : createState;

  var useStore = function useStore(selector, equalityFn) {
    if (selector === void 0) {
      selector = api.getState;
    }

    if (equalityFn === void 0) {
      equalityFn = Object.is;
    }

    var _ref = react.useReducer(function (c) {
      return c + 1;
    }, 0),
        forceUpdate = _ref[1];

    var state = api.getState();
    var stateRef = react.useRef(state);
    var selectorRef = react.useRef(selector);
    var equalityFnRef = react.useRef(equalityFn);
    var erroredRef = react.useRef(false);
    var currentSliceRef = react.useRef();

    if (currentSliceRef.current === undefined) {
      currentSliceRef.current = selector(state);
    }

    var newStateSlice;
    var hasNewStateSlice = false;

    if (stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || erroredRef.current) {
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
    }

    useIsomorphicLayoutEffect(function () {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice;
      }

      stateRef.current = state;
      selectorRef.current = selector;
      equalityFnRef.current = equalityFn;
      erroredRef.current = false;
    });
    var stateBeforeSubscriptionRef = react.useRef(state);
    useIsomorphicLayoutEffect(function () {
      var listener = function listener() {
        try {
          var nextState = api.getState();
          var nextStateSlice = selectorRef.current(nextState);

          if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
            stateRef.current = nextState;
            currentSliceRef.current = nextStateSlice;
            forceUpdate();
          }
        } catch (error) {
          erroredRef.current = true;
          forceUpdate();
        }
      };

      var unsubscribe = api.subscribe(listener);

      if (api.getState() !== stateBeforeSubscriptionRef.current) {
        listener();
      }

      return unsubscribe;
    }, []);
    var sliceToReturn = hasNewStateSlice ? newStateSlice : currentSliceRef.current;
    react.useDebugValue(sliceToReturn);
    return sliceToReturn;
  };

  Object.assign(useStore, api);

  useStore[Symbol.iterator] = function () {
    console.warn('[useStore, api] = create() is deprecated and will be removed in v4');
    var items = [useStore, api];
    return {
      next: function next() {
        var done = items.length <= 0;
        return {
          value: items.shift(),
          done: done
        };
      }
    };
  };

  return useStore;
}

exports["default"] = create;


/***/ }),

/***/ "../node_modules/zustand/shallow.js":
/*!******************************************!*\
  !*** ../node_modules/zustand/shallow.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);

  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

exports["default"] = shallow;


/***/ }),

/***/ "./SimplePanel.tsx":
/*!*************************!*\
  !*** ./SimplePanel.tsx ***!
  \*************************/
/*! exports provided: SimplePanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimplePanel", function() { return SimplePanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App */ "./components/App.tsx");
/* harmony import */ var react_flow_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-flow-renderer */ "../node_modules/react-flow-renderer/dist/esm/index.js");



var SimplePanel = function SimplePanel(_a) {
  var options = _a.options,
      data = _a.data,
      width = _a.width,
      height = _a.height;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_2__["ReactFlowProvider"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], {
    widthProp: width,
    heightProp: height
  }));
};

/***/ }),

/***/ "./components/App.tsx":
/*!****************************!*\
  !*** ./components/App.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-flow-renderer */ "../node_modules/react-flow-renderer/dist/esm/index.js");
/* harmony import */ var _components_CustomNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/CustomNode */ "./components/CustomNode.tsx");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/index.css */ "./styles/index.css");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_index_css__WEBPACK_IMPORTED_MODULE_5__);






var initialNodes = [{
  id: '1',
  type: 'customNode',
  data: {
    label: 'Node 1'
  },
  position: {
    x: 0,
    y: 50
  },
  style: {
    background: 'yellow',
    width: 100,
    border: 'solid',
    borderRadius: 75,
    padding: 10
  }
}];
var initialEdges = [];
var fitViewOptions = {
  padding: 0.2
};

var App = function App(props) {
  var widthProp = props.widthProp,
      heightProp = props.heightProp; //Panel width und height übernehmen

  var fitBounds = Object(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["useReactFlow"])().fitBounds; //Panel wird mit props für width,height gesetzt

  var flowKey = 'flow_01';

  var getNodeId = function getNodeId() {
    return "randomnode_" + +new Date();
  };

  var nodeTypes = Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function () {
    return {
      customNode: _components_CustomNode__WEBPACK_IMPORTED_MODULE_4__["default"]
    };
  }, []);

  var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(initialNodes), 2),
      nodes = _a[0],
      setNodes = _a[1];

  var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(initialEdges), 2),
      edges = _b[0],
      setEdges = _b[1];

  var setViewport = Object(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["useReactFlow"])().setViewport;

  var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(null), 2),
      rfInstance = _c[0],
      setRfInstance = _c[1]; //Props für Edgeoptions


  var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false), 2),
      animate = _d[0],
      setAnimate = _d[1];

  var handleNewConnection = function handleNewConnection() {
    setAnimate(!animate);
  };

  var defaultEdgeOptions = {
    animated: animate
  };
  var onNodesChange = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (changes) {
    return setNodes(function (nds) {
      return Object(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["applyNodeChanges"])(changes, nds);
    });
  }, [setNodes]);
  var onEdgesChange = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (changes) {
    return setEdges(function (eds) {
      return Object(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["applyEdgeChanges"])(changes, eds);
    });
  }, [setEdges]);
  var onConnect = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (connection) {
    return setEdges(function (eds) {
      return Object(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["addEdge"])(connection, eds);
    });
  }, [setEdges]); //const { x, y, zoom } = useViewport();

  console.log('widthProp, HeightProp: ', widthProp, heightProp);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    return function () {
      fitBounds({
        x: 0,
        y: 0,
        width: widthProp,
        height: heightProp
      });
    };
  });
  var onSave = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    if (rfInstance) {
      var flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow)); //Hier Datenbank call

      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("http://localhost:3002/api/put/" + flowKey, flow);
    }
  }, [rfInstance]);

  var formatDataFromDatabaseToObject = function formatDataFromDatabaseToObject(unformattedData) {
    var stringData = JSON.stringify(unformattedData);
    var strWithoutBS = stringData.replace(/\\/g, '');
    var strWithoutDQ = strWithoutBS.replace(/"\[/g, '[');
    var resultString = strWithoutDQ.replace(/\]"/g, ']');
    return JSON.parse(resultString);
  };

  var onRestore = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    var restoreFlow = function restoreFlow() {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var flowLocalFor, flowViewport, viewportData, viewport, flowNodes, nodesData, nodesArr, nodes, flowEdges, edgesData, edgesArr, edges, _a, x, _b, y, _c, zoom;

        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
          switch (_d.label) {
            case 0:
              flowLocalFor = JSON.parse(localStorage.getItem(flowKey));
              console.log(flowLocalFor);
              return [4
              /*yield*/
              , axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("http://localhost:3002/api/get/viewport")];

            case 1:
              flowViewport = _d.sent();
              viewportData = flowViewport.data;
              viewport = viewportData[0].viewport;
              return [4
              /*yield*/
              , axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("http://localhost:3002/api/get/nodes")];

            case 2:
              flowNodes = _d.sent();
              nodesData = flowNodes.data;
              nodesArr = formatDataFromDatabaseToObject(nodesData);
              nodes = nodesArr[0].nodes;
              return [4
              /*yield*/
              , axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("http://localhost:3002/api/get/edges")];

            case 3:
              flowEdges = _d.sent();
              edgesData = flowEdges.data;
              edgesArr = formatDataFromDatabaseToObject(edgesData);
              edges = edgesArr[0].edges;

              if (nodes || edges || viewport) {
                _a = viewport.x, x = _a === void 0 ? 0 : _a, _b = viewport.y, y = _b === void 0 ? 0 : _b, _c = viewport.zoom, zoom = _c === void 0 ? 1 : _c;
                setNodes(nodes || []);
                setEdges(edges || []);
                setViewport({
                  x: x,
                  y: y,
                  zoom: zoom
                });
              }

              return [2
              /*return*/
              ];
          }
        });
      });
    };

    restoreFlow();
  }, [setNodes, setViewport]);
  var onAdd = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    var newNode = {
      id: getNodeId(),
      data: {
        label: 'Added node'
      },
      position: {
        // x: Math.random() * window.innerWidth - 100,
        // y: Math.random() * window.innerHeight,
        x: window.innerWidth / 4,
        y: window.innerHeight / 4
      }
    };
    setNodes(function (nds) {
      return nds.concat(newNode);
    });
  }, [setNodes]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    onConnect: onConnect,
    fitViewOptions: fitViewOptions,
    nodeTypes: nodeTypes,
    onInit: setRfInstance,
    fitView: true,
    defaultEdgeOptions: defaultEdgeOptions
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "save__controls"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: onSave
  }, "save"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: onRestore
  }, "restore"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: onAdd
  }, "add node"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: handleNewConnection
  }, "animate")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["MiniMap"], null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_3__["Controls"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./components/CustomNode.tsx":
/*!***********************************!*\
  !*** ./components/CustomNode.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-flow-renderer */ "../node_modules/react-flow-renderer/dist/esm/index.js");


var handleStyleLeft = {
  left: 10
};
var handleStyleRight = {
  left: 80
};

function CustomNode() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Handle"], {
    type: "target",
    position: react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Position"].Top
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Handle"], {
    type: "source",
    position: react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Position"].Bottom,
    id: "a"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Handle"], {
    type: "source",
    position: react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Position"].Bottom,
    id: "b",
    style: handleStyleRight
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Handle"], {
    type: "source",
    position: react_flow_renderer__WEBPACK_IMPORTED_MODULE_1__["Position"].Bottom,
    id: "c",
    style: handleStyleLeft
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (CustomNode);

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SimplePanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SimplePanel */ "./SimplePanel.tsx");


var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["PanelPlugin"](_SimplePanel__WEBPACK_IMPORTED_MODULE_1__["SimplePanel"]).setPanelOptions(function (builder) {
  return builder.addTextInput({
    path: 'text',
    name: 'Simple text option',
    description: 'Description of panel option',
    defaultValue: 'Default value of text input option'
  }).addBooleanSwitch({
    path: 'showSeriesCount',
    name: 'Show series counter',
    defaultValue: false
  }).addRadio({
    path: 'seriesCountSize',
    defaultValue: 'sm',
    name: 'Series counter size',
    settings: {
      options: [{
        value: 'sm',
        label: 'Small'
      }, {
        value: 'md',
        label: 'Medium'
      }, {
        value: 'lg',
        label: 'Large'
      }]
    },
    showIf: function showIf(config) {
      return config.showSeriesCount;
    }
  });
});

/***/ }),

/***/ "./styles/index.css":
/*!**************************!*\
  !*** ./styles/index.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/postcss-loader/src??ref--8-2!../../node_modules/sass-loader/dist/cjs.js!./index.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/dist/cjs.js!./styles/index.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map