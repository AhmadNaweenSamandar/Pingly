document.addEventListener('DOMContentLoaded', function() {
    // Initialize Monaco Editor
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        // Set dark theme only for the editor
        monaco.editor.setTheme('vs-dark');
        const editor = monaco.editor.create(document.getElementById('codeEditor'), {
            value: '// Welcome to PingRoom!\n// Start coding with your team...\n\nfunction helloWorld() {\n  console.log("Hello, PingRoom!");\n}',
            language: 'javascript',
            theme: 'vs-dark', // Dark editor theme
            automaticLayout: true,
            minimap: { enabled: true }
        });

        // Update editor language when selected
        document.getElementById('languageSelect').addEventListener('change', function() {
            const language = this.value;
            const model = editor.getModel();
            monaco.editor.setModelLanguage(model, language);
        });
    });

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tab === tab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // File upload functionality
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');

    fileUploadArea.addEventListener('click', () => fileInput.click());
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = --teal-blue;
        fileUploadArea.style.backgroundColor = 'rgba(25, 149, 173, 0.1)';
    });
    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.style.borderColor = '#ccc';
        fileUploadArea.style.backgroundColor = 'transparent';
    });
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#ccc';
        fileUploadArea.style.backgroundColor = 'transparent';
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFiles(fileInput.files);
        }
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFiles(fileInput.files);
        }
    });

    function handleFiles(files) {
        const fileList = document.getElementById('fileList');
        const message = document.getElementById('fileMessage').value || 'No message';
        
        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-icon">
                    <i class="fas fa-file"></i>
                </div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">
                        <span class="file-uploader">Uploaded by You</span>
                        <span class="file-size">${formatFileSize(file.size)}</span>
                        <span class="file-message">${message}</span>
                    </div>
                </div>
                <div class="file-actions">
                    <button class="file-download"><i class="fas fa-download"></i></button>
                    <button class="file-delete"><i class="fas fa-trash"></i></button>
                </div>
            `;
            fileList.prepend(fileItem);
            
            // Add event listeners to new buttons
            fileItem.querySelector('.file-download').addEventListener('click', () => downloadFile(file));
            fileItem.querySelector('.file-delete').addEventListener('click', () => fileItem.remove());
        });
        
        // Clear input
        fileInput.value = '';
        document.getElementById('fileMessage').value = '';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function downloadFile(file) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.innerHTML = `
                <div class="user-avatar" style="background-color: #2EC4B6;">YO</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">You</span>
                        <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div class="message-text">${message}</div>
                </div>
            `;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Participant actions
    document.querySelectorAll('.participant-actions .action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.participant-card');
            if (this.querySelector('.fa-crown')) {
                // Make admin
                card.classList.add('admin');
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = 'Admin';
                card.querySelector('.participant-name').appendChild(badge);
                this.remove();
            } else if (this.querySelector('.fa-user-minus')) {
                // Remove user
                card.remove();
            }
        });
    });

    // Leave room button
    document.getElementById('leaveRoomBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to leave this room?')) {
            window.location.href = 'livecode.html';
        }
    });

    // Set room name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const roomName = urlParams.get('room') || 'PingRoom';
    document.getElementById('roomTitle').textContent = roomName;
});