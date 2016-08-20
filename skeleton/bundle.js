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

	
	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);


	const routes = {
	  inbox: Inbox
	};

	function addListeners(){
	  const links = Array.from(document.querySelectorAll('.sidebar-nav li'));
	  links.forEach(link =>{
	    const inner = link.children[0].innerHTML.toLowerCase();

	    link.addEventListener('click', () => {
	      window.location.hash = inner;
	    });
	  });
	  const divContent = document.querySelectorAll('div.content');
	  const route = new Router(divContent[0], routes);
	  route.start();
	}

	document.addEventListener('DOMContentLoaded', addListeners);


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start(){
	    let router = this;
	    router.render();
	    window.addEventListener("hashchange", () => {
	      router.render();
	    });
	  }

	  render(){
	    this.node.innerHTML = '';
	    let component = this.activeRoute();
	    if(component){
	      let renderedComponent = component.render();
	      this.node.appendChild(renderedComponent);
	    }
	  }

	  activeRoute(){
	    let hashFrag = window.location.hash;
	    return this.routes[hashFrag.slice(1)];
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let renderFunction = function() {
	  let inboxList = document.createElement('ul');
	  inboxList.setAttribute('class', 'messages');
	  let inbox = this;

	  MessageStore.getInboxMessages().forEach(message => {
	    let currentMessage = inbox.rmessage(message);
	    inboxList.appendChild(currentMessage);
	  });

	  return inboxList;
	};

	let renderMessage = function(message) {
	  let newLI = document.createElement('li');
	  newLI.setAttribute('class', 'message');
	  newLI.innerHTML = `<span class="from">${message.from} </span>
	                      <span class="subject">${message.subject} </span>
	                      <span class="body">${message.body} </span>`
	  return newLI;
	};

	const Inbox = {
	  render: renderFunction,
	  rmessage: renderMessage
	};




	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	 {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	  ]
	};

	let MessageStore = {
	  getInboxMessages: () => { return messages.inbox; },
	  getSentMessages: () => { return messages.sent; }
	};

	module.exports = MessageStore;


/***/ }
/******/ ]);