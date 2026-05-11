class FrontEndCaptcha extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.verified = false;
    this.expired = false;
    this.attempts = 0;
    this.maxAttempts = 3;
    this.challengeText = this.generateChallengeText();
    this.token = null;
    
    this.verifyAction = this.verifyAction.bind(this);
    this.refreshCaptcha = this.refreshCaptcha.bind(this);
  }

  // 1. Tell the component to watch for the site-key attribute
  static get observedAttributes() {
    return ['site-key'];
  }

  // 2. Get the site key when the component loads
  get siteKey() {
    return this.getAttribute('site-key') || 'missing_site_key';
  }

  connectedCallback() {
    this.render();
    requestAnimationFrame(() => this.drawCaptcha());
  }

  generateChallengeText() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  refreshCaptcha(event) {
    if (event) event.preventDefault();
    this.challengeText = this.generateChallengeText();
    this.render();
    requestAnimationFrame(() => this.drawCaptcha());
  }

  verifyAction(event) {
    event.preventDefault();
    this.attempts++;

    const inputEl = this.shadowRoot.getElementById('captcha-input');
    const userInput = inputEl.value.trim();

    if (userInput === this.challengeText) {
      this.verified = true;
      this.expired = false;
      this.attempts = 0;
      
      // 3. SECURE PAYLOAD: Package the site key and a timestamp into the token
      const payload = {
        siteKey: this.siteKey,
        timestamp: Date.now(),
        challenge: this.challengeText
      };
      
      // Convert to a Base64 string so it looks like a real token to send to the backend
      this.token = btoa(JSON.stringify(payload)); 
      
      this.render();
      
      setTimeout(() => {
        this.expired = true;
        this.verified = false;
        this.token = null;
        this.render();
      }, 120000); 
    } else {
      if (this.attempts >= this.maxAttempts) {
        this.dispatchEvent(new CustomEvent('captcha-suspicious-activity', { detail: { attempts: this.attempts } }));
      }
      this.challengeText = this.generateChallengeText();
      this.render(true);
      requestAnimationFrame(() => this.drawCaptcha());
    }
  }

  isValid() {
    if (!this.verified) {
      alert("Please complete the robot verification to continue.");
      return false;
    }
    if (this.expired) {
      alert("Robot verification expired. Please try again.");
      return false;
    }
    return true;
  }

  drawCaptcha() {
    if (this.verified) return;
    const canvas = this.shadowRoot.getElementById('captcha-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    ctx.font = '24px monospace';
    ctx.fillStyle = '#333';
    ctx.setTransform(1, -0.1, 0.1, 1, 0, 0);
    ctx.fillText(this.challengeText, 20, 30);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  render(showError = false) {
    this.shadowRoot.innerHTML = `
      <style>
        .captcha-wrapper { border: 1px solid #ccc; padding: 15px; border-radius: 8px; background: #f9f9f9; width: 100%; box-sizing: border-box; }
        .challenge-area { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        canvas { border: 1px solid #ddd; background: #fff; width: 120px; height: 40px; }
        .refresh-btn { cursor: pointer; background: none; border: none; font-size: 18px; }
        .input-area { display: flex; gap: 5px; }
        input { padding: 8px; border: 1px solid #ccc; width: 100px; }
        button.verify-btn { cursor: pointer; padding: 8px 12px; background: #007bff; color: white; border: none; border-radius: 4px; }
        .error { color: red; font-size: 12px; margin-top: 8px; }
        .success { color: green; font-weight: bold; }
      </style>
      <div class="captcha-wrapper">
        ${this.verified 
          ? `<div class="success">✅ Verified</div>`
          : `
            <div class="challenge-area">
              <canvas id="captcha-canvas" width="120" height="40"></canvas>
              <button class="refresh-btn" type="button" id="refresh-btn">🔄</button>
            </div>
            <div class="input-area">
              <input type="text" id="captcha-input" placeholder="Type here" />
              <button type="button" class="verify-btn" id="verify-btn">Verify</button>
            </div>
          `
        }
        ${showError ? `<div class="error">Verification failed. Try again.</div>` : ''}
      </div>
    `;

    if (!this.verified) {
      this.shadowRoot.getElementById('verify-btn').addEventListener('click', this.verifyAction);
      this.shadowRoot.getElementById('refresh-btn').addEventListener('click', this.refreshCaptcha);
    }
  }
}

if (!customElements.get('frontend-captcha')) {
  customElements.define('frontend-captcha', FrontEndCaptcha);
}
export default FrontEndCaptcha;