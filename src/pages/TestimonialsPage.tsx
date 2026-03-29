import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowLeft, BookOpen, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

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

const allTestimonials = [
  {
    name: "Autora Gaby Bonalde",
    handle: "@gabybonaldescritora",
    link: "https://www.instagram.com/gabybonaldescritora/",
    text: "Antes de usar la app, me agobiaba no tener un orden, no saber qué pasos dar para llegar a los lectores, ni cómo crear un equipo ARC. Esta herramienta me dejó muchas cosas en perspectiva que ni siquiera había tomado en cuenta a la hora de publicar; por ejemplo, el consejo de pedir las copias de autor con antelación me cayó como anillo al dedo. Me sorprendió lo intuitiva y organizada que está, te da una estructura que no habías pensado y hace ver el lanzamiento como algo ‘posible’ en poco tiempo. Además, como la web es interactiva, te hace sentir que te está celebrando el logro de cada semana. Totalmente la recomendaría, es una base increíble y yo sin duda la compraría.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Autora Paula Valenzuela",
    handle: "@paula.valenzuela.d",
    link: "https://www.instagram.com/paula.valenzuela.d/",
    text: "Es un esquema muy ordenado y evita que te olvides de cosas realmente importantes. Por ejemplo, a mi editorial se le olvidó imprimir los marcapáginas, tuve que hacer unos yo a la rápida y mandar a imprimirlos a un costo mayor del que debía por la urgencia. Definitivamente lo recomiendo, sobre todo si es para lanzar el primer libro, porque uno no se imagina todo el trabajo que conlleva y es bueno que alguien te lo explique claramente y en orden. Incluso en el formato de coedición, si bien hay editoriales que ayudan mucho con la publicidad, eso suele no ser suficiente, por lo que es súper importante saber qué cosas son exigibles sobre la marcha.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "Autora A. Entre Letras",
    handle: "@a_entre_letras",
    link: "https://www.instagram.com/a_entre_letras/",
    text: "En mi caso, lo que más me agobió fue el manejo de las redes; no tener un plan de cuándo revelar la portada o la sinopsis limitó el alcance de mis publicaciones y afectó a mi libro. Todos en este oficio sabemos que la autopublicación suele ser un proceso complejo en el que perdemos oportunidades por no tener claros los pasos, pero tener una estrategia que te oriente desde el minuto cero es un apoyo invaluable. The Bestseller Blueprint es una herramienta que te ayuda a ir de la mano del proceso y no luchando contra él. Me encanta que es sencilla de usar, los pasos están bien diseñados y puedes ir marcándolos a medida que avanzas. Se nota el amor que le ha puesto y que no lo hace una simple aficionada. Además, el precio está muy bien porque te da la garantía de usar la herramienta de por vida. Sí la recomendaría a ojos cerrados; con esta guía, muchos escritores se verán beneficiados y evitarán que su lanzamiento se convierta en un agobio.",
    image: "https://via.placeholder.com/150"
  },
  // We can add more placeholder testimonials here to demonstrate the masonry layout
  {
    name: "Autor Carlos Ruiz",
    handle: "@carlosruiz_autor",
    link: "https://www.instagram.com/",
    text: "El diseño es precioso y la funcionalidad es impecable. Me encanta cómo te va guiando paso a paso. Es como tener un editor y un experto en marketing a tu lado 24/7.",
    image: "https://via.placeholder.com/150"
  }
];

export const TestimonialsPage = () => {
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Floating Navbar with Glassmorphism */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-md border-b border-emerald-500/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-violet-500/20 border border-emerald-500/30 overflow-hidden">
              <img src="./logo.png" alt="Logo" className="absolute inset-0 w-full h-full object-contain p-1 z-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <BookOpen className="w-5 h-5 text-emerald-400 absolute" />
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight hidden sm:block">The Bestseller Blueprint</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300 hover:text-emerald-400"
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-xs font-bold uppercase">{lang}</span>
            </button>
            <Link
              to="/"
              className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 rounded-lg hover:shadow-[0_0_15px_rgba(80,200,120,0.5)] transition-all hover:scale-105"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-yellow-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                El impacto de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                  The Bestseller Blueprint
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Descubre cómo nuestra plataforma está ayudando a autores a lanzar sus libros con éxito y sin estrés.
              </p>
            </FadeIn>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {allTestimonials.map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.1} className="break-inside-avoid">
                <div className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col hover:shadow-[0_0_30px_rgba(80,200,120,0.1)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                      <a 
                        href={testimonial.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                      >
                        {testimonial.handle}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-slate-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="mt-16 text-center">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 text-slate-950 bg-emerald-400 font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(80,200,120,0.4)] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a la página principal
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
