// Sample profile data
const profiles = [
    {
        photo: null,
        name: "John Doe",
        role: "Frontend Developer",
        city: "Ottawa",
        level: "Intermediate",
        badge: "JavaScript Expert",
        work: "Building responsive web applications using React and Node.js",
        goal: "To become a full-stack architect and mentor junior developers",
        plan: "By continuously learning new technologies and contributing to open source projects",
        character: "Detail-oriented, team player, and passionate about solving complex problems"
    },
    {
        photo: null,
        name: "Jane Smith",
        role: "UX Designer",
        city: "Toronto",
        level: "Advanced",
        badge: "UI/UX Specialist",
        work: "Creating intuitive user experiences for web and mobile applications",
        goal: "To lead a design team at a major tech company",
        plan: "Through networking, continuous learning, and building a strong portfolio",
        character: "Creative, empathetic, and focused on user-centered design"
    }
];

let currentProfileIndex = 0;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements after they exist
    const profileImage = document.getElementById('profileImage');
    const profileName = document.getElementById('profileName');
    const profileRoleCity = document.getElementById('profileRoleCity');
    const profileBadge = document.getElementById('profileBadge');
    const matchBtn = document.getElementById('matchBtn');
    const skipBtn = document.getElementById('skipBtn');
    const saveBtn = document.getElementById('saveBtn');
    const currentCard = document.getElementById('currentCard');
    const detailsPopup = document.getElementById('detailsPopup');
    const closePopup = document.getElementById('closePopup');
    const popupWork = document.getElementById('popupWork');
    const popupGoal = document.getElementById('popupGoal');
    const popupPlan = document.getElementById('popupPlan');
    const popupCharacter = document.getElementById('popupCharacter');

    // Load profile data from localStorage if available
    const userProfile = JSON.parse(localStorage.getItem('profileData'));
    if (userProfile) {
        profiles.unshift(userProfile); // Add user profile to beginning of array
    }
    loadProfile(currentProfileIndex);

    // Add click event for profile image
    profileImage.addEventListener('click', function() {
        detailsPopup.style.display = 'flex';
    });

    // Other event listeners
    closePopup.addEventListener('click', function() {
        detailsPopup.style.display = 'none';
    });

    matchBtn.addEventListener('click', function() {
        currentCard.classList.add('disappear');
        setTimeout(() => {
            showNextProfile();
            currentCard.classList.remove('disappear');
        }, 800);
    });

    skipBtn.addEventListener('click', function() {
        currentCard.classList.add('flip');
        setTimeout(() => {
            showNextProfile();
            currentCard.classList.remove('flip');
        }, 800);
    });

    saveBtn.addEventListener('click', function() {
        // Toggle save state
        this.classList.toggle('fas');
        this.classList.toggle('far');
        alert('Profile saved for later');
    });

    // Load profile data
    function loadProfile(index) {
        const profile = profiles[index];
        
        // Set profile image
        if (profile.photo) {
            profileImage.innerHTML = `<img src="${profile.photo}" alt="Profile Image">`;
        } else {
            profileImage.innerHTML = '<i class="fas fa-user profile-icon"></i>';
        }
        
        // Set profile details
        profileName.textContent = profile.name;
        profileRoleCity.textContent = `${profile.role} | ${profile.city}`;
        profileBadge.textContent = profile.badge;
        
        // Set popup content
        popupWork.textContent = profile.work;
        popupGoal.textContent = profile.goal;
        popupPlan.textContent = profile.plan;
        popupCharacter.textContent = profile.character;
    }

    // Show next profile
    function showNextProfile() {
        currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
        loadProfile(currentProfileIndex);
    }
});