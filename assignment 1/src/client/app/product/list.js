// src/client/app/products/list.js
import ProductService from './product.mock.service.js';
import Product from './product.js';

class ProductList {
    constructor() {
        this.products = ProductService.getProducts();
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.productList = document.querySelector('#product-list tbody');
        this.paginationElement = document.getElementById('pagination');
        this.itemsPerPageSelect = document.getElementById('itemsPerPage');

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Items per page change handler
        this.itemsPerPageSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1; // Reset to first page
            this.render();
        });

        // Set initial value
        this.itemsPerPage = parseInt(this.itemsPerPageSelect.value);
    }

    getTotalPages() {
        return Math.ceil(this.products.length / this.itemsPerPage);
    }

    getCurrentPageProducts() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.products.slice(startIndex, endIndex);
    }

    renderProducts() {
        const currentProducts = this.getCurrentPageProducts();

        if (this.products.length === 0) {
            this.productList.innerHTML = '<tr><td colspan="5" class="text-center">No products available.</td></tr>';
            return;
        }

        this.productList.innerHTML = '';
        currentProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct('${product.id}')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Delete</button>
                </td>
            `;
            this.productList.appendChild(row);
        });
    }

    renderPagination() {
        const totalPages = this.getTotalPages();
        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
            </li>
        `;

        this.paginationElement.innerHTML = paginationHTML;

        // Add click event listeners to pagination buttons
        this.paginationElement.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = parseInt(e.target.dataset.page);
                if (newPage >= 1 && newPage <= totalPages) {
                    this.currentPage = newPage;
                    this.render();
                }
            });
        });
    }

    render() {
        this.renderProducts();
        this.renderPagination();
    }
}

// Initialize the product list
const productList = new ProductList();

// Global functions for edit and delete
window.editProduct = function(id) {
    window.location.href = `create.html?edit=${id}`;
};

window.deleteProduct = function(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        ProductService.deleteProduct(id);
        window.location.reload();
    }
};