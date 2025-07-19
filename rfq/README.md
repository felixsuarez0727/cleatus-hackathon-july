# RFQ Generator

> **AI-Powered Government Contract Response Generator**

An intelligent web application that generates structured Request for Quote (RFQ) responses for government contracts using AI. Built with modern web technologies and designed for contractors, consultants, and government procurement professionals.

## ✨ Features

### 🤖 AI-Powered Generation
- **Intelligent Document Analysis**: Automatically processes government contract documents
- **Structured Response Creation**: Generates professional RFQ responses with proper formatting
- **Form Field Extraction**: Automatically identifies and creates form fields from contracts
- **Government Compliance**: Ensures responses meet federal contracting standards

### 📝 Interactive Editor
- **Drag & Drop Interface**: Reorder document sections with intuitive drag and drop
- **Real-time Editing**: Edit content directly in the browser
- **Multiple Block Types**: Support for headings (H1, H2, H3), text paragraphs, and forms
- **Live Preview**: Full-screen preview mode for final review
- **Auto-resizing**: Smart textarea resizing for better UX

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### Libraries
- **@dnd-kit** - Advanced drag and drop functionality
- **Lucide React** - Beautiful icon library
- **AI SDK** - OpenAI integration

### AI & Backend
- **OpenAI GPT-4o** - Advanced language model for document generation
- **Next.js API Routes** - Serverless API endpoints
- **File System** - Document storage and processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rfq-generator.git
   cd rfq-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### 1. Generate RFQ Response
- Click "Generate RFQ Response" on the homepage
- The AI will analyze government contract documents
- A structured response will be generated automatically

### 2. Edit and Customize
- Use the drag and drop interface to reorder sections
- Click on any text to edit content
- Add or modify form fields as needed

### 3. Preview and Export
- Click "Full Preview" to see the final document
- Review the complete RFQ response
- Make final adjustments as needed

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── generate/      # RFQ generation endpoint
│   │   └── ai/           # AI processing endpoint
│   ├── editor/           # Document editor page
│   ├── utils/            # Utility functions
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
├── lib/                 # Library configurations
└── types/               # TypeScript type definitions
```

## 🔧 API Endpoints

### `/api/generate`
Generates RFQ responses using AI analysis of government documents.

**Method**: `POST`
**Response**: JSON with structured document blocks


## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |



## 🚧 Current Limitations & Improvement Opportunities

### ⚠️ **Identified Limitations**

#### **1. Single AI Processing Pipeline**
**Current State**: 
- Single OpenAI API call per document generation
- No validation or cross-checking of AI responses
- Limited error recovery mechanisms

**Impact**: 
- Potential for inconsistent or incomplete responses
- No quality assurance on AI-generated content
- Single point of failure in the processing pipeline

#### **2. Basic Response Validation**
**Current State**:
```typescript
// Simple regex matching for response parsing
const match = aiResponse.match(/const response\s*=\s*(\{[\s\S]*\});?/);
if (!match) {
  return NextResponse.json({ error: 'Invalid response format from AI' }, { status: 500 });
}
```

**Limitations**:
- Only checks for basic JSON structure
- No validation of content quality or completeness
- No verification of required fields

#### **3. Sequential Document Processing**
**Current State**:
```typescript
// Single-threaded document processing
const allDocs = await Promise.all(
  filenames.map(async (file) => {
    const filePath = path.join(documentsFolder, file);
    return await fs.readFile(filePath, 'utf-8');
  })
);
```

**Limitations**:
- No parallel processing for large document sets
- Memory constraints with large files
- No progress tracking for long operations

### 🚀 **Proposed Improvements**

#### **1. Multi-Agent AI Processing System**
```typescript
// Proposed multi-agent architecture
interface AIAgent {
  role: 'analyzer' | 'validator' | 'formatter' | 'quality-checker';
  model: 'gpt-4o' | 'gpt-4' | 'claude-3';
  prompt: string;
}

const agents: AIAgent[] = [
  {
    role: 'analyzer',
    model: 'gpt-4o',
    prompt: 'Analyze contract documents and extract key requirements...'
  },
  {
    role: 'validator',
    model: 'gpt-4',
    prompt: 'Validate the generated response for completeness and accuracy...'
  },
  {
    role: 'formatter',
    model: 'gpt-4o',
    prompt: 'Format the response according to government standards...'
  },
  {
    role: 'quality-checker',
    model: 'claude-3',
    prompt: 'Perform final quality check and suggest improvements...'
  }
];
```

**Benefits**:
- Multiple AI models cross-validating responses
- Specialized agents for different tasks
- Improved accuracy and reliability

#### **2. Advanced Response Validation System**
```typescript
// Proposed validation framework
interface ValidationRule {
  field: string;
  type: 'required' | 'format' | 'content' | 'structure';
  validator: (value: any) => boolean;
  errorMessage: string;
}

