(function() {
  const WIDGET_URL = "https://sportspod-chatbot.vercel.app"; // Update after deployment
  
  const style = document.createElement('style');
  style.textContent = `
    #sportspod-chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483647;
    }
    #sportspod-chat-iframe {
      border: none;
      width: 420px;
      height: 540px;
      max-height: 80vh;
      max-width: 90vw;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      background: white;
      display: none;
      transition: all 0.3s ease;
    }
    #sportspod-chat-button {
      width: 60px;
      height: 60px;
      background: #0a0a0a;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      margin-top: 10px;
    }
    #sportspod-chat-button:hover { transform: scale(1.05); }
    #sportspod-chat-button svg { fill: white; color: white; }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'sportspod-chat-container';
  
  const iframe = document.createElement('iframe');
  iframe.id = 'sportspod-chat-iframe';
  iframe.src = `${WIDGET_URL}/widget`;
  iframe.allow = "clipboard-write";
  
  const button = document.createElement('div');
  button.id = 'sportspod-chat-button';
  button.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

  let isOpen = false;
  button.onclick = function() {
    isOpen = !isOpen;
    if (isOpen) {
      iframe.style.display = 'block';
      button.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    } else {
      iframe.style.display = 'none';
      button.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    }
  };

  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);
})();
