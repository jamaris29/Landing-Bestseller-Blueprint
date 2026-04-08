import React from 'react';
import { Map, BookOpen, Users, Globe, Moon, Download, Shield, Gift } from 'lucide-react';

export const MockupUI = () => {
  return (
    <div className="w-full h-full bg-white text-slate-900 overflow-hidden flex flex-col font-sans select-none">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-emerald-600 font-serif font-bold text-lg leading-tight">The Bestseller Blueprint</h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">By Bookish Alchemy AI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium border border-emerald-100">
            <Map className="w-4 h-4" />
            <span>Mapa</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
            <BookOpen className="w-4 h-4" />
            <span>Recursos</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
            <Users className="w-4 h-4" />
            <span>Talentos</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 ml-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">ES</span>
          </div>
          <Moon className="w-5 h-5 text-slate-400 ml-2" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Main Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100/50 rounded-3xl p-10 text-center shadow-sm">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-3">Tu Mapa de 10 Semanas</h2>
            <p className="text-slate-600 text-lg mb-8">Tu guía paso a paso para un lanzamiento que haga ruido</p>
            
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Formato: Digital
              </div>
              <span className="text-slate-400 text-sm underline decoration-slate-300 underline-offset-4">Cambiar</span>
            </div>

            <div className="max-w-md mx-auto mb-10">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-600">0 de 47 completadas</span>
                <span className="text-emerald-600">0%</span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-0 rounded-full"></div>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#006a61] text-white rounded-full font-medium hover:bg-emerald-800 transition-colors shadow-md shadow-emerald-900/10">
              <Download className="w-5 h-5" />
              Descargar Plan PDF
            </button>
          </div>

          {/* Bonus Card */}
          <div className="relative pl-12">
            {/* Timeline Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            
            {/* Timeline Node */}
            <div className="absolute left-0 top-6 w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center shadow-md shadow-violet-500/20 z-10 border-4 border-slate-50">
              <Gift className="w-4 h-4 text-white" />
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-white border border-violet-200 rounded-3xl p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500 text-white rounded-full text-xs font-bold mb-4">
                <Gift className="w-3 h-3" />
                BONO ESPECIAL
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-emerald-700 mb-2 flex items-center gap-2">
                <Gift className="w-6 h-6 text-red-500" />
                Bono Especial: El Escudo del Autor (Valorado en $29)
              </h3>
              
              <p className="text-slate-600 italic mb-6">
                ¿Vas a publicar con una editorial o en coedición? No lances a ciegas.
              </p>

              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006a61] text-white rounded-full font-medium hover:bg-emerald-800 transition-colors shadow-md shadow-emerald-900/10">
                <Shield className="w-4 h-4" />
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

            <div className="bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif font-bold text-[#006a61] flex items-center gap-2">
                  <span className="text-xl">⏳</span>
                  Semana 10: Los cimientos
                </h3>
                <span className="text-slate-400 text-sm hover:text-emerald-600 transition-colors cursor-pointer">Ver tareas →</span>
              </div>
              
              <p className="text-slate-600 italic mb-8">
                Esta semana es puramente estratégica. Antes de hacer ruido, hay que preparar la casa para recibir a las visitas.
              </p>

              <div className="w-full">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-400">0 de 6</span>
                  <span className="text-slate-400">0%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-0 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
