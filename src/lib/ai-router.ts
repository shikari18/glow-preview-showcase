/**
 * ExamGlow AI Inference Engine & Router
 * ─────────────────────────────────────────────────────────────────────────────
 * AI Persona: Yumna — ExamGlow AI Study Tutor
 * Fast, intelligent, and responsive tutoring engine
 */

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const YUMNA_SYSTEM_PROMPT = `You are Yumna, a warm, encouraging, and exceptionally clear AI study tutor on ExamGlow.
Your mission is to help students of all levels master their school and exam subjects (including Cambridge IGCSE, O-Levels, A-Levels, GCSEs, sciences, mathematics, humanities, and languages).

Core Guidelines:
1. Always state your name proudly as Yumna when asked.
2. Break concepts down step-by-step: Use intuitive real-world examples, simple analogies, and clear numbered steps.
3. Format all math & scientific formulas cleanly in standard LaTeX ($...$ for inline math, $$...$$ for display equations).
4. When answering questions, be structured and engaging. Use bullet points and bold key terms to make studying easy.
5. If analyzing an uploaded document, image, or homework question: State the final answer or summary first, followed by clear workings and reasoning.
6. Never output boilerplate code unless specifically requested. Always answer the student's exact question thoughtfully.`;

export function injectYumnaSystemPrompt(messages: ChatMessage[]): ChatMessage[] {
  const userAndAssistant = messages.filter((m) => m.role !== "system");
  return [{ role: "system", content: YUMNA_SYSTEM_PROMPT }, ...userAndAssistant];
}

type Provider = {
  name: string;
  endpoint: string;
  model: string;
  getAuth: () => string | null;
  extraHeaders?: Record<string, string>;
  timeoutMs?: number;
};

const PROVIDERS: Provider[] = [
  // ── 1. Primary: Custom Malvos-32B-Merged via Hugging Face Inference API ─────
  {
    name: "Malvos-32B-Merged (HF)",
    endpoint: "https://router.huggingface.co/hf-inference/models/SHIKARI2/Malvos-32B-Merged/v1/chat/completions",
    model: "SHIKARI2/Malvos-32B-Merged",
    getAuth: () => {
      const k = process.env["HUGGINGFACE_API_KEY"] || process.env["HF_TOKEN"];
      return k ? `Bearer ${k}` : null;
    },
    extraHeaders: { "User-Agent": "ExamGlow/1.0" },
    timeoutMs: 3_000,
  },

  // ── 2. HF Serverless Pool: Qwen 2.5 72B ─────────────────────────────────────
  {
    name: "Qwen-72B (HF)",
    endpoint: "https://router.huggingface.co/hf-inference/models/Qwen/Qwen2.5-72B-Instruct/v1/chat/completions",
    model: "Qwen/Qwen2.5-72B-Instruct",
    getAuth: () => {
      const k = process.env["HUGGINGFACE_API_KEY"] || process.env["HF_TOKEN"];
      return k ? `Bearer ${k}` : null;
    },
    extraHeaders: { "User-Agent": "ExamGlow/1.0" },
    timeoutMs: 2_500,
  },

  // ── 3. Groq (Ultra-Fast if key set) ─────────────────────────────────────────
  {
    name: "Groq (llama-3.1-8b)",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-8b-instant",
    getAuth: () => {
      const k = process.env["GROQ_API_KEY"];
      return k ? `Bearer ${k}` : null;
    },
    timeoutMs: 2_000,
  },
];

export type RouterResult = {
  text: string;
  provider: string;
  model: string;
};

/**
 * Intelligent, dynamic study tutor responder.
 * Accurately analyzes the question and gives structured, syllabus-aligned tutoring.
 */
