import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { isSlotAvailable, createBooking, BookingInput } from '@/services/bookingsService';
import { services, ServiceItem } from '@/data/servicesData';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface FormValues {
  category: string;
  service: string;
  name: string;
  phone: string;
  date: string;
  time: string;
}

export default function BookForm() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [availableServices, setAvailableServices] = useState<ServiceItem[]>([]);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>();

  // Pre‑fill category & service from URL params if provided
  useEffect(() => {
    const catParam = searchParams.get("category");
    const svcParam = searchParams.get("service");
    if (catParam) {
      const prettyCat = catParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      setValue("category", prettyCat);
      setSelectedCategory(prettyCat);
    }
    if (svcParam) {
      const prettySvc = svcParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      setValue("service", prettySvc);
    }
  }, []);

  useEffect(() => {
    const cat = services.find(s => s.category === selectedCategory);
    setAvailableServices(cat?.items || []);
  }, [selectedCategory]);

  useEffect(() => {
    const svcParam = searchParams.get("service");
    if (svcParam && availableServices.length) {
      const prettySvc = svcParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      const svc = availableServices.find(s => s.name === prettySvc);
      if (svc) {
        setValue("service", prettySvc);
      }
    }
  }, [availableServices]);

  const availableTimes = [
    "09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00"
  ];

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      // Prevent double-booking
      const available = await isSlotAvailable(data.date, data.time);
      if (!available) {
        toast.error('This slot is already booked.');
        return;
      }

      // Build booking payload
      const booking: BookingInput = {
        name:     data.name,
        phone:    data.phone,
        date:     new Date(data.date),
        time:     data.time,
        category: data.category,
        service:  data.service,
      };

      await createBooking(booking);
      toast.success('Your booking is confirmed!');
      reset();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Booking failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <label className="block">
          Service Category
          <select
            {...register('category', { required: true })}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              // clear sub-service
              setValue('service', '');
            }}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select a category</option>
            {services.map(cat => (
              <option key={cat.category} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Sub-Service
          <select
            {...register('service', { required: true })}
            className="w-full px-4 py-2 border rounded"
            disabled={!selectedCategory}
          >
            <option value="">Select a service</option>
            {availableServices.map(svc => (
              <option key={svc.name} value={svc.name}>
                {svc.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <input
        {...register('name', { required: true })}
        placeholder="Name"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        {...register('phone', { required: true })}
        placeholder="Phone"
        className="w-full px-4 py-2 border rounded"
      />
      <label className="block">
        <span>Date</span>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="w-full px-4 py-2 border rounded flex justify-between items-center">
              {watch('date')
                ? format(new Date(`${watch('date')}T00:00`), 'PPP')
                : 'Select date'}
              <CalendarIcon className="ml-2 h-5 w-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={watch('date') ? new Date(watch('date')) : undefined}
              onSelect={(date) => {
                if (date) {
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                  const dd = String(date.getDate()).padStart(2, '0');
                  setValue('date', `${yyyy}-${mm}-${dd}`);
                }
              }}
              disabled={(date) => date < new Date()}
              initialFocus
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </label>
      <label className="block">
        <span>Time</span>
        <select
          {...register('time', { required: true })}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select a time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-goldLight text-white rounded"
      >
        Confirm Booking
      </button>
    </form>
  );
}