const validationRules: ValidationRule[] = [
  {
    field: 'blocks',
    type: 'required',
    validator: (blocks) => Array.isArray(blocks) && blocks.length > 0,
    errorMessage: 'Response must contain at least one block'
  },
  {
    field: 'blocks',
    type: 'structure',
    validator: (blocks) => blocks.every(block => 
      block.id && block.type && ['H1', 'H2', 'H3', 'Text', 'Form'].includes(block.type)
    ),
    errorMessage: 'All blocks must have valid id and type'
  },
  {
    field: 'blocks',
    type: 'content',
    validator: (blocks) => blocks.some(block => block.type === 'H1'),
    errorMessage: 'Response must contain at least one H1 heading'
  }
];
```

**Benefits**:
- Comprehensive validation of AI responses
- Detailed error reporting
- Quality assurance before user delivery

#### **3. Parallel Processing & Progress Tracking**
```typescript
// Proposed parallel processing system
interface ProcessingJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  documents: string[];
  agents: AIAgent[];
}

class DocumentProcessor {
  private jobs: Map<string, ProcessingJob> = new Map();
  
  async processDocuments(documents: string[]): Promise<ProcessingJob> {
    const jobId = generateJobId();
    const job: ProcessingJob = {
      id: jobId,
      status: 'pending',
      progress: 0,
      documents,
      agents: this.getAgents()
    };
    
    this.jobs.set(jobId, job);
    
    // Start parallel processing
    const promises = documents.map(async (doc, index) => {
      const result = await this.processDocument(doc, job.agents);
      job.progress = ((index + 1) / documents.length) * 100;
      return result;
    });
    
    const results = await Promise.all(promises);
    job.status = 'completed';
    job.progress = 100;
    
    return job;
  }
}
```

**Benefits**:
- Parallel document processing
- Real-time progress tracking
- Better resource utilization
- Scalable architecture

#### **4. Multi-Prompt Quality Assurance**
```typescript
// Proposed multi-prompt validation system
interface QualityCheck {
  prompt: string;
  expectedFormat: string;
  validationCriteria: string[];
}

const qualityChecks: QualityCheck[] = [
  {
    prompt: 'Verify that all required government contract fields are present',
    expectedFormat: 'JSON with field validation results',
    validationCriteria: ['company_name', 'price', 'delivery_time', 'compliance_requirements']
  },
  {
    prompt: 'Check for consistency in formatting and professional language',
    expectedFormat: 'JSON with formatting score and suggestions',
    validationCriteria: ['professional_tone', 'consistent_formatting', 'grammar_check']
  },
  {
    prompt: 'Validate technical specifications against contract requirements',
    expectedFormat: 'JSON with technical compliance report',
    validationCriteria: ['specifications_match', 'requirements_coverage', 'technical_accuracy']
  }
];
```

**Benefits**:
- Multiple validation layers
- Comprehensive quality checking
- Detailed feedback for improvements

#### **5. Enhanced Error Recovery**
```typescript
// Proposed error recovery system
interface ErrorRecovery {
  errorType: 'api_failure' | 'validation_failure' | 'format_error' | 'timeout';
  recoveryStrategy: 'retry' | 'fallback_model' | 'manual_review' | 'partial_response';
  maxRetries: number;
}

const errorRecoveryStrategies: ErrorRecovery[] = [
  {
    errorType: 'api_failure',
    recoveryStrategy: 'retry',
    maxRetries: 3
  },
  {
    errorType: 'validation_failure',
    recoveryStrategy: 'fallback_model',
    maxRetries: 1
  },
  {
    errorType: 'format_error',
    recoveryStrategy: 'manual_review',
    maxRetries: 0
  }
];
```

**Benefits**:
- Robust error handling
- Automatic recovery mechanisms
- Graceful degradation

### 📊 **Performance Improvements**

#### **1. Caching System**

#### **2. Streaming Responses**
```typescript
// Proposed streaming implementation
export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial response
      controller.enqueue(encoder.encode('{"status": "processing"}\n'));
      
      // Process documents in chunks
      for (const document of documents) {
        const result = await processDocument(document);
        controller.enqueue(encoder.encode(JSON.stringify(result) + '\n'));
      }
      
      controller.close();
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked'
    }
  });
}
```

### 🎯 **Implementation Timeline**

#### **Phase 1**: Foundation
- [ ] Implement multi-agent architecture
- [ ] Add basic validation framework
- [ ] Set up error recovery system

#### **Phase 2**: Enhancement
- [ ] Add parallel processing
- [ ] Implement caching system
- [ ] Add progress tracking

#### **Phase 3**: Optimization
- [ ] Add streaming responses
- [ ] Implement advanced validation
- [ ] Performance optimization

#### **Phase 4**: Testing & Deployment
- [ ] Comprehensive testing
- [ ] Performance benchmarking
- [ ] Production deployment

### 💡 **Key Benefits of Improvements**

1. **🔒 Reliability**: Multiple AI agents cross-validate responses
2. **⚡ Performance**: Parallel processing and caching
3. **🎯 Accuracy**: Advanced validation and quality checks
4. **🛡️ Robustness**: Comprehensive error recovery
5. **📈 Scalability**: Architecture supports growth
6. **🔍 Transparency**: Detailed progress tracking and logging

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

