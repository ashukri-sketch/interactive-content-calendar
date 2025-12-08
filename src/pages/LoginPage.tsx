/**
 * PAGE 1 — LOGIN
 * Animated gradient background with login form
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, rememberMe);
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background - Tahoe Style */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.45, 0.6, 0.45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-primary"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.45, 0.6, 0.45],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-secondary"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.45, 0.6, 0.45],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl bg-gradient-accent"
        />
        
      {/* Blur Overlay */}
      <div 
        className={`absolute inset-0 backdrop-blur-3xl ${
          isDark ? 'bg-[#050609]/70' : 'bg-[#f7f7f7]/35'
        }`}
      />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className={`
          p-8 rounded-3xl backdrop-blur-3xl border shadow-2xl
          ${isDark
            ? 'bg-[rgba(15,18,24,0.9)] border-white/20'
            : 'bg-[rgba(255,255,255,0.9)] border-white/80'
          }
        `}>
          {/* Logo */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-calypso to-calypso-600 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Welcome Back
            </h1>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
              Sign in to your content calendar
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email Field */}
            <div>
              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className={`
                    w-full pl-11 pr-4 py-3 rounded-xl
                    ${isDark
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
              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`
                    w-full pl-11 pr-11 py-3 rounded-xl
                    ${isDark
                      ? 'bg-white/10 border border-white/20 text-white placeholder-white/40'
                      : 'bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400'
                    }
                    outline-none focus:ring-2 focus:ring-calypso transition-all
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40 hover:text-white/60' : 'text-neutral-400 hover:text-neutral-600'}`}
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
                <span className={`text-sm ${isDark ? 'text-white/70' : 'text-neutral-700'}`}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className={`text-sm font-medium ${isDark ? 'text-calypso-600 hover:text-calypso' : 'text-calypso hover:text-calypso/80'}`}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="
                w-full py-3 rounded-xl font-medium
                bg-gradient-to-r from-calypso to-calypso-600 hover:opacity-90
                text-white transition-all shadow-lg hover:shadow-xl
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${isDark ? 'border-white/20' : 'border-neutral-300'}`} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className={`px-2 ${isDark ? 'bg-[rgba(15,18,24,0.9)] text-white/60' : 'bg-[rgba(255,255,255,0.9)] text-neutral-500'}`}>
                OR
              </span>
            </div>
          </div>

          {/* SSO Option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full py-3 px-4 rounded-xl font-medium
              flex items-center justify-center gap-2
              ${isDark
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300'
              }
              transition-all
            `}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            Continue with SSO
          </motion.button>

          {/* Sign Up Link */}
          <p className={`text-center text-sm mt-6 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
            Don't have an account?{' '}
            <button className={`font-medium ${isDark ? 'text-calypso-600 hover:text-calypso' : 'text-calypso hover:text-calypso/80'}`}>
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}