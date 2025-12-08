/**
 * NEW SCREEN — CREATE NEW CAMPAIGN
 * Multi-step campaign creation with Apple-Tahoe styling
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack, HStack, Grid } from '../../../design-system';
import { 
  Rocket, Calendar, Target, Users, Image, FileText,
  Instagram, Facebook, Linkedin, Twitter, Mail, Globe,
  Plus, ArrowRight, ArrowLeft, Check
} from 'lucide-react';

export function CreateCampaignPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    goal: '',
    startDate: '',
    endDate: '',
    platforms: [] as string[],
    teamMembers: [] as string[],
    budget: '',
  });

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
    { id: 'email', name: 'Email', icon: Mail, color: '#F0B52B' },
    { id: 'website', name: 'Website', icon: Globe, color: '#95B730' },
  ];

  const goals = [
    { id: 'awareness', label: 'Brand Awareness', icon: Target },
    { id: 'engagement', label: 'Engagement', icon: Users },
    { id: 'traffic', label: 'Website Traffic', icon: Globe },
    { id: 'leads', label: 'Lead Generation', icon: FileText },
  ];

  const togglePlatform = (platformId: string) => {
    setCampaignData({
      ...campaignData,
      platforms: campaignData.platforms.includes(platformId)
        ? campaignData.platforms.filter(p => p !== platformId)
        : [...campaignData.platforms, platformId]
    });
  };

  return (
    <div className={`
      min-h-screen
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      py-8
    `}>
      <Container maxWidth="4xl">
        <VStack gap={8}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-2xl primary-gradient flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-5xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Create New Campaign
            </h1>
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
              Launch your next content campaign in minutes
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="glass-panel rounded-2xl p-6">
            <HStack gap={4} justify="center" wrap>
              {[
                { num: 1, label: 'Details' },
                { num: 2, label: 'Platforms' },
                { num: 3, label: 'Goals & Budget' },
                { num: 4, label: 'Team' }
              ].map((s) => (
                <HStack key={s.num} gap={2} align="center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                    ${step >= s.num
                      ? 'bg-calypso text-white'
                      : isDark
                      ? 'bg-white/10 text-white/40'
                      : 'bg-neutral-200 text-neutral-400'
                    }
                  `}>
                    {step > s.num ? <Check className="w-6 h-6" /> : s.num}
                  </div>
                  <span className={`hidden sm:inline ${step >= s.num ? isDark ? 'text-white' : 'text-neutral-900' : 'text-neutral-500'}`}>
                    {s.label}
                  </span>
                  {s.num < 4 && <div className={`hidden sm:block w-8 h-0.5 ${step > s.num ? 'bg-calypso' : 'bg-neutral-300 dark:bg-neutral-700'}`} />}
                </HStack>
              ))}
            </HStack>
          </div>

          {/* Step Content */}
          <div className="glass-panel-lg rounded-3xl p-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <VStack gap={6}>
                  <h2 className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Campaign Details
                  </h2>

                  <div>
                    <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Campaign Name *
                    </label>
                    <input
                      type="text"
                      value={campaignData.name}
                      onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                      placeholder="Summer Product Launch 2024"
                      className={`
                        w-full px-4 py-4 rounded-xl text-lg
                        ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                        border-2 border-transparent focus:border-calypso
                        transition-all focus-ring
                      `}
                    />
                  </div>

                  <div>
                    <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Description
                    </label>
                    <textarea
                      value={campaignData.description}
                      onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                      placeholder="Describe your campaign objectives and key messages..."
                      rows={5}
                      className={`
                        w-full px-4 py-4 rounded-xl resize-none
                        ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                        border-2 border-transparent focus:border-calypso
                        transition-all focus-ring
                      `}
                    />
                  </div>

                  <Grid columns={{ xs: 1, sm: 2 }} gap={4}>
                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={campaignData.startDate}
                        onChange={(e) => setCampaignData({ ...campaignData, startDate: e.target.value })}
                        className={`
                          w-full px-4 py-4 rounded-xl
                          ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                          border-2 border-transparent focus:border-calypso
                          transition-all focus-ring
                        `}
                      />
                    </div>

                    <div>
                      <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={campaignData.endDate}
                        onChange={(e) => setCampaignData({ ...campaignData, endDate: e.target.value })}
                        className={`
                          w-full px-4 py-4 rounded-xl
                          ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                          border-2 border-transparent focus:border-calypso
                          transition-all focus-ring
                        `}
                      />
                    </div>
                  </Grid>
                </VStack>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <VStack gap={6}>
                  <h2 className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Select Platforms
                  </h2>
                  <p className={isDark ? 'text-white/60' : 'text-neutral-600'}>
                    Choose which platforms this campaign will run on
                  </p>

                  <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap={4}>
                    {platforms.map((platform) => (
                      <motion.div
                        key={platform.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => togglePlatform(platform.id)}
                        className={`
                          p-6 rounded-2xl cursor-pointer transition-all relative
                          ${campaignData.platforms.includes(platform.id)
                            ? 'ring-4 ring-calypso ring-offset-4 ring-offset-background'
                            : isDark
                            ? 'bg-white/5 hover:bg-white/10'
                            : 'bg-neutral-50 hover:bg-neutral-100'
                          }
                        `}
                      >
                        {campaignData.platforms.includes(platform.id) && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-calypso flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                        
                        <VStack gap={3} align="center" className="text-center">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: platform.color + '20' }}
                          >
                            <platform.icon
                              className="w-8 h-8"
                              style={{ color: platform.color }}
                            />
                          </div>
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            {platform.name}
                          </span>
                        </VStack>
                      </motion.div>
                    ))}
                  </Grid>

                  {campaignData.platforms.length === 0 && (
                    <p className={`text-center py-8 ${isDark ? 'text-white/40' : 'text-neutral-400'}`}>
                      Select at least one platform to continue
                    </p>
                  )}
                </VStack>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <VStack gap={6}>
                  <h2 className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Goals & Budget
                  </h2>

                  <div>
                    <label className={`block mb-3 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Primary Goal
                    </label>
                    <Grid columns={{ xs: 1, sm: 2 }} gap={4}>
                      {goals.map((goal) => (
                        <motion.div
                          key={goal.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setCampaignData({ ...campaignData, goal: goal.id })}
                          className={`
                            p-6 rounded-2xl cursor-pointer transition-all
                            ${campaignData.goal === goal.id
                              ? 'bg-calypso text-white shadow-lg'
                              : isDark
                              ? 'bg-white/5 hover:bg-white/10 text-white'
                              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-900'
                            }
                          `}
                        >
                          <HStack gap={4} align="center">
                            <goal.icon className="w-8 h-8" />
                            <span className="font-medium text-lg">{goal.label}</span>
                          </HStack>
                        </motion.div>
                      ))}
                    </Grid>
                  </div>

                  <div>
                    <label className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Budget (Optional)
                    </label>
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${isDark ? 'text-white/40' : 'text-neutral-400'}`}>
                        $
                      </span>
                      <input
                        type="number"
                        value={campaignData.budget}
                        onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                        placeholder="5000"
                        className={`
                          w-full pl-10 pr-4 py-4 rounded-xl text-lg
                          ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-neutral-100 text-neutral-900 placeholder-neutral-400'}
                          border-2 border-transparent focus:border-calypso
                          transition-all focus-ring
                        `}
                      />
                    </div>
                  </div>
                </VStack>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <VStack gap={6}>
                  <h2 className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Add Team Members
                  </h2>
                  <p className={isDark ? 'text-white/60' : 'text-neutral-600'}>
                    Assign team members to this campaign
                  </p>

                  <div className={`p-8 rounded-2xl border-2 border-dashed ${isDark ? 'border-white/20' : 'border-neutral-300'} text-center`}>
                    <Plus className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                    <p className={`${isDark ? 'text-white/60' : 'text-neutral-600'} mb-4`}>
                      Add team members to collaborate on this campaign
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-pistachio text-white px-8 py-3 rounded-xl font-medium shadow-lg"
                    >
                      Add Team Members
                    </motion.button>
                  </div>

                  {/* Summary */}
                  <div className={`rounded-2xl p-6 ${isDark ? 'bg-white/5' : 'bg-neutral-50'}`}>
                    <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Campaign Summary
                    </h3>
                    <VStack gap={2}>
                      <HStack justify="between">
                        <span className={isDark ? 'text-white/60' : 'text-neutral-600'}>Name:</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>{campaignData.name || 'Not set'}</span>
                      </HStack>
                      <HStack justify="between">
                        <span className={isDark ? 'text-white/60' : 'text-neutral-600'}>Platforms:</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>{campaignData.platforms.length} selected</span>
                      </HStack>
                      <HStack justify="between">
                        <span className={isDark ? 'text-white/60' : 'text-neutral-600'}>Duration:</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {campaignData.startDate && campaignData.endDate ? `${campaignData.startDate} - ${campaignData.endDate}` : 'Not set'}
                        </span>
                      </HStack>
                    </VStack>
                  </div>
                </VStack>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <HStack gap={4} justify="between">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step - 1)}
                className={`
                  px-8 py-4 rounded-xl font-medium transition-all flex items-center gap-2
                  ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'}
                `}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => step < 4 ? setStep(step + 1) : null}
              disabled={
                (step === 1 && !campaignData.name) ||
                (step === 2 && campaignData.platforms.length === 0)
              }
              className={`
                ${step === 1 ? 'ml-auto' : ''}
                px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all
                flex items-center gap-2
                ${step === 4
                  ? 'bg-pistachio text-white'
                  : 'bg-calypso text-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {step === 4 ? (
                <>
                  <Rocket className="w-5 h-5" />
                  Launch Campaign
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </HStack>
        </VStack>
      </Container>
    </div>
  );
}