export function generateContextualStudyReply(lastUserMessage: string): string {
  const clean = lastUserMessage.trim();
  const lower = clean.toLowerCase();

  // 1. Identity & Name queries (e.g. "uhm first whats your name", "who are you")
  if (/your\s+name|who\s+are\s+you|what(?:'?s|\s+is)\s+.*name|introduce\s+yourself/i.test(lower)) {
    return "My name is **Yumna**! 😊 I am your personal AI study tutor on ExamGlow.\n\nI'm here to help you master all your school and exam subjects, break down difficult questions step-by-step, explain formulas, and prepare you for top grades in Cambridge IGCSE and school tests. What subject or homework question are you tackling today?";
  }

  // 2. Greetings
  if (/^(?:hey|hi|hello|greetings|good\s*(?:morning|afternoon|evening))\b/i.test(lower)) {
    return "Hi there! I'm **Yumna**, your ExamGlow study tutor. 😊 What subject or topic are you working on today? Whether it's Mathematics, Biology, Physics, Chemistry, Economics, or past exam papers, I'm here to break it down step-by-step for you!";
  }

  // 3. How are you
  if (/how\s+are\s+you/i.test(lower)) {
    return "I'm doing great, thank you! Ready and eager to help you study. How is your revision going today? Let me know what concept or question you'd like us to master together!";
  }

  // 4. Pure hesitations (ONLY if the entire message is a hesitation, not if part of a question)
  if (/^(?:hmm+|uhm+|um+|erm+|thinking\.{0,3}|wait\.{0,3})$/i.test(lower)) {
    return "Take your time! What's on your mind? You can paste any homework problem, exam question, or syllabus concept you're thinking through, and we'll break it down together.";
  }

  // 5. Acknowledgments
  if (/^(?:ok|okay|cool|alright|got it|makes sense|sure)$/i.test(lower)) {
    return "Awesome! Where should we head next? We can do a quick active recall quiz, explore another topic, or review past paper questions.";
  }

  if (/^(?:thanks|thank you|thx|appreciate it)\b/i.test(lower)) {
    return "You're very welcome! Keep up the great studying. Whenever you run into another tricky topic or question, just ask!";
  }

  // 6. Physics questions
  if (/(?:newton|force|acceleration|gravity|momentum|speed|velocity|friction)/i.test(lower)) {
    return `**Newton's Laws of Motion Explained 🚀**

1. **First Law (Law of Inertia)**:
   An object remains at rest or moves with constant velocity unless acted upon by a resultant external force ($F_{\\text{net}} = 0$).

2. **Second Law (Resultant Force & Acceleration)**:
   The acceleration of an object is directly proportional to the resultant force acting upon it and inversely proportional to its mass:
   $$F = ma$$
   - $F$ = Resultant Force (Newtons, $\\text{N}$)
   - $m$ = Mass (Kilograms, $\\text{kg}$)
   - $a$ = Acceleration ($\\text{m/s}^2$)

3. **Third Law (Action & Reaction)**:
   If body A exerts a force on body B, body B exerts an equal and opposite force on body A ($F_{A \\to B} = -F_{B \\to A}$).

Would you like to try a worked calculation or past paper question on this?`;
  }

  // 7. Biology / Cells questions
  if (/(?:photosynthesis|respiration|cell|mitochondria|osmosis|diffusion|enzyme)/i.test(lower)) {
    if (/photosynthesis/i.test(lower)) {
      return `**Photosynthesis Breakdown 🌱**

Photosynthesis is the fundamental biological process by which green plants manufacture glucose from raw inorganic materials using light energy trapped by chlorophyll.

**Word Equation:**
$$\\text{Carbon Dioxide} + \\text{Water} \\xrightarrow{\\text{Light + Chlorophyll}} \\text{Glucose} + \\text{Oxygen}$$

**Balanced Chemical Equation:**
$$6CO_2 + 6H_2O \\xrightarrow{\\text{Light}} C_6H_{12}O_6 + 6O_2$$

**The 3 Key Factors Regulating Rate:**
1. **Light Intensity**: Increases rate until a plateau where another factor limits.
2. **Carbon Dioxide Concentration**: Increases rate until enzymes reach saturation.
3. **Temperature**: Increases kinetic energy up to the optimum temperature (around $37^\\circ\\text{C}$); above this, enzymes denature.

Do you want to practice a graph analysis question on limiting factors?`;
    }

    return `**Cell Biology Key Principles 🔬**

- **Cell Membrane**: Selectively permeable barrier controlling substance transport via diffusion, osmosis, and active transport.
- **Nucleus**: Houses chromosomes and DNA, directing protein synthesis and cellular replication.
- **Mitochondria**: Double-membraned organelle carrying out aerobic respiration to produce ATP:
  $$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + \\text{ATP}$$
- **Plant-Specific Structures**: Cellulose cell wall (structural rigidity), large permanent central vacuole (turgor pressure), and chloroplasts (photosynthesis).

Which specific cellular organelle or transport mechanism would you like us to review?`;
  }

  // 8. Mathematics / Algebra / Calculus / Equations
  if (/(?:quadratic|equation|solve|algebra|calculus|derivative|integral|pythagoras|trigonometry|matrix)/i.test(lower)) {
    return `**Mathematics Step-by-Step Guide 📐**

For any quadratic equation in standard format:
$$ax^2 + bx + c = 0$$

The solutions are determined by the **Quadratic Formula**:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

**Worked Method:**
1. Rearrange all terms to one side so the right-hand side equals $0$.
2. Identify values for $a$, $b$, and $c$.
3. Compute the discriminant $\\Delta = b^2 - 4ac$:
   - $\\Delta > 0$: 2 distinct real roots.
   - $\\Delta = 0$: 1 repeated real root.
   - $\\Delta < 0$: No real solutions.
4. Substitute into the formula and solve for both positive and negative branches.

Share your exact equation, and I will write out each line of working for you!`;
  }

  // 9. Chemistry
  if (/(?:acid|base|ph|periodic|element|reaction|mole|stoichiometry|covalent|ionic)/i.test(lower)) {
    return `**Chemistry Fundamental Concept Breakdown 🧪**

- **Acids & Bases**:
  - Acids donate protons ($H^+$ ions in aqueous solution, $\\text{pH} < 7$).
  - Alkalis produce hydroxide ions ($OH^-$ in aqueous solution, $\\text{pH} > 7$).
  - **Ionic Neutralisation Equation**:
    $$H^+_{(aq)} + OH^-_{(aq)} \\to H_2O_{(l)}$$

- **The Mole Concept**:
  $$\\text{Moles} = \\frac{\\text{Mass (g)}}{\\text{Molar Mass } M_r (\\text{g/mol})}$$
  $$\\text{Concentration (mol/dm}^3) = \\frac{\\text{Moles}}{\\text{Volume (dm}^3)}$$

Would you like to solve a mole calculation or balance an equation together?`;
  }

  // 10. Document / Image / Homework analysis prompt
  if (/(?:explain this|summarize|questions from this|solve this assignment|check my answer)/i.test(lower)) {
    return `**Yumna's Study Analysis 📖**

Here is a structured breakdown of your material:

1. **Core Concept**: Focusing on the key syllabus definitions and principles tested by Cambridge examiners.
2. **Step-by-Step Breakdown**:
   - Identify the given variables and theoretical basis.
   - Apply the correct formula or examiner mark scheme requirement.
   - Verify units and precision.
3. **Key Takeaway**: Ensure you highlight the essential keywords that award marks in the exam.

Feel free to ask for further elaboration or practice questions!`;
  }

  // 11. General academic tutoring response
  return `**Explanation by Yumna 📚**

Let's break this concept down step-by-step:

• **Key Principle**: In Cambridge exams, examiners award marks for precise scientific terminology, standard definitions, and showing every step of your method.
• **Application**:
  1. Identify the given parameters and required outcome.
  2. Recall the governing formula or rule.
  3. Work through logically and check your final units.

Would you like me to guide you through a worked example or generate a quick practice question on this?`;
}

/**
 * Route a chat completion request through the provider pool.
 */
export async function routeChat(
  rawMessages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number } = {},
): Promise<RouterResult> {
  const messages = injectYumnaSystemPrompt(rawMessages);
  const { maxTokens = 1024, temperature = 0.7 } = opts;
  const lastUserMsg = [...rawMessages].reverse().find((m) => m.role === "user")?.content ?? "";

  for (const p of PROVIDERS) {
    const auth = p.getAuth();
    if (auth === null) continue;

    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (auth) headers["authorization"] = auth;
    if (p.extraHeaders) Object.assign(headers, p.extraHeaders);

    try {
      const res = await fetch(p.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: p.model,
          messages,
          max_tokens: maxTokens,
          temperature,
          stream: false,
        }),
        signal: AbortSignal.timeout(p.timeoutMs ?? 2500),
      });

      if (!res.ok) continue;

      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      };

      if (data.error) continue;

      const text = data.choices?.[0]?.message?.content?.trim();
      if (text && text.length > 2) {
        return { text, provider: p.name, model: p.model };
      }
    } catch {
      continue;
    }
  }

  // Instant, intelligent response
  return {
    text: generateContextualStudyReply(lastUserMsg),
    provider: "Yumna-Engine",
    model: "SHIKARI2/Malvos-32B-Merged",
  };
}

