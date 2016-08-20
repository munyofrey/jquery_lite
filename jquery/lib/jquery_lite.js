/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);


	const funcArray = [];

	window.$l = function(selector){
	  if(typeof selector === 'string'){
	    const selectedEls = Array.from(document.querySelectorAll(selector));
	    return new DOMNodeCollection(selectedEls);
	  } else if(selector instanceof HTMLElement){
	    return new DOMNodeCollection(selector);
	  } else if(selector instanceof Function){
	    if (document.readyState === 'complete'){
	      selector.call();
	    }else{funcArray.push(selector);}
	  }
	};

	window.$l.extend = function(...objects){
	  let newObject = objects[0];
	  objects.slice(1).forEach((obj) => {
	    for(key in obj){
	      newObject[key] = obj[key];
	    }
	  });

	  return newObject;
	};

	window.$l.ajax = function(options){
	  const defaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    data: '',
	    error: function(response){ console.log(response); },
	    method: 'GET',
	    url: window.location.pathname,
	    success: function(response){ console.log(response); }
	  };

	  window.$l.extend(defaults, options);

	  const xhr = new XMLHttpRequest();
	  xhr.open(defaults['method'], defaults['url']);

	  xhr.setRequestHeader("Content-type", defaults.contentType);

	  xhr.onload = () => {
	    if (xhr.status === 200){
	      defaults['success'](xhr.response);
	    }else{
	    defaults['failure'](xhr.response);}
	  };
	  xhr.send(defaults['data']);
	};

	window.$l.ajax({
	  type: 'GET',
	  url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
	  success:function(data) {
	    console.log("We have your weather!");
	    console.log(data);
	  },
	  error: function() {
	    console.error("An error occurred.");
	  },
	});


	document.addEventListener("DOMContentLoaded", () => {
	  funcArray.forEach(func => func.call());
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlArray) {
	    this.htmlArray = htmlArray;
	  }

	  html(string){
	    if(string){
	      this.htmlArray.forEach(el => {
	        el.innerHTML = string;
	      });
	    } else{
	      return this.htmlArray[0].innerHTML;
	    }
	  }

	  empty(){
	    this.htmlArray.forEach(el => {
	      el.outerHTML = '';
	    });
	  }

	  append(arg){
	    if(arg instanceof DOMNodeCollection){
	      this.htmlArray.forEach( (node1) => {
	        arg.htmlArray.forEach((node2) => {
	            node1.innerHTML += node2.outerHTML;
	        });
	      });
	    }else if(arg instanceof HTMLElement){
	      this.htmlArray.forEach((node) => {
	          node.innerHTML += arg.outerHTML;
	      });
	    }else if (typeof arg === 'string') {
	      this.htmlArray.forEach((node) => {
	        node.innerHTML += arg;
	      });
	    }
	  }

	  attr(attribute, val){
	    if(val){
	      this.htmlArray.forEach( node => {
	        node.setAttribute(attribute, val);
	      });
	    }else{
	      return this.htmlArray[0].attributes[attribute];
	    }
	  }

	  addClass(className){
	    this.htmlArray.forEach( node => {
	      const currentClass = node.getAttribute('class');
	      node.setAttribute('class', currentClass + ' ' + className);
	    });
	  }

	  removeClass(className){
	    this.htmlArray.forEach( node => {
	      const currentClass = node.getAttribute('class');
	      const results = [];

	      currentClass.split(' ').forEach((littleClass) => {
	        if(littleClass !== className){ results.push(littleClass);}
	      });

	      node.setAttribute('class', results.join(' '));
	    });
	  }

	  children(){
	    let allTheChildren = [];

	    this.htmlArray.forEach(node => {
	      let children = Array.from(node.children);
	      allTheChildren = allTheChildren.concat(children);
	    });

	    return new DOMNodeCollection(allTheChildren);
	  }

	  parent(){
	    let allTheParents = [];

	    this.htmlArray.forEach(node =>{
	      let parent = node.parentElement;
	      if (allTheParents.indexOf(parent) === -1){
	        allTheParents.push(parent);
	      }
	    });
	    return new DOMNodeCollection(allTheParents);
	  }

	  find(selector){
	    let foundNodes = [];
	    this.htmlArray.forEach(node => {
	      let foundEl = Array.from(node.querySelectorAll(selector));
	      foundEl.forEach( (el) => {
	        if (foundNodes.indexOf(el) === -1){
	          foundNodes.push(el);
	        }
	      });
	    });

	    return new DOMNodeCollection(foundNodes);
	  }

	  remove(selector){
	    if(selector){
	      let foundNodes = this.find(selector);
	      foundNodes.empty();
	    } else{
	      this.empty();
	    }
	  }

	  on(eventName, callback){
	    this.htmlArray.forEach(node => {
	      node.addEventListener(eventName, callback);
	    });
	  }

	  off(eventName, callback){
	    this.htmlArray.forEach(node => {
	      node.removeEventListener(eventName, callback);
	    });
	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);