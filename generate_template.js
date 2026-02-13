import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Sample Data Structure
const headers = ["Title", "URL", "Description", "ImageURL", "Tags"];

const aiToolsData = [
    headers,
    ["ChatGPT", "https://chat.openai.com", "最強大的 AI 對話工具", "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", "AI, Chat, OpenAI"],
    ["Claude", "https://claude.ai", "擅長寫作與分析的 AI", "", "AI, Anthropic"],
    ["Gemini", "https://gemini.google.com", "Google 推出的多模態 AI", "", "AI, Google"]
];

const eduResourcesData = [
    headers,
    ["均一教育平台", "https://www.junyiacademy.org/", "台灣最大的線上學習平台", "", "教育, 免費"],
    ["Canva", "https://www.canva.com", "簡單直覺的設計工具", "", "設計, 教具"]
];

// Create worksheets from data
const wsAI = XLSX.utils.aoa_to_sheet(aiToolsData);
const wsEdu = XLSX.utils.aoa_to_sheet(eduResourcesData);

// Add worksheets to workbook with tab names
XLSX.utils.book_append_sheet(workbook, wsAI, "AI 工具工具箱");
XLSX.utils.book_append_sheet(workbook, wsEdu, "教育資源資源庫");

// Generate the file locally
const filePath = path.join(__dirname, 'Spreadsheet_Template.xlsx');
XLSX.writeFile(workbook, filePath);

console.log(`模板已生成：${filePath}`);
