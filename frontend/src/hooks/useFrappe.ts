import { useState, useCallback } from 'react';

// Configuration
// In development with Vite proxy, this can be empty or '/api'
const API_BASE_URL = '/api';



interface FrappeResponse<T> {
    message?: T;
    data?: T;
    exc?: string; // Exception trace
    _server_messages?: string; // JSON string of messages
}

export function useFrappe() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const call = useCallback(async <T = any>(
        method: string,
        params?: Record<string, any>
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            // Frappe RPC endpoint structure: /api/method/dotted.path
            const url = `${API_BASE_URL}/method/${method}`;

            // For GET requests, append params to URL
            // For POST, send as JSON body
            // This is a simplified implementation, assuming mostly POST for RPC

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Frappe-CSRF-Token': (window as any).csrf_token || '',
            };

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(params || {}),
            });

            const data: FrappeResponse<T> = await response.json();

            if (!response.ok) {
                throw new Error(data.exc || 'API Call Failed');
            }

            // Frappe usually returns 'message' for RPC calls
            return data.message || data.data || (data as unknown as T);

        } catch (err: any) {
            console.error('Frappe API Error:', err);
            setError(err.message || 'Unknown error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getDoc = useCallback(async <T = any>(doctype: string, name: string): Promise<T | null> => {
        // Using standard REST API for resource
        // GET /api/resource/:doctype/:name
        setLoading(true);
        try {
            const url = `${API_BASE_URL}/resource/${doctype}/${name}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.data) return data.data;
            throw new Error('Document not found');
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getList = useCallback(async <T = any>(
        doctype: string,
        fields: string[] = ['name'],
        filters: any[][] = [],
        order_by?: string,
        limit_start = 0,
        limit_page_length = 20
    ): Promise<T[]> => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                fields: JSON.stringify(fields),
                filters: JSON.stringify(filters),
                limit_start: limit_start.toString(),
                limit_page_length: limit_page_length.toString(),
                ...(order_by ? { order_by } : {})
            });

            const url = `${API_BASE_URL}/resource/${doctype}?${queryParams.toString()}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.data || [];
        } catch (err: any) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        call,
        getDoc,
        getList,
        loading,
        error
    };
}
