/**
 * NEW SCREEN — RESET PASSWORD
 * Password reset form with Apple-Tahoe styling
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack } from '../../../design-system';
import { Lock, Check, Eye, EyeOff } from 'lucide-react';

export function ResetPasswordPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const passwordStrength = formData.password.length >= 8 ? 'strong' : formData.password.length >= 6 ? 'medium' : 'weak';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword && formData.password.length >= 8) {
      setIsSubmitted(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      relative overflow-hidden
    `}>
      {/* Tahoe Orbs */}
      <div className="tahoe-orb-accent" style={{ top: '-15%', right: '-10%' }} />
      <div className="tahoe-orb-primary" style={{ bottom: '-20%', left: '-5%' }} />

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
                  className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-4"
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className={`text-4xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Reset Password
                </h1>
                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  Create a new secure password
                </p>
              </VStack>

              {/* Form Card */}
              <form onSubmit={handleSubmit} className="glass-panel-lg rounded-3xl p-8 mb-6">
                <VStack gap={6}>
                  {/* New Password */}
                  <div>
                    <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter new password"
                        required
                        className={`
                          w-full pl-12 pr-12 py-3 rounded-xl
                          ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                          border-2 border-transparent focus:border-calypso
                          transition-all focus-ring
                        `}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40 hover:text-white/60' : 'text-neutral-400 hover:text-neutral-600'}`}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3">
                        <div className="flex gap-1 mb-2">
                          <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-tulip' : 'bg-pistachio'}`} />
                          <div className={`h-1 flex-1 rounded ${passwordStrength === 'medium' || passwordStrength === 'strong' ? passwordStrength === 'medium' ? 'bg-tulip' : 'bg-pistachio' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                          <div className={`h-1 flex-1 rounded ${passwordStrength === 'strong' ? 'bg-pistachio' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                        </div>
                        <p className={`text-sm ${passwordStrength === 'weak' ? 'text-red-500' : passwordStrength === 'medium' ? 'text-tulip' : 'text-pistachio'}`}>
                          Password strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        required
                        className={`
                          w-full pl-12 pr-12 py-3 rounded-xl
                          ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                          border-2 border-transparent focus:border-calypso
                          transition-all focus-ring
                        `}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/40 hover:text-white/60' : 'text-neutral-400 hover:text-neutral-600'}`}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="mt-2 text-sm text-red-500">Passwords don't match</p>
                    )}
                  </div>

                  {/* Requirements */}
                  <div className={`rounded-xl p-4 ${isDark ? 'bg-white/5' : 'bg-neutral-50'}`}>
                    <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Password requirements:
                    </p>
                    <VStack gap={1}>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className={`w-4 h-4 ${formData.password.length >= 8 ? 'text-pistachio' : 'text-neutral-400'}`} />
                        <span className={isDark ? 'text-white/70' : 'text-neutral-600'}>At least 8 characters</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className={`w-4 h-4 ${/[A-Z]/.test(formData.password) ? 'text-pistachio' : 'text-neutral-400'}`} />
                        <span className={isDark ? 'text-white/70' : 'text-neutral-600'}>One uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className={`w-4 h-4 ${/[0-9]/.test(formData.password) ? 'text-pistachio' : 'text-neutral-400'}`} />
                        <span className={isDark ? 'text-white/70' : 'text-neutral-600'}>One number</span>
                      </div>
                    </VStack>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formData.password !== formData.confirmPassword || formData.password.length < 8}
                    className="w-full bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reset Password
                  </motion.button>
                </VStack>
              </form>
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
                  Password Reset!
                </h1>
                
                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  Your password has been successfully reset
                </p>

                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>
                  Redirecting to login...
                </p>
              </VStack>
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
