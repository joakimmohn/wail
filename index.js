var requestAnimationFrame = 
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


function remove(node) {
    function fadeOut() {
        let opacity = parseFloat(node.style.opacity);

        node.style.opacity = opacity - 0.1;

        if(!opacity) {
            node.remove();
            return;
        }
        
        requestAnimationFrame(fadeOut);
    }
    
    fadeOut();
}

function show(node) {
    function fadeIn() {
        let opacity = parseFloat(node.style.opacity);

        node.style.opacity = opacity + 0.1;

        if(opacity === 1) {
            return;
        }
        
        requestAnimationFrame(fadeIn);
    }
    
    fadeIn();
}

function wail(content, {position = 'top', type = 'info', duration = 4000, clickable = false, style} = {}) {
    const containerId = 
        '#wail-notification-container',
        textContainer = document.createElement("div");

    let notificationContainer = document.querySelector(containerId);

    if(!notificationContainer) {
        notificationContainer = document.createElement("div");

        notificationContainer.id = containerId;

        Object.assign(notificationContainer.style, {
            [position]: '10px',
            left: 0,
            right: 0,
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '90%',
            maxWidth: '600px',
            position: 'fixed',
            overflow: 'visible',
            zIndex: '9999999',
        });

        document.body.appendChild(notificationContainer);
    }

    let backgroundColor = ''

    switch(type) {
        case 'primary':
            backgroundColor = '#007bff'
        break;
        case 'success':
            backgroundColor = '#28a745'
        break;
        case 'info':
            backgroundColor = '#17a2b8'
        break;
        case 'danger':
            backgroundColor = '#dc3545'
        break;
        case 'warning':
            backgroundColor = '#ffc107'
        break;
    }

    Object.assign(textContainer.style, {
        position: 'relative',
        opacity: 0,
        backgroundColor,
        borderRadius: '2px',
        [position === 'top' ? 'marginTop' : 'marginBottom']: '10px',
        padding: '15px',
        textAlign: 'center',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        color: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: clickable ? 'pointer' : 'auto'
    }, style);

    textContainer.innerHTML = content;

    notificationContainer.appendChild(textContainer);

    show(textContainer);

    if(duration) {
        window.setTimeout(() => {
            remove(textContainer);
        }, duration);
    }

    if(clickable) {
        textContainer.addEventListener('click', () => {
            textContainer.remove();
        });
    }
}

module.exports = wail;