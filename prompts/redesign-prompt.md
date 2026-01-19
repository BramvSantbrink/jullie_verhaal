# Wedding Quiz App Professional Redesign Prompt

## Design Direction

Transform this wedding quiz app into a professionally designed experience with a **playful & fun** aesthetic while maintaining **subtle & refined** animations. The app should be **delightful & encouraging** in its feedback, celebrating the couple's adventurous personality.

### Overall Aesthetic
- Vibrant, energetic colors with bold accents that feel wedding-appropriate
- Playful but polished - modern celebration rather than childish
- Friendly, approachable typography
- Celebratory moments without being overwhelming
- Wedding-themed color palette (soft pinks, golds, warm tones with vibrant accents)

### Animation Philosophy
- Smooth fades and gentle transitions as the foundation
- Micro-interactions that feel responsive and alive
- Subtle motion that adds polish without distraction
- All animations should respect `prefers-reduced-motion` accessibility preference
- GPU-accelerated animations (transform/opacity) for smooth performance

---

## Required Features & Enhancements

### 1. Particle Effects System
- Confetti/hearts/sparkles for correct answers
- Celebratory particles on quiz completion
- Subtle particle effects should feel joyful but not chaotic
- Consider libraries like `canvas-confetti` or `react-rewards`
- Particles should reflect wedding theme (hearts, sparkles, maybe paw prints or snowflakes)

### 2. Custom Loading States
- Replace generic [LoadingSpinner.jsx](../src/components/common/LoadingSpinner.jsx) with wedding-themed animations
- Use icon libraries (lucide-react, react-icons, heroicons) styled creatively
- Animated hearts, rings, or couple-themed motifs
- Should appear during video loading and data fetching
- Keep it playful but elegant

### 3. Background Music System
- Implement optional background music that can be toggled on/off
- I have ~10 MP3 files of custom MP3 files that should be looped.
- There should be a button for next song
- Persistent toggle state across quiz sessions
- Music icon/button that clearly shows on/off state
- Auto-start option on home and quiz page. Should be muted if video is played.
- Smooth fade in/out when toggling
- Audio controls component should be accessible and mobile-friendly

### 4. Mobile-First Responsive Design
- Touch-friendly buttons and interactions (minimum 44px touch targets)
- Smooth gesture support where appropriate
- Consider haptic feedback for key interactions (if browser supports it)
- Test all animations and interactions on mobile viewports
- Ensure particle effects perform well on mobile

### 5. Personalized Theme Elements (PROMINENT)

Integrate these elements meaningfully throughout the app - they should be **prominent** features:

#### Core Personal Themes:
- **Berner Sennen Dog** 🐕 - Use as mascot/guide throughout the experience
- **Beneteau 50 Boat** ⛵ - Nautical/sailing theme elements
- **Tony Chocolonely Mousse** 🍫 - Chocolate/food themed touches
- **Skiing** ⛷️ - Mountain/snow/winter sports motifs
- **Passion for Food** 🍽️ - Culinary illustrations and themes
- **Moving to Ethiopia** 🌍 - Adventure, travel, new beginnings theme
- **Adventurous Spirit** 🎒 - Exploration, journey, discovery motifs

#### Integration Ideas:

**Navigation & Progress:**
- Progress bar styled as a journey/adventure path (sailing voyage, ski slope, or Ethiopian road trip)
- Dog mascot appears at different progress milestones
- Mountain peaks or sailing waypoints as question markers

**Question Screens:**
- Background patterns/subtle illustrations featuring these elements
- Icon sets combining wedding + adventure themes
- Border decorations with boats, mountains, paw prints, chocolate bars

**Feedback & Celebrations:**
- Correct answer: Dog celebrates, confetti with themed shapes (hearts + paws + boats)
- Wrong answer: Dog tilts head sympathetically, gentle encouragement
- Completion: Big adventure-themed celebration (perhaps dog on a boat sailing to Ethiopia)

**Landing Page:**
- Hero section featuring couple's adventure story
- Icons representing their journey and interests
- Call-to-action that feels like "start the adventure"

**Results Page:**
- Score presentation as "adventure achievement"
- Custom messages referencing skiing, sailing, food, or Ethiopia based on score
- Shareable results with couple's personal branding

**Loading States:**
- Rotating illustrations of dog, boat, skis, chocolate
- "Preparing your adventure..." type messages
- Animated icons from their interest areas

### 6. Delightful Feedback System

