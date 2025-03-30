// Initialize background elements
function initBackground() {
    const bgElements = document.getElementById('bgElements');
    const colors = ['rgba(0,51,102,0.05)', 'rgba(0,51,102,0.03)', 'rgba(255,215,0,0.05)'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'bg-element';
        
        // Random size between 50px and 200px
        const size = Math.random() * 150 + 50;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100 + 100}%`;
        
        // Random animation duration between 10s and 25s
        const duration = Math.random() * 15 + 10;
        element.style.animationDuration = `${duration}s`;
        
        // Random delay
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random color
        element.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        bgElements.appendChild(element);
    }
}

// Header scroll effect
function handleScroll() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Toast notification
function showToast(message, type = '') {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Placeholder for storing user data
let users = [];
let currentUser = null;
let quizAnswers = [];
let currentQuestion = 1;
let bookings = [];
let currentEventForBooking = null
let feedbacks = [
    {
        name: "Asfar Hossain Sitab",
        email: "ahsitab@gmail.com.com",
        rating: 5,
        type: "praise",
        message: "This platform is amazing! It's helped me find so many clubs that match my interests.",
        date: "2024-10-15"
    },
    {
        name: "Parmita Hossain Simia",
        email: "phsimia@gmail.com.com",
        rating: 4,
        type: "suggestion",
        message: "Would love to see more filtering options for events. Great job overall!",
        date: "2024-10-10"
    },
    {
        name: "Mushfida Fedous Maisha",
        email: "mfmaisha@gmail.com",
        rating: 5,
        type: "praise",
        message: "The club matching quiz was spot on! Found my perfect club match.",
        date: "2024-10-05"
    },
    {
        name: "Ramiz Fariha Risha",
        email: "rfrisha@gmail.com.com",
        rating: 3,
        type: "suggestion",
        message: "The mobile experience could be improved. Some buttons are too small to tap.",
        date: "2024-09-28"
    }
];

// Sample data for events, venues, sponsors, and vendors
let events = [
    {
        id: 1,
        title: "Orientation Day",
        description: "Welcome our new students with an unforgettable orientation experience",
        date: "2024-11-15",
        time: "10:00",
        category: "Orientation",
        venue: "Main Auditorium",
        image: "3.jpg",
        capacity: 500,
        price: 0
    },
    {
        id: 2,
        title: "Annual Concert",
        description: "Experience the best musical talents from our university",
        date: "2024-12-05",
        time: "18:00",
        category: "Concerts",
        venue: "Open Air Theater",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        capacity: 300,
        price: 200
    },
    {
        id: 3,
        title: "Skill Development Workshops",
        description: "Enhance your skills with our expert-led workshops",
        date: "2025-01-20",
        time: "14:00",
        category: "Workshop",
        venue: "Room 501",
        image: "5.jpg",
        capacity: 50,
        price: 100
    },
    {
        id: 4,
        title: "Annual Picnic",
        description: "Relax and enjoy with friends at our fun-filled picnic",
        date: "2025-01-10",
        time: "08:00",
        category: "Picnic",
        venue: "National Park",
        image: "6.png",
        capacity: 200,
        price: 300
    }
];

let venues = [
    {
        id: 1,
        name: "Main Auditorium",
        location: "Building A, Ground Floor",
        capacity: 500,
        description: "The largest auditorium in the university with advanced audio-visual facilities",
        image: ""
    },
    {
        id: 2,
        name: "Open Air Theater",
        location: "Behind Building C",
        capacity: 300,
        description: "Outdoor venue perfect for concerts and performances",
        image: ""
    },
    {
        id: 3,
        name: "Room 501",
        location: "Building B, 5th Floor",
        capacity: 50,
        description: "Seminar room with projector and whiteboard",
        image: ""
    },
    {
        id: 4,
        name: "National Park",
        location: "20km from campus",
        capacity: 1000,
        description: "Beautiful natural setting for outdoor events",
        image: ""
    }
];

let sponsors = [
    {
        id: 1,
        name: "Tech Solutions Ltd.",
        type: "Financial",
        contact: "Mr. Rahman",
        email: "rahman@techsolutions.com",
        phone: "+880 1711 111111",
        logo: ""
    },
    {
        id: 2,
        name: "Campus Cafe",
        type: "In-Kind",
        contact: "Ms. Khan",
        email: "khan@campuscafe.com",
        phone: "+880 1711 222222",
        logo: ""
    },
    {
        id: 3,
        name: "Student Times",
        type: "Media",
        contact: "Mr. Ahmed",
        email: "ahmed@studenttimes.com",
        phone: "+880 1711 333333",
        logo: ""
    }
];

let vendors = [
    {
        id: 1,
        name: "Food Express",
        type: "Food",
        contact: "Mr. Karim",
        email: "karim@foodexpress.com",
        phone: "+880 1711 444444",
        description: "Provides catering services for events"
    },
    {
        id: 2,
        name: "Beverage World",
        type: "Beverage",
        contact: "Ms. Begum",
        email: "begum@beverageworld.com",
        phone: "+880 1711 555555",
        description: "Specializes in drinks and refreshments"
    },
    {
        id: 3,
        name: "Campus Merch",
        type: "Merchandise",
        contact: "Mr. Hossain",
        email: "hossain@campusmerch.com",
        phone: "+880 1711 666666",
        description: "University-branded merchandise and souvenirs"
    }
];

// Initialize the app
function init() {
    initBackground();
    window.addEventListener('scroll', handleScroll);
    
    // Check if user is remembered
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const user = JSON.parse(rememberedUser);
        document.getElementById('userUsername').value = user.username;
        document.getElementById('userPassword').value = user.password;
        document.getElementById('userRememberMe').checked = true;
    }
    
    // Check admin remember me
    const rememberedAdmin = localStorage.getItem('rememberedAdmin');
    if (rememberedAdmin) {
        const admin = JSON.parse(rememberedAdmin);
        document.getElementById('adminUsername').value = admin.username;
        document.getElementById('adminPassword').value = admin.password;
        document.getElementById('adminRememberMe').checked = true;
    }
    
    // Initialize star rating
    initStarRating();
    
    // Load sample feedbacks
    renderFeedbacks();
    
    // Load sample events in the gallery
    renderEventGallery();
    
    // Populate venue dropdown in event form
    populateVenueDropdown();
}

// Initialize star rating functionality
function initStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            document.getElementById('feedbackRating').value = rating;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        // Add hover effect
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
}

// Render feedback items
function renderFeedbacks() {
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '<h3>Recent Feedback</h3>';
    
    if (feedbacks.length === 0) {
        feedbackList.innerHTML += '<p>No feedback submitted yet. Be the first to share your thoughts!</p>';
        return;
    }
    
    // Sort feedbacks by date (newest first)
    feedbacks.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    feedbacks.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        
        // Format date
        const dateObj = new Date(feedback.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Create stars for rating
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < feedback.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        feedbackItem.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-user">${feedback.name}</span>
                <span class="feedback-date">${formattedDate}</span>
            </div>
            <div class="feedback-rating">${stars}</div>
            <div class="feedback-type"><strong>Type:</strong> ${feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}</div>
            <div class="feedback-message">${feedback.message}</div>
        `;
        
        feedbackList.appendChild(feedbackItem);
    });
}

