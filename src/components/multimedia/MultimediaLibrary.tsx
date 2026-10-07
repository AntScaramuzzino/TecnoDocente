import React, { useState } from 'react';
import { MediaResource, SubjectArea, ResourceType, GradeLevel } from '../../types';
import { 
  FolderGit2, 
  Search, 
  Plus, 
  Video, 
  FileText, 
  Box, 
  Network, 
  Image as ImageIcon, 
  Star, 
  ExternalLink, 
  Filter, 
  X,
  Play,
  BookOpen,
  Clock,
  Sparkles,
  Youtube,
  Tv,
  Check,
  ChevronRight,
  ListOrdered
} from 'lucide-react';

interface MultimediaLibraryProps {
  resources: MediaResource[];
  onOpenSimulator: () => void;
  onAddResource: (resource: MediaResource) => void;
  onToggleFavorite: (id: string) => void;
  onNavigateToQuiz?: () => void;
}

// Recommended Italian Technology YouTube educational suggestions for 1-click import
const YOUTUBE_PRESETS = [
  {
    title: 'Disegno Tecnico: Capire le Proiezioni Ortogonali in 6 minuti',
    channel: 'Tecnologia Duepuntozero',
    youtubeId: 'mO62k8_j544',
    area: 'Proiezioni Ortogonali' as SubjectArea,
    grade: '2ª Media' as GradeLevel,
    duration: '6:04 min',
    desc: 'Spiegazione del Triedro di Monge: PO, PV, PL e animazione dell\'apertura del diedro sul foglio da disegno.',
    timestamps: [
      { time: '00:00', note: 'La terza dimensione' },
      { time: '01:20', note: 'I tre piani di proiezione (Monge)' },
      { time: '02:45', note: 'Pianta (PO)' },
      { time: '03:50', note: 'Prospetto (PV) e Fianco (PL)' },
      { time: '05:10', note: 'Ribaltamento sul foglio 2D' }
    ]
  },
  {
    title: 'I Materiali: La Lavorazione del Legno e la Filiera Industriale',
    channel: 'HUB Scuola / Mondadori Education',
    youtubeId: 'Nhv3yScOOsQ',
    area: 'Materiali & Risorse' as SubjectArea,
    grade: '1ª Media' as GradeLevel,
    duration: '8:45 min',
    desc: 'Dalla foresta alla segheria: abbattimento, scortecciatura, segagione in tavole commerciali e semilavorati MDF/compensato.',
    timestamps: [
      { time: '00:30', note: 'Anelli e corteccia' },
      { time: '02:10', note: 'Abbattimento e fluitazione' },
      { time: '04:05', note: 'Segagione commerciale' },
      { time: '06:15', note: 'Stagionatura' }
    ]
  },
  {
    title: 'La Siderurgia: Come Funziona l\'Altoforno e la Produzione dell\'Acciaio',
    channel: 'Ingegneria Italia & HUB Scuola',
    youtubeId: 'ECQUWIGTZm0',
    area: 'Materiali & Risorse' as SubjectArea,
    grade: '1ª Media' as GradeLevel,
    duration: '9:20 min',
    desc: 'Il ciclo siderurgico completo: la carica con minerale di ferro e coke a 1800 °C, ghisa grezza e affinazione in acciaio.',
    timestamps: [
      { time: '00:45', note: 'Materie prime siderurgiche' },
      { time: '02:20', note: 'Funzionamento dell\'altoforno' },
      { time: '04:40', note: 'Convertitori LD a ossigeno' }
    ]
  },
  {
    title: 'Energia Rinnovabile: Come Funziona la Centrale Idroelettrica a Salto',
    channel: 'Ingegneria Italia',
    youtubeId: 'zdocDK9KA4M',
    area: 'Energia & Fonti Rinnovabili' as SubjectArea,
    grade: '2ª Media' as GradeLevel,
    duration: '8:15 min',
    desc: 'Funzionamento del bacino montano, condotta forzata, sala macchine con turbina Pelton e alternatore sincrono.',
    timestamps: [
      { time: '01:00', note: 'Il bacino e la diga' },
      { time: '02:40', note: 'La condotta forzata' },
      { time: '04:30', note: 'Turbina Pelton' },
      { time: '06:10', note: 'L\'alternatore e la rete' }
    ]
  },
  {
    title: 'Disegno Geometrico: Squadratura del Foglio F4 con Riga e Compasso',
    channel: 'Prof. Falanga insegna',
    youtubeId: 'RnVA2RTTnYE',
    area: 'Disegno Tecnico' as SubjectArea,
    grade: '1ª Media' as GradeLevel,
    duration: '5:30 min',
    desc: 'Tutorial per la prima media: diagonali con 2H, 4 archi di compasso con r = 9 cm, cornice marcata HB e cartiglio.',
    timestamps: [
      { time: '01:10', note: 'Diagonali 2H' },
      { time: '02:30', note: 'Apertura compasso 90 mm' },
      { time: '04:50', note: 'Cornice definitiva HB' }
    ]
  },
  {
    title: 'La Corrente Elettrica, Tensione e la Legge di Ohm (V = I · R)',
    channel: 'Tecnologia Duepuntozero',
    youtubeId: 's66Zt2rS5lU',
    area: 'Elettricità & Elettronica' as SubjectArea,
    grade: '3ª Media' as GradeLevel,
    duration: '8:10 min',
    desc: 'Movimento di elettroni, definizione di Volt, Ampere e Ohm, circuiti in serie e parallelo con formule inverse.',
    timestamps: [
      { time: '01:00', note: 'Elettroni liberi' },
      { time: '02:30', note: 'Volt, Ampere e Ohm' },
      { time: '04:15', note: 'Legge di Ohm' }
    ]
  }
];

