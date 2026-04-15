
export async function askLLM(userInput) {
    if (!userInput || typeof userInput !== 'string' ) throw new Error('No valid input provided!');
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) throw new Error('Missing api key');

    const resp = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-4.1-nano',
            input: [{ role: 'user', content: [{type: 'input_text', text: userInput}],}]
        })
    })

    if (!resp.ok) {
        const errorText = await resp.text()
        throw new Error(`Request failed with error: ${errorText}`);
    }

    const data = await resp.json();
    //console.log(data);
    //console.log(data.output[0].content[0].text);
    const assistantResponse = data.output[0].content[0].text;

    if(!assistantResponse) throw new Error('No output returned from LLM');

    return assistantResponse;
};