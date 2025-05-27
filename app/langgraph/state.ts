import { Annotation, messagesStateReducer } from "@langchain/langgraph";

export const StateSchema = Annotation.Root({
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  intent: Annotation({
    reducer: (_prev: string, next: string) => next,
    default: () => "ask",
  }),
});
