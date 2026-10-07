import { DidacticUnit, LessonPlan, MediaResource, Student, CalendarEvent, UnitQuiz } from '../types';

export const CLASSES_LIST = ['Tutte le classi', '1ª A', '1ª B', '2ª A', '2ª B', '3ª A', '3ª C'];

export const INITIAL_UNITS: DidacticUnit[] = [
  {
    id: 'u1-materiali',
    title: 'I Materiali e l\'Economia Circolare',
    subtitle: 'Dalle risorse naturali ai processi produttivi e riciclo',
    gradeLevel: '1ª Media',
    area: 'Materiali & Risorse',
    durationHours: 14,
    completedHours: 12,
    objectives: [
      'Conoscere le proprietà fisiche, meccaniche e tecnologiche dei materiali',
      'Distinguere tra risorse rinnovabili e non rinnovabili',
      'Comprendere il ciclo del legno, dei metalli e delle materie plastiche',
      'Applicare la regola delle 3R (Ridurre, Riusare, Riciclare)'
    ],
    competencies: [
      'Riconoscere le proprietà dei materiali negli oggetti d\'uso quotidiano',
      'Adottare comportamenti ecologici e di consumo sostenibile (Agenda 2030)'
    ],
    lessonsCount: 6,
    description: 'Studio delle materie prime, dei semilavorati e dei prodotti finiti. Approfondimento su legno, metalli, vetro, ceramica e materie plastiche con focus sull\'impatto ambientale.',
    tags: ['Legno', 'Metalli', 'Plastiche', '3R', 'Proprietà Meccaniche'],
    color: '#0284c7', // sky-600
    quizId: 'quiz-u1',
    resourcesCount: 8,
    videoResourceId: 'res-yt-legno-hub'
  },
  {
    id: 'u2-disegno-base',
    title: 'Disegno Tecnico: Costruzioni Geometriche',
    subtitle: 'Strumenti da disegno, norme UNI e figure geometriche piane',
    gradeLevel: '1ª Media',
    area: 'Disegno Tecnico',
    durationHours: 16,
    completedHours: 14,
    objectives: [
      'Utilizzare correttamente riga, squadre (45° e 30°/60°) e compasso',
      'Eseguire la squadratura del foglio F4 e l\'intestazione a norma UNI',
      'Costruire l\'asse di un segmento, la bisettrice di un angolo e rette parallele/perpendicolari',
      'Disegnare poligoni regolari inscritti in una circonferenza (triangolo, esagono, ottagono)'
    ],
    competencies: [
      'Padronanza del linguaggio grafico e degli strumenti di precisione',
      'Rispetto dell\'ordine, della pulizia e della leggibilità del tratto grafico'
    ],
    lessonsCount: 8,
    description: 'Fondamenti del disegno geometrico e tecnico. Uso delle matite 2H e HB, spessori delle linee a norma UNI, tracciamento preciso con squadre accoppiate.',
    tags: ['Squadratura', 'Bisettrice', 'Poligoni Inscritti', 'Norme UNI', 'Compasso'],
    color: '#0d9488', // teal-600
    quizId: 'quiz-u2',
    resourcesCount: 9,
    videoResourceId: 'res-yt-squadratura-f4'
  },
  {
    id: 'u3-proiezioni-ortogonali',
    title: 'Le Proiezioni Ortogonali (Metodo di Monge)',
    subtitle: 'Rappresentazione bidimensionale di solidi nello spazio diedrico',
    gradeLevel: '2ª Media',
    area: 'Proiezioni Ortogonali',
    durationHours: 18,
    completedHours: 10,
    objectives: [
      'Comprendere il sistema di riferimento trirettangolo (PO, PV, PL e Linea di Terra)',
      'Identificare le tre viste fondamentali: dall\'alto, frontale e laterale da sinistra',
      'Rappresentare solidi geometrici semplici (cubo, parallelepipedo, piramide retta)',
      'Utilizzare il piano di ribaltamento e il compasso per il riporto delle quote su PL',
      'Distinguere spigoli in vista (tratto forte continuo) e spigoli nascosti (tratteggio)'
    ],
    competencies: [
      'Capacità di visione spaziale e trasposizione dal 3D al 2D e viceversa',
      'Precisione esecutiva e corretta applicazione delle linee di proiezione a tratto fine'
    ],
    lessonsCount: 7,
    description: 'Il cuore del disegno tecnico della scuola media: le proiezioni ortogonali secondo Gaspard Monge. Simulazioni 3D e tavole grafiche guidate su solidi semplici e composti.',
    tags: ['Metodo Monge', 'PO PV PL', 'Linea di Terra', 'Spigoli Nascosti', 'Ribaltamento'],
    color: '#6366f1', // indigo-500
    quizId: 'quiz-u3',
    resourcesCount: 12,
    videoResourceId: 'res-yt-po-monge'
  },
  {
    id: 'u4-energia',
    title: 'Energia e Transizione Ecologica',
    subtitle: 'Fonti fossili, energie rinnovabili e centrali per la produzione elettrica',
    gradeLevel: '2ª Media',
    area: 'Energia & Fonti Rinnovabili',
    durationHours: 14,
    completedHours: 8,
    objectives: [
      'Definire il concetto fisico di energia e lavoro meccanico',
      'Conoscere il funzionamento delle centrali termoelettriche, idroelettriche ed eoliche',
      'Valutare i vantaggi del solare fotovoltaico e termico',
      'Analizzare le cause dell\'effetto serra e le sfide di decarbonizzazione (Agenda 2030)'
    ],
    competencies: [
      'Analisi critica del mix energetico e valutazione dell\'impatto ambientale',
      'Progettazione di soluzioni per il risparmio energetico a scuola e a casa'
    ],
    lessonsCount: 6,
    description: 'Dalle fonti non rinnovabili (carbone, petrolio, gas) alle rinnovabili (sole, vento, acqua, biomasse). Trasformazioni energetiche e funzionamento di turbine e alternatori.',
    tags: ['Fotovoltaico', 'Eolico', 'Idroelettrico', 'Turbina-Alternatore', 'Decarbonizzazione'],
    color: '#ea580c', // orange-600
    quizId: 'quiz-u4',
    resourcesCount: 7,
    videoResourceId: 'res-yt-centrale-idroelettrica'
  },
  {
    id: 'u5-edilizia-abitazione',
    title: 'Tecnologie Edilizie e l\'Abitazione Sostenibile',
    subtitle: 'Sistemi costruttivi, impianti domestici, bioarchitettura e classe energetica',
    gradeLevel: '2ª Media',
    area: 'Edilizia & Città Sostenibili',
    durationHours: 14,
    completedHours: 4,
    objectives: [
      'Confrontare il sistema trilitico, l\'arco a conci e la struttura a telaio in C.A.',
      'Conoscere la composizione del calcestruzzo armato e le sollecitazioni (trazione e compressione)',
      'Descrivere gli impianti dell\'abitazione: elettrico, idrico-sanitario con sifone, termico e gas',
      'Riconoscere i parametri della bioarchitettura e dell\'Attestato di Prestazione Energetica (APE)'
    ],
    competencies: [
      'Lettura di piante architettoniche e zonizzazione funzionale (giorno, notte, servizi)',
      'Consapevolezza sulla sicurezza domestica e prevenzione dei rischi idrogeologici e sismici'
    ],
    lessonsCount: 5,
    description: 'Evoluzione delle tecniche costruttive: dall\'antichità al grattacielo moderno. Studio dettagliato degli impianti domestici e dei criteri per la casa passiva.',
    tags: ['Cemento Armato', 'Telaio', 'Impianti Domestici', 'Bioarchitettura', 'APE Classe A'],
    color: '#16a34a', // green-600
    quizId: 'quiz-u5',
    resourcesCount: 6,
    videoResourceId: 'res-yt-cemento-armato'
  },
  {
    id: 'u6-elettricita',
    title: 'Elettricità, Circuiti e Smart Cities',
    subtitle: 'Flusso di elettroni, Legge di Ohm, sicurezza elettrica e reti intelligenti',
    gradeLevel: '3ª Media',
    area: 'Elettricità & Elettronica',
    durationHours: 12,
    completedHours: 2,
    objectives: [
      'Comprendere la struttura atomica e la natura della corrente elettrica',
      'Applicare la Legge di Ohm (V = I · R) e calcolare circuiti in serie e parallelo',
      'Conoscere il principio di funzionamento del motore elettrico e dell\'alternatore',
      'Identificare i sistemi di sicurezza: interruttore differenziale (salvavita) e messa a terra',
      'Comprendere il ruolo delle Smart Grid e della mobilità elettrica'
    ],
    competencies: [
      'Risoluzione di semplici problemi circuitari e lettura dell\'etichetta energetica (A-G)',
      'Uso consapevole e sicuro delle apparecchiature elettriche ed elettroniche'
    ],
    lessonsCount: 5,
    description: 'Studio dei fenomeni elettromagnetici, della distribuzione dell\'energia in alta e bassa tensione e dell\'automazione domotica per il risparmio energetico.',
    tags: ['Legge di Ohm', 'Salvavita', 'Smart Grid', 'Serie/Parallelo', 'Etichetta Energetica'],
    color: '#eab308', // yellow-500
    quizId: 'quiz-u6',
    resourcesCount: 7,
    videoResourceId: 'res-yt-corrente-elettrica'
  }
];

