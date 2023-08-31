import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";


type formatType = "url" | "b64_json" | null | undefined

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
    // 设置 CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*'); // 这将允许所有来源的访问
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  const { content = "Empty 404", n = 1, size = '512x512', response_format = 'url'} = request.query;
  const openai = new OpenAI({
    organization: process.env.OPENAI_Organization,
    apiKey: process.env.OPENAI_ApiKey,
  });
  const image = await openai.images.generate({ prompt: String(content), n: n as number, size: size as any, response_format: response_format as formatType });
  response.send(image.data);
}
