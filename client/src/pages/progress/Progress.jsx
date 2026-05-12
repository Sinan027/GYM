import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// ── Demo data shown when backend is offline ──────────────────────────────────
const DEMO_LOGS = [
  { _id: 'd1', date: new Date(Date.now() - 4 * 86400000).toISOString(), weight: 77.0, workoutsCompleted: 'Legs', calories: 2500, chest: 101, waist: 87 },
  { _id: 'd2', date: new Date(Date.now() - 3 * 86400000).toISOString(), weight: 76.5, workoutsCompleted: 'Push Day', calories: 2400, chest: 100.5, waist: 86 },
  { _id: 'd3', date: new Date(Date.now() - 2 * 86400000).toISOString(), weight: 76.0, workoutsCompleted: 'Pull Day', calories: 2600, chest: 100, waist: 86 },
  { _id: 'd4', date: new Date(Date.now() - 1 * 86400000).toISOString(), weight: 75.5, workoutsCompleted: 'Cardio', calories: 2200, chest: 99.5, waist: 85 },
  { _id: 'd5', date: new Date().toISOString(), weight: 75.0, workoutsCompleted: 'Push Day', calories: 2400, chest: 99, waist: 85 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (dateVal, includeYear = false) => {
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', ...(includeYear && { year: 'numeric' }) });
  } catch { return 'Unknown'; }
};

// ── Styles (all inline – no external CSS dependency) ─────────────────────────
const S = {
  page: {
    background: '#0d0d0d',
    color: '#fff',
    minHeight: '100vh',
    padding: '120px 8% 100px',
    fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
    boxSizing: 'border-box',
  },
  container: { maxWidth: 1400, margin: '0 auto' },
  sectionNum: { color: '#B5F23D', fontWeight: 800, letterSpacing: 2, fontSize: '0.78rem', marginBottom: 10, display: 'block' },
  heavyTitle: { fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 60, letterSpacing: -2, textTransform: 'uppercase' },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 32, alignItems: 'start' },
  panel: { background: '#121212', border: '1px solid #1e1e1e', padding: 36 },
  panelTitle: { fontSize: '0.82rem', fontWeight: 800, letterSpacing: 1.5, marginBottom: 28, textTransform: 'uppercase', color: '#fff' },
  label: { display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 1, marginBottom: 7, color: '#ccc', textTransform: 'uppercase' },
  input: { width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a', padding: '14px 15px', color: '#fff', fontSize: '0.95rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  inputRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  inputBlock: { marginBottom: 22 },
  btn: { width: '100%', background: '#B5F23D', color: '#000', border: 'none', padding: '17px 0', fontWeight: 900, fontSize: '0.95rem', letterSpacing: 2, cursor: 'pointer', marginTop: 8, textTransform: 'uppercase', transition: 'transform 0.15s, opacity 0.15s' },
  visuals: { display: 'flex', flexDirection: 'column', gap: 24 },
  logRow: { display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 0', borderBottom: '1px solid #1e1e1e' },
  logHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logDate: { color: '#B5F23D', fontWeight: 700, fontSize: '0.85rem' },
  logWeight: { fontWeight: 900, fontSize: '1.15rem', color: '#fff' },
  logMeta: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: '0.8rem', color: '#888', marginTop: 6 },
  demoBadge: { background: '#1a1a00', border: '1px solid #B5F23D33', color: '#B5F23D', fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1, padding: '4px 10px', display: 'inline-block', marginBottom: 20 },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Progress() {
  const [logs, setLogs] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  const [weight, setWeight] = useState('');
  const [workouts, setWorkouts] = useState('');
  const [calories, setCalories] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Focus glow on inputs
  const [focused, setFocused] = useState('');

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/progress');
      const data = Array.isArray(res.data) ? res.data : [];
      if (data.length === 0) { setLogs(DEMO_LOGS); setIsDemo(true); }
      else { setLogs(data); setIsDemo(false); }
    } catch {
      // Backend offline → use demo data so the page is never blank
      setLogs(DEMO_LOGS);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/progress', {
        weight, workoutsCompleted: workouts, calories, chest, waist,
      });
      setWeight(''); setWorkouts(''); setCalories(''); setChest(''); setWaist('');
      fetchLogs();
    } catch {
      // If backend is down, add the entry locally so the user sees it
      const newEntry = {
        _id: `local-${Date.now()}`,
        date: new Date().toISOString(),
        weight: parseFloat(weight) || 0,
        workoutsCompleted: workouts,
        calories: parseInt(calories) || 0,
        chest: parseFloat(chest) || 0,
        waist: parseFloat(waist) || 0,
      };
      setLogs(prev => [newEntry, ...prev.filter(l => !l._id?.startsWith('d'))]);
      setIsDemo(false);
      setWeight(''); setWorkouts(''); setCalories(''); setChest(''); setWaist('');
    } finally {
      setSubmitting(false);
    }
  };

  const chartData = [...logs].reverse().map(l => ({
    date: fmt(l.date),
    weight: parseFloat(l.weight) || 0,
  }));

  const inputStyle = (name) => ({
    ...S.input,
    borderColor: focused === name ? '#B5F23D' : '#2a2a2a',
  });

  return (
    <div style={S.page}>
      <div style={S.container}>
        {/* ── Header ── */}
        <header>
          <span style={S.sectionNum}>07 — PROGRESS</span>
          <h1 style={S.heavyTitle}>TRACK YOUR<br />JOURNEY</h1>
        </header>

        {isDemo && (
          <div style={S.demoBadge}></div>
        )}

        {loading ? (
          <p style={{ color: '#555', letterSpacing: 2, fontSize: '0.8rem' }}>LOADING...</p>
        ) : (
          <div style={{
            ...S.grid,
            gridTemplateColumns: window.innerWidth < 900 ? '1fr' : 'minmax(0,1.1fr) minmax(0,0.9fr)',
          }}>

            {/* ── LEFT: Form ── */}
            <section style={S.panel}>
              <p style={S.panelTitle}>Log Today's Stats</p>
              <form onSubmit={handleSubmit}>
                <div style={S.inputBlock}>
                  <label style={S.label}>Body Weight (kg)</label>
                  <input style={inputStyle('weight')} type="number" placeholder="70.5" step="0.1" required
                    value={weight} onChange={e => setWeight(e.target.value)}
                    onFocus={() => setFocused('weight')} onBlur={() => setFocused('')} />
                </div>

                <div style={S.inputBlock}>
                  <label style={S.label}>Workouts Completed</label>
                  <input style={inputStyle('workouts')} type="text" placeholder="Push Day, Cardio…"
                    value={workouts} onChange={e => setWorkouts(e.target.value)}
                    onFocus={() => setFocused('workouts')} onBlur={() => setFocused('')} />
                </div>

                <div style={S.inputBlock}>
                  <label style={S.label}>Calories Consumed</label>
                  <input style={inputStyle('calories')} type="number" placeholder="2100"
                    value={calories} onChange={e => setCalories(e.target.value)}
                    onFocus={() => setFocused('calories')} onBlur={() => setFocused('')} />
                </div>

                <div style={{ ...S.inputBlock, ...S.inputRow }}>
                  <div>
                    <label style={S.label}>Chest (cm)</label>
                    <input style={inputStyle('chest')} type="number" placeholder="94"
                      value={chest} onChange={e => setChest(e.target.value)}
                      onFocus={() => setFocused('chest')} onBlur={() => setFocused('')} />
                  </div>
                  <div>
                    <label style={S.label}>Waist (cm)</label>
                    <input style={inputStyle('waist')} type="number" placeholder="82"
                      value={waist} onChange={e => setWaist(e.target.value)}
                      onFocus={() => setFocused('waist')} onBlur={() => setFocused('')} />
                  </div>
                </div>

                <button type="submit" style={{ ...S.btn, opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
                  {submitting ? 'LOGGING…' : 'LOG PROGRESS'}
                </button>
              </form>
            </section>

            {/* ── RIGHT: Chart + Logs ── */}
            <div style={S.visuals}>

              {/* Chart */}
              <section style={S.panel}>
                <p style={S.panelTitle}>Weight Over Time</p>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="99%" height={200}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                      <YAxis stroke="#444" domain={['dataMin - 1', 'dataMax + 1']} tick={{ fill: '#666', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ background: '#111', border: '1px solid #2a2a2a', color: '#fff', fontSize: 12 }}
                        formatter={(v) => [`${v} kg`, 'Weight']}
                      />
                      <Line type="monotone" dataKey="weight" stroke="#B5F23D" strokeWidth={3}
                        dot={{ fill: '#B5F23D', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: '#fff', stroke: '#B5F23D', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p style={{ color: '#555', textAlign: 'center', paddingTop: 60, fontSize: '0.8rem' }}>
                    No data yet — log your first weight!
                  </p>
                )}
              </section>

              {/* Recent logs */}
              <section style={S.panel}>
                <p style={S.panelTitle}>Recent Logs</p>
                <div>
                  {logs.length === 0 ? (
                    <p style={{ color: '#555', fontSize: '0.8rem' }}>No logs yet.</p>
                  ) : (
                    logs.slice(0, 5).map(log => (
                      <div key={log._id || Math.random()} style={S.logRow}>
                        <div style={S.logHeader}>
                          <span style={S.logDate}>{fmt(log.date, true)}</span>
                          <span style={S.logWeight}>{log.weight} kg</span>
                        </div>
                        <div style={S.logMeta}>
                          <span><strong style={{ color: '#ccc' }}>Workout:</strong> {log.workoutsCompleted || 'None'}</span>
                          <span><strong style={{ color: '#ccc' }}>Calories:</strong> {log.calories ? `${log.calories} kcal` : 'N/A'}</span>
                          <span><strong style={{ color: '#ccc' }}>Chest:</strong> {log.chest ? `${log.chest} cm` : 'N/A'}</span>
                          <span><strong style={{ color: '#ccc' }}>Waist:</strong> {log.waist ? `${log.waist} cm` : 'N/A'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
