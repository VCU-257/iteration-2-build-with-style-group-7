document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadHeader();
    loadFAB();

    document.body.addEventListener('click', function(e) {
        const favBtn = e.target.closest('.favorite-btn');
        
        if (favBtn) {
            e.preventDefault(); 
            
            const icon = favBtn.querySelector('i');
            
            if (icon.classList.contains('bi-star')) {
                icon.classList.remove('bi-star');
                icon.classList.add('bi-star-fill');
            } else {
                icon.classList.remove('bi-star-fill');
                icon.classList.add('bi-star');
            }
        }
    });
});


function loadNavbar() {
    fetch('../components/navbar.txt')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load navbar');
            return response.text();
        })
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            highlightActiveLink();
        })
        .catch(error => console.error('Error:', error));
}

function loadHeader() {
    fetch('../components/header.txt')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                highlightActiveLink();   
            }
        })
        .catch(error => console.error('Error:', error));
}

function loadFAB() {
    fetch('../components/bottom-fab.txt')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load FAB');
            return response.text();
        })
        .then(data => {
            const fabPlaceholder = document.getElementById('fab-placeholder');
            if (fabPlaceholder) {
                fabPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error:', error));
}

function highlightActiveLink() {
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === "" || currentPage === "index.html") currentPage = "home.html";
    if (currentPage === 'group-detail.html') currentPage = 'groups.html';

    const activeLinks = document.querySelectorAll(`a[href*="${currentPage}"]`);
    
    activeLinks.forEach(activeLink => {
        if (activeLink.closest('.fixed-bottom')) {
            activeLink.classList.add('bg-secondary', 'bg-opacity-25');
        } 
        
        const parentItem = activeLink.closest('.nav-item');
        if (parentItem) {
            parentItem.classList.add('active');
        }

        const icon = activeLink.querySelector('i');
        if (icon) {
            icon.classList.remove('bi-house-door', 'bi-people', 'bi-person');
            if (currentPage === 'home.html') icon.classList.add('bi-house-door-fill');
            if (currentPage === 'groups.html') icon.classList.add('bi-people-fill');
            if (currentPage === 'account.html') icon.classList.add('bi-person-fill');
        }
    });
}
