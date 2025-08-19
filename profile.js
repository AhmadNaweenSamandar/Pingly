        // DOM Elements
        const editProfilePic = document.getElementById('editProfilePic');
        const profilePic = document.getElementById('profilePic');
        const profilePicModal = document.getElementById('profilePicModal');
        const updateProfileBtn = document.getElementById('updateProfileBtn');
        const profileModal = document.getElementById('profileModal');
        const networkCard = document.getElementById('networkCard');
        const networkModal = document.getElementById('networkModal');
        const codingStats = document.getElementById('codingStats');
        const networkUsers = document.getElementById('networkUsers');
        const networkList = document.getElementById('networkList');
        const newProfilePic = document.getElementById('newProfilePic');
        const uploadPicBtn = document.getElementById('uploadPicBtn');
        const removePicBtn = document.getElementById('removePicBtn');
        
        // Sample Data (would come from your backend in real app)
        const userProfile = {
            name: "Alex Johnson",
            role: "Frontend Developer",
            level: "Level 1",
            xp: 499,
            org: "Tech University",
            phone: "+1 (555) 123-4567",
            email: "alex.johnson@example.com",
            projectsPosted: 7,
            projectsJoined: 3,
            network: [
                { name: "Sarah Miller", initial: "S" },
                { name: "James Wilson", initial: "J" },
                { name: "Emma Davis", initial: "E" },
                { name: "Michael Brown", initial: "M" },
                { name: "Olivia Taylor", initial: "O" },
                { name: "William Anderson", initial: "W" },
                { name: "Sophia Thomas", initial: "S" },
                { name: "Benjamin Jackson", initial: "B" },
                { name: "Isabella White", initial: "I" },
                { name: "Lucas Harris", initial: "L" }
            ],
            codingHours: [2, 3, 1, 4, 2, 3, 5, 2, 1, 4, 3, 2, 4, 1, 3, 2, 5, 3, 2, 1, 4, 3, 2, 1, 3, 4, 2, 1, 3, 2]
        };
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Load profile data
            loadProfileData();
            
            // Generate coding stats bars
            generateCodingStats();
            
            // Generate network circles
            generateNetworkCircles();
            
            // Generate network list
            generateNetworkList();
        });
        
        // Event Listeners
        editProfilePic.addEventListener('click', function() {
            profilePicModal.style.display = 'flex';
        });
        
        updateProfileBtn.addEventListener('click', function() {
            // Populate modal with current data
            document.getElementById('updateName').value = userProfile.name;
            document.getElementById('updateRole').value = userProfile.role;
            document.getElementById('updateOrg').value = userProfile.org;
            document.getElementById('updatePhone').value = userProfile.phone;
            document.getElementById('updateEmail').value = userProfile.email;
            
            profileModal.style.display = 'flex';
        });
        
        networkCard.addEventListener('click', function() {
            networkModal.style.display = 'flex';
        });
        
        document.getElementById('cancelPicBtn').addEventListener('click', function() {
            profilePicModal.style.display = 'none';
        });
        
        document.getElementById('cancelProfileBtn').addEventListener('click', function() {
            profileModal.style.display = 'none';
        });
        
        document.getElementById('closeNetworkBtn').addEventListener('click', function() {
            networkModal.style.display = 'none';
        });
        
        document.getElementById('saveProfileBtn').addEventListener('click', function() {
            // Update profile data
            userProfile.name = document.getElementById('updateName').value;
            userProfile.role = document.getElementById('updateRole').value;
            userProfile.org = document.getElementById('updateOrg').value;
            userProfile.phone = document.getElementById('updatePhone').value;
            userProfile.email = document.getElementById('updateEmail').value;
            
            // Update UI
            loadProfileData();
            
            // Close modal
            profileModal.style.display = 'none';
        });
        
        uploadPicBtn.addEventListener('click', function() {
            const file = newProfilePic.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePic.innerHTML = `<img src="${e.target.result}" alt="Profile Picture" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
                    profilePicModal.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
        
        removePicBtn.addEventListener('click', function() {
            profilePic.innerHTML = '<i class="fas fa-user"></i>';
            profilePicModal.style.display = 'none';
        });
        
        // Functions
        function loadProfileData() {
            document.getElementById('profileName').textContent = userProfile.name;
            document.getElementById('profileRole').textContent = userProfile.role;
            document.getElementById('profileLevel').textContent = `${userProfile.level} | ${userProfile.xp} XP`;
            document.getElementById('profileOrg').textContent = userProfile.org;
            document.getElementById('profilePhone').textContent = userProfile.phone;
            document.getElementById('profileEmail').textContent = userProfile.email;
            
            // Update XP progress bar
            const xpPercentage = (userProfile.xp % 1000) / 10;
            document.querySelector('.xp-progress-bar').style.width = `${xpPercentage}%`;
            
            // Update projects bars
            const totalProjects = userProfile.projectsPosted + userProfile.projectsJoined;
            const postedPercentage = (userProfile.projectsPosted / totalProjects) * 100;
            const joinedPercentage = (userProfile.projectsJoined / totalProjects) * 100;
            
            document.querySelector('.projects-posted').style.width = `${postedPercentage}%`;
            document.querySelector('.projects-joined').style.width = `${joinedPercentage}%`;
            
            // Update projects legend
            document.querySelector('.posted-legend span').textContent = `${userProfile.projectsPosted} Projects Posted`;
            document.querySelector('.joined-legend span').textContent = `${userProfile.projectsJoined} Projects Joined`;
            // Update badge text
            const badgeContainer = document.querySelector('.badge-container');
            badgeContainer.innerHTML = 'Python Pro'; // Or whatever badge you want to display
            badgeContainer.style.fontWeight = 'bold';
            badgeContainer.style.color = 'var(--teal-blue)';
        }
        
        function generateCodingStats() {
            codingStats.innerHTML = '';
    
            // Create container for day labels
            const dayLabelsContainer = document.createElement('div');
            dayLabelsContainer.className = 'day-labels';
    
            userProfile.codingHours.forEach((hours, index) => {
                const dayBar = document.createElement('div');
                dayBar.className = 'coding-day';
                dayBar.style.height = `${(hours / 6) * 100}%`;
                dayBar.title = `${hours} hours`;
        
            // Add day label for every 5th day
            if (index % 5 === 0 || index === 29) {
                const dayLabel = document.createElement('div');
                dayLabel.className = 'day-label';
                dayLabel.textContent = `${index + 1}`;
                dayLabelsContainer.appendChild(dayLabel);
            } else if (index === 0) {
                // Add first day label
                const dayLabel = document.createElement('div');
                dayLabel.className = 'day-label';
                dayLabel.textContent = '1';
                dayLabelsContainer.appendChild(dayLabel);
            } else {
                // Add empty space for other days
                const emptySpace = document.createElement('div');
                emptySpace.className = 'day-label';
                emptySpace.textContent = '';
                dayLabelsContainer.appendChild(emptySpace);
            }
        
            codingStats.appendChild(dayBar);
        });
    
        // Add day labels container after the bars
        codingStats.appendChild(dayLabelsContainer);
    
        // Add "Day" label at the bottom
        const dayTextLabel = document.createElement('div');
        dayTextLabel.className = 'day-text-label';
        dayTextLabel.textContent = 'Day';
        dayTextLabel.style.textAlign = 'center';
        dayTextLabel.style.marginTop = '5px';
        dayTextLabel.style.fontSize = '0.8rem';
        dayTextLabel.style.color = 'var(--dark-gray)';
        codingStats.parentNode.appendChild(dayTextLabel);
    }
        
        function generateNetworkCircles() {
            networkUsers.innerHTML = '';
            
            userProfile.network.forEach(user => {
                const userCircle = document.createElement('div');
                userCircle.className = 'network-user';
                userCircle.textContent = user.initial;
                userCircle.title = user.name;
                networkUsers.appendChild(userCircle);
            });
        }
        
        function generateNetworkList() {
            networkList.innerHTML = '';
            
            userProfile.network.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = user.name;
                networkList.appendChild(listItem);
            });
        }
        
        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === profilePicModal) {
                profilePicModal.style.display = 'none';
            }
            if (event.target === profileModal) {
                profileModal.style.display = 'none';
            }
            if (event.target === networkModal) {
                networkModal.style.display = 'none';
            }
        });