import { buildInstructionPrompt, buildLLMInput, buildTodoContext } from "./promptBuilder.js";
import { getTodosByUserId, getNextMessagePosition, getMessagesByConversationId, appendQuestionAnswer } from "../db.js";
import { askLLM } from './llmClient.js';

export async function generateChatReply(userId, conversationId, userText) {
    if (!userId) throw new Error('User id is missing!');
    if (!conversationId) throw new Error('Conversation id is required!');
    if (userText.trim() === '') throw new Error('User message is required');

    // context builder
    const instructions = buildInstructionPrompt();

    //todos
    const userTodos = getTodosByUserId(userId);
    const todoContext = buildTodoContext(userTodos);

    //old messages
    const msgPosToFetch = getNextMessagePosition(userId, conversationId) - 11;
    const fullConversation = getMessagesByConversationId(userId, conversationId);
    const lastMessages = fullConversation.filter((m) => m.position >= msgPosToFetch).sort((a,b) => a.position - b.position);
    const llmInput = buildLLMInput(todoContext, lastMessages, userText);

    // ask llm
    const assistantText = await askLLM(instructions, llmInput);

    // append response to db
    const messageExchange = appendQuestionAnswer(userId, conversationId, userText, assistantText);

    return messageExchange;
}