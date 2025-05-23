# Figma Copy Extraction Tool

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
