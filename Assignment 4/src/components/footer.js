const Footer = {
    render() {
      const footer = document.createElement('footer');
      
      const container = document.createElement('div');
      container.className = 'container';
      container.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} Product Manager. All rights reserved.</p>
      `;
      
      footer.appendChild(container);
      
      return footer;
    }
  };
  
  export default Footer;