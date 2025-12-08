/**
 * NEW SCREEN — ONBOARDING: WELCOME
 * Step 1 of onboarding flow with Apple-Tahoe styling
 */

import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack, HStack } from '../../../design-system';
import { Calendar, Users, BarChart3, Zap, ArrowRight } from 'lucide-react';

interface OnboardingWelcomeProps {
  onNext: () => void;
}

export function OnboardingWelcome({ onNext }: OnboardingWelcomeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const features = [
    {
      icon: Calendar,
      title: 'Content Calendar',
      description: 'Plan and schedule content across all platforms',
      gradient: 'primary-gradient',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with your team',
      gradient: 'secondary-gradient',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track performance and measure success',
      gradient: 'accent-gradient',
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Streamline your content creation process',
      gradient: 'primary-gradient',
    },
  ];

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      relative overflow-hidden
    `}>
      {/* Tahoe Orbs */}
      <div className="tahoe-orb-primary" style={{ top: '-20%', right: '-10%' }} />
      <div className="tahoe-orb-secondary" style={{ bottom: '-15%', left: '-5%' }} />
      <div className="tahoe-orb-accent" style={{ top: '50%', left: '20%' }} />

      <Container maxWidth="5xl">
        <div className="relative z-10">
          <VStack gap={12}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 rounded-3xl primary-gradient flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <Calendar className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className={`text-6xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Welcome to ContentHub
              </h1>
              
              <p className={`text-2xl ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                Your all-in-one content management platform
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-panel-lg rounded-2xl p-6 card-lift"
                >
                  <HStack gap={4} align="start">
                    <div className={`w-14 h-14 rounded-xl ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <VStack gap={1}>
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {feature.title}
                      </h3>
                      <p className={`${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                        {feature.description}
                      </p>
                    </VStack>
                  </HStack>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="bg-calypso text-white px-12 py-5 rounded-2xl font-medium shadow-2xl hover:shadow-calypso/30 transition-all text-lg inline-flex items-center gap-3"
              >
                Get Started
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              
              <p className={`mt-6 text-sm ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>
                Takes less than 2 minutes to set up
              </p>
            </motion.div>
          </VStack>
        </div>
      </Container>
    </div>
  );
}
