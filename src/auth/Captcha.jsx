// components/FunnyCaptcha.jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { generateCaptcha } from '../utils/GenCaptcha';

const FunnyCaptcha = ({ captcha, setCaptcha, captchainput, setCaptchaInput }) => {
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setSpin(true);
    setTimeout(() => {
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      setSpin(false);
    }, 300);
  };

  return (
    <div className="w-full bg-sky-50 border-[3px] border-sky-300 rounded-3xl p-5 shadow-[4px_4px_0_0_#7dd3fc] flex flex-col gap-4">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-xl border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-900 font-semibold placeholder-sky-400"
        placeholder="Enter the CAPTCHA text"
        value={captchainput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        required
      />

      <div
        className="flex items-center justify-between gap-3 text-2xl font-mono bg-gradient-to-br from-sky-100 via-white to-violet-100 px-4 py-3 rounded-2xl border-4 border-dashed border-sky-400 shadow-inner relative overflow-hidden w-full"
        style={{
          letterSpacing: '0.25em',
          backgroundImage:
            'repeating-linear-gradient(45deg, #e0f2fe 0, #e0f2fe 10px, #fdf4ff 10px, #fdf4ff 20px)',
        }}
      >
        <span className="text-violet-700 select-none font-bold tracking-widest drop-shadow-sm">
          {captcha}
        </span>
        <button type="button" onClick={refreshCaptcha}>
          <RefreshCw
            className={`w-6 h-6 text-sky-600 transition-transform duration-300 ${
              spin ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default FunnyCaptcha;
