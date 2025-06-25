document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const postQuestionBtn = document.querySelector('.post-question-btn');
    const modal = document.getElementById('postQuestionModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    // Open modal
    if (postQuestionBtn) {
        postQuestionBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });
    }
    
    // Close modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModalFunc);
    }
    
    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Tag selection functionality
    const tagSelect = document.getElementById('questionTags');
    const selectedTagsContainer = document.getElementById('selectedTags');
    
    if (tagSelect && selectedTagsContainer) {
        tagSelect.addEventListener('change', function() {
            selectedTagsContainer.innerHTML = '';
            Array.from(this.selectedOptions).forEach(option => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = option.value;
                selectedTagsContainer.appendChild(tag);
            });
        });
    }
    
    // Form submission
    const questionForm = document.getElementById('questionForm');
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('questionTitle').value;
            const question = document.getElementById('questionText').value;
            const note = document.getElementById('questionNote').value;
            const selectedTags = Array.from(document.getElementById('questionTags').selectedOptions)
                                   .map(option => option.value);
            
            // Here you would typically send data to server
            console.log('Question Data:', {
                title,
                question,
                note,
                tags: selectedTags
            });
            
            // For now, just show success and close
            alert('Question submitted successfully! (This will be connected to backend later)');
            closeModalFunc();
            
            // Reset form
            questionForm.reset();
            selectedTagsContainer.innerHTML = '';
        });
    }
});