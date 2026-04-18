const lawQuestions = {
    "Business Law": {
        icon: "💼",
        color: "#3182ce",
        questions: [
            { question: "What is the main purpose of a contract?", answer: "To create a legally binding agreement between parties", explanation: "A contract establishes mutual obligations that can be enforced by law.", options: ["To create a legally binding agreement between parties", "To terminate a business relationship", "To register a company name", "To pay taxes"], correct: 0 },
            { question: "What does 'piercing the corporate veil' mean?", answer: "Holding shareholders personally liable for corporate debts", explanation: "This occurs when courts ignore the corporate structure to hold owners personally responsible.", options: ["Holding shareholders personally liable for corporate debts", "Dissolving a company", "Auditing a corporation", "Hiring new executives"], correct: 0 },
            { question: "What is intellectual property?", answer: "Legal rights to creations of the mind", explanation: "IP includes patents, copyrights, trademarks, and trade secrets.", options: ["Legal rights to creations of the mind", "Company stocks", "Real estate holdings", "Employee salaries"], correct: 0 },
            { question: "What is the employment at-will doctrine?", answer: "Either party can terminate employment for any reason", explanation: "This doctrine allows termination without cause, with some exceptions.", options: ["Either party can terminate employment for any reason", "Employees cannot be fired", "Only employers can terminate", "Requires written contracts"], correct: 0 },
            { question: "What is tax evasion?", answer: "Illegal avoidance of paying taxes", explanation: "Tax evasion is a criminal offense involving deliberate misrepresentation.", options: ["Illegal avoidance of paying taxes", "Legal tax planning", "Paying taxes late", "Filing tax returns"], correct: 0 }
        ]
    },
    "Criminal Law": {
        icon: "⚖️",
        color: "#e53e3e",
        questions: [
            { question: "What distinguishes a felony from a misdemeanor?", answer: "Severity of punishment - felonies are more serious", explanation: "Felonies typically carry imprisonment over one year; misdemeanors are less severe.", options: ["Severity of punishment - felonies are more serious", "The color of the defendant's clothing", "The lawyer's fee", "The court location"], correct: 0 },
            { question: "What is 'beyond reasonable doubt'?", answer: "Highest standard of proof in criminal cases", explanation: "This standard requires near certainty of guilt for conviction.", options: ["Highest standard of proof in criminal cases", "A type of defense", "A sentencing guideline", "A police procedure"], correct: 0 },
            { question: "What is the exclusionary rule?", answer: "Evidence obtained illegally cannot be used in court", explanation: "This rule prevents constitutional violations from benefiting prosecution.", options: ["Evidence obtained illegally cannot be used in court", "A suspect must be present", "Juries must be unanimous", "Trials must be public"], correct: 0 },
            { question: "What is juvenile law primarily concerned with?", answer: "Cases involving minors under 18", explanation: "Juvenile law focuses on rehabilitation rather than punishment.", options: ["Cases involving minors under 18", "Business disputes", "Patent violations", "Tax fraud"], correct: 0 },
            { question: "What is 'mens rea'?", answer: "Guilty mind - criminal intent", explanation: "Mens rea refers to the mental element of a crime.", options: ["Guilty mind - criminal intent", "The crime scene", "A police officer", "A defense attorney"], correct: 0 }
        ]
    },
    "Constitutional Law": {
        icon: "🏛️",
        color: "#805ad5",
        questions: [
            { question: "What does the First Amendment protect?", answer: "Freedom of speech, religion, press, assembly, petition", explanation: "These five freedoms are fundamental to American democracy.", options: ["Freedom of speech, religion, press, assembly, petition", "Right to bear arms", "Right to trial by jury", "Protection from search"], correct: 0 },
            { question: "What is judicial review?", answer: "Power of courts to declare laws unconstitutional", explanation: "Established in Marbury v. Madison, this is a key check on government power.", options: ["Power of courts to declare laws unconstitutional", "A judge's appointment", "A type of trial", "A law enforcement tool"], correct: 0 },
            { question: "What is federalism?", answer: "Division of power between national and state governments", explanation: "This system balances local and national authority.", options: ["Division of power between national and state governments", "A political party", "A type of election", "A Supreme Court case"], correct: 0 },
            { question: "What is separation of powers?", answer: "Distribution of governmental authority among branches", explanation: "The executive, legislative, and judicial branches check each other.", options: ["Distribution of governmental authority among branches", "A legal document", "A prison system", "A voting method"], correct: 0 },
            { question: "What are civil liberties?", answer: "Protections against government interference", explanation: "These rights limit state power to protect individual freedom.", options: ["Protections against government interference", "Business rights", "Military powers", "Police duties"], correct: 0 }
        ]
    },
    "Civil Law": {
        icon: "📜",
        color: "#38a169",
        questions: [
            { question: "What is a tort?", answer: "Civil wrong causing harm or loss to another", explanation: "Torts include negligence, defamation, and personal injury.", options: ["Civil wrong causing harm or loss to another", "A criminal offense", "A contract violation", "A government regulation"], correct: 0 },
            { question: "What does family law primarily cover?", answer: "Marriage, divorce, custody, adoption", explanation: "This area governs domestic relationships and family matters.", options: ["Marriage, divorce, custody, adoption", "Business partnerships", "Property disputes", "Criminal cases"], correct: 0 },
            { question: "What is property law concerned with?", answer: "Ownership and use of land and buildings", explanation: "Property law includes buying, selling, and renting real estate.", options: ["Ownership and use of land and buildings", "Stock markets", "Patent applications", "Employee contracts"], correct: 0 },
            { question: "What is administrative law?", answer: "Rules governing government agencies", explanation: "This area regulates how agencies implement and enforce laws.", options: ["Rules governing government agencies", "Criminal procedures", "Business contracts", "Family matters"], correct: 0 },
            { question: "What is the core of international law?", answer: "Rules governing relations between nations", explanation: "International law includes treaties, customs, and diplomatic relations.", options: ["Rules governing relations between nations", "State laws", "Local ordinances", "Company policies"], correct: 0 }
        ]
    }
};

