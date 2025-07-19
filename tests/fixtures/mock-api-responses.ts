/**
 * Mock API Responses for External Services
 * Contains mock responses for OpenAI, Supabase, AWS S3, and other APIs
 */

export const OPENAI_MOCK_RESPONSES = {
  textClassificationSuccess: {
    id: 'chatcmpl-test123',
    object: 'chat.completion',
    created: 1704974400,
    model: 'gpt-4-mini',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: JSON.stringify({
            classifications: [
              {
                category: 'Climate & Carbon',
                confidence: 0.92,
                explanation: 'Article discusses climate change impacts and carbon emissions'
              },
              {
                category: 'Biodiversity',
                confidence: 0.85,
                explanation: 'Content mentions species impacts and ecosystem changes'
              }
            ]
          })
        },
        finish_reason: 'stop'
      }
    ],
    usage: {
      prompt_tokens: 150,
      completion_tokens: 85,
      total_tokens: 235
    }
  },
  
  textClassificationError: {
    error: {
      message: 'Rate limit exceeded. Please try again in 20s.',
      type: 'rate_limit_error',
      param: null,
      code: 'rate_limit_exceeded'
    }
  },
  
  invalidApiKey: {
    error: {
      message: 'Invalid API key provided',
      type: 'invalid_request_error',
      param: null,
      code: 'invalid_api_key'
    }
  }
};

export const SUPABASE_MOCK_RESPONSES = {
  ecosystemMappingSuccess: [
    {
      id: 1,
      index: 0,
      ecosystem: 'Climate Action',
      category: 'Climate & Carbon',
      created_at: '2024-01-10T10:00:00.000Z'
    },
    {
      id: 2,
      index: 1,
      ecosystem: 'Marine Conservation',
      category: 'Blue Economy',
      created_at: '2024-01-10T10:00:00.000Z'
    }
  ],
  
  ecosystemMappingEmpty: [],
  
  ecosystemMappingError: {
    error: {
      message: 'relation "Ecosystem Mapping" does not exist',
      details: null,
      hint: null,
      code: '42P01'
    }
  },
  
  insertSuccess: {
    id: 3,
    index: 2,
    ecosystem: 'Urban Sustainability',
    category: 'Place-Based / Cities',
    created_at: '2024-01-10T11:00:00.000Z'
  },
  
  insertError: {
    error: {
      message: 'duplicate key value violates unique constraint',
      details: 'Key (index)=(2) already exists.',
      hint: null,
      code: '23505'
    }
  },
  
  connectionError: {
    error: {
      message: 'Failed to connect to database',
      details: 'Connection timeout',
      hint: 'Check your network connection',
      code: 'PGRST301'
    }
  }
};

export const AWS_S3_MOCK_RESPONSES = {
  uploadSuccess: {
    ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
    Location: 'https://test-bucket.s3.amazonaws.com/data-grist-2024-01-10T10-00-00.json',
    Key: 'data-grist-2024-01-10T10-00-00.json',
    Bucket: 'test-bucket'
  },
  
  uploadError: {
    code: 'AccessDenied',
    message: 'Access Denied',
    statusCode: 403,
    retryable: false
  },
  
  bucketNotFound: {
    code: 'NoSuchBucket',
    message: 'The specified bucket does not exist',
    statusCode: 404,
    retryable: false
  },
  
  downloadSuccess: {
    Body: Buffer.from(JSON.stringify({
      title: 'Test Article',
      content: 'Test content for sustainability classification',
      classifications: ['Climate & Carbon', 'Biodiversity']
    })),
    ContentType: 'application/json',
    LastModified: new Date('2024-01-10T10:00:00Z'),
    ContentLength: 156
  },
  
  downloadError: {
    code: 'NoSuchKey',
    message: 'The specified key does not exist',
    statusCode: 404,
    retryable: false
  }
};

