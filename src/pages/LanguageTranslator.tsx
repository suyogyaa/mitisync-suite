import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { TextArea } from '../components/ui/Input';
import { Toggle } from '../components/ui/Toggle';
import { ArrowRightLeft, Languages, Loader2 } from 'lucide-react';

// Use Google Translate API for translation
const translateText = async (text: string, from: string, to: string) => {
  if (!text.trim()) return '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  return data && data[0] ? data[0].map((item: any) => item[0]).join('') : '';
};

export function LanguageTranslator() {
  const [isEnToNe, setIsEnToNe] = useState(true);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  // Debounced translation
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputText.trim()) {
        setIsTranslating(true);
        try {
          const from = isEnToNe ? 'en' : 'ne';
          const to = isEnToNe ? 'ne' : 'en';
          const result = await translateText(inputText, from, to);
          setOutputText(result);
        } catch (error) {
          console.error('Translation error:', error);
          setOutputText('Error translating text.');
        } finally {
          setIsTranslating(false);
        }
      } else {
        setOutputText('');
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(timer);
  }, [inputText, isEnToNe]);

  const handleToggle = (checked: boolean) => {
    setIsEnToNe(!checked);
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="bg-[var(--color-accent)]/10 p-3 rounded-xl">
          <Languages className="w-6 h-6 text-[var(--color-accent)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Language Translator</h1>
          <p className="text-[var(--color-text-secondary)]">Translate between English and Nepali</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-md">
            <div className="flex items-center gap-6">
              <span className={`font-medium w-20 text-right ${isEnToNe ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
                English
              </span>
              <Toggle checked={!isEnToNe} onChange={handleToggle} />
              <span className={`font-medium w-20 text-left ${!isEnToNe ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`}>
                Nepali
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch h-[300px]">
            <div className="h-full relative">
              <TextArea
                label={isEnToNe ? "English Input" : "नेपाली इनपुट (Nepali Input)"}
                placeholder={isEnToNe ? "Type here to translate..." : "अनुवाद गर्न यहाँ लेख्नुहोस्..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-[var(--color-surface)] shadow-md h-full text-lg p-5"
              />
            </div>
            
            <div className="hidden md:flex flex-col items-center justify-center text-[var(--color-border)]">
              <ArrowRightLeft className="w-8 h-8" />
            </div>

            <div className="h-full relative">
              <TextArea
                label={!isEnToNe ? "English Translation" : "नेपाली अनुवाद (Nepali Translation)"}
                value={outputText}
                readOnly
                placeholder={!isEnToNe ? "Translation will appear here..." : "अनुवाद यहाँ देखिनेछ..."}
                className="bg-[var(--color-background)] shadow-inner h-full text-lg p-5 text-[var(--color-accent)] font-medium"
              />
              {isTranslating && (
                <div className="absolute top-2 right-2">
                  <Loader2 className="w-5 h-5 animate-spin text-[var(--color-text-secondary)]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
