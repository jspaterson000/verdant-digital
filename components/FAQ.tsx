import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Will I get leads immediately after my website launches?",
    a: "Your website is designed to convert visitors into leads with professional design, clear calls-to-action, and optimized contact forms. However, you'll need to drive traffic to it through Google Ads (fastest - leads within 48 hours), local SEO (long-term organic traffic), social media marketing, or traditional advertising with your website URL. Most successful tradies combine their new website with Google Ads for immediate, consistent leads. We can help set this up for you!"
  },
  {
    q: "Is the website really mine?",
    a: "Yes. While you rent the service from us for the first 24 months, the content and domain are yours. After the contract, you can move it or stay with us for a reduced maintenance fee."
  },
  {
    q: "Can I update text and photos myself?",
    a: "Absolutely. We give you access to an easy editor. But remember, unlimited updates are included in your $99/mo, so you can just text us the photos and we'll do it for you."
  },
  {
    q: "Are there any hidden fees?",
    a: "None. $299 one-time setup + $99/month (inc GST). This covers hosting, domain renewal, SSL security, daily backups, and support."
  },
  {
    q: "What happens after 24 months?",
    a: "The contract ends. You can continue on a month-to-month basis (cancel anytime), or take your site files and host it elsewhere. You're never held hostage."
  },
  {
    q: "Does this include SEO?",
    a: "It includes 'On-Page Local SEO'. We set up your site structure, meta tags, and content to target your local area (e.g. 'Plumber Newcastle'). For aggressive ranking campaigns, we offer separate add-ons."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-zinc-900 border-t border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12 text-center">Common Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/10 rounded-lg bg-black/40 overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-lg text-white">{faq.q}</span>
                {openIndex === index ? (
                  <Minus className="text-verdant-accent shrink-0" />
                ) : (
                  <Plus className="text-gray-500 shrink-0" />
                )}
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100 p-6 pt-0' : 'grid-rows-[0fr] opacity-0 p-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;