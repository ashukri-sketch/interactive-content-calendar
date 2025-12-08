import { useState } from 'react';
import { HamburgerMenuSystem } from './HamburgerMenuSystem';
import { SAMPLE_TEAM } from './TeamDirectoryPanel';
import { ArrowLeft, Info } from 'lucide-react';

interface HamburgerMenuShowcaseProps {
  darkMode: boolean;
  onBack?: () => void;
}

export function HamburgerMenuShowcase({ darkMode, onBack }: HamburgerMenuShowcaseProps) {
  const [variant1, setVariant1] = useState<'collapsed' | 'expanded'>('collapsed');
  const [variant2, setVariant2] = useState<'collapsed' | 'expanded'>('collapsed');
  const [themeDemo, setThemeDemo] = useState<'light' | 'dark'>('light');

  const sampleUser = {
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    role: 'Content Lead'
  };

  return (
    <div className={`
      min-h-screen p-8
      ${darkMode 
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }
    `}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className={`
                p-3 rounded-2xl transition-all backdrop-blur-xl border shadow-lg
                ${darkMode
                  ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  : 'bg-white/60 border-white/80 hover:bg-white/80 text-neutral-700'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
              Interactive Hamburger Menu System
            </h1>
            <p className={darkMode ? 'text-white/60' : 'text-neutral-600'}>
              Component variants: Button ←→ Slide-Out Panel
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className={`
          rounded-3xl p-6 backdrop-blur-3xl border
          ${darkMode
            ? 'bg-blue-500/10 border-blue-500/30'
            : 'bg-blue-100/60 border-blue-200'
          }
        `}>
          <div className="flex items-start gap-4">
            <Info className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                Interactive Component Variants
              </h3>
              <p className={`text-sm ${darkMode ? 'text-blue-200/80' : 'text-blue-800'}`}>
                The hamburger menu button and slide-out panel are linked as interactive variants. 
                Click the button to toggle between collapsed and expanded states. The system manages 
                state transitions, animations, and accessibility automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Variant States Overview */}
        <div className={`
          rounded-3xl p-6 backdrop-blur-3xl border
          ${darkMode
            ? 'bg-white/10 border-white/20'
            : 'bg-white/60 border-white/80'
          }
        `}>
          <h2 className={`mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Variant States
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Collapsed variant */}
            <VariantCard
              title="Collapsed Variant"
              description="Default state - button only visible"
              darkMode={darkMode}
              features={[
                'Hamburger icon (3 lines)',
                'Hover glow effect',
                'Panel hidden off-screen',
                'No backdrop overlay'
              ]}
            />

            {/* Expanded variant */}
            <VariantCard
              title="Expanded Variant"
              description="Active state - panel visible"
              darkMode={darkMode}
              features={[
                'X icon (close)',
                'Button rotates 90°',
                'Panel slides in from left',
                'Backdrop overlay active',
                'Active indicator dot'
              ]}
            />
          </div>
        </div>

        {/* Live Demos */}
        <div className="space-y-8">
          <h2 className={`${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Live Interactive Demos
          </h2>

          {/* Demo 1: Standard Interaction */}
          <DemoSection
            title="Demo 1: Standard Interaction"
            description="Click the hamburger button to toggle the panel. The button icon morphs and rotates."
            darkMode={darkMode}
          >
            <div className="relative h-96 overflow-hidden">
              <HamburgerMenuSystem
                darkMode={darkMode}
                currentUser={sampleUser}
                teamMembers={SAMPLE_TEAM}
                variant={variant1}
                onVariantChange={setVariant1}
                onNavigate={(page) => console.log('Navigate to:', page)}
                onMemberClick={(member) => console.log('Member clicked:', member.name)}
                onLogout={() => console.log('Logout clicked')}
              />

              {/* State indicator */}
              <div className={`
                absolute top-4 right-4 px-4 py-2 rounded-xl backdrop-blur-xl border
                ${darkMode
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/60 border-white/80 text-neutral-900'
                }
              `}>
                State: <strong>{variant1}</strong>
              </div>
            </div>
          </DemoSection>

          {/* Demo 2: Programmatic Control */}
          <DemoSection
            title="Demo 2: Programmatic Control"
            description="Use buttons to control the variant state programmatically."
            darkMode={darkMode}
          >
            <div className="space-y-4">
              {/* Control buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setVariant2('collapsed')}
                  className={`
                    px-4 py-2 rounded-xl transition-all
                    ${variant2 === 'collapsed'
                      ? darkMode
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-white/10 text-white/70 hover:bg-white/20'
                      : 'bg-white/60 text-neutral-700 hover:bg-white/90'
                    }
                  `}
                >
                  Set to Collapsed
                </button>
                <button
                  onClick={() => setVariant2('expanded')}
                  className={`
                    px-4 py-2 rounded-xl transition-all
                    ${variant2 === 'expanded'
                      ? darkMode
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-white/10 text-white/70 hover:bg-white/20'
                      : 'bg-white/60 text-neutral-700 hover:bg-white/90'
                    }
                  `}
                >
                  Set to Expanded
                </button>
              </div>

              {/* Demo area */}
              <div className="relative h-96 overflow-hidden">
                <HamburgerMenuSystem
                  darkMode={darkMode}
                  currentUser={sampleUser}
                  teamMembers={SAMPLE_TEAM}
                  variant={variant2}
                  onVariantChange={setVariant2}
                  onNavigate={(page) => console.log('Navigate to:', page)}
                  onMemberClick={(member) => console.log('Member clicked:', member.name)}
                  onLogout={() => console.log('Logout clicked')}
                />
              </div>
            </div>
          </DemoSection>

          {/* Demo 3: Theme Variants */}
          <DemoSection
            title="Demo 3: Theme Variants"
            description="Toggle between light and dark themes to see styling variants."
            darkMode={darkMode}
          >
            <div className="space-y-4">
              {/* Theme toggle */}
              <div className="flex gap-3">
                <button
                  onClick={() => setThemeDemo('light')}
                  className={`
                    px-4 py-2 rounded-xl transition-all
                    ${themeDemo === 'light'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/60 text-neutral-700 hover:bg-white/90'
                    }
                  `}
                >
                  Light Theme
                </button>
                <button
                  onClick={() => setThemeDemo('dark')}
                  className={`
                    px-4 py-2 rounded-xl transition-all
                    ${themeDemo === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-700 text-white hover:bg-neutral-600'
                    }
                  `}
                >
                  Dark Theme
                </button>
              </div>

              {/* Demo area with theme */}
              <div className={`
                relative h-96 overflow-hidden rounded-2xl
                ${themeDemo === 'dark'
                  ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900'
                  : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
                }
              `}>
                <HamburgerMenuSystem
                  darkMode={themeDemo === 'dark'}
                  currentUser={sampleUser}
                  teamMembers={SAMPLE_TEAM}
                  variant="collapsed"
                  onVariantChange={() => {}}
                  onNavigate={(page) => console.log('Navigate to:', page)}
                  onMemberClick={(member) => console.log('Member clicked:', member.name)}
                  onLogout={() => console.log('Logout clicked')}
                />
              </div>
            </div>
          </DemoSection>
        </div>

        {/* Technical Specifications */}
        <div className={`
          rounded-3xl p-6 backdrop-blur-3xl border
          ${darkMode
            ? 'bg-white/10 border-white/20'
            : 'bg-white/60 border-white/80'
          }
        `}>
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Technical Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpecCard
              title="Animation System"
              darkMode={darkMode}
              specs={[
                'Transition duration: 300-500ms',
                'Easing: ease-out',
                'Transform: translateX',
                'Rotate: 90° on toggle',
                'Backdrop blur: sm (8px)'
              ]}
            />

            <SpecCard
              title="State Management"
              darkMode={darkMode}
              specs={[
                'Variant prop: collapsed | expanded',
                'Controlled component pattern',
                'onVariantChange callback',
                'Automatic state transitions',
                'Accessibility attributes (aria-*)'
              ]}
            />

            <SpecCard
              title="Styling System"
              darkMode={darkMode}
              specs={[
                'Frosted glass backdrop',
                'Border radius: 16-24px',
                'Shadow: 2xl with color tints',
                'Gradient overlays',
                'Theme-aware colors'
              ]}
            />
          </div>
        </div>

        {/* Usage Example */}
        <div className={`
          rounded-3xl p-6 backdrop-blur-3xl border
          ${darkMode
            ? 'bg-white/10 border-white/20'
            : 'bg-white/60 border-white/80'
          }
        `}>
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Usage Example
          </h2>
          
          <pre className={`
            p-4 rounded-xl overflow-x-auto text-sm
            ${darkMode
              ? 'bg-black/40 text-green-400'
              : 'bg-white/60 text-green-700'
            }
          `}>
{`import { HamburgerMenuSystem } from './components/tahoe';

function App() {
  const [menuVariant, setMenuVariant] = useState('collapsed');

  return (
    <HamburgerMenuSystem
      darkMode={false}
      variant={menuVariant}
      onVariantChange={setMenuVariant}
      currentUser={{
        name: 'Alex Rodriguez',
        email: 'alex@example.com',
        role: 'Content Lead'
      }}
      teamMembers={SAMPLE_TEAM}
      onNavigate={(page) => handleNavigation(page)}
      onMemberClick={(member) => openMemberProfile(member)}
      onLogout={() => handleLogout()}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function VariantCard({
  title,
  description,
  darkMode,
  features
}: {
  title: string;
  description: string;
  darkMode: boolean;
  features: string[];
}) {
  return (
    <div className={`
      p-6 rounded-2xl backdrop-blur-xl border
      ${darkMode
        ? 'bg-white/5 border-white/10'
        : 'bg-white/50 border-white/60'
      }
    `}>
      <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h3>
      <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
        {description}
      </p>
      <ul className={`space-y-2 text-sm ${darkMode ? 'text-white/70' : 'text-neutral-700'}`}>
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DemoSection({
  title,
  description,
  darkMode,
  children
}: {
  title: string;
  description: string;
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`
      rounded-3xl p-6 backdrop-blur-3xl border
      ${darkMode
        ? 'bg-white/10 border-white/20'
        : 'bg-white/60 border-white/80'
      }
    `}>
      <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h3>
      <p className={`text-sm mb-6 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
        {description}
      </p>
      {children}
    </div>
  );
}

function SpecCard({
  title,
  darkMode,
  specs
}: {
  title: string;
  darkMode: boolean;
  specs: string[];
}) {
  return (
    <div>
      <h3 className={`text-sm mb-3 ${darkMode ? 'text-white/80' : 'text-neutral-800'}`}>
        {title}
      </h3>
      <ul className={`space-y-1 text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
        {specs.map((spec, i) => (
          <li key={i}>• {spec}</li>
        ))}
      </ul>
    </div>
  );
}
