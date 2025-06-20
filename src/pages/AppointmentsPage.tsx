
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addDays, format, isWeekend, setHours, setMinutes, isSameDay } from "date-fns";
import { useInView } from "react-intersection-observer";
import { toast } from "@/components/ui/use-toast";

import Layout from "../components/Layout";

// Import DatePicker styles
import "react-datepicker/dist/react-datepicker.css";

// Service types
const services = [
  { id: 1, name: "Body Massage", duration: 60 },
  { id: 2, name: "Stone Therapy", duration: 90 },
  { id: 3, name: "Facial Therapy", duration: 60 },
  { id: 4, name: "Skin Care", duration: 45 },
  { id: 5, name: "Nail Care", duration: 60 },
  { id: 6, name: "Steam Bath", duration: 30 },
];

// Time slots
const generateTimeSlots = (date: Date) => {
  // Spa opens at 9am and closes at 7pm (19:00)
  // Last appointment starts at 6pm (18:00) for 1-hour sessions
  const slots = [];
  const startHour = 9;
  const endHour = 18; // Last appointment start time
  
  // If it's Sunday (0), no slots available
  if (date.getDay() === 0) {
    return slots;
  }
  
  // Saturday closes earlier at 18:00, so last appointment at 17:00
  const actualEndHour = date.getDay() === 6 ? 17 : endHour;
  
  for (let hour = startHour; hour <= actualEndHour; hour++) {
    slots.push(setHours(setMinutes(new Date(date), 0), hour));
    slots.push(setHours(setMinutes(new Date(date), 30), hour));
  }
  
  return slots;
};

// Step components
const ServiceSelection = ({ 
  selectedService, 
  setSelectedService 
}: { 
  selectedService: number | null, 
  setSelectedService: (id: number) => void 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <div ref={ref} className={`space-y-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold mb-6 font-playfair">Select a Service</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedService === service.id
                ? "bg-goldLight text-white shadow-lg"
                : "bg-white hover:bg-pearlBlush"
            }`}
            onClick={() => setSelectedService(service.id)}
          >
            <h3 className="text-lg font-bold mb-2">{service.name}</h3>
            <p>{service.duration} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DateSelection = ({ 
  selectedDate, 
  setSelectedDate 
}: { 
  selectedDate: Date | null, 
  setSelectedDate: (date: Date) => void 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Filter out Sundays and past dates
  const filterDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getDay() !== 0 && date >= today;
  };
  
  return (
    <div ref={ref} className={`space-y-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold mb-6 font-playfair">Select a Date</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => date && setSelectedDate(date)}
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          filterDate={filterDate}
          inline
          calendarClassName="rounded-lg"
        />
      </div>
      <p className="text-center text-sm text-gray-500 mt-4">
        Note: We're closed on Sundays. Appointments can be booked up to 30 days in advance.
      </p>
    </div>
  );
};

const TimeSelection = ({ 
  selectedDate, 
  selectedTime, 
  setSelectedTime 
}: { 
  selectedDate: Date | null, 
  selectedTime: Date | null, 
  setSelectedTime: (time: Date) => void 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];
  
  return (
    <div ref={ref} className={`space-y-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold mb-6 font-playfair">Select a Time</h2>
      
      {timeSlots.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              type="button"
              className={`py-3 px-4 rounded-lg text-center ${
                selectedTime && isSameDay(selectedTime, time) && selectedTime.getHours() === time.getHours() && selectedTime.getMinutes() === time.getMinutes()
                  ? "bg-goldLight text-white"
                  : "bg-white hover:bg-pearlBlush"
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {format(time, "h:mm a")}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center py-8">No available time slots for the selected date.</p>
      )}
    </div>
  );
};

const ContactForm = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting
}: {
  formData: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div ref={ref} className={`space-y-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold mb-6 font-playfair">Your Details</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-goldDark"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-goldDark"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-goldDark"
            placeholder="Your phone number"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-goldDark"
            placeholder="Any special requests or information we should know..."
          />
        </div>
        
        <button
          type="submit"
          className={`btn btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
};

const ConfirmationStep = ({ selectedService, selectedDate, selectedTime }: {
  selectedService: number | null;
  selectedDate: Date | null;
  selectedTime: Date | null;
}) => {
  const navigate = useNavigate();
  const serviceName = selectedService ? services.find(s => s.id === selectedService)?.name : '';
  
  return (
    <div className="text-center space-y-6 animate-fade-in-up">
      <div className="w-16 h-16 bg-green-500 text-white rounded-full mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold font-playfair">Appointment Confirmed!</h2>
      
      <p className="text-lg">
        Thank you! Your appointment request has been received. We'll confirm shortly—watch for an e-mail from Batoulyounes@live.com.
      </p>
      
      <div className="bg-pearlBlush p-6 rounded-xl max-w-md mx-auto">
        <h3 className="font-bold mb-4">Appointment Details</h3>
        <ul className="text-left space-y-2">
          <li><span className="font-medium">Service:</span> {serviceName}</li>
          {selectedDate && (
            <li><span className="font-medium">Date:</span> {format(selectedDate, "MMMM d, yyyy")}</li>
          )}
          {selectedTime && (
            <li><span className="font-medium">Time:</span> {format(selectedTime, "h:mm a")}</li>
          )}
        </ul>
      </div>
      
      <div className="pt-6">
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

const AppointmentsPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  
  const steps = ["Service", "Date", "Time", "Details", "Confirmation"];
  
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:
        return selectedService !== null;
      case 1:
        return selectedDate !== null;
      case 2:
        return selectedTime !== null;
      default:
        return true;
    }
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful submission
      setCurrentStep(4);
      
      // Show toast notification
      toast({
        title: "Appointment Booked",
        description: "Your appointment request has been submitted successfully.",
      });
      
      // In a real app, you would send the data to an API endpoint
      console.log("Appointment data:", {
        service: selectedService ? services.find(s => s.id === selectedService)?.name : null,
        date: selectedDate,
        time: selectedTime,
        ...formData
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ServiceSelection selectedService={selectedService} setSelectedService={setSelectedService} />;
      case 1:
        return <DateSelection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />;
      case 2:
        return <TimeSelection selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />;
      case 3:
        return (
          <ContactForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 4:
        return <ConfirmationStep selectedService={selectedService} selectedDate={selectedDate} selectedTime={selectedTime} />;
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      {/* Banner */}
      <div className="relative h-64 md:h-80 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="heading-primary mb-4">Your Time to Shine</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Schedule your personal sanctuary experience with us and discover the pearl within.
          </p>
        </div>
      </div>
      
      {/* Appointment Form */}
      <div className="container-pearl py-16">
        {/* Step Progress */}
        {currentStep < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.slice(0, -1).map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    index > currentStep ? "text-gray-400" : "text-deepCharcoal"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index < currentStep
                        ? "bg-goldLight text-white"
                        : index === currentStep
                        ? "bg-goldLight text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? (
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-sm hidden md:block">{step}</span>
                </div>
              ))}
            </div>
            
            <div className="relative max-w-3xl mx-auto mt-4">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                <div
                  className="h-full bg-goldLight transition-all duration-300"
                  style={{ width: `${(currentStep / (steps.length - 2)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          {currentStep < 3 && (
            <div className="flex justify-between mt-12">
              <button
                type="button"
                onClick={handlePrevStep}
                className={`btn btn-outline ${currentStep === 0 ? 'invisible' : ''}`}
              >
                Previous
              </button>
              
              <button
                type="button"
                onClick={handleNextStep}
                className={`btn btn-primary ${!canProceedToNextStep() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!canProceedToNextStep()}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;