'use client';

import { useState, useEffect, useCallback } from 'react';
import { getServices } from '@/lib/api';
import { Service } from '@/lib/types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices();
      setServices(data);
    } catch {
      setError('No se pudieron cargar los servicios. Verifica que el backend esté activo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { services, loading, error, refetch: fetch };
}
