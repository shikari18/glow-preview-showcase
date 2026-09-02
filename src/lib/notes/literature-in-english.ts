import type { SubjectNotes } from "./types";

export const LITERATURE_IN_ENGLISH: SubjectNotes = {
  id: "literature-in-english",
  name: "Literature in English",
  code: "0475",
  color: "bg-fuchsia-600",
  chapters: [
    {
      number: 1,
      title: "Critical Analysis of Poetry (Paper 1 Section A)",
      intro: "Poetry analysis requires close critical reading of how poets craft form, meter, rhyme, figurative imagery, sound devices, and tone to convey complex emotional and thematic meanings.",
      subheadings: [
        {
          title: "Poetic Form and Structural Elements",
          body: "Examining stanza forms, line breaks, enjambment, and rhythmic structures.",
          groups: [
            {
              subTitle: "Form and Stanza Types",
              bullets: [
                "**Sonnet**: 14-line poem with iambic pentameter; **Petrarchan** (Octave $abbaabba$ + Sestet $cdecde$, with a turn/volta at line 9) vs **Shakespearean** (3 quatrains $abab\\,cdcd\\,efef$ + rhyming couplet $gg$).",
                "**Free Verse**: Poetry without regular meter or rhyme scheme, often mirroring natural speech or emotional fluidity.",
                "**Ballad**: Narrative poem in four-line stanzas (quatrains) with alternating lines of four and three stresses ($abcb$ or $abab$).",
                "**Blank Verse**: Unrhymed iambic pentameter (10 syllables per line with unstressed/stressed beats), common in reflective verse and Shakespearean drama."
              ]
            },
            {
              subTitle: "Structural Techniques",
              bullets: [
                "**Enjambment**: Continuation of a sentence across a line break without terminal punctuation; creates momentum, breathlessness, or continuous motion.",
                "**Caesura**: A deliberate pause or punctuation break in the middle of a poetic line (; or — or .), creating hesitation, tension, or shock.",
                "**Volta**: The pivotal dramatic or philosophical turn in thought, emotion, or argument.",
                "**End-Stopping**: A line of verse that ends with definite punctuation, creating a sense of finality or calm."
              ]
            }
          ]
        },
        {
          title: "Imagery, Sound Devices and Tone",
          body: "Analyzing figurative language and auditory texture in poetic texts.",
          groups: [
            {
              subTitle: "Sound Devices",
              bullets: [
                "**Alliteration**: Repetition of initial consonant sounds (e.g. harsh plosives $p, b, t, d$ conveying violence; soft sibilance $s, sh$ conveying whispering, stealth, or calm).",
                "**Assonance**: Repetition of identical vowel sounds within nearby words (e.g. long melancholic vowels $o, oo, aw$).",
                "**Consonance**: Repetition of internal or final consonant sounds.",
                "**Onomatopoeia**: Words imitating physical sounds (*rustle, clang, screech*)."
              ]
            },
            {
              subTitle: "Tone and Voice",
              bullets: [
                "**Speaker / Persona**: The voice or narrator of the poem (never assume the speaker is identical to the biographical poet).",
                "**Tone Descriptors**: Nostalgic, eulogistic, satirical, bitter, celebratory, melancholic, reflective, urgent, or ambivalent."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Prose Analysis: Character, Themes and Setting (Paper 1 Section B)",
      intro: "Prose fiction analysis explores how novelists and short-story writers construct realistic characters, develop complex thematic motifs, establish immersive settings, and employ distinct narrative perspectives.",
      subheadings: [
        {
          title: "Characterisation and Character Arcs",
          body: "Methods of indirect and direct character development.",
          groups: [
            {
              bullets: [
                "**Direct vs Indirect Characterisation**: Direct statement by narrator vs indirect revelation through speech, physical appearance, internal thoughts, actions, and reactions of others.",
                "**Protagonist vs Antagonist**: The central character driving the narrative vs the opposing character or force.",
                "**Static vs Dynamic Characters**: Flat characters who remain unchanged vs round characters who undergo profound psychological transformation or moral epiphany.",
                "**Foils**: A character whose contrasting traits highlight the specific qualities of another character."
              ]
            }
          ]
        },
        {
          title: "Narrative Voice, Perspective and Setting",
          body: "Examining point of view, temporal structure, and atmospheric symbolism.",
          groups: [
            {
              subTitle: "Narrative Point of View",
              bullets: [
                "**First-Person Narrator ($I / We$)**: Immediacy and psychological intimacy, but potentially unreliable or limited in perspective.",
                "**Third-Person Omniscient**: All-knowing narrator who reveals thoughts, motivations, and background of all characters.",
                "**Third-Person Limited**: Narrates from the focal perspective of a single character.",
                "**Stream of Consciousness**: Continuous, unedited flow of a character's interior mental associations and sensory perceptions."
              ]
            },
            {
              subTitle: "Setting as Symbol",
              bullets: [
                "**Microcosm**: A small setting reflecting broader societal or human conditions.",
                "**Pathetic Fallacy**: Attribution of human emotions to nature/weather (e.g. torrential thunderstorm mirroring violent internal emotional turmoil)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Drama Analysis: Dialogue and Stagecraft (Paper 2 / Paper 3)",
      intro: "Plays are written primarily for live theatrical performance. Drama analysis examines dialogue, stage directions, dramatic irony, soliloquies, spatial staging, pacing, and the escalation of audience tension.",
      subheadings: [
        {
          title: "Dramatic Conventions and Stagecraft",
          body: "Techniques unique to the medium of theatre and performance.",
          groups: [
            {
              bullets: [
                "**Dramatic Irony**: When the audience knows critical information that characters on stage are unaware of, generating intense suspense, tragedy, or comedic anticipation.",
                "**Soliloquy**: A character speaks their innermost private thoughts aloud alone on stage, revealing true motivations, dilemmas, or secret plans to the audience.",
                "**Monologue**: A prolonged continuous speech delivered by one character to other characters on stage.",
                "**Aside**: A brief remark spoken directly to the audience or another character, unheard by other figures on stage.",
                "**Stage Directions**: Explicit instructions by the playwright detailing physical gestures, lighting, sound effects, facial expressions, and spatial positioning (blocking)."
              ]
            }
          ]
        },
        {
          title: "Tragedy, Conflict and Climax",
          body: "Structural elements of classical and modern dramatic works.",
          groups: [
            {
              bullets: [
                "**Hamartia**: The tragic flaw or fatal error in judgment that leads to the downfall of a noble protagonist.",
                "**Hubris**: Excessive pride or arrogance that defies divine order or moral boundaries.",
                "**Catharsis**: The purging or release of emotional tension (pity and fear) experienced by the audience at the play's climax/denouement.",
                "**Exposition $\\to$ Conflict $\\to$ Climax $\\to$ Denouement**: The rising and falling arc of dramatic tension."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Unseen Poetry and Prose Critical Commentary (Paper 4)",
      intro: "Paper 4 evaluates your ability to produce a perceptive, structured critical response to an unseen literary text (poem or prose extract) under exam conditions without prior study.",
      subheadings: [
        {
          title: "Methodical Approach to Unseen Texts",
          body: "A step-by-step reading and planning strategy for unseen literary extracts.",
          groups: [
            {
              subTitle: "The 15-Minute Reading & Annotation Strategy",
              bullets: [
                "**1. First Reading (Gist)**: Read the entire piece straight through to understand the overall story, speaker, mood, and dramatic situation.",
                "**2. Re-read the Question**: Note the guiding bullet points or prompt keywords (e.g. 'How does the writer memorably portray the tension between the two characters?').",
                "**3. Second Reading (Active Annotation)**: Underline 8–10 rich quotes containing vivid imagery, word choice, tonal shifts, or structural features answering the prompt.",
                "**4. Outline 3–4 Paragraphs**: Group annotations into chronological sections or thematic focal points."
              ]
            }
          ]
        },
        {
          title: "Writing the Unseen Critical Commentary",
          body: "Drafting a coherent, closely evidenced literary essay.",
          groups: [
            {
              bullets: [
                "**Introduction**: State the overarching theme, the speaker's core perspective, and how the atmosphere develops across the extract.",
                "**Body Paragraphs**: Analyze the text sequentially (tracking the reader's journey), combining embedded quotes with close word-level analysis.",
                "**Conclusion**: Provide a succinct final evaluation of the text's central emotional impact or memorable thematic message."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Essay Structuring: PEEL / PEEZL and Textual Evidence",
      intro: "Achieving top-tier marks in IGCSE Literature requires structuring analytical essays logically, embedding concise textual quotes seamlessly, and integrating analytical commentary with contextual awareness.",
      subheadings: [
        {
          title: "The PEEZL Paragraph Framework",
          body: "A rigorous analytical paragraph structure ensuring sustained textual focus.",
          groups: [
            {
              bullets: [
                "**P — Point (Topic Sentence)**: State a clear analytical claim addressing the question prompt directly.",
                "**E — Evidence**: Embed a concise, highly relevant quote (1–6 words) smoothly into your own sentence.",
                "**E — Explanation & Effect**: Explain what the quote means and how it supports your claim.",
                "**Z — Zoom (Word-Level Analysis)**: 'Zoom in' on a specific keyword, verb, adjective, or literary device, unpacking its connotations and subtle associations.",
                "**L — Link**: Connect back to the exam question prompt and broader thematic significance."
              ]
            }
          ]
        },
        {
          title: "Embedding Quotations Seamlessly",
          body: "Integrating quotes into grammatical prose rather than dropping isolated lines.",
          groups: [
            {
              bullets: [
                "**Avoid 'Dropped Quotes'**: Never write a quote as a standalone sentence without introductory phrasing.",
                "**Seamless Integration**: *Shakespeare presents Macbeth's mounting paranoia when he describes life as a 'tale told by an idiot', revealing his nihilistic disillusionment with power.*",
                "**Concise Snippets**: Select only the powerful 2–4 word phrases rather than quoting lengthy multi-line blocks."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Literary Devices & Figurative Techniques Glossary",
      intro: "A reference guide to essential literary terminology for high-level textual commentary across poetry, prose, and drama.",
      subheadings: [
        {
          title: "Comprehensive Glossary of Literary Terms",
          body: "Definitions and analytical functions of key rhetorical and literary devices.",
          groups: [
            {
              bullets: [
                "**Allegory**: A narrative with a deeper symbolic moral or political meaning beneath the surface story.",
                "**Allusion**: An implicit reference to another literary work, historical event, or mythological figure.",
                "**Anaphora**: Repetition of a word or phrase at the beginning of successive lines or clauses.",
                "**Antithesis**: Direct juxtaposition of contrasting ideas in balanced phrases (*To be or not to be*).",
                "**Hyperbole**: Deliberate poetic exaggeration for emotional emphasis.",
                "**Juxtaposition**: Placing two contrasting characters, images, or settings side by side to highlight differences.",
                "**Motif**: A recurring thematic image, symbol, or idea throughout a literary work.",
                "**Oxymoron**: Pairing contradictory terms (*bittersweet, deafening silence*).",
                "**Synecdoche**: A figure of speech where a part represents the whole (*all hands on deck*)."
              ]
            }
          ]
        }
      ]
    }
  ]
};
