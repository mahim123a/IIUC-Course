document.addEventListener('DOMContentLoaded', () => {
    // Get elements for the login page (these might be null if on dashboard.html)
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Get elements for the dashboard page (these might be null if on index.html)
    const dashboardPage = document.getElementById('dashboardPage');
    const logoutBtn = document.getElementById('logoutBtn');
    const coursesGrid = document.getElementById('courses-grid');
    const usernameDisplay = document.getElementById('username-display');

    // --- Course Data ---
    // This data is used to populate the course cards on the dashboard
    const courses = [
        {
            title: 'Introduction to Computer Programming',
            code: 'CSE-101',
            teacher: 'Dr. Ahmad Hasan',
            description: 'Fundamentals of programming using C++ language.',
            color: 'bg-indigo-500' // Tailwind class for background color
        },
        {
            title: 'English Language Skills',
            code: 'HUM-102',
            teacher: 'Ms. Fahmida Rahman',
            description: 'Developing reading, writing, and communication skills.',
            color: 'bg-green-500'
        },
        {
            title: 'Calculus and Linear Algebra',
            code: 'MAT-103',
            teacher: 'Mr. Rafiq Islam',
            description: 'Advanced topics in mathematics for engineers.',
            color: 'bg-red-500'
        },
        {
            title: 'Physics for Engineers',
            code: 'PHY-104',
            teacher: 'Dr. Khaled Mahmud',
            description: 'Basic principles of mechanics, electricity, and magnetism.',
            color: 'bg-yellow-500'
        },
        {
            title: 'Data Structures and Algorithms',
            code: 'CSE-205',
            teacher: 'Dr. Farhana Akter',
            description: 'Implementing efficient data structures and algorithms.',
            color: 'bg-purple-500'
        },
        {
            title: 'Microeconomics',
            code: 'ECO-106',
            teacher: 'Mr. Asif Khan',
            description: 'Introduction to the principles of supply and demand.',
            color: 'bg-pink-500'
        }
    ];

    // --- Function to render course cards ---
    // This function creates and appends course cards to the dashboard
    function renderCourses() {
        // Clear any existing cards before rendering new ones (important for re-rendering)
        if (coursesGrid) {
            coursesGrid.innerHTML = '';
            courses.forEach(course => {
                const card = document.createElement('div');
                // Tailwind classes for styling the card
                card.className = `${course.color} bg-opacity-80 p-6 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105`;
                card.innerHTML = `
                    <div class="text-white">
                        <span class="text-xs font-semibold uppercase opacity-75">${course.code}</span>
                        <h3 class="mt-1 text-2xl font-bold">${course.title}</h3>
                        <p class="mt-2 text-sm opacity-90">${course.description}</p>
                        <p class="mt-4 text-xs font-medium opacity-80">Teacher: ${course.teacher}</p>
                    </div>
                `;
                coursesGrid.appendChild(card);
            });
        }
    }

    // --- Logic for the Login Page (index.html) ---
    if (loginForm) {
        // Check if the page was redirected from a logout action
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('logout') === 'true') {
            // Clear input fields if logout parameter is present
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
            // Optionally, remove the logout parameter from the URL for a cleaner look
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Add event listener for login form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would send credentials to a server for validation.
            // For this example, we'll simulate a successful login.
            const userEmail = emailInput.value; // Get the email from the input field

            // Simulate successful login
            const simulatedSuccess = true;

            if (simulatedSuccess) {
                // Redirect to the dashboard page, passing the email as a query parameter
                window.location.href = `dashboard.html?email=${encodeURIComponent(userEmail)}`;
            } else {
                // Handle login failure (e.g., show an error message on the login page)
                alert('Login failed. Please check your credentials.'); // Using alert for simplicity, consider a custom modal in production
            }
        });
    }

    // --- Logic for the Dashboard Page (dashboard.html) ---
    if (dashboardPage) {
        // Get the username (email) from the URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('email');

        // Display the username in the header
        if (usernameDisplay && userEmail) {
            usernameDisplay.textContent = userEmail;
        } else if (usernameDisplay) {
            usernameDisplay.textContent = 'Guest'; // Fallback if no email is found
        }

        // Render the course cards when the dashboard page loads
        renderCourses();

        // Add event listener for the logout button
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior

                // In a real app, this would also clear any session data (e.g., cookies, local storage).
                // Redirect back to the login page with a 'logout=true' parameter
                window.location.href = 'index.html?logout=true';
            });
        }
    }
});
