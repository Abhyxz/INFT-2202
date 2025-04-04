// /client/app/products/create.js
import ProductService from './product.service.mock.js'; // Changed to mock service
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
    }

    return isValid;
}

// Function to auto-fill the form when editing
function autoFillForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price.toFixed(2);
    document.querySelector('h1').textContent = 'Edit Product';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';
}

// Load product data if editing
if (editId) {
    ProductService.getProducts()
        .then(products => {
            currentProduct = products.find(p => p.id === editId);
            if (currentProduct) {
                autoFillForm(currentProduct);
            }
        })
        .catch(error => {
            console.error('Error loading product:', error);
            alert('Failed to load product data. Please try again.');
        });
}

// Handle form submission
document.getElementById('create-product-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    if (!validateForm(name, description, stock, price)) {
        return;
    }

    const product = new Product(name, description, stock, price);

    try {
        if (editId) {
            product.id = editId;
            await ProductService.updateProduct(editId, product);
            alert('Product updated successfully!');
        } else {
            await ProductService.addProduct(product);
            alert('Product created successfully!');
        }
        window.location.href = 'list.html';
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product. Please try again.');
    }
});