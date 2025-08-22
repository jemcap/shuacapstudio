import { ChatOpenAI } from "@langchain/openai";
import services from "@/data.json";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

interface GraphState {
  messages: (HumanMessage | AIMessage)[];
  intent?: string;
}

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  apiKey: process.env.OPENAI_API_KEY!,
});

export const detectIntent = async (state: GraphState): Promise<GraphState> => {
  return { ...state, intent: "recommend_service" };
};

export const recommendService = async (state: GraphState): Promise<GraphState> => {
  // Only use the latest user message for the recommendation
  const latestUserMessage = state.messages
    .slice()
    .reverse()
    .find((msg) => msg._getType() === "human");
  
  const messageContent = typeof latestUserMessage?.content === "string" 
    ? latestUserMessage.content 
    : "";

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
    query: messageContent,
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

export const askLLM = async (state: GraphState): Promise<GraphState> => {
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
