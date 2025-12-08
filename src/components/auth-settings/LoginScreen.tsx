/**
 * AUTH & SETTINGS - Login Screen
 * Apple-style login UI with animated background
 */

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
  darkMode: boolean;
}

export function LoginScreen({ onLogin, darkMode }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, rememberMe);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-calypso/30 to-calypso-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pistachio/30 to-tulip/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-calypso-600/20 to-pistachio/20 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Blur overlay */}
        <div className={`absolute inset-0 backdrop-blur-3xl ${darkMode ? 'bg-neutral-900/80' : 'bg-alto-50/80'}`} />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className={`
          p-8 rounded-3xl
          backdrop-blur-3xl border shadow-2xl
          ${darkMode
            ? 'bg-white/10 border-white/20'
            : 'bg-white/60 border-white/80'
          }
        `}>
          {/* Logo / Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-calypso to-calypso-600 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Welcome Back
            </h1>
            <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              Sign in to your content calendar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className={`
                text-sm font-medium mb-2 block
                ${darkMode ? 'text-white/80' : 'text-neutral-700'}
              `}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-white/40' : 'text-neutral-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className={`
                    w-full pl-11 pr-4 py-3 rounded-xl
                    ${darkMode
                      ? 'bg-white/10 border border-white/20 text-white placeholder-white/40'
                      : 'bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400'
                    }
                    outline-none focus:ring-2 focus:ring-calypso transition-all
                  `}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`
                text-sm font-medium mb-2 block
                ${darkMode ? 'text-white/80' : 'text-neutral-700'}
              `}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-white/40' : 'text-neutral-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`
                    w-full pl-11 pr-11 py-3 rounded-xl
                    ${darkMode
                      ? 'bg-white/10 border border-white/20 text-white placeholder-white/40'
                      : 'bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400'
                    }
                    outline-none focus:ring-2 focus:ring-calypso transition-all
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-white/40 hover:text-white/60' : 'text-neutral-400 hover:text-neutral-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-calypso text-calypso focus:ring-calypso"
                />
                <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-neutral-700'}`}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className={`text-sm font-medium ${darkMode ? 'text-calypso-600 hover:text-calypso' : 'text-calypso hover:text-calypso/80'}`}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-medium
                bg-calypso hover:bg-calypso/90 text-white
                transition-all shadow-lg hover:shadow-xl
                active:scale-98
              "
            >
              Continue
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center ${darkMode ? 'text-white/20' : 'text-neutral-300'}`}>
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className={`px-2 ${darkMode ? 'bg-white/10 text-white/60' : 'bg-white/60 text-neutral-500'}`}>
                OR
              </span>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <button className={`
              w-full py-3 px-4 rounded-xl font-medium
              flex items-center justify-center gap-2
              ${darkMode
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300'
              }
              transition-all
            `}>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              Continue with SSO
            </button>
          </div>

          {/* Sign Up Link */}
          <p className={`text-center text-sm mt-6 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            Don't have an account?{' '}
            <button className={`font-medium ${darkMode ? 'text-calypso-600 hover:text-calypso' : 'text-calypso hover:text-calypso/80'}`}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
