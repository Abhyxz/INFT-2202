import ProductForm from '../../components/productForm';

const CreateProduct = {
  render() {
    const container = document.createElement('div');
    container.className = 'container';
    
    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Add New Product';
    
    const notification = document.createElement('div');
    notification.className = 'alert alert-success hidden';
    notification.id = 'notification';
    
    container.appendChild(title);
    container.appendChild(notification);
    
    // Add the product form
    container.appendChild(ProductForm.render(null, this.handleSubmit));
    
    return container;
  },
  
  handleSubmit(formData) {
    // Get existing products from localStorage
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Add the new product
    products.push(formData);
    
    // Save back to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Show success notification
    const notification = document.getElementById('notification');
    notification.textContent = 'Product added successfully!';
    notification.classList.remove('hidden');
    
    // Clear the form
    document.getElementById('product-form').reset();
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }
};

export default CreateProduct;