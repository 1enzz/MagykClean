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