**Correct Answers:**
- Celebratory particle burst (hearts, stars, confetti)
- Positive, personalized messages referencing couple's interests
  - "Perfect! You're as sharp as fresh mountain snow!"
  - "Smooth sailing! You got it right!"
  - "Sweet success! Like Tony Chocolonely mousse!"
- Smooth reveal of explanation with subtle animation
- Dog celebrating animation or boat sailing smoothly

**Incorrect Answers:**
- Gentle, encouraging feedback (no harsh red/wrong indicators)
- Playful messages that keep spirits high:
  - "Not quite! But every adventure has detours..."
  - "Close! Even the best sailors adjust their course"
  - "Oops! But that's how we learn new recipes!"
- Still show the correct answer in a friendly way
- Dog tilting head or looking curious (not sad)

**Progress & Completion:**
- Beautiful progress visualization (journey map, sailing progress, or expedition tracker)
- Celebration animation for quiz completion with ALL personalized elements
- Score presentation that feels rewarding regardless of score:
  - High score: "Expert adventurer! Ready for Ethiopia!"
  - Medium score: "Great journey! You know them well!"
  - Low score: "Every adventure starts somewhere!"
- Share-worthy results screen with couple branding

---

## Technical Implementation

### Architecture
1. **Keep existing architecture** - Work with current hooks pattern ([useQuiz.js](../src/hooks/useQuiz.js), [useQuestions.js](../src/hooks/useQuestions.js), [useAuth.js](../src/hooks/useAuth.js))
2. **Extend config system** - Add theme options to [src/config.js](../src/config.js)
3. **Leverage Modal system** - Use existing [Modal.jsx](../src/components/common/Modal.jsx)
4. **Create new hook** - `useAudio.js` for background music management
5. **Maintain performance** - GPU-accelerated animations, lazy loading for heavy components

### New Components to Create
- `ParticleEffect.jsx` - Reusable particle celebration component
- `AudioToggle.jsx` - Background music control
- `AdventureProgress.jsx` - Themed progress indicator
- `DogMascot.jsx` - Animated dog character component
- `ThemedLoading.jsx` - Replace generic loading spinner
- `PersonalizedMessage.jsx` - Dynamic feedback with couple's themes

### Dependencies to Add
```json
{
  "canvas-confetti": "^1.x.x",
  "lucide-react": "^0.x.x",
  "framer-motion": "^11.x.x" (optional, for advanced animations)
}
```

### File Structure Updates
```
src/
  components/
    common/
      ParticleEffect.jsx (NEW)
      ThemedLoading.jsx (NEW)
      AudioToggle.jsx (NEW)
    quiz/
      AdventureProgress.jsx (NEW)
      DogMascot.jsx (NEW)
      PersonalizedMessage.jsx (NEW)
  hooks/
    useAudio.js (NEW)
  assets/
    audio/
      background-music1.mp3 
      background-music2.mp3
      ...
  styles/
    animations.css (NEW - reusable animation utilities)
    theme.css (NEW - design system variables)
```

---

## Design System

### Color Palette (Wedding + Adventure Theme)

**Primary Colors:**
- Primary: `#FF6B9D` (Vibrant coral pink - playful wedding)
- Secondary: `#4ECDC4` (Energetic teal - adventure/ocean)
- Accent: `#FFE66D` (Sunny yellow - joy/celebration)

**Supporting Colors:**
- Navy: `#2C3E50` (Depth/contrast - night sky/ocean)
- Warm Gold: `#F4A261` (Wedding elegance/sunset)
- Chocolate: `#6B4423` (Tony Chocolonely reference)
- Snow White: `#FFFBF7` (Mountains/clean backgrounds)

**Semantic Colors:**
- Success: `#A8E6CF` (Soft mint green - encouraging)
- Info: `#84B6F4` (Sky blue - informative)
- Warning: `#FDCB6E` (Warm yellow - gentle alerts)
- Background: `#FFF9F5` (Warm off-white)
- Text Primary: `#2D3436` (Nearly black, warm undertone)
- Text Secondary: `#636E72` (Medium gray)

### Typography

**Fonts:**
- **Headings**: 'Poppins' (rounded sans-serif - friendly and modern)
- **Body**: 'Inter' (clean sans-serif - excellent readability)
- **Accent/Special**: 'Caveat' or 'Dancing Script' (handwritten feel for special moments - use sparingly)

**Scale:**
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

