async function createAccount() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Account created successfully!');
      } else {
        alert('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('An error occurred while creating the account. Please try again later.');
    }
}
