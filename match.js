// Handle form submission
if (document.getElementById('profileForm')) {
  document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {};
    new FormData(this).forEach((value, key) => formData[key] = value);
    localStorage.setItem('profileData', JSON.stringify(formData));
    window.location.href = 'match.html';
  });
}

// Populate match page
if (window.location.pathname.includes('match.html')) {
  const data = JSON.parse(localStorage.getItem('profileData') || '{}');
  if (data.name) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('role').textContent = data.role;
    document.getElementById('city').textContent = data.city;
    document.getElementById('level').textContent = data.level;
    document.getElementById('badge').textContent = data.badge;
    document.getElementById('work').textContent = data.work;
    document.getElementById('goal').textContent = data.goal;
    document.getElementById('plan').textContent = data.plan;
    document.getElementById('character').textContent = data.character;
  }
}
