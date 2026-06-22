const liveTimeEl = document.getElementById('live-time');

if (liveTimeEl) {
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Tashkent',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        liveTimeEl.innerText = timeString;
    }

    updateClock();
    setInterval(updateClock, 60000);
}

const wheelContainer = document.getElementById('wheel');

if (wheelContainer) {
    const games = [
        {
            title: 'Counter-Strike 1.6',
            company: 'Valve',
            rating: '9/10',
            summary: 'The foundational competitive tactical shooter that started it all. I spent countless hours mastering the map layouts and recoil patterns. It\'s raw, unfiltered gameplay that doesn\'t rely on modern gimmicks. The community servers were legendary and shaped my early online gaming experience.'
        },
        {
            title: 'Dark Souls 1 & 2',
            company: 'FromSoftware',
            rating: '10/10',
            summary: 'A masterclass in punishing but rewarding level design. It taught me patience and that failure is just a step toward success. The atmosphere is unmatched, and every victory feels genuinely earned. These games completely rewired how I approach difficult challenges in life.'
        },
        {
            title: 'Zelda: Breath of the Wild',
            company: 'Nintendo',
            rating: '10/10',
            summary: 'Redefining exploration and open-world freedom. If you see a mountain, you can climb it. Pure adventure.'
        },
        {
            title: 'Blasphemous 1',
            company: 'The Game Kitchen',
            rating: '8/10',
            summary: 'A brutal metroidvania draped in dark, religious iconography. Visually stunning with tight combat mechanics.'
        },
        {
            title: 'CoD 4: Modern Warfare & MW2',
            company: 'Infinity Ward',
            rating: '9/10',
            summary: 'The multiplayer revolution that changed FPS forever. Fast, frenetic, and the peak of arcade shooters.'
        },
        {
            title: 'Call of Duty: Black Ops 1',
            company: 'Treyarch',
            rating: '9/10',
            summary: 'The numbers, Mason. What do they mean? The best campaign in the entire franchise hands down.'
        },
        {
            title: 'Call of Duty: World at War',
            company: 'Treyarch',
            rating: '8/10',
            summary: 'A gritty, unforgiving look at the WWII theater. The introduction of zombies was a cultural reset.'
        },
        {
            title: 'Medal of Honor (2010)',
            company: 'Danger Close',
            rating: '7/10',
            summary: 'A grounded and underrated modern military narrative. It felt a lot more authentic than its competitors at the time.'
        },
        {
            title: 'Assassin\'s Creed 1',
            company: 'Ubisoft',
            rating: '8/10',
            summary: 'The birth of the animus and the hidden blade. A repetitive but incredibly atmospheric entry that started an empire.'
        },
        {
            title: 'Assassin\'s Creed: Brotherhood',
            company: 'Ubisoft',
            rating: '9/10',
            summary: 'Ezio\'s peak and the perfection of the AC formula. Building up Rome and calling in assassins is still unmatched.'
        }
    ];

    let activeIndex = 0;
    let isScrolling = false;

    const dTitle = document.getElementById('display-title');
    const dCompany = document.getElementById('display-company');
    const dRating = document.getElementById('display-rating');
    const dSummary = document.getElementById('display-summary');

    games.forEach((game, index) => {
        const item = document.createElement('div');
        item.className = 'wheel-item';
        item.innerText = game.title;

        item.addEventListener('click', () => {
            if (index === activeIndex - 1 || index === activeIndex + 1) {
                activeIndex = index;
                updateWheel();
            }
        });

        wheelContainer.appendChild(item);
    });

    const wheelItems = document.querySelectorAll('.wheel-item');

    function updateWheel() {
        wheelItems.forEach((item, index) => {
            item.className = 'wheel-item';
            if (index === activeIndex) {
                item.classList.add('active');
            } else if (index === activeIndex - 1) {
                item.classList.add('prev');
            } else if (index === activeIndex + 1) {
                item.classList.add('next');
            }
        });

        if (dTitle && dCompany && dRating && dSummary) {
            dTitle.style.opacity = 0;
            dSummary.style.opacity = 0;

            setTimeout(() => {
                dTitle.innerText = games[activeIndex].title;
                dCompany.innerText = games[activeIndex].company;
                dRating.innerText = games[activeIndex].rating;
                dSummary.innerText = games[activeIndex].summary;

                dTitle.style.opacity = 1;
                dSummary.style.opacity = 1;
            }, 150);
        }
    }

    wheelContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isScrolling) return;

        if (e.deltaY > 0 && activeIndex < games.length - 1) {
            activeIndex++;
        } else if (e.deltaY < 0 && activeIndex > 0) {
            activeIndex--;
        }

        updateWheel();
        isScrolling = true;
        setTimeout(() => { isScrolling = false; }, 400);
    });

    updateWheel();
}

const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.innerText = '☀️';
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.innerText = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.innerText = '🌙';
    }
});

// Run this code as soon as the HTML has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Get the current URL path
    const currentPath = window.location.pathname;
    
    // 2. Extract just the file name (e.g., 'essays.html')
    let currentPage = currentPath.split('/').pop();

    // 3. Fallback: If it's just the root domain (e.g., yoursite.com/), default to index.html
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    // 4. Select all the links inside your navigation
    const navLinks = document.querySelectorAll('nav a');

    // 5. Loop through them and apply the active class where it matches
    navLinks.forEach(link => {
        // Strip any existing active classes (just in case they were left in the HTML)
        link.classList.remove('active');

        // Check if the link's href matches our current page variable
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});