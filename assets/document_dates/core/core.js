const defaultConfig = {
    // configurable: light material, or custom theme in user.config.css
    theme: {
        light: 'light',
        dark: 'material'
    },
    tooltip: {
        placement: 'bottom',    // placement: top bottom left right auto
        offset: [0, 10],        // placement offset: [horizontal, vertical]
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
