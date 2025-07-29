import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ContactInformationFormProps {
  onFieldChange: () => void;
  onCompleteAllSteps?: () => void;
  onFormValidation?: (isValid: boolean) => void;
}

const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  onFieldChange,
  onCompleteAllSteps,
  onFormValidation
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    state: '',
    email: '',
    countryCode: '+1',
    phoneNumber: '',
    optIn: false
  });

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  const countryCodes = [
    { code: '+1', flag: '🇺🇸', country: 'United States' },
    { code: '+44', flag: '🇬🇧', country: 'United Kingdom' },
    { code: '+33', flag: '🇫🇷', country: 'France' },
    { code: '+49', flag: '🇩🇪', country: 'Germany' },
    { code: '+39', flag: '🇮🇹', country: 'Italy' },
    { code: '+34', flag: '🇪🇸', country: 'Spain' },
    { code: '+31', flag: '🇳🇱', country: 'Netherlands' },
    { code: '+32', flag: '🇧🇪', country: 'Belgium' },
    { code: '+41', flag: '🇨🇭', country: 'Switzerland' },
    { code: '+43', flag: '🇦🇹', country: 'Austria' }
  ];

  // Check if all required fields are filled
  const isFormValid = () => {
    return formData.firstName.trim() !== '' &&
           formData.lastName.trim() !== '' &&
           formData.addressLine1.trim() !== '' &&
           formData.state !== '' &&
           formData.email.trim() !== '' &&
           formData.phoneNumber.trim() !== '';
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    onFieldChange();
  };

  // Update form validation status whenever form data changes
  useEffect(() => {
    if (onFormValidation) {
      onFormValidation(isFormValid());
    }
  }, [formData, onFormValidation]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header - Left Aligned */}
      <div className="text-left mb-6">
        <h1 className="text-[#353B46] font-poppins text-lg font-semibold leading-6 tracking-[0.15px] mb-2">
          Contact information
        </h1>
        <p className="text-[#464F5E] font-poppins text-sm font-normal leading-6 tracking-[0.25px]">
          Let's make sure you're not a secret agent. Or are you?
        </p>
      </div>

      {/* Form Fields - All Stacked Vertically */}
      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-[#353B46] mb-2">
            First name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D3EE0] focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-[#353B46] mb-2">
            Last name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D3EE0] focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-[#353B46] mb-2">
            Address line 1
          </label>
          <input
            type="text"
            value={formData.addressLine1}
            onChange={(e) => handleInputChange('addressLine1', e.target.value)}
            className="w-full px-3 py-2 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D3EE0] focus:border-transparent"
            placeholder="Enter your address"
          />
        </div>

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium text-[#353B46] mb-2">
            State
          </label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D3EE0] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#637085] w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-[#353B46] mb-2">
            Email address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D3EE0] focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone Number with Country Code */}
        <div>
          <label className="block text-sm font-medium text-[#353B46] mb-2">
            Phone number
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#637085] mb-1">
                Country code
              </label>
              <div className="relative">
                <select
                  value={formData.countryCode}
                  onChange={(e) => handleInputChange('countryCode', e.target.value)}
                  className="w-full px-3 py-2 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D3EE0] focus:border-transparent appearance-none bg-white"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#637085] w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-[#637085] mb-1">
                Phone number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="w-full px-3 py-2 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D3EE0] focus:border-transparent"
                placeholder="Type phone number"
              />
            </div>
          </div>
        </div>

        {/* Opt-in Checkbox */}
        <div className="flex items-start space-x-3 pt-2">
          <input
            type="checkbox"
            id="optIn"
            checked={formData.optIn}
            onChange={(e) => handleInputChange('optIn', e.target.checked)}
            className="mt-1 w-4 h-4 text-[#4D3EE0] border-[#D1D5DC] rounded focus:ring-[#4D3EE0] focus:ring-2"
          />
          <label htmlFor="optIn" className="text-sm text-[#353B46] leading-5">
            I would like to opt-in to both SMS & Email
          </label>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;