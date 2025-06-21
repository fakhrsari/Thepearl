import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll";
import { Instagram } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout = ({ children, hideNav = false }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "home" },
    { name: "Services", path: "services" },
    { name: "Contact", path: "contact" },
  ];

  return (
    <div className="relative flex flex-col min-h-[calc(var(--vh)*100)] bg-center bg-cover">
      {!hideNav && (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-md"
              : "bg-transparent"
          }`}
        >
          <div className="container-pearl flex items-center justify-between py-4">
            {/* Logo & Site Title */}
            <RouterLink to="/" className="flex items-center">
              <div className="relative inline-block h-12">
                <h1 className="relative z-20 text-2xl font-playfair text-deepCharcoal pr-2 top-2">
                  The Pearl
                </h1>
                <img
                  src="/logo.png"
                  alt="The Pearl logo"
                  className="absolute top-0 w-20 right-full"
                />
              </div>
            </RouterLink>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-deepCharcoal p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.path === "/" ? (
                  <RouterLink
                    key={link.name}
                    to={link.path}
                    className="text-deepCharcoal hover:text-goldDark font-lato transition-colors"
                  >
                    {link.name}
                  </RouterLink>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    smooth
                    duration={500}
                    offset={-100}
                    className="text-deepCharcoal hover:text-goldDark font-lato transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                )
              )}
              <a
                href="https://instagram.com/thepearl_beirut"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram"
                className="text-deepCharcoal hover:text-goldDark transition-colors"
              >
                <Instagram size={24} />
              </a>
            </nav>
          </div>

          {/* Mobile nav */}
          <nav
            className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
              menuOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="container-pearl py-4 space-y-4">
              {navLinks.map((link) =>
                link.path === "/" ? (
                  <RouterLink
                    key={link.name}
                    to={link.path}
                    className="block text-deepCharcoal hover:text-goldDark font-lato transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </RouterLink>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    smooth
                    duration={500}
                    offset={-100}
                    className="block text-deepCharcoal hover:text-goldDark font-lato transition-colors cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="pt-2">
                <a
                  href="https://instagram.com/thepearl_beirut"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram"
                  className="inline-block text-deepCharcoal hover:text-goldDark transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </nav>
        </header>
      )}

      <main className="flex-grow">{children}</main>

      <footer className="bg-deepCharcoal text-white py-12">
        <div className="container-pearl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h2 className="text-2xl font-bold mb-4 font-playfair">The Pearl</h2>
              <p className="mb-4">
                Your sanctuary for wellness and beauty in the heart of Beirut.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/thepearl_beirut"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram"
                  className="text-white hover:text-goldLight transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) =>
                  link.path === "/" ? (
                    <li key={link.name}>
                      <RouterLink
                        to={link.path}
                        className="text-white hover:text-goldLight transition-colors"
                      >
                        {link.name}
                      </RouterLink>
                    </li>
                  ) : (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        smooth
                        duration={500}
                        offset={-100}
                        className="text-white hover:text-goldLight transition-colors cursor-pointer"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-lg font-bold mb-4">Business Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>10:00 AM – 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM – 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} The Pearl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;