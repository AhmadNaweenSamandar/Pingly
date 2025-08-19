            document.addEventListener('DOMContentLoaded', function() {
            // State management
            const state = {
                currentUser: {
                    name: "Current User",
                    xp: 0,
                    badges: []
                },
                projects: [
                    {
                        id: 1,
                        title: "E-commerce Website Development",
                        description: "Looking for frontend developers to build a React-based e-commerce platform.",
                        tags: ["React", "JavaScript", "CSS"],
                        author: "Jane D.",
                        joins: 5,
                        wishes: 8,
                        postedAt: new Date()
                    },
                    {
                        id: 2,
                        title: "AI Chatbot for Customer Service",
                        description: "Need Python developers with NLP experience to create an AI chatbot.",
                        tags: ["Python", "NLP", "AI"],
                        author: "Alex K.",
                        joins: 3,
                        wishes: 12,
                        postedAt: new Date(Date.now() - 86400000) // Yesterday
                    },
                    {
                        id: 3,
                        title: "AI Chatbot for research",
                        description: "Need researcher to work on AI algorithm.",
                        tags: ["Python", "NLP", "AI"],
                        author: "Mohammad",
                        joins: 7,
                        wishes: 12,
                        postedAt: new Date(Date.now() - 86400004) // Yesterday
                    }
                ],
                questions: [
                    {
                        id: 1,
                        question: "How do I use React hooks effectively?",
                        note: "I'm new to React and confused about useEffect",
                        author: "Beginner Dev",
                        likes: 4,
                        postedAt: new Date()
                    },
                    {
                        id: 2,
                        question: "Best practices for REST API authentication?",
                        note: "Working on a Node.js backend",
                        author: "Backend Engineer",
                        likes: 7,
                        postedAt: new Date(Date.now() - 86400000) // Yesterday
                    },
                    {
                        id: 3,
                        question: "what is the easiest programming language?",
                        note: "Working AI Chatbot",
                        author: "Mohammad",
                        likes: 9,
                        postedAt: new Date(Date.now() - 86400009) // Yesterday
                    }
                ],
                leaderboard: [
                    { name: "Mohammad", xp: 1250, badges: ["Python Pro", "React Expert"] },
                    { name: "Sam Wilson", xp: 980, badges: ["JavaScript Ninja"] },
                    { name: "Taylor Smith", xp: 875, badges: ["CSS Wizard"] },
                    { name: "Alex", xp: 1300, badges: ["Project Pro"] },
                    { name: "Taylor Smith", xp: 875, badges: ["CSS Wizard", "Python Pro"]}
                ]
            };

            // DOM Elements
            const dom = {
                postProjectBtn: document.getElementById('postProjectBtn'),
                matchBtn: document.getElementById('matchBtn'),
                askQuestionBtn: document.getElementById('askQuestionBtn'),
                liveCodeBtn: document.getElementById('liveCodeBtn'),
                profileIcon: document.getElementById('profileIcon'),
                projectsTab: document.getElementById('projectsTab'),
                qaTab: document.getElementById('qaTab'),
                tabHighlight: document.querySelector('.tab-highlight'),
                filterBtn: document.getElementById('filterBtn'),
                projectsSection: document.getElementById('projectsSection'),
                qaSection: document.getElementById('qaSection'),
                projectsFeed: document.querySelector('.projects-feed'),
                qaFeed: document.querySelector('.qa-feed'),
                postProjectModal: document.getElementById('postProjectModal'),
                joinProjectModal: document.getElementById('joinProjectModal'),
                askQuestionModal: document.createElement('div'), // Will be created dynamically
                projectForm: document.getElementById('projectForm'),
                joinForm: document.querySelector('#joinProjectModal form'),
                leaderboardList: document.querySelector('.xp-chart .ranking-list'),
                trendingList: document.querySelector('.trending-projects .ranking-list')
            };


            // Initialize modals
            function initModals() {
                // Ask Question Modal
                dom.askQuestionModal.className = 'modal';
                dom.askQuestionModal.id = 'askQuestionModal';
                dom.askQuestionModal.innerHTML = `
                    <div class="modal-content">
                        <h2>Ask a Question</h2>
                        <form id="questionForm">
                            <div class="form-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="Your name" required>
                            </div>
                            <div class="form-group">
                                <label>Program of Study</label>
                                <input type="text" placeholder="Your program" required>
                            </div>
                            <div class="form-group">
                                <label>Question</label>
                                <input type="text" placeholder="Your question" required>
                            </div>
                            <div class="form-group">
                                <label>Additional Notes</label>
                                <textarea placeholder="Any additional details"></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="cancel-btn">Back</button>
                                <button type="submit" class="submit-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                `;
                document.body.appendChild(dom.askQuestionModal);
            }
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

            // Render functions
            function renderProjects() {
                // Sort projects by joins and wishes
                const sortedProjects = [...state.projects].sort((a, b) => {
                    if (a.joins !== b.joins) return b.joins - a.joins;
                    if (a.wishes !== b.wishes) return b.wishes - a.wishes;
                    return b.postedAt - a.postedAt;
                });

                dom.projectsFeed.innerHTML = sortedProjects.map(project => `
                    <div class="project-card" data-project-id="${project.id}">
                        <div class="project-header">
                            <div class="project-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="project-details">
                                <h4 class="project-title">${project.title}</h4>
                                <p class="project-description">${project.description}</p>
                            </div>
                        </div>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-actions">
                            <button class="join-btn">Join (${project.joins})</button>
                            <button class="wish-btn">🍀 ${project.wishes}</button>
                        </div>
                    </div>
                `).join('');
            }

            function renderQuestions() {
                dom.qaFeed.innerHTML = state.questions.map((question, index) => `
                    <div class="qa-card" data-question-id="${index}">
                        <div class="qa-header">
                            <div class="qa-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="qa-details">
                                <h4 class="qa-question">${question.question}</h4>
                                <p class="qa-note">${question.note || ''}</p>
                            </div>
                        </div>
                        <div class="qa-actions">
                            <button class="reply-btn">Reply</button>
                            <button class="like-btn">Like (${question.likes || 0})</button>
                        </div>
                    </div>
                `).join('');
            }

            function renderLeaderboard() {
                // Sort leaderboard by XP
                const sortedLeaderboard = [...state.leaderboard].sort((a, b) => b.xp - a.xp);
                
                dom.leaderboardList.innerHTML = sortedLeaderboard.map((user, index) => `
                    <div class="ranking-item">
                        <div class="rank-number ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}">${index + 1}</div>
                        <div class="rank-details">
                            <div class="rank-name">${user.name}</div>
                            <div class="rank-xp">${user.xp} XP</div>
                            ${user.badges.map(badge => `<span class="rank-badge">${badge}</span>`).join('')}
                        </div>
                    </div>
                `).join('');
            }

            function renderTrendingProjects() {
                // Sort projects by joins and wishes
                const sortedProjects = [...state.projects].sort((a, b) => {
                    if (a.joins !== b.joins) return b.joins - a.joins;
                    if (a.wishes !== b.wishes) return b.wishes - a.wishes;
                    return b.postedAt - a.postedAt;
                }).slice(0, 3); // Top 3 only

                dom.trendingList.innerHTML = sortedProjects.map((project, index) => `
                    <div class="ranking-item">
                        <div class="rank-number">${index + 1}</div>
                        <div class="rank-details">
                            <div class="rank-title">${project.title}</div>
                            <div class="rank-joins">${project.joins} joins</div>
                            <div class="rank-wishes">${project.wishes} wishes</div>
                        </div>
                    </div>
                `).join('');
            }

            // Event Handlers
            function setupEventListeners() {
                // Tab Switching
                [dom.projectsTab, dom.qaTab].forEach(tab => {
                    tab.addEventListener('click', function() {
                        [dom.projectsTab, dom.qaTab].forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                        
                        if (this === dom.projectsTab) {
                            dom.tabHighlight.style.left = '5px';
                            dom.projectsSection.classList.add('active');
                            dom.qaSection.classList.remove('active');
                        } else {
                            dom.tabHighlight.style.left = 'calc(50% + 5px)';
                            dom.qaSection.classList.add('active');
                            dom.projectsSection.classList.remove('active');
                        }
                    });
                });

                // Profile Icon - Redirect to profile page
                dom.profileIcon.addEventListener('click', function() {
                    // In a real app, this would redirect to profile page
                    window.location.href = 'profile.html';
                });

                // Post Project Modal
                dom.postProjectBtn.addEventListener('click', function() {
                    dom.postProjectModal.classList.add('active');
                });

                // Match Button - Redirect to match page
                dom.matchBtn.addEventListener('click', function() {
                    // Add XP for matching
                    state.currentUser.xp += 2;
                    updateLeaderboard();
                    window.location.href = 'matchlandingpage.html'; // You'll need to create this page
                });

                // Ask Question Modal
                dom.askQuestionBtn.addEventListener('click', function() {
                    document.getElementById('askQuestionModal').classList.add('active');
                });

                // Live Code Button - Redirect to live coding page
                dom.liveCodeBtn.addEventListener('click', function() {
                    window.location.href = 'livecode.html'; // Redirect to your live coding page
                });

                // Project Form Submission
                dom.projectForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(this);
                    
                    // Add new project
                    const newProject = {
                        id: state.projects.length + 1,
                        title: formData.get('name'),
                        description: formData.get('description'),
                        tags: formData.get('tags').split(',').map(tag => tag.trim()),
                        author: state.currentUser.name,
                        joins: 0,
                        wishes: 0,
                        postedAt: new Date()
                    };
                    
                    //Add to state
                    state.projects.push(newProject);

                    //Update XP
                    state.currentUser.xp += 5;
                    updateLeaderboard();

                    //Re-render projects
                    renderProjects();
                    renderTrendingProjects();
                    
                    // Reset and close
                    this.reset();
                    dom.postProjectModal.classList.remove('active');
                    
                });

                // Join Project (delegated event)
                dom.projectsFeed.addEventListener('click', function(e) {
                    if (e.target.classList.contains('join-btn')) {
                        const projectId = parseInt(e.target.closest('.project-card').dataset.projectId);
                        dom.joinProjectModal.classList.add('active');
                        
                        // Store the project ID in the modal for later use
                        dom.joinProjectModal.dataset.projectId = projectId;
                    }
                    
                    if (e.target.classList.contains('wish-btn')) {
                        const projectCard = e.target.closest('.project-card');
                        const projectId = parseInt(projectCard.dataset.projectId);
                        const project = state.projects.find(p => p.id === projectId);
                        
                        if (project) {
                            project.wishes += 1;
                            renderProjects();
                            renderTrendingProjects();
                        }
                    }
                });

                // Join Form Submission
                document.querySelector('#joinProjectModal form')?.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const projectId = parseInt(dom.joinProjectModal.dataset.projectId);

                    //Find and Update the project
                    const project = state.projects.find(p => p.id === projectId);
                    
                    if (project) {
                        project.joins += 1;
                        state.currentUser.xp += 1; // XP for joining project
                        updateLeaderboard();
                        
                        //render project
                        renderProjects();
                        renderTrendingProjects();
                    }
                    this.reset();
                    dom.joinProjectModal.classList.remove('active');
                        
                });

                // Question Form Submission
                document.getElementById('questionForm')?.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(this);
                    
                    // Add new question
                    const newQuestion = {
                        question: formData.get('question'),
                        note: formData.get('notes'),
                        author: formData.get('name'),
                        program: formData.get('program'),
                        likes: 0,
                        postedAt: new Date()
                    };
                    
                    state.questions.push(newQuestion);
                    state.currentUser.xp += 1; // XP for asking question
                    updateLeaderboard();
                    
                    //Render question
                    renderQuestions();
                    // Reset and close
                    this.reset();
                    dom.askQuestionModal.classList.remove('active');
                    
                });

                // Modal Close Buttons
                document.addEventListener('click', function(e) {
                    if (e.target.classList.contains('cancel-btn')) {
                        document.querySelectorAll('.modal').forEach(modal => {
                            modal.classList.remove('active');
                        });
                    }
                });

                // Back to Dashboard from any modal
                document.querySelectorAll('.cancel-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        window.location.href = 'dashboard.html';
                    });
                });
            }

            // Helper functions
            function updateLeaderboard() {
                // Find or add current user to leaderboard
                let userIndex = state.leaderboard.findIndex(u => u.name === state.currentUser.name);
                
                if (userIndex === -1) {
                    state.leaderboard.push({
                        name: state.currentUser.name,
                        xp: state.currentUser.xp,
                        badges: state.currentUser.badges
                    });
                } else {
                    state.leaderboard[userIndex].xp = state.currentUser.xp;
                }
                
                renderLeaderboard();
            }
            

