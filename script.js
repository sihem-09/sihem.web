// =========================================
// SIHEM PORTFOLIO - MAIN JAVASCRIPT
// =========================================

let isAdmin = false;
let projects = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadProjects();
    renderProjects();
    setupEventListeners();
    initFAQ();
});

// ========== THEME ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-toggle .material-symbols-outlined');
    if (icon) {
        icon.textContent = document.body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
    }
}

// ========== PROJECTS ==========
function loadProjects() {
    // DEFAULT PROJECTS (always show these - they're in the code)
    const defaultProjects = [
        {
            id: 1,
            title: ' Hammoudi Zahra – Professional Personal Portfolio',
            category: 'Web Development',
            description: 'A clean, minimalist personal portfolio website highlighting Hammoudi Zahra’s skills, experience, and work, designed to present a professional online presence.',
            details: 'This is a personal portfolio website crafted to showcase Hammoudi Zahra’s professional profile in a simple, elegant, and user-friendly layout . Introduction & About: A concise overview of Hammoudi’s background, strengths, and what she offers professionally. Skills & Expertise: Clear sections that list key skills, tools, and competencies to communicate capability at a glance.  Work Experience / Projects: Highlights of projects, achievements, or roles that demonstrate real-world application of expertise. Visual Design & Usability: Clean typography, harmonious spacing, and intuitive navigation make the portfolio easy to browse on desktop and mobile . Contact Call-to-Action: Contact details allow potential clients or employers to easily connect for collaboration or hiring. This portfolio site is ideal for freelancers, job seekers, or professionals who want a straightforward but impactful web presence.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
            link: 'https://sihem-09.github.io/hammoudi-zahra/',
            tags: 'Web Design, Frontend',
            tech: 'HTML, CSS, JavaScript',
            year: '2025',
            client: 'Accounting Teacher'
        },
        {
            id: 2,
            title: 'UGC Creators – Social Video Content Hub',
            category: 'UI/UX Design',
            description: 'A showcase website presenting UGC creator services, portfolio samples, and collaboration opportunities — designed to attract brands seeking authentic social content.',
            details: 'This project is a UGC (User Generated Content) creator showcase website built to present services, creative approach, and portfolio highlights for social media content makers. What It Is: A sleek and modern web presentation for UGC services, including short-form videos, social posts, brand collaborations, and storytelling content.  Service Overview: Clear sections that explain different UGC offerings — TikTok and Instagram videos, product showcases, lifestyle reels, and promotional clips — optimized for social engagement.  Portfolio Gallery: Highlights of previous content samples, demonstrating creative style, editing quality, and adaptability across niches. Process & Approach: Brief explanation of how content is planned, shot, and delivered to clients, emphasizing communication and tailored strategy.Contact & CTA: Call-to-action encouraging brands to reach out for collaboration via email/DM or form submission.This site is perfect for content creators wanting to professionally present their UGC services to potential clients, brands, and agencies.',
            image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop',
            link: 'https://sihem-09.github.io/ugc/',
            tags: 'UI Design, UX Design',
            tech: 'Figma',
            year: '2025',
            client: 'Content Creator'
        },
        {
            id: 3,
            title: 'Alex’s Creative Portfolio Website',
            category: 'Web Development',
            description: 'A modern and visually engaging portfolio site that showcases Alex’s creative work, skills, and professional presence with intuitive layout and clean design.',
            details: 'This project is a personal portfolio website designed to present Alex’s creative projects and professional profile in an elegant, user-friendly format.Welcome & Introduction Section: A strong first impression with a dynamic hero section introducing Alex’s creative identity and focus.Skills & Services: Highlighted sections outlining Alex’s core competencies and services offered to clients or collaborators.Portfolio Showcase: A visual gallery of featured projects and work samples demonstrating versatility and creativity.About & Background: A concise narrative explaining Alex’s journey, experience, and design philosophy.Contact & Call to Action: Contact details and prompt encouraging visitors to reach out for collaboration or work opportunities.The site emphasizes clarity, visual appeal, and easy navigation — ideal for designers, creatives, and professionals aiming for a compelling personal web presence.',
            image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&auto=format&fit=crop',
            link: 'https://sihem-09.github.io/alex/',
            tags: 'Frontend, Design',
            tech: 'HTML, CSS, JavaScript',
            year: '2025',
            client: 'Designer Portfolio'
        }
    ];
    
    // Get additional projects from localStorage (admin-added projects)
    const saved = localStorage.getItem('portfolio_additional_projects');
    const additionalProjects = saved ? JSON.parse(saved) : [];
    
    // Combine default + additional projects
    projects = [...defaultProjects, ...additionalProjects];
}

function saveProjects() {
    // Only save the additional projects (not the default ones)
    const additionalProjects = projects.filter(p => p.id > 1000); // IDs over 1000 are admin-added
    localStorage.setItem('portfolio_additional_projects', JSON.stringify(additionalProjects));
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tags = project.tags ? project.tags.split(',').map(tag => 
        `<span class="project-tag">${tag.trim()}</span>`
    ).join('') : '';
    
    const adminButtons = isAdmin ? `
        <div class="project-admin-actions">
            <button class="btn-icon" onclick="editProject(${project.id})" title="Edit">
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn-icon delete" onclick="deleteProject(${project.id})" title="Delete">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    ` : '';
    
    card.innerHTML = `
        <div class="project-image-wrapper">
            <img src="${project.image}" alt="${project.title}" class="project-card-image" onerror="this.src='https://via.placeholder.com/800x500?text=Project+Image'">
        </div>
        <div class="project-card-content">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-desc">${project.description}</p>
            ${tags ? `<div class="project-card-tags">${tags}</div>` : ''}
            <div class="project-card-footer">
                <a href="project.html?id=${project.id}" class="view-project-link">
                    View Project
                    <span class="material-symbols-outlined">arrow_forward</span>
                </a>
                ${adminButtons}
            </div>
        </div>
    `;
    
    return card;
}

