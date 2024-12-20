// Loading animation handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading script initialized');
    
    const preloader = document.querySelector('.preloader');
    const loader = preloader.querySelector('.loader');
    
    // Add logo to existing loader
    const loadingLogo = document.createElement('img');
    loadingLogo.src = 'logo1.png';
    loadingLogo.className = 'loading-logo';
    loadingLogo.alt = 'Loading...';
    loader.appendChild(loadingLogo);

    // Create hidden scroll container
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'scroll-container';
    document.body.appendChild(scrollContainer);

    // Function to scroll with preloader
    function scrollWithPreloader() {
        return new Promise((resolve) => {
            console.log('Starting scroll animation');
            
            const scrollHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight
            );
            
            // Show preloader first
            preloader.style.display = 'flex';
            requestAnimationFrame(() => {
                preloader.style.opacity = '1';
            });
            
            // Enable scroll container
            scrollContainer.style.visibility = 'visible';
            document.body.style.overflow = 'hidden'; // Prevent main page scroll
            
            // Start scrolling in the container
            setTimeout(() => {
                scrollContainer.scrollTo({
                    top: scrollHeight,
                    behavior: 'smooth'
                });

                // Check when scrolling is complete
                let lastPos = scrollContainer.scrollTop;
                let samePositionCount = 0;
                
                const checkScroll = setInterval(() => {
                    const currentPos = scrollContainer.scrollTop;
                    
                    if (currentPos === lastPos) {
                        samePositionCount++;
                        if (samePositionCount >= 3) {
                            clearInterval(checkScroll);
                            
                            // Reset scroll container
                            scrollContainer.style.visibility = 'hidden';
                            scrollContainer.scrollTop = 0;
                            document.body.style.overflow = '';
                            
                            // Hide preloader
                            preloader.style.opacity = '0';
                            setTimeout(() => {
                                preloader.style.display = 'none';
                                resolve();
                            }, 300);
                        }
                    } else {
                        samePositionCount = 0;
                    }
                    lastPos = currentPos;
                }, 100);
            }, 100);
        });
    }

    // Initial page load animation
    window.addEventListener('load', function() {
        console.log('Page loaded, starting animation');
        scrollWithPreloader().then(() => {
            console.log('Initial animation complete');
        });
    });

    // Handle link clicks
    document.addEventListener('click', async function(e) {
        const target = e.target.closest('a');
        if (!target) return;
        
        const href = target.getAttribute('href');
        
        if (!href || 
            target.getAttribute('target') === '_blank' || 
            target.classList.contains('no-loading') ||
            href.startsWith('#') ||
            href.startsWith('tel:') ||
            href.startsWith('mailto:') ||
            href.startsWith('http')) {
            return;
        }

        e.preventDefault();
        await scrollWithPreloader();
        window.location.href = href;
    });
});