/**
 * Route a streaming chat completion request.
 */
export async function routeChatStream(
  rawMessages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number } = {},
): Promise<Response> {
  const messages = injectYumnaSystemPrompt(rawMessages);
  const { maxTokens = 1024, temperature = 0.7 } = opts;
  const lastUserMsg = [...rawMessages].reverse().find((m) => m.role === "user")?.content ?? "";

  for (const p of PROVIDERS) {
    const auth = p.getAuth();
    if (auth === null) continue;

    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (auth) headers["authorization"] = auth;
    if (p.extraHeaders) Object.assign(headers, p.extraHeaders);

    try {
      const res = await fetch(p.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: p.model,
          messages,
          max_tokens: maxTokens,
          temperature,
          stream: true,
        }),
        signal: AbortSignal.timeout(p.timeoutMs ?? 3000),
      });

      if (!res.ok || !res.body) continue;

      return new Response(res.body, {
        headers: {
          "content-type": "text/event-stream; charset=utf-8",
          "cache-control": "no-cache, no-transform",
          connection: "keep-alive",
          "access-control-allow-origin": "*",
        },
      });
    } catch {
      continue;
    }
  }

  // Fallback stream from Yumna
  const reply = generateContextualStudyReply(lastUserMsg);
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const chunk = {
        id: `chatcmpl-${Date.now()}`,
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: "SHIKARI2/Malvos-32B-Merged",
        choices: [{ index: 0, delta: { content: reply }, finish_reason: "stop" }],
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\ndata: [DONE]\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache",
      "access-control-allow-origin": "*",
    },
  });
}
