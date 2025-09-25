# Animated Slider Component

This component replicates the animations from the original HTML slider with the following features:

## Features

- **Multiple Animation Types**: Each slide can have different animations for title, subtitle, and button
- **Responsive Design**: Works on all screen sizes
- **Auto-play**: Automatically advances slides every 6 seconds
- **Manual Navigation**: Click arrows or indicators to navigate
- **Smooth Transitions**: CSS3 animations with easing functions
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Available Animations

### Text Animations
- `animate-fadeInDown` - Fade in from top
- `animate-fadeInUp` - Fade in from bottom
- `animate-rollIn` - Roll in from left with rotation
- `animate-lightSpeedIn` - Fast slide in from right with skew
- `animate-rotateInDownLeft` - Rotate in from top-left
- `animate-rotateInUpRight` - Rotate in from bottom-right

### Button Animations
- `animate-zoomIn` - Scale up from center
- `animate-slideInUp` - Slide up from bottom
- `animate-rotateIn` - Rotate in with full rotation

## Customization

### Adding New Slides

```typescript
const newSlide = {
  id: 4,
  image: '/images/slide-04.jpg',
  title: 'New Collection',
  subtitle: 'SUMMER 2025',
  titleAnimation: 'animate-fadeInDown',
  subtitleAnimation: 'animate-fadeInUp',
  buttonAnimation: 'animate-zoomIn',
  titleDelay: 0,
  subtitleDelay: 800,
  buttonDelay: 1600
};
```

### Timing Configuration

- `titleDelay`: Delay before title animation starts (milliseconds)
- `subtitleDelay`: Delay before subtitle animation starts (milliseconds)  
- `buttonDelay`: Delay before button animation starts (milliseconds)

### Auto-play Settings

- Auto-play duration: 6 seconds per slide
- Pauses for 5 seconds when user manually navigates
- Progress bar shows current slide progress

## Animation Sequence

1. **Slide Image**: Fades in over 1 second with subtle scale effect
2. **Title**: Animates in after slide is loaded (delay: 0ms)
3. **Subtitle**: Animates in 800ms after title
4. **Button**: Animates in 1600ms after title (800ms after subtitle)

## Usage

```tsx
import { AnimatedSlider } from '@/components/ui/AnimatedSlider';

export default function HomePage() {
  return (
    <div>
      <AnimatedSlider />
      {/* Other content */}
    </div>
  );
}
```

## Performance Notes

- Images are preloaded for smooth transitions
- Animations use CSS transforms for better performance
- Component uses React.memo equivalent optimizations
- Proper cleanup of intervals and timeouts

## Browser Support

- Modern browsers with CSS3 transform support
- Fallback animations for older browsers
- Responsive design works on mobile devices