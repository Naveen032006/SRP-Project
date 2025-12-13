const Color = {
  // Primary / Brand
  emerald500: '#10B981',   // Main primary color
  emerald600: '#059669',   // hover state
  teal500: '#14B8A6',      // used in gradients
  teal600: '#0D9488',      // hover for gradients

  // Gradients (CSS strings for convenience)
  gradientPrimary: 'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)', // logo & primary buttons
  gradientHero: 'linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #2563EB 100%)', // hero/welcome
  gradientBackgroundAccent: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(20,184,166,0.04) 100%)',

  // Semantic colors
  success: '#22C55E',     // green-500
  warning: '#F59E0B',     // amber-500
  destructive: '#EF4444', // red-500
  info: '#06B6D4',        // cyan-500

  // Neutrals / surfaces
  background: '#ffffff',  // page background
  foreground: '#0B1220',  // very dark, almost black (text)
  gray50: '#f3f3f5',      // input background
  muted: '#ececf0',       // light gray
  mutedForeground: '#717182',
  border: 'rgba(0,0,0,0.1)',

  // Interactive / focus
  inputBackground: '#f3f3f5',
  focusRing: 'rgba(16,185,129,0.2)', // emerald-500 @20%
  switchBackground: '#cbced4',

  // Links / accents
  link: '#059669',        // emerald-600
  linkHover: '#047857',   // emerald-700
  accent: '#e9ebef',      // very light gray
  secondarySurface: '#FBF7FF', // very light purple-ish

  // Blue accents (tailwind-like)
  blue50: '#eff6ff',
  blue200: '#bfdbfe',
  blue800: '#1e40af',
  blue900: '#1e3a8a'
};
export default Color;