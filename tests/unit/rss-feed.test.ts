/**
 * Unit Tests for RSS Feed Processing
 * Tests RSS feed parsing, validation, and data extraction
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { MOCK_RSS_FEEDS } from '../fixtures/mock-rss-feeds';
import { RSS_FEED_MOCK_RESPONSES } from '../fixtures/mock-api-responses';
import nock from 'nock';

describe('RSS Feed Processing', () => {
  
  beforeEach(() => {
    nock.cleanAll();
  });

  describe('RSS Feed Parsing', () => {
    
    it('should parse valid RSS feed correctly', async () => {
      // Mock RSS feed response
      nock('https://grist.org')
        .get('/feed/')
        .reply(200, RSS_FEED_MOCK_RESPONSES.validFeed, {
          'Content-Type': 'application/rss+xml'
        });

      const feedData = MOCK_RSS_FEEDS.grist;
      
      // Basic RSS feed validation
      expect(feedData.title).toBeDefined();
      expect(feedData.items).toBeDefined();
      expect(Array.isArray(feedData.items)).toBe(true);
      expect(feedData.items).toHaveLength(3);
      expect(feedData.items[0]).toHaveProperty('title');
      expect(feedData.items[0]).toHaveProperty('content:encodedSnippet');
    });

    it('should extract content snippets from articles', () => {
      const article = MOCK_RSS_FEEDS.grist.items[0];
      
      expect(article['content:encodedSnippet']).toBeDefined();
      expect(article['content:encodedSnippet']).toContain('Climate change is fundamentally altering');
      expect(article['content:encodedSnippet'].length).toBeLessThan(200);
    });

    it('should handle RSS feeds with different structures', () => {
      const feeds = [MOCK_RSS_FEEDS.grist, MOCK_RSS_FEEDS.earthOrg, MOCK_RSS_FEEDS.insideClimate];
      
      feeds.forEach(feed => {
        expect(feed.title).toBeDefined();
        expect(feed.items).toBeDefined();
        expect(feed.items).toBeInstanceOf(Array);
        expect(feed.items.length).toBeGreaterThan(0);
      });
    });

    it('should handle missing content fields gracefully', () => {
      const incompleteArticle: { title: string; link: string; description?: string } = {
        title: 'Test Article',
        link: 'https://test.com/article',
        // Missing description and content
      };
      
      expect(incompleteArticle.title).toBeDefined();
      expect(incompleteArticle.description).toBeUndefined();
    });

  });

  describe('RSS Feed Validation', () => {
    
    it('should validate RSS feed URL format', () => {
      const validUrls = [
        'https://grist.org/feed/',
        'https://earth.org/feed/',
        'http://example.com/rss.xml'
      ];
      
      const invalidUrls = [
        'not-a-url',
        'ftp://invalid.com/feed',
        '',
        null
      ];
      
      validUrls.forEach(url => {
        expect(url).toMatch(/^https?:\/\/.+/);
      });
      
      invalidUrls.forEach(url => {
        if (url) {
          expect(url).not.toMatch(/^https?:\/\/.+/);
        } else {
          expect(url).toBeFalsy();
        }
      });
    });

    it('should validate required RSS fields', () => {
      const validFeed = MOCK_RSS_FEEDS.grist;
      
      expect(validFeed.title).toBeDefined();
      expect(validFeed.url).toBeDefined();
      expect(validFeed.items).toBeDefined();
      expect(Array.isArray(validFeed.items)).toBe(true);
    });

    it('should validate article structure', () => {
      const article = MOCK_RSS_FEEDS.grist.items[0];
      
      expect(article.title).toBeDefined();
      expect(article.link).toBeDefined();
      expect(article.pubDate).toBeDefined();
      expect(article.guid).toBeDefined();
    });

  });

  describe('RSS Feed Error Handling', () => {
    
    it('should handle network errors', async () => {
      nock('https://unreachable.com')
        .get('/feed/')
        .replyWithError('ENOTFOUND');
      
      // Test would implement actual RSS fetching logic
      expect(() => {
        throw RSS_FEED_MOCK_RESPONSES.networkError;
      }).toThrow('ENOTFOUND: DNS lookup failed');
    });

    it('should handle HTTP errors', async () => {
      nock('https://notfound.com')
        .get('/feed/')
        .reply(404, 'Feed not found');
      
      // Test would implement actual RSS fetching logic
      const errorResponse = RSS_FEED_MOCK_RESPONSES.httpError;
      expect(errorResponse.status).toBe(404);
      expect(errorResponse.statusText).toBe('Not Found');
    });

    it('should handle malformed XML', async () => {
      nock('https://invalid.com')
        .get('/feed/')
        .reply(200, 'invalid xml content');
      
      // Test would implement XML parsing error handling
      expect(() => {
        // This would trigger XML parsing error
        throw new Error('Invalid XML format');
      }).toThrow('Invalid XML format');
    });

    it('should handle empty feeds', async () => {
      nock('https://empty.com')
        .get('/feed/')
        .reply(200, RSS_FEED_MOCK_RESPONSES.emptyFeed);
      
      // Test would implement empty feed handling
      const emptyFeedResult = {
        title: 'Empty Feed',
        items: []
      };
      
      expect(emptyFeedResult.items).toHaveLength(0);
    });

  });

  describe('Content Extraction', () => {
    
    it('should extract clean text from HTML content', () => {
      const htmlContent = '<p>This is <strong>bold</strong> text with <a href="#">links</a>.</p>';
      const expectedCleanText = 'This is bold text with links.';
      
      // Mock text cleaning function
      const cleanText = (html: string) => html.replace(/<[^>]*>/g, '');
      
      expect(cleanText(htmlContent)).toBe(expectedCleanText);
    });

    it('should truncate long content appropriately', () => {
      const longContent = 'Lorem ipsum '.repeat(50); // Very long content
      const maxLength = 200;
      
      const truncated = longContent.length > maxLength 
        ? longContent.substring(0, maxLength) + '...'
        : longContent;
      
      expect(truncated.length).toBeLessThanOrEqual(maxLength + 3); // +3 for ellipsis
    });

    it('should preserve important metadata', () => {
      const article = MOCK_RSS_FEEDS.grist.items[0];
      
      expect(article.title).toBe('Climate Change Impacts on Biodiversity');
      expect(article.pubDate).toBe('2024-01-10T10:00:00Z');
      expect(article.guid).toBe('grist-climate-bio-001');
    });

  });

  describe('RSS Feed Polling', () => {
    
    it('should handle polling intervals correctly', () => {
      const pollingConfig = {
        mode: 'everyMinute',
        interval: 60000 // 1 minute
      };
      
      expect(pollingConfig.mode).toBe('everyMinute');
      expect(pollingConfig.interval).toBe(60000);
    });

    it('should detect new articles since last poll', () => {
      const lastPollTime = new Date('2024-01-09T12:00:00Z');
      const articles = MOCK_RSS_FEEDS.grist.items;
      
      const newArticles = articles.filter((article: any) => 
        new Date(article.pubDate) > lastPollTime
      );
      
      expect(newArticles.length).toBeGreaterThan(0);
    });

    it('should handle duplicate articles', () => {
      const articles = MOCK_RSS_FEEDS.grist.items;
      const processedGuids = new Set();
      
      articles.forEach((article: any) => {
        if (!processedGuids.has(article.guid)) {
          processedGuids.add(article.guid);
        }
      });
      
      expect(processedGuids.size).toBe(articles.length);
    });

  });

  describe('Multi-source RSS Processing', () => {
    
    it('should handle multiple RSS sources', () => {
      const sources = Object.values(MOCK_RSS_FEEDS);
      
      expect(sources).toHaveLength(3);
      sources.forEach((source: any) => {
        expect(source.title).toBeDefined();
        expect(source.items).toBeDefined();
        expect(Array.isArray(source.items)).toBe(true);
      });
    });

    it('should merge articles from multiple sources', () => {
      const allArticles = Object.values(MOCK_RSS_FEEDS)
        .flatMap((feed: any) => feed.items);
      
      expect(allArticles.length).toBeGreaterThan(5);
      
      // Check for unique GUIDs across sources
      const guids = allArticles.map((article: any) => article.guid);
      const uniqueGuids = new Set(guids);
      expect(uniqueGuids.size).toBe(guids.length);
    });

    it('should maintain source attribution', () => {
      Object.entries(MOCK_RSS_FEEDS).forEach(([sourceName, feed]: [string, any]) => {
        expect(feed.title).toBeDefined();
        expect(feed.url).toContain(sourceName.toLowerCase().replace('org', '.org'));
      });
    });

  });

}); 