// Function to create user data object
function createData(id, name, email) {
    return {
      id,
      name,
      email,
      partiallyAvailable: Math.random() < 0.5
    };
  }
  
  // Function to generate a random name
  function getRandomName() {
    const names = [
      'Talha', 'Ali', 'Munawar', 'Faraz', 'Muhammad', 
      'Sara', 'Aisha', 'Zain', 'Hina', 'Omar', 
      'Aliya', 'Rashid', 'Sana', 'Usman', 'Maya',
    ];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  // Function to generate a random email
  function getRandomEmail(name) {
    const domains = ['gmail.com', 'hazen.com', 'yahoo.com', 'outlook.com'];
    return `${name.toLowerCase().replace(/\s+/g, '')}@${domains[Math.floor(Math.random() * domains.length)]}`;
  }
  
  // Generate the list of users
  function generateUsers(count = 100) {
    const rows = [];
    for (let i = 1; i <= count; i++) {
      const name = getRandomName();
      const email = getRandomEmail(name);
      rows.push(createData(i, name, email));
    }
    return rows;
  }
  
  // Export the generated user data
  export default generateUsers();  