// Render event gallery
function renderEventGallery() {
    const eventGrid = document.getElementById('eventGrid');
    eventGrid.innerHTML = '';
    
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'gallery-item';
        
        eventItem.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <button class="quick-view" onclick="showEventDetails(${event.id})">
                <i class="fas fa-eye"></i>
            </button>
            <div class="gallery-caption">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <button class="btn btn-accent" onclick="showEventDetails(${event.id})">
                    View Details
                </button>
            </div>
        `;
        
        eventGrid.appendChild(eventItem);
    });
}

// Populate venue dropdown in event form
function populateVenueDropdown() {
    const venueSelect = document.getElementById('eventVenue');
    venueSelect.innerHTML = '<option value="">Select venue</option>';
    
    venues.forEach(venue => {
        const option = document.createElement('option');
        option.value = venue.id;
        option.textContent = venue.name;
        venueSelect.appendChild(option);
    });
}

// Function to show admin names
function showAdminNames() {
    hideAllSections();
    document.getElementById('aboutDevelopersDashboard').style.display = "block";
    document.title = "About Developers | EWU Club Hub";
    
    // Initialize charts
    initReportCharts();
}

// Function to show admin login modal
function showAdminLogin() {
    document.getElementById('adminLoginModal').style.display = "flex";
    setTimeout(() => {
        document.getElementById('adminLoginModal').classList.add('show');
    }, 10);
}

// Function to show user login modal
function showLogin(role) {
    if (role === 'user') {
        document.getElementById('userLoginModal').style.display = "flex";
        setTimeout(() => {
            document.getElementById('userLoginModal').classList.add('show');
        }, 10);
    }
}

// Function to close modals
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    setTimeout(() => {
        document.getElementById(modalId).style.display = "none";
    }, 300);
}

// Function to show registration modal
function showRegistration() {
    closeModal('userLoginModal');
    document.getElementById('userRegistrationModal').style.display = "flex";
    setTimeout(() => {
        document.getElementById('userRegistrationModal').classList.add('show');
    }, 10);
}

// Function to register a new user
function registerUser() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!username || !email || !password || !confirmPassword) {
        showToast("Please fill in all fields", "error");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match!", "error");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
    }

    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        showToast("Username already exists!", "error");
        return;
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showToast("Email already registered!", "error");
        return;
    }

    // Add the new user to the list
    users.push({ username, email, password });
    showToast("Registration successful! Please login.", "success");
    closeModal('userRegistrationModal');
    showLogin('user');
}

// Function to handle admin login
function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const rememberMe = document.getElementById('adminRememberMe').checked;
    
    const admins = ['sitab', 'simia', 'maisha', 'risha'];
    
    if (admins.includes(username.toLowerCase()) && password === 'admin123') {
        if (rememberMe) {
            localStorage.setItem('rememberedAdmin', JSON.stringify({ username, password }));
        } else {
            localStorage.removeItem('rememberedAdmin');
        }
        
        closeModal('adminLoginModal');
        currentUser = { username, role: 'admin' };
        showToast(`Welcome Admin ${username.charAt(0).toUpperCase() + username.slice(1)}`, "success");
        showAdminDashboard();
        document.getElementById('loginBtn').style.display = "none";
        document.getElementById('logoutBtn').style.display = "inline-block";
    } else {
        showToast('Invalid admin credentials', "error");
    }
}

// Update the userLogin function to show user's name
function userLogin() {
    const username = document.getElementById('userUsername').value;
    const password = document.getElementById('userPassword').value;
    const rememberMe = document.getElementById('userRememberMe').checked;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({ username, password }));
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        closeModal('userLoginModal');
        currentUser = { username, role: 'user' };
        showToast(`Welcome ${username}!`, "success");
        showUserDashboard();
        document.getElementById('loginBtn').style.display = "none";
        document.getElementById('logoutBtn').style.display = "inline-block";
    } else {
        showToast('Invalid username or password', "error");
    }
}

// Admin Dashboard Functions
function showAdminDashboard() {
    hideAllSections();
    document.getElementById('adminDashboard').style.display = "block";
    document.title = "Admin Dashboard | EWU Club Hub";
}

function manageEvents() {
    hideAllSections();
    document.getElementById('manageEventsDashboard').style.display = "block";
    document.title = "Manage Events | EWU Club Hub";
    
    // Show add event tab by default
    openAdminTab('event', 'addEvent');
    // Also render events table
    renderEventsTable();
}

function manageVenues() {
    hideAllSections();
    document.getElementById('manageVenuesDashboard').style.display = "block";
    document.title = "Manage Venues | EWU Club Hub";
    
    // Show add venue tab by default
    openAdminTab('venue', 'addVenue');
    // Also render venues table
    renderVenuesTable();
}

function manageSponsors() {
    hideAllSections();
    document.getElementById('manageSponsorsDashboard').style.display = "block";
    document.title = "Manage Sponsors | EWU Club Hub";
    
    // Show add sponsor tab by default
    openAdminTab('sponsor', 'addSponsor');
    // Also render sponsors table
    renderSponsorsTable();
}

function manageVendors() {
    hideAllSections();
    document.getElementById('manageVendorsDashboard').style.display = "block";
    document.title = "Manage Vendors | EWU Club Hub";
    
    // Show add vendor tab by default
    openAdminTab('vendor', 'addVendor');
    // Also render vendors table
    renderVendorsTable();
}

function viewReports() {
    hideAllSections();
    document.getElementById('viewReportsDashboard').style.display = "block";
    document.title = "Reports & Analytics | EWU Club Hub";
    
    // Update report numbers
    updateReportNumbers();
    // Initialize charts
    initReportCharts();
}

// Open admin tab
function openAdminTab(type, tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll(`.admin-tab-content`);
    tabContents.forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll(`.tab-btn`);
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the current tab and mark button as active
    document.getElementById(tabName).style.display = 'block';
    const buttons = document.querySelectorAll(`.tab-btn`);
    buttons.forEach(button => {
        if (button.textContent.trim() === tabName.replace(/([A-Z])/g, ' $1').trim()) {
            button.classList.add('active');
        }
    });
}

// Render events table
function renderEventsTable() {
    const tableBody = document.getElementById('eventsTableBody');
    tableBody.innerHTML = '';
    
    events.forEach(event => {
        const row = document.createElement('tr');
        
        // Format date
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        row.innerHTML = `
            <td>${event.title}</td>
            <td>${formattedDate}</td>
            <td>${event.category}</td>
            <td>${event.venue}</td>
            <td>
                <button class="action-btn" onclick="editEvent(${event.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteEvent(${event.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Render venues table
function renderVenuesTable() {
    const tableBody = document.getElementById('venuesTableBody');
    tableBody.innerHTML = '';
    
    venues.forEach(venue => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${venue.name}</td>
            <td>${venue.location}</td>
            <td>${venue.capacity}</td>
            <td>
                <button class="action-btn" onclick="editVenue(${venue.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteVenue(${venue.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Render sponsors table
function renderSponsorsTable() {
    const tableBody = document.getElementById('sponsorsTableBody');
    tableBody.innerHTML = '';
    
    sponsors.forEach(sponsor => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${sponsor.name}</td>
            <td>${sponsor.type}</td>
            <td>${sponsor.contact}</td>
            <td>${sponsor.email}</td>
            <td>
                <button class="action-btn" onclick="editSponsor(${sponsor.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteSponsor(${sponsor.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Render vendors table
function renderVendorsTable() {
    const tableBody = document.getElementById('vendorsTableBody');
    tableBody.innerHTML = '';
    
    vendors.forEach(vendor => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${vendor.name}</td>
            <td>${vendor.type}</td>
            <td>${vendor.contact}</td>
            <td>${vendor.email}</td>
            <td>
                <button class="action-btn" onclick="editVendor(${vendor.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteVendor(${vendor.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Save event
function saveEvent() {
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const category = document.getElementById('eventCategory').value;
    const venueId = document.getElementById('eventVenue').value;
    const image = document.getElementById('eventImage').value;
    const capacity = document.getElementById('eventCapacity').value;
    const price = document.getElementById('eventPrice').value;
    
    if (!title || !description || !date || !time || !category || !venueId) {
        showToast("Please fill in all required fields", "error");
        return;
    }
    
    // Find venue name
    const venue = venues.find(v => v.id == venueId);
    if (!venue) {
        showToast("Selected venue not found", "error");
        return;
    }
    
    // Create new event
    const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        title,
        description,
        date,
        time,
        category,
        venue: venue.name,
        image: image || 'https://via.placeholder.com/800x500',
        capacity: capacity ? parseInt(capacity) : 0,
        price: price ? parseInt(price) : 0
    };
    
    events.push(newEvent);
    showToast("Event saved successfully!", "success");
    
    // Reset form
    document.getElementById('eventForm').reset();
    
    // Update events table
    renderEventsTable();
    // Update event gallery
    renderEventGallery();
    // Switch to view tab
    openAdminTab('event', 'viewEvents');
}

// Save venue
function saveVenue() {
    const name = document.getElementById('venueName').value;
    const location = document.getElementById('venueLocation').value;
    const capacity = document.getElementById('venueCapacity').value;
    const description = document.getElementById('venueDescription').value;
    const image = document.getElementById('venueImage').value;
    
    if (!name || !location || !capacity) {
        showToast("Please fill in all required fields", "error");
        return;
    }
    
    // Create new venue
    const newVenue = {
        id: venues.length > 0 ? Math.max(...venues.map(v => v.id)) + 1 : 1,
        name,
        location,
        capacity: parseInt(capacity),
        description: description || '',
        image: image || ''
    };
    
    venues.push(newVenue);
    showToast("Venue saved successfully!", "success");
    
    // Reset form
    document.getElementById('venueForm').reset();
    
    // Update venues table
    renderVenuesTable();
    // Update venue dropdown in event form
    populateVenueDropdown();
    // Switch to view tab
    openAdminTab('venue', 'viewVenues');
}

// Save sponsor
function saveSponsor() {
    const name = document.getElementById('sponsorName').value;
    const type = document.getElementById('sponsorType').value;
    const contact = document.getElementById('sponsorContact').value;
    const email = document.getElementById('sponsorEmail').value;
    const phone = document.getElementById('sponsorPhone').value;
    const logo = document.getElementById('sponsorLogo').value;
    
    if (!name || !type || !contact || !email) {
        showToast("Please fill in all required fields", "error");
        return;
    }
    
    // Create new sponsor
    const newSponsor = {
        id: sponsors.length > 0 ? Math.max(...sponsors.map(s => s.id)) + 1 : 1,
        name,
        type,
        contact,
        email,
        phone: phone || '',
        logo: logo || ''
    };
    
    sponsors.push(newSponsor);
    showToast("Sponsor saved successfully!", "success");
    
    // Reset form
    document.getElementById('sponsorForm').reset();
    
    // Update sponsors table
    renderSponsorsTable();
    // Switch to view tab
    openAdminTab('sponsor', 'viewSponsors');
}

// Save vendor
function saveVendor() {
    const name = document.getElementById('vendorName').value;
    const type = document.getElementById('vendorType').value;
    const contact = document.getElementById('vendorContact').value;
    const email = document.getElementById('vendorEmail').value;
    const phone = document.getElementById('vendorPhone').value;
    const description = document.getElementById('vendorDescription').value;
    
    if (!name || !type || !contact || !email) {
        showToast("Please fill in all required fields", "error");
        return;
    }
    
    // Create new vendor
    const newVendor = {
        id: vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1,
        name,
        type,
        contact,
        email,
        phone: phone || '',
        description: description || ''
    };
    
    vendors.push(newVendor);
    showToast("Vendor saved successfully!", "success");
    
    // Reset form
    document.getElementById('vendorForm').reset();
    
    // Update vendors table
    renderVendorsTable();
    // Switch to view tab
    openAdminTab('vendor', 'viewVendors');
}

// Edit event
function editEvent(id) {
    const event = events.find(e => e.id === id);
    if (!event) {
        showToast("Event not found", "error");
        return;
    }
    
    // For simplicity, we'll just show the event details
    showToast(`Editing: ${event.title}`, "success");
    // In a real app, you would populate a form with the event data
}

// Edit venue
function editVenue(id) {
    const venue = venues.find(v => v.id === id);
    if (!venue) {
        showToast("Venue not found", "error");
        return;
    }
    
    showToast(`Editing: ${venue.name}`, "success");
}

// Edit sponsor
function editSponsor(id) {
    const sponsor = sponsors.find(s => s.id === id);
    if (!sponsor) {
        showToast("Sponsor not found", "error");
        return;
    }
    
    showToast(`Editing: ${sponsor.name}`, "success");
}

// Edit vendor
function editVendor(id) {
    const vendor = vendors.find(v => v.id === id);
    if (!vendor) {
        showToast("Vendor not found", "error");
        return;
    }
    
    showToast(`Editing: ${vendor.name}`, "success");
}

// Delete event
function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event?")) {
        events = events.filter(e => e.id !== id);
        showToast("Event deleted successfully", "success");
        renderEventsTable();
        renderEventGallery();
    }
}

// Delete venue
function deleteVenue(id) {
    if (confirm("Are you sure you want to delete this venue?")) {
        // Check if venue is used in any events
        const usedInEvents = events.some(e => {
            const venue = venues.find(v => v.id === id);
            return venue && e.venue === venue.name;
        });
        
        if (usedInEvents) {
            showToast("Cannot delete venue used in events", "error");
            return;
        }
        
        venues = venues.filter(v => v.id !== id);
        showToast("Venue deleted successfully", "success");
        renderVenuesTable();
        populateVenueDropdown();
    }
}

// Delete sponsor
function deleteSponsor(id) {
    if (confirm("Are you sure you want to delete this sponsor?")) {
        sponsors = sponsors.filter(s => s.id !== id);
        showToast("Sponsor deleted successfully", "success");
        renderSponsorsTable();
    }
}

// Delete vendor
function deleteVendor(id) {
    if (confirm("Are you sure you want to delete this vendor?")) {
        vendors = vendors.filter(v => v.id !== id);
        showToast("Vendor deleted successfully", "success");
        renderVendorsTable();
    }
}

// Filter events
function filterEvents() {
    const searchTerm = document.getElementById('eventSearch').value.toLowerCase();
    const filterValue = document.getElementById('eventFilter').value;
    
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                             event.description.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' || event.category === filterValue;
        return matchesSearch && matchesFilter;
    });
    
    const tableBody = document.getElementById('eventsTableBody');
    tableBody.innerHTML = '';
    
    if (filteredEvents.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No events found</td></tr>';
        return;
    }
    
    filteredEvents.forEach(event => {
        const row = document.createElement('tr');
        
        // Format date
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        row.innerHTML = `
            <td>${event.title}</td>
            <td>${formattedDate}</td>
            <td>${event.category}</td>
            <td>${event.venue}</td>
            <td>
                <button class="action-btn" onclick="editEvent(${event.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteEvent(${event.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Filter venues
function filterVenues() {
    const searchTerm = document.getElementById('venueSearch').value.toLowerCase();
    
    const filteredVenues = venues.filter(venue => {
        return venue.name.toLowerCase().includes(searchTerm) || 
               venue.location.toLowerCase().includes(searchTerm);
    });
    
    const tableBody = document.getElementById('venuesTableBody');
    tableBody.innerHTML = '';
    
    if (filteredVenues.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No venues found</td></tr>';
        return;
    }
    
    filteredVenues.forEach(venue => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${venue.name}</td>
            <td>${venue.location}</td>
            <td>${venue.capacity}</td>
            <td>
                <button class="action-btn" onclick="editVenue(${venue.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteVenue(${venue.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Filter sponsors
function filterSponsors() {
    const searchTerm = document.getElementById('sponsorSearch').value.toLowerCase();
    const filterValue = document.getElementById('sponsorFilter').value;
    
    const filteredSponsors = sponsors.filter(sponsor => {
        const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm) || 
                             sponsor.contact.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' || sponsor.type === filterValue;
        return matchesSearch && matchesFilter;
    });
    
    const tableBody = document.getElementById('sponsorsTableBody');
    tableBody.innerHTML = '';
    
    if (filteredSponsors.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No sponsors found</td></tr>';
        return;
    }
    
    filteredSponsors.forEach(sponsor => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${sponsor.name}</td>
            <td>${sponsor.type}</td>
            <td>${sponsor.contact}</td>
            <td>${sponsor.email}</td>
            <td>
                <button class="action-btn" onclick="editSponsor(${sponsor.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteSponsor(${sponsor.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Filter vendors
function filterVendors() {
    const searchTerm = document.getElementById('vendorSearch').value.toLowerCase();
    const filterValue = document.getElementById('vendorFilter').value;
    
    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(searchTerm) || 
                             vendor.contact.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' || vendor.type === filterValue;
        return matchesSearch && matchesFilter;
    });
    
    const tableBody = document.getElementById('vendorsTableBody');
    tableBody.innerHTML = '';
    
    if (filteredVendors.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No vendors found</td></tr>';
        return;
    }
    
    filteredVendors.forEach(vendor => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${vendor.name}</td>
            <td>${vendor.type}</td>
            <td>${vendor.contact}</td>
            <td>${vendor.email}</td>
            <td>
                <button class="action-btn" onclick="editVendor(${vendor.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteVendor(${vendor.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Update report numbers
function updateReportNumbers() {
    document.getElementById('totalEvents').textContent = events.length;
    
    // Calculate total attendees (random for demo)
    const totalAttendees = events.reduce((sum, event) => sum + Math.floor(event.capacity * 0.8), 0);
    document.getElementById('totalAttendees').textContent = totalAttendees;
    
    // Calculate tickets sold (only for paid events)
    const ticketsSold = events.reduce((sum, event) => sum + (event.price > 0 ? Math.floor(event.capacity * 0.7) : 0), 0);
    document.getElementById('ticketsSold').textContent = ticketsSold;
    
    // Calculate total revenue
    const totalRevenue = events.reduce((sum, event) => sum + (event.price * Math.floor(event.capacity * 0.7)), 0);
    document.getElementById('totalRevenue').textContent = `৳${totalRevenue.toLocaleString()}`;
}

// Initialize report charts
function initReportCharts() {
    // Events by category chart
    const eventsByCategoryCtx = document.getElementById('eventsByCategoryChart').getContext('2d');
    
    // Count events by category
    const categories = [...new Set(events.map(event => event.category))];
    const eventCounts = categories.map(category => 
        events.filter(event => event.category === category).length
    );
    
    new Chart(eventsByCategoryCtx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: eventCounts,
                backgroundColor: [
                    '#003366',
                    '#004080',
                    '#00509e',
                    '#0061bc',
                    '#0073da'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Monthly attendance chart
    const monthlyAttendanceCtx = document.getElementById('monthlyAttendanceChart').getContext('2d');
    
    // Group events by month and calculate attendance
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const monthlyAttendance = Array(12).fill(0);
    
    events.forEach(event => {
        const eventMonth = new Date(event.date).getMonth();
        // For demo, attendance is 80% of capacity
        monthlyAttendance[eventMonth] += Math.floor(event.capacity * 0.8);
    });
    
    // Only show current and previous months
    const displayedMonths = [];
    const displayedAttendance = [];
    for (let i = Math.max(0, currentMonth - 5); i <= currentMonth; i++) {
        displayedMonths.push(months[i]);
        displayedAttendance.push(monthlyAttendance[i]);
    }
    
    new Chart(monthlyAttendanceCtx, {
        type: 'bar',
        data: {
            labels: displayedMonths,
            datasets: [{
                label: 'Attendance',
                data: displayedAttendance,
                backgroundColor: '#FFD700',
                borderColor: '#e6c200',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Show event details
function showEventDetails(id) {
    const event = events.find(e => e.id === id);
    if (!event) {
        showToast("Event not found", "error");
        return;
    }
    
    // Format date
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    
    // Create modal content
    const modalContent = `
        <div class="event-details">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-info">
                <h3>${event.title}</h3>
                <p><i class="fas fa-calendar-alt"></i> ${formattedDate} at ${event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                <p><i class="fas fa-tag"></i> ${event.category}</p>
                ${event.price > 0 ? `<p><i class="fas fa-ticket-alt"></i> Ticket Price: ৳${event.price}</p>` : '<p><i class="fas fa-ticket-alt"></i> Free Event</p>'}
                <p><i class="fas fa-users"></i> Capacity: ${event.capacity} attendees</p>
                <div class="event-description">
                    <h4>Description</h4>
                    <p>${event.description}</p>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 20px;">
                    <i class="fas fa-ticket-alt"></i> Register Now
                </button>
            </div>
        </div>
    `;
    
    // Show modal (in a real app, you would use a proper modal component)
    alert(`Event Details:\n\n${event.title}\n\nDate: ${formattedDate}\nTime: ${event.time}\nVenue: ${event.venue}\n\n${event.description}`);
}

// User Dashboard Functions
function showUserDashboard() {
    hideAllSections();
    document.getElementById('userDashboard').style.display = "block";
    document.title = "User Dashboard | EWU Club Hub";
}

function browseEvents() {
    showEvents();
}

function buyTickets() {
    showToast("Buy Tickets: Easy and secure ticket booking.", "success");
}

function viewBookingHistory() {
    showToast("View Booking History: Check past and upcoming event bookings.", "success");
}

function leaveFeedback() {
    showFeedback();
}

// Clubs Functions
function showClubs() {
    hideAllSections();
    document.getElementById('clubsDashboard').style.display = "block";
    document.title = "University Clubs | EWU Club Hub";
}

function showClubDetails(clubName) {
    showToast(`Loading details for: ${clubName}`, "success");
    // In a real app, this would show detailed club information
}

// Events Functions
function showEvents() {
    hideAllSections();
    document.getElementById('eventDetailsDashboard').style.display = "block";
    document.title = "Event Categories | EWU Club Hub";
}

function showEvent(eventType) {
    showToast(`Showing details for: ${eventType}`, "success");
    // In a real app, this would show detailed event information
}

// Feedback Function
function showFeedback() {
    hideAllSections();
    document.getElementById('feedbackDashboard').style.display = "block";
    document.title = "Feedback | EWU Club Hub";
}

// Submit feedback
function submitFeedback() {
    const name = document.getElementById('feedbackName').value;
    const email = document.getElementById('feedbackEmail').value;
    const rating = parseInt(document.getElementById('feedbackRating').value);
    const type = document.getElementById('feedbackType').value;
    const message = document.getElementById('feedbackMessage').value;

    // Validate inputs
    if (!name || !rating || !type || !message) {
        showToast("Please fill in all required fields", "error");
        return;
    }

    if (rating < 1 || rating > 5) {
        showToast("Please select a rating", "error");
        return;
    }

    // Create new feedback object
    const newFeedback = {
        name,
        email: email || "Not provided",
        rating,
        type,
        message,
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };

    // Add to feedbacks array
    feedbacks.unshift(newFeedback);
    
    // Render updated feedback list
    renderFeedbacks();
    
    // Reset form
    document.getElementById('feedbackForm').reset();
    document.getElementById('feedbackRating').value = 0;
    
    // Reset stars
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.classList.remove('active'));
    
    showToast("Thank you for your feedback!", "success");
}

// Logout Function
function logout() {
    currentUser = null;
    hideAllSections();
    document.getElementById('mainContainer').style.display = "block";
    document.title = "EWU Club Hub";
    document.getElementById('loginBtn').style.display = "inline-block";
    document.getElementById('logoutBtn').style.display = "none";
    showToast("You have been logged out successfully", "success");
}

// Back Function
function goBack() {
    hideAllSections();
    if (currentUser) {
        if (currentUser.role === 'admin') {
            showAdminDashboard();
        } else {
            showUserDashboard();
        }
    } else {
        document.getElementById('mainContainer').style.display = "block";
    }
}

// Show Home Function
function showHome() {
    hideAllSections();
    document.getElementById('heroSection').style.display = "block";
    document.getElementById('clubOfTheDay').style.display = "block";
    document.getElementById('eventGallery').style.display = "block";
    document.title = "EWU Club Hub";
    
    // Scroll to top when home is clicked
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Forgot Password Function
function forgotPassword() {
    showToast("A password reset link has been sent to your email", "success");
}

// Hide all sections
function hideAllSections() {
    const sections = [
        'mainContainer', 'heroSection', 'clubOfTheDay', 'eventGallery',
        'adminDashboard', 'userDashboard', 'eventDetailsDashboard',
        'clubsDashboard', 'clubQuiz', 'feedbackDashboard',
        'manageEventsDashboard', 'manageVenuesDashboard', 
        'manageSponsorsDashboard', 'manageVendorsDashboard',
        'viewReportsDashboard', 'aboutDevelopersDashboard'
    ];
    
    sections.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

// Club Matching Quiz Functions
function startClubQuiz() {
    hideAllSections();
    document.getElementById('clubQuiz').style.display = "block";
    document.title = "Club Matching Quiz | EWU Club Hub";
    resetQuiz();
    showQuestion(1);
}

function closeQuiz() {
    if (currentUser) {
        showUserDashboard();
    } else {
        document.getElementById('mainContainer').style.display = "block";
    }
}

function resetQuiz() {
    quizAnswers = [];
    currentQuestion = 1;
    document.getElementById('quizProgress').style.width = '0%';
    document.getElementById('quizPrev').style.display = 'none';
    document.getElementById('quizNext').style.display = 'inline-block';
    document.getElementById('quizSubmit').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    
    // Hide all questions except first
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`quizQuestion${i}`).style.display = 'none';
    }
}

function showQuestion(questionNum) {
    // Hide all questions
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`quizQuestion${i}`).style.display = 'none';
    }
    
    // Show current question
    document.getElementById(`quizQuestion${questionNum}`).style.display = 'block';
    
    // Update progress bar
    document.getElementById('quizProgress').style.width = `${(questionNum - 1) * 20}%`;
    
    // Update navigation buttons
    if (questionNum === 1) {
        document.getElementById('quizPrev').style.display = 'none';
    } else {
        document.getElementById('quizPrev').style.display = 'inline-block';
    }
    
    if (questionNum === 5) {
        document.getElementById('quizNext').style.display = 'none';
        document.getElementById('quizSubmit').style.display = 'inline-block';
    } else {
        document.getElementById('quizNext').style.display = 'inline-block';
        document.getElementById('quizSubmit').style.display = 'none';
    }
    
    // Clear any previous selection for this question
    const options = document.querySelectorAll(`#quizQuestion${questionNum} .quiz-option`);
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // If we already have an answer for this question, select it
    if (quizAnswers[questionNum - 1]) {
        const selectedOption = options[quizAnswers[questionNum - 1] - 1];
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }
}

function selectOption(questionNum, optionNum) {
    quizAnswers[questionNum - 1] = optionNum;
    
    // Update UI to show selected option
    const options = document.querySelectorAll(`#quizQuestion${questionNum} .quiz-option`);
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    options[optionNum - 1].classList.add('selected');
}

function nextQuestion() {
    if (!quizAnswers[currentQuestion - 1]) {
        showToast("Please select an option to continue", "error");
        return;
    }
    
    currentQuestion++;
    showQuestion(currentQuestion);
}

function prevQuestion() {
    currentQuestion--;
    showQuestion(currentQuestion);
}

function showResults() {
    if (!quizAnswers[4]) {
        showToast("Please select an option to see results", "error");
        return;
    }
    
    // Hide all questions
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`quizQuestion${i}`).style.display = 'none';
    }
    
    // Show results
    document.getElementById('quizResults').style.display = 'block';
    document.getElementById('quizProgress').style.width = '100%';
    document.getElementById('quizPrev').style.display = 'inline-block';
    document.getElementById('quizNext').style.display = 'none';
    document.getElementById('quizSubmit').style.display = 'none';
}

// Show user events
function showUserEvents() {
    hideAllUserSections();
    document.getElementById('userEventsSection').style.display = "block";
    renderUserEvents();
}

// Show user booking history
function showUserBookingHistory() {
    hideAllUserSections();
    document.getElementById('userBookingHistorySection').style.display = "block";
    renderUserBookings();
}

// Hide all user sections
function hideAllUserSections() {
    document.getElementById('userEventsSection').style.display = "none";
    document.getElementById('userBookingHistorySection').style.display = "none";
}

// Render events for user
function renderUserEvents() {
    const eventsGrid = document.getElementById('userEventsGrid');
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">No events available at the moment.</p>';
        return;
    }
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'user-event-card';
        
        // Format date
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-info">
                <h4>${event.title}</h4>
                <p class="event-date"><i class="fas fa-calendar-alt"></i> ${formattedDate} at ${event.time}</p>
                <p class="event-venue"><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                <p class="event-category"><i class="fas fa-tag"></i> ${event.category}</p>
                <div class="event-footer">
                    ${event.price > 0 ? `<span class="event-price">৳${event.price}</span>` : '<span class="event-price free">Free</span>'}
                    <button class="btn btn-primary" onclick="showBookingModal(${event.id})">
                        <i class="fas fa-ticket-alt"></i> Book Now
                    </button>
                </div>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Filter user events
function filterUserEvents() {
    const searchTerm = document.getElementById('userEventSearch').value.toLowerCase();
    const filterValue = document.getElementById('userEventFilter').value;
    
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                             event.description.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' || event.category === filterValue;
        return matchesSearch && matchesFilter;
    });
    
    const eventsGrid = document.getElementById('userEventsGrid');
    eventsGrid.innerHTML = '';
    
    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">No events match your search.</p>';
        return;
    }
    
    filteredEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'user-event-card';
        
        // Format date
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-info">
                <h4>${event.title}</h4>
                <p class="event-date"><i class="fas fa-calendar-alt"></i> ${formattedDate} at ${event.time}</p>
                <p class="event-venue"><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                <p class="event-category"><i class="fas fa-tag"></i> ${event.category}</p>
                <div class="event-footer">
                    ${event.price > 0 ? `<span class="event-price">৳${event.price}</span>` : '<span class="event-price free">Free</span>'}
                    <button class="btn btn-primary" onclick="showBookingModal(${event.id})">
                        <i class="fas fa-ticket-alt"></i> Book Now
                    </button>
                </div>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Show booking modal
function showBookingModal(eventId) {
    if (!currentUser) {
        showToast("Please login to book tickets", "error");
        showLogin('user');
        return;
    }
    
    const event = events.find(e => e.id === eventId);
    if (!event) {
        showToast("Event not found", "error");
        return;
    }
    
    currentEventForBooking = event;
    
    // Format date
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('bookingEventDetails').innerHTML = `
        <div class="event-booking-details">
            <h3>${event.title}</h3>
            <p><i class="fas fa-calendar-alt"></i> ${formattedDate} at ${event.time}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
            ${event.price > 0 ? `<p><i class="fas fa-ticket-alt"></i> Price per ticket: ৳${event.price}</p>` : ''}
        </div>
    `;
    
    // Update total amount
    document.getElementById('totalAmount').textContent = event.price;
    
    // Show modal
    document.getElementById('eventBookingModal').style.display = "flex";
    setTimeout(() => {
        document.getElementById('eventBookingModal').classList.add('show');
    }, 10);
}

// Calculate booking total when quantity changes
document.getElementById('bookingQuantity').addEventListener('input', function() {
    if (currentEventForBooking) {
        const quantity = parseInt(this.value) || 0;
        const total = quantity * currentEventForBooking.price;
        document.getElementById('totalAmount').textContent = total;
    }
});

// Confirm booking
function confirmBooking() {
    const quantity = parseInt(document.getElementById('bookingQuantity').value);
    const paymentMethod = document.getElementById('bookingPayment').value;
    
    if (!quantity || quantity < 1) {
        showToast("Please enter a valid quantity", "error");
        return;
    }
    
    if (!paymentMethod) {
        showToast("Please select a payment method", "error");
        return;
    }
    
    if (!currentEventForBooking || !currentUser) {
        showToast("Booking failed. Please try again.", "error");
        return;
    }
    
    // Create new booking
    const newBooking = {
        id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
        eventId: currentEventForBooking.id,
        eventTitle: currentEventForBooking.title,
        userId: currentUser.username,
        quantity: quantity,
        total: quantity * currentEventForBooking.price,
        paymentMethod: paymentMethod,
        bookingDate: new Date().toISOString().split('T')[0],
        status: "confirmed"
    };
    
    bookings.push(newBooking);
    showToast("Booking confirmed successfully!", "success");
    closeModal('eventBookingModal');
    
    // Update booking history if visible
    if (document.getElementById('userBookingHistorySection').style.display === "block") {
        renderUserBookings();
    }
}

// Render user bookings
function renderUserBookings() {
    if (!currentUser) return;
    
    const bookingsList = document.getElementById('userBookingsList');
    bookingsList.innerHTML = '';
    
    const userBookings = bookings.filter(b => b.userId === currentUser.username);
    
    if (userBookings.length === 0) {
        bookingsList.innerHTML = '<p class="no-bookings">You have no bookings yet.</p>';
        return;
    }
    
    userBookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'user-booking-item';
        
        // Find the event
        const event = events.find(e => e.id === booking.eventId);
        const eventDate = event ? new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) : 'Date not available';
        
        bookingItem.innerHTML = `
            <div class="booking-header">
                <h4>${booking.eventTitle}</h4>
                <span class="booking-status ${booking.status}">${booking.status}</span>
            </div>
            <div class="booking-details">
                <p><i class="fas fa-calendar-alt"></i> ${eventDate}</p>
                <p><i class="fas fa-ticket-alt"></i> ${booking.quantity} ticket(s)</p>
                <p><i class="fas fa-money-bill-wave"></i> Total: ৳${booking.total}</p>
                <p><i class="fas fa-credit-card"></i> Paid via: ${booking.paymentMethod.charAt(0).toUpperCase() + booking.paymentMethod.slice(1)}</p>
            </div>
            <div class="booking-footer">
                <span class="booking-date"><i class="fas fa-clock"></i> Booked on: ${booking.bookingDate}</span>
                ${booking.status === 'confirmed' ? `<button class="btn btn-outline" onclick="cancelBooking(${booking.id})">
                    <i class="fas fa-times"></i> Cancel
                </button>` : ''}
            </div>
        `;
        
        bookingsList.appendChild(bookingItem);
    });
}

