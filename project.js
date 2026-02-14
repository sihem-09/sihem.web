// =========================================
// PROJECT DETAIL PAGE - JAVASCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadProjectDetail();
});

// ========== THEME ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
}

// ========== LOAD PROJECT ==========
function loadProjectDetail() {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));
    
    if (!projectId) {
        window.location.href = 'index.html#projects';
        return;
    }
    
    // DEFAULT PROJECTS (same as in script.js)
    const defaultProjects = [
        {
            id: 1,
            title: 'Hammoudi Zahra – Professional Personal Portfolio',
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
    
    // Get additional projects from localStorage
    const saved = localStorage.getItem('portfolio_additional_projects');
    const additionalProjects = saved ? JSON.parse(saved) : [];
    
    // Combine all projects
    const allProjects = [...defaultProjects, ...additionalProjects];
    
    const project = allProjects.find(p => p.id === projectId);
    
    if (!project) {
        window.location.href = 'index.html#projects';
        return;
    }
    
    // Populate page with project data
    displayProject(project);
}

function displayProject(project) {
    // Title and meta
    document.title = `${project.title} - Sihem Hammoudi`;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectCategory').textContent = project.category || 'Project';
    document.getElementById('projectYear').textContent = project.year || '2024';
    document.getElementById('projectDescription').textContent = project.description;
    
    // Hero image
    const heroImg = document.getElementById('projectHeroImage');
    heroImg.src = project.image;
    heroImg.alt = project.title;
    heroImg.onerror = () => {
        heroImg.src = 'https://via.placeholder.com/1000x600?text=Project+Image';
    };
    
    // Details
    const detailsEl = document.getElementById('projectDetails');
    if (project.details) {
        detailsEl.textContent = project.details;
    } else {
        detailsEl.textContent = 'This project showcases modern design principles and clean development practices.';
    }
    
    // Client
    const clientEl = document.getElementById('projectClient');
    if (project.client) {
        clientEl.textContent = project.client;
    } else {
        clientEl.textContent = 'Personal Project';
    }
    
    // Technologies
    const techEl = document.getElementById('projectTech');
    if (project.tech) {
        const techs = project.tech.split(',').map(t => t.trim());
        techEl.innerHTML = techs.map(tech => 
            `<div class="tech-item">${tech}</div>`
        ).join('');
    } else {
        techEl.innerHTML = '<div class="tech-item">HTML</div><div class="tech-item">CSS</div><div class="tech-item">JavaScript</div>';
    }
    
    // Tags
    const tagsEl = document.getElementById('projectTags');
    if (project.tags) {
        const tags = project.tags.split(',').map(t => t.trim());
        tagsEl.innerHTML = tags.map(tag => 
            `<div class="tag-item">${tag}</div>`
        ).join('');
    } else {
        tagsEl.innerHTML = '<div class="tag-item">Web Design</div><div class="tag-item">Development</div>';
    }
    
    // Project link button
    const linkBtn = document.getElementById('projectLinkBtn');
    if (project.link) {
        linkBtn.href = project.link;
        linkBtn.style.display = 'inline-flex';
    } else {
        linkBtn.style.display = 'none';
    }
}