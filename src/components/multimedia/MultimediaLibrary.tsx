import React, { useState } from 'react';
import { 
  MediaResource, 
  SubjectArea, 
  ResourceType, 
  GradeLevel, 
  Student, 
  CalendarEvent,
  VideoTranscriptItem,
  VideoCheckpointQuestion 
} from '../../types';
import { VideoEdpuzzleQuiz } from './VideoEdpuzzleQuiz';
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
  ListOrdered,
  HelpCircle,
  Volume2
} from 'lucide-react';

interface MultimediaLibraryProps {
  resources: MediaResource[];
  currentClass?: string;
  students?: Student[];
  onOpenSimulator: () => void;
  onAddResource: (resource: MediaResource) => void;
  onToggleFavorite: (id: string) => void;
  onNavigateToQuiz?: () => void;
  onOpenEdpuzzle?: (resourceId?: string) => void;
  onAssignToCalendar?: (event: CalendarEvent) => void;
  onRecordGrade?: (studentId: string, gradeValue: number, subject: string) => void;
  onUpdateResource?: (updatedResource: MediaResource) => void;
}

// Recommended Italian Technology YouTube educational suggestions for 1-click import (with exact synchronized transcripts & EdPuzzle checkpoints)
const YOUTUBE_PRESETS: Array<{
  title: string;
  channel: string;
  youtubeId: string;
  area: SubjectArea;
  grade: GradeLevel;
  duration: string;
  desc: string;
  timestamps: { time: string; note: string }[];
  transcript: VideoTranscriptItem[];
  edpuzzleQuestions: VideoCheckpointQuestion[];
}> = [
  {
    title: 'Disegno Tecnico: Capire le Proiezioni Ortogonali in 6 minuti',
    channel: 'Tecnologia Duepuntozero',
    youtubeId: 'mO62k8_j544',
    area: 'Proiezioni Ortogonali',
    grade: '2ª Media',
    duration: '6:04 min',
    desc: 'Spiegazione del Triedro di Monge: PO, PV, PL e animazione dell\'apertura del diedro sul foglio da disegno.',
    timestamps: [
      { time: '00:00', note: 'Il problema della terza dimensione: 3D nello spazio vs 2D sul foglio' },
      { time: '00:50', note: 'Gaspard Monge e il Triedro di riferimento a 3 piani ortogonali' },
      { time: '01:30', note: 'I tre piani di proiezione: PO (orizzontale), PV (verticale), PL (laterale) e Linea di Terra' },
      { time: '02:40', note: 'Raggi proiettanti ortogonali e vista dall\'alto (Pianta sul PO)' },
      { time: '03:45', note: 'Prospetto sul PV, vista laterale sul PL e spigoli nascosti a tratteggio' },
      { time: '04:50', note: 'Ribaltamento del diedro: apertura a 180° e archi con compasso in O' }
    ],
    transcript: [
      {
        time: '00:00',
        seconds: 0,
        speaker: 'Prof.ssa Martina (Tecnologia Duepuntozero)',
        text: 'Benvenuti a questa lezione di tecnologia e disegno. Nel mondo reale tutti gli oggetti hanno tre dimensioni: larghezza, altezza e profondità. Tuttavia il nostro foglio da disegno è una superficie piana a sole due dimensioni. Come possiamo rappresentare un solido senza distorcerne le misure reali?',
        keyConcept: 'Il problema della terza dimensione'
      },
      {
        time: '00:50',
        seconds: 50,
        speaker: 'Prof.ssa Martina',
        text: 'Per risolvere questo problema, alla fine del Settecento il matematico francese Gaspard Monge ideò il metodo delle proiezioni ortogonali. Immaginiamo di inserire l\'oggetto all\'interno di uno spazio delimitato da tre piani reciprocamente perpendicolari tra loro: questo apparato prende il nome di Triedro di Monge.',
        keyConcept: 'Il Triedro di Monge'
      },
      {
        time: '01:30',
        seconds: 90,
        speaker: 'Prof.ssa Martina',
        text: 'I tre piani fondamentali sono: il Piano Orizzontale (PO), che corrisponde al pavimento o piano d\'appoggio; il Piano Verticale (PV), che corrisponde alla parete di fronte a noi; e il Piano Laterale (PL), che è la parete posta alla nostra sinistra. La linea di intersezione orizzontale tra PO e PV si chiama Linea di Terra (LT).',
        keyConcept: 'PO, PV, PL e Linea di Terra'
      },
      {
        time: '02:40',
        seconds: 160,
        speaker: 'Prof.ssa Martina',
        text: 'I raggi visivi, detti raggi proiettanti, partono dall\'infinito: sono paralleli tra loro e incidono a 90 gradi, cioè perpendicolarmente, sui piani di proiezione. Se ci posizioniamo esattamente sopra l\'oggetto e guardiamo dall\'alto verso il basso, otteniamo sul Piano Orizzontale la vista dall\'alto, detta comunemente pianta.',
        keyConcept: 'Raggi proiettanti e vista sul PO'
      },
      {
        time: '03:45',
        seconds: 225,
        speaker: 'Prof.ssa Martina',
        text: 'Guardando l\'oggetto di fronte, i raggi proiettano la sagoma sul Piano Verticale: otteniamo così il prospetto o vista frontale. Guardando poi dal fianco sinistro verso destra otteniamo la vista laterale sul Piano Laterale. Ricordate: gli spigoli che non sono direttamente visibili dal nostro punto di vista devono essere disegnati a norma UNI con linea tratteggiata.',
        keyConcept: 'Prospetto, fianco e spigoli nascosti a tratteggio'
      },
      {
        time: '04:50',
        seconds: 290,
        speaker: 'Prof.ssa Martina',
        text: 'Infine, per disegnare tutto su un unico foglio, dobbiamo ribaltare i piani nello spazio! Il Piano Orizzontale ruota di 90 gradi verso il basso, mentre il Piano Laterale si apre a 90 gradi verso destra. Nel quadrante in basso a destra, detto piano di ribaltamento, puntiamo il compasso con centro nell\'origine O per trasferire con archi le profondità dal PO alla Linea di Terra verso il PL.',
        keyConcept: 'Apertura del diedro e archi con compasso in O'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-po-1',
        timestampSeconds: 90,
        timestampLabel: '01:30',
        question: 'Nel Triedro di Monge, quale piano corrisponde alla vista dell\'oggetto osservato dall\'alto?',
        options: [
          'Il Piano Verticale (PV)',
          'Il Piano Orizzontale (PO)',
          'Il Piano Laterale (PL)',
          'La Linea di Terra (LT)'
        ],
        correctIndex: 1,
        explanation: 'La docente spiega che il Piano Orizzontale (PO) raccoglie la vista dall\'alto (pianta), corrispondendo al piano del pavimento.',
        transcriptSnippet: 'I tre piani fondamentali sono: il Piano Orizzontale (PO), che corrisponde al pavimento o piano d\'appoggio...'
      },
      {
        id: 'edp-po-2',
        timestampSeconds: 160,
        timestampLabel: '02:40',
        question: 'Come sono definiti i raggi proiettanti nel metodo delle proiezioni ortogonali?',
        options: [
          'Raggi convergenti verso un solo punto dell\'occhio',
          'Raggi paralleli tra loro e perpendicolari (a 90°) ai piani di proiezione',
          'Raggi inclinati a 45 gradi assonometrici',
          'Raggi a spirale che ruotano attorno al solido'
        ],
        correctIndex: 1,
        explanation: 'I raggi sono paralleli tra loro e colpiscono perpendicolarmente (a 90°) i piani di proiezione.',
        transcriptSnippet: 'I raggi visivi, detti raggi proiettanti, partono dall\'infinito: sono paralleli tra loro e incidono a 90 gradi, cioè perpendicolarmente, sui piani...'
      },
      {
        id: 'edp-po-3',
        timestampSeconds: 225,
        timestampLabel: '03:45',
        question: 'Secondo le norme UNI citate dalla docente, come si disegnano gli spigoli di un solido non visibili direttamente?',
        options: [
          'Con linea continua di grosso spessore',
          'Non si disegnano affatto sulla tavola',
          'Con linea tratteggiata di medio spessore',
          'Con linea a punto e tratto'
        ],
        correctIndex: 2,
        explanation: 'Gli spigoli nascosti devono essere rappresentati con linea a tratto medio (tratteggiata).',
        transcriptSnippet: 'Ricordate: gli spigoli che non sono direttamente visibili dal nostro punto di vista devono essere disegnati a norma UNI con linea tratteggiata.'
      },
      {
        id: 'edp-po-4',
        timestampSeconds: 290,
        timestampLabel: '04:50',
        question: 'Quale strumento si usa nel quadrante di ribaltamento (in basso a destra) con centro nell\'origine O per trasferire le misure su PL?',
        options: [
          'La riga graduata a mano libera',
          'Il compasso (balaustrone) tracciando archi di cerchio',
          'Il goniometro a 45 gradi',
          'La gomma pane'
        ],
        correctIndex: 1,
        explanation: 'Nel piano di ribaltamento si punta il compasso nell\'origine O per ruotare le proiezioni dal PO alla Linea di Terra verso il PL.',
        transcriptSnippet: 'Nel quadrante in basso a destra, detto piano di ribaltamento, puntiamo il compasso con centro nell\'origine O per trasferire con archi le profondità...'
      }
    ]
  },
  {
    title: 'I Materiali: La Lavorazione del Legno e la Filiera Industriale',
    channel: 'HUB Scuola / Mondadori Education',
    youtubeId: 's66Zt2rS5lU',
    area: 'Materiali & Risorse',
    grade: '1ª Media',
    duration: '8:45 min',
    desc: 'Dalla foresta alla segheria: abbattimento, scortecciatura, segagione in tavole commerciali e semilavorati MDF/compensato.',
    timestamps: [
      { time: '00:30', note: 'Struttura biologica del tronco: corteccia, alburno e durame' },
      { time: '02:10', note: 'Abbattimento controllato in inverno e sramatura dei tronchi' },
      { time: '04:05', note: 'Lavorazioni in segheria: segagione in travi e tavole commerciali' },
      { time: '06:15', note: 'Stagionatura naturale all\'aria vs artificiale nei forni ad aria calda' },
      { time: '07:30', note: 'I semilavorati: compensati a fibre ortogonali, truciolari e pannelli MDF' }
    ],
    transcript: [
      {
        time: '00:30',
        seconds: 30,
        speaker: 'Voce Narrante (HUB Scuola)',
        text: 'Il legno è il tessuto vegetale che costituisce il fusto degli alberi. Sezionando un tronco riconosciamo la corteccia esterna protettiva, il libro, il cambio generatore e il legno vero e proprio: l\'alburno, più chiaro e giovane dove scorre la linfa grezza, e il durame, la parte centrale più compatta e resistente.',
        keyConcept: 'Struttura anatomica del tronco'
      },
      {
        time: '02:10',
        seconds: 130,
        speaker: 'Voce Narrante',
        text: 'L\'abbattimento degli alberi da legname avviene principalmente d\'inverno. In questa stagione la pianta è in letargo vegetativo e i vasi legnosi contengono la minima quantità di linfa e umidità. Una volta abbattuto il tronco, i taglialegna procedono alla sramatura e alla scortecciatura.',
        keyConcept: 'Perché si abbatte in inverno'
      },
      {
        time: '04:05',
        seconds: 245,
        speaker: 'Voce Narrante',
        text: 'I tronchi arrivano alla segheria tramite autocarri o fluitazione lungo i fiumi. Qui potenti seghe a nastro e circolari trasformano il tronco in semilavorati commerciali: travi, travetti, assi, tavole e panconi. Tuttavia il legno fresco contiene ancora fino al 50% di acqua.',
        keyConcept: 'Segagione in segheria'
      },
      {
        time: '06:15',
        seconds: 375,
        speaker: 'Voce Narrante',
        text: 'Per evitare deformazioni e fessurazioni, il legno deve essere sottoposto a stagionatura. La stagionatura naturale all\'aria aperta richiede da diversi mesi fino a due o tre anni. Oggi si preferisce la stagionatura artificiale, in cui le tavole vengono essiccate in forni ad aria calda e ventilazione forzata in pochi giorni.',
        keyConcept: 'Stagionatura naturale vs artificiale'
      },
      {
        time: '07:30',
        seconds: 450,
        speaker: 'Voce Narrante',
        text: 'Accanto al legno massello, l\'industria moderna produce molti semilavorati in pannelli. Il compensato e il multistrato sono formati da fogli sottili di legno incollati con il verso delle fibre incrociato a 90 gradi: in questo modo si compensa la tendenza naturale del legno a imbarcarsi. I pannelli MDF sono invece realizzati con finissime fibre di legno pressate.',
        keyConcept: 'Pannelli compensati e MDF'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-legno-1',
        timestampSeconds: 130,
        timestampLabel: '02:10',
        question: 'Per quale motivo il taglio degli alberi da legname si effettua preferibilmente durante la stagione invernale?',
        options: [
          'Perché c\'è meno traffico per i camion di trasporto',
          'Perché la pianta è in letargo e contiene la minima quantità di linfa nei vasi',
          'Perché il legno è congelato e più facile da spaccare',
          'Perché gli alberi non hanno foglie e si vedono meglio'
        ],
        correctIndex: 1,
        explanation: 'In inverno l\'albero è a riposo vegetativo, la linfa non scorre e il legno contiene meno umidità.',
        transcriptSnippet: 'In questa stagione la pianta è in letargo vegetativo e i vasi legnosi contengono la minima quantità di linfa e umidità.'
      },
      {
        id: 'edp-legno-2',
        timestampSeconds: 375,
        timestampLabel: '06:15',
        question: 'Qual è il vantaggio principale della stagionatura artificiale rispetto a quella naturale?',
        options: [
          'Costa meno della legna da ardere',
          'Richiede solo pochi giorni in forni ad aria calda controllata invece di anni all\'aperto',
          'Rende il legno trasparente come il vetro',
          'Aumenta il peso del legname'
        ],
        correctIndex: 1,
        explanation: 'La stagionatura artificiale essicca le tavole in pochi giorni con aria calda e ventilazione forzata.',
        transcriptSnippet: 'Oggi si preferisce la stagionatura artificiale, in cui le tavole vengono essiccate in forni ad aria calda e ventilazione forzata in pochi giorni.'
      },
      {
        id: 'edp-legno-3',
        timestampSeconds: 450,
        timestampLabel: '07:30',
        question: 'Come sono orientate le fibre dei sottili fogli di legno (piallacci) che compongono un pannello di compensato?',
        options: [
          'Tutte rigorosamente parallele tra loro',
          'Con il verso delle fibre orientato a 90° (ortogonale) l\'uno rispetto all\'altro',
          'Disposte in diagonale a 45 gradi',
          'Frantumate a polvere casuale'
        ],
        correctIndex: 1,
        explanation: 'Incrociando le fibre a 90 gradi si compensa la naturale tendenza del legno a curvarsi.',
        transcriptSnippet: 'Il compensato e il multistrato sono formati da fogli sottili di legno incollati con il verso delle fibre incrociato a 90 gradi...'
      }
    ]
  },
  {
    title: 'La Siderurgia: Come Funziona l\'Altoforno e la Produzione dell\'Acciaio',
    channel: 'Ingegneria Italia & HUB Scuola',
    youtubeId: 'ECQUWIGTZm0',
    area: 'Materiali & Risorse',
    grade: '1ª Media',
    duration: '9:20 min',
    desc: 'Il ciclo siderurgico completo: la carica con minerale di ferro e coke a 1800 °C, ghisa grezza e affinazione in acciaio.',
    timestamps: [
      { time: '00:45', note: 'I minerali di ferro e i componenti della carica (minerale, coke, calcare)' },
      { time: '02:20', note: 'L\'altoforno a funzionamento ininterrotto e reazioni a 1800 °C' },
      { time: '04:40', note: 'La ghisa grezza: elevato tenore di carbonio (> 2,06%) e fragilità' },
      { time: '06:50', note: 'Convertitori a ossigeno LD per la decarburazione e trasformazione in acciaio' }
    ],
    transcript: [
      {
        time: '00:45',
        seconds: 45,
        speaker: 'Ingegneria Italia & HUB Scuola',
        text: 'La siderurgia è il settore metallurgico che si occupa della produzione e lavorazione del ferro e delle sue leghe: ghisa e acciaio. Il ferro puro in natura è rarissimo; viene estratto da minerali come siderite, ematite e magnetite. Per liberare il ferro dall\'ossigeno è necessario l\'altoforno.',
        keyConcept: 'Definizione di siderurgia'
      },
      {
        time: '02:20',
        seconds: 140,
        speaker: 'Ingegneria Italia & HUB Scuola',
        text: 'L\'altoforno è un\'imponente torre alta fino a 50 metri che lavora a ciclo continuo per molti anni senza mai spegnersi. Dall\'alto viene introdotta la carica, formata da strati alternati di minerale di ferro, fondente (calcare) e coke metallurgico. Dal basso viene soffiata aria caldissima a 1000 gradi che brucia il coke e porta le temperature a 1800 °C.',
        keyConcept: 'La torre dell\'altoforno'
      },
      {
        time: '04:40',
        seconds: 280,
        speaker: 'Ingegneria Italia & HUB Scuola',
        text: 'Nel crogiolo sul fondo dell\'altoforno si raccoglie la ghisa fusa, mentre le impurità, chiamate scorie o loppa, galleggiano e vengono separate. La ghisa ottenuta contiene molto carbonio, oltre il 2,06%: per questo è un materiale duro ma molto fragile, che non può essere forgiato né saldato a caldo.',
        keyConcept: 'Ghisa grezza e scorie'
      },
      {
        time: '06:50',
        seconds: 410,
        speaker: 'Ingegneria Italia & HUB Scuola',
        text: 'Oltre il 90% della ghisa fusa viene trasportata con carri siluro all\'acciaieria. Nei convertitori LD viene iniettato ossigeno puro ad altissima pressione: l\'ossigeno brucia il carbonio in eccesso portandolo al di sotto del 2,06%. Si ottiene così l\'acciaio, una lega tenace, elastica, saldabile e adatta alla laminazione.',
        keyConcept: 'Conversione in acciaio nei forni LD'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-sid-1',
        timestampSeconds: 140,
        timestampLabel: '02:20',
        question: 'Quali sono i tre ingredienti fondamentali introdotti dall\'alto nella torre dell\'altoforno?',
        options: [
          'Sabbia silicea, acqua e petrolio',
          'Minerale di ferro, carbone coke e calcare (fondente)',
          'Alluminio, rame e zolfo',
          'Acciaio fuso, ossigeno e gesso'
        ],
        correctIndex: 1,
        explanation: 'La carica dell\'altoforno è costituita da minerale ferroso, carbon coke e calcare fondente.',
        transcriptSnippet: 'Dall\'alto viene introdotta la carica, formata da strati alternati di minerale di ferro, fondente (calcare) e coke metallurgico.'
      },
      {
        id: 'edp-sid-2',
        timestampSeconds: 280,
        timestampLabel: '04:40',
        question: 'Qual è la caratteristica chimica principale che distingue la ghisa dall\'acciaio?',
        options: [
          'La ghisa contiene piombo, l\'acciaio rame',
          'La ghisa ha una percentuale di carbonio superiore al 2,06%, che la rende dura ma fragile',
          'L\'acciaio non contiene ferro',
          'La ghisa fonde a 3000 gradi e l\'acciaio a 100 gradi'
        ],
        correctIndex: 1,
        explanation: 'Sopra il 2,06% di carbonio è ghisa (dura e fragile), sotto è acciaio (tenace ed elastico).',
        transcriptSnippet: 'La ghisa ottenuta contiene molto carbonio, oltre il 2,06%: per questo è un materiale duro ma molto fragile...'
      },
      {
        id: 'edp-sid-3',
        timestampSeconds: 410,
        timestampLabel: '06:50',
        question: 'Nei convertitori LD dell\'acciaieria, cosa viene insufflato nella ghisa fusa per trasformarla in acciaio?',
        options: [
          'Acqua fredda nebulizzata',
          'Ossigeno puro ad alta pressione per bruciare il carbonio in eccesso',
          'Gas metano',
          'Polvere di pietra pomice'
        ],
        correctIndex: 1,
        explanation: 'L\'ossigeno puro brucia il carbonio in eccesso portandolo al di sotto del 2,06%.',
        transcriptSnippet: 'Nei convertitori LD viene iniettato ossigeno puro ad altissima pressione: l\'ossigeno brucia il carbonio in eccesso portandolo al di sotto del 2,06%.'
      }
    ]
  },
  {
    title: 'Energia Rinnovabile: Come Funziona la Centrale Idroelettrica a Salto',
    channel: 'Ingegneria Italia',
    youtubeId: 'zdocDK9KA4M',
    area: 'Energia & Fonti Rinnovabili',
    grade: '2ª Media',
    duration: '8:15 min',
    desc: 'Funzionamento del bacino montano, condotta forzata, sala macchine con turbina Pelton e alternatore sincrono.',
    timestamps: [
      { time: '01:00', note: 'Il bacino di accumulo montano e la diga di sbarramento (energia potenziale)' },
      { time: '02:40', note: 'La condotta forzata: trasformazione in energia cinetica e pressione' },
      { time: '04:30', note: 'Turbina Pelton con girante a doppi cucchiai e ugelli Doble' },
      { time: '06:10', note: 'Alternatore sincrono a 50 Hz e trasformazione in elettricità' }
    ],
    transcript: [
      {
        time: '01:00',
        seconds: 60,
        speaker: 'Ingegneria Italia',
        text: 'Nelle centrali idroelettriche a salto o a deflusso regolato, l\'acqua di fiumi e torrenti viene bloccata ad alta quota da una diga, creando un bacino montano artificiale. In questo bacino l\'acqua immagazzina energia potenziale gravitazionale proporzionale all\'altezza del salto.',
        keyConcept: 'Energia potenziale e diga'
      },
      {
        time: '02:40',
        seconds: 160,
        speaker: 'Ingegneria Italia',
        text: 'Attraverso un\'opera di presa, l\'acqua viene incanalata in una condotta forzata in acciaio o cemento armato che scende ripida a valle. Lungo la caduta l\'energia potenziale si trasforma in energia cinetica e l\'acqua raggiunge pressioni elevate, spesso superiori a decine di bar.',
        keyConcept: 'Condotta forzata e pressione'
      },
      {
        time: '04:30',
        seconds: 270,
        speaker: 'Ingegneria Italia',
        text: 'All\'arrivo nella centrale, l\'acqua fuoriesce ad altissima velocità da ugelli conici dotati di spillo regolatore Doble e colpisce le pale a forma di doppio cucchiaio della turbina Pelton. La forza dell\'acqua mette in rapidissima rotazione l\'albero motore meccanico.',
        keyConcept: 'Turbina Pelton a cucchiai'
      },
      {
        time: '06:10',
        seconds: 370,
        speaker: 'Ingegneria Italia',
        text: 'L\'albero della turbina è collegato direttamente all\'alternatore, composto da rotore magnetico e statore con bobine di rame. Attraverso l\'induzione elettromagnetica l\'energia meccanica di rotazione viene convertita in energia elettrica a corrente alternata a 50 Hertz.',
        keyConcept: 'Alternatore e induzione magnetica'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-idro-1',
        timestampSeconds: 160,
        timestampLabel: '02:40',
        question: 'Quale trasformazione di energia avviene mentre l\'acqua precipita lungo la condotta forzata verso valle?',
        options: [
          'Energia nucleare si trasforma in energia solare',
          'L\'energia potenziale gravitazionale si trasforma in energia cinetica e pressione',
          'Energia chimica in energia termica',
          'L\'acqua perde energia e rallenta'
        ],
        correctIndex: 1,
        explanation: 'La caduta nel dislivello trasforma l\'energia potenziale di quota in energia cinetica di movimento ad altissima velocità e pressione.',
        transcriptSnippet: 'Lungo la caduta l\'energia potenziale si trasforma in energia cinetica e l\'acqua raggiunge pressioni elevate...'
      },
      {
        id: 'edp-idro-2',
        timestampSeconds: 270,
        timestampLabel: '04:30',
        question: 'Quale forma caratteristica hanno le pale della turbina Pelton, tipicamente impiegata nei grandi salti alpini?',
        options: [
          'Pale piatte elicoidali come quelle di un ventilatore',
          'Pale a forma di doppio cucchiaio con tagliamare centrale',
          'Pale a elica orientabile di nave',
          'Una ruota dentata per ingranaggi'
        ],
        correctIndex: 1,
        explanation: 'Le pale Pelton sono conformate a doppio cucchiaio per dividere il getto d\'acqua e sfruttarne tutta la spinta.',
        transcriptSnippet: '...colpisce le pale a forma di doppio cucchiaio della turbina Pelton. La forza dell\'acqua mette in rapidissima rotazione l\'albero motore...'
      },
      {
        id: 'edp-idro-3',
        timestampSeconds: 370,
        timestampLabel: '06:10',
        question: 'Quale macchina converte la rotazione meccanica della turbina in corrente elettrica alternata?',
        options: [
          'Il compressore volumetrico',
          'L\'alternatore (generatore sincrono)',
          'La caldaia a vapore',
          'Il contatore del gas'
        ],
        correctIndex: 1,
        explanation: 'L\'alternatore sfrutta l\'induzione elettromagnetica per generare corrente alternata a partire dal moto rotatorio.',
        transcriptSnippet: 'L\'albero della turbina è collegato direttamente all\'alternatore... Attraverso l\'induzione elettromagnetica l\'energia meccanica di rotazione viene convertita in energia elettrica...'
      }
    ]
  },
  {
    title: 'Disegno Geometrico: Squadratura del Foglio F4 con Riga e Compasso',
    channel: 'HUB Scuola',
    youtubeId: 'R9j0qP1fW1Q',
    area: 'Disegno Tecnico',
    grade: '1ª Media',
    duration: '5:30 min',
    desc: 'Tutorial per la prima media: diagonali con 2H, 4 archi di compasso con r = 9 cm, cornice marcata HB e cartiglio.',
    timestamps: [
      { time: '00:15', note: 'Fissare il foglio F4 al tavolo con nastro di carta' },
      { time: '01:10', note: 'Tracciamento delle due diagonali leggere con matita 2H per trovare il centro O' },
      { time: '02:30', note: 'Apertura compasso fissa r = 90 mm e tracciamento dei 4 archetti 1, 2, 3, 4' },
      { time: '03:45', note: 'Archi dai quattro punti di intersezione verso i bordi perimetrali' },
      { time: '04:50', note: 'Ripasso della cornice con matita HB marcata e riquadro intestazione' }
    ],
    transcript: [
      {
        time: '00:15',
        seconds: 15,
        speaker: 'Prof. Falanga',
        text: 'Oggi vediamo la squadratura del foglio da disegno F4 liscio. Fissiamo con cura i quattro angoli con del nastro carta da carrozziere per non strappare il foglio al termine.',
        keyConcept: 'Posizionamento del foglio'
      },
      {
        time: '01:10',
        seconds: 70,
        speaker: 'Prof. Falanga',
        text: 'Prendiamo la riga da 50 o 60 cm e con la matita 2H ben temperata colleghiamo gli spigoli opposti tracciando le due diagonali. Il tratto deve essere leggerissimo, appena percettibile. Il punto di incontro al centro è l\'origine O.',
        keyConcept: 'Diagonali 2H e centro O'
      },
      {
        time: '02:30',
        seconds: 150,
        speaker: 'Prof. Falanga',
        text: 'Prendiamo il compasso balaustrone e regoliamo l\'apertura a esattamente 9 centimetri sulla riga. Puntiamo l\'ago metallico nel centro O e tracciamo quattro archetti sulle diagonali, numerando i punti 1, 2, 3 e 4.',
        keyConcept: 'Compasso ad apertura 9 cm'
      },
      {
        time: '03:45',
        seconds: 225,
        speaker: 'Prof. Falanga',
        text: 'Mantenendo rigorosamente la stessa apertura di 9 cm, puntiamo prima nel punto 1 e tracciamo due archetti in alto e a sinistra; ripetiamo per 2, 3 e 4. I punti in cui gli archi si intersecano definiscono gli spigoli della nostra cornice perimetrale.',
        keyConcept: 'Intersezioni perimetrali'
      },
      {
        time: '04:50',
        seconds: 290,
        speaker: 'Prof. Falanga',
        text: 'Ora cambiamo matita: prendiamo la matita HB e con la riga uniamo i punti ottenuti tracciando le 4 linee della cornice con un tratto continuo forte, pulito e marcato. Concludiamo con gli assi mediani e il cartiglio in basso.',
        keyConcept: 'Cornice definitiva HB e cartiglio'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-sq-1',
        timestampSeconds: 70,
        timestampLabel: '01:10',
        question: 'Quale tipo di matita si deve adoperare per tracciare le diagonali iniziali della squadratura?',
        options: [
          'Matita 2B morbida e scura',
          'Matita 2H a punta fine con tratto leggero',
          'Pennarello nero indelebile',
          'Matita colorata rossa'
        ],
        correctIndex: 1,
        explanation: 'Le linee di costruzione devono essere sottilissime e facili da cancellare, quindi si usa la matita 2H.',
        transcriptSnippet: 'Prendiamo la riga da 50 o 60 cm e con la matita 2H ben temperata colleghiamo gli spigoli opposti...'
      },
      {
        id: 'edp-sq-2',
        timestampSeconds: 150,
        timestampLabel: '02:30',
        question: 'Qual è l\'apertura standard del compasso consigliata per eseguire la squadratura sul foglio F4?',
        options: [
          'Esattamente 2 centimetri',
          'Esattamente 9 centimetri (90 mm)',
          'Tutta l\'apertura massima possibile',
          '15 millimetri'
        ],
        correctIndex: 1,
        explanation: 'L\'apertura canonica di 9 cm (90 mm) garantisce una cornice proporzionata alle dimensioni del foglio F4.',
        transcriptSnippet: 'Prendiamo il compasso balaustrone e regoliamo l\'apertura a esattamente 9 centimetri sulla riga...'
      },
      {
        id: 'edp-sq-3',
        timestampSeconds: 290,
        timestampLabel: '04:50',
        question: 'Con quale gradazione di matita si deve ripassare la linea definitiva della cornice perimetrale squadrata?',
        options: [
          'Matita 3H durissima',
          'Matita HB a tratto continuo forte e marcato',
          'Gessetto bianco',
          'Solo a china liquida'
        ],
        correctIndex: 1,
        explanation: 'Le linee definitive visibili a norma UNI si ripassano con matita media (HB) a tratto marcato.',
        transcriptSnippet: 'Ora cambiamo matita: prendiamo la matita HB e con la riga uniamo i punti ottenuti tracciando le 4 linee della cornice con un tratto continuo forte...'
      }
    ]
  },
  {
    title: 'La Corrente Elettrica, Tensione e la Legge di Ohm (V = I · R)',
    channel: 'Tecnologia Duepuntozero',
    youtubeId: 'kYqg1kKjV9A',
    area: 'Elettricità & Elettronica',
    grade: '3ª Media',
    duration: '8:10 min',
    desc: 'Movimento di elettroni, definizione di Volt, Ampere e Ohm, circuiti in serie e parallelo con formule inverse.',
    timestamps: [
      { time: '01:00', note: 'Struttura dell\'atomo ed elettroni liberi di conduzione nei metalli' },
      { time: '02:30', note: 'Le 3 grandezze: Tensione V (Volt), Intensità I (Ampere), Resistenza R (Ohm)' },
      { time: '04:15', note: 'La prima Legge di Ohm (V = I * R) e formule inverse' },
      { time: '06:20', note: 'Circuiti in serie vs parallelo nelle abitazioni civili' }
    ],
    transcript: [
      {
        time: '01:00',
        seconds: 60,
        speaker: 'Tecnologia Duepuntozero',
        text: 'Tutta la materia è formata da atomi. Nei metalli come il rame, gli elettroni più esterni dell\'atomo sono debolmente legati al nucleo e possono muoversi liberamente: sono gli elettroni di conduzione. Quando applichiamo un generatore, questi elettroni si spostano in modo ordinato dal polo negativo verso il polo positivo.',
        keyConcept: 'Flusso di elettroni'
      },
      {
        time: '02:30',
        seconds: 150,
        speaker: 'Tecnologia Duepuntozero',
        text: 'Per capire un circuito dobbiamo conoscere tre grandezze: la Tensione (V), misurata in Volt, che è la differenza di potenziale o spinta elettrica; l\'Intensità (I), misurata in Ampere, cioè quanti coulomb di elettroni passano al secondo; e la Resistenza (R), misurata in Ohm, cioè l\'ostacolo che il materiale oppone al passaggio della corrente.',
        keyConcept: 'Volt, Ampere e Ohm'
      },
      {
        time: '04:15',
        seconds: 255,
        speaker: 'Tecnologia Duepuntozero',
        text: 'Nel 1827 il fisico George Simon Ohm scoprì la fondamentale relazione matematica: V = I moltiplicato per R. Questo significa che a parità di resistenza, raddoppiando la tensione raddoppierà anche la corrente. Con le formule inverse calcoliamo: I = V diviso R, oppure R = V diviso I.',
        keyConcept: 'Formula di Ohm e formule inverse'
      },
      {
        time: '06:20',
        seconds: 380,
        speaker: 'Tecnologia Duepuntozero',
        text: 'Nei circuiti con carichi in serie la corrente è identica in tutti i punti: se una lampada si fulmina, l\'intero circuito si interrompe. Nelle nostre case gli impianti sono invece collegati tutti in parallelo: ogni elettrodomestico riceve la tensione di 230 Volt indipendentemente dagli altri.',
        keyConcept: 'Serie vs Parallelo nelle abitazioni'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-ohm-1',
        timestampSeconds: 150,
        timestampLabel: '02:30',
        question: 'Quale unità di misura corrisponde all\'ostacolo che un conduttore oppone al passaggio della corrente elettrica?',
        options: [
          'Volt (V)',
          'Ohm (Ω)',
          'Ampere (A)',
          'Watt (W)'
        ],
        correctIndex: 1,
        explanation: 'La Resistenza elettrica, ovvero l\'ostacolo al passaggio degli elettroni, si misura in Ohm (Ω).',
        transcriptSnippet: '...e la Resistenza (R), misurata in Ohm, cioè l\'ostacolo che il materiale oppone al passaggio della corrente.'
      },
      {
        id: 'edp-ohm-2',
        timestampSeconds: 255,
        timestampLabel: '04:15',
        question: 'Se la tensione della presa domestica è 230 V e colleghiamo un resistore da 46 Ohm, quanta corrente I (Ampere) scorrerà?',
        options: [
          '230 * 46 = 10580 A',
          'I = V / R = 230 / 46 = 5 Ampere',
          '0,2 Ampere',
          '46 Ampere'
        ],
        correctIndex: 1,
        explanation: 'Applicando la formula inversa I = V / R: 230 diviso 46 dà esattamente 5 Ampere.',
        transcriptSnippet: 'Con le formule inverse calcoliamo: I = V diviso R, oppure R = V diviso I.'
      },
      {
        id: 'edp-ohm-3',
        timestampSeconds: 380,
        timestampLabel: '06:20',
        question: 'Perché gli impianti elettrici delle abitazioni sono realizzati con collegamenti in PARALLELO e non in serie?',
        options: [
          'Perché i cavi in serie costano troppo',
          'Perché in parallelo tutti gli elettrodomestici ricevono la stessa tensione (230V) e funzionano indipendentemente',
          'Perché in serie la corrente sarebbe troppo veloce',
          'Perché in parallelo non serve l\'interruttore salvavita'
        ],
        correctIndex: 1,
        explanation: 'In parallelo ogni presa e apparecchio può essere acceso o spento senza interrompere gli altri, e tutti ricevono 230V.',
        transcriptSnippet: 'Nelle nostre case gli impianti sono invece collegati tutti in parallelo: ogni elettrodomestico riceve la tensione di 230 Volt indipendentemente dagli altri.'
      }
    ]
  }
];

