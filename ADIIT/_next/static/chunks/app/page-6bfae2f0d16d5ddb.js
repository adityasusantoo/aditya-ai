'use client';

import { useState, useRef } from 'react';

export default function Home() {
  // Kawalan keadaan (State) bagi setiap input
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [engineModel, setEngineModel] = useState('kling-2.6-std');
  const [cfgScale, setCfgScale] = useState(0.85);
  
  // Kawalan bagi fail yang dimuat naik
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  
  // Kawalan status pemprosesan (Loading & Result)
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState('Initialize Generation Pipeline');
  const [result, setResult] = useState({ visible: false, videoUrl: '', taskId: '' });

  // Reference untuk input fail tersembunyi
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Fungsi mengendalikan perubahan slider CFG
  const handleCfgChange = (e) => {
    setCfgScale(parseFloat(e.target.value));
  };

  // Fungsi mengendalikan muat naik gambar
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Fungsi mengendalikan muat naik video
  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  // Fungsi utama untuk Generate Video via API Proxy
  const handleGenerate = async () => {
    if (!apiKey) {
      alert('Sila masukkan API Key anda terlebih dahulu!');
      return;
    }
    if (!prompt) {
      alert('Sila masukkan Custom Prompt!');
      return;
    }

    setIsLoading(true);
    setBtnText('Processing Pipeline...');
    setResult((prev) => ({ ...prev, visible: false }));

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('model', engineModel);
      formData.append('cfg_scale', cfgScale);
      if (imageFile) formData.append('image', imageFile);
      if (videoFile) formData.append('video', videoFile);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'x-user-api-key': apiKey,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan pada API');
      }

      const url = data.video_url || data.url;
      if (url) {
        setResult({ visible: true, videoUrl: url, taskId: '' });
      } else {
        setResult({ visible: true, videoUrl: '', taskId: data.id || data.task_id || 'N/A' });
      }
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Ralat berlaku semasa penjanaan: ' + error.message);
    } finally {
      setIsLoading(false);
      setBtnText('Initialize Generation Pipeline');
    }
  };

  return (
    <div className="relative min-h-screen text-[#EAF4FF] overflow-x-hidden" style={{ backgroundColor: '#071426' }}>
      {/* Background Mesh Effect */}
      <div 
        className="fixed inset-0 -z-10 w-full h-full"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(56, 189, 248, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(11, 30, 53, 1) 0px, transparent 100%)
          `
        }}
      />

      {/* Floating Navbar */}
      <nav className="sticky top-6 z-50 mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between border border-white/5 bg-[#0B1E35]/40 backdrop-blur-xl px-6 py-3 rounded-[24px] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#38BDF8] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tighter text-[#EAF4FF]">ADITYA .AI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-[#93A4C3]">
            <a href="https://www.magnific.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition-all">AMBIL KEY MAGNIFIC</a>
          </div>
          <a href="https://www.facebook.com/Aditya.su.ll/" target="_blank" rel="noopener noreferrer">
            <button className="px-5 py-2 text-sm uppercase tracking-wider font-bold rounded-xl text-white bg-gradient-to-br from-[#3B82F6] to-[#38BDF8] shadow-lg hover:scale-102 transition-all">
              Connect
            </button> 
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[#38BDF8] text-xs font-bold tracking-widest uppercase">
              ✨ MOTION CONTROL GRATIS TIDAK DI PERJUAL BELIKAN ✨
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Future of <span className="bg-gradient-to-r from-[#EAF4FF] to-[#38BDF8] bg-clip-text text-transparent">Motion</span> Control.
            </h1>
            <p className="text-lg text-[#93A4C3] leading-relaxed max-w-md">
              Alat produksi video AI premium untuk content creator dan affiliate cepat, presisi, estetis, dan siap meningkatkan performa konten Anda.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#Mulai-Create" className="px-8 py-4 text-base inline-block text-center font-bold rounded-xl text-white bg-gradient-to-br from-[#3B82F6] to-[#38BDF8] shadow-lg hover:scale-102 transition-all cursor-pointer">
                Mulai Create
              </a>
              <a href="https://www.tiktok.com/@vivi.ajadeh/video/7640016275057528071" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-all cursor-pointer">
                  View Demo
                </button>
              </a>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] rounded-3xl blur opacity-90 group-hover:opacity-100 transition-all duration-3xl"></div>
            <div className="relative border border-white/10 bg-black/40 backdrop-blur-xl rounded-[24px] aspect-video overflow-hidden">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Nzh3MXRuZzl5bmZzcmYyZmt4aGoybnpicHB0eXk5aWhoNm5nOHZ0cCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/YCpFxyaXQHfC9KpwKq/giphy.gif" 
                className="w-full h-full object-cover opacity-80" 
                alt="Hero Visualization" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 p-4 border border-white/5 bg-black/40 backdrop-blur-xl rounded-[24px]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span class="text-xs font-bold tracking-widest">ADITYA KLING AI GRATIS</span>
                </div>
              </div> 
            </div>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div id="Mulai-Create" className="flex flex-col lg:flex-row gap-8 pt-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-64 space-y-2">
            <div className="border border-white/5 bg-[rgba(15,35,60,0.72)] backdrop-blur-xl p-3 rounded-[24px]">
              <div className="text-[10px] font-bold text-[#93A4C3] uppercase tracking-[0.2em] px-3 mb-3">Main Console</div>
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 text-[#38BDF8] border border-blue-500/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M11 4H4v14a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <span className="font-semibold text-sm">Motion Control</span>
              </a>
            </div>
          </div>

          {/* Generator Panels */}
          <div className="flex-1 space-y-8">
            {/* API KEY SECTION */}
            <div className="border border-white/5 bg-[rgba(15,35,60,0.72)] backdrop-blur-xl p-6 rounded-[24px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#93A4C3]">Auth Terminal</h3>
                <span className="text-[10px] text-green-400 font-mono">ENCRYPTED</span>
              </div>
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="ENTER MAGNIFIC / FREEPIK API KEY..." 
                className="w-full bg-[#071426] border border-white/5 rounded-xl px-4 py-4 text-sm font-mono text-[#38BDF8] focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#2a3c54]"
              />
            </div>

            {/* UPLOAD SECTION */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Image Input */}
              <div>
                <input 
                  type="file" 
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  className="hidden" 
                  accept="image/png, image/jpeg"
                />
                <div 
                  onClick={() => imageInputRef.current.click()}
                  className={`block border-dashed border-2 p-6 group cursor-pointer rounded-[24px] backdrop-blur-xl transition-all ${imageFile ? 'border-green-500/50 bg-[rgba(15,35,60,0.72)]' : 'border-white/5 bg-[rgba(15,35,60,0.72)] hover:border-[#38BDF8]/40'}`}
                >
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-bold ${imageFile ? 'text-green-400' : ''}`}>
                        {imageFile ? imageFile.name : 'Reference Image'}
                      </p>
                      <p className="text-xs text-[#93A4C3] mt-1">PNG, JPG up to 15MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Input */}
              <div>
                <input 
                  type="file" 
                  ref={videoInputRef}
                  onChange={handleVideoChange}
                  className="hidden" 
                  accept="video/mp4, video/quicktime"
                />
                <div 
                  onClick={() => videoInputRef.current.click()}
                  className={`block border-dashed border-2 p-6 group cursor-pointer rounded-[24px] backdrop-blur-xl transition-all ${videoFile ? 'border-green-500/50 bg-[rgba(15,35,60,0.72)]' : 'border-white/5 bg-[rgba(15,35,60,0.72)] hover:border-[#38BDF8]/40'}`}
                >
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-bold ${videoFile ? 'text-green-400' : ''}`}>
                        {videoFile ? videoFile.name : 'Reference Video'}
                      </p>
                      <p className="text-xs text-[#93A4C3] mt-1">MP4, MOV up to 100MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONFIG SECTION */}
            <div className="border border-white/5 bg-[rgba(15,35,60,0.72)] backdrop-blur-xl p-8 space-y-8 rounded-[24px]">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#93A4C3]">Engine Model</label>
                  <select 
                    value={engineModel}
                    onChange={(e) => setEngineModel(e.target.value)}
                    className="w-full bg-[#071426] border border-white/5 rounded-xl px-4 py-3 text-sm text-[#EAF4FF] outline-none cursor-pointer"
                  >
                    <option value="kling-2.6-std">Kling 2.6 (Standard)</option>
                    <option value="kling-2.6-pro">Kling 2.6 (Pro)</option>
                    <option value="kling-3.0-std">Kling 3.0 (Standard)</option>
                    <option value="kling-3.0-pro">Kling 3.0 (Pro)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#93A4C3]">CFG Scale</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0.1" 
                      max="2.0" 
                      step="0.05" 
                      value={cfgScale}
                      onChange={handleCfgChange}
                      className="flex-1 accent-[#38BDF8]"
                    />
                    <span className="text-xs font-mono text-[#38BDF8]">{cfgScale.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#93A4C3]">Custom Prompt</label>
                <textarea 
                  rows="3" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the motion dynamics..." 
                  className="w-full bg-[#071426] border border-white/5 rounded-2xl px-4 py-4 text-sm text-[#EAF4FF] outline-none resize-none placeholder:text-[#2a3c54]"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-5 text-base font-bold tracking-[0.1em] uppercase rounded-xl text-white bg-gradient-to-br from-[#3B82F6] to-[#38BDF8] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed hover:scale-102 transition-all cursor-pointer"
              >
                {isLoading && (
                  <span className="border-3 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin inline-block mr-2 align-middle"></span>
                )}
                {btnText}
              </button>
            </div>
            
            {/* RESULT SECTION */}
            {result.visible && (
              <div className="border border-white/5 bg-[rgba(15,35,60,0.72)] backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center rounded-[24px]">
                <h3 className="text-lg font-bold text-[#EAF4FF] mb-2">Generation Complete</h3>
                <p className="text-sm text-[#93A4C3] mb-6">Your AI motion video is ready.</p>
                <div className="w-full aspect-video bg-[#071426] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                  {result.videoUrl ? (
                    <video src={result.videoUrl} controls autoPlay className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[#38BDF8] p-4 text-sm font-mono">
                      Task Created Successfully!<br />
                      Task ID: {result.taskId}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-12 border-t border-white/5 text-center">
        <p className="text-xs text-[#93A4C3] tracking-widest uppercase">© 2026 ADITYA MOTION LABS • POWERED BY AI</p>
      </footer>
    </div>
  );
}