const categories = Object.keys(lawQuestions);
const levels = [
    { name: "Novice Learner", minPoints: 0 },
    { name: "Law Student", minPoints: 50 },
    { name: "Paralegal", minPoints: 100 },
    { name: "Junior Associate", minPoints: 200 },
    { name: "Associate", minPoints: 350 },
    { name: "Senior Associate", minPoints: 500 },
    { name: "Partner", minPoints: 750 },
    { name: "Managing Partner", minPoints: 1000 },
    { name: "Legal Expert", minPoints: 1500 },
    { name: "Legal Master", minPoints: 2000 }
];

let currentUser = null;
let userData = { points: 0, streak: 0, bestStreak: 0, progress: {}, level: 1, username: "" };
let currentCategory = null;
let currentQuestionIndex = 0;
let answeredQuestions = [];
let lastPoints = 0;

function init() {
    loadUserFromStorage();
    setupEventListeners();
    updateUI();
}

function loadUserFromStorage() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        const storedData = localStorage.getItem(`userData_${currentUser.email}`);
        if (storedData) {
            userData = JSON.parse(storedData);
        }
    }
}

function saveUserToStorage() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem(`userData_${currentUser.email}`, JSON.stringify(userData));
    }
}

function setupEventListeners() {
    document.getElementById('home-link').addEventListener('click', (e) => { e.preventDefault(); showHome(); });
    document.getElementById('login-link').addEventListener('click', (e) => { e.preventDefault(); showAuthSection(); });
    document.getElementById('register-link').addEventListener('click', (e) => { e.preventDefault(); showAuthSection(); });
    document.getElementById('game-link').addEventListener('click', (e) => { e.preventDefault(); showGameSection(); });
    document.getElementById('leaderboard-link').addEventListener('click', (e) => { e.preventDefault(); showLeaderboard(); });
    document.getElementById('logout-link').addEventListener('click', (e) => { e.preventDefault(); logout(); });

    document.getElementById('show-login').addEventListener('click', () => toggleAuthForm('login'));
    document.getElementById('show-register').addEventListener('click', () => toggleAuthForm('register'));

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);

    document.getElementById('flashcard').addEventListener('click', flipFlashcard);
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('back-to-categories').addEventListener('click', showGameSection);
}

