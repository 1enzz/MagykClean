document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});
function divScroll(elementId){
    let div = document.getElementById(elementId)
    div.scrollIntoView({
        behavior: 'smooth',
        block:'start'
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
       
        const container = slider.closest('.comparison-container');
        const before = container.querySelector('.comparison-before');
        const handle = container.querySelector('.slider-handle');
        
        slider.addEventListener('input', function() {
            const value = this.value;
            before.style.width = value + '%';
            handle.style.left = value + '%';
        });
   
        slider.dispatchEvent(new Event('input'));
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        observer.observe(element);

        element.addEventListener('animationend', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
});