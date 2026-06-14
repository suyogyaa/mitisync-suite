import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { DateTranslator } from './pages/DateTranslator';
import { LanguageTranslator } from './pages/LanguageTranslator';
import { RefreshCcw } from 'lucide-react'; // MitiSync logo/icon
import NepaliDate from 'nepali-datetime';

function LiveDateDisplay() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update the live clock every minute
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const bsDate = new NepaliDate(now);
  const englishDateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dayStr = now.toLocaleDateString('en-US', { weekday: 'long' });
  const nepaliDateStr = bsDate.format('MMMM D, YYYY');

  return (
    <div className="flex flex-col text-xs text-[var(--color-text-secondary)]">
      <div className="font-semibold text-[var(--color-accent)] mb-0.5">{dayStr}</div>
      <div className="flex items-center gap-3">
        <span>{englishDateStr} <span className="opacity-70">(AD)</span></span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
        <span>{nepaliDateStr} <span className="opacity-70">(BS)</span></span>
      </div>
    </div>
  );
}

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[var(--color-accent)]/10 p-2 rounded-xl group-hover:bg-[var(--color-accent)]/20 transition-colors">
              <RefreshCcw className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">MitiSync Suite</span>
          </Link>
          
          <div className="hidden md:block h-8 w-px bg-[var(--color-border)]"></div>
          
          <div className="hidden sm:block">
            <LiveDateDisplay />
          </div>
        </div>

        {!isHome && (
          <Link to="/">
            <button className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Back to Home
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/date" element={<DateTranslator />} />
            <Route path="/language" element={<LanguageTranslator />} />
          </Routes>
        </main>
        <footer className="border-t border-[var(--color-border)] mt-auto py-6">
          <div className="max-w-5xl mx-auto px-6 text-center text-sm text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} suyogyasedhai. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