export const MultimediaLibrary: React.FC<MultimediaLibraryProps> = ({
  resources,
  currentClass = '2ª B',
  students = [],
  onOpenSimulator,
  onAddResource,
  onToggleFavorite,
  onNavigateToQuiz,
  onOpenEdpuzzle,
  onAssignToCalendar,
  onRecordGrade,
  onUpdateResource
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('Tutte le aree');
  const [selectedType, setSelectedType] = useState<string>('Tutti i tipi');
  const [selectedGrade, setSelectedGrade] = useState<string>('Tutte le classi');
  const [filterOnlyEdpuzzle, setFilterOnlyEdpuzzle] = useState<boolean>(false);
  
  // Selected resource for standard cinema player modal
  const [selectedResource, setSelectedResource] = useState<MediaResource | null>(null);
  const [cinemaSeekSeconds, setCinemaSeekSeconds] = useState<number>(0);
  const [cinemaIframeKey, setCinemaIframeKey] = useState<number>(0);
  const [activeHighlightTime, setActiveHighlightTime] = useState<string | null>(null);

  // Dedicated EdPuzzle Modal
  const [edpuzzleModalResource, setEdpuzzleModalResource] = useState<MediaResource | null>(null);

  // YouTube Search & Custom Import Modal
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
      transcript: preset.transcript,
      edpuzzleQuestions: preset.edpuzzleQuestions,
      tags: [preset.area.split(' ')[0], preset.grade, 'YouTube', 'EdPuzzle'],
      favorite: true
    };
    onAddResource(newRes);
    setShowYouTubeModal(false);
    setSelectedResource(newRes);
    setCinemaSeekSeconds(0);
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
    setCinemaSeekSeconds(0);
    setYtInputUrlOrId('');
    setYtCustomTitle('');
    setYtCustomChannel('');
    setYtPreviewId('');
  };

  // Seeking in cinema modal
  const handleCinemaSeek = (timeStr: string) => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      const s = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      setCinemaSeekSeconds(s);
      setCinemaIframeKey(k => k + 1);
      setActiveHighlightTime(timeStr);
    }
  };

  // Launch EdPuzzle
  const handleLaunchEdpuzzle = (res: MediaResource) => {
    if (onOpenEdpuzzle) {
      onOpenEdpuzzle(res.id);
    } else {
      setEdpuzzleModalResource(res);
    }
    setSelectedResource(null);
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
    if (filterOnlyEdpuzzle && (!res.edpuzzleQuestions || res.edpuzzleQuestions.length === 0)) return false;
    return true;
  });

  const edpuzzleAvailableCount = resources.filter(r => r.edpuzzleQuestions && r.edpuzzleQuestions.length > 0).length;

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
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1 font-semibold">
                <Tv className="w-3 h-3" /> YouTube & EdPuzzle Integrati
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Video-lezioni curricolari con indice dei minuti salienti verificato sulla trascrizione e quiz interattivi con checkpoint
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onOpenEdpuzzle && (
            <button
              onClick={() => onOpenEdpuzzle()}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 text-xs font-black flex items-center gap-1.5 min-h-[42px] shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Quiz Video EdPuzzle ({edpuzzleAvailableCount})
            </button>
          )}

          <button
            onClick={() => setShowYouTubeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 min-h-[42px] border border-slate-700"
          >
            <Plus className="w-4 h-4 text-rose-400" />
            Cerca & Importa
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

          {/* Quick Filter: Con Quiz EdPuzzle */}
          <button
            onClick={() => setFilterOnlyEdpuzzle(!filterOnlyEdpuzzle)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all border flex items-center gap-1.5 ${
              filterOnlyEdpuzzle
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                : 'bg-slate-900 text-amber-300 border-slate-800 hover:text-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Con Quiz EdPuzzle ({edpuzzleAvailableCount})
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
          {filteredResources.map(res => {
            const hasEdpuzzle = res.edpuzzleQuestions && res.edpuzzleQuestions.length > 0;

            return (
              <div
                key={res.id}
                className="bg-slate-850 rounded-2xl border border-slate-750 overflow-hidden hover:border-slate-650 transition-all shadow-md flex flex-col group"
              >
                {/* Card Image Banner */}
                <div 
                  onClick={() => {
                    setSelectedResource(res);
                    setCinemaSeekSeconds(0);
                    setActiveHighlightTime(null);
                  }}
                  className="h-40 relative bg-slate-900 overflow-hidden cursor-pointer"
                >
                  {/* Real YouTube thumbnail if youtubeId exists */}
                  {res.youtubeId ? (
                    <img
                      src={`https://img.youtube.com/vi/${res.youtubeId}/hqdefault.jpg`}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
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

                  {/* Duration badge & EdPuzzle checkpoint count */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1">
                    {hasEdpuzzle && (
                      <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
                        <Sparkles className="w-2.5 h-2.5" />
                        {res.edpuzzleQuestions?.length} Q EdPuzzle
                      </span>
                    )}
                    {res.durationOrPages && (
                      <div className="bg-slate-950/90 px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-200 border border-slate-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-400" />
                        {res.durationOrPages}
                      </div>
                    )}
                  </div>
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
                      onClick={() => {
                        setSelectedResource(res);
                        setCinemaSeekSeconds(0);
                        setActiveHighlightTime(null);
                      }}
                      className="font-bold text-white text-xs md:text-sm leading-snug line-clamp-2 hover:text-rose-300 cursor-pointer"
                    >
                      {res.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-1">
                    {hasEdpuzzle ? (
                      <button
                        onClick={() => handleLaunchEdpuzzle(res)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-[11px] font-black border border-amber-500/40 flex items-center gap-1 transition-all"
                      >
                        <Sparkles className="w-3 h-3" /> Quiz EdPuzzle
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 flex-wrap">
                        {res.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-750">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setSelectedResource(res);
                        setCinemaSeekSeconds(0);
                        setActiveHighlightTime(null);
                      }}
                      className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      {res.type === 'video' ? 'Guarda' : 'Apri'} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Cinema Theater Modal (Synchronized Transcripts & Minuti Salienti) */}
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
              
              <div className="flex items-center gap-2">
                {selectedResource.edpuzzleQuestions && selectedResource.edpuzzleQuestions.length > 0 && (
                  <button
                    onClick={() => handleLaunchEdpuzzle(selectedResource)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    Avvia Quiz EdPuzzle ({selectedResource.edpuzzleQuestions.length} Q)
                  </button>
                )}
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Responsive Player Box */}
            <div className="w-full bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video flex items-center justify-center">
              {selectedResource.type === 'video' && selectedResource.youtubeId ? (
                <iframe
                  key={cinemaIframeKey}
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${selectedResource.youtubeId}?autoplay=1&rel=0&start=${cinemaSeekSeconds}&modestbranding=1`}
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

            {/* Timestamps & Synchronized Transcript (Corrispondenza 1:1) */}
            {selectedResource.lessonTimestamps && selectedResource.lessonTimestamps.length > 0 && (
              <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-amber-400" />
                    Indice dei Minuti Salienti Sincronizzato con la Trascrizione
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Tocca un minuto per saltare direttamente a quel punto del video
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedResource.lessonTimestamps.map((ts, idx) => {
                    const isSelected = activeHighlightTime === ts.time;
                    const matchingTranscript = selectedResource.transcript?.find(t => t.time === ts.time);

                    return (
                      <div 
                        key={idx}
                        onClick={() => handleCinemaSeek(ts.time)}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between gap-1.5 text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-500/80 shadow-md shadow-amber-500/10'
                            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/80 shrink-0 flex items-center gap-1">
                              <Play className="w-2.5 h-2.5 fill-current" />
                              {ts.time}
                            </span>
                            <span className="font-bold text-white leading-snug">{ts.note}</span>
                          </div>
                        </div>

                        {matchingTranscript && (
                          <p className="text-[11px] text-slate-300 italic line-clamp-2 pl-1 border-l-2 border-amber-500/60">
                            "{matchingTranscript.text}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description & Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 max-w-lg">
                {selectedResource.description}
              </div>

              <div className="flex items-center gap-2">
                {selectedResource.edpuzzleQuestions && selectedResource.edpuzzleQuestions.length > 0 && (
                  <button
                    onClick={() => handleLaunchEdpuzzle(selectedResource)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    Apri Quiz EdPuzzle
                  </button>
                )}
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
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                >
                  Chiudi Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated EdPuzzle Interactive Quiz Modal */}
      {edpuzzleModalResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6">
          <div className="w-full max-w-6xl h-[92vh]">
            <VideoEdpuzzleQuiz
              resources={resources}
              initialResourceId={edpuzzleModalResource.id}
              currentClass={currentClass}
              students={students}
              onAssignToCalendar={onAssignToCalendar}
              onRecordGrade={onRecordGrade}
              onUpdateResource={onUpdateResource}
              onClose={() => setEdpuzzleModalResource(null)}
            />
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
                  Importa video con trascrizione verificata e quiz EdPuzzle già pronti o inserisci qualsiasi link YouTube.
                </p>
              </div>
              <button
                onClick={() => setShowYouTubeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section 1: 1-Click Educational Presets with Transcripts and EdPuzzle Checkpoints */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Video Curricolari con Quiz EdPuzzle Pronti (1-Click)
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
                        <span className="bg-slate-800 px-1.5 py-0.2 rounded font-bold text-amber-300">
                          {p.edpuzzleQuestions.length} Q EdPuzzle
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-white line-clamp-1">{p.title}</h5>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{p.desc}</p>
                    </div>

                    <button
                      onClick={() => handleImportPreset(p)}
                      className="mt-2.5 w-full py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold border border-rose-500/40 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Importa con Trascrizione & Quiz
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
