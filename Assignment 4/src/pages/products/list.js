import ProductList from '../../components/productList';

const ProductListPage = {
  render() {
    const container = document.createElement('div');
    container.className = 'container';
    
    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Products';
    
    const notification = document.createElement('div');
    notification.className = 'alert alert-success hidden';
    notification.id = 'notification';
    
    const addButton = document.createElement('a');
    addButton.href = '#/products/create';
    addButton.className = 'btn';
    addButton.textContent = 'Add New Product';
    addButton.style.marginBottom = '1rem';
    
    container.appendChild(title);
    container.appendChild(notification);
    container.appendChild(addButton);
    
    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Add product list
    container.appendChild(ProductList.render(products, this.handleEdit, this.handleDelete));
    
    return container;
  },
  
  handleEdit(productId) {
    window.location.hash = `#/products/update?id=${productId}`;
  },
  
  handleDelete(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      // Get products from localStorage
      let products = JSON.parse(localStorage.getItem('products') || '[]');
      
      // Filter out the product to delete
      products = products.filter(product => product.id !== productId);
      
      // Save back to localStorage
      localStorage.setItem('products', JSON.stringify(products));
      
      // Show success notification
      const notification = document.getElementById('notification');
      notification.textContent = 'Product deleted successfully!';
      notification.classList.remove('hidden');
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 3000);
      
      // Reload the page to refresh the product list
      window.location.hash = '#/products';
      
      // Alternative: Manually update the product list without page reload
      const mainContent = document.getElementById('main-content');
      mainContent.innerHTML = '';
      mainContent.appendChild(ProductListPage.render());
    }
  }
};

export default ProductListPage;