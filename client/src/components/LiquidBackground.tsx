export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Static gradient orbs - no animations for performance */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] bg-accent/15 rounded-full blur-[80px] animate-pulse-slow"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
}
