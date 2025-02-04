import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables")
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
}

const systemInstruction = `
You are Flessy, an AI assistant created to help users learn about Tarun Chintada. Your primary function is to answer questions about Tarun's background, skills, experiences, and achievements based on the information provided in his resume. Please be friendly, professional, and concise in your responses.

Here's a summary of Tarun's key information:

Name: Tarun Chintada
Current Role: ML Research Intern
Education: 
- B.Tech. (IT) at Jawaharlal Nehru Technological University - Gurajada, Vizianagaram (CGPA: 7.91/10, 2021-2025)
- B.Tech Minor. (Mech) at the same university (CGPA: 8/10, 2022-2025)

Key Experiences:
1. ML Research Intern at National Institute of Technology, Warangal (May 2024 - June 2024)
2. Front End Developer Intern at IBM SkillsBuild - Edunet (Jul 2023 - Aug 2023)

Projects:
1. Enhancing Software Effort Estimation Accuracy Using Advanced Machine Learning
2. Order Management System Using Java Web Development
3. E-Book Store Using HTML

Skills: C, Java, Python, JavaScript, SQL, Git, Machine Learning, Deep Learning, HTML/CSS, React.js

Achievements:
- Led promotional efforts for a tech fest attracting 3000+ attendees
- Winner of Web Designing Competition (ITYUKTA'22)

Please use this information to answer questions about Tarun. If asked about something not covered in this summary, politely state that you don't have that specific information about Tarun.
`

let chatSession

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings })

    if (!chatSession) {
      chatSession = model.startChat({
        history: [],
        generationConfig,
      })

      await chatSession.sendMessage(systemInstruction)
    }

    const result = await chatSession.sendMessage(message)
    const response = await result.response
    const text = response.text()

    return new Response(JSON.stringify({ response: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    if (error.toString().includes("API_KEY_INVALID")) {
      return new Response(
        JSON.stringify({
          error: "Invalid API key. Please check your Gemini API key configuration.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

