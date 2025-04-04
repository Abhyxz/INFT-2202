import ProductService from './product.service.js';


class ProductList {
    constructor() {
        this.products = [];
        this.currentPage = 1;
        this.itemsPerPage = 5; 
        this.productList = document.querySelector('#product-list tbody');
        this.paginationElement = document.getElementById('pagination');
        this.itemsPerPageSelect = document.getElementById('itemsPerPage');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.messageContainer = document.getElementById('messageContainer');
        this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        this.productToDelete = null;

        this.setupEventListeners();
        this.loadFromQueryParams();
        this.loadProducts();
    }

    getCurrentPageProducts() {
        return this.products; // already paginated from the service
    }

    loadFromQueryParams() {
        const params = new URLSearchParams(window.location.search);
        this.currentPage = parseInt(params.get('page')) || 1;
        this.itemsPerPage = parseInt(params.get('perPage')) || 10;
        this.itemsPerPageSelect.value = this.itemsPerPage;
    }

    updateQueryParams() {
        const url = new URL(window.location.href);
        url.searchParams.set('page', this.currentPage);
        url.searchParams.set('perPage', this.itemsPerPage);
        window.history.pushState({}, '', url);
    }

    showSpinner() {
        this.loadingSpinner.style.display = 'block';
        this.productList.style.display = 'none';
    }

    hideSpinner() {
        this.loadingSpinner.style.display = 'none';
        this.productList.style.display = '';
    }

    showMessage(message, type = 'success') {
        const alert = this.messageContainer.querySelector('.alert');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        this.messageContainer.style.display = 'block';
        setTimeout(() => {
            this.messageContainer.style.display = 'none';
        }, 3000);
    }

    setupEventListeners() {
        this.itemsPerPageSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.updateQueryParams();
            this.loadProducts();
        });

        document.getElementById('confirmDelete').addEventListener('click', () => {
            this.deleteModal.hide();
            this.performDelete();
        });
    }

    async loadProducts() {
        try {
            this.showSpinner();
            console.log('Fetching products from:', ProductService.host); // Debug line
            const response = await ProductService.getProducts(this.currentPage, this.itemsPerPage);
            console.log('Raw API Response:', response); // Debug line

            if (!response) {
                throw new Error('No response from API');
            }

            this.products = response.products || [];
            this.totalItems = response.total || 0;
            this.totalPages = response.totalPages || 1;

            console.log('Processed products:', this.products); // Debug line
            this.render();
            this.hideSpinner();
        } catch (error) {
            console.error('Detailed error:', error);
            this.hideSpinner();
            this.showMessage('Error loading products: ' + error.message, 'danger');
        }
    }

    renderProducts() {
        if (!this.products || this.products.length === 0) {
            this.productList.innerHTML = '<tr><td colspan="7" class="text-center">No products available.</td></tr>';
            return;
        }
    
        this.productList.innerHTML = '';
        this.products.forEach(product => {
            console.log('Rendering product:', product); // Debug line
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name || 'N/A'}</td>
                <td>${product.description || 'N/A'}</td>
                <td>${product.sound || 'N/A'}</td>
                <td>$${product.price || '0'}</td>
                <td>${'100925209'}</td>
                <td>${product.createTime ? new Date(product.createTime * 1000).toLocaleString() : 'N/A'}</td>
                <td>
                    ${product.user === '100925209' ? `
                        <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">Update</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
                    ` : ''}
                </td>
            `;
    
            if (product.user === '123456789') {
                row.querySelector('.edit-btn')?.addEventListener('click', () => this.editProduct(product.id));
                row.querySelector('.delete-btn')?.addEventListener('click', () => this.showDeleteModal(product.id));
            }
    
            this.productList.appendChild(row);
        });
    }

    renderPagination() {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        let paginationHtml = '';

        // Previous button
        paginationHtml += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <li class="page-item ${this.currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        // Next button
        paginationHtml += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
            </li>
        `;

        this.paginationElement.innerHTML = paginationHtml;

        // Add click event listeners
        this.paginationElement.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = parseInt(e.target.dataset.page);
                if (newPage >= 1 && newPage <= totalPages && newPage !== this.currentPage) {
                    this.currentPage = newPage;
                    this.updateQueryParams();
                    this.loadProducts();
                }
            });
        });
    }

    async editProduct(id) {
        window.location.href = `create.html?edit=${id}`;
    }

    showDeleteModal(productId) {
        this.productToDelete = productId;
        this.deleteModal.show();
    }

    async performDelete() {
        if (!this.productToDelete) return;

        try {
            this.showSpinner();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await ProductService.deleteProduct(this.productToDelete);
            await this.loadProducts();
            this.showMessage('Product deleted successfully');
        } catch (error) {
            this.hideSpinner();
            this.showMessage('Failed to delete product: ' + error.message, 'danger');
        }
        this.productToDelete = null;
    }

    render() {
        this.renderProducts();
        this.renderPagination();
        this.updateQueryParams();
    }
}

// Initialize the product list
const productList = new ProductList();