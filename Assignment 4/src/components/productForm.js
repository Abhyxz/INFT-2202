const ProductForm = {
    render(product = null, submitCallback) {
      const formCard = document.createElement('div');
      formCard.className = 'card';
      
      const form = document.createElement('form');
      form.id = 'product-form';
      
      // Title field
      const titleGroup = document.createElement('div');
      titleGroup.className = 'form-group';
      
      const titleLabel = document.createElement('label');
      titleLabel.htmlFor = 'title';
      titleLabel.textContent = 'Product Title:';
      
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.id = 'title';
      titleInput.className = 'form-control';
      titleInput.required = true;
      if (product) titleInput.value = product.title;
      
      titleGroup.appendChild(titleLabel);
      titleGroup.appendChild(titleInput);
      
      // Description field
      const descGroup = document.createElement('div');
      descGroup.className = 'form-group';
      
      const descLabel = document.createElement('label');
      descLabel.htmlFor = 'description';
      descLabel.textContent = 'Description:';
      
      const descInput = document.createElement('textarea');
      descInput.id = 'description';
      descInput.className = 'form-control';
      descInput.rows = 3;
      if (product) descInput.value = product.description;
      
      descGroup.appendChild(descLabel);
      descGroup.appendChild(descInput);
      
      // Price field
      const priceGroup = document.createElement('div');
      priceGroup.className = 'form-group';
      
      const priceLabel = document.createElement('label');
      priceLabel.htmlFor = 'price';
      priceLabel.textContent = 'Price:';
      
      const priceInput = document.createElement('input');
      priceInput.type = 'number';
      priceInput.id = 'price';
      priceInput.className = 'form-control';
      priceInput.step = '0.01';
      priceInput.min = '0';
      priceInput.required = true;
      if (product) priceInput.value = product.price;
      
      priceGroup.appendChild(priceLabel);
      priceGroup.appendChild(priceInput);
      
      // Image URL field
      const imageGroup = document.createElement('div');
      imageGroup.className = 'form-group';
      
      const imageLabel = document.createElement('label');
      imageLabel.htmlFor = 'imageUrl';
      imageLabel.textContent = 'Image URL:';
      
      const imageInput = document.createElement('input');
      imageInput.type = 'text';
      imageInput.id = 'imageUrl';
      imageInput.className = 'form-control';
      if (product) imageInput.value = product.imageUrl;
      
      imageGroup.appendChild(imageLabel);
      imageGroup.appendChild(imageInput);
      
      // Submit button
      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'btn';
      submitBtn.textContent = product ? 'Update Product' : 'Add Product';
      
      // Hidden ID field for updates
      if (product) {
        const idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.id = 'productId';
        idInput.value = product.id;
        form.appendChild(idInput);
      }
      
      // Add all elements to form
      form.appendChild(titleGroup);
      form.appendChild(descGroup);
      form.appendChild(priceGroup);
      form.appendChild(imageGroup);
      form.appendChild(submitBtn);
      
      // Add submit event handler
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
          title: titleInput.value,
          description: descInput.value,
          price: parseFloat(priceInput.value),
          imageUrl: imageInput.value || 'https://via.placeholder.com/150'
        };
        
        if (product) {
          formData.id = product.id;
        } else {
          formData.id = Date.now().toString();
        }
        
        submitCallback(formData);
      });
      
      formCard.appendChild(form);
      return formCard;
    }
  };
  
  export default ProductForm;