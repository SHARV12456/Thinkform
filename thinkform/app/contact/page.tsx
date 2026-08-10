import { Button } from '@/components/ui/Button';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-4xl mb-8">✉️</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Get in touch.</h1>
        <p className="text-xl text-[#555] font-medium leading-relaxed mb-12 max-w-lg mx-auto">
          Have a question before booking a session? Want to discuss a custom arrangement or speaking engagement?
        </p>
        
        <div className="bg-[#F5F5F3] p-8 md:p-12 rounded-[2rem] border border-[#e8e8e5] text-left">
          <div className="mb-8">
            <h3 className="text-sm font-bold text-[#888] uppercase tracking-widest mb-2">Email</h3>
            <a href="mailto:hello@thinkform.studio" className="text-2xl font-black tracking-tight text-[#111] hover:text-[#555] transition-colors">
              hello@thinkform.studio
            </a>
          </div>
          <div className="mb-10">
            <h3 className="text-sm font-bold text-[#888] uppercase tracking-widest mb-2">Response Time</h3>
            <p className="text-[#111] font-medium">I personally read and reply to every email, usually within 24–48 hours.</p>
          </div>
          
          <div className="border-t border-[#e8e8e5] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[#555] font-medium text-sm">Ready to dive straight in?</p>
            <Button href="/book" variant="primary">Book a Session Instead</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