function toggleAuthForm(form) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('show-login');
    const registerBtn = document.getElementById('show-register');

    if (form === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function showHome() {
    if (currentUser) {
        showGameSection();
    } else {
        showAuthSection();
    }
}

function showAuthSection() {
    hideAllSections();
    document.getElementById('auth-section').style.display = 'block';
    toggleAuthForm('login');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        const storedData = localStorage.getItem(`userData_${email}`);
        userData = storedData ? JSON.parse(storedData) : { points: 0, streak: 0, bestStreak: 0, progress: {}, level: 1, username: user.username || "" };
        saveUserToStorage();
        errorElement.textContent = '';
        updateUI();
        showGameSection();
    } else {
        errorElement.textContent = 'Invalid email or password';
    }
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const errorElement = document.getElementById('register-error');

    if (username.length < 2) {
        errorElement.textContent = 'Username must be at least 2 characters';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email address';
        return;
    }

    if (password.length < 4) {
        errorElement.textContent = 'Password must be at least 4 characters';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        errorElement.textContent = 'Email already registered';
        return;
    }

    const newUser = { email, password, username };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = newUser;
    userData = { points: 0, streak: 0, bestStreak: 0, progress: {}, level: 1, username };
    saveUserToStorage();
    errorElement.textContent = '';
    updateUI();
    showGameSection();
}

function logout() {
    currentUser = null;
    userData = { points: 0, streak: 0, bestStreak: 0, progress: {}, level: 1, username: "" };
    localStorage.removeItem('currentUser');
    updateUI();
    showAuthSection();
}

function hideAllSections() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('flashcard-section').style.display = 'none';
    document.getElementById('leaderboard-section').style.display = 'none';
}

function updateUI() {
    const isLoggedIn = currentUser !== null;

    document.getElementById('login-link').style.display = isLoggedIn ? 'none' : 'inline';
    document.getElementById('register-link').style.display = isLoggedIn ? 'none' : 'inline';
    document.getElementById('game-link').style.display = isLoggedIn ? 'inline' : 'none';
    document.getElementById('leaderboard-link').style.display = isLoggedIn ? 'inline' : 'none';
    document.getElementById('logout-link').style.display = isLoggedIn ? 'inline' : 'none';
    document.getElementById('home-link').style.display = isLoggedIn ? 'inline' : 'none';

    document.getElementById('points-display').textContent = userData.points;
    document.getElementById('streak-display').textContent = userData.streak;
    document.getElementById('streak-badge').style.display = userData.streak >= 3 ? 'inline' : 'none';

    if (isLoggedIn) {
        showGameSection();
    }
}

