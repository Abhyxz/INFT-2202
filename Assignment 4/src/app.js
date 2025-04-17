import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import ProductList from './pages/products/list';
import CreateProduct from './pages/products/create';
import UpdateProduct from './pages/products/update';

const App = {
  routes: {
    '/': Home,
    '/about': About,
    '/contact': Contact,
    '/products': ProductList,
    '/products/create': CreateProduct,
    '/products/update': UpdateProduct,
  },

  init() {
    // Initialize the application
    this.content = document.getElementById('app');
    
    // Setup routing
    window.addEventListener('hashchange', () => {
      this.loadRoute();
    });
    
    // Load initial components
    this.render();
    this.loadRoute();
  },

  render() {
    // Clear the content area
    this.content.innerHTML = '';
    
    // Add header
    this.content.appendChild(Header.render());
    
    // Add main content container
    const main = document.createElement('main');
    main.id = 'main-content';
    this.content.appendChild(main);
    
    // Add footer
    this.content.appendChild(Footer.render());
  },

  loadRoute() {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    
    // Get current hash (without the # symbol)
    let hash = window.location.hash.substring(1);
    if (!hash) hash = '/';
    
    // Check if the hash contains parameters
    let params = {};
    if (hash.includes('?')) {
      const [path, queryString] = hash.split('?');
      hash = path;
      
      // Parse query parameters
      const urlParams = new URLSearchParams(queryString);
      urlParams.forEach((value, key) => {
        params[key] = value;
      });
    }
    
    // Find the route component
    const route = this.routes[hash] || this.routes['/'];
    
    // Render the component
    main.appendChild(route.render(params));
  }
};

export default App;