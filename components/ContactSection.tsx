
import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Identity required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Secure email required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Enquiry details missing';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate encrypted transmission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-900/40 scroll-mt-20 md:scroll-mt-24 snap-start" aria-labelledby="contact-heading">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-600/5 rounded-full blur-[100px] -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm mb-4 block">Initialization Sequence</span>
              <h2 id="contact-heading" className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                Let's Build the <span className="gradient-text">Future</span> Together.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Our solutions architects are ready to evaluate your technical requirements and provide a strategic roadmap for your next transformation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-all flex-shrink-0 mt-1" aria-hidden="true">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Global HQ</p>
                  <div className="text-slate-200 font-medium leading-relaxed">
                    House No- C1, Felicity Township,<br />
                    Bharathidasan 4th street, Kaspapuram,<br />
                    Tambaram, Chennai - 600126,<br />
                    TamilNadu, India
                  </div>
                </div>
              </div>

              {[
                { label: 'Contact Number', value: '+91 9042474030' },
                { label: 'Secure Channel', value: 'admin@vashatkaara.com' }
              ].map((info, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-all flex-shrink-0" aria-hidden="true">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{info.label}</p>
                    <p className="text-slate-200 font-medium leading-relaxed">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" aria-hidden="true"></div>
            <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-slate-700/50 shadow-2xl relative min-h-[500px] flex flex-col" role="region" aria-live="polite">
              
              {isSuccess ? (
                <div className="text-center my-auto animate-fade-in-up">
                  <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative" aria-hidden="true">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping opacity-25" />
                    <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Secure Link Established</h3>
                  <p className="text-slate-400 mb-10 max-w-xs mx-auto text-sm leading-relaxed">
                    Thank you. Your inquiry has been encrypted and prioritized. A senior consultant will reach out shortly to initiate discovery.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 transition-all text-sm font-bold"
                  >
                    New Submission
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h3 className="text-xl font-bold mb-2">Project Brief</h3>
                    <p className="text-slate-500 text-sm">Provide your parameters for automated priority routing.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] ml-1">Identity</label>
                        <input 
                          id="name"
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`w-full bg-slate-900/60 border ${errors.name ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-slate-800'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-slate-700`} 
                          placeholder="Full Name" 
                          required
                        />
                        {errors.name && <p id="name-error" className="text-red-500 text-[10px] font-bold uppercase ml-1" role="alert">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] ml-1">Email Address</label>
                        <input 
                          id="email"
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`w-full bg-slate-900/60 border ${errors.email ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-slate-800'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-slate-700`} 
                          placeholder="email@company.com" 
                          required
                        />
                        {errors.email && <p id="email-error" className="text-red-500 text-[10px] font-bold uppercase ml-1" role="alert">{errors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] ml-1">Enquiry</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows={5} 
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full bg-slate-900/60 border ${errors.message ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-slate-800'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-slate-700 resize-none`} 
                        placeholder="Briefly describe your objectives..." 
                        required
                      />
                      {errors.message && <p id="message-error" className="text-red-500 text-[10px] font-bold uppercase ml-1" role="alert">{errors.message}</p>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m4-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
