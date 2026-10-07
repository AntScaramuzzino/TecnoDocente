import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  Ruler, 
  PenTool, 
  Eraser, 
  RotateCcw, 
  Download, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Check, 
  Grid, 
  Sparkles,
  Scissors
} from 'lucide-react';

interface ConstructionGuide {
  id: string;
  title: string;
  tool: string;
  pencil: string;
  difficulty: 'Base' | 'Intermedio' | 'Avanzato';
  steps: {
    title: string;
    description: string;
    toolAction: string;
    drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  }[];
}

const CONSTRUCTIONS: ConstructionGuide[] = [
  {
    id: 'squadratura',
    title: '1. Squadratura del Foglio F4',
    tool: 'Riga 50cm, Squadre e Compasso R=9cm',
    pencil: 'Matita 2H',
    difficulty: 'Base',
    steps: [
      {
        title: 'Passo 1: Tracciamento delle Diagonali',
        description: 'Con la riga e matita 2H molto leggera, traccia le due diagonali che collegano gli spigoli opposti del foglio, individuando il centro esatto O.',
        toolAction: 'Riga e matita 2H leggera',
        drawFn: (ctx, w, h) => {
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(30, 30);
          ctx.lineTo(w - 30, h - 30);
          ctx.moveTo(w - 30, 30);
          ctx.lineTo(30, h - 30);
          ctx.stroke();

          // Centro O
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = 'bold 12px "JetBrains Mono", monospace';
          ctx.fillText('O', w / 2 + 8, h / 2 - 8);
        }
      },
      {
        title: 'Passo 2: Archetti con il Compasso',
        description: 'Punta il compasso con apertura di 9 cm nel punto centrale O. Traccia 4 archetti intersecando le diagonali nei punti 1, 2, 3 e 4.',
        toolAction: 'Balaustrone con apertura fissa r = 90mm',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.38;
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(30, 30); ctx.lineTo(w - 30, h - 30);
          ctx.moveTo(w - 30, 30); ctx.lineTo(30, h - 30);
          ctx.stroke();

          // Archetti del compasso
          ctx.strokeStyle = '#818cf8';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();

          // Punti di intersezione
          const diagAngle = Math.atan2(h - 60, w - 60);
          const pts = [
            { x: cx - r * Math.cos(diagAngle), y: cy - r * Math.sin(diagAngle), label: '1' },
            { x: cx + r * Math.cos(diagAngle), y: cy - r * Math.sin(diagAngle), label: '2' },
            { x: cx + r * Math.cos(diagAngle), y: cy + r * Math.sin(diagAngle), label: '3' },
            { x: cx - r * Math.cos(diagAngle), y: cy + r * Math.sin(diagAngle), label: '4' },
          ];
          ctx.fillStyle = '#f59e0b';
          pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText(p.label, p.x + 6, p.y - 6);
          });
        }
      },
      {
        title: 'Passo 3: Archi dai 4 Punti per la Cornice',
        description: 'Puntando nei punti 1, 2, 3 e 4 con la stessa apertura, traccia gli archi verso i bordi superiore, inferiore e laterali.',
        toolAction: 'Compasso nei punti d\'intersezione',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.38;
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(30, 30); ctx.lineTo(w - 30, h - 30);
          ctx.moveTo(w - 30, 30); ctx.lineTo(30, h - 30);
          ctx.stroke();

          // Punti squadratura definitiva
          const marginX = cx - r * 0.88;
          const marginY = cy - r * 0.65;
          const rectW = r * 1.76;
          const rectH = r * 1.30;

          // Squadratura definitiva a tratto continuo marcato (HB)
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(marginX, marginY, rectW, rectH);

          // Assi mediani ortogonali
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(marginX, cy); ctx.lineTo(marginX + rectW, cy);
          ctx.moveTo(cx, marginY); ctx.lineTo(cx, marginY + rectH);
          ctx.stroke();
        }
      },
      {
        title: 'Passo 4: Cartiglio e Intestazione Finale',
        description: 'In basso a destra disegna il cartiglio di altezza 20-30 mm con le righe di intestazione: Nome, Classe, Data, Tavola n.',
        toolAction: 'Matita HB per la cornice, 2H per le righe guida del testo',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.38;
          const marginX = cx - r * 0.88;
          const marginY = cy - r * 0.65;
          const rectW = r * 1.76;
          const rectH = r * 1.30;

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(marginX, marginY, rectW, rectH);

          // Assi mediani
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(marginX, cy); ctx.lineTo(marginX + rectW, cy);
          ctx.moveTo(cx, marginY); ctx.lineTo(cx, marginY + rectH);
          ctx.stroke();

          // Cartiglio
          const cartW = 160, cartH = 34;
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(marginX + rectW - cartW, marginY + rectH - cartH, cartW, cartH);
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillText('SCUOLA SECONDARIA I GRADO', marginX + rectW - cartW + 6, marginY + rectH - cartH + 13);
          ctx.fillText('ALUNNO: ................... TAV: 1', marginX + rectW - cartW + 6, marginY + rectH - cartH + 26);
        }
      }
    ]
  },
  {
    id: 'esagono',
    title: '2. Esagono Regolare Dato il Raggio',
    tool: 'Compasso, Riga e Matita 2H/HB',
    pencil: '2H (costruzione) e HB (contorno)',
    difficulty: 'Intermedio',
    steps: [
      {
        title: 'Passo 1: Circonferenza e Diametro Orizzontale',
        description: 'Traccia la circonferenza di centro O e raggio r = 6 cm. Traccia il diametro orizzontale AB con le due squadre.',
        toolAction: 'Tracciare cerchio con apertura 60mm',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2, r = 110;
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();

          // Diametro
          ctx.beginPath();
          ctx.moveTo(cx - r - 20, cy);
          ctx.lineTo(cx + r + 20, cy);
          ctx.stroke();

          ctx.fillStyle = '#38bdf8';
          ctx.fillText('A', cx - r - 16, cy - 4);
          ctx.fillText('B', cx + r + 8, cy - 4);
          ctx.fillText('O', cx + 4, cy - 6);
        }
      },
      {
        title: 'Passo 2: Archi Centrati in A e in B',
        description: 'Mantenendo rigorosamente la stessa apertura del compasso r = 6 cm, punta in A e traccia un arco che passi per O, intersecando la circonferenza in C e D. Ripeti puntando in B, trovando E ed F.',
        toolAction: 'Puntare in A e B con medesimo raggio r',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2, r = 110;
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();

          // Arco da A
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx - r, cy, r, -Math.PI / 3, Math.PI / 3);
          ctx.stroke();

          // Arco da B
          ctx.strokeStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(cx + r, cy, r, (2 * Math.PI) / 3, (4 * Math.PI) / 3);
          ctx.stroke();

          // 6 Vertici
          const vertices = [
            { x: cx - r, y: cy, label: 'A' },
            { x: cx - r / 2, y: cy - r * Math.sin(Math.PI / 3), label: 'C' },
            { x: cx + r / 2, y: cy - r * Math.sin(Math.PI / 3), label: 'E' },
            { x: cx + r, y: cy, label: 'B' },
            { x: cx + r / 2, y: cy + r * Math.sin(Math.PI / 3), label: 'F' },
            { x: cx - r / 2, y: cy + r * Math.sin(Math.PI / 3), label: 'D' },
          ];
          ctx.fillStyle = '#38bdf8';
          vertices.forEach(v => {
            ctx.beginPath();
            ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText(v.label, v.x + 6, v.y - 6);
          });
        }
      },
      {
        title: 'Passo 3: Unione dei 6 Vertici con Matita HB',
        description: 'Unisci in senso orario i sei punti individuati sulla circonferenza (A, C, E, B, F, D). Ripassa con matita HB a tratto continuo forte marcato.',
        toolAction: 'Riga e matita HB per il perimetro',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2, r = 110;
          const vertices = [
            { x: cx - r, y: cy },
            { x: cx - r / 2, y: cy - r * Math.sin(Math.PI / 3) },
            { x: cx + r / 2, y: cy - r * Math.sin(Math.PI / 3) },
            { x: cx + r, y: cy },
            { x: cx + r / 2, y: cy + r * Math.sin(Math.PI / 3) },
            { x: cx - r / 2, y: cy + r * Math.sin(Math.PI / 3) },
          ];

          // Sfondo colorato didattico
          ctx.fillStyle = 'rgba(13, 148, 136, 0.2)';
          ctx.beginPath();
          vertices.forEach((v, i) => {
            if (i === 0) ctx.moveTo(v.x, v.y);
            else ctx.lineTo(v.x, v.y);
          });
          ctx.closePath();
          ctx.fill();

          // Contorno HB
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Circonferenza sottile ausiliaria
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    ]
  },
  {
    id: 'asse_segmento',
    title: '3. Asse di un Segmento AB',
    tool: 'Balaustrone / Compasso e Riga',
    pencil: '2H per archi, HB per la retta asse',
    difficulty: 'Base',
    steps: [
      {
        title: 'Passo 1: Tracciare il segmento AB',
        description: 'Traccia un segmento orizzontale AB di lunghezza desiderata (es. 10 cm) con matita 2H.',
        toolAction: 'Tracciare il segmento base',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx - 120, cy);
          ctx.lineTo(cx + 120, cy);
          ctx.stroke();

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(cx - 120, cy, 4, 0, Math.PI * 2);
          ctx.arc(cx + 120, cy, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillText('A', cx - 135, cy - 8);
          ctx.fillText('B', cx + 125, cy - 8);
        }
      },
      {
        title: 'Passo 2: Archi di cerchio con raggio > AB/2',
        description: 'Puntando prima in A e poi in B con apertura maggiore della metà del segmento, traccia due archi che si intersecano in 1 (sopra) e in 2 (sotto).',
        toolAction: 'Compasso puntato in A e in B',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2, r = 140;
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - 120, cy); ctx.lineTo(cx + 120, cy);
          ctx.stroke();

          // Archi da A
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx - 120, cy, r, -Math.PI / 4, Math.PI / 4);
          ctx.stroke();

          // Archi da B
          ctx.strokeStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(cx + 120, cy, r, (3 * Math.PI) / 4, (5 * Math.PI) / 4);
          ctx.stroke();

          // Punti 1 e 2
          ctx.fillStyle = '#38bdf8';
          const dy = Math.sqrt(r * r - 120 * 120);
          ctx.fillText('1', cx + 8, cy - dy - 6);
          ctx.fillText('2', cx + 8, cy + dy + 14);
        }
      },
      {
        title: 'Passo 3: Tracciamento dell\'Asse Perpendicolare',
        description: 'Con la riga unisci i due punti di intersezione 1 e 2. La retta tracciata è perpendicolare ad AB e passa esattamente per il punto medio M.',
        toolAction: 'Riga e matita HB per l\'asse',
        drawFn: (ctx, w, h) => {
          const cx = w / 2, cy = h / 2;
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - 120, cy); ctx.lineTo(cx + 120, cy);
          ctx.stroke();

          // Asse perpendicolare marcato
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy - 130);
          ctx.lineTo(cx, cy + 130);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.fillText('M', cx + 6, cy + 16);
          ctx.fillText('Asse (90°)', cx + 8, cy - 110);
        }
      }
    ]
  }
];

