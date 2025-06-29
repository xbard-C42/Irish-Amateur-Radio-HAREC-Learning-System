import { useState, useEffect, useRef } from 'react';

export function useAutoSave<T>(data: T, saveFunction: (data: T) => Promise<void>, delay = 15000) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const initialRender = useRef(true);

  useEffect(() => {
    // Don't save on the initial render
    if (initialRender.current) {
        initialRender.current = false;
        return;
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveFunction(data);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveFunction, delay]);

  return { isSaving, lastSaved };
}
