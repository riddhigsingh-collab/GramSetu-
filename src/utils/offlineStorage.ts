import { useState, useEffect } from 'react';
import { CropListing } from '../types/profile';

export type NetworkTier = 'ONLINE_FAST' | '2G_WEAK' | 'OFFLINE';

export interface OfflineDraft {
  id: string;
  type: 'crop_listing' | 'profit_simulation' | 'profile_update';
  title: string;
  summary: string;
  timestamp: number;
  payload: any;
  status: 'pending' | 'syncing' | 'synced';
}

const STORAGE_KEY = 'gramsetu_offline_drafts';
const SIMULATED_TIER_KEY = 'gramsetu_simulated_network_tier';

// Pre-populate with a demo draft for instant inspection
const SEED_DRAFTS: OfflineDraft[] = [
  {
    id: 'draft-offline-981',
    type: 'crop_listing',
    title: 'Yellow Mustard (पीली सरसों)',
    summary: '15 Quintals (1,500 kg) @ ₹56.5/kg • Sehore Field Batch',
    timestamp: Date.now() - 3600000 * 2,
    payload: {
      nameEn: 'Yellow Mustard',
      nameHi: 'पीली सरसों',
      totalQuantityKg: 1500,
      ratePerKg: 56.5,
      harvestDate: 'March 2026',
      variety: 'Pusa Bold Yellow',
      isOrganic: true,
      status: 'AVAILABLE',
    },
    status: 'pending',
  },
];

export function getOfflineDrafts(): OfflineDraft[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DRAFTS));
      return SEED_DRAFTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return SEED_DRAFTS;
  }
}

export function saveOfflineDraft(draft: Omit<OfflineDraft, 'id' | 'timestamp' | 'status'>): OfflineDraft {
  const newDraft: OfflineDraft = {
    ...draft,
    id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: Date.now(),
    status: 'pending',
  };

  const current = getOfflineDrafts();
  const updated = [newDraft, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gramsetu_drafts_updated'));
  } catch (e) {
    console.error('Failed to save offline draft:', e);
  }
  return newDraft;
}

export function removeOfflineDraft(id: string) {
  const current = getOfflineDrafts();
  const updated = current.filter((d) => d.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gramsetu_drafts_updated'));
  } catch (e) {}
}

export function clearSyncedDrafts() {
  const current = getOfflineDrafts();
  const updated = current.filter((d) => d.status === 'pending');
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gramsetu_drafts_updated'));
  } catch (e) {}
}

/**
 * Custom hook to monitor network status & simulation mode
 */
export function useNetworkStatus() {
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [simulatedTier, setSimulatedTier] = useState<NetworkTier>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIMULATED_TIER_KEY) as NetworkTier | null;
      if (saved) return saved;
    }
    return 'ONLINE_FAST';
  });

  const [drafts, setDrafts] = useState<OfflineDraft[]>(getOfflineDrafts);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);
    const handleDraftsUpdate = () => setDrafts(getOfflineDrafts());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('gramsetu_drafts_updated', handleDraftsUpdate);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('gramsetu_drafts_updated', handleDraftsUpdate);
    };
  }, []);

  // Effective tier combines actual browser network + manual simulator override
  const effectiveTier: NetworkTier = !isBrowserOnline
    ? 'OFFLINE'
    : simulatedTier;

  const setNetworkMode = (mode: NetworkTier) => {
    setSimulatedTier(mode);
    try {
      localStorage.setItem(SIMULATED_TIER_KEY, mode);
    } catch (e) {}
  };

  const syncPendingDrafts = async (
    onPublishCrop: (crop: CropListing) => void
  ): Promise<number> => {
    if (effectiveTier === 'OFFLINE') return 0;
    setIsSyncing(true);

    const pending = drafts.filter((d) => d.status === 'pending');
    let syncedCount = 0;

    for (const draft of pending) {
      if (draft.type === 'crop_listing') {
        const p = draft.payload;
        const newCrop: CropListing = {
          id: `synced-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          nameEn: p.nameEn || 'Offline Harvest Crop',
          nameHi: p.nameHi || 'ऑफलाइन फसल',
          image: p.image || '',
          ratePerKg: p.ratePerKg || 30,
          ratePerQuintal: (p.ratePerKg || 30) * 100,
          totalQuantityKg: p.totalQuantityKg || 1000,
          harvestDate: p.harvestDate || 'Harvest 2026',
          status: p.status || 'AVAILABLE',
          estimatedPayout: Math.round((p.ratePerKg || 30) * (p.totalQuantityKg || 1000)),
          gramMitra: 'Mohan (Gram Mitra)',
          location: 'Pipariya, Sehore (Madhya Pradesh)',
          phone: '9876543210',
          variety: p.variety || 'Local Field Spec',
          isOrganic: p.isOrganic ?? true,
        };
        onPublishCrop(newCrop);
        syncedCount++;
      }
      removeOfflineDraft(draft.id);
    }

    setIsSyncing(false);
    return syncedCount;
  };

  return {
    isOnline: effectiveTier !== 'OFFLINE',
    networkTier: effectiveTier,
    isRealOffline: !isBrowserOnline,
    drafts,
    pendingDraftsCount: drafts.filter((d) => d.status === 'pending').length,
    isSyncing,
    setNetworkMode,
    syncPendingDrafts,
  };
}