### Spacing System
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.5rem;   /* 24px */
--space-6: 2rem;     /* 32px */
--space-8: 3rem;     /* 48px */
--space-10: 4rem;    /* 64px */
```

### Border Radius
```css
--radius-sm: 0.375rem;  /* 6px - subtle */
--radius-md: 0.5rem;    /* 8px - default */
--radius-lg: 0.75rem;   /* 12px - cards */
--radius-xl: 1rem;      /* 16px - large elements */
--radius-full: 9999px;  /* Full rounded */
```

### Animations

**Timing Functions:**
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Durations:**
```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;
```

**Reusable Animations:**
- Fade in/out
- Scale up (subtle bounce)
- Slide up/down
- Gentle float (for decorative elements)
- Confetti burst
- Sparkle twinkle

---

## Implementation Steps

### Phase 1: Foundation
1. Install dependencies (canvas-confetti, lucide-react)
2. Create design system CSS file with all variables ([src/styles/theme.css](../src/styles/theme.css))
3. Create animation utilities CSS ([src/styles/animations.css](../src/styles/animations.css))
4. Update [src/config.js](../src/config.js) with new theme configuration options
5. Import Google Fonts (Poppins, Inter, Caveat)

### Phase 2: Core Components
6. Create `ParticleEffect.jsx` with canvas-confetti
7. Create `ThemedLoading.jsx` with animated icons
8. Create `AudioToggle.jsx` component and `useAudio.js` hook
9. Update [Modal.jsx](../src/components/common/Modal.jsx) with new styling
10. Create `DogMascot.jsx` with different states (happy, curious, celebrating)

### Phase 3: Quiz Experience
11. Create `AdventureProgress.jsx` progress visualization
12. Update [QuestionCard.jsx](../src/components/quiz/QuestionCard.jsx) with new design
13. Update [AnswerButton.jsx](../src/components/quiz/AnswerButton.jsx) with hover effects
14. Create `PersonalizedMessage.jsx` for feedback
15. Integrate particle effects on correct/incorrect answers
16. Update [ResultsCard.jsx](../src/components/quiz/ResultsCard.jsx) with adventure theme

### Phase 4: Pages & Polish
17. Redesign [LandingPage.jsx](../src/pages/LandingPage.jsx) with couple's story
18. Update [QuizPage.jsx](../src/pages/QuizPage.jsx) with new components
19. Enhance [UploadPage.jsx](../src/pages/UploadPage.jsx) styling
20. Add micro-interactions throughout (button hovers, focus states)
21. Test mobile responsiveness for all components
22. Implement `prefers-reduced-motion` support

### Phase 5: Final Touches
23. Add couple-themed illustrations/decorations using icons
24. Create shareable results design
25. Add loading states for video playback
26. Polish all transitions and animations
27. Performance optimization (lazy loading, code splitting)
28. Accessibility audit (ARIA labels, keyboard navigation, screen reader testing)

---

## Success Criteria

The redesign is successful when:

✅ **Visual Impact:**
- App feels professionally designed and wedding-appropriate
- Playful & fun aesthetic is evident but not childish
- Couple's personality and interests are prominent throughout
- Color palette creates cohesive, celebratory atmosphere

✅ **Animation Quality:**
- All animations are smooth (60fps)
- Subtle and refined - enhances UX without distraction
- Respects reduced motion preferences
- Mobile performance is excellent

✅ **User Experience:**
- Feedback is delightful and encouraging
- Navigation is intuitive and responsive
- Loading states are engaging, not frustrating
- Mobile experience matches desktop quality
- Music toggle is discoverable and works smoothly

✅ **Personal Touch:**
- Dog, boat, skiing, food, and Ethiopia themes are visible
- Adventure/journey metaphor is consistent
- Messages and celebrations reference couple's interests
- Results feel personalized and shareable

✅ **Technical Quality:**
- No performance regressions
- Accessibility standards met (WCAG 2.1 AA)
- Code is maintainable and follows existing patterns
- New features added to config system

---

## Next Steps

1. **Review & Approve Design System** - Confirm color palette, typography, and animation approach
2. **Create Visual Mockups** - Show key screens (landing, quiz, results) with new design
3. **Implement Phase by Phase** - Build systematically, testing as we go
4. **Gather Assets** - Identify any custom illustrations needed (dog, boat, etc.)
5. **Final Testing** - Cross-browser, mobile, accessibility, performance

Let's start with Phase 1 and build a beautiful, personalized wedding quiz experience! 🎉
