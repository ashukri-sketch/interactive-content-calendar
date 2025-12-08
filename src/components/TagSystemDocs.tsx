interface TagSystemDocsProps {
  darkMode: boolean;
}

export function TagSystemDocs({ darkMode }: TagSystemDocsProps) {
  return (
    <div className={`max-w-4xl mx-auto p-8 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
      <h1 className={`mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        Modular Tag System Documentation
      </h1>

      <Section title="Overview" darkMode={darkMode}>
        <p className="mb-4">
          This modular tag system is designed for content calendar operations and includes full campaign metadata 
          with workflow status tracking. All components are built with Auto Layout principles, using 4-8px spacing 
          grids and the Inter font family.
        </p>
      </Section>

      <Section title="Component Architecture" darkMode={darkMode}>
        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          1. Campaign Name Tag
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Editable text field</li>
          <li>Pill-style layout with icon</li>
          <li>Light neutral background</li>
          <li>Click to edit inline</li>
        </ul>

        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          2. Platform Tag
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Mailchimp (Email)</strong> - Yellow accent</li>
          <li><strong>Instagram</strong> - Pink accent</li>
          <li><strong>Facebook</strong> - Blue accent</li>
          <li><strong>TikTok</strong> - Cyan accent</li>
          <li><strong>LinkedIn</strong> - Indigo accent</li>
          <li><strong>Website</strong> - Purple accent</li>
          <li><strong>Multi-Platform</strong> - Neutral accent</li>
        </ul>
        <p className="mb-4">Each platform has a unique color and icon for quick identification.</p>

        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          3. Content Type Tag
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Still Graphic</strong> - Image icon, emerald color</li>
          <li><strong>Video</strong> - Video icon, rose color</li>
          <li><strong>Carousel</strong> - Layers icon, violet color</li>
          <li><strong>Reel/Short</strong> - Zap icon, fuchsia color</li>
          <li><strong>Story</strong> - Message icon, amber color</li>
          <li><strong>Copy-only</strong> - Text icon, slate color</li>
        </ul>

        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          4. Content Summary Tag
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Multi-line editable text field</li>
          <li>Auto-growing field</li>
          <li>Expandable/collapsible</li>
          <li>Fits in calendar cell or expands on demand</li>
        </ul>

        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          5. Assignment & Ownership Tag
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Assigned date picker</li>
          <li>Editor field (visual/graphic responsibility)</li>
          <li>Copywriter field (text/caption responsibility)</li>
          <li>Compact stacked layout</li>
        </ul>

        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          6. Workflow Status Tag
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Idea</strong> - Neutral gray (concept phase)</li>
          <li><strong>Drafting</strong> - Blue (content creation)</li>
          <li><strong>Editing</strong> - Yellow (review phase)</li>
          <li><strong>Needs Approval</strong> - Orange (waiting for sign-off)</li>
          <li><strong>Approved</strong> - Green (ready to schedule)</li>
          <li><strong>Scheduled</strong> - Purple (queued for publishing)</li>
          <li><strong>Posted</strong> - Emerald green (published)</li>
          <li><strong>Delayed</strong> - Red (postponed)</li>
          <li><strong>Cancelled</strong> - Rose red (abandoned)</li>
        </ul>
      </Section>

      <Section title="Status Block Component" darkMode={darkMode}>
        <p className="mb-4">
          The <code className={`px-2 py-0.5 rounded ${darkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`}>StatusBlock</code> 
          is a composite component that combines all tag types into a cohesive unit.
        </p>
        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Variants
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Compact</strong> - Minimal view showing campaign name, platform, content type, and status</li>
          <li><strong>Default</strong> - Expandable view with toggle for details</li>
          <li><strong>Expanded</strong> - Full view showing all metadata including summary and assignments</li>
        </ul>
      </Section>

      <Section title="Design Specifications" darkMode={darkMode}>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Font Family:</strong> Inter</li>
          <li><strong>Spacing Grid:</strong> 4-8px increments</li>
          <li><strong>Border Radius:</strong> 8-12px for cards, varied for pills/tags</li>
          <li><strong>Color System:</strong> Soft neutral palette with color-coded accents</li>
          <li><strong>Layout:</strong> Auto Layout throughout for responsive behavior</li>
          <li><strong>Interaction:</strong> All tags are editable and drag-drop friendly</li>
        </ul>
      </Section>

      <Section title="Usage in Calendar" darkMode={darkMode}>
        <p className="mb-4">
          Status Blocks can be integrated into calendar cells in compact mode, allowing multiple content items 
          per day. Users can click to expand for full details or edit any field inline.
        </p>
        <p>
          The modular design ensures each tag can be swapped via variant selection, making it easy to customize 
          the display based on screen size, user preferences, or specific workflow needs.
        </p>
      </Section>
    </div>
  );
}

function Section({ 
  title, 
  children, 
  darkMode 
}: { 
  title: string; 
  children: React.ReactNode; 
  darkMode: boolean;
}) {
  return (
    <div className="mb-8">
      <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      {children}
    </div>
  );
}
