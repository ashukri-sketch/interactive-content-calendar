/**
 * NEW SCREEN — ONBOARDING: INVITE TEAM
 * Step 3 of onboarding flow with Apple-Tahoe styling
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack, HStack } from '../../../design-system';
import { Mail, Plus, X, ArrowRight, ArrowLeft, UserPlus } from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  role: string;
}

interface OnboardingInviteTeamProps {
  onNext: (members: TeamMember[]) => void;
  onBack: () => void;
  onSkip: () => void;
}

export function OnboardingInviteTeam({ onNext, onBack, onSkip }: OnboardingInviteTeamProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('editor');
  const [members, setMembers] = useState<TeamMember[]>([]);

  const roles = [
    { value: 'editor', label: 'Editor' },
    { value: 'copywriter', label: 'Copywriter' },
    { value: 'manager', label: 'Manager' },
    { value: 'viewer', label: 'Viewer' },
  ];

  const addMember = () => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setMembers([...members, { id: Date.now().toString(), email, role: selectedRole }]);
      setEmail('');
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      relative overflow-hidden
    `}>
      {/* Tahoe Orbs */}
      <div className="tahoe-orb-accent" style={{ top: '-20%', left: '-5%' }} />
      <div className="tahoe-orb-secondary" style={{ bottom: '-15%', right: '-10%' }} />

      <Container maxWidth="3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <VStack gap={8}>
            {/* Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-2xl secondary-gradient flex items-center justify-center mx-auto mb-6"
              >
                <UserPlus className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className={`text-5xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Invite Your Team
              </h1>
              <p className={`text-xl ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                Collaboration is better together. Add team members now or skip for later.
              </p>
            </div>

            {/* Progress Indicator */}
            <HStack gap={2} justify="center">
              <div className="h-2 w-12 rounded-full bg-calypso" />
              <div className="h-2 w-12 rounded-full bg-calypso" />
              <div className="h-2 w-12 rounded-full bg-calypso" />
              <div className="h-2 w-8 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </HStack>

            {/* Invite Form */}
            <div className="glass-panel-lg rounded-3xl p-8">
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
                      onKeyPress={(e) => e.key === 'Enter' && addMember()}
                      placeholder="colleague@company.com"
                      className={`
                        w-full pl-12 pr-4 py-3 rounded-xl
                        ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                        border-2 border-transparent focus:border-calypso
                        transition-all focus-ring
                      `}
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Role
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {roles.map((role) => (
                      <motion.button
                        key={role.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRole(role.value)}
                        className={`
                          px-4 py-3 rounded-xl font-medium transition-all
                          ${selectedRole === role.value
                            ? 'bg-calypso text-white shadow-lg'
                            : isDark
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                          }
                        `}
                      >
                        {role.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Add Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addMember}
                  disabled={!email || !/\S+@\S+\.\S+/.test(email)}
                  className="w-full bg-pistachio text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Team Member
                </motion.button>

                {/* Member List */}
                {members.length > 0 && (
                  <VStack gap={3} className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Invited Members ({members.length})
                    </h3>
                    
                    {members.map((member) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`
                          p-4 rounded-xl flex items-center justify-between
                          ${isDark ? 'bg-white/5' : 'bg-neutral-50'}
                        `}
                      >
                        <HStack gap={3} align="center">
                          <div className="w-10 h-10 rounded-full bg-calypso text-white flex items-center justify-center font-medium">
                            {member.email.charAt(0).toUpperCase()}
                          </div>
                          <VStack gap={0}>
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                              {member.email}
                            </span>
                            <span className={`text-sm ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </span>
                          </VStack>
                        </HStack>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeMember(member.id)}
                          className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-neutral-200 text-neutral-600'}`}
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </VStack>
                )}
              </VStack>
            </div>

            {/* Navigation */}
            <HStack gap={4} justify="center" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className={`
                  px-8 py-4 rounded-xl font-medium transition-all flex items-center gap-2
                  ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'}
                `}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSkip}
                className={`
                  px-8 py-4 rounded-xl font-medium transition-all
                  ${isDark ? 'text-white/60 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}
                `}
              >
                Skip for now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNext(members)}
                className="px-8 bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
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
