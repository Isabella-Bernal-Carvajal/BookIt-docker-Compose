'use client';

import { useServices } from '@/hooks/useServices';
import ServiceCard from './ServiceCard';
import Spinner from '@/components/ui/Spinner';
import { ErrorAlert } from '@/components/ui/StateViews';
import { EmptyState } from '@/components/ui/StateViews';

export default function ServiceList() {
  const { services, loading, error, refetch } = useServices();

  if (loading) return <Spinner size="lg" />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;
  if (!services.length)
    return (
      <EmptyState
        title="Sin servicios disponibles"
        description="El backend no devolvió ningún servicio aún."
      />
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((svc) => (
        <ServiceCard key={svc.id} service={svc} />
      ))}
    </div>
  );
}
