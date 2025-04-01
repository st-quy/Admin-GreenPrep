import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Class, ClassApi } from '../api';

interface UseClassesReturn {
  classes: Class[];
  isLoading: boolean;
  error: Error | null;
  deleteClassItem: (classId: string) => Promise<void>;
  setClasses: (classes: Class[]) => void;
}

export const useClasses = (initialClasses: Class[] = []): UseClassesReturn => {
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteClassItem = useCallback(async (classId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await ClassApi.delete(classId);
      setClasses((prevClasses) => prevClasses.filter((c) => c.id !== classId));
      toast.success('Class deleted successfully');
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    classes,
    isLoading,
    error,
    deleteClassItem,
    setClasses,
  };
}; 