export const MultimediaLibrary: React.FC<MultimediaLibraryProps> = ({
  resources,
  onOpenSimulator,
  onAddResource,
  onToggleFavorite,
  onNavigateToQuiz
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('Tutte le aree');
  const [selectedType, setSelectedType] = useState<string>('Tutti i tipi');
  const [selectedGrade, setSelectedGrade] = useState<string>('Tutte le classi');
  
  // Selected resource for the cinema / player modal
  const [selectedResource, setSelectedResource] = useState<MediaResource | null>(null);
  
  // YouTube Search & Import Modal
  const [showYouTubeModal, setShowYouTubeModal] = useState<boolean>(false);
  const [ytInputUrlOrId, setYtInputUrlOrId] = useState('');
  const [ytCustomTitle, setYtCustomTitle] = useState('');
  const [ytCustomChannel, setYtCustomChannel] = useState('');
  const [ytCustomArea, setYtCustomArea] = useState<SubjectArea>('Proiezioni Ortogonali');
  const [ytCustomGrade, setYtCustomGrade] = useState<GradeLevel>('2ª Media');
  const [ytPreviewId, setYtPreviewId] = useState<string>('');

  // Extract YouTube ID from link
  const extractYouTubeId = (input: string): string => {
    const trimmed = input.trim();
    if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
      return trimmed;
    }
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : trimmed;
  };

  const handlePreviewYouTube = () => {
    const id = extractYouTubeId(ytInputUrlOrId);
    setYtPreviewId(id);
  };

  const handleImportPreset = (preset: typeof YOUTUBE_PRESETS[0]) => {
    const newRes: MediaResource = {
      id: `res-yt-${Date.now()}`,
      title: preset.title,
      type: 'video',
      area: preset.area,
      gradeLevel: preset.grade,
      durationOrPages: preset.duration,
      channelName: preset.channel,
      youtubeId: preset.youtubeId,
      mediaUrl: `https://www.youtube-nocookie.com/embed/${preset.youtubeId}`,
      description: preset.desc,
      lessonTimestamps: preset.timestamps,
      tags: [preset.area.split(' ')[0], preset.grade, 'YouTube'],
      favorite: true
    };
    onAddResource(newRes);
    setShowYouTubeModal(false);
    setSelectedResource(newRes);
  };

  const handleSaveCustomYouTube = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeId(ytInputUrlOrId);
    if (!id || !ytCustomTitle.trim()) return;

    const newRes: MediaResource = {
      id: `res-yt-${Date.now()}`,
      title: ytCustomTitle.trim(),
      type: 'video',
      area: ytCustomArea,
      gradeLevel: ytCustomGrade,
      durationOrPages: 'Video YouTube',
      channelName: ytCustomChannel.trim() || 'Canale YouTube',
      youtubeId: id,
      mediaUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      description: `Video didattico su ${ytCustomTitle} per la classe ${ytCustomGrade}.`,
      tags: [ytCustomArea.split(' ')[0], ytCustomGrade, 'YouTube'],
      favorite: true
    };

    onAddResource(newRes);
    setShowYouTubeModal(false);
    setSelectedResource(newRes);
    setYtInputUrlOrId('');
    setYtCustomTitle('');
    setYtCustomChannel('');
    setYtPreviewId('');
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (res.channelName && res.channelName.toLowerCase().includes(searchTerm.toLowerCase()));
    if (!matchesSearch) return false;
    if (selectedArea !== 'Tutte le aree' && res.area !== selectedArea) return false;
    if (selectedType !== 'Tutti i tipi') {
      if (selectedType === 'video' && res.type !== 'video') return false;
      if (selectedType !== 'video' && res.type !== selectedType) return false;
    }
    if (selectedGrade !== 'Tutte le classi' && res.gradeLevel !== selectedGrade) return false;
    return true;
  });

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'video': return <Youtube className="w-4 h-4 text-rose-400" />;
      case 'scheda': return <FileText className="w-4 h-4 text-sky-400" />;
      case 'modello3d': return <Box className="w-4 h-4 text-cyan-400" />;
      case 'mappa': return <Network className="w-4 h-4 text-emerald-400" />;
      case 'infografica': return <ImageIcon className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Header */}
      <div className="bg-slate-800/90 backdrop-blur-md px-4 py-3.5 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Youtube className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">Libreria Multimediale & Video Didattici</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1">
                <Tv className="w-3 h-3" /> YouTube Educational Integrato
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Video-lezioni dei canali di riferimento (Tecnologia Duepuntozero, HUB Scuola, Ingegneria Italia, Geopop) e schede operative
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowYouTubeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-1.5 min-h-[42px] shadow-lg shadow-rose-600/20"
          >
            <Plus className="w-4 h-4" />
            Cerca & Importa da YouTube
          </button>
          <button
            onClick={onOpenSimulator}
            className="px-3.5 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900/40 text-xs font-bold flex items-center gap-1.5 min-h-[42px]"
          >
            <Box className="w-4 h-4" />
            Simulatore 3D PO
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-850 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca video per argomento (es. Monge, Altoforno, Legno)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Quick Filter: Solo Video */}
          <button
            onClick={() => setSelectedType(selectedType === 'video' ? 'Tutti i tipi' : 'video')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all border flex items-center gap-1.5 ${
              selectedType === 'video'
                ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            Solo Video YouTube ({resources.filter(r => r.type === 'video').length})
          </button>

          {/* Filter Area */}
          <select
            value={selectedArea}
            onChange={e => setSelectedArea(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-rose-400"
          >
            <option value="Tutte le aree">Tutte le materie</option>
            <option value="Proiezioni Ortogonali">Proiezioni Ortogonali</option>
            <option value="Materiali & Risorse">Materiali & Risorse</option>
            <option value="Disegno Tecnico">Disegno Tecnico</option>
            <option value="Energia & Fonti Rinnovabili">Energia & Fonti</option>
            <option value="Edilizia & Città Sostenibili">Edilizia & Città</option>
            <option value="Elettricità & Elettronica">Elettricità</option>
          </select>

          {/* Filter Grade */}
          <select
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-rose-400"
          >
            <option value="Tutte le classi">Tutte le classi</option>
            <option value="1ª Media">1ª Media</option>
            <option value="2ª Media">2ª Media</option>
            <option value="3ª Media">3ª Media</option>
          </select>
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResources.map(res => (
            <div
              key={res.id}
              className="bg-slate-850 rounded-2xl border border-slate-750 overflow-hidden hover:border-slate-650 transition-all shadow-md flex flex-col group"
            >
              {/* Card Image Banner */}
              <div 
                onClick={() => setSelectedResource(res)}
                className="h-40 relative bg-slate-900 overflow-hidden cursor-pointer"
              >
                {/* Real YouTube thumbnail if youtubeId exists */}
                {res.youtubeId ? (
                  <img
                    src={`https://img.youtube.com/vi/${res.youtubeId}/hqdefault.jpg`}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      // Fallback to unsplash thumbnail if high-res thumb is unavailable
                      if (res.thumbnailUrl) {
                        (e.target as HTMLImageElement).src = res.thumbnailUrl;
                      }
                    }}
                  />
                ) : res.thumbnailUrl ? (
                  <img
                    src={res.thumbnailUrl}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Big Play Button on hover for videos */}
                {res.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Badge Type */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold border border-slate-700 text-slate-200">
                  {getTypeIcon(res.type)}
                  <span>{res.type === 'video' ? 'Video YouTube' : res.type}</span>
                </div>

                {/* Favorite Star */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onToggleFavorite(res.id);
                  }}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md transition-all ${
                    res.favorite
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60'
                      : 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${res.favorite ? 'fill-current' : ''}`} />
                </button>

                {/* Duration badge */}
                {res.durationOrPages && (
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-950/90 px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-200 border border-slate-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-rose-400" />
                    {res.durationOrPages}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-semibold mb-1">
                    <span className="text-rose-400 truncate max-w-[150px]">
                      {res.channelName || res.area}
                    </span>
                    <span className="text-slate-400 font-bold px-1.5 py-0.2 rounded bg-slate-800">
                      {res.gradeLevel}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setSelectedResource(res)}
                    className="font-bold text-white text-xs md:text-sm leading-snug line-clamp-2 hover:text-rose-300 cursor-pointer"
                  >
                    {res.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 flex-wrap">
                    {res.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-750">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedResource(res)}
                    className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    {res.type === 'video' ? 'Guarda' : 'Apri'} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Cinema Theater Modal (Optimized for Tablet & LIM Projection) */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-5 md:p-6 shadow-2xl overflow-y-auto max-h-[95vh] flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold flex items-center gap-1">
                    <Youtube className="w-3.5 h-3.5" /> {selectedResource.channelName || 'Video Lezione'}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                    {selectedResource.gradeLevel}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedResource.area}
                  </span>
                </div>
                <h3 className="font-extrabold text-lg md:text-xl text-white">
                  {selectedResource.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Responsive Player Box */}
            <div className="w-full bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video flex items-center justify-center">
              {selectedResource.type === 'video' && selectedResource.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${selectedResource.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedResource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedResource.type === 'modello3d' ? (
                <div className="text-center p-6">
                  <Box className="w-14 h-14 text-cyan-400 mx-auto mb-2 animate-bounce" />
                  <h4 className="text-base font-bold text-white mb-2">Simulatore Interattivo 3D</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                    Questa risorsa interattiva si apre direttamente nel simulatore 3D di Monge.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedResource(null);
                      onOpenSimulator();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                  >
                    Avvia Simulatore 3D
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-slate-900 w-full h-full flex flex-col justify-center text-left">
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-400 mb-2">
                    <FileText className="w-5 h-5" />
                    Scheda Didattica ad Alta Leggibilità
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {selectedResource.contentSnippet || selectedResource.description}
                  </p>
                </div>
              )}
            </div>

            {/* Timestamps & Didactic Highlights */}
            {selectedResource.lessonTimestamps && selectedResource.lessonTimestamps.length > 0 && (
              <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5 flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-amber-400" />
                  Indice dei Minuti Salienti per la Lezione
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedResource.lessonTimestamps.map((ts, idx) => (
                    <div 
                      key={idx}
                      className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <span className="font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/80 shrink-0">
                        {ts.time}
                      </span>
                      <span className="leading-snug">{ts.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description & Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 max-w-lg">
                {selectedResource.description}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const win = window.open(`https://www.youtube.com/watch?v=${selectedResource.youtubeId}`, '_blank');
                    win?.focus();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Apri su YouTube
                </button>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white"
                >
                  Chiudi Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cerca & Importa da YouTube Modal */}
      {showYouTubeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh] space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  Cerca & Importa Video da YouTube
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Importa video selezionati dai migliori canali didattici di Tecnologia o inserisci qualsiasi link YouTube.
                </p>
              </div>
              <button
                onClick={() => setShowYouTubeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section 1: 1-Click Educational Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Video Consigliati Curricolo Tecnologia (1-Click)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {YOUTUBE_PRESETS.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-850 border border-slate-750 hover:border-slate-650 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
                        <span className="text-rose-400">{p.channel}</span>
                        <span className="bg-slate-800 px-1.5 py-0.2 rounded">{p.grade}</span>
                      </div>
                      <h5 className="font-bold text-xs text-white line-clamp-1">{p.title}</h5>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{p.desc}</p>
                    </div>

                    <button
                      onClick={() => handleImportPreset(p)}
                      className="mt-2.5 w-full py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold border border-rose-500/40 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Importa in Libreria
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Custom YouTube URL or ID importer */}
            <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Oppure Inserisci Qualsiasi Link YouTube
              </span>

              <form onSubmit={handleSaveCustomYouTube} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={ytInputUrlOrId}
                    onChange={e => setYtInputUrlOrId(e.target.value)}
                    placeholder="Incolla link YouTube (es. https://www.youtube.com/watch?v=... o https://youtu.be/...)"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handlePreviewYouTube}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    Verifica
                  </button>
                </div>

                {/* Live Preview if ID is ready */}
                {ytPreviewId && (
                  <div className="aspect-video rounded-xl overflow-hidden border border-slate-700 bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${ytPreviewId}`}
                      title="Anteprima Video"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Titolo Video</label>
                    <input
                      type="text"
                      required
                      value={ytCustomTitle}
                      onChange={e => setYtCustomTitle(e.target.value)}
                      placeholder="Es. Lezione sulle Proiezioni del Cono"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Canale YouTube / Autore</label>
                    <input
                      type="text"
                      value={ytCustomChannel}
                      onChange={e => setYtCustomChannel(e.target.value)}
                      placeholder="Es. Prof.ssa Pasquini / Hub Scuola"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Materia / Area</label>
                    <select
                      value={ytCustomArea}
                      onChange={e => setYtCustomArea(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Proiezioni Ortogonali">Proiezioni Ortogonali</option>
                      <option value="Disegno Tecnico">Disegno Tecnico</option>
                      <option value="Materiali & Risorse">Materiali & Risorse</option>
                      <option value="Energia & Fonti Rinnovabili">Energia & Fonti</option>
                      <option value="Edilizia & Città Sostenibili">Edilizia & Città</option>
                      <option value="Elettricità & Elettronica">Elettricità</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Classe Destinataria</label>
                    <select
                      value={ytCustomGrade}
                      onChange={e => setYtCustomGrade(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="1ª Media">1ª Media</option>
                      <option value="2ª Media">2ª Media</option>
                      <option value="3ª Media">3ª Media</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowYouTubeModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20"
                  >
                    Salva in Libreria
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
