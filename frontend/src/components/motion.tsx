import { ReactNode } from 'react';

// This is a simplified motion library for our needs
// In a real app, you would use framer-motion or another animation library

type MotionProps = {
  children: ReactNode;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  className?: string;
  onClick?: () => void;
};

export const motion = {
  div: ({ children, initial, animate, transition, className, onClick }: MotionProps) => {
    // Simple implementation that applies CSS transitions based on animate values
    const style: Record<string, any> = {};
    
    if (transition) {
      const duration = transition.duration || 0.3;
      style.transition = `all ${duration}s`;
    }
    
    if (animate) {
      Object.keys(animate).forEach(key => {
        // Convert camelCase to kebab-case for CSS properties
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        style[cssKey] = animate[key];
      });
    }
    
    return (
      <div className={className} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }
};