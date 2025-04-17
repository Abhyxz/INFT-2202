import ProductForm from '../../components/productForm';

const UpdateProduct = {
  render(params) {
    const container = document.createElement('div');
    container.className = 'container';
    
    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Edit Product';
    
    const notification = document.createElement('div');
    notification.className = 'alert alert-success hidden';
    notification.id = 'notification';
    
    container.appendChild(title);
    container.appendChild(notification);
    
    // Check if we have a product ID
    const productId = params.id;
    if (!productId) {
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'No product ID specified.';
      errorMsg.className = 'alert alert-danger';
      container.appendChild(errorMsg);
      
      const backLink = document.createElement('a');
      backLink.href = '#/products';
      backLink.textContent = 'Back to Products';
      backLink.className = 'btn';
      container.appendChild(backLink);
      
      return container;
    }
    
    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Find the specific product
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Product not found.';
      errorMsg.className = 'alert alert-danger';
      container.appendChild(errorMsg);
      
      const backLink = document.createElement('a');
      backLink.href = '#/products';
      backLink.textContent = 'Back to Products';
      backLink.className = 'btn';
      container.appendChild(backLink);
      
      return container;
    }
    
    // Add the product form with the product data
    container.appendChild(ProductForm.render(product, this.handleSubmit));
    
    // Add back link
    const backLink = document.createElement('a');
    backLink.href = '#/products';
    backLink.textContent = 'Cancel';
    backLink.className = 'btn';
    backLink.style.marginTop = '1rem';
    backLink.style.marginLeft = '0.5rem';
    container.appendChild(backLink);
    
    return container;
  },
  
  handleSubmit(formData) {
    // Get existing products from localStorage
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Find the index of the product to update
    const index = products.findIndex(p => p.id === formData.id);
    
    if (index !== -1) {
      // Update the product
      products[index] = formData;
      
      // Save back to localStorage
      localStorage.setItem('products', JSON.stringify(products));
      
      // Show success notification
      const notification = document.getElementById('notification');
      notification.textContent = 'Product updated successfully!';
      notification.classList.remove('hidden');
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 3000);
      
      // Redirect back to products list after a delay
      setTimeout(() => {
        window.location.hash = '#/products';
      }, 1500);
    }
  }
};

export default UpdateProduct;