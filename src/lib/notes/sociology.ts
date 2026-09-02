import type { SubjectNotes } from "./types";

export const SOCIOLOGY: SubjectNotes = {
  id: "sociology",
  name: "Sociology",
  code: "0495",
  color: "bg-fuchsia-600",
  chapters: [
    {
      number: 1,
      title: "Research Methods",
      intro: "Sociology is the scientific study of society, social relationships, and the forces that shape human behaviour. Before sociologists can study society, they must choose both a theoretical perspective that guides their interpretation and appropriate research methods for collecting evidence. Understanding the strengths and limitations of different sociological perspectives and research methods is fundamental to Cambridge IGCSE Sociology — and to evaluating the validity and reliability of any sociological claim.",
      subheadings: [
        {
          title: "Sociological Perspectives",
          body: "A sociological **perspective** (or theoretical framework) is a set of assumptions and ideas about how society works and what forces shape human behaviour. Different perspectives emphasize different factors — social structures, economic inequality, gender power relations, or individual meanings and interactions. Each perspective produces different questions, different types of research, and different conclusions about social phenomena.",
          groups: [
            {
              subTitle: "Structural Perspectives: Functionalism and Marxism",
              bullets: [
                "**Functionalism**: Associated with **Émile Durkheim** and later **Talcott Parsons**; sees society as a system of interconnected parts (institutions — family, education, religion, economy) that work together to maintain social stability and order; each institution performs a **function** that contributes to social equilibrium; values consensus and social solidarity; criticized for ignoring conflict, inequality, and social change.",
                "**Marxism**: Associated with **Karl Marx**; sees society as fundamentally divided by class conflict between the **bourgeoisie** (ruling class, who own the means of production) and the **proletariat** (working class, who sell their labour); argues that social institutions (education, media, religion, law) serve the interests of the ruling class and perpetuate inequality; social change comes through class conflict and revolution; criticized for overemphasizing economic factors and class, ignoring gender and ethnicity.",
                "**Key Marxist Concepts**: **Ideology** — the set of ideas and beliefs that justify and maintain the existing unequal social order ('false consciousness'); **alienation** — workers are separated from their labour, the product of their work, other workers, and their human potential; **capitalism** as a system inherently prone to exploitation and crisis.",
                "**Functionalist Concepts**: **Social consensus** — shared norms and values binding society together; **social control** mechanisms (positive — socialization; negative — punishment and sanctions); **manifest functions** (intended, recognized) vs **latent functions** (unintended, unrecognized) of social institutions; **social solidarity** — the glue binding individuals into communities.",
                "**Neo-Marxism and Critical Theory**: Later Marxist thinkers (Gramsci, the Frankfurt School) modified classical Marxism to better explain how ruling-class dominance is maintained through **hegemony** (cultural and intellectual leadership) rather than simple force — more relevant for understanding modern media, education, and culture."
              ]
            },
            {
              subTitle: "Feminist and Interactionist Perspectives",
              bullets: [
                "**Feminism**: Argues that society is characterized by **patriarchy** — a system in which men hold dominant power over women in social, economic, and political life; gender inequality is not natural but socially constructed; **Liberal feminism** seeks equality through legal reform (equal pay laws, anti-discrimination legislation); **Radical feminism** sees patriarchy as the fundamental form of oppression; **Marxist feminism** links women's oppression to capitalism.",
                "**Key Feminist Concepts**: **Gender** (socially constructed roles and expectations) vs **sex** (biological differences); **gender socialization** — children are taught gender-appropriate behaviour through family, education, media, and peer groups; **the public/private divide** — women historically confined to the private domestic sphere while men dominated public life.",
                "**Symbolic Interactionism**: Associated with **George Herbert Mead** and **Erving Goffman**; focuses on the small-scale, everyday interactions between individuals; argues that meaning is created through social interaction — we understand ourselves and others through symbols and interpreted meanings; **labelling theory** (Becker) applies this to deviance and education.",
                "**Goffman's Dramaturgical Approach**: Social life is like a theatrical performance; we present different versions of ourselves (**impression management**) in 'front stage' public settings and 'backstage' private settings; we manage the information others receive about us to control our social identity.",
                "**Postmodernism**: Questions grand 'metanarratives' (like Marxism or functionalism) that claim to explain all social phenomena; argues that in the postmodern world, identity is fragmented, diverse, and consumer-driven; society is characterized by diversity, choice, and the breakdown of traditional structures — criticized for being too relativistic and ignoring continuing structural inequalities."
              ]
            }
          ]
        },
        {
          title: "Research Methods: Quantitative and Qualitative Approaches",
          body: "Sociologists use a variety of research methods to collect data about social behaviour and attitudes. The choice of method depends on the research question, the resources available, ethical considerations, and the theoretical perspective of the researcher. Methods can be broadly classified as **quantitative** (producing numerical data) or **qualitative** (producing in-depth textual or interpretive data).",
          groups: [
            {
              subTitle: "Quantitative Methods: Surveys, Questionnaires, and Official Statistics",
              bullets: [
                "**Social Surveys**: Systematic collection of standardized data from large samples; allows statistical generalization to wider populations; examples: the UK Census, the British Social Attitudes Survey.",
                "**Questionnaires**: Written lists of questions; can be **self-completed** (postal, online) or **interviewer-administered**; **closed questions** (tick boxes, yes/no, scales) produce quantitative data; **open questions** allow free-text responses (qualitative); advantages: cheap, fast, large samples, no interviewer bias; disadvantages: low response rates, respondents may not understand questions, social desirability bias.",
                "**Structured Interviews**: The researcher asks a fixed set of questions in a set order; more like a verbal questionnaire; allows the researcher to clarify misunderstandings but is more time-consuming than self-completion questionnaires; produces quantitative data.",
                "**Official Statistics**: Data collected by governments (crime statistics, census data, unemployment figures, educational attainment data); advantages: large scale, free to access, longitudinal data available; disadvantages: may reflect political agendas, only measure what can be counted, dark figures (unreported crime), constructed by bureaucratic definitions.",
                "**Content Analysis**: Systematically counting and categorizing the content of media texts (TV shows, newspapers) to identify patterns (e.g. frequency of female characters in primary roles); produces quantitative data about media representation but requires careful, consistent coding."
              ]
            },
            {
              subTitle: "Qualitative Methods: Interviews, Observation, and Case Studies",
              bullets: [
                "**Unstructured (In-depth) Interviews**: Open-ended conversations following broad themes rather than fixed questions; allows respondents to raise their own concerns and express meaning in their own words; produces rich, detailed data; high validity; but time-consuming, small samples, interviewer effect (respondents may give socially desirable answers), difficult to analyze comparatively.",
                "**Semi-structured Interviews**: A middle ground — a framework of topics/questions but flexibility to probe further; used in most sociological interview research.",
                "**Participant Observation**: The researcher joins the group being studied and participates in its activities; **covert** (group does not know they are being studied — raises ethical issues) vs **overt** (group knows); high validity as behaviour is natural; famous examples: **Whyte's 'Street Corner Society'**, **James Patrick's Glasgow Gang study**; but risks: researcher effects (affecting the group), 'going native' (losing objectivity), ethical issues, and inability to generalize.",
                "**Non-participant Observation**: Researcher observes without participating; less disruptive but still affects subjects (Hawthorne effect); produces naturalistic data.",
                "**Case Studies**: In-depth investigation of a single case (one school, one community, one organization); allows very detailed understanding; but findings may not be generalizable; often used to generate hypotheses for larger-scale research."
              ]
            }
          ]
        },
        {
          title: "Research Design, Ethics, and Evaluation",
          body: "Good sociological research requires careful planning of the entire research process — from formulating a question to presenting findings. Ethical considerations are central: sociologists have obligations to their research participants, to their discipline, and to society. Critical evaluation of research quality — assessing **validity**, **reliability**, and **representativeness** — is a key skill for Cambridge IGCSE.",
          groups: [
            {
              subTitle: "Key Concepts in Research Evaluation",
              bullets: [
                "**Validity**: Whether research accurately measures what it claims to measure; whether data truly reflects the social reality being studied; qualitative methods tend to have higher validity as they capture depth and meaning; surveys may have low validity if respondents misunderstand questions.",
                "**Reliability**: Whether the same research carried out by different researchers, or at different times, would produce the same results; quantitative methods tend to be more reliable as they are standardized; qualitative research is less reliable as the relationship between researcher and respondents is unique.",
                "**Representativeness**: Whether the sample reflects the wider population from which it is drawn; a **representative sample** allows generalization from findings; random sampling maximizes representativeness but is difficult to achieve; convenience samples are common but may be biased.",
                "**Operationalisation**: Defining abstract concepts in measurable terms (e.g. 'poverty' might be operationalised as 'income below 60% of median national income'); different operationalisations produce different data and make comparisons difficult.",
                "**Triangulation**: Using multiple methods or data sources to cross-check findings; increases confidence in conclusions; e.g. combining survey data with interviews and observation to study school experiences."
              ]
            },
            {
              subTitle: "Ethical Principles in Sociological Research",
              bullets: [
                "**Informed Consent**: Participants should be given full information about the research and freely agree to participate; problems arise with covert observation (no consent possible) and research with children or vulnerable groups.",
                "**Confidentiality and Anonymity**: Protecting the identity of respondents and keeping their information private; particularly important in sensitive research (crime, domestic abuse, mental health); data protection legislation (GDPR) imposes legal requirements.",
                "**Avoiding Harm**: Research should not harm participants physically, psychologically, socially, or economically; researchers must consider potential harms including stigmatization of the groups studied.",
                "**Deception**: Some research requires deception (covert observation); the British Sociological Association guidelines allow deception only when the research could not be done otherwise and the benefits outweigh the harms.",
                "**The Research Process**: 1. **Aim/hypothesis** → 2. **Literature review** → 3. **Choice of method** → 4. **Pilot study** (small-scale test) → 5. **Data collection** → 6. **Analysis** → 7. **Conclusions** → 8. **Evaluation** — candidates should know and explain each stage."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Identity: Self and Society",
      intro: "Sociologists argue that our identities — our sense of who we are — are not simply innate or 'natural' but are largely shaped by society through processes of **socialisation**. We are born into social contexts that shape our language, values, beliefs, and behaviour through interactions with **agents of socialisation** (family, schools, peer groups, media). Understanding identity requires examining how gender, class, ethnicity, religion, and culture shape who we become.",
      subheadings: [
        {
          title: "Socialisation: Primary and Secondary",
          body: "**Socialisation** is the process by which individuals learn the norms, values, beliefs, and behaviours appropriate to their society and social groups. It is the mechanism through which culture is transmitted across generations and through which individuals develop their social identity. Sociologists distinguish between **primary socialisation** (in the family, in childhood) and **secondary socialisation** (through other institutions, throughout life).",
          groups: [
            {
              subTitle: "Primary Socialisation: The Role of the Family",
              bullets: [
                "**Primary socialisation** takes place mainly in the **family** during infancy and early childhood; it is the most fundamental and powerful form of socialisation as the child is most impressionable and dependent at this stage.",
                "**Learning Norms and Values**: Children learn basic **norms** (expected patterns of behaviour — saying 'please', eating with cutlery) and **values** (abstract beliefs about what is important — honesty, hard work, respect for elders) through interaction with parents and siblings.",
                "**Gender Socialisation in the Family**: Parents treat boys and girls differently from birth — different clothes, different toys, different expectations about behaviour; girls may be encouraged to be caring and expressive; boys may be encouraged to be tough and unemotional; these messages begin the construction of gender identity.",
                "**Language Acquisition**: Basil Bernstein's research identified differences in linguistic codes — **restricted code** (simple, context-dependent language typical of working-class families) vs **elaborated code** (more complex, context-free language typical of middle-class families); these differences affect educational performance.",
                "**Internalization**: Through socialization, social norms and values are **internalized** — they become part of the individual's own desires and motivations, not merely external constraints; this is what makes social order possible without constant policing."
              ]
            },
            {
              subTitle: "Secondary Socialisation: Agents and Their Influence",
              bullets: [
                "**Education**: Schools teach not only academic knowledge but the **hidden curriculum** — punctuality, conformity, respect for authority, competition; teachers' expectations and labelling affect students' self-concept and performance; children learn social roles and skills for adult public life.",
                "**Peer Groups**: Groups of age-mates become increasingly influential in adolescence; provide identity, belonging, and status; can reinforce or challenge family socialization; peer pressure is a powerful mechanism of social control; subcultures develop with their own norms and values that may conflict with mainstream culture.",
                "**Media**: Television, social media, films, advertising, video games, music — all carry powerful messages about gender, race, class, beauty, success, and appropriate behaviour; **Gerbner's cultivation theory** argues that heavy media consumption makes people's perceptions of social reality conform to media portrayals; particularly concerned about narrow representations of gender and ethnicity.",
                "**Religion**: Transmits moral values and community identity; historically a powerful agent of socialization (church attendance, religious education); declining influence in secularising societies; but remains powerful for many minority ethnic communities.",
                "**The Workplace**: Adult socialization into occupational culture, professional norms, workplace hierarchy, and disciplinary procedures; Goffman's study of asylums ('total institutions') showed how complete institutional environments radically reshape identity."
              ]
            }
          ]
        },
        {
          title: "Social Control, Norms, and Values",
          body: "**Social control** refers to all the mechanisms — from informal rewards and punishments to formal legal systems — through which societies regulate individual behaviour and ensure conformity to social norms. Without social control, sociologists argue, society would descend into chaos (Durkheim's concept of **anomie** — normlessness that leads to social breakdown). Understanding how social control operates is fundamental to understanding social order and deviance.",
          groups: [
            {
              subTitle: "Formal and Informal Social Control",
              bullets: [
                "**Informal Social Control**: Operates through interpersonal relationships and social expectations; mechanisms include approval (praise, smiles, acceptance) and disapproval (gossip, ridicule, ostracism, disapproving looks); most powerful because it is internalized through socialization rather than experienced as external constraint.",
                "**Formal Social Control**: Operated by official institutions — **the law** (police, courts, prisons), **education** (school rules, expulsion), **medicine** (psychiatry labelling behaviour as 'mental illness'), **religion** (excommunication, religious courts); involves explicit written rules and official sanctions.",
                "**Norms**: Specific rules governing behaviour in particular situations (queuing, shaking hands, not talking with your mouth full); **norms vary across cultures and over time** — something normative in one culture may be taboo in another; this cultural variation is used to argue that norms are socially constructed rather than natural.",
                "**Values**: More abstract principles underlying norms — values like 'respect for human life', 'freedom', 'equality', 'hard work'; provide the moral framework from which specific norms derive.",
                "**Mores and Taboos**: **Mores** are norms with strong moral force (honesty, care for the vulnerable); violating them produces strong negative reactions; **taboos** are absolute prohibitions (incest, eating human flesh in Western cultures)."
              ]
            },
            {
              subTitle: "Gender and Cultural Identity",
              bullets: [
                "**Gender as Social Construction**: Sociologists argue that while **sex** is biological (male, female), **gender** (masculine, feminine, and other identities) is socially constructed — created through socialization, cultural practices, and social institutions; cross-cultural and historical variation in gender roles supports this view.",
                "**Femininity and Masculinity**: Traditional femininity associated with nurturing, passivity, domesticity, emotional expressiveness; traditional masculinity with strength, independence, risk-taking, emotional restraint; **R.W. Connell's** concept of **hegemonic masculinity** — the culturally dominant form of masculinity that sustains male power — is useful for explaining why most men do not conform to a single ideal but many benefit from its overall dominance.",
                "**Changing Gender Identities**: Feminist movements, legal changes, economic transformations (women's mass entry into the workforce), and cultural shifts have significantly challenged traditional gender roles in many countries; attitudes towards sexuality and gender expression are more diverse and accepting in many (though not all) societies.",
                "**Cultural Identity**: Our sense of belonging to a particular cultural group (national, ethnic, religious); provides a sense of meaning, community, and continuity; can be a source of pride and strength or a site of conflict and discrimination; can be fixed (primordialism) or fluid and negotiated (instrumentalism/constructionism).",
                "**Hybridity and Multicultural Identity**: In increasingly diverse societies, many individuals, particularly from minority ethnic backgrounds, navigate multiple cultural identities — maintaining aspects of their heritage culture while participating in the majority culture; Homi Bhabha's concept of **hybridity** describes the creation of new, mixed identities from the meeting of cultures."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Social Stratification and Inequality",
      intro: "**Social stratification** refers to the hierarchical ranking of groups within society based on social characteristics such as wealth, occupation, status, and power. While all societies have some form of stratification, its form varies enormously — from the rigid, hereditary caste system of traditional India to the supposedly open, merit-based class system of modern capitalist societies. Understanding stratification requires examining both the structures of inequality and the ideologies that justify them.",
      subheadings: [
        {
          title: "Class, Caste, and Social Mobility",
          body: "Social class is the main form of stratification in modern industrialised societies. Unlike caste (based on birth and hereditary), class is theoretically based on economic position — income, wealth, occupation, and education. The degree to which individuals can move between classes (**social mobility**) is a key measure of whether a society is truly open and meritocratic.",
          groups: [
            {
              subTitle: "Defining and Measuring Social Class",
              bullets: [
                "**Marxist Definition of Class**: Based on relationship to the means of production — **bourgeoisie** (own capital) vs **proletariat** (must sell labour); class is an objective economic position; class conflict is the engine of historical change.",
                "**Weberian Definition of Class**: **Max Weber** distinguished between **class** (economic position — life chances on the market), **status** (social prestige and honour), and **party** (power through political organization); a multi-dimensional approach that allows for more complexity than the simple Marxist two-class model.",
                "**Occupational Class Scales**: Sociologists use occupational classifications to measure class — the UK's **NS-SEC** (National Statistics Socio-Economic Classification) divides society into 8 classes based on employment relations and conditions; professionals and managers at the top, routine workers at the bottom.",
                "**Caste System**: A **closed** stratification system based on birth into a hereditary group (caste); traditionally associated with Hinduism in India (Brahmins, Kshatriyas, Vaishyas, Shudras, and the 'untouchable' Dalits); mobility between castes was traditionally impossible; legally abolished in India (1950) but still socially influential; an **ascribed** status.",
                "**Slavery**: The most extreme form of stratification — people owned as property; both an ascribed and closed system; legally abolished globally but forms of modern slavery (forced labour, trafficking) persist."
              ]
            },
            {
              subTitle: "Social Mobility, Meritocracy, and Poverty",
              bullets: [
                "**Social Mobility**: Movement of individuals or groups between different positions in the social hierarchy; **upward mobility** (moving to a higher class) vs **downward mobility** (moving to a lower class); **inter-generational mobility** (comparing class position with parents) vs **intra-generational mobility** (changes within a single lifetime).",
                "**Meritocracy**: The idea that social position is determined by individual talent, effort, and achievement (merit) rather than inherited privilege; the official ideology of modern educational systems; functionalists (Davis and Moore) argue that inequality is meritocratic and functional — high rewards attract talented people to important roles.",
                "**Critique of Meritocracy**: Critics argue that meritocracy is a myth — social background, inherited wealth, and cultural capital (Bourdieu) profoundly affect educational attainment and life chances; the playing field is not level; the ideology of meritocracy can be more harmful than acknowledged inequality because it blames individuals for structural failures.",
                "**Absolute Poverty**: A condition in which basic survival needs (food, water, shelter, clothing) cannot be met; measured by an absolute minimum standard of subsistence.",
                "**Relative Poverty**: Being poor relative to the average standard of living in a society — lacking resources that most people take for granted; typically defined as income below 60% of median income; recognizes that poverty is not just about survival but about social exclusion and dignity."
              ]
            }
          ]
        },
        {
          title: "Gender Inequality and Racial Inequality",
          body: "Social stratification is not only based on class. **Gender inequality** (systematic disadvantage based on gender) and **racial inequality** (systematic disadvantage based on race or ethnicity) are pervasive features of most societies. Sociologists examine the structures, ideologies, and mechanisms that reproduce these inequalities and assess the extent to which they have changed in recent decades.",
          groups: [
            {
              subTitle: "Gender Inequality in Society",
              bullets: [
                "**Patriarchy**: A social system in which men hold greater power, authority, and privilege than women; operates in the economy (gender pay gap, occupational segregation), in the family (unequal division of domestic labour), in politics (underrepresentation of women), in culture (objectification of women in media), and in interpersonal relationships (domestic violence).",
                "**The Gender Pay Gap**: Women on average earn less than men in virtually every country; causes include occupational segregation (women concentrated in lower-paid sectors like care work and retail), the 'motherhood penalty' (women's earnings fall after having children while men's rise), discrimination, and the undervaluing of 'feminized' occupations.",
                "**The Glass Ceiling**: The invisible barrier that prevents women from reaching the highest positions in organizations and politics; despite legal equality, women remain significantly underrepresented at senior management, boardroom, and political leadership levels in most countries.",
                "**Domestic Labour and the 'Double Shift'**: Sociologists (Oakley, Hochschild) documented that even when women work full-time in paid employment, they continue to do the majority of unpaid domestic labour (cooking, cleaning, childcare) — the **'double shift'** or **'second shift'**.",
                "**Intersectionality**: Kimberle Crenshaw's concept that gender inequality is not experienced the same way by all women — race, class, disability, sexuality, and age intersect to create different, compounded experiences of disadvantage; a Black working-class woman faces different inequalities from a white middle-class woman."
              ]
            },
            {
              subTitle: "Racial and Ethnic Inequality",
              bullets: [
                "**Race and Ethnicity**: **Race** refers to the social categorization of people based on perceived physical differences (skin colour, facial features); sociologists treat race as a **social construct** — biological 'races' do not exist; **ethnicity** refers to shared cultural heritage, language, religion, and ancestry — a matter of identity and belonging.",
                "**Racism**: Prejudice (negative attitudes) or discrimination (unequal treatment) based on race or ethnicity; can be **individual** (personal prejudice) or **institutional** (systematic disadvantage built into the rules and practices of institutions).",
                "**Institutional Racism**: The **Macpherson Report (1999)** into the Metropolitan Police's investigation of the murder of Black teenager Stephen Lawrence defined institutional racism as 'the collective failure of an organisation to provide an appropriate and professional service to people because of their colour, culture, or ethnic origin'; can be unwitting as well as intentional.",
                "**Ethnic Minority Achievement in Education**: Research shows significant variation in educational attainment between ethnic groups; Chinese and Indian students in the UK on average outperform white British students; Black Caribbean and Pakistani students tend to underperform; explanations include cultural factors, socioeconomic factors, school racism, and teacher expectations.",
                "**The Welfare State and Inequality Reduction**: The **welfare state** (social security, NHS, state education, council housing) was designed to reduce poverty and inequality; **Beveridge Report (1942)** identified the 'five giants' (Want, Disease, Ignorance, Squalor, Idleness) that the welfare state would attack; debate continues about whether universal benefits or means-tested benefits are more effective and fair."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Family",
      intro: "The family is a fundamental social institution found in all known societies, though its form, functions, and internal relationships vary enormously across cultures and over time. Sociologists study the different types of family structure, the functions the family performs for its members and for society, and how family patterns are changing in response to broader social, economic, and cultural changes.",
      subheadings: [
        {
          title: "Types of Family and Family Functions",
          body: "The concept of 'the family' refers to a diverse range of household structures and relationships. Sociologists must avoid the mistake of treating any single family form as 'natural' or universal — family diversity is a global reality and has increased in recent decades in many Western societies.",
          groups: [
            {
              subTitle: "Types of Family Structure",
              bullets: [
                "**Nuclear Family**: Parents (traditionally one man and one woman, though same-sex parent families increasingly recognized) and their dependent children living in the same household; the dominant family form in industrialised societies; **Parsons** argued the nuclear family is functionally 'fit' for industrial capitalism.",
                "**Extended Family**: Two or more generations of family members (grandparents, parents, children, and possibly aunts, uncles, and cousins) living together or in close proximity; common in less developed societies and among many minority ethnic communities in Western countries; provides mutual support and childcare.",
                "**Single-Parent Family (Lone-Parent Family)**: One parent (usually the mother) raising children alone; has increased significantly in developed countries — in the UK, approximately 25% of families with children are single-parent; often face economic hardship.",
                "**Reconstituted/Blended/Step-Family**: A family formed when divorced or separated parents repartner; may involve step-parents, step-children, and step-siblings; increasingly common as divorce rates remain high; associated with complex family dynamics.",
                "**Same-sex Parent Family**: Families with two parents of the same gender; legalization of same-sex marriage in many countries has increased visibility and recognition; research generally finds children's outcomes similar to those in heterosexual two-parent families when socioeconomic factors are controlled."
              ]
            },
            {
              subTitle: "Functions of the Family",
              bullets: [
                "**Functionalist View (Murdock)**: **George Murdock** (1949) studied 250 societies and claimed the nuclear family is universal, performing four essential functions: **sexual** (legitimate sexual relationship for adults), **reproductive** (producing the next generation), **economic** (provision of food and shelter), **educational** (primary socialization of children).",
                "**Parsons' 'Functional Fit' Theory**: The nuclear family is 'fit' for modern industrial society — **geographical mobility** (nuclear families can move to where jobs are more easily than extended families) and **social mobility** (the unit of competition is the individual, not the extended family).",
                "**Marxist View of the Family**: The family serves capitalism by **reproducing the labour force** (feeding, clothing, and restoring workers at no cost to capitalists); **socialising children into accepting inequality**; transmitting class inequality through inheritance; and providing emotional support that compensates for alienating work.",
                "**Feminist View of the Family**: The family is a key site of **women's oppression** — unpaid domestic labour, childcare, and emotional work fall disproportionately on women; domestic violence is common; the ideology of the family ('women's place is in the home') legitimizes gender inequality.",
                "**Emotional Functions**: Increasingly in modern society the family is valued primarily for emotional support, companionship, love, and the expression of personal identity — the **'haven in a heartless world'** (Lasch); the standard against which families are judged is emotional satisfaction rather than economic survival."
              ]
            }
          ]
        },
        {
          title: "Changing Family Patterns",
          body: "Family patterns in many countries have changed dramatically over the past 50 years. Rising **divorce rates**, increasing **cohabitation**, falling marriage rates, declining household size, and greater recognition of diverse family forms are all features of this transformation. Sociologists debate whether these changes represent liberation from oppressive traditional forms or the concerning breakdown of social bonds.",
          groups: [
            {
              subTitle: "Divorce, Cohabitation, and Changing Partnerships",
              bullets: [
                "**Rising Divorce Rates**: In many developed countries divorce rates have risen dramatically since the 1960s; causes include: legal changes making divorce easier and cheaper (UK Divorce Reform Act 1969); declining stigma around divorce; women's financial independence (no longer trapped in unhappy marriages by economic dependency); rising expectations of marriage (emotional fulfillment rather than economic survival); secularisation (less religious constraint on divorce.",
                "**Consequences of Divorce**: Economic hardship (especially for women and children); emotional impacts on children (though research suggests conflict within marriage may be more damaging than divorce itself); growth of lone-parent and reconstituted families.",
                "**Cohabitation**: Living together as a couple without being married; has increased massively in most developed countries; for many couples it is a 'trial marriage'; in Scandinavia, cohabitation is as socially accepted and legally protected as marriage; in many developing countries, marriage remains nearly universal.",
                "**Declining Marriage Rates**: People are marrying later or not at all; in the UK, the average age of first marriage has risen from early 20s to late 20s/early 30s; fewer people are marrying overall.",
                "**Same-Sex Marriage**: Legalized in numerous countries (Netherlands first in 2001, UK 2014, USA 2015); represents recognition of diverse family forms and changing attitudes to sexuality; demonstrates how 'the family' is a socially and legally defined institution, not a natural given."
              ]
            },
            {
              subTitle: "Gender Roles in the Family and Domestic Labour",
              bullets: [
                "**Traditional Gender Roles**: The dominant model until the mid-20th century was the **breadwinner-homemaker** family — man as earner, woman as housewife and childcarer; legitimized by ideology and economic necessity (women excluded from many occupations).",
                "**Changing Roles**: Women's mass entry into paid employment from the 1960s onwards challenged the breadwinner model; more dual-earner couples; more shared childcare; 'new man' ideology emphasizing male domestic participation.",
                "**Persistent Inequality**: Despite change, research (Oakley, Hochschild, British Social Attitudes Survey) consistently shows women still do the majority of domestic labour and childcare even in dual-earner households — the **'stalled revolution'** (Hochschild); emotional work (managing family feelings) also falls disproportionately on women.",
                "**'Symmetrical Family' Thesis (Young and Willmott)**: Claimed the family was becoming increasingly symmetrical (equal) as conjugal roles became more joint rather than segregated; criticized for being too optimistic — their evidence showed only minimal sharing of domestic tasks.",
                "**Childhood as Social Construction**: Philippe Ariès argued that childhood as we know it — a protected, innocent, developmental phase — is a modern Western invention; in pre-modern Europe children were mini-adults from age 7; **current concerns** about the changing nature of childhood — the 'disappearance of childhood' through premature exposure to adult culture via the internet, or the 'over-protection' of children in a risk-averse society."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Education",
      intro: "Education is both a social institution (performing functions for society as a whole) and an arena of social inequality (where class, gender, and ethnicity influence outcomes). Sociologists examine the **formal** curriculum (what is officially taught), the **hidden curriculum** (unofficial lessons about social norms), the factors that explain differential achievement, and the role of education in social reproduction or social mobility.",
      subheadings: [
        {
          title: "Functions of Education and the Hidden Curriculum",
          body: "**Functionalists** see education as performing essential positive functions for society — transmitting culture, socialising the young, selecting individuals for appropriate roles, and promoting social cohesion. **Marxists** and **feminists** see education as reproducing existing inequalities by transmitting the values and ideology of the dominant class or gender. The **hidden curriculum** refers to the unofficial lessons taught through the organisation and routine of schooling.",
          groups: [
            {
              subTitle: "Manifest and Latent Functions of Education",
              bullets: [
                "**Transmission of Culture**: Schools transmit society's cultural heritage — shared history, national language, customs, values — creating social cohesion and a sense of shared national identity; **Durkheim** stressed the role of education in creating social solidarity.",
                "**Secondary Socialisation**: Schools are the primary agent of secondary socialisation — children learn to operate within formal bureaucratic hierarchies, follow rules set by non-family authority figures, and cooperate with peers from diverse backgrounds.",
                "**Allocation/Selection Function**: Education systems select and allocate individuals to different social positions — academic qualifications signal merit and suitability for different occupational roles; this function requires schools to be fair and rigorous.",
                "**Economic Function**: Equipping the workforce with the knowledge, skills, and qualifications demanded by the economy; **human capital theory** (economists) argues that investment in education increases productivity and earnings.",
                "**Latent Functions (Merton)**: Providing childcare enabling parents to work; creating social networks (schools as meeting places); reinforcing social class differences; introducing children to bureaucratic organizations."
              ]
            },
            {
              subTitle: "The Hidden Curriculum and Reproduction of Inequality",
              bullets: [
                "**Hidden Curriculum**: The values, norms, and dispositions that schools teach implicitly through their organisation, routines, and relationships — not the formal curriculum but the 'lessons between the lines': respect for authority, punctuality, competitive achievement, passive reception of knowledge.",
                "**Bowles and Gintis (Marxist)**: In 'Schooling in Capitalist America' (1976) argued that there is a **correspondence** between the social relations of schooling and the social relations of production — school hierarchies, bell-following, marks and grades correspond to workplace hierarchies, time-discipline, and wages; schools produce compliant, alienated workers.",
                "**Bourdieu's Cultural Capital**: The middle class possess **cultural capital** (the language, values, tastes, and dispositions valued by schools and employers) that working-class children lack — this is not natural ability but inherited cultural advantage; schools reward those with the 'right' cultural capital, reproducing class inequality under the guise of meritocracy.",
                "**Symbolic Violence**: Bourdieu's concept that the education system imposes the culture of the dominant class as legitimate, while implicitly dismissing the cultures of lower classes; working-class children learn to see their own failure as natural and deserved.",
                "**Feminist Analysis**: The hidden curriculum has traditionally reinforced gender inequality — different subjects steered for boys and girls, male authority figures dominant, curriculum centred on male experiences and achievements; feminist campaigns have significantly changed formal curricula but hidden messages persist."
              ]
            }
          ]
        },
        {
          title: "Differential Educational Achievement: Class, Gender, and Ethnicity",
          body: "Educational achievement — measured by exam results and qualifications — varies significantly by **social class**, **gender**, and **ethnicity**. These differences have been extensively researched by sociologists who seek to explain both the external (structural) factors and internal (school-based) factors that produce unequal outcomes.",
          groups: [
            {
              subTitle: "Social Class and Educational Achievement",
              bullets: [
                "**Class and Achievement**: Working-class children on average achieve lower qualifications than middle-class children; the gap begins before school starts and widens throughout education; it exists in all educational systems, though its magnitude varies.",
                "**Material Deprivation**: Working-class students may lack adequate housing (overcrowded, no quiet study space), adequate nutrition, a computer and internet access, money for school trips and materials, and parental ability to pay for tutoring — **material factors** directly constrain educational performance.",
                "**Cultural Deprivation Theory**: Middle-class families have higher aspirations, value education more, possess elaborated linguistic codes (Bernstein), and provide more stimulating home environments; **Paul Willis's 'Learning to Labour'** (1977) studied working-class boys who actively rejected school culture, developing an anti-school subculture as a form of masculine resistance.",
                "**Streaming and Setting**: Grouping students by ability; critics argue it becomes self-fulfilling — students in lower sets receive less challenging work, have lower expectations, and achieve less; disproportionately affects working-class and minority ethnic students; **Lacey's** research showed streaming polarized attitudes toward school.",
                "**Teacher Expectations and Labelling**: Teachers may form expectations based on class, gender, or ethnicity that shape how they interact with pupils; **self-fulfilling prophecy** (Rosenthal and Jacobson's 'Pygmalion in the Classroom') — pupils achieve in accordance with teacher expectations; working-class and Black Caribbean students are more likely to be labelled negatively."
              ]
            },
            {
              subTitle: "Gender and Ethnicity in Education",
              bullets: [
                "**Gender Gap Reversal**: Girls now outperform boys in most subjects at GCSE and A-level in the UK and in many developed countries; this reversal of historical patterns is one of the most significant changes in education; girls are more likely to complete university degrees.",
                "**Explanations for Girls' Achievement**: Feminist reforms to curriculum (more female-centred texts and examples), anti-sexist teaching, rising female aspirations linked to women's expanded labour market opportunities, changes in peer culture making academic achievement acceptable for girls.",
                "**Boys' Underachievement**: Blamed variously on a 'crisis of masculinity' (traditional male occupations declining), 'laddish' anti-school culture, shortage of male primary school teachers as role models, and reading being seen as 'feminine'.",
                "**Ethnicity and Achievement**: Significant variation between ethnic groups — in the UK, Chinese and Indian students outperform all other groups; Pakistani and Black Caribbean students underperform relative to white British average; explanations include socioeconomic factors, cultural factors (parental attitudes to education), institutional racism and teacher labelling.",
                "**Private vs State Education**: Private (independent) schools educate approximately 7% of children in the UK but produce a disproportionate share of elite university graduates (especially Oxford and Cambridge) and subsequent elite professionals; critics argue this perpetuates class privilege rather than rewarding merit."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Crime, Deviance, and Social Control",
      intro: "**Crime** refers to acts that violate the criminal law; **deviance** refers to behaviour that violates social norms — these concepts overlap but are not identical (some deviant acts are not crimes; some crimes may not be seen as deviant by all). Sociologists examine why crime and deviance exist, who commits crime and why, how society responds through formal and informal control mechanisms, and what the criminal justice system reveals about power, inequality, and social values.",
      subheadings: [
        {
          title: "Defining Crime and Deviance: Theoretical Perspectives",
          body: "Sociologists emphasize that crime and deviance are not fixed, objective categories but are **socially constructed** — what counts as crime or deviance changes across time, place, and culture. Understanding this social construction requires examining how norms are created, who has the power to define them, and who is most likely to be labelled as criminal or deviant.",
          groups: [
            {
              subTitle: "Social Construction of Crime and Deviance",
              bullets: [
                "**Social Construction**: There are no universally deviant acts — behaviour is only deviant in relation to specific norms in specific social contexts; homosexuality was classified as a mental illness until 1973 and criminalized in many countries until recently; cannabis use is a serious crime in some countries and legal in others.",
                "**Relative Deviance**: Deviance is relative to **time** (attitudes change — attitudes to smoking, mental illness), **place** (gambling legal in Las Vegas, illegal in many countries), **culture** (eating beef taboo in Hinduism but normative elsewhere), and **social context** (killing is normally deviant but celebrated in warfare).",
                "**Durkheim's Functionalist View of Crime**: Crime is **normal** and **functional** in every society — it clarifies moral boundaries, creates social solidarity (collective outrage at crime strengthens social norms), and is necessary for social change (today's criminal may be tomorrow's saint — Jesus, Mandela); but too much crime (anomie) is dysfunctional.",
                "**Strain Theory (Merton)**: People commit crime when there is a gap between culturally approved goals (especially financial success in American society) and the legitimate means of achieving those goals; **conformist** (accepts both goals and means), **innovator** (accepts goal, rejects legitimate means — typical criminal), **ritualist** (abandons goal, follows rules mechanically), **retreatist** (abandons both — homeless, addicts), **rebel** (replaces both with new goals and means — revolutionary).",
                "**Subcultural Theories**: **Cohen** — working-class boys who fail in school create an **inverted status hierarchy** where criminal or deviant behaviour is valued; **Cloward and Ohlin** — different types of criminal subcultures emerge depending on what illegitimate opportunity structures are available (criminal, conflict, retreatist)."
              ]
            },
            {
              subTitle: "Labelling Theory and its Applications",
              bullets: [
                "**Labelling Theory (Becker)**: Whether an act is deviant depends not on the act itself but on whether others successfully apply a deviant label to it; **Becker** studied marijuana users — argued that what matters is not the act but the social reaction; the **moral entrepreneur** creates rules whose infraction is then treated as deviant.",
                "**Master Status and the Deviant Career**: Once labelled as criminal or deviant, this becomes the person's **master status** — overwhelming all other social identities; the labelled person may then reorganize their identity around the deviant label and associate with similarly labelled people — a **deviant career**.",
                "**Primary and Secondary Deviance (Lemert)**: **Primary deviance** is the original deviant act; **secondary deviance** is the deviance that results from the social reaction to the original act and the acceptance of the deviant label — thus labelling can cause more deviance than it controls.",
                "**Self-Fulfilling Prophecy**: If labelled as a criminal by teachers, police, or courts, a person may come to see themselves as criminal and act accordingly — the label creates the very behaviour it sought to describe and control.",
                "**Critique of Labelling Theory**: Does not explain why initial deviance occurs; seems to suggest that if we just stopped labelling people as deviant, deviance would disappear — ignores the real victims of crime; some deviants successfully resist labels; powerful groups can also avoid having negative labels applied (white-collar crime)."
              ]
            }
          ]
        },
        {
          title: "Patterns of Crime: Gender, Class, Ethnicity, and White-Collar Crime",
          body: "Official crime statistics show clear patterns in who commits crime — men, young people, and those from lower socioeconomic backgrounds are disproportionately represented. However, sociologists must critically evaluate these statistics, as they reflect not only actual behaviour but also the activities of police, courts, and other agencies that selectively detect, report, and record crime.",
          groups: [
            {
              subTitle: "Gender, Age, and Class Patterns in Crime",
              bullets: [
                "**Gender and Crime**: Men commit approximately 80% of recorded crime in the UK; crime is heavily male; explanations include: gender socialisation (men taught to be aggressive, risk-taking, competitive); the public/private divide (men are more present in public spaces where crime is visible); chivalry thesis — the criminal justice system is more lenient toward women; growing female crime in some areas as gender roles change.",
                "**Age and Crime**: Crime peaks in the mid-teenage years and early 20s; the **age-crime curve** is one of the most robust findings in criminology; young people have more time, less to lose, more peer pressure, less developed impulse control; most 'age out' of crime by their late 20s.",
                "**Class and Crime**: Working-class crime is disproportionately represented in official statistics; but **white-collar crime** committed by the middle and upper classes is massively underrepresented; the criminal justice system focuses on 'street crime' and 'volume crime' committed by the poor.",
                "**Dark Figure of Crime**: The gap between crimes actually committed and crimes recorded in official statistics; crimes not reported (victim unwilling to report — domestic violence, sexual assault, minor theft) or not recorded (police exercise discretion, reclassify offences) mean official statistics significantly undercount crime.",
                "**Victim Surveys**: Alternative to official statistics; ask people whether they have been victims of crime in the past year, regardless of whether they reported it; the UK **Crime Survey for England and Wales (CSEW)** shows the dark figure is substantial — some crimes are reported to the survey at 5–10 times the rate of official police records."
              ]
            },
            {
              subTitle: "White-Collar Crime, Corporate Crime, and Criminal Justice",
              bullets: [
                "**White-Collar Crime (Sutherland)**: Edwin Sutherland (1949) coined the term to describe crime committed by people of high social status in the course of their occupation — fraud, embezzlement, insider trading, tax evasion, bribery; argued criminology had been too focused on street crime committed by the poor while ignoring far more economically damaging crimes of the wealthy.",
                "**Corporate Crime**: Illegal acts committed by corporations — health and safety violations causing worker deaths, environmental pollution, mis-selling of financial products, price-fixing; causes enormous economic and physical harm but is rarely prosecuted as seriously as street crime.",
                "**Ethnicity and Crime**: Black people in the UK are overrepresented in the criminal justice system — more likely to be stopped and searched, arrested, prosecuted, convicted, and imprisoned; disputed causes include: police discrimination and racial profiling, socioeconomic disadvantage concentrated in certain communities, and possibly some real differences in exposure to criminogenic conditions.",
                "**Functions of Imprisonment**: **Deterrence** (making potential criminals fear punishment), **incapacitation** (removing dangerous people from society), **rehabilitation** (reforming offenders to prevent reoffending), **punishment** (retributive justice — 'just deserts'); these aims frequently conflict with each other.",
                "**Alternatives to Prison**: **Community service orders** (performing unpaid work for the community); **probation** (supervised release); **restorative justice** (bringing offenders face to face with victims to repair harm); **electronic tagging** (GPS monitoring); **drug and alcohol treatment programmes** — evidence suggests these approaches reduce reoffending more effectively than imprisonment for many offences."
              ]
            }
          ]
        }
      ]
    }
  ]
};
