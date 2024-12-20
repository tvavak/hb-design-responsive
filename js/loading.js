// Loading animation handler
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const loader = preloader.querySelector('.loader');
    
    // Add logo to existing loader
    const loadingLogo = document.createElement('img');
    loadingLogo.src = 'logo1.png';
    loadingLogo.className = 'loading-logo';
    loadingLogo.alt = 'Loading...';
    loader.appendChild(loadingLogo);

    // Function to handle loading animation
    function handleLoading() {
        return new Promise((resolve) => {
            // Show preloader
            preloader.style.display = 'flex';
            requestAnimationFrame(() => {
                preloader.style.opacity = '1';
            });

            // Prevent scrolling
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';

            // Get the maximum scroll position
            const maxScroll = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight
            ) - window.innerHeight;

            let currentScroll = 0;
            const scrollStep = Math.max(1, maxScroll / 100); // Divide scroll into 100 steps
            
            function smoothScroll() {
                if (currentScroll >= maxScroll) {
                    // Reset scroll position
                    window.scrollTo(0, 0);
                    document.body.style.overflow = originalStyle;
                    
                    // Hide preloader
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.display = 'none';
                            resolve();
                        }, 300);
                    }, 200);
                    return;
                }

                currentScroll = Math.min(currentScroll + scrollStep, maxScroll);
                window.scrollTo(0, currentScroll);
                requestAnimationFrame(smoothScroll);
            }

            // Start scrolling after a small delay
            setTimeout(smoothScroll, 100);
        });
    }

    // Handle initial page load
    window.addEventListener('load', function() {
        handleLoading();
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
        await handleLoading();
        window.location.href = href;
    });
});
