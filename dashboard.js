document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const postProjectBtn = document.getElementById('postProjectBtn');
    const matchBtn = document.getElementById('matchBtn');
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const liveCodeBtn = document.getElementById('liveCodeBtn');
    const profileIcon = document.getElementById('profileIcon');
    const projectsTab = document.getElementById('projectsTab');
    const qaTab = document.getElementById('qaTab');
    const selectionIndicator = document.querySelector('.selection-indicator');
    const filterBtn = document.getElementById('filterBtn');
    const filterOptions = document.querySelector('.filter-options');
    const projectsFeed = document.getElementById('projectsFeed');
    const postProjectModal = document.getElementById('postProjectModal');
    const joinProjectModal = document.getElementById('joinProjectModal');
    const projectForm = document.getElementById('projectForm');
    const tagsInput = document.querySelector('.tags-input input');
    const tagsContainer = document.querySelector('.tags-container');
    
    // Sample projects data
    const sampleProjects = [
        {
            id: 1,
            title: "E-commerce Website Development",
            description: "Looking for frontend developers to build a React-based e-commerce platform with modern UI/UX design principles.",
            tags: ["React", "JavaScript", "CSS", "E-commerce"],
            author: "Jane D.",
            joined: 5,
            reactions: 8
        },
        {
            id: 2,
            title: "AI Chatbot for Customer Service",
            description: "Need Python developers with NLP experience to create an AI chatbot that can handle customer inquiries.",
            tags: ["Python", "NLP", "Machine Learning", "AI"],
            author: "Alex K.",
            joined: 3,
            reactions: 12
        }
    ];
    
    // Initialize dashboard
    function initDashboard() {
        renderProjects();
        setupEventListeners();
    }
    
    // Render projects to the feed
    function renderProjects() {
        projectsFeed.innerHTML = '';
        
        sampleProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-header">
                    <div class="project-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="project-details">
                        <div class="project-title">${project.title}</div>
                        <div class="project-description">${project.description}</div>
                    </div>
                </div>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="join-btn" data-project-id="${project.id}">Join (${project.joined})</button>
                    <button class="reaction-btn" data-project-id="${project.id}">🍀 ${project.reactions}</button>
                </div>
            `;
            projectsFeed.appendChild(projectCard);
        });
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        // Top navigation buttons
        [postProjectBtn, matchBtn, askQuestionBtn, liveCodeBtn].forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                [postProjectBtn, matchBtn, askQuestionBtn, liveCodeBtn].forEach(b => {
                    b.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real app, you would load different content here
                console.log(`Switched to ${this.querySelector('span').textContent} view`);
            });
        });
        
        // Profile icon click
        profileIcon.addEventListener('click', function() {
            // In a real app, this would redirect to profile page
            console.log('Redirecting to profile page');
            // window.location.href = 'profile.html';
        });
        
        // Projects/Q&A tabs
        projectsTab.addEventListener('click', function() {
            projectsTab.classList.add('active');
            qaTab.classList.remove('active');
            selectionIndicator.style.left = '0';
            selectionIndicator.style.width = '50%';
            // Load projects content
            console.log('Loading projects content');
        });
        
        qaTab.addEventListener('click', function() {
            qaTab.classList.add('active');
            projectsTab.classList.remove('active');
            selectionIndicator.style.left = '50%';
            selectionIndicator.style.width = '50%';
            // Load Q&A content
            console.log('Loading Q&A content');
        });
        
        // Filter button
        filterBtn.addEventListener('click', function() {
            filterOptions.classList.toggle('active');
            
            if (filterOptions.classList.contains('active')) {
                // Hide after 5 seconds
                setTimeout(() => {
                    filterOptions.classList.remove('active');
                }, 5000);
            }
        });
        
        // Filter options
        document.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', function() {
                // Apply filter
                console.log(`Filtering by: ${this.textContent}`);
                filterOptions.classList.remove('active');
            });
        });
        
        // Post project modal
        postProjectBtn.addEventListener('click', function() {
            postProjectModal.classList.add('active');
        });
        
        // Join project buttons (delegated event)
        projectsFeed.addEventListener('click', function(e) {
            if (e.target.classList.contains('join-btn')) {
                const projectId = e.target.getAttribute('data-project-id');
                console.log(`Joining project ${projectId}`);
                joinProjectModal.classList.add('active');
            }
            
            if (e.target.classList.contains('reaction-btn')) {
                const projectId = e.target.getAttribute('data-project-id');
                console.log(`Reacted to project ${projectId}`);
                // Update reaction count visually
                const reactionCount = e.target.textContent.match(/\d+/)[0];
                e.target.textContent = `🍀 ${parseInt(reactionCount) + 1}`;
            }
        });
        
        // Modal close buttons
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                postProjectModal.classList.remove('active');
                joinProjectModal.classList.remove('active');
            });
        });
        
        // Project form submission
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would send this data to the server
            console.log('Project submitted:', {
                name: this.querySelector('input[type="text"]').value,
                field: this.querySelector('select').value,
                description: this.querySelector('textarea').value,
                tags: Array.from(document.querySelectorAll('.tag-input')).map(tag => tag.textContent.trim())
            });
            
            // Close modal and reset form
            postProjectModal.classList.remove('active');
            this.reset();
            tagsContainer.innerHTML = '';
        });
        
        // Tags input
        tagsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                const tag = document.createElement('span');
                tag.className = 'tag-input';
                tag.innerHTML = `${this.value.trim()} <span>&times;</span>`;
                tagsContainer.appendChild(tag);
                this.value = '';
                
                // Add click event to remove tag
                tag.querySelector('span').addEventListener('click', function() {
                    tag.remove();
                });
            }
        });
    }
    
    // Initialize the dashboard
    initDashboard();
});