// Main Application Logic for Magic Kids Learning App (LKG & UKG)

// --- Application State ---
let currentGrade = localStorage.getItem('kidsApp_grade') || 'lkg';
let currentSubject = 'english';
let currentSection = '';
let isAudioMuted = false;
let starCount = parseInt(localStorage.getItem('kidsApp_stars') || '0', 10);

// Audio Engine Context
let audioCtx = null;
let currentTracingItem = null;

// Quiz State
let quizQuestions = [];
let currentQuestionIdx = 0;
let quizScore = 0;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  updateStarDisplay();
  setGrade(currentGrade, false); // Initialize grade UI
  setupCanvasListeners();
});

// --- Audio Engine (Web Audio API + SpeechSynthesis) ---

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Mute/Unmute Audio
function toggleAudio() {
  isAudioMuted = !isAudioMuted;
  const icon = document.getElementById('soundIcon');
  const btn = document.getElementById('btnSoundToggle');
  if (isAudioMuted) {
    icon.className = 'fa-solid fa-volume-xmark text-rose-500';
    btn.classList.add('border-rose-300', 'bg-rose-50');
  } else {
    icon.className = 'fa-solid fa-volume-high text-slate-700';
    btn.classList.remove('border-rose-300', 'bg-rose-50');
    playPopSound();
  }
}

// Synthesized Sound Effects
function playPopSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.error(e);
  }
}

function playSuccessSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const startTime = ctx.currentTime + (index * 0.09);
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  } catch (e) {
    console.error(e);
  }
}

function playErrorSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.error(e);
  }
}

function playFanfareSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    const melody = [
      { f: 523.25, d: 0.15 }, { f: 659.25, d: 0.15 }, { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.4 }
    ];
    let now = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = note.f;
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + note.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + note.d);
      now += note.d + 0.05;
    });
  } catch (e) {
    console.error(e);
  }
}

