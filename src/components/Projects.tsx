import { ArrowUpRight } from "lucide-react";

const projects = [
  { id: 1, title: "LinkedIn", category: "know about me", desc: "A headless storefront with fluid transitions." },
  { id: 2, title: "Experience", category: "Software developer Intern ", desc: "Working as Intern at IBM" },
  { id: 3, title: "GitHub", category: "Codebase", desc: "Generative tools wrapped in a minimal, intuitive repo" },
  { id: 4, title: "Prism", category: "Fintech", desc: "Modern banking dashboard with dark mode aesthetics." }
];

export default function Projects() {
  return (
    <div className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32 flex flex-col items-center bg-[#121212]">
      <div className="max-w-7xl w-full">
        <h3 className="text-4xl md:text-6xl font-medium mb-20 text-white tracking-tight">
          Selected Works
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((p) => (
            <div 
              key={p.id}
              className="group relative flex flex-col justify-end p-8 md:p-12 aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 cursor-pointer shadow-2xl shadow-black/50"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono tracking-widest uppercase text-neutral-400">
                    {p.category}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-500">
                    <ArrowUpRight size={24} strokeWidth={2} />
                  </div>
                </div>
                <h4 className="text-4xl font-semibold text-white tracking-tight">
                  {p.title}
                </h4>
                <p className="text-neutral-300 mt-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
