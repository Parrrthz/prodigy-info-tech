window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = '#222'; // Darker background on scroll
    } else {
        nav.style.backgroundColor = '#333'; // Original background color
    }
});
