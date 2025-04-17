const Contact = {
    render() {
      const container = document.createElement('div');
      container.className = 'container';
      
      const title = document.createElement('h1');
      title.className = 'page-title';
      title.textContent = 'Contact Us';
      
      const content = document.createElement('div');
      content.innerHTML = `
        <p>Have questions or feedback? Reach out to us:</p>
        
        <div class="card" style="margin-top: 20px;">
          <form id="contact-form">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" class="form-control" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" class="form-control" required>
            </div>
            
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea id="message" class="form-control" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="btn">Send Message</button>
          </form>
        </div>
      `;
      
      container.appendChild(title);
      container.appendChild(content);
      
      // Add form submission handler
      setTimeout(() => {
        const form = document.getElementById('contact-form');
        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
          });
        }
      }, 100);
      
      return container;
    }
  };
  
  export default Contact;