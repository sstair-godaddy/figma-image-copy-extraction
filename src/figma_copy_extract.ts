import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

interface FigmaNode {
    id: string;
    name: string;
    type: string;
    characters?: string;
    children?: FigmaNode[];
    visible?: boolean;
}

interface FigmaResponse {
    name: string;
    lastModified: string;
    nodes: {
        [key: string]: {
            document: FigmaNode;
        };
    };
}

function parseFigmaUrl(url: string) {
    // Extract the node ID, which might be in format '347-3746' or '347:3746'
    const matches = url.match(/figma\.com\/(file|design)\/([A-Za-z0-9]+)(?:\/[^?]+)?(?:.*node-id=([^&\s]+))?/);
    if (!matches) {
        throw new Error('Invalid Figma URL format');
    }

    // Convert hyphen to colon in node ID if needed
    const nodeId = matches[3]?.replace('-', ':');
    
    return {
        fileKey: matches[2],
        nodeId
    };
}

async function getFigmaTexts(figmaUrl: string): Promise<string[]> {
    const accessToken = process.env.FIGMA_ACCESS_TOKEN;
    if (!accessToken) {
        throw new Error('FIGMA_ACCESS_TOKEN environment variable is not set');
    }

    const { fileKey, nodeId } = parseFigmaUrl(figmaUrl);
    
    if (!nodeId) {
        throw new Error('Node ID is required in the Figma URL');
    }

    const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`;

    console.log('Fetching Figma node...');
    console.log(`Node ID: ${nodeId}`);
    console.log(`URL: ${url}`);
    
    const response = await fetch(url, {
        headers: {
            'X-Figma-Token': accessToken
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
    }

    const responseData = await response.json() as FigmaResponse;

    if (!responseData.nodes || !responseData.nodes[nodeId]) {
        console.log('Available nodes:', Object.keys(responseData.nodes || {}));
        throw new Error(`Node ${nodeId} not found in Figma response`);
    }

    const document = responseData.nodes[nodeId].document;
    return extractTextFromNodes(document);
}

function extractTextFromNodes(node: FigmaNode): string[] {
    const texts: string[] = [];
    
    // Skip invisible nodes
    if (node.visible === false) {
        return texts;
    }
    
    if (node.type === 'TEXT' && node.characters) {
        texts.push(node.characters);
    }
    
    if (node.children) {
        for (const child of node.children) {
            texts.push(...extractTextFromNodes(child));
        }
    }
    
    return texts;
}

// Main execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const figmaUrl = process.argv[2];
    
    if (!figmaUrl) {
        console.log('Usage: npm start "<figma_url>"');
        console.log('Example: npm start "https://www.figma.com/file/xxxxx/Design?node-id=347:3746"');
        process.exit(1);
    }

    getFigmaTexts(figmaUrl)
        .then(texts => {
            console.log('\nExtracted texts:');
            if (texts.length === 0) {
                console.log('No text elements found in this node.');
            } else {
                texts.forEach((text, index) => {
                    console.log(`${index + 1}. ${text}`);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
            process.exit(1);
        });
}

export { getFigmaTexts };