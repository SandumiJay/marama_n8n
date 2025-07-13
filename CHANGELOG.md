# Changelog

All notable changes to the Marama n8n Workflows project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Enhanced error handling and retry mechanisms
- Additional RSS feed sources integration
- Performance optimization for large-scale processing
- Dashboard for monitoring workflow health
- Advanced analytics and reporting features

## [1.0.0] - 2025-01-10

### Added
- **Core RSS Feed Scraper Workflow**
  - Automated RSS feed monitoring with minute-level polling
  - AI-powered content classification using OpenAI GPT-4
  - Comprehensive sustainability taxonomy with 26+ categories
  - Multi-class content classification support
  - Supabase integration for ecosystem mapping
  - AWS S3 integration for data storage and backups
  - Data aggregation and processing capabilities

- **Dynamic RSS Feed Creator**
  - Web form interface for adding new RSS sources
  - Automated workflow generation system
  - Template-based n8n workflow creation
  - User-friendly input collection (News Site Name, Feed URL)
  - Seamless integration with existing categorization system

- **Sustainability Classification System**
  - Art / Design / Culture categorization
  - Behaviour Change content classification
  - Blue Economy and ocean sustainability tracking
  - Biodiversity and conservation content processing
  - Biomimicry and nature-inspired solutions
  - Bioregional and place-based sustainability
  - Circular / Spiral Economy content analysis
  - Climate & Carbon related news processing
  - Conservation and natural resource management
  - Cradle to Cradle design philosophy tracking
  - Degrowth / Steady State economics content
  - Doughnut Economics framework integration
  - Ecocide and environmental justice tracking
  - Ecological Footprint analysis
  - Ecology / Deep Ecology content processing
  - Indigenous knowledge systems recognition
  - Modern Slavery and ethical sourcing tracking
  - Nature and biodiversity content processing
  - Place-Based / Cities sustainability focus
  - Planetary Boundaries framework integration
  - Regenerative Thinking content classification
  - Social Justice & DEI content processing
  - Social Procurement and ethical buying
  - Sustainability / ESG / Six Capitals framework
  - Symbio(s)cene and symbiotic relationships
  - Systems Thinking approach integration
  - Time Horizons and long-term planning

- **Technical Infrastructure**
  - n8n workflow automation platform integration
  - OpenAI API integration for GPT-4 text classification
  - Supabase database connectivity for structured data
  - AWS S3 bucket configuration for file storage
  - RSS feed polling and content extraction
  - JSON data processing and transformation
  - Multi-stage data aggregation pipeline

- **Data Management Features**
  - Ecosystem mapping through Supabase queries
  - Structured data storage and retrieval
  - File-based data backup system
  - Automated data aggregation and summarization
  - Query optimization for performance

### Technical Details
- **RSS Feed Processing**: Automated polling with configurable intervals
- **AI Classification**: OpenAI GPT-4 integration with multi-class support
- **Database**: Supabase "Ecosystem Mapping" table structure
- **Storage**: AWS S3 bucket for JSON data persistence
- **Workflow Management**: n8n visual workflow automation
- **Error Handling**: Basic retry mechanisms and error logging

### Configuration
- RSS feed URLs: Starting with https://grist.org/feed/
- Polling interval: Every minute (configurable)
- AI model: GPT-4.1-mini for text classification
- Database: Supabase with indexed queries
- Storage: AWS S3 with timestamped file naming

### Security
- API key management for OpenAI integration
- Secure database connections to Supabase
- AWS IAM roles for S3 access control
- Credential management through n8n security features

### Performance
- Optimized database queries with proper indexing
- Efficient data aggregation and merge operations
- Streamlined workflow execution paths
- Minimal resource usage with smart polling

## [0.1.0] - 2025-01-01

### Added
- Initial project setup and repository creation
- Basic project structure and documentation
- MIT License configuration
- Initial workflow development and testing

---

## Change Categories

- **Added**: New features and capabilities
- **Changed**: Modifications to existing functionality
- **Deprecated**: Features that will be removed in future versions
- **Removed**: Features that have been removed
- **Fixed**: Bug fixes and corrections
- **Security**: Security-related changes and improvements

## Version History Notes

- **Major versions** (x.0.0): Significant new features or breaking changes
- **Minor versions** (x.y.0): New features that are backward compatible
- **Patch versions** (x.y.z): Bug fixes and minor improvements

## Future Roadmap

### Version 1.1.0 (Planned)
- Enhanced error handling and monitoring
- Additional RSS feed sources
- Performance optimizations
- Advanced analytics dashboard

### Version 1.2.0 (Planned)
- Machine learning model improvements
- Custom classification categories
- API endpoints for external integration
- Real-time notifications and alerts

### Version 2.0.0 (Planned)
- Multi-language support
- Advanced AI capabilities
- Enterprise-grade scalability
- Comprehensive reporting suite

---

**Maintained by**: Sandi Jay (Sandumi)  
**Project**: Marama Sustainability Platform  
**Last Updated**: 2025-01-10 