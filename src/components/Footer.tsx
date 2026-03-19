import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { name: 'Home', to: '/home' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
    { name: 'Privacy Policy', to: '/privacy' },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: import.meta.env.VITE_APP_FACEBOOK_URL },
    { icon: <Twitter />, href: import.meta.env.VITE_APP_TWITTER_URL },
    { icon: <Instagram />, href: import.meta.env.VITE_APP_INSTAGRAM_URL },
    { icon: <Github />, href: import.meta.env.VITE_APP_GITHUB_URL },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="text-xl font-bold text-white">
            DhamDeepa
          </Link>
          <p className="text-gray-400 max-w-sm">
            DhamDeepa is a modern school management platform to manage
            dashboards, student activities, and user roles efficiently.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-white">Navigation</h4>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-white">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DhamDeepa. All rights reserved.
      </div>
    </footer>
  );
}
