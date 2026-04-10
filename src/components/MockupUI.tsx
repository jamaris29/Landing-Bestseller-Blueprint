import React from 'react';
import { Map, BookOpen, Users, Globe, Moon, Download, Shield, Gift } from 'lucide-react';

export const MockupUI = () => {
  return (
    <div className="w-full h-full bg-white text-[#2D2D2D] overflow-hidden flex flex-col font-sans select-none">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e293b] rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[#006a61] font-serif font-bold text-lg leading-tight">The Bestseller Blueprint</h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">BY BOOKISH ALCHEMY AI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#e6f7f5] text-[#006a61] rounded-full text-sm font-bold border border-[#006a61]/20">
            <Map className="w-4 h-4" />
            <span>Mapa</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 text-slate-600 rounded-full text-sm font-bold border border-slate-200">
            <BookOpen className="w-4 h-4" />
            <span>Recursos</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 text-slate-600 rounded-full text-sm font-bold border border-slate-200">
            <Users className="w-4 h-4" />
            <span>Talentos</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 ml-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-bold">ES</span>
          </div>
          <Moon className="w-5 h-5 text-slate-400 ml-2" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Main Card */}
          <div className="bg-gradient-to-b from-[#e6f7f5] to-[#f0fdfa] border border-[#006a61]/10 rounded-[2rem] p-12 text-center shadow-sm">
            <h2 className="text-4xl font-serif font-bold text-[#0f172a] mb-4">Tu Mapa de 10 Semanas</h2>
            <p className="text-slate-600 text-lg mb-8 font-sans">Tu guía paso a paso para un lanzamiento que haga ruido</p>
            
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="px-4 py-1.5 bg-[#d1fae5] text-[#006a61] rounded-full text-sm font-bold font-sans">
                Formato: Digital
              </div>
              <span className="text-slate-400 text-sm underline decoration-slate-300 underline-offset-4 font-sans cursor-pointer">Cambiar</span>
            </div>

            <div className="max-w-lg mx-auto mb-10">
              <div className="flex justify-between text-sm font-bold mb-3 font-sans">
                <span className="text-slate-500">0 de 47 completadas</span>
                <span className="text-[#006a61]">0%</span>
              </div>
              <div className="h-2.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                <div className="h-full bg-[#006a61] w-0 rounded-full"></div>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#006a61] text-white rounded-full font-bold hover:bg-[#008a7d] transition-colors shadow-sm font-sans">
              <Download className="w-5 h-5" />
              Descargar Plan PDF
            </button>
          </div>

          {/* Bonus Card */}
          <div className="relative pl-12">
            {/* Timeline Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            
            {/* Timeline Node */}
            <div className="absolute left-0 top-6 w-10 h-10 bg-[#7c3aed] rounded-full flex items-center justify-center shadow-sm z-10 border-4 border-white">
              <Gift className="w-4 h-4 text-yellow-400" />
            </div>

            <div className="bg-gradient-to-b from-[#f5f3ff] to-white border border-[#7c3aed]/20 rounded-3xl p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8b5cf6] text-white rounded-full text-xs font-bold mb-4 font-sans">
                <Gift className="w-3 h-3 text-yellow-400" />
                BONO ESPECIAL
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-[#006a61] mb-2 flex items-center gap-2">
                <Gift className="w-6 h-6 text-red-500" />
                Bono Especial: El Escudo del Autor (Valorado en $29)
              </h3>
              
              <p className="text-slate-600 italic mb-6 font-serif">
                ¿Vas a publicar con una editorial o en coedición? No lances a ciegas.
              </p>

              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#006a61] text-white rounded-full font-bold hover:bg-[#008a7d] transition-colors shadow-sm font-sans">
                <Shield className="w-4 h-4 text-blue-300" />
                Abrir El Escudo del Autor
              </button>
            </div>
          </div>

          {/* Week 10 Card */}
          <div className="relative pl-12">
            {/* Timeline Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            
            {/* Timeline Node */}
            <div className="absolute left-0 top-6 w-10 h-10 bg-white border-2 border-[#006a61] rounded-full flex items-center justify-center shadow-sm z-10">
              <span className="text-[#006a61] font-bold text-sm">10</span>
            </div>

            <div className="bg-gradient-to-b from-[#e6f7f5] to-white border border-[#006a61]/10 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif font-bold text-[#006a61] flex items-center gap-2">
                  <span className="text-xl">⏳</span>
                  Semana 10: Los cimientos
                </h3>
                <span className="text-slate-400 text-sm hover:text-[#006a61] transition-colors cursor-pointer font-sans">Ver tareas →</span>
              </div>
              
              <p className="text-slate-600 italic mb-8 font-serif">
                Esta semana es puramente estratégica. Antes de hacer ruido, hay que preparar la casa para recibir a las visitas.
              </p>

              <div className="w-full">
                <div className="flex justify-between text-sm font-bold mb-3 font-sans">
                  <span className="text-slate-400">0 de 6</span>
                  <span className="text-slate-400">0%</span>
                </div>
                <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006a61] w-0 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
