export type ListingStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD_OUT';

export interface CropListing {
  id: string;
  nameEn: string;
  nameHi: string;
  image: string;
  ratePerKg: number;
  ratePerQuintal: number;
  totalQuantityKg: number;
  harvestDate: string;
  status: ListingStatus;
  estimatedPayout: number;
  gramMitra: string;
  location: string;
  phone: string;
  variety: string;
  isOrganic: boolean;
}

export interface FarmerProfile {
  id: string;
  name: string;
  nameHi: string;
  avatarUrl: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  bio: string;
  bioHi: string;
  farmName: string;
  farmNameHi: string;
  cultivatedLandAcres: number;
  irrigatedLandAcres: number;
  soilHealthGrade: string;
  irrigationMethod: string;
  farmingTechnique: string;
  cropsGrown: string[];
  assignedGramMitra: {
    name: string;
    hub: string;
    phone: string;
  };
  stats: {
    totalListingsKg: number;
    activeCropsCount: number;
    activeQuantityKg: number;
    completedSalesCount: number;
    totalEarnings: number;
    middlemanSavingsPercent: number;
    middlemanExtraIncome: number;
  };
}

export interface VerificationItem {
  id: string;
  title: string;
  titleHi: string;
  category: 'VERIFIED' | 'DEMO_DATA';
  value: string;
  notes: string;
  status: 'verified' | 'prototype_demo';
}

export interface MandiRate {
  id: string;
  cropEn: string;
  cropHi: string;
  mandi: string;
  modalPrice: number;
  priceRange: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  lastUpdated: string;
}
