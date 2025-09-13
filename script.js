// Zen Number Puzzle Support Page - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isVisible = content.style.display === 'block';
            
            // Hide all FAQ answers
            document.querySelectorAll('.faq-item p').forEach(p => {
                p.style.display = 'none';
            });
            
            // Toggle current answer
            if (!isVisible) {
                content.style.display = 'block';
                content.style.animation = 'fadeIn 0.3s ease-in-out';
            }
        });
    });

    // Email contact functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Add analytics or tracking here if needed
            console.log('Support email clicked');
        });
    }

    // Add loading animation for sections
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add copy functionality for email
    function createCopyButton() {
        const contactInfo = document.querySelector('.contact-info');
        const emailElement = contactInfo.querySelector('a[href^="mailto:"]');
        
        if (emailElement) {
            const copyButton = document.createElement('button');
            copyButton.textContent = '📋 Copy Email';
            copyButton.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                margin-left: 10px;
                font-size: 0.9rem;
                transition: background 0.3s ease;
            `;
            
            copyButton.addEventListener('click', function() {
                const email = 'monogatree@gmail.com';
                navigator.clipboard.writeText(email).then(() => {
                    copyButton.textContent = '✅ Copied!';
                    setTimeout(() => {
                        copyButton.textContent = '📋 Copy Email';
                    }, 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    copyButton.textContent = '✅ Copied!';
                    setTimeout(() => {
                        copyButton.textContent = '📋 Copy Email';
                    }, 2000);
                });
            });
            
            copyButton.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(255, 255, 255, 0.3)';
            });
            
            copyButton.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 255, 255, 0.2)';
            });
            
            emailElement.parentNode.appendChild(copyButton);
        }
    }

    createCopyButton();

    // Add feature request form (simple)
    function addFeatureRequestSection() {
        const mainContent = document.querySelector('.main-content');
        const featureSection = document.createElement('section');
        featureSection.className = 'section';
        featureSection.innerHTML = `
            <h2>💭 Feature Requests</h2>
            <p>Have an idea for a new feature? We'd love to hear from you!</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
                <textarea 
                    id="featureRequest" 
                    placeholder="Describe your feature idea here..."
                    style="width: 100%; height: 100px; padding: 12px; border: 2px solid #e9ecef; border-radius: 6px; resize: vertical; font-family: inherit;"
                ></textarea>
                <button 
                    id="sendFeatureRequest"
                    style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin-top: 10px; font-size: 1rem;"
                >
                    Send via Email
                </button>
            </div>
        `;
        
        mainContent.appendChild(featureSection);
        
        document.getElementById('sendFeatureRequest').addEventListener('click', function() {
            const request = document.getElementById('featureRequest').value;
            if (request.trim()) {
                const subject = encodeURIComponent('Zen Number Puzzle - Feature Request');
                const body = encodeURIComponent(`Feature Request:\n\n${request}\n\nSent from Zen Number Puzzle Support Page`);
                window.open(`mailto:monogatree@gmail.com?subject=${subject}&body=${body}`);
            } else {
                alert('Please describe your feature idea first.');
            }
        });
    }

    // Add the feature request section
    // addFeatureRequestSection();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .faq-item h3::after {
        content: " ▼";
        font-size: 0.8rem;
        color: #667eea;
        transition: transform 0.3s ease;
    }
    
    .faq-item h3:hover::after {
        transform: rotate(180deg);
    }
`;
document.head.appendChild(style);