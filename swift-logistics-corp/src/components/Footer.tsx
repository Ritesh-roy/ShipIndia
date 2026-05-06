import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import Logo from "./Logo";

const Footer = () => (
  <footer className="bg-gradient-navy text-primary-foreground pt-20 pb-8">
    <div className="container-pro grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div>
        <Logo light />
        <p className="text-sm text-white/70 mt-5 leading-relaxed">
          Connecting continents through reliable transportation, import, and export services trusted by global enterprises since 1998.
        </p>
        <div className="flex gap-3 mt-6">
          {[Linkedin, Twitter, Facebook].map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-all">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-lg mb-5">Company</h4>
        <ul className="space-y-3 text-sm text-white/70">
          <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
          <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
          <li><Link to="/industries" className="hover:text-accent transition-colors">Industries</Link></li>
          <li><Link to="/news" className="hover:text-accent transition-colors">News & Insights</Link></li>
          <li><Link to="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
          <li><Link to="/branches" className="hover:text-accent transition-colors">Branch Locator</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-lg mb-5">Services</h4>
        <ul className="space-y-3 text-sm text-white/70">
          <li>Ocean Freight</li>
          <li>Air Cargo</li>
          <li>Road Transportation</li>
          <li>Warehousing</li>
          <li>Customs Clearance</li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-lg mb-5">Get in Touch</h4>
        <ul className="space-y-3 text-sm text-white/70">
          <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-accent" /> 200 Harbor Drive, Singapore 018956</li>
          <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-accent" /> +1 800 555 1234</li>
          <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-accent" /> hello@leologistics.com</li>
        </ul>
      </div>
    </div>

    <div className="container-pro mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/60">
      <p>© {new Date().getFullYear()} LEO Global Logistics. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-accent">Privacy</a>
        <a href="#" className="hover:text-accent">Terms</a>
        <a href="#" className="hover:text-accent">Cookies</a>
      </div>
    </div>
  </footer>
);

export default Footer;