export const INITIAL_LESSON_PLANS: LessonPlan[] = [
  {
    id: 'lp-po-intro',
    unitId: 'u3-proiezioni-ortogonali',
    unitTitle: 'Le Proiezioni Ortogonali',
    title: 'Introduzione al Diedro di Proiezione e al Metodo di Monge',
    gradeLevel: '2ª Media',
    durationMinutes: 60,
    date: '2026-10-08',
    phases: [
      {
        name: 'Aggancio & Problematizzazione',
        durationMin: 10,
        activity: 'Mostrare un parallelepipedo reale in classe: da dove guardarlo per descriverlo senza distorsioni ottiche?',
        method: 'Lezione frontale'
      },
      {
        name: 'Spiegazione Interattiva alla LIM',
        durationMin: 20,
        activity: 'Uso del simulatore 3D: orientamento dei 3 piani (PO, PV, PL), linea di terra e raggi proiettanti perpendicolari.',
        method: 'LIM / Multimediale'
      },
      {
        name: 'Laboratorio Grafico Guidato',
        durationMin: 20,
        activity: 'Impostazione su foglio da disegno: tracciamento degli assi perpendicolari e denominazione dei quadranti con matita 2H.',
        method: 'Laboratorio'
      },
      {
        name: 'Chiusura & Verifica Formativa',
        durationMin: 10,
        activity: 'Rapido quiz visivo al tablet: identificare la vista sul PO e sul PV di una piramide retta.',
        method: 'Verifica formativa'
      }
    ],
    materialsNeeded: ['Foglio da disegno F4 liscio', 'Matite 2H e HB', 'Doppia squadra', 'Balaustrone/Compasso', 'Tablet con simulatore'],
    drawingPlateNumber: 'Tavola n. 7 - Parallelepipedo poggiato sul PO',
    homework: 'Completare la campitura a tratto leggero e ripassare con matita HB gli spigoli in vista sul PV e PL.',
    notes: 'Attenzione agli alunni con DSA: fornire la scheda con i piani colorati (PO giallo, PV azzurro, PL verde).'
  },
  {
    id: 'lp-mat-legno',
    unitId: 'u1-materiali',
    unitTitle: 'I Materiali e l\'Economia Circolare',
    title: 'Il Ciclo del Legno: Dalla Silvicoltura ai Semilavorati (MDF e Compensato)',
    gradeLevel: '1ª Media',
    durationMinutes: 60,
    date: '2026-10-12',
    phases: [
      {
        name: 'Brainstorming & Campioni',
        durationMin: 10,
        activity: 'Osservazione e tatto di campioni reali: legno massello, compensato multistrato, truciolare e pannello MDF.',
        method: 'Cooperative Learning'
      },
      {
        name: 'Video Didattico & Discussione',
        durationMin: 20,
        activity: 'Visione del video sul ciclo della segheria (abbattimento, scortecciatura, fluitazione, segagione, stagionatura).',
        method: 'LIM / Multimediale'
      },
      {
        name: 'Costruzione Mappa Concettuale',
        durationMin: 20,
        activity: 'Completamento della mappa guidata: vantaggi dei semilavorati rispetto al massello (costo, indeformabilità).',
        method: 'Laboratorio'
      },
      {
        name: 'Restituzione',
        durationMin: 10,
        activity: 'Micro-verifica lessicale sulle parole chiave: linfa, piallaccio, tamburato, stagionatura naturale/artificiale.',
        method: 'Verifica formativa'
      }
    ],
    materialsNeeded: ['Campioni di legnami', 'Scheda didattica di sintesi', 'Tablet/LIM'],
    homework: 'Scheda libro pag. 32-33: completare gli esercizi di riepilogo.',
    notes: 'Portare campioni di truciolato e multistrato per far notare la disposizione delle fibre ortogonali.'
  },
  {
    id: 'lp-en-fotovolt',
    unitId: 'u4-energia',
    unitTitle: 'Energia e Transizione Ecologica',
    title: 'Energia Solare: Sistemi Fotovoltaici e Calcolo del Fabbisogno',
    gradeLevel: '2ª Media',
    durationMinutes: 60,
    date: '2026-10-15',
    phases: [
      {
        name: 'Aggancio con Caso Reale',
        durationMin: 10,
        activity: 'Lettura di una bolletta elettrica scolastica e calcolo dei consumi medi in kilowattora (kWh).',
        method: 'Lezione frontale'
      },
      {
        name: 'Spiegazione Effetto Fotoelettrico',
        durationMin: 20,
        activity: 'La cella in silicio, l\'inverter (da corrente continua a alternata) e la differenza tra isola e connessione in rete.',
        method: 'LIM / Multimediale'
      },
      {
        name: 'Esercitazione a Gruppi',
        durationMin: 20,
        activity: 'Dimensionamento ideale di un impianto fotovoltaico domestico da 3 kWp per una famiglia di 4 persone.',
        method: 'Cooperative Learning'
      },
      {
        name: 'Quiz di Riepilogo',
        durationMin: 10,
        activity: 'Quiz digitale al tablet con correzione immediata.',
        method: 'Verifica formativa'
      }
    ],
    materialsNeeded: ['Calcolatrice', 'Scheda bolletta simulata', 'Infografica fotovoltaico'],
    homework: 'Verificare a casa dove sono esposti a sud i tetti e stimare la superficie disponibile.',
    notes: 'Ottimo spunto per interdisciplinarità con Scienze e Geografia.'
  }
];