function showGameSection() {
    hideAllSections();
    document.getElementById('game-section').style.display = 'block';

    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';

    categories.forEach(category => {
        const catData = lawQuestions[category];
        const progress = userData.progress[category] || { total: 0, correct: 0 };
        const percentage = (progress.correct / catData.questions.length) * 100;

        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <span class="icon">${catData.icon}</span>
            <h3>${category}</h3>
            <p>${progress.correct}/${catData.questions.length} Mastered</p>
            <div class="progress-bar" style="margin-top: 1rem;">
                <div class="progress-fill" style="width: ${percentage}%; background: ${catData.color};"></div>
            </div>
        `;
        card.style.borderColor = progress.correct === catData.questions.length ? '#38a169' : 'transparent';
        card.addEventListener('click', () => startCategory(category));
        grid.appendChild(card);
    });
}

function startCategory(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    answeredQuestions = [];

    if (!userData.progress[category]) {
        userData.progress[category] = { correct: 0, total: 0, answered: [] };
    }

    const availableQuestions = [];
    lawQuestions[category].questions.forEach((q, idx) => {
        if (!userData.progress[category].answered.includes(idx)) {
            availableQuestions.push(idx);
        }
    });

    if (availableQuestions.length === 0) {
        userData.progress[category] = { correct: 0, total: 0, answered: [] };
        availableQuestions.push(...Array.from({ length: lawQuestions[category].questions.length }, (_, i) => i));
    }

    if (availableQuestions.length > 0) {
        currentQuestionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    }

    hideAllSections();
    document.getElementById('flashcard-section').style.display = 'block';
    document.getElementById('category-title').textContent = `${lawQuestions[category].icon} ${category}`;
    document.getElementById('q-total').textContent = lawQuestions[category].questions.length;

    showQuestion();
}

function showQuestion() {
    const questions = lawQuestions[currentCategory].questions;
    const q = questions[currentQuestionIndex];
    const catData = lawQuestions[currentCategory];

    document.getElementById('question').textContent = q.question;
    document.getElementById('category-badge').textContent = currentCategory;
    document.getElementById('category-badge').style.background = catData.color;
    document.getElementById('answer').textContent = q.answer;
    document.getElementById('explanation').textContent = q.explanation;
    document.getElementById('flashcard').classList.remove('flipped');

    document.getElementById('q-current').textContent = currentQuestionIndex + 1;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const shuffledOptions = [...q.options].map((opt, i) => ({ text: opt, origIndex: i })).sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((opt) => {
        const btn = document.createElement('button');
        btn.textContent = opt.text;
        btn.addEventListener('click', (e) => handleAnswer(opt.origIndex, e.target));
        optionsContainer.appendChild(btn);
    });

    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('points-earned').textContent = '';

    updateNavButtons();
}

function flipFlashcard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function handleAnswer(selectedIndex, btn) {
    const questions = lawQuestions[currentCategory].questions;
    const q = questions[currentQuestionIndex];
    const buttons = document.getElementById('options-container').querySelectorAll('button');

    buttons.forEach(b => b.disabled = true);

    lastPoints = 0;

    if (selectedIndex === q.correct) {
        btn.classList.add('correct');
        document.getElementById('feedback').textContent = '🎉 Correct!';
        document.getElementById('feedback').className = 'feedback correct';
        
        let points = 10;
        userData.streak++;
        
        if (userData.streak >= 3) {
            points += 5;
            document.getElementById('feedback').textContent = `🔥 Streak Bonus! +${points} points`;
        }
        
        lastPoints = points;
        userData.points += points;
        
        if (userData.streak > userData.bestStreak) {
            userData.bestStreak = userData.streak;
        }
        
        if (!userData.progress[currentCategory]) {
            userData.progress[currentCategory] = { correct: 0, total: 0, answered: [] };
        }
        userData.progress[currentCategory].correct++;
        
        showConfetti();
    } else {
        btn.classList.add('incorrect');
        buttons.forEach(b => {
            if (b.textContent === q.options[q.correct]) {
                b.classList.add('correct');
            }
        });
        document.getElementById('feedback').textContent = '❌ Incorrect';
        document.getElementById('feedback').className = 'feedback incorrect';
        
        userData.points = Math.max(0, userData.points - 2);
        lastPoints = -2;
        userData.streak = 0;
    }

    userData.progress[currentCategory].total++;
    userData.progress[currentCategory].answered.push(currentQuestionIndex);

    userData.level = Math.floor(userData.points / 50) + 1;

    saveUserToStorage();
    document.getElementById('points-display').textContent = userData.points;
    document.getElementById('streak-display').textContent = userData.streak;
    document.getElementById('streak-badge').style.display = userData.streak >= 3 ? 'inline' : 'none';

    if (lastPoints !== 0) {
        document.getElementById('points-earned').textContent = lastPoints > 0 ? `+${lastPoints} points!` : `${lastPoints} points`;
    }
}

function showConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ed8936', '#38a169', '#3182ce', '#805ad5', '#e53e3e', '#f6e05e'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2 + Math.random()) + 's';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

function updateNavButtons() {
    const questions = lawQuestions[currentCategory].questions;
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = currentQuestionIndex >= questions.length - 1;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function nextQuestion() {
    const questions = lawQuestions[currentCategory];
    if (currentQuestionIndex < questions.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function showLeaderboard() {
    hideAllSections();
    document.getElementById('leaderboard-section').style.display = 'block';

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const leaderboard = users.map(u => {
        const data = JSON.parse(localStorage.getItem(`userData_${u.email}`)) || { points: 0 };
        return { username: u.username || u.email.split('@')[0], points: data.points };
    }).sort((a, b) => b.points - a.points).slice(0, 10);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';

    leaderboard.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`;
        item.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="player-info">
                <div class="player-name">${player.username}</div>
            </div>
            <div class="player-points">⭐ ${player.points}</div>
        `;
        list.appendChild(item);
    });
}

init();