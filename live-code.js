// live-code.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const createRoomBtn = document.getElementById('createRoomBtn');
    const joinRoomBtn = document.getElementById('joinRoomBtn');
    const roomSetup = document.getElementById('roomSetup');
    const inviteMethod = document.getElementById('inviteMethod');
    const projectInviteContainer = document.getElementById('projectInviteContainer');
    const linkContainer = document.getElementById('linkContainer');
    const startSessionBtn = document.getElementById('startSessionBtn');
    const cancelSetupBtn = document.getElementById('cancelSetupBtn');
    const editorContainer = document.getElementById('editorContainer');
    const roomNameInput = document.getElementById('roomName');
    const roomPasscode = document.getElementById('roomPasscode');
    const displayRoomName = document.getElementById('displayRoomName');
    const leaveRoomBtn = document.getElementById('leaveRoomBtn');
    const participantCount = document.getElementById('participantCount');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const roomLink = document.getElementById('roomLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const languageSelect = document.getElementById('languageSelect');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    const pingroomContainer = document.querySelector('.pingroom-container');

    // App State
    let currentRoom = null;
    let currentUser = {
        id: generateUserId(),
        name: 'User ' + Math.floor(Math.random() * 1000),
        initials: generateInitials(),
        color: getRandomColor(),
        isAdmin: false
    };
    let editor = null;
    let socket = {
        emit: function() {},
        on: function() {}
    }; // Mock socket for demo

    // Initialize the application
    function initApp() {
        // Set initial UI states
        editorContainer.style.display = 'none';
        roomSetup.style.display = 'none';
        projectInviteContainer.classList.add('hidden');
        linkContainer.classList.add('hidden');
        
        setupEventListeners();
        setupMockSocketEvents(); // For demonstration only
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Room creation/joining
        createRoomBtn.addEventListener('click', () => showRoomSetup('create'));
        joinRoomBtn.addEventListener('click', () => showRoomSetup('join'));
        startSessionBtn.addEventListener('click', handleStartSession);
        cancelSetupBtn.addEventListener('click', resetRoomSetup);
        leaveRoomBtn.addEventListener('click', leaveRoom);

        // Form interactions
        inviteMethod.addEventListener('change', updateInviteMethodUI);
        copyLinkBtn.addEventListener('click', copyRoomLink);

        // Chat functionality
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        sendMessageBtn.addEventListener('click', sendMessage);

        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                switchTab(tabName);
            });
        });

        // Language selection
        languageSelect.addEventListener('change', updateEditorLanguage);

        // File upload
        fileUploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFileUpload);
    }

    // For demonstration - simulate socket events
    function setupMockSocketEvents() {
        // Simulate receiving a chat message after 3 seconds
        setTimeout(() => {
            if (currentRoom) {
                addChatMessage({
                    user: {
                        id: 'demo-user',
                        name: 'Team Member',
                        initials: 'TM',
                        color: '#E71D36'
                    },
                    text: 'Hello from another user!',
                    timestamp: new Date()
                });
            }
        }, 3000);
    }

    // Show room setup form
    function showRoomSetup(action) {
        roomSetup.style.display = 'block';
        roomSetup.classList.add('active');
        
        if (action === 'create') {
            startSessionBtn.innerHTML = '<i class="fas fa-play"></i> Create Room';
            document.querySelector('#roomSetup .form-group:first-child label').textContent = "Room Name";
        } else {
            startSessionBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Join Room';
            document.querySelector('#roomSetup .form-group:first-child label').textContent = "Room ID";
        }
        updateInviteMethodUI();
    }

    // Handle Start Session button click
    function handleStartSession() {
        const name = roomNameInput.value.trim();
        const passcode = roomPasscode.value.trim();
        
        if (!name) {
            alert("Please enter a room name/ID");
            return;
        }

        if (!passcode || passcode.length < 6) {
            alert("Please enter a valid 6-digit passcode");
            return;
        }
        
        // Show loading state
        startSessionBtn.disabled = true;
        startSessionBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        
        // Simulate network delay
        setTimeout(() => {
            if (startSessionBtn.textContent.includes("Create")) {
                createRoom(name, passcode);
            } else {
                joinRoom(name, passcode);
            }
        }, 1000);
    }

    // Create a new room
    function createRoom(name, passcode) {
        currentUser.isAdmin = true;
        currentRoom = {
            id: generateRoomId(),
            name: name,
            passcode: passcode,
            participants: [currentUser],
            createdAt: new Date()
        };
        
        // Update UI
        displayRoomName.textContent = currentRoom.name;
        updateParticipantCount(1);
        roomLink.value = `${window.location.origin}?room=${currentRoom.id}`;
        
        // Add welcome messages
        addSystemMessage(`Welcome to ${currentRoom.name}! Start collaborating with your team.`);
        addChatMessage({
            user: {
                name: "John Doe",
                initials: "JD",
                color: "#1995AD"
            },
            text: "Hey team! I've set up the basic structure for our project. Let me know what you think.",
            timestamp: new Date()
        });
        
        transitionToEditor();
        
        // Reset button state
        startSessionBtn.disabled = false;
        startSessionBtn.innerHTML = '<i class="fas fa-play"></i> Create Room';
    }

    // Join an existing room
    function joinRoom(name, passcode) {
        currentRoom = {
            id: name,
            name: name || 'Team Room',
            passcode: passcode,
            participants: [currentUser, {
                id: 'demo-user',
                name: 'Host User',
                initials: 'HU',
                color: getRandomColor(),
                isAdmin: true
            }]
        };
        
        // Update UI
        displayRoomName.textContent = currentRoom.name;
        updateParticipantCount(2);
        
        addSystemMessage(`You joined ${currentRoom.name}`);
        transitionToEditor();
        
        // Reset button state
        startSessionBtn.disabled = false;
        startSessionBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Join Room';
    }

    // Transition to the editor view
    function transitionToEditor() {
        pingroomContainer.style.display = 'none';
        roomSetup.style.display = 'none';
        editorContainer.style.display = 'block';
        
        // Initialize editor if not already done
        if (!editor) {
            initializeEditor();
        }
    }

    // Initialize Monaco Editor
    function initializeEditor() {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }});
        
        require(['vs/editor/editor.main'], function() {
            editor = monaco.editor.create(document.getElementById('codeEditor'), {
                value: "// Welcome to Ping Room!\n// Start coding with your team...\n\nfunction hello() {\n  console.log('Hello, world!');\n}",
                language: 'javascript',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: true },
                fontSize: 14,
                scrollBeyondLastLine: false
            });
            
            // Simulate code changes from other users
            setTimeout(() => {
                if (editor) {
                    editor.setValue(editor.getValue() + "\n\n// Added by another user");
                }
            }, 2000);
        });
    }

    // Update editor language
    function updateEditorLanguage() {
        const language = languageSelect.value;
        if (editor) {
            monaco.editor.setModelLanguage(editor.getModel(), language);
        }
    }

    // Leave the current room
    function leaveRoom() {
        if (currentRoom) {
            addSystemMessage(`You left ${currentRoom.name}`);
            currentRoom = null;
        }
        
        editorContainer.style.display = 'none';
        pingroomContainer.style.display = 'flex';
        resetRoomSetup();
    }

    // Update invite method UI
    function updateInviteMethodUI() {
        const method = inviteMethod.value;
        
        projectInviteContainer.classList.add('hidden');
        linkContainer.classList.add('hidden');
        
        if (method === 'project') {
            projectInviteContainer.classList.remove('hidden');
        } else if (method === 'link') {
            linkContainer.classList.remove('hidden');
        }
    }

    // Update participant count
    function updateParticipantCount(count) {
        participantCount.textContent = count;
    }

    // Add a chat message
    function addChatMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="user-avatar" style="background-color: ${message.user.color}">${message.user.initials}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">${message.user.name}</span>
                    <span class="message-time">${formatTime(message.timestamp)}</span>
                </div>
                <div class="message-text">${message.text}</div>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add a system message
    function addSystemMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'system-message';
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle file upload
    function handleFileUpload(e) {
        const files = e.target.files;
        if (files.length > 0 && currentRoom) {
            const file = files[0];
            const fileData = {
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type,
                uploader: currentUser,
                uploadedAt: new Date()
            };
            
            addFileToExplorer(fileData);
        }
    }

    // Add file to explorer
    function addFileToExplorer(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-icon">
                <i class="fas ${getFileIcon(file.type)}"></i>
            </div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">
                    <span class="file-uploader">Uploaded by ${file.uploader.name}</span>
                    <span class="file-size">${file.size}</span>
                </div>
            </div>
            <div class="file-download">
                <i class="fas fa-download"></i>
            </div>
        `;
        document.getElementById('fileExplorer').insertBefore(fileItem, fileUploadArea.nextSibling);
    }

    // Get appropriate file icon
    function getFileIcon(fileType) {
        if (!fileType) return 'fa-file';
        if (fileType.match('image.*')) return 'fa-file-image';
        if (fileType.match('text.*')) return 'fa-file-code';
        if (fileType.match('application/pdf')) return 'fa-file-pdf';
        return 'fa-file';
    }

    // Switch between tabs
    function switchTab(tabName) {
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-tab') === tabName);
        });
        
        tabContents.forEach(content => {
            content.classList.toggle('active', content.getAttribute('data-tab') === tabName);
        });
    }

    // Reset room setup form
    function resetRoomSetup() {
        roomSetup.style.display = 'none';
        roomSetup.classList.remove('active');
        roomNameInput.value = '';
        roomPasscode.value = '';
    }

    // Copy room link to clipboard
    function copyRoomLink() {
        roomLink.select();
        document.execCommand('copy');
        
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
        }, 2000);
    }

    // Send a chat message
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText && currentRoom) {
            const message = {
                user: currentUser,
                text: messageText,
                timestamp: new Date()
            };
            
            addChatMessage(message);
            chatInput.value = '';
        }
    }

    // Utility Functions
    function generateRoomId() {
        return 'room-' + Math.random().toString(36).substr(2, 6);
    }

    function generateUserId() {
        return 'user-' + Math.random().toString(36).substr(2, 8);
    }

    function generateInitials() {
        const names = currentUser.name.split(' ');
        return names.map(name => name[0]).join('').toUpperCase();
    }

    function getRandomColor() {
        const colors = [
            '#1995AD', '#2EC4B6', '#E71D36', '#FF9F1C', 
            '#662E9B', '#F86624', '#3BB273', '#7768AE'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
    }

    // Start the application
    initApp();
});