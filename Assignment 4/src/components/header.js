const Header = {
    render() {
      const header = document.createElement('header');
      
      const container = document.createElement('div');
      container.className = 'container';
      
      const nav = document.createElement('nav');
      nav.innerHTML = `
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/products">Products</a></li>
          <li><a href="#/products/create">Add Product</a></li>
          <li><a href="#/about">About</a></li>
          <li><a href="#/contact">Contact</a></li>
        </ul>
      `;
      
      container.appendChild(nav);
      header.appendChild(container);
      
      return header;
    }
  };
  
  export default Header;