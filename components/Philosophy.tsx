import React from 'react';
import { Target, Users, Cpu, ArrowRight } from 'lucide-react';

const Philosophy: React.FC = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
       {/* Decorative background line */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-verdant-accent/20 to-transparent"></div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               {/* Abstract visual element */}
               <div className="absolute -left-20 -top-20 w-[400px] h-[400px] bg-verdant-900/10 rounded-full blur-[100px] pointer-events-none"></div>
               
               <h2 className="relative z-10 text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Philosophy</h2>
               <h3 className="relative z-10 text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-[1.1]">
                 Design with Intent. <br/>
                 <span className="text-gray-600">Strategy that Scales.</span>
               </h3>
               <p className="relative z-10 text-lg text-gray-400 leading-relaxed max-w-lg mb-8">
                 We believe you shouldn't have to choose between a beautiful brand and a high-performing business. We blend aesthetic excellence with rigorous technical strategy to build digital products that build trust and drive growth.
               </p>
               <a href="#contact" className="relative z-10 inline-flex items-center gap-2 text-white border-b border-verdant-accent pb-1 hover:text-verdant-accent transition-colors">
                  Start a conversation <ArrowRight size={16} />
               </a>
            </div>

            <div className="space-y-12">
                {[
                  {
                    title: "Strategic Design",
                    desc: "Every pixel serves a purpose. We move beyond vanity metrics to design user experiences that guide, inform, and convert your ideal customers.",
                    icon: Target
                  },
                  {
                    title: "Technical Excellence",
                    desc: "A pretty interface is useless if it's slow. We engineer robust, scalable platforms using modern tech stacks (React, Node, Shopify) that stand the test of time.",
                    icon: Cpu
                  },
                  {
                    title: "True Partnership",
                    desc: "We operate as an extension of your team. No black boxes or confusing jargon—just clear communication, full ownership, and shared goals.",
                    icon: Users
                  }
                ].map((item, i) => (
                   <div key={i} className="flex gap-8 group">
                      <div className="w-14 h-14 rounded-2xl border border-white/10 bg-zinc-900/50 flex items-center justify-center shrink-0 group-hover:border-verdant-accent group-hover:bg-verdant-accent/10 transition-all duration-500">
                        <item.icon className="w-6 h-6 text-gray-400 group-hover:text-verdant-accent transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-white font-display font-bold text-2xl mb-3 group-hover:text-verdant-accent transition-colors">{item.title}</h4>
                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                ))}
            </div>
         </div>
       </div>
    </section>
  )
}
export default Philosophy;