import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, ArrowRight, ShieldCheck, Zap, Anchor, Target, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// A. NAVBAR - "A Ilha Flutuante"
// -------------------------------------------------------------
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'glass-panel', targets: navRef.current },
        onToggle: (self) => {
          if(self.isActive) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(17, 17, 17, 0.6)', color: '#cfa667', borderColor: 'rgba(255, 255, 255, 0.1)', duration: 0.3 });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'transparent', color: '#f9f9f9', borderColor: 'transparent', duration: 0.3 });
          }
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl rounded-full transition-all duration-300 pointer-events-none">
      <div ref={navRef} className="px-6 py-4 rounded-full flex items-center justify-between pointer-events-auto border border-transparent">
        <div className="font-sans font-bold text-xl tracking-tight">ÂNCORA BUSINESS</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="hover:-translate-y-[1px] transition-transform">Soluções</a>
          <a href="#manifesto" className="hover:-translate-y-[1px] transition-transform">Manifesto</a>
          <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Método</a>
        </div>
        <a href="https://wa.me/554899232777" target="_blank" rel="noopener noreferrer" className="bg-accent text-dark px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform duration-300 overflow-hidden relative group">
          <span className="relative z-10 flex items-center gap-2">Aplicar Agora <ArrowRight size={16}/></span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </a>
      </div>
    </nav>
  );
};

// -------------------------------------------------------------
// B. HERO SECTION - "A Cena de Abertura"
// -------------------------------------------------------------
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.hero-btn', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-32 px-6 lg:px-20 bg-dark overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60 mix-blend-luminosity"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=3000&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="relative z-10 max-w-5xl w-full">
        <p className="hero-text text-accent font-mono text-sm mb-6 uppercase tracking-widest">Ricardo de Souza • Consultoria & Mentoria</p>
        <h1 className="hero-text text-5xl md:text-6xl lg:text-7xl font-bold font-sans leading-tight mb-2">
          Não é apenas gestão.
        </h1>
        <h1 className="hero-text text-6xl md:text-7xl lg:text-8xl text-drama text-accent -ml-2 mb-12 drop-shadow-2xl">
          É um ecossistema.
        </h1>
        <a href="#services" className="hero-btn inline-flex items-center gap-3 bg-white text-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-accent transition-colors duration-500 hover:scale-[1.03] active:scale-95">
          Conheça os Protocolos <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// C. FEATURES (Products)
