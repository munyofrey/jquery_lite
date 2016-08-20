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
