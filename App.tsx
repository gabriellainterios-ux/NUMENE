// src/App.tsx
import { useEffect, useState, useRef } from 'react';
import './styles/variables.css';

// TypeScript интерфейс для безопасности (если используете TS)
declare global {
  interface Window { Telegram: any; }
}

const CyberButton = ({ text, onClick, active = false }: any) => (
  <button 
    onClick={onClick}
    className={`
      w-full py-4 mb-3 border font-code text-sm uppercase tracking-widest transition-all
      ${active 
       ? 'bg-[#FF6700] text-black border-[#FF6700]' 
        : 'bg-transparent text-[#FF6700] border-[#FF6700] hover:bg-[#FF6700]/10'}
    `}
    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }} // Техно-форма кнопки
  >
    [{text}]
  </button>
);

function App() {
  const [view, setView] = useState('BOOT'); // BOOT, MENU, CATALOG
  const [logs, setLogs] = useState<string>();
  const audioCtx = useRef<AudioContext | null>(null);

  // 1. Инициализация Web Audio API для звуков интерфейса [19]
  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext |

| (window as any).webkitAudioContext)();
    }
    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }
  };

  const playClickSound = () => {
    if (!audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  };

  // 2. Инициализация Telegram SDK и Viewport Fix [16]
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); // Разворачиваем на полную высоту
    
    // Настройка цветов системных баров под наш дизайн
    tg.setHeaderColor('#050505'); 
    tg.setBackgroundColor('#050505');
    
    // Блокируем вертикальные свайпы для закрытия (New API 7.7+) [21, 22]
    if (tg.disableVerticalSwipes) {
      tg.disableVerticalSwipes();
    }

    // Чтение startapp параметра (например, ID куртки) [23]
    const initData = tg.initDataUnsafe;
    const startParam = initData.start_param;
    
    if (startParam) {
      setLogs(prev =>);
    } else {
      setLogs(prev =>);
    }

    // Симуляция загрузки "Boot Sequence"
    setTimeout(() => setView('MENU'), 2000);
  },);

  const handleInteract = (action: string) => {
    initAudio(); // Активируем аудио при первом жесте пользователя [24]
    playClickSound();
    // Тактильная отдача (Вибрация) 
    window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid');
    console.log(action);
  };

  if (view === 'BOOT') {
    return (
      <div className="h-full flex flex-col justify-end p-6 pb-20 crt-overlay">
        <div className="font-code text-xs text-[#FF6700] space-y-1">
          {logs.map((log, i) => <div key={i}>> {log}</div>)}
          <div className="animate-pulse">> INITIALIZING NEURAL LINK...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col relative crt-overlay">
      {/* Header с учетом Safe Area Top */}
      <header className="pt-[var(--safe-area-top)] px-6 pb-4 border-b border-[#333] bg-[#050505]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex justify-between items-end mt-4">
          <div>
            <h1 className="font-display text-3xl text-white tracking-tighter leading-none">NUMENE</h1>
            <p className="font-code text-[10px] text-[#FF6700] tracking-[0.3em] mt-1">ARTIFACTS OF MEMORY</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="w-1.5 h-1.5 bg-[#FF6700] rounded-full animate-ping"></span>
              <span className="font-code text-[10px] text-[#FF6700]">ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto pb-[calc(100px+var(--safe-area-bottom))]">
        <div className="border-l-2 border-[#FF6700] pl-4 py-1 mb-10">
          <p className="font-code text-xs text-gray-400 leading-relaxed uppercase">
            Мы сохраняем то, что переживает время.<br/>
            Одежда как след.<br/>
            Символ как ключ.
          </p>
        </div>

        <div className="space-y-4">
          <CyberButton text="Доступ: Дроп 1011" onClick={() => handleInteract('DROP')} />
          <CyberButton text="Архив Памяти" onClick={() => handleInteract('ARCHIVE')} />
          <CyberButton text="Сканер Артефакта" onClick={() => handleInteract('SCANNER')} />
        </div>

        {/* Секция визуализации "Шума" */}
        <div className="mt-12 opacity-50">
           <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF6700] to-transparent"></div>
           <p className="text-center font-code text-[8px] text-gray-600 mt-2">SYSTEM INTEGRITY: 99.9%</p>
        </div>
      </main>
    </div>
  );
}

export default App;
