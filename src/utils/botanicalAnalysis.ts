
export interface PlantIdentification {
  plantType: 'fruit' | 'vegetable' | 'herb' | 'ornamental';
  species: string;
  commonName: string;
  confidence: number;
}

export interface LeafAnalysis {
  leafShape: string;
  leafColor: string;
  leafSize: string;
  leafTexture: string;
  abnormalities: string[];
}

export interface DiseaseSymptoms {
  symptomType: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  affectedArea: string;
}

export interface ComprehensiveAnalysis {
  plantIdentification: PlantIdentification;
  leafAnalysis: LeafAnalysis;
  diseaseDetected: {
    name: string;
    confidence: number;
    severity: string;
    description: string;
    causativeAgent: string;
  };
  symptoms: DiseaseSymptoms[];
  treatments: Array<{
    type: string;
    action: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
    timing: string;
  }>;
  preventiveMeasures: string[];
}

export const generateComprehensiveAnalysis = (): ComprehensiveAnalysis => {
  // Simulated comprehensive analysis - in real app this would be AI/ML powered
  const analyses = [
    {
      plantIdentification: {
        plantType: 'fruit' as const,
        species: 'Solanum lycopersicum',
        commonName: 'Tomato',
        confidence: 94
      },
      leafAnalysis: {
        leafShape: 'Compound pinnate',
        leafColor: 'Dark green with yellowing edges',
        leafSize: 'Medium (15-20cm)',
        leafTexture: 'Slightly fuzzy with visible veins',
        abnormalities: ['Brown spots', 'Yellowing margins', 'Wilting edges']
      },
      diseaseDetected: {
        name: 'Early Blight',
        confidence: 92,
        severity: 'Moderate',
        description: 'Fungal disease causing dark spots with concentric rings on leaves',
        causativeAgent: 'Alternaria solani'
      },
      symptoms: [
        {
          symptomType: 'Leaf spots',
          severity: 'moderate' as const,
          description: 'Dark brown spots with yellow halos',
          affectedArea: 'Lower leaves primarily'
        },
        {
          symptomType: 'Leaf yellowing',
          severity: 'mild' as const,
          description: 'Progressive yellowing from leaf margins',
          affectedArea: 'Older leaves'
        }
      ]
    },
    {
      plantIdentification: {
        plantType: 'vegetable' as const,
        species: 'Brassica oleracea',
        commonName: 'Cabbage',
        confidence: 88
      },
      leafAnalysis: {
        leafShape: 'Broad ovate',
        leafColor: 'Blue-green with purple tinge',
        leafSize: 'Large (20-30cm)',
        leafTexture: 'Smooth with waxy coating',
        abnormalities: ['Small holes', 'Chewed edges', 'Discoloration patches']
      },
      diseaseDetected: {
        name: 'Clubroot Disease',
        confidence: 85,
        severity: 'Severe',
        description: 'Soil-borne disease affecting root system and causing stunted growth',
        causativeAgent: 'Plasmodiophora brassicae'
      },
      symptoms: [
        {
          symptomType: 'Stunted growth',
          severity: 'severe' as const,
          description: 'Plant appears smaller than normal',
          affectedArea: 'Entire plant'
        },
        {
          symptomType: 'Leaf wilting',
          severity: 'moderate' as const,
          description: 'Leaves wilt during hot weather',
          affectedArea: 'Outer leaves'
        }
      ]
    }
  ];

  const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
  
  return {
    ...randomAnalysis,
    treatments: [
      {
        type: 'Immediate Action',
        action: 'Remove affected leaves',
        description: 'Carefully remove and dispose of infected plant material',
        urgency: 'high',
        timing: 'Within 24 hours'
      },
      {
        type: 'Fungicide Treatment',
        action: 'Apply organic fungicide',
        description: 'Use copper-based or neem oil fungicide spray',
        urgency: 'medium',
        timing: 'Every 7-10 days'
      },
      {
        type: 'Cultural Control',
        action: 'Improve air circulation',
        description: 'Space plants properly and prune lower branches',
        urgency: 'medium',
        timing: 'Next growing season'
      },
      {
        type: 'Soil Management',
        action: 'Soil amendment',
        description: 'Add organic compost and ensure proper drainage',
        urgency: 'low',
        timing: 'Before next planting'
      }
    ],
    preventiveMeasures: [
      'Rotate crops annually to break disease cycles',
      'Water at soil level to avoid wetting leaves',
      'Ensure adequate spacing between plants',
      'Remove plant debris at end of season',
      'Use disease-resistant varieties when available'
    ]
  };
};
