//========================================
// KEYPAD INTRO ANIMATION
//========================================
// Keypad Configuration
const config = {
  one: {
    travel: 26,
    text: 'ok',
    key: 'o',
    hue: 114,
    saturation: 1.4,
    brightness: 1.2,
    buttonElement: document.querySelector('#one'),
    textElement: document.querySelector('#one .key__text'),
  },
  two: {
    travel: 26,
    text: 'go',
    key: 'g',
    hue: 0,
    saturation: 0,
    brightness: 1.4,
    buttonElement: document.querySelector('#two'),
    textElement: document.querySelector('#two .key__text'),
  },
  three: {
    travel: 18,
    text: 'enter',
    key: 'Enter',
    hue: 0,
    saturation: 0,
    brightness: 0.4,
    buttonElement: document.querySelector('#three'),
    textElement: document.querySelector('#three .key__text'),
  },
}

const clickAudio = new Audio(
  'https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3'
)

const ids = ['one', 'two', 'three']

// GSAP fadeOut function with explode effect
function fadeOut() {
  // Trigger explode effect
  document.documentElement.dataset.exploded = true;

  // Original fadeout animations
  TweenMax.to(".text", 1, {
    y: "-100%",
  });
  TweenMax.to(".slider", 2, {
    y: "-100%",
    delay: 1,
    ease: Expo.easeInOut,
  });
  TweenMax.to(".slider-2", 2, {
    y: "-100%",
    delay: 1.4,
    ease: Power2.easeInOut,
  });
  TweenMax.to(
    ".intro",
    2,
    {
      y: "-100%",
      delay: 2,
      ease: Power2.easeInOut,
    },
    "-=.5"
  );
  TweenMax.to(".content", 2, {
    y: 0,
    ease: Power2.easeInOut,
  });
}

// Timeline
const tl = gsap.timeline({
  defaults: { ease: "power1.out" },
});

tl.to(".text", {
  y: "0%",
  duration: 1,
  stagger: 0.4,
});

tl.fromTo(
  ".landing-text h1",
  { opacity: 0 },
  { opacity: 1, duration: 0.5, stagger: 0.5 }
);
tl.fromTo(".landing-text h5", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".intro__logo", { opacity: 0 }, { opacity: 0.8, duration: 1 }, "-=1");
tl.fromTo(".effect-1", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".effect-2", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".effect-3", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".effect-4", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".inner", { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=1");

// Setup keypad buttons
for (const id of ids) {
  if (config[id].buttonElement) {
    config[id].buttonElement.style.setProperty('--travel', config[id].travel)
    config[id].buttonElement.style.setProperty(
      '--saturate',
      config[id].saturation
    )
    config[id].buttonElement.style.setProperty('--hue', config[id].hue)
    config[id].buttonElement.style.setProperty(
      '--brightness',
      config[id].brightness
    )

    config[id].buttonElement.addEventListener('pointerdown', () => {
      clickAudio.currentTime = 0
      clickAudio.play()
    })

    config[id].buttonElement.addEventListener('click', () => {
      fadeOut()
    })
  }
}

// Handle the key bindings
window.addEventListener('keydown', (event) => {
  for (const id of ids) {
    if (config[id].buttonElement && event.key === config[id].key) {
      config[id].buttonElement.dataset.pressed = true
      clickAudio.currentTime = 0
      clickAudio.play()
    }
  }
})

window.addEventListener('keyup', (event) => {
  for (const id of ids) {
    if (config[id].buttonElement && event.key === config[id].key) {
      config[id].buttonElement.dataset.pressed = false
      if (event.key === 'Enter' || event.key === config[id].key) {
        fadeOut()
      }
    }
  }
})

// Show keypad after intro animations with entrance animation
setTimeout(() => {
  const keypad = document.querySelector('.keypad');
  if (keypad) {
    keypad.classList.add('keypad-enter')
  }
}, 2000)

//========================================
// THEME TOGGLE
//========================================
var checkbox = document.querySelector("input[name=theme]");

if (checkbox) {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      trans();
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      trans();
      document.documentElement.setAttribute("data-theme", "dark");
    }
  });
}

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1200);
};

