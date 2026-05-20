import { fromPath } from 'pdf2pic'
import fs from 'fs'
import path from 'path'

export interface PageImage {
  pageNumber: number
  filePath: string
}

export async function pdfToImages(
  pdfPath: string,
  outputDir: string,
): Promise<PageImage[]> {
  fs.mkdirSync(outputDir, { recursive: true })

  const converter = fromPath(pdfPath, {
    density: 300,
    saveFilename: 'page',
    savePath: outputDir,
    format: 'png',
    width: 2480,
    height: 3508,
  })

  // Convert all pages; pdf2pic returns an array of results
  const results = await converter.bulk(-1, { responseType: 'image' })

  return results
    .filter(r => r.page != null && r.path != null)
    .map(r => ({
      pageNumber: r.page as number,
      filePath: r.path as string,
    }))
    .sort((a, b) => a.pageNumber - b.pageNumber)
}

export function resolveDataPath(...parts: string[]): string {
  return path.resolve('scripts/data', ...parts)
}
