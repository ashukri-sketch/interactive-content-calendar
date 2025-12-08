/**
 * DESIGN SYSTEM DOCUMENTATION PAGE
 * Complete reference for designers and developers
 * Includes all tokens, components, patterns, and guidelines
 */

import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Code, 
  Copy,
  Check,
  Eye,
  Layers,
  Box,
  Circle,
  Square
} from 'lucide-react';
import { useState } from 'react';

export function DesignSystemPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`
      min-h-screen p-8
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="primary-gradient rounded-3xl p-12 text-white mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-semibold mb-4">Design System</h1>
              <p className="text-xl text-white/80 max-w-2xl">
                Complete documentation for the Hybrid Apple-Tahoe Design System.
                All tokens, components, patterns, and guidelines for consistent implementation.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation */}
        <NavigationMenu isDark={isDark} />

        {/* Brand Colors */}
        <Section id="colors" title="Brand Colors" icon={Palette} isDark={isDark}>
          <ColorTokens isDark={isDark} />
        </Section>

        {/* Gradients */}
        <Section id="gradients" title="Hybrid Gradients" icon={Sparkles} isDark={isDark}>
          <GradientTokens isDark={isDark} />
        </Section>

        {/* Glass Effects */}
        <Section id="glass" title="Glass Effects" icon={Layers} isDark={isDark}>
          <GlassEffects isDark={isDark} />
        </Section>

        {/* Typography */}
        <Section id="typography" title="Typography System" icon={Type} isDark={isDark}>
          <TypographySystem isDark={isDark} />
        </Section>

        {/* Spacing */}
        <Section id="spacing" title="Spacing & Layout" icon={Layout} isDark={isDark}>
          <SpacingSystem isDark={isDark} />
        </Section>

        {/* Components */}
        <Section id="components" title="Component Library" icon={Box} isDark={isDark}>
          <ComponentLibrary isDark={isDark} />
        </Section>

        {/* Motion */}
        <Section id="motion" title="Motion & Interactions" icon={Sparkles} isDark={isDark}>
          <MotionGuidelines isDark={isDark} />
        </Section>

        {/* Developer Handoff */}
        <Section id="handoff" title="Developer Handoff" icon={Code} isDark={isDark}>
          <DeveloperHandoff isDark={isDark} />
        </Section>
      </div>
    </div>
  );
}

// Navigation Menu Component
function NavigationMenu({ isDark }: { isDark: boolean }) {
  const links = [
    { id: 'colors', label: 'Colors' },
    { id: 'gradients', label: 'Gradients' },
    { id: 'glass', label: 'Glass' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'components', label: 'Components' },
    { id: 'motion', label: 'Motion' },
    { id: 'handoff', label: 'Dev Handoff' }
  ];

  return (
    <nav className="glass-panel rounded-2xl p-4 sticky top-8 z-20">
      <div className="flex items-center gap-4 flex-wrap">
        {links.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-neutral-100 text-neutral-900'}
            `}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// Section Component