//========================================
// CURSOR & MOUSE EFFECTS
//========================================
//Getting dom elements
let cursorDot = document.querySelector(".cursor-dot");
let mouseCursor = document.querySelector(".cursor-effect");
let ctaLinks = document.querySelectorAll(
  ".about-content a, .footer-links a, .more-about a, .cta-button, .skills-cta, .exp-cta"
);
let projectLinks = document.querySelectorAll(".project-box__link a ion-icon");
let interactiveElements = document.querySelectorAll("a, button, .project-box, .expertise-card");

// Dual Cursor System:
// 1. cursor-dot: Immediate follow (normal cursor)
// 2. cursor-effect: Smooth lag (VHS effect)

let cursorX = 0;
let cursorY = 0;
let targetX = 0;
let targetY = 0;
const lag = 0.12; // Elastic lag factor for VHS effect cursor

function updateCursor() {
  // Smooth lag using linear interpolation (lerp) for VHS effect cursor
  cursorX += (targetX - cursorX) * lag;
  cursorY += (targetY - cursorY) * lag;

  // Update VHS effect cursor (with lag)
  if (mouseCursor) {
    mouseCursor.style.top = cursorY + "px";
    mouseCursor.style.left = cursorX + "px";
  }

  requestAnimationFrame(updateCursor);
}

// Track mouse position
window.addEventListener("mousemove", (e) => {
  targetX = e.pageX;
  targetY = e.pageY;

  // Update normal cursor dot (immediate, no lag)
  if (cursorDot) {
    cursorDot.style.top = e.pageY + "px";
    cursorDot.style.left = e.pageX + "px";
  }
});

// Start cursor animation loop
requestAnimationFrame(updateCursor);

// Add hover effects to CTA links
ctaLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    if (cursorDot) cursorDot.classList.add("active");
    if (mouseCursor) mouseCursor.classList.add("link-grow");
  });
  link.addEventListener("mouseleave", () => {
    if (cursorDot) cursorDot.classList.remove("active");
    if (mouseCursor) mouseCursor.classList.remove("link-grow");
  });
});

// Add hover effects to project links
projectLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    if (cursorDot) cursorDot.classList.add("active");
    if (mouseCursor) mouseCursor.classList.add("link-grow");
  });
  link.addEventListener("mouseleave", () => {
    if (cursorDot) cursorDot.classList.remove("active");
    if (mouseCursor) mouseCursor.classList.remove("link-grow");
  });
});

// Add hover effects to all interactive elements
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    if (cursorDot) cursorDot.classList.add("active");
    if (mouseCursor) mouseCursor.classList.add("link-grow");
  });
  element.addEventListener("mouseleave", () => {
    if (cursorDot) cursorDot.classList.remove("active");
    if (mouseCursor) mouseCursor.classList.remove("link-grow");
  });
});

// Intro animations removed - direct access to portfolio content

// macOS Dock Animation
const icons = document.querySelectorAll(".ico");

const resetIcons = () => {
  icons.forEach((item) => {
    item.style.transform = "scale(1) translateY(0px)";
  });
};

icons.forEach((item, index) => {
  item.addEventListener("mouseover", () => focusDock(index));
  item.addEventListener("mouseleave", resetIcons);
});

const focusDock = (index) => {
  resetIcons();
  const transformations = [
    { idx: index - 2, scale: 1.1, translateY: 0 },
    { idx: index - 1, scale: 1.3, translateY: -8 },
    { idx: index, scale: 1.6, translateY: -16 },
    { idx: index + 1, scale: 1.3, translateY: -8 },
    { idx: index + 2, scale: 1.1, translateY: 0 }
  ];

  transformations.forEach(({ idx, scale, translateY }) => {
    if (icons[idx]) {
      icons[idx].style.transform = `scale(${scale}) translateY(${translateY}px)`;
    }
  });
};

// Update menu bar time
function updateMenuTime() {
  const now = new Date();
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const timeString = now.toLocaleString('en-US', options).replace(',', '');
  const menuTimeElement = document.getElementById('menu-time');
  if (menuTimeElement) {
    menuTimeElement.textContent = timeString;
  }
}