function addProject(e) {
    e.preventDefault();
    
    // Get all form elements with null checks
    const titleInput = document.getElementById('projectTitle');
    const categoryInput = document.getElementById('projectCategory');
    const descInput = document.getElementById('projectDescription');
    const detailsInput = document.getElementById('projectDetails');
    const imageInput = document.getElementById('projectImage');
    const linkInput = document.getElementById('projectLink');
    const tagsInput = document.getElementById('projectTags');
    const techInput = document.getElementById('projectTech');
    const yearInput = document.getElementById('projectYear');
    const clientInput = document.getElementById('projectClient');
    
    // Verify required fields exist
    if (!titleInput || !descInput || !imageInput) {
        showNotification('Form error - missing required fields', 'error');
        return;
    }
    
    const newProject = {
        id: Date.now(),
        title: titleInput.value,
        category: categoryInput ? categoryInput.value : '',
        description: descInput.value,
        details: detailsInput ? detailsInput.value : '',
        image: imageInput.value,
        link: linkInput ? linkInput.value : '',
        tags: tagsInput ? tagsInput.value : '',
        tech: techInput ? techInput.value : '',
        year: yearInput ? yearInput.value : '',
        client: clientInput ? clientInput.value : ''
    };
    
    projects.push(newProject);
    saveProjects();
    renderProjects();
    
    const form = document.getElementById('projectForm');
    if (form) {
        form.reset();
    }
    
    showNotification('Project added successfully!');
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    // Get all form elements
    const titleInput = document.getElementById('projectTitle');
    const categoryInput = document.getElementById('projectCategory');
    const descInput = document.getElementById('projectDescription');
    const detailsInput = document.getElementById('projectDetails');
    const imageInput = document.getElementById('projectImage');
    const linkInput = document.getElementById('projectLink');
    const tagsInput = document.getElementById('projectTags');
    const techInput = document.getElementById('projectTech');
    const yearInput = document.getElementById('projectYear');
    const clientInput = document.getElementById('projectClient');
    
    // Populate form only if elements exist
    if (titleInput) titleInput.value = project.title;
    if (categoryInput) categoryInput.value = project.category || '';
    if (descInput) descInput.value = project.description;
    if (detailsInput) detailsInput.value = project.details || '';
    if (imageInput) imageInput.value = project.image;
    if (linkInput) linkInput.value = project.link || '';
    if (tagsInput) tagsInput.value = project.tags || '';
    if (techInput) techInput.value = project.tech || '';
    if (yearInput) yearInput.value = project.year || '';
    if (clientInput) clientInput.value = project.client || '';
    
    deleteProject(id, true);
    
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteProject(id, silent = false) {
    if (!silent && !confirm('Delete this project?')) return;
    
    projects = projects.filter(p => p.id !== id);
    saveProjects();
    renderProjects();
    
    if (!silent) showNotification('Project deleted');
}

function hideAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
    isAdmin = false;
}

// ========== ADMIN ==========
function showAdminModal() {
    const modal = document.getElementById('adminModal');
    const passwordInput = document.getElementById('adminPassword');
    
    if (modal) {
        modal.classList.add('active');
    }
    if (passwordInput) {
        passwordInput.focus();
    }
}

function hideAdminModal() {
    const modal = document.getElementById('adminModal');
    const passwordInput = document.getElementById('adminPassword');
    
    if (modal) {
        modal.classList.remove('active');
    }
    if (passwordInput) {
        passwordInput.value = '';
    }
}

function loginAdmin() {
    const passwordInput = document.getElementById('adminPassword');
    if (!passwordInput) return;
    
    const password = passwordInput.value;
    
    if (password === 'admin123') {
        isAdmin = true;
        hideAdminModal();
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'block';
        }
        renderProjects();
        showNotification('Welcome Admin!');
    } else {
        showNotification('Incorrect password', 'error');
    }
}

// ========== FAQ ==========
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ========== SMOOTH SCROLL ==========
function smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.getElementById('navMenu')?.classList.remove('active');
        }
    }
}

// ========== NOTIFICATION ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)' : '#ef4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Theme
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Admin
    const adminFab = document.getElementById('adminFab');
    if (adminFab) {
        adminFab.addEventListener('click', showAdminModal);
    }
    
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', loginAdmin);
    }
    
    const adminCancelBtn = document.getElementById('adminCancelBtn');
    if (adminCancelBtn) {
        adminCancelBtn.addEventListener('click', hideAdminModal);
    }
    
    const adminPassword = document.getElementById('adminPassword');
    if (adminPassword) {
        adminPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') loginAdmin();
        });
    }
    
    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', addProject);
    }
    
    // Mobile menu
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close modal on overlay
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target.id === 'adminModal') {
                hideAdminModal();
            }
        });
    }
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (navMenu && mobileToggle && 
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);