function setupFilterButton() {
    const filterBtn = document.getElementById('filterBtn');
    const filterOptions = document.querySelector('.filter-options');
    let timeoutId;
    
    filterBtn.addEventListener('click', function() {
        // Toggle visibility
        filterOptions.classList.toggle('active');
        
        // Reset timer whenever filter is clicked
        clearTimeout(timeoutId);
        
        if (filterOptions.classList.contains('active')) {
            // Set timer to hide after 5 seconds if no interaction
            timeoutId = setTimeout(() => {
                filterOptions.classList.remove('active');
            }, 5000);
            
            // Keep open when hovering over options
            filterOptions.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
            });
            
            filterOptions.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                    filterOptions.classList.remove('active');
                }, 5000);
            });
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target)) {
            filterOptions.classList.remove('active');
            clearTimeout(timeoutId);
        }
    });
    
    // Filter functionality
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            const filterType = this.textContent;
            console.log(`Filtering by: ${filterType}`);
            
            // Implement your filtering logic here
            // For example:
            if (filterType === 'Most Joined') {
                // Sort projects by joins
                state.projects.sort((a, b) => b.joins - a.joins);
            } else if (filterType === 'Trending') {
                // Sort by trending algorithm (joins + wishes)
                state.projects.sort((a, b) => 
                    (b.joins + b.wishes) - (a.joins + a.wishes)
                );
            } else if (filterType === 'Best Wished') {
                // Sort by wishes
                state.projects.sort((a, b) => b.wishes - a.wishes);
            }
            
            renderProjects();
            filterOptions.classList.remove('active');
        });
    });
}

            // Initialize the dashboard
            function initDashboard() {
                initModals();
                setupFilterButton();
                renderProjects();
                renderQuestions();
                renderLeaderboard();
                renderTrendingProjects();
                setupEventListeners();
            }

            initDashboard();
        });