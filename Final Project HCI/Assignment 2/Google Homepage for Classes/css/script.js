

 (function () {
  function initHoverTTS({
    selector = '[data-tts]',
    attrPriority = ['aria-label','data-tts','title','.tooltip','text'],
    lang = 'en-US',
    rate = 1, pitch = 1, volume = 1,
    unlockEvents = ['pointerdown','click','keydown'],
    speakOn = ['mouseenter','focus','click'],   
    cancelOn = ['mouseleave','blur'],
    voiceNamePrefer = /Google|Microsoft/i
  } = {}) {
    if (!('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    let unlocked = false;
    let chosenVoice = null;
    let voicesReady = false;
    let pollTimer = null;

    function pickVoice() {
      const voices = synth.getVoices();
      if (!voices || voices.length === 0) return null;
      return (
        voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang.toLowerCase()) && voiceNamePrefer.test(v.name)) ||
        voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang.toLowerCase())) ||
        voices[0]
      );
    }

    function ensureVoices(cb) {
      const tryPick = () => {
        chosenVoice = pickVoice();
        if (chosenVoice) {
          voicesReady = true;
          if (pollTimer) clearInterval(pollTimer);
          cb && cb();
        }
      };
      tryPick();
      if (!voicesReady) {
        if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = tryPick;
        pollTimer = setInterval(tryPick, 200);
        setTimeout(() => { if (pollTimer) clearInterval(pollTimer); }, 3000);
      }
    }

    function getText(el) {
      for (const key of attrPriority) {
        if (key === 'text') {
          const t = el.innerText?.trim();
          if (t) return t;
          continue;
        }
        if (key.startsWith('.')) {
          const child = el.querySelector(key);
          const t = child?.textContent?.trim();
          if (t) return t;
          continue;
        }
        const t = el.getAttribute(key);
        if (t && t.trim()) return t.trim();
      }
      return 'Button';
    }

    function speak(text) {
      if (!unlocked || !text) return;
      try {
        if (synth.speaking || synth.pending) synth.cancel();
        const u = new SpeechSynthesisUtterance(text);
        if (chosenVoice) u.voice = chosenVoice;
        u.lang = chosenVoice?.lang || lang;
        u.rate = rate; u.pitch = pitch; u.volume = volume;
        synth.speak(u);
      } catch {}
    }

    function cancel() {
      if (synth.speaking || synth.pending) synth.cancel();
    }

    function unlockOnce() {
      if (unlocked) return;
      unlocked = true;
      try {
        const warm = new SpeechSynthesisUtterance(' ');
        synth.speak(warm);
        synth.cancel();
      } catch {}
      ensureVoices();
      for (const ev of unlockEvents) window.removeEventListener(ev, unlockOnce);
    }

    for (const ev of unlockEvents) window.addEventListener(ev, unlockOnce, { once: true });

    function onSpeakEvent(e) {
      const el = e.target.closest(selector);
      if (!el) return;
      if (!unlocked) return; 
      if (!voicesReady) ensureVoices(() => speak(getText(el)));
      speak(getText(el));
    }

    function onCancelEvent(e) {
      if (!e.target.closest(selector)) return;
      cancel();
    }

    for (const ev of speakOn) document.addEventListener(ev, onSpeakEvent);
    for (const ev of cancelOn) document.addEventListener(ev, onCancelEvent);

    return {
      speakNow: (elOrSelector) => {
        const el = typeof elOrSelector === 'string' ? document.querySelector(elOrSelector) : elOrSelector;
        if (el) speak(getText(el));
      },
      cancel
    };
  }

  
  window.initHoverTTS = initHoverTTS;

 
  document.addEventListener('DOMContentLoaded', function () {
   
    initHoverTTS({
      selector: '[speak1]',
      attrPriority: ['aria-label','data-tts','.tooltip','text'],
      speakOn: ['mouseenter','focus','click'] 
    });
  });
  
   
  document.addEventListener('DOMContentLoaded', function () {
    
    initHoverTTS({
      selector: '[speak2]',
      attrPriority: ['aria-label','data-tts','.tooltip','text'],
      speakOn: ['mouseenter','focus','click'] 
    });
  });
  
    
  document.addEventListener('DOMContentLoaded', function () {
    
    initHoverTTS({
      selector: '[speak3]',
      attrPriority: ['aria-label','data-tts','.tooltip','text'],
      speakOn: ['mouseenter','focus','click'] 
    });
  });  
})();

document.getElementById("searchBtn").addEventListener("click", function () {
  const message = "Hi, please input your content, then I will help you search.";
  const utterance = new SpeechSynthesisUtterance(message);
  speechSynthesis.speak(utterance);
});

//dark mode function, had some help fixing this section with chatgpt
function prefersDarkMode() {
  if (localStorage.getItem('DarkMode') !== null) {
    return localStorage.getItem('DarkMode') === 'true';
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;//had syntax errors here
}


function applyTheme() {
  const isDark = prefersDarkMode();
  document.body.classList.toggle('dark-mode', isDark);

  const toggleButton = document.getElementById('themeToggle');
  if (toggleButton) {
    toggleButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }
}


function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('DarkMode', isDark);//few more syntax errors here

  const toggleButton = document.getElementById('themeToggle');
  if (toggleButton) {
    toggleButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }
}

//toggles dark mode
window.addEventListener('DOMContentLoaded', () => {
  applyTheme();

  const toggleButton = document.getElementById('themeToggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleDarkMode);
  }
});