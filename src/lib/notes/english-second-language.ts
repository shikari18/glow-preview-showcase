import type { SubjectNotes } from "./types";

export const ENGLISH_SECOND_LANGUAGE: SubjectNotes = {
  id: "english-second-language",
  name: "English as a Second Language",
  code: "0510",
  color: "bg-sky-500",
  chapters: [
    {
      number: 1,
      title: "Reading for Detail, Skimming and Scanning (AO1 R1-R4)",
      intro: "English as a Second Language (0510) assesses practical communication across Reading, Writing, Listening, and Speaking. This chapter covers reading strategies for factual texts, identifying explicit facts, deducing implied meanings, and analyzing writers' opinions and attitudes.",
      subheadings: [
        {
          title: "Skimming and Scanning Techniques",
          body: "Essential time-management and information retrieval methods for exam texts.",
          groups: [
            {
              bullets: [
                "**Skimming (Reading for Gist)**: Rapidly reading headings, introductory sentences, and concluding paragraphs to grasp the general topic and structure in under 60 seconds.",
                "**Scanning (Reading for Specific Detail)**: Searching the text specifically for keywords, numbers, names, dates, or technical terms from the question prompt.",
                "**Close Reading**: Carefully analyzing the specific sentence containing the keyword to ensure the answer matches the exact grammatical and factual requirements."
              ]
            }
          ]
        },
        {
          title: "Understanding Implied Meaning and Distractors",
          body: "Avoiding common comprehension traps in multiple-choice and short-answer questions.",
          groups: [
            {
              bullets: [
                "**Identifying Distractors**: Examiners often include words from the text in incorrect multiple-choice options; verify that the entire meaning matches, not just isolated vocabulary.",
                "**Tone & Attitude Clues**: Look for qualifying adverbs (*merely, scarcely, undoubtedly, presumably*) and adjectives that reveal whether the speaker is approving, skeptical, enthusiastic, or critical."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Multiple Matching and Note-Making Techniques",
      intro: "Multiple matching and note-making test your ability to navigate across multiple short texts or paragraphs, locate specific information under categorized headings, and write concise notes without unnecessary words.",
      subheadings: [
        {
          title: "Multiple Matching Strategies (Exercise 2)",
          body: "Systematic elimination techniques when matching statements to 4–5 short person/place profiles.",
          groups: [
            {
              bullets: [
                "**Read Questions First**: Underline the key requirement of each question statement before reading the texts.",
                "**Look for Paraphrases**: The correct match will rephrase the idea using synonyms rather than repeating identical words.",
                "**Cross-Check**: Ensure all criteria in the question statement are satisfied by the chosen text."
              ]
            }
          ]
        },
        {
          title: "Note-Making Under Headings (Exercise 3)",
          body: "Extracting precise bullet-point notes matching required categories.",
          groups: [
            {
              bullets: [
                "**Keep Notes Concise**: Write short, clear phrases starting with action verbs or nouns; avoid writing full long sentences.",
                "**One Point per Line**: Ensure each bullet contains a distinct, separate factual point.",
                "**Categorization**: Ensure points are placed strictly under the correct heading (e.g. putting 'causes' under the 'effects' heading receives zero marks)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Summary Writing Strategies (Exercise 4)",
      intro: "In IGCSE ESL, summary writing requires selecting key points from an article on a specific topic and writing a continuous summary of 80–100 words using linking words and varied sentence structures.",
      subheadings: [
        {
          title: "Content Point Selection and Paraphrasing",
          body: "Extracting and rewording essential facts accurately.",
          groups: [
            {
              bullets: [
                "**Highlight 6–8 Key Points**: Focus exclusively on facts answering the prompt; ignore examples, statistics, and narrative background.",
                "**Paraphrase Key Verbs & Adjectives**: Change grammatical forms (e.g. convert 'they decided to restore the building' $\\to$ 'the restoration of the historic structure')."
              ]
            }
          ]
        },
        {
          title: "Writing Cohesive Summary Paragraphs",
          body: "Structuring a single fluent paragraph within strict word count limits.",
          groups: [
            {
              bullets: [
                "**Structure**: Write as a single continuous paragraph of approximately 80–100 words.",
                "**Linking Devices**: Connect points smoothly using sequencing and additive connectors (*Firstly, In addition to this, Furthermore, Another significant advantage is, Finally*).",
                "**Proofreading**: Check verb tenses, subject-verb agreement, and plural endings."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Writing Informal Emails and Letters (Exercise 5)",
      intro: "Candidates write an informal communication (email or letter) of 120–160 words to a friend or relative about a recent event, trip, or experience, responding to three specific prompt bullet points in a lively, friendly tone.",
      subheadings: [
        {
          title: "Informal Register and Structure",
          body: "Conventions and conversational tone for informal correspondence.",
          groups: [
            {
              subTitle: "Layout and Style",
              bullets: [
                "**Salutation**: *Hi [Name],* or *Dear [Name],*",
                "**Friendly Opening**: *How are you doing? Hope you're well! Sorry for not writing sooner, but I just had to tell you about...*",
                "**Three Body Paragraphs**: Dedicate one clear paragraph to each of the three bullet points in the exam prompt.",
                "**Warm Sign-off**: *Write back soon and let me know what you think! Best wishes, / Take care, / All the best, [Your Name]*"
              ]
            },
            {
              subTitle: "Language Features",
              bullets: [
                "**Informal Vocabulary**: Natural idioms, phrasal verbs (*catch up, turn up, head off*), and contractions (*I'm, didn't, couldn't*).",
                "**Exclamations & Questions**: Use conversational questions (*Can you believe that happened?*) to engage the reader."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Writing Formal Reports, Reviews and Articles (Exercise 6)",
      intro: "Candidates produce an extended formal/semi-formal text (school magazine article, formal report, or review) of 120–160 words presenting a balanced discussion, clear opinions, or recommendations based on provided visual prompts.",
      subheadings: [
        {
          title: "Article, Report and Review Conventions",
          body: "Structural formats and tone requirements for formal writing tasks.",
          groups: [
            {
              subTitle: "Article Conventions",
              bullets: [
                "**Catchy Title**: An intriguing headline that summarizes the theme.",
                "**Engaging Introduction**: Outline the topic with an interesting rhetorical question or fact.",
                "**Balanced Discussion**: Present both advantages and disadvantages or multiple viewpoints in separate paragraphs.",
                "**Conclusion**: Summarize your final stance clearly."
              ]
            },
            {
              subTitle: "Formal Report Conventions",
              bullets: [
                "**Headings**: Use formal subheadings (*Introduction, Current Findings, Positive Aspects, Areas for Improvement, Recommendations*).",
                "**Objective Register**: Impersonal passive structures (*It was observed that, It is recommended to*) and formal modal verbs (*should, ought to*)."
              ]
            },
            {
              subTitle: "Review Conventions",
              bullets: [
                "**Evaluation**: Assess a book, movie, restaurant, event, or facility, detailing specific features, strengths, weaknesses, and a final rating or target recommendation."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Linking Devices, Cohesion and Advanced Vocabulary (AO2 W2 & W3)",
      intro: "High-scoring ESL writing requires sophisticated sentence cohesion, precise transitional discourse markers, and a rich repertoire of academic and descriptive vocabulary.",
      subheadings: [
        {
          title: "Discourse Markers and Connectors",
          body: "Classified transition words for adding, contrasting, explaining cause, and concluding.",
          groups: [
            {
              bullets: [
                "**Addition**: *Moreover, Furthermore, In addition, Not only ... but also, Additionally.*",
                "**Contrast**: *However, On the other hand, Whereas, Nevertheless, Despite the fact that, In spite of.*",
                "**Cause & Effect**: *Consequently, Therefore, As a result of, Owing to, Due to the fact that.*",
                "**Conclusion**: *In conclusion, To sum up, On the whole, Taking everything into consideration.*"
              ]
            }
          ]
        },
        {
          title: "Complex Grammatical Structures",
          body: "Demonstrating advanced grammatical control to secure top band marks.",
          groups: [
            {
              bullets: [
                "**Relative Clauses**: *The community centre, which was opened last year, has become...*",
                "**Conditional Sentences**: *If the school were to invest in new sports equipment, students would benefit greatly.*",
                "**Inversion for Emphasis**: *Not only was the event well-organised, but it also raised substantial funds.*",
                "**Passive Voice**: *Measures have been implemented to ensure safety.*"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 7,
      title: "Listening Comprehension Strategies (AO3 L1-L4)",
      intro: "Paper 2 evaluates the ability to understand spoken English across short conversational recordings, announcements, interviews, and formal lectures.",
      subheadings: [
        {
          title: "Listening Techniques for Exam Success",
          body: "Strategies for pre-listening preparation and real-time audio note-taking.",
          groups: [
            {
              bullets: [
                "**Predicting Answers**: Use the reading time before each audio track to underline keywords and predict the grammatical type of missing information (e.g. noun, date, number, price, adjective).",
                "**Listening for Corrections**: Speakers frequently change their mind (*I originally wanted to travel by train, but actually the coach was much cheaper*); always listen to the complete sentence before writing.",
                "**Spelling and Numbers**: Accurately transcribe spelled names and numbers; British vs American spelling is accepted, but phonetic clarity is essential."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 8,
      title: "Speaking Exam Techniques and Fluency (AO4 S1-S4)",
      intro: "The speaking test assesses conversational fluency, grammatical accuracy, vocabulary range, and pronunciation across an informal warm-up, prep card discussion, and extended thematic conversation.",
      subheadings: [
        {
          title: "Speaking Assessment Framework",
          body: "Techniques for expanding answers and demonstrating confident spoken English.",
          groups: [
            {
              bullets: [
                "**Avoid Single-Word Answers**: Always expand responses using the **PREP formula**: **P**oint $\\to$ **R**eason $\\to$ **E**xample $\\to$ **P**oint restatement.",
                "**Using Fillers Naturally**: Gain thinking time using natural conversational phrases (*That's an interesting question; Well, from my perspective; If I had to choose, I would say...*).",
                "**Pronunciation and Intonation**: Speak clearly with natural sentence stress, pausing at commas and full stops, using rising intonation for questions and falling intonation for statements."
              ]
            }
          ]
        }
      ]
    }
  ]
};
