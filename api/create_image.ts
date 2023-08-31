import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const { content = "Empty 404", n = 1, size = '512x512'} = request.query;
  const openai = new OpenAI({
    organization: process.env.OPENAI_ApiKey,
    apiKey: process.env.OPENAI_Organization,
  });
  const image = await openai.images.generate({ prompt: String(content) });
  response.send(image.data);
}
