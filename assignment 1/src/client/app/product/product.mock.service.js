
// client/app/products/product.service.mock.js
import Product from './product.js';

class ProductService {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products).map(p => {
            const product = new Product(p.name, p.description, p.stock, p.price);
            product.id = p.id;
            product.createdAt = p.createdAt;
            product.owner = p.owner;
            return product;
        }) : [];
    }

    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    async addProduct(product) {
        try {
            // API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            product.id = Math.random().toString(36).substr(2, 9);
            product.createdAt = new Date().toISOString();
            product.owner = 'current_user';

            this.products.push(product);
            this.saveProducts();

            return product;
        } catch (error) {
            throw new Error(`Failed to add product: ${error.message}`);
        }
    }

    async getProducts(page = 1, perPage = 10) {
        try {
            // API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const start = (page - 1) * perPage;
            const end = start + perPage;

            return {
                products: this.products.slice(start, end),
                total: this.products.length
            };
        } catch (error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            // API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }

            updatedProduct.id = id;
            updatedProduct.createdAt = this.products[index].createdAt;
            updatedProduct.owner = this.products[index].owner;

            this.products[index] = updatedProduct;
            this.saveProducts();

            return updatedProduct;
        } catch (error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            // API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }

            this.products.splice(index, 1);
            this.saveProducts();

            return null;
        } catch (error) {
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }
}

// Create an instance and export it as default
const productService = new ProductService();
export default productService;