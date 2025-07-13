# Marama n8n Workflows

This repository contains n8n workflow definitions for the Marama project - an AI-powered sustainability news aggregation and categorization system.

## Overview

Marama is a comprehensive platform that automatically scrapes, processes, and categorizes sustainability-focused news content from RSS feeds. Using advanced AI classification and a sophisticated sustainability taxonomy, it helps organizations and researchers stay informed about the latest developments in environmental and social sustainability.

## Features

### 🌍 **Sustainability-Focused News Aggregation**
- Automated RSS feed monitoring and content extraction
- Support for multiple news sources and feeds
- Real-time processing with configurable polling intervals

### 🤖 **AI-Powered Content Classification**
- OpenAI GPT-4 powered text classification
- Comprehensive sustainability taxonomy with 26+ categories
- Multi-class classification for nuanced content categorization

### 📊 **Data Management & Storage**
- Supabase integration for structured data storage
- AWS S3 integration for file storage and backups
- Ecosystem mapping and data aggregation capabilities

### 🔧 **Dynamic Workflow Creation**
- Web form interface for adding new RSS sources
- Automated workflow generation for new news sites
- Template-based workflow creation system

## Sustainability Categories

The system categorizes content into the following sustainability domains:

- **Art / Design / Culture** - Creative expression and cultural narratives in sustainability
- **Behaviour Change** - Psychology and strategies for sustainable behavior adoption
- **Blue Economy** - Sustainable ocean and water resource utilization
- **Biodiversity** - Conservation of species and ecosystem resilience
- **Biomimicry** - Nature-inspired sustainable technologies and solutions
- **Bioregional** - Place-based sustainability and regional resilience
- **Circular / Spiral Economy** - Resource reuse and waste minimization
- **Climate & Carbon** - Climate science, emissions, and carbon management
- **Conservation** - Natural resource protection and management
- **Cradle to Cradle** - Continuous cycle design philosophy
- **Degrowth / Steady State** - Alternative economic models within ecological limits
- **Doughnut Economics** - Framework balancing human needs and planetary boundaries
- **Ecocide** - Environmental destruction and accountability
- **Ecological Footprint** - Environmental impact measurement
- **Ecology / Deep Ecology** - Ecosystem relationships and nature's intrinsic value
- **Indigenous** - Indigenous knowledge systems and land stewardship
- **Modern Slavery** - Human rights and ethical sourcing
- **Nature** - Natural world appreciation and protection
- **Place-Based / Cities** - Urban sustainability and local initiatives
- **Planetary Boundaries** - Earth system thresholds and risk management
- **Regenerative Thinking** - Systems that restore and enhance ecosystems
- **Social Justice & DEI** - Equity and inclusion in sustainability
- **Social Procurement** - Ethical purchasing and social value creation
- **Sustainability / ESG / Six Capitals** - Comprehensive sustainability frameworks
- **Symbio(s)cene** - Symbiotic human-nature relationships
- **Systems Thinking** - Holistic approach to complex sustainability challenges
- **Time Horizons** - Long-term planning and intergenerational thinking

## Workflows

### 1. RSS Feed News Scraper
**File:** `[Marama] - News Scrapper from RSS Feed.json`

**Purpose:** Main workflow for processing RSS feeds and categorizing sustainability content.

**Key Components:**
- RSS Feed Trigger with minute-level polling
- AI Text Classifier using OpenAI GPT-4 
- Supabase ecosystem mapping integration
- Data aggregation and AWS S3 storage

**Features:**
- Multi-class content classification
- Ecosystem mapping through Supabase queries
- JSON data processing and storage
- Configurable polling intervals

### 2. Dynamic RSS Feed Creator
**File:** `[Marama] Create new RSS Feed Scrapper.json`

**Purpose:** Web form interface for creating new RSS feed scraper workflows.

**Key Components:**
- Form trigger for user input collection
- Dynamic workflow generation
- Template-based n8n workflow creation
- Automated deployment system

**Features:**
- User-friendly form interface
- Automatic workflow naming
- Template replication with custom parameters
- Seamless integration with existing categorization system

## Prerequisites

- n8n automation platform
- OpenAI API access (GPT-4 model)
- Supabase account and database
- AWS S3 bucket for data storage
- RSS feed sources for content

## Setup Instructions

1. **Import Workflows**
   ```bash
   # Import the workflow files into your n8n instance
   # Navigate to n8n → Workflows → Import
   ```

2. **Configure Credentials**
   - **OpenAI API**: Add your OpenAI API key for GPT-4 access
   - **Supabase**: Configure database connection credentials
   - **AWS S3**: Set up S3 bucket access credentials

3. **Database Setup**
   - Create "Ecosystem Mapping" table in Supabase
   - Configure table schema with required fields
   - Set up proper indexing for query performance

4. **RSS Feed Configuration**
   - Update RSS feed URLs in the workflow
   - Configure polling intervals as needed
   - Test RSS feed accessibility

5. **Activate Workflows**
   - Enable the RSS Feed Scraper workflow
   - Test the Dynamic RSS Creator form
   - Monitor workflow execution logs

## Usage

### Adding New RSS Sources

1. Access the RSS Feed Creator form
2. Enter news site name and feed URL
3. Submit form to automatically generate new scraper workflow
4. New workflow will be created and activated automatically

### Monitoring & Management

- Monitor workflow execution in n8n dashboard
- Review classification results in Supabase
- Check data storage in AWS S3
- Analyze categorization accuracy and adjust as needed

## Technical Architecture

- **Platform**: n8n workflow automation
- **AI Model**: OpenAI GPT-4 for text classification
- **Database**: Supabase for structured data storage
- **Storage**: AWS S3 for file and backup storage
- **Triggers**: RSS feed polling with configurable intervals
- **Processing**: Multi-stage data transformation and aggregation

## Contributing

1. Fork the repository
2. Create feature branch
3. Test workflows thoroughly
4. Submit pull request with detailed description
5. Ensure all credentials are properly configured

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or contributions, please create an issue in the GitHub repository.

## Author

**Sandi Jay (Sandumi)**
- GitHub: [@sandumi](https://github.com/sandumi)
- Project: Marama Sustainability Platform

---

**Note:** This project is part of the broader Marama sustainability ecosystem, focused on democratizing access to sustainability information and insights. 