// Filter user bookings
function filterUserBookings() {
    if (!currentUser) return;
    
    const searchTerm = document.getElementById('userBookingSearch').value.toLowerCase();
    const bookingsList = document.getElementById('userBookingsList');
    bookingsList.innerHTML = '';
    
    const filteredBookings = bookings.filter(b => 
        b.userId === currentUser.username && 
        b.eventTitle.toLowerCase().includes(searchTerm)
    );
    
    if (filteredBookings.length === 0) {
        bookingsList.innerHTML = '<p class="no-bookings">No bookings match your search.</p>';
        return;
    }
    
    filteredBookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'user-booking-item';
        
        // Find the event
        const event = events.find(e => e.id === booking.eventId);
        const eventDate = event ? new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) : 'Date not available';
        
        bookingItem.innerHTML = `
            <div class="booking-header">
                <h4>${booking.eventTitle}</h4>
                <span class="booking-status ${booking.status}">${booking.status}</span>
            </div>
            <div class="booking-details">
                <p><i class="fas fa-calendar-alt"></i> ${eventDate}</p>
                <p><i class="fas fa-ticket-alt"></i> ${booking.quantity} ticket(s)</p>
                <p><i class="fas fa-money-bill-wave"></i> Total: ৳${booking.total}</p>
                <p><i class="fas fa-credit-card"></i> Paid via: ${booking.paymentMethod.charAt(0).toUpperCase() + booking.paymentMethod.slice(1)}</p>
            </div>
            <div class="booking-footer">
                <span class="booking-date"><i class="fas fa-clock"></i> Booked on: ${booking.bookingDate}</span>
                ${booking.status === 'confirmed' ? `<button class="btn btn-outline" onclick="cancelBooking(${booking.id})">
                    <i class="fas fa-times"></i> Cancel
                </button>` : ''}
            </div>
        `;
        
        bookingsList.appendChild(bookingItem);
    });
}

