const About = {
    render() {
      const container = document.createElement('div');
      container.className = 'container';
      
      const title = document.createElement('h1');
      title.className = 'page-title';
      title.textContent = 'About Us';
      
      const content = document.createElement('div');
      content.innerHTML = `
        <p>Product Manager is a simple CRUD application built with vanilla JavaScript, HTML, and CSS.</p>
        <p>This application uses the following technologies:</p>
        <ul style="margin-left: 20px; list-style-type: disc;">
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JavaScript (ES6+)</li>
          <li>Webpack for bundling</li>
          <li>Local Storage for data persistence</li>
        </ul>
        <p style="margin-top: 20px;">This project demonstrates how to build a single-page application with client-side routing and state management without using any frameworks.</p>
      `;
      
      container.appendChild(title);
      container.appendChild(content);
      
      return container;
    }
  };
  
  export default About;