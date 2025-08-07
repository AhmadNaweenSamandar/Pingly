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
    // DOM Elements
    const tabs = document.querySelectorAll('.tab');
    const tabHighlight = document.querySelector('.tab-highlight');
    const contentSections = document.querySelectorAll('.content-section');
    // Sample projects data
    const xpLeaderboard = [
        { name: "Alex Johnson", xp: 1250 },
        { name: "Sam Wilson", xp: 980 },
        { name: "Taylor Smith", xp: 875 }
    ];

    const trendingProjects = [
        { title: "AI Chatbot", joins: 42 },
        { title: "E-commerce Platform", joins: 38 },
        { title: "Health Tracker", joins: 35 }
    ];
    
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
        renderLeaderboard();
        renderTrendingProjects();
        renderQuestions();
    }
        // Render XP Leaderboard
    function renderLeaderboard() {
        const container = document.querySelector('.xp-chart .ranking-list');
        container.innerHTML = xpLeaderboard.map((user, index) => `
            <div class="ranking-item">
                <div class="rank-number">${index + 1}</div>
                <div>
                    <div class="rank-name">${user.name}</div>
                    <div class="rank-xp">${user.xp} XP</div>
                </div>
            </div>
        `).join('');
    }
    // Render Trending Projects
    function renderTrendingProjects() {
        const container = document.querySelector('.trending-projects .ranking-list');
        container.innerHTML = trendingProjects.map((project, index) => `
            <div class="ranking-item">
                <div class="rank-number">${index + 1}</div>
                <div class="rank-title">${project.title}</div>
                <div class="rank-joins">${project.joins} joins</div>
            </div>
        `).join('');
    }
    // Render Projects Feed
    function renderProjects() {
        const container = document.querySelector('.projects-feed');
        container.innerHTML = sampleProjects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <div class="project-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="project-details">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                </div>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="join-btn">Join</button>
                    <button class="reaction-btn">🍀</button>
                </div>
            </div>
        `).join('');
    }
    
        // Render Q&A Feed
    function renderQuestions() {
        const container = document.querySelector('.qa-feed');
        container.innerHTML = sampleQuestions.map(qa => `
            <div class="qa-card">
                <div class="qa-header">
                    <div class="qa-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="qa-details">
                        <h4>${qa.question}</h4>
                        <p class="qa-note">${qa.note}</p>
                    </div>
                </div>
                <div class="qa-actions">
                    <button class="like-btn"><i class="far fa-thumbs-up"></i> Like</button>
                    <button class="reply-btn"><i class="far fa-comment"></i> Reply</button>
                </div>
            </div>
        `).join('');
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Tab Switching
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Move highlight
                if (this.id === 'projectsTab') {
                    tabHighlight.style.left = '5px';
                    document.getElementById('projectsSection').classList.add('active');
                    document.getElementById('qaSection').classList.remove('active');
                } else {
                    tabHighlight.style.left = 'calc(50% + 5px)';
                    document.getElementById('qaSection').classList.add('active');
                    document.getElementById('projectsSection').classList.remove('active');
                }
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