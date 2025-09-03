import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, PlusCircle, Clock, X } from "lucide-react";

const HOURS = Array.from({ length: 11 }, (_, i) => 8 + i); // 08:00 - 18:00

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // adjust when day is Sunday
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateISO(date) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

function toTimeString(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function parseTimeToDate(baseDate, timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date(baseDate);
  d.setHours(h, m ?? 0, 0, 0);
  return d;
}

function minutesBetween(a, b) {
  return Math.round((b.getTime() - a.getTime()) / 60000);
}

const STORAGE_KEY = "learnify_meetings_v1";

const Calendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getMonday(new Date())
  );
  const [meetings, setMeetings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: formatDateISO(new Date()),
    startTime: "09:00",
    endTime: "10:00",
  });
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMeetings(JSON.parse(raw));
    } catch (error) {
      console.warn("Failed to load meetings from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    } catch (error) {
      console.warn("Failed to save meetings to localStorage", error);
    }
  }, [meetings]);

  const daysOfWeek = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const weekRangeLabel = useMemo(() => {
    const start = daysOfWeek[0];
    const end = daysOfWeek[6];
    const fmt = (d) => `${d.getDate()}/${d.getMonth() + 1}`;
    return `${fmt(start)} - ${fmt(end)} ${end.getFullYear()}`;
  }, [daysOfWeek]);

  function openModalForDate(date, hour = 9) {
    const iso = formatDateISO(date);
    setForm({
      title: "",
      date: iso,
      startTime: `${String(hour).padStart(2, "0")}:00`,
      endTime: `${String(hour + 1).padStart(2, "0")}:00`,
    });
    setIsModalOpen(true);
  }

  function createMeeting(e) {
    e?.preventDefault?.();
    const start = parseTimeToDate(new Date(form.date), form.startTime);
    const end = parseTimeToDate(new Date(form.date), form.endTime);
    if (!form.title.trim() || end <= start) return;
    const id = crypto.randomUUID();
    setMeetings((prev) => [
      ...prev,
      {
        id,
        title: form.title.trim(),
        start: start.toISOString(),
        end: end.toISOString(),
      },
    ]);
    setIsModalOpen(false);
  }

  function onDragStart(ev, id) {
    ev.dataTransfer.setData("text/plain", id);
    setDraggingId(id);
  }

  function onDragEnd() {
    setDraggingId(null);
  }

  function onSlotDrop(ev, date, hour) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text/plain");
    if (!id) return;
    setMeetings((prev) => {
      const next = prev.map((m) => {
        if (m.id !== id) return m;
        const oldStart = new Date(m.start);
        const durationMin = minutesBetween(oldStart, new Date(m.end));
        const newStart = new Date(date);
        newStart.setHours(hour, 0, 0, 0);
        const newEnd = new Date(newStart.getTime() + durationMin * 60000);
        return {
          ...m,
          start: newStart.toISOString(),
          end: newEnd.toISOString(),
        };
      });
      return next;
    });
    setDraggingId(null);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function deleteMeeting(id) {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  }

  const meetingsByDay = useMemo(() => {
    const map = {};
    daysOfWeek.forEach((d) => {
      map[formatDateISO(d)] = [];
    });
    meetings.forEach((m) => {
      const k = formatDateISO(new Date(m.start));
      if (!map[k]) map[k] = [];
      map[k].push(m);
    });
    // sort by start time
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => new Date(a.start) - new Date(b.start))
    );
    return map;
  }, [meetings, daysOfWeek]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">Meeting Calendar</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentWeekStart((d) => addDays(d, -7))}
          >
            Prev
          </button>
          <div className="opacity-70 text-sm">{weekRangeLabel}</div>
          <button
            className="btn btn-sm"
            onClick={() => setCurrentWeekStart(getMonday(new Date()))}
          >
            Today
          </button>
          <button
            className="btn btn-sm"
            onClick={() => setCurrentWeekStart((d) => addDays(d, 7))}
          >
            Next
          </button>
          <button
            className="btn btn-primary btn-sm flex items-center gap-2"
            onClick={() => openModalForDate(new Date())}
          >
            <PlusCircle className="w-4 h-4" />
            Create Meeting
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <div
            className="grid"
            style={{ gridTemplateColumns: `100px repeat(7, minmax(0, 1fr))` }}
          >
            {/* Header row */}
            <div></div>
            {daysOfWeek.map((d, idx) => (
              <div key={idx} className="p-2 text-center font-semibold">
                {d.toLocaleDateString(undefined, { weekday: "short" })}
                <div className="text-xs opacity-70">
                  {d.getDate()}/{d.getMonth() + 1}
                </div>
              </div>
            ))}

            {/* Time grid */}
            {HOURS.map((hour) => (
              <React.Fragment key={hour}>
                <div className="border-t p-2 text-xs flex items-start justify-end pr-3 opacity-70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {String(hour).padStart(2, "0")}:00
                  </div>
                </div>
                {daysOfWeek.map((d) => (
                  <div
                    key={`${formatDateISO(d)}-${hour}`}
                    className="relative border-t border-l h-24 hover:bg-base-200/60 cursor-pointer"
                    onDoubleClick={() => openModalForDate(d, hour)}
                    onDrop={(ev) => onSlotDrop(ev, d, hour)}
                    onDragOver={allowDrop}
                  >
                    {/* Meetings in this slot (start within this hour) */}
                    {(meetingsByDay[formatDateISO(d)] ?? [])
                      .filter((m) => new Date(m.start).getHours() === hour)
                      .map((m) => {
                        const start = new Date(m.start);
                        const end = new Date(m.end);
                        const durationMin = Math.max(
                          30,
                          minutesBetween(start, end)
                        );
                        const height = Math.min(120, (durationMin / 60) * 96); // cap to 2 slots height
                        return (
                          <div
                            key={m.id}
                            draggable
                            onDragStart={(ev) => onDragStart(ev, m.id)}
                            onDragEnd={onDragEnd}
                            className={`absolute left-1 right-1 top-1 rounded-md p-2 text-xs bg-primary text-white shadow ${
                              draggingId === m.id ? "opacity-70" : ""
                            }`}
                            style={{ height }}
                            title={`${m.title} (${toTimeString(
                              start
                            )} - ${toTimeString(end)})`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="font-semibold truncate">
                                {m.title}
                              </div>
                              <button
                                className="opacity-90 hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMeeting(m.id);
                                }}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="opacity-90">
                              {toTimeString(start)} - {toTimeString(end)}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="card bg-base-100 w-full max-w-md">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h3 className="card-title">Create meeting</h3>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form className="space-y-3" onSubmit={createMeeting}>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <input
                    className="input input-bordered"
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Team sync"
                    required
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Date</span>
                    </div>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={form.date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, date: e.target.value }))
                      }
                      required
                    />
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Start</span>
                    </div>
                    <input
                      type="time"
                      className="input input-bordered"
                      step="900"
                      value={form.startTime}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, startTime: e.target.value }))
                      }
                      required
                    />
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">End</span>
                    </div>
                    <input
                      type="time"
                      className="input input-bordered"
                      step="900"
                      value={form.endTime}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, endTime: e.target.value }))
                      }
                      required
                    />
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create
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

export default Calendar;
