import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileHeader } from './components/ProfileHeader';
import { StatsCards } from './components/StatsCards';
import { FarmingDetails } from './components/FarmingDetails';
import { MyCrops } from './components/MyCrops';
import { TrustVerification } from './components/TrustVerification';
import {
  QuickActions,
  MandiPricesModal,
  ProfitCalculatorModal,
  AiRecommendationsModal,
} from './components/QuickActions';
import { EditProfileModal } from './components/EditProfileModal';
import { AddCropModal } from './components/AddCropModal';
import { VoiceListingModal } from './components/VoiceListingModal';
import { OfflineGuidanceModal } from './components/OfflineGuidanceModal';
import { GramMitraBar } from './components/GramMitraBar';
import { WeatherWidget } from './components/WeatherWidget';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { FooterHelpline } from './components/FooterHelpline';
import { INITIAL_PROFILE, INITIAL_CROPS, VERIFICATION_DATA } from './data/mockData';
import { CropListing, FarmerProfile, ListingStatus } from './types/profile';
import { SupportedDialect } from './utils/dialect';
import { useNetworkStatus, saveOfflineDraft } from './utils/offlineStorage';
import { ParsedVoiceListing } from './utils/indicVoiceParser';
import { CheckCircle2, WifiOff, CloudUpload } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<FarmerProfile>(INITIAL_PROFILE);
  const [crops, setCrops] = useState<CropListing[]>(INITIAL_CROPS);
  const [currentDialect, setCurrentDialect] = useState<SupportedDialect>('hi');
  const [isPictorialMode, setIsPictorialMode] = useState(false);

  // Network & Offline Status Hook
  const {
    isOnline,
    networkTier,
    drafts,
    pendingDraftsCount,
    isSyncing,
    setNetworkMode,
    syncPendingDrafts,
  } = useNetworkStatus();

  // Modals visibility states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isMandiPricesOpen, setIsMandiPricesOpen] = useState(false);
  const [isProfitCalcOpen, setIsProfitCalcOpen] = useState(false);
  const [isAiAdvisoryOpen, setIsAiAdvisoryOpen] = useState(false);
  const [isVoiceListingOpen, setIsVoiceListingOpen] = useState(false);
  const [isFallbackModalOpen, setIsFallbackModalOpen] = useState(false);

  // Prefill state for Add Crop from Voice Assistant
  const [voicePrefill, setVoicePrefill] = useState<Partial<CropListing> | undefined>(undefined);

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isEnglish = currentDialect === 'en';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profile Save Handler
  const handleSaveProfile = (updatedData: Partial<FarmerProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
    showToast(isEnglish ? 'Farmer Profile successfully updated!' : 'किसान प्रोफाइल सफलतापूर्वक अपडेट की गई!');
  };

  // Reset to Baseline Demo
  const handleResetToBaseline = () => {
    setProfile(INITIAL_PROFILE);
    setCrops(INITIAL_CROPS);
    showToast(isEnglish ? 'Restored demo baseline profile data' : 'मूल डेमो प्रोफाइल पुनः स्थापित की गई');
  };

  // Crop Listing Handlers (Supports Offline Draft & Direct Publish)
  const handleAddCrop = (newCrop: CropListing, isDraft = false) => {
    if (isDraft || networkTier === 'OFFLINE') {
      // Save locally as offline draft
      saveOfflineDraft({
        type: 'crop_listing',
        title: `${newCrop.nameEn} (${newCrop.nameHi})`,
        summary: `${newCrop.totalQuantityKg} kg @ ₹${newCrop.ratePerKg}/kg • Local Draft`,
        payload: newCrop,
      });
      showToast(
        isEnglish
          ? 'Offline Mode: Listing saved locally. It will automatically publish when you’re back online.'
          : 'ऑफलाइन मोड: लिस्टिंग स्थानीय रूप से सुरक्षित हो गई। इंटरनेट आते ही स्वतः प्रकाशित होगी।'
      );
    } else {
      // Direct live publish
      setCrops((prev) => [newCrop, ...prev]);
      setProfile((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalListingsKg: prev.stats.totalListingsKg + newCrop.totalQuantityKg,
          activeCropsCount: prev.stats.activeCropsCount + 1,
          activeQuantityKg: prev.stats.activeQuantityKg + newCrop.totalQuantityKg,
          totalEarnings: prev.stats.totalEarnings + newCrop.estimatedPayout,
        },
      }));
      showToast(
        isEnglish
          ? `Added new listing: ${newCrop.nameEn} (${newCrop.totalQuantityKg} kg)`
          : `नई फसल जोड़ी गई: ${newCrop.nameHi} (${newCrop.totalQuantityKg} किग्रा)`
      );
    }
  };

  const handleUpdateCropStatus = (cropId: string, newStatus: ListingStatus) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === cropId ? { ...c, status: newStatus } : c))
    );
    showToast(
      isEnglish
        ? `Listing status updated to ${newStatus}`
        : `फसल स्थिति बदलकर ${newStatus} कर दी गई`
    );
  };

  const handleViewMandiComparison = (_cropName: string) => {
    setIsMandiPricesOpen(true);
  };

  // Handle parsed voice command from Vernacular Voice Assistant
  const handleVoiceListingParsed = (parsed: ParsedVoiceListing) => {
    const prefill: Partial<CropListing> = {
      nameEn: parsed.cropNameEn,
      nameHi: parsed.cropNameHi,
      variety: parsed.variety,
      ratePerKg: parsed.ratePerKg,
      ratePerQuintal: parsed.ratePerQuintal,
      totalQuantityKg: parsed.totalQuantityKg,
      harvestDate: 'Current Season Harvest',
      isOrganic: true,
    };
    setVoicePrefill(prefill);
    setIsAddCropOpen(true);
    showToast(
      isEnglish
        ? `Voice AI transcribed ${parsed.cropNameEn}: ${parsed.totalQuantityQuintals} Qtl @ ₹${parsed.ratePerQuintal}/Qtl`
        : `एआई ने आवाज पहचानी: ${parsed.cropNameHi} (${parsed.totalQuantityQuintals} क्विंटल @ ₹${parsed.ratePerQuintal})`
    );
  };

  // Trigger auto-sync for pending drafts when back online
  const handleManualSync = async () => {
    const syncedCount = await syncPendingDrafts((crop) => {
      setCrops((prev) => [crop, ...prev]);
      setProfile((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalListingsKg: prev.stats.totalListingsKg + crop.totalQuantityKg,
          activeCropsCount: prev.stats.activeCropsCount + 1,
          activeQuantityKg: prev.stats.activeQuantityKg + crop.totalQuantityKg,
          totalEarnings: prev.stats.totalEarnings + crop.estimatedPayout,
        },
      }));
    });

    if (syncedCount > 0) {
      showToast(
        isEnglish
          ? `Successfully pushed and published ${syncedCount} offline drafts!`
          : `${syncedCount} ऑफलाइन ड्राफ्ट सफलतापूर्वक ऑनलाइन प्रकाशित किए गए!`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Platform Header matching Screenshots */}
      <Header
        currentDialect={currentDialect}
        onSelectDialect={setCurrentDialect}
        networkTier={networkTier}
        pendingDraftsCount={pendingDraftsCount}
        isSyncing={isSyncing}
        onSetNetworkMode={setNetworkMode}
        onSyncDrafts={handleManualSync}
        onOpenFallbackModal={() => setIsFallbackModalOpen(true)}
        onOpenVoiceListing={() => setIsVoiceListingOpen(true)}
        isPictorialMode={isPictorialMode}
        onTogglePictorialMode={() => setIsPictorialMode(!isPictorialMode)}
        drafts={drafts}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-5 sm:space-y-6">
        {/* Navigation Breadcrumb & Context Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-200/80 pb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-emerald-800">ग्रामसेतु मंच</span>
            <span>/</span>
            <span>किसान प्रोफाइल डैशबोर्ड</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">{profile.name}</span>
          </div>

          <div className="flex items-center gap-2">
            {pendingDraftsCount > 0 && (
              <button
                onClick={handleManualSync}
                disabled={networkTier === 'OFFLINE' || isSyncing}
                className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-full border border-amber-300 transition-colors cursor-pointer"
              >
                <CloudUpload className="w-3 h-3 text-amber-700" />
                <span>
                  {pendingDraftsCount} {isEnglish ? 'Drafts Pending Sync' : 'ऑफलाइन ड्राफ्ट तैयार'}
                </span>
              </button>
            )}
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-600 font-medium">
              {isEnglish ? 'Profile Viewport: Standalone Module' : 'प्रोफाइल व्यू: स्टैंडअलोन मॉड्यूल'}
            </span>
          </div>
        </div>

        {/* 🤝 Gram Mitra Assisted Mode Bar */}
        <GramMitraBar
          isEnglish={isEnglish}
          onOpenVoiceListing={() => setIsVoiceListingOpen(true)}
          onOpenOfflineSync={handleManualSync}
          pendingDraftsCount={pendingDraftsCount}
        />

        {/* 1. Profile Header with Audio Bio */}
        <ProfileHeader
          profile={profile}
          isEnglish={isEnglish}
          currentDialect={currentDialect}
          onEditClick={() => setIsEditProfileOpen(true)}
        />

        {/* 2. Quick Actions Toolbar */}
        <QuickActions
          isEnglish={isEnglish}
          onOpenAddCrop={() => {
            setVoicePrefill(undefined);
            setIsAddCropOpen(true);
          }}
          onOpenMandiRates={() => setIsMandiPricesOpen(true)}
          onOpenProfitCalculator={() => setIsProfitCalcOpen(true)}
          onOpenAiRecommendations={() => setIsAiAdvisoryOpen(true)}
        />

        {/* 3. Real-Time Agri-Weather Summary Widget */}
        <WeatherWidget
          location={`${profile.village}, ${profile.district} (${profile.state})`}
          isEnglish={isEnglish}
          currentDialect={currentDialect}
          isOffline={networkTier === 'OFFLINE'}
        />

        {/* 4. Statistics Cards */}
        <StatsCards stats={profile.stats} isEnglish={isEnglish} />

        {/* 4. Farming & Land Operations Details */}
        <FarmingDetails profile={profile} isEnglish={isEnglish} />

        {/* 5. My Crops Section (Listing Cards Grid with Pictorial Mode & Audio) */}
        <MyCrops
          crops={crops}
          isEnglish={isEnglish}
          currentDialect={currentDialect}
          isPictorialMode={isPictorialMode}
          onAddCropClick={() => {
            setVoicePrefill(undefined);
            setIsAddCropOpen(true);
          }}
          onUpdateCropStatus={handleUpdateCropStatus}
          onViewMandiComparison={handleViewMandiComparison}
        />

        {/* 6. Trust & Verification (Distinguishing Verified vs Demo Data) */}
        <TrustVerification items={VERIFICATION_DATA} isEnglish={isEnglish} />

        {/* 7. Government Agricultural Helplines (Matching Screenshot 1) */}
        <FooterHelpline isEnglish={isEnglish} currentDialect={currentDialect} />
      </main>

      {/* Floating Audio Read-Aloud Player Bar */}
      <AudioPlayerBar isEnglish={isEnglish} />

      {/* Interactive Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        profile={profile}
        isEnglish={isEnglish}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveProfile}
        onResetToDefault={handleResetToBaseline}
      />

      <AddCropModal
        isOpen={isAddCropOpen}
        isEnglish={isEnglish}
        isOffline={networkTier === 'OFFLINE'}
        onClose={() => {
          setIsAddCropOpen(false);
          setVoicePrefill(undefined);
        }}
        onAddCrop={handleAddCrop}
        onOpenVoiceAssistant={() => setIsVoiceListingOpen(true)}
        prefillData={voicePrefill}
      />

      <VoiceListingModal
        isOpen={isVoiceListingOpen}
        onClose={() => setIsVoiceListingOpen(false)}
        currentDialect={currentDialect}
        onListingFilled={handleVoiceListingParsed}
        isEnglish={isEnglish}
      />

      <OfflineGuidanceModal
        isOpen={isFallbackModalOpen}
        onClose={() => setIsFallbackModalOpen(false)}
        isEnglish={isEnglish}
      />

      <MandiPricesModal
        isOpen={isMandiPricesOpen}
        isEnglish={isEnglish}
        currentDialect={currentDialect}
        onClose={() => setIsMandiPricesOpen(false)}
      />

      <ProfitCalculatorModal
        isOpen={isProfitCalcOpen}
        isEnglish={isEnglish}
        onClose={() => setIsProfitCalcOpen(false)}
      />

      <AiRecommendationsModal
        isOpen={isAiAdvisoryOpen}
        isEnglish={isEnglish}
        currentDialect={currentDialect}
        onClose={() => setIsAiAdvisoryOpen(false)}
      />

      {/* Subtle Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-slate-700 max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