// Text-to-Speech Engine
function speakText(text, lang = 'en-US') {
  if (isAudioMuted || !('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85; // Kid friendly speed
  utterance.pitch = 1.1; // Friendly pitch

  if (lang === 'hi-IN' || lang === 'hi') {
    utterance.lang = 'hi-IN';
    // Try to find a Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
    if (hiVoice) utterance.voice = hiVoice;
  } else {
    utterance.lang = 'en-US';
  }

  window.speechSynthesis.speak(utterance);
}

// --- Navigation & State Handlers ---

function setGrade(grade, userTriggered = true) {
  currentGrade = grade;
  localStorage.setItem('kidsApp_grade', grade);

  const btnLkg = document.getElementById('btnLkg');
  const btnUkg = document.getElementById('btnUkg');

  if (grade === 'lkg') {
    btnLkg.className = "px-5 py-2.5 rounded-xl font-extrabold text-sm sm:text-base transition-all flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-md transform scale-105 border-2 border-amber-300";
    btnUkg.className = "px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 text-slate-600 hover:bg-slate-300/50";
  } else {
    btnUkg.className = "px-5 py-2.5 rounded-xl font-extrabold text-sm sm:text-base transition-all flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-105 border-2 border-blue-400";
    btnLkg.className = "px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 text-slate-600 hover:bg-slate-300/50";
  }

  if (userTriggered) playPopSound();

  // Reset default section for subject
  const subjectData = KIDS_DATA[currentSubject]?.[currentGrade];
  if (subjectData && subjectData.sections?.length > 0) {
    currentSection = subjectData.sections[0].id;
  }

  renderSubjectTabs();
  renderSectionPills();
  renderContent();
}

function setSubject(subject) {
  currentSubject = subject;
  playPopSound();

  const subjectData = KIDS_DATA[subject]?.[currentGrade];
  if (subjectData && subjectData.sections?.length > 0) {
    currentSection = subjectData.sections[0].id;
  }

  renderSubjectTabs();
  renderSectionPills();
  renderContent();
}

function setSection(sectionId) {
  currentSection = sectionId;
  playPopSound();
  renderSectionPills();
  renderContent();
}

function renderSubjectTabs() {
  const tabs = ['English', 'Hindi', 'Math', 'Quiz'];
  tabs.forEach(t => {
    const el = document.getElementById(`tab${t}`);
    if (!el) return;
    const isCurrent = (currentSubject.toLowerCase() === t.toLowerCase()) || (t === 'Quiz' && currentSubject === 'quiz');
    if (isCurrent) {
      el.classList.add('ring-4', 'ring-blue-400', 'bg-white', 'scale-105', 'shadow-xl');
    } else {
      el.classList.remove('ring-4', 'ring-blue-400', 'bg-white', 'scale-105', 'shadow-xl');
    }
  });
}

function renderSectionPills() {
  const container = document.getElementById('sectionPillsContainer');
  if (!container) return;

  if (currentSubject === 'quiz') {
    container.innerHTML = '';
    return;
  }

  const subjectData = KIDS_DATA[currentSubject]?.[currentGrade];
  if (!subjectData || !subjectData.sections) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = subjectData.sections.map(sec => {
    const isActive = sec.id === currentSection;
    const activeClass = isActive 
      ? "bg-blue-600 text-white shadow-lg scale-105 border-blue-600" 
      : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-sm";
    return `
      <button onclick="setSection('${sec.id}')" class="px-4 py-2 rounded-2xl font-bold text-sm whitespace-nowrap border-2 transition-all flex items-center gap-2 ${activeClass}">
        <span>${sec.icon}</span> ${sec.name}
      </button>
    `;
  }).join('');
}

// --- Content Renderer router ---

function renderContent() {
  const container = document.getElementById('contentContainer');
  if (!container) return;

  if (currentSubject === 'english') {
    renderEnglishView(container);
  } else if (currentSubject === 'hindi') {
    renderHindiView(container);
  } else if (currentSubject === 'math') {
    renderMathView(container);
  } else if (currentSubject === 'quiz') {
    renderQuizView(container);
  }
}

// --- 1. ENGLISH VIEW RENDERER ---

function renderEnglishView(container) {
  const data = KIDS_DATA.english[currentGrade];
  
  if (currentSection === 'alphabet') {
    container.innerHTML = `
      <div class="mb-6 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h2 class="text-2xl font-black text-blue-700">${data.title} - Alphabet (A-Z)</h2>
          <p class="text-sm text-slate-500 font-medium">Click on any letter card to hear phonics and pronunciation!</p>
        </div>
        <div class="text-xs bg-blue-100 text-blue-800 font-bold px-3 py-1.5 rounded-full">
          26 Cards • Interactive Sound 🔊
        </div>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        ${data.alphabets.map(item => `
          <div onclick="speakText('${item.letter} for ${item.word}'); openTracingModal('${item.letter}', '${item.word}', '${item.emoji}')"
               class="bg-white rounded-3xl p-4 text-center border-2 border-slate-200 shadow-sm card-bounce cursor-pointer group hover:border-blue-400 flex flex-col items-center justify-between">
            <span class="text-5xl my-2 transform group-hover:scale-110 transition-transform">${item.emoji}</span>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl font-black text-blue-600">${item.letter}</span>
              <span class="text-2xl font-bold text-pink-500">${item.small}</span>
            </div>
            <span class="text-sm font-extrabold text-slate-700 mt-1">${item.word}</span>
            <span class="text-xs font-semibold text-slate-400 mt-1 bg-slate-100 px-2.5 py-0.5 rounded-full">/${item.phonic}/</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'phonics' || currentSection === 'sight_words') {
    const list = currentSection === 'phonics' ? data.alphabets : data.sightWords;
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-purple-700">${currentSection === 'phonics' ? 'Phonics & Example Words' : 'Early Sight Words'}</h2>
        <p class="text-sm text-slate-500 font-medium">Tap cards to hear speech narration!</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        ${list.map(item => `
          <div onclick="speakText('${item.word || item.meaning}')"
               class="bg-gradient-to-br from-white to-purple-50/40 rounded-3xl p-5 border-2 border-purple-100 shadow-sm card-bounce cursor-pointer flex items-center justify-between">
            <div class="flex items-center gap-4">
              <span class="text-4xl">${item.emoji}</span>
              <div>
                <h4 class="text-2xl font-black text-purple-900">${item.word || item.letter}</h4>
                <p class="text-xs font-semibold text-purple-600">${item.meaning || item.imageText || item.word}</p>
              </div>
            </div>
            <button class="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-base hover:bg-purple-200">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'cvc') {
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-emerald-700">3-Letter CVC Words</h2>
        <p class="text-sm text-slate-500 font-medium">Learn Consonant-Vowel-Consonant word families!</p>
      </div>
      <div class="space-y-6">
        ${data.cvcWords.map(fam => `
          <div class="bg-white rounded-3xl p-5 border-2 border-emerald-100 shadow-sm">
            <h3 class="text-lg font-black text-emerald-800 mb-3 flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span> ${fam.category}
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              ${fam.items.map(w => `
                <div onclick="speakText('${w.word}')"
                     class="bg-emerald-50/60 hover:bg-emerald-100 p-3 rounded-2xl border border-emerald-200 text-center cursor-pointer card-bounce">
                  <span class="text-3xl block mb-1">${w.emoji}</span>
                  <span class="text-xl font-black text-slate-800">${w.word}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'vowels' || currentSection === 'opposites' || currentSection === 'actions') {
    if (currentSection === 'vowels') {
      container.innerHTML = `
        <div class="mb-6">
          <h2 class="text-2xl font-black text-amber-700">Vowel Letters (A, E, I, O, U)</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          ${data.vowels.map(v => `
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border-2 border-amber-200 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <span class="text-5xl font-black text-amber-600">${v.letter}</span>
                <span class="text-xs font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full">${v.sound}</span>
              </div>
              <div class="space-y-2">
                ${v.examples.map(ex => `
                  <div onclick="speakText('${ex.word}')" class="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between cursor-pointer hover:bg-amber-100">
                    <span class="text-2xl">${ex.emoji}</span>
                    <span class="font-black text-slate-800 text-base">${ex.word}</span>
                    <i class="fa-solid fa-volume-high text-amber-600 text-xs"></i>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (currentSection === 'opposites') {
      container.innerHTML = `
        <div class="mb-6">
          <h2 class="text-2xl font-black text-pink-700">Opposites Words</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          ${data.opposites.map(op => `
            <div class="bg-white rounded-3xl p-4 border-2 border-pink-100 shadow-sm flex items-center justify-around text-center">
              <div onclick="speakText('${op.word1}')" class="cursor-pointer hover:scale-105 transition-transform">
                <span class="text-4xl block">${op.emoji1}</span>
                <span class="text-lg font-black text-slate-800">${op.word1}</span>
              </div>
              <span class="text-2xl font-extrabold text-pink-400">↔️</span>
              <div onclick="speakText('${op.word2}')" class="cursor-pointer hover:scale-105 transition-transform">
                <span class="text-4xl block">${op.emoji2}</span>
                <span class="text-lg font-black text-slate-800">${op.word2}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="mb-6">
          <h2 class="text-2xl font-black text-blue-700">Action Words</h2>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          ${data.actions.map(act => `
            <div onclick="speakText('${act.word}. ${act.description}')"
                 class="bg-white rounded-3xl p-4 border-2 border-blue-100 shadow-sm text-center card-bounce cursor-pointer">
              <span class="text-5xl block mb-2">${act.emoji}</span>
              <h4 class="text-xl font-black text-blue-900">${act.word}</h4>
              <p class="text-xs text-slate-500 font-medium mt-1">${act.description}</p>
            </div>
          `).join('')}
        </div>
      `;
    }
  } else if (currentSection === 'tracing') {
    container.innerHTML = `
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-black text-blue-700">Letter & Word Writing Canvas</h2>
        <p class="text-sm text-slate-500">Pick any letter below to open the practice drawing screen!</p>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-w-3xl mx-auto">
        ${data.alphabets.map(item => `
          <button onclick="openTracingModal('${item.letter}', '${item.word}', '${item.emoji}')"
                  class="bg-white hover:bg-blue-50 text-blue-700 border-2 border-blue-200 rounded-2xl py-3 font-black text-2xl shadow-sm card-bounce">
            ${item.letter}
          </button>
        `).join('')}
      </div>
    `;
  }
}

// --- 2. HINDI VIEW RENDERER ---

function renderHindiView(container) {
  const data = KIDS_DATA.hindi[currentGrade];

  if (currentSection === 'swar') {
    container.innerHTML = `
      <div class="mb-6 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h2 class="text-2xl font-black text-rose-600 font-hindi">${data.title} - स्वर (Swar)</h2>
          <p class="text-sm text-slate-500 font-medium font-hindi">अक्षरों पर क्लिक करके सही उच्चारण सुनें (Click to hear Hindi speech)!</p>
        </div>
        <span class="text-xs bg-rose-100 text-rose-800 font-bold px-3 py-1.5 rounded-full font-hindi">अ से अः तक</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        ${data.swar.map(s => `
          <div onclick="speakText('${s.letter} से ${s.word}', 'hi-IN'); openTracingModal('${s.letter}', '${s.word}', '${s.emoji}')"
               class="bg-white rounded-3xl p-4 text-center border-2 border-rose-200 shadow-sm card-bounce cursor-pointer group hover:border-rose-400 flex flex-col items-center">
            <span class="text-5xl mb-2 group-hover:scale-110 transition-transform">${s.emoji}</span>
            <span class="text-4xl font-extrabold text-rose-600 font-hindi">${s.letter}</span>
            <span class="text-lg font-black text-slate-800 font-hindi mt-1">${s.letter} से ${s.word}</span>
            <span class="text-xs font-semibold text-slate-400 mt-1">${s.englishWord}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'swar_words' || currentSection === 'hindi_tracing') {
    container.innerHTML = `
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-black text-rose-700 font-hindi">हिंदी अक्षर अभ्यास (Writing Canvas)</h2>
        <p class="text-sm text-slate-500 font-hindi">अक्षर चुनकर लिखने का अभ्यास करें!</p>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-3xl mx-auto">
        ${data.swar.map(s => `
          <button onclick="openTracingModal('${s.letter}', '${s.word}', '${s.emoji}')"
                  class="bg-white hover:bg-rose-50 text-rose-700 border-2 border-rose-200 rounded-2xl py-3 font-black text-3xl font-hindi shadow-sm card-bounce">
            ${s.letter}
          </button>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'vyanjan') {
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-orange-600 font-hindi">${data.title} - व्यंजन (Vyanjan)</h2>
        <p class="text-sm text-slate-500 font-medium font-hindi">क से ज्ञ तक के व्यंजन और उनके उदाहरण</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        ${data.vyanjan.map(v => `
          <div onclick="speakText('${v.letter} से ${v.word}', 'hi-IN')"
               class="bg-white rounded-2xl p-3 text-center border-2 border-orange-200 shadow-sm card-bounce cursor-pointer hover:border-orange-400">
            <span class="text-3xl block mb-1">${v.emoji}</span>
            <span class="text-3xl font-extrabold text-orange-600 font-hindi">${v.letter}</span>
            <span class="text-xs font-bold text-slate-700 font-hindi block mt-1">${v.word}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'words2' || currentSection === 'words3') {
    const wordList = currentSection === 'words2' ? data.words2Letter : data.words3Letter;
    const title = currentSection === 'words2' ? '२ अक्षर वाले सरल शब्द' : '३ अक्षर वाले शब्द';
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-teal-700 font-hindi">${title}</h2>
        <p class="text-sm text-slate-500 font-hindi">शब्दों पर क्लिक करके सही हिज्जे और आवाज सुनें!</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        ${wordList.map(w => `
          <div onclick="speakText('${w.word}', 'hi-IN')"
               class="bg-white rounded-3xl p-4 border-2 border-teal-200 shadow-sm card-bounce cursor-pointer flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-4xl">${w.emoji}</span>
              <div>
                <h4 class="text-3xl font-black text-teal-900 font-hindi">${w.word}</h4>
                <p class="text-xs font-bold text-teal-600 font-hindi">${w.breakdown}</p>
                <p class="text-xs text-slate-400 font-medium">${w.meaning}</p>
              </div>
            </div>
            <button class="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// --- 3. MATH VIEW RENDERER ---

function renderMathView(container) {
  const data = KIDS_DATA.math[currentGrade];

  if (currentSection === 'math_exercise') {
    renderMathExercise(container);
  } else if (currentSection === 'numbers' || currentSection === 'counting') {
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-indigo-700">Numbers 1 to 20 &amp; Object Counting</h2>
        <p class="text-sm text-slate-500 font-medium">Count the cute objects for each number!</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        ${data.numbers.map(n => `
          <div onclick="speakText('${n.val}. ${n.name}')"
               class="bg-white rounded-3xl p-4 border-2 border-indigo-200 shadow-sm card-bounce cursor-pointer flex flex-col justify-between">
            <div class="flex items-center justify-between mb-2">
              <span class="text-4xl font-black text-indigo-600">${n.val}</span>
              <span class="text-xs font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">${n.name}</span>
            </div>
            <div class="bg-indigo-50/60 rounded-2xl p-3 flex flex-wrap gap-1 items-center justify-center min-h-[60px]">
              ${n.items.map(icon => `<span class="text-xl">${icon}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'shapes' || currentSection === 'colors') {
    const isShapes = currentSection === 'shapes';
    const list = isShapes ? data.shapes : data.colors;
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-pink-700">${isShapes ? '2D Shapes' : 'Bright Colors'}</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        ${list.map(item => `
          <div onclick="speakText('${item.name}')"
               class="bg-white rounded-3xl p-5 border-2 border-pink-200 shadow-sm card-bounce cursor-pointer flex items-center gap-4">
            ${isShapes ? `<span class="text-6xl">${item.emoji}</span>` : `
              <div class="w-14 h-14 rounded-2xl shadow-inner border-2 border-white flex items-center justify-center text-2xl" style="background-color: ${item.hex}">
                ${item.emoji}
              </div>
            `}
            <div>
              <h3 class="text-2xl font-black text-slate-800">${item.name}</h3>
              <p class="text-xs text-slate-500 font-medium mt-1">${item.desc || ('Examples: ' + item.example)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'addition' || currentSection === 'subtraction') {
    const isAdd = currentSection === 'addition';
    const list = isAdd ? (data.addition || []) : (data.subtraction || []);
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-emerald-700">${isAdd ? 'Fun Visual Addition (+)' : 'Fun Visual Subtraction (-)'}</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${list.map(item => `
          <div onclick="speakText('${item.text}')"
               class="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm card-bounce cursor-pointer">
            <div class="flex items-center justify-center gap-3 text-2xl font-black text-slate-800 mb-3">
              <span>${item.num1}</span>
              <span class="text-emerald-500">${isAdd ? '+' : '-'}</span>
              <span>${item.num2}</span>
              <span>=</span>
              <span class="text-3xl text-emerald-600 bg-emerald-100 px-3 py-1 rounded-2xl">${isAdd ? item.sum : item.rem}</span>
            </div>
            <div class="bg-emerald-50 rounded-2xl p-3 text-center text-sm font-semibold text-emerald-900">
              ${item.text}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'multiplication' || currentSection === 'division') {
    const isMult = currentSection === 'multiplication';
    const list = isMult ? (data.multiplication || []) : (data.division || []);
    const title = isMult ? 'Visual Multiplication (×)' : 'Visual Division (÷)';
    container.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-black text-blue-700">${title}</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${list.map(item => `
          <div onclick="speakText('${item.text}')"
               class="bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-sm card-bounce cursor-pointer">
            <div class="flex items-center justify-center gap-3 text-2xl font-black text-slate-800 mb-3">
              ${isMult ? `
                <span>${item.num1}</span>
                <span class="text-blue-500">×</span>
                <span>${item.num2}</span>
                <span>=</span>
                <span class="text-3xl text-blue-600 bg-blue-100 px-3 py-1 rounded-2xl">${item.prod}</span>
              ` : `
                <span>${item.total}</span>
                <span class="text-purple-500">÷</span>
                <span>${item.group}</span>
                <span>=</span>
                <span class="text-3xl text-purple-600 bg-purple-100 px-3 py-1 rounded-2xl">${item.ans}</span>
              `}
            </div>
            <div class="bg-blue-50 rounded-2xl p-3 text-center text-sm font-semibold text-blue-900 flex items-center justify-center gap-2">
              <span class="text-2xl">${item.item}</span> ${item.text}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentSection === 'comparing' || currentSection === 'patterns') {
    if (currentSection === 'comparing') {
      container.innerHTML = `
        <div class="mb-6">
          <h2 class="text-2xl font-black text-amber-700">Comparing Numbers (&lt;, &gt;, =)</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${(data.comparison || []).map(item => `
            <div onclick="speakText('${item.a} ${item.symbolText} ${item.b}')"
                 class="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm card-bounce cursor-pointer flex items-center justify-between">
              <div class="flex items-center gap-3 text-4xl font-black">
                <span class="text-blue-600">${item.a}</span>
                <span class="text-amber-500 bg-amber-100 w-12 h-12 rounded-2xl flex items-center justify-center">${item.relation}</span>
                <span class="text-pink-600">${item.b}</span>
              </div>
              <div class="text-right">
                <span class="text-3xl">${item.emoji}</span>
                <p class="text-xs font-bold text-slate-500 mt-1">${item.explanation}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="mb-6">
          <h2 class="text-2xl font-black text-purple-700">Missing Number Trains 🚂</h2>
        </div>
        <div class="space-y-4">
          ${(data.patterns || []).map((item, idx) => `
            <div class="bg-white rounded-3xl p-5 border-2 border-purple-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-2 overflow-x-auto py-2">
                ${item.train.map(val => val === null ? `
                  <div class="w-12 h-14 rounded-2xl bg-purple-200 border-2 border-dashed border-purple-500 flex items-center justify-center text-2xl font-black text-purple-700 animate-pulse">
                    ?
                  </div>
                ` : `
                  <div class="w-12 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl font-black shadow">
                    ${val}
                  </div>
                `).join('')}
              </div>
              <div class="flex items-center gap-2">
                ${item.options.map(opt => `
                  <button onclick="checkPatternAnswer(${opt}, ${item.missing}, this)"
                          class="w-11 h-11 rounded-xl bg-slate-100 hover:bg-purple-100 font-extrabold text-slate-800 border border-slate-300">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }
}

// --- MATH EXERCISE ENGINE ---
let selectedMathOp = 'all';
let mathQuestions = [];
let currentMathQIdx = 0;
let mathScore = 0;

function setMathOp(op) {
  selectedMathOp = op;
  playPopSound();
  generateMathQuestions();
  const container = document.getElementById('contentContainer');
  if (container) renderMathExercise(container);
}

function generateMathQuestions() {
  mathScore = 0;
  currentMathQIdx = 0;
  mathQuestions = [];

  const ops = selectedMathOp === 'all' ? ['+', '-', '*', '/'] : [selectedMathOp];

  for (let i = 0; i < 5; i++) {
    const chosenOp = ops[Math.floor(Math.random() * ops.length)];
    let n1, n2, ans, text, speakTextStr, opSymbol;

    if (chosenOp === '+') {
      n1 = Math.floor(Math.random() * 8) + 1;
      n2 = Math.floor(Math.random() * 8) + 1;
      ans = n1 + n2;
      opSymbol = '+';
      text = `${n1} + ${n2} = ?`;
      speakTextStr = `What is ${n1} plus ${n2}?`;
    } else if (chosenOp === '-') {
      n1 = Math.floor(Math.random() * 8) + 3;
      n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
      ans = n1 - n2;
      opSymbol = '-';
      text = `${n1} - ${n2} = ?`;
      speakTextStr = `What is ${n1} minus ${n2}?`;
    } else if (chosenOp === '*') {
      n1 = Math.floor(Math.random() * 5) + 1;
      n2 = Math.floor(Math.random() * 4) + 1;
      ans = n1 * n2;
      opSymbol = '×';
      text = `${n1} × ${n2} = ?`;
      speakTextStr = `What is ${n1} multiplied by ${n2}?`;
    } else {
      // Division
      n2 = Math.floor(Math.random() * 4) + 1;
      ans = Math.floor(Math.random() * 5) + 1;
      n1 = n2 * ans;
      opSymbol = '÷';
      text = `${n1} ÷ ${n2} = ?`;
      speakTextStr = `What is ${n1} divided by ${n2}?`;
    }

    // Generate 4 options
    const optionsSet = new Set([ans]);
    while (optionsSet.size < 4) {
      const wrong = Math.max(0, ans + (Math.floor(Math.random() * 7) - 3));
      if (wrong !== ans) optionsSet.add(wrong);
    }
    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    mathQuestions.push({
      n1, n2, ans, opSymbol, text, speakTextStr, options
    });
  }
}

function renderMathExercise(container) {
  if (mathQuestions.length === 0) {
    generateMathQuestions();
  }

  if (currentMathQIdx >= mathQuestions.length) {
    playFanfareSound();
    triggerConfetti();
    addStars(5);

    container.innerHTML = `
      <div class="text-center py-10 max-w-md mx-auto">
        <div class="text-7xl mb-4 animate-bounce">🧮</div>
        <h2 class="text-3xl font-black text-emerald-600 mb-2">Math Exercise Complete!</h2>
        <p class="text-slate-600 font-semibold mb-6">You solved ${mathScore} out of ${mathQuestions.length} math problems! You earned +5 Bonus Stars! ⭐</p>
        <button onclick="generateMathQuestions(); renderMathExercise(document.getElementById('contentContainer'))"
                class="btn-3d bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-extrabold text-lg px-8 py-3.5 rounded-2xl shadow-lg hover:brightness-110">
          Try Another Exercise ✏️
        </button>
      </div>
    `;
    return;
  }

  const q = mathQuestions[currentMathQIdx];
  speakText(q.speakTextStr);

  const opButtons = [
    { id: 'all', name: 'All Mixed', icon: '🎲' },
    { id: '+', name: 'Addition (+)', icon: '➕' },
    { id: '-', name: 'Subtraction (-)', icon: '➖' },
    { id: '*', name: 'Multiplication (×)', icon: '✖️' },
    { id: '/', name: 'Division (÷)', icon: '➗' }
  ];

  container.innerHTML = `
    <div class="max-w-xl mx-auto">
      <!-- Operation Selector Pills -->
      <div class="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-4">
        ${opButtons.map(b => `
          <button onclick="setMathOp('${b.id}')"
                  class="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition-all flex items-center gap-1.5 ${selectedMathOp === b.id ? 'bg-emerald-600 text-white border-emerald-600 shadow' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'}">
            <span>${b.icon}</span> ${b.name}
          </button>
        `).join('')}
      </div>

      <!-- Exercise Progress Header -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-bold text-slate-500">Problem ${currentMathQIdx + 1} of ${mathQuestions.length}</span>
        <span class="text-xs font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full">⭐ Score: ${mathScore}</span>
      </div>

      <!-- Big Math Question Card -->
      <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-center text-white shadow-xl mb-6 relative">
        <span class="absolute top-4 left-4 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase">Operation: ${q.opSymbol}</span>
        <h3 class="text-5xl font-black tracking-wider mb-3">${q.text}</h3>
        <button onclick="speakText('${q.speakTextStr}')" class="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5">
          <i class="fa-solid fa-volume-high"></i> Replay Question
        </button>
      </div>

      <!-- 4 Answer Options -->
      <div class="grid grid-cols-2 gap-4">
        ${q.options.map(opt => `
          <button onclick="submitMathAnswer(${opt}, ${q.ans}, this)"
                  class="bg-white hover:bg-emerald-50 text-slate-800 font-black text-3xl py-6 rounded-2xl border-2 border-slate-200 shadow-sm card-bounce">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function submitMathAnswer(chosen, correct, btnEl) {
  if (chosen === correct) {
    mathScore++;
    btnEl.className = "bg-emerald-500 text-white font-black text-3xl py-6 rounded-2xl border-2 border-emerald-600 shadow-lg scale-105";
    playSuccessSound();
    addStars(1);
    speakText("Correct! Great math skills!");
  } else {
    btnEl.className = "bg-rose-500 text-white font-black text-3xl py-6 rounded-2xl border-2 border-rose-600 shadow-lg animate-bounce";
    playErrorSound();
    speakText("Oops! Try again.");
  }

  setTimeout(() => {
    currentMathQIdx++;
    renderMathExercise(document.getElementById('contentContainer'));
  }, 1200);
}

function checkPatternAnswer(selected, correct, btnEl) {
  if (selected === correct) {
    btnEl.className = "w-11 h-11 rounded-xl bg-emerald-500 text-white font-extrabold shadow scale-110";
    playSuccessSound();
    addStars(1);
    speakText("Great job! That is correct.");
  } else {
    btnEl.className = "w-11 h-11 rounded-xl bg-rose-500 text-white font-extrabold shadow animate-bounce";
    playErrorSound();
    speakText("Oops! Try again.");
  }
}

// --- 4. QUIZ MODE & ENGINE ---

function openQuizMode() {
  currentSubject = 'quiz';
  playPopSound();
  generateQuizQuestions();
  renderSubjectTabs();
  renderSectionPills();
  renderContent();
}

function generateQuizQuestions() {
  quizScore = 0;
  currentQuestionIdx = 0;
  quizQuestions = [];

  if (currentGrade === 'lkg') {
    // 5 fun questions for LKG
    quizQuestions = [
      {
        question: "Which letter does 'Apple' 🍎 start with?",
        options: ["A", "B", "C", "D"],
        answer: 0,
        speak: "Which letter does Apple start with?"
      },
      {
        question: "How many stars are here? ⭐ ⭐ ⭐",
        options: ["2", "3", "5", "1"],
        answer: 1,
        speak: "How many stars are here?"
      },
      {
        question: "हिंदी में 'अ' से क्या होता है?",
        options: ["आम", "अनार", "इमली", "कमल"],
        answer: 1,
        speak: "अ से क्या होता है?",
        lang: 'hi-IN'
      },
      {
        question: "What shape is a round wheel 🔴?",
        options: ["Triangle", "Square", "Circle", "Star"],
        answer: 2,
        speak: "What shape is a round wheel?"
      },
      {
        question: "What animal says 'Woof Woof' 🐶?",
        options: ["Cat", "Dog", "Fish", "Lion"],
        answer: 1,
        speak: "What animal says Woof Woof?"
      }
    ];
  } else {
    // 5 fun questions for UKG
    quizQuestions = [
      {
        question: "What is 3 + 2 = ? 🍎🍎🍎 + 🍎🍎",
        options: ["4", "5", "6", "3"],
        answer: 1,
        speak: "What is 3 plus 2?"
      },
      {
        question: "Which one is a Vowel letter?",
        options: ["B", "E", "F", "G"],
        answer: 1,
        speak: "Which one is a Vowel letter?"
      },
      {
        question: "क से क्या होता है? 🪷",
        options: ["कमल", "घर", "नल", "फल"],
        answer: 0,
        speak: "क से क्या होता है?",
        lang: 'hi-IN'
      },
      {
        question: "What is the OPPOSITE of BIG 🐘?",
        options: ["Tall", "Hot", "SMALL 🐜", "Happy"],
        answer: 2,
        speak: "What is the opposite of BIG?"
      },
      {
        question: "Complete the 3-letter CVC word: C _ T 🐱",
        options: ["A", "E", "O", "U"],
        answer: 0,
        speak: "Complete the word CAT"
      }
    ];
  }
}

function renderQuizView(container) {
  if (currentQuestionIdx >= quizQuestions.length) {
    // Completed Quiz Screen!
    playFanfareSound();
    triggerConfetti();
    addStars(5);

    container.innerHTML = `
      <div class="text-center py-10 max-w-md mx-auto">
        <div class="text-7xl mb-4 animate-bounce">🏆</div>
        <h2 class="text-3xl font-black text-amber-600 mb-2">Quiz Champion!</h2>
        <p class="text-slate-600 font-semibold mb-6">You answered ${quizScore} out of ${quizQuestions.length} correctly! You earned +5 Bonus Stars! ⭐</p>

        <button onclick="openQuizMode()"
                class="btn-3d bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-lg px-8 py-3.5 rounded-2xl shadow-lg hover:brightness-110">
          Play Again 🎮
        </button>
      </div>
    `;
    return;
  }

  const q = quizQuestions[currentQuestionIdx];
  speakText(q.speak, q.lang || 'en-US');

  container.innerHTML = `
    <div class="max-w-xl mx-auto">
      <!-- Quiz Header Progress -->
      <div class="flex items-center justify-between mb-6">
        <span class="text-sm font-bold text-slate-500">Question ${currentQuestionIdx + 1} of ${quizQuestions.length}</span>
        <div class="flex items-center gap-1 font-black text-amber-600">
          ⭐ Score: ${quizScore}
        </div>
      </div>

      <!-- Question Card -->
      <div class="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md text-center mb-6">
        <h3 class="text-2xl font-black text-slate-800 ${q.lang === 'hi-IN' ? 'font-hindi' : ''}">${q.question}</h3>
        <button onclick="speakText('${q.speak}', '${q.lang || 'en-US'}')" class="mt-3 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold hover:bg-amber-200">
          <i class="fa-solid fa-volume-high"></i> Replay Question
        </button>
      </div>

      <!-- Options Grid -->
      <div class="grid grid-cols-2 gap-4">
        ${q.options.map((opt, idx) => `
          <button onclick="submitAnswer(${idx}, this)"
                  class="bg-white hover:bg-amber-50 text-slate-800 font-black text-xl py-5 rounded-2xl border-2 border-slate-200 shadow-sm card-bounce ${q.lang === 'hi-IN' ? 'font-hindi text-2xl' : ''}">
            ${opt}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function submitAnswer(chosenIdx, btnEl) {
  const q = quizQuestions[currentQuestionIdx];
  if (chosenIdx === q.answer) {
    quizScore++;
    btnEl.className = "bg-emerald-500 text-white font-black text-xl py-5 rounded-2xl border-2 border-emerald-600 shadow-lg scale-105";
    playSuccessSound();
    speakText("Awesome!");
  } else {
    btnEl.className = "bg-rose-500 text-white font-black text-xl py-5 rounded-2xl border-2 border-rose-600 shadow-lg animate-bounce";
    playErrorSound();
    speakText("Oops!");
  }

  setTimeout(() => {
    currentQuestionIdx++;
    renderContent();
  }, 1200);
}

// --- 5. REWARDS & STICKERS SYSTEM ---

function updateStarDisplay() {
  const badge = document.getElementById('starBadgeCount');
  if (badge) badge.innerText = starCount;
  localStorage.setItem('kidsApp_stars', starCount);
}

function addStars(count) {
  starCount += count;
  updateStarDisplay();
}

function resetAppStars() {
  if (confirm("Reset star rewards?")) {
    starCount = 0;
    updateStarDisplay();
  }
}

function triggerConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  container.innerHTML = '';

  const colors = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa', '#fb923c'];
  for (let i = 0; i < 40; i++) {
    const part = document.createElement('div');
    part.className = 'confetti-particle';
    part.style.left = Math.random() * 100 + 'vw';
    part.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    part.style.animationDelay = (Math.random() * 0.5) + 's';
    container.appendChild(part);
  }

  setTimeout(() => {
    container.innerHTML = '';
  }, 3500);
}

// --- 6. TRACING CANVAS MODAL LOGIC ---

function openTracingModal(symbol, word, emoji) {
  currentTracingItem = { symbol, word, emoji };
  const modal = document.getElementById('tracingModal');
  const title = document.getElementById('tracingTargetTitle');
  const watermark = document.getElementById('tracingWatermark');

  if (title) title.innerText = `${symbol} - ${word} ${emoji}`;
  if (watermark) {
    watermark.innerText = symbol;
    watermark.className = symbol.length > 2 ? "absolute inset-0 flex items-center justify-center text-slate-200 text-6xl font-black font-hindi select-none pointer-events-none" : "absolute inset-0 flex items-center justify-center text-slate-200 text-9xl font-black select-none pointer-events-none";
  }

  if (modal) modal.classList.remove('hidden');
  clearCanvas();
  const textToSpeak = (symbol.length === 1 && /[A-Z]/i.test(symbol)) ? `${symbol} for ${word}` : `${symbol}. ${word}`;
  speakText(textToSpeak);
}

function closeTracingModal() {
  const modal = document.getElementById('tracingModal');
  if (modal) modal.classList.add('hidden');
}

function playTargetSound() {
  if (currentTracingItem) {
    const symbol = currentTracingItem.symbol;
    const word = currentTracingItem.word;
    const textToSpeak = (symbol.length === 1 && /[A-Z]/i.test(symbol)) ? `${symbol} for ${word}` : `${symbol}. ${word}`;
    speakText(textToSpeak);
  }
}

let isDrawing = false;
let brushColor = '#ef4444';

function setBrushColor(color) {
  brushColor = color;
  playPopSound();
}

function clearCanvas() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setupCanvasListeners() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  function startPosition(e) {
    isDrawing = true;
    draw(e);
  }

  function endPosition() {
    isDrawing = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.strokeStyle = brushColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', startPosition, { passive: false });
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', draw, { passive: false });
}
