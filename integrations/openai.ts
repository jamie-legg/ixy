import axios from "axios";

function openAI() {
  //TODO: implement
  const apiWrapper = axios.create({
    baseURL: "https://api.openai.com/v1/engines/davinci-instruct-beta-v3/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  const getResponse = async (query: string):Promise<string> => {
    const response = await apiWrapper.post("", {
          "prompt": "The following is a conversation with an AI assistant named Yan. The assistant is creative, trustworthy, passionate, loyal and very friendly. They like to talk about random things.\n\nHuman:"+query,
          "temperature": 0.69,
          "max_tokens": 369,
          "top_p": 1,
          "frequency_penalty": 1.05,
          "presence_penalty": 1.41,
          "stop": ["Human:"]
    });
    return response.data ? response.data.choices[0].text : "";
  }

  return {
    getResponse,
  }
}

export default openAI;
