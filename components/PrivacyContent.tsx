"use client";

import { motion } from "framer-motion";

export function PrivacyContent() {
  const sections = [
    {
      title: "Introduction",
      content: "At Pholio Studio, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.",
    },
    {
      title: "The Data We Collect About You",
      content: "Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Technical Data, Profile Data, and Usage Data.",
    },
    {
      title: "How We Use Your Data",
      content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you; Where it is necessary for our legitimate interests; Where we need to comply with a legal obligation.",
    },
    {
      title: "Data Security",
      content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.",
    },
    {
      title: "Your Legal Rights",
      content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, and the right to withdraw consent.",
    },
  ];

  return (
    <article className="bg-[#FAF7F2] text-[#050505] min-h-screen pt-40 pb-32 px-6 texture-grain">
      <div className="max-w-3xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 border-b border-[#050505]/10 pb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-4 block font-semibold">Legal & Compliance</span>
          <h1 className="font-editorial text-5xl md:text-7xl mb-6">Privacy Policy</h1>
          <p className="text-sm text-[#050505]/40 font-sans tracking-wide">Last Updated: March 15, 2024</p>
        </motion.header>

        <div className="space-y-16">
          {sections.map((section, i) => (
            <motion.section 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <h2 className="font-editorial text-2xl md:text-3xl mb-6 text-[#050505]/90 group-hover:text-[#C9A55A] transition-colors duration-300">
                {i + 1}. {section.title}
              </h2>
              <p className="font-sans text-lg text-[#050505]/70 leading-relaxed font-light">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-12 border-t border-[#050505]/10"
        >
          <h3 className="font-editorial text-xl mb-4">Questions?</h3>
          <p className="font-sans text-[#050505]/60 mb-8">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <a 
            href="mailto:privacy@pholio.studio" 
            className="font-editorial text-2xl text-[#C9A55A] hover:underline transition-all underline-offset-8"
          >
            privacy@pholio.studio
          </a>
        </motion.footer>
      </div>
    </article>
  );
}
