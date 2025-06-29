import React, { createContext, useReducer, useEffect, useContext, Dispatch } from 'react';

type ReadingSettings = {
  fontSize: 'medium' | 'large';
  lineHeight: 'normal' | 'relaxed';
  letterSpacing: 'normal' | 'wide';
};

type State = {
  reduceMotion: boolean;
  highContrast: boolean;
  simplifiedUI: boolean;
  enhancedFocus: boolean;
  theme: 'default' | 'calm';
  readingSettings: ReadingSettings;
  autoSaveFrequency: number;
};

type Action =
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_HIGH_CONTRAST'; payload: boolean }
  | { type: 'SET_SIMPLIFIED_UI'; payload: boolean }
  | { type: 'SET_ENHANCED_FOCUS'; payload: boolean }
  | { type: 'SET_THEME'; payload: 'default' | 'calm' }
  | { type: 'SET_READING_SETTINGS'; payload: Partial<ReadingSettings> }
  | { type: 'SET_AUTO_SAVE_FREQUENCY'; payload: number }
  | { type: 'SET_STATE'; payload: Partial<State> };

const initialState: State = {
  reduceMotion: false,
  highContrast: false,
  simplifiedUI: false,
  enhancedFocus: true,
  theme: 'default',
  readingSettings: {
    fontSize: 'medium',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  autoSaveFrequency: 30000, // 30 seconds for ADHD users
};

const accessibilityReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_REDUCED_MOTION':
      return { ...state, reduceMotion: action.payload };
    case 'SET_HIGH_CONTRAST':
      return { ...state, highContrast: action.payload };
    case 'SET_SIMPLIFIED_UI':
      return { ...state, simplifiedUI: action.payload };
    case 'SET_ENHANCED_FOCUS':
      return { ...state, enhancedFocus: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_READING_SETTINGS':
      return {
        ...state,
        readingSettings: { ...state.readingSettings, ...action.payload },
      };
    case 'SET_AUTO_SAVE_FREQUENCY':
      return { ...state, autoSaveFrequency: action.payload };
    case 'SET_STATE':
        return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AccessibilityContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(accessibilityReducer, initialState);

  useEffect(() => {
    try {
      const storedPrefs = localStorage.getItem('accessibility-prefs');
      if (storedPrefs) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedPrefs) });
      } else {
        // If no prefs, check OS setting for initial state.
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            dispatch({ type: 'SET_REDUCED_MOTION', payload: true });
        }
      }
    } catch (error) {
      console.error("Failed to load accessibility preferences:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('accessibility-prefs', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save accessibility preferences:", error);
    }
  }, [state]);

  return <AccessibilityContext.Provider value={{ state, dispatch }}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
