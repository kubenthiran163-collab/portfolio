document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotChips = document.querySelectorAll('.chip');

    let isTyping = false;

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if(chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Handle Quick Reply Chips
    chatbotChips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (isTyping) return;
            chatbotInput.value = chip.textContent;
            handleSendMessage();
        });
    });

    // Handle Sending Messages
    chatbotSend.addEventListener('click', () => {
        if (!isTyping) handleSendMessage();
    });
    chatbotInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter' && !isTyping) handleSendMessage();
    });

    function handleSendMessage() {
        const text = chatbotInput.value.trim();
        if(!text) return;

        isTyping = true;
        
        appendMessage(text, 'user-msg');
        chatbotInput.value = '';

        const typingId = appendTypingIndicator();

        setTimeout(() => {
            removeElement(typingId);
            const response = getSimulatedResponse(text);
            appendMessage(response, 'bot-msg');
            isTyping = false;
        }, 1200 + Math.random() * 800);
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = className;
        msgDiv.textContent = text;
        chatbotMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function appendTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'bot-msg';
        msgDiv.id = id;
        
        msgDiv.innerHTML = `
            <div style="display:flex; gap:4px; align-items:center; height:20px;">
                <span style="width:6px; height:6px; border-radius:50%; background:#22d3ee; animation: bounce 1.4s infinite ease-in-out both;"></span>
                <span style="width:6px; height:6px; border-radius:50%; background:#3b82f6; animation: bounce 1.4s infinite ease-in-out both; animation-delay: 0.2s;"></span>
                <span style="width:6px; height:6px; border-radius:50%; background:#8b5cf6; animation: bounce 1.4s infinite ease-in-out both; animation-delay: 0.4s;"></span>
            </div>
        `;
        
        if (!document.getElementById('typing-keyframes')) {
            const style = document.createElement('style');
            style.id = 'typing-keyframes';
            style.textContent = `
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        chatbotMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeElement(id) {
        const el = document.getElementById(id);
        if(el) el.remove();
    }

    function scrollToBottom() {
        chatbotMessages.scrollTo({ top: chatbotMessages.scrollHeight, behavior: 'smooth' });
    }

    // Factual Data AI Responses
    function getSimulatedResponse(query) {
        const q = query.toLowerCase();
        
        if(q.includes('cgpa') || q.includes('grade') || q.includes('marks')) {
            return "Kubenthiran maintains an excellent academic record with a CGPA of 8.66 in his B.Tech Artificial Intelligence and Machine Learning degree at IFET College of Engineering.";
        }
        else if(q.includes('skill') || q.includes('tech') || q.includes('stack')) {
            return "His primary skills include Python, Java, SQL, Machine Learning, Generative AI, HTML/CSS/JS, Arduino (IoT), and Git/GitHub.";
        }
        else if(q.includes('project') || q.includes('portfolio') || q.includes('build')) {
            return "He has built 3+ major projects including an AI Health Monitoring System (IoT + ML) and an AI Alcohol Detection System for Smart Vehicles. Check the Premium Showcases section!";
        }
        else if(q.includes('intern') || q.includes('experience') || q.includes('work')) {
            return "He completed a Web Development Internship at RKS Infotech Pvt. Ltd. in Puducherry, where he built responsive UIs and worked with mentors using industry best practices.";
        }
        else if(q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('info')) {
            return "You can reach him via email at kubenthiran163@gmail.com, phone at +91 9344851271, or visit his LinkedIn profile.";
        }
        else if(q.includes('certif') || q.includes('course')) {
            return "He holds 9+ certifications from top organizations like Microsoft, Infosys, HCL, and Udemy in topics ranging from Prompt Engineering to Python OOP.";
        }
        else if(q.includes('hi') || q.includes('hello') || q.includes('hey')) {
            return "Greetings! I am Kube-AI, the intelligent assistant for Kubenthiran's portfolio. I can provide details regarding his CGPA, internship, projects, and contact info.";
        }
        
        return "That's an interesting inquiry! While my knowledge base is limited to his academic and professional profile, you can email him directly at kubenthiran163@gmail.com to discuss this further.";
    }
});
