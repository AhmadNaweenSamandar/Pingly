document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const createToggle = document.getElementById('createToggle');
    const joinToggle = document.getElementById('joinToggle');
    const toggleIndicator = document.querySelector('.toggle-indicator');
    const createForm = document.getElementById('createForm');
    const joinForm = document.getElementById('joinForm');
    const inviteOptions = document.querySelectorAll('.invite-option');
    const linkContainer = document.getElementById('linkContainer');
    const joinLinkContainer = document.getElementById('joinLinkContainer');
    const roomLink = document.getElementById('roomLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const createBackBtn = document.getElementById('createBackBtn');
    const joinBackBtn = document.getElementById('joinBackBtn');
    
    // Toggle between Create and Join forms
    createToggle.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            // Update toggle UI
            this.classList.add('active');
            joinToggle.classList.remove('active');
            toggleIndicator.style.transform = 'translateX(0)';
            
            // Switch forms
            createForm.classList.add('active');
            joinForm.classList.remove('active');
            
            // Reset invitation method to direct
            resetInviteOptions();
            document.querySelector('#createForm .invite-option[data-method="direct"]').classList.add('active');
            linkContainer.classList.add('hidden');
        }
    });
    
    joinToggle.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            // Update toggle UI
            this.classList.add('active');
            createToggle.classList.remove('active');
            toggleIndicator.style.transform = 'translateX(100%)';
            
            // Switch forms
            joinForm.classList.add('active');
            createForm.classList.remove('active');
            
            // Reset invitation method to direct
            resetInviteOptions();
            document.querySelector('#joinForm .invite-option[data-method="direct"]').classList.add('active');
            joinLinkContainer.classList.add('hidden');
        }
    });
    
    // Handle invitation method selection
    inviteOptions.forEach(option => {
        option.addEventListener('click', function() {
            const form = this.closest('.room-form');
            const method = this.dataset.method;
            
            // Update active state
            resetInviteOptions(form);
            this.classList.add('active');
            
            // Show/hide link containers
            if (form.id === 'createForm') {
                linkContainer.classList.toggle('hidden', method !== 'link');
                if (method === 'link') {
                    generateRoomLink();
                }
            } else {
                joinLinkContainer.classList.toggle('hidden', method !== 'link');
            }
        });
    });
    
    // Generate room link for sharing
    function generateRoomLink() {
        const roomName = document.getElementById('roomName').value || 'pingroom';
        const passcode = document.getElementById('createPasscode').value || '123456';
        const baseUrl = window.location.href.split('?')[0].replace('create-room.html', '');
        const link = `${baseUrl}join-room.html?room=${encodeURIComponent(roomName)}&code=${passcode}`;
        roomLink.value = link;
    }
    
    // Copy room link to clipboard
    copyLinkBtn.addEventListener('click', function() {
        roomLink.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
    
    // Back buttons - redirect to main page
    createBackBtn.addEventListener('click', function() {
        window.location.href = 'livecode.html';
    });
    
    joinBackBtn.addEventListener('click', function() {
        window.location.href = 'livecode.html';
    });
    
    // Form submissions
    createForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const passcode = document.getElementById('createPasscode').value;
        if (passcode.length === 6) {
            window.location.href = 'code-platform.html?action=create&code=' + passcode;
        }
    });
    
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const passcode = document.getElementById('joinPasscode').value;
        if (passcode.length === 6) {
            window.location.href = 'code-platform.html?action=join&code=' + passcode;
        }
    });
    
    // Helper function to reset invite options
    function resetInviteOptions(form = null) {
        const options = form ? 
            form.querySelectorAll('.invite-option') : 
            document.querySelectorAll('.invite-option');
            
        options.forEach(opt => opt.classList.remove('active'));
    }
    
    // Generate link when passcode changes
    document.getElementById('createPasscode').addEventListener('input', function() {
        if (document.querySelector('#createForm .invite-option.active').dataset.method === 'link') {
            generateRoomLink();
        }
    });
});