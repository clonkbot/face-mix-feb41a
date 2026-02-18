import { useState, useRef, useCallback } from 'react';
import FaceCanvas from './components/FaceCanvas';
import { generateRandomFace, FaceData } from './components/faceData';

function App() {
  const [face, setFace] = useState<FaceData>(generateRandomFace());
  const [isRemixing, setIsRemixing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleRemix = useCallback(() => {
    setIsRemixing(true);
    setTimeout(() => {
      setFace(generateRandomFace());
      setIsRemixing(false);
    }, 300);
  }, []);

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return;

    const svg = canvasRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 800;
    canvas.height = 800;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#FAF6F0';
        ctx.fillRect(0, 0, 800, 800);
        ctx.drawImage(img, 0, 0, 800, 800);

        const link = document.createElement('a');
        link.download = `face-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0] relative overflow-hidden flex flex-col">
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative shapes */}
      <div className="fixed top-10 left-10 w-20 h-20 md:w-32 md:h-32 bg-[#FFE66D] rounded-full opacity-60 blur-sm" />
      <div className="fixed bottom-20 right-10 w-24 h-24 md:w-40 md:h-40 bg-[#FF6B6B] opacity-40 blur-sm" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
      <div className="fixed top-1/3 right-5 w-16 h-16 md:w-24 md:h-24 bg-[#4ECDC4] opacity-50 blur-sm" />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-12">
        {/* Header */}
        <header className="text-center mb-6 md:mb-10">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A1A2E] tracking-tight mb-2 md:mb-3">
            Face<span className="text-[#FF6B6B]">Mix</span>
          </h1>
          <p className="font-body text-sm md:text-lg text-[#1A1A2E]/60 max-w-md mx-auto">
            Infinite generative portraits. Remix &amp; export your unique creation.
          </p>
        </header>

        {/* Face Canvas */}
        <div
          ref={canvasRef}
          className={`relative transition-all duration-300 ${isRemixing ? 'scale-95 opacity-0 rotate-3' : 'scale-100 opacity-100 rotate-0'}`}
        >
          <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-white rounded-3xl shadow-2xl p-4 md:p-6 border-4 border-[#1A1A2E]">
            <FaceCanvas face={face} />
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-4 h-4 md:w-6 md:h-6 bg-[#FFE66D] rounded-full border-2 border-[#1A1A2E]" />
          <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-4 h-4 md:w-6 md:h-6 bg-[#4ECDC4] rounded-full border-2 border-[#1A1A2E]" />
          <div className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3 w-4 h-4 md:w-6 md:h-6 bg-[#FF6B6B] rounded-full border-2 border-[#1A1A2E]" />
          <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-4 h-4 md:w-6 md:h-6 bg-[#C44CFF] rounded-full border-2 border-[#1A1A2E]" />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-10">
          <button
            onClick={handleRemix}
            disabled={isRemixing}
            className="group relative px-8 md:px-12 py-4 md:py-5 bg-[#FF6B6B] text-white font-display font-bold text-lg md:text-xl rounded-2xl border-4 border-[#1A1A2E] shadow-[6px_6px_0px_#1A1A2E] hover:shadow-[2px_2px_0px_#1A1A2E] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 disabled:opacity-50 min-w-[160px]"
          >
            <span className="flex items-center justify-center gap-2 md:gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              REMIX
            </span>
          </button>

          <button
            onClick={handleExport}
            className="px-8 md:px-12 py-4 md:py-5 bg-[#1A1A2E] text-white font-display font-bold text-lg md:text-xl rounded-2xl border-4 border-[#1A1A2E] shadow-[6px_6px_0px_#4ECDC4] hover:shadow-[2px_2px_0px_#4ECDC4] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 min-w-[160px]"
          >
            <span className="flex items-center justify-center gap-2 md:gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              EXPORT
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-8 font-body text-xs md:text-sm text-[#1A1A2E]/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-[#FFE66D] rounded-full" />
            <span>5 Head Shapes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-[#FF6B6B] rounded-full" />
            <span>6 Eye Styles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-[#4ECDC4] rounded-full" />
            <span>5 Mouth Types</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-[#C44CFF] rounded-full" />
            <span>6 Hairstyles</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center">
        <p className="font-body text-xs text-[#1A1A2E]/40">
          Requested by <span className="font-medium">@ChrisPirillo</span> · Built by <span className="font-medium">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
