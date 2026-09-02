import type { SubjectNotes } from "./types";

export const FIRST_LANGUAGE_ENGLISH: SubjectNotes = {
  id: "first-language-english",
  name: "First Language English",
  code: "0500",
  color: "bg-rose-500",
  chapters: [
    {
      number: 1,
      title: "Reading Comprehension & Meaning Analysis (AO1 R1 & R2)",
      intro: "First Language English requires deep analytical engagement with unseen fiction and non-fiction texts. Candidates must demonstrate precise comprehension of explicit factual statements as well as implicit meanings, subtexts, nuances, and writers' attitudes across Paper 1 and Paper 2.",
      subheadings: [
        {
          title: "Explicit vs Implicit Meaning in Texts",
          body: "Distinguishing between surface-level factual assertions and deeper inferences communicated through word choice, connotation, and tone.",
          groups: [
            {
              subTitle: "Explicit Meaning (R1)",
              bullets: [
                "**Definition**: Information, facts, or ideas stated directly and overtly in the text.",
                "**Exam Technique**: Locate the exact paragraph referenced in the question; extract the factual detail and rephrase it concisely in your own words to prove comprehension."
              ]
            },
            {
              subTitle: "Implicit Meaning and Attitude (R2)",
              bullets: [
                "**Definition**: Ideas, feelings, biases, and attitudes that are suggested, implied, or hinted at rather than stated directly.",
                "**Inference Strategy**: Look for emotive vocabulary, figurative metaphors, rhetorical questions, adjectives, and tone shifts to deduce the writer's underlying perspective."
              ]
            }
          ]
        },
        {
          title: "Exam Strategies for Short-Answer Comprehension",
          body: "Maximizing marks in Paper 1 Question 1 through concise, accurate responses.",
          groups: [
            {
              bullets: [
                "**Command Words**: 'Identify' (extract detail directly), 'Explain' (interpret meaning using own words), 'Give two reasons' (clearly separate into two distinct points).",
                "**Avoid Direct Lifting**: Rephrase quotes using synonyms to demonstrate thorough linguistic understanding.",
                "**Match Marks to Points**: A 2-mark question requires two distinct developed points or an explanation supported by specific text evidence."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Summary Writing & Information Selection (AO1 R5 & AO2 W2/W3/W5)",
      intro: "Summary writing tests the ability to extract relevant content points from a passage according to a specific prompt and synthesize them into a concise, continuous paragraph of 120 words written in your own words with high grammatical accuracy.",
      subheadings: [
        {
          title: "Identifying and Selecting Content Points (R5)",
          body: "Systematic scanning to isolate all relevant facts answering the specific summary task.",
          groups: [
            {
              subTitle: "Selection Method",
              bullets: [
                "**Targeted Reading**: Read the summary question carefully to highlight the exact focus (e.g. 'summarise the disadvantages of ecotourism and the measures taken to protect wildlife').",
                "**Highlight 10-15 Points**: Underline distinct factual points answering the question; ignore introductory anecdotes, descriptive flourishes, and repetitions."
              ]
            }
          ]
        },
        {
          title: "Drafting the Summary in Your Own Words (W2, W3, W5)",
          body: "Combining extracted points into a coherent, tightly written text.",
          groups: [
            {
              subTitle: "Synthesis Rules",
              bullets: [
                "**Continuous Prose**: Write as a single fluent paragraph; never use bullet points, numbered lists, or abbreviations.",
                "**Own Words & Synonyms**: Replace keywords from the passage with accurate synonyms without distorting the factual meaning.",
                "**Logical Connectors**: Use varied transition words (*furthermore, consequently, however, in addition, moreover*) to connect ideas smoothly.",
                "**Word Limit Control**: Aim strictly for 100–120 words. Writing significantly over 120 words wastes time and risks penalizing quality marks."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Writer's Effect & Language Analysis (AO1 R4)",
      intro: "Paper 1 Question 2 examines how writers use imagery, figurative language, sensory details, and syntactic structures to create specific impressions, atmospheres, and psychological effects on the reader.",
      subheadings: [
        {
          title: "Analysing Figurative Language and Imagery",
          body: "Deconstructing metaphors, similes, personification, and sensory imagery.",
          groups: [
            {
              subTitle: "Analytical Framework (P-Q-E)",
              bullets: [
                "**1. Overall Overview**: State the overarching mood, atmosphere, or impression created by the selected paragraph (e.g. 'The writer creates an oppressive, menacing atmosphere of physical exhaustion').",
                "**2. Select 3 Powerful Quotes**: Choose rich figurative phrases rather than plain single words.",
                "**3. Literal Meaning**: State what the phrase means literally.",
                "**4. Deep Connotations**: Unpack specific connotations of individual words (e.g. 'The verb *clawed* suggests desperate, predatory animalistic struggle').",
                "**5. Effect on Reader**: Explain what the reader visualizes or feels as a consequence."
              ]
            },
            {
              subTitle: "Key Figurative Devices",
              bullets: [
                "**Metaphor & Simile**: Establishing imaginative comparison to transfer qualities from vehicle to tenor.",
                "**Personification**: Imbuing inanimate objects or weather with human intentions or agency.",
                "**Onomatopoeia & Alliteration**: Auditory texture reinforcing physical movement or sonic atmosphere.",
                "**Sensory Imagery**: Visual, olfactory, auditory, tactile, and gustatory descriptions evoking realistic immersion."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Extended Response to Reading & Directed Writing (AO1 R1-R3 & AO2 W1-W5)",
      intro: "Candidates produce extended written responses in character (speech, letter, article, report, interview, or journal) evaluating, developing, and transforming facts and viewpoints from provided source texts.",
      subheadings: [
        {
          title: "Text Types, Formats and Registers",
          body: "Adapting tone, register, and structural conventions to match specific audience and purpose.",
          groups: [
            {
              bullets: [
                "**Formal Letter**: Sender/recipient references, formal salutation (*Dear Mr Smith* / *Dear Sir or Madam*), formal sign-off (*Yours sincerely* / *Yours faithfully*), sophisticated persuasive register.",
                "**Magazine/Newspaper Article**: Engaging headline, subheadings, lively introductory hook, balanced evaluation of perspectives, reflective conclusion.",
                "**Speech**: Direct audience engagement ('Ladies and gentlemen', rhetorical questions), clear persuasive structure, memorable closing call to action.",
                "**Journal Entry**: Reflective, first-person voice ($I$), introspective evaluation of emotional reactions and events.",
                "**Formal Report**: Clear title, logical subheaded sections, objective analytical register, prioritized recommendations."
              ]
            }
          ]
        },
        {
          title: "Evaluating and Developing Text Points (AO1 R3)",
          body: "Moving beyond basic text summarization into critical evaluation and creative extension.",
          groups: [
            {
              bullets: [
                "**The Three Prompts / Bullet Points**: Structure your essay around the three required bullet points in the exam question, allocating equal depth to each.",
                "**Inference and Development**: Don't just list facts—explain *why* an event happened, what the *consequences* are, and what the character *thinks and feels* about it based on subtle text clues."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Descriptive Writing Techniques (AO2 W1-W5)",
      intro: "Descriptive writing in Paper 2 requires creating vivid, immersive sensory depictions of a person, place, event, or atmosphere without relying on plot-driven narrative action.",
      subheadings: [
        {
          title: "Structuring Descriptive Pieces",
          body: "Organizing descriptive compositions logically to maintain reader engagement.",
          groups: [
            {
              subTitle: "Spatial and Temporal Progression",
              bullets: [
                "**Panoramic to Microscopic**: Start with a broad panoramic view of the landscape/setting, then zoom in progressively onto intricate micro-details.",
                "**Temporal Progression**: Describe subtle shifts in time, light, or weather (e.g. dawn turning to midday, a calm sea turning into an approaching storm).",
                "**Sensory Rotation**: Systematically integrate sight, sound, smell, touch, and temperature across paragraphs."
              ]
            },
            {
              subTitle: "Advanced Vocabulary & Sentence Variety",
              bullets: [
                "**Evocative Verbs & Nouns**: Replace generic words with precise choices (e.g. instead of 'walked slowly', use 'plodded', 'meandered', 'trudged').",
                "**Varied Sentence Lengths**: Use complex sentences for rich atmosphere and short, abrupt sentences for dramatic tension or emphasis."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Narrative Writing Techniques (AO2 W1-W5)",
      intro: "Narrative writing requires constructing a compelling, well-paced story with credible characterization, dynamic conflict, atmospheric setting, and an effective climax and resolution.",
      subheadings: [
        {
          title: "Narrative Arc and Pacing",
          body: "Classic dramatic structure for short story compositions.",
          groups: [
            {
              subTitle: "Five-Stage Narrative Arc",
              bullets: [
                "**1. Exposition**: Establish setting, mood, and introduce main character efficiently.",
                "**2. Inciting Incident & Rising Action**: Introduce a central dilemma, obstacle, or conflict that builds suspense.",
                "**3. Climax**: The pivotal, highest-stakes moment of emotional or physical confrontation.",
                "**4. Falling Action**: Consequences of the climax unfold.",
                "**5. Resolution**: A satisfying or thought-provoking conclusion (avoid cliché 'it was all a dream' endings)."
              ]
            },
            {
              subTitle: "Show, Don't Tell",
              bullets: [
                "**Principle**: Reveal emotions and character traits through physical actions, dialogue, and physiological reactions rather than stating them directly (e.g. instead of 'He was terrified', write 'His knuckles whitened as his pulse hammered against his ribs')."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 7,
      title: "Technical Accuracy: Grammar, Punctuation and Spelling (SPaG)",
      intro: "A significant portion of writing marks in Cambridge IGCSE English is awarded for technical accuracy. Mastering sophisticated punctuation, varied sentence structures, and standard grammatical rules is essential for top grades.",
      subheadings: [
        {
          title: "Punctuation Mastery",
          body: "Using a full range of punctuation marks for deliberate stylistic effect and grammatical clarity.",
          groups: [
            {
              bullets: [
                "**Semicolon (;)**: Connects two independent clauses that are closely related in meaning ($I$ wanted to leave; it was getting late); separates complex list items containing commas.",
                "**Colon (:)**: Introduces an explanation, quotation, or list; precedes a dramatic concluding revelation.",
                "**Dash (—)**: Emphasizes an abrupt interruption, afterthought, or dramatic pause.",
                "**Apostrophes**: Distinguish possession (*the student's book*, *the students' books*) from contraction (*it's = it is*; note: *its* possessive has no apostrophe)."
              ]
            }
          ]
        },
        {
          title: "Sentence Variety and Common Pitfalls",
          body: "Avoiding structural errors that undermine clarity and style.",
          groups: [
            {
              bullets: [
                "**Comma Splice**: Never join two independent clauses with only a comma; use a full stop, semicolon, or coordinating conjunction (*for, and, nor, but, or, yet, so*).",
                "**Sentence Types**: Balance simple sentences (impact), compound sentences (coordination), and complex sentences with subordinate clauses (sophisticated argument).",
                "**Subject-Verb Agreement**: Ensure singular subjects take singular verbs and plural subjects take plural verbs, especially in complex inverted sentences."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 8,
      title: "Speaking and Listening Skills (AO3 SL1-SL5)",
      intro: "The speaking and listening component evaluates oral fluency, articulation of complex thoughts, interactive discussion, and appropriate register in formal presentations and conversations.",
      subheadings: [
        {
          title: "Individual Presentation (Part 1)",
          body: "Delivering a structured 3–4 minute presentation on a chosen topic.",
          groups: [
            {
              bullets: [
                "**Structure**: Strong introductory thesis $\\to$ three developed analytical points with supporting examples $\\to$ thoughtful conclusion.",
                "**Delivery**: Clear voice projection, steady pacing, natural eye contact, professional register, avoiding filler words (*um, like, you know*)."
              ]
            }
          ]
        },
        {
          title: "Interactive Conversation (Part 2)",
          body: "Engaging in an impromptu 7–8 minute discussion with the examiner.",
          groups: [
            {
              bullets: [
                "**Active Listening**: Respond directly to the examiner's questions, acknowledging nuances.",
                "**Extending Ideas**: Provide justifications, evaluate alternative perspectives, and introduce relevant real-world comparisons.",
                "**Discourse Markers**: Use formal conversational connectors (*Indeed, That is a fascinating perspective, Furthermore, Looking at it from another angle*)."
              ]
            }
          ]
        }
      ]
    }
  ]
};
