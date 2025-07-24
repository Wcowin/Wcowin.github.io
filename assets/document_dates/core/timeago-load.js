// Function to format timeago elements
function formatTimeagoElements() {
    if (typeof timeago !== 'undefined') {
        document.querySelectorAll('.document-dates-plugin time').forEach(timeElement => {
            timeElement.textContent = timeago.format(timeElement.getAttribute('datetime'), timeElement.getAttribute('locale'));
        });
    }
}

// Compatible with Material for MkDocs 'navigation.instant'
// Check if Material for MkDocs document$ observable is available
if (typeof window.document$ !== 'undefined' && !window.document$.isStopped) {
    // Use Material's document$ observable for both initial load and navigation.instant
    window.document$.subscribe(formatTimeagoElements);
} else {
    // Fallback to standard DOMContentLoaded for other themes
    formatTimeagoElements();
}