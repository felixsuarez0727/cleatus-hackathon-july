import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { main_prompt } from '@/app/utils/prompts';
import { callOpenAI, cleanDocuments, countTokens } from '@/app/lib/utils';

export async function POST(_req: NextRequest) {
  try {
    const documentsFolder = path.resolve('./public/documents');
    const filenames = await fs.readdir(documentsFolder);

    const allDocs = await Promise.all(
      filenames.map(async (file) => {
        const filePath = path.join(documentsFolder, file);
        return await fs.readFile(filePath, 'utf-8');
      })
    );

    const rawDocs = allDocs.join('\n\n---\n\n');
    const contractDocuments = cleanDocuments(rawDocs);

    const prompt = `${main_prompt} \n${contractDocuments}`;

    const promptTokenCount = countTokens(prompt);
    const aiResponse = await callOpenAI(prompt);

    const match = aiResponse.match(/const response\s*=\s*(\{[\s\S]*\});?/);
    if (!match) {
      return NextResponse.json(
        { error: 'Invalid response format from AI' },
        { status: 500 }
      );
    }

    const responseObject = eval('(' + match[1] + ')');

    return NextResponse.json({
      id: 'generated-id',
      role: 'assistant',
      content: JSON.stringify(responseObject),
      tokensUsed: promptTokenCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
