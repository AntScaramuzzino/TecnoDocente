import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ExternalLink, 
  Box, 
  Compass, 
  Zap, 
  Sun, 
  Layers, 
  Flame, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';

interface LessonVisualStageProps {
  videoId: string;
  title: string;
  area: string;
  currentSecond: number;
  currentTranscriptText?: string;
  currentKeyConcept?: string;
  youtubeId?: string;
}

export const LessonVisualStage: React.FC<LessonVisualStageProps> = ({
  videoId,
  title,
  area,
  currentSecond,
  currentTranscriptText,
  currentKeyConcept,
  youtubeId
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Stop speech synthesis when component unmounts or text changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentTranscriptText, videoId]);

  const handleToggleSpeech = () => {
    if (!speechSupported || !currentTranscriptText) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentTranscriptText);
      utterance.lang = 'it-IT';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Render topic-specific high-fidelity SVG/Canvas illustration
  const renderVisualContent = () => {
    // 1. Proiezioni Ortogonali
    if (videoId.includes('po') || title.toLowerCase().includes('proiezioni')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white select-none">
          <div className="w-full max-w-md aspect-[4/3] relative rounded-xl border border-cyan-500/30 bg-slate-900/80 p-3 shadow-inner flex flex-col justify-between">
            {/* Header schema */}
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-cyan-400 flex items-center gap-1">
                <Box className="w-3.5 h-3.5" /> Triedro di Gaspard Monge (PO, PV, PL)
              </span>
              <span className="text-amber-300 font-mono">T = {Math.floor(currentSecond / 60)}:{(currentSecond % 60).toString().padStart(2, '0')}</span>
            </div>

            {/* SVG Diagram: 3 Planes in Perspective & 2D Unrolled Sheet */}
            <div className="flex-1 flex items-center justify-center py-1">
              <svg viewBox="0 0 400 240" className="w-full h-full max-h-[190px]">
                {/* Axes and Origin */}
                <line x1="200" y1="20" x2="200" y2="220" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="20" y1="120" x2="380" y2="120" stroke="#38bdf8" strokeWidth="2.5" />
                
                {/* Quadrant labels */}
                {/* PV (Top Left) */}
                <rect x="25" y="25" width="165" height="85" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" rx="6" />
                <text x="35" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">P.V. (Piano Verticale)</text>
                <text x="35" y="60" fill="#94a3b8" fontSize="9">Vista Frontale (Prospetto)</text>
                {/* Solid front view */}
                <rect x="80" y="55" width="60" height="40" fill="#38bdf8" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />
                
                {/* PL (Top Right) */}
                <rect x="210" y="25" width="165" height="85" fill="#10b981" fillOpacity="0.15" stroke="#34d399" strokeWidth="1" rx="6" />
                <text x="220" y="45" fill="#34d399" fontSize="11" fontWeight="bold">P.L. (Piano Laterale)</text>
                <text x="220" y="60" fill="#94a3b8" fontSize="9">Vista Fianco Sinistro</text>
                {/* Solid side view */}
                <rect x="260" y="55" width="40" height="40" fill="#34d399" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />

                {/* PO (Bottom Left) */}
                <rect x="25" y="130" width="165" height="85" fill="#eab308" fillOpacity="0.15" stroke="#facc15" strokeWidth="1" rx="6" />
                <text x="35" y="150" fill="#facc15" fontSize="11" fontWeight="bold">P.O. (Piano Orizzontale)</text>
                <text x="35" y="165" fill="#94a3b8" fontSize="9">Vista dall'Alto (Pianta)</text>
                {/* Solid top view */}
                <rect x="80" y="155" width="60" height="40" fill="#facc15" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />

                {/* Piano di Ribaltamento (Bottom Right) */}
                <rect x="210" y="130" width="165" height="85" fill="#64748b" fillOpacity="0.1" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" rx="6" />
                <text x="220" y="150" fill="#94a3b8" fontSize="11" fontWeight="bold">Piano di Ribaltamento</text>
                <text x="220" y="165" fill="#64748b" fontSize="9">Archi di Compasso dal centro O</text>
                {/* Compass arcs */}
                <path d="M 80 200 A 120 120 0 0 1 200 80" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
                <path d="M 140 200 A 60 60 0 0 1 200 140" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />

                {/* Origin center O */}
                <circle cx="200" cy="120" r="4" fill="#f43f5e" />
                <text x="206" y="116" fill="#f43f5e" fontSize="12" fontWeight="black">O</text>

                {/* Linea di terra label */}
                <text x="340" y="115" fill="#38bdf8" fontSize="10" fontWeight="black">L.T.</text>
              </svg>
            </div>

            {/* Bottom concept banner */}
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[10px] text-cyan-200 flex items-center justify-between">
              <span>{currentKeyConcept || 'Triedro di Monge: scomposizione nelle tre viste ortogonali senza distorsioni'}</span>
              <span className="text-rose-400 font-bold shrink-0">Norme UNI</span>
            </div>
          </div>
        </div>
      );
    }

    // 2. Il Legno
    if (videoId.includes('legno') || title.toLowerCase().includes('legno')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 text-white select-none">
          <div className="w-full max-w-md aspect-[4/3] relative rounded-xl border border-amber-600/40 bg-slate-900/90 p-3 shadow-inner flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-amber-400 flex items-center gap-1">
                🪵 Struttura del Tronco & Semilavorati (Compensato e MDF)
              </span>
              <span className="text-emerald-400 font-mono">HUB Scuola</span>
            </div>

            {/* Trunk Cross Section & Crossed Veneers Diagram */}
            <div className="flex-1 flex items-center justify-center py-1">
              <svg viewBox="0 0 400 230" className="w-full h-full max-h-[185px]">
                {/* Trunk cross-section with concentric rings */}
                <circle cx="120" cy="115" r="85" fill="#78350f" stroke="#451a03" strokeWidth="4" />
                <circle cx="120" cy="115" r="75" fill="#92400e" stroke="#78350f" strokeWidth="2" />
                <circle cx="120" cy="115" r="60" fill="#b45309" stroke="#92400e" strokeWidth="1.5" />
                <circle cx="120" cy="115" r="45" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
                <circle cx="120" cy="115" r="30" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="120" cy="115" r="12" fill="#78350f" />

                {/* Callout lines for trunk parts */}
                <text x="12" y="35" fill="#fde68a" fontSize="10" fontWeight="bold">1. Corteccia esterna</text>
                <text x="12" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold">2. Libro e Cambio</text>
                <text x="12" y="190" fill="#fbbf24" fontSize="10" fontWeight="bold">3. Alburno (linfa)</text>
                <text x="12" y="210" fill="#f59e0b" fontSize="10" fontWeight="bold">4. Durame (compatto)</text>

                {/* Plywood crossed fibers diagram */}
                <g transform="translate(240, 30)">
                  <rect x="0" y="0" width="140" height="150" fill="#1e293b" rx="8" stroke="#d97706" strokeWidth="1.5" />
                  <text x="10" y="20" fill="#fde68a" fontSize="11" fontWeight="bold">Compensato a 90°</text>
                  <text x="10" y="34" fill="#94a3b8" fontSize="8.5">Fibre ortogonali anti-imbarcamento</text>

                  {/* Layer 1: Horizontal fibers */}
                  <rect x="15" y="45" width="110" height="20" fill="#b45309" rx="3" stroke="#fef3c7" strokeWidth="0.5" />
                  <line x1="20" y1="55" x2="120" y2="55" stroke="#fde68a" strokeWidth="1" strokeDasharray="3,3" />

                  {/* Layer 2: Vertical fibers (90°) */}
                  <rect x="15" y="70" width="110" height="20" fill="#d97706" rx="3" stroke="#fef3c7" strokeWidth="0.5" />
                  <line x1="40" y1="72" x2="40" y2="88" stroke="#78350f" strokeWidth="1.5" />
                  <line x1="70" y1="72" x2="70" y2="88" stroke="#78350f" strokeWidth="1.5" />
                  <line x1="100" y1="72" x2="100" y2="88" stroke="#78350f" strokeWidth="1.5" />

                  {/* Layer 3: Horizontal fibers */}
                  <rect x="15" y="95" width="110" height="20" fill="#b45309" rx="3" stroke="#fef3c7" strokeWidth="0.5" />
                  <line x1="20" y1="105" x2="120" y2="105" stroke="#fde68a" strokeWidth="1" strokeDasharray="3,3" />

                  <text x="15" y="135" fill="#34d399" fontSize="9" fontWeight="bold">✓ Annulla deformazioni</text>
                </g>
              </svg>
            </div>

            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[10px] text-amber-200 flex items-center justify-between">
              <span>{currentKeyConcept || 'Il legno: abbattimento invernale e fabbricazione dei pannelli multistrato'}</span>
              <span className="text-emerald-400 font-bold shrink-0">Filiera Sostenibile</span>
            </div>
          </div>
        </div>
      );
    }

    // 3. La Siderurgia & Altoforno
    if (videoId.includes('siderurgia') || title.toLowerCase().includes('siderurgia') || title.toLowerCase().includes('altoforno')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-red-950 via-slate-900 to-amber-950 text-white select-none">
          <div className="w-full max-w-md aspect-[4/3] relative rounded-xl border border-red-500/40 bg-slate-900/90 p-3 shadow-inner flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-orange-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-500" /> Schema dell'Altoforno & Produzione dell'Acciaio
              </span>
              <span className="text-red-400 font-mono font-bold">1800 °C</span>
            </div>

            {/* Blast Furnace Diagram */}
            <div className="flex-1 flex items-center justify-center py-1">
              <svg viewBox="0 0 400 230" className="w-full h-full max-h-[185px]">
                {/* Blast furnace tower outline */}
                <path d="M 160 30 L 240 30 L 260 90 L 245 180 L 155 180 L 140 90 Z" fill="#334155" stroke="#f97316" strokeWidth="2.5" />
                
                {/* Temperature zones inside */}
                <path d="M 165 40 L 235 40 L 242 70 L 158 70 Z" fill="#7f1d1d" fillOpacity="0.6" />
                <text x="180" y="58" fill="#fca5a5" fontSize="9" fontWeight="bold">200 - 400 °C</text>

                <path d="M 158 70 L 242 70 L 255 120 L 145 120 Z" fill="#b91c1c" fillOpacity="0.8" />
                <text x="175" y="100" fill="#fef08a" fontSize="10" fontWeight="bold">800 - 1200 °C</text>

                <path d="M 145 120 L 255 120 L 248 175 L 152 175 Z" fill="#ea580c" />
                <text x="175" y="150" fill="#ffffff" fontSize="11" fontWeight="black">1600 - 1800 °C</text>

                {/* Hot air tuyeres (ugelli) */}
                <line x1="110" y1="165" x2="150" y2="165" stroke="#ef4444" strokeWidth="4" />
                <polygon points="145,160 155,165 145,170" fill="#ef4444" />
                <text x="60" y="160" fill="#fca5a5" fontSize="8.5" fontWeight="bold">Aria calda 1000°C</text>

                {/* Molten iron pool */}
                <ellipse cx="200" cy="172" rx="42" ry="6" fill="#f59e0b" />
                <text x="175" y="175" fill="#000000" fontSize="8" fontWeight="bold">Ghisa Fusa</text>

                {/* Top charging feed callout */}
                <g transform="translate(10, 20)">
                  <rect x="0" y="0" width="130" height="70" fill="#1e293b" rx="6" stroke="#f97316" strokeWidth="1" />
                  <text x="8" y="16" fill="#fed7aa" fontSize="9.5" fontWeight="bold">Carica dall'alto:</text>
                  <text x="8" y="32" fill="#cbd5e1" fontSize="8.5">• Minerale di ferro</text>
                  <text x="8" y="46" fill="#cbd5e1" fontSize="8.5">• Carbon Coke (combustibile)</text>
                  <text x="8" y="60" fill="#cbd5e1" fontSize="8.5">• Calcare (fondente)</text>
                </g>

                {/* Convertitore LD callout */}
                <g transform="translate(265, 110)">
                  <rect x="0" y="0" width="125" height="75" fill="#1e293b" rx="6" stroke="#38bdf8" strokeWidth="1" />
                  <text x="8" y="16" fill="#7dd3fc" fontSize="9.5" fontWeight="bold">Convertitore LD:</text>
                  <text x="8" y="32" fill="#e2e8f0" fontSize="8.5">Insufflaggio O₂ puro</text>
                  <text x="8" y="48" fill="#e2e8f0" fontSize="8.5">Carbonio &lt; 2,06%</text>
                  <text x="8" y="64" fill="#38bdf8" fontSize="9" fontWeight="black">➔ Acciaio Tenace</text>
                </g>
              </svg>
            </div>

            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[10px] text-orange-200 flex items-center justify-between">
              <span>{currentKeyConcept || 'Altoforno: dalla carica di minerale e coke alla decarburazione in acciaio'}</span>
              <span className="text-red-400 font-bold shrink-0">Ciclo Integrale</span>
            </div>
          </div>
        </div>
      );
    }

    // 4. Elettricità & Legge di Ohm
    if (videoId.includes('elettric') || title.toLowerCase().includes('ohm') || title.toLowerCase().includes('corrente')) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-950 via-slate-900 to-indigo-950 text-white select-none">
          <div className="w-full max-w-md aspect-[4/3] relative rounded-xl border border-yellow-500/40 bg-slate-900/90 p-3 shadow-inner flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-yellow-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" /> Circuito Elettrico & Legge di Ohm (V = I · R)
              </span>
              <span className="text-cyan-400 font-mono">230 Volt</span>
            </div>

            {/* Circuit diagram and formula triangle */}
            <div className="flex-1 flex items-center justify-center py-1">
              <svg viewBox="0 0 400 230" className="w-full h-full max-h-[185px]">
                {/* Circuit loop */}
                <rect x="50" y="30" width="200" height="150" fill="none" stroke="#eab308" strokeWidth="3" rx="10" />

                {/* Generator Battery (Left) */}
                <line x1="50" y1="90" x2="50" y2="120" stroke="#0f172a" strokeWidth="8" />
                <line x1="35" y1="95" x2="65" y2="95" stroke="#ef4444" strokeWidth="4" />
                <line x1="42" y1="110" x2="58" y2="110" stroke="#38bdf8" strokeWidth="3" />
                <text x="10" y="98" fill="#ef4444" fontSize="11" fontWeight="black">+</text>
                <text x="12" y="115" fill="#38bdf8" fontSize="12" fontWeight="black">-</text>
                <text x="8" y="140" fill="#facc15" fontSize="10" fontWeight="bold">Generatore V (Volt)</text>

                {/* Resistor (Right) */}
                <rect x="238" y="80" width="24" height="50" fill="#713f12" stroke="#facc15" strokeWidth="2" rx="3" />
                <text x="270" y="102" fill="#fde047" fontSize="10" fontWeight="bold">Resistore R</text>
                <text x="270" y="117" fill="#cbd5e1" fontSize="9">(Ohm - Ω)</text>

                {/* Ammeter in series (Top) */}
                <circle cx="150" cy="30" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="145" y="34" fill="#38bdf8" fontSize="11" fontWeight="black">A</text>
                <text x="125" y="18" fill="#38bdf8" fontSize="9" fontWeight="bold">Corrente I (Ampere)</text>

                {/* Electron flow arrows */}
                <circle cx="90" cy="30" r="3" fill="#67e8f9" />
                <circle cx="210" cy="30" r="3" fill="#67e8f9" />
                <circle cx="250" cy="150" r="3" fill="#67e8f9" />
                <circle cx="150" cy="180" r="3" fill="#67e8f9" />

                {/* Ohm's Law Triangle (Right) */}
                <g transform="translate(285, 25)">
                  <polygon points="50,15 5,85 95,85" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
                  <line x1="28" y1="50" x2="72" y2="50" stroke="#eab308" strokeWidth="2" />
                  <line x1="50" y1="50" x2="50" y2="85" stroke="#eab308" strokeWidth="2" />
                  
                  <text x="44" y="42" fill="#ef4444" fontSize="13" fontWeight="black">V</text>
                  <text x="25" y="73" fill="#38bdf8" fontSize="12" fontWeight="black">I</text>
                  <text x="63" y="73" fill="#facc15" fontSize="12" fontWeight="black">R</text>

                  <text x="10" y="110" fill="#e2e8f0" fontSize="9">V = I · R</text>
                  <text x="10" y="125" fill="#e2e8f0" fontSize="9">I = V / R</text>
                  <text x="10" y="140" fill="#e2e8f0" fontSize="9">R = V / I</text>
                </g>
              </svg>
            </div>

            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[10px] text-yellow-200 flex items-center justify-between">
              <span>{currentKeyConcept || 'Legge di Ohm: Tensione (Volt), Corrente (Ampere), Resistenza (Ohm)'}</span>
              <span className="text-yellow-400 font-bold shrink-0">Elettrotecnica</span>
            </div>
          </div>
        </div>
      );
    }

    // Default Generic / Energetico Visualizer
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white select-none">
        <div className="w-full max-w-md aspect-[4/3] relative rounded-xl border border-cyan-500/40 bg-slate-900/90 p-4 shadow-inner flex flex-col justify-between text-center">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Lezione Multimediale Interattiva
            </span>
            <span className="text-slate-400 font-mono">T = {Math.floor(currentSecond / 60)}:{(currentSecond % 60).toString().padStart(2, '0')}</span>
          </div>

          <div className="my-auto space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
              <Sun className="w-7 h-7 animate-pulse" />
            </div>
            <h4 className="font-extrabold text-base text-white">{title}</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto line-clamp-2">
              {currentKeyConcept || 'Spiegazione dei principi tecnologici e delle trasformazioni energetiche'}
            </p>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-xs text-cyan-200 flex items-center justify-between">
            <span className="truncate max-w-[280px]">Concetto: {currentKeyConcept || title}</span>
            <span className="text-emerald-400 font-bold text-[10px] shrink-0">Sincronizzato</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden relative group">
      {/* Visual Canvas Area */}
      <div className="w-full h-full flex-1">
        {renderVisualContent()}
      </div>

      {/* Floating Toolbar for Voice Synthesis & Direct YouTube Link */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-750 shadow-lg">
        <div className="flex items-center gap-2">
          {speechSupported && (
            <button
              onClick={handleToggleSpeech}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700'
              }`}
              title="Ascolta la spiegazione vocale della trascrizione"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Ferma Voce' : 'Ascolta Spiegazione'}</span>
            </button>
          )}

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {currentKeyConcept || 'Spiegazione del docente'}
          </span>
        </div>

        {youtubeId && (
          <button
            onClick={() => {
              const url = `https://www.youtube.com/watch?v=${youtubeId}&t=${currentSecond}s`;
              const win = window.open(url, '_blank');
              win?.focus();
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-slate-700"
            title="Apri questo punto su YouTube in una nuova scheda"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[11px]">YouTube ▶</span>
          </button>
        )}
      </div>
    </div>
  );
};