export const TechnicalDrawingLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guida' | 'lavagna'>('guida');
  const [selectedConstId, setSelectedConstId] = useState<string>('squadratura');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  // Free drawing canvas states
  const [activeTool, setActiveTool] = useState<'2h' | 'hb' | 'line' | 'circle' | 'eraser'>('hb');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);

  const activeConstruction = CONSTRUCTIONS.find(c => c.id === selectedConstId) || CONSTRUCTIONS[0];

  // Render guide canvas
  useEffect(() => {
    if (activeTab !== 'guida') return;
    const canvas = guideCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Draw dark sheet background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Optional subtle grid
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
    ctx.lineWidth = 0.5;
    const step = 20;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Call current step draw function
    const curStep = activeConstruction.steps[currentStepIdx];
    if (curStep) {
      curStep.drawFn(ctx, w, h);
    }
  }, [activeTab, selectedConstId, currentStepIdx]);

  // Handle free drawing canvas pointer events
  const getCanvasCoords = (e: React.PointerEvent) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDownFree = (e: React.PointerEvent) => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    startPointRef.current = coords;
    snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveFree = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);

    if (activeTool === '2h') {
      ctx.strokeStyle = '#94a3b8'; // grey light
      ctx.lineWidth = 1;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (activeTool === 'hb') {
      ctx.strokeStyle = '#ffffff'; // white bold
      ctx.lineWidth = 2.5;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (activeTool === 'eraser') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 18;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (activeTool === 'line') {
      if (snapshotRef.current && startPointRef.current) {
        ctx.putImageData(snapshotRef.current, 0, 0);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startPointRef.current.x, startPointRef.current.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    } else if (activeTool === 'circle') {
      if (snapshotRef.current && startPointRef.current) {
        ctx.putImageData(snapshotRef.current, 0, 0);
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 1.5;
        const dx = coords.x - startPointRef.current.x;
        const dy = coords.y - startPointRef.current.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(startPointRef.current.x, startPointRef.current.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  const handlePointerUpFree = (e: React.PointerEvent) => {
    setIsDrawing(false);
    startPointRef.current = null;
    snapshotRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const clearFreeCanvas = () => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvasImage = () => {
    const canvas = activeTab === 'guida' ? guideCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `tavola_disegno_${selectedConstId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Tab bar header */}
      <div className="bg-slate-800/90 backdrop-blur-md px-4 py-3 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Laboratorio di Disegno Tecnico</h2>
            <p className="text-xs text-slate-400">
              Costruzioni geometriche passo-passo con strumenti virtuali (riga, squadre, compasso)
            </p>
          </div>
        </div>

        {/* View Switcher: Guida Guidata vs Lavagna Libera */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('guida')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
              activeTab === 'guida'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Costruzioni Guidate
          </button>
          <button
            onClick={() => setActiveTab('lavagna')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
              activeTab === 'lavagna'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Foglio Disegno Libero
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {activeTab === 'guida' ? (
          <>
            {/* Guide Canvas */}
            <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
              <canvas
                ref={guideCanvasRef}
                className="w-full h-full block"
              />

              {/* Step Control Floating Bar (Bottom) */}
              <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 shadow-2xl flex items-center justify-between gap-3">
                <button
                  disabled={currentStepIdx === 0}
                  onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-700 hover:bg-slate-700 text-xs font-bold flex items-center gap-1 min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" /> Passo Precedente
                </button>

                <div className="flex items-center gap-1.5">
                  {activeConstruction.steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStepIdx(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        currentStepIdx === idx
                          ? 'bg-teal-500 text-slate-950 shadow-md scale-110'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentStepIdx === activeConstruction.steps.length - 1}
                  onClick={() => setCurrentStepIdx(prev => Math.min(activeConstruction.steps.length - 1, prev + 1))}
                  className="px-3 py-2 rounded-xl bg-teal-500 disabled:opacity-40 text-slate-950 font-bold hover:bg-teal-400 text-xs flex items-center gap-1 min-h-[44px]"
                >
                  Passo Successivo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Guide Sidebar */}
            <div className="w-full md:w-80 lg:w-96 bg-slate-800/80 border-t md:border-t-0 md:border-l border-slate-700 p-4 flex flex-col gap-4 overflow-y-auto max-h-[45vh] md:max-h-full">
              {/* Construction Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Seleziona Costruzione
                </label>
                <div className="space-y-1.5">
                  {CONSTRUCTIONS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedConstId(c.id);
                        setCurrentStepIdx(0);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                        selectedConstId === c.id
                          ? 'bg-teal-950/60 text-teal-300 border-teal-600 font-bold'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-750'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{c.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {c.difficulty}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{c.tool}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Detail Card */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                    Fase {currentStepIdx + 1} di {activeConstruction.steps.length}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-900/40">
                    {activeConstruction.steps[currentStepIdx]?.toolAction}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1.5">
                  {activeConstruction.steps[currentStepIdx]?.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeConstruction.steps[currentStepIdx]?.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Matita richiesta:</span>
                  <span className="font-bold text-slate-200">{activeConstruction.pencil}</span>
                </div>
              </div>

              {/* Download Plate Button */}
              <button
                onClick={downloadCanvasImage}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-750 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Download className="w-4 h-4 text-teal-400" />
                Scarica Tavola Risolutiva (PNG)
              </button>
            </div>
          </>
        ) : (
          /* Free Drawing Workspace on Tablet */
          <div className="flex-1 flex flex-col h-full bg-slate-950">
            {/* Drawing Toolbar */}
            <div className="bg-slate-800/70 px-4 py-2 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTool('2h')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 min-h-[40px] border ${
                    activeTool === '2h' ? 'bg-slate-700 text-cyan-300 border-cyan-400' : 'bg-slate-850 text-slate-300 border-slate-700'
                  }`}
                  title="Matita 2H fine (linee di costruzione)"
                >
                  <PenTool className="w-3.5 h-3.5 text-slate-400" />
                  Matita 2H (Sottile)
                </button>
                <button
                  onClick={() => setActiveTool('hb')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 min-h-[40px] border ${
                    activeTool === 'hb' ? 'bg-slate-700 text-cyan-300 border-cyan-400' : 'bg-slate-850 text-slate-300 border-slate-700'
                  }`}
                  title="Matita HB marcata (spigoli in vista)"
                >
                  <PenTool className="w-3.5 h-3.5 text-white" />
                  Matita HB (Marcata)
                </button>
                <button
                  onClick={() => setActiveTool('line')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 min-h-[40px] border ${
                    activeTool === 'line' ? 'bg-slate-700 text-cyan-300 border-cyan-400' : 'bg-slate-850 text-slate-300 border-slate-700'
                  }`}
                  title="Traccia linea retta con riga"
                >
                  <Ruler className="w-3.5 h-3.5 text-sky-400" />
                  Riga (Retta)
                </button>
                <button
                  onClick={() => setActiveTool('circle')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 min-h-[40px] border ${
                    activeTool === 'circle' ? 'bg-slate-700 text-cyan-300 border-cyan-400' : 'bg-slate-850 text-slate-300 border-slate-700'
                  }`}
                  title="Compasso per cerchio o arco"
                >
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  Compasso
                </button>
                <button
                  onClick={() => setActiveTool('eraser')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 min-h-[40px] border ${
                    activeTool === 'eraser' ? 'bg-slate-700 text-amber-300 border-amber-400' : 'bg-slate-850 text-slate-300 border-slate-700'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" />
                  Gomma
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearFreeCanvas}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-rose-300 border border-slate-700 flex items-center gap-1 min-h-[40px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Cancella
                </button>
                <button
                  onClick={downloadCanvasImage}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-bold flex items-center gap-1 min-h-[40px]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Salva Disegno
                </button>
              </div>
            </div>

            {/* Drawing Canvas Area */}
            <div className="flex-1 relative overflow-hidden touch-none">
              <canvas
                ref={drawingCanvasRef}
                onPointerDown={handlePointerDownFree}
                onPointerMove={handlePointerMoveFree}
                onPointerUp={handlePointerUpFree}
                className="w-full h-full block cursor-crosshair"
              />
              <div className="absolute top-3 right-3 bg-slate-900/80 px-2.5 py-1 rounded text-[11px] text-slate-400 border border-slate-800 pointer-events-none">
                Usa lo stilo o il dito per tracciare
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
