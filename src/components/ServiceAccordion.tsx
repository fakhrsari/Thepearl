import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceCategory } from "@/data/servicesData";
import { FaWhatsapp } from "react-icons/fa";

type ServiceAccordionProps = {
  services: ServiceCategory[];
};

// Function to create a URL-friendly slug
const createServiceSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const ServiceAccordion: React.FC<ServiceAccordionProps> = ({ services }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {services.map((category, index) => (
        <AccordionItem key={index} value={`category-${index}`}>
          <AccordionTrigger className="text-xl font-semibold text-deepCharcoal">
            {category.category}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="py-2 border-b border-gray-200 last:border-0 relative group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {(item.duration || item.note) && (
                        <div className="text-sm text-goldDark">
                          {item.duration && <span>{item.duration} • </span>}
                          {item.note && <span>{item.note}</span>}
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-right">{item.price}</div>
                  </div>
                  
                  {/* WhatsApp button that appears on hover */}
                  <a
                    href="https://wa.me/+96171900188"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-2 opacity-0 group-hover:opacity-100 transition-colors duration-300 shadow-md rounded-lg w-10 h-10 flex items-center justify-center"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                </div>
              ))}
            </div>
            {category.note && (
              <div className="mt-4 p-3 bg-pearlBlush rounded-lg text-sm">
                <strong>Note:</strong> {category.note}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ServiceAccordion;