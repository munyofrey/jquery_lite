
const Router = require('./router.js');
const Inbox = require('./inbox.js');


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
