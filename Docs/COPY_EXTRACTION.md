---
description: 
globs: 
alwaysApply: true
---
# Copy Extraction Agent

This agent helps you extract text content from Figma designs using the Figma API.

## Prerequisites
# Figma Text Extraction Agent

This agent helps you extract text content from Figma designs using the Figma API.

## Prerequisites
# MANDATORY PRE-EXECUTION CHECKLIST

**⚠️ BEFORE RUNNING ANY FIGMA EXTRACTION - COMPLETE THIS CHECKLIST:**

□ **Read this entire COPY_EXTRACTION.md file**
□ **Confirm understanding of text combination rules (see Output section)**
□ **Verify Figma URL format includes node-id parameter**
□ **Review output formatting requirements**
□ **Understand that text elements must be logically combined, not just listed**
□ **Review ticket creation workflow (if ticket creation is requested)**

**Only proceed to execution after completing ALL checklist items above.**

---

# Figma Image Agent Instructions

## Prerequisites

1. **Image Text Extraction**
   - If a image is added as a context, ignore the figma flow and extract the text from the image instead.
   - DO NOT do steps 2, 3.
   - DO NOT do the Setup and Usage
   - Use the same Output flow to combine the copy

2. **Figma Access Token**
   - Go to your Figma account settings
   - Navigate to Access Tokens
   - Create a new access token
   - Save this token for later use

3. **Node.js and npm**
   - Make sure you have Node.js installed (v14 or higher)
   - npm will be included with Node.js

## Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd figma-copy-extraction
   npm install
   ```

2. **Environment Setup**
   The agent is pre-configured with the necessary environment settings. You do not need to set up or modify any environment files.
   
   Note: While the agent uses environment variables internally, all configuration is handled automatically. You can ignore any references to `.env` files or environment setup.

## Usage

1. **Get the Figma URL**
   - Open your Figma design
   - Select the frame/component you want to extract text from
   - Copy the URL from your browser
   - The URL should look like: `https://www.figma.com/file/xxxxx/Design?node-id=347:3746`
   - Note: Make sure the URL includes the `node-id` parameter

2. **Run the Extraction**
   ```bash
   # REMEMBER: Read .cursor/rules/Figma_Image_Agent.mdc FIRST
   npm run build
   npm start "your-figma-url-here"
   ```

   Example:
   ```bash
   # REMEMBER: Complete the mandatory checklist above FIRST
   npm start "https://www.figma.com/design/AAVSLBXkUL9s42AEobvwBs/Design?node-id=347-3746"
   ```

3. **Output**
   - The tool will extract all text elements from the specified node
   - Text will be displayed in numbered order
   - Hidden text elements will be skipped
   - **CRITICAL**: Use your best judgement to combine copy where it makes sense. For example:

     Price formatting:
     ```
     1. $14.99
     2. /mo
     Should be combined as: "$14.99/mo"
     ```

     Button text:
     ```
     1. Get
     2. Started
     Should be combined as: "Get Started"
     ```

     Lists and paragraphs:
     ```
     1. Welcome to
     2. our platform
     3. where you can
     4. build amazing things
     Should be combined as: "Welcome to our platform where you can build amazing things"
     ```

   Note: Text elements are often split in Figma for design purposes (layout, styling, etc.), 
   but should be logically combined when extracting for content purposes.

   **VISUAL FLOW & READING ORDER RULES:**
   
   **Critical**: Always extract text in the order a user would naturally read the interface:
   - **Top to Bottom**: Start from the highest element and work downward
   - **Left to Right**: Within the same horizontal level, read left to right
   - **Visual Hierarchy**: Follow the design's intended flow (headline → description → actions → supporting text)

     Visual Flow Examples:
     ```
     GOOD - Natural Reading Order:
     1. "Start your free trial" (headline)
     2. "Build your website today" (description) 
     3. "Get Started" (primary button)
     4. "See Plans" (secondary action)
     5. "No credit card required" (reassurance)
     
     BAD - Grouped by Content Type:
     Header: "Start your free trial"
     Actions: "Get Started", "See Plans" 
     Features: "Build your website today"
     Trust: "No credit card required"
     ```

     Side-by-Side Content:
     ```
     When content appears in columns, show the relationship:
     11. "$9.99/mo x 12 months" | "$16.99/mo"
         (Left column pricing)  | (Right column pricing)
     12. "Billed yearly"        | "Billed monthly"
         (Left billing info)    | (Right billing info)
     ```

     Reading Flow Validation:
     - Ask: "Would a user naturally read item #3 before item #2?"
     - If no, reorder to match natural scanning pattern
     - Consider: Headlines → Descriptions → Primary Actions → Secondary Actions → Supporting/Legal Text