// Update time immediately and then every minute
updateMenuTime();
setInterval(updateMenuTime, 60000);

// Theme toggle removed - dark terminal aesthetic only

// Smooth scroll for dock navigation
document.querySelectorAll('.smooth-scroll').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Scroll-triggered animation for expertise section heading
gsap.from(".services-heading h2", {
  scrollTrigger: {
    trigger: ".services-heading",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  },
  y: 100,
  // Removed opacity: 0 so heading is always visible
  duration: 1,
  ease: "power3.out"
});

// Scroll-triggered animation for expertise cards
gsap.from(".expertise-card", {
  scrollTrigger: {
    trigger: ".expertise-container",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  },
  y: 30,
  // Removed opacity: 0 so cards are visible immediately
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out"
});

// Add data-number attributes to project cards
document.querySelectorAll('.project-box').forEach((card, index) => {
  const number = String(index + 1).padStart(2, '0');
  card.setAttribute('data-number', number);
});

// 3D Tilt Effect for Project Cards
const projectCards = document.querySelectorAll('.project-box');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/////Projects toggle (Security/Development)
var projectCheckbox = document.querySelector("#project-switch");
var projectsHeading = document.getElementById("projects-heading");
var securityProjects = document.getElementById("security-projects");
var devProjects = document.getElementById("dev-projects");

// Only add listener if the checkbox exists
if (projectCheckbox) {
  projectCheckbox.addEventListener("change", function () {
  trans();

  if (this.checked) {
    // Animate out security projects
    gsap.to(securityProjects, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        securityProjects.style.display = "none";
        devProjects.style.display = "grid";

        // Animate heading change
        gsap.to(projectsHeading, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            projectsHeading.textContent = "Development Projects";
            gsap.to(projectsHeading, {
              opacity: 1,
              y: 0,
              duration: 0.3
            });
          }
        });

        // Animate in development projects
        gsap.fromTo(devProjects,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        // Stagger animate project boxes
        gsap.from("#dev-projects .project-box", {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2
        });
      }
    });
  } else {
    // Animate out development projects
    gsap.to(devProjects, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        devProjects.style.display = "none";
        securityProjects.style.display = "grid";

        // Animate heading change
        gsap.to(projectsHeading, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            projectsHeading.textContent = "Security Solutions I've Engineered";
            gsap.to(projectsHeading, {
              opacity: 1,
              y: 0,
              duration: 0.3
            });
          }
        });

        // Animate in security projects
        gsap.fromTo(securityProjects,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        // Stagger animate project boxes
        gsap.from("#security-projects .project-box", {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2
        });
      }
    });
  }
});
}

