import React, { useState, useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Project = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const apartments = [
    {
      type: '3 BHK Apartments',
      area: '1993 Sq.Ft',
      price: '₹ 2.90 Cr* (All In)'
    },
    {
      type: '4 BHK Apartments',
      area: '2575 Sq.Ft',
      price: '₹ On Request (All In)'
    },
    {
      type: '3 BHK + ST',
      area: '2368 Sq.Ft',
      price: '₹ On Request (All In)'
    },
    {
      type: '4 BHK + ST',
      area: '2799 Sq.Ft',
      price: '₹ On Request (All In)'
    }
  ];

  // Initialize EmailJS with the public key
  useEffect(() => {
    emailjs.init('FPyANi4X-1gUfsMCI'); // Replace with your EmailJS public key
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      errors.phone = 'Valid 10-digit phone number is required';
    if (!consentChecked) errors.consent = 'Please accept the terms';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // EmailJS configuration
      const emailJSConfig = {
        serviceId: 'service_91dd84g', 
        templateId: 'template_ncabbum',
        publicKey: 'FPyANi4X-1gUfsMCI'
      };

      // Get current time in IST
      const currentTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      // Prepare email data to match EmailJS template
      const emailData = {
        from_name: formData.name,
        from_email: '',
        phone: formData.phone,
        message: 'Client request a call for Price List for Godrej Majesty',
        time: currentTime
      };

      // Send email using EmailJS
      await emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        emailData,
        emailJSConfig.publicKey
      );

      alert('Thank you! Your request has been submitted successfully. We will contact you soon.');
      setFormData({ name: '', phone: '' });
      setConsentChecked(false);
      setFormErrors({});
      setShowPopup(false);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Sorry, there was an error sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setFormErrors({});
    setConsentChecked(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title - Responsive text sizing */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6 sm:mb-8 lg:mb-12">
          Price List
        </h1>

        {/* Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {apartments.map((apartment, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              {/* Card Header */}
              <div className="p-4 sm:p-6 lg:p-8 flex-grow">
                <div className="border-2 border-blue-600 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 text-center leading-tight">
                    {apartment.type}
                  </h3>
                </div>

                {/* Card Details */}
                <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6 lg:mb-8">
                  <div className="text-center">
                    <span className="text-gray-700 font-medium text-sm sm:text-base lg:text-lg">Area: </span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg">{apartment.area}</span>
                  </div>
                  <div className="text-center border-t border-dotted border-gray-300 pt-4 sm:pt-6">
                    <span className="text-gray-700 font-medium text-sm sm:text-base lg:text-lg">Price: </span>
                    <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg break-words">{apartment.price}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer - Button */}
              <div className="p-4 sm:p-6 lg:p-8 pt-0">
                <button
                  onClick={openPopup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-lg hover:shadow-lg active:transform active:scale-95"
                >
                  <span>Request A Call</span>
                  <Phone size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Form - Fully Responsive */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-600">Request a Call</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 sm:py-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 sm:py-3 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base`}
                  placeholder="Enter your 10-digit phone number"
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div className="mt-3 text-xs text-gray-500">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 mr-2 flex-shrink-0"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    required
                  />
                  <span className="text-xs leading-tight">
                    I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                  </span>
                </label>
                {formErrors.consent && <p className="text-red-500 text-xs mt-1">{formErrors.consent}</p>}
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closePopup}
                  className="w-full sm:flex-1 px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;