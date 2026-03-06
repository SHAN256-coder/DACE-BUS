import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BusRoute } from '@/data/routes';

export function useRoutes() {
    const [routes, setRoutes] = useState<BusRoute[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRoutes() {
            try {
                setLoading(true);
                setError(null);

                const { data: routesData, error: routesError } = await supabase
                    .from('routes')
                    .select(`
            id,
            route_number,
            vehicle_number,
            driver_name,
            driver_phone,
            arrival_time,
            boarding_points (
              id,
              name,
              time,
              sort_order
            )
          `)
                    .order('route_number', { ascending: true });

                if (routesError) throw routesError;

                const mapped: BusRoute[] = (routesData ?? []).map((r: any) => ({
                    routeNumber: r.route_number,
                    vehicleNumber: r.vehicle_number,
                    driverName: r.driver_name,
                    driverPhone: r.driver_phone,
                    arrivalTime: r.arrival_time,
                    boardingPoints: (r.boarding_points ?? [])
                        .sort((a: any, b: any) => a.sort_order - b.sort_order)
                        .map((bp: any) => ({ name: bp.name, time: bp.time })),
                }));

                setRoutes(mapped);
            } catch (err: any) {
                console.error('Failed to fetch routes from Supabase:', err);
                setError(err.message ?? 'Failed to load routes');
            } finally {
                setLoading(false);
            }
        }

        fetchRoutes();
    }, []);

    return { routes, loading, error };
}
