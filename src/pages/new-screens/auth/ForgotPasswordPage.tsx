/**
 * NEW SCREEN — FORGOT PASSWORD
 * Password reset request with Apple-Tahoe styling
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack } from '../../../design-system';
import { Mail, ArrowLeft, Check } from 'lucide-react';

export function ForgotPasswordPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      relative overflow-hidden
    `}>
      {/* Tahoe Orbs */}
      <div className="tahoe-orb-primary" style={{ top: '-20%', right: '-10%' }} />
      <div className="tahoe-orb-secondary" style={{ bottom: '-15%', left: '-5%' }} />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          {!isSubmitted ? (
            <>
              {/* Header */}
              <VStack gap={2} className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 rounded-2xl secondary-gradient flex items-center justify-center mx-auto mb-4"
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className={`text-4xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Forgot Password?
                </h1>
                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  No worries, we'll send you reset instructions
                </p>
              </VStack>

              {/* Form Card */}
              <form onSubmit={handleSubmit} className="glass-panel-lg rounded-3xl p-8 mb-6">
                <VStack gap={6}>
                  {/* Email Input */}
                  <div>
                    <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className={`
                          w-full pl-12 pr-4 py-3 rounded-xl
                          ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                          border-2 border-transparent focus:border-calypso
                          transition-all focus-ring
                        `}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Send Reset Link
                  </motion.button>
                </VStack>
              </form>

              {/* Back to Login */}
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className={`
                    w-full flex items-center justify-center gap-2 py-3
                    ${isDark ? 'text-white/70 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}
                    transition-colors
                  `}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Login
                </motion.button>
              </Link>
            </>
          ) : (
            <>
              {/* Success State */}
              <VStack gap={4} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-pistachio flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                
                <h1 className={`text-4xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Check Your Email
                </h1>
                
                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  We've sent password reset instructions to
                </p>
                
                <p className="text-calypso font-medium text-lg">
                  {email}
                </p>
                
                <div className={`glass-panel rounded-2xl p-6 mt-4 ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
                  <p className="text-sm">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-calypso font-medium hover:underline"
                    >
                      try another email address
                    </button>
                  </p>
                </div>

                <Link to="/login" className="w-full mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Back to Login
                  </motion.button>
                </Link>
              </VStack>
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
