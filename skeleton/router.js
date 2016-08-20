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
