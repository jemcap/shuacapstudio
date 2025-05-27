import { StateGraph, START, END } from "@langchain/langgraph";
import { StateSchema } from "./state";
import { detectIntent, recommendService, askLLM } from "./nodes";

const graph = new StateGraph(StateSchema)
  .addNode("detectIntent", detectIntent)
  .addNode("recommendService", recommendService)
  .addNode("askLLM", askLLM)
  .addEdge(START, "detectIntent")
  .addConditionalEdges("detectIntent", (state: any) => {
    switch (state.intent) {
      case "recommend_service":
        return "recommendService";
      default:
        return "askLLM";
    }
  })
  .addEdge("recommendService", END)
  .addEdge("askLLM", END);

export const compiledGraph = graph.compile();
