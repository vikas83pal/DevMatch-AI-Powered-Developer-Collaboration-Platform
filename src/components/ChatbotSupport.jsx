import React, { useState, useRef, useEffect } from 'react';
import {
    FiMessageCircle,
    FiX,
    FiSend,
    FiUser,
    FiCpu,
    FiChevronDown,
    FiZap,
} from 'react-icons/fi';

const ChatbotSupport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "👋 Hi! I'm DevMatch AI Assistant. How can I help you today?",
            time: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const quickActions = [
        { text: "How does matching work?", icon: "🤝" },
        { text: "Create a project", icon: "📁" },
        { text: "Find developers", icon: "👥" },
        { text: "Pricing plans", icon: "💰" },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        if (message.includes('match') || message.includes('matching')) {
            return "Our AI-powered matching system analyzes your skills, experience, and project preferences to find the perfect team members for you. We consider technical skills, work style, timezone, and collaboration preferences to ensure great matches! 🎯";
        }
        if (message.includes('project') || message.includes('create')) {
            return "To create a project:\n1. Login to your account\n2. Go to Dashboard\n3. Click 'Create Project'\n4. Fill in details like title, description, and required skills\n5. Your project will be visible to matching developers! 🚀";
        }
        if (message.includes('developer') || message.includes('find')) {
            return "Finding developers is easy!\n1. Go to the 'Match' page\n2. Set your skill requirements\n3. Our AI will show you compatible developers\n4. Connect and collaborate! 💡";
        }
        if (message.includes('price') || message.includes('cost') || message.includes('plan')) {
            return "DevMatch offers flexible plans:\n• **Free**: Basic matching, 3 projects\n• **Pro** ($19/mo): Unlimited projects, advanced AI matching\n• **Team** ($49/mo): Team features, priority support\n\nStart free and upgrade anytime! 💎";
        }
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! 👋 Great to meet you! I'm here to help you navigate DevMatch. What would you like to know?";
        }
        if (message.includes('thank')) {
            return "You're welcome! 😊 Is there anything else I can help you with?";
        }
        if (message.includes('contact') || message.includes('human') || message.includes('support')) {
            return "For human support:\n📧 Email: support@devmatch.io\n💬 Live chat: Available Mon-Fri 9AM-6PM\n📱 Visit our Contact page for more options!";
        }

        return "I'm here to help! You can ask me about:\n• How matching works\n• Creating projects\n• Finding developers\n• Pricing plans\n• Or anything else about DevMatch! 🤖";
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputValue,
            time: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                type: 'bot',
                text: getBotResponse(inputValue),
                time: new Date(),
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleQuickAction = (text) => {
        setInputValue(text);
        setTimeout(() => handleSend(), 100);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Widget Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="chatbot-toggle"
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    transform: isOpen ? 'scale(0.9)' : 'scale(1)',
                }}
            >
                {isOpen ? (
                    <FiX style={{ width: 24, height: 24, color: 'white' }} />
                ) : (
                    <FiMessageCircle style={{ width: 26, height: 26, color: 'white' }} />
                )}

                {/* Pulse animation when closed */}
                {!isOpen && (
                    <span
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            animation: 'chatPulse 2s infinite',
                        }}
                    />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="chatbot-window fade-in-up"
                    style={{
                        position: 'fixed',
                        bottom: 100,
                        right: 24,
                        width: 380,
                        maxWidth: 'calc(100vw - 48px)',
                        height: 520,
                        maxHeight: 'calc(100vh - 140px)',
                        background: 'linear-gradient(135deg, rgba(22, 22, 34, 0.98), rgba(15, 15, 23, 0.98))',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 20,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '16px 20px',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                                width: 44,
                                height: 44,
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                borderRadius: 12,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <FiCpu style={{ width: 22, height: 22, color: 'white' }} />
                            </div>
                            <div>
                                <h3 style={{ color: 'white', fontSize: 16, fontWeight: 600, margin: 0 }}>
                                    DevMatch Support
                                </h3>
                                <p style={{ color: '#10b981', fontSize: 12, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
                                    AI Assistant Online
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                    }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 8,
                                    flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
                                }}
                            >
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: msg.type === 'user' ? '50%' : 8,
                                    background: msg.type === 'user'
                                        ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                                        : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    {msg.type === 'user'
                                        ? <FiUser style={{ width: 16, height: 16, color: 'white' }} />
                                        : <FiZap style={{ width: 16, height: 16, color: 'white' }} />
                                    }
                                </div>
                                <div style={{
                                    maxWidth: '75%',
                                    padding: '10px 14px',
                                    borderRadius: 12,
                                    background: msg.type === 'user'
                                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                        : 'rgba(255, 255, 255, 0.06)',
                                    border: msg.type === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                                    color: 'white',
                                    fontSize: 14,
                                    lineHeight: 1.5,
                                    whiteSpace: 'pre-line',
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <FiZap style={{ width: 16, height: 16, color: 'white' }} />
                                </div>
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: 12,
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}>
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    {messages.length <= 2 && (
                        <div style={{
                            padding: '0 16px 12px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 8,
                        }}>
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickAction(action.text)}
                                    style={{
                                        padding: '6px 12px',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        border: '1px solid rgba(99, 102, 241, 0.3)',
                                        borderRadius: 20,
                                        color: '#818cf8',
                                        fontSize: 12,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                    }}
                                >
                                    <span>{action.icon}</span>
                                    {action.text}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div style={{
                        padding: 16,
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(0, 0, 0, 0.2)',
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: 8,
                            alignItems: 'center',
                        }}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: 12,
                                    color: 'white',
                                    fontSize: 14,
                                    outline: 'none',
                                }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    background: inputValue.trim()
                                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: 'none',
                                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <FiSend style={{
                                    width: 18,
                                    height: 18,
                                    color: inputValue.trim() ? 'white' : '#71717a'
                                }} />
                            </button>
                        </div>
                        <p style={{
                            textAlign: 'center',
                            fontSize: 11,
                            color: '#71717a',
                            marginTop: 8
                        }}>
                            Powered by DevMatch AI
                        </p>
                    </div>
                </div>
            )}

            {/* CSS Animation for pulse */}
            <style>{`
        @keyframes chatPulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        .chatbot-toggle:hover {
          transform: scale(1.1) !important;
        }
      `}</style>
        </>
    );
};

export default ChatbotSupport;
