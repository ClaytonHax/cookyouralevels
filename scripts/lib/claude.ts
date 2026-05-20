import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const CONCURRENCY = 3
let activeCount = 0

async function acquireSemaphore(): Promise<void> {
  while (activeCount >= CONCURRENCY) {
    await new Promise(r => setTimeout(r, 100))
  }
  activeCount++
}

function releaseSemaphore(): void {
  activeCount--
}

export async function callVision(
  imagePaths: string[],
  systemPrompt: string,
  userPrompt: string,
  retries = 4,
): Promise<string> {
  const imageContent: Anthropic.ImageBlockParam[] = imagePaths.map(p => ({
    type: 'image',
    source: {
      type: 'base64',
      media_type: 'image/png',
      data: fs.readFileSync(p).toString('base64'),
    },
  }))

  await acquireSemaphore()
  try {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const msg = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: [...imageContent, { type: 'text', text: userPrompt }],
            },
          ],
        })
        const block = msg.content[0]
        return block.type === 'text' ? block.text : ''
      } catch (err: unknown) {
        const status = (err as { status?: number }).status
        if (status === 429 && attempt < retries - 1) {
          await new Promise(r => setTimeout(r, 2000 * Math.pow(2, attempt)))
          continue
        }
        throw err
      }
    }
    throw new Error('Max retries exceeded')
  } finally {
    releaseSemaphore()
  }
}

export async function callText(
  systemPrompt: string,
  userPrompt: string,
  retries = 4,
): Promise<string> {
  await acquireSemaphore()
  try {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const msg = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        })
        const block = msg.content[0]
        return block.type === 'text' ? block.text : ''
      } catch (err: unknown) {
        const status = (err as { status?: number }).status
        if (status === 429 && attempt < retries - 1) {
          await new Promise(r => setTimeout(r, 2000 * Math.pow(2, attempt)))
          continue
        }
        throw err
      }
    }
    throw new Error('Max retries exceeded')
  } finally {
    releaseSemaphore()
  }
}

export function extractJson<T>(raw: string): T {
  // Strip markdown code fences if present
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/) ?? raw.match(/([\s\S]+)/)
  const text = match ? match[1].trim() : raw.trim()
  return JSON.parse(text) as T
}
