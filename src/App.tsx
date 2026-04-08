import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Sparkles, BookOpen, DollarSign, Clock, Map, CheckCircle, BookText, Moon, Globe, FileDown, ChevronRight, Lock, BookMarked, Users, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';
import { translations, Language } from './translations';
import { Testimonials } from './components/Testimonials';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { MockupUI } from './components/MockupUI';

const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void; t: typeof translations.es }>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
});

export const useLanguage = () => useContext(LanguageContext);

const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 2000 }: { value: number, prefix?: string, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMilSecDur = duration;
    let incrementTime = (totalMilSecDur / end);
    if (incrementTime < 10) incrementTime = 10;
    const step = Math.max(1, Math.floor(end / (totalMilSecDur / incrementTime)));

    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Particles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number, 
    size: number, 
    x: number, 
    y: number, 
    duration: number, 
    delay: number,
    colorType: 'emerald' | 'gold',
    driftX: number,
    driftY: number,
    maxOpacity: number,
    maxScale: number
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      colorType: Math.random() > 0.25 ? 'emerald' : 'gold',
      driftX: Math.random() * 80 - 40,
      driftY: -(Math.random() * 250 + 100),
      maxOpacity: Math.random() * 0.6 + 0.4,
      maxScale: Math.random() * 1.5 + 1
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        const isEmerald = p.colorType === 'emerald';
        const bgColor = isEmerald ? 'bg-emerald-400/50' : 'bg-yellow-400/50';
        const shadowColor = isEmerald ? 'rgba(52,211,153,0.8)' : 'rgba(250,204,21,0.8)';
        
        return (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${bgColor}`}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              boxShadow: `0 0 ${p.size * 4}px ${shadowColor}`,
            }}
            animate={{
              y: [0, p.driftY],
              x: [0, p.driftX],
              opacity: [0, p.maxOpacity, 0],
              scale: [1, p.maxScale, 0.8]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

const SocialProofPopup = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentData, setCurrentData] = useState({ name: '', time: '' });

  const names = ['María G.', 'Carlos R.', 'Ana P.', 'Laura M.', 'David S.', 'Elena V.', 'Sofía T.', 'Javier L.'];

  useEffect(() => {
    const showPopup = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTime = t.popupTimes[Math.floor(Math.random() * t.popupTimes.length)];
      setCurrentData({ name: randomName, time: randomTime });
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds
    };

    // Initial show after 15 seconds
    const initialTimeout = setTimeout(showPopup, 15000);

    // Then show every 60 to 90 seconds
    const scheduleNext = () => {
      const nextInterval = Math.floor(Math.random() * (90000 - 60000 + 1) + 60000);
      return setTimeout(() => {
        showPopup();
        timeoutRef.current = scheduleNext();
      }, nextInterval);
    };

    const timeoutRef = { current: scheduleNext() };

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(initialTimeout);
    };
  }, [t]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed top-24 sm:top-auto sm:bottom-6 left-1/2 sm:left-6 -translate-x-1/2 sm:translate-x-0 z-50 flex items-center gap-4 p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/30 shadow-[0_10px_30px_rgba(80,200,120,0.15)] backdrop-blur-md w-[90%] sm:w-auto"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">
              <span className="text-emerald-400">{currentData.name}</span> {t.popupJoined}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{currentData.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over an interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[100] mix-blend-screen hidden md:block"
      animate={{
        x: mousePosition.x - 64, // Center the 128px div
        y: mousePosition.y - 64,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <div className="w-full h-full bg-emerald-500/20 blur-[40px] rounded-full" />
    </motion.div>
  );
};

const ShareButtons = ({ url, text, lang }: { url: string, text: string, lang: string }) => {
  const handleInstagramShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(url + " - " + text);
    alert(lang === 'es' ? '¡Enlace copiado! Abre Instagram y pégalo en tus historias o mensajes.' : 'Link copied! Open Instagram and paste it in your stories or messages.');
    window.open('https://instagram.com', '_blank');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
        {lang === 'es' ? 'Comparte con otros autores' : 'Share with other authors'}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-[#25D366] hover:text-white rounded-full transition-colors text-slate-300" aria-label="Share on WhatsApp">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>
        <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-[#0088cc] hover:text-white rounded-full transition-colors text-slate-300" aria-label="Share on Telegram">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
        <a href="https://www.instagram.com/bookishalchemy.ai/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F56040] hover:text-white rounded-full transition-all text-slate-300" aria-label="Visit our Instagram">
          <Instagram className="w-5 h-5" />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-[#1DA1F2] hover:text-white rounded-full transition-colors text-slate-300" aria-label="Share on Twitter">
          <Twitter className="w-5 h-5" />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-[#4267B2] hover:text-white rounded-full transition-colors text-slate-300" aria-label="Share on Facebook">
          <Facebook className="w-5 h-5" />
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-[#0077b5] hover:text-white rounded-full transition-colors text-slate-300" aria-label="Share on LinkedIn">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

function MainContent() {
  const { t, lang, setLang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = new URLSearchParams(formData as any);

    try {
      await fetch(form.action, {
        method: 'POST',
        body: data,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      // Con no-cors no podemos leer la respuesta, pero si no hay error de red, asumimos éxito.
      setIsSubscribed(true);
      
      // Fire Meta Pixel event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      // Retrasamos la redirección 1.5 segundos para asegurar que la petición se completó
      // y para que el usuario pueda ver el mensaje de éxito.
      setTimeout(() => {
        window.location.href = 'https://lanzamiento-editorial.vercel.app/';
      }, 1500);
    } catch (error) {
      console.error('Error al suscribirse:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      <CustomCursor />
      <SocialProofPopup />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 to-violet-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Floating Navbar with Glassmorphism */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-md border-b border-emerald-500/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-violet-500/20 border border-emerald-500/30 overflow-hidden">
              <BookOpen className="w-6 h-6 text-yellow-400 drop-shadow-md" />
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight hidden sm:block">The Bestseller Blueprint</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              to="/historias" 
              className="text-sm font-medium text-slate-200 hover:text-emerald-400 transition-colors duration-300"
            >
              {t.navTestimonials}
            </Link>
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300 hover:text-emerald-400"
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-xs font-bold uppercase">{lang}</span>
            </button>
            <button
              onClick={scrollToForm}
              className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 rounded-lg hover:shadow-[0_0_15px_rgba(80,200,120,0.5)] transition-all hover:scale-105"
            >
              {t.btnAccess}
            </button>
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-yellow-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* 1. Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
          <Particles />
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column: Text & Form */}
            <div className="text-center lg:text-left">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(80,200,120,0.15)]">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.badge}</span>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight font-serif">
                  {t.heroTitle1} <br className="hidden md:block lg:hidden xl:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                    {t.heroTitle2}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {t.heroSubtitle}
                </p>
              </FadeIn>

              <FadeIn delay={0.4} className="w-full max-w-xl mx-auto lg:mx-0">
                {!isSubscribed ? (
                  <>
                    <form 
                      className="flex flex-col sm:flex-row gap-3 w-full"
                      action="https://assets.mailerlite.com/jsonp/2207106/forms/182416487836812530/subscribe" 
                      method="post" 
                      onSubmit={handleSubscribe}
                    >
                      <input 
                        type="email" 
                        name="fields[email]" 
                        placeholder={t.formPlaceholder}
                        required
                        className="flex-1 px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all font-sans"
                      />
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-[#006a61] rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,106,97,0.4)] disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto w-full whitespace-nowrap"
                      >
                        <span className="relative">{isLoading ? 'Cargando...' : t.btnAccess}</span>
                      </button>
                    </form>
                    <p className="text-xs text-slate-500 mt-4 text-center lg:text-left">
                      {lang === 'es' ? 'Acceso gratuito a la plataforma interactiva. Opción de descarga Premium disponible.' : 'Free access to the interactive platform. Premium download option available.'}
                    </p>
                  </>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center lg:text-left">
                    <h4 className="text-xl font-bold text-emerald-400 mb-2">¡Gracias por suscribirte!</h4>
                    <p className="text-slate-300">Te estamos redirigiendo a la plataforma...</p>
                  </div>
                )}
                <div className="flex flex-col items-center lg:items-start gap-4 mt-8">
                  <div className="flex items-center gap-2 text-sm text-slate-400 font-sans">
                    <Lock className="w-4 h-4" />
                    <span>{t.trustBadge}</span>
                  </div>
                  
                  {/* Testimonial */}
                  <div className="mt-4 text-center lg:text-left">
                    <div className="flex gap-1 justify-center lg:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="font-serif italic text-slate-300 text-sm leading-relaxed max-w-md">
                      "The Bestseller Blueprint es una herramienta que te ayuda a ir de la mano del proceso y no luchando contra él."
                      <br />
                      <span className="text-emerald-400 not-italic text-xs mt-1 block">— A. Entre Letras (@a_entre_letras)</span>
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: iPad Mockup */}
            <FadeIn delay={0.5} className="relative mt-12 lg:mt-0">
              <div className="relative mx-auto w-full max-w-[750px] aspect-[4/3] lg:scale-110 lg:translate-x-4 xl:translate-x-12">
                {/* iPad Frame */}
                <div className="absolute inset-0 bg-slate-800 rounded-[2rem] p-3 shadow-2xl border border-slate-700">
                  {/* Screen */}
                  <div className="relative w-full h-full bg-slate-950 rounded-[1.5rem] overflow-hidden border border-slate-900">
                    {/* Top Camera/Sensor area */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-b-xl z-20"></div>
                    
                    {/* UI Component instead of image */}
                    <div className="absolute inset-0 w-full h-full">
                      <MockupUI />
                    </div>
                    
                    {/* Subtle overlay for realism */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent mix-blend-overlay pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Glow effect behind iPad */}
                <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl -z-10 rounded-full opacity-50"></div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. The Problem Section */}
        <section className="py-24 px-6 bg-slate-900/50 border-y border-slate-800/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t.problemTitle1} <br />
                  <span className="text-yellow-400">{t.problemTitle2}</span>
                </h2>
                <p className="text-[17px] text-slate-400 max-w-2xl mx-auto whitespace-pre-line">
                  {t.problemSubtitle}
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: BookOpen, num: 97, suffix: "%", title: t.stat1Title, desc: t.stat1Desc },
                { icon: DollarSign, num: 5000, prefix: "$", title: t.stat2Title, desc: t.stat2Desc },
                { icon: Users, num: 82, suffix: "%", title: t.stat3Title, desc: t.stat3Desc },
                { icon: Clock, num: 4, suffix: " años", title: t.stat4Title, desc: t.stat4Desc }
              ].map((stat, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/30 transition-colors h-full">
                    <stat.icon className="w-8 h-8 text-emerald-400 mb-4" />
                    <div className="text-4xl font-bold text-white mb-2">
                      <AnimatedNumber value={stat.num} prefix={stat.prefix} suffix={stat.suffix} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">{stat.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{stat.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-violet-900/20 to-slate-900/50 border border-violet-500/20">
                <p className="text-xl md:text-2xl font-medium italic text-slate-300">
                  {t.quote}
                </p>
                {t.quoteAuthor && (
                  <p className="mt-4 text-emerald-400 font-medium">{t.quoteAuthor}</p>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 3. The Solution Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {t.solutionTitle1} <br />
                  <span className="text-emerald-400">{t.solutionTitle2}</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  {t.solutionSubtitle}
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: t.step1Title, desc: t.step1Desc },
                { step: "02", title: t.step2Title, desc: t.step2Desc },
                { step: "03", title: t.step3Title, desc: t.step3Desc }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.2}>
                  <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-yellow-400/50 md:border-slate-800 md:hover:border-yellow-400/50 transition-all duration-500 h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent md:from-yellow-400/0 md:to-yellow-400/0 md:group-hover:from-yellow-400/5 md:group-hover:to-transparent transition-colors duration-500" />
                    <div className="text-6xl font-black text-yellow-400/20 md:text-slate-800/50 mb-6 md:group-hover:text-yellow-400/20 transition-colors">{item.step}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Our Story Section */}
        <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-500/50" />
                <h2 className="text-3xl font-bold text-center">{t.storyTitle}</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-500/50" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-center mb-10 text-slate-200">
                {t.storySubtitle}
              </h3>
              
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed mb-12">
                <p className="mb-6">
                  {t.storyP1}
                </p>
                <p className="mb-6">
                  {t.storyP2}
                </p>
                <p className="mb-6 whitespace-pre-line">
                  {t.storyP3}
                </p>
                <p className="whitespace-pre-line">
                  {t.storyP4}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-lg font-semibold text-white flex items-center gap-2">
                    📖✍️ {t.founders}
                  </p>
                  <p className="text-emerald-400 text-sm mt-1">{t.foundersDesc}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">{t.tag1}</span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">{t.tag2}</span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">{t.tag3}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 5. Features Grid */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t.featuresTitle1} <br />
                  <span className="text-emerald-400">{t.featuresTitle2}</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  {t.featuresSubtitle}
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Map, title: t.feat1Title, desc: t.feat1Desc },
                { icon: CheckCircle, title: t.feat2Title, desc: t.feat2Desc },
                { icon: BookText, title: t.feat3Title, desc: t.feat3Desc },
                { icon: Moon, title: t.feat4Title, desc: t.feat4Desc },
                { icon: Globe, title: t.feat5Title, desc: t.feat5Desc },
                { icon: FileDown, title: t.feat6Title, desc: t.feat6Desc }
              ].map((feature, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:bg-slate-800/50 transition-colors">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-yellow-400 shrink-0">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* 6. CTA Final (MailerLite) */}
        <section id="cta-form" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/10 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {t.ctaTitle1}
                </h2>
              </div>
              
              {/* MailerLite Native Form */}
              <div id="mlb2-38730039" className="ml-subscribe-form ml-subscribe-form-38730039 w-full max-w-md mx-auto bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-sm">
                {!isSubscribed ? (
                  <>
                    <div className="text-center mb-8">
                      <h4 className="text-2xl font-bold mb-3 text-white">{t.formTitle}</h4>
                      <p className="text-slate-300">{t.formDesc}</p>
                    </div>
                    
                    <form 
                      className="ml-block-form flex flex-col gap-4"
                      action="https://assets.mailerlite.com/jsonp/2207106/forms/182416487836812530/subscribe" 
                      method="post" 
                      onSubmit={handleSubscribe}
                    >
                      <div className="ml-form-fieldRow ml-last-item">
                        <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required relative">
                          <input 
                            type="email" 
                            name="fields[email]" 
                            className="form-control w-full px-6 py-4 bg-slate-950/80 border border-yellow-400/50 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all shadow-inner"
                            placeholder={t.formPlaceholder} 
                            autoComplete="email"
                            required
                          />
                        </div>
                      </div>
                      
                      <input type="hidden" name="ml-submit" value="1" />
                      <input type="hidden" name="anticsrf" value="true" />
                      
                      <div className="ml-form-embedSubmit">
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="primary group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-slate-950 bg-emerald-400 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(80,200,120,0.4)] w-full disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                              <span className="relative ml-2">{lang === 'es' ? 'Enviando...' : 'Sending...'}</span>
                            </>
                          ) : (
                            <>
                              <span className="relative">{t.btnAccess}</span>
                              <ChevronRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                      
                      <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" />
                        {lang === 'es' ? 'Tus datos están 100% seguros' : 'Your data is 100% secure'}
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(80,200,120,0.3)]">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="text-3xl font-bold mb-4 text-white">
                      {lang === 'es' ? '¡Suscripción Exitosa!' : 'Successfully Subscribed!'}
                    </h4>
                    <p className="text-slate-300 text-lg mb-8">
                      {lang === 'es' 
                        ? 'Revisa tu bandeja de entrada (o carpeta de spam) para confirmar tu correo y acceder al contenido.' 
                        : 'Check your inbox (or spam folder) to confirm your email and access the content.'}
                    </p>
                    <div className="pt-6 border-t border-slate-800">
                      <ShareButtons 
                        url={window.location.href} 
                        text={lang === 'es' ? '¡Acabo de descargar The Bestseller Blueprint! Consíguelo aquí:' : 'I just downloaded The Bestseller Blueprint! Get it here:'} 
                        lang={lang} 
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-slate-500 text-sm border-t border-slate-800/50">
          <div className="mb-8">
            <ShareButtons 
              url={window.location.href} 
              text={lang === 'es' ? '¡Descubre The Bestseller Blueprint!' : 'Discover The Bestseller Blueprint!'} 
              lang={lang} 
            />
          </div>
          <p>{t.footer.replace('{year}', new Date().getFullYear().toString())}</p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved === 'es' || saved === 'en') ? saved : 'es';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/historias" element={<TestimonialsPage />} />
      </Routes>
    </LanguageContext.Provider>
  );
}
