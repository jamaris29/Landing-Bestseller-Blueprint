import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const testimonials = [
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
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-white/50 border-t border-slate-200/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-[#2D2D2D]">
              Historias de <span className="text-[#006a61]">Éxito</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-sans">
              Lo que dicen los autores que ya están usando The Bestseller Blueprint.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <div className="group h-full p-8 rounded-3xl bg-white/80 backdrop-blur border border-slate-200 hover:border-[#006a61]/50 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <h4 className="font-bold text-[#2D2D2D] text-lg font-serif">{testimonial.name}</h4>
                    <a 
                      href={testimonial.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#006a61] hover:text-[#008a7d] text-sm transition-colors font-sans"
                    >
                      {testimonial.handle}
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed flex-1 italic font-serif">
                  "{testimonial.text}"
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.6} className="text-center">
          <Link 
            to="/historias"
            className="inline-flex items-center gap-2 px-6 py-3 text-[#006a61] font-semibold hover:text-[#008a7d] transition-colors border border-[#006a61]/30 hover:border-[#006a61] rounded-full hover:bg-[#006a61]/5 font-sans"
          >
            Leer más historias de éxito →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};
