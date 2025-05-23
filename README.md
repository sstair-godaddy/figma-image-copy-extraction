# Figma Copy Extraction Tool

> **🚨 AI AGENTS: Read "Agent Instructions" section below BEFORE any operations!**

## Agent Instructions

This project uses AI agents with specific roles and responsibilities:

### Figma_Image_Agent

**Role**: Application execution and text extraction operations

**Responsibilities**:
- Execute the Figma text extraction tool
- Process Figma URLs and extract text content
- Handle API interactions with Figma
- Provide clear output of extracted text elements
- Troubleshoot runtime issues and API errors

**Mandatory Workflow (Complete in Order):**
1. **FIRST**: Read `.cursor/rules/Figma_Image_Agent.mdc` completely
2. **SECOND**: Complete the mandatory pre-execution checklist
3. **THIRD**: Verify URL format and requirements  
4. **FOURTH**: Execute npm start command
5. **FIFTH**: Apply text combination logic to output (DO NOT just list raw elements)

**Usage Guidelines**:
- Always verify Figma URL format before execution
- Check for required environment variables (FIGMA_ACCESS_TOKEN)
- Provide numbered, organized output of extracted text
- Handle both dash and colon node ID formats
- Report any API errors with clear explanations
- **CRITICAL**: Combine related text elements logically (e.g., "$14.99" + "/mo" = "$14.99/mo")

**Command Pattern**:
```bash
# REMEMBER: Read .cursor/rules/Figma_Image_Agent.mdc FIRST
npm start "https://www.figma.com/design/[file-id]/[file-name]?node-id=[node-id]"
```

### Agent_Standards

**Role**: Codebase updates and modifications

**Responsibilities**:
- Follow the Agent_Standards cursor rules for all code changes
- Implement focused, reviewable changes
- Provide clear communication about proposed modifications
- Present options with context before making changes
- Maintain code quality and consistency

**Key Principles**:
- Keep changes focused (one change, one purpose)
- Request early feedback before implementation
- Define clear scope boundaries
- Break changes into reviewable steps
- Present before/after examples for clarity

**Reference**: See the Agent_Standards cursor rules for detailed guidelines on code modification processes.

---

**Note**: Do not commit changes automatically. Always review and approve modifications before committing to version control.

---

Simple AI tool to extract text content from Figma designs or images using the Figma API.

## Prerequisites

- Node.js (v14 or higher)
- npm (included with Node.js)
- Figma API access token

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and add your Figma API token:

```env
FIGMA_ACCESS_TOKEN=your_figma_token_here
```

### 3. Get Your Figma API Token

To obtain your Figma API token:

1. Go to your [Figma account settings](https://www.figma.com/developers/api#access-tokens)
2. Navigate to the "Access Tokens" section
3. Click "Create a new personal access token"
4. Give your token a descriptive name
5. Copy the generated token and add it to your `.env` file

**Important:** Keep your access token secure and never commit it to version control.

## Usage

### 1. Build the Project

```bash
npm run build
```

### 2. Extract Text from Figma

```bash
npm start "your-figma-url-here"
```

**Example:**
```bash
npm start "https://www.figma.com/design/AAVSLBXkUL9s42AEobvwBs/Design?node-id=347-3746"
```

### 3. Extract Text from Image

If you provide an image as context instead of a Figma URL, the tool will automatically extract text from the image without using the Figma API.

## URL Format

Your Figma URL should include the `node-id` parameter:
- Format: `https://www.figma.com/design/[file-id]/[file-name]?node-id=[node-id]`
- The tool supports both dash (`347-3746`) and colon (`347:3746`) format for node IDs

## Output

The tool will:
- Extract all visible text elements from the specified Figma node
- Display text in numbered order
- Automatically combine related text elements (e.g., "$14.99" + "/mo" = "$14.99/mo")
- Skip hidden text elements

## Troubleshooting

**"Node not found in Figma response"**
- Verify your URL includes a valid `node-id`
- Ensure you have access to the Figma file
- Check that your access token has the necessary permissions

**"Invalid Figma URL format"**
- Ensure your URL is from Figma and includes the `node-id` parameter
- The node-id can be in either dash (`347-3746`) or colon (`347:3746`) format

## Dependencies

- node-fetch
- dotenv
- TypeScript

## Security

- Keep your Figma access token secure
- Regularly rotate your access tokens for security
- Never commit your `.env` file to version control 