export const INITIAL_RESOURCES: MediaResource[] = [
  {
    id: 'res-yt-po-monge',
    title: 'Disegno Tecnico: Capire le Proiezioni Ortogonali in 6 minuti',
    type: 'video',
    area: 'Proiezioni Ortogonali',
    gradeLevel: '2ª Media',
    durationOrPages: '6:04 min',
    channelName: 'Tecnologia Duepuntozero',
    youtubeId: 'mO62k8_j544',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/mO62k8_j544',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    description: 'Video-lezione fondamentale sulle proiezioni ortogonali: spiegazione del Triedro di Monge (PO, PV, PL), vista dall\'alto, frontale, laterale e apertura del diedro sul foglio da disegno.',
    tags: ['Proiezioni Ortogonali', 'Monge', 'PO PV PL', 'Disegno Tecnico'],
    favorite: true,
    lessonTimestamps: [
      { time: '00:00', note: 'Il problema della rappresentazione: 3D nello spazio vs 2D sul foglio' },
      { time: '00:50', note: 'Gaspard Monge e il Triedro di riferimento a 3 piani ortogonali' },
      { time: '01:30', note: 'Definizione dei piani: PO (orizzontale), PV (verticale), PL (laterale) e LT' },
      { time: '02:40', note: 'I raggi proiettanti ortogonali e la vista dall\'alto (Pianta sul PO)' },
      { time: '03:45', note: 'La vista frontale (Prospetto sul PV), laterale (Fianco sul PL) e spigoli nascosti' },
      { time: '04:50', note: 'Ribaltamento del diedro: apertura a 180° e archi di compasso con centro in O' }
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
        explanation: 'La docente ha appena spiegato che il Piano Orizzontale (PO) raccoglie la vista dall\'alto (pianta), corrispondendo al piano del pavimento.',
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
        explanation: 'Come evidenziato nel video, la caratteristica fondamentale dell\'ortogonalità è che i raggi sono paralleli tra loro e perpendicolari ai piani di proiezione.',
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
        explanation: 'Gli spigoli nascosti devono essere rappresentati con linea a tratto medio (tratteggiata), per distinguerli da quelli in vista a tratto continuo.',
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
    ],
    contentSnippet: 'Il metodo di Monge scompone l\'oggetto nelle sue tre proiezioni ortogonali senza deformazioni prospettiche, consentendo di leggere quote e dimensioni reali.'
  },
  {
    id: 'res-yt-legno-hub',
    title: 'I Materiali: La Lavorazione del Legno e la Filiera Industriale',
    type: 'video',
    area: 'Materiali & Risorse',
    gradeLevel: '1ª Media',
    durationOrPages: '8:45 min',
    channelName: 'HUB Scuola / Mondadori Education',
    youtubeId: 's66Zt2rS5lU',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/s66Zt2rS5lU',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=400&q=80',
    description: 'Documentario educational ufficiale HUB Scuola: dall\'albero nella foresta alla segheria, abbattimento, scortecciatura, segagione in tavole, stagionatura e fabbricazione dei pannelli di compensato e MDF.',
    tags: ['Legno', 'Silvicoltura', 'Segheria', 'MDF', 'Compensato'],
    favorite: true,
    lessonTimestamps: [
      { time: '00:30', note: 'La struttura biologica del tronco: corteccia, alburno e durame' },
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
        explanation: 'In inverno l\'albero è a riposo vegetativo, la linfa non scorre nei vasi e quindi il legno contiene meno umidità, riducendo i tempi di essiccazione.',
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
        explanation: 'La stagionatura artificiale essicca le tavole in pochi giorni in forni a circolazione forzata d\'aria calda, contro i mesi o anni di quella naturale.',
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
        explanation: 'Incrociando le fibre a 90° si compensa e annulla la tendenza del legno a curvarsi e imbarcarsi con le variazioni di umidità.',
        transcriptSnippet: 'Il compensato e il multistrato sono formati da fogli sottili di legno incollati con il verso delle fibre incrociato a 90 gradi: in questo modo si compensa la tendenza naturale del legno a imbarcarsi.'
      }
    ],
    contentSnippet: 'Il legno è una risorsa rinnovabile purché gestita con silvicoltura sostenibile. I semilavorati in pannelli superano i limiti di imbarcamento del massello.'
  },
  {
    id: 'res-yt-siderurgia-acciaio',
    title: 'La Siderurgia: Come Funziona l\'Altoforno e la Produzione dell\'Acciaio',
    type: 'video',
    area: 'Materiali & Risorse',
    gradeLevel: '1ª Media',
    durationOrPages: '9:20 min',
    channelName: 'Ingegneria Italia & HUB Scuola',
    youtubeId: 'ECQUWIGTZm0',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/ECQUWIGTZm0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
    description: 'Il ciclo completo del centro siderurgico: la carica con minerale di ferro, calcare e carbon coke nell\'altoforno a 1800 °C, la produzione di ghisa grezza, la conversione a ossigeno LD e la laminazione in rotaie e lamiere.',
    tags: ['Siderurgia', 'Altoforno', 'Ghisa', 'Acciaio', 'Laminatoio'],
    favorite: true,
    lessonTimestamps: [
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
        explanation: 'La carica dell\'altoforno è costituita da minerale ferroso, carbon coke che funge da combustibile e riducente, e calcare fondente che lega le impurità in scorie.',
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
        explanation: 'La discriminante metallurgica fondamentale tra ghisa e acciaio è la percentuale di carbonio: sopra il 2,06% è ghisa, sotto il 2,06% è acciaio.',
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
        explanation: 'L\'ossigeno puro si combina chimicamente con il carbonio della ghisa formando CO2, abbattendo la concentrazione di carbonio fino a raggiungere l\'acciaio.',
        transcriptSnippet: 'Nei convertitori LD viene iniettato ossigeno puro ad altissima pressione: l\'ossigeno brucia il carbonio in eccesso portandolo al di sotto del 2,06%.'
      }
    ],
    contentSnippet: 'L\'acciaio è una lega di ferro e carbonio altamente riciclabile all\'infinito nei forni elettrici tramite la rifusione dei rottami metallici.'
  },
  {
    id: 'res-yt-squadratura-f4',
    title: 'Disegno Geometrico: Squadratura del Foglio F4 con Riga e Compasso',
    type: 'video',
    area: 'Disegno Tecnico',
    gradeLevel: '1ª Media',
    durationOrPages: '5:30 min',
    channelName: 'HUB Scuola',
    youtubeId: 'R9j0qP1fW1Q',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/R9j0qP1fW1Q',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
    description: 'Video tutorial per alunni di prima media: impostazione della tavola da disegno, tracciamento diagonali con matita 2H leggera, 4 archi di compasso con apertura fissa di 9 cm, cornice marcata con HB e riquadro cartiglio.',
    tags: ['Squadratura', 'Foglio F4', 'Compasso 9cm', 'Disegno Tecnico'],
    favorite: true,
    lessonTimestamps: [
      { time: '00:15', note: 'Fissare il foglio F4 al tavolo con nastro di carta' },
      { time: '01:10', note: 'Tracciamento delle due diagonali leggere con matita 2H per trovare il centro O' },
      { time: '02:30', note: 'Apertura compasso fissa r = 90 mm e tracciamento dei 4 archetti 1, 2, 3, 4' },
      { time: '03:45', note: 'Archi dai quattro punti di intersezione verso i bordi' },
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
        explanation: 'Le linee di costruzione devono essere sottilissime e facili da cancellare senza lasciare solchi sulla carta, quindi si usa la matita dura 2H.',
        transcriptSnippet: 'Prendiamo la riga da 50 o 60 cm e con la matita 2H ben temperata colleghiamo gli spigoli opposti... Il tratto deve essere leggerissimo...'
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
        explanation: 'L\'apertura canonica di 9 cm (90 mm) garantisce una cornice proporzionata rispetto alle dimensioni standard del foglio F4 (24 x 33 cm).',
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
        explanation: 'Le linee definitive visibili a norma UNI si ripassano con matita media (HB) a tratto marcato e uniforme.',
        transcriptSnippet: 'Ora cambiamo matita: prendiamo la matita HB e con la riga uniamo i punti ottenuti tracciando le 4 linee della cornice con un tratto continuo forte...'
      }
    ],
    contentSnippet: 'La squadratura prepara il campo grafico e garantisce ortogonalità perfetta alle linee di base della tavola.'
  },
  {
    id: 'res-yt-centrale-idroelettrica',
    title: 'Energia Rinnovabile: Come Funziona la Centrale Idroelettrica a Salto',
    type: 'video',
    area: 'Energia & Fonti Rinnovabili',
    gradeLevel: '2ª Media',
    durationOrPages: '8:15 min',
    channelName: 'Ingegneria Italia',
    youtubeId: 'zdocDK9KA4M',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/zdocDK9KA4M',
    thumbnailUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&q=80',
    description: 'Analisi tecnica delle centrali a deflusso regolato: diga a gravità, condotta forzata in acciaio, sala macchine con turbina idraulica Pelton e generatore alternatore sincrono a 50 Hz.',
    tags: ['Idroelettrico', 'Diga', 'Turbina Pelton', 'Alternatore', 'Energia Rinnovabile'],
    favorite: true,
    lessonTimestamps: [
      { time: '01:00', note: 'Il bacino di accumulo montano e la diga di sbarramento' },
      { time: '02:40', note: 'La condotta forzata: conversione da energia potenziale a cinetica' },
      { time: '04:30', note: 'Funzionamento della girante della turbina Pelton con doppi cucchiai e ugelli' },
      { time: '06:10', note: 'L\'alternatore sincrono a 50 Hz e trasformazione in elettricità' }
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
        explanation: 'Le pale Pelton sono conformate a doppio cucchiaio per dividere il getto d\'acqua e sfruttarne tutta la spinta per reazione dinamica.',
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
        explanation: 'L\'alternatore sfrutta l\'induzione elettromagnetica scoperta da Faraday per generare corrente alternata a partire dal moto rotatorio.',
        transcriptSnippet: 'L\'albero della turbina è collegato direttamente all\'alternatore... Attraverso l\'induzione elettromagnetica l\'energia meccanica di rotazione viene convertita in energia elettrica...'
      }
    ],
    contentSnippet: 'Le centrali idroelettriche a salto fungono anche da accumulatori di energia tramite il pompaggio dell\'acqua nelle ore notturne.'
  },
  {
    id: 'res-yt-corrente-elettrica',
    title: 'La Corrente Elettrica, Tensione e la Legge di Ohm (V = I · R)',
    type: 'video',
    area: 'Elettricità & Elettronica',
    gradeLevel: '3ª Media',
    durationOrPages: '8:10 min',
    channelName: 'Tecnologia Duepuntozero',
    youtubeId: 'kYqg1kKjV9A',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/kYqg1kKjV9A',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=400&q=80',
    description: 'Il flusso degli elettroni liberi nei conduttori. Definizione rigorosa di Tensione (Volt), Intensità di corrente (Ampere) e Resistenza (Ohm). Esercizi pratici di calcolo con formule inverse e circuiti in serie e parallelo.',
    tags: ['Elettricità', 'Legge di Ohm', 'Circuiti', 'Ampere', 'Volt'],
    favorite: true,
    lessonTimestamps: [
      { time: '01:00', note: 'La struttura dell\'atomo e gli elettroni di valenza liberi di muoversi' },
      { time: '02:30', note: 'Le 3 grandezze: Tensione V (Volt), Intensità I (Ampere), Resistenza R (Ohm)' },
      { time: '04:15', note: 'La prima Legge di Ohm (V = I * R) e il triangolo delle formule inverse' },
      { time: '06:20', note: 'Circuiti in serie vs parallelo e caduta di tensione' }
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
        explanation: 'La Resistenza elettrica, ovvero la tendenza di un materiale a ostacolare il flusso di elettroni, si misura in Ohm (Ω).',
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
        explanation: 'In parallelo ogni presa e lampadario può essere acceso o spento senza interrompere l\'alimentazione degli altri apparecchi, e tutti ricevono 230V.',
        transcriptSnippet: 'Nelle nostre case gli impianti sono invece collegati tutti in parallelo: ogni elettrodomestico riceve la tensione di 230 Volt indipendentemente dagli altri.'
      }
    ],
    contentSnippet: 'La legge di Ohm formulata nel 1827 governa tutti i circuiti elettrici: all\'aumentare della tensione la corrente cresce, all\'aumentare della resistenza diminuisce.'
  },
  {
    id: 'res-yt-fotovoltaico-silicio',
    title: 'Energia Solare: Come i Pannelli Fotovoltaici Producono Elettricità',
    type: 'video',
    area: 'Energia & Fonti Rinnovabili',
    gradeLevel: '2ª Media',
    durationOrPages: '6:50 min',
    channelName: 'Geopop Edu',
    youtubeId: 'sOb59ALkGnc',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/sOb59ALkGnc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80',
    description: 'Dalla fisica dei semiconduttori alla casa a energia zero: l\'effetto fotoelettrico, il silicio monocristallino drogato, la produzione di corrente continua e il ruolo dell\'inverter per l\'alimentazione degli elettrodomestici.',
    tags: ['Fotovoltaico', 'Silicio', 'Inverter', 'Sole', 'Transizione Ecologica'],
    favorite: true,
    lessonTimestamps: [
      { time: '00:45', note: 'I fotoni della luce solare e le proprietà del silicio semiconduttore' },
      { time: '02:15', note: 'Il drogaggio con boro e fosforo: la giunzione P-N' },
      { time: '03:50', note: 'Dalla singola cella al modulo e pannello' },
      { time: '05:20', note: 'L\'inverter: trasformazione da corrente continua (CC) ad alternata (CA)' }
    ],
    transcript: [
      {
        time: '00:45',
        seconds: 45,
        speaker: 'Geopop Edu',
        text: 'La luce del Sole è composta da particelle di energia chiamate fotoni. Quando questi fotoni colpiscono un materiale semiconduttore come il silicio, trasferiscono la loro energia agli elettroni, liberandoli dai loro atomi: questo è l\'effetto fotoelettrico scoperto da Einstein.',
        keyConcept: 'Fotoni ed effetto fotoelettrico'
      },
      {
        time: '02:15',
        seconds: 135,
        speaker: 'Geopop Edu',
        text: 'Per far sì che gli elettroni liberati si muovano tutti nella stessa direzione creando una corrente, il silicio viene "drogato", cioè arricchito con impurità chimiche: da un lato atomi di fosforo (strato N ricco di cariche negative), dall\'altro atomi di boro (strato P ricco di cariche positive). Tra i due strati si crea un campo elettrico permanente.',
        keyConcept: 'Drogaggio e giunzione P-N'
      },
      {
        time: '03:50',
        seconds: 230,
        speaker: 'Geopop Edu',
        text: 'Una singola cella fotovoltaica eroga circa 0,5 Volt. Collegando in serie e in parallelo 60 o 72 celle su un telaio di alluminio protetto da vetro temperato si ottiene il modulo fotovoltaico, capace di erogare centinaia di Watt.',
        keyConcept: 'Composizione del pannello'
      },
      {
        time: '05:20',
        seconds: 320,
        speaker: 'Geopop Edu',
        text: 'La corrente prodotta dal pannello è corrente continua (DC). Nelle nostre case gli elettrodomestici funzionano invece a corrente alternata a 230 Volt. Per questo è fondamentale l\'inverter: una macchina elettronica che converte la corrente continua in alternata a 50 Hz, consentendo sia l\'uso domestico sia l\'immissione dell\'energia in eccesso nella rete elettrica nazionale.',
        keyConcept: 'Il ruolo cruciale dell\'inverter'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-fv-1',
        timestampSeconds: 135,
        timestampLabel: '02:15',
        question: 'Cosa si intende per "drogaggio" del silicio nelle celle fotovoltaiche?',
        options: [
          'La verniciatura superficiale della lastra di silicio',
          'L\'inserimento intenzionale di atomi di boro e fosforo per creare cariche positive e negative',
          'Il lavaggio con solventi chimici tossici',
          'Il raffreddamento istantaneo in azoto liquido'
        ],
        correctIndex: 1,
        explanation: 'Il drogaggio crea il dislivello elettrico (giunzione P-N) che spinge gli elettroni mossi dalla luce a fluire come corrente.',
        transcriptSnippet: '...il silicio viene "drogato", cioè arricchito con impurità chimiche: da un lato atomi di fosforo... dall\'altro atomi di boro...'
      },
      {
        id: 'edp-fv-2',
        timestampSeconds: 320,
        timestampLabel: '05:20',
        question: 'Qual è il compito indispensabile dell\'inverter in un impianto fotovoltaico domestico?',
        options: [
          'Riscaldare l\'acqua per il riscaldamento a pavimento',
          'Convertire la corrente continua (DC) prodotta dai pannelli in corrente alternata (AC) a 230V',
          'Orientare i pannelli solari verso il vento',
          'Misurare la quantità di polvere sul vetro'
        ],
        correctIndex: 1,
        explanation: 'I pannelli generano corrente continua; l\'inverter la trasforma in corrente alternata a 230V / 50 Hz utilizzabile dagli elettrodomestici di casa.',
        transcriptSnippet: 'Per questo è fondamentale l\'inverter: una macchina elettronica che converte la corrente continua in alternata a 50 Hz...'
      }
    ],
    contentSnippet: 'L\'energia solare fotovoltaica permette l\'autoconsumo e trasforma i consumatori in "prosumer" (produttori-consumatori).'
  },
  {
    id: 'res-yt-cemento-armato',
    title: 'Edilizia: Il Cemento Armato e i Sistemi Costruttivi a Telaio',
    type: 'video',
    area: 'Edilizia & Città Sostenibili',
    gradeLevel: '2ª Media',
    durationOrPages: '7:40 min',
    channelName: 'Ingegneria Edile Didattica',
    youtubeId: 'KQetemT1sWc',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/KQetemT1sWc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=400&q=80',
    description: 'Perché unire calcestruzzo e acciaio? Spiegazione visiva delle sollecitazioni di compressione e trazione in una trave inflessa. Posa delle armature in ferri sagomati, getto, casseri e confronto con il sistema ad arco e trilitico.',
    tags: ['Cemento Armato', 'Telaio', 'Pilastri', 'Travi', 'Antisismica'],
    favorite: false,
    lessonTimestamps: [
      { time: '00:50', note: 'I limiti della pietra e l\'invenzione del calcestruzzo moderno' },
      { time: '02:20', note: 'Le sollecitazioni meccaniche: calcestruzzo a compressione, acciaio a trazione' },
      { time: '04:10', note: 'L\'armatura metallica con tondini sagomati e staffe antisismiche' },
      { time: '05:50', note: 'La struttura a telaio continuo in cantiere: pilastri, travi e solai' }
    ],
    transcript: [
      {
        time: '00:50',
        seconds: 50,
        speaker: 'Ingegneria Edile Didattica',
        text: 'Nelle costruzioni antiche in pietra (come il sistema trilitico) le travi non potevano superare grandi luci perché la pietra, sottoposta a flessione, si spezzava sul lato inferiore. All\'inizio del Novecento la tecnologia delle costruzioni è stata rivoluzionata da un nuovo materiale composito: il calcestruzzo armato.',
        keyConcept: 'Origine del cemento armato'
      },
      {
        time: '02:20',
        seconds: 140,
        speaker: 'Ingegneria Edile Didattica',
        text: 'Il calcestruzzo (miscela di cemento, sabbia, ghiaia e acqua) possiede un\'altissima resistenza alla compressione, ma ha una debolissima resistenza alla trazione. Quando una trave è caricata dall\'alto, la parte superiore viene compressa mentre la parte inferiore viene tirata (tesa). Inserendo tondini d\'acciaio sul fondo della trave, l\'acciaio si fa carico della trazione impedendo il crollo.',
        keyConcept: 'Compressione e Trazione'
      },
      {
        time: '04:10',
        seconds: 250,
        speaker: 'Ingegneria Edile Didattica',
        text: 'I tondini d\'acciaio sono nervati per aderire perfettamente al calcestruzzo e vengono legati con anelli detti staffe, che impediscono lo scorrimento dei ferri e contrastano le forze di taglio e le sollecitazioni sismiche.',
        keyConcept: 'Staffe e aderenza acciaio-calcestruzzo'
      },
      {
        time: '05:50',
        seconds: 350,
        speaker: 'Ingegneria Edile Didattica',
        text: 'In cantiere, il calcestruzzo viene gettato liquido dentro casseforme di legno o metallo dove è già stata posata la gabbia d\'acciaio. Con la vibrazione meccanica si eliminano le bolle d\'aria. Nasce così la moderna struttura a telaio, in cui il peso dell\'edificio è retto solo da travi e pilastri.',
        keyConcept: 'Getto in cantiere e struttura a telaio'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-ca-1',
        timestampSeconds: 140,
        timestampLabel: '02:20',
        question: 'In una trave in calcestruzzo armato soggetta a flessione da un carico soprastante, dove deve essere posizionata l\'armatura in acciaio?',
        options: [
          'Solo sul lato superiore compresso',
          'Nella parte inferiore della trave, dove la struttura è tesa ed esposta a trazione',
          'Fuori dall\'edificio sul tetto',
          'Non importa, basta che ci sia ferro in qualsiasi posizione'
        ],
        correctIndex: 1,
        explanation: 'La trave inflessa tende ad aprirsi sul bordo inferiore (teso); l\'armatura d\'acciaio va posizionata esattamente lì per assorbire la trazione.',
        transcriptSnippet: 'Inserendo tondini d\'acciaio sul fondo della trave, l\'acciaio si fa carico della trazione impedendo il crollo.'
      },
      {
        id: 'edp-ca-2',
        timestampSeconds: 350,
        timestampLabel: '05:50',
        question: 'In un edificio moderno costruito con struttura a telaio in cemento armato, quale funzione svolgono le pareti perimetrali?',
        options: [
          'Funzione portante indispensabile: reggono il peso dei piani superiori',
          'Semplice funzione di tamponamento e isolamento termo-acustico, senza reggere carichi',
          'Sostengono le fondamenta',
          'Servono solo per decorazione'
        ],
        correctIndex: 1,
        explanation: 'Nel sistema a telaio il carico è sostenuto interamente da pilastri e travi; i muri esterni sono detti di tamponamento e non hanno funzione portante.',
        transcriptSnippet: 'Nasce così la moderna struttura a telaio, in cui il peso dell\'edificio è retto solo da travi e pilastri.'
      }
    ],
    contentSnippet: 'Il calcestruzzo resiste egregiamente a compressione ma cede a trazione; i tondini d\'acciaio assorbono la trazione. Insieme creano un materiale composito resistente e monolitico.'
  },
  {
    id: 'res-yt-plastica-riciclo',
    title: 'Materie Plastiche: Sintesi dai Polimeri, Termoformatura e Riciclo',
    type: 'video',
    area: 'Materiali & Risorse',
    gradeLevel: '1ª Media',
    durationOrPages: '7:50 min',
    channelName: 'Corepla & Geopop Edu',
    youtubeId: 'mVDKU3Axduk',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/mVDKU3Axduk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
    description: 'Dal petrolio ai granuli di resina termoplastica: processi di stampaggio per iniezione, estrusione in bolla delle pellicole e ciclo di riciclaggio meccanico delle bottiglie in PET e flaconi HDPE.',
    tags: ['Plastica', 'Polimeri', 'Riciclo', 'Termoplastiche', 'Corepla'],
    favorite: false,
    lessonTimestamps: [
      { time: '00:50', note: 'I monomeri e la polimerizzazione: catene macromolecolari' },
      { time: '02:30', note: 'Resine termoplastiche (riciclabili col calore) vs termoindurenti' },
      { time: '04:15', note: 'Le tecniche di formatura: estrusione in bolla e stampaggio a iniezione' },
      { time: '06:00', note: 'L\'impianto di riciclo: selezione ottica, lavaggio e scaglie MPS' }
    ],
    transcript: [
      {
        time: '00:50',
        seconds: 50,
        speaker: 'Corepla & Geopop Edu',
        text: 'La plastica è una famiglia vastissima di materiali sintetici ottenuti per lo più dalla raffinazione del petrolio greggio. Attraverso il cracking termico si ricavano molecole semplici chiamate monomeri, come l\'etilene o il propilene. Con la reazione di polimerizzazione questi monomeri si legano in lunghe catene chiamate polimeri.',
        keyConcept: 'Monomeri e polimeri'
      },
      {
        time: '02:30',
        seconds: 150,
        speaker: 'Corepla & Geopop Edu',
        text: 'Le plastiche si dividono in due grandi gruppi: le resine termoplastiche (come PET, PE, PVC, polistirolo), che con il calore si ammorbidiscono e possono essere rimodellate più volte; e le resine termoindurenti (come bachelite e melammina), che una volta indurite non possono più essere rifuse. Per questo le termoplastiche sono ideali per il riciclo.',
        keyConcept: 'Termoplastiche vs Termoindurenti'
      },
      {
        time: '04:15',
        seconds: 255,
        speaker: 'Corepla & Geopop Edu',
        text: 'Per produrre i sacchetti o pellicole si usa l\'estrusione in bolla, insufflando aria compressa nel tubo di plastica fuso; per i flaconi si usa il soffiaggio in stampi; per piatti e vaschette si impiega lo stampaggio a iniezione o la termoformatura sotto vuoto.',
        keyConcept: 'Lavorazioni industriali'
      },
      {
        time: '06:00',
        seconds: 360,
        speaker: 'Corepla & Geopop Edu',
        text: 'Negli impianti di riciclo le plastiche raccolte in differenziata vengono separate per tipo e colore con sensori ottici a raggi infrarossi. Vengono quindi tritate in scaglie, lavate, essiccate ed estruse in granuli rigenerati: le materie prime seconde, pronte per fabbricare nuovi oggetti.',
        keyConcept: 'Il riciclo meccanico delle plastiche'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-pl-1',
        timestampSeconds: 150,
        timestampLabel: '02:30',
        question: 'Quale proprietà rende le resine TERMOPLASTICHE (come PET e PE) adatte al riciclaggio?',
        options: [
          'Possono essere sciolte nell\'acqua fredda',
          'Se riscaldate riacquistano plasticità e fluidità, potendo essere rifuse e rimodellate più volte',
          'Non si scaldano mai nemmeno a 500 gradi',
          'Sono fatte interamente di fibre di cotone'
        ],
        correctIndex: 1,
        explanation: 'Le catene macromolecolari delle termoplastiche possono scorrere nuovamente se riscaldate, rendendole riciclabili.',
        transcriptSnippet: '...le resine termoplastiche (come PET, PE, PVC, polistirolo), che con il calore si ammorbidiscono e possono essere rimodellate più volte...'
      },
      {
        id: 'edp-pl-2',
        timestampSeconds: 360,
        timestampLabel: '06:00',
        question: 'Cosa si ottiene alla fine del processo di selezione, triturazione e lavaggio negli impianti di riciclo della plastica?',
        options: [
          'Petrolio greggio puro',
          'Scaglie e granuli rigenerati di Materia Prima Seconda (MPS) pronti per nuovi manufatti',
          'Carbon fossile antracite',
          'Pietre da costruzione'
        ],
        correctIndex: 1,
        explanation: 'Il riciclo meccanico produce granuli rigenerati di MPS che alimentano le fabbriche di contenitori, tubi, vasi e tessuti in pile.',
        transcriptSnippet: 'Vengono quindi tritate in scaglie, lavate, essiccate ed estruse in granuli rigenerati: le materie prime seconde, pronte per fabbricare nuovi oggetti.'
      }
    ],
    contentSnippet: 'Il 95% dei rifiuti galleggianti nei mari è plastica: differenziare e ridurre gli imballaggi usa-e-getta è una priorità di cittadinanza attiva.'
  },
  {
    id: 'res-yt-salvavita-sicurezza',
    title: 'Sicurezza Elettrica in Casa: Come Funziona il Salvavita Differenziale',
    type: 'video',
    area: 'Elettricità & Elettronica',
    gradeLevel: '3ª Media',
    durationOrPages: '6:30 min',
    channelName: 'Sicurezza Domestica & Elettronica',
    youtubeId: 'JgiwE87WJEw',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/JgiwE87WJEw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
    description: 'Come proteggere le persone dalla folgorazione: funzionamento dell\'interruttore differenziale salvavita e dell\'impianto di messa a terra con dispersore nel suolo e cavo giallo-verde.',
    tags: ['Salvavita', 'Messa a Terra', 'Sicurezza', 'Impianti'],
    favorite: false,
    lessonTimestamps: [
      { time: '00:40', note: 'I pericoli della corrente elettrica: contatto diretto e contatto indiretto' },
      { time: '02:10', note: 'Il principio del trasformatore toroidale differenziale' },
      { time: '03:50', note: 'Il conduttore di protezione giallo-verde e il dispersore di terra' },
      { time: '05:15', note: 'Il pulsante di test T obbligatorio sul centralino di casa' }
    ],
    transcript: [
      {
        time: '00:40',
        seconds: 40,
        speaker: 'Sicurezza Domestica & Elettronica',
        text: 'Il corpo umano è un conduttore elettrico naturale a causa dell\'acqua e dei sali che contiene. Il contatto con parti in tensione può provocare scosse gravi e arresto cardiaco. Il contatto diretto avviene toccando un filo scoperto; il contatto indiretto toccando la carcassa metallica di un elettrodomestico andato in dispersione.',
        keyConcept: 'Contatto diretto e indiretto'
      },
      {
        time: '02:10',
        seconds: 130,
        speaker: 'Sicurezza Domestica & Elettronica',
        text: 'L\'interruttore differenziale, comunemente chiamato salvavita, misura costantemente la corrente che entra attraverso la fase e quella che esce attraverso il neutro. Se le due correnti differiscono anche solo di 30 milliampere (perché una parte si disperde verso terra o attraverso una persona), in 30 millisecondi scatta aprendo il circuito.',
        keyConcept: 'Funzionamento differenziale a 30 mA'
      },
      {
        time: '03:50',
        seconds: 230,
        speaker: 'Sicurezza Domestica & Elettronica',
        text: 'Perché il salvavita funzioni al meglio in caso di guasto a un elettrodomestico, è indispensabile l\'impianto di messa a terra: cavi con guaina a strisce giallo-verdi collegano tutti i telai metallici a una piastra o picchetto di rame conficcato nel terreno, scaricando istantaneamente la corrente vagante nel suolo.',
        keyConcept: 'Il cavo di terra giallo-verde'
      },
      {
        time: '05:15',
        seconds: 315,
        speaker: 'Sicurezza Domestica & Elettronica',
        text: 'Ogni interruttore differenziale possiede sulla parte frontale un piccolo pulsante contrassegnato con la lettera T, che sta per Test. Le norme di sicurezza consigliano di premerlo una volta al mese per verificare che il meccanismo meccanico di sgancio non sia bloccato dalla polvere.',
        keyConcept: 'Il test periodico del salvavita'
      }
    ],
    edpuzzleQuestions: [
      {
        id: 'edp-salv-1',
        timestampSeconds: 130,
        timestampLabel: '02:10',
        question: 'Cosa rileva l\'interruttore differenziale (salvavita) per decidere di scattare e interrompere l\'energia elettrica?',
        options: [
          'La temperatura della stanza se supera i 30 gradi',
          'Una differenza (dispersione) tra la corrente in ingresso e quella in uscita superiore a 30 milliampere',
          'Il rumore della lavatrice',
          'Il consumo totale di kilowattora del mese'
        ],
        correctIndex: 1,
        explanation: 'Il salvavita confronta continuamente la corrente nei due conduttori: se c\'è una differenza, significa che una parte di corrente si sta disperdendo nel corpo di una persona o a terra.',
        transcriptSnippet: 'L\'interruttore differenziale, comunemente chiamato salvavita, misura costantemente la corrente che entra... e quella che esce...'
      },
      {
        id: 'edp-salv-2',
        timestampSeconds: 230,
        timestampLabel: '03:50',
        question: 'Qual è il colore stabilito dalle norme CEI per il cavo dell\'impianto di messa a terra?',
        options: [
          'Marrone scuro',
          'Giallo-verde a strisce',
          'Blu chiaro',
          'Nero opaco'
        ],
        correctIndex: 1,
        explanation: 'Il cavo di messa a terra è obbligatoriamente rivestito da guaina a strisce giallo-verdi per immediato riconoscimento visivo di sicurezza.',
        transcriptSnippet: '...è indispensabile l\'impianto di messa a terra: cavi con guaina a strisce giallo-verdi collegano tutti i telai metallici...'
      }
    ],
    contentSnippet: 'Il salvavita scatta in circa 30 millisecondi se rileva una differenza anche di soli 30 mA tra corrente entrante e uscente, salvando la vita.'
  },
  {
    id: 'res-1',
    title: 'Animazione 3D: Il Diedro di Monge e il Ribaltamento dei Piani',
    type: 'modello3d',
    area: 'Proiezioni Ortogonali',
    gradeLevel: '2ª Media',
    durationOrPages: 'Interattivo 3D',
    description: 'Visualizzatore dinamico dell\'apertura del diedro da 90° a 180° con tracciamento delle linee di proiezione sui piani PO, PV e PL.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    mediaUrl: 'simulatore_po',
    tags: ['PO PV PL', '3D', 'Monge', 'Ribaltamento'],
    favorite: true,
    contentSnippet: 'Il metodo delle proiezioni ortogonali di Monge permette di rappresentare un oggetto tridimensionale su un foglio bidimensionale mediante tre viste ortogonali coordinate.'
  },
  {
    id: 'res-3',
    title: 'Tavola Guida: Squadratura del Foglio F4 e Costruzione dell\'Esagono',
    type: 'scheda',
    area: 'Disegno Tecnico',
    gradeLevel: '1ª Media',
    durationOrPages: '2 Pagine PDF',
    description: 'Guida passo-passo con quote millimetriche per la squadratura con le 4 diagonali e la costruzione di un esagono regolare dato il raggio di 6 cm.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
    mediaUrl: 'scheda_squadratura.pdf',
    tags: ['Disegno Geometrico', 'Esagono', 'Norme UNI', 'Squadratura'],
    favorite: false,
    contentSnippet: '1. Tracciare le diagonali con tratto leggero (2H). 2. Puntare il compasso al centro con apertura 9 cm. 3. Tracciare i 4 archetti sui bordi. 4. Unire i punti e cancellare le diagonali interne.'
  },
  {
    id: 'res-4',
    title: 'Infografica Interattiva: La Centrale Idroelettrica a Salto',
    type: 'infografica',
    area: 'Energia & Fonti Rinnovabili',
    gradeLevel: '2ª Media',
    durationOrPages: 'Infografica HD',
    description: 'Schema funzionale con bacino a monte, diga ad arco-gravità, condotta forzata, turbina Pelton/Francis e alternatore collegato alla rete.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&q=80',
    mediaUrl: 'infografica_idroelettrico.png',
    tags: ['Idroelettrico', 'Diga', 'Turbina Pelton', 'Alternatore'],
    favorite: true,
    contentSnippet: 'L\'energia potenziale gravitazionale dell\'acqua accumulata nel bacino si trasforma in energia cinetica nella condotta forzata, in meccanica nella turbina e infine elettrica nell\'alternatore.'
  },
  {
    id: 'res-5',
    title: 'Mappa Concettuale Inclusiva: Le Proprietà dei Metalli e la Siderurgia',
    type: 'mappa',
    area: 'Materiali & Risorse',
    gradeLevel: '1ª Media',
    durationOrPages: 'Alta Leggibilità',
    description: 'Mappa concettuale ad alta leggibilità per DSA/BES: classificazione delle proprietà fisiche, meccaniche e tecnologiche, con schema dell\'altoforno.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
    mediaUrl: 'mappa_metalli.pdf',
    tags: ['Metalli', 'Siderurgia', 'Altoforno', 'Mappa Concettuale', 'DSA'],
    favorite: false,
    contentSnippet: 'Ghisa (carbonio > 2,06%, dura ma fragile) e Acciaio (carbonio < 2,06%, tenace e duttile). Proprietà: conducibilità termica/elettrica, fusibilità, malleabilità, duttilità.'
  },
  {
    id: 'res-6',
    title: 'Scheda Tecnica: Struttura a Telaio in Calcestruzzo Armato e Fondazioni',
    type: 'scheda',
    area: 'Edilizia & Città Sostenibili',
    gradeLevel: '2ª Media',
    durationOrPages: '3 Pagine PDF',
    description: 'Dettaglio costruttivo del pilastro, trave e solaio in latero-cemento con ferri di armatura a trazione e casseri di getto.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=400&q=80',
    mediaUrl: 'scheda_cemento_armato.pdf',
    tags: ['Cemento Armato', 'Pilastri', 'Travi', 'Solai', 'Fondazioni'],
    favorite: true,
    contentSnippet: 'Il calcestruzzo resiste egregiamente a compressione ma cede a trazione; i tondini d\'acciaio assorbono la trazione. Insieme creano un materiale composito resistente e monolitico.'
  },
  {
    id: 'res-7',
    title: 'Simulatore Circuito Elettrico: Legge di Ohm e Lampadine in Serie/Parallelo',
    type: 'modello3d',
    area: 'Elettricità & Elettronica',
    gradeLevel: '3ª Media',
    durationOrPages: 'Laboratorio Virtuale',
    description: 'Laboratorio interattivo per misurare tensione con voltmetro, intensità con amperometro e verificare cosa accade svitando una lampada in serie o in parallelo.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=400&q=80',
    mediaUrl: 'simulatore_circuiti',
    tags: ['Circuito', 'Legge di Ohm', 'Ampere', 'Volt', 'Serie/Parallelo'],
    favorite: false,
    contentSnippet: 'In serie: la corrente è la stessa per tutti i carichi, se uno si interrompe il circuito si apre. In parallelo: la tensione è identica, ogni apparecchio funziona autonomamente.'
  }
];

export const INITIAL_STUDENTS_2B: Student[] = [
  {
    id: 'stud-1',
    name: 'Alessi Matteo',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g1', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 8.5, rubricScores: { precisione: 4, correttezza: 4, pulizia: 3, puntualita: 4 } },
      { id: 'g2', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 8.0 },
      { id: 'g3', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 9.0, rubricScores: { precisione: 4, correttezza: 4, pulizia: 4, puntualita: 4 } }
    ],
    notes: 'Molto accurato nell\'uso delle squadre a 45° e 30°/60°. Tratto netto e pulito.'
  },
  {
    id: 'stud-2',
    name: 'Bianchi Sofia',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g4', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 9.0, rubricScores: { precisione: 4, correttezza: 4, pulizia: 4, puntualita: 4 } },
      { id: 'g5', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 9.5 },
      { id: 'g6', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 9.5, rubricScores: { precisione: 4, correttezza: 4, pulizia: 4, puntualita: 4 } }
    ],
    notes: 'Eccellente preparazione sia teorica che grafica. Spesso aiuta i compagni nei passaggi con il compasso.'
  },
  {
    id: 'stud-3',
    name: 'Caputo Leonardo',
    classId: '2ª B',
    besDsa: true,
    recoveryNeeded: true,
    grades: [
      { id: 'g7', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 5.5, rubricScores: { precisione: 2, correttezza: 2, pulizia: 2, puntualita: 3 } },
      { id: 'g8', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 6.0 },
      { id: 'g9', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 5.0, rubricScores: { precisione: 2, correttezza: 2, pulizia: 1, puntualita: 3 } }
    ],
    notes: 'Difficoltà motoria fine nel dosare la pressione della matita (foglio incavato). Previste misure compensative e tempo aggiuntivo.'
  },
  {
    id: 'stud-4',
    name: 'De Luca Chiara',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g10', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 7.5, rubricScores: { precisione: 3, correttezza: 3, pulizia: 3, puntualita: 4 } },
      { id: 'g11', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 7.0 },
      { id: 'g12', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 8.0, rubricScores: { precisione: 3, correttezza: 4, pulizia: 3, puntualita: 4 } }
    ],
    notes: 'Buon impegno costante. Sta migliorando la pulizia del foglio usando correttamente lo spolverino.'
  },
  {
    id: 'stud-5',
    name: 'Esposito Gabriele',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g13', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 8.0, rubricScores: { precisione: 3, correttezza: 4, pulizia: 3, puntualita: 4 } },
      { id: 'g14', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 7.5 },
      { id: 'g15', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 7.5, rubricScores: { precisione: 3, correttezza: 3, pulizia: 3, puntualita: 4 } }
    ],
    notes: 'Partecipe durante le spiegazioni alla LIM. Buona comprensione delle proiezioni ortogonali.'
  },
  {
    id: 'stud-6',
    name: 'Ferrari Elena',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g16', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 9.0, rubricScores: { precisione: 4, correttezza: 4, pulizia: 4, puntualita: 4 } },
      { id: 'g17', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 8.5 },
      { id: 'g18', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 9.0, rubricScores: { precisione: 4, correttezza: 4, pulizia: 4, puntualita: 4 } }
    ],
    notes: 'Tavole sempre impeccabili, tratto continuo ben differenziato da quello sottile delle linee di costruzione.'
  },
  {
    id: 'stud-7',
    name: 'Galli Tommaso',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: true,
    grades: [
      { id: 'g19', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 5.5, rubricScores: { precisione: 2, correttezza: 2, pulizia: 2, puntualita: 3 } },
      { id: 'g20', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 5.0 },
      { id: 'g21', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 6.0, rubricScores: { precisione: 2, correttezza: 3, pulizia: 2, puntualita: 3 } }
    ],
    notes: 'Spesso dimentica il materiale da disegno (squadre o compasso). Richiamato più volte.'
  },
  {
    id: 'stud-8',
    name: 'Lombardi Giulia',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g22', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 7.0, rubricScores: { precisione: 3, correttezza: 3, pulizia: 3, puntualita: 3 } },
      { id: 'g23', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 7.5 },
      { id: 'g24', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 8.0, rubricScores: { precisione: 3, correttezza: 4, pulizia: 3, puntualita: 4 } }
    ],
    notes: 'Buon progresso nel disegno dei raccordi curvilinei.'
  },
  {
    id: 'stud-9',
    name: 'Marini Federico',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g25', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 8.0, rubricScores: { precisione: 3, correttezza: 4, pulizia: 3, puntualita: 4 } },
      { id: 'g26', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 8.5 },
      { id: 'g27', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 8.5, rubricScores: { precisione: 4, correttezza: 4, pulizia: 3, puntualita: 4 } }
    ],
    notes: 'Interessato alla robotica e alle tecnologie sostenibili.'
  },
  {
    id: 'stud-10',
    name: 'Neri Alice',
    classId: '2ª B',
    besDsa: true,
    recoveryNeeded: false,
    grades: [
      { id: 'g28', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 6.5, rubricScores: { precisione: 3, correttezza: 3, pulizia: 2, puntualita: 3 } },
      { id: 'g29', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 7.0 },
      { id: 'g30', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 7.0, rubricScores: { precisione: 3, correttezza: 3, pulizia: 3, puntualita: 3 } }
    ],
    notes: 'Utilizza mappe concettuali ad alta leggibilità fornite prima della lezione. Risponde con sicurezza all\'orale.'
  },
  {
    id: 'stud-11',
    name: 'Rizzo Marco',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g31', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 7.5, rubricScores: { precisione: 3, correttezza: 3, pulizia: 3, puntualita: 4 } },
      { id: 'g32', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 8.0 },
      { id: 'g33', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 7.5, rubricScores: { precisione: 3, correttezza: 3, pulizia: 3, puntualita: 4 } }
    ],
    notes: 'Attento e regolare nella consegna delle tavole di disegno.'
  },
  {
    id: 'stud-12',
    name: 'Serra Beatrice',
    classId: '2ª B',
    besDsa: false,
    recoveryNeeded: false,
    grades: [
      { id: 'g34', date: '2026-09-28', type: 'Tavola Disegno', subject: 'Tav. 1 - Squadratura e assi', value: 10.0, rubricScores: { precisione: 4, correttezza: 4, pulizia: 4, puntualita: 4 } },
      { id: 'g35', date: '2026-10-02', type: 'Verifica Scritta', subject: 'I Materiali e Proprietà', value: 9.5 },
      { id: 'g36', date: '2026-10-18', type: 'Tavola Disegno', subject: 'Tav. 2 - Poligoni regolari', value: 10.0, rubricScores: { precisione: 4, correttezza: 4, pulizia: 4, puntualita: 4 } }
    ],
    notes: 'Capacità grafico-espressive di livello superiore. Precisione millimetrica.'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Consegna Tavola 7: PO di un Parallelepipedo',
    classId: '2ª B',
    gradeLevel: '2ª Media',
    date: '2026-10-14',
    time: '10:00',
    type: 'consegna_tavola',
    description: 'Consegna della tavola con il parallelepipedo a base rettangolare poggiato sul PO e ribaltamento su PL.',
    unitId: 'u3-proiezioni-ortogonali',
    completed: false
  },
  {
    id: 'ev-2',
    title: 'Verifica Scritta: I Materiali, Metalli e Plastiche',
    classId: '1ª A',
    gradeLevel: '1ª Media',
    date: '2026-10-16',
    time: '09:00',
    type: 'verifica',
    description: 'Test strutturato con quesiti a scelta multipla e definizioni di proprietà meccaniche e tecnologiche.',
    unitId: 'u1-materiali',
    completed: false
  },
  {
    id: 'ev-3',
    title: 'Laboratorio STEAM: Simulatore Proiezioni Ortogonali',
    classId: '2ª A',
    gradeLevel: '2ª Media',
    date: '2026-10-19',
    time: '11:15',
    type: 'laboratorio',
    description: 'Attività con i tablet in aula informatica: esplorazione del diedro 3D e verifica del ribaltamento della piramide a base quadrata.',
    unitId: 'u3-proiezioni-ortogonali',
    completed: false
  },
  {
    id: 'ev-4',
    title: 'Consegna Tavola 8: PO Piramide a Base Quadrata',
    classId: '2ª B',
    gradeLevel: '2ª Media',
    date: '2026-10-23',
    time: '10:00',
    type: 'consegna_tavola',
    description: 'Piramide con vertice V proiettato al centro su PO e spigoli obliqui in vista.',
    unitId: 'u3-proiezioni-ortogonali',
    completed: false
  },
  {
    id: 'ev-5',
    title: 'Verifica Teoria: Fonti Energetiche e Impianti',
    classId: '2ª B',
    gradeLevel: '2ª Media',
    date: '2026-10-28',
    time: '12:00',
    type: 'verifica',
    description: 'Fonti rinnovabili e non rinnovabili, funzionamento turbina-alternatore, centrali eoliche e fotovoltaico.',
    unitId: 'u4-energia',
    completed: false
  },
  {
    id: 'ev-6',
    title: 'Consiglio di Classe - Valutazione Intermedia',
    classId: '2ª B',
    gradeLevel: '2ª Media',
    date: '2026-11-04',
    time: '16:30',
    type: 'scadenza',
    description: 'Rilevazione delle insufficienze e attivazione corsi di recupero per disegno tecnico e tecnologia.',
    completed: false
  }
];

export const UNIT_QUIZZES: Record<string, UnitQuiz> = {
  'quiz-u1': {
    id: 'quiz-u1',
    unitId: 'u1-materiali',
    unitTitle: 'I Materiali e l\'Economia Circolare',
    gradeLevel: '1ª Media',
    area: 'Materiali & Risorse',
    timeMinutes: 15,
    questions: [
      {
        id: 'q1-1',
        question: 'Cosa si intende per "Materia Prima Seconda" (MPS)?',
        options: [
          'Una materia prima di qualità scadente e a basso costo',
          'Un materiale derivato dal recupero e riciclaggio di scarti e rifiuti',
          'Una risorsa naturale estratta da miniere sotterranee molto profonde',
          'Un semilavorato prodotto unicamente in laboratori artigianali'
        ],
        correctIndex: 1,
        explanation: 'Le MPS sono materiali recuperati dal riciclo dei rifiuti (carta da macero, rottami metallici, granuli plastici) riutilizzabili nei cicli industriali.'
      },
      {
        id: 'q1-2',
        question: 'Qual è la proprietà tecnologica che indica la capacità di un metallo di essere ridotto in lamine sottili senza rompersi?',
        options: ['Duttilità', 'Fusibilità', 'Malleabilità', 'Resilienza'],
        correctIndex: 2,
        explanation: 'La malleabilità è l\'attitudine a essere ridotto in fogli o lamine (mentre la duttilità si riferisce alla trazione in fili sottili).'
      },
      {
        id: 'q1-3',
        question: 'Quale tra questi pannelli lignei è composto da fogli sottili incollati con le fibre disposte ortogonalmente tra loro per evitarne l\'incurvamento?',
        options: ['Pannello truciolare', 'Compensato / Multistrato', 'Pannello MDF', 'Legno massello in tavola'],
        correctIndex: 1,
        explanation: 'Il compensato/multistrato compensa la tendenza naturale del legno a incurvarsi incrociando a 90° la direzione delle venature dei piallacci.'
      },
      {
        id: 'q1-4',
        question: 'Qual è la differenza fondamentale tra resine termoplastiche (TP) e termoindurenti (TI)?',
        options: [
          'Le termoplastiche possono essere riscaldate e rimodellate più volte; le termoindurenti no',
          'Le termoindurenti sono biodegradabili al 100%, le termoplastiche no',
          'Le termoplastiche derivano dal lattice vegetale, le termoindurenti dal petrolio',
          'Le termoindurenti fondono a soli 50 °C'
        ],
        correctIndex: 0,
        explanation: 'Le resine termoplastiche (come PET, PE, PVC) possono essere fuse e riciclate più volte; le termoindurenti dopo la prima polimerizzazione mantengono una forma rigida non rimodellabile.'
      },
      {
        id: 'q1-5',
        question: 'Cosa si ricava dall\'altoforno come primo prodotto dalla fusione dei minerali ferrosi con calcare e coke?',
        options: ['Ferro puro al 99%', 'Acciaio inossidabile', 'Ghisa (lega ferro-carbonio con C > 2,06%)', 'Alluminio primario'],
        correctIndex: 2,
        explanation: 'L\'altoforno produce la ghisa fusa (con alto tenore di carbonio), che verrà poi decarburata nei convertitori ad ossigeno per produrre l\'acciaio.'
      }
    ]
  },
  'quiz-u2': {
    id: 'quiz-u2',
    unitId: 'u2-disegno-base',
    unitTitle: 'Disegno Tecnico: Costruzioni Geometriche',
    gradeLevel: '1ª Media',
    area: 'Disegno Tecnico',
    timeMinutes: 15,
    questions: [
      {
        id: 'q2-1',
        question: 'Quale matita si deve utilizzare secondo le norme UNI per il tracciamento delle linee di costruzione sottili e della squadratura?',
        options: ['Matita 2B morbida', 'Matita 2H dura', 'Matita HB a tratto scuro e spesso', 'Pennarello a punta tonda'],
        correctIndex: 1,
        explanation: 'La matita dura (2H o 3H) lascia un tratto fine, preciso e chiaro, ideale per le linee di costruzione che non devono macchiare il foglio.'
      },
      {
        id: 'q2-2',
        question: 'Come si trova l\'asse di un segmento AB con il compasso?',
        options: [
          'Si punta in A con raggio fisso di 2 cm e si traccia una sola retta orizzontale',
          'Si punta in A e poi in B con apertura maggiore della metà di AB, individuando due punti di intersezione sopra e sotto',
          'Si misura con la riga e si traccia un segmento inclinato a 45°',
          'Si punta al centro del foglio e si traccia un cerchio completo'
        ],
        correctIndex: 1,
        explanation: 'Puntando con la medesima apertura (> AB/2) prima in A e poi in B, gli archetti si intersecano in due punti che uniti determinano la perpendicolare passante per il punto medio.'
      },
      {
        id: 'q2-3',
        question: 'Quale coppia di squadre permette di tracciare una retta inclinata esattamente a 75° rispetto alla linea di base orizzontale?',
        options: [
          'Due squadre a 45° sovrapposte',
          'La squadra a 45° accostata all\'angolo da 30° della squadra 30°/60° (45° + 30° = 75°)',
          'La riga millimetrata da sola ruotata ad occhio',
          'Solo la squadra a 60° appoggiata alla riga'
        ],
        correctIndex: 1,
        explanation: 'Sommando l\'angolo di 45° di una squadra con l\'angolo di 30° dell\'altra squadra si ottiene esattamente l\'inclinazione di 75°.'
      },
      {
        id: 'q2-4',
        question: 'Nella costruzione di un esagono regolare inscritto in una circonferenza di raggio R, quanto misura il lato dell\'esagono?',
        options: [
          'Esattamente il doppio del raggio (2R)',
          'La metà del raggio (R / 2)',
          'Esattamente uguale al raggio della circonferenza (l = R)',
          'Pari a pi greco diviso 4'
        ],
        correctIndex: 2,
        explanation: 'Una proprietà fondamentale della geometria piana: la corda che sottende un arco di 60° in una circonferenza ha lunghezza pari al raggio (l = R).'
      }
    ]
  },
  'quiz-u3': {
    id: 'quiz-u3',
    unitId: 'u3-proiezioni-ortogonali',
    unitTitle: 'Le Proiezioni Ortogonali (Metodo di Monge)',
    gradeLevel: '2ª Media',
    area: 'Proiezioni Ortogonali',
    timeMinutes: 20,
    questions: [
      {
        id: 'q3-1',
        question: 'Nel metodo delle proiezioni ortogonali, cosa rappresenta la vista sul Piano Orizzontale (PO)?',
        options: [
          'La vista dell\'oggetto visto frontalmente',
          'La vista dell\'oggetto osservato dall\'alto in proiezione perpendicolare',
          'La vista laterale osservata da destra verso sinistra',
          'La vista dal basso del terreno'
        ],
        correctIndex: 1,
        explanation: 'Il PO (Piano Orizzontale o pianta) raccoglie i raggi proiettanti provenienti dall\'alto, perpendicolari al piano orizzontale.'
      },
      {
        id: 'q3-2',
        question: 'Quale figura geometrica si osserva sul Piano Orizzontale (PO) di una piramide retta a base quadrata con base parallela al PO?',
        options: [
          'Un triangolo isoscele con l\'altezza',
          'Un cerchio con due diametri perpendicolari',
          'Un quadrato con le due diagonali che rappresentano gli spigoli obliqui in vista convergenti nel vertice',
          'Un trapezio rettangolo'
        ],
        correctIndex: 2,
        explanation: 'Dall\'alto si vede la base quadrata e i quattro spigoli triangolari che salgono verso il vertice centrale V, disegnati come le due diagonali del quadrato.'
      },
      {
        id: 'q3-3',
        question: 'A cosa serve il quadrante in basso a destra (Piano di Ribaltamento) nel foglio da disegno suddiviso in 4 quadranti?',
        options: [
          'A scrivere le note e i saluti al docente',
          'A ribaltare con il compasso puntato nell\'origine O le distanze dal PO verso la Linea di Terra per costruire il Piano Laterale (PL)',
          'A contenere il cartiglio con il nome dello studente',
          'A disegnare la vista posteriore dell\'oggetto'
        ],
        correctIndex: 1,
        explanation: 'Il piano di ribaltamento consente, mediante archi di circonferenza centrati nell\'origine degli assi O, di trasferire le profondità dal PO all\'asse della Linea di Terra per proiettarle sul PL.'
      },
      {
        id: 'q3-4',
        question: 'Secondo le norme UNI per il disegno tecnico, come devono essere rappresentati gli spigoli di un solido NON visibili dal punto di osservazione?',
        options: [
          'Con linea continua di grosso spessore',
          'Con linea a punto e tratto alternato',
          'Con linea a tratto medio (tratteggiata)',
          'Non devono assolutamente essere disegnati sul foglio'
        ],
        correctIndex: 2,
        explanation: 'Le norme UNI prescrivono: linea continua grossa per gli spigoli in vista, linea tratteggiata per gli spigoli nascosti, linea continua fine per le linee di proiezione.'
      },
      {
        id: 'q3-5',
        question: 'Se un cilindro retto ha l\'asse perpendicolare al PO, quali figure si vedranno rispettivamente sul PO e sul PV?',
        options: [
          'Un quadrato sul PO e un cerchio sul PV',
          'Un cerchio sul PO e un rettangolo sul PV',
          'Due rettangoli uguali su entrambi i piani',
          'Un triangolo sul PO e un cerchio sul PV'
        ],
        correctIndex: 1,
        explanation: 'Guardando dall\'alto (PO) si osserva la base circolare; guardando di fronte (PV) il cilindro si proietta come una superficie rettangolare di base pari al diametro e altezza pari all\'altezza del solido.'
      }
    ]
  },
  'quiz-u4': {
    id: 'quiz-u4',
    unitId: 'u4-energia',
    unitTitle: 'Energia e Transizione Ecologica',
    gradeLevel: '2ª Media',
    area: 'Energia & Fonti Rinnovabili',
    timeMinutes: 15,
    questions: [
      {
        id: 'q4-1',
        question: 'Quale coppia di macchine è presente nella quasi totalità delle centrali elettriche per convertire l\'energia cinetica/meccanica in energia elettrica?',
        options: [
          'Pompa di calore e inverter',
          'Turbina e Alternatore (generatore)',
          'Condensatore e compressore',
          'Batteria al litio e trasformatore'
        ],
        correctIndex: 1,
        explanation: 'Il fluido (vapore, acqua o vento) aziona le pale della turbina (energia meccanica), che a sua volta fa ruotare l\'alternatore producendo corrente elettrica mediante induzione elettromagnetica.'
      },
      {
        id: 'q4-2',
        question: 'Quale tipo di pannello solare trasforma DIRETTAMENTE i fotoni della luce solare in corrente elettrica continua?',
        options: ['Collettore solare termico a piastra nera', 'Pannello fotovoltaico in silicio', 'Specchio parabolico a concentrazione', 'Biomassa a pellet'],
        correctIndex: 1,
        explanation: 'Il pannello fotovoltaico sfrutta l\'effetto fotoelettrico nei semiconduttori (silicio opportunamente drogato) generando una differenza di potenziale e corrente continua.'
      },
      {
        id: 'q4-3',
        question: 'Cosa si intende per "Decarbonizzazione" nell\'ambito dell\'Agenda 2030?',
        options: [
          'Eliminare la grafite dalle matite scolastiche',
          'La progressiva sostituzione dei combustibili fossili (carbone, petrolio, gas) con fonti rinnovabili ed energia a zero emissioni',
          'Sotterrare i rifiuti solidi in miniere abbandonate',
          'Aumentare l\'estrazione di scisto bituminoso'
        ],
        correctIndex: 1,
        explanation: 'La decarbonizzazione è la strategia globale volta a ridurre e azzerare le emissioni di gas serra (CO2) sostituendo le fonti ad alto tenore di carbonio con fonti rinnovabili.'
      }
    ]
  },
  'quiz-u5': {
    id: 'quiz-u5',
    unitId: 'u5-edilizia-abitazione',
    unitTitle: 'Tecnologie Edilizie e l\'Abitazione Sostenibile',
    gradeLevel: '2ª Media',
    area: 'Edilizia & Città Sostenibili',
    timeMinutes: 15,
    questions: [
      {
        id: 'q5-1',
        question: 'Perché l\'acciaio e il calcestruzzo lavorano in modo complementare nel calcestruzzo armato (C.A.)?',
        options: [
          'Perché entrambi resistono solo alla trazione',
          'Il calcestruzzo resiste a compressione e l\'acciaio sopporta gli sforzi di trazione',
          'L\'acciaio evita che il calcestruzzo si bagni con la pioggia',
          'Il calcestruzzo serve solo a verniciare i ferri'
        ],
        correctIndex: 1,
        explanation: 'Il conglomerato cementizio ha ottima resistenza a schiacciamento (compressione) ma cede facilmente se teso; i tondini di acciaio assorbono la trazione compensando questa debolezza.'
      },
      {
        id: 'q5-2',
        question: 'Quale dispositivo idraulico essenziale impedisce ai cattivi odori della rete fognaria di risalire nei locali dell\'abitazione?',
        options: ['La saracinesca d\'arresto', 'Il sifone (curva ad U con ristagno d\'acqua di tenuta)', 'L\'autoclave con pressostato', 'Il contatore volumetrico'],
        correctIndex: 1,
        explanation: 'Il sifone trattiene una colonna d\'acqua pulita nella curva che funge da tappo ermetico contro il reflusso di gas e odori dai collettori fognari.'
      },
      {
        id: 'q5-3',
        question: 'In una progettazione bioclimatica ideale alle nostre latitudini (Italia), verso quale punto cardinale devono essere orientate le finestre dei locali principali (soggiorno/camere) per massimizzare il guadagno solare?',
        options: ['A Nord', 'A Sud', 'A Nord-Ovest', 'Verso il lato più freddo'],
        correctIndex: 1,
        explanation: 'L\'orientamento a Sud consente di ricevere il massimo irraggiamento solare gratuito in inverno (quando il sole è basso), facilmente schermabile d\'estate con frangisole.'
      }
    ]
  },
  'quiz-u6': {
    id: 'quiz-u6',
    unitId: 'u6-elettricita',
    unitTitle: 'Elettricità, Circuiti e Smart Cities',
    gradeLevel: '3ª Media',
    area: 'Elettricità & Elettronica',
    timeMinutes: 15,
    questions: [
      {
        id: 'q6-1',
        question: 'Secondo la Legge di Ohm, se la tensione V è 230 Volt e la resistenza R è 46 Ohm, qual è l\'intensità di corrente I?',
        options: ['0,2 Ampere', '5 Ampere (I = V / R = 230 / 46)', '10580 Watt', '50 Hertz'],
        correctIndex: 1,
        explanation: 'Applicando la formula I = V / R: 230 / 46 = 5 Ampere.'
      },
      {
        id: 'q6-2',
        question: 'Qual è il compito dell\'interruttore differenziale (comunemente detto "salvavita") in un impianto domestico?',
        options: [
          'Riscaldare l\'acqua sanitaria di notte',
          'Interrompere il circuito in millisecondi non appena rileva una differenza tra corrente in ingresso e in uscita (dispersione verso terra o persona)',
          'Misurare i kilowattora per la bolletta energetica',
          'Aumentare la velocità dei motori della lavatrice'
        ],
        correctIndex: 1,
        explanation: 'L\'interruttore differenziale rileva dispersioni anomale di corrente (es. folgorazione o contatto accidentale) aprendo istantaneamente il circuito per salvare la vita umana.'
      },
      {
        id: 'q6-3',
        question: 'Quale colore ha OBBLIGATORIAMENTE per legge la guaina del cavo conduttore di protezione (messa a terra)?',
        options: ['Blu o azzurro chiaro', 'Marrone o nero', 'Giallo-Verde a strisce', 'Rosso acceso'],
        correctIndex: 2,
        explanation: 'Il conduttore di protezione di terra è identificato universalmente dalla combinazione bicromatica giallo-verde.'
      }
    ]
  }
};
