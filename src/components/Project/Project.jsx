import React, { useState, useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Project = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('FPyANi4X-1gUfsMCI'); // Replace with your EmailJS Public Key
  }, []);

  const apartments = [
    {
      type: '3 BHK Apartments',
      area: '1500 Sq.Ft',
      price: '₹ 1.99 Cr* (All In)'
    },
    {
      type: '3 BHK Apartments',
      area: '1800 Sq.Ft',
      price: '₹ On Request (All In)'
    },
    {
      type: '3 BHK Apartments',
      area: '2500 Sq.Ft',
      price: '₹ On Request (All In)'
    },
    {
      type: '4 BHK Apartments',
      area: '3200 Sq.Ft',
      price: '₹ On Request (All In)'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for the field being edited
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = 'Valid email is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      errors.phone = 'Valid 10-digit phone number is required';
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

    // Get current time for the template
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    // Map formData to EmailJS template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message || 'No message provided',
      time: currentTime
    };

    try {
      await emailjs.send(
        'service_91dd84g', // Your EmailJS Service ID
        'template_ncabbum', // Your EmailJS Template ID
        templateParams
      );
      console.log('Email sent successfully:', templateParams);
      alert('Thank you! Your request has been submitted successfully. We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormErrors({});
      setShowPopup(false);
    } catch (error) {
      console.error('Error sending email:', error.text || error);
      alert(`Sorry, there was an error sending your request: ${error.text || 'Unknown error'}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center px-4">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Price List</h1>
        
        {/* Cards Grid - Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {apartments.map((apartment, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 h-80 flex flex-col justify-between">
              <div className="border-2 border-blue-600 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {apartment.type}
                </h3>
              </div>
              
              <div className="space-y-6 mb-8 flex-grow">
                <div className="text-center">
                  <span className="text-gray-700 font-medium text-lg">Area : </span>
                  <span className="text-gray-900 font-semibold text-lg">{apartment.area}</span>
                </div>
                <div className="text-center border-t border-dotted border-gray-300 pt-6">
                  <span className="text-gray-700 font-medium text-lg">Price : </span>
                  <span className="text-gray-900 font-semibold text-lg">{apartment.price}</span>
                </div>
              </div>
              
              <div className="text-center mt-auto">
                <button
                  onClick={openPopup}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center mx-auto space-x-2 text-lg"
                >
                  <span>Request A Call</span>
                  <Phone size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max Hawkins max-w-md w-full max-h-[90vh] overflow-10-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-600">Request a Call</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                  className={`w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
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
                  className={`w-full px-3 py-2 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closePopup}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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