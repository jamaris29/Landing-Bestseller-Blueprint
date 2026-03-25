import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Sparkles, BookOpen, DollarSign, Clock, Map, CheckCircle, BookText, Moon, Globe, FileDown, ChevronRight, Lock, BookMarked, Users } from 'lucide-react';
import { translations, Language } from './translations';

const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void; t: typeof translations.es }>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
});

export const useLanguage = () => useContext(LanguageContext);

const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 2000 }: { value: number, prefix?: string, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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

    // Initial show after 10 seconds
    const initialTimeout = setTimeout(showPopup, 10000);

    // Then show every 60 seconds
    const interval = setInterval(showPopup, 60000);

    return () => {
      clearInterval(interval);
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
          className="fixed bottom-6 left-6 z-50 flex items-center gap-4 p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/30 shadow-[0_10px_30px_rgba(80,200,120,0.15)] backdrop-blur-md"
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

function MainContent() {
  const { t, lang, setLang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
              <img src="./logo.png" alt="Logo" className="absolute inset-0 w-full h-full object-contain p-1 z-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <BookOpen className="w-5 h-5 text-emerald-400 absolute" />
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight hidden sm:block">The Bestseller Blueprint</span>
          </div>
          <div className="flex items-center gap-4">
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
              className="px-5 py-2 text-sm font-bold text-slate-950 bg-emerald-400 rounded-lg hover:shadow-[0_0_15px_rgba(80,200,120,0.5)] transition-all hover:scale-105"
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
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center overflow-hidden">
          <Particles />
          <FadeIn delay={0.1} className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(80,200,120,0.15)]">
              <Sparkles className="w-4 h-4" />
              <span>{t.badge}</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              {t.heroTitle1} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                {t.heroTitle2}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} className="max-w-2xl">
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <button 
              onClick={scrollToForm}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-slate-950 bg-emerald-400 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(80,200,120,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">{t.btnAccess}</span>
              <ChevronRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400">
              <Lock className="w-4 h-4" />
              <span>{t.trustBadge} <AnimatedNumber value={2851} /> {t.trustBadge2}</span>
            </div>
          </FadeIn>
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
                <p className="text-slate-400 max-w-2xl mx-auto">
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
                <p className="mt-4 text-emerald-400 font-medium">{t.quoteAuthor}</p>
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
                  <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-yellow-400/50 transition-all duration-500 h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-colors duration-500" />
                    <div className="text-6xl font-black text-slate-800/50 mb-6 group-hover:text-yellow-400/20 transition-colors">{item.step}</div>
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
                <p>
                  {t.storyP3Start}<strong className="text-emerald-400 font-semibold">{t.storyTeam}</strong>{t.storyP3End}
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

        {/* 6. CTA Final (MailerLite) */}
        <section id="cta-form" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/10 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {t.ctaTitle1} <br />
                  <span className="text-yellow-400 text-2xl md:text-3xl">{t.ctaTitle2}</span>
                </h2>
              </div>
              
              {/* MailerLite Embed Container */}
              <div className="w-full max-w-md mx-auto">
                <div id="mlb2-38730039" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-38730039">
                  <div className="ml-form-align-center">
                    <div className="ml-form-embedWrapper embedForm">
                      <div className="ml-form-embedContent">
                        <h4 className="text-xl font-bold mb-2 text-center">{t.formTitle}</h4>
                        <p className="text-sm text-center mb-6 text-slate-300">{t.formDesc}</p>
                      </div>
                      <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/797087/forms/114949175440639913/subscribe" data-code="38730039" method="post" target="_blank">
                        <div className="ml-form-formContent">
                          <div className="ml-form-fieldRow mb-4">
                            <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                              <input 
                                type="email" 
                                className="form-control" 
                                data-inputmask="" 
                                name="fields[email]" 
                                placeholder={t.formPlaceholder} 
                                autoComplete="email"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <input type="hidden" name="ml-submit" value="1" />
                        <div className="ml-form-embedSubmit">
                          <button type="submit" className="primary">
                            {t.btnAccess}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                
                {/* MailerLite Script */}
                <script dangerouslySetInnerHTML={{
                  __html: `
                    function ml_webform_success_38730039() {
                      var $ = ml_jQuery || jQuery;
                      $('.ml-subscribe-form-38730039 .row-success').show();
                      $('.ml-subscribe-form-38730039 .row-form').hide();
                    }
                  `
                }} />
                <script src="https://groot.mailerlite.com/js/w/webforms.min.js?v2d8fb22bb5b3677f161552cd9e774127" type="text/javascript" async></script>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800/50">
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
      <MainContent />
    </LanguageContext.Provider>
  );
}
