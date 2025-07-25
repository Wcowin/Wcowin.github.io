const defaultConfig = {
    // configurable: light material, or custom theme in user.config.css
    theme: {
        light: 'light',
        dark: 'material'
    },
    tooltip: {
        placement: 'bottom',    // placement: top bottom left right auto
        offset: [0, 12],        // placement offset: [horizontal, vertical]
        interactive: true,      // content in Tooltip is interactive
        allowHTML: true,        // whether to allow HTML in the tooltip content
        
        animation: 'scale',     // animation type: scale shift-away
        inertia: true,          // animation inertia
        // arrow: false,           // whether to allow arrows

        // animateFill: true,      // determines if the background fill color should be animated

        // delay: [400, null],     // delay: [show, hide], show delay is 400ms, hide delay is the default
    }
};

let tippy_config = { ...defaultConfig };

// Configuration API
function setConfig(newConfig) {
    tippy_config = {
        ...defaultConfig,
        ...newConfig
    };
}



// Hook System
const hooks = {
    beforeInit: [],
    afterInit: []
};

// Hook registration API
function registerHook(hookName, callback) {
    if (hooks[hookName]) {
        hooks[hookName].push(callback);
    }
}

// Hook execution
async function executeHooks(hookName, context) {
    if (hooks[hookName]) {
        for (const hook of hooks[hookName]) {
            await hook(context);
        }
    }
}

// Theme management
function getCurrentTheme() {
    const scheme = (document.body && document.body.getAttribute('data-md-color-scheme')) || 'default';
    return scheme === 'slate' ? tippy_config.theme.dark : tippy_config.theme.light;
}

// Main initialization
async function init() {
    // Create context object to pass to hooks and return from function
    const context = { tippy_config };
    
    // Execute beforeInit hooks
    await executeHooks('beforeInit', context);

    // Configure the properties of the Tooltip here, available documents: https://atomiks.github.io/tippyjs/
    const tippyInstances = tippy('[data-tippy-content]', {
        ...tippy_config.tooltip,
        theme: getCurrentTheme()    // Initialize Tooltip's theme based on Material's light/dark color scheme
    });
    
    // Store instances in context
    context.tippyInstances = tippyInstances;

    // Automatic theme switching. Set Tooltip's theme to change automatically with the Material's light/dark color scheme
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(async (mutation) => {
            if (mutation.attributeName === 'data-md-color-scheme') {
                const newTheme = getCurrentTheme();
                tippyInstances.forEach(instance => {
                    instance.setProps({ theme: newTheme });
                });
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
    
    // Store observer in context
    context.observer = observer;

    // Execute afterInit hooks
    await executeHooks('afterInit', context);
    
    // Return context with instances and observer for cleanup
    return context;
}

// Initialization Manager
const initManager = (() => {
    let tippyInstances = [];
    let observer = null;
    
    // Function to clean up previous instances
    function cleanup() {
        // Destroy previous tippy instances if they exist
        if (tippyInstances.length > 0) {
            tippyInstances.forEach(instance => instance.destroy());
            tippyInstances = [];
        }
        
        // Disconnect previous observer if it exists
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }
    
    return {
        // This can be called multiple times, especially with navigation.instant
        initialize() {
            // Clean up previous instances first
            cleanup();
            
            // Initialize new instances
            init().then(context => {
                if (context && context.tippyInstances) {
                    tippyInstances = context.tippyInstances;
                }
                if (context && context.observer) {
                    observer = context.observer;
                }
            });
        }
    };
})();


// Entrance - Compatible with Material for MkDocs 'navigation.instant'
// Check if Material for MkDocs document$ observable is available
if (typeof window.document$ !== 'undefined' && !window.document$.isStopped) {
    // Use Material's document$ observable for both initial load and navigation.instant
    window.document$.subscribe(initManager.initialize);
} else {
    // Fallback to standard DOMContentLoaded for other themes
    document.addEventListener('DOMContentLoaded', initManager.initialize);
}


// Export API
window.DocumentDates = {
    registerHook,
    setConfig
};



/* Automatically generate avatars based on text */

function isLatin(name) {
    return /^[A-Za-z\s]+$/.test(name.trim());
}
function extractInitials(name) {
    name = name.trim();
    if (!name) return '?';
    if (isLatin(name)) {
        const parts = name.toUpperCase().split(/\s+/).filter(Boolean);
        return parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
    } else {
        return name[0];
    }
}
function nameToHSL(name, s = 50, l = 55) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, ${s}%, ${l}%)`;
}
function generateAvatar(){
    document.querySelectorAll('.avatar-wrapper').forEach(wrapper => {
        const name = wrapper.dataset.name || '';
        const initials = extractInitials(name);
        const bgColor = nameToHSL(name);

        const textEl = wrapper.querySelector('.avatar-text');
        textEl.textContent = initials;
        textEl.style.backgroundColor = bgColor;

        const imgEl = wrapper.querySelector('img.avatar');
        if (!imgEl) return;
        imgEl.onerror = () => {
            imgEl.style.display = 'none';
        };
    });
}
if (typeof window.document$ !== 'undefined' && !window.document$.isStopped) {
    window.document$.subscribe(generateAvatar);
} else {
    generateAvatar();
}