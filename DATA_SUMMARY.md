# CLEATUS Hackathon Sample Data Summary

## Sample Data Overview

### Entity Data (Gunn Construction LLC)

- **Location**: `entity-data/`
- **Business**: Full-service construction company
- **Key Features**:
    - Limited liability company (LLC)
    - 27 NAICS codes covering comprehensive construction services
    - Main focus: Commercial and institutional building construction
    - Deal makers: Federal/state contracts near Arlington, VA; projects under $1M; renovation work
    - Deal breakers: Contracts over $5M, design-build scope, outside specified regions
    - Based in Arlington, Virginia
    - Established 2023

### Contract Data (Air Force Bleacher Systems RFQ)

- **Location**: `contract-data/`
- **Contract**: FA301625Q0050 - Bleacher Seating Systems
- **Key Features**:
    - RFQ for 8 bleacher systems (125 person capacity each)
    - Small business set-aside
    - NAICS 337127 (Institutional Furniture Manufacturing)
    - Delivery to JBSA Lackland/Camp Bullis, TX
    - Posted: July 2, 2025
    - Deadline: July 21, 2025
    - No installation required (delivery only)
    - Expected value: Under $1M (fits entity preferences)

### Contract Documents

The following documents comprise the complete RFQ package (detailed in [`contract-data/documents.json`](contract-data/documents.json)):

#### Main Solicitation Document (FA301625Q0050)

- **Document ID**: `doc_8e035e28-125f-43ea-b890-b298971a0c4b`
- **Type**: Combined Synopsis/Solicitation
- **Pages**: 41
- **Purpose**: Primary RFQ document with all terms, conditions, and submission requirements
- **Summary**: Complete solicitation for eight Bleacher Seating Systems at JBSA Lackland, TX. 100% SDVOSB set-aside with NAICS 337127. Firm Fixed Price contract with award to lowest priced, technically acceptable offer. Submission deadline: July 21, 2025 at 4:00 PM CDT.

#### Attachment 1: Statement of Work (SOW) - dated 7 January 2025

- **Document ID**: `doc_a3f8f9af-1c96-45f5-92a1-b201bdb6e3ad`
- **Type**: Technical Requirements
- **Pages**: 4
- **Purpose**: Detailed technical specifications and performance requirements
- **Summary**: Technical requirements for eight bleacher systems (125-person capacity each) including delivery locations, seating specifications, security requirements, warranty, testing, and installation acceptance criteria.

#### Attachment 2: Contractor Release of Financial Information Form

- **Document ID**: `doc_951ff593-a007-4d71-b688-1bf392f8c91d`
- **Type**: Required Form (Contractor Completion)
- **Pages**: 1
- **Purpose**: Authorization for government to verify contractor's financial responsibility
- **Summary**: Form requiring contractor name, financial institution details, point of contact information, and authorized signature to permit financial verification per FAR 9.104-1(a).

#### Attachment 3: Financial Information Questionnaire Form

- **Document ID**: `doc_cb6a0fa7-cff3-4510-867b-e6feb4dbb7a4`
- **Type**: Required Form (Bank Completion)
- **Pages**: 1
- **Purpose**: Financial assessment questionnaire to be completed by contractor's financial institution
- **Summary**: Seven-question assessment covering account history, financial status, accounting practices, account types, operational balance, credit availability, and capability assessment for six-figure project execution.

## Strategic Alignment Analysis

**Perfect Match Indicators**:

- ✅ **Contract Type**: Federal contract (entity prefers federal/state)
- ✅ **Project Size**: Under $1M threshold (entity prefers <$1M)
- ✅ **Timeline**: 19 days to bid (entity wants 15+ days)
- ✅ **Scope**: Delivery-only (not design-build)
- ✅ **Capabilities**: Structural work aligns with construction expertise

**Potential Challenges**:

- ⚠️ **NAICS Mismatch**: Contract is 337127 (Manufacturing) vs Entity's 236220 (Construction)
- ⚠️ **Location**: TX delivery vs VA-focused preference
- ⚠️ **Specialization**: Bleacher systems vs general construction

## File Structure

```
temp2_hackathon/
├── entity-data/
│   ├── entity.json          # Complete entity database record
│   └── capability-statement.json  # Capability statement document
├── contract-data/
│   ├── contract.json        # Complete contract database record
│   ├── documents.json       # All contract documents with metadata
│   └── far-sections.json    # Parsed FAR sections breakdown
├── DATA_SUMMARY.md          # This summary document
└── README.md               # Project overview and setup instructions
```

## Data File Details

### Entity Data Files

- `entity.json` (2.3KB): Complete entity record with all business details, NAICS codes, preferences
- `capability-statement.json` (717B): Capability statement document metadata

### Contract Data Files

- `contract.json` (4.8KB): Complete contract record with all details, requirements, dates
- `documents.json` (6.9KB): All 5 contract documents with metadata (SOW, forms, solicitation)
- `far-sections.json` (8.5KB): Complete FAR breakdown with all 13 parsed sections
