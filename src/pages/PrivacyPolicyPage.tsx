import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../App';
import { FadeIn } from '../components/FadeIn';

export const PrivacyPolicyPage = () => {
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#2D2D2D] font-sans selection:bg-[#006a61]/20 flex flex-col">
      {/* Floating Navbar with Glassmorphism */}
      <nav className="fixed top-0 w-full z-50 bg-[#FDFCF0]/80 backdrop-blur-md border-b border-[#006a61]/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#006a61]/10 to-[#4B0082]/10 border border-[#006a61]/20 overflow-hidden">
              <BookOpen className="w-6 h-6 text-[#D4AF37] drop-shadow-sm" />
            </div>
            <span className="text-xl font-bold text-[#2D2D2D] tracking-tight hidden sm:block font-serif">The Bestseller Blueprint</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-[#006a61]"
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-xs font-bold uppercase">{lang}</span>
            </button>
            <Link
              to="/"
              className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#006a61] rounded-lg hover:shadow-[0_4px_15px_rgba(0,106,97,0.3)] transition-all hover:scale-105"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#006a61]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4B0082]/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-[#D4AF37]/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex-1 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-bold mb-8 font-serif text-[#2D2D2D]">
              Política de <span className="text-[#006a61]">Privacidad</span>
            </h1>
            
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-sans leading-relaxed">
              <p>
                En Bookish Alchemy AI Studio, valoramos tu privacidad. Los datos recogidos (nombre y correo electrónico) se utilizan exclusivamente para enviarte el Mapa de las 7 Tareas Críticas y actualizaciones de nuestros productos digitales. No compartimos tu información con terceros. Puedes darte de baja en cualquier momento desde nuestros correos.
              </p>
            </div>

            <div className="mt-16">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 text-[#006a61] font-bold rounded-xl hover:bg-[#006a61]/5 transition-all font-sans"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver a la página principal
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
