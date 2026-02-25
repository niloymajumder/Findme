// State
let currentUser = null;
let currentSection = 'home';
let isDarkMode = false;
let userProfile = {
    image: 'https://via.placeholder.com/120',
    name: 'Your Name',
    bio: 'Your bio will appear here...',
    links: []
};
let analytics = {
    totalClicks: 0,
    profileViews: 0,
    linkClicks: {}
};

// App Init
function initApp() {
    if (localStorage.getItem('theme') === 'dark') enableDarkMode();
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateNavigation();
        loadUserProfile();
    }
    const savedAnalytics = localStorage.getItem('analytics');
    if (savedAnalytics) analytics = JSON.parse(savedAnalytics);
}

function toggleTheme() {
    isDarkMode ? disableDarkMode() : enableDarkMode();
}
function enableDarkMode() {
    document.body.classList.add('dark');
    document.getElementById('theme-icon').className = 'fas fa-sun';
    isDarkMode = true;
    localStorage.setItem('theme', 'dark');
}
function disableDarkMode() {
    document.body.classList.remove('dark');
    document.getElementById('theme-icon').className = 'fas fa-moon';
    isDarkMode = false;
    localStorage.setItem('theme', 'light');
}

// Navigation
function showSection(id) {
    const ids = ['home-section', 'profile-section', 'auth-section', 'dashboard-section', 'user-profile-section'];
    ids.forEach(sid => document.getElementById(sid).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    currentSection = id.replace('-section', '');
}
function showHome() { showSection('home-section'); }
function showSampleProfile() { showSection('profile-section'); analytics.profileViews++; saveAnalytics(); }
function showLogin() {
    showSection('auth-section');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
}
function showSignup() {
    showSection('auth-section');
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
}
function showDashboard() {
    if (!currentUser) return showLogin();
    showSection('dashboard-section');
    loadDashboard();
}
function viewProfile() {
    if (!currentUser) return showLogin();
    showSection('user-profile-section');
    displayUserProfile();
    analytics.profileViews++;
    saveAnalytics();
}

// Auth
function handleLogin(e) {
    e.preventDefault();
    const [email, pass] = e.target.elements;
    const btn = document.getElementById('login-btn');
    btn.innerHTML = '<div class="loading"></div> Signing In...';
    btn.disabled = true;
    setTimeout(() => {
        currentUser = { id: 1, email: email.value, name: email.value.split('@')[0], username: email.value.split('@')[0] };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateNavigation();
        loadUserProfile();
        showMessage('login-message', 'Welcome back!', 'success');
        setTimeout(showDashboard, 1000);
        btn.innerHTML = 'Sign In';
        btn.disabled = false;
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const [name, email, username, password] = e.target.elements;
    const btn = document.getElementById('signup-btn');
    btn.innerHTML = '<div class="loading"></div> Creating Account...';
    btn.disabled = true;
    setTimeout(() => {
        currentUser = { id: Date.now(), email: email.value, name: name.value, username: username.value };
        userProfile = {
            image: 'https://via.placeholder.com/120',
            name: name.value,
            bio: 'Welcome to my profile!',
            links: []
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        updateNavigation();
        showMessage('signup-message', 'Account created successfully!', 'success');
        setTimeout(showDashboard, 1000);
        btn.innerHTML = 'Create Account';
        btn.disabled = false;
    }, 1500);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProfile');
    updateNavigation();
    showHome();
}

// Helpers
function updateNavigation() {
    const authNav = document.getElementById('nav-auth');
    const userNav = document.getElementById('nav-user');
    if (currentUser) {
        authNav.classList.add('hidden');
        userNav.classList.remove('hidden');
    } else {
        authNav.classList.remove('hidden');
        userNav.classList.add('hidden');
    }
}

// Profile Functions
function loadUserProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) userProfile = JSON.parse(saved);
}
function updateProfile() {
    if (!currentUser) return;
    userProfile.image = document.getElementById('profile-image').value;
    userProfile.name = document.getElementById('display-name').value;
    userProfile.bio = document.getElementById('bio').value;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    showMessage('dashboard-message', 'Profile updated!', 'success');
}
function loadDashboard() {
    document.getElementById('profile-image').value = userProfile.image;
    document.getElementById('display-name').value = userProfile.name;
    document.getElementById('bio').value = userProfile.bio;
    document.getElementById('total-clicks').textContent = analytics.totalClicks;
    document.getElementById('profile-views').textContent = analytics.profileViews;
    renderLinks();
}
function renderLinks() {
    const container = document.getElementById('links-list');
    container.innerHTML = '';
    userProfile.links.forEach((link, i) => {
        const el = document.createElement('div');
        el.className = 'link-item';
        el.innerHTML = `
            <input type="text" value="${link.title}" onchange="updateLink(${i}, 'title', this.value)">
            <input type="url" value="${link.url}" onchange="updateLink(${i}, 'url', this.value)">
            <input type="text" value="${link.icon}" onchange="updateLink(${i}, 'icon', this.value)">
            <button class="delete-btn" onclick="deleteLink(${i})"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(el);
    });
}
function addLink() {
    userProfile.links.push({ title: '', url: '', icon: 'fas fa-link' });
    renderLinks();
    saveProfile();
}
function updateLink(i, field, val) {
    userProfile.links[i][field] = val;
    saveProfile();
}
function deleteLink(i) {
    userProfile.links.splice(i, 1);
    renderLinks();
    saveProfile();
}
function saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}
function displayUserProfile() {
    document.getElementById('user-avatar').src = userProfile.image;
    document.getElementById('user-name').textContent = userProfile.name;
    document.getElementById('user-bio').textContent = userProfile.bio;
    const links = document.getElementById('user-links');
    links.innerHTML = '';
    userProfile.links.forEach((link, i) => {
        if (link.title && link.url) {
            const a = document.createElement('a');
            a.className = 'profile-link';
            a.href = link.url;
            a.target = '_blank';
            a.onclick = () => trackUserClick(i);
            a.innerHTML = `
                <i class="${link.icon} link-icon"></i>
                <div class="link-content">
                    <div class="link-title">${link.title}</div>
                    <div class="link-url">${link.url.replace(/^https?:\/\//, '')}</div>
                </div>
            `;
            links.appendChild(a);
        }
    });
}

// Analytics
function trackClick(name) {
    analytics.totalClicks++;
    analytics.linkClicks[name] = (analytics.linkClicks[name] || 0) + 1;
    saveAnalytics();
}
function trackUserClick(i) {
    analytics.totalClicks++;
    const id = `user-link-${i}`;
    analytics.linkClicks[id] = (analytics.linkClicks[id] || 0) + 1;
    saveAnalytics();
}
function saveAnalytics() {
    localStorage.setItem('analytics', JSON.stringify(analytics));
}

// Message
function showMessage(id, msg, type) {
    const el = document.getElementById(id);
    el.innerHTML = `<div class="message ${type}">${msg}</div>`;
    setTimeout(() => { el.innerHTML = ''; }, 5000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    ['profile-image', 'display-name', 'bio'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.removeAttribute('onchange');
            el.addEventListener('input', debounce(updateProfile, 1000));
        }
    });
});

// Utility
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
