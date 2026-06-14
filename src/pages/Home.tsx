import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Calendar, Languages, ArrowRight } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-12">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          MitiSync <span className="text-[var(--color-accent)]">Suite</span>
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Align your timelines and bridge your languages in one minimal workspace.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card 
          hoverable 
          onClick={() => navigate('/date')}
          className="flex flex-col h-full group"
        >
          <div className="bg-[var(--color-accent)]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Calendar className="w-7 h-7 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Patro Sync</h2>
          <p className="text-[var(--color-text-secondary)] flex-1">
            Synchronize your dates. Accurate AD to BS conversions with full leap-year support.
          </p>
          <div className="mt-6 flex items-center text-[var(--color-accent)] font-medium">
            Open Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>

        <Card 
          hoverable 
          onClick={() => navigate('/language')}
          className="flex flex-col h-full group"
        >
          <div className="bg-[var(--color-accent)]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Languages className="w-7 h-7 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Bhasa Sync</h2>
          <p className="text-[var(--color-text-secondary)] flex-1">
            Bridge the language gap with lightning-fast, side-by-side English to Nepali translation.
          </p>
          <div className="mt-6 flex items-center text-[var(--color-accent)] font-medium">
            Open Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>
      </div>
    </div>
  );
}