---

## 🎫 Ticket Creation After Text Extraction

**IMPORTANT**: After completing text extraction, if the user requests ticket creation for implementing the extracted copy, follow this workflow:

### Step 1: Reference TICKET_TEMPLATE.md
- **MUST READ**: `TICKET_TEMPLATE.md` file in the workspace
- Follow the "Ticket Creation Rules & Best Practices" section
- Use appropriate template (Story/Bug/Spike) based on the work type

### Step 2: Clarifying Questions for Copy Implementation
Ask these specific questions for copy/content tickets:

1. **Implementation Scope**: 
   - Where should this copy be implemented? (specific pages, components, features)
   - Is this new copy or replacing existing content?

2. **Copy Context**:
   - What's the purpose of this copy? (marketing, UI labels, error messages, etc.)
   - Are there any brand guidelines or tone requirements?

3. **Technical Requirements**:
   - Does this need translation support?
   - Are there character limits or formatting constraints?
   - Any A/B testing or experimentation needed?

4. **Dependencies**:
   - Are there design assets (images, icons) that go with this copy?
   - Does this require UX/design review?
   - Any API changes needed for dynamic content?

5. **Timeline & Priority**:
   - When does this need to be implemented?
   - Is this part of a larger feature or campaign?

### Step 3: Ticket Creation Workflow
Follow the exact process from TICKET_TEMPLATE.md:

1. **Ask Clarifying Questions** (use questions above + any specific to the request)
2. **Prepare Ticket Preview** using appropriate template:
   - Title: `[AREA]: Implement copy for [Feature/Page/Component]`
   - Include extracted copy in description
   - Link to original Figma URL
   - Use "N/A" for unused sections
   - Make URLs clickable: `[Figma Design](mdc:figma-url)`
3. **Get Approval** before creating in Jira
4. **Create in VNEXT project** with "Dragons in refinement" sprint

### Step 4: Copy-Specific Ticket Template
```
**Description:** Implement extracted copy from Figma design for [specific feature/page].

**Extracted Copy:**
[Insert logically combined copy from extraction]

**Figma Source:** [Figma Design](mdc:figma-url)

**AC:** Dev bullet points of what to complete
* Implement copy in [specific location/component]
* Ensure proper formatting and styling
* Add translation keys if needed
* Happy and Sad path testing
* create Kibana / ESSP board

**POC:** (point of contact) 
* UX team for copy review
* [Specific team member or "N/A"]

**Dependencies:** 
* Figma design finalization
* UX copy approval
* [Other dependencies or "N/A"]

**Documentation:** 
* Update component documentation
* Add copy guidelines if new patterns
* [Other docs or "N/A"]

**UI Design:** 
* [Figma Design](mdc:figma-url)
* Copy formatting requirements
* [Other design assets or "N/A"]

**Review**
* UX sign off for copy accuracy
* 2 peer reviews (#monetization-prs)
* QA (#usi-ii-quality-support)
* [ET needed or "N/A"]

**Done:** 
* Copy implemented and styled correctly
* Matches Figma design exactly
* PR merged
* [Other completion criteria or "N/A"]
```

### Step 5: Post-Creation Actions
- Add to "Dragons in refinement" sprint
- Link to Epic/Parent if part of larger feature
- Tag relevant stakeholders
- Reference original Figma extraction in comments

---

## Troubleshooting

1. **"Node not found in Figma response"**
   - Check that your URL includes a valid node-id
   - Make sure you have access to the Figma file
   - Verify that your access token has the necessary permissions

2. **"Invalid Figma URL format"**
   - Ensure your URL is from Figma and includes the node-id
   - The node-id can be in either format: `347-3746` or `347:3746`

3. **Ticket Creation Issues**
   - Ensure TICKET_TEMPLATE.md is accessible in workspace
   - Verify Atlassian MCP connection for Jira access
   - Check that all clarifying questions are answered before ticket creation

## Notes

- The tool will automatically convert node IDs from dash format (`347-3746`) to colon format (`347:3746`)
- Only visible text elements will be extracted
- The tool recursively extracts text from nested components
- Make sure you have appropriate access permissions to the Figma file
- **Ticket creation is optional** - only create tickets when specifically requested
- Always follow the complete workflow from TICKET_TEMPLATE.md for consistency

## Dependencies

- node-fetch
- dotenv
- TypeScript
- **For Ticket Creation**: Atlassian MCP server, TICKET_TEMPLATE.md

## Security

- Keep your Figma access token secure
- Regularly rotate your access tokens for security
- Follow team security guidelines for Jira ticket creation 