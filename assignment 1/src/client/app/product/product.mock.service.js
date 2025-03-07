import Product from '.app/product/product.js';

class ProductService {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        const products = localStorage.getItem('products');
        const parsedProducts = products ? JSON.parse(products) : [];
        return parsedProducts.map(p => {
            const product = new Product(p.name, p.description, p.stock, p.price);
            product.id = p.id; // Preserve the original ID
            return product;
        });
    }

    // Save products to local storage
    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    // Add a new product
    addProduct(product) {
        this.products.push(product);
        this.saveProducts(); // Save to local storage
    }

    // Get all products
    getProducts() {
        return this.products;
    }

    // Delete a product by ID
    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts(); // Save to local storage
    }

    // Update a product by ID
    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product => 
            product.id === id ? updatedProduct : product
        );
        this.saveProducts(); // Save to local storage
    }
}

// Export the service
export default new ProductService();
