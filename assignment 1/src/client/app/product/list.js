import ProductService from './product.service.js';

class ProductList {
    constructor() {
        this.products = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.productList = document.querySelector('#product-list tbody');
        this.paginationElement = document.getElementById('pagination');
        this.itemsPerPageSelect = document.getElementById('itemsPerPage');

        this.setupEventListeners();
        this.loadProducts();
    }

    setupEventListeners() {
        this.itemsPerPageSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.loadProducts();
        });
    }

    async loadProducts() {
        try {
            const response = await ProductService.getProducts(this.currentPage, this.itemsPerPage);
            this.products = response.products;
            this.render();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    render() {
        this.productList.innerHTML = '';
        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>$${product.price}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">Update</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
                </td>
            `;
            row.querySelector('.edit-btn').addEventListener('click', () => this.editProduct(product.id));
            row.querySelector('.delete-btn').addEventListener('click', () => this.deleteProduct(product.id));
            this.productList.appendChild(row);
        });
    }

    editProduct(id) {
        window.location.href = `create.html?edit=${id}`;
    }

    async deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductService.deleteProduct(id);
                this.loadProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    }
}

new ProductList();