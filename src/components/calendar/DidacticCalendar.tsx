import React, { useState } from 'react';
import { CalendarEvent, GradeLevel } from '../../types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  X,
  Compass,
  BookOpen,
  Laptop
} from 'lucide-react';

interface DidacticCalendarProps {
  events: CalendarEvent[];
  currentClass: string;
  onAddEvent: (newEvent: CalendarEvent) => void;
  onToggleEventComplete: (eventId: string) => void;
}

export const DidacticCalendar: React.FC<DidacticCalendarProps> = ({
  events,
  currentClass,
  onAddEvent,
  onToggleEventComplete
}) => {
  // Calendar month state (defaults to October 2026 based on mock context or current month)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 9, 1)); // October 2026
  const [viewType, setViewType] = useState<'month' | 'agenda'>('month');
  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[] | null>(null);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newClassId, setNewClassId] = useState(currentClass === 'Tutte le classi' ? '2ª B' : currentClass);
  const [newDate, setNewDate] = useState('2026-10-20');
  const [newTime, setNewTime] = useState('10:00');
  const [newType, setNewType] = useState<CalendarEvent['type']>('consegna_tavola');
  const [newDesc, setNewDesc] = useState('');

  // Month calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Convert to Monday = 0
  const startDayOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 9, 1));
  };

  // Filter events by class if selected
  const filteredEvents = events.filter(e => {
    if (currentClass !== 'Tutte le classi' && e.classId !== currentClass) {
      return false;
    }
    return true;
  });

  const getEventsForDate = (dayNum: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return filteredEvents.filter(e => e.date === dateStr);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const event: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: newTitle.trim(),
      classId: newClassId,
      gradeLevel: newClassId.startsWith('1') ? '1ª Media' : newClassId.startsWith('2') ? '2ª Media' : '3ª Media',
      date: newDate,
      time: newTime,
      type: newType,
      description: newDesc.trim(),
      completed: false
    };

    onAddEvent(event);
    setShowAddEventModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const getTypeBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'consegna_tavola':
        return { label: 'Tavola Disegno', color: 'bg-cyan-950 text-cyan-300 border-cyan-800' };
      case 'verifica':
        return { label: 'Verifica', color: 'bg-rose-950 text-rose-300 border-rose-800' };
      case 'laboratorio':
        return { label: 'Laboratorio STEAM', color: 'bg-indigo-950 text-indigo-300 border-indigo-800' };
      default:
        return { label: 'Scadenza / Consiglio', color: 'bg-amber-950 text-amber-300 border-amber-800' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Header */}
      <div className="bg-slate-800/90 backdrop-blur-md px-4 py-3.5 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-white">Calendario Scadenze Didattiche</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                A.S. 2026/2027
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pianificazione consegne tavole, verifiche teoriche, laboratori informatica e scadenze collegiali
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewType('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
                viewType === 'month' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vista Mese
            </button>
            <button
              onClick={() => setViewType('agenda')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
                viewType === 'agenda' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Agenda Scadenze
            </button>
          </div>

          <button
            onClick={() => setShowAddEventModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 min-h-[40px] shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            Nuova Scadenza
          </button>
        </div>
      </div>

      {/* Month Navigator Toolbar */}
      <div className="bg-slate-850 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-bold text-base text-white px-2 min-w-[170px] text-center">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={goToToday}
            className="ml-2 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold min-h-[40px]"
          >
            Oggi
          </button>
        </div>

        {/* Legend */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Tavole Disegno
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Verifiche
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Laboratori STEAM
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Scadenze / Consigli
          </span>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-auto p-4">
        {viewType === 'month' ? (
          <div className="bg-slate-850 rounded-2xl border border-slate-800 overflow-hidden shadow flex flex-col h-full min-h-[500px]">
            {/* Days of week header */}
            <div className="grid grid-cols-7 bg-slate-800/80 border-b border-slate-700 text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Gio</span>
              <span>Ven</span>
              <span>Sab</span>
              <span>Dom</span>
            </div>

            {/* Month Days Grid */}
            <div className="grid grid-cols-7 flex-1 auto-rows-fr divide-x divide-y divide-slate-800">
              {/* Empty leading days */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-slate-900/40 p-2 opacity-30 min-h-[75px]" />
              ))}

              {/* Days in Month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dayEvents = getEventsForDate(dayNum);
                const isToday = year === 2026 && month === 9 && dayNum === 8;

                return (
                  <div
                    key={dayNum}
                    onClick={() => {
                      if (dayEvents.length > 0) setSelectedDayEvents(dayEvents);
                    }}
                    className={`p-2 transition-colors flex flex-col justify-between min-h-[85px] cursor-pointer hover:bg-slate-800/40 ${
                      isToday ? 'bg-sky-950/20 ring-1 ring-inset ring-sky-500/40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday ? 'bg-sky-500 text-slate-950 font-black' : 'text-slate-300'
                      }`}>
                        {dayNum}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-[10px] font-bold text-slate-400">
                          {dayEvents.length} ev.
                        </span>
                      )}
                    </div>

                    {/* Day events pills */}
                    <div className="space-y-1 flex-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map(ev => {
                        const badge = getTypeBadge(ev.type);
                        return (
                          <div
                            key={ev.id}
                            className={`p-1 rounded text-[10px] font-semibold truncate border ${badge.color} ${
                              ev.completed ? 'line-through opacity-60' : ''
                            }`}
                            title={`${ev.time ? ev.time + ' ' : ''}${ev.title} (${ev.classId})`}
                          >
                            <span className="font-extrabold mr-1">[{ev.classId}]</span>
                            {ev.title}
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] text-slate-400 font-bold text-center">
                          +{dayEvents.length - 2} altri
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Agenda / List View */
          <div className="space-y-3 max-w-3xl mx-auto">
            {filteredEvents
              .sort((a, b) => a.date.localeCompare(b.date))
              .map(ev => {
                const badge = getTypeBadge(ev.type);
                return (
                  <div
                    key={ev.id}
                    className={`p-4 rounded-2xl bg-slate-850 border border-slate-750 flex items-start justify-between gap-4 transition-all hover:border-slate-700 ${
                      ev.completed ? 'opacity-60 bg-slate-900/60' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => onToggleEventComplete(ev.id)}
                        className={`w-6 h-6 rounded-lg border mt-0.5 flex items-center justify-center transition-colors ${
                          ev.completed
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'border-slate-600 hover:border-slate-400'
                        }`}
                      >
                        {ev.completed && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${badge.color}`}>
                            {badge.label}
                          </span>
                          <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            Classe {ev.classId}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {ev.date} {ev.time && `• ${ev.time}`}
                          </span>
                        </div>
                        <h4 className={`font-bold text-sm text-white ${ev.completed ? 'line-through text-slate-400' : ''}`}>
                          {ev.title}
                        </h4>
                        {ev.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {ev.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* New Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-bold text-lg text-white mb-1">Nuova Scadenza Didattica</h3>
            <p className="text-xs text-slate-400 mb-4">
              Pianifica una consegna tavola, una verifica o un'attività per le tue classi.
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Titolo dell'Attività / Scadenza</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Es. Consegna Tavola 8 - PO Piramide retta"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Classe Destinataria</label>
                  <select
                    value={newClassId}
                    onChange={e => setNewClassId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="1ª A">1ª A</option>
                    <option value="1ª B">1ª B</option>
                    <option value="2ª A">2ª A</option>
                    <option value="2ª B">2ª B</option>
                    <option value="3ª A">3ª A</option>
                    <option value="3ª C">3ª C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tipologia</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="consegna_tavola">Consegna Tavola Disegno</option>
                    <option value="verifica">Verifica Scritta / Orale</option>
                    <option value="laboratorio">Laboratorio STEAM</option>
                    <option value="scadenza">Consiglio / Scadenza</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Data Scadenza</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Ora (opzionale)</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Note Didattiche</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Indicazioni per la consegna, materiali necessari..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20"
                >
                  Salva nel Calendario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Day Events Quick Popover Modal */}
      {selectedDayEvents && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h4 className="font-bold text-white text-sm">
                Eventi del {selectedDayEvents[0]?.date}
              </h4>
              <button
                onClick={() => setSelectedDayEvents(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {selectedDayEvents.map(ev => {
                const badge = getTypeBadge(ev.type);
                return (
                  <div key={ev.id} className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded">
                        Classe {ev.classId}
                      </span>
                    </div>
                    <div className="font-bold text-white text-xs">{ev.title}</div>
                    {ev.description && (
                      <p className="text-[11px] text-slate-400 mt-1">{ev.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
