export interface CropData {
  id: string;
  name: string;
  image: string;
  category: string;
  cropType: string;
  climateRequirements: string;
  soilType: string;
  benefits: string[];
  growingProfile: {
    season: string;
    duration: string;
    temperature: string;
    rainfall: string;
    landPreparation: string;
    sowingMethod: string;
    spacing: string;
    irrigationNeeds: string;
    harvestingAge: string;
  };
  profitMargin: {
    costPerAcre: string;
    yieldPerAcre: string;
    marketPrice: string;
    netProfit: string;
  };
  marketDemand: string;
  fertiliserSuggestions: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    organic: string;
    micronutrients: string;
  };
  pestDiseases: string[];
  usesAndBenefits: string;
}

export const cropsDatabase: CropData[] = [
  // A - African Eggplant
  {
    id: 'african-eggplant',
    name: 'African Eggplant',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4329d?w=400&h=400&fit=crop',
    category: 'A',
    cropType: 'Vegetable - Solanaceae',
    climateRequirements: 'Warm season (22-30°C), prefers tropical & subtropical climates',
    soilType: 'Well-drained loamy soil with good organic matter',
    benefits: [
      'High nutritional value - rich in vitamins & minerals',
      'Low calorie content - great for health-conscious farmers',
      'Growing market demand in urban areas',
      'Multiple harvests per season',
      'Excellent export potential'
    ],
    growingProfile: {
      season: 'Kharif (June-September) & Rabi (October-January)',
      duration: '180-200 days from sowing to harvest',
      temperature: '22-30°C optimal; minimum 15°C',
      rainfall: '1000-2000 mm annually',
      landPreparation: '3-4 deep ploughings, 20 tonnes FYM per acre',
      sowingMethod: 'Seedlings @ 45cm x 60cm spacing',
      spacing: 'Row to row: 60cm, Plant to plant: 45cm',
      irrigationNeeds: 'Heavy water requirement, weekly irrigation in summer',
      harvestingAge: '90-120 days after transplanting'
    },
    profitMargin: {
      costPerAcre: '₹25,000-30,000',
      yieldPerAcre: '15-20 tonnes',
      marketPrice: '₹8-12 per kg',
      netProfit: '₹90,000-1,20,000 per acre'
    },
    marketDemand: 'High demand in metro cities & export markets (60% premium over local varieties)',
    fertiliserSuggestions: {
      nitrogen: '120 kg/acre (in 3 splits) - critical for vegetative growth',
      phosphorus: '60 kg/acre - enhances root development',
      potassium: '60 kg/acre - improves fruit quality & shelf life',
      organic: '20 tonnes FYM per acre - improves soil structure',
      micronutrients: 'Boron 1 kg/acre - prevents blossom-end rot'
    },
    pestDiseases: [
      'Fruit & shoot borer (spray neem oil 3% at 10-day intervals)',
      'Leaf hopper (use yellow sticky traps)',
      'Fusarium wilt (crop rotation, resistant varieties)',
      'Anthracnose (Bordeaux mixture 1%)'
    ],
    usesAndBenefits: 'Rich in antioxidants, fiber, and phytonutrients. Used in curries, grilled dishes, and traditional medicine across Africa & Asia.'
  },

  // A - Alfalfa
  {
    id: 'alfalfa',
    name: 'Alfalfa (Lucerne)',
    image: 'https://images.unsplash.com/photo-1574014622837-38bc17a715b5?w=400&h=400&fit=crop',
    category: 'A',
    cropType: 'Forage Crop - Legume',
    climateRequirements: 'Cool to warm season (10-25°C), drought tolerant once established',
    soilType: 'Well-drained loamy to clayey soil, pH 6.5-7.5, deep-rooted crop',
    benefits: [
      'High protein content (15-20%) - excellent for dairy cattle',
      'Nitrogen fixation - improves soil fertility for next crop',
      'Perennial crop - 4-5 years production from single sowing',
      'Multiple cuts per season (4-6 cuts)',
      'Reduces feed costs for livestock farmers',
      'Excellent export market for hay'
    ],
    growingProfile: {
      season: 'Year-round crop; sowing: Sept-Nov (cool season preferred)',
      duration: '4-5 years of continuous production per sowing',
      temperature: '10-25°C optimal; grows even at 5-30°C',
      rainfall: '400-1000 mm (well-distributed), supplementary irrigation needed',
      landPreparation: '3-4 ploughings, no FYM needed (nitrogen-fixing)',
      sowingMethod: 'Broadcasting @ 25 kg/acre with sand',
      spacing: 'Broadcast method, no specific spacing',
      irrigationNeeds: 'Light irrigation at sowing, then based on rainfall',
      harvestingAge: 'First cut at 45-50 days, then every 30-40 days'
    },
    profitMargin: {
      costPerAcre: '₹8,000-10,000 (per year)',
      yieldPerAcre: '40-50 tonnes fresh fodder/year (4-6 cuts)',
      marketPrice: '₹2-3 per kg fresh; ₹15-20 per kg dry hay',
      netProfit: '₹60,000-80,000 per acre annually'
    },
    marketDemand: 'High demand from diary farms, animal feed manufacturers, and hay export market',
    fertiliserSuggestions: {
      nitrogen: 'No nitrogen after establishment (self-fixing), initial dose 40 kg for germination',
      phosphorus: '40 kg/acre - encourages root development',
      potassium: '30 kg/acre - aids overall plant growth',
      organic: 'No FYM needed; provides organic matter itself',
      micronutrients: 'Boron 1 kg/acre - prevents hollow heart'
    },
    pestDiseases: [
      'Pod borer (neem spray at pod formation)',
      'Leaf hopper (yellow sticky traps)',
      'Rust (fungal disease, manageable with resistant varieties)',
      'Wilt (crop rotation recommended)'
    ],
    usesAndBenefits: 'Primary feed for dairy cattle, maintains milk production. Also used as green manure to enrich soil with nitrogen. Export quality hay fetches premium prices.'
  },

  // A - Almond
  {
    id: 'almond',
    name: 'Almond',
    image: 'https://images.unsplash.com/photo-1585707142207-e73d71bc2653?w=400&h=400&fit=crop',
    category: 'A',
    cropType: 'Tree Crop - Nut',
    climateRequirements: 'Temperate climate (15-25°C), needs winter chill hours (200-800 hours below 7°C)',
    soilType: 'Deep loamy soil with good drainage, pH 6.5-8.0',
    benefits: [
      'Premium price in domestic & export markets (₹400-600 per kg)',
      'Long economic life (20-50 years from single tree)',
      'Low maintenance after establishment',
      'High nutrition & medicinal value',
      'Growing global demand',
      'Can be intercropped with vegetables initially'
    ],
    growingProfile: {
      season: 'Spring (Feb-March) for planting',
      duration: '3-4 years to first production, full production by year 7-8',
      temperature: '15-25°C; requires winter chill (200-800 hours below 7°C)',
      rainfall: '400-600 mm annually; supplementary irrigation essential',
      landPreparation: '2 metres deep pit preparation, with FYM & sand mixture',
      sowingMethod: 'Grafted nursery plants @ 6m x 6m or 7m x 7m spacing',
      spacing: '6m x 6m (55-60 plants/acre), or 7m x 7m (40-45 plants/acre)',
      irrigationNeeds: 'Critical at flowering, fruit set, and kernel development stages',
      harvestingAge: 'First fruit at 3-4 years, full harvest by 7-8 years'
    },
    profitMargin: {
      costPerAcre: '₹1,50,000-2,00,000 (establishment + 3 years maintenance)',
      yieldPerAcre: '3-4 tonnes dried kernel by year 8-10',
      marketPrice: '₹400-600 per kg (kernel)',
      netProfit: '₹12,00,000-16,00,000+ per acre (annual, mature orchard)'
    },
    marketDemand: 'Very high - domestic consumption ₹500 crore/year + major export market (USA, UAE, Europe)',
    fertiliserSuggestions: {
      nitrogen: '100 kg/acre/year (split doses) - for vegetative growth',
      phosphorus: '50 kg/acre/year - for flower & fruit development',
      potassium: '50 kg/acre/year - for quality & disease resistance',
      organic: '20 tonnes FYM every 2 years - improves soil structure',
      micronutrients: 'Zinc 5 kg/acre, Boron 2 kg/acre - prevents deficiency disorders'
    },
    pestDiseases: [
      'Almond moth (pheromone traps, neem spray)',
      'Mites (sulfur dust at bud break)',
      'Blights (copper fungicide, pruning infected branches)',
      'Gummosis (improve drainage, avoid waterlogging)'
    ],
    usesAndBenefits: 'Highly nutritious - rich in protein, healthy fats, and minerals. Used in confections, oil extraction, and traditional medicine. Growing health-conscious consumer demand.'
  },

  // A - Apple
  {
    id: 'apple',
    name: 'Apple',
    image: 'https://images.unsplash.com/photo-1560806674-104e4eeffa92?w=400&h=400&fit=crop',
    category: 'A',
    cropType: 'Tree Crop - Fruit',
    climateRequirements: 'Cool temperate climate (12-20°C), hill stations suited; requires winter chilling',
    soilType: 'Well-drained loamy soil, pH 6.0-7.5, deep soil necessary',
    benefits: [
      'High market demand - "An apple a day keeps doctor away" - premium prices',
      'Good shelf-life - enables distant marketing',
      'Agritourism potential - apple orchards attract tourists',
      'Intercropping possibilities during early years',
      'Long productive life (40+ years)',
      'Export potential - global market'
    ],
    growingProfile: {
      season: 'Plantation: Oct-Dec in hills, Jan-Feb in plains',
      duration: '2-3 years to first harvest, full production by 5-8 years',
      temperature: '10-20°C optimal; winter chilling required (600-1200 hours below 7°C)',
      rainfall: '1100-2250 mm; requires supplementary irrigation in dry months',
      landPreparation: '60cm x 60cm x 60cm pits with FYM mixture',
      sowingMethod: 'Grafted nursery plants on rootstocks (M-9, M-26 for semi-dwarfs)',
      spacing: '4m x 4m (62-65 plants/acre), or 5m x 5m (40-44 plants/acre)',
      irrigationNeeds: 'Critical at budbreak, flowering, and fruit development',
      harvestingAge: '2-3 years to first fruit, full yield by 5-8 years'
    },
    profitMargin: {
      costPerAcre: '₹2,50,000-3,50,000 (establishment + 2 years)',
      yieldPerAcre: '8-12 tonnes by year 5-6',
      marketPrice: '₹30-60 per kg (local), ₹80-150 per kg (premium)',
      netProfit: '₹3,00,000-6,00,000 per acre (mature orchard)'
    },
    marketDemand: 'High domestic demand + export to Middle East, UK, premium prices year-round',
    fertiliserSuggestions: {
      nitrogen: '120 kg/acre/year (split: 4 doses) - for foliage & growth',
      phosphorus: '60 kg/acre/year - for flowering & fruit set',
      potassium: '50 kg/acre/year - for fruit quality & sweetness',
      organic: '20 tonnes FYM/year - maintains soil health',
      micronutrients: 'Zinc, Iron, Boron - prevent physiological disorders'
    },
    pestDiseases: [
      'Codling moth (pheromone traps, spinosad spray)',
      'Powdery mildew (sulfur spray at first sign)',
      'Leaf hopper (neem oil spray)',
      'Stem canker (pruning, copper paste application)'
    ],
    usesAndBenefits: 'One of the world\'s healthiest fruits - rich in fiber, antioxidants, vitamin C. Used fresh, in juices, processed foods, and traditional medicine.'
  },

  // A - Apricot
  {
    id: 'apricot',
    name: 'Apricot',
    image: 'https://images.unsplash.com/photo-1585707142207-e73d71bc2653?w=400&h=400&fit=crop',
    category: 'A',
    cropType: 'Tree Crop - Stone Fruit',
    climateRequirements: 'Temperate climate (10-20°C), needs winter chill (400-600 hours below 7°C)',
    soilType: 'Well-drained loamy soil, pH 6.5-8.0, deep rooting system',
    benefits: [
      'Early bearing variety - profitable from year 3-4',
      'High nutritional value - rich in beta-carotene & fiber',
      'Excellent drying potential - dried apricots command premium prices',
      'Adaptable to various climatic zones',
      'Minimal pest pressure compared to other stone fruits',
      'Growing export market (especially dried apricots)'
    ],
    growingProfile: {
      season: 'Plantation: Nov-Jan in cooler areas, Feb-March in warmer areas',
      duration: '3-4 years to significant production',
      temperature: '10-20°C optimal; requires 400-600 chilling hours',
      rainfall: '800-1200 mm; supplementary irrigation needed',
      landPreparation: 'Deep pits (50cm x 50cm x 50cm) with FYM addition',
      sowingMethod: 'Grafted plants @ 5m x 5m or 6m x 6m spacing',
      spacing: '5m x 5m (40-44 plants/acre) for dwarf varieties',
      irrigationNeeds: 'Regular during growing season, minimal in off-season',
      harvestingAge: '3-4 years to first crop'
    },
    profitMargin: {
      costPerAcre: '₹1,20,000-1,50,000 (establishment)',
      yieldPerAcre: '5-8 tonnes fresh (12-15 tonnes in good years)',
      marketPrice: '₹20-40 per kg (fresh), ₹150-250 per kg (dried)',
      netProfit: '₹2,00,000-4,00,000 annually'
    },
    marketDemand: 'High domestic and export demand; dried apricots especially premium in Gulf & European markets',
    fertiliserSuggestions: {
      nitrogen: '100 kg/acre/year (split doses)',
      phosphorus: '50 kg/acre/year',
      potassium: '50 kg/acre/year',
      organic: '15 tonnes FYM/year',
      micronutrients: 'Boron 2 kg/acre - critical for fruit set'
    },
    pestDiseases: [
      'Shot hole disease (copper fungicide)',
      'Die-back (pruning infected branches, sulfur dust)',
      'Fruit fly (bagging fruits, neem spray)',
      'Mites (sulfur dust at bud break)'
    ],
    usesAndBenefits: 'Excellent source of beta-carotene, fiber, and minerals. Fresh consumption and drying for export. Used in jams, juices, and traditional medicine.'
  },

  // A - Artichoke
  {
    id: 'artichoke',
    name: 'Artichoke',
    image: 'https://images.unsplash.com/photo-1587627882411-98a36c727404?w=400&h=400&fit=crop',
    category: 'A',
    cropType: 'Vegetable - Asteraceae',
    climateRequirements: 'Cool season (18-22°C), can tolerate some frost, winter crop ideal',
    soilType: 'Well-drained loamy soil rich in organic matter, pH 6.0-7.5',
    benefits: [
      'Premium vegetable in export markets - commands 2-3x higher price',
      'Perennial crop - yields for 4-5 years from single planting',
      'Multiple harvests per season',
      'Growing health-conscious consumer demand (inulin content)',
      'Suitable for organic farming',
      'Agritourism attraction'
    ],
    growingProfile: {
      season: 'Rabi crop (Sept-Feb cultivation, Oct-May flowering)',
      duration: 'Perennial; continuous harvesting for 4-5 years',
      temperature: '18-22°C optimal; 12-25°C range suitable',
      rainfall: '600-800 mm annually; supplementary irrigation essential',
      landPreparation: 'Deep ploughing with FYM incorporation',
      sowingMethod: 'Suckers/offshoots in raised beds @ 75cm x 75cm spacing',
      spacing: '75cm x 75cm (14-16 plants per 100 sq.m)',
      irrigationNeeds: 'Weekly irrigation in summer, fortnightly in winter',
      harvestingAge: '90-120 days for first harvest, then every 2-3 weeks'
    },
    profitMargin: {
      costPerAcre: '₹30,000-35,000 (per year)',
      yieldPerAcre: '8-12 tonnes heads/year (per acre)',
      marketPrice: '₹15-25 per kg (local), ₹40-60 per kg (export quality)',
      netProfit: '₹1,00,000-2,00,000 per acre annually'
    },
    marketDemand: 'Very high in export markets (Europe, USA); premium for fresh, organic produce',
    fertiliserSuggestions: {
      nitrogen: '150 kg/acre (in 3-4 splits) - promotes head growth',
      phosphorus: '60 kg/acre - strengthens plant',
      potassium: '60 kg/acre - improves head quality',
      organic: '25 tonnes FYM/year - critical for perennial production',
      micronutrients: 'Boron 1 kg/acre - prevents hollow head'
    },
    pestDiseases: [
      'Leaf hopper (yellow sticky traps)',
      'Thistle fly (neem spray)',
      'Stem canker (basal spraying with copper fungicide)',
      'Root rot (improve drainage, crop rotation)'
    ],
    usesAndBenefits: 'Rich in inulin (prebiotic fiber), polyphenols, and minerals. Aids digestion, liver health, and immune function. Delicacy in Mediterranean cuisine.'
  },

  // B - Banana
  {
    id: 'banana',
    name: 'Banana',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4329d?w=400&h=400&fit=crop',
    category: 'B',
    cropType: 'Herbaceous Crop - Fruit',
    climateRequirements: 'Tropical to subtropical (18-30°C), high humidity required',
    soilType: 'Deep, well-drained loamy soil rich in organic matter, pH 6.0-7.5',
    benefits: [
      'Quick returns - first harvest in 10-12 months',
      'High market demand - year-round consumption',
      'Multiple uses - fresh fruit, processing, export',
      'Additional income from suckers - continuous planting',
      'Adaptable companion crop possibilities',
      'Global export market'
    ],
    growingProfile: {
      season: 'Year-round crop; best planting: June-Sept (monsoon)',
      duration: '10-12 months to first harvest, 20-24 months for full cycle',
      temperature: '18-30°C optimal; growth ceases below 15°C',
      rainfall: '1500-2250 mm annually; mulching essential in dry zones',
      landPreparation: 'Deep ploughing; pits 60cm x 60cm x 60cm with FYM',
      sowingMethod: 'Sucker propagation @ 2.4m x 2.4m (1600-1800 plants/acre)',
      spacing: '2.4m x 2.4m (standard), 2m x 2m (high-density)',
      irrigationNeeds: 'Critical during flowering & fruit development (weekly in summer)',
      harvestingAge: '10-12 months first harvest, subsequent bunches every 4-5 months'
    },
    profitMargin: {
      costPerAcre: '₹50,000-60,000 (year one)',
      yieldPerAcre: '45-50 tonnes fresh fruit (at 2.4m x 2.4m spacing)',
      marketPrice: '₹10-20 per kg (local), ₹25-35 per kg (export)',
      netProfit: '₹3,50,000-5,00,000 annually'
    },
    marketDemand: 'Highest among fruits globally - major export potential (UK, Gulf, USA)',
    fertiliserSuggestions: {
      nitrogen: '200-300 kg/acre/year (heavy feeder) - critical for growth',
      phosphorus: '100 kg/acre/year - flower & fruit development',
      potassium: '250-300 kg/acre/year - fruit quality & shelf-life',
      organic: '30-40 tonnes FYM/year - heavy feeder, mulching essential',
      micronutrients: 'Boron 5 kg/acre (split), Zinc applied in deficient areas'
    },
    pestDiseases: [
      'Panama disease (wilt) - use resistant varieties',
      'Leaf spots (Sigatoka) - single or yellow; fungicide spray',
      'Weevil borers - field sanitation, neem spray',
      'Nematodes - resistant varieties, crop rotation'
    ],
    usesAndBenefits: 'Nutritious and affordable - rich in potassium, vitamin B6, vitamin C. Aids digestion, heart health, and energy. Used fresh, processed, and as animal feed.'
  },

  // B - Bean
  {
    id: 'bean',
    name: 'Bean (Green Bean/French Bean)',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    category: 'B',
    cropType: 'Vegetable - Legume',
    climateRequirements: 'Warm season (20-30°C), can tolerate 15-35°C, photoinsensitive',
    soilType: 'Well-drained loamy soil, pH 6.0-7.0, poor in heavy clay',
    benefits: [
      'Quick maturity - harvest in 50-60 days',
      'Nitrogen-fixing crop - improves soil fertility',
      'High export demand - premium prices',
      'Multiple pickings from single plant',
      'High nutritional value - protein, vitamins',
      'Ideal for organic farming'
    ],
    growingProfile: {
      season: 'Kharif (June-Sept) & Rabi (Sept-Jan) depending on variety',
      duration: '50-70 days from sowing to harvest',
      temperature: '20-30°C optimal; minimum 15°C, maximum 35°C',
      rainfall: '600-1200 mm; supplementary irrigation in dry spells',
      landPreparation: '2-3 ploughings, light FYM (5 tonnes/acre)',
      sowingMethod: 'Direct seeding @ 40-50 kg/acre',
      spacing: '30-40cm rows, 10cm between plants',
      irrigationNeeds: 'Light watering at sowing, then 7-10 day intervals',
      harvestingAge: '50-60 days for tender beans, 70-80 days for mature seeds'
    },
    profitMargin: {
      costPerAcre: '₹12,000-15,000',
      yieldPerAcre: '8-10 tonnes (green beans), 2-2.5 tonnes (dry beans)',
      marketPrice: '₹15-25 per kg (export quality), ₹8-12 per kg (local)',
      netProfit: '₹80,000-1,20,000 per acre'
    },
    marketDemand: 'High export demand - EU, Middle East, Malaysia; frozen beans premium',
    fertiliserSuggestions: {
      nitrogen: '40 kg/acre (at flowering, as legume self-fixes)',
      phosphorus: '40 kg/acre - critical for flowering & pod set',
      potassium: '30 kg/acre - improves pod quality',
      organic: '5 tonnes FYM/acre - light application',
      micronutrients: 'Boron 1 kg/acre - prevents pod abortion'
    },
    pestDiseases: [
      'Pod borer (neem spray, pheromone traps)',
      'Leaf hopper & whitefly (insecticidal soapy water)',
      'Anthracnose (copper fungicide, resistant variety)',
      'Bean rust (sulfur dusting)'
    ],
    usesAndBenefits: 'Excellent source of protein, fiber, and minerals. Supports heart health, digestion, and blood sugar control. Used fresh, frozen, canned, and dried.'
  },

  // B - Blackberry
  {
    id: 'blackberry',
    name: 'Blackberry',
    image: 'https://images.unsplash.com/photo-1585307924245-dba1f33d7d13?w=400&h=400&fit=crop',
    category: 'B',
    cropType: 'Bush Fruit - Bramble',
    climateRequirements: 'Temperate climate (10-25°C), adaptable, tolerates cold winters',
    soilType: 'Well-drained loamy soil, pH 5.5-7.0, tolerates slightly acidic',
    benefits: [
      'Growing international demand - superfood trend',
      'Premium prices in fresh & processed markets',
      'Minimal pest & disease pressure',
      'Productive for 10-15 years from single planting',
      'Ideal for agritourism - pick-your-own farms',
      'Multiple uses - fresh, jam, wine, dried'
    ],
    growingProfile: {
      season: 'Planting: Nov-Feb in hills, Oct-Nov in plains',
      duration: '2 years to significant production, full production by year 3-4',
      temperature: '10-25°C; tolerates -15°C to 35°C',
      rainfall: '600-1000 mm; requires soil moisture conservation',
      landPreparation: 'Raised beds with 10 tonnes FYM/acre',
      sowingMethod: 'Cane planting @ 2m x 3m or 2m x 2.5m spacing',
      spacing: '2m x 2.5m to 2m x 3m (600-800 plants/acre)',
      irrigationNeeds: 'Regular watering during fruit development',
      harvestingAge: '2nd year production onwards, peak at year 3-5'
    },
    profitMargin: {
      costPerAcre: '₹80,000-1,00,000 (establishment)',
      yieldPerAcre: '5-8 tonnes by year 3-4',
      marketPrice: '₹80-150 per kg (fresh), ₹200-300 per kg (organic)',
      netProfit: '₹3,00,000-5,00,000 per acre annually'
    },
    marketDemand: 'Very high - superfood trend, export to USA, Europe, Middle East',
    fertiliserSuggestions: {
      nitrogen: '100 kg/acre/year (post-harvest)',
      phosphorus: '50 kg/acre/year',
      potassium: '80 kg/acre/year - improves fruit quality',
      organic: '15 tonnes FYM/year - mulching essential',
      micronutrients: 'Boron 2 kg/acre - prevents crumbly berries'
    },
    pestDiseases: [
      'Cane blight (prune infected canes, burn off-season)',
      'Orange rust (destroy infected plants)',
      'Mites (sulfur dust or neem oil)',
      'Rose chafer (hand-picking if light infestation)'
    ],
    usesAndBenefits: 'Superfood - packed with antioxidants, fiber, vitamins. Supports heart, brain, and digestive health. Used fresh, in jams, juices, wines, and supplements.'
  },

  // B - Blueberry
  {
    id: 'blueberry',
    name: 'Blueberry',
    image: 'https://images.unsplash.com/photo-1599599810969-d2498c781b2f?w=400&h=400&fit=crop',
    category: 'B',
    cropType: 'Bush Fruit - Ericaceae',
    climateRequirements: 'Temperate (10-25°C), needs winter chill (400-900 hours below 7°C)',
    soilType: 'Acidic sandy loam (pH 4.5-5.5), excellent drainage critical',
    benefits: [
      'Premium international superfood - commands highest prices among berries',
      'Highly nutritious - antioxidants, anthocyanins',
      'Productive for 30+ years from single plant',
      'Minimal pesticide needs - naturally resistant',
      'Growing health-conscious market demand',
      'Export potential to USA, Europe, Middle East'
    ],
    growingProfile: {
      season: 'Planting: Nov-Feb for dormant canes',
      duration: '2-3 years to first commercial harvest',
      temperature: '10-25°C; needs 400-900 chill hours (chilling critical)',
      rainfall: '900-1500 mm; soil moisture must be maintained',
      landPreparation: 'Raised beds (30cm height) with peat/acid-forming materials',
      sowingMethod: 'Container plants @ 1.5m x 2m or 2m x 2m spacing',
      spacing: '1.5m x 2m (1330 plants/acre) to 2m x 2m (1000 plants/acre)',
      irrigationNeeds: 'Drip irrigation preferred - moisture-sensitive',
      harvestingAge: '2-3 years to significant harvest'
    },
    profitMargin: {
      costPerAcre: '₹2,00,000-2,50,000 (establishment, soil amendment)',
      yieldPerAcre: '5-8 tonnes by year 4-5',
      marketPrice: '₹150-250 per kg (fresh), ₹300-500 per kg (organic)',
      netProfit: '₹5,00,000-8,00,000 per acre annually'
    },
    marketDemand: 'Very high - superfood premium pricing, export markets competitive',
    fertiliserSuggestions: {
      nitrogen: '80-100 kg/acre/year (acid-forming sources)',
      phosphorus: '30 kg/acre/year',
      potassium: '60 kg/acre/year',
      organic: '15-20 tonnes peat/acid-forming materials annually',
      micronutrients: 'Iron, Manganese - acidifying sulfur helps availability'
    },
    pestDiseases: [
      'Anthracnose (sulfur spray, improve drainage)',
      'Mummy berry (remove infected berries, sanitation)',
      'Powdery mildew (sulfur dust)',
      'Spider mites (neem oil or sulfur)'
    ],
    usesAndBenefits: 'Superfood loaded with anthocyanins & antioxidants - cognitive health, vision, heart health. Used fresh, frozen, in jams, juices, supplements, and cosmetics.'
  },

  // C - Cassava
  {
    id: 'cassava',
    name: 'Cassava (Manioc)',
    image: 'https://images.unsplash.com/photo-1599599810975-1c8c9e1c0b3c?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Root Crop - Euphorbiaceae',
    climateRequirements: 'Tropical & subtropical (18-30°C), drought tolerant once established',
    soilType: 'Well-drained sandy loam to clay loam, pH 5.5-7.0, tolerates poor soils',
    benefits: [
      'Drought tolerant - grows in marginal lands',
      'High starch content - industrial & food uses',
      'Long productive life - 12-24 months continuous harvesting',
      'Leaves are nutritious animal feed (20% protein)',
      'Growing biofuel & starch industry demand',
      'Low input requirement'
    ],
    growingProfile: {
      season: 'Year-round planting; best: May-July (monsoon onset)',
      duration: '12-18 months for tableroot, 18-24 months for maximum yield',
      temperature: '18-30°C optimal; minimum 10°C',
      rainfall: '750-2000 mm; tolerates both wet and dry conditions',
      landPreparation: '2-3 ploughings, light FYM (5-6 tonnes/acre)',
      sowingMethod: 'Stake/sett planting (20-25cm cuttings) @ 75cm x 60cm spacing',
      spacing: '75cm x 60cm (2000-2200 plants/acre)',
      irrigationNeeds: 'Supplementary irrigation only in severe drought',
      harvestingAge: '12-18 months for fresh use, 18-24 months for starch'
    },
    profitMargin: {
      costPerAcre: '₹12,000-15,000',
      yieldPerAcre: '18-20 tonnes starchy roots, 3-4 tonnes fodder',
      marketPrice: '₹2-4 per kg (roots), ₹1,500-2,000 per tonne (starch)',
      netProfit: '₹50,000-80,000 per acre'
    },
    marketDemand: 'Growing demand from starch factories, biofuel industry, food processing (tapioca)',
    fertiliserSuggestions: {
      nitrogen: '80-100 kg/acre - critical first 5 months',
      phosphorus: '40-60 kg/acre - root development',
      potassium: '80-100 kg/acre - starch accumulation',
      organic: '5-6 tonnes FYM/acre',
      micronutrients: 'Zinc if deficiency symptoms appear'
    },
    pestDiseases: [
      'Leaf hopper (neem spray)',
      'Mites (sulfur dust)',
      'Cassava brown streak virus (resistance varieties)',
      'Root rot (good drainage, resistant varieties)'
    ],
    usesAndBenefits: 'Staple carbohydrate in tropical regions - cassava leaves high in protein. Tapioca production, animal feed, biofuel source. Gluten-free food option.'
  },

  // C - Corn (Maize)
  {
    id: 'corn-maize',
    name: 'Corn (Maize)',
    image: 'https://images.unsplash.com/photo-1585707142207-e73d71bc2653?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Cereal Crop - Gramineae',
    climateRequirements: 'Warm season (21-27°C), tolerates 10-35°C, moderate rainfall',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-7.5',
    benefits: [
      'Highest production among cereals globally',
      'Multiple uses - food, feed, industrial (oil, starch, biofuel)',
      'Hybrid varieties - higher yields',
      'Quick maturity - 120-140 days',
      'Strong market demand',
      'Better profit margins than wheat'
    ],
    growingProfile: {
      season: 'Kharif (May-Oct) & Rabi (Sept-Feb) depending on region',
      duration: '120-140 days from sowing to harvest',
      temperature: '21-27°C optimal; critical at tasseling',
      rainfall: '500-750 mm; supplementary irrigation beneficial',
      landPreparation: '2-3 ploughings with FYM (10 tonnes/acre)',
      sowingMethod: 'Direct seeding @ 20-25 kg/acre',
      spacing: '60cm rows x 20-25cm between plants',
      irrigationNeeds: 'Critical at tasseling & silking stages',
      harvestingAge: '120-140 days, when grain moisture <20%'
    },
    profitMargin: {
      costPerAcre: '₹20,000-25,000',
      yieldPerAcre: '35-50 quintals (3.5-5 tonnes)',
      marketPrice: '₹1,300-1,800 per quintal',
      netProfit: '₹35,000-70,000 per acre'
    },
    marketDemand: 'Very high - food, animal feed, ethanol production, starch industry',
    fertiliserSuggestions: {
      nitrogen: '120-150 kg/acre (apply in 3 splits)',
      phosphorus: '60 kg/acre - critical for root growth',
      potassium: '40 kg/acre - improves stalk strength',
      organic: '10 tonnes FYM/acre',
      micronutrients: 'Zinc 25 kg/acre if deficiency observed'
    },
    pestDiseases: [
      'Stemorer (pheromone traps, neem spray)',
      'Leaf hopper (neem oil spray)',
      'Turcicum leaf blight (fungicide spray, resistant varieties)',
      'Common rust (resistant varieties)'
    ],
    usesAndBenefits: 'Major global staple - food for humans & animals. Oil extraction, bioethanol, starch for industrial uses. Green corn (immature) popular vegetable.'
  },

  // C - Cowpea
  {
    id: 'cowpea',
    name: 'Cowpea (Black-eyed Pea)',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Legume Crop - Pulse',
    climateRequirements: 'Tropical & subtropical (15-35°C), drought tolerant',
    soilType: 'Well-drained loamy soil, pH 5.5-7.5, tolerates poor soils',
    benefits: [
      'Nitrogen-fixing - improves soil fertility',
      'Drought tolerant - suitable for marginal lands',
      'Quick maturity - 60-90 days',
      'Dual purpose - green pods & dry seeds',
      'Leaves nutritious animal fodder',
      'Growing health-conscious demand (nutri-cereals)'
    ],
    growingProfile: {
      season: 'Kharif (June-Oct) & Summer (Feb-May)',
      duration: '60-90 days for green pods, 90-120 for dry seeds',
      temperature: '15-35°C; optimal 25-30°C',
      rainfall: '600-1000 mm; can survive with 400 mm',
      landPreparation: '2-3 ploughings with 4-5 tonnes FYM/acre',
      sowingMethod: 'Direct seeding @ 15-20 kg/acre',
      spacing: '45cm rows x 20cm between plants',
      irrigationNeeds: 'Supplementary irrigation beneficial, not critical',
      harvestingAge: '60-70 days (green pods), 90-100 days (dry seeds)'
    },
    profitMargin: {
      costPerAcre: '₹10,000-12,000',
      yieldPerAcre: '6-8 tonnes (green pods), 10-12 quintals (dry seeds)',
      marketPrice: '₹8-12 per kg (green), ₹4,500-5,500 per quintal (dry)',
      netProfit: '₹45,000-70,000 per acre'
    },
    marketDemand: 'Growing demand - health food trend, export to Middle East & Africa',
    fertiliserSuggestions: {
      nitrogen: '30-40 kg/acre (light application, self-fixes)',
      phosphorus: '40 kg/acre - flowering & pod set (critical)',
      potassium: '30 kg/acre',
      organic: '4-5 tonnes FYM/acre',
      micronutrients: 'Boron 1 kg/acre - prevents pod abortion'
    },
    pestDiseases: [
      'Pod borer (neem spray at flowering)',
      'Leaf hopper (yellow sticky traps)',
      'Powdery mildew (sulfur dust)',
      'Rust (resistant varieties)'
    ],
    usesAndBenefits: 'Nutritious pulse - high protein, fiber, minerals. Used in curries, salads, soups. Leaves excellent cattle fodder. Nitrogen-fixing green manure crop.'
  },

  // C - Coconut
  {
    id: 'coconut',
    name: 'Coconut',
    image: 'https://images.unsplash.com/photo-1585707142207-e73d71bc2653?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Tree Crop - Perennial Tropical',
    climateRequirements: 'Tropical (15-32°C), high humidity, sea-level to 600m altitude',
    soilType: 'Sandy loam to sandy soil, well-drained, pH 5.5-8.0',
    benefits: [
      'Perennial crop - 60+ years productive life',
      'Multiple products - nuts, copra, coir, coconut oil, coconut water',
      'Growing global demand - coconut oil, water, milk',
      'High value added processing potential',
      'Coastal area adaptation - salinity tolerance',
      'Multiple income streams annually'
    ],
    growingProfile: {
      season: 'Monsoon planting (May-Sept) ideal',
      duration: '6-7 years to first flowering, peak production at 12-15 years',
      temperature: '15-32°C; optimal 24-32°C',
      rainfall: '1400-2300 mm annually',
      landPreparation: 'Pits 75cm x 75cm x 75cm with soil + FYM + sand mixture',
      sowingMethod: 'Seedlings from healthy mother palms @ 7.5m x 7.5m spacing',
      spacing: '7.5m x 7.5m (90 plants/acre) or 8m x 8m (70 plants/acre)',
      irrigationNeeds: 'Critical during establishment, minimal once mature',
      harvestingAge: '6-7 years to first flowering, full production at 12-15 years'
    },
    profitMargin: {
      costPerAcre: '₹2,50,000-3,00,000 (establishment)',
      yieldPerAcre: '100-120 nuts/palm/year (90-100 nuts average)',
      marketPrice: '₹30-50 per nut (mature), ₹100+ per liter coconut water',
      netProfit: '₹2,50,000-4,00,000 per acre annually (mature plantation)'
    },
    marketDemand: 'Very high - coconut oil, milk, water, processed products all premium prices',
    fertiliserSuggestions: {
      nitrogen: '600-800 g/palm/year (split doses)',
      phosphorus: '600-800 g/palm/year - flower development',
      potassium: '1200-1600 g/palm/year - critical for nut development',
      organic: '50 kg FYM/palm/year - mulching with dried fronds',
      micronutrients: 'Boron 20 g/palm, Manganese 4 kg/acre if deficiency'
    },
    pestDiseases: [
      'Rhinoceros beetle (pheromone traps, entomopathogenic fungi)',
      'Coconut caterpillar (neem spray)',
      'Leaf blight (fungicide spray, resistant varieties)',
      'Root/bud rot (field sanitation, resistant palms)'
    ],
    usesAndBenefits: 'Versatile crop - coconut oil rich in MCTs, health benefits. Coconut milk, water, fiber (coir) for industrial uses. Copra for oil extraction. All-purpose crop.'
  },

  // C - Coriander
  {
    id: 'coriander',
    name: 'Coriander (Cilantro/Dhania)',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4329d?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Spice Crop - Apiaceae',
    climateRequirements: 'Cool to moderate (10-25°C), winter crop preferred',
    soilType: 'Well-drained loamy soil, pH 5.5-7.5, light soil preferred',
    benefits: [
      'High value spice - premium prices',
      'Dual purpose - leaves (fresh) & seeds (spice)',
      'Quick maturity - 80-90 days',
      'Strong export market - seeds to Europe & USA',
      'Fresh herb growing demand in metros',
      'Low input requirement'
    ],
    growingProfile: {
      season: 'Rabi season (Oct-March ideal)',
      duration: '80-90 days for leaf harvest, 120 days for seed maturity',
      temperature: '10-25°C optimal; bolts quickly in heat',
      rainfall: '400-600 mm; well-distributed preferred',
      landPreparation: 'Fine tilth with 4-5 tonnes FYM/acre',
      sowingMethod: 'Broadcasting or line seeding @ 10-15 kg/acre',
      spacing: '30-40cm row spacing, thinned to 10-15cm',
      irrigationNeeds: 'Light irrigation after sowing, 2-3 more during growth',
      harvestingAge: '40-50 days for fresh leaves, 120 days for dried seeds'
    },
    profitMargin: {
      costPerAcre: '₹8,000-10,000',
      yieldPerAcre: '6-8 tonnes (green leaves), 8-10 quintals (dry seeds)',
      marketPrice: '₹3-5 per kg (green), ₹3,000-4,000 per quintal (seeds)',
      netProfit: '₹30,000-50,000 per acre'
    },
    marketDemand: 'High for seeds - export markets premium; fresh herb growing demand in metros',
    fertiliserSuggestions: {
      nitrogen: '60 kg/acre (at sowing & flowering)',
      phosphorus: '40 kg/acre - root development',
      potassium: '30 kg/acre',
      organic: '4-5 tonnes FYM/acre',
      micronutrients: 'Boron 1 kg/acre - improves seed production'
    },
    pestDiseases: [
      'Leaf blight (copper fungicide)',
      'Stem gall (good drainage, sanitation)',
      'Leaf hopper (neem spray)',
      'Root rot (crop rotation)'
    ],
    usesAndBenefits: 'Essential spice in Indian cuisine - seeds for flavor & medicinal use. Fresh leaves (cilantro) in salads & cooking. Aid digestion, anti-inflammatory.'
  },

  // C - Cotton
  {
    id: 'cotton',
    name: 'Cotton',
    image: 'https://images.unsplash.com/photo-1590080876-1c2dff1e8a5f?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Fibre Crop - Malvaceae',
    climateRequirements: 'Warm season (21-27°C), frost-free period 180+ days',
    soilType: 'Deep well-drained loamy soil, pH 6.0-7.5, not waterlogged',
    benefits: [
      'High value cash crop - strong demand',
      'Mechanization friendly',
      'Strong export market',
      'By-products valuable - cottonseed for oil & meal',
      'Government support & minimum prices',
      'Modern BT varieties - reduced pesticide use'
    ],
    growingProfile: {
      season: 'Kharif crop (June-Oct sowing)',
      duration: '160-180 days to maturity',
      temperature: '21-27°C optimal; frost damages crop',
      rainfall: '500-750 mm; irrigation supplementary',
      landPreparation: '3-4 ploughings with 10 tonnes FYM/acre',
      sowingMethod: 'Broadcasting or line sowing @ 17-20 kg/acre',
      spacing: '45-50cm rows x 20-25cm between plants',
      irrigationNeeds: 'Critical at flowering & boll formation',
      harvestingAge: '160-180 days for first picking, 2-3 pickings'
    },
    profitMargin: {
      costPerAcre: '₹22,000-28,000',
      yieldPerAcre: '16-20 quintals (seed cotton)',
      marketPrice: '₹5,500-6,500 per quintal',
      netProfit: '₹60,000-1,00,000 per acre'
    },
    marketDemand: 'Very strong - global textile demand, export markets premium',
    fertiliserSuggestions: {
      nitrogen: '120 kg/acre (split: 4 doses) - vegetative growth',
      phosphorus: '60 kg/acre - flower & boll development (critical)',
      potassium: '40 kg/acre - plant strength',
      organic: '10 tonnes FYM/acre',
      micronutrients: 'Magnesium, Boron if deficiency - prevents boll shedding'
    },
    pestDiseases: [
      'Bollworm (pheromone traps, BT spray, parasitoids)',
      'Leaf hopper (neem oil, yellow sticky traps)',
      'Leaf curl virus (resistant varieties)',
      'Root rot (crop rotation, resistant varieties)'
    ],
    usesAndBenefits: 'Primary natural textile fiber - irreplaceable in textile industry. Cottonseed oil edible, meal used as animal feed. Sustainable when organic methods used.'
  },

  // C - Cucumber
  {
    id: 'cucumber',
    name: 'Cucumber',
    image: 'https://images.unsplash.com/photo-1584622241006-af4be5fae6e8?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Vegetable - Cucurbitaceae',
    climateRequirements: 'Warm season (20-30°C), photoperiod-insensitive, humidity-loving',
    soilType: 'Well-drained loamy soil rich in organic matter, pH 6.0-7.0',
    benefits: [
      'Quick maturity - 50-60 days',
      'High yield potential - multiple fruits per plant',
      'Continuous harvesting - spread over 60-90 days',
      'Export market - pickled cucumbers premium',
      'Low input requirement',
      'Suitable for polyhouse cultivation - off-season premium'
    ],
    growingProfile: {
      season: 'Kharif (May-Oct), Summer (Jan-April), Rabi (Sept-Dec)',
      duration: '50-60 days to first harvest',
      temperature: '20-30°C optimal; minimum 15°C',
      rainfall: '500-1000 mm; irrigation essential in summers',
      landPreparation: 'Raised beds with 10 tonnes FYM/acre',
      sowingMethod: 'Hill/ seed spot planting @ 45cm x 45cm',
      spacing: '90cm rows x 30-45cm between hills',
      irrigationNeeds: 'Heavy water requirement - light daily irrigation',
      harvestingAge: '50-60 days for first picking, every 2-3 days thereafter'
    },
    profitMargin: {
      costPerAcre: '₹18,000-22,000',
      yieldPerAcre: '15-20 tonnes (open field), 40-50 tonnes (polyhouse)',
      marketPrice: '₹6-10 per kg (field), ₹15-20 per kg (polyhouse)',
      netProfit: '₹70,000-1,30,000 per acre'
    },
    marketDemand: 'High - export for pickles, fresh market demand, polyhouse premium',
    fertiliserSuggestions: {
      nitrogen: '100 kg/acre (split: 3-4 doses) - vegetative growth',
      phosphorus: '50 kg/acre - flowering & fruiting (critical)',
      potassium: '50 kg/acre - fruit quality & sweetness',
      organic: '10 tonnes FYM/acre - mulching essential',
      micronutrients: 'Boron 1 kg/acre - prevents blossom-end rot'
    },
    pestDiseases: [
      'Leaf hopper (neem oil, yellow sticky traps)',
      'Downy mildew (copper fungicide, ventilation)',
      'Powdery mildew (sulfur dust, resistant varieties)',
      'Anthracnose (copper fungicide, crop rotation)'
    ],
    usesAndBenefits: 'Low calorie, hydrating vegetable - 95% water. Rich in vitamins & minerals. Used fresh, pickled, in salads. Cosmetic & medicinal applications.'
  },

  // C - Cumin
  {
    id: 'cumin',
    name: 'Cumin',
    image: 'https://images.unsplash.com/photo-1599599810975-1c8c9e1c0b3c?w=400&h=400&fit=crop',
    category: 'C',
    cropType: 'Spice Crop - Apiaceae',
    climateRequirements: 'Cool to warm (15-25°C), moderate rainfall, winter crop',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.5-8.3, drought tolerant',
    benefits: [
      'High-value spice crop - premium prices',
      'Drought tolerant - suitable marginal lands',
      'Low input requirement',
      'Strong export market - valued globally',
      'Quick maturity - 120-150 days',
      'Ideal rotation crop with cereals'
    ],
    growingProfile: {
      season: 'Rabi season (Oct-Feb sowing)',
      duration: '120-150 days to maturity',
      temperature: '15-25°C optimal; frost tolerance',
      rainfall: '300-500 mm; supplementary irrigation beneficial',
      landPreparation: '2-3 ploughings with light FYM (2-3 tonnes/acre)',
      sowingMethod: 'Line sowing or broadcasting @ 12-15 kg/acre',
      spacing: '22-25cm rows x 10-15cm between plants',
      irrigationNeeds: '2-3 irrigations - at sowing, flowering, grain filling',
      harvestingAge: '120-150 days when plants dry & turn brown'
    },
    profitMargin: {
      costPerAcre: '₹8,000-10,000',
      yieldPerAcre: '8-10 quintals (seed)',
      marketPrice: '₹4,000-6,000 per quintal',
      netProfit: '₹25,000-50,000 per acre'
    },
    marketDemand: 'Very high - essential spice globally, export to USA, Europe, UAE',
    fertiliserSuggestions: {
      nitrogen: '40 kg/acre (light application)',
      phosphorus: '40 kg/acre - seed development',
      potassium: '20 kg/acre',
      organic: '2-3 tonnes FYM/acre',
      micronutrients: 'Boron beneficial if deficiency'
    },
    pestDiseases: [
      'Leaf spot (copper fungicide)',
      'Wilt (resistant varieties, crop rotation)',
      'Powdery mildew (sulfur dust)',
      'Seed moth (neem spray at flowering)'
    ],
    usesAndBenefits: 'Essential spice in Indian & world cuisine - digestive, anti-inflammatory. Seeds used whole or ground. Oil used in cosmetics & traditional medicine.'
  },
]
