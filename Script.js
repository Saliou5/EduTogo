// Données des documents (simulées - en production, utiliser une API)
const documents = [
    {
        id: 1,
        title: "Mathématiques Terminale D",
        description: "Cours complet avec exercices corrigés pour la Terminale D.",
        category: "maths",
        downloads: 1250,
        pages: 120,
        thumbnail: "assets/thumbnails/maths.jpg",
        file: "docs/maths-terminale.pdf",
        featured: true
    },
    {
        id: 2,
        title: "Physique-Chimie 1ère",
        description: "Manuel de physique et chimie pour la classe de Première.",
        category: "science",
        downloads: 980,
        pages: 95,
        thumbnail: "assets/thumbnails/science.jpg",
        file: "docs/physique-1ere.pdf",
        featured: true
    },
    // Plus de documents...
];

// DOM Elements
const documentsContainer = document.getElementById('documents-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const loadMoreBtn = document.querySelector('.load-more-btn');
const categoryCards = document.querySelectorAll('.category-card');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const loginLink = document.getElementById('auth-btn');
const registerLink = document.getElementById('register-link');
const closeModals = document.querySelectorAll('.close-modal');

// Variables
let currentFilter = 'all';
let displayedDocs = 6;

// Afficher les documents
function displayDocuments(docs = documents, limit = displayedDocs) {
    documentsContainer.innerHTML = '';

    const filteredDocs = currentFilter === 'all' 
        ? docs 
        : docs.filter(doc => doc.category === currentFilter);

    const limitedDocs = filteredDocs.slice(0, limit);

    if (limitedDocs.length === 0) {
        documentsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-file-alt"></i>
                <p>Aucun document trouvé</p>
            </div>
        `;
        return;
    }

    limitedDocs.forEach(doc => {
        const docEl = document.createElement('div');
        docEl.className = 'document-card';
        docEl.innerHTML = `
            <img src="${doc.thumbnail}" alt="${doc.title}" class="document-img">
            <div class="document-info">
                <h3>${doc.title}</h3>
                <p>${doc.description}</p>
                <div class="document-meta">
                    <span><i class="fas fa-download"></i> ${doc.downloads.toLocaleString()}</span>
                    <span><i class="fas fa-file"></i> ${doc.pages} pages</span>
                </div>
                <a href="${doc.file}" download class="download-btn">
                    <i class="fas fa-download"></i> Télécharger
                </a>
            </div>
        `;
        documentsContainer.appendChild(docEl);
    });

    // Masquer le bouton "Voir plus" si tout est affiché
    loadMoreBtn.style.display = filteredDocs.length > limit ? 'block' : 'none';
}

// Filtrer par catégorie
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.category;
        displayedDocs = 6;
        displayDocuments();
    });
});

// Recherche de documents
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const results = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm) || 
        doc.description.toLowerCase().includes(searchTerm) ||
        doc.category.toLowerCase().includes(searchTerm)
    );
    displayDocuments(results);
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Charger plus de documents
loadMoreBtn.addEventListener('click', () => {
    displayedDocs += 6;
    displayDocuments();
});

// Filtrer par catégorie via les cartes
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        currentFilter = category;
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        displayedDocs = 6;
        displayDocuments();
        window.scrollTo({
            top: documentsContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Gestion des modals
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(registerModal);
});

closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

// Fermer le modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navUl = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    navUl.classList.toggle('show');
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayDocuments();
});