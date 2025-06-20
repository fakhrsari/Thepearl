import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Instagram, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { services } from "@/data/servicesData";
import ServiceAccordion from "@/components/ServiceAccordion";

import Layout from "../components/Layout";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const HomePage = () => {
  useEffect(() => {
    // Observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section id = "home" className="relative min-h-screen flex items-center pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('background.jpg')",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container-pearl relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="heading-primary mb-4 animate-on-scroll animate-active">
              Peace. Beauty. Wellness.
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-on-scroll">
              Because you deserve a Pearl-worthy glow.
            </p>
            <p className="text-lg mb-8 animate-on-scroll"></p>
            <div className="flex items-center space-x-4">
              {/* Interactive WhatsApp button */}
              <a
                href="https://wa.me/+96171900188"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-500 text-white p-3 rounded-lg flex items-center transition-all duration-300 ease-in-out hover:px-6"
              >
                <FaWhatsapp className="w-6 h-6 flex-shrink-0" />
                <span className="ml-2 max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:max-w-xs">
                  Book via WhatsApp
                </span>
              </a>

              {/* View Menu link styled as a button with white glow on hover */}
              <Link
                to="services"
                smooth={true}
                duration={500}
                offset={-100}
                className="text-white cursor-pointer rounded-full px-4 py-2 transition-all duration-300 ease-in-out hover:bg-white hover:text-deepCharcoal"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Icons Section */}
      <section className="py-16 bg-white">
        <div className="container-pearl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Facials */}
            <div className="flex flex-col items-center animate-on-scroll">
              <div className="group w-40 h-40 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                <img
                  src="/facials.jpg"
                  alt="Facials"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-center mt-4">Facials</h3>
            </div>

            {/* Nails */}
            <div className="flex flex-col items-center animate-on-scroll">
              <div className="group w-40 h-40 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                <img
                  src="/Nails.jpg"
                  alt="Nails"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-center mt-4">Nails</h3>
            </div>

            {/* Body Sculpting */}
            <div className="flex flex-col items-center animate-on-scroll">
              <div className="group w-40 h-40 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                <img
                  src="/Bodysculpt.jpg"
                  alt="Body Sculpting"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-center mt-4">Body Sculpting</h3>
            </div>

            {/* Hair Therapy */}
            <div className="flex flex-col items-center animate-on-scroll">
              <div className="group w-40 h-40 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                <img
                  src="/hairtherapy.jpg"
                  alt="Hair Therapy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-center mt-4">Hair Therapy</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-pearlBlush">
        <div className="container-pearl">
          <h2 className="heading-secondary text-center mb-12">Our Services</h2>

          <ServiceAccordion services={services} />

          {/* Removed the Book Now button wrapper here */}
          {/*
          <div className="mt-8 text-center">
            <RouterLink to="/book" className="btn btn-primary">
              Book Now
            </RouterLink>
          </div>
          */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-pearl">
          <h2 className="heading-secondary text-center mb-12">Get In Touch</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <div className="h-96 rounded-2xl overflow-hidden mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4713.968559980909!2d35.49464966417261!3d33.90064854776838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17108e0361bb%3A0x7ed33da63c021681!2sThe%20Pearl!5e0!3m2!1sen!2slb!4v1747672660571!5m2!1sen!2slb"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Pearl Spa Location"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-pearlBlush p-3 rounded-xl mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-goldDark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Address</h4>
                    <p>Beirut, Lebanon</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pearlBlush p-3 rounded-xl mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-goldDark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p>
                      <a
                        href="mailto:Batoulyounes@live.com"
                        className="text-goldDark hover:underline"
                      >
                        Batoulyounes@live.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pearlBlush p-3 rounded-xl mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-goldDark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p>71 900 188</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pearlBlush p-3 rounded-xl mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-goldDark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
                    <table className="text-left">
                      <tbody>
                        <tr>
                          <td className="pr-8 py-1">Monday - Friday</td>
                          <td>10:00 AM - 7:00 PM</td>
                        </tr>
                        <tr>
                          <td className="pr-8 py-1">Saturday</td>
                          <td>10:00 AM - 6:00 PM</td>
                        </tr>
                        <tr>
                          <td className="pr-8 py-1">Sunday</td>
                          <td>Closed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="https://instagram.com/thepearl_beirut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline inline-flex items-center"
                  >
                    <Instagram size={20} className="mr-2" />
                    Message on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;