import { getNextMessagePosition, getMessagesByConversationId, getTodosByUserId } from "../db.js";

export function buildLLMInput(userId, conversationId, userMessage) {
    if (!userId) throw new Error('User id is required!');
    if (!conversationId) throw new Error('Conversation id is required!');
    if (userMessage.trim() === '') throw new Error('User message is required');

    const todoContext = buildTodoContext(userId);
    const oldMessages = getMessagesByConversationId(userId, conversationId);
    const newMessageInput = { role: 'user', content: [{type: 'input_text', text: userMessage}],};
    
    if (oldMessages.length === 0) {
        return [todoContext, newMessageInput];
    }

    const msgPosToFetch = getNextMessagePosition(userId, conversationId) - 11;
    const rawMessages = oldMessages.filter((m) => m.position >= msgPosToFetch).sort((a,b) => a.position - b.position);

    const messageHistInput = rawMessages.map((m) => {
            return { 
                role: m.role, 
                content: [{ type: m.role === 'assistant' ? 'output_text' : 'input_text' , text: m.messageText, }]
            }
        })

    return [todoContext, ...messageHistInput, newMessageInput];
}

export function buildTodoContext(userId) {
    const userTodos = getTodosByUserId(userId);
    const todoResp = {
        role: 'user', 
        content: [{ 
            type: 'input_text', 
            text: ''
        }]}

    if (userTodos.length === 0){
        todoResp.content[0].text = `Contesto todo dell'utente: \nNessun todo da completare`;
        return todoResp;
    }

    const todoString = userTodos.map((t) => `- Status:${t.status} | Todo:${t.text} | Created at:${t.createdAt} | Updated at:${t.updatedAt} | To be completed at:${t.toBeCompletedAt ?? 'none'}`).join('\n');
    todoResp.content[0].text = `Contesto todo dell'utente: \n${todoString}`
    return todoResp;

}


export function buildInstructionPrompt() {

    return `Sei un assistente integrato in una todo app.
            Stai ricevendo in input:
                1 - un blocco iniziale di todo dell'utente con il rispettivo status (active/completed), e date di creazione/update/to be completed formattate in unix timestamp;
                2 - una lista di messaggi precedenti della conversazione in ordine cronologico.
                3 - messaggio corrente dell'utente a cui devi rispondere;
            Usa le info sui todo e gli altri messaggi precedenti come contesto, ma rispondi solo all'ultimo messaggio della lista.
            Cerca di essere breve e preciso.
            Non inventare informazioni che non sono presenti nel contesto.
            Se non sei sicuro di una risposta rispondi semplicemente che non sai rispondere.`

}