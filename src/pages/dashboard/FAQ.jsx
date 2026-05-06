import React, { useState } from 'react';
import { FiUsers, FiDollarSign, FiCalendar, FiGift, FiArrowRight, FiCheckCircle, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const colors = {
  theme1: "#0671FF",
  theme2: "#02D396"
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span>{question}</span>
        {isOpen ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const SpecialOffer = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqItems = [
    {
      question: "What counts as a 'qualified' referral?",
      answer: "A qualified referral is someone who signs up using your referral link, completes account verification, and makes at least one investment in any plan."
    },
    {
      question: "What happens if I refer users who don't invest?",
      answer: "Users who don't invest won't count toward your 954 referral goal. Only users who make an investment will qualify."
    },
    {
      question: "Is there a minimum investment for referred users?",
      answer: "No, referred users can invest any amount in any plan to qualify. There's no minimum investment requirement for them."
    },
    {
      question: "How long does the monthly salary last?",
      answer: "The ₹10,732 monthly salary continues as long as you maintain at least 954 active referred investors. If numbers drop, you'll have a grace period to recruit more."
    },
    {
      question: "What if I don't reach 954 referrals in 90 days?",
      answer: "You can still earn through our standard referral program. The special salary is only awarded for reaching the full 954 qualified referrals within the timeframe."
    },
    {
      question: "How will I receive the monthly salary?",
      answer: "The ₹10,732 will be credited to your account wallet on a monthly basis, starting from the month after you achieve the referral target."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full mb-4" style={{ backgroundColor: `${colors.theme1}15` }}>
            <FiGift className="h-8 w-8" style={{ color: colors.theme1 }} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Referral Offer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Earn a monthly salary by referring users who invest in our platform!
          </p>
        </div>

        {/* Main Offer Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Referral Bonus Program</h2>
                <p className="text-gray-600 mb-6">
                  Invest in any plan and refer users who also invest to unlock incredible earning potential. 
                  The more qualified referrals you have, the more you earn!
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${colors.theme1}15` }}>
                      <FiUsers style={{ color: colors.theme1 }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Refer 954 Investing Users</h3>
                      <p className="text-gray-600">Users must invest in any plan to qualify</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${colors.theme2}15` }}>
                      <FiDollarSign style={{ color: colors.theme2 }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Earn ₹10,732 Monthly</h3>
                      <p className="text-gray-600">Guaranteed salary for successful referrals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${colors.theme1}15` }}>
                      <FiCalendar style={{ color: colors.theme1 }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">90 Days Timeframe</h3>
                      <p className="text-gray-600">Complete your referrals within 3 months</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${colors.theme2}15` }}>
                      <FiCheckCircle style={{ color: colors.theme2 }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Investment Requirement</h3>
                      <p className="text-gray-600">Each referred user must make an investment</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#0671FF] to-[#02D396] rounded-2xl p-8 text-center text-white w-full md:w-80 flex-shrink-0">
                <div className="text-5xl font-bold mb-2">₹10,732</div>
                <div className="text-lg font-medium mb-4">Monthly Salary</div>
                <div className="text-sm opacity-90">For 954 qualified referrals</div>
                <div className="h-px bg-white bg-opacity-30 my-4"></div>
                <div className="text-xs space-y-2">
                  <div className="flex items-center justify-center">
                    <FiCheckCircle size={14} className="mr-1" />
                    <span>Your investment required</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <FiCheckCircle size={14} className="mr-1" />
                    <span>Referred users must invest</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <FiCheckCircle size={14} className="mr-1" />
                    <span>90 days to complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <button className="w-full bg-gradient-to-r from-[#0671FF] to-[#02D396] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
              Start Investing Now
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full text-white text-xl font-bold mb-4" style={{ backgroundColor: colors.theme1 }}>
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Make Your Investment</h3>
              <p className="text-gray-600 text-sm">Choose any investment plan to qualify for the referral program.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full text-white text-xl font-bold mb-4" style={{ backgroundColor: colors.theme1 }}>
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Referral Link</h3>
              <p className="text-gray-600 text-sm">Share your unique referral link with friends and contacts.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full text-white text-xl font-bold mb-4" style={{ backgroundColor: colors.theme1 }}>
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">They Invest</h3>
              <p className="text-gray-600 text-sm">Your referrals must make an investment to count toward your goal.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full text-white text-xl font-bold mb-4" style={{ backgroundColor: colors.theme2 }}>
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Earn Monthly Salary</h3>
              <p className="text-gray-600 text-sm">Receive ₹10,732 every month after reaching 954 qualified referrals.</p>
            </div>
          </div>
        </div>

        {/* Qualification Criteria Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Qualification Criteria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: `${colors.theme1}08` }}>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FiCheckCircle className="mr-2" style={{ color: colors.theme2 }} />
                What Counts as a Qualified Referral
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block h-5 w-5 rounded-full mr-2 flex-shrink-0 mt-0.5" style={{ backgroundColor: `${colors.theme2}30` }}>
                    <FiCheckCircle size={14} className="ml-0.5 mt-0.5" style={{ color: colors.theme2 }} />
                  </span>
                  User signs up through your referral link
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-5 w-5 rounded-full mr-2 flex-shrink-0 mt-0.5" style={{ backgroundColor: `${colors.theme2}30` }}>
                    <FiCheckCircle size={14} className="ml-0.5 mt-0.5" style={{ color: colors.theme2 }} />
                  </span>
                  User verifies their account
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-5 w-5 rounded-full mr-2 flex-shrink-0 mt-0.5" style={{ backgroundColor: `${colors.theme2}30` }}>
                    <FiCheckCircle size={14} className="ml-0.5 mt-0.5" style={{ color: colors.theme2 }} />
                  </span>
                  User makes any investment (any plan, any amount)
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: `${colors.theme1}08` }}>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FiX className="mr-2 text-red-500" />
                What Doesn't Count
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block h-5 w-5 rounded-full mr-2 flex-shrink-0 mt-0.5 bg-red-100">
                    <FiX size={14} className="ml-0.5 mt-0.5 text-red-500" />
                  </span>
                  Users who sign up but don't invest
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-5 w-5 rounded-full mr-2 flex-shrink-0 mt-0.5 bg-red-100">
                    <FiX size={14} className="ml-0.5 mt-0.5 text-red-500" />
                  </span>
                  Users who don't complete verification
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-5 w-5 rounded-full mr-2 flex-shrink-0 mt-0.5 bg-red-100">
                    <FiX size={14} className="ml-0.5 mt-0.5 text-red-500" />
                  </span>
                  Multiple accounts by the same user
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Earning?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our investment platform today and start building your network of qualified referrals to earn your monthly salary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#0671FF] to-[#02D396] text-white py-3 px-8 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Invest Now
            </button>
            <button className="border border-[#0671FF] text-[#0671FF] py-3 px-8 rounded-lg font-medium hover:bg-[#0671FF] hover:text-white transition-colors">
              Learn More About Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;