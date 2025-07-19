# CLEATUS Hackathon July 2025

## RFQ Responder

**What's an RFQ?** An RFQ (Request for Quote) is when the government asks businesses to submit their price and basic details for a specific product or service. Unlike complex proposals, RFQs are typically straightforward: "We need X quantity of Y item, what's your price and when can you deliver it?" It's the government's way of shopping around for the best deal.

We will define a **Response** (government contracting response such as RFP proposal or RFQ quote) as composed of various **blocks** that can be dynamically arranged and structured.

### Block Types

#### Content Blocks

- **H1** - Primary headings
- **H2** - Secondary headings
- **H3** - Tertiary headings
- **Text** - Regular paragraph content

- **Form** - Input forms for data collection

**Why Forms Matter**: Nearly all RFQs (95%+) include standardized forms that contractors must complete. These forms collect essential information like business size classification, delivery timelines, technical specifications, and pricing breakdowns. The government uses these forms to quickly compare responses across all bidders in a standardized format.

### Response Structure

A Response consists of an ordered sequence of blocks that together form a complete government contracting document. Think of it like Notion - modular blocks that can be arranged, reordered, and customized to build the final document.

## The Challenge

Build an AI system where the user clicks "Generate Response" and the AI agent builds the proposal. The user then sees the result and can edit it.

That's it. Simple as that.

Turn what normally takes hours of reading RFQs, analyzing requirements, and filling out forms into something that just works with one click. The AI handles the heavy lifting, the user gets to review and tweak the final result.

## Sample Data

We're working with real production data from the CLEATUS platform to build an AI-powered response system.

### The Contract: Air Force Bleacher Systems

- **RFQ FA301625Q0050** - Request for 8 bleacher seating systems (125-person capacity each)
- **Small business set-aside** for delivery to Texas Air Force base
- **Deadline**: July 21, 2025
- **Scope**: Delivery only, no installation required

### The Entity: Gunn Construction LLC

- **Full-service construction company** based in Arlington, Virginia
- **27 NAICS codes** covering comprehensive construction capabilities
- **Strategic focus**: Federal contracts under $1M in Mid-Atlantic region
- **Perfect alignment** with contract preferences and timeline

## Data Files

- `entity-data/` - Complete business profile and capability statement
- `contract-data/` - Full contract details, documents, and FAR sections
- `_documents/` - Easy reference: markdown versions of contract documents
- `_forms/` - Easy reference: PDF forms for this RFQ

See [DATA_SUMMARY.md](DATA_SUMMARY.md) for detailed file specifications.

### Understanding This RFQ's Requirements

[RFQ_SUBMISSION_GUIDE.md](RFQ_SUBMISSION_GUIDE.md) explains what this specific Air Force RFQ requires for submission - the forms, technical docs, and compliance items contractors must provide.

**Important**: Your AI agent should extract these requirements directly from the contract data itself, not use this guide. This is just to help you understand what a complete RFQ response looks like for this particular solicitation.

## Getting Started

Ready to build? Create your Next.js app right in this repo folder.

Run the [create-next-app](https://nextjs.org/docs/app/getting-started/installation) command:

```bash
npx create-next-app@latest
```

**Recommended selections:**

- **TypeScript**: Yes
- **ESLint**: No
- **Tailwind CSS**: Yes
- **src/ directory**: Yes
- **App Router**: Yes
- **Turbopack**: Yes
- **Customize import alias**: No

This will give you a modern Next.js setup with TypeScript, Tailwind for styling, and the App Router for handling your "Generate Response" button and AI agent workflow.

### AI Agent Implementation

For your AI agent calls, we recommend using the [Vercel AI SDK](https://sdk.vercel.ai) - it integrates seamlessly with Next.js and handles streaming responses, tool calling, and multiple AI providers out of the box.

**Why Vercel + Next.js?**

- **Simple deployment**: Push to GitHub, auto-deploy to Vercel
- **Integrated AI SDK**: Built specifically for Next.js workflows
- **No infrastructure setup**: Focus on building, not configuring servers
- **Perfect for hackathons**: Get from code to live demo in minutes

Keep everything in the Vercel ecosystem and you'll have your AI-powered RFQ responder deployed and shareable instantly.
