// Simuler une base de données utilisateurs
let users = [
    {
        id: 1,
        name: "Saliou",
        email: "saliouwassiou5@gmail.com",
        password: "Saliou@50",
        role: "admin"
    }
];

// Éléments du formulaire
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Gestion de la connexion
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Connexion réussie !');
        closeModal(loginModal);
        updateAuthUI();
        
        // Rediriger vers l'admin si rôle admin
        if (user.role === 'admin') {
            window.location.href = 'admin/';
        }
    } else {
        alert('Email ou mot de passe incorrect !');
    }
});

// Gestion de l'inscription
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    const role = registerForm.querySelector('select').value;
    
    // Vérifier si l'email existe déjà
    if (users.some(u => u.email === email)) {
        alert('Cet email est déjà utilisé !');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role
    };
    
    users.push(newUser);
    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    closeModal(registerModal);
    openModal(loginModal);
});

// Mettre à jour l'UI en fonction de l'authentification
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authBtn = document.getElementById('auth-btn');
    
    if (currentUser) {
        authBtn.innerHTML = `
            <a href="#logout"><i class="fas fa-user"></i> ${currentUser.name}</a>
        `;
        authBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateAuthUI();
            window.location.reload();
        };
    } else {
        authBtn.innerHTML = `
            <a href="#login"><i class="fas fa-user"></i> Connexion</a>
        `;
        authBtn.onclick = (e) => {
            e.preventDefault();
            openModal(loginModal);
        };
    }
}

// Vérifier l'authentification au chargement
document.addEventListener('DOMContentLoaded', updateAuthUI);