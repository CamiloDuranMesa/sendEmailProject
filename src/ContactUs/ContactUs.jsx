import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';

export const ContactUs = () => {
  const COOLDOWN_TIME = 60000;
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [cooldownError, setCooldownError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const now = Date.now();

    if (now - lastSubmitTime < COOLDOWN_TIME) {
      const secondsLeft = Math.ceil((COOLDOWN_TIME - (now - lastSubmitTime)) / 1000);
      setCooldownError(`Por favor espera ${secondsLeft} segundos antes de enviar otro mensaje.`);
      return;
    }

    setCooldownError('');

    const serviceID = 'service_rdu0zcc';
    const templateID = 'template_0xmlvjn';
    const apikey = 'bNXoCvHdrPdvM2F7P';

    emailjs.send(serviceID, templateID, data, apikey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        reset();
        setLastSubmitTime(now);
      }).catch((err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 space-y-6 border border-purple-300"
      >
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-2">Contact Us</h2>
          <p className="text-gray-600 text-sm">Please fill out this form to get in touch</p>
          {cooldownError && (
            <p className="text-red-500 mt-2 font-medium">{cooldownError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Name
          </label>
          <input
            {...register("username", { required: true })}
            name="username"
            placeholder="Enter your name"
            className={`w-full px-4 py-2 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 text-black ${
              errors.username ? 'border-red-500 ring-red-400' : 'border-purple-300 focus:ring-purple-500'
            }`}
          />
          {errors.username && <span className="text-red-500 text-sm">Este campo es requerido</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Email
          </label>
          <input
            {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
            name="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 text-black ${
              errors.email ? 'border-red-500 ring-red-400' : 'border-purple-300 focus:ring-purple-500'
            }`}
          />
          {errors.email && <span className="text-red-500 text-sm">Email inválido</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Message
          </label>
          <textarea
            {...register("message", { required: true })}
            name="message"
            placeholder="Enter your message"
            rows="5"
            className={`w-full px-4 py-2 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 text-black ${
              errors.message ? 'border-red-500 ring-red-400' : 'border-purple-300 focus:ring-purple-500'
            }`}
          ></textarea>
          {errors.message && <span className="text-red-500 text-sm">Este campo es requerido</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-semibold text-lg shadow-md"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