function Section({ 
  id, 
  title, 
  icon: Icon, 
  isDark, 
  children 
}: { 
  id: string;
  title: string;
  icon: any;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`w-6 h-6 ${isDark ? 'text-calypso' : 'text-calypso'}`} />
        <h2 className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

// Color Tokens Component
function ColorTokens({ isDark }: { isDark: boolean }) {
  const colors = [
    {
      name: 'Calypso',
      value: '#006781',
      usage: 'Primary actions, LinkedIn, active states, in-progress',
      shades: [
        { name: '50', value: '#e6f2f5' },
        { name: '100', value: '#cce5eb' },
        { name: '200', value: '#99cbd7' },
        { name: '300', value: '#66b0c3' },
        { name: '400', value: '#3396af' },
        { name: '500', value: '#006781' },
        { name: '600', value: '#005267' },
        { name: '700', value: '#003e4d' },
        { name: '800', value: '#002933' },
        { name: '900', value: '#00151a' }
      ]
    },
    {
      name: 'Pistachio',
      value: '#95b730',
      usage: 'Success, completion, website, approved, low priority',
      shades: [
        { name: '50', value: '#f4f7e8' },
        { name: '100', value: '#e9efd1' },
        { name: '200', value: '#d3dfa3' },
        { name: '300', value: '#bdcf75' },
        { name: '400', value: '#a7bf47' },
        { name: '500', value: '#95b730' },
        { name: '600', value: '#779226' },
        { name: '700', value: '#596e1d' },
        { name: '800', value: '#3c4913' },
        { name: '900', value: '#1e250a' }
      ]
    },
    {
      name: 'Tulip',
      value: '#f0b52b',
      usage: 'Warnings, email/Mailchimp, editing, medium priority',
      shades: [
        { name: '50', value: '#fef8ea' },
        { name: '100', value: '#fdf1d5' },
        { name: '200', value: '#fbe3ab' },
        { name: '300', value: '#f9d581' },
        { name: '400', value: '#f7c757' },
        { name: '500', value: '#f0b52b' },
        { name: '600', value: '#c09122' },
        { name: '700', value: '#906d1a' },
        { name: '800', value: '#604811' },
        { name: '900', value: '#302409' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {colors.map(color => (
        <ColorCard key={color.name} color={color} isDark={isDark} />
      ))}
    </div>
  );
}

function ColorCard({ color, isDark }: { color: any; isDark: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {color.name}
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
            {color.usage}
          </p>
        </div>
        <button
          onClick={() => copyToClipboard(color.value)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all
            ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'}
          `}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {color.value}
        </button>
      </div>

      {/* Main Color */}
      <div className="mb-4">
        <div
          className="h-24 rounded-xl shadow-lg mb-3"
          style={{ backgroundColor: color.value }}
        />
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Main • 500
          </span>
          <code className={`text-sm px-3 py-1 rounded-lg ${isDark ? 'bg-white/5 text-white/80' : 'bg-neutral-100 text-neutral-700'}`}>
            {color.value}
          </code>
        </div>
      </div>

      {/* Shades */}
      <div className="grid grid-cols-5 gap-3">
        {color.shades.map((shade: any) => (
          <div key={shade.name}>
            <div
              className="h-16 rounded-lg shadow-sm mb-2 cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: shade.value }}
              onClick={() => copyToClipboard(shade.value)}
            />
            <div className={`text-xs ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
              {shade.name}
            </div>
          </div>
        ))}
      </div>

      {/* CSS Variable */}
      <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-black/30' : 'bg-neutral-50'}`}>
        <div className={`text-xs font-medium mb-2 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
          CSS Variable
        </div>
        <code className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          --{color.name.toLowerCase()}: {color.value};
        </code>
      </div>
    </div>
  );
}

// Gradient Tokens Component
function GradientTokens({ isDark }: { isDark: boolean }) {
  const gradients = [
    {
      name: 'Primary Hybrid',
      css: 'linear-gradient(135deg, rgba(0,103,129,0.85), rgba(0,158,192,0.65))',
      usage: 'Dashboard, Calendar, Tasks, Settings headers',
      class: 'primary-gradient'
    },
    {
      name: 'Secondary Hybrid',
      css: 'linear-gradient(140deg, rgba(149,183,48,0.85), rgba(199,227,113,0.55))',
      usage: 'Team, Chat headers, success states',
      class: 'secondary-gradient'
    },
    {
      name: 'Accent Hybrid',
      css: 'linear-gradient(150deg, rgba(240,181,43,0.85), rgba(248,219,128,0.55))',
      usage: 'Analytics header, special CTAs',
      class: 'accent-gradient'
    }
  ];

  return (
    <div className="space-y-6">
      {gradients.map(gradient => (
        <GradientCard key={gradient.name} gradient={gradient} isDark={isDark} />
      ))}
    </div>
  );
}

function GradientCard({ gradient, isDark }: { gradient: any; isDark: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {gradient.name}
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
            {gradient.usage}
          </p>
        </div>
        <button
          onClick={() => copyToClipboard(gradient.css)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all
            ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'}
          `}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy CSS
        </button>
      </div>

      {/* Gradient Preview */}
      <div
        className="h-32 rounded-2xl shadow-lg mb-4"
        style={{ background: gradient.css }}
      />

      {/* Code Block */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-black/30' : 'bg-neutral-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
            CSS
          </span>
          <code className={`text-xs px-3 py-1 rounded-lg ${isDark ? 'bg-white/5 text-white/80' : 'bg-white text-neutral-700'}`}>
            .{gradient.class}
          </code>
        </div>
        <code className={`text-sm break-all ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          background: {gradient.css};
        </code>
      </div>
    </div>
  );
}

// Glass Effects Component
function GlassEffects({ isDark }: { isDark: boolean }) {
  return (
    <div className="glass-panel rounded-2xl p-8">
      <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
        Glass Panel Effect
      </h3>

      {/* Preview */}
      <div className="relative h-64 rounded-2xl overflow-hidden mb-6" style={{
        background: 'linear-gradient(135deg, #006781, #95b730, #f0b52b)'
      }}>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="glass-panel rounded-2xl p-8 max-w-md">
            <h4 className="text-white text-lg font-semibold mb-2">Glass Panel</h4>
            <p className="text-white/80 text-sm">
              This is a frosted glass panel with backdrop blur, subtle transparency, and soft shadows.
            </p>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <SpecRow label="Background" value="rgba(255, 255, 255, 0.25)" isDark={isDark} />
        <SpecRow label="Backdrop Blur" value="blur(22px)" isDark={isDark} />
        <SpecRow label="Border" value="1px solid rgba(255, 255, 255, 0.18)" isDark={isDark} />
        <SpecRow label="Shadow" value="0 8px 24px rgba(0, 0, 0, 0.10)" isDark={isDark} />
        <SpecRow label="Border Radius" value="12-24px" isDark={isDark} />
      </div>

      {/* Code */}
      <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-black/30' : 'bg-neutral-50'}`}>
        <div className={`text-xs font-medium mb-3 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
          CSS Class
        </div>
        <pre className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
{`.glass-panel {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(22px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10);
}`}
        </pre>
      </div>
    </div>
  );
}

function SpecRow({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
        {label}
      </span>
      <code className={`text-sm px-3 py-1 rounded-lg ${isDark ? 'bg-white/5 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
        {value}
      </code>
    </div>
  );
}

// Typography System Component
function TypographySystem({ isDark }: { isDark: boolean }) {
  const scales = [
    { name: 'Display', size: '3xl', weight: 'Semibold', example: 'The quick brown fox jumps' },
    { name: 'Heading 1', size: '2xl', weight: 'Semibold', example: 'The quick brown fox jumps over' },
    { name: 'Heading 2', size: 'xl', weight: 'Semibold', example: 'The quick brown fox jumps over the lazy' },
    { name: 'Heading 3', size: 'lg', weight: 'Semibold', example: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Body', size: 'base', weight: 'Regular', example: 'The quick brown fox jumps over the lazy dog and runs away' },
    { name: 'Small', size: 'sm', weight: 'Medium', example: 'The quick brown fox jumps over the lazy dog and runs away into the forest' },
    { name: 'Caption', size: 'xs', weight: 'Regular', example: 'The quick brown fox jumps over the lazy dog and runs away into the deep dark forest' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-8 space-y-8">
      {scales.map(scale => (
        <div key={scale.name}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
              {scale.name}
            </span>
            <div className="flex items-center gap-3">
              <code className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/5 text-white/80' : 'bg-neutral-100 text-neutral-700'}`}>
                text-{scale.size}
              </code>
              <code className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/5 text-white/80' : 'bg-neutral-100 text-neutral-700'}`}>
                font-{scale.weight.toLowerCase()}
              </code>
            </div>
          </div>
          <p className={`
            text-${scale.size} font-${scale.weight.toLowerCase()}
            ${isDark ? 'text-white' : 'text-neutral-900'}
          `}>
            {scale.example}
          </p>
        </div>
      ))}
    </div>
  );
}

// Spacing System Component
function SpacingSystem({ isDark }: { isDark: boolean }) {
  const spacingScale = [
    { value: '0.5', pixels: '4px', usage: 'Tight spacing, icon gaps' },
    { value: '1', pixels: '8px', usage: 'Base unit, small gaps' },
    { value: '2', pixels: '16px', usage: 'Component padding, medium gaps' },
    { value: '3', pixels: '24px', usage: 'Section spacing' },
    { value: '4', pixels: '32px', usage: 'Large spacing, card padding' },
    { value: '6', pixels: '48px', usage: 'Section padding' },
    { value: '8', pixels: '64px', usage: 'Page margins' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-8">
      <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
        8px Grid System
      </h3>

      <div className="space-y-4">
        {spacingScale.map(space => (
          <div key={space.value} className="flex items-center gap-4">
            <div
              className="bg-calypso rounded"
              style={{ width: space.pixels, height: '40px' }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <code className={`text-sm font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {space.pixels}
                </code>
                <code className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/5 text-white/80' : 'bg-neutral-100 text-neutral-700'}`}>
                  {space.value}
                </code>
              </div>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                {space.usage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Example */}
      <div className={`mt-8 p-4 rounded-xl ${isDark ? 'bg-black/30' : 'bg-neutral-50'}`}>
        <div className={`text-xs font-medium mb-3 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
          Usage Example
        </div>
        <code className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          p-4 gap-3 mb-6 → padding: 32px, gap: 24px, margin-bottom: 48px
        </code>
      </div>
    </div>
  );
}

// Component Library Component
function ComponentLibrary({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div className="glass-panel rounded-2xl p-8">
        <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Buttons
        </h3>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-calypso text-white px-6 py-3 rounded-xl font-medium shadow-lg"
          >
            Primary Button
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-pistachio text-white px-6 py-3 rounded-xl font-medium shadow-lg"
          >
            Secondary Button
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-tulip text-white px-6 py-3 rounded-xl font-medium shadow-lg"
          >
            Accent Button
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel text-white px-6 py-3 rounded-xl font-medium"
          >
            Ghost Button
          </motion.button>
        </div>
      </div>

      {/* Tags */}
      <div className="glass-panel rounded-2xl p-8">
        <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Tags & Badges
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-calypso/20 text-calypso border border-calypso/30">
            Calypso Tag
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-pistachio/20 text-pistachio border border-pistachio/30">
            Pistachio Tag
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-tulip/20 text-tulip border border-tulip/30">
            Tulip Tag
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="glass-panel rounded-2xl p-8">
        <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Cards
        </h3>
        <div className="glass-panel rounded-xl p-6">
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Card Title
          </h4>
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
            This is a card component with glass panel styling. It includes rounded corners, subtle transparency, and backdrop blur.
          </p>
        </div>
      </div>
    </div>
  );
}

// Motion Guidelines Component
function MotionGuidelines({ isDark }: { isDark: boolean }) {
  return (
    <div className="glass-panel rounded-2xl p-8 space-y-8">
      <div>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Transition Timings
        </h3>
        <div className="space-y-3">
          <SpecRow label="Fast" value="150ms" isDark={isDark} />
          <SpecRow label="Normal" value="200-300ms" isDark={isDark} />
          <SpecRow label="Slow" value="400-500ms" isDark={isDark} />
        </div>
      </div>

      <div>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Easing Functions
        </h3>
        <div className="space-y-3">
          <SpecRow label="Standard" value="cubic-bezier(0.4, 0, 0.2, 1)" isDark={isDark} />
          <SpecRow label="Decelerate" value="cubic-bezier(0, 0, 0.2, 1)" isDark={isDark} />
          <SpecRow label="Accelerate" value="cubic-bezier(0.4, 0, 1, 1)" isDark={isDark} />
        </div>
      </div>

      <div>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Interactive States
        </h3>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel rounded-xl p-6 cursor-pointer"
        >
          <p className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Hover and tap this card to see motion in action
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Developer Handoff Component
function DeveloperHandoff({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      {/* Quick Reference */}
      <div className="glass-panel rounded-2xl p-8">
        <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Quick Reference
        </h3>
        
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Brand Colors (CSS Variables)
            </h4>
            <div className={`space-y-2 p-4 rounded-xl ${isDark ? 'bg-black/30' : 'bg-neutral-50'}`}>
              <code className={`block text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                --calypso: #006781;
              </code>
              <code className={`block text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                --pistachio: #95b730;
              </code>
              <code className={`block text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                --tulip: #f0b52b;
              </code>
            </div>
          </div>

          {/* Tailwind Classes */}
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Common Tailwind Classes
            </h4>
            <div className={`space-y-2 p-4 rounded-xl ${isDark ? 'bg-black/30' : 'bg-neutral-50'}`}>
              <code className={`block text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                .glass-panel → Glass effect with blur
              </code>
              <code className={`block text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                .primary-gradient → Primary brand gradient
              </code>
              <code className={`block text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                .text-calypso → Calypso text color
              </code>
            </div>
          </div>

          {/* Component Structure */}
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Component Structure
            </h4>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-black/30' : 'bg-neutral-50'}`}>
              <pre className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'} overflow-x-auto`}>
{`<div className="glass-panel rounded-2xl p-6">
  <h3 className="text-xl font-semibold mb-4">
    Title
  </h3>
  <p className="text-sm text-white/60">
    Content
  </p>
</div>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="glass-panel rounded-2xl p-8">
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Implementation Notes
        </h3>
        <ul className={`space-y-3 text-sm ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
          <li className="flex items-start gap-3">
            <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 text-calypso" />
            <span>All spacing follows 8px grid system (use p-3, p-4, p-6, p-8)</span>
          </li>
          <li className="flex items-start gap-3">
            <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 text-calypso" />
            <span>Use Motion from 'motion/react' for all animations</span>
          </li>
          <li className="flex items-start gap-3">
            <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 text-calypso" />
            <span>Glass panels work in both light and dark modes</span>
          </li>
          <li className="flex items-start gap-3">
            <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 text-calypso" />
            <span>Brand colors have proper contrast ratios for accessibility</span>
          </li>
          <li className="flex items-start gap-3">
            <Circle className="w-4 h-4 flex-shrink-0 mt-0.5 text-calypso" />
            <span>All interactive elements have hover and active states</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
