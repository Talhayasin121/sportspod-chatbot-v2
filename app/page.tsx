import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg" />
            <span className="font-bold text-xl tracking-tight">THE SPORTS POD</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-gray-500 transition-colors">Services</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Team</a>
            <a href="#" className="hover:text-gray-500 transition-colors">About</a>
            <a href="#" className="bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter mb-8">
              Sports Rehab <br />
              <span className="text-gray-400">Redefined.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              We bridge the gap between rehab and performance. Our multi-disciplinary team helps you recover, perform, and thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                Book Your Assessment
              </button>
              <button className="bg-white text-black border-2 border-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
                Our Services
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12">
            <div>
              <p className="text-4xl font-bold mb-2">10k+</p>
              <p className="text-gray-500 text-sm">Athletes Treated</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">15+</p>
              <p className="text-gray-500 text-sm">Pro Sports Teams</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-gray-500 text-sm">Evidence Based</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">Dallas</p>
              <p className="text-gray-500 text-sm">Flagship Location</p>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Widget Component */}
      <ChatWidget />
    </div>
  );
}
