import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 29,
    features: [
      '5 Team members',
      '100 GB Storage',
      'Basic analytics',
      'Email support',
      'API Access',
    ],
    recommended: false,
  },
  {
    name: 'Professional',
    price: 99,
    features: [
      'Unlimited team members',
      '1 TB Storage',
      'Advanced analytics',
      'Priority support',
      'API Access',
      'Custom integrations',
      'Team collaboration tools',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    features: [
      'Unlimited everything',
      'Dedicated support',
      'Custom solutions',
      'Advanced security',
      'SLA guarantee',
      'Custom reporting',
      'White-label options',
    ],
    recommended: false,
  },
];

const Pricing = () => {
  return (
    <div className="p-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-gray-400">Choose the plan that's right for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-[#0F1631] rounded-xl p-8 relative ${
              plan.recommended ? 'ring-2 ring-purple-600' : ''
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                  Recommended
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check size={20} className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg transition-colors ${
                plan.recommended
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;