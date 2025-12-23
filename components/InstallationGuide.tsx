
import React, { useState } from 'react';

const InstallationGuide: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const nginxConfig = `server {
    listen 80;
    server_name your-domain.com;
    root /var/www/vashatkaara/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}`;

  const buildCommands = `npm install
npm run build
sudo mkdir -p /var/www/vashatkaara
sudo cp -r dist/* /var/www/vashatkaara/`;

  const sslCommands = `sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com`;

  return (
    <section id="deployment" className="py-24 bg-slate-950 snap-start relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">Standalone <span className="gradient-text">Deployment Guide</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Technical blueprint for migrating the Vashatkaara application from local staging to a production-grade cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step 1: DNS & Hardware */}
          <div className="glass-card p-8 rounded-3xl border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">1</div>
              <h3 className="text-xl font-bold">Infrastructure</h3>
            </div>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-3">
                <span className="text-indigo-500">▶</span>
                <span>Provision a Linux VPS (Ubuntu 22.04 LTS recommended) on AWS, DigitalOcean, or Linode.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-500">▶</span>
                <span>Update DNS: Create an <strong>A Record</strong> pointing your-domain.com to your server's Public IP.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-500">▶</span>
                <span>Ensure ports 80 (HTTP) and 443 (HTTPS) are open in your security groups.</span>
              </li>
            </ul>
          </div>

          {/* Step 2: Build & Sync */}
          <div className="glass-card p-8 rounded-3xl border-slate-800 col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold">2</div>
                <h3 className="text-xl font-bold">Build & Distribution</h3>
              </div>
              <button 
                onClick={() => copyToClipboard(buildCommands, 'build')}
                className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-slate-800 rounded-md hover:text-sky-400 transition-colors"
              >
                {copied === 'build' ? 'Copied!' : 'Copy Shell'}
              </button>
            </div>
            <pre className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
              {buildCommands}
            </pre>
            <p className="mt-4 text-xs text-slate-500 italic">
              * The application uses ESM modules. Ensure the web server is configured to serve the dist folder as a static root.
            </p>
          </div>

          {/* Step 3: Nginx Config */}
          <div className="glass-card p-8 rounded-3xl border-slate-800 col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</div>
                <h3 className="text-xl font-bold">Nginx Configuration</h3>
              </div>
              <button 
                onClick={() => copyToClipboard(nginxConfig, 'nginx')}
                className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-slate-800 rounded-md hover:text-purple-400 transition-colors"
              >
                {copied === 'nginx' ? 'Copied!' : 'Copy Config'}
              </button>
            </div>
            <pre className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed">
              {nginxConfig}
            </pre>
          </div>

          {/* Step 4: SSL & Security */}
          <div className="glass-card p-8 rounded-3xl border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">4</div>
                <h3 className="text-xl font-bold">SSL Hardening</h3>
              </div>
              <button 
                onClick={() => copyToClipboard(sslCommands, 'ssl')}
                className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-slate-800 rounded-md hover:text-emerald-400 transition-colors"
              >
                {copied === 'ssl' ? 'Copy' : 'Copy'}
              </button>
            </div>
            <pre className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 font-mono text-[10px] text-emerald-300 mb-6">
              {sslCommands}
            </pre>
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <p className="text-[11px] text-emerald-400 leading-relaxed font-medium">
                Certbot will automatically modify your Nginx configuration to enable HTTPS and manage automatic certificate renewal.
              </p>
            </div>
          </div>
        </div>

        {/* Cloud Readiness Badge */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-6 px-8 py-4 bg-slate-900/50 rounded-2xl border border-slate-800">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-500">
                   {['AWS', 'GC', 'AZ', 'DO'][i-1]}
                 </div>
               ))}
             </div>
             <div className="h-8 w-px bg-slate-800" />
             <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Cloud Native Standalone Certified</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationGuide;
