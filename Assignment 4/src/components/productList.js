const ProductList = {
    render(products = [], onEdit, onDelete) {
      const listContainer = document.createElement('div');
      listContainer.className = 'product-list';
      
      if (products.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No products available. Add your first product!';
        emptyMessage.className = 'text-center';
        listContainer.appendChild(emptyMessage);
        return listContainer;
      }
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card product-card';
        
        // Product image
        const productImage = document.createElement('img');
        productImage.src = product.imageUrl || 'https://via.placeholder.com/150';
        productImage.alt = product.title;
        productImage.style.width = '100%';
        productImage.style.height = '150px';
        productImage.style.objectFit = 'cover';
        
        // Product title
        const productTitle = document.createElement('h3');
        productTitle.textContent = product.title;
        
        // Product price
        const productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.textContent = `$${parseFloat(product.price).toFixed(2)}`;
        
        // Product description
        const productDesc = document.createElement('p');
        productDesc.textContent = product.description;
        
        // Product actions
        const productActions = document.createElement('div');
        productActions.className = 'product-actions';
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => onEdit(product.id));
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => onDelete(product.id));
        
        // Add action buttons
        productActions.appendChild(editBtn);
        productActions.appendChild(deleteBtn);
        
        // Build the card
        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);
        productCard.appendChild(productDesc);
        productCard.appendChild(productActions);
        
        // Add card to list
        listContainer.appendChild(productCard);
      });
      
      return listContainer;
    }
  };
  
  export default ProductList;