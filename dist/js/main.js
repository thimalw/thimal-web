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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/Pong/Disc.js
function Disc(elementId, x, y) {
    this.element = document.getElementById(elementId);

    this.x = x;
    this.y = y;
}

Disc.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
    
    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;
}

/* harmony default export */ var Pong_Disc = (Disc);
// CONCATENATED MODULE: ./src/Pong/Handle.js
function Handle(elementId) {
    this.element = document.getElementById(elementId);

    this.y = 0;
}

Handle.prototype.setPosition = function(y) {
    this.y = y;

    this.element.style.top = `${y}px`;
}

/* harmony default export */ var Pong_Handle = (Handle);
// CONCATENATED MODULE: ./src/Pong/index.js



function Pong(screenId, handleId, discId) {
    this.score = `Still going strong ${String.fromCodePoint(0x1F389)} Keep it up!`;
    this.scoreInt = 0;
    
    this.screenElement = document.getElementById(screenId);
    this.handle = new Pong_Handle(handleId);
    this.disc = new Pong_Disc(discId, 5, 5);

    this.speedX = 5;
    this.speedY = 5;
    this.deltaY = 0;

    this.screenTop = 0;
    this.screenBottom = this.screenElement.clientHeight;
    this.screenLeft = 0;
    this.screenRight = this.screenElement.clientWidth;

    this.mouseY = 0;
    this.mouseYPrev = 0;
}

Pong.prototype.init = function() {
    document.onmousemove = this.handleMouseInput.bind(this);
    document.ontouchmove = this.handleTouchInput.bind(this);
    
    window.requestAnimationFrame(this.gameLoop.bind(this));
}

Pong.prototype.handleMouseInput = function(e) {
    this.updateInput(e.clientY);
}

Pong.prototype.handleTouchInput = function(e) {
    this.updateInput(e.touches[0].clientY);
}

Pong.prototype.updateInput = function(y) {
    this.mouseYPrev = this.mouseY;
    this.mouseY = y;

    this.deltaY = Math.floor((this.mouseY - this.mouseYPrev) / 2);
    
    if (this.deltaY > 10) {
        this.deltaY = 10;
    }

    if (this.deltaY < -10) {
        this.deltaY = -10;
    }
}

Pong.prototype.computerScored = function() {
    this.scoreInt++;

    this.score = `You've let the disc through ${this.scoreInt} times ${String.fromCodePoint(0x1F92D)}`;
    window.score = this.score;
    
    this.resetDisc();
}

Pong.prototype.resetDisc = function() {
    this.speedX = 5;
    this.speedY = Math.floor(Math.random() * (6 - -6 + 1) + -6);

    if (this.speedY == 0) {
        this.speedY = 1;
    }

    this.disc.setPosition(Math.floor(this.screenRight / 2), Math.floor(this.screenBottom / 2));
}

Pong.prototype.gameLoop = function() {
    // Check bounds
    if (this.disc.y + 50 >= this.screenBottom) {
        this.speedY = -Math.abs(this.speedY);
    }
    
    if (this.disc.y <= this.screenTop) {
        this.speedY = Math.abs(this.speedY);
    }

    if (this.disc.x + 50 >= this.screenRight) {
        this.speedX = -Math.abs(this.speedX);
    }

    if (this.disc.x <= this.screenLeft) {
        this.computerScored();
    }

    // Update handle position
    var handleY = this.mouseY - 50;

    if (handleY < this.screenTop) {
        handleY = 0;
    }

    if (handleY + 100 > this.screenBottom) {
        handleY = this.screenBottom - 100;
    }
    
    this.handle.setPosition(handleY);
    
    // Update disc position
    var discX = this.disc.x + this.speedX;
    var discY = this.disc.y + this.speedY;
    this.disc.setPosition(discX, discY);

    // Check if handle hits the disc
    if (this.disc.x <= 42 && this.disc.x >= 32) {
        if (this.disc.y + 50 >= this.handle.y && this.disc.y <= this.handle.y + 100) {
            this.speedX = Math.abs(this.speedX);

            if (this.speedX < 20) {
                this.speedX++;
            }

            this.speedY += this.deltaY;

            if (this.speedY > 20) {
                this.speedY = 20;
            }
        }
    }

    window.requestAnimationFrame(this.gameLoop.bind(this));
}

/* harmony default export */ var src_Pong = (Pong);
// CONCATENATED MODULE: ./src/index.js


var game = new src_Pong('game', 'handle', 'disc');

game.init();

/***/ })
/******/ ]);