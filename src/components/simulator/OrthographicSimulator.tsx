import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Box, 
  Compass, 
  HelpCircle, 
  CheckCircle2, 
  RefreshCw, 
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

export type SolidType = 'parallelepipedo' | 'piramide' | 'solido_l' | 'prisma_triangolare' | 'cilindro';

interface SolidOption {
  id: SolidType;
  name: string;
  description: string;
  year: string;
}

const SOLIDS: SolidOption[] = [
  { id: 'parallelepipedo', name: 'Parallelepipedo retto', description: 'Solido semplice poggiato su base (facile)', year: '1ª-2ª Media' },
  { id: 'piramide', name: 'Piramide a base quadrata', description: 'Spigoli convergenti nel vertice V (medio)', year: '2ª Media' },
  { id: 'solido_l', name: 'Solido a "L" (composto)', description: 'Gradino con spigolo parzialmente nascosto', year: '2ª-3ª Media' },
  { id: 'prisma_triangolare', name: 'Prisma a base triangolare', description: 'Base perpendicolare al PO', year: '2ª Media' },
  { id: 'cilindro', name: 'Cilindro retto', description: 'Superficie curva e base circolare', year: '2ª-3ª Media' },
];

export const OrthographicSimulator: React.FC = () => {
  const [selectedSolid, setSelectedSolid] = useState<SolidType>('parallelepipedo');
  const [unfoldProgress, setUnfoldProgress] = useState<number>(0); // 0 = 3D Diedro chiuso, 100 = 2D Foglio aperto
  const [showProjectionRays, setShowProjectionRays] = useState<boolean>(true);
  const [showVertexLabels, setShowVertexLabels] = useState<boolean>(true);
  const [showHiddenEdges, setShowHiddenEdges] = useState<boolean>(true);
  const [colorCodedFaces, setColorCodedFaces] = useState<boolean>(true);
  const [rotationAngleX, setRotationAngleX] = useState<number>(22);
  const [rotationAngleY, setRotationAngleY] = useState<number>(-35);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [quizModeActive, setQuizModeActive] = useState<boolean>(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Quick preset views
  const setPresetView = (view: '3d' | 'top_po' | 'front_pv' | 'side_pl' | 'flat_2d') => {
    if (view === 'flat_2d') {
      setUnfoldProgress(100);
      setRotationAngleX(0);
      setRotationAngleY(0);
    } else if (view === '3d') {
      setUnfoldProgress(0);
      setRotationAngleX(22);
      setRotationAngleY(-35);
    } else if (view === 'top_po') {
      setUnfoldProgress(0);
      setRotationAngleX(90);
      setRotationAngleY(0);
    } else if (view === 'front_pv') {
      setUnfoldProgress(0);
      setRotationAngleX(0);
      setRotationAngleY(0);
    } else if (view === 'side_pl') {
      setUnfoldProgress(0);
      setRotationAngleX(0);
      setRotationAngleY(90);
    }
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI display
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const u = unfoldProgress / 100; // 0 to 1

    // If unfoldProgress is very close to 100%, render pure 2D Technical Drawing sheet
    if (u > 0.95) {
      render2DTechnicalSheet(ctx, width, height, selectedSolid, showVertexLabels, showHiddenEdges, colorCodedFaces, quizModeActive && quizAnswerChecked);
    } else {
      render3DDiedroSpace(ctx, centerX, centerY, width, height, selectedSolid, u, rotationAngleX, rotationAngleY, zoomLevel, showProjectionRays, showVertexLabels, showHiddenEdges, colorCodedFaces);
    }
  }, [selectedSolid, unfoldProgress, rotationAngleX, rotationAngleY, zoomLevel, showProjectionRays, showVertexLabels, showHiddenEdges, colorCodedFaces, quizModeActive, quizAnswerChecked]);

  // Touch & Mouse handlers for 3D rotation on tablet
  const handlePointerDown = (e: React.PointerEvent) => {
    if (unfoldProgress > 90) return; // In 2D sheet, dragging view is disabled
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || unfoldProgress > 90) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    setRotationAngleY(prev => prev + deltaX * 0.7);
    setRotationAngleX(prev => Math.max(-85, Math.min(85, prev - deltaY * 0.7)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Banner / Tablet Header */}
      <div className="bg-slate-800/90 backdrop-blur-md px-4 py-3 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Box className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white tracking-wide">Simulatore Proiezioni Ortogonali</h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                Metodo di Monge
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Visualizzatore 3D interattivo dello spazio diedrico con animazione del ribaltamento su foglio 2D
            </p>
          </div>
        </div>

        {/* Solid Selector Buttons (Touch friendly > 44px) */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          {SOLIDS.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSolid(s.id);
                setQuizAnswerChecked(false);
                setQuizSelectedOption(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 touch-manipulation min-h-[40px] ${
                selectedSolid === s.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold scale-[1.02]'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workspace Area */}
      <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden touch-none">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
          />

          {/* Touch-Friendly Unfold Slider & Mode Switcher Bar (Bottom Overlay) */}
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 pointer-events-none flex flex-col gap-2">
            <div className="bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Slider Diedro -> Foglio */}
              <div className="flex-1 w-full flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Box className="w-3.5 h-3.5 text-cyan-400" />
                  3D Diedro
                </span>
                <div className="flex-1 relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={unfoldProgress}
                    onChange={e => setUnfoldProgress(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div 
                    className="absolute -top-6 text-[11px] font-bold text-cyan-300 pointer-events-none transform -translate-x-1/2 bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                    style={{ left: `${unfoldProgress}%` }}
                  >
                    {unfoldProgress === 0 ? 'Diedro Chiuso 3D' : unfoldProgress === 100 ? 'Foglio 2D Norme UNI' : `Apertura ${unfoldProgress}%`}
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Foglio 2D
                </span>
              </div>

              {/* Quick View Tap Buttons */}
              <div className="flex items-center gap-1.5 w-full md:w-auto justify-end">
                <button
                  onClick={() => setPresetView('3d')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    unfoldProgress === 0 && rotationAngleX === 22 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Vista Assonometrica 3D"
                >
                  Vista 3D
                </button>
                <button
                  onClick={() => setPresetView('top_po')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700"
                  title="Dall'alto su Piano Orizzontale"
                >
                  PO (Alto)
                </button>
                <button
                  onClick={() => setPresetView('front_pv')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-sky-300 border border-slate-700 hover:bg-slate-700"
                  title="Frontale su Piano Verticale"
                >
                  PV (Fronte)
                </button>
                <button
                  onClick={() => setPresetView('side_pl')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-emerald-300 border border-slate-700 hover:bg-slate-700"
                  title="Laterale da sinistra su Piano Laterale"
                >
                  PL (Fianco)
                </button>
                <button
                  onClick={() => setPresetView('flat_2d')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    unfoldProgress === 100 ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30' : 'bg-slate-800 text-indigo-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Apertura totale a foglio da disegno 2D"
                >
                  Foglio 2D
                </button>
              </div>
            </div>
          </div>

          {/* Quick HUD badge in top-left */}
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs flex items-center gap-2 text-slate-300 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              {unfoldProgress > 90 ? 'Modalità Foglio 2D (Tavola Grafica)' : 'Trascina col dito per ruotare lo spazio 3D'}
            </span>
          </div>
        </div>

        {/* Right-Hand Control & Didactic Panel (Designed for Stylus/Thumb navigation on tablet) */}
        <div className="w-full md:w-80 lg:w-96 bg-slate-800/80 border-t md:border-t-0 md:border-l border-slate-700/80 p-4 flex flex-col gap-4 overflow-y-auto max-h-[45vh] md:max-h-full">
          {/* Solid Information Card */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Solido attivo</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {SOLIDS.find(s => s.id === selectedSolid)?.year}
              </span>
            </div>
            <h3 className="font-bold text-white text-base">
              {SOLIDS.find(s => s.id === selectedSolid)?.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {SOLIDS.find(s => s.id === selectedSolid)?.description}
            </p>

            {/* Color Legend */}
            <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-slate-800 text-center text-[11px]">
              <div className="bg-amber-950/40 border border-amber-800/50 rounded-lg p-1 text-amber-300 font-medium">
                P.O. (Pianta)
                <div className="text-[10px] text-slate-400">Dall'alto</div>
              </div>
              <div className="bg-sky-950/40 border border-sky-800/50 rounded-lg p-1 text-sky-300 font-medium">
                P.V. (Prospetto)
                <div className="text-[10px] text-slate-400">Di fronte</div>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-lg p-1 text-emerald-300 font-medium">
                P.L. (Fianco)
                <div className="text-[10px] text-slate-400">Da sinistra</div>
              </div>
            </div>
          </div>

          {/* Teacher Didactic Toggles */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700 flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Opzioni Didattiche LIM
            </h4>

            <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer py-1 hover:text-white">
              <span>Raggi di Proiezione (linee di richiamo)</span>
              <input
                type="checkbox"
                checked={showProjectionRays}
                onChange={e => setShowProjectionRays(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer py-1 hover:text-white">
              <span>Lettere Vertici (A, B, C, V)</span>
              <input
                type="checkbox"
                checked={showVertexLabels}
                onChange={e => setShowVertexLabels(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer py-1 hover:text-white">
              <span>Spigoli Nascosti (tratteggio UNI)</span>
              <input
                type="checkbox"
                checked={showHiddenEdges}
                onChange={e => setShowHiddenEdges(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer py-1 hover:text-white">
              <span>Colora facce didattiche</span>
              <input
                type="checkbox"
                checked={colorCodedFaces}
                onChange={e => setColorCodedFaces(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-800 border-slate-700"
              />
            </label>
          </div>

          {/* Interactive Classroom Spot-Check Challenge */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-indigo-900/60 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                <HelpCircle className="w-3.5 h-3.5" />
                Domanda Rapida per la Classe
              </h4>
              <button
                onClick={() => {
                  setQuizModeActive(!quizModeActive);
                  setQuizAnswerChecked(false);
                  setQuizSelectedOption(null);
                }}
                className={`text-[11px] px-2 py-0.5 rounded font-semibold transition-colors ${
                  quizModeActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-300 hover:bg-slate-700'
                }`}
              >
                {quizModeActive ? 'Attiva' : 'Avvia Quesito'}
              </button>
            </div>

            {quizModeActive ? (
              <div className="space-y-2 mt-1">
                <p className="text-xs text-slate-200 font-medium">
                  Osservando il solido selezionato ({SOLIDS.find(s => s.id === selectedSolid)?.name}):
                  <span className="block mt-1 text-cyan-300">
                    "Quale figura geometrica si ottiene proiettando ortogonalmente sul Piano Verticale (PV)?"
                  </span>
                </p>

                <div className="space-y-1.5 mt-2">
                  {getQuizOptionsForSolid(selectedSolid).map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuizSelectedOption(idx)}
                      disabled={quizAnswerChecked}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-all border ${
                        quizSelectedOption === idx
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-semibold'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                      } ${
                        quizAnswerChecked && idx === getCorrectQuizOption(selectedSolid)
                          ? '!bg-emerald-900/50 !text-emerald-300 !border-emerald-500 font-bold'
                          : ''
                      } ${
                        quizAnswerChecked && quizSelectedOption === idx && idx !== getCorrectQuizOption(selectedSolid)
                          ? '!bg-red-900/50 !text-red-300 !border-red-500'
                          : ''
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!quizAnswerChecked ? (
                  <button
                    disabled={quizSelectedOption === null}
                    onClick={() => setQuizAnswerChecked(true)}
                    className="w-full mt-2 py-2 rounded-lg bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs hover:bg-indigo-500 transition-colors shadow"
                  >
                    Verifica Risposta con la Classe
                  </button>
                ) : (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {quizSelectedOption === getCorrectQuizOption(selectedSolid) ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Risposta Esatta!
                        </span>
                      ) : (
                        <span className="text-red-400">Riprova con la classe</span>
                      )}
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {getExplanationForSolid(selectedSolid)}
                    </p>
                    <button
                      onClick={() => {
                        setQuizAnswerChecked(false);
                        setQuizSelectedOption(null);
                      }}
                      className="mt-2 text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Prova un'altra volta
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400 leading-relaxed">
                Premi "Avvia Quesito" per mostrare alla classe un quiz visivo di verifica istantanea durante la lezione frontale.
              </p>
            )}
          </div>

          {/* Quick Guide Card */}
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">Norme UNI per la tavola:</strong> spigoli in vista a tratto forte continuo (HB), spigoli nascosti a tratteggio medio, linee di proiezione e archi di ribaltamento a tratto fine continuo (2H).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Quiz generator functions for the spot check
function getQuizOptionsForSolid(solid: SolidType): string[] {
  switch (solid) {
    case 'piramide':
      return [
        'Un triangolo isoscele con vertice V in alto',
        'Un quadrato con le diagonali',
        'Un cerchio con il raggio',
        'Un rettangolo diviso in due'
      ];
    case 'parallelepipedo':
      return [
        'Un cerchio con centro O',
        'Un rettangolo di larghezza pari alla base e altezza pari all\'altezza del solido',
        'Un quadrato con diagonali',
        'Un triangolo equilatero'
      ];
    case 'solido_l':
      return [
        'Un profilo a scala sagomato a "L" continuo',
        'Due quadrati separati',
        'Un unico grande cerchio',
        'Un triangolo rettangolo'
      ];
    case 'cilindro':
      return [
        'Un cerchio perfetto con raggio R',
        'Un rettangolo con larghezza pari al diametro',
        'Una linea curva ad arco',
        'Un esagono'
      ];
    case 'prisma_triangolare':
      return [
        'Un rettangolo con spigolo centrale in vista a tratto continuo',
        'Un cerchio inscritto',
        'Un trapezio isoscele',
        'Una retta orizzontale singola'
      ];
  }
}

function getCorrectQuizOption(solid: SolidType): number {
  switch (solid) {
    case 'piramide': return 0;
    case 'parallelepipedo': return 1;
    case 'solido_l': return 0;
    case 'cilindro': return 1;
    case 'prisma_triangolare': return 0;
  }
}

function getExplanationForSolid(solid: SolidType): string {
  switch (solid) {
    case 'piramide':
      return 'Guardando di fronte (PV), la piramide retta a base quadrata si proietta come un triangolo isoscele con altezza h e base uguale al lato di base.';
    case 'parallelepipedo':
      return 'Sul PV (vista frontale), il parallelepipedo poggia sulla base orizzontale e si manifesta come una superficie rettangolare.';
    case 'solido_l':
      return 'Sul PV si osserva la sagoma frontale caratteristica a "L", formata dal gradino inferiore e dal corpo verticale.';
    case 'cilindro':
      return 'Sul PV la superficie curva del cilindro si proietta ortogonalmente come un rettangolo di dimensioni diametro × altezza.';
    case 'prisma_triangolare':
      return 'Sul PV le tre facce verticali del prisma si proiettano come rettangoli adiacenti, con lo spigolo centrale ben visibile a tratto forte.';
  }
}

// -------------------------------------------------------------------------
// 3D DIEDRO SPACE RENDERING ENGINE (Pure Canvas Math & Projection)
// -------------------------------------------------------------------------
function render3DDiedroSpace(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  solid: SolidType,
  unfoldProgress: number, // 0 to 1
  rotXDeg: number,
  rotYDeg: number,
  zoom: number,
  showRays: boolean,
  showLabels: boolean,
  showHidden: boolean,
  colorFaces: boolean
) {
  const radX = (rotXDeg * Math.PI) / 180;
  const radY = (rotYDeg * Math.PI) / 180;

  // 3D projection helper
  const scale = Math.min(w, h) * 0.42 * zoom;

  // Coordinate system:
  // X: along ground toward right/PL
  // Y: vertical up toward PV
  // Z: toward viewer / depth on PO
  const project3D = (x: number, y: number, z: number): { x: number; y: number; depth: number } => {
    // Rotation around Y (horizontal)
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    // Rotation around X (vertical pitch)
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // Perspective / Isometric projection
    const px = cx + x1 * scale;
    const py = cy - y2 * scale; // Canvas Y goes downwards

    return { x: px, y: py, depth: z2 };
  };

  // --- DRAWING THE 3 PLANES (PV, PO, PL) WITH UNFOLD TRANSFORMATION ---
  // PV: in X >= 0, Y >= 0, Z = 0
  // PO: in X >= 0, Y = 0, Z >= 0 (rotates down around X axis when unfolding!)
  // PL: in X = 0, Y >= 0, Z >= 0 (rotates right around Y axis when unfolding!)
  const planeSize = 0.85;

  // Unfolding angle: PO tilts down by 90deg * u; PL unfolds right by 90deg * u
  const poAngle = (unfoldProgress * Math.PI) / 2;
  const plAngle = (unfoldProgress * Math.PI) / 2;

  // --- 1. PV (Piano Verticale) --- Fixed at back
  const pv0 = project3D(0, 0, 0);
  const pvX = project3D(planeSize, 0, 0);
  const pvXY = project3D(planeSize, planeSize, 0);
  const pvY = project3D(0, planeSize, 0);

  ctx.fillStyle = 'rgba(14, 116, 144, 0.15)'; // cyan/sky tint
  ctx.beginPath();
  ctx.moveTo(pv0.x, pv0.y);
  ctx.lineTo(pvX.x, pvX.y);
  ctx.lineTo(pvXY.x, pvXY.y);
  ctx.lineTo(pvY.x, pvY.y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // PV Label
  const pvLabelPos = project3D(planeSize * 0.15, planeSize * 0.85, 0);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('P.V. (Piano Verticale)', pvLabelPos.x, pvLabelPos.y);

  // --- 2. PO (Piano Orizzontale) --- Rotates around X axis (Z=0, Y=0) downwards!
  // Normal PO is at y = 0, z from 0 to planeSize
  // When rotated by poAngle:
  // z' = z * cos(poAngle)
  // y' = - z * sin(poAngle)
  const poPt = (z: number, x: number) => {
    const yR = -z * Math.sin(poAngle);
    const zR = z * Math.cos(poAngle);
    return project3D(x, yR, zR);
  };

  const po0 = poPt(0, 0);
  const poX = poPt(0, planeSize);
  const poXZ = poPt(planeSize, planeSize);
  const poZ = poPt(planeSize, 0);

  ctx.fillStyle = 'rgba(217, 119, 6, 0.12)'; // amber tint
  ctx.beginPath();
  ctx.moveTo(po0.x, po0.y);
  ctx.lineTo(poX.x, poX.y);
  ctx.lineTo(poXZ.x, poXZ.y);
  ctx.lineTo(poZ.x, poZ.y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const poLabelPos = poPt(planeSize * 0.8, planeSize * 0.15);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('P.O. (Piano Orizzontale)', poLabelPos.x, poLabelPos.y);

  // --- 3. PL (Piano Laterale) --- Rotates around Y axis (X=0, Y>=0)
  // Normal PL is at x = 0, z from 0 to planeSize
  // When rotated by plAngle:
  // x' = - z * sin(plAngle)
  // z' = z * cos(plAngle)
  const plPt = (z: number, y: number) => {
    const xR = -z * Math.sin(plAngle);
    const zR = z * Math.cos(plAngle);
    return project3D(xR, y, zR);
  };

  const pl0 = plPt(0, 0);
  const plY = plPt(0, planeSize);
  const plYZ = plPt(planeSize, planeSize);
  const plZ = plPt(planeSize, 0);

  ctx.fillStyle = 'rgba(16, 185, 129, 0.12)'; // emerald tint
  ctx.beginPath();
  ctx.moveTo(pl0.x, pl0.y);
  ctx.lineTo(plY.x, plY.y);
  ctx.lineTo(plYZ.x, plYZ.y);
  ctx.lineTo(plZ.x, plZ.y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const plLabelPos = plPt(planeSize * 0.8, planeSize * 0.85);
  ctx.fillStyle = '#34d399';
  ctx.fillText('P.L. (Piano Laterale)', plLabelPos.x, plLabelPos.y);

  // Linea di Terra (LT) & Origin
  const ltStart = project3D(-0.2, 0, 0);
  const ltEnd = project3D(planeSize * 1.15, 0, 0);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(ltStart.x, ltStart.y);
  ctx.lineTo(ltEnd.x, ltEnd.y);
  ctx.stroke();

  const ltLabel = project3D(planeSize * 1.05, -0.05, 0);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('L.T. (Linea di Terra)', ltLabel.x, ltLabel.y);

  // --- DRAW SOLID VERTICES & FACES IN 3D SPACE ---
  const solidData = getSolidGeometry(solid);
  const { vertices, edges, faces } = solidData;

  // Project solid vertices
  const projVertices = vertices.map(v => project3D(v.x, v.y, v.z));

  // Draw Projection Rays to PV, PO, PL
  if (showRays) {
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    vertices.forEach(v => {
      const pSolid = project3D(v.x, v.y, v.z);

      // Ray to PV (z -> 0)
      const pPV = project3D(v.x, v.y, 0);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.beginPath();
      ctx.moveTo(pSolid.x, pSolid.y);
      ctx.lineTo(pPV.x, pPV.y);
      ctx.stroke();

      // Ray to PO (y -> 0 on rotated plane)
      const pPO = poPt(v.z, v.x);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
      ctx.beginPath();
      ctx.moveTo(pSolid.x, pSolid.y);
      ctx.lineTo(pPO.x, pPO.y);
      ctx.stroke();

      // Ray to PL (x -> 0 on rotated plane)
      const pPL = plPt(v.z, v.y);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)';
      ctx.beginPath();
      ctx.moveTo(pSolid.x, pSolid.y);
      ctx.lineTo(pPL.x, pPL.y);
      ctx.stroke();
    });

    ctx.setLineDash([]);
  }

  // Draw Faces with depth sorting
  const sortedFaces = faces.map((face, index) => {
    let avgDepth = 0;
    face.indices.forEach(idx => {
      avgDepth += projVertices[idx].depth;
    });
    avgDepth /= face.indices.length;
    return { ...face, avgDepth, index };
  }).sort((a, b) => a.avgDepth - b.avgDepth);

  sortedFaces.forEach(face => {
    ctx.beginPath();
    face.indices.forEach((vIdx, i) => {
      const pt = projVertices[vIdx];
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();

    if (colorFaces) {
      ctx.fillStyle = face.color || 'rgba(99, 102, 241, 0.35)';
    } else {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
    }
    ctx.fill();
  });

  // Draw Edges (Continuous thick line for visible, dashed for hidden)
  ctx.lineWidth = 2.5;
  edges.forEach(edge => {
    const p1 = projVertices[edge.from];
    const p2 = projVertices[edge.to];

    if (edge.hidden && showHidden) {
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = '#94a3b8';
    } else {
      ctx.setLineDash([]);
      ctx.strokeStyle = '#ffffff';
    }

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // Vertex labels
  if (showLabels) {
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    vertices.forEach((v, idx) => {
      const pt = projVertices[idx];
      ctx.fillText(v.name, pt.x + 5, pt.y - 5);
    });
  }
}

// -------------------------------------------------------------------------
// 2D TECHNICAL SHEET RENDERING ENGINE (Pure Italian UNI Technical Drawing)
// -------------------------------------------------------------------------
function render2DTechnicalSheet(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  solid: SolidType,
  showLabels: boolean,
  showHidden: boolean,
  colorFaces: boolean,
  highlightSolution: boolean
) {
  // Border of technical drawing sheet (Squadratura F4 standard)
  const margin = 24;
  const sheetW = w - margin * 2;
  const sheetH = h - margin * 2;
  const cx = margin + sheetW / 2;
  const cy = margin + sheetH / 2;

  // White drawing paper background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  // Outer Sheet Border (Squadratura esterna)
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.strokeRect(margin, margin, sheetW, sheetH);

  // Cartiglio in basso a destra
  const cartiglioW = 200;
  const cartiglioH = 34;
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(margin + sheetW - cartiglioW, margin + sheetH - cartiglioH, cartiglioW, cartiglioH);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.fillText('DIS. TECNICO: PROIEZIONI ORTOGONALI', margin + sheetW - cartiglioW + 8, margin + sheetH - cartiglioH + 14);
  ctx.fillText(`SCALA 1:1 • UNI EN ISO 5456-2`, margin + sheetW - cartiglioW + 8, margin + sheetH - cartiglioH + 26);

  // Assi cartesiani ortogonali (Linea di Terra e asse verticale)
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Linea di terra orizzontale
  ctx.moveTo(margin, cy);
  ctx.lineTo(margin + sheetW, cy);
  // Asse verticale di separazione
  ctx.moveTo(cx, margin);
  ctx.lineTo(cx, margin + sheetH);
  ctx.stroke();

  // Quadrant Labels
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  // PV (Top-Left)
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('P.V. (Piano Verticale)', margin + 14, margin + 24);
  // PL (Top-Right)
  ctx.fillStyle = '#34d399';
  ctx.fillText('P.L. (Piano Laterale)', cx + 14, margin + 24);
  // PO (Bottom-Left)
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('P.O. (Piano Orizzontale)', margin + 14, cy + 24);
  // Piano di Ribaltamento (Bottom-Right)
  ctx.fillStyle = '#818cf8';
  ctx.fillText('Piano di Ribaltamento', cx + 14, cy + 24);

  // Origin O & LT
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('O', cx - 14, cy + 14);
  ctx.fillText('L.T.', margin + 8, cy - 8);

  // Render solid specific projections
  const geom2D = getSolid2DProjections(solid, cx, cy, Math.min(sheetW, sheetH) * 0.42);

  // 1. Proiezioni sul PO (Bottom-Left: x < cx, y > cy)
  drawViewPO(ctx, geom2D.po, showLabels, showHidden, colorFaces);

  // 2. Linee di richiamo da PO a PV (verticali a tratto fine continuo)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  geom2D.verticalRaysPOtoPV.forEach(r => {
    ctx.beginPath();
    ctx.moveTo(r.x, r.yPO);
    ctx.lineTo(r.x, r.yPV);
    ctx.stroke();
  });

  // 3. Proiezioni sul PV (Top-Left: x < cx, y < cy)
  drawViewPV(ctx, geom2D.pv, showLabels, showHidden, colorFaces);

  // 4. Linee di richiamo da PV a PL (orizzontali attraverso l'asse verticale)
  geom2D.horizontalRaysPVtoPL.forEach(r => {
    ctx.beginPath();
    ctx.moveTo(r.xPV, r.y);
    ctx.lineTo(r.xPL, r.y);
    ctx.stroke();
  });

  // 5. Linee orizzontali da PO verso l'asse verticale + ARCHI DI RIBALTAMENTO con centro in O
  geom2D.ribaltamentoArcs.forEach(arc => {
    // Linea orizzontale da PO a asse verticale
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(arc.xPO, arc.yPO);
    ctx.lineTo(cx, arc.yPO);
    ctx.stroke();

    // Arco di ribaltamento (compasso puntato in O)
    const radius = arc.radius;
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    // In canvas: center at (cx, cy), arc from angle PI/2 (down on vertical axis) to 0 (right on LT)
    ctx.arc(cx, cy, radius, Math.PI / 2, 0, true);
    ctx.stroke();

    // Linea verticale dall'arco ribaltato verso l'alto sul PL
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.beginPath();
    ctx.moveTo(cx + radius, cy);
    ctx.lineTo(cx + radius, arc.yTopPL);
    ctx.stroke();
  });

  // 6. Proiezione sul PL (Top-Right: x > cx, y < cy)
  drawViewPL(ctx, geom2D.pl, showLabels, showHidden, colorFaces, highlightSolution);
}

// 2D Drawing helpers
function drawViewPO(ctx: CanvasRenderingContext2D, po: any, showLabels: boolean, showHidden: boolean, colorFaces: boolean) {
  if (colorFaces) {
    ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
    ctx.beginPath();
    po.poly.forEach((pt: any, i: number) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fill();
  }

  // Edges
  po.edges.forEach((edge: any) => {
    ctx.strokeStyle = edge.hidden && showHidden ? '#94a3b8' : '#fbbf24';
    ctx.lineWidth = edge.hidden ? 1.5 : 2.5;
    ctx.setLineDash(edge.hidden ? [4, 3] : []);
    ctx.beginPath();
    ctx.moveTo(edge.x1, edge.y1);
    ctx.lineTo(edge.x2, edge.y2);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // Labels
  if (showLabels && po.labels) {
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#fbbf24';
    po.labels.forEach((l: any) => {
      ctx.fillText(l.text, l.x + 4, l.y - 4);
    });
  }
}

function drawViewPV(ctx: CanvasRenderingContext2D, pv: any, showLabels: boolean, showHidden: boolean, colorFaces: boolean) {
  if (colorFaces) {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.beginPath();
    pv.poly.forEach((pt: any, i: number) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fill();
  }

  pv.edges.forEach((edge: any) => {
    ctx.strokeStyle = edge.hidden && showHidden ? '#94a3b8' : '#38bdf8';
    ctx.lineWidth = edge.hidden ? 1.5 : 2.5;
    ctx.setLineDash(edge.hidden ? [4, 3] : []);
    ctx.beginPath();
    ctx.moveTo(edge.x1, edge.y1);
    ctx.lineTo(edge.x2, edge.y2);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  if (showLabels && pv.labels) {
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38bdf8';
    pv.labels.forEach((l: any) => {
      ctx.fillText(l.text, l.x + 4, l.y - 4);
    });
  }
}

function drawViewPL(ctx: CanvasRenderingContext2D, pl: any, showLabels: boolean, showHidden: boolean, colorFaces: boolean, isSuccess: boolean) {
  if (colorFaces) {
    ctx.fillStyle = isSuccess ? 'rgba(52, 211, 153, 0.45)' : 'rgba(52, 211, 153, 0.25)';
    ctx.beginPath();
    pl.poly.forEach((pt: any, i: number) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fill();
  }

  pl.edges.forEach((edge: any) => {
    ctx.strokeStyle = edge.hidden && showHidden ? '#94a3b8' : '#34d399';
    ctx.lineWidth = edge.hidden ? 1.5 : 2.5;
    ctx.setLineDash(edge.hidden ? [4, 3] : []);
    ctx.beginPath();
    ctx.moveTo(edge.x1, edge.y1);
    ctx.lineTo(edge.x2, edge.y2);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  if (showLabels && pl.labels) {
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#34d399';
    pl.labels.forEach((l: any) => {
      ctx.fillText(l.text, l.x + 4, l.y - 4);
    });
  }
}

// -------------------------------------------------------------------------
// GEOMETRY GENERATORS (Parametric 3D & 2D coordinates)
// -------------------------------------------------------------------------
function getSolidGeometry(solid: SolidType) {
  switch (solid) {
    case 'piramide': {
      // Square base pyramid: base on X-Z plane, height Y
      const b = 0.4;
      const h = 0.55;
      const offsetX = 0.2;
      const offsetZ = 0.2;
      const offsetY = 0.05;

      const vA = { x: offsetX, y: offsetY, z: offsetZ, name: "A" };
      const vB = { x: offsetX + b, y: offsetY, z: offsetZ, name: "B" };
      const vC = { x: offsetX + b, y: offsetY, z: offsetZ + b, name: "C" };
      const vD = { x: offsetX, y: offsetY, z: offsetZ + b, name: "D" };
      const vV = { x: offsetX + b / 2, y: offsetY + h, z: offsetZ + b / 2, name: "V" };

      return {
        vertices: [vA, vB, vC, vD, vV],
        edges: [
          { from: 0, to: 1, hidden: false },
          { from: 1, to: 2, hidden: false },
          { from: 2, to: 3, hidden: false },
          { from: 3, to: 0, hidden: false },
          { from: 0, to: 4, hidden: false },
          { from: 1, to: 4, hidden: false },
          { from: 2, to: 4, hidden: false },
          { from: 3, to: 4, hidden: false },
        ],
        faces: [
          { indices: [0, 1, 2, 3], color: 'rgba(251, 191, 36, 0.4)' }, // Base PO
          { indices: [0, 1, 4], color: 'rgba(56, 189, 248, 0.4)' },    // Front PV
          { indices: [1, 2, 4], color: 'rgba(52, 211, 153, 0.4)' },    // Right PL
          { indices: [2, 3, 4], color: 'rgba(168, 85, 247, 0.35)' },
          { indices: [3, 0, 4], color: 'rgba(236, 72, 153, 0.35)' },
        ]
      };
    }

    case 'solido_l': {
      // Step L-shaped solid
      const sx = 0.2, sz = 0.2, sy = 0.05;
      const w = 0.45, d = 0.35, h1 = 0.25, h2 = 0.5;
      const stepX = 0.22;

      // Base vertices
      const v0 = { x: sx, y: sy, z: sz, name: "1" };
      const v1 = { x: sx + w, y: sy, z: sz, name: "2" };
      const v2 = { x: sx + w, y: sy, z: sz + d, name: "3" };
      const v3 = { x: sx, y: sy, z: sz + d, name: "4" };
      // Upper step
      const v4 = { x: sx, y: sy + h2, z: sz, name: "5" };
      const v5 = { x: sx + stepX, y: sy + h2, z: sz, name: "6" };
      const v6 = { x: sx + stepX, y: sy + h1, z: sz, name: "7" };
      const v7 = { x: sx + w, y: sy + h1, z: sz, name: "8" };
      // Back upper step
      const v8 = { x: sx, y: sy + h2, z: sz + d, name: "9" };
      const v9 = { x: sx + stepX, y: sy + h2, z: sz + d, name: "10" };
      const v10 = { x: sx + stepX, y: sy + h1, z: sz + d, name: "11" };
      const v11 = { x: sx + w, y: sy + h1, z: sz + d, name: "12" };

      return {
        vertices: [v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11],
        edges: [
          { from: 0, to: 1, hidden: false },
          { from: 1, to: 2, hidden: false },
          { from: 2, to: 3, hidden: false },
          { from: 3, to: 0, hidden: false },
          { from: 4, to: 5, hidden: false },
          { from: 5, to: 6, hidden: false },
          { from: 6, to: 7, hidden: false },
          { from: 0, to: 4, hidden: false },
          { from: 1, to: 7, hidden: false },
          { from: 8, to: 9, hidden: false },
          { from: 9, to: 10, hidden: false },
          { from: 10, to: 11, hidden: false },
          { from: 3, to: 8, hidden: false },
          { from: 2, to: 11, hidden: false },
          { from: 4, to: 8, hidden: false },
          { from: 5, to: 9, hidden: false },
          { from: 6, to: 10, hidden: false },
          { from: 7, to: 11, hidden: false },
        ],
        faces: [
          { indices: [0, 4, 5, 6, 7, 1], color: 'rgba(56, 189, 248, 0.45)' }, // Front L shape
          { indices: [4, 5, 9, 8], color: 'rgba(251, 191, 36, 0.45)' },       // Top high step
          { indices: [6, 7, 11, 10], color: 'rgba(251, 191, 36, 0.35)' },     // Top low step
          { indices: [1, 7, 11, 2], color: 'rgba(52, 211, 153, 0.4)' },       // Right face
        ]
      };
    }

    case 'cilindro': {
      const sx = 0.35, sz = 0.35, sy = 0.05, r = 0.22, h = 0.45;
      const numPts = 12;
      const vertices = [];
      for (let i = 0; i < numPts; i++) {
        const ang = (i * 2 * Math.PI) / numPts;
        vertices.push({ x: sx + r * Math.cos(ang), y: sy, z: sz + r * Math.sin(ang), name: `B${i}` });
        vertices.push({ x: sx + r * Math.cos(ang), y: sy + h, z: sz + r * Math.sin(ang), name: `T${i}` });
      }

      const edges: any[] = [];
      for (let i = 0; i < numPts; i++) {
        const next = (i + 1) % numPts;
        edges.push({ from: i * 2, to: next * 2, hidden: false });
        edges.push({ from: i * 2 + 1, to: next * 2 + 1, hidden: false });
        if (i === 0 || i === Math.floor(numPts / 2) || i === Math.floor(numPts / 4) || i === Math.floor(3 * numPts / 4)) {
          edges.push({ from: i * 2, to: i * 2 + 1, hidden: false });
        }
      }

      return {
        vertices,
        edges,
        faces: [
          { indices: vertices.map((_, idx) => idx).filter(idx => idx % 2 === 1), color: 'rgba(251, 191, 36, 0.45)' }
        ]
      };
    }

    case 'prisma_triangolare': {
      const sx = 0.2, sz = 0.2, sy = 0.05;
      const w = 0.4, d = 0.35, h = 0.5;

      const vA = { x: sx, y: sy, z: sz, name: "A" };
      const vB = { x: sx + w, y: sy, z: sz, name: "B" };
      const vC = { x: sx + w / 2, y: sy, z: sz + d, name: "C" };
      const vA1 = { x: sx, y: sy + h, z: sz, name: "A'" };
      const vB1 = { x: sx + w, y: sy + h, z: sz, name: "B'" };
      const vC1 = { x: sx + w / 2, y: sy + h, z: sz + d, name: "C'" };

      return {
        vertices: [vA, vB, vC, vA1, vB1, vC1],
        edges: [
          { from: 0, to: 1, hidden: false },
          { from: 1, to: 2, hidden: false },
          { from: 2, to: 0, hidden: false },
          { from: 3, to: 4, hidden: false },
          { from: 4, to: 5, hidden: false },
          { from: 5, to: 3, hidden: false },
          { from: 0, to: 3, hidden: false },
          { from: 1, to: 4, hidden: false },
          { from: 2, to: 5, hidden: false },
        ],
        faces: [
          { indices: [0, 1, 4, 3], color: 'rgba(56, 189, 248, 0.4)' },
          { indices: [1, 2, 5, 4], color: 'rgba(52, 211, 153, 0.4)' },
          { indices: [2, 0, 3, 5], color: 'rgba(168, 85, 247, 0.35)' },
          { indices: [3, 4, 5], color: 'rgba(251, 191, 36, 0.45)' }
        ]
      };
    }

    default: // parallelepipedo
    {
      const sx = 0.2, sz = 0.2, sy = 0.05;
      const w = 0.45, d = 0.3, h = 0.5;

      const v0 = { x: sx, y: sy, z: sz, name: "A" };
      const v1 = { x: sx + w, y: sy, z: sz, name: "B" };
      const v2 = { x: sx + w, y: sy, z: sz + d, name: "C" };
      const v3 = { x: sx, y: sy, z: sz + d, name: "D" };
      const v4 = { x: sx, y: sy + h, z: sz, name: "E" };
      const v5 = { x: sx + w, y: sy + h, z: sz, name: "F" };
      const v6 = { x: sx + w, y: sy + h, z: sz + d, name: "G" };
      const v7 = { x: sx, y: sy + h, z: sz + d, name: "H" };

      return {
        vertices: [v0, v1, v2, v3, v4, v5, v6, v7],
        edges: [
          { from: 0, to: 1, hidden: false },
          { from: 1, to: 2, hidden: false },
          { from: 2, to: 3, hidden: false },
          { from: 3, to: 0, hidden: false },
          { from: 4, to: 5, hidden: false },
          { from: 5, to: 6, hidden: false },
          { from: 6, to: 7, hidden: false },
          { from: 7, to: 4, hidden: false },
          { from: 0, to: 4, hidden: false },
          { from: 1, to: 5, hidden: false },
          { from: 2, to: 6, hidden: false },
          { from: 3, to: 7, hidden: false },
        ],
        faces: [
          { indices: [0, 1, 5, 4], color: 'rgba(56, 189, 248, 0.45)' }, // Front (PV)
          { indices: [4, 5, 6, 7], color: 'rgba(251, 191, 36, 0.45)' }, // Top (PO)
          { indices: [1, 2, 6, 5], color: 'rgba(52, 211, 153, 0.45)' }, // Right (PL)
          { indices: [0, 3, 7, 4], color: 'rgba(168, 85, 247, 0.3)' },
          { indices: [2, 3, 7, 6], color: 'rgba(148, 163, 184, 0.25)' },
          { indices: [0, 1, 2, 3], color: 'rgba(30, 41, 59, 0.3)' }
        ]
      };
    }
  }
}

// 2D Projection Coordinates Calculator for Monge Sheet
function getSolid2DProjections(solid: SolidType, cx: number, cy: number, sc: number) {
  // Let's configure positions relative to the center cross (cx, cy)
  // Distance from axes:
  const distFromLT = 35; // distacco dalla linea di terra
  const distFromV = 45;  // distacco dall'asse verticale

  switch (solid) {
    case 'piramide': {
      const baseW = 120;
      const baseD = 120;
      const h = 150;

      // PO (Bottom-Left: x from cx-distFromV-baseW to cx-distFromV; y from cy+distFromLT to cy+distFromLT+baseD)
      const x1 = cx - distFromV - baseW;
      const x2 = cx - distFromV;
      const y1 = cy + distFromLT;
      const y2 = cy + distFromLT + baseD;
      const xMid = (x1 + x2) / 2;
      const yMid = (y1 + y2) / 2;

      // PV (Top-Left: x same as PO; y from cy-distFromLT-h to cy-distFromLT)
      const yPV_Base = cy - distFromLT;
      const yPV_Apex = cy - distFromLT - h;

      // PL (Top-Right: y same as PV; x from cx+distFromLT to cx+distFromLT+baseD)
      const xPL_1 = cx + distFromLT;
      const xPL_2 = cx + distFromLT + baseD;
      const xPL_Apex = (xPL_1 + xPL_2) / 2;

      return {
        po: {
          poly: [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }],
          edges: [
            { x1, y1, x2, y2: y1, hidden: false },
            { x1: x2, y1, x2, y2, hidden: false },
            { x1: x2, y1: y2, x2: x1, y2, hidden: false },
            { x1, y1: y2, x2: x1, y2: y1, hidden: false },
            // Diagonals converging to apex V'
            { x1, y1, x2: x2, y2, hidden: false },
            { x1: x2, y1, x2: x1, y2, hidden: false },
          ],
          labels: [
            { text: "A'", x: x1, y: y1 },
            { text: "B'", x: x2, y: y1 },
            { text: "C'", x: x2, y: y2 },
            { text: "D'", x: x1, y: y2 },
            { text: "V'", x: xMid, y: yMid }
          ]
        },
        pv: {
          poly: [{ x: x1, y: yPV_Base }, { x: x2, y: yPV_Base }, { x: xMid, y: yPV_Apex }],
          edges: [
            { x1, y1: yPV_Base, x2, y2: yPV_Base, hidden: false },
            { x1, y1: yPV_Base, x2: xMid, y2: yPV_Apex, hidden: false },
            { x1: x2, y1: yPV_Base, x2: xMid, y2: yPV_Apex, hidden: false },
          ],
          labels: [
            { text: "A''≡D''", x: x1 - 25, y: yPV_Base + 12 },
            { text: "B''≡C''", x: x2 - 5, y: yPV_Base + 12 },
            { text: "V''", x: xMid - 6, y: yPV_Apex - 6 }
          ]
        },
        pl: {
          poly: [{ x: xPL_1, y: yPV_Base }, { x: xPL_2, y: yPV_Base }, { x: xPL_Apex, y: yPV_Apex }],
          edges: [
            { x1: xPL_1, y1: yPV_Base, x2: xPL_2, y2: yPV_Base, hidden: false },
            { x1: xPL_1, y1: yPV_Base, x2: xPL_Apex, y2: yPV_Apex, hidden: false },
            { x1: xPL_2, y1: yPV_Base, x2: xPL_Apex, y2: yPV_Apex, hidden: false },
          ],
          labels: [
            { text: "A'''≡B'''", x: xPL_1 - 10, y: yPV_Base + 12 },
            { text: "D'''≡C'''", x: xPL_2 - 5, y: yPV_Base + 12 },
            { text: "V'''", x: xPL_Apex - 6, y: yPV_Apex - 6 }
          ]
        },
        verticalRaysPOtoPV: [
          { x: x1, yPO: y2, yPV: yPV_Base },
          { x: x2, yPO: y2, yPV: yPV_Base },
          { x: xMid, yPO: yMid, yPV: yPV_Apex }
        ],
        horizontalRaysPVtoPL: [
          { xPV: x2, xPL: xPL_2, y: yPV_Base },
          { xPV: xMid, xPL: xPL_Apex, y: yPV_Apex }
        ],
        ribaltamentoArcs: [
          { xPO: x2, yPO: y1, radius: distFromLT, yTopPL: yPV_Base },
          { xPO: x2, yPO: yMid, radius: distFromLT + baseD / 2, yTopPL: yPV_Apex },
          { xPO: x2, yPO: y2, radius: distFromLT + baseD, yTopPL: yPV_Base }
        ]
      };
    }

    case 'solido_l': {
      const w1 = 140;
      const wStep = 70;
      const d = 110;
      const hLow = 60;
      const hTotal = 140;

      const x1 = cx - distFromV - w1;
      const xStep = x1 + wStep;
      const x2 = cx - distFromV;
      const y1 = cy + distFromLT;
      const y2 = cy + distFromLT + d;

      const yBase = cy - distFromLT;
      const yStep = cy - distFromLT - hLow;
      const yTop = cy - distFromLT - hTotal;

      const xPL_1 = cx + distFromLT;
      const xPL_2 = cx + distFromLT + d;

      return {
        po: {
          poly: [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }],
          edges: [
            { x1, y1, x2, y2: y1, hidden: false },
            { x1: x2, y1, x2, y2, hidden: false },
            { x1: x2, y1: y2, x2: x1, y2, hidden: false },
            { x1, y1: y2, x2: x1, y2: y1, hidden: false },
            // Step line in PO
            { x1: xStep, y1, x2: xStep, y2, hidden: false }
          ],
          labels: [{ text: "PO (2 Rettangoli)", x: x1 + 10, y: y1 + 20 }]
        },
        pv: {
          // L-shaped polygon
          poly: [
            { x: x1, y: yBase },
            { x: x2, y: yBase },
            { x: x2, y: yStep },
            { x: xStep, y: yStep },
            { x: xStep, y: yTop },
            { x: x1, y: yTop }
          ],
          edges: [
            { x1, y1: yBase, x2, y2: yBase, hidden: false },
            { x1: x2, y1: yBase, x2, y2: yStep, hidden: false },
            { x1: x2, y1: yStep, x2: xStep, y2: yStep, hidden: false },
            { x1: xStep, y1: yStep, x2: xStep, y2: yTop, hidden: false },
            { x1: xStep, y1: yTop, x2: x1, y2: yTop, hidden: false },
            { x1, y1: yTop, x2: x1, y2: yBase, hidden: false }
          ],
          labels: [{ text: "PV (Sagoma a L)", x: x1 + 10, y: yTop + 20 }]
        },
        pl: {
          // Side view seen from left: full height rectangle with hidden edge for the step!
          poly: [{ x: xPL_1, y: yBase }, { x: xPL_2, y: yBase }, { x: xPL_2, y: yTop }, { x: xPL_1, y: yTop }],
          edges: [
            { x1: xPL_1, y1: yBase, x2: xPL_2, y2: yBase, hidden: false },
            { x1: xPL_2, y1: yBase, x2: xPL_2, y2: yTop, hidden: false },
            { x1: xPL_2, y1: yTop, x2: xPL_1, y2: yTop, hidden: false },
            { x1: xPL_1, y1: yTop, x2: xPL_1, y2: yBase, hidden: false },
            // Hidden edge representing the lower step!
            { x1: xPL_1, y1: yStep, x2: xPL_2, y2: yStep, hidden: true }
          ],
          labels: [{ text: "PL (Spigolo nascosto ---)", x: xPL_1 + 8, y: yStep - 8 }]
        },
        verticalRaysPOtoPV: [
          { x: x1, yPO: y2, yPV: yBase },
          { x: xStep, yPO: y2, yPV: yStep },
          { x: x2, yPO: y2, yPV: yBase }
        ],
        horizontalRaysPVtoPL: [
          { xPV: x2, xPL: xPL_2, y: yBase },
          { xPV: x2, xPL: xPL_2, y: yStep },
          { xPV: xStep, xPL: xPL_2, y: yTop }
        ],
        ribaltamentoArcs: [
          { xPO: x2, yPO: y1, radius: distFromLT, yTopPL: yTop },
          { xPO: x2, yPO: y2, radius: distFromLT + d, yTopPL: yTop }
        ]
      };
    }

    case 'cilindro': {
      const diam = 110;
      const h = 140;

      const x1 = cx - distFromV - diam;
      const x2 = cx - distFromV;
      const xMid = (x1 + x2) / 2;
      const r = diam / 2;
      const yPO_Center = cy + distFromLT + r;

      const yBase = cy - distFromLT;
      const yTop = cy - distFromLT - h;

      const xPL_1 = cx + distFromLT;
      const xPL_2 = cx + distFromLT + diam;

      return {
        po: {
          poly: Array.from({ length: 16 }).map((_, i) => {
            const a = (i * 2 * Math.PI) / 16;
            return { x: xMid + r * Math.cos(a), y: yPO_Center + r * Math.sin(a) };
          }),
          edges: Array.from({ length: 16 }).map((_, i) => {
            const a1 = (i * 2 * Math.PI) / 16;
            const a2 = ((i + 1) * 2 * Math.PI) / 16;
            return {
              x1: xMid + r * Math.cos(a1),
              y1: yPO_Center + r * Math.sin(a1),
              x2: xMid + r * Math.cos(a2),
              y2: yPO_Center + r * Math.sin(a2),
              hidden: false
            };
          }),
          labels: [{ text: "PO (Cerchio R)", x: xMid - 25, y: yPO_Center - 5 }]
        },
        pv: {
          poly: [{ x: x1, y: yBase }, { x: x2, y: yBase }, { x: x2, y: yTop }, { x: x1, y: yTop }],
          edges: [
            { x1, y1: yBase, x2, y2: yBase, hidden: false },
            { x1: x2, y1: yBase, x2, y2: yTop, hidden: false },
            { x1: x2, y1: yTop, x2: x1, y2: yTop, hidden: false },
            { x1, y1: yTop, x2: x1, y2: yBase, hidden: false },
          ],
          labels: [{ text: "PV (Rettangolo 2R×h)", x: x1 + 10, y: yTop + 20 }]
        },
        pl: {
          poly: [{ x: xPL_1, y: yBase }, { x: xPL_2, y: yBase }, { x: xPL_2, y: yTop }, { x: xPL_1, y: yTop }],
          edges: [
            { x1: xPL_1, y1: yBase, x2: xPL_2, y2: yBase, hidden: false },
            { x1: xPL_2, y1: yBase, x2: xPL_2, y2: yTop, hidden: false },
            { x1: xPL_2, y1: yTop, x2: xPL_1, y2: yTop, hidden: false },
            { x1: xPL_1, y1: yTop, x2: xPL_1, y2: yBase, hidden: false },
          ],
          labels: [{ text: "PL (Rettangolo identico)", x: xPL_1 + 10, y: yTop + 20 }]
        },
        verticalRaysPOtoPV: [
          { x: x1, yPO: yPO_Center, yPV: yBase },
          { x: x2, yPO: yPO_Center, yPV: yBase }
        ],
        horizontalRaysPVtoPL: [
          { xPV: x2, xPL: xPL_2, y: yBase },
          { xPV: x2, xPL: xPL_2, y: yTop }
        ],
        ribaltamentoArcs: [
          { xPO: x2, yPO: yPO_Center - r, radius: distFromLT, yTopPL: yTop },
          { xPO: x2, yPO: yPO_Center + r, radius: distFromLT + diam, yTopPL: yTop }
        ]
      };
    }

    default: // Parallelepipedo
    {
      const w = 130;
      const d = 95;
      const h = 140;

      const x1 = cx - distFromV - w;
      const x2 = cx - distFromV;
      const y1 = cy + distFromLT;
      const y2 = cy + distFromLT + d;

      const yBase = cy - distFromLT;
      const yTop = cy - distFromLT - h;

      const xPL_1 = cx + distFromLT;
      const xPL_2 = cx + distFromLT + d;

      return {
        po: {
          poly: [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }],
          edges: [
            { x1, y1, x2, y2: y1, hidden: false },
            { x1: x2, y1, x2, y2, hidden: false },
            { x1: x2, y1: y2, x2: x1, y2, hidden: false },
            { x1, y1: y2, x2: x1, y2: y1, hidden: false },
          ],
          labels: [
            { text: "A'", x: x1, y: y1 },
            { text: "B'", x: x2, y: y1 },
            { text: "C'", x: x2, y: y2 },
            { text: "D'", x: x1, y: y2 }
          ]
        },
        pv: {
          poly: [{ x: x1, y: yBase }, { x: x2, y: yBase }, { x: x2, y: yTop }, { x: x1, y: yTop }],
          edges: [
            { x1, y1: yBase, x2, y2: yBase, hidden: false },
            { x1: x2, y1: yBase, x2, y2: yTop, hidden: false },
            { x1: x2, y1: yTop, x2: x1, y2: yTop, hidden: false },
            { x1, y1: yTop, x2: x1, y2: yBase, hidden: false },
          ],
          labels: [
            { text: "A''≡D''", x: x1 - 25, y: yBase + 12 },
            { text: "B''≡C''", x: x2 - 5, y: yBase + 12 },
            { text: "E''≡H''", x: x1 - 25, y: yTop - 4 },
            { text: "F''≡G''", x: x2 - 5, y: yTop - 4 }
          ]
        },
        pl: {
          poly: [{ x: xPL_1, y: yBase }, { x: xPL_2, y: yBase }, { x: xPL_2, y: yTop }, { x: xPL_1, y: yTop }],
          edges: [
            { x1: xPL_1, y1: yBase, x2: xPL_2, y2: yBase, hidden: false },
            { x1: xPL_2, y1: yBase, x2: xPL_2, y2: yTop, hidden: false },
            { x1: xPL_2, y1: yTop, x2: xPL_1, y2: yTop, hidden: false },
            { x1: xPL_1, y1: yTop, x2: xPL_1, y2: yBase, hidden: false },
          ],
          labels: [
            { text: "A'''≡B'''", x: xPL_1 - 10, y: yBase + 12 },
            { text: "D'''≡C'''", x: xPL_2 - 5, y: yBase + 12 },
            { text: "E'''≡F'''", x: xPL_1 - 10, y: yTop - 4 },
            { text: "H'''≡G'''", x: xPL_2 - 5, y: yTop - 4 }
          ]
        },
        verticalRaysPOtoPV: [
          { x: x1, yPO: y2, yPV: yBase },
          { x: x2, yPO: y2, yPV: yBase }
        ],
        horizontalRaysPVtoPL: [
          { xPV: x2, xPL: xPL_2, y: yBase },
          { xPV: x2, xPL: xPL_2, y: yTop }
        ],
        ribaltamentoArcs: [
          { xPO: x2, yPO: y1, radius: distFromLT, yTopPL: yTop },
          { xPO: x2, yPO: y2, radius: distFromLT + d, yTopPL: yTop }
        ]
      };
    }
  }
}