// Cancel booking
function cancelBooking(bookingId) {
    if (confirm("Are you sure you want to cancel this booking?")) {
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = "cancelled";
            showToast("Booking cancelled successfully", "success");
            renderUserBookings();
        }
    }
}

// Chatbot Functions
let chatbotOpen = false;

function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotBody = document.getElementById('chatbot-body');
    const toggleIcon = document.getElementById('chatbot-toggle-icon');
    
    if (!chatbotOpen) {
        chatbotContainer.classList.add('active');
        chatbotBody.classList.add('expanded');
        toggleIcon.textContent = '-';
        chatbotOpen = true;
    } else {
        chatbotBody.classList.remove('expanded');
        setTimeout(() => {
            chatbotContainer.classList.remove('active');
        }, 300); // Match the transition duration
        toggleIcon.textContent = '+';
        chatbotOpen = false;
    }
}

function sendChatbotMessage() {
    const userInput = document.getElementById('chatbot-user-input');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addChatbotMessage(message, 'user');
    userInput.value = '';
    
    // Process the message and generate response
    setTimeout(() => {
        const response = generateChatbotResponse(message);
        addChatbotMessage(response, 'bot');
    }, 500);
}

function addChatbotMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message ${sender}`;
    messageElement.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Simple response logic - expand this for more complex interactions
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello there! How can I assist you with club information today?";
    } else if (lowerMessage.includes('event') || lowerMessage.includes('activities')) {
        return "You can find all upcoming events in the Events section. Would you like me to take you there?";
    } else if (lowerMessage.includes('club') || lowerMessage.includes('join')) {
        return "We have many clubs available! Check out the Clubs section or take our matching quiz to find your perfect club.";
    } else if (lowerMessage.includes('ticket') || lowerMessage.includes('register')) {
        return "You can register for events by clicking on them in the Events section. Some events may require ticket purchases.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('help')) {
        return "For direct assistance, please visit the Feedback section to contact our support team.";
    } else if (lowerMessage.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
    } else {
        return "I'm sorry, I didn't understand that. Could you rephrase your question? I can help with club information, events, and general inquiries.";
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show chatbot after a delay
    setTimeout(() => {
        document.getElementById('chatbot-container').classList.add('active');
    }, 3000);
    
    // Allow pressing Enter to send message
    document.getElementById('chatbot-user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
});
function addChatbotMessage(message, sender, quickReplies = []) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message ${sender}`;
    messageElement.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageElement);
    
    // Add quick replies if any
    if (quickReplies.length > 0 && sender === 'bot') {
        const quickReplyContainer = document.createElement('div');
        quickReplyContainer.className = 'quick-replies';
        
        quickReplies.forEach(reply => {
            const button = document.createElement('button');
            button.textContent = reply;
            button.onclick = () => {
                addChatbotMessage(reply, 'user');
                const response = generateChatbotResponse(reply);
                setTimeout(() => addChatbotMessage(response, 'bot'), 500);
            };
            quickReplyContainer.appendChild(button);
        });
        
        messagesContainer.appendChild(quickReplyContainer);
    }
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);