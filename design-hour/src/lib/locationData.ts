// Location-specific data for TAAS consultation pages
// This allows each location page to be customized while sharing a common structure

export interface LocationData {
  name: string;
  slug: string;
  region: string;
  seoTitle: string;
  seoDescription: string;
  heroHeadline: string;
  heroSubtext: string;
  introText: string;
  localChallenges: string[];
  uniqueConsiderations: string;
  commonProblems: string[];
  nearbyAreas: string[];
  servesOnline: boolean;
}

export const locationDatabase: Record<string, LocationData> = {
  borivali: {
    name: 'Borivali',
    slug: 'borivali',
    region: 'Western Suburbs',
    seoTitle: 'Interior Design Consultation Borivali | TAAS',
    seoDescription: 'Design consultation for Borivali homes and commercial spaces. Expert guidance on layouts, materials, storage and space planning for Western Mumbai.',
    heroHeadline: 'Design Consultation<br />for Borivali Spaces',
    heroSubtext: 'TAAS provides independent design direction for homes and commercial spaces in Borivali and the Western suburbs.',
    introText: 'Borivali homes often face unique challenges: plotted society layouts, space optimization in newer buildings, and the need for climate-appropriate material choices. TAAS helps Borivali homeowners and business owners make confident design decisions before they build or renovate.',
    localChallenges: ['Large plotted areas requiring clear spatial distribution', 'Multi-level home planning in developed areas', 'Material durability in Western Mumbai climate', 'Open concept vs. traditional layout decisions'],
    uniqueConsiderations: 'Borivali offers larger plot sizes than central Mumbai, but also requires careful orientation and climate considerations for long-term home design.',
    commonProblems: ['Garden and outdoor space planning', 'Kitchen design for large family homes', 'Material selection for humid climate', 'Multi-generational living space planning', 'Commercial retail space optimization'],
    nearbyAreas: ['Kandivali', 'Malad', 'Goregaon'],
    servesOnline: true,
  },
  kandivali: {
    name: 'Kandivali',
    slug: 'kandivali',
    region: 'Western Suburbs',
    seoTitle: 'Interior Design Consultation Kandivali | TAAS',
    seoDescription: 'Design consultation services in Kandivali, Mumbai. Space planning, layout review, and material guidance for residential and commercial interiors.',
    heroHeadline: 'Design Consultation<br />for Kandivali Homes',
    heroSubtext: 'Expert design direction for Kandivali residents making interior design and renovation decisions.',
    introText: 'Kandivali has rapidly developed with a mix of older society buildings and newer residential complexes. Each requires different design approaches. TAAS helps Kandivali homeowners navigate layout constraints, material choices, and renovation strategies for their specific building type.',
    localChallenges: ['Mixed building types (older societies and new builds)', 'Society-specific architectural constraints', 'Renovation timing in established communities', 'Premium material sourcing'],
    uniqueConsiderations: 'Kandivali combines older, established societies with new high-rise developments. Design solutions must account for both building age and community preferences.',
    commonProblems: ['Kitchen remodeling in dated layouts', 'Balcony usage optimization', 'Material selection within society guidelines', 'Bedroom layout in compact units', 'Storage solutions for family homes'],
    nearbyAreas: ['Borivali', 'Malad', 'Thakur Village'],
    servesOnline: true,
  },
  // Template shown above; would continue for all other locations
  // Each location can be customized with specific challenges, opportunities, and design considerations
};

export function getLocationData(slug: string): LocationData | null {
  return locationDatabase[slug] || null;
}

export function getAllLocations(): LocationData[] {
  return Object.values(locationDatabase);
}
