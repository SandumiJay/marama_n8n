/**
 * Mock RSS Feed Data for Testing
 * Contains sample RSS feed responses for testing workflow functionality
 */

export const MOCK_RSS_FEEDS = {
  grist: {
    url: 'https://grist.org/feed/',
    title: 'Grist',
    description: 'Environmental news and commentary',
    items: [
      {
        title: 'Climate Change Impacts on Biodiversity',
        description: 'New research shows how rising temperatures affect species migration patterns and ecosystem balance.',
        link: 'https://grist.org/climate-biodiversity-2024',
        pubDate: '2024-01-10T10:00:00Z',
        guid: 'grist-climate-bio-001',
        'content:encoded': '<p>Climate change is fundamentally altering biodiversity patterns across the globe. Scientists have observed significant shifts in species distribution, with many animals and plants moving toward cooler regions or higher altitudes. This research highlights the urgent need for conservation strategies that account for climate-driven ecosystem changes.</p>',
        'content:encodedSnippet': 'Climate change is fundamentally altering biodiversity patterns across the globe. Scientists have observed significant shifts in species distribution...'
      },
      {
        title: 'Circular Economy Solutions for Plastic Waste',
        description: 'Innovative approaches to plastic recycling and waste reduction in urban environments.',
        link: 'https://grist.org/circular-economy-plastic-2024',
        pubDate: '2024-01-09T14:30:00Z',
        guid: 'grist-circular-002',
        'content:encoded': '<p>Cities worldwide are implementing circular economy principles to tackle plastic waste. From innovative recycling technologies to zero-waste initiatives, urban areas are becoming laboratories for sustainable waste management. These solutions demonstrate how circular design can create economic value while reducing environmental impact.</p>',
        'content:encodedSnippet': 'Cities worldwide are implementing circular economy principles to tackle plastic waste. From innovative recycling technologies...'
      },
      {
        title: 'Indigenous Land Management Practices',
        description: 'Traditional ecological knowledge offers sustainable solutions for modern conservation challenges.',
        link: 'https://grist.org/indigenous-land-management-2024',
        pubDate: '2024-01-08T09:15:00Z',
        guid: 'grist-indigenous-003',
        'content:encoded': '<p>Indigenous communities have managed ecosystems sustainably for thousands of years. Their traditional ecological knowledge offers valuable insights for modern conservation efforts. Recent partnerships between indigenous groups and conservation organizations are proving effective in protecting biodiversity while respecting cultural heritage.</p>',
        'content:encodedSnippet': 'Indigenous communities have managed ecosystems sustainably for thousands of years. Their traditional ecological knowledge...'
      }
    ]
  },
  
  earthOrg: {
    url: 'https://earth.org/feed/',
    title: 'Earth.Org',
    description: 'Environmental awareness and conservation news',
    items: [
      {
        title: 'Regenerative Agriculture and Carbon Sequestration',
        description: 'How sustainable farming practices can help mitigate climate change through soil carbon storage.',
        link: 'https://earth.org/regenerative-agriculture-carbon-2024',
        pubDate: '2024-01-11T11:00:00Z',
        guid: 'earth-regen-001',
        'content:encoded': '<p>Regenerative agriculture is emerging as a powerful tool for climate mitigation. By focusing on soil health, biodiversity, and natural ecosystem processes, these farming practices can sequester significant amounts of carbon while improving agricultural productivity. Farmers worldwide are adopting cover cropping, rotational grazing, and composting techniques.</p>',
        'content:encodedSnippet': 'Regenerative agriculture is emerging as a powerful tool for climate mitigation. By focusing on soil health, biodiversity...'
      },
      {
        title: 'Blue Economy: Sustainable Ocean Resource Management',
        description: 'Balancing economic development with marine ecosystem conservation.',
        link: 'https://earth.org/blue-economy-ocean-2024',
        pubDate: '2024-01-10T16:45:00Z',
        guid: 'earth-blue-002',
        'content:encoded': '<p>The blue economy represents a paradigm shift in how we approach ocean resources. By prioritizing sustainable practices in fisheries, renewable marine energy, and coastal tourism, countries can achieve economic growth while protecting marine ecosystems. This approach is crucial for coastal communities dependent on ocean resources.</p>',
        'content:encodedSnippet': 'The blue economy represents a paradigm shift in how we approach ocean resources. By prioritizing sustainable practices...'
      }
    ]
  },
  
  insideClimate: {
    url: 'https://insideclimatenews.org/feed/',
    title: 'Inside Climate News',
    description: 'Climate and energy news',
    items: [
      {
        title: 'Social Justice in Climate Policy',
        description: 'Ensuring equitable distribution of climate benefits and addressing environmental racism.',
        link: 'https://insideclimatenews.org/social-justice-climate-2024',
        pubDate: '2024-01-12T08:30:00Z',
        guid: 'icn-justice-001',
        'content:encoded': '<p>Climate policy must address social justice concerns to be truly effective. Environmental racism and unequal exposure to pollution disproportionately affect marginalized communities. New climate initiatives are incorporating equity principles, ensuring that clean energy benefits reach underserved populations and that transition costs are fairly distributed.</p>',
        'content:encodedSnippet': 'Climate policy must address social justice concerns to be truly effective. Environmental racism and unequal exposure...'
      },
      {
        title: 'Biomimicry in Renewable Energy Design',
        description: 'Nature-inspired innovations improving efficiency of solar and wind technologies.',
        link: 'https://insideclimatenews.org/biomimicry-renewable-2024',
        pubDate: '2024-01-11T13:20:00Z',
        guid: 'icn-biomimicry-002',
        'content:encoded': '<p>Engineers are turning to nature for inspiration in renewable energy design. Biomimicry principles have led to more efficient solar panels that mimic photosynthesis, wind turbines designed like whale fins for reduced noise, and energy storage systems inspired by plant cells. These innovations demonstrate how biological processes can inform sustainable technology.</p>',
        'content:encodedSnippet': 'Engineers are turning to nature for inspiration in renewable energy design. Biomimicry principles have led to more efficient...'
      }
    ]
  }
};

export const MOCK_CLASSIFICATION_RESPONSES = {
  biodiversity: {
    category: 'Biodiversity',
    confidence: 0.92,
    explanation: 'Article discusses species migration patterns and ecosystem balance in relation to climate change'
  },
  circularEconomy: {
    category: 'Circular / Spiral Economy',
    confidence: 0.89,
    explanation: 'Content focuses on recycling technologies and waste management solutions'
  },
  indigenous: {
    category: 'Indigenous',
    confidence: 0.95,
    explanation: 'Article centers on traditional ecological knowledge and indigenous land management practices'
  },
  regenerative: {
    category: 'Regenerative Thinking',
    confidence: 0.88,
    explanation: 'Discusses regenerative agriculture and ecosystem restoration practices'
  },
  blueEconomy: {
    category: 'Blue Economy',
    confidence: 0.91,
    explanation: 'Focuses on sustainable ocean resource management and marine conservation'
  },
  socialJustice: {
    category: 'Social Justice & DEI',
    confidence: 0.87,
    explanation: 'Addresses environmental racism and equitable climate policy distribution'
  },
  biomimicry: {
    category: 'Biomimicry',
    confidence: 0.93,
    explanation: 'Describes nature-inspired innovations in renewable energy technology'
  }
};

export const MOCK_MULTI_CLASSIFICATION = {
  climateAndBiodiversity: [
    {
      category: 'Climate & Carbon',
      confidence: 0.85,
      explanation: 'Discusses climate change impacts and temperature rise'
    },
    {
      category: 'Biodiversity',
      confidence: 0.92,
      explanation: 'Addresses species migration and ecosystem changes'
    },
    {
      category: 'Conservation',
      confidence: 0.78,
      explanation: 'Mentions need for conservation strategies'
    }
  ],
  sustainabilityAndESG: [
    {
      category: 'Sustainability / ESG / Six Capitals',
      confidence: 0.90,
      explanation: 'Comprehensive sustainability framework discussion'
    },
    {
      category: 'Systems Thinking',
      confidence: 0.82,
      explanation: 'Holistic approach to environmental challenges'
    }
  ]
};

export const MOCK_ERROR_RESPONSES = {
  invalidRSSFeed: {
    error: 'Invalid RSS feed format',
    message: 'Feed does not contain valid XML structure'
  },
  apiKeyMissing: {
    error: 'Authentication failed',
    message: 'OpenAI API key is missing or invalid'
  },
  classificationFailed: {
    error: 'Classification failed',
    message: 'Unable to classify content due to API rate limits'
  },
  supabaseConnectionError: {
    error: 'Database connection failed',
    message: 'Unable to connect to Supabase database'
  },
  s3UploadError: {
    error: 'S3 upload failed',
    message: 'Unable to upload file to AWS S3 bucket'
  }
};

export const MOCK_ECOSYSTEM_MAPPING = [
  { index: 0, ecosystem: 'Forest Conservation', category: 'Conservation' },
  { index: 1, ecosystem: 'Marine Protection', category: 'Blue Economy' },
  { index: 2, ecosystem: 'Urban Sustainability', category: 'Place-Based / Cities' },
  { index: 3, ecosystem: 'Indigenous Stewardship', category: 'Indigenous' },
  { index: 4, ecosystem: 'Renewable Energy', category: 'Climate & Carbon' },
  { index: 5, ecosystem: 'Circular Systems', category: 'Circular / Spiral Economy' },
  { index: 6, ecosystem: 'Social Equity', category: 'Social Justice & DEI' },
  { index: 7, ecosystem: 'Nature-Based Solutions', category: 'Biomimicry' },
  { index: 8, ecosystem: 'Regenerative Practices', category: 'Regenerative Thinking' },
  { index: 9, ecosystem: 'Ecological Restoration', category: 'Ecology / Deep Ecology' }
];

export const MOCK_WORKFLOW_RESPONSES = {
  rssWorkflowCreated: {
    id: 'test-workflow-001',
    name: '[Marama] - Test Site News Scrapper',
    active: true,
    nodes: 15,
    connections: 25,
    status: 'created'
  },
  workflowExecutionSuccess: {
    id: 'execution-001',
    workflowId: 'test-workflow-001',
    status: 'success',
    startedAt: '2024-01-10T10:00:00Z',
    finishedAt: '2024-01-10T10:02:30Z',
    data: {
      articlesProcessed: 5,
      classificationsCreated: 8,
      ecosystemMappings: 5,
      s3UploadSuccess: true
    }
  },
  workflowExecutionError: {
    id: 'execution-002',
    workflowId: 'test-workflow-001',
    status: 'error',
    startedAt: '2024-01-10T11:00:00Z',
    finishedAt: '2024-01-10T11:00:45Z',
    error: {
      node: 'OpenAI Chat Model',
      message: 'API rate limit exceeded',
      code: 'RATE_LIMIT_ERROR'
    }
  }
}; 