import { ChatOpenAI } from "@langchain/openai";
import services from "@/data.json" assert { type: "json" };
import { AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  apiKey: process.env.OPENAI_API_KEY!,
});

export const detectIntent = async (state: any) => {
  return { ...state, intent: "recommend_service" };
};

export const recommendService = async (state: any) => {
  const message = state.messages.at(-1)?.content || "";
  const videographyServices = services.services.videography;

  const prompt = ChatPromptTemplate.fromTemplate(`
You are a helpful assistant for a videography studio.
Here are the available services:
{services}

Based on the following user query, recommend the most appropriate service.

Service Recommendation: [Service Title]

Description: [Short explanation of why this service fits the user's needs]

If none of the services are a good fit, politely say so and ask the user to describe their needs in more detail.

User query: {query}
  `);

  const formattedPrompt = await prompt.format({
    services: videographyServices
      .map(
        (service) =>
          `- ${service.title}: ${service.description} (Audience: ${service.audience || "N/A"})`
      )
      .join("\n"),
    query: message,
  });

  const response = await model.invoke([
    { role: "user", content: formattedPrompt },
  ]);
  state.messages.push(
    new AIMessage(
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content)
    )
  );
  return state;
};

export const askLLM = async (state: any) => {
  const response = await model.invoke(state.messages);
  state.messages.push(
    new AIMessage(
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content)
    )
  );
  return state;
};
