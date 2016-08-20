const DOMNodeCollection = require('./dom_node_collection.js');


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
