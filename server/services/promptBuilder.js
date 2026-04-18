import { getNextMessagePosition, getMessagesByConversationId } from "../db.js";

export function buildLLMInput(userId, conversationId, userMessage) {
    if (!userId) throw new Error('User id is required!');
    if (!conversationId) throw new Error('Conversation id is required!');
    if (!userMessage) throw new Error('User message is required');

    const oldMessages = getMessagesByConversationId(userId, conversationId);
    const newMessageInput = { role: 'user', content: [{type: 'input_text', text: userMessage}],};
    
    if (oldMessages.length === 0) {
        return [newMessageInput];
    }

    const msgPosToFetch = getNextMessagePosition(userId, conversationId) - 11;
    const rawMessages = oldMessages.filter((m) => m.position >= msgPosToFetch).sort((a,b) => a.position - b.position);

    const messageHistInput = rawMessages.map((m) => {
            return { 
                role: m.role, 
                content: [{ type: m.role === 'assistant' ? 'output_text' : 'input_text' , text: m.messageText, }]
            }
        })
    
    messageHistInput.push(newMessageInput);

    return messageHistInput;
}


export function buildInstructionPrompt() {

    return `Sei un assistente integrato in una todo app. 
            Stai ricevendo in input una lista di messaggi in ordine cronologico.
            Usa gli altri messaggi precedenti come contesto, ma rispondi solo all'ultimo messaggio della lista.
            Cerca di essere breve e preciso.
            Se non sei sicuro di una risposta rispondi semplicemente che non sai rispondere.`

}