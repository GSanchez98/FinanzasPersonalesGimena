/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n\tStellar by HTML5 UP\r\n\thtml5up.net | @ajlkn\r\n\tFree for personal and commercial use under the CCA 3.0 license (html5up.net/license)\r\n*/\n(function ($) {\n  var $window = $(window),\n      $body = $('body'),\n      $main = $('#main'); // Breakpoints.\n\n  breakpoints({\n    xlarge: ['1281px', '1680px'],\n    large: ['981px', '1280px'],\n    medium: ['737px', '980px'],\n    small: ['481px', '736px'],\n    xsmall: ['361px', '480px'],\n    xxsmall: [null, '360px']\n  }); // Play initial animations on page load.\n\n  $window.on('load', function () {\n    window.setTimeout(function () {\n      $body.removeClass('is-preload');\n    }, 100);\n  }); // Nav.\n\n  var $nav = $('#nav');\n\n  if ($nav.length > 0) {\n    // Shrink effect.\n    $main.scrollex({\n      mode: 'top',\n      enter: function enter() {\n        $nav.addClass('alt');\n      },\n      leave: function leave() {\n        $nav.removeClass('alt');\n      }\n    }); // Links.\n\n    var $nav_a = $nav.find('a');\n    $nav_a.scrolly({\n      speed: 1000,\n      offset: function offset() {\n        return $nav.height();\n      }\n    }).on('click', function () {\n      var $this = $(this); // External link? Bail.\n\n      if ($this.attr('href').charAt(0) != '#') return; // Deactivate all links.\n\n      $nav_a.removeClass('active').removeClass('active-locked'); // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).\n\n      $this.addClass('active').addClass('active-locked');\n    }).each(function () {\n      var $this = $(this),\n          id = $this.attr('href'),\n          $section = $(id); // No section for this link? Bail.\n\n      if ($section.length < 1) return; // Scrollex.\n\n      $section.scrollex({\n        mode: 'middle',\n        initialize: function initialize() {\n          // Deactivate section.\n          if (browser.canUse('transition')) $section.addClass('inactive');\n        },\n        enter: function enter() {\n          // Activate section.\n          $section.removeClass('inactive'); // No locked links? Deactivate all links and activate this section's one.\n\n          if ($nav_a.filter('.active-locked').length == 0) {\n            $nav_a.removeClass('active');\n            $this.addClass('active');\n          } // Otherwise, if this section's link is the one that's locked, unlock it.\n          else if ($this.hasClass('active-locked')) $this.removeClass('active-locked');\n        }\n      });\n    });\n  } // Scrolly.\n\n\n  $('.scrolly').scrolly({\n    speed: 1000\n  });\n})(jQuery);\n\n//# sourceURL=webpack:///./public/js/main.js?");

/***/ })

/******/ });