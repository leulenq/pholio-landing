"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative w-full bg-[#050505] py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Contact Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <h2 className="text-3xl sm:text-4xl font-editorial text-white mb-6">
            We are here to <span className="text-[#C9A55A] italic">assist</span> you.
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-md leading-relaxed">
            Whether you represent an agency looking for verified talent, or you possess potential needing the right platform, our inbox is open.
          </p>

          <div className="space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-2">General Inquiries & Support</span>
              <a href="mailto:support@pholio.studio" className="text-xl text-white hover:text-[#C9A55A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55A]/50">
                support@pholio.studio
              </a>
            </div>
            
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-2">Press & Media</span>
              <a href="mailto:press@pholio.studio" className="text-xl text-white hover:text-[#C9A55A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55A]/50">
                press@pholio.studio
              </a>
            </div>

            <div>
               <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-2">Global Operations</span>
               <p className="text-white text-lg">Remote-First • New York / London</p>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="bg-[#0A0A0A] border border-white/5 p-8 sm:p-10 rounded-2xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A55A]/10 blur-[100px] rounded-full pointer-events-none" />
            
            {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 className="flex flex-col items-center justify-center h-full text-center py-20"
               >
                 <div className="w-16 h-16 rounded-full bg-[#C9A55A]/20 flex items-center justify-center mb-6 text-[#C9A55A]">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
                 <h3 className="text-2xl font-editorial text-white mb-3">Message Received</h3>
                 <p className="text-white/60 mb-8 max-w-[250px]">Thank you for reaching out. We will respond promptly.</p>
                 <button 
                   onClick={() => setIsSubmitted(false)}
                   className="text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                 >
                   Send another message
                 </button>
               </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A55A]/50 focus:bg-white/10 transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A55A]/50 focus:bg-white/10 transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A55A]/50 focus:bg-white/10 transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A55A]/50 focus:bg-white/10 transition-all resize-none"
                    placeholder="Your inquiry details..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-gold w-full mt-4 flex justify-center items-center py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-velvet border-t-transparent rounded-full"
                    />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
