/**
 * NEW SCREEN — USER PROFILE PAGE
 * Complete user profile with settings in Apple-Tahoe style
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { Container, VStack, HStack, Grid } from '../../../design-system';
import { 
  User, Mail, Building, Calendar, MapPin, Link as LinkIcon,
  Edit, Camera, Save, X, Bell, Shield, Palette, Globe
} from 'lucide-react';

export function UserProfilePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'Content Manager',
    organization: 'Acme Inc.',
    location: 'San Francisco, CA',
    website: 'sarahchen.com',
    bio: 'Content strategist passionate about creating engaging digital experiences. 5+ years in content marketing.',
    joinedDate: 'January 2024',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const stats = [
    { label: 'Posts Created', value: '247', change: '+12' },
    { label: 'Campaigns', value: '32', change: '+5' },
    { label: 'Team Members', value: '8', change: '0' },
    { label: 'Engagement', value: '4.8%', change: '+0.3' },
  ];

  return (
    <div className={`
      min-h-screen
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
      relative
    `}>
      <Container maxWidth="6xl" className="py-8">
        <VStack gap={6}>
          {/* Header Card with Cover & Avatar */}
          <div className="glass-panel-lg rounded-3xl overflow-hidden">
            {/* Cover Image */}
            <div className="h-48 primary-gradient relative">
              <div className="tahoe-orb-secondary" style={{ top: '-30%', right: '20%' }} />
              <div className="tahoe-orb-accent" style={{ bottom: '-40%', left: '30%' }} />
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 relative z-10">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-3xl bg-white dark:bg-neutral-800 p-2 shadow-2xl">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-calypso to-pistachio flex items-center justify-center text-white text-4xl font-semibold">
                      SC
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-xl bg-calypso text-white flex items-center justify-center shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Name & Stats */}
                <div className="flex-1">
                  <VStack gap={2}>
                    <HStack justify="between" align="start" wrap className="w-full">
                      <VStack gap={1}>
                        <h1 className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {profileData.name}
                        </h1>
                        <p className={`${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                          {profileData.role} at {profileData.organization}
                        </p>
                      </VStack>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className={`
                          px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
                          ${isEditing
                            ? isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'
                            : 'bg-calypso text-white shadow-lg'
                          }
                        `}
                      >
                        {isEditing ? (
                          <>
                            <X className="w-5 h-5" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Edit className="w-5 h-5" />
                            Edit Profile
                          </>
                        )}
                      </motion.button>
                    </HStack>

                    {/* Quick Stats */}
                    <Grid columns={{ xs: 2, sm: 4 }} gap={4} className="mt-4">
                      {stats.map((stat, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-neutral-50'}`}
                        >
                          <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            {stat.value}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                            {stat.label}
                          </p>
                          {stat.change !== '0' && (
                            <span className={`text-xs ${stat.change.startsWith('+') ? 'text-pistachio' : 'text-red-500'}`}>
                              {stat.change} this month
                            </span>
                          )}
                        </div>
                      ))}
                    </Grid>
                  </VStack>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass-panel rounded-2xl p-2">
            <HStack gap={2} wrap>
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 min-w-[140px] px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2
                    ${activeTab === tab.id
                      ? 'bg-calypso text-white shadow-lg'
                      : isDark
                      ? 'text-white/60 hover:bg-white/10'
                      : 'text-neutral-600 hover:bg-neutral-100'
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              ))}
            </HStack>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <Grid columns={{ xs: 1, lg: 2 }} gap={6}>
              {/* Profile Information */}
              <div className="glass-panel-lg rounded-2xl p-6">
                <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Profile Information
                </h2>
                
                <VStack gap={4}>
                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                        ${isEditing ? 'border-2 border-calypso' : 'border-2 border-transparent'}
                        transition-all focus-ring
                      `}
                    />
                  </div>

                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      Email
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                      <input
                        type="email"
                        value={profileData.email}
                        disabled={!isEditing}
                        className={`
                          w-full pl-12 pr-4 py-3 rounded-xl
                          ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                          border-2 border-transparent
                        `}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      Role
                    </label>
                    <div className="relative">
                      <Building className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                      <input
                        type="text"
                        value={profileData.role}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                        className={`
                          w-full pl-12 pr-4 py-3 rounded-xl
                          ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                          ${isEditing ? 'border-2 border-calypso' : 'border-2 border-transparent'}
                          transition-all focus-ring
                        `}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                      <input
                        type="text"
                        value={profileData.location}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className={`
                          w-full pl-12 pr-4 py-3 rounded-xl
                          ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                          ${isEditing ? 'border-2 border-calypso' : 'border-2 border-transparent'}
                          transition-all focus-ring
                        `}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      Website
                    </label>
                    <div className="relative">
                      <LinkIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-neutral-400'}`} />
                      <input
                        type="text"
                        value={profileData.website}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className={`
                          w-full pl-12 pr-4 py-3 rounded-xl
                          ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                          ${isEditing ? 'border-2 border-calypso' : 'border-2 border-transparent'}
                          transition-all focus-ring
                        `}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-calypso text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </motion.button>
                  )}
                </VStack>
              </div>

              {/* Bio & Activity */}
              <VStack gap={6}>
                {/* Bio */}
                <div className="glass-panel-lg rounded-2xl p-6">
                  <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    About
                  </h2>
                  <textarea
                    value={profileData.bio}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={5}
                    className={`
                      w-full px-4 py-3 rounded-xl resize-none
                      ${isDark ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-900'}
                      ${isEditing ? 'border-2 border-calypso' : 'border-2 border-transparent'}
                      transition-all focus-ring
                    `}
                  />
                </div>

                {/* Account Info */}
                <div className="glass-panel-lg rounded-2xl p-6">
                  <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Account Info
                  </h2>
                  <VStack gap={3}>
                    <HStack justify="between">
                      <span className={isDark ? 'text-white/60' : 'text-neutral-600'}>
                        Member since
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {profileData.joinedDate}
                      </span>
                    </HStack>
                    <HStack justify="between">
                      <span className={isDark ? 'text-white/60' : 'text-neutral-600'}>
                        Organization
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {profileData.organization}
                      </span>
                    </HStack>
                    <HStack justify="between">
                      <span className={isDark ? 'text-white/60' : 'text-neutral-600'}>
                        Account Type
                      </span>
                      <span className="px-3 py-1 rounded-full bg-calypso/20 text-calypso text-sm font-medium">
                        Pro Plan
                      </span>
                    </HStack>
                  </VStack>
                </div>
              </VStack>
            </Grid>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-panel-lg rounded-2xl p-6">
              <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Notification Preferences
              </h2>
              <VStack gap={4}>
                {['Email notifications', 'Push notifications', 'Task reminders', 'Content updates', 'Team mentions'].map((item) => (
                  <HStack key={item} justify="between" className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-neutral-50'}`}>
                    <span className={isDark ? 'text-white' : 'text-neutral-900'}>{item}</span>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-6 bg-neutral-300 dark:bg-neutral-700 peer-checked:bg-calypso rounded-full peer transition-all"></div>
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-6 transition-all"></div>
                    </label>
                  </HStack>
                ))}
              </VStack>
            </div>
          )}
        </VStack>
      </Container>
    </div>
  );
}
