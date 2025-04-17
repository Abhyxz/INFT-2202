const Home = {
    render() {
      const container = document.createElement('div');
      container.className = 'container';
      
      const title = document.createElement('h1');
      title.className = 'page-title';
      title.textContent = 'Welcome to Product Manager';
      
      const content = document.createElement('div');
      content.innerHTML = `
        <p>This is a simple CRUD application for managing products. You can:</p>
        <ul style="margin-left: 20px; list-style-type: disc;">
          <li>View all products</li>
          <li>Add new products</li>
          <li>Edit existing products</li>
          <li>Delete products</li>
        </ul>
        <p style="margin-top: 20px;">
          <a href="#/products" class="btn">View Products</a>
          <a href="#/products/create" class="btn">Add New Product</a>
        </p>
      `;
      
      container.appendChild(title);
      container.appendChild(content);
      
      return container;
    }
  };
  
  export default Home;