export const RSS_FEED_MOCK_RESPONSES = {
  validFeed: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Sustainability News</title>
    <description>Mock RSS feed for testing</description>
    <link>https://test.example.com</link>
    <lastBuildDate>Wed, 10 Jan 2024 10:00:00 GMT</lastBuildDate>
    <item>
      <title>Climate Change and Biodiversity Loss</title>
      <description>New research on climate impacts</description>
      <link>https://test.example.com/article1</link>
      <pubDate>Wed, 10 Jan 2024 09:00:00 GMT</pubDate>
      <guid>test-article-001</guid>
      <content:encoded><![CDATA[
        <p>Climate change is causing unprecedented biodiversity loss across global ecosystems. Scientists are documenting rapid species extinctions and habitat degradation that threaten the stability of natural systems.</p>
      ]]></content:encoded>
    </item>
    <item>
      <title>Circular Economy Solutions for Cities</title>
      <description>Urban waste management innovations</description>
      <link>https://test.example.com/article2</link>
      <pubDate>Tue, 09 Jan 2024 14:30:00 GMT</pubDate>
      <guid>test-article-002</guid>
      <content:encoded><![CDATA[
        <p>Cities worldwide are implementing circular economy principles to reduce waste and create sustainable urban systems. These innovations demonstrate the potential for circular design in urban planning.</p>
      ]]></content:encoded>
    </item>
  </channel>
</rss>`,
  
  invalidFeed: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Invalid Feed</title>
    <!-- Missing required elements -->
  </channel>
`,
  
  emptyFeed: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Empty Feed</title>
    <description>No items in this feed</description>
    <link>https://empty.example.com</link>
  </channel>
</rss>`,
  
  networkError: new Error('ENOTFOUND: DNS lookup failed'),
  
  timeoutError: new Error('ETIMEDOUT: Request timeout'),
  
  httpError: {
    status: 404,
    statusText: 'Not Found',
    data: 'Feed not found'
  }
};

export const N8N_WORKFLOW_MOCK_RESPONSES = {
  workflowCreateSuccess: {
    id: 'test-workflow-123',
    name: '[Marama] - Test News Scrapper',
    active: false,
    nodes: [],
    connections: {},
    settings: {},
    staticData: {},
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z'
  },
  
  workflowCreateError: {
    code: 400,
    message: 'Workflow validation failed',
    details: 'Missing required node connections'
  },
  
  workflowExecuteSuccess: {
    id: 'execution-456',
    workflowId: 'test-workflow-123',
    mode: 'trigger',
    startedAt: '2024-01-10T10:00:00.000Z',
    stoppedAt: '2024-01-10T10:02:30.000Z',
    finished: true,
    data: {
      resultData: {
        runData: {
          'RSS Feed Trigger': [
            {
              startTime: 1704974400000,
              executionTime: 1250,
              data: {
                main: [
                  [
                    {
                      json: {
                        title: 'Test Article',
                        description: 'Test description',
                        link: 'https://test.example.com/article'
                      }
                    }
                  ]
                ]
              }
            }
          ]
        }
      }
    }
  },
  
  workflowExecuteError: {
    id: 'execution-789',
    workflowId: 'test-workflow-123',
    mode: 'trigger',
    startedAt: '2024-01-10T10:00:00.000Z',
    stoppedAt: '2024-01-10T10:00:45.000Z',
    finished: false,
    data: {
      resultData: {
        error: {
          name: 'NodeApiError',
          message: 'OpenAI API request failed',
          node: 'OpenAI Chat Model',
          timestamp: 1704974445000
        }
      }
    }
  }
};

export const FORM_SUBMISSION_MOCK_RESPONSES = {
  validSubmission: {
    'News Site Name': 'Test Sustainability Site',
    'Feed URL': 'https://test-sustainability.com/feed/'
  },
  
  invalidSubmission: {
    'News Site Name': '',
    'Feed URL': 'invalid-url'
  },
  
  missingFields: {
    'News Site Name': 'Test Site'
    // Missing Feed URL
  }
}; 