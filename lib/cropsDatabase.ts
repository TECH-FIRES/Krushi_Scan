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
    image: 'https://growcycle.com/images/seed/228/African_Eggplant.webp',
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
    image: 'https://www.prettywildseeds.co.uk/pictures/prod_2691_0.jpg',
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
    image: 'https://www.trees.com/wp-content/uploads/products/medium/1000/All-in-OneAlmondTree.webp',
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
    image: 'https://www.arborday.org/sites/arborday.org/files/styles/blog_hero_image/public/migration_uploads/red-delicious-apple.jpg.webp',
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
    image: 'https://nurserynisarga.in/wp-content/uploads/2025/09/Apricot_Plant_2.webp',
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
    image: 'https://www.plantshop.me/media/product/artichoke_seeds_-_plantshopme.jpg',
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
    image: 'https://urbanthottam.com/wp-content/uploads/2020/10/Banana.webp',
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
    image: 'https://mtseedbank.in/wp-content/uploads/2019/12/french-beans-green1.jpg',
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
    image: 'https://www.gardenia.net/wp-content/uploads/2025/09/ChatGPT-Image-Sep-12-2025-08_28_01-AM.jpg',
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
    image: 'https://im.pluckk.in/unsafe/1200x0/uploads/23199-22883-13.jpg',
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
    image: 'https://i.pinimg.com/736x/72/0e/3b/720e3b78e25219a765813ff75b3b9a28.jpg',
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
    image: 'https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg',
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
    image: 'data:image/jpeg;base64,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',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXprvnQ_ZU8HWZQQMduaR49BuBrZc73XcE0A&s',
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
    image: 'https://m.media-amazon.com/images/I/51zhJOc7dSL._AC_UF1000,1000_QL80_.jpg',
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
    image: 'https://agriculture.ec.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2025-06/cotton-field-greece_600x400px_0.jpg?itok=Eq50ehaK',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4xTp7oz_juVHSX8bdoBXifBz23rm4ffTKAA&s',
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
    image: 'https://cdn.britannica.com/59/219359-050-662D86EA/Cumin-Spice.jpg',
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

  // D - Dal (Pigeon Pea)
  {
    id: 'dal-pigeon-pea',
    name: 'Dal (Pigeon Pea)',
    image: 'https://5.imimg.com/data5/WI/LG/JP/SELLER-329194/toor-dal-yellow-pigeon-peas--500x500.jpg',
    category: 'D',
    cropType: 'Pulse Crop - Legume',
    climateRequirements: 'Semi-arid to humid (500-2250 mm rainfall), warm temperature',
    soilType: 'Well-drained loamy to clayey soil, pH 6.0-7.5',
    benefits: [
      'High protein content (20-22%) - nutritious pulse',
      'Nitrogen fixing - improves soil fertility',
      'Long shelf life - easy storage & marketing',
      'Drought tolerant - suitable marginal lands',
      'Growing urban demand - essential daily food',
      'Strong export market - valuable commodity'
    ],
    growingProfile: {
      season: 'Kharif (July-Aug sowing), Rabi (Sept-Oct)',
      duration: '150-180 days to maturity',
      temperature: '20-30°C optimal',
      rainfall: '600-1000 mm suitable',
      landPreparation: '2-3 ploughings with 5 tonnes FYM/acre',
      sowingMethod: 'Line sowing @ 12-15 kg/acre',
      spacing: '45-50cm rows x 20-25cm between plants',
      irrigationNeeds: '1-2 irrigations if rainfall deficit',
      harvestingAge: '150-180 days when pods dry & rattle'
    },
    profitMargin: {
      costPerAcre: '₹8,000-10,000',
      yieldPerAcre: '10-15 quintals',
      marketPrice: '₹4,500-6,000 per quintal',
      netProfit: '₹35,000-80,000 per acre'
    },
    marketDemand: 'Very high - essential staple, export to USA, UK, Middle East',
    fertiliserSuggestions: {
      nitrogen: '20 kg/acre (minimal - fixes own nitrogen)',
      phosphorus: '45 kg/acre - pod development',
      potassium: '25 kg/acre',
      organic: '5 tonnes FYM/acre',
      micronutrients: 'Molybdenum beneficial for nitrogen fixation'
    },
    pestDiseases: [
      'Leaf folder (neem spray)',
      'Pod borer (pheromone traps)',
      'Fusarium wilt (resistant varieties)',
      'Gram caterpillar (predators, light traps)'
    ],
    usesAndBenefits: 'Major protein source for vegetarians - 20-22% protein. Cooked as dal, essential in Indian cuisine. Improving nutrition & food security in developing nations.'
  },

  // E - Eggplant (Brinjal)
  {
    id: 'eggplant-brinjal',
    name: 'Eggplant (Brinjal)',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm57zoB35nEu0O0duU3DwqtE2CdMuhCIov1g&s',
    category: 'E',
    cropType: 'Vegetable - Solanaceae',
    climateRequirements: 'Warm season (25-35°C), frost sensitive',
    soilType: 'Well-drained loamy soil, pH 5.5-7.5, rich in organic matter',
    benefits: [
      'High yield potential - 200-300 fruits per plant',
      'Long harvest period - 90-150 days continuous',
      'Quality improvement through hybrid varieties',
      'Growing consumption in metro cities',
      'Good market prices - premium during off-season',
      'Multiple colors available - market diversification'
    ],
    growingProfile: {
      season: 'Kharif (May-July), Rabi (Aug-Sept)',
      duration: '90-150+ days to harvest',
      temperature: '25-32°C optimal',
      rainfall: '600-1200 mm; irrigation essential',
      landPreparation: 'Raised beds with 20 tonnes FYM/acre',
      sowingMethod: 'Seedlings @ 60cm x 45cm spacing',
      spacing: 'Row to row: 60cm, Plant to plant: 45-60cm',
      irrigationNeeds: 'Heavy water requirement - weekly irrigation',
      harvestingAge: '90-120 days after transplant, pick green fruits'
    },
    profitMargin: {
      costPerAcre: '₹25,000-30,000',
      yieldPerAcre: '200-250 quintals',
      marketPrice: '₹3-5 per kg (season), ₹8-12 per kg (off-season)',
      netProfit: '₹1,20,000-2,00,000 per acre'
    },
    marketDemand: 'High - essential vegetable, premium during off-season, export potential',
    fertiliserSuggestions: {
      nitrogen: '120 kg/acre (3-4 splits) - vegetative growth',
      phosphorus: '60 kg/acre - flower & fruit set',
      potassium: '60 kg/acre - fruit quality',
      organic: '20 tonnes FYM/acre - mulching recommended',
      micronutrients: 'Boron 1 kg/acre - prevents blossom-end rot'
    },
    pestDiseases: [
      'Fruit & shoot borer (neem oil 3%, pheromone traps)',
      'Little leaf disease (remove affected plants)',
      'Leaf hopper (yellow sticky traps)',
      'Fusarium wilt (resistant varieties, crop rotation)'
    ],
    usesAndBenefits: 'Low calorie vegetable with antioxidants & phytonutrients. Used in curries, grilled dishes, stew. Traditional medicine for various ailments.'
  },

  // F - French Beans
  {
    id: 'french-beans',
    name: 'French Beans',
    image: 'https://m.media-amazon.com/images/I/5198ROJAmUL._AC_UF1000,1000_QL80_.jpg',
    category: 'F',
    cropType: 'Vegetable - Legume',
    climateRequirements: 'Cool to warm (15-25°C), moderate rainfall, frost sensitive',
    soilType: 'Well-drained loamy soil, pH 6.0-6.8, good organic matter',
    benefits: [
      'Premium vegetable - high market value',
      'Quick maturity - 50-60 days to harvest',
      'Multiple flushes - long harvest period',
      'Export market - organic certification premium',
      'Nitrogen fixing - improves soil fertility',
      'Health food - protein & fiber rich'
    ],
    growingProfile: {
      season: 'Kharif (May-June), Rabi (Sept-Oct), Summer (Jan-Feb)',
      duration: '50-70 days to maturity',
      temperature: '15-25°C optimal',
      rainfall: '500-750 mm suitable',
      landPreparation: 'Raised beds with 10 tonnes FYM/acre',
      sowingMethod: 'Direct seeding @ 20-25 kg/acre',
      spacing: '45cm rows x 15-20cm between plants',
      irrigationNeeds: 'Moderate - 3-4 irrigations, avoid waterlogging',
      harvestingAge: '50-70 days, pick tender green pods every 3-4 days'
    },
    profitMargin: {
      costPerAcre: '₹12,000-15,000',
      yieldPerAcre: '80-100 quintals',
      marketPrice: '₹10-15 per kg (local), ₹20-30 per kg (export)',
      netProfit: '₹70,000-1,50,000 per acre'
    },
    marketDemand: 'Very high - export oriented crop, organic premium, European markets',
    fertiliserSuggestions: {
      nitrogen: '30 kg/acre (fixes own nitrogen)',
      phosphorus: '50 kg/acre - flowering critical',
      potassium: '40 kg/acre - pod quality',
      organic: '10 tonnes FYM/acre - mulching essential',
      micronutrients: 'Boron 1 kg/acre beneficial'
    },
    pestDiseases: [
      'Leaf hopper (neem oil, yellow sticky traps)',
      'Powdery mildew (sulfur dust)',
      'Root rot (avoid waterlogging)',
      'Bean fly (crop rotation)'
    ],
    usesAndBenefits: 'Nutritious vegetable - protein, fiber, vitamins. Eaten fresh, cooked, or frozen. Popular in European & Asian cuisines. Health food trend growing.'
  },

  // G - Gram (Chickpea)
  {
    id: 'https://m.media-amazon.com/images/I/5198ROJAmUL._AC_UF1000,1000_QL80_.jpg',
    name: 'Gram (Chickpea)',
    image: 'https://5.imimg.com/data5/ANDROID/Default/2022/10/CL/JK/VG/110221621/prod-20221031-1936075981778627739004605-jpg-500x500.jpg',
    category: 'G',
    cropType: 'Pulse Crop - Legume',
    climateRequirements: 'Cool season (15-20°C), low rainfall (300-500 mm),frost tolerant',
    soilType: 'Well-drained loamy to clayey soil, pH 6.0-8.0, lime tolerant',
    benefits: [
      'Nutritious pulse - 19-21% protein content',
      'Drought tolerant - low water requirement',
      'Nitrogen fixing - improves soil fertility significantly',
      'Government MSP support available',
      'Low input crop - economical to grow',
      'Strong export demand - valuable commodity'
    ],
    growingProfile: {
      season: 'Rabi crop (Oct-Nov sowing)',
      duration: '100-120 days to maturity',
      temperature: '10-25°C suitable; 15-20°C optimal',
      rainfall: '300-500 mm sufficient; drought tolerant',
      landPreparation: '2-3 ploughings with 3-5 tonnes FYM/acre',
      sowingMethod: 'Line sowing @ 15-20 kg/acre',
      spacing: '30-35cm rows x 10-15cm between plants',
      irrigationNeeds: '0-1 irrigation if rainfall deficit',
      harvestingAge: '100-120 days when pods brown & rattle'
    },
    profitMargin: {
      costPerAcre: '₹6,000-8,000',
      yieldPerAcre: '12-16 quintals',
      marketPrice: '₹4,000-5,500 per quintal (MSP ~₹4,000)',
      netProfit: '₹40,000-80,000 per acre'
    },
    marketDemand: 'Very strong - staple food crop, export to Middle East & USA',
    fertiliserSuggestions: {
      nitrogen: '20 kg/acre (fixes own nitrogen)',
      phosphorus: '45 kg/acre - pod development crucial',
      potassium: '20 kg/acre',
      organic: '3-5 tonnes FYM/acre',
      micronutrients: 'Molybdenum beneficial'
    },
    pestDiseases: [
      'Pod borer (pheromone traps, neem spray)',
      'Gram caterpillar (light traps, parasitoids)',
      'Fusarium wilt (resistant varieties)',
      'Botrytis gray mold (resistant varieties)'
    ],
    usesAndBenefits: 'Primary pulse in Indian diet - 20% protein. Cooked as dal, made into flour, sprouted. Growing global awareness of health benefits - vegan protein source.'
  },

  // H - Hybrid Maize
  {
    id: 'hybrid-maize',
    name: 'Hybrid Maize',
    image: 'https://benisonmedia.com/wp-content/uploads/2020/10/unnamed.jpg',
    category: 'H',
    cropType: 'Cereal Crop - Poaceae',
    climateRequirements: 'Warm season (21-27°C), 500-750 mm rainfall',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-7.5',
    benefits: [
      '30-40% yield increase over local varieties',
      'Quick maturity - 100-120 days',
      'Multiple uses - food, feed, biofuel',
      'Growing animal feed demand',
      'Government subsidies on seeds available',
      'Mechanization friendly crop'
    ],
    growingProfile: {
      season: 'Kharif (May-June), Rabi (Oct-Nov), Summer (Jan-Feb)',
      duration: '100-130 days to maturity',
      temperature: '21-27°C optimal',
      rainfall: '500-750 mm needed',
      landPreparation: '2-3 ploughings with 8 tonnes FYM/acre',
      sowingMethod: 'Seed drill @ 18-20 kg/acre, 60cm x 25cm spacing',
      spacing: 'Row to row: 60cm, Plant to plant: 20-25cm',
      irrigationNeeds: '4-6 irrigations - critical at silk emergence',
      harvestingAge: '100-130 days when cobs dry, kernels hard'
    },
    profitMargin: {
      costPerAcre: '₹14,000-18,000',
      yieldPerAcre: '35-45 quintals',
      marketPrice: '₹1,400-1,800 per quintal',
      netProfit: '₹35,000-65,000 per acre'
    },
    marketDemand: 'High - livestock feed primary, sweet corn premium, export growing',
    fertiliserSuggestions: {
      nitrogen: '120 kg/acre (split: 3 doses) - grain filling critical',
      phosphorus: '60 kg/acre - root & cob development',
      potassium: '40 kg/acre - disease resistance',
      organic: '8 tonnes FYM/acre',
      micronutrients: 'Zinc 25 kg/acre - prevents chlorosis'
    },
    pestDiseases: [
      'Stem borer (trap crops, neem oil)',
      'Leaf hopper (neem spray)',
      'Turcicum leaf blight (fungicide)',
      'Charcoal rot (resistant varieties, crop rotation)'
    ],
    usesAndBenefits: 'Staple grain - food, animal feed, industrial uses. Nutritious source of carbohydrates, vitamins. Sweet corn premium in vegetable markets.'
  },

  // I - Indigo (Neem)
  {
    id: 'indigo-neem',
    name: 'Indigo (Neem)',
    image: 'https://m.media-amazon.com/images/I/71yi6pcJidL._AC_UF350,350_QL80_.jpg',
    category: 'I',
    cropType: 'Tree Crop - Medicinal',
    climateRequirements: 'Wide range (15-40°C), drought tolerant, arid to humid',
    soilType: 'Versatile - grows on marginal lands, poor soils',
    benefits: [
      'Medicinal value - Ayurveda, pharmaceutical use',
      'Pesticide properties - organic neem spray production',
      'Multipurpose tree - timber, shade, revegetation',
      'Climate resilient - drought & flood tolerant',
      'Social forestry suitable - government support',
      'Growing herbal medicine market demand'
    ],
    growingProfile: {
      season: 'Plant during monsoon (June-Aug)',
      duration: '3-5 years to first significant harvest',
      temperature: 'Tolerates 15-40°C',
      rainfall: 'Tolerates 250-2250 mm',
      landPreparation: '2 metre deep pit dug, filled with FYM & soil mix',
      sowingMethod: 'Seedlings or seeds @ 10-12 metre spacing',
      spacing: '10m x 10m (40-45 trees/acre)',
      irrigationNeeds: 'Establishment irrigation, then drought tolerant',
      harvestingAge: 'Leaves harvested year-round, seeds after 3-5 years'
    },
    profitMargin: {
      costPerAcre: '₹8,000-12,000 (establishment)',
      yieldPerAcre: '50-100 kg neem seeds/mature tree',
      marketPrice: '₹5,000-8,000 per quintal (seeds)',
      netProfit: '₹80,000-2,00,000+ per acre (long-term)'
    },
    marketDemand: 'Growing - herbal medicines, organic pesticide, pharmaceutical',
    fertiliserSuggestions: {
      nitrogen: '50 kg/acre/year - vegetative growth',
      phosphorus: '25 kg/acre/year - flowering & seed set',
      potassium: '25 kg/acre/year',
      organic: '10 tonnes FYM initially, 5 tonnes mulch yearly',
      micronutrients: 'Boron 1 kg/acre beneficial'
    },
    pestDiseases: [
      'Leaf blotch (spray copper fungicide)',
      'Twig borer (prune affected twigs)',
      'Scale insect (neem oil spray)',
      'Gall midges (select resistant varieties)'
    ],
    usesAndBenefits: 'Ancient medicinal tree - every part useful. Leaves, bark, seeds, oil for medicines, cosmetics, pesticides. Growing herbal & organic product market.'
  },

  // J - Jaggery (Sugarcane)
  {
    id: 'jaggery-sugarcane',
    name: 'Jaggery (Sugarcane)',
    image: 'https://cdn.britannica.com/64/176564-050-A73201DB/machine-Norbert-Rillieux-way-sugarcane-sugar.jpg',
    category: 'J',
    cropType: 'Cash Crop - Poaceae',
    climateRequirements: 'Warm (21-27°C), high rainfall (1250-2250 mm) - monsoon crop',
    soilType: 'Deep well-drained loamy to clay loam soil, rich in organic matter',
    benefits: [
      'High income cash crop - strong demand',
      'By-products valuable - bagasse, molasses, press mud',
      'Sustainable farming - press mud improves soil',
      'Government policies support sugarcane farmers',
      'Multiple uses - sugar, jaggery, ethanol',
      'Year-round employment generation'
    ],
    growingProfile: {
      season: 'Kharif (May-July sowing), 12-month crop',
      duration: '12-16 months to maturity',
      temperature: '21-27°C optimal',
      rainfall: '1250-2250 mm needed',
      landPreparation: 'Heavy - 8-10 ploughings with 25 tonnes FYM/acre',
      sowingMethod: 'Sett planting (3 buds) @ 50,000 setts/acre',
      spacing: '90cm rows x 30cm between sets',
      irrigationNeeds: '10-12 irrigations - heavy water crop',
      harvestingAge: '12-16 months, crush for jaggery making'
    },
    profitMargin: {
      costPerAcre: '₹35,000-45,000',
      yieldPerAcre: '50-70 tonnes of cane',
      marketPrice: '₹1,400-1,900 per quintal (state FRP)',
      netProfit: '₹50,000-1,30,000 per acre'
    },
    marketDemand: 'Very strong - sugar mills, jaggery units, ethanol production growing',
    fertiliserSuggestions: {
      nitrogen: '150 kg/acre (3-4 splits) - critical for yield',
      phosphorus: '60 kg/acre - root development',
      potassium: '60 kg/acre - juice quality',
      organic: '25 tonnes FYM/acre - mulching essential',
      micronutrients: 'Magnesium, Boron beneficial'
    },
    pestDiseases: [
      'Sugarcane borer (trap crops, neem spray)',
      'Scale insect (predatory beetles)',
      'Ratoon stunting disease (healthy setts)',
      'Wilt disease (resistant varieties)'
    ],
    usesAndBenefits: 'Major cash crop - produce jaggery (unrefined sugar). Nutritious sweetener with minerals. Bagasse used for biofuel. Press mud improves soil fertility significantly.'
  },

  // K - Kale
  {
    id: 'kale',
    name: 'Kale',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/4/UW/IX/YU/149646300/7e825666-203b-448d-8402-baa6c2856e42-500x500.jpg',
    category: 'K',
    cropType: 'Vegetable - Brassica',
    climateRequirements: 'Cool season (10-20°C), moderate rainfall, frost tolerant',
    soilType: 'Well-drained loamy soil rich in organic matter, pH 6.0-7.5',
    benefits: [
      'Superfood - highest nutritional density among vegetables',
      'Cold & frost tolerant - winter crop premium',
      'Multiple harvests from single plant - 90+ days',
      'Growing global health food demand',
      'Export market - organic certification premium',
      'High antioxidant & mineral content'
    ],
    growingProfile: {
      season: 'Rabi (Aug-Oct planting), Winter crop',
      duration: '70-90 days to first harvest, 150+ days continuous',
      temperature: '10-20°C optimal; tolerates frost',
      rainfall: '450-700 mm suitable',
      landPreparation: 'Raised beds with 12 tonnes FYM/acre',
      sowingMethod: 'Seedlings @ 60cm x 45cm spacing',
      spacing: 'Row to row: 60cm, Plant to plant: 45-60cm',
      irrigationNeeds: 'Moderate - 3-4 irrigations, avoid waterlogging',
      harvestingAge: '70-90 days first harvest, pick outer leaves continuously'
    },
    profitMargin: {
      costPerAcre: '₹18,000-22,000',
      yieldPerAcre: '150-200 quintals',
      marketPrice: '₹8-12 per kg (local), ₹15-25 per kg (organic)',
      netProfit: '₹90,000-1,80,000 per acre'
    },
    marketDemand: 'High - superfood trend, organic premium, export growing, health conscious',
    fertiliserSuggestions: {
      nitrogen: '100 kg/acre (2 splits) - leaf growth',
      phosphorus: '50 kg/acre - root development',
      potassium: '60 kg/acre - leaf quality & nutrient density',
      organic: '12 tonnes FYM/acre - mulching recommended',
      micronutrients: 'Boron 1 kg/acre, Zinc beneficial'
    },
    pestDiseases: [
      'Cabbage butterfly (neem spray, hand picking)',
      'Leaf hopper (yellow sticky traps)',
      'Powdery mildew (sulfur dust)',
      'Diamondback moth (parasitoid wasps)'
    ],
    usesAndBenefits: 'Superfood - highest antioxidant & mineral content among vegetables. Eaten raw in salads, cooked, juiced. Prevents chronic diseases - cancer, heart disease.'
  },

  // L - Linseed
  {
    id: 'linseed',
    name: 'Linseed',
    image: 'https://sanskritibazaar.in/uploads/media/2023/Flax_Seeds(linseed)1.jpg',
    category: 'L',
    cropType: 'Oilseed Crop - Linaceae',
    climateRequirements: 'Cool season (10-20°C), moderate rainfall (400-650 mm)',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-8.0',
    benefits: [
      'Health food - Omega-3 fatty acids rich',
      'Industrial uses - linseed oil, linen fiber',
      'Drought tolerant - marginal land suitable',
      'Growing health conscious market demand',
      'Crop rotation benefits - breaks pest cycle',
      'Low input crop - economical'
    ],
    growingProfile: {
      season: 'Rabi crop (Oct-Nov sowing)',
      duration: '100-120 days to maturity',
      temperature: '10-20°C optimal',
      rainfall: '400-650 mm suitable',
      landPreparation: '2-3 ploughings with 3 tonnes FYM/acre',
      sowingMethod: 'Line sowing @ 25-30 kg/acre',
      spacing: '22-25cm rows x 10-12cm between plants',
      irrigationNeeds: '1-2 irrigations if rainfall deficit at flowering',
      harvestingAge: '100-120 days when plants brown & seeds rattle in pods'
    },
    profitMargin: {
      costPerAcre: '₹6,000-8,000',
      yieldPerAcre: '8-12 quintals',
      marketPrice: '₹4,500-6,000 per quintal',
      netProfit: '₹25,000-60,000 per acre'
    },
    marketDemand: 'Growing - health consciousness, industrial use, export potential',
    fertiliserSuggestions: {
      nitrogen: '40 kg/acre - vegetative growth',
      phosphorus: '60 kg/acre - seed & pod development (critical)',
      potassium: '25 kg/acre',
      organic: '3 tonnes FYM/acre',
      micronutrients: 'Boron 1 kg/acre beneficial'
    },
    pestDiseases: [
      'Rust (resistant varieties, sulfur spray)',
      'Leaf spot (copper fungicide)',
      'Stem fly (crop rotation)',
      'Seed moth (light traps, neem spray)'
    ],
    usesAndBenefits: 'Omega-3 rich superfood - prevents heart disease, inflammation. Linseed oil used in paints, varnishes. Fiber for linen textiles. Growing vegan protein source demand.'
  },

  // M - Methi (Fenugreek)
  {
    id: 'methi-fenugreek',
    name: 'Methi (Fenugreek)',
    image: 'https://organicbazar.net/cdn/shop/products/Untitled-design-2022-06-02T160309.044.jpg?v=1756540403&width=1445',
    category: 'M',
    cropType: 'Herb - Legume',
    climateRequirements: 'Cool season (10-20°C), moderate rainfall (300-500 mm)',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-8.0',
    benefits: [
      'Nutritious green leafy vegetable - mineral rich',
      'Seeds medicinal - diabetes, digestion benefits',
      'Quick maturity - 45-50 days (greens)',
      'Multiple harvests from single planting',
      'Growing health & wellness market',
      'Suitable for organic farming'
    ],
    growingProfile: {
      season: 'Rabi (Sept-Jan), can grow year-round with irrigation',
      duration: '45-50 days for greens, 100-120 days for seeds',
      temperature: '15-25°C optimal',
      rainfall: '300-500 mm suitable',
      landPreparation: 'Raised beds with 8 tonnes FYM/acre',
      sowingMethod: 'Direct seeding or line sowing @ 25-30 kg/acre',
      spacing: '15-20cm between rows x 10cm between plants',
      irrigationNeeds: '2-3 irrigations for greens, 3-4 for seeds',
      harvestingAge: '45-50 days for fresh leaves, 100-120 days for mature seeds'
    },
    profitMargin: {
      costPerAcre: '₹8,000-10,000',
      yieldPerAcre: '80-100 quintals (greens), 15-20 quintals (seeds)',
      marketPrice: '₹2-3 per kg (greens), ₹4,000-5,000 per quintal (seeds)',
      netProfit: '₹25,000-70,000 per acre'
    },
    marketDemand: 'Growing - health food, medicinal, spice market, organic premium',
    fertiliserSuggestions: {
      nitrogen: '50 kg/acre (light) - fixes nitrogen',
      phosphorus: '50 kg/acre - seed development',
      potassium: '30 kg/acre',
      organic: '8 tonnes FYM/acre',
      micronutrients: 'Boron beneficial'
    },
    pestDiseases: [
      'Leaf hopper (neem oil)',
      'Powdery mildew (sulfur dust)',
      'Gray mold (resistant varieties)',
      'Root rot (avoid waterlogging)'
    ],
    usesAndBenefits: 'Nutritious leafy green - calcium, iron, vitamins. Seeds medicinal - blood sugar control, lactation. Traditional Ayurvedic medicine. Growing diabetes management interest.'
  },

  // N - Turmeric (alternate for N starting crops)
  {
    id: 'turmeric',
    name: 'Turmeric',
    image: 'https://lazydogfarm.com/cdn/shop/articles/massive-turmeric-root-1080x1080.png?v=1703217897&width=1100',
    category: 'N',
    cropType: 'Spice Crop - Zingiberaceae',
    climateRequirements: 'Warm (20-30°C), high rainfall (1500-2250 mm), humid',
    soilType: 'Well-drained loamy to sandy loam soil rich in organic matter',
    benefits: [
      'High value spice - premium prices, strong demand',
      'Medicinal value - anti-inflammatory properties',
      'Strong export market - global wellness trend',
      'By-products valuable - turmeric powder, oil',
      'Sustainability - traditional agroforestry system',
      'Growing herbal & organic product market'
    ],
    growingProfile: {
      season: 'Monsoon planting (May-June), 7-9 month crop',
      duration: '7-9 months to maturity',
      temperature: '20-30°C optimal',
      rainfall: '1500-2250 mm needed',
      landPreparation: '5-6 ploughings with 25 tonnes FYM/acre',
      sowingMethod: 'Rhizome planting (20-25 grams) @ 20,000 rhizomes/acre',
      spacing: '25-30cm rows x 20-25cm between rhizomes',
      irrigationNeeds: '6-7 irrigations spaced appropriately',
      harvestingAge: '7-9 months when leaves dry, rhizomes mature'
    },
    profitMargin: {
      costPerAcre: '₹30,000-40,000',
      yieldPerAcre: '20-25 tonnes fresh (5-7 tonnes dry)',
      marketPrice: '₹4,500-7,000 per quintal (dried)',
      netProfit: '₹1,20,000-2,20,000 per acre'
    },
    marketDemand: 'Very high - wellness trend, export markets, cosmetics industry',
    fertiliserSuggestions: {
      nitrogen: '60 kg/acre (2 splits)',
      phosphorus: '50 kg/acre - rhizome development',
      potassium: '60 kg/acre - disease resistance',
      organic: '25 tonnes FYM/acre - mulching essential',
      micronutrients: 'Boron, Zinc beneficial'
    },
    pestDiseases: [
      'Leaf blotch (copper fungicide)',
      'Rhizome rot (improve drainage, fungicide)',
      'Shoot borer (neem spray)',
      'Mites (sulfur dust, predatory mites)'
    ],
    usesAndBenefits: 'Ancient medicinal spice - anti-inflammatory, antioxidant. Used in curries, beauty products, wellness supplements. Golden milk trend increasing demand globally.'
  },

  // O - Okra (Ladies Finger)
  {
    id: 'okra',
    name: 'Okra (Ladies Finger)',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPNMFrhuYxcDWO9-brgbSe6rdBimFSNbJ3Wg&s',
    category: 'O',
    cropType: 'Vegetable - Malvaceae',
    climateRequirements: 'Warm season (25-35°C), moderate to high rainfall',
    soilType: 'Well-drained loamy to sandy loam soil, pH 6.0-7.5',
    benefits: [
      'High nutrition - vitamins, minerals, fiber rich',
      'Heat tolerant - summer crop with premium prices',
      'Quick maturity - 50-60 days first picking',
      'Long harvest - 120+ days continuous production',
      'Growing urban vegetable consumption',
      'Medicinal properties - blood pressure control'
    ],
    growingProfile: {
      season: 'Kharif (May-July), Rabi (Aug-Sept), Summer (Jan-Feb)',
      duration: '50-60 days to first harvest',
      temperature: '25-35°C optimal; minimum 20°C',
      rainfall: '500-1000 mm suitable, irrigation in summer',
      landPreparation: '2-3 ploughings with 10 tonnes FYM/acre',
      sowingMethod: 'Direct seeding or seedlings @ 30cm x 20cm spacing',
      spacing: 'Row to row: 30cm, Plant to plant: 20-25cm',
      irrigationNeeds: 'Heavy water requirement - weekly irrigation summer',
      harvestingAge: '50-60 days, pick tender 5-7cm pods every 2-3 days'
    },
    profitMargin: {
      costPerAcre: '₹12,000-15,000',
      yieldPerAcre: '100-150 quintals',
      marketPrice: '₹4-6 per kg (season), ₹10-15 per kg (off-season)',
      netProfit: '₹60,000-1,20,000 per acre'
    },
    marketDemand: 'High - nutritious vegetable, export-oriented, premium off-season',
    fertiliserSuggestions: {
      nitrogen: '80 kg/acre (split doses) - vegetative growth',
      phosphorus: '40 kg/acre - flowering & fruiting',
      potassium: '40 kg/acre - pod quality',
      organic: '10 tonnes FYM/acre - mulching beneficial',
      micronutrients: 'Boron 1 kg/acre prevents pod malformation'
    },
    pestDiseases: [
      'Leaf hopper (neem oil, yellow sticky traps)',
      'Powdery mildew (sulfur dust)',
      'Yellow vein mosaic (resistant varieties)',
      'Fruit fly (trap crops, pheromone traps)'
    ],
    usesAndBenefits: 'Nutritious vegetable - fiber, vitamins, minerals. Used fresh cooked in curries. Medicinal - blood pressure, cholesterol control. Fiber aids digestion.'
  },

  // P - Peanut (Groundnut)
  {
    id: 'peanut-groundnut',
    name: 'Peanut (Groundnut)',
    image: 'https://m.media-amazon.com/images/I/41RoBZdJ+iL._AC_UF894,1000_QL80_.jpg',
    category: 'P',
    cropType: 'Oilseed Crop - Fabaceae',
    climateRequirements: 'Warm (20-30°C), moderate rainfall (600-1000 mm)',
    soilType: 'Well-drained loamy to sandy loam soil, pH 6.0-7.5, well-structured',
    benefits: [
      'High protein & oil content - nutritious food',
      'Strong domestic & export market',
      'By-products - cake for animal feed',
      'Nitrogen fixing - improves soil fertility',
      'Government procurement support available',
      'Growing demand for healthy oils & proteins'
    ],
    growingProfile: {
      season: 'Kharif (June-July), Rabi (Sept-Oct sowing)',
      duration: '120-150 days to maturity',
      temperature: '20-30°C optimal',
      rainfall: '600-1000 mm suitable',
      landPreparation: '3-4 ploughings with 5 tonnes FYM/acre',
      sowingMethod: 'Seed/pod sowing @ 40-50 kg/acre',
      spacing: '30cm rows x 10-12cm between plants',
      irrigationNeeds: '2-3 irrigations - critical at flowering & pod development',
      harvestingAge: '120-150 days when lower leaves yellow, pods ready'
    },
    profitMargin: {
      costPerAcre: '₹10,000-13,000',
      yieldPerAcre: '15-20 quintals (pods), 8-12 quintals (kernels)',
      marketPrice: '₹4,000-5,500 per quintal (kernel)',
      netProfit: '₹30,000-70,000 per acre'
    },
    marketDemand: 'Very strong - oil extraction, food industry, export markets',
    fertiliserSuggestions: {
      nitrogen: '20 kg/acre (fixes own nitrogen)',
      phosphorus: '50 kg/acre - pod development critical',
      potassium: '20 kg/acre',
      organic: '5 tonnes FYM/acre',
      micronutrients: 'Calcium from gypsum 200 kg/acre - prevents aflatoxin'
    },
    pestDiseases: [
      'Leaf spot (fungicide, resistant varieties)',
      'Rust (sulfur dust, resistant varieties)',
      'Termites (seed treatment)',
      'Aflatoxin (harvest timely, dry properly)'
    ],
    usesAndBenefits: 'Nutritious food - protein, healthy fats, vitamins, minerals. Peanut oil healthy cooking oil. Satay, peanut butter popular foods. Animal feed valuable by-product.'
  },

  // Q - Quinoa
  {
    id: 'quinoa',
    name: 'Quinoa',
    image: 'https://images.telegram.hr/xyfmGZ2tueGDM6IHoulFvdWW2bbG2TPke_DyIOPhR08/preset:single1/aHR0cHM6Ly93d3cudGVsZWdyYW0uaHIvd3AtY29udGVudC91cGxvYWRzLzIwMjQvMTEvc3RvLWplLWt2aW5vamEuanBn.jpg',
    category: 'Q',
    cropType: 'Pseudo-Cereal - Amaranthaceae',
    climateRequirements: 'Cool to warm (10-30°C), drought tolerant, altitudes 2000-3500m suitable',
    soilType: 'Well-drained loamy soil, tolerates poor soils, pH 6.0-8.5',
    benefits: [
      'Complete protein - all 9 amino acids, vegan superfood',
      'Climate resilient - drought & frost tolerant',
      'Grows on marginal lands - poor soil tolerance',
      'Growing global superfood trend demand',
      'Export market premium - health conscious',
      'Sustainable agriculture - minimal input'
    ],
    growingProfile: {
      season: 'Cool season (Oct-Feb sowing), hill stations better',
      duration: '120-150 days to maturity',
      temperature: '10-30°C; tolerates frost',
      rainfall: '300-500 mm sufficient; drought tolerant',
      landPreparation: '2-3 ploughings, minimal inputs needed',
      sowingMethod: 'Direct seeding @ 10-12 kg/acre',
      spacing: '45cm rows x 10-12cm between plants',
      irrigationNeeds: '1-2 irrigations; drought tolerant once established',
      harvestingAge: '120-150 days when plants brown & seeds hard'
    },
    profitMargin: {
      costPerAcre: '₹5,000-7,000',
      yieldPerAcre: '10-15 quintals',
      marketPrice: '₹6,000-10,000 per quintal (organic premium)',
      netProfit: '₹50,000-1,30,000 per acre'
    },
    marketDemand: 'Growing rapidly - superfood trend, export premium, organic markets',
    fertiliserSuggestions: {
      nitrogen: '40 kg/acre - modest requirement',
      phosphorus: '40 kg/acre - grain development',
      potassium: '20 kg/acre',
      organic: '2-3 tonnes FYM/acre - minimal input needed',
      micronutrients: 'Usually not required'
    },
    pestDiseases: [
      'Leaf miner (neem spray)',
      'Powdery mildew (sulfur dust)',
      'Gray mold (resistant varieties)',
      'Generally pest-free crop'
    ],
    usesAndBenefits: 'Complete protein superfood - all amino acids, gluten-free. Ancient Incan grain now global superfood. Boiled, salads, flour. Vegan/vegetarian protein source increasing demand.'
  },

  // R - Rice
  {
    id: 'rice',
    name: 'Rice',
    image: 'https://www.genengnews.com/wp-content/uploads/2024/06/GettyImages-622925154-1.jpg',
    category: 'R',
    cropType: 'Cereal Crop - Poaceae',
    climateRequirements: 'Warm (21-37°C), high rainfall (1500-2250 mm) or irrigation',
    soilType: 'Well-drained to poorly drained loamy soil, waterlogged tolerance',
    benefits: [
      'Staple food globally - food security essential',
      'Multiple varieties - white, brown, black rice',
      'By-products valuable - husk, bran, straw',
      'Government procurement support available',
      'Mechanization adoption increasing yields',
      'Growing specialty rice demand - organic, specialty'
    ],
    growingProfile: {
      season: 'Kharif (June-July), Rabi (Sept-Oct), Summer possible',
      duration: '120-160 days to maturity (varies by variety)',
      temperature: '21-37°C optimal for growth',
      rainfall: '1500-2250 mm or irrigation necessary',
      landPreparation: 'Puddling (soaking & ploughing) for water management',
      sowingMethod: 'Seedlings transplanted @ 20x15cm or 25x15cm spacing',
      spacing: 'Row to row: 20-25cm, Plant to plant: 15cm',
      irrigationNeeds: 'Continuous or alternately watered fields',
      harvestingAge: '120-150 days when grain ripens & grains lose moisture'
    },
    profitMargin: {
      costPerAcre: '₹18,000-22,000',
      yieldPerAcre: '40-50 quintals (paddy)',
      marketPrice: '₹1,900-2,400 per quintal (government MSP)',
      netProfit: '₹40,000-1,00,000 per acre'
    },
    marketDemand: 'Staple food crop - government procurement, domestic & export',
    fertiliserSuggestions: {
      nitrogen: '100 kg/acre (split: 3-4 doses) - critical for yield',
      phosphorus: '40 kg/acre - root development',
      potassium: '40 kg/acre - plant strength & disease resistance',
      organic: '5 tonnes FYM/acre initially',
      micronutrients: 'Zinc 5 kg/acre - prevents deficiency'
    },
    pestDiseases: [
      'Blast (resistant varieties, fungicide)',
      'Brown leaf spot (fungicide)',
      'Stem borer (light traps, predators)',
      'Yellow stem borer (pheromone traps)'
    ],
    usesAndBenefits: 'Staple food globally - feeds 2+ billion people. Nutritious carbohydrate source, vitamins, minerals. Brown rice healthier - retains bran nutrients.'
  },

  // S - Soybean
  {
    id: 'soybean',
    name: 'Soybean',
    image: 'https://tiimg.tistatic.com/fp/1/008/266/13-moisture-high-in-protein-organic-cultivated-round-soya-beans-250.jpg',
    category: 'S',
    cropType: 'Pulse/Oilseed Crop - Legume',
    climateRequirements: 'Warm season (21-27°C), moderate to high rainfall (600-1000 mm)',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-7.5',
    benefits: [
      'High protein (40%) & oil (20%) content - nutritious',
      'Nitrogen fixing - improves soil fertility significantly',
      'Growing animal feed demand - livestock industry',
      'Global oilseed demand expanding',
      'Government incentives available in many states',
      'Crop rotation benefits - breaks pest/disease cycles'
    ],
    growingProfile: {
      season: 'Kharif crop (June-July sowing)',
      duration: '95-115 days to maturity',
      temperature: '21-27°C optimal',
      rainfall: '600-1000 mm suitable',
      landPreparation: '2-3 ploughings with 5 tonnes FYM/acre',
      sowingMethod: 'Direct sowing @ 50-75 kg/acre',
      spacing: '45cm rows x 10-15cm between plants',
      irrigationNeeds: '1-2 irrigations if rainfall deficit at flowering',
      harvestingAge: '95-115 days when pods brown & seeds rattle'
    },
    profitMargin: {
      costPerAcre: '₹10,000-12,000',
      yieldPerAcre: '15-20 quintals',
      marketPrice: '₹3,500-4,500 per quintal',
      netProfit: '₹40,000-80,000 per acre'
    },
    marketDemand: 'Very strong - oil extraction, animal feed, processed foods, export',
    fertiliserSuggestions: {
      nitrogen: '20 kg/acre (fixes own nitrogen)',
      phosphorus: '50 kg/acre - pod development critical',
      potassium: '30 kg/acre',
      organic: '5 tonnes FYM/acre',
      micronutrients: 'Molybdenum beneficial for nitrogen fixation'
    },
    pestDiseases: [
      'Stem fly (crop rotation)',
      'Pod borer (pheromone traps, neem spray)',
      'Leaf hopper (neem oil)',
      'Yellow mosaic (resistant varieties)'
    ],
    usesAndBenefits: 'Highest protein pulse (40%) - complete protein. Soy oil healthy cooking oil. Tofu, soy milk growing vegetarian/vegan demand. Animal feed valuable by-product.'
  },

  // T - Tomato
  {
    id: 'tomato',
    name: 'Tomato',
    image: 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/tomato_health_benefits_slideshow/493ss_thinkstock_rf_tomatoes_ripening_on_the_vine.jpg?resize=728px:*&output-quality=75',
    category: 'T',
    cropType: 'Vegetable - Solanaceae',
    climateRequirements: 'Warm season (20-30°C), moderate rainfall, frost sensitive',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-6.8, good organic matter',
    benefits: [
      'Year-round demand - staple vegetable everywhere',
      'High yield potential - 300-500 fruits per plant',
      'Multiple varieties - salad, cooking, processing types',
      'Long harvest period - 120-180+ days continuous',
      'Processing plant demand for tomato paste & sauce',
      'Polyhouse cultivation allows premium off-season'
    ],
    growingProfile: {
      season: 'Kharif (May-July), Rabi (Aug-Sept), Summer possible',
      duration: '120-150 days to first harvest (varies variety)',
      temperature: '20-30°C optimal; frost sensitive',
      rainfall: '400-600 mm suitable, irrigation essential',
      landPreparation: 'Raised beds with 20 tonnes FYM/acre',
      sowingMethod: 'Seedlings @ 75cm x 60cm spacing',
      spacing: 'Row to row: 75cm, Plant to plant: 60cm',
      irrigationNeeds: 'Heavy water requirement - 1-2 weekly irrigation',
      harvestingAge: '120-150 days, pick when color 50% red, ripen after'
    },
    profitMargin: {
      costPerAcre: '₹25,000-30,000',
      yieldPerAcre: '200-300 quintals (field), 500-700 quintals (polyhouse)',
      marketPrice: '₹3-8 per kg (field), ₹15-25 per kg (premium off-season)',
      netProfit: '₹100,000-3,00,000+ per acre'
    },
    marketDemand: 'Very high - year-round, processing plants, export, polyhouse premium',
    fertiliserSuggestions: {
      nitrogen: '150 kg/acre (3-4 splits) - yield critical',
      phosphorus: '80 kg/acre - flowering & fruiting crucial',
      potassium: '80 kg/acre - fruit quality &disease resistance',
      organic: '20 tonnes FYM/acre - mulching essential',
      micronutrients: 'Boron 1 kg/acre - prevents blossom-end rot'
    },
    pestDiseases: [
      'Fruit borer (pheromone traps, neem spray)',
      'Leaf curl virus (resistant varieties, vector control)',
      'Early & late blight (fungicide, resistant varieties)',
      'Root knot nematode (crop rotation)'
    ],
    usesAndBenefits: 'Essential vegetable - nutrient rich, lycopene antioxidant. Fresh salads, cooked curries, processed sauce & paste. Processing plants value fresh supply. Growing global demand.'
  },

  // U - Urad (Black Gram)
  {
    id: 'urad-black-gram',
    name: 'Urad (Black Gram)',
    image: 'https://radianceglobal.in/wp-content/uploads/2023/02/image6-1.png',
    category: 'U',
    cropType: 'Pulse Crop - Legume',
    climateRequirements: 'Warm season (20-30°C), moderate rainfall (600-1000 mm)',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-7.5',
    benefits: [
      'High protein pulse (23-25%) - nutritious dal',
      'Quick maturity - 60-90 days, good for intercropping',
      'Market value - essential pulse in Indian diet',
      'Nitrogen fixing - soil improvement',
      'Government support available - MSP procurement',
      'Growing global demand - Indian diaspora'
    ],
    growingProfile: {
      season: 'Kharif (June-July), Rabi (Sept-Oct sowing)',
      duration: '60-90 days to maturity',
      temperature: '20-30°C optimal',
      rainfall: '600-1000 mm appropriate',
      landPreparation: '2-3 ploughings with 3-5 tonnes FYM/acre',
      sowingMethod: 'Line sowing or broadcasting @ 18-20 kg/acre',
      spacing: '30-40cm rows x 10cm between plants',
      irrigationNeeds: '1-2 irrigations if rainfall deficit at flowering',
      harvestingAge: '60-90 days when pods brown & seeds rattle'
    },
    profitMargin: {
      costPerAcre: '₹8,000-10,000',
      yieldPerAcre: '10-15 quintals',
      marketPrice: '₹4,000-5,500 per quintal (government MSP)',
      netProfit: '₹30,000-70,000 per acre'
    },
    marketDemand: 'Strong - staple pulse, export potential, government procurement',
    fertiliserSuggestions: {
      nitrogen: '20 kg/acre (fixes own nitrogen)',
      phosphorus: '50 kg/acre - pod development crucial',
      potassium: '20 kg/acre',
      organic: '3-5 tonnes FYM/acre',
      micronutrients: 'Molybdenum beneficial for nitrogen fixation'
    },
    pestDiseases: [
      'Leaf folder (neem spray)',
      'Pod borer (light traps, neem spray)',
      'Fusarium wilt (resistant varieties)',
      'Leaf hopper (neem oil)'
    ],
    usesAndBenefits: 'High protein pulse (24%) - dal essential in Indian diet. Urad flour for dosa, idli. Fermented dal aids digestion. Nutrient dense - growing vegan demand.'
  },

  // V - Vegetables Mix (Vegetable farming system)
  {
    id: 'vegetables-mixed',
    name: 'Mixed Vegetables',
    image: 'https://i.pinimg.com/1200x/3a/d8/ae/3ad8ae19e0b80be40b0cdf3305cde0df.jpg',
    category: 'V',
    cropType: 'Vegetable - Mixed',
    climateRequirements: 'Varies by vegetable (15-35°C), year-round possible with rotation',
    soilType: 'Well-drained loamy soil rich in organic matter for most vegetables',
    benefits: [
      'Diversified income - multiple crops year-round',
      'Soil health improvement - varied root systems',
      'Pest/disease management - breaks cycles',
      'Risk mitigation - not dependent on single crop',
      'Market stability - consistent demand all vegetables',
      'Nutritional security - diverse farm produce'
    ],
    growingProfile: {
      season: 'Year-round farming - crop rotation based',
      duration: 'Varies by vegetable (40-150 days)',
      temperature: 'Varies by vegetable',
      rainfall: 'Generally 400-1200 mm depending crops',
      landPreparation: 'Raised beds, drip irrigation beneficial',
      sowingMethod: 'Seedlings transplanted or direct seeding',
      spacing: 'Varies by vegetables - proper spacing essential',
      irrigationNeeds: 'Regular watering - 2-3 times weekly summer',
      harvestingAge: 'Varies by vegetable - continuous picking'
    },
    profitMargin: {
      costPerAcre: '₹40,000-60,000 (annual)',
      yieldPerAcre: '300-500 quintals (various vegetables)',
      marketPrice: 'Varies ₹5-20+ per kg depending vegetable',
      netProfit: '₹2,00,000-5,00,000+ per acre (annual)'
    },
    marketDemand: 'Very high - year-round demand for all vegetables, market diversity',
    fertiliserSuggestions: {
      nitrogen: '100-150 kg/acre annually - varies by crop',
      phosphorus: '50-80 kg/acre - flowering/fruiting support',
      potassium: '50-80 kg/acre - plant strength & quality',
      organic: '20-30 tonnes FYM/acre annually - mulching',
      micronutrients: 'Boron, Zinc, Magnesium as required'
    },
    pestDiseases: [
      'Varies by vegetable - integrated pest management',
      'Crop rotation reduces pest/disease pressure significantly',
      'Organic methods preferred for vegetable production',
      'Regular monitoring & timely intervention key'
    ],
    usesAndBenefits: 'Diverse nutrition - essential for balanced diet. Multiple vegetables ensure year-round income. Market demand consistent. Sustainability through crop rotation & minimal chemicals.'
  },

  // W - Wheat
  {
    id: 'wheat',
    name: 'Wheat',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrXjFLKJsy15ECC8fJ2Apc8TwfW-vcvfYf7A&s',
    category: 'W',
    cropType: 'Cereal Crop - Poaceae',
    climateRequirements: 'Cool season (15-20°C), moderate rainfall (250-500 mm)',
    soilType: 'Well-drained loamy to clay loam soil, pH 6.0-8.0',
    benefits: [
      'Staple cereal crop - food security essential',
      'Government procurement at MSP support',
      'Storage friendly - long shelf life',
      'Mechanization suitable - harvesters available',
      'Growing demand - population increase',
      'Multiple uses - flour, animal feed, industrial'
    ],
    growingProfile: {
      season: 'Rabi crop (Oct-Nov sowing)',
      duration: '120-140 days to maturity',
      temperature: '15-20°C optimal; frost tolerance',
      rainfall: '250-500 mm sufficient',
      landPreparation: '2-3 ploughings, light FYM beneficial',
      sowingMethod: 'Line sowing or broadcasting @ 100 kg/acre',
      spacing: '20-22cm rows x 5-6cm between plants',
      irrigationNeeds: '3-4 irrigations - critical at CRI, grain filling',
      harvestingAge: '120-140 days when grain ripens & moisture decreases'
    },
    profitMargin: {
      costPerAcre: '₹12,000-15,000',
      yieldPerAcre: '40-50 quintals',
      marketPrice: '₹2,000-2,500 per quintal (government MSP)',
      netProfit: '₹60,000-1,20,000 per acre'
    },
    marketDemand: 'Very strong - staple food, government procurement, export markets',
    fertiliserSuggestions: {
      nitrogen: '100-120 kg/acre (2-3 splits) - critically affects yield',
      phosphorus: '60 kg/acre - root development & yield',
      potassium: '40 kg/acre - plant strength & disease resistance',
      organic: '5 tonnes FYM/acre',
      micronutrients: 'Zinc 25 kg/acre recommended'
    },
    pestDiseases: [
      'Rust (resistant varieties, fungicide)',
      'Smut (seed treatment, resistant varieties)',
      'Shoot fly (predatory beetles)',
      'Leaf spot (fungicide, resistant varieties)'
    ],
    usesAndBenefits: 'Staple cereal globally - carbohydrates, proteins, B vitamins. Flour for bread, noodles, pasta. Animal feed byproduct valuable. Food security crop for millions.'
  },

  // X - Xanthan Gum (Scientific crops)
  {
    id: 'cardamom',
    name: 'Cardamom (Alternative X-crop)',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/LJ/AY/SQ/67732047/green-cardamom-elaichi-500x500.jpg',
    category: 'X',
    cropType: 'Spice Crop - Zingiberaceae',
    climateRequirements: 'Cool, humid climate (15-25°C), high rainfall (1500-2250 mm)',
    soilType: 'Well-drained loamy soil rich in organic matter, forest conditions',
    benefits: [
      'Premium spice - highest priced spice globally',
      'Shade-loving - agroforestry compatible',
      'Long productive life - 15-20 years',
      'Growing global spice demand',
      'Strong export market - premium prices',
      'Sustainable farmer income source'
    ],
    growingProfile: {
      season: 'Plant during monsoon (June-Aug)',
      duration: '3-4 years to first significant harvest',
      temperature: '15-25°C optimal',
      rainfall: '1500-2250 mm essential, high humidity',
      landPreparation: '2 metre deep pit with FYM & compost',
      sowingMethod: 'Seedlings or divisions planted in shade',
      spacing: '2-2.5m x 2-2.5m (800-1000 plants/acre)',
      irrigationNeeds: 'High humidity & moisture essential, supplemental water',
      harvestingAge: '3-4 years to first harvest, 8-10 years optimal'
    },
    profitMargin: {
      costPerAcre: '₹40,000-60,000 (establishment)',
      yieldPerAcre: '1-2 tonnes dried cardamom (mature)',
      marketPrice: '₹1,500-3,000 per kg (green), ₹3,000-5,000 per kg (dried)',
      netProfit: '₹3,00,000-5,00,000+ per acre (long-term)'
    },
    marketDemand: 'Very high - premium spice, global demand, export premium',
    fertiliserSuggestions: {
      nitrogen: '80 kg/acre/year (split)',
      phosphorus: '60 kg/acre/year - flowering important',
      potassium: '80 kg/acre/year',
      organic: '20 tonnes FYM/year - mulching essential',
      micronutrients: 'Magnesium, Boron beneficial'
    },
    pestDiseases: [
      'Leaf spot (copper fungicide)',
      'Rhizome rot (improve drainage, fungicide)',
      'Shoot borer (neem spray)',
      'Thrips (sulfur dust)'
    ],
    usesAndBenefits: 'Premium spice - Queen of Spices. Essential in Indian cuisine, beverages. Medicinal - aids digestion. Global culinary demand high. Export commodity earning strong income.'
  },

  // Y - Sugarcane (alternate Y-crop)
  {
    id: 'yarrow-herb',
    name: 'Yarrow (Medicinal Herb Alternative)',
    image: 'data:image/jpeg;base64,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',
    category: 'Y',
    cropType: 'Medicinal Herb - Asteraceae',
    climateRequirements: 'Cool to warm (10-25°C), frost tolerant, wide range',
    soilType: 'Well-drained loamy soil, tolerates poor soils, pH 4.5-8.0',
    benefits: [
      'Medicinal herb - traditional & modern medicine',
      'Perennial - 3-4 year economic life',
      'Drought tolerant - minimal water needed',
      'Growing herbal medicine market demand',
      'Can intercrop or border plant',
      'Organic certification friendly'
    ],
    growingProfile: {
      season: 'Plant spring or fall, year-round with irrigation',
      duration: '1 year to full production potential',
      temperature: '10-25°C optimal',
      rainfall: '300-1000 mm; drought tolerant once established',
      landPreparation: '1-2 ploughings, minimal inputs',
      sowingMethod: 'Seedlings or root division @ 45cm x 30cm',
      spacing: '45-60cm rows x 30-45cm between plants',
      irrigationNeeds: 'Establishment, then drought tolerant',
      harvestingAge: 'Leaves harvested continuously, 1-2 cuts/year'
    },
    profitMargin: {
      costPerAcre: '₹8,000-12,000',
      yieldPerAcre: '5-8 tonnes fresh (2-3 tonnes dry)',
      marketPrice: '₹5,000-8,000 per quintal (dried herb)',
      netProfit: '₹30,000-80,000 per acre'
    },
    marketDemand: 'Growing - herbal medicines, teas, organic products',
    fertiliserSuggestions: {
      nitrogen: '40 kg/acre/year',
      phosphorus: '30 kg/acre/year',
      potassium: '30 kg/acre/year',
      organic: '5-10 tonnes FYM/year - mulching beneficial',
      micronutrients: 'Not usually required'
    },
    pestDiseases: [
      'Generally pest & disease resistant',
      'Leaf spot minor (remove affected leaves)',
      'Powdery mildew rare (improve air circulation)'
    ],
    usesAndBenefits: 'Traditional herbal medicine - wound healing, fever. Tea for digestive & respiratory health. Growing herbal wellness market. Ornamental value in gardens.'
  },

  // Z - Zucchini
  {
    id: 'zucchini',
    name: 'Zucchini (Courgette)',
    image: 'https://www.gardenia.net/wp-content/uploads/2023/05/cucurbita-pepo-zucchini-780x520.webp',
    category: 'Z',
    cropType: 'Vegetable - Cucurbitaceae',
    climateRequirements: 'Warm season (20-30°C), moderate rainfall, photoperiod-insensitive',
    soilType: 'Well-drained loamy soil rich in organic matter, pH 6.0-7.0',
    benefits: [
      'Quick maturity - 40-50 days to first harvest',
      'High yield - 100-150 fruits per plant',
      'Premium vegetable - gourmet markets',
      'Year-round cropping possible - multiple plantings',
      'Prolific production - low maintenance once established',
      'Growing health-conscious vegetable demand'
    ],
    growingProfile: {
      season: 'Kharif (May-July), Rabi (Aug-Sept), Summer (Jan-Feb)',
      duration: '40-50 days to first harvest',
      temperature: '20-30°C optimal; minimum 15°C',
      rainfall: '500-1000 mm; irrigation essential',
      landPreparation: 'Raised beds with 12 tonnes FYM/acre',
      sowingMethod: 'Hill/seed spot planting @ 30cm x 45cm spacing',
      spacing: '90-100cm rows x 45-60cm between hills',
      irrigationNeeds: 'Heavy water requirement - 2-3 weekly irrigation',
      harvestingAge: '40-50 days first harvest, pick 15-20cm tender daily'
    },
    profitMargin: {
      costPerAcre: '₹18,000-22,000',
      yieldPerAcre: '100-150 quintals',
      marketPrice: '₹8-12 per kg (local), ₹15-25 per kg (specialty markets)',
      netProfit: '₹80,000-1,80,000 per acre'
    },
    marketDemand: 'Growing - gourmet markets, specialty stores, export potential, health restaurants',
    fertiliserSuggestions: {
      nitrogen: '100 kg/acre (split: 3-4 doses) - vegetative growth',
      phosphorus: '50 kg/acre - flowering & fruiting crucial',
      potassium: '60 kg/acre - fruit quality & sweetness',
      organic: '12 tonnes FYM/acre - mulching essential',
      micronutrients: 'Boron 1 kg/acre - prevents blossom-end rot'
    },
    pestDiseases: [
      'Leaf hopper (neem oil, yellow sticky traps)',
      'Powdery mildew (sulfur dust, resistant varieties)',
      'Downy mildew (copper fungicide, ventilation)',
      'Fruit fly (trap crops, pheromone traps)'
    ],
    usesAndBenefits: 'Low calorie nutritious vegetable - vitamins, minerals, fiber. Eaten fresh steamed, grilled, or raw. Mild flavor, versatile cooking. Growing gourmet vegetable demand globally.'
  },
]

