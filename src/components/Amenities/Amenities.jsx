import React from 'react';
import { 
  Activity, 
  Monitor, 
  Car, 
  Leaf, 
  Waves, 
  BookOpen, 
  Shield, 
  Dumbbell 
} from 'lucide-react';

const Amenities = () => {
  const amenities = [
    {
      icon: <Activity className="w-12 h-12 text-blue-600" />,
      title: "Yoga Deck",
      description: "Unwind and flex your muscles at the yoga deck."
    },
    {
      icon: <Monitor className="w-12 h-12 text-blue-600" />,
      title: "Mini Theatre",
      description: "Catch the latest blockbuster in the exclusive mini theatre."
    },
    {
      icon: <Car className="w-12 h-12 text-blue-600" />,
      title: "Reserved Parking",
      description: "Largest Car Parking with Exclusive Valet Service"
    },
    {
      icon: <Leaf className="w-12 h-12 text-blue-600" />,
      title: "Green Themed Reception",
      description: "Integrate nature into every aspect of your life"
    },
    {
      icon: <Waves className="w-12 h-12 text-blue-600" />,
      title: "Swimming pool",
      description: "India's largest ethnic mall with largest F&B area"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Reading Lounge",
      description: "Make all your occasions memorable in our multi-purpose hall."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Security",
      description: "On Vigil 24x7: Fire Safety & Advanced Security System"
    },
    {
      icon: <Dumbbell className="w-12 h-12 text-blue-600" />,
      title: "Gym",
      description: "one of the best ways to improve your physical health"
    }
  ];

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Features & Amenities
        </h1>
        
        {/* Grid Container */}
        <div className="grid grid-cols-4 gap-6 max-h-[calc(100vh-200px)]">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="mb-4">
                {amenity.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {amenity.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;