function divScroll(elementId){
    let div = document.getElementById(elementId)
    div.scrollIntoView({
        behavior: 'smooth',
        block:'start'
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('comparison-slider');
    const before = document.querySelector('.comparison-before');
    const handle = document.querySelector('.slider-handle');
    
    if (slider && before && handle) {
        slider.addEventListener('input', function() {
            const value = this.value;
            before.style.width = value + '%';
            handle.style.left = value + '%';
        });
    }
});