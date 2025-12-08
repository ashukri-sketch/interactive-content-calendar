/**
 * NEW SCREEN — ONBOARDING: CHOOSE ROLE
 * Step 2 of onboarding flow with Apple-Tahoe styling
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack, HStack } from '../../../design-system';
import { Edit3, Pen, Shield, Users, Check, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingRoleProps {
  onNext: (role: string) => void;
  onBack: () => void;
}

export function OnboardingRole({ onNext, onBack }: OnboardingRoleProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'editor',
      icon: Edit3,
      title: 'Editor',
      description: 'Review and approve content before publishing',
      color: 'calypso',
      gradient: 'primary-gradient',
      permissions: ['Review content', 'Approve posts', 'Edit calendar', 'View analytics']
    },
    {
      id: 'copywriter',
      icon: Pen,
      title: 'Copywriter',
      description: 'Create and draft content for all platforms',
      color: 'pistachio',
      gradient: 'secondary-gradient',
      permissions: ['Create content', 'Draft posts', 'Edit drafts', 'Collaborate']
    },
    {
      id: 'manager',
      icon: Users,
      title: 'Manager',
      description: 'Oversee team activities and manage workflows',
      color: 'tulip',
      gradient: 'accent-gradient',
      permissions: ['Manage team', 'Assign tasks', 'View reports', 'Full access']
    },
    {
      id: 'admin',
      icon: Shield,
      title: 'Admin',
      description: 'Full system access and configuration control',
      color: 'calypso',
      gradient: 'primary-gradient',
      permissions: ['Full access', 'System settings', 'User management', 'Billing']
    },
  ];

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      relative overflow-hidden
    `}>
      {/* Tahoe Orbs */}
      <div className="tahoe-orb-secondary" style={{ top: '-15%', right: '-5%' }} />
      <div className="tahoe-orb-primary" style={{ bottom: '-20%', left: '-10%' }} />

      <Container maxWidth="6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <VStack gap={8}>
            {/* Header */}
            <div className="text-center">
              <h1 className={`text-5xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                What's your role?
              </h1>
              <p className={`text-xl ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                We'll customize your experience based on your needs
              </p>
            </div>

            {/* Progress Indicator */}
            <HStack gap={2} justify="center">
              <div className="h-2 w-12 rounded-full bg-calypso" />
              <div className="h-2 w-12 rounded-full bg-calypso" />
              <div className="h-2 w-8 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="h-2 w-8 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </HStack>

            {/* Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelectedRole(role.id)}
                  className={`
                    glass-panel-lg rounded-2xl p-6 cursor-pointer transition-all relative
                    ${selectedRole === role.id ? 'ring-4 ring-calypso ring-offset-4 ring-offset-background scale-105' : 'hover:scale-102'}
                  `}
                >
                  {/* Selection Indicator */}
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-calypso flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  )}

                  <VStack gap={4}>
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl ${role.gradient} flex items-center justify-center`}>
                      <role.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title & Description */}
                    <VStack gap={2}>
                      <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {role.title}
                      </h3>
                      <p className={`${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                        {role.description}
                      </p>
                    </VStack>

                    {/* Permissions */}
                    <VStack gap={2} className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
                      {role.permissions.map((permission, i) => (
                        <HStack key={i} gap={2} align="center">
                          <Check className={`w-4 h-4 text-${role.color}`} />
                          <span className={`text-sm ${isDark ? 'text-white/70' : 'text-neutral-700'}`}>
                            {permission}
                          </span>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <HStack gap={4} justify="center" className="w-full max-w-md mx-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className={`
                  flex-1 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2
                  ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'}
                `}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>
              
              <motion.button
                whileHover={{ scale: selectedRole ? 1.02 : 1 }}
                whileTap={{ scale: selectedRole ? 0.98 : 1 }}
                onClick={() => selectedRole && onNext(selectedRole)}
                disabled={!selectedRole}
                className="flex-1 bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </HStack>
          </VStack>
        </motion.div>
      </Container>
    </div>
  );
}