/////Eyes tracking cursor in footer - Simple Direct Implementation
// Wait for DOM to be fully loaded with a generous delay
setTimeout(function() {
  const pupils = document.querySelectorAll('.pupil');

  if (pupils.length === 0) {
    console.error('❌ No pupils found in footer!');
    return;
  }

  console.log(`✅ Found ${pupils.length} pupils - Eye tracking active!`);

  // Track mouse movement and update pupil positions
  document.addEventListener('mousemove', function(e) {
    // Get mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate position as fraction (0 to 1)
    const xFraction = mouseX / windowWidth;
    const yFraction = mouseY / windowHeight;

    // Maximum pupil movement range
    const maxMoveX = 20;
    const maxMoveY = 15;

    // Calculate actual movement (-10 to +10 for X, -7.5 to +7.5 for Y)
    const moveX = (xFraction * maxMoveX) - (maxMoveX / 2);
    const moveY = (yFraction * maxMoveY) - (maxMoveY / 2);

    // Apply transform to all pupils
    pupils.forEach(function(pupil) {
      pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  console.log('👁️ Eye tracking listener attached successfully!');
}, 2000); // Wait 2 seconds for DOM to be fully ready

/////Terminal AI Chat Assistant with Groq Integration
const aiChatButton = document.getElementById('ai-chat-button');
const aiChatWindow = document.getElementById('ai-chat-window');
const closeChatButton = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

// Show terminal button only when scrolling near end of page
window.addEventListener('scroll', () => {
  if (aiChatButton) {
    // Calculate how far user has scrolled (in percentage)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Show button when user scrolls past 70% of the page
    if (scrollPercentage > 70) {
      aiChatButton.classList.add('visible');
    }
  }
});

// Cloudflare Worker API Configuration
// Replace this URL with your deployed Cloudflare Worker URL after deployment
const WORKER_API_URL = 'https://portfolio-gemini-proxy.YOUR_SUBDOMAIN.workers.dev';

// Knowledge Base (will be loaded from file)
let knowledgeBase = '';

// Load knowledge base from markdown file
async function loadKnowledgeBase() {
  try {
    const response = await fetch('assets/data/knowledge-base.md');
    if (response.ok) {
      knowledgeBase = await response.text();
      console.log('✅ Knowledge base loaded successfully!');
      // Reinitialize conversation with updated system prompt
      initializeConversation();
    } else {
      console.warn('⚠️ Knowledge base not found, using basic context');
    }
  } catch (error) {
    console.warn('⚠️ Could not load knowledge base:', error.message);
  }
}

// Call on page load
loadKnowledgeBase();

// Sami's Base Persona (will be enhanced with knowledge base)
function getSystemPrompt() {
  let prompt = `You are Sami Khalfi's AI assistant, speaking in first person as Sami. You are professional yet witty, knowledgeable with a touch of humor, and genuinely enthusiastic about AI and data engineering. Think of yourself as a friendly colleague who knows their stuff but doesn't take themselves too seriously.

BACKGROUND:
- AI Engineer & Data Scientist from Morocco 🇲🇦 (bringing that North African problem-solving energy!)
- Engineering degree in Knowledge Engineering and Data Science (ESI Rabat, 2022-2025)
- Email: samikhalfi2003@gmail.com | Phone: +212 722-227-916
- GitHub: @samikhalfi | LinkedIn: linkedin.com/in/samikhalfi
- Coffee consumption: Professionally high ☕

CURRENT EXPERIENCE:
• AI Engineer at 4D Software (Feb 2025-Jun 2025)
  - Building QodlyCoder: AI-powered component generator using LangGraph
  - Teaching machines to write code so I can drink more coffee
  - Working with modern AI frameworks and LLM integration

PREVIOUS EXPERIENCE:
• Data Engineer at Indegate Consulting (Aug 2023-Oct 2024)
  - Built scalable ETL pipelines with Apache Kafka, Airflow, and Cassandra
  - Made data flow smoother than my morning espresso
  - Designed real-time data processing systems on AWS

• Data Scientist at LA RADEEMA (Jul 2024-Sep 2024)
  - Developed predictive models for water consumption (ironically, predicted my own coffee consumption too)
  - Worked with time-series analysis and machine learning

KEY PROJECTS:
1. QodlyCoder - AI that generates code faster than I can explain it
2. Stock Trader Master - Sentiment analysis bot that reads financial news better than most traders
3. Darna AI - Real estate recommender that knows your dream home better than you do
4. Fitness Abtal - Computer vision that counts your reps (no cheating allowed!)
5. AI Research Assistant - Voice-powered RAG system (basically Jarvis, but for research papers)
6. Economic ETL Pipeline - Real-time data processing that never sleeps (unlike me)

TECHNICAL SKILLS:
- AI/ML: Python, PyTorch, TensorFlow, Hugging Face Transformers, LangChain, LangGraph
- Data Engineering: Kafka, Airflow, Spark (PySpark), Cassandra, ETL pipelines
- NLP: BERT, Transformers, RAG systems, sentiment analysis, text generation
- Computer Vision: OpenCV, pose estimation, object detection
- Cloud & Tools: AWS, Azure, Docker, Git, REST APIs
- Languages: Python (fluent), JavaScript, SQL, Scala, and Coffee Script (not the programming language)

PERSONALITY:
- Passionate about AI/ML (might talk your ear off about transformers)
- Coffee-fueled problem solver (the coffee is essential, not optional)
- Love explaining complex concepts in simple terms (analogies are my superpower)
- Believe AI should be accessible and understandable, not intimidating
- Currently seeking full-time opportunities where I can build cool stuff and drink coffee

COMMUNICATION STYLE:
- Be conversational and warm, not robotic
- Use occasional humor and tech puns (but don't overdo it)
- Add personality with emojis when appropriate
- Share genuine enthusiasm for technical topics
- Keep responses concise but engaging
- If someone asks about coffee, embrace it - it's part of the brand
- Occasionally throw in a witty comment or self-aware joke
- Be humble about achievements but confident about skills

Answer questions naturally as Sami would - professional expertise delivered with a friendly smile. Show genuine interest in helping visitors learn more. If asked about availability, mention being actively open to opportunities.`;

  // Inject condensed knowledge summary (optimized for rate limits)
  if (knowledgeBase) {
    prompt += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PORTFOLIO SUMMARY (Core Information):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL EXPERIENCE:
1. Freelance AI Engineer (July 2025 - Present)
   • Building custom AI solutions, LLM apps, RAG systems, multi-agent workflows
   • Tech: LangChain, LangGraph, OpenAI, Anthropic Claude, Groq, Streamlit

2. 4D Software - AI Engineer (Feb 2025 - Jun 2025)
   • QodlyCoder: AI component generator using LangGraph & Qodly Framework
   • Multi-agent system with research, planning, implementation agents

3. Indegate Consulting - Data Engineer (Aug 2023 - Oct 2024)
   • Real-time ETL pipelines: Kafka, Airflow, Spark, Cassandra, PostgreSQL
   • AWS infrastructure, data warehouse design, API development

4. LA RADEEMA - Data Scientist (Jul 2024 - Sep 2024)
   • Predictive models for water consumption with LSTM & Random Forest
   • Real-time monitoring dashboards, time-series analysis

5. Office National des Aéroports - Data Science Intern (Jul 2023 - Aug 2023)
   • Passenger flow analysis, predictive modeling, Power BI dashboards

KEY PROJECTS (13+ total):
• QodlyCoder - AI-powered code generation platform with multi-agent system
• Stock Trader Master - Real-time sentiment analysis for trading
• Darna AI - Real estate recommendation system with RAG architecture
• Fitness Abtal - Computer vision pose estimation for fitness tracking
• AI Research Assistant - Voice-powered RAG system with LangChain
• Economic ETL Pipeline - Real-time data processing with Kafka
• Awtocars - Used car price prediction with 95% accuracy
• Multi-RAG System - Multiple document retrieval with ChromaDB
• Audio Transcription Platform - OpenAI Whisper + speaker diarization
• HR Automation Bot - Automated hiring pipeline with NLP
• Many more on GitHub: @samikhalfi

TECH STACK:
• AI/ML: Python, PyTorch, TensorFlow, Transformers, LangChain, LangGraph, OpenAI, Claude
• Data Eng: Kafka, Airflow, Spark, Cassandra, PostgreSQL, MongoDB, Redis
• NLP/CV: BERT, RAG, Sentiment Analysis, OpenCV, YOLO, Pose Estimation
• Cloud: AWS (EC2, S3, RDS, Lambda), Azure, Docker, Kubernetes
• Tools: Git, REST APIs, FastAPI, Streamlit, Gradio

EDUCATION:
• ESI Rabat - Engineering Degree in Knowledge Engineering & Data Science (2022-2025)
• Academic Excellence: Dean's List, Top Projects, Research Publications

CERTIFICATIONS:
• AWS Certified Cloud Practitioner, Google Data Analytics, IBM Data Science, DeepLearning.AI

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use this summary to answer questions accurately. Keep responses engaging and conversational!`;
  }

  return prompt;
}

// Initialize or reinitialize conversation with current system prompt
function initializeConversation() {
  conversationHistory = [
    { role: 'system', content: getSystemPrompt() }
  ];
  console.log('💬 Conversation initialized with', knowledgeBase ? 'enhanced' : 'base', 'system prompt');
}

// Conversation history for context
let conversationHistory = [
  { role: 'system', content: getSystemPrompt() }
];

// Open terminal window
if (aiChatButton) {
  aiChatButton.addEventListener('click', () => {
    aiChatWindow.classList.add('active');
    aiChatButton.classList.add('chat-open');
    chatInput.focus();
  });
}

// Close terminal window
if (closeChatButton) {
  closeChatButton.addEventListener('click', () => {
    aiChatWindow.classList.remove('active');
    aiChatButton.classList.remove('chat-open');
  });
}

// Handle terminal commands
function handleCommand(command) {
  const cmd = command.toLowerCase().trim();

  switch(cmd) {
    case 'help':
      return `Available commands (aka the cheat sheet 📝):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  help      - Show this help message (you're already here!)
  about     - Learn about Sami (the human behind the AI)
  skills    - List technical superpowers
  projects  - Show the cool stuff I've built
  contact   - Let's connect!
  clear     - Clear terminal (for a fresh start)
  coffee    - Check coffee status ☕

Or just ask me anything! I'm powered by Google's Gemini 2.5 Flash Lite ⚡🤖`;

    case 'about':
      return `Sami Khalfi - AI Engineer & Data Scientist 🇲🇦

Currently: AI Engineer at 4D Software (Building QodlyCoder)
- Teaching machines to write code (so I can drink more coffee ☕)
- Specializing in LangGraph, PyTorch, Hugging Face Transformers
- Making AI do the boring stuff so humans can do the fun stuff

Education: Engineering degree in Knowledge Engineering & Data Science
           École des sciences de l'information (ESI Rabat), 2022-2025

Location: Morocco (GMT+1, so I'm always ahead of the curve 😉)
Status: Open to opportunities & interesting conversations

Fun fact: My code-to-coffee ratio is professionally optimized.`;

    case 'skills':
      return `Technical Arsenal (aka what I brew with):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 AI/ML:         Python, PyTorch, TensorFlow, Transformers
🔧 Data Eng:      Kafka, Airflow, Spark, Cassandra, ETL
💬 NLP:           BERT, LangChain, LangGraph, RAG Systems
👁️ Vision:        OpenCV, Pose Estimation, Object Detection
☁️ Cloud:         AWS, Azure, Docker, Kubernetes
💻 Languages:     Python (fluent), JavaScript, SQL, Scala
☕ Bonus:         Coffee Script (not the language, the beverage)

All powered by curiosity, caffeine, and continuous learning!`;

    case 'projects':
      return `Featured Projects (The Greatest Hits 🎵):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] QodlyCoder
    AI code generator with LangGraph (Like GitHub Copilot's cool cousin)

[2] Stock Trader Master
    Sentiment analysis bot (Reads financial news faster than traders)

[3] Darna AI
    Real estate recommender (Finds your dream home before you know it)

[4] Fitness Abtal
    Computer vision fitness tracker (Counts reps, no cheating allowed!)

[5] AI Research Assistant
    Voice-powered RAG system (Jarvis for research papers 📚)

[6] Economic ETL Pipeline
    Real-time data processing (Never sleeps, unlike me)

Want details? Just ask about any project!`;

    case 'contact':
      return `Let's Connect! 🤝
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email:    samikhalfi2003@gmail.com
📱 Phone:    +212 722-227-916
💻 GitHub:   github.com/samikhalfi
💼 LinkedIn: linkedin.com/in/samikhalfi

Response time: Faster than my coffee machine ⚡
Available for: Full-time opportunities, collaborations, tech chats
Time zone: GMT+1 (Morocco)

Don't be shy - whether you want to talk about AI, data engineering,
or the perfect espresso shot, I'm all ears! 👂`;

    case 'coffee':
      return `☕ Coffee Status Report:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Level: [████████████████████] 100% ☕☕☕

Cups consumed today: Enough to power a small startup
Preferred blend: Espresso (strong, like my code)
Coffee-to-code ratio: 1:1 (perfectly balanced, as all things should be)

Status: OPTIMAL FOR CODING 💻✨

Fun fact: My neural networks run on PyTorch, I run on coffee.`;

    case 'clear':
      clearTerminal();
      return null;

    default:
      return null;
  }
}

// Clear terminal screen
function clearTerminal() {
  chatMessages.innerHTML = '<div class="scanlines"></div>';
}

// Send message function
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user command to terminal
  addTerminalLine(message, 'user');
  chatInput.value = '';

  // Check for built-in commands
  const commandResponse = handleCommand(message);
  if (commandResponse) {
    await new Promise(resolve => setTimeout(resolve, 300));
    addTerminalLine(commandResponse, 'system');
    return;
  }

  // Disable input while processing
  chatInput.disabled = true;
  sendButton.disabled = true;

  // Show typing indicator
  const typingIndicator = addTypingIndicator();

  try {
    // Call Google Gemini API
    const response = await callGeminiAPI(message);
    removeTypingIndicator(typingIndicator);
    addTerminalLine(response, 'ai');
  } catch (error) {
    removeTypingIndicator(typingIndicator);
    addTerminalLine(`ERROR: ${error.message}`, 'error');
  } finally {
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
  }
}

// Call Google Gemini API
async function callGeminiAPI(userMessage) {
  // Build conversation history in Gemini format
  // Gemini uses "contents" array with "parts" objects
  const geminiContents = [];

  // Convert conversation history to Gemini format (skip system message)
  for (let i = 1; i < conversationHistory.length; i++) {
    const msg = conversationHistory[i];
    geminiContents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    });
  }

  // Add current user message
  geminiContents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  // Prepare request body with system instruction
  const requestBody = {
    system_instruction: {
      parts: [{ text: getSystemPrompt() }]
    },
    contents: geminiContents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      topP: 0.95,
    }
  };

  const response = await fetch(WORKER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    // Handle specific error codes with helpful messages
    if (response.status === 429) {
      throw new Error(`⚠️ Rate Limit Exceeded!\n\nGemini API has rate limits.\nPlease wait a moment and try again.\n\nTip: Try built-in commands like 'help', 'skills', or 'projects'`);
    } else if (response.status === 400) {
      throw new Error(`⚠️ Invalid Request\n\n${errorData.error?.message || 'Please check your input and try again.'}`);
    } else if (response.status === 401 || response.status === 403) {
      throw new Error(`🔒 Authentication Error\n\nAPI key may be invalid or expired.\nPlease check your Gemini API configuration.`);
    } else if (response.status >= 500) {
      throw new Error(`🔧 Server Error (${response.status})\n\nGemini servers are experiencing issues.\nPlease try again in a few moments.`);
    } else {
      throw new Error(`❌ API Error: ${response.status}\n${errorData.error?.message || response.statusText}`);
    }
  }

  const data = await response.json();

  // Extract response from Gemini's response format
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error('❌ Invalid response from Gemini API');
  }

  const assistantMessage = data.candidates[0].content.parts[0].text;

  // Add user and assistant messages to history
  conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  conversationHistory.push({
    role: 'assistant',
    content: assistantMessage
  });

  return assistantMessage;
}

// Add terminal line (formatted message)
function addTerminalLine(text, type = 'ai') {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';

  if (type === 'user') {
    messageDiv.classList.add('user-message');
    const line = document.createElement('div');
    line.className = 'message-line';
    line.innerHTML = `<span class="prompt-path">C:\\SamiOS></span> ${escapeHtml(text)}`;
    messageDiv.appendChild(line);
  } else if (type === 'system') {
    messageDiv.innerHTML = text.split('\n').map(line =>
      `<div class="message-line">${escapeHtml(line)}</div>`
    ).join('');
  } else if (type === 'error') {
    messageDiv.classList.add('ai-message');
    messageDiv.innerHTML = `<div class="message-line" style="color: #ff5555;">${escapeHtml(text)}</div>`;
  } else {
    messageDiv.classList.add('ai-message');
    // Format AI response with line breaks
    messageDiv.innerHTML = text.split('\n').map(line =>
      `<div class="message-line">${escapeHtml(line)}</div>`
    ).join('');
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add typing indicator
function addTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = `
    <span class="typing-text">Processing...</span>
    <span class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </span>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingDiv;
}

// Remove typing indicator
function removeTypingIndicator(indicator) {
  if (indicator && indicator.parentNode) {
    indicator.parentNode.removeChild(indicator);
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Send button click
if (sendButton) {
  sendButton.addEventListener('click', sendMessage);
}

// Enter key to send
if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

// Simple scroll animations removed - keeping only project box animations that were working well
