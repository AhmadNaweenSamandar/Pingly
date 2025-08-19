// Photo upload preview functionality
        const photoInput = document.getElementById('photoInput');
        const photoPreview = document.getElementById('photoPreview');
        
        photoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.addEventListener('load', function() {
                    photoPreview.innerHTML = `<img src="${this.result}" alt="Profile Preview">`;
                });
                
                reader.readAsDataURL(file);
            }
        });
        
        function submitForm() {
            // Check if all required fields are filled
            const requiredFields = document.querySelectorAll('[required]');
            let allValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!allValid) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Get the photo data if uploaded
            let photoData = null;
            if (photoInput.files[0]) {
                photoData = document.getElementById('photoPreview').querySelector('img')?.src || null;
            }
            
            // Store form data in localStorage
            const formData = {
                photo: photoData,
                name: document.getElementById('name').value,
                role: document.getElementById('role').value,
                city: document.getElementById('city').value,
                level: document.getElementById('level').value,
                badge: document.getElementById('badge').value,
                work: document.getElementById('work').value,
                goal: document.getElementById('goal').value,
                plan: document.getElementById('plan').value,
                character: document.getElementById('character').value
            };
            
            localStorage.setItem('profileData', JSON.stringify(formData));
            window.location.href = 'matchcard.html';
            // Prevent default form submission (since we're handling it)
            return false;
        }