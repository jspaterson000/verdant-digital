import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);

    // Add recipient email to form data
    formData.append('to', 'hello@verdantdigital.com.au');
    formData.append('subject', `New Website Enquiry - ${formData.get('businessName')}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        e.currentTarget.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Let's Build Something Great.</h3>
            <p className="text-gray-400 text-lg mb-8">
              Ready to take your business online? Fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <CheckCircle2 className="text-verdant-accent mt-1" />
                   <div>
                       <h4 className="text-white font-bold">Fast Response</h4>
                       <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <CheckCircle2 className="text-verdant-accent mt-1" />
                   <div>
                       <h4 className="text-white font-bold">Australian Based</h4>
                       <p className="text-gray-500">Local team, local support.</p>
                   </div>
                </div>
                 <div className="flex items-start gap-4">
                   <CheckCircle2 className="text-verdant-accent mt-1" />
                   <div>
                       <h4 className="text-white font-bold">No Obligation</h4>
                       <p className="text-gray-500">Free consultation to discuss your needs.</p>
                   </div>
                </div>
            </div>
            
             <div className="mt-12 flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-verdant-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Questions?</p>
                  <a href="mailto:hello@verdantdigital.com.au" className="text-white font-medium hover:text-verdant-accent transition-colors">hello@verdantdigital.com.au</a>
                </div>
              </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-6">
            {/* Hidden Web3Forms access key - Get yours at https://web3forms.com */}
            <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY'} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Name</label>
                <input type="text" name="name" placeholder="John Smith" className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-verdant-accent focus:outline-none transition-colors" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Business Name</label>
                <input type="text" name="businessName" placeholder="Smith Plumbing" className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-verdant-accent focus:outline-none transition-colors" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 uppercase tracking-wider">Email Address</label>
              <input type="email" name="email" placeholder="john@example.com" className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-verdant-accent focus:outline-none transition-colors" required />
            </div>

             <div className="space-y-2">
              <label className="text-sm text-gray-400 uppercase tracking-wider">Phone</label>
              <input type="tel" name="phone" placeholder="0400 000 000" className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-verdant-accent focus:outline-none transition-colors" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 uppercase tracking-wider">Industry</label>
               <select name="trade" className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-verdant-accent focus:outline-none transition-colors" required>
                   <option value="">Select your industry...</option>
                   <option>Trades (Plumbing, Electrical, etc.)</option>
                   <option>Retail / E-commerce</option>
                   <option>Professional Services</option>
                   <option>Hospitality / Food</option>
                   <option>Health / Wellness</option>
                   <option>Other</option>
               </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-verdant-600 text-white font-bold uppercase tracking-wider py-4 rounded hover:bg-verdant-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="bg-verdant-accent/10 border border-verdant-accent text-verdant-accent p-4 rounded text-center">
                Thanks for your interest! We'll be in touch shortly.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded text-center">
                Sorry, there was an error submitting your form. Please email us directly at hello@verdantdigital.com.au
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;