// -------------------------------------------------------------
// Card 1: Diagnostic Shuffler (Afiliação Âncora Business)
const ShufflerCard = () => {
  const [cards, setCards] = useState([
    "Direção Estratégica",
    "Conexão de Negócios",
    "Alinhamento Business"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark rounded-[2.5rem] p-10 lg:p-12 border border-white/5 relative overflow-hidden group shadow-xl">
      <div className="absolute top-6 right-6 text-accent opacity-50"><Target size={24}/></div>
      <h3 className="font-bold text-2xl mb-2">Afiliação Âncora</h3>
      <p className="text-muted-foreground text-sm mb-8">Faça 10 anos de conexões em 12 meses.</p>
      
      <div className="relative h-40 w-full perspective-1000">
        {cards.map((text, i) => (
          <div 
            key={text}
            className="absolute top-0 left-0 w-full bg-background border border-white/10 p-4 rounded-xl flex items-center shadow-lg transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1)"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2,
              zIndex: 10 - i,
            }}
          >
            <span className="font-mono text-xs text-accent mr-3">0{i+1}</span>
            <span className="text-sm font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Card 2: Telemetry Typewriter (Mentoria 5A6M)
const TypewriterCard = () => {
  const fullText = "Saúde Pessoal. Saúde Profissional. Família. Finanças. Espiritual. Alinhamento concluído.";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setIndex(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div className="bg-dark rounded-[2.5rem] p-10 lg:p-12 border border-white/5 relative overflow-hidden group shadow-xl">
      <div className="absolute top-6 right-6 text-accent opacity-50"><Activity size={24}/></div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="font-mono text-xs tracking-widest uppercase text-green-500/80">Live Feed</span>
      </div>
      <h3 className="font-bold text-2xl mb-2">Mentoria 5A6M</h3>
      <p className="text-muted-foreground text-sm mb-6">Faça 5 anos em 6 meses. O Alinhamento Profundo.</p>
      
      <div className="bg-background/50 rounded-xl p-4 min-h-[100px] border border-white/5">
        <p className="font-mono text-sm text-primary/80 leading-relaxed">
          {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
        </p>
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler (Gestão Orgânica)
const SchedulerCard = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cursorRef = useRef(null);
  const gridRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Initial position
      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 });
      tl.to(cursorRef.current, { opacity: 1, duration: 0.3 });
      
      // Move to a cell
      tl.to(cursorRef.current, { x: 80, y: 40, duration: 0.8, ease: "power2.inOut" });
      
      // Click interaction
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.to('.target-cell', { backgroundColor: '#cfa667', color: '#111', duration: 0.2 }, "<");
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      
      // Move to save
      tl.to(cursorRef.current, { x: 180, y: 120, duration: 0.8, ease: "power2.inOut", delay: 0.5 });
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.to('.save-btn', { scale: 0.95, duration: 0.1 }, "<");
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      tl.to('.save-btn', { scale: 1, duration: 0.1 });
      
      // Reset
      tl.to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 });
      tl.set('.target-cell', { backgroundColor: 'transparent', color: 'inherit' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-dark rounded-[2.5rem] p-10 lg:p-12 border border-white/5 relative overflow-hidden group shadow-xl">
      <div className="absolute top-6 right-6 text-accent opacity-50"><ShieldCheck size={24}/></div>
      <h3 className="font-bold text-2xl mb-2">Gestão Orgânica</h3>
      <p className="text-muted-foreground text-sm mb-6">12 meses IN LOCO transformando sua empresa.</p>
      
      <div className="relative border border-white/10 rounded-xl p-4 bg-background/50 h-40">
        <div className="flex justify-between mb-4 pointer-events-none" ref={gridRef}>
          {days.map((d, i) => (
            <div key={i} className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono border border-white/5 ${i === 3 ? 'target-cell' : ''}`}>
              {d}
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-4 right-4 pointer-events-none">
          <div className="save-btn bg-white/10 px-4 py-1.5 rounded text-xs font-mono border border-white/10">INICIAR</div>
        </div>
        
        {/* Animated Cursor */}
        <div ref={cursorRef} className="absolute top-0 left-0 z-10 pointer-events-none drop-shadow-md text-white">
          <MousePointer2 size={24} fill="#fff" />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="services" className="py-40 px-6 lg:px-20 max-w-[90rem] mx-auto">
      <div className="mb-24">
        <h2 className="text-4xl md:text-6xl font-sans font-bold mb-8">Artefatos de <span className="text-drama text-accent font-normal capitalize">Evolução</span></h2>
        <p className="text-lg text-primary/70 max-w-xl leading-relaxed">Três ecossistemas distintos projetados para empresas, empresários e executivos atingirem o ápice da performance e gestão.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <ShufflerCard />
        <TypewriterCard />
        <SchedulerCard />
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// D. PHILOSOPHY
// -------------------------------------------------------------
const Philosophy = () => {
  const philRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: philRef.current,
          start: 'top 60%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, philRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={philRef} className="relative py-48 px-6 lg:px-20 bg-dark flex flex-col justify-center items-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=2000&auto=format&fit=crop")', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}></div>
      
      <div className="relative z-10 max-w-5xl mx-auto space-y-32 lg:space-y-40">
        <div>
          <p className="phil-line text-lg md:text-2xl text-primary/60 font-medium mb-6">A maioria da indústria foca em metodologias temporárias.</p>
          <h2 className="phil-line text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">Nós focamos na <span className="text-drama text-accent block mt-4 font-normal">Raiz da Cultura.</span></h2>
        </div>
        
        <div>
          <p className="phil-line text-lg md:text-2xl text-primary/60 font-medium mb-6">A maioria aplica fórmulas prontas nas empresas.</p>
          <h2 className="phil-line text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">Nós criamos um <span className="text-drama text-accent block mt-4 font-normal">Ecossistema Exclusivo.</span></h2>
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// E. PROTOCOL (Sticky Stacking)
// -------------------------------------------------------------
const Protocol = () => {
  return (
    <section id="protocol" className="py-40 max-w-[90rem] mx-auto w-full px-6 lg:px-20">
      <div className="mb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold">O <span className="text-drama text-accent font-normal">Método</span></h2>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="protocol-card min-h-[60vh] lg:min-h-[50vh] w-full bg-dark rounded-[3rem] border border-white/10 p-10 lg:p-16 flex flex-col md:flex-row items-center gap-16 lg:gap-24 shadow-2xl relative overflow-hidden mb-12 sticky top-32 z-10">
          <div className="absolute right-0 top-0 opacity-10 w-96 h-96 animate-spin-slow pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full"><path fill="none" stroke="#cfa667" strokeWidth="1" d="M50 0 A50 50 0 1 1 49.9 0" strokeDasharray="5 5"/></svg>
          </div>
          <div className="flex-1 z-10">
            <span className="font-mono text-accent text-3xl block mb-6">01</span>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Diagnóstico Âncora</h3>
            <p className="text-xl text-primary/70 mb-4">Imersão completa no cenário atual da empresa, avaliando as 5 saúdes da liderança e a estrutura organizacional.</p>
            <p className="text-lg text-primary/50">Mapeamento preciso antes de qualquer intervenção.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="protocol-card min-h-[60vh] lg:min-h-[50vh] w-full bg-dark rounded-[3rem] border border-white/10 p-10 lg:p-16 flex flex-col md:flex-row items-center gap-16 lg:gap-24 shadow-2xl relative overflow-hidden mb-12 sticky top-40 z-20">
          <div className="absolute left-0 bottom-0 opacity-10 w-full h-32 pointer-events-none flex items-center justify-center">
             <div className="w-full h-[1px] bg-accent relative"><div className="absolute top-0 left-0 w-32 h-full bg-white shadow-[0_0_20px_#fff] blur-[2px] animate-scan"></div></div>
          </div>
          <div className="flex-1 z-10">
            <span className="font-mono text-accent text-3xl block mb-6">02</span>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Alinhamento & Plano de 7 Anos</h3>
            <p className="text-xl text-primary/70 mb-4">Estabelecimento de um horizonte focado na padronização de processos, liderança sólida e conexões estratégicas.</p>
            <p className="text-lg text-primary/50">Construindo o terreno para uma gestão inabalável.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="protocol-card min-h-[60vh] lg:min-h-[50vh] w-full bg-[#161616] rounded-[3rem] border border-accent/20 p-10 lg:p-16 flex flex-col md:flex-row items-center gap-16 lg:gap-24 shadow-2xl relative sticky top-48 z-30">
          <div className="flex-1 z-10">
            <span className="font-mono text-accent text-3xl block mb-6">03</span>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Implementação IN LOCO</h3>
            <p className="text-xl text-primary/70 mb-4">Acompanhamento ativo por 6 a 12 meses. Suporte online, sessões em grupo, jantares e mentorias individuais com a família diretora.</p>
            <p className="text-lg text-primary/50">Consolidação definitiva do ecossistema da prosperidade.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// F. PRICING / MEMBERSHIP
// -------------------------------------------------------------
const Pricing = () => {
  return (
    <section id="apply" className="py-40 px-6 lg:px-20 max-w-[90rem] mx-auto">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-sans font-bold mb-8">Escolha sua <span className="text-drama text-accent font-normal capitalize">Jornada</span></h2>
        <p className="text-lg text-primary/70 leading-relaxed">Invista no alinhamento profundo da sua liderança e empresa. Nossos programas exigem dedicação absoluta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-center">
        {/* Tier 1 */}
        <div className="bg-dark rounded-[2.5rem] p-10 lg:p-12 border border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-500">
          <h3 className="text-2xl font-bold mb-2">Afiliação Âncora</h3>
          <p className="text-muted-foreground text-sm h-12">O primeiro passo na Mesa do Rei.</p>
          <div className="my-8">
            <span className="text-4xl font-bold">R$2.5k</span>
            <span className="text-primary/50">/ano + R$250/mês</span>
          </div>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> 1 Sessão Individual</li>
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> 12 Sessões em Grupo</li>
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> 1 Jantar e 1 Coffee Time</li>
          </ul>
          <a href="https://wa.me/554899232777?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20aplica%C3%A7%C3%A3o%20para%20a%20Afilia%C3%A7%C3%A3o%20%C3%82ncora." target="_blank" rel="noopener noreferrer" className="block text-center w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold">Solicitar Aplicação</a>
        </div>

        {/* Tier 2 (Highlighted) */}
        <div className="bg-gradient-to-b from-dark to-[#1a140f] rounded-[3rem] p-12 lg:p-16 border border-accent/30 shadow-2xl transform scale-105 relative z-10">
          <div className="absolute border bg-accent text-dark border-accent top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Recomendado</div>
          <h3 className="text-2xl font-bold mb-2">Mentoria 5A6M</h3>
          <p className="text-accent/80 text-sm h-12">Seja um Ímã. 5 anos em 6 meses.</p>
          <div className="my-8">
            <span className="text-4xl font-bold">R$15k</span>
            <span className="text-primary/50 block mt-1 text-sm">Investimento total</span>
          </div>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> 6 Sessões Individuais</li>
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> 6 Sessões em Grupo & Feedbacks</li>
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> 1 Evento de Imersão Presencial</li>
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> Alinhamento das 5 Saúdes</li>
          </ul>
          <a href="https://wa.me/554899232777?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20aplica%C3%A7%C3%A3o%20para%20a%20Mentoria%205A6M." target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-accent text-dark py-4 rounded-xl font-bold hover:bg-white transition-colors hover:scale-[1.02] active:scale-95 duration-300">Solicitar Aplicação</a>
        </div>

        {/* Tier 3 */}
        <div className="bg-dark rounded-[2.5rem] p-10 lg:p-12 border border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-500">
          <h3 className="text-2xl font-bold mb-2">Gestão Orgânica</h3>
          <p className="text-muted-foreground text-sm h-12">Ecossistema da Prosperidade.</p>
          <div className="my-8">
             <span className="text-4xl font-bold">R$240k</span>
             <span className="text-primary/50 block mt-1 text-sm">Investimento total (12 meses)</span>
          </div>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> Implantação 100% IN LOCO</li>
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> Mentoria de Alta Performance</li>
            <li className="flex items-start gap-3"><Anchor size={18} className="text-accent shrink-0"/> Planejamento para 7 Anos</li>
          </ul>
          <a href="https://wa.me/554899232777?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20consultor%20sobre%20a%20Gesta%C3%A3o%20Org%C3%A2nica." target="_blank" rel="noopener noreferrer" className="block text-center w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold">Falar com o Consultor</a>
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// G. FOOTER
// -------------------------------------------------------------
const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-16 px-6 lg:px-20 mt-32 relative">
      {/* Curved top overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-background [clip-path:ellipse(100%_100%_at_50%_0%)] -mt-[1px]"></div>
      
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24 border-b border-white/10 pb-20 relative z-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold font-sans mb-4">ÂNCORA BUSINESS</h2>
          <p className="text-primary/50 max-w-sm mb-8">Consultoria e mentoria estratégica liderada por Ricardo de Souza. Criando ecossistemas de prosperidade e conectando líderes globais.</p>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60">Sistema Operacional</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Jornadas</h4>
          <ul className="space-y-4 text-sm text-primary/60">
            <li><a href="#" className="hover:text-accent transition-colors">Afiliação Âncora</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Mentoria 5A6M</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Gestão Orgânica</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Políticas</h4>
          <ul className="space-y-4 text-sm text-primary/60">
            <li><a href="#" className="hover:text-accent transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Privacidade</a></li>
            <li><a href="https://wa.me/554899232777" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Contato</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-primary/40">
        <p>&copy; {new Date().getFullYear()} Ancora Business. Todos os direitos reservados.</p>
        <p className="mt-4 md:mt-0 font-mono">Desenvolvido com excelência.</p>
      </div>
    </footer>
  );
};


function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
