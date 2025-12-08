/**
 * NEW SCREEN — CREATE ACCOUNT (SIGN UP)
 * User registration with Apple-Tahoe styling
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack, HStack } from '../../../design-system';
import { Mail, Lock, User, Building, ArrowRight, Check } from 'lucide-react';

export function SignUpPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeToTerms: false,
  });

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      relative overflow-hidden
    `}>
      {/* Tahoe Orbs */}
      <div className="tahoe-orb-primary" style={{ top: '-20%', right: '-10%' }} />
      <div className="tahoe-orb-secondary" style={{ bottom: '-15%', left: '-5%' }} />
      <div className="tahoe-orb-accent" style={{ top: '40%', right: '30%' }} />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          {/* Header */}
          <VStack gap={2} className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 rounded-2xl primary-gradient flex items-center justify-center mx-auto mb-4"
            >
              <Building className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className={`text-4xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Create Your Account
            </h1>
            <p className={`text-lg ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
              Join thousands of teams managing content seamlessly
            </p>
          </VStack>

          {/* Sign Up Form Card */}
          <div className="glass-panel-lg rounded-3xl p-8 mb-6">
            <VStack gap={6}>
              {/* Progress Indicator */}
              <HStack gap={2} justify="center" className="mb-4">
                {[1, 2].map((num) => (
                  <div
                    key={num}
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${num <= step ? 'bg-calypso w-12' : 'bg-neutral-300 dark:bg-neutral-700 w-8'}
                    `}
                  />
                ))}
              </HStack>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <VStack gap={4}>
                    {/* Full Name */}
                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Doe"
                          className={`
                            w-full pl-12 pr-4 py-3 rounded-xl
                            ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                            border-2 border-transparent focus:border-calypso
                            transition-all focus-ring
                          `}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className={`
                            w-full pl-12 pr-4 py-3 rounded-xl
                            ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                            border-2 border-transparent focus:border-calypso
                            transition-all focus-ring
                          `}
                        />
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Organization
                      </label>
                      <div className="relative">
                        <Building className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Acme Inc."
                          className={`
                            w-full pl-12 pr-4 py-3 rounded-xl
                            ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                            border-2 border-transparent focus:border-calypso
                            transition-all focus-ring
                          `}
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      className="w-full bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </VStack>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <VStack gap={4}>
                    {/* Password */}
                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Create a strong password"
                          className={`
                            w-full pl-12 pr-4 py-3 rounded-xl
                            ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                            border-2 border-transparent focus:border-calypso
                            transition-all focus-ring
                          `}
                        />
                      </div>
                      <p className={`mt-2 text-sm ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>
                        Must be at least 8 characters
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Confirm your password"
                          className={`
                            w-full pl-12 pr-4 py-3 rounded-xl
                            ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                            border-2 border-transparent focus:border-calypso
                            transition-all focus-ring
                          `}
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5
                        ${formData.agreeToTerms ? 'bg-calypso border-calypso' : 'border-neutral-300 dark:border-neutral-600'}
                      `}>
                        {formData.agreeToTerms && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-sm ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
                        I agree to the{' '}
                        <Link to="/terms" className="text-calypso hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-calypso hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="sr-only"
                      />
                    </label>

                    <HStack gap={3}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className={`
                          flex-1 py-4 rounded-xl font-medium transition-all
                          ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'}
                        `}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!formData.agreeToTerms}
                        className="flex-1 bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                      >
                        Create Account
                      </motion.button>
                    </HStack>

                    <button
                      onClick={() => setStep(1)}
                      className={`text-sm ${isDark ? 'text-white/50 hover:text-white/70' : 'text-neutral-500 hover:text-neutral-700'} transition-colors`}
                    >
                      ← Back to previous step
                    </button>
                  </VStack>
                </motion.div>
              )}
            </VStack>
          </div>

          {/* Footer */}
          <p className={`text-center ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-calypso font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
