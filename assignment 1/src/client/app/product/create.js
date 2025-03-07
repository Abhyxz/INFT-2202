import ProductService from './product.mock.service.js';
import Product from './product.js';

const params = new URLSearchParams(window.location.search);
const editId = params.get('edit');
let currentProduct = null;

// Function to validate the form
function validateForm(name, description, stock, price) {
    let isValid = true;

    // Clear previous error messages
    document.getElementById('productNameError').textContent = '';
    document.getElementById('productDescriptionError').textContent = '';
    document.getElementById('productStockError').textContent = '';
    document.getElementById('productPriceError').textContent = '';

    // Validate product name
    if (!name) {
        document.getElementById('productNameError').textContent = 'Product name is required.';
        isValid = false;
    }

    // Validate product description
    if (!description) {
        document.getElementById('productDescriptionError').textContent = 'Product description is required.';
        isValid = false;
    }

    // Validate product stock
    if (!stock) {
        document.getElementById('productStockError').textContent = 'Stock is required.';
        isValid = false;
    } else if (isNaN(stock)) {
        document.getElementById('productStockError').textContent = 'Stock must be a number.';
        isValid = false;
    } else if (stock < 0) {
        document.getElementById('productStockError').textContent = 'Stock must be a positive number.';
        isValid = false;
    }

    // Validate product price
    if (!price) {
        document.getElementById('productPriceError').textContent = 'Price is required.';
        isValid = false;
    } else if (isNaN(price)) {
        document.getElementById('productPriceError').textContent = 'Price must be a number.';
        isValid = false;
    } else if (price < 0) {
        document.getElementById('productPriceError').textContent = 'Price must be a positive number.';
        isValid = false;
    } else if (!(/^\d+(\.\d{1,2})?$/).test(price.toString())) {
        document.getElementById('productPriceError').textContent = 'Price must have up to 2 decimal places.';
        isValid = false;
    }

    return isValid;
}

// Add input event listener for price field to enforce decimal format
document.getElementById('productPrice').addEventListener('input', function(e) {
    let value = e.target.value;
    
    // Remove any characters that aren't numbers or decimal point
    value = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length > 1) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    
    e.target.value = value;
});

// Function to auto-fill the form when editing
function autoFillForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price.toFixed(2); // Ensure price shows 2 decimal places
    document.querySelector('h1').textContent = 'Edit Product';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';
}

// Auto-fill the form if editing
if (editId) {
    currentProduct = ProductService.getProducts().find(p => p.id === editId);
    if (currentProduct) {
        autoFillForm(currentProduct);
    }
}

// Handle form submission
document.getElementById('create-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    // Validate the form
    if (!validateForm(name, description, stock, price)) {
        return;
    }

    const newProduct = new Product(name, description, stock, price);

    if (editId) {
        // Preserve the original ID when updating
        newProduct.id = editId;
        ProductService.updateProduct(editId, newProduct);
        alert('Product updated successfully!');
    } else {
        ProductService.addProduct(newProduct);
        alert('Product created successfully!');
    }

    window.location.href = 'list.html';
});
