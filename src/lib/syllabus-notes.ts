// Syllabus Notes — full document-style notes matching Cambridge IGCSE syllabus
// Structure: Subject → Chapter (with intro) → SubHeading (with body + bullets)

export type BulletGroup = {
  subTitle?: string;  // optional bold sub-sub-heading like "Core Assumptions"
  bullets: string[];
};

export type SubHeading = {
  title: string;
  body: string;           // paragraph of explanation
  groups: BulletGroup[];  // labelled bullet groups
};

export type Chapter = {
  number: number;
  title: string;
  intro: string;           // 2-3 sentence overview paragraph
  subheadings: SubHeading[];
};

export type SubjectNotes = {
  id: string;
  name: string;
  code: string;
  color: string;
  chapters: Chapter[];
};

// ── Biology 0610 ──────────────────────────────────────────────────────────────

const BIOLOGY: SubjectNotes = {
  id: "biology", name: "Biology", code: "0610", color: "bg-emerald-500",
  chapters: [
    {
      number: 1,
      title: "Characteristics and Classification of Living Organisms",
      intro: "All living organisms share seven fundamental life processes, often remembered by the acronym MRSGREN. Scientists organise the enormous diversity of life using a hierarchical classification system that groups organisms based on shared features, ultimately naming each species with a unique two-part Latin name.",
      subheadings: [
        {
          title: "The Seven Life Processes (MRSGREN)",
          body: "Every organism must carry out all seven of these processes at some point in its life cycle. These processes distinguish living things from non-living matter and form the basis of all biological study.",
          groups: [
            {
              bullets: [
                "**Movement** — organisms or their parts change position (e.g. a plant growing toward light, an animal running)",
                "**Respiration** — chemical reactions that release energy from food molecules, occurring in every living cell",
                "**Sensitivity** — detecting and responding to changes in the environment (stimuli)",
                "**Growth** — permanent increase in size and dry mass through cell division and enlargement",
                "**Reproduction** — producing offspring, either sexually or asexually, to continue the species",
                "**Excretion** — removal of metabolic waste products (not simply egestion of undigested food)",
                "**Nutrition** — obtaining and using food for energy, growth and repair"
              ]
            }
          ]
        },
        {
          title: "Classification System",
          body: "Taxonomists arrange living organisms into groups based on shared structural and biochemical characteristics. The hierarchy moves from the largest, most inclusive group down to the smallest, most specific: Kingdom → Phylum → Class → Order → Family → Genus → Species. Every organism's full scientific name uses just the Genus and species (binomial nomenclature), written in italics — for example, *Homo sapiens*.",
          groups: [
            {
              subTitle: "The Five Kingdoms",
              bullets: [
                "**Animals (Animalia)** — multicellular, no cell wall, feed by ingestion",
                "**Plants (Plantae)** — multicellular, cell wall of cellulose, feed by photosynthesis",
                "**Fungi** — multicellular (mostly), cell wall of chitin, feed by absorption (saprophytic)",
                "**Protoctists** — mostly unicellular eukaryotes (e.g. Amoeba, Chlamydomonas)",
                "**Prokaryotes (Bacteria)** — no true nucleus, no membrane-bound organelles"
              ]
            },
            {
              subTitle: "Vertebrate Groups",
              bullets: [
                "**Fish** — gills, scales, ectothermic, lay eggs in water",
                "**Amphibians** — moist skin, lay eggs in water, ectothermic",
                "**Reptiles** — dry scaly skin, lay eggs on land, ectothermic",
                "**Birds** — feathers, wings, endothermic, lay eggs",
                "**Mammals** — hair/fur, endothermic, give birth to live young, feed young with milk"
              ]
            }
          ]
        },
        {
          title: "Dichotomous Keys",
          body: "A dichotomous key is a tool used to identify unknown organisms. At each step, you are presented with two contrasting statements. By choosing the one that matches the organism being identified, you work through the key step by step until you arrive at the organism's name.",
          groups: [
            {
              bullets: [
                "Each step in the key offers exactly two choices (hence 'dichotomous' meaning divided in two)",
                "Keys are based on observable characteristics — never on colour alone, as this can vary",
                "To construct a key: group organisms by one clear feature, then subdivide each group further",
                "Example first step: 'Does the organism have legs?' → Yes leads to one branch; No leads to another"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Organisation of the Organism",
      intro: "Living organisms are built from cells — the basic unit of life. Cells are organised into tissues, tissues into organs, and organs into organ systems. Understanding cell structure is fundamental because differences between cell types reflect their specialised functions.",
      subheadings: [
        {
          title: "Cell Structure",
          body: "Most cells share common structures, but plant and animal cells have distinct differences that reflect how they obtain energy and maintain their shape. You should be able to identify and give the function of each structure from a diagram.",
          groups: [
            {
              subTitle: "Structures Found in Both Animal and Plant Cells",
              bullets: [
                "**Cell membrane** — controls what enters and leaves the cell (selectively permeable)",
                "**Cytoplasm** — jelly-like fluid where metabolic reactions occur",
                "**Nucleus** — contains DNA (genetic information); controls cell activities",
                "**Mitochondria** — site of aerobic respiration; produce ATP (energy currency)",
                "**Ribosomes** — site of protein synthesis (too small to see under light microscope)"
              ]
            },
            {
              subTitle: "Structures Found ONLY in Plant Cells",
              bullets: [
                "**Cell wall** — made of cellulose; provides rigid support and shape",
                "**Chloroplasts** — contain chlorophyll; site of photosynthesis",
                "**Large permanent vacuole** — filled with cell sap; maintains turgidity"
              ]
            }
          ]
        },
        {
          title: "Levels of Organisation",
          body: "In multicellular organisms, cells do not all work in isolation. They become specialised for particular functions and are organised into progressively complex levels of structure. This division of labour makes organisms far more efficient than single cells.",
          groups: [
            {
              bullets: [
                "**Cell** → the basic structural and functional unit",
                "**Tissue** → a group of similar cells working together (e.g. muscle tissue)",
                "**Organ** → several tissues working together (e.g. the heart)",
                "**Organ system** → several organs working together (e.g. circulatory system)",
                "**Organism** → all organ systems working together as a whole"
              ]
            },
            {
              subTitle: "Examples of Specialised Cells",
              bullets: [
                "**Red blood cells** — biconcave disc shape; no nucleus (more room for haemoglobin); carries O₂",
                "**Sperm cells** — tail (flagellum) for swimming; many mitochondria for energy; acrosome to penetrate egg",
                "**Root hair cells** — large surface area for water and mineral absorption; no chloroplasts",
                "**Palisade mesophyll cells** — many chloroplasts near leaf surface for maximum photosynthesis",
                "**Guard cells** — can change shape to open/close stomata and control gas exchange"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Movement into and out of Cells",
      intro: "Cells constantly exchange substances with their surroundings. Three key processes govern this movement: diffusion (passive movement of particles down a concentration gradient), osmosis (diffusion of water through a membrane), and active transport (energy-requiring movement against a gradient). Understanding these processes is essential for explaining how nutrients enter cells and how waste products leave.",
      subheadings: [
        {
          title: "Diffusion",
          body: "Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration, as a result of their random motion. It is a passive process — it requires no energy from the cell. Diffusion continues until the concentration is equal on both sides (equilibrium), though particles continue to move randomly.",
          groups: [
            {
              subTitle: "Factors that Increase the Rate of Diffusion",
              bullets: [
                "**Greater concentration gradient** — the bigger the difference in concentration, the faster diffusion",
                "**Larger surface area** — more area for particles to cross (e.g. alveoli, villi)",
                "**Shorter diffusion distance** — thinner membrane means faster crossing",
                "**Higher temperature** — particles have more kinetic energy and move faster"
              ]
            },
            {
              subTitle: "Examples in Biology",
              bullets: [
                "O₂ diffuses from alveoli (high concentration) into blood (lower concentration) during gas exchange",
                "CO₂ diffuses from respiring cells into blood, then from blood into alveoli for exhalation",
                "Glucose diffuses from the small intestine (after digestion) into blood"
              ]
            }
          ]
        },
        {
          title: "Osmosis",
          body: "Osmosis is a special case of diffusion involving water. It is defined as the net movement of water molecules from a region of higher water potential (dilute solution) to a region of lower water potential (concentrated solution), through a selectively permeable membrane. Water potential is lowered when solutes are dissolved in water.",
          groups: [
            {
              subTitle: "Effects on Cells",
              bullets: [
                "**Turgid plant cell** — water enters by osmosis when external solution is more dilute; vacuole swells; cell wall prevents bursting; provides support",
                "**Plasmolysed plant cell** — water leaves by osmosis when external solution is more concentrated; vacuole shrinks; cell membrane pulls away from wall",
                "**Animal cell in dilute solution** — cell swells and may burst (lysis) — no cell wall to prevent this",
                "**Animal cell in concentrated solution** — cell shrinks (crenation) as water leaves"
              ]
            }
          ]
        },
        {
          title: "Active Transport",
          body: "Active transport moves substances against their concentration gradient — from low to high concentration. Because this is thermodynamically unfavourable, it requires energy in the form of ATP, produced by respiration. It also requires specific carrier proteins in the membrane that bind to the substance being transported.",
          groups: [
            {
              bullets: [
                "Requires **metabolic energy (ATP)** from respiration",
                "Uses **carrier proteins** specific to the substance being transported",
                "Moves substances **against** the concentration gradient",
                "**Example:** Root hair cells absorb mineral ions (e.g. nitrate) from the soil even when the soil concentration is lower than inside the cell",
                "**Example:** Glucose absorption in the small intestine when gut concentration is low"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Biological Molecules",
      intro: "The chemistry of life is built on four major classes of biological molecules: carbohydrates, proteins, lipids and nucleic acids. Each class has a characteristic molecular structure and performs vital roles in the structure and function of living organisms. You must be able to describe their structure, function and how to test for them.",
      subheadings: [
        {
          title: "Carbohydrates",
          body: "Carbohydrates contain carbon, hydrogen and oxygen. The ratio of hydrogen to oxygen is always 2:1. They range from simple single-unit sugars to large polymers. Their primary role is energy provision and storage, though cellulose provides structural support in plants.",
          groups: [
            {
              subTitle: "Types",
              bullets: [
                "**Monosaccharides** (simple sugars): glucose, fructose, galactose — single ring structures",
                "**Disaccharides**: sucrose = glucose + fructose; maltose = glucose + glucose; lactose = glucose + galactose",
                "**Polysaccharides**: starch (energy storage in plants), glycogen (energy storage in animals, liver/muscle), cellulose (structural — cell walls)"
              ]
            },
            {
              subTitle: "Food Tests",
              bullets: [
                "**Iodine test for starch**: add brown iodine solution → turns **blue-black** if starch present",
                "**Benedict's test for reducing sugars**: heat with Benedict's reagent → brick-red/orange precipitate",
                "Non-reducing sugars (sucrose): must first hydrolyse with dilute HCl, then test with Benedict's"
              ]
            }
          ]
        },
        {
          title: "Proteins",
          body: "Proteins are polymers built from amino acid monomers joined by peptide bonds. There are 20 different amino acids; the sequence in which they are joined (determined by DNA) gives each protein its unique shape and function. Proteins perform an enormous range of biological roles.",
          groups: [
            {
              subTitle: "Functions of Proteins",
              bullets: [
                "**Enzymes** — biological catalysts (e.g. amylase, pepsin)",
                "**Structural proteins** — keratin (hair, nails), collagen (connective tissue)",
                "**Hormones** — insulin (blood glucose regulation)",
                "**Antibodies** — immune defence",
                "**Transport proteins** — haemoglobin (carries O₂), membrane carrier proteins"
              ]
            },
            {
              subTitle: "Food Test",
              bullets: [
                "**Biuret test**: add dilute sodium hydroxide then copper sulfate solution",
                "Positive result → colour changes from blue to **purple/violet**"
              ]
            }
          ]
        },
        {
          title: "Fats and Oils (Lipids)",
          body: "Lipids are made from glycerol and fatty acids. One glycerol molecule bonds with three fatty acids to form a triglyceride, releasing three water molecules. Lipids are non-polar (hydrophobic) and do not dissolve in water. Fats (solid at room temperature) come from animals; oils (liquid) come from plants.",
          groups: [
            {
              subTitle: "Functions",
              bullets: [
                "Long-term energy storage (more energy per gram than carbohydrates)",
                "Thermal and electrical insulation",
                "Making cell membranes (phospholipids form the bilayer)",
                "Protection of organs (fat padding around kidneys)"
              ]
            },
            {
              subTitle: "Food Test",
              bullets: [
                "**Emulsion (ethanol) test**: mix sample with ethanol, then add water",
                "Positive result → solution turns **milky white** (emulsion forms)"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Enzymes",
      intro: "Enzymes are biological catalysts — proteins that speed up chemical reactions in living organisms without being used up or changed themselves. Every metabolic reaction in a cell depends on enzymes. Their specific three-dimensional shape, particularly the active site, determines which substrate they can act on.",
      subheadings: [
        {
          title: "How Enzymes Work — Lock and Key Model",
          body: "The active site of an enzyme has a specific shape complementary to its substrate. The substrate binds to the active site, forming an enzyme-substrate complex. The reaction occurs, products are released, and the enzyme is free to catalyse another reaction. This model explains why enzymes are highly specific.",
          groups: [
            {
              bullets: [
                "Each enzyme has a unique active site shape → one enzyme can only act on one type of substrate",
                "Enzymes lower the activation energy needed for the reaction to proceed",
                "Enzymes are not consumed — the same enzyme molecule can catalyse many reactions",
                "**Denaturation**: when the enzyme's shape is permanently altered by heat or extreme pH, destroying activity"
              ]
            }
          ]
        },
        {
          title: "Factors Affecting Enzyme Activity",
          body: "The rate of enzyme-catalysed reactions is affected by temperature, pH, and substrate concentration. Each enzyme has an optimum temperature and pH at which it works fastest. Beyond these optima, activity falls — and if conditions are extreme enough, the enzyme denatures and activity is lost completely.",
          groups: [
            {
              subTitle: "Temperature",
              bullets: [
                "Below optimum: higher temperature increases kinetic energy → more frequent collisions → faster rate",
                "At optimum (~37°C for human enzymes): maximum reaction rate",
                "Above optimum: heat breaks bonds maintaining 3D shape → active site distorted → enzyme **denatured** → activity lost permanently"
              ]
            },
            {
              subTitle: "pH",
              bullets: [
                "Each enzyme has a specific optimum pH (e.g. pepsin in stomach works best at pH 2; salivary amylase at pH 7)",
                "Extreme pH alters ionic bonds and hydrogen bonds → shape changes → active site distorted → denaturation",
                "H⁺ and OH⁻ ions interfere with the enzyme's charge distribution"
              ]
            },
            {
              subTitle: "Substrate Concentration",
              bullets: [
                "More substrate → more frequent collisions with enzyme active sites → faster rate",
                "Rate levels off when all active sites are occupied (enzymes are saturated)",
                "At saturation, adding more substrate has no effect unless more enzyme is added"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Plant Nutrition",
      intro: "Plants are autotrophs — they produce their own food through photosynthesis. Using light energy captured by chlorophyll, plants convert carbon dioxide from the air and water from the soil into glucose and oxygen. This process not only feeds the plant but also produces the oxygen that most living organisms depend on for respiration.",
      subheadings: [
        {
          title: "Photosynthesis — The Overall Equation",
          body: "Photosynthesis is a two-stage process that occurs in the chloroplasts. The light-dependent reactions occur in the grana (stacked membrane layers) and use light to split water and produce ATP. The light-independent reactions (Calvin cycle) occur in the stroma and use this ATP to fix CO₂ into glucose.",
          groups: [
            {
              bullets: [
                "**Word equation:** carbon dioxide + water → glucose + oxygen",
                "**Symbol equation:** 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (requires light and chlorophyll)",
                "Glucose can be used immediately in respiration, stored as starch, or converted to other molecules",
                "Oxygen is released as a by-product through stomata"
              ]
            }
          ]
        },
        {
          title: "Limiting Factors",
          body: "A limiting factor is any factor present at a level that prevents the rate of photosynthesis from increasing, even if other factors are increased. At any given moment, only one factor is the limiting factor — the one in shortest supply relative to the plant's needs.",
          groups: [
            {
              bullets: [
                "**Light intensity**: as light increases, rate increases (up to a point) — more energy for light reactions",
                "**CO₂ concentration**: increasing CO₂ increases rate — more substrate for Calvin cycle",
                "**Temperature**: affects enzyme-controlled reactions in the Calvin cycle; too hot → denatures enzymes",
                "In commercial greenhouses, all three are artificially increased to maximise crop yield"
              ]
            }
          ]
        },
        {
          title: "Mineral Requirements",
          body: "While plants make organic molecules from CO₂ and water, they also require mineral ions absorbed from the soil for specific functions. Deficiencies cause characteristic symptoms that can be used to diagnose problems in crops.",
          groups: [
            {
              bullets: [
                "**Nitrate ions** (NO₃⁻): needed to make amino acids and proteins; deficiency causes stunted growth and yellowing of older leaves",
                "**Magnesium ions** (Mg²⁺): essential component of chlorophyll; deficiency causes chlorosis (yellowing of leaves)",
                "Minerals are absorbed by active transport in root hair cells"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 7,
      title: "Human Nutrition",
      intro: "Humans are heterotrophs — we obtain nutrients by consuming other organisms. A balanced diet provides the right amounts of carbohydrates, proteins, fats, vitamins, minerals, water and fibre. After ingestion, food is broken down mechanically and chemically during digestion so nutrients can be absorbed into the bloodstream.",
      subheadings: [
        {
          title: "A Balanced Diet",
          body: "Different nutrients serve distinct roles in the body. An imbalance — whether a deficiency or excess — leads to malnutrition and health problems. The proportions required vary with age, sex, activity level and health status.",
          groups: [
            {
              bullets: [
                "**Carbohydrates** — primary energy source; complex carbs (starch) provide sustained energy",
                "**Proteins** — growth, repair and making enzymes/hormones (sources: meat, fish, legumes)",
                "**Fats** — concentrated energy store; insulation; cell membranes; fat-soluble vitamins (A, D, E, K)",
                "**Vitamin C** (ascorbic acid): deficiency → scurvy (bleeding gums, poor wound healing)",
                "**Vitamin D**: deficiency → rickets (soft, deformed bones); made in skin on exposure to sunlight",
                "**Iron**: needed to make haemoglobin; deficiency → anaemia (fatigue, pale skin)",
                "**Calcium**: needed for strong bones and teeth, and muscle contraction",
                "**Water**: medium for reactions; transport; temperature regulation; ~2 litres per day needed",
                "**Dietary fibre (roughage)**: aids peristalsis; prevents constipation and bowel disease"
              ]
            }
          ]
        },
        {
          title: "The Digestive System",
          body: "Digestion involves breaking large insoluble food molecules into small soluble ones that can cross the gut wall and enter the blood. This involves both mechanical breakdown (chewing, churning) and chemical digestion by enzymes. The gut is essentially a long tube — the alimentary canal — specialised in different regions.",
          groups: [
            {
              subTitle: "Organs and Their Functions",
              bullets: [
                "**Mouth**: teeth chew food; salivary amylase begins starch digestion; forms a bolus",
                "**Oesophagus**: muscular tube; peristalsis (wave-like contractions) moves food to stomach",
                "**Stomach**: churning creates chyme; pepsin (protease) digests proteins; HCl kills bacteria and provides optimum pH for pepsin",
                "**Small intestine (duodenum)**: bile from liver neutralises acid; pancreatic juice adds amylase, protease and lipase",
                "**Small intestine (ileum)**: absorption; villi maximise surface area",
                "**Large intestine**: water absorption; faeces formed and stored in rectum"
              ]
            },
            {
              subTitle: "Adaptations of Villi for Absorption",
              bullets: [
                "Enormous surface area (millions of finger-like villi, each with microvilli)",
                "Single cell thick epithelium → short diffusion distance",
                "Rich blood supply (capillaries and lacteals) → maintains concentration gradient",
                "Lacteals absorb fatty acids and glycerol → reform triglycerides → transport as chylomicrons in lymph"
              ]
            }
          ]
        },
        {
          title: "Digestive Enzymes",
          body: "Three main classes of enzyme carry out chemical digestion. Each is produced by specific glands and secreted into the gut at the appropriate stage.",
          groups: [
            {
              bullets: [
                "**Amylase** → starch → maltose (produced in salivary glands and pancreas; works in mouth and small intestine)",
                "**Protease** (e.g. pepsin, trypsin) → proteins → amino acids (stomach and small intestine)",
                "**Lipase** → fats → fatty acids + glycerol (small intestine; bile emulsifies fat first to increase surface area)"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 8,
      title: "Transport in Plants",
      intro: "Plants need to transport water, mineral ions and sugars between different parts of the plant. Two separate vascular tissue systems handle this: xylem transports water and dissolved mineral ions upward from roots to leaves, while phloem transports dissolved sugars (products of photosynthesis) throughout the plant.",
      subheadings: [
        {
          title: "Xylem — Transporting Water",
          body: "Xylem vessels are dead, hollow tubes with no cell contents and lignified walls. They form a continuous network from root to leaf. Water moves up the xylem by the transpiration stream — driven by evaporation of water from the leaves.",
          groups: [
            {
              bullets: [
                "Water enters roots by osmosis (root hair cells have large surface area)",
                "Travels across the root cortex to the xylem",
                "Pulled up the xylem by tension created as water evaporates from leaves (transpiration pull)",
                "Lignified walls prevent collapse under the tension and provide mechanical support"
              ]
            }
          ]
        },
        {
          title: "Transpiration",
          body: "Transpiration is the loss of water vapour from the aerial parts of a plant, primarily through stomata in the leaves. It is an unavoidable consequence of having stomata open for gas exchange. The rate of transpiration varies with environmental conditions.",
          groups: [
            {
              subTitle: "Factors Increasing Transpiration Rate",
              bullets: [
                "**Higher temperature** → more water vapour, faster diffusion",
                "**Lower humidity** → greater concentration gradient between leaf interior and atmosphere",
                "**Wind** → removes water vapour from around the leaf, maintaining gradient",
                "**Brighter light** → stomata open wider to allow CO₂ in for photosynthesis",
                "**Large leaf surface area** → more stomata, more evaporation"
              ]
            },
            {
              subTitle: "Measuring Transpiration",
              bullets: [
                "Use a **potometer** — measures water uptake (good approximation of transpiration rate)",
                "The air bubble in the capillary tube moves as water is taken up by the cut shoot"
              ]
            }
          ]
        },
        {
          title: "Phloem — Translocation",
          body: "Phloem transports dissolved sugars (sucrose) and other organic molecules from where they are made (sources — mainly leaves) to where they are needed or stored (sinks — roots, fruits, growing tips). Unlike xylem transport, translocation requires energy and can move in both directions simultaneously in different parts of the plant.",
          groups: [
            {
              bullets: [
                "Phloem consists of living sieve tube cells and companion cells",
                "Companion cells provide energy for active loading of sucrose into sieve tubes",
                "Movement is bidirectional — upward to growing shoot tips, downward to roots",
                "Evidence: if bark is removed in a ring (ring-barking), sugars accumulate above the cut → phloem is in bark"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 9,
      title: "Transport in Animals",
      intro: "In large, complex animals, diffusion alone is too slow to meet the metabolic demands of every cell. The circulatory system — comprising the heart, blood vessels and blood — provides a rapid bulk transport system. In humans, a double circulatory system keeps oxygenated and deoxygenated blood separate, maintaining high blood pressure for efficient delivery to tissues.",
      subheadings: [
        {
          title: "The Heart",
          body: "The human heart is a muscular pump with four chambers. The right side receives deoxygenated blood from the body and pumps it to the lungs (pulmonary circulation). The left side receives oxygenated blood from the lungs and pumps it to the rest of the body (systemic circulation). The left ventricle has a much thicker muscle wall as it must generate higher pressure.",
          groups: [
            {
              subTitle: "Key Structures",
              bullets: [
                "**Atria** (upper chambers) — receive blood returning to the heart",
                "**Ventricles** (lower chambers) — pump blood out; left ventricle wall is thicker",
                "**Atrioventricular valves** — prevent backflow from ventricles to atria",
                "**Semilunar valves** — prevent backflow from pulmonary artery/aorta into ventricles",
                "**Coronary arteries** — supply the heart muscle itself with oxygen"
              ]
            },
            {
              subTitle: "Cardiac Cycle",
              bullets: [
                "**Diastole**: heart muscle relaxes; atria fill with blood",
                "**Atrial systole**: atria contract; blood pushed into ventricles",
                "**Ventricular systole**: ventricles contract; blood pumped to lungs and body",
                "Heart rate controlled by the sinoatrial node (SAN) — the natural pacemaker"
              ]
            }
          ]
        },
        {
          title: "Blood Vessels",
          body: "The three types of blood vessel — arteries, veins and capillaries — are each structurally adapted to their function. Their differences in wall thickness, lumen size and presence of valves reflect the different pressures and flow characteristics they experience.",
          groups: [
            {
              bullets: [
                "**Arteries**: thick muscular and elastic walls to withstand high pressure; carry blood AWAY from heart; no valves needed",
                "**Veins**: thin walls; large lumen; carry blood TO heart; have valves to prevent backflow; blood at low pressure",
                "**Capillaries**: one cell thick (endothelium only); site of all exchange with tissues; very small lumen"
              ]
            }
          ]
        },
        {
          title: "Blood — Composition and Functions",
          body: "Blood is a liquid tissue consisting of plasma (a pale yellow fluid) containing several types of formed elements. Each component has specific, vital functions in transport, defence and clotting.",
          groups: [
            {
              bullets: [
                "**Red blood cells (erythrocytes)**: biconcave disc; no nucleus; contain haemoglobin (Hb) to carry O₂; Hb + O₂ ⇌ oxyhaemoglobin",
                "**White blood cells (leucocytes)**: larger, nucleated; part of immune system",
                "  - **Phagocytes**: engulf and digest pathogens by phagocytosis",
                "  - **Lymphocytes**: produce specific antibodies against antigens on pathogens",
                "**Platelets**: cell fragments; initiate clotting when vessel is damaged → prevent blood loss",
                "**Plasma**: transports CO₂, digested food (glucose, amino acids), urea, hormones, heat"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 10,
      title: "Diseases and Immunity",
      intro: "Pathogens are microorganisms that cause disease. The human body has multiple lines of defence against infection — physical barriers, non-specific immune responses and a highly specific adaptive immune response involving lymphocytes. Understanding how the immune system works explains how vaccines protect us.",
      subheadings: [
        {
          title: "Pathogens and Transmission",
          body: "Different types of pathogen cause different diseases and are transmitted in different ways. Knowing how pathogens spread is key to preventing outbreaks.",
          groups: [
            {
              subTitle: "Types of Pathogen",
              bullets: [
                "**Bacteria**: e.g. Mycobacterium tuberculosis (TB), Salmonella (food poisoning), Vibrio cholerae",
                "**Viruses**: e.g. influenza, HIV, SARS-CoV-2; replicate inside host cells",
                "**Fungi**: e.g. Tinea (athlete's foot), ringworm",
                "**Protoctists**: e.g. Plasmodium (malaria — transmitted by mosquito vector)"
              ]
            },
            {
              subTitle: "Routes of Transmission",
              bullets: [
                "**Airborne droplets**: influenza, TB, COVID-19",
                "**Contaminated water/food**: cholera, Salmonella",
                "**Direct contact**: athlete's foot, STIs",
                "**Vectors**: malaria (Anopheles mosquito), dengue fever"
              ]
            }
          ]
        },
        {
          title: "Body Defences",
          body: "The body uses layered defences. The first line prevents pathogens entering; the second fights them if they get through without specifically targeting them; the third line is highly specific and creates immunological memory.",
          groups: [
            {
              subTitle: "First Line (Barriers)",
              bullets: [
                "Skin — physical barrier; slightly acidic surface inhibits bacterial growth",
                "Mucus in airways — traps pathogens; cilia sweep mucus away",
                "Stomach acid (pH 2) — kills most ingested pathogens"
              ]
            },
            {
              subTitle: "Second Line (Non-specific Immune Response)",
              bullets: [
                "Inflammation — increased blood flow brings more white blood cells to infected area",
                "Phagocytes engulf and digest pathogens (phagocytosis)"
              ]
            },
            {
              subTitle: "Third Line (Specific Immune Response)",
              bullets: [
                "**Antigens**: specific molecules on pathogen surface that trigger immune response",
                "**Lymphocytes** (B cells): produce specific **antibodies** complementary to the antigen",
                "Antibodies bind to antigens → neutralise pathogen, mark for destruction, cause agglutination",
                "**Memory cells** formed after first exposure → faster, larger response on second exposure (immunity)"
              ]
            }
          ]
        },
        {
          title: "Vaccination",
          body: "Vaccination artificially introduces antigens into the body to stimulate the immune response without causing disease. The body produces antibodies and memory cells, providing long-lasting protection. If enough people are vaccinated, herd immunity protects those who cannot be vaccinated.",
          groups: [
            {
              bullets: [
                "Vaccines contain: dead/attenuated (weakened) pathogens, isolated antigens, or mRNA (newer vaccines)",
                "First exposure → primary immune response (slow, low antibody levels) → memory cells formed",
                "Second exposure (or booster) → rapid secondary response → high antibody levels → disease prevented",
                "**Herd immunity**: if ~70-95% vaccinated, pathogen cannot find enough susceptible hosts → epidemic prevented"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 11,
      title: "Gas Exchange in Humans",
      intro: "Every cell needs a constant supply of oxygen for aerobic respiration and must remove carbon dioxide as a waste product. Gas exchange surfaces must be specialised to allow rapid diffusion of these gases. In humans, the lungs provide a massive, moist, well-supplied surface for this exchange.",
      subheadings: [
        {
          title: "The Respiratory System",
          body: "Air is drawn into the lungs through the trachea, which divides into two bronchi (one per lung), which further divide into bronchioles, eventually ending in millions of tiny air sacs called alveoli. This branching system maximises the surface area for gas exchange.",
          groups: [
            {
              subTitle: "Adaptations of Alveoli for Gas Exchange",
              bullets: [
                "**Enormous surface area** — approximately 70 m² in an adult (roughly a tennis court)",
                "**Thin walls** — one cell thick (squamous epithelium) → very short diffusion distance",
                "**Moist lining** — gases dissolve and diffuse through liquid film",
                "**Rich capillary network** — maintains steep concentration gradient; blood continuously removes O₂ and brings CO₂"
              ]
            }
          ]
        },
        {
          title: "Ventilation Mechanism",
          body: "Breathing (ventilation) is the physical process of moving air in and out of the lungs, maintaining the concentration gradients for gas exchange. It is driven by changes in thorax volume caused by the diaphragm and intercostal muscles.",
          groups: [
            {
              subTitle: "Inspiration (Breathing In)",
              bullets: [
                "Diaphragm muscles contract → diaphragm flattens",
                "External intercostal muscles contract → ribs move up and out",
                "Thorax volume increases → pressure inside drops below atmospheric → air rushes in"
              ]
            },
            {
              subTitle: "Expiration (Breathing Out)",
              bullets: [
                "Diaphragm relaxes → domes upward",
                "Intercostal muscles relax → ribs fall in and down",
                "Thorax volume decreases → pressure increases → air pushed out"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 12,
      title: "Respiration",
      intro: "Respiration is not breathing — it is the series of chemical reactions inside cells that releases energy from glucose (and other organic molecules). This energy is transferred to ATP, which powers all cellular activities. Respiration can occur with oxygen (aerobic) or without it (anaerobic), with very different energy yields.",
      subheadings: [
        {
          title: "Aerobic Respiration",
          body: "Aerobic respiration completely oxidises glucose using oxygen, releasing the maximum amount of energy. It occurs in the mitochondria and is the predominant form of respiration in most organisms under normal conditions.",
          groups: [
            {
              bullets: [
                "**Word equation:** glucose + oxygen → carbon dioxide + water (+ energy released as ATP)",
                "**Symbol equation:** C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
                "Occurs in the **mitochondria** (matrix and inner membrane)",
                "Produces **approximately 36-38 ATP** per glucose molecule",
                "Product CO₂ is transported in plasma and by red blood cells to lungs for exhalation"
              ]
            }
          ]
        },
        {
          title: "Anaerobic Respiration",
          body: "When oxygen is in short supply (e.g. during intense exercise, or in waterlogged soil for plant roots), cells switch to anaerobic respiration. It is less efficient — producing far less ATP — but can sustain activity for short periods.",
          groups: [
            {
              subTitle: "In Animals (and Humans)",
              bullets: [
                "glucose → lactic acid (+ small amount of ATP)",
                "Lactic acid builds up in muscles → cramping and fatigue",
                "Oxygen debt: after exercise, extra O₂ needed to oxidise lactic acid back to CO₂ and H₂O",
                "Heavy breathing after exercise repays the oxygen debt"
              ]
            },
            {
              subTitle: "In Yeast (Fermentation)",
              bullets: [
                "glucose → ethanol + carbon dioxide (+ small amount of ATP)",
                "Used commercially: brewing (ethanol production) and baking (CO₂ makes bread rise)",
                "Yeast is killed at high alcohol concentrations — limits ethanol production in brewing"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 13,
      title: "Excretion in Humans",
      intro: "Excretion is the removal of metabolic waste products from the body. The main excretory organ is the kidney, which filters blood and produces urine. The liver also plays a key excretory role, producing urea from the breakdown of excess amino acids. The lungs excrete CO₂. Understanding kidney function is essential for understanding how blood composition is regulated.",
      subheadings: [
        {
          title: "The Kidney",
          body: "Each kidney contains approximately one million functional units called nephrons. Blood is filtered under high pressure, then the filtrate is processed as it passes through the tubules — useful substances are selectively reabsorbed, and waste remains to form urine.",
          groups: [
            {
              subTitle: "Key Structures of a Nephron",
              bullets: [
                "**Glomerulus**: knot of capillaries inside Bowman's capsule; high pressure forces small molecules into the tubule (ultrafiltration)",
                "**Filtrate contains**: water, glucose, urea, mineral salts, amino acids",
                "**Proximal convoluted tubule**: selective reabsorption of ALL glucose, most water, and mineral ions back into blood by active transport",
                "**Loop of Henle**: creates a concentration gradient in the medulla to enable water reabsorption",
                "**Collecting duct**: final water reabsorption (amount controlled by ADH)"
              ]
            }
          ]
        },
        {
          title: "Osmoregulation and ADH",
          body: "The kidneys constantly regulate the water potential of the blood — a process called osmoregulation. Antidiuretic hormone (ADH), released by the pituitary gland, controls the permeability of the collecting duct and is the key hormone in this regulation.",
          groups: [
            {
              bullets: [
                "**Blood too concentrated** (e.g. after sweating or insufficient fluid intake):",
                "  → hypothalamus detects low water potential → pituitary releases more ADH",
                "  → collecting duct becomes more permeable → more water reabsorbed into blood",
                "  → small volume of concentrated urine produced",
                "**Blood too dilute** (e.g. after drinking a lot of water):",
                "  → less ADH released → collecting duct less permeable → less water reabsorbed",
                "  → large volume of dilute urine produced"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 14,
      title: "Coordination and Response",
      intro: "For an organism to survive, it must detect changes in its environment (stimuli) and respond to them appropriately. In humans, coordination involves the nervous system (fast, electrical signals) and the hormonal (endocrine) system (slow, chemical signals). Together they allow complex behaviours and maintain homeostasis.",
      subheadings: [
        {
          title: "The Nervous System",
          body: "The central nervous system (CNS) — brain and spinal cord — receives information from sensory receptors, processes it and sends instructions to effectors (muscles and glands). Reflex arcs provide rapid, automatic responses that bypass the brain.",
          groups: [
            {
              subTitle: "Types of Neurone",
              bullets: [
                "**Sensory neurone**: carries impulses FROM receptor TO CNS; has long dendron and short axon",
                "**Relay (interneurone)**: within CNS; connects sensory to motor neurones",
                "**Motor neurone**: carries impulses FROM CNS TO effector (muscle or gland); has long axon"
              ]
            },
            {
              subTitle: "Reflex Arc",
              bullets: [
                "Stimulus → receptor → sensory neurone → relay neurone (spinal cord) → motor neurone → effector → response",
                "Reflexes are automatic and very fast — no brain involvement required",
                "Example: touching a hot surface → hand withdraws before pain is consciously felt"
              ]
            }
          ]
        },
        {
          title: "Synapses",
          body: "A synapse is a junction between two neurones. There is no direct contact — a tiny gap (synaptic cleft) separates them. The electrical signal cannot cross this gap directly; instead, neurotransmitter chemicals are released from vesicles in the presynaptic neurone, diffuse across the gap and bind to receptors on the postsynaptic neurone.",
          groups: [
            {
              bullets: [
                "Impulse arrives → calcium ions enter → synaptic vesicles fuse with membrane → neurotransmitter released",
                "Neurotransmitter diffuses across synapse → binds to receptor → new impulse generated",
                "Neurotransmitter broken down or reabsorbed → ready for next signal",
                "Signals can only travel in ONE direction (unidirectional) across synapses",
                "Many drugs act at synapses (e.g. caffeine blocks inhibitory receptors, increasing alertness)"
              ]
            }
          ]
        },
        {
          title: "Hormones vs Nervous System",
          body: "The hormonal (endocrine) system uses chemical messengers called hormones, secreted by endocrine glands into the blood. While slower than nervous signals, hormones produce longer-lasting responses and can affect many organs simultaneously. The two systems often work together.",
          groups: [
            {
              subTitle: "Comparison Table",
              bullets: [
                "**Nervous**: electrical signal; travels along neurones; very fast (milliseconds); short-lived; precise, localised effect",
                "**Hormonal**: chemical signal; transported in blood; slow (seconds to minutes); long-lasting; widespread effect on multiple organs"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 15,
      title: "Drugs",
      intro: "A drug is any substance that affects the normal functioning of the body. Drugs can be beneficial (medicines) or harmful (substances of abuse). They affect the nervous system by altering the transmission of impulses at synapses, either mimicking, blocking or modifying neurotransmitter action.",
      subheadings: [
        {
          title: "Types of Drug",
          body: "Drugs are classified by their effect on the nervous system. Understanding these categories helps explain both their medical uses and their potential for harm.",
          groups: [
            {
              bullets: [
                "**Depressants**: slow down nervous system activity; reduce anxiety/pain; e.g. alcohol, tranquillisers, sleeping pills",
                "**Stimulants**: speed up nervous system; increase alertness; e.g. caffeine, nicotine, amphetamines, cocaine",
                "**Painkillers (analgesics)**: block pain signals; e.g. aspirin (mild), morphine and heroin (opioids — highly addictive)",
                "**Hallucinogens**: distort perception; e.g. LSD, cannabis"
              ]
            }
          ]
        },
        {
          title: "Drug Addiction and Effects",
          body: "Long-term drug use changes brain chemistry, often leading to tolerance and dependence. Addiction is characterised by compulsive drug-seeking behaviour despite harmful consequences.",
          groups: [
            {
              bullets: [
                "**Tolerance**: the body adapts → same dose produces less effect → larger doses needed",
                "**Physical dependence**: body requires the drug to function normally",
                "**Withdrawal symptoms**: when drug stopped — tremors, sweating, nausea, seizures",
                "**Alcohol effects**: liver disease (cirrhosis), brain damage, slowed reactions, addiction",
                "**Smoking (nicotine/tar)**: nicotine addictive; tar causes lung cancer; CO reduces O₂ transport"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 16,
      title: "Reproduction",
      intro: "Reproduction ensures the survival of a species. Sexual reproduction involves the fusion of gametes and produces offspring with genetic variation — essential for evolution. Asexual reproduction produces genetically identical offspring (clones) rapidly but without variation. Both strategies are found across the living world.",
      subheadings: [
        {
          title: "Sexual Reproduction in Humans",
          body: "Human sexual reproduction involves the production of gametes (sperm and eggs) by meiosis, their release, fertilisation in the fallopian tube, and development of the embryo in the uterus. The female reproductive cycle is hormonally regulated.",
          groups: [
            {
              subTitle: "Male Reproductive System",
              bullets: [
                "Testes: produce sperm (from puberty); also produce testosterone",
                "Sperm structure: head (nucleus + acrosome with digestive enzymes), midpiece (mitochondria for energy), tail (flagellum for swimming)"
              ]
            },
            {
              subTitle: "Female Reproductive System",
              bullets: [
                "Ovaries: produce eggs (ova) — released once per cycle (ovulation, ~day 14)",
                "Fallopian tube: site of fertilisation; cilia move egg toward uterus",
                "Uterus: site of implantation and development; uterine wall thickens each cycle",
                "Menstrual cycle: controlled by FSH, LH, oestrogen and progesterone"
              ]
            },
            {
              subTitle: "Development",
              bullets: [
                "Fertilised egg (zygote) → cell division → blastocyst → implants in uterus wall",
                "Placenta: exchange organ; O₂ and nutrients pass from mother to foetus; CO₂ and urea pass the other way",
                "Umbilical cord connects foetus to placenta"
              ]
            }
          ]
        },
        {
          title: "Asexual Reproduction",
          body: "Asexual reproduction involves only one parent and produces offspring that are genetically identical to the parent (clones). It is advantageous in stable environments but limits adaptability to change.",
          groups: [
            {
              bullets: [
                "**Binary fission** in bacteria: chromosome duplicated → cell divides into two identical cells",
                "**Budding** in yeast: small outgrowth forms, grows, then separates",
                "**Vegetative propagation** in plants: runners (strawberry), tubers (potato), bulbs (daffodil)",
                "**Cloning in animals**: possible through embryo splitting or nuclear transfer (e.g. Dolly the sheep)"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 17,
      title: "Inheritance",
      intro: "Genetics is the study of heredity — how traits are passed from parent to offspring through genes. Mendel's work on pea plants established the fundamental laws of inheritance, which we now understand in terms of DNA, chromosomes and alleles. Being able to predict inheritance patterns using Punnett squares is a core skill.",
      subheadings: [
        {
          title: "Key Genetic Terms",
          body: "A clear understanding of genetic terminology is essential before tackling inheritance problems. Many students confuse genotype and phenotype, or dominant and codominant alleles.",
          groups: [
            {
              bullets: [
                "**Gene**: a section of DNA that codes for a specific protein (and thus a characteristic)",
                "**Allele**: a different version of the same gene (e.g. 'tall' and 'dwarf' are alleles of the height gene)",
                "**Dominant allele**: expressed in the phenotype whenever present (even in one copy); written as capital letter",
                "**Recessive allele**: only expressed when two copies are present (homozygous recessive); lower case",
                "**Homozygous**: two identical alleles (e.g. TT or tt)",
                "**Heterozygous**: two different alleles (e.g. Tt)",
                "**Genotype**: the alleles an organism has (e.g. Tt)",
                "**Phenotype**: the observable characteristics that result from the genotype and environment"
              ]
            }
          ]
        },
        {
          title: "Monohybrid Crosses",
          body: "A monohybrid cross examines the inheritance of a single trait. Using a Punnett square, we can predict the probability of each genotype and phenotype in the offspring. The classic results are 3:1 phenotype ratio in F2 generation (two heterozygous parents) and 1:1 in a test cross.",
          groups: [
            {
              bullets: [
                "Cross Tt × Tt → offspring: 25% TT, 50% Tt, 25% tt → phenotype ratio 3 tall : 1 short",
                "**Codominance**: both alleles expressed equally (e.g. red × white → pink; or blood type AB)",
                "**Sex determination**: females XX, males XY — 50% chance of each sex per pregnancy",
                "**Sex-linked inheritance**: gene on X chromosome (e.g. haemophilia, red-green colour blindness) — more common in males who have only one X"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 18,
      title: "Variation and Selection",
      intro: "No two individuals — even within the same species — are exactly identical (except identical twins). This variation arises from genetic differences and environmental influences. Charles Darwin recognised that variation within populations is the raw material for natural selection, the mechanism driving evolution.",
      subheadings: [
        {
          title: "Types of Variation",
          body: "Variation can be categorised as continuous (a range of values with no distinct categories) or discontinuous (distinct groups with no intermediates). The type of variation reflects how many genes are involved and how strongly the environment influences the trait.",
          groups: [
            {
              bullets: [
                "**Continuous variation**: results from polygenic inheritance (many genes) + strong environmental influence; e.g. height, mass, intelligence — shows a normal distribution curve",
                "**Discontinuous variation**: determined by one or a few genes; little environmental influence; e.g. ABO blood group, tongue rolling, attached/free earlobes — distinct categories",
                "Causes of variation: meiosis (crossing over, independent assortment), random fertilisation, mutations, environment"
              ]
            }
          ]
        },
        {
          title: "Natural Selection",
          body: "Darwin's theory of natural selection proposes that organisms with characteristics better suited to their environment are more likely to survive, reproduce and pass on their advantageous alleles to offspring. Over many generations, this changes the genetic makeup of a population — evolution.",
          groups: [
            {
              bullets: [
                "1. **Overproduction**: more offspring produced than can survive (limited resources)",
                "2. **Variation**: individuals within a population differ in their characteristics",
                "3. **Selection pressure**: competition, predation, disease, climate — not all survive",
                "4. **Survival of the fittest**: individuals with favourable variations are more likely to survive and reproduce",
                "5. **Inheritance**: favourable alleles are passed to offspring → become more frequent in population",
                "**Example:** antibiotic resistance — bacteria with resistant mutations survive treatment → resistant strain spreads"
              ]
            }
          ]
        },
        {
          title: "Artificial Selection (Selective Breeding)",
          body: "Humans have used the principles of selection for thousands of years to breed plants and animals with desired characteristics. This involves choosing parents with the most favourable traits and breeding them over many generations.",
          groups: [
            {
              bullets: [
                "Choose organisms with desired trait → breed them → select offspring with best expression of trait → repeat over generations",
                "**Examples**: high-yield dairy cattle, disease-resistant wheat varieties, dogs bred for specific tasks",
                "**Disadvantages**: reduced genetic diversity → populations more vulnerable to new diseases; inbreeding issues"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 19,
      title: "Organisms and their Environment",
      intro: "Ecology is the study of relationships between organisms and their environment. All organisms depend on each other and on their physical surroundings. Energy flows through ecosystems via food chains and webs, while chemical elements like carbon and nitrogen are continuously cycled through biotic (living) and abiotic (non-living) components.",
      subheadings: [
        {
          title: "Food Chains and Webs",
          body: "A food chain shows the flow of energy from one organism to the next. The direction of arrows represents energy flow. In reality, most organisms eat more than one thing, so food chains interconnect to form food webs.",
          groups: [
            {
              bullets: [
                "Producers (plants) → Primary consumers (herbivores) → Secondary consumers → Tertiary consumers",
                "Each feeding level is called a **trophic level**",
                "Energy is lost at each trophic level (~90%) as heat from respiration, waste and movement",
                "Only ~10% of energy passes to the next level → explains why food chains are rarely longer than 4-5 steps",
                "Pyramid of numbers: shows number of organisms at each level (can be inverted e.g. tree → many caterpillars)",
                "Pyramid of biomass: shows dry mass at each level (almost always pyramid-shaped)"
              ]
            }
          ]
        },
        {
          title: "The Carbon Cycle",
          body: "Carbon is continuously cycled between living organisms and the abiotic environment. Photosynthesis removes CO₂; respiration and combustion return it. Decomposition by microorganisms is a critical step that returns carbon from dead organisms to the soil and atmosphere.",
          groups: [
            {
              bullets: [
                "**Photosynthesis**: removes CO₂ from atmosphere → fixes it into organic molecules",
                "**Respiration**: all organisms release CO₂ back into atmosphere",
                "**Decomposition**: bacteria and fungi break down dead organic matter → release CO₂",
                "**Combustion**: burning fossil fuels and wood releases CO₂ stored for millions of years",
                "Human activities (burning fossil fuels, deforestation) are increasing atmospheric CO₂ → greenhouse effect"
              ]
            }
          ]
        },
        {
          title: "The Nitrogen Cycle",
          body: "Nitrogen is essential for making proteins and nucleic acids. Atmospheric nitrogen (N₂) is unreactive and must be converted to usable forms. Various microorganisms play essential roles in the nitrogen cycle.",
          groups: [
            {
              bullets: [
                "**Nitrogen fixation**: Rhizobium bacteria (in root nodules) convert N₂ → ammonium (NH₄⁺)",
                "**Nitrification**: nitrifying bacteria in soil convert NH₄⁺ → nitrite → nitrate (NO₃⁻) — usable by plants",
                "**Assimilation**: plants absorb nitrate → make proteins; animals eat plants → use amino acids",
                "**Decomposition**: decomposers break down dead organisms → release NH₄⁺ back to soil",
                "**Denitrification**: denitrifying bacteria convert nitrate → N₂ (returned to atmosphere)"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 20,
      title: "Human Influences on Ecosystems",
      intro: "Human population growth and industrialisation have dramatically altered the natural environment. Pollution, deforestation and over-exploitation of resources threaten biodiversity. Conservation efforts aim to manage these impacts, balancing human needs with ecological sustainability.",
      subheadings: [
        {
          title: "Pollution",
          body: "Human activities release harmful substances into the air, water and soil. Understanding the sources and effects of pollutants is the first step toward addressing them.",
          groups: [
            {
              subTitle: "Air Pollution",
              bullets: [
                "**CO₂ and methane**: greenhouse gases → trap heat → global warming → climate change",
                "**SO₂ and NOₓ**: from burning fossil fuels → acid rain → damages forests, lakes, buildings",
                "**CFCs**: from old refrigerators → deplete ozone layer → increased UV reaching Earth",
                "**Carbon monoxide**: incomplete combustion → binds to haemoglobin → reduces O₂ transport"
              ]
            },
            {
              subTitle: "Water Pollution",
              bullets: [
                "**Eutrophication**: fertiliser runoff into water → algal bloom → algae die → bacteria decompose them → BOD increases → O₂ depleted → aquatic animals die",
                "**Oil spills**: coat birds' feathers, toxic to marine life",
                "**Sewage**: introduces pathogens, increases BOD, depletes oxygen"
              ]
            },
            {
              subTitle: "Land Pollution",
              bullets: [
                "**Pesticides**: may accumulate in food chains (biological magnification) — e.g. DDT",
                "**Deforestation**: removes carbon sinks; causes soil erosion; destroys habitats; reduces rainfall",
                "**Overgrazing**: destroys vegetation → erosion → desertification"
              ]
            }
          ]
        },
        {
          title: "Conservation",
          body: "Conservation aims to maintain biodiversity and ensure resources are used sustainably for future generations. It requires international cooperation and a balance between economic development and environmental protection.",
          groups: [
            {
              bullets: [
                "**Nature reserves and national parks**: protect habitats from development",
                "**Captive breeding programmes**: breed endangered species in zoos → reintroduce to wild",
                "**Seed banks**: store seeds of rare/endangered plant species (e.g. Svalbard Global Seed Vault)",
                "**Sustainable forestry**: replant trees; selective logging; certification schemes (FSC)",
                "**International agreements**: CITES (controls wildlife trade); Paris Agreement (climate)"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 21,
      title: "Biotechnology and Genetic Modification",
      intro: "Biotechnology uses living organisms or their components to develop products and processes. Traditional biotechnology (fermentation) has been used for millennia, but modern genetic engineering — using recombinant DNA technology to move genes between organisms — opens up extraordinary new possibilities and raises important ethical questions.",
      subheadings: [
        {
          title: "Fermentation",
          body: "Fermentation uses microorganisms (bacteria, yeast or fungi) to convert substrates into useful products. Industrial fermenters control conditions precisely to maximise yield.",
          groups: [
            {
              bullets: [
                "**Yoghurt**: Lactobacillus bacteria ferment lactose → lactic acid → milk proteins precipitate → yoghurt",
                "**Bread**: yeast ferments sugars → CO₂ makes dough rise; alcohol evaporates during baking",
                "**Beer/wine**: yeast ferments sugars → ethanol + CO₂",
                "**Penicillin**: Penicillium mould produces the antibiotic in industrial fermenters",
                "**Biogas**: anaerobic bacteria ferment waste organic matter → methane (used as fuel)"
              ]
            }
          ]
        },
        {
          title: "Genetic Engineering",
          body: "Genetic engineering allows scientists to isolate a gene from one organism and insert it into another, which then produces the desired protein. This technology has revolutionised medicine, agriculture and industry, but raises ethical questions about safety, consent and the nature of life.",
          groups: [
            {
              subTitle: "Procedure (Using Insulin Production as Example)",
              bullets: [
                "1. Identify and isolate the human insulin gene using restriction enzymes (cut at specific sequences)",
                "2. Cut open a bacterial plasmid (small circular DNA) with the same restriction enzyme → matching 'sticky ends'",
                "3. Insert the insulin gene into the plasmid using ligase enzyme (seals the joins) → recombinant plasmid",
                "4. Insert plasmid into bacterium (transformation)",
                "5. Bacteria reproduce rapidly → each produces human insulin → harvest and purify"
              ]
            },
            {
              subTitle: "Other Applications",
              bullets: [
                "**Golden rice**: genetically modified to produce beta-carotene (precursor to Vitamin A)",
                "**GM crops**: herbicide-resistant, pest-resistant, drought-tolerant crops to increase yields",
                "**Gene therapy**: replacing a faulty gene with a working copy to treat genetic diseases",
                "**Ethical concerns**: safety (allergenicity, unintended effects), biodiversity loss, corporate control of food supply, 'playing God'"
              ]
            }
          ]
        }
      ]
    },
  ]
};



// ── Chemistry 0620 ────────────────────────────────────────────────────────────

const CHEMISTRY: SubjectNotes = {
  id: "chemistry", name: "Chemistry", code: "0620", color: "bg-cyan-500",
  chapters: [
    {
      number: 1,
      title: "States of Matter",
      intro: "All matter exists in one of three physical states — solid, liquid or gas — and transitions between them when energy is transferred. The kinetic particle theory provides a model that explains the observable properties of each state and the processes of melting, boiling, condensation and dissolving. Understanding these concepts is foundational for all chemistry that follows.",
      subheadings: [
        {
          title: "The Three States of Matter",
          body: "Each state of matter has a distinctive set of properties that arise from the arrangement and movement of the particles within it. Chemists use the kinetic particle model to explain and predict these properties. In this model, all matter consists of tiny particles that are in constant random motion — the higher the temperature, the greater the average kinetic energy and the faster the motion.",
          groups: [
            {
              subTitle: "Solid",
              bullets: [
                "Particles are very close together and arranged in a regular, ordered lattice",
                "Particles vibrate about fixed positions — they do not have enough energy to move past each other",
                "Solids have a fixed shape and a fixed volume",
                "Solids are virtually incompressible because the particles are already as close together as repulsive forces allow",
                "Density is high because particles are closely packed"
              ]
            },
            {
              subTitle: "Liquid",
              bullets: [
                "Particles are close together but no longer in a fixed arrangement — they can slide past each other",
                "Particles move randomly with moderate kinetic energy",
                "Liquids have a fixed volume but take the shape of their container",
                "Liquids are almost incompressible but flow freely",
                "Surface tension arises because particles at the surface experience unequal attractions"
              ]
            },
            {
              subTitle: "Gas",
              bullets: [
                "Particles are very far apart — on average about ten times further apart than in a liquid",
                "Particles move randomly at high speeds in all directions with frequent collisions",
                "Gases have no fixed shape or volume — they expand to fill any container",
                "Gases are highly compressible because of the large spaces between particles",
                "Low density compared to solids and liquids"
              ]
            }
          ]
        },
        {
          title: "Changes of State",
          body: "When a substance gains or loses energy, its particles speed up or slow down. If enough energy is transferred, the arrangement of particles changes and a change of state occurs. During a change of state, the temperature remains constant even though energy is still being supplied — this energy is used to overcome forces between particles rather than to increase kinetic energy.",
          groups: [
            {
              subTitle: "Heating Changes",
              bullets: [
                "**Melting**: solid → liquid; energy overcomes the bonds/forces holding particles in fixed positions",
                "**Boiling/Evaporation**: liquid → gas; energy overcomes the forces holding particles together in the liquid",
                "**Sublimation**: solid → gas directly (e.g. dry ice, iodine at low pressure)",
                "The temperature at which a pure substance melts (melting point) or boils (boiling point) is fixed and characteristic — useful for identifying substances"
              ]
            },
            {
              subTitle: "Cooling Changes",
              bullets: [
                "**Condensation**: gas → liquid; particles lose energy and intermolecular forces pull them together",
                "**Freezing**: liquid → solid; particles slow enough to become fixed in a lattice",
                "Impurities lower the melting point and raise the boiling point of a substance — this is why roads are gritted in winter"
              ]
            }
          ]
        },
        {
          title: "Diffusion",
          body: "Diffusion is the net movement of particles from a region of high concentration to a region of low concentration as a result of random particle motion. It occurs in gases and liquids, where particles are free to move. Diffusion provides direct evidence for the particle model of matter.",
          groups: [
            {
              bullets: [
                "Gases diffuse faster than liquids because the particles have more kinetic energy and fewer obstacles",
                "**Rate of diffusion increases** with higher temperature (more kinetic energy) and lower molecular mass (lighter molecules move faster)",
                "**Classic demonstration**: bromine vapour diffusing into air; ammonia and hydrogen chloride producing ammonium chloride smoke ring in a tube",
                "In the ammonia-HCl experiment, the white ring forms closer to the HCl end because HCl molecules are heavier and diffuse more slowly"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Atoms, Elements and Compounds",
      intro: "Chemistry is fundamentally the study of atoms — the tiny building blocks of all matter. An element consists of only one type of atom; a compound contains two or more elements chemically combined. Understanding atomic structure, electronic configuration and the nature of chemical bonds allows us to predict and explain the behaviour of every substance in chemistry.",
      subheadings: [
        {
          title: "Atomic Structure",
          body: "The atom consists of a very small, dense nucleus surrounded by electrons moving in energy levels (shells). Almost all the mass of an atom is concentrated in the nucleus. The number of protons defines the element — every carbon atom has exactly 6 protons, every oxygen atom has 8. Understanding atomic number and mass number is essential for all subsequent chemistry.",
          groups: [
            {
              subTitle: "Subatomic Particles",
              bullets: [
                "**Proton**: relative mass 1, relative charge +1; found in nucleus",
                "**Neutron**: relative mass 1, relative charge 0; found in nucleus",
                "**Electron**: relative mass approximately 1/1836 (negligible), relative charge −1; found in shells around nucleus",
                "**Atomic number (Z)**: number of protons in the nucleus — defines the element",
                "**Mass number (A)**: total number of protons + neutrons in the nucleus",
                "**Number of electrons** = number of protons in a neutral atom"
              ]
            },
            {
              subTitle: "Isotopes",
              bullets: [
                "Isotopes are atoms of the **same element** with the **same number of protons** but **different numbers of neutrons**",
                "Example: Carbon-12 (6 protons, 6 neutrons) and Carbon-14 (6 protons, 8 neutrons)",
                "Isotopes have identical chemical properties because they have the same electronic structure",
                "Isotopes have different physical properties (e.g. density, rate of diffusion) because they have different masses",
                "**Relative atomic mass** (Ar) is the weighted average mass of the isotopes of an element relative to 1/12 the mass of Carbon-12"
              ]
            }
          ]
        },
        {
          title: "Electronic Configuration",
          body: "Electrons occupy shells (energy levels) around the nucleus. The pattern of electrons in each shell determines the chemical properties of an element and its position in the Periodic Table. The first shell holds a maximum of 2 electrons; the second and third shells each hold a maximum of 8.",
          groups: [
            {
              bullets: [
                "**Shell 1**: maximum 2 electrons (closest to nucleus, lowest energy)",
                "**Shell 2**: maximum 8 electrons",
                "**Shell 3**: maximum 8 electrons (for elements in periods 1-3)",
                "Write electronic configurations as numbers: e.g. sodium (Na, Z=11): 2, 8, 1",
                "The number of electrons in the **outer shell** equals the **group number** in the Periodic Table",
                "The number of **occupied shells** equals the **period number**",
                "Elements in the same group have the same number of outer electrons → similar chemical properties"
              ]
            }
          ]
        },
        {
          title: "Ionic Bonding",
          body: "Ionic bonds form when electrons are transferred from one atom to another, creating oppositely charged ions that attract each other. This typically occurs between metals (which lose electrons to form positive cations) and non-metals (which gain electrons to form negative anions). The resulting ionic compounds form giant lattice structures with high melting and boiling points.",
          groups: [
            {
              subTitle: "Formation of Ions",
              bullets: [
                "**Metals** lose electrons → form positive ions (cations): e.g. Na → Na⁺ + e⁻",
                "**Non-metals** gain electrons → form negative ions (anions): e.g. Cl + e⁻ → Cl⁻",
                "Both ions achieve a noble gas electron configuration (full outer shell)",
                "Example: sodium chloride (NaCl) — Na transfers 1e⁻ to Cl",
                "Example: magnesium oxide (MgO) — Mg transfers 2e⁻ to O"
              ]
            },
            {
              subTitle: "Properties of Ionic Compounds",
              bullets: [
                "**High melting and boiling points**: strong electrostatic forces between oppositely charged ions in the lattice require large amounts of energy to overcome",
                "**Conduct electricity when molten or dissolved**: ions are free to move and carry charge",
                "**Do not conduct when solid**: ions are fixed in lattice positions",
                "**Brittle**: layers shift under stress → like charges align → repulsion → the lattice shatters",
                "**Often soluble in water**: water molecules are polar and can surround and separate the ions"
              ]
            }
          ]
        },
        {
          title: "Covalent Bonding",
          body: "Covalent bonds form when two non-metal atoms share one or more pairs of electrons. Each shared pair constitutes one covalent bond. The shared electrons are attracted to both nuclei simultaneously, holding the atoms together. Covalent substances exist either as simple molecules or as giant covalent structures.",
          groups: [
            {
              subTitle: "Simple Molecules",
              bullets: [
                "Examples: H₂, Cl₂, H₂O, NH₃, CH₄, CO₂, HCl",
                "Low melting and boiling points — weak van der Waals forces between molecules (not the strong covalent bonds within)",
                "Do not conduct electricity — no charged particles free to move",
                "Often exist as gases or liquids at room temperature",
                "Single bond: one shared pair (e.g. H−Cl); double bond: two shared pairs (e.g. O=O); triple bond: three shared pairs (e.g. N≡N)"
              ]
            },
            {
              subTitle: "Giant Covalent Structures",
              bullets: [
                "**Diamond**: each carbon bonded to 4 others in tetrahedral lattice; very hard; very high melting point; does not conduct electricity",
                "**Graphite**: each carbon bonded to 3 others in layers; layers can slide (lubricant); conducts electricity because one electron per carbon is delocalised between layers",
                "**Silicon dioxide (SiO₂)**: every Si bonded to 4 O atoms; giant structure; very high melting point"
              ]
            }
          ]
        },
        {
          title: "Metallic Bonding",
          body: "In metals, the outer (valence) electrons are delocalised — they leave their parent atoms and move freely throughout the entire metal structure, forming a 'sea' of electrons. The metal ions (positive cores) are held in a lattice by their attraction to this delocalised electron cloud. This model explains the distinctive properties of metals.",
          groups: [
            {
              bullets: [
                "**Good conductors of electricity and heat**: delocalised electrons carry charge and thermal energy through the lattice",
                "**Malleable and ductile**: layers of metal ions can slide past each other without disrupting the bonding (the electron sea adjusts)",
                "**High melting and boiling points**: strong attraction between metal ions and electron sea requires large amounts of energy to overcome",
                "**Lustrous (shiny)**: free electrons reflect light of all wavelengths",
                "**Alloys**: mixing two or more metals distorts the lattice → layers cannot slide as easily → harder and stronger than pure metal"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Stoichiometry",
      intro: "Stoichiometry is the branch of chemistry concerned with the quantitative relationships between reactants and products in chemical reactions. It is built on the concept of the mole — the chemist's counting unit — and the balanced chemical equation. Mastering mole calculations is absolutely essential: virtually every quantitative question in chemistry uses these principles.",
      subheadings: [
        {
          title: "Relative Masses and the Mole",
          body: "The mole is the SI unit for amount of substance. One mole of any substance contains exactly 6.02 × 10²³ particles (Avogadro's number). This number was chosen so that one mole of an element has a mass in grams equal to its relative atomic mass. The mole concept bridges the invisible atomic scale and the measurable mass scale of the laboratory.",
          groups: [
            {
              bullets: [
                "**Relative atomic mass (Ar)**: weighted average mass of one atom of an element relative to 1/12 the mass of ¹²C",
                "**Relative molecular mass (Mr)**: sum of the Ar values of all atoms in the molecular formula",
                "**Relative formula mass (Mr)**: used for ionic compounds — sum of Ar of all ions in formula unit",
                "**Molar mass**: the mass of one mole of a substance in g/mol; numerically equal to the Mr",
                "**Formula:** moles = mass (g) ÷ molar mass (g/mol)",
                "**Example:** How many moles in 44 g of CO₂? Mr(CO₂) = 12 + (2×16) = 44; moles = 44/44 = 1.0 mol"
              ]
            }
          ]
        },
        {
          title: "Empirical and Molecular Formulae",
          body: "The empirical formula gives the simplest whole-number ratio of atoms of each element in a compound. The molecular formula gives the actual number of atoms of each element in one molecule. They may be the same (e.g. water: H₂O) or different (e.g. ethene: empirical CH₂, molecular C₂H₄). These formulae are determined experimentally from percentage composition data.",
          groups: [
            {
              subTitle: "Steps to Find Empirical Formula from % Composition",
              bullets: [
                "1. Write the percentage of each element",
                "2. Divide each percentage by the Ar of that element → gives moles ratio",
                "3. Divide all values by the smallest → gives simplest ratio",
                "4. If ratios are not whole numbers, multiply through by 2, 3 etc. until they are",
                "**Example:** Compound: 40% C, 6.7% H, 53.3% O",
                "  C: 40/12 = 3.33 | H: 6.7/1 = 6.7 | O: 53.3/16 = 3.33",
                "  Divide by 3.33 → C:1, H:2, O:1 → Empirical formula = CH₂O"
              ]
            }
          ]
        },
        {
          title: "Moles in Solution and Gas Calculations",
          body: "In addition to mass calculations, chemists frequently work with solutions (where concentration is measured in mol/dm³) and gases (where volume at room temperature can be used). These additional mole relationships are frequently tested in IGCSE chemistry calculations.",
          groups: [
            {
              subTitle: "Solutions",
              bullets: [
                "**Concentration** (mol/dm³) = moles ÷ volume (dm³)",
                "**Moles** = concentration × volume (dm³); remember: 1 dm³ = 1 litre = 1000 cm³",
                "**Example:** 0.1 mol/dm³ HCl, 25 cm³: moles = 0.1 × (25/1000) = 0.0025 mol"
              ]
            },
            {
              subTitle: "Gases",
              bullets: [
                "At room temperature and pressure (r.t.p.), one mole of any gas occupies **24 dm³** (24,000 cm³)",
                "**Moles of gas** = volume (dm³) ÷ 24",
                "**Example:** 6 dm³ of CO₂ at r.t.p.: moles = 6/24 = 0.25 mol",
                "At standard temperature and pressure (s.t.p., 0°C, 1 atm), molar volume = 22.4 dm³"
              ]
            },
            {
              subTitle: "Reacting Masses from Equations",
              bullets: [
                "1. Write balanced equation",
                "2. Write mole ratio from equation coefficients",
                "3. Calculate moles of known substance",
                "4. Use ratio to find moles of unknown",
                "5. Convert moles to mass using molar mass",
                "**Example:** 2Mg + O₂ → 2MgO; how much MgO from 12 g Mg?",
                "  Moles Mg = 12/24 = 0.5 mol; ratio Mg:MgO = 1:1; moles MgO = 0.5 mol; mass MgO = 0.5 × 40 = 20 g"
              ]
            }
          ]
        },
        {
          title: "Percentage Yield and Purity",
          body: "In practice, chemical reactions rarely produce as much product as theory predicts. The percentage yield compares the actual amount obtained to the theoretical maximum. Purity analysis tells us what fraction of a sample is the desired substance.",
          groups: [
            {
              bullets: [
                "**% yield** = (actual yield / theoretical yield) × 100",
                "Reasons yield is less than 100%: reversible reactions, side reactions, product lost during transfer, incomplete reaction",
                "**% purity** = (mass of pure substance / total mass of sample) × 100",
                "High purity is critical in pharmaceuticals and food chemistry"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Electrochemistry",
      intro: "Electrochemistry explores how electrical energy can drive non-spontaneous chemical reactions (electrolysis) and how chemical reactions can generate electrical energy (electrochemical cells). Electrolysis is a vital industrial process used to extract reactive metals, purify metals, and manufacture chemicals. Understanding what happens at each electrode and why is central to this topic.",
      subheadings: [
        {
          title: "Electrolysis — Principles",
          body: "Electrolysis is the decomposition of an ionic compound (in the molten state or in aqueous solution) by passing a direct electric current through it. The compound must contain ions that are free to move. Positive ions (cations) migrate to the negative electrode (cathode); negative ions (anions) migrate to the positive electrode (anode).",
          groups: [
            {
              bullets: [
                "**Electrolyte**: the ionic compound being electrolysed (molten or in solution)",
                "**Cathode (negative electrode)**: cations gain electrons → **reduction** occurs",
                "**Anode (positive electrode)**: anions lose electrons → **oxidation** occurs",
                "Memory aid: **OIL RIG** — Oxidation Is Loss, Reduction Is Gain (of electrons)",
                "A.N.O. — Anode, Negative, Oxidation? No — Anode is Positive, not negative. Careful with electrode charges.",
                "**Inert electrodes** (graphite or platinum) do not react during electrolysis; **reactive electrodes** (copper) can dissolve"
              ]
            }
          ]
        },
        {
          title: "Electrolysis of Molten Compounds",
          body: "When an ionic compound is heated until it melts, the ions become free to move. Electrolysis of molten compounds is the only way to extract the most reactive metals (Group 1, Group 2, aluminium) because carbon reduction is not powerful enough. The products are always the pure elements.",
          groups: [
            {
              subTitle: "Example: Molten Lead Bromide (PbBr₂)",
              bullets: [
                "**At cathode (−)**: Pb²⁺ + 2e⁻ → Pb (lead metal deposited)",
                "**At anode (+)**: 2Br⁻ → Br₂ + 2e⁻ (bromine gas evolved)",
                "Overall: PbBr₂ → Pb + Br₂"
              ]
            },
            {
              subTitle: "Industrial Example: Extraction of Aluminium (Hall-Héroult Process)",
              bullets: [
                "Aluminium ore (bauxite) is refined to aluminium oxide (Al₂O₃), called alumina",
                "Alumina is dissolved in molten cryolite (Na₃AlF₆) to lower the melting point from 2050°C to ~950°C → saves energy",
                "**At cathode**: Al³⁺ + 3e⁻ → Al (liquid aluminium sinks to bottom, tapped off)",
                "**At anode**: 2O²⁻ → O₂ + 4e⁻ (oxygen produced; reacts with carbon anodes → CO₂)",
                "Carbon anodes burn away and must be replaced regularly",
                "Aluminium is used for aircraft, cans, foil — its oxide layer makes it resistant to corrosion"
              ]
            }
          ]
        },
        {
          title: "Electrolysis of Aqueous Solutions",
          body: "When an ionic compound dissolves in water, both the ions of the compound and the ions from water (H⁺ and OH⁻) are present. At each electrode, the ion that is more easily discharged is preferentially discharged. The rules for deciding which ion is discharged are based on concentration and the position in the electrochemical series.",
          groups: [
            {
              subTitle: "Discharge Rules",
              bullets: [
                "**At cathode**: the less reactive (lower in reactivity series) metal ion is preferentially discharged over H⁺; but if the metal is very reactive (e.g. Na, K, Ca), H₂ is evolved instead",
                "**At anode**: if halide ions (Cl⁻, Br⁻, I⁻) are present in high concentration, the halogen is discharged; otherwise O₂ is evolved from OH⁻"
              ]
            },
            {
              subTitle: "Electrolysis of Brine (Concentrated NaCl solution) — Industrial",
              bullets: [
                "**At cathode**: 2H⁺ + 2e⁻ → H₂ (hydrogen gas)",
                "**At anode**: 2Cl⁻ → Cl₂ + 2e⁻ (chlorine gas)",
                "**Remaining solution**: NaOH (sodium hydroxide)",
                "Three products: hydrogen (fuel cells, margarine), chlorine (bleach, PVC, disinfectants), sodium hydroxide (paper, soap, ceramics)"
              ]
            },
            {
              subTitle: "Electrolysis of Copper Sulfate Solution",
              bullets: [
                "**Using inert electrodes**: Cu²⁺ + 2e⁻ → Cu at cathode; 2H₂O → O₂ + 4H⁺ + 4e⁻ at anode; solution becomes more acidic",
                "**Using copper electrodes (purification)**: Cu²⁺ + 2e⁻ → Cu at cathode (pure copper deposited); Cu → Cu²⁺ + 2e⁻ at anode (impure copper dissolves); concentration of CuSO₄ remains constant",
                "This method purifies copper from ~99% to >99.99% — essential for electrical wiring"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Chemical Energetics",
      intro: "Every chemical reaction involves an energy change — either releasing energy to the surroundings (exothermic) or absorbing energy from the surroundings (endothermic). These energy changes are central to industrial chemistry, biological processes and our everyday use of fuels. Understanding enthalpy changes, bond energies and energy profiles allows chemists to predict whether reactions will release or absorb heat.",
      subheadings: [
        {
          title: "Exothermic and Endothermic Reactions",
          body: "In an exothermic reaction, the chemical energy of the reactants is greater than that of the products. The difference is released as heat, causing the temperature of the surroundings to increase. In an endothermic reaction, the products contain more energy than the reactants — energy is absorbed from the surroundings, causing the temperature to fall.",
          groups: [
            {
              subTitle: "Exothermic Reactions",
              bullets: [
                "Products have lower energy than reactants → energy released to surroundings",
                "Temperature of surroundings **increases**",
                "Enthalpy change ΔH is **negative** (e.g. −890 kJ/mol for combustion of methane)",
                "**Examples**: combustion of fuels, neutralisation of acid with alkali, respiration, many oxidation reactions, rusting",
                "Industrial importance: exothermic reactions are exploited in hand warmers, self-heating cans"
              ]
            },
            {
              subTitle: "Endothermic Reactions",
              bullets: [
                "Products have higher energy than reactants → energy absorbed from surroundings",
                "Temperature of surroundings **decreases**",
                "Enthalpy change ΔH is **positive**",
                "**Examples**: thermal decomposition (e.g. calcium carbonate → calcium oxide + CO₂), photosynthesis, dissolving ammonium nitrate in water",
                "Applications: cold packs used in sports injuries exploit endothermic dissolving reactions"
              ]
            }
          ]
        },
        {
          title: "Bond Energies",
          body: "Energy is always required to break chemical bonds (endothermic process) and always released when bonds are formed (exothermic process). The overall energy change of a reaction can be calculated by comparing the energy needed to break all bonds in the reactants with the energy released when all bonds in the products are formed.",
          groups: [
            {
              bullets: [
                "**Bond breaking**: always requires energy input (endothermic); bond energy = energy needed to break one mole of that bond in gaseous molecules",
                "**Bond forming**: always releases energy (exothermic)",
                "**Formula**: ΔH = Σ(bond energies broken) − Σ(bond energies formed)",
                "If more energy is released in forming bonds than used in breaking them → ΔH negative → exothermic",
                "If more energy is used breaking bonds than released → ΔH positive → endothermic",
                "**Example calculation**: H₂ + Cl₂ → 2HCl",
                "  Energy to break: H−H (436 kJ) + Cl−Cl (243 kJ) = 679 kJ",
                "  Energy released forming: 2 × H−Cl (2 × 432 = 864 kJ)",
                "  ΔH = 679 − 864 = −185 kJ/mol (exothermic)"
              ]
            }
          ]
        },
        {
          title: "Energy Level Diagrams",
          body: "Energy level diagrams (also called enthalpy/reaction profiles) show the energy of reactants and products and how energy changes during a reaction. They also show the activation energy — the minimum energy that reacting particles must have for the reaction to occur.",
          groups: [
            {
              bullets: [
                "**Activation energy (Ea)**: shown as the energy 'hill' or 'hump' between reactants and products",
                "In an **exothermic** diagram: products are drawn at lower energy than reactants; ΔH negative",
                "In an **endothermic** diagram: products are drawn at higher energy than reactants; ΔH positive",
                "A catalyst provides an alternative reaction pathway with **lower activation energy** — shown as a lower hump on the same diagram",
                "The catalyst does not change the energy of reactants or products (ΔH remains the same) — it only lowers Ea"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Chemical Reactions",
      intro: "Understanding how fast reactions occur and what controls their rate is practically important in industry, medicine and everyday life. This chapter also covers the concept of reversibility — many reactions do not go to completion but reach a state of dynamic equilibrium. Le Chatelier's principle allows chemists to predict how equilibria respond to changes in conditions.",
      subheadings: [
        {
          title: "Rate of Reaction",
          body: "The rate of a chemical reaction is defined as the change in concentration of a reactant or product per unit time. For a reaction to occur, particles must collide with sufficient energy (at least equal to the activation energy) and in the correct orientation. This is called the collision theory.",
          groups: [
            {
              subTitle: "Factors Affecting Rate",
              bullets: [
                "**Concentration** (solutions): higher concentration → more particles per unit volume → more frequent collisions → faster rate",
                "**Pressure** (gases): higher pressure → gas particles pushed closer together → more frequent collisions → faster rate",
                "**Surface area** (solids): smaller particle size → greater surface area exposed → more frequent collisions with other reactants → faster rate",
                "**Temperature**: higher temperature → particles have more kinetic energy → more frequent AND more energetic collisions → significantly faster rate; a 10°C rise roughly doubles the rate",
                "**Catalyst**: provides an alternative reaction pathway with lower activation energy → more particles have sufficient energy to react → faster rate; catalyst is unchanged at end of reaction"
              ]
            },
            {
              subTitle: "Measuring Rate",
              bullets: [
                "**Gas evolution**: measure volume of gas collected vs time (e.g. acid + marble chips → CO₂)",
                "**Loss of mass**: weigh flask as gas escapes; rate = mass lost per second",
                "**Change in turbidity**: solution becomes cloudy as precipitate forms (e.g. sodium thiosulfate + acid)",
                "Rate graphs: gradient of concentration vs time graph = rate at that moment; steeper gradient = faster rate"
              ]
            }
          ]
        },
        {
          title: "Reversible Reactions and Equilibrium",
          body: "Some reactions are reversible — the products can react together to reform the original reactants. When both the forward and reverse reactions occur at the same rate in a closed system, the concentrations of reactants and products stop changing. This state is called dynamic equilibrium — the reactions continue but there is no net change in composition.",
          groups: [
            {
              bullets: [
                "Reversible reactions use the ⇌ symbol in the equation",
                "At equilibrium: **rate of forward reaction = rate of reverse reaction**",
                "Concentrations are constant but not necessarily equal — the position of equilibrium may favour products or reactants",
                "If Kc >> 1: equilibrium lies to the right (mostly products)",
                "If Kc << 1: equilibrium lies to the left (mostly reactants)"
              ]
            }
          ]
        },
        {
          title: "Le Chatelier's Principle",
          body: "Le Chatelier's principle states: if a system at equilibrium is subjected to a change, the equilibrium will shift in the direction that opposes the change and restores equilibrium. This principle is applied in industrial processes to maximise yield by choosing optimal conditions.",
          groups: [
            {
              subTitle: "Effects on Position of Equilibrium",
              bullets: [
                "**Increasing concentration of reactant** → equilibrium shifts right (to use up the extra reactant) → more products formed",
                "**Decreasing concentration of product** → equilibrium shifts right → more products formed",
                "**Increasing temperature**: equilibrium shifts in the endothermic direction (to absorb extra heat)",
                "**Decreasing temperature**: equilibrium shifts in the exothermic direction",
                "**Increasing pressure** (gases): equilibrium shifts towards the side with fewer moles of gas",
                "**Catalyst**: does NOT change the position of equilibrium — only speeds up the rate at which equilibrium is reached"
              ]
            },
            {
              subTitle: "Industrial Application — Haber Process (N₂ + 3H₂ ⇌ 2NH₃)",
              bullets: [
                "Forward reaction is exothermic → lower temperature favours more ammonia, but very slow rate",
                "Fewer moles on right (2) than left (4) → higher pressure favours more ammonia",
                "**Compromise conditions**: 450°C (balance between reasonable rate and acceptable yield), 200 atm, iron catalyst",
                "Ammonia is liquefied and removed as it forms → equilibrium shifts right (Le Chatelier)"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 7,
      title: "Acids, Bases and Salts",
      intro: "Acids and bases are fundamental to chemistry, biology and everyday life. Acids produce hydrogen ions (H⁺) in solution; bases neutralise acids. The pH scale measures the concentration of H⁺ ions, ranging from 0 (strongly acidic) to 14 (strongly alkaline). This chapter covers the reactions of acids, the preparation of salts and the practical techniques of titration — skills that will appear in both written papers and practicals.",
      subheadings: [
        {
          title: "Acids and Bases",
          body: "An acid is a substance that produces hydrogen ions (H⁺) when dissolved in water. A base is a substance that neutralises an acid to produce a salt and water only. An alkali is a soluble base — it produces hydroxide ions (OH⁻) in solution. The Arrhenius and Brønsted-Lowry definitions are both useful at IGCSE level.",
          groups: [
            {
              subTitle: "Common Acids",
              bullets: [
                "**Hydrochloric acid (HCl)**: strong acid, fully dissociates → H⁺ + Cl⁻",
                "**Sulfuric acid (H₂SO₄)**: strong diprotic acid → 2H⁺ + SO₄²⁻",
                "**Nitric acid (HNO₃)**: strong acid → H⁺ + NO₃⁻",
                "**Ethanoic acid (CH₃COOH)**: weak acid, only partially dissociates — found in vinegar",
                "**Citric acid**: weak acid in fruits"
              ]
            },
            {
              subTitle: "Common Bases and Alkalis",
              bullets: [
                "**Sodium hydroxide (NaOH)**: strong alkali, fully dissociates",
                "**Potassium hydroxide (KOH)**: strong alkali",
                "**Calcium hydroxide (Ca(OH)₂)**: sparingly soluble; solution called limewater",
                "**Ammonia solution (NH₃(aq))**: weak alkali; NH₃ + H₂O ⇌ NH₄⁺ + OH⁻",
                "**Metal oxides and hydroxides**: insoluble bases"
              ]
            },
            {
              subTitle: "The pH Scale",
              bullets: [
                "pH 0-6: **acidic** (lower pH = more acidic = higher [H⁺])",
                "pH 7: **neutral** (pure water at 25°C)",
                "pH 8-14: **alkaline** (higher pH = more alkaline = higher [OH⁻])",
                "**Universal indicator** turns a range of colours; pH meter gives a precise reading",
                "Strong acids have lower pH than weak acids of the same concentration — because strong acids fully dissociate"
              ]
            }
          ]
        },
        {
          title: "Reactions of Acids",
          body: "Acids undergo characteristic reactions with metals, metal oxides/hydroxides, metal carbonates/hydrogencarbonates, and ammonia. In every case, a salt is produced. The name of the salt depends on both the acid used and the base or metal reacted.",
          groups: [
            {
              bullets: [
                "**Acid + reactive metal** → salt + hydrogen gas; e.g. Zn + H₂SO₄ → ZnSO₄ + H₂",
                "**Acid + metal oxide** → salt + water; e.g. CuO + 2HCl → CuCl₂ + H₂O",
                "**Acid + metal hydroxide (neutralisation)** → salt + water; e.g. NaOH + HCl → NaCl + H₂O",
                "**Acid + metal carbonate** → salt + water + carbon dioxide; e.g. CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂",
                "**Acid + ammonia** → ammonium salt; e.g. NH₃ + HNO₃ → NH₄NO₃ (ammonium nitrate — fertiliser)"
              ]
            }
          ]
        },
        {
          title: "Preparing Salts",
          body: "Different preparation methods are used depending on whether the salt required is soluble or insoluble and which acid is being used. Mastering these methods is essential for practical chemistry.",
          groups: [
            {
              subTitle: "Method 1: Soluble Salts from Insoluble Base",
              bullets: [
                "Add excess insoluble metal oxide or carbonate to warm acid → salt forms in solution",
                "Filter to remove excess base; evaporate filtrate to crystallise the salt",
                "Example: excess CuO added to dilute H₂SO₄ → CuSO₄ solution → blue crystals of CuSO₄·5H₂O"
              ]
            },
            {
              subTitle: "Method 2: Soluble Salts by Titration (acid + alkali)",
              bullets: [
                "Use indicator to find exact volume of acid needed to neutralise alkali",
                "Repeat without indicator using same volumes; evaporate to crystallise",
                "Example: NaOH + HCl → NaCl; excess NaOH must not be used",
                "No indicator used in final run — indicator would contaminate salt"
              ]
            },
            {
              subTitle: "Method 3: Insoluble Salts by Precipitation",
              bullets: [
                "Mix two solutions, each containing one of the ions needed for the salt",
                "The insoluble salt precipitates immediately",
                "Filter, wash with distilled water, dry",
                "Example: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s) yellow precipitate"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 8,
      title: "The Periodic Table",
      intro: "The Periodic Table is chemistry's most powerful organisational tool. Elements are arranged in order of increasing atomic number in rows (periods) and columns (groups) such that elements with similar properties appear in the same group. Understanding periodic trends — how properties vary across periods and down groups — allows chemists to make predictions about elements they have never directly studied.",
      subheadings: [
        {
          title: "Structure of the Periodic Table",
          body: "The modern Periodic Table was developed by Mendeleev in 1869, who arranged elements in order of relative atomic mass and noticed repeating patterns. Today we use atomic number (proton number) as the ordering principle. The table is divided into periods (horizontal rows) and groups (vertical columns numbered 1-7, then 0 for noble gases).",
          groups: [
            {
              bullets: [
                "**Period number** = number of electron shells occupied",
                "**Group number** = number of electrons in the outermost shell",
                "**Metals** are to the left and below a diagonal line; **non-metals** are to the upper right",
                "**Metalloids (semi-metals)** like silicon and germanium lie along the diagonal and have intermediate properties",
                "**Transition metals** occupy the central block (periods 4-7)"
              ]
            }
          ]
        },
        {
          title: "Trends Across a Period (Period 3: Na to Ar)",
          body: "As we move across a period from left to right, the atomic number increases by one. The outer electrons are in the same shell but the nuclear charge increases, pulling electrons closer. This creates systematic trends in physical and chemical properties.",
          groups: [
            {
              bullets: [
                "**Atomic radius decreases**: increasing nuclear charge attracts outer electrons more strongly, pulling them closer",
                "**Ionisation energy increases**: harder to remove an electron as nuclear attraction increases",
                "**Electronegativity increases**: ability to attract bonding electrons increases left to right",
                "**Metallic character decreases** and **non-metallic character increases** across a period",
                "**Nature of oxides**: Na₂O, MgO, Al₂O₃ are basic; SiO₂ is neutral/acidic; SO₃, Cl₂O₇ are acidic"
              ]
            }
          ]
        },
        {
          title: "Group 1 — The Alkali Metals",
          body: "Group 1 elements (lithium, sodium, potassium, rubidium, caesium, francium) are highly reactive metals that all have one electron in their outer shell. They lose this electron easily to form +1 ions, and their reactivity increases down the group as the outer electron becomes further from the nucleus and more easily lost.",
          groups: [
            {
              bullets: [
                "**Reaction with cold water**: metal + water → metal hydroxide + hydrogen; e.g. 2Na + 2H₂O → 2NaOH + H₂",
                "Li: reacts steadily, bubbles; Na: reacts vigorously, melts to a ball, may catch fire; K: reacts very vigorously, lilac flame, often explosive",
                "**Reaction with oxygen**: 4Li + O₂ → 2Li₂O; forms white oxide",
                "**Reaction with chlorine**: 2Na + Cl₂ → 2NaCl; forms white ionic chloride",
                "**Down the group**: atomic radius increases; ionisation energy decreases; reactivity increases; melting/boiling points decrease",
                "Stored under oil to prevent reaction with air and moisture"
              ]
            }
          ]
        },
        {
          title: "Group 7 — The Halogens",
          body: "Group 7 elements (fluorine, chlorine, bromine, iodine, astatine) are non-metals that all have seven electrons in their outer shell. They readily gain one electron to form −1 ions. Their reactivity decreases down the group as the incoming electron is further from the nucleus and the shielding effect of inner shells increases.",
          groups: [
            {
              subTitle: "Physical Properties",
              bullets: [
                "F₂: pale yellow gas; Cl₂: yellow-green gas; Br₂: brown/orange liquid; I₂: grey-black solid, purple vapour",
                "Melting and boiling points **increase** down the group as van der Waals forces become stronger",
                "All exist as diatomic molecules (F₂, Cl₂, Br₂, I₂)"
              ]
            },
            {
              subTitle: "Reactions",
              bullets: [
                "**With hydrogen**: H₂ + X₂ → 2HX; less vigorous down the group (F₂ explosive in dark; I₂ very slow even with heat)",
                "**With iron**: 2Fe + 3Cl₂ → 2FeCl₃ (iron(III) chloride)",
                "**Halogen displacement**: a more reactive halogen displaces a less reactive one from its salt solution",
                "Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq) (solution turns orange)",
                "Cl₂(aq) + 2KI(aq) → 2KCl(aq) + I₂(aq) (solution turns brown/black)",
                "Br₂ does NOT displace Cl (bromine is less reactive than chlorine)"
              ]
            }
          ]
        },
        {
          title: "Group 0 — The Noble Gases",
          body: "Group 0 elements (helium, neon, argon, krypton, xenon, radon) are chemically inert under normal conditions because they have completely filled outer electron shells. Their stability makes them ideal for applications requiring non-reactive gases.",
          groups: [
            {
              bullets: [
                "All exist as monatomic gases (single atoms, not molecules)",
                "He and Ne: completely full outer shell (2 and 8 electrons respectively); other noble gases also have full outer shells",
                "Do not normally form bonds (though some xenon compounds exist under extreme conditions)",
                "**Helium**: used in balloons and airships (less dense than air, not flammable)",
                "**Neon**: used in advertising signs (glows red-orange when electric current passed through)",
                "**Argon**: used to fill incandescent light bulbs and as inert atmosphere in welding",
                "Boiling points increase down the group (larger atoms → stronger London dispersion forces)"
              ]
            }
          ]
        },
        {
          title: "Transition Metals",
          body: "The transition metals occupy the central block of the Periodic Table (periods 4-7). They have distinctive properties that set them apart from Group 1 and 2 metals. These properties arise from their partially filled d-subshells, which allow them to form variable oxidation states and complex ions.",
          groups: [
            {
              bullets: [
                "**High density, hardness and melting points**: strong metallic bonding in a compact lattice",
                "**Variable oxidation states**: e.g. iron exists as Fe²⁺ and Fe³⁺; copper as Cu⁺ and Cu²⁺; manganese as Mn²⁺, Mn⁴⁺, Mn⁷⁺",
                "**Form coloured compounds**: e.g. Cu²⁺ solutions are blue; Fe²⁺ pale green; Fe³⁺ orange-brown; Cr³⁺ green",
                "**Act as catalysts**: Fe in Haber process (ammonia); V₂O₅ in Contact process (sulfuric acid); Ni in hydrogenation of oils; Pt in catalytic converters",
                "**Form complex ions**: transition metal ion surrounded by ligands (molecules or ions donating electron pairs)",
                "Less reactive than Group 1 and 2 metals — do not react with cold water"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 9,
      title: "Metals",
      intro: "Metals are the most abundant type of element in the Periodic Table, making up about 75% of all known elements. They are extracted from ores by methods that depend on their position in the reactivity series — a rank ordering of metals by their tendency to lose electrons and form positive ions. Understanding the reactivity series, extraction methods and uses of metals (especially alloys) is central to both chemistry and real-world applications.",
      subheadings: [
        {
          title: "The Reactivity Series",
          body: "The reactivity series ranks metals in order of their reactivity — their tendency to form positive ions by losing electrons. The most reactive metals at the top lose electrons most easily; unreactive metals at the bottom rarely form ions. The series is established experimentally by observing reactions with water, acids and displacement reactions.",
          groups: [
            {
              bullets: [
                "Order (most to least reactive): K, Na, Ca, Mg, Al, (C — carbon), Zn, Fe, Sn, Pb, (H — hydrogen), Cu, Ag, Au, Pt",
                "Metals above carbon (K, Na, Ca, Mg, Al) must be extracted by electrolysis",
                "Metals below carbon but above hydrogen (Zn, Fe, Sn, Pb) can be extracted by reduction with carbon (coke)",
                "Metals below hydrogen (Cu, Ag, Au, Pt) are found native or need only gentle heating"
              ]
            },
            {
              subTitle: "Reactions That Define Position",
              bullets: [
                "**With cold water**: K, Na, Ca react vigorously; Mg reacts slowly; others don't react",
                "**With steam**: Mg, Al, Zn, Fe react with steam to form metal oxide + H₂",
                "**With dilute acid**: Mg, Al, Zn, Fe, Sn, Pb react; Cu, Ag, Au don't react",
                "**Displacement**: more reactive metal displaces less reactive from its salt solution; e.g. Zn + CuSO₄ → ZnSO₄ + Cu"
              ]
            }
          ]
        },
        {
          title: "Extraction of Metals",
          body: "The method used to extract a metal from its ore depends on its reactivity. More reactive metals form more stable compounds and require more energy (and more powerful reducing agents) to extract. The economics of extraction must also be considered — aluminium requires large amounts of electricity, making it expensive despite being abundant.",
          groups: [
            {
              subTitle: "Extraction by Carbon Reduction — Iron (Blast Furnace)",
              bullets: [
                "Raw materials: haematite (Fe₂O₃), coke (carbon), limestone (CaCO₃), hot air",
                "**Step 1**: Coke burns: C + O₂ → CO₂; then CO₂ + C → 2CO (carbon monoxide — the actual reducing agent)",
                "**Step 2**: Carbon monoxide reduces iron oxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂",
                "**Step 3**: Limestone decomposes: CaCO₃ → CaO + CO₂; CaO removes acidic silica impurity: CaO + SiO₂ → CaSiO₃ (slag)",
                "Molten iron sinks to bottom; slag floats on top; both are tapped off separately",
                "Pig iron (cast iron) is ~96% Fe + impurities; must be converted to steel by removing excess carbon"
              ]
            },
            {
              subTitle: "Uses of Metals and Alloys",
              bullets: [
                "**Pure iron**: too soft for structural uses — layers of atoms slide easily",
                "**Steel**: iron + carbon (0.1-1.5%) — harder because carbon atoms distort the lattice, preventing layer sliding",
                "**Stainless steel**: iron + chromium + nickel — resists corrosion; used in cutlery, surgical instruments",
                "**Bronze**: copper + tin — harder than either pure metal; used historically for tools and weapons",
                "**Brass**: copper + zinc — golden colour, corrosion resistant; used in musical instruments, plumbing",
                "**Aluminium alloys**: aluminium + small amounts of Cu, Mg, Mn — strong and light; aircraft and bicycle frames"
              ]
            }
          ]
        },
        {
          title: "Rusting and Corrosion",
          body: "Rusting is the specific corrosion of iron in the presence of both water and oxygen, producing hydrated iron(III) oxide (Fe₂O₃·xH₂O). It is an electrochemical process and an enormous economic problem — approximately 25% of all steel produced is to replace rusted structures. Prevention methods exploit either physical barriers or sacrificial protection.",
          groups: [
            {
              bullets: [
                "**Conditions required**: both water AND oxygen must be present; either alone is insufficient",
                "Salt water accelerates rusting (electrolyte increases electrical conductivity)",
                "Acid rain also accelerates rusting"
              ]
            },
            {
              subTitle: "Prevention Methods",
              bullets: [
                "**Physical barriers** — exclude water and oxygen: painting, oiling/greasing, plastic coating, tin plating (e.g. tin cans)",
                "**Galvanising**: coating iron with zinc; even if zinc layer is scratched, zinc acts as sacrificial anode (zinc is above iron in reactivity series → zinc oxidises preferentially)",
                "**Sacrificial protection (cathodic protection)**: attach a more reactive metal (zinc or magnesium) to the iron structure; reactive metal corrodes instead; used on ships, oil rigs, underground pipelines",
                "**Stainless steel**: alloying iron with chromium and nickel; chromium forms a thin, adherent oxide layer that prevents further oxidation",
                "**Tin plating** (used for food cans): if tin layer scratched, iron corrodes first — tin is below iron in reactivity series and offers NO sacrificial protection"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 10,
      title: "Chemistry of the Environment",
      intro: "Human industrial and agricultural activities have significantly altered the natural chemical composition of the atmosphere, hydrosphere and lithosphere. This chapter explores the composition of clean air, the chemistry of water, the causes and effects of major pollutants, and the strategies used to treat water and reduce atmospheric pollution. Understanding these processes is increasingly important as environmental chemistry becomes a global concern.",
      subheadings: [
        {
          title: "Composition of the Atmosphere",
          body: "The atmosphere is a layer of gases surrounding Earth held in place by gravity. Its composition has changed dramatically over Earth's 4.5-billion-year history. The modern atmosphere (unpolluted, dry air) has a relatively stable composition that has persisted for millions of years, though human activities are now altering it.",
          groups: [
            {
              bullets: [
                "**Nitrogen (N₂)**: ~78% — relatively unreactive; produced by volcanic outgassing and later by denitrifying bacteria",
                "**Oxygen (O₂)**: ~21% — produced by photosynthesis over billions of years",
                "**Argon (Ar)**: ~1% — noble gas, completely inert",
                "**Carbon dioxide (CO₂)**: ~0.04% — essential for photosynthesis; greenhouse gas",
                "**Water vapour**: variable (0-4%) — depends on temperature and location",
                "**Trace gases**: other noble gases (He, Ne, Kr, Xe), methane, ozone"
              ]
            }
          ]
        },
        {
          title: "Air Pollution",
          body: "Human activities — particularly the combustion of fossil fuels, industrial processes and agriculture — release pollutants into the atmosphere. These pollutants cause a range of environmental and health problems. Understanding the source, chemistry and effects of each pollutant is essential for designing effective solutions.",
          groups: [
            {
              subTitle: "Carbon Dioxide and the Greenhouse Effect",
              bullets: [
                "**Source**: combustion of fossil fuels (coal, oil, natural gas); deforestation (removes CO₂ sinks); cement production (CaCO₃ → CaO + CO₂)",
                "**Effect**: CO₂ absorbs infrared radiation re-emitted by Earth's surface and re-radiates it in all directions, trapping heat in the atmosphere — the enhanced greenhouse effect",
                "**Consequences**: global warming → rising sea levels, extreme weather, habitat loss, ocean acidification",
                "**Reducing emissions**: renewable energy, energy efficiency, carbon capture, afforestation, nuclear power"
              ]
            },
            {
              subTitle: "Sulfur Dioxide (SO₂)",
              bullets: [
                "**Source**: combustion of fossil fuels containing sulfur impurities; metal smelting",
                "**Chemistry**: S + O₂ → SO₂; then 2SO₂ + O₂ → 2SO₃; SO₃ + H₂O → H₂SO₄ (sulfuric acid)",
                "**Effect**: acid rain (pH 3-5) — damages trees, leaches minerals from soil, acidifies lakes, corrodes limestone buildings and metal structures",
                "**Solutions**: remove sulfur from fuel before burning; fit flue gas desulfurisation (FGD) systems to power stations; use limestone/lime scrubbers: CaCO₃ + SO₂ → CaSO₃ + CO₂"
              ]
            },
            {
              subTitle: "Oxides of Nitrogen (NOₓ)",
              bullets: [
                "**Source**: high temperature combustion (car engines, power stations) causes N₂ + O₂ → 2NO → NO₂",
                "**Effects**: acid rain; photochemical smog; NO₂ is toxic (causes respiratory problems)",
                "**Solutions**: catalytic converters in car exhausts convert NOₓ + CO → N₂ + CO₂; exhaust gas recirculation reduces formation"
              ]
            },
            {
              subTitle: "Carbon Monoxide (CO)",
              bullets: [
                "**Source**: incomplete combustion of carbon-containing fuels (insufficient oxygen)",
                "**Effect**: toxic gas — binds to haemoglobin 250 times more strongly than O₂ → prevents O₂ transport → carbon monoxide poisoning → can be fatal",
                "**Solutions**: ensure adequate ventilation; catalytic converters: 2CO + O₂ → 2CO₂ (platinum/palladium catalyst)"
              ]
            },
            {
              subTitle: "Methane and Other Greenhouse Gases",
              bullets: [
                "**Sources of methane**: livestock (enteric fermentation), paddy fields, landfill, natural gas leaks",
                "Methane has ~80× more warming effect than CO₂ over 20 years",
                "**CFCs (chlorofluorocarbons)**: once used as refrigerants and aerosol propellants; destroy ozone layer by catalytic chain reaction releasing Cl atoms; now replaced by HFCs under Montreal Protocol"
              ]
            }
          ]
        },
        {
          title: "Water Treatment and Quality",
          body: "Access to clean water is a fundamental human need. Natural water sources contain dissolved mineral ions, bacteria, sediment and organic matter that must be removed before the water is safe to drink. Industrial processes also require pure water. The treatment steps depend on the source and the required purity.",
          groups: [
            {
              subTitle: "Drinking Water Treatment",
              bullets: [
                "**Screening**: large debris removed by mesh screens",
                "**Sedimentation**: water allowed to stand; large particles settle; flocculation agents (aluminium sulfate) cause small particles to clump",
                "**Filtration**: water passed through sand/gravel filters to remove remaining solid particles and some bacteria",
                "**Chlorination**: small amount of chlorine added (Cl₂ or ClO₂) to kill remaining bacteria and viruses; concentration carefully controlled to avoid trihalomethane formation",
                "**pH adjustment**: lime added if water is too acidic (protects pipes)"
              ]
            },
            {
              subTitle: "Water Hardness",
              bullets: [
                "Hard water contains dissolved Ca²⁺ and Mg²⁺ ions (from dissolving limestone/dolomite)",
                "**Temporary hardness**: caused by dissolved Ca(HCO₃)₂; removed by boiling → CaCO₃ precipitates (forms scale/fur in kettles)",
                "**Permanent hardness**: caused by CaSO₄ or MgSO₄; not removed by boiling",
                "**Both types removed by**: ion exchange resin (exchanges Ca²⁺/Mg²⁺ for Na⁺/H⁺); adding sodium carbonate (Ca²⁺ + CO₃²⁻ → CaCO₃ precipitate); distillation"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 11,
      title: "Organic Chemistry",
      intro: "Organic chemistry is the study of carbon compounds, of which there are millions — far more than all inorganic compounds combined. This diversity arises from carbon's unique ability to form four covalent bonds, chain and ring structures, and to bond with hydrogen, oxygen, nitrogen and halogens in an enormous variety of ways. The systematic naming of organic compounds and understanding reactions of the major homologous series are the core skills of this chapter.",
      subheadings: [
        {
          title: "Alkanes",
          body: "Alkanes are saturated hydrocarbons — they contain only carbon-carbon single bonds and carbon-hydrogen bonds. They form a homologous series with general formula CₙH₂ₙ₊₂. As the number of carbon atoms increases, the boiling point increases due to stronger intermolecular forces. Alkanes are the main components of natural gas and petroleum.",
          groups: [
            {
              subTitle: "First Four Alkanes",
              bullets: [
                "**Methane (CH₄)**: gas; main component of natural gas",
                "**Ethane (C₂H₆)**: gas",
                "**Propane (C₃H₈)**: gas; bottled as LPG (liquefied petroleum gas) for camping stoves",
                "**Butane (C₄H₁₀)**: gas at r.t.p.; used in cigarette lighters"
              ]
            },
            {
              subTitle: "Reactions",
              bullets: [
                "**Combustion (complete)**: CₙH₂ₙ₊₂ + excess O₂ → CO₂ + H₂O; releases large amounts of energy (used as fuels)",
                "**Combustion (incomplete)**: insufficient O₂ → CO and/or C (soot) produced; dangerous",
                "**Substitution with halogens (in UV light)**: H atoms replaced one at a time by halogen atoms; e.g. CH₄ + Cl₂ → CH₃Cl + HCl (chloromethane)",
                "Alkanes are relatively unreactive toward aqueous reagents because C−C and C−H bonds are strong and non-polar"
              ]
            }
          ]
        },
        {
          title: "Alkenes",
          body: "Alkenes are unsaturated hydrocarbons — they contain at least one carbon-carbon double bond (C=C). The general formula is CₙH₂ₙ. The C=C double bond makes alkenes much more reactive than alkanes, particularly in addition reactions where the double bond opens to allow two new groups to attach.",
          groups: [
            {
              subTitle: "Test for Unsaturation",
              bullets: [
                "Add bromine water (orange-brown): alkenes **decolourise** bromine water → colourless; alkanes do NOT",
                "The test is specific to the C=C double bond (addition of Br₂ across the double bond)"
              ]
            },
            {
              subTitle: "Addition Reactions",
              bullets: [
                "**Hydrogenation** (H₂, Ni catalyst, 150°C): C=C + H₂ → C−C (alkene → alkane); used in food industry to harden vegetable oils (margarine production)",
                "**Addition of water (hydration)**: C=C + H₂O (steam, H₃PO₄ catalyst, 300°C, 60 atm) → alcohol; industrial production of ethanol from ethene",
                "**Addition of hydrogen halide**: C=C + HBr → C(Br)−C (haloalkane)",
                "**Addition of bromine**: C=C + Br₂ → C(Br)−C(Br) (dibromoalkane); decolourises bromine water"
              ]
            },
            {
              subTitle: "Addition Polymerisation",
              bullets: [
                "Many alkene monomers join together under high pressure and temperature with catalyst → long-chain polymer",
                "**Poly(ethene)**: ethene monomers → flexible plastic bags, film, bottles",
                "**Poly(propene)**: propene monomers → rope, crates, car bumpers",
                "**Poly(chloroethene) (PVC)**: chloroethene monomers → pipes, window frames, electrical insulation",
                "The repeating unit of the polymer has the same composition as the monomer but with double bond opened",
                "Addition polymers are non-biodegradable → significant environmental pollution problem"
              ]
            }
          ]
        },
        {
          title: "Alcohols",
          body: "Alcohols contain the hydroxyl functional group (−OH) attached to a carbon atom. They form a homologous series with general formula CₙH₂ₙ₊₁OH. Ethanol is the most economically important alcohol — it is the alcohol in beverages, a solvent and increasingly important as a fuel.",
          groups: [
            {
              subTitle: "Production of Ethanol",
              bullets: [
                "**Fermentation** (batch process): glucose + yeast (zymase enzyme) → ethanol + CO₂; conditions: 25-35°C, anaerobic, pH ~5; yeast dies above ~14% ethanol; ethanol separated by fractional distillation",
                "**Hydration of ethene** (continuous process): C₂H₄ + H₂O(g) → C₂H₅OH; catalyst H₃PO₄, 300°C, 60 atm; produces very pure ethanol but uses non-renewable petroleum feedstock"
              ]
            },
            {
              subTitle: "Reactions of Alcohols",
              bullets: [
                "**Combustion**: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O + energy (clean fuel for vehicles)",
                "**Oxidation to carboxylic acid**: ethanol + oxygen (or oxidising agent K₂Cr₂O₇) → ethanoic acid + water; wine → vinegar if exposed to air",
                "**Dehydration to alkene**: C₂H₅OH → C₂H₄ + H₂O (Al₂O₃ catalyst, 300°C) — reverse of hydration"
              ]
            }
          ]
        },
        {
          title: "Carboxylic Acids and Esters",
          body: "Carboxylic acids contain the carboxyl group (−COOH). They are weak acids — only partially dissociating in water. Esters are formed when a carboxylic acid reacts with an alcohol. Esters have characteristic fruity smells and are used as food flavourings and perfumes.",
          groups: [
            {
              bullets: [
                "**Ethanoic acid (CH₃COOH)**: simplest carboxylic acid; 'weak acid' → only partially ionised; found in vinegar",
                "**Reactions of carboxylic acids**: with Na → salt + H₂; with NaOH → salt + water; with Na₂CO₃ → salt + H₂O + CO₂; with alcohols → ester + water (esterification)",
                "**Esterification**: carboxylic acid + alcohol ⇌ ester + water; concentrated H₂SO₄ catalyst; reversible — low yield without removing products",
                "Example: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (ethyl ethanoate — smell of pear drops)",
                "**Hydrolysis** (reverse of esterification): ester + water → acid + alcohol (with acid or alkali catalyst)",
                "**Polyesters**: formed from dicarboxylic acids and diols; Terylene/Dacron used in textiles; PET used in bottles"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 12,
      title: "Experimental Techniques and Chemical Analysis",
      intro: "Chemistry is fundamentally an experimental science. This final chapter brings together the practical techniques used throughout the course — separation methods, tests for ions and gases, and quantitative analysis by titration. Being able to select the appropriate technique for a given separation, explain why each step is done, and carry out calculations from experimental data are essential skills for both the written papers and practical examinations.",
      subheadings: [
        {
          title: "Separation Techniques",
          body: "Mixtures must be separated to obtain pure substances or to analyse their composition. The choice of technique depends on the nature of the components — their physical state, solubility, boiling point and particle size. Each technique exploits a difference in one physical property to achieve separation.",
          groups: [
            {
              subTitle: "Filtration",
              bullets: [
                "**Purpose**: separates an insoluble solid from a liquid (or solution)",
                "**Apparatus**: filter paper in a filter funnel, conical flask",
                "**Residue**: solid collected on filter paper",
                "**Filtrate**: liquid that passes through",
                "**Example**: separating excess copper oxide from copper sulfate solution after reaction with sulfuric acid"
              ]
            },
            {
              subTitle: "Crystallisation",
              bullets: [
                "**Purpose**: obtains a pure solid from a solution",
                "**Steps**: evaporate solution gently until just saturated (hot, concentrated solution); allow to cool slowly → crystals form as solubility decreases; filter off crystals; dry in oven or desiccator",
                "Slow cooling gives large, pure crystals; rapid cooling gives small, impure crystals",
                "**Example**: obtaining copper sulfate crystals from CuSO₄ solution"
              ]
            },
            {
              subTitle: "Simple Distillation",
              bullets: [
                "**Purpose**: separates a liquid from a dissolved solid, or separates two liquids with very different boiling points",
                "**Principle**: liquid heated → vaporises → vapour passes through condenser → cooled → liquid collected",
                "**Example**: obtaining pure water from salt water; collecting ethanol from fermentation mixture"
              ]
            },
            {
              subTitle: "Fractional Distillation",
              bullets: [
                "**Purpose**: separates a mixture of liquids with similar but different boiling points",
                "**Principle**: fractionating column allows repeated vaporisation and condensation; components with lower boiling points rise higher in column and are collected first",
                "**Examples**: separating ethanol/water mixture (boiling points 78°C and 100°C); industrial separation of crude oil into fractions (petrol, kerosene, diesel, lubricating oil, bitumen)"
              ]
            },
            {
              subTitle: "Paper Chromatography",
              bullets: [
                "**Purpose**: separates and identifies components of a mixture of soluble coloured (or colourless) substances",
                "**Principle**: components dissolve in mobile phase (solvent) and travel up the stationary phase (paper) at different rates depending on their solubility and adsorption",
                "**Rf value** = distance moved by spot ÷ distance moved by solvent; fixed for each substance in a given solvent",
                "**Identifying substances**: compare Rf values with known standards run on the same chromatogram",
                "**Visualising colourless spots**: spray with ninhydrin (amino acids) or hold in iodine vapour"
              ]
            }
          ]
        },
        {
          title: "Tests for Gases",
          body: "Identifying unknown gases is a key practical skill. Each gas has a characteristic test that must be memorised and applied correctly. The test, observation and conclusion should all be clearly stated in exam answers.",
          groups: [
            {
              bullets: [
                "**Hydrogen (H₂)**: hold lit splint to the gas → 'squeaky pop' as H₂ burns explosively with O₂",
                "**Oxygen (O₂)**: place a glowing splint in the gas → splint relights",
                "**Carbon dioxide (CO₂)**: bubble through limewater (Ca(OH)₂ solution) → turns milky/cloudy white (CaCO₃ precipitate forms)",
                "**Ammonia (NH₃)**: hold damp red litmus paper → turns blue; pungent smell; produces white smoke with HCl fumes",
                "**Chlorine (Cl₂)**: bleaches damp litmus paper (first turns red — acidic, then bleaches white); pale yellow-green colour; toxic smell",
                "**Sulfur dioxide (SO₂)**: turns damp potassium dichromate(VI) paper from orange to green; acidic; bleaches damp litmus paper; pungent smell"
              ]
            }
          ]
        },
        {
          title: "Tests for Ions in Solution",
          body: "Analytical chemistry often requires identifying the ions present in an unknown solution. Each cation and anion has characteristic reactions with specific reagents that produce identifiable observations (colour changes, precipitates, gas evolution). Being systematic — testing for cations first, then anions — gives reliable results.",
          groups: [
            {
              subTitle: "Tests for Cations",
              bullets: [
                "**Flame tests**: Li⁺ → crimson; Na⁺ → yellow; K⁺ → lilac; Ca²⁺ → brick red; Ba²⁺ → green; Cu²⁺ → blue-green",
                "**Adding NaOH (sodium hydroxide) solution**: Cu²⁺ → pale blue precipitate (copper hydroxide); Fe²⁺ → green gelatinous precipitate; Fe³⁺ → orange-brown precipitate; Al³⁺ → white precipitate that redissolves in excess NaOH; Zn²⁺ → white precipitate that redissolves in excess NaOH; NH₄⁺ → on warming, ammonia gas evolved (turns damp red litmus blue)"
              ]
            },
            {
              subTitle: "Tests for Anions",
              bullets: [
                "**Carbonate (CO₃²⁻)**: add dilute acid → effervescence; CO₂ turns limewater milky",
                "**Sulfate (SO₄²⁻)**: add dilute hydrochloric acid then barium chloride → white precipitate of BaSO₄ (insoluble in excess acid)",
                "**Halides**: add dilute nitric acid then silver nitrate solution → Cl⁻: white AgCl precipitate (soluble in dilute NH₃); Br⁻: cream AgBr precipitate (soluble only in concentrated NH₃); I⁻: yellow AgI precipitate (insoluble in NH₃)",
                "**Nitrate (NO₃⁻)**: add aluminium foil and dilute NaOH; warm → ammonia gas evolved (confirm with damp red litmus)"
              ]
            }
          ]
        },
        {
          title: "Acid-Base Titrations",
          body: "A titration is a technique for finding the exact volume of one solution needed to completely react with a measured volume of another solution. Used to find unknown concentrations, determine purity of samples, or identify the stoichiometry of a reaction. Accuracy and precision are paramount — results should be reproducible to within 0.1 cm³.",
          groups: [
            {
              subTitle: "Procedure",
              bullets: [
                "1. Pipette a known volume of one solution (e.g. 25.0 cm³ of NaOH) into a conical flask",
                "2. Add a few drops of indicator (phenolphthalein for strong base, methyl orange for strong acid)",
                "3. Fill burette with the other solution (e.g. HCl); record initial burette reading",
                "4. Run solution from burette into flask, swirling constantly; slow to drop by drop near end-point",
                "5. Stop at end-point (indicator colour change); record final burette reading",
                "6. Calculate titre = final − initial reading",
                "7. Repeat until concordant results (within 0.10 cm³ of each other); average the concordant values"
              ]
            },
            {
              subTitle: "Calculation Example",
              bullets: [
                "25.0 cm³ of NaOH neutralised by 20.0 cm³ of 0.100 mol/dm³ HCl",
                "Moles HCl = 0.100 × (20.0/1000) = 0.00200 mol",
                "Equation: NaOH + HCl → NaCl + H₂O; ratio 1:1",
                "Moles NaOH = 0.00200 mol",
                "Concentration NaOH = 0.00200 / (25.0/1000) = 0.0800 mol/dm³"
              ]
            }
          ]
        }
      ]
    },
  ]
};

// ── Physics 0625 ───────────────────────────────────────────────────────────────

const PHYSICS: SubjectNotes = {
  id: "physics",
  name: "Physics",
  code: "0625",
  color: "bg-sky-500",
  chapters: [
    {
      number: 1,
      title: "Motion, Forces and Energy",
      intro: "Motion, forces, and energy form the foundation of classical mechanics. This chapter investigates how physical quantities are measured, how objects move under the action of forces, how momentum and energy are conserved during interactions, and how pressure behaves in fluids and solids.",
      subheadings: [
        {
          title: "Physical Quantities and Measurement Techniques",
          body: "Physics is an empirical science that relies on accurate measurements of physical quantities. Every physical quantity consists of a numerical magnitude and a unit. Quantities are classified as scalars (having magnitude only) or vectors (having both magnitude and direction).",
          groups: [
            {
              subTitle: "Scalars vs Vectors",
              bullets: [
                "**Scalar quantities** — described completely by magnitude (size) alone. Examples: distance, speed, mass, time, temperature, energy, power, density, pressure",
                "**Vector quantities** — require both magnitude and a specified direction. Examples: displacement, velocity, acceleration, force, weight, momentum, gravitational field strength, electric field strength",
                "**Vector addition** — vectors acting in the same direction add together; opposing vectors subtract. Perpendicular vectors can be combined using Pythagoras ($R = \\sqrt{A^2 + B^2}$) and trigonometry ($\\tan\\theta = \\text{opp}/\\text{adj}$)"
              ]
            },
            {
              subTitle: "Measurement Instruments and Precision",
              bullets: [
                "**Ruler / Metre rule** — measures length up to 1 m with a precision of 1 mm (0.1 cm); avoid parallax error by reading perpendicular to the scale",
                "**Micrometer screw gauge** — measures small diameters and thicknesses (e.g. wire, sheet metal) with precision up to 0.01 mm; account for zero errors before measuring",
                "**Measuring cylinder** — measures liquid volumes or volume of irregular solids by water displacement; read at the bottom of the meniscus at eye level",
                "**Digital stopwatch / Timer** — measures time intervals; to reduce human reaction time error in periodic events, time 20 complete oscillations of a pendulum and divide the total time by 20 to find the period $T$"
              ]
            }
          ]
        },
        {
          title: "Motion, Speed, Velocity and Acceleration",
          body: "Kinematics describes the motion of bodies without considering the forces that cause them. Speed is the rate of change of distance, while velocity is speed in a given direction. Acceleration is the rate of change of velocity with time.",
          groups: [
            {
              subTitle: "Key Kinematics Equations",
              bullets: [
                "**Average speed**: $\\text{speed} = \\frac{\\text{total distance}}{\\text{total time}} = \\frac{s}{t}$ (units: m/s)",
                "**Acceleration**: $a = \\frac{\\Delta v}{\\Delta t} = \\frac{v - u}{t}$ (where $u$ = initial velocity, $v$ = final velocity; units: m/s²)",
                "**Uniform acceleration equations**: $v = u + at$ and $s = \\frac{(u + v)}{2} \\times t$"
              ]
            },
            {
              subTitle: "Motion Graphs Interpretation",
              bullets: [
                "**Distance-Time Graph**: gradient represents **speed**; horizontal line = stationary; straight sloped line = constant speed; curved line = changing speed (accelerating/decelerating)",
                "**Speed-Time Graph**: gradient represents **acceleration**; horizontal line = constant speed ($a = 0$); area under the graph represents **distance travelled**",
                "To calculate distance from a speed-time graph: split the area under the line into rectangles ($w \\times h$) and triangles ($\\frac{1}{2} \\times b \\times h$) and sum them"
              ]
            },
            {
              subTitle: "Free Fall and Terminal Velocity",
              bullets: [
                "Near Earth's surface, all falling objects accelerate downwards at $g \\approx 9.8\\text{ m/s}^2$ (often taken as $10\\text{ m/s}^2$) in the absence of air resistance",
                "When an object falls through air, air resistance (drag) increases as speed increases",
                "Eventually, the upward drag force equals the downward gravitational force (weight)",
                "The **resultant force becomes zero** → acceleration becomes zero → the object continues to fall at a constant maximum velocity called **terminal velocity**"
              ]
            }
          ]
        },
        {
          title: "Mass, Weight and Density",
          body: "Mass is an intrinsic property of matter that measures its resistance to acceleration (inertia), whereas weight is the gravitational force exerted on that mass by a gravitational field.",
          groups: [
            {
              subTitle: "Mass vs Weight",
              bullets: [
                "**Mass ($m$)** — quantity of matter in a body; measured in kilograms (kg); scalar; remains constant everywhere in the universe",
                "**Weight ($W$)** — gravitational force acting on an object; measured in newtons (N); vector directed towards the center of gravity",
                "**Relationship**: $W = mg$, where $g$ is the gravitational field strength ($g \\approx 9.8\\text{ N/kg}$ on Earth's surface, $\\approx 1.6\\text{ N/kg}$ on the Moon)"
              ]
            },
            {
              subTitle: "Density ($\\rho$)",
              bullets: [
                "**Definition**: mass per unit volume of a substance: $\\rho = \\frac{m}{V}$",
                "**Units**: $\\text{kg/m}^3$ or $\\text{g/cm}^3$ (Conversion: $1\\text{ g/cm}^3 = 1000\\text{ kg/m}^3$)",
                "**Measuring regular solid density**: measure mass on top-pan balance, measure dimensions with ruler/callipers, calculate volume ($V = l \\times w \\times h$), then divide mass by volume",
                "**Measuring irregular solid density**: measure mass, submerge object into water in a measuring cylinder (or displacement can), volume = volume of displaced water",
                "**Flotation rule**: an object floats in a fluid if its average density is less than the density of the fluid"
              ]
            }
          ]
        },
        {
          title: "Forces, Elasticity and Circular Motion",
          body: "A force is a push or pull exerted on an object that can change its shape, speed, or direction of motion. Newton's laws govern how forces dictate the acceleration and equilibrium of objects.",
          groups: [
            {
              subTitle: "Newton's Laws of Motion",
              bullets: [
                "**Resultant force**: the single overall force obtained by combining all individual forces acting on an object",
                "**Newton's First Law**: if the resultant force is zero, a stationary object remains at rest, and a moving object continues at constant velocity",
                "**Newton's Second Law**: $F = ma$ (Resultant force = mass × acceleration); 1 N is the force required to accelerate 1 kg at 1 m/s²",
                "**Newton's Third Law**: when object A exerts a force on object B, object B exerts an equal and opposite force on object A"
              ]
            },
            {
              subTitle: "Hooke's Law and Elastic Deformation",
              bullets: [
                "**Hooke's Law**: the extension of a spring or elastic material is directly proportional to the applied load force, provided the limit of proportionality is not exceeded",
                "**Formula**: $F = k \\Delta x$, where $k$ is the spring constant (stiffness in N/m or N/cm) and $\\Delta x$ is the extension ($\\text{extended length} - \\text{original length}$)",
                "**Limit of proportionality**: the point beyond which load and extension are no longer linear",
                "**Elastic limit**: the maximum force a material can experience without undergoing permanent plastic deformation"
              ]
            },
            {
              subTitle: "Centripetal Force in Circular Motion",
              bullets: [
                "An object travelling in a circle at constant speed is constantly changing direction → its velocity is constantly changing → it is **accelerating**",
                "A resultant **centripetal force** must act towards the center of the circle to maintain circular motion",
                "Centripetal force increases if: speed $v$ increases, mass $m$ increases, or radius $r$ of the circle decreases",
                "Examples: gravitational pull on orbiting satellites, tension in a swung string, friction between car tires and a curved road"
              ]
            }
          ]
        },
        {
          title: "Momentum and Impulse",
          body: "Momentum is a measure of how difficult it is to stop a moving object. In every closed system where no external forces act, the total momentum remains constant before and after collisions.",
          groups: [
            {
              subTitle: "Momentum and Conservation",
              bullets: [
                "**Formula**: $p = mv$ (Momentum = mass × velocity; unit: $\\text{kg}\\cdot\\text{m/s}$ or $\\text{N}\\cdot\\text{s}$); momentum is a vector quantity",
                "**Law of Conservation of Momentum**: $\\text{Total momentum before collision} = \\text{Total momentum after collision}$ ($m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$)",
                "**Explosion interactions**: if two stationary objects push apart, total initial momentum is 0 → $m_1 v_1 + m_2 v_2 = 0$ ($m_1 v_1 = -m_2 v_2$)"
              ]
            },
            {
              subTitle: "Impulse and Vehicle Safety",
              bullets: [
                "**Impulse**: the product of force and time, equal to the change in momentum: $\\text{Impulse} = F \\Delta t = \\Delta p = mv - mu$",
                "**Impact force**: $F = \\frac{\\Delta p}{\\Delta t}$",
                "**Safety mechanisms**: seatbelts, airbags, crumple zones, and padded bicycle helmets extend the impact collision time $\\Delta t$, thereby drastically reducing the resultant force $F$ on passengers for the same change in momentum"
              ]
            }
          ]
        },
        {
          title: "Energy Stores, Transfers, Work and Power",
          body: "Energy is the capacity to do work. Energy cannot be created or destroyed, only transferred from one store to another. Work is done whenever a force moves an object through a distance in the direction of the force.",
          groups: [
            {
              subTitle: "Energy Stores and Transfer Mechanisms",
              bullets: [
                "**Stores**: Kinetic ($E_k$), Gravitational potential ($E_p$), Chemical (food/fuel/batteries), Elastic strain, Nuclear, Thermal (internal), Electrostatic, Magnetic",
                "**Transfers**: Mechanically (by a force), Electrically (by current), by Heating (temperature difference), by Radiation (light/sound/EM waves)",
                "**Kinetic energy**: $E_k = \\frac{1}{2}mv^2$",
                "**Gravitational potential energy**: $\\Delta E_p = mg\\Delta h$"
              ]
            },
            {
              subTitle: "Work, Power and Efficiency",
              bullets: [
                "**Work Done**: $W = Fd$ (Work in Joules = Force in Newtons × distance moved in direction of force in metres); $1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$",
                "**Power**: rate of doing work or transferring energy: $P = \\frac{W}{t} = \\frac{\\Delta E}{t}$ (units: Watts (W); $1\\text{ W} = 1\\text{ J/s}$)",
                "**Efficiency**: $\\text{Efficiency} = \\frac{\\text{Useful energy output}}{\\text{Total energy input}} \\times 100\\% = \\frac{\\text{Useful power output}}{\\text{Total power input}} \\times 100\\%$",
                "Energy is wasted predominantly as thermal energy dissipating to the surroundings"
              ]
            },
            {
              subTitle: "Energy Resources",
              bullets: [
                "**Non-renewable** (finite, will run out): Fossil fuels (coal, oil, natural gas — release greenhouse gas CO₂ causing global warming, SO₂ causing acid rain); Nuclear fission (uranium — no greenhouse emissions during operation, high energy density, but produces long-lived radioactive waste)",
                "**Renewable** (replenished naturally): Solar (photovoltaic cells, solar thermal), Wind (turbines), Hydroelectric (gravity dam / pumped storage), Tidal (barrages), Geothermal (volcanic heat), Biofuels (carbon-neutral biomass)",
                "Sun is the ultimate origin of almost all energy resources on Earth (except geothermal, nuclear, and tidal)"
              ]
            }
          ]
        },
        {
          title: "Pressure",
          body: "Pressure is the concentration of force applied over a given surface area. In fluids (liquids and gases), pressure acts equally in all directions and increases with depth due to the weight of the fluid column above.",
          groups: [
            {
              subTitle: "Solid and Fluid Pressure Equations",
              bullets: [
                "**Solid surface pressure**: $p = \\frac{F}{A}$ (Force in N ÷ Area in m²; unit: Pascal (Pa) or $\\text{N/m}^2$; $1\\text{ Pa} = 1\\text{ N/m}^2$)",
                "High pressure is created with small surface areas (knives, needle points, ice skate blades); low pressure with large surface areas (snowshoes, tractor tires)",
                "**Hydrostatic fluid pressure**: $\\Delta p = \\rho g \\Delta h$, where $\\rho$ is fluid density, $g$ is gravitational field strength, and $\\Delta h$ is depth",
                "Fluid pressure depends only on depth and fluid density, completely independent of the shape or total volume of the container"
              ]
            },
            {
              subTitle: "Atmospheric Pressure and Measurement",
              bullets: [
                "**Atmospheric pressure**: caused by the weight of air molecules in the atmosphere above Earth's surface ($1\\text{ atm} \\approx 1.01 \\times 10^5\\text{ Pa} = 760\\text{ mm Hg}$)",
                "**Mercury Barometer**: an inverted glass tube of mercury in a reservoir; atmospheric pressure supports a vertical column of mercury of height $h \\approx 76\\text{ cm}$; a vacuum exists above the mercury column",
                "**Manometer**: a U-tube containing liquid; used to measure gas pressure differences: $\\Delta p = \\rho g h$"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Thermal Physics",
      intro: "Thermal physics explores the macroscopic and microscopic nature of heat and temperature. Matter transitions between solid, liquid, and gaseous states depending on the kinetic and potential energies of its constituent particles. Understanding thermal expansion, heat capacities, and energy transfer mechanisms is crucial for technology and thermodynamics.",
      subheadings: [
        {
          title: "Kinetic Particle Model of Matter",
          body: "All matter is composed of tiny, constantly moving particles (atoms, molecules, or ions). The macroscopic properties of solids, liquids, and gases arise directly from the arrangement, motion, and attractive forces between these microscopic particles.",
          groups: [
            {
              subTitle: "The Three States of Matter",
              bullets: [
                "**Solids** — particles packed tightly in a regular lattice; vibrate about fixed positions; strong intermolecular forces; fixed shape and fixed volume; incompressibility",
                "**Liquids** — particles closely packed but in an irregular arrangement; slide over one another; moderate forces; takes shape of container; fixed volume; virtually incompressible",
                "**Gases** — particles far apart; random rapid straight-line motion at high speeds; negligible intermolecular forces; fills entire container; easily compressed"
              ]
            },
            {
              subTitle: "Brownian Motion and Gas Pressure",
              bullets: [
                "**Brownian Motion**: the continuous, erratic, random zigzag motion of microscopic visible particles (e.g. smoke particles in air or pollen grains in water)",
                "**Explanation**: caused by unequal, random collisions with invisible, fast-moving molecules of the surrounding fluid",
                "**Gas Pressure**: gas molecules collide elastically with the container walls; each collision exerts an impulse (force per unit area) on the walls, producing macroscopic pressure",
                "Increasing temperature increases the average kinetic energy of gas molecules $\\to$ molecules move faster $\\to$ collide with walls more frequently and with greater force $\\to$ pressure increases"
              ]
            },
            {
              subTitle: "Gas Laws and Absolute Zero",
              bullets: [
                "**Boyle's Law** (constant temperature): $p_1 V_1 = p_2 V_2$ ($p \\propto \\frac{1}{V}$); halving the volume doubles the pressure",
                "**Pressure Law** (constant volume): $\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$ ($p \\propto T$ in Kelvin)",
                "**Absolute Zero**: $-273^\\circ\\text{C} = 0\\text{ K}$; the lowest possible theoretical temperature where particles have minimum internal energy and zero kinetic energy",
                "**Kelvin temperature conversion**: $T\\text{ (K)} = \\theta\\text{ }(^\\circ\\text{C}) + 273$"
              ]
            }
          ]
        },
        {
          title: "Thermal Expansion and Thermometry",
          body: "When materials are heated, their particles gain thermal energy and vibrate more vigorously, pushing each other slightly further apart and causing thermal expansion. Liquids expand more than solids, and gases expand significantly more than liquids for the same temperature rise.",
          groups: [
            {
              subTitle: "Thermal Expansion Applications and Consequences",
              bullets: [
                "**Bimetallic strip**: two metals with different expansion coefficients (e.g. brass expands faster than iron) bonded together; bends when heated, used in thermostats, fire alarms, and circuit breakers",
                "**Engineering safeguards**: expansion gaps in railway tracks and bridges, looped pipes in oil pipelines to prevent thermal stress bucking",
                "**Liquid-in-glass thermometers**: rely on the thermal expansion of liquid mercury or coloured alcohol up a narrow capillary tube"
              ]
            },
            {
              subTitle: "Thermometer Properties and Calibration",
              bullets: [
                "**Fixed points**: pure melting ice ($0^\\circ\\text{C}$) and steam from boiling water at standard atmospheric pressure ($100^\\circ\\text{C}$)",
                "**Sensitivity**: change in property per degree temperature change; increased by using a larger reservoir bulb or a narrower capillary bore",
                "**Range**: difference between minimum and maximum measurable temperatures",
                "**Linearity**: equal temperature intervals correspond to equal expansions along the scale",
                "**Thermocouple**: consists of two different metals joined at two junctions; a voltage (e.m.f.) is produced proportional to the temperature difference; ideal for measuring rapidly fluctuating, high, or remote temperatures"
              ]
            }
          ]
        },
        {
          title: "Thermal Capacity, Specific Heat Capacity and Latent Heat",
          body: "Adding thermal energy to a system increases its internal energy (the total kinetic and potential energies of all its particles). If temperature rises, kinetic energy increases; during state changes, potential energy increases while temperature remains constant.",
          groups: [
            {
              subTitle: "Specific Heat Capacity ($c$)",
              bullets: [
                "**Definition**: the energy required to raise the temperature of 1 kg of a substance by $1^\\circ\\text{C}$ (or 1 K)",
                "**Formula**: $\\Delta E = mc\\Delta\\theta$ (where $\\Delta E$ is energy in J, $m$ is mass in kg, $c$ is specific heat capacity in $\\text{J}/(\\text{kg}\\cdot^\\circ\\text{C})$, $\\Delta\\theta$ is temperature change)",
                "**Experimental determination**: use an electric immersion heater ($E = IVt$), measure mass with balance, record $\\Delta\\theta$ with thermometer, insulate container to minimize heat loss to surroundings: $c = \\frac{IVt}{m\\Delta\\theta}$",
                "Water has an exceptionally high specific heat capacity ($c \\approx 4200\\text{ J}/(\\text{kg}\\cdot^\\circ\\text{C})$), making it an excellent coolant in car engines and moderating coastal climates"
              ]
            },
            {
              subTitle: "Specific Latent Heat ($L$)",
              bullets: [
                "**Definition**: energy required to change the state of 1 kg of substance with no change in temperature",
                "**Specific Latent Heat of Fusion ($L_f$)**: solid to liquid transition at melting point ($\Delta E = mL_f$)",
                "**Specific Latent Heat of Vaporisation ($L_v$)**: liquid to gas transition at boiling point ($\Delta E = mL_v$)",
                "**Heating curves**: temperature vs time graphs show horizontal plateaus during melting and boiling because energy is used to break/weaken intermolecular bonds (increasing potential energy) rather than increasing kinetic energy"
              ]
            },
            {
              subTitle: "Boiling vs Evaporation",
              bullets: [
                "**Boiling**: occurs at a fixed temperature throughout the entire volume of the liquid; bubbles of gas form within the bulk liquid",
                "**Evaporation**: occurs at any temperature below the boiling point, only from the liquid surface",
                "**Cooling effect of evaporation**: only the fastest, most energetic molecules escape the liquid surface $\\to$ average kinetic energy of remaining molecules decreases $\\to$ liquid temperature decreases (e.g. sweating, cooling towers)"
              ]
            }
          ]
        },
        {
          title: "Thermal Energy Transfers: Conduction, Convection and Radiation",
          body: "Thermal energy naturally transfers from regions of higher temperature to regions of lower temperature via three distinct physical mechanisms: conduction, convection, and electromagnetic radiation.",
          groups: [
            {
              subTitle: "Conduction",
              bullets: [
                "Main mechanism in solids; atoms in hotter region vibrate faster and collide with neighbouring atoms, transferring vibrational energy along the lattice",
                "**Metals are superior conductors** because they contain a sea of **delocalised free electrons** that rapidly diffuse and transfer kinetic energy through the material",
                "**Insulators** (wood, plastic, air, fiberglass) lack free electrons and conduct heat very slowly"
              ]
            },
            {
              subTitle: "Convection",
              bullets: [
                "Primary mechanism in fluids (liquids and gases)",
                "Fluid is heated $\\to$ particles move faster and spread apart $\\to$ heated fluid expands $\\to$ density decreases $\\to$ less dense hot fluid rises",
                "Cooler, denser fluid sinks to replace it, gets heated, and creates a continuous circular **convection current**",
                "Applications: sea breezes, radiators, boiling water in a kettle, domestic hot water systems"
              ]
            },
            {
              subTitle: "Thermal Radiation and Surface Properties",
              bullets: [
                "Thermal transfer via **Infrared (IR) electromagnetic waves**; can travel through a vacuum at the speed of light ($3 \\times 10^8\\text{ m/s}$); requires no medium",
                "**Matt black / dark surfaces** — best absorbers and best emitters of thermal radiation",
                "**Shiny silver / white surfaces** — worst absorbers and worst emitters; best reflectors of thermal radiation",
                "**Vacuum Flask (Thermos)**: double-walled glass with vacuum eliminates conduction and convection; silvered surfaces eliminate radiation; plastic/cork stopper reduces evaporation and conduction"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Waves",
      intro: "Waves transfer energy and information from one place to another without transferring matter. This chapter examines wave properties including reflection, refraction, and diffraction, details the behaviour of light and lenses, explores the electromagnetic spectrum, and investigates the nature of sound waves.",
      subheadings: [
        {
          title: "General Wave Properties",
          body: "All waves are generated by oscillations or vibrations. In transverse waves, oscillations are perpendicular to energy propagation; in longitudinal waves, oscillations are parallel to energy propagation.",
          groups: [
            {
              subTitle: "Wave Characteristics and Terminology",
              bullets: [
                "**Transverse waves** — oscillations are perpendicular ($90^\\circ$) to wave direction (e.g. light, water ripples, electromagnetic waves, S-waves)",
                "**Longitudinal waves** — oscillations are parallel to wave direction, producing alternating compressions and rarefactions (e.g. sound waves, ultrasound, P-waves)",
                "**Wavelength ($\lambda$)** — distance between two consecutive identical points in phase (e.g. crest to crest or compression to compression), in metres",
                "**Amplitude ($A$)** — maximum displacement of a particle from its undisturbed equilibrium position",
                "**Frequency ($f$)** — number of complete waves passing a point per second, in Hertz (Hz)",
                "**Period ($T$)** — time taken for one complete wave oscillation ($T = \\frac{1}{f}$)",
                "**The Wave Equation**: $v = f\\lambda$ (Wave speed in m/s = frequency in Hz × wavelength in m)"
              ]
            },
            {
              subTitle: "Wave Behaviours: Reflection, Refraction and Diffraction",
              bullets: [
                "**Reflection**: wave bounces off a barrier with no change in speed, wavelength, or frequency; angle of incidence equals angle of reflection ($i = r$)",
                "**Refraction**: wave changes speed and direction when entering a medium of different optical density; frequency $f$ remains constant $\\to$ if wave slows down ($v \\downarrow$), wavelength decreases ($\lambda \\downarrow$)",
                "**Diffraction**: spreading of waves as they pass through a gap or around the edge of an obstacle; maximum diffraction occurs when the gap width is approximately equal to the wavelength ($w \\approx \\lambda$)"
              ]
            }
          ]
        },
        {
          title: "Light: Reflection, Refraction and Total Internal Reflection",
          body: "Light is a transverse electromagnetic wave that travels in straight lines in uniform media. Its interaction with mirrors, transparent boundaries, and optical fibers forms the basis of optical technology.",
          groups: [
            {
              subTitle: "Reflection and Plane Mirrors",
              bullets: [
                "**Law of Reflection**: angle of incidence ($i$) equals angle of reflection ($r$), measured relative to the normal line perpendicular to the surface",
                "**Image in a plane mirror**: virtual (cannot be formed on a screen), upright, same size as object, laterally inverted, and located the same distance behind the mirror as the object is in front"
              ]
            },
            {
              subTitle: "Refraction and Snell's Law",
              bullets: [
                "When light travels from an optically less dense medium (e.g. air) to a denser medium (e.g. glass/water), it slows down and **bends towards the normal** ($i > r$)",
                "When moving from denser to less dense, it speeds up and **bends away from normal** ($i < r$)",
                "**Refractive Index ($n$)**: $n = \\frac{\\sin i}{\\sin r} = \\frac{c}{v} = \\frac{\\text{speed of light in vacuum}}{\\text{speed of light in medium}}$ ($n \\ge 1$)"
              ]
            },
            {
              subTitle: "Critical Angle and Total Internal Reflection (TIR)",
              bullets: [
                "**Conditions for TIR**: light must be travelling in a denser medium towards a less dense medium, and angle of incidence must exceed the critical angle ($i > c$)",
                "**Critical angle ($c$)**: the angle of incidence in the denser medium for which the angle of refraction is exactly $90^\\circ$: $\\sin c = \\frac{1}{n}$",
                "**Applications**: optical fibres in high-speed telecommunications and medical endoscopes, reflective prisms in binoculars and periscopes"
              ]
            }
          ]
        },
        {
          title: "Thin Lenses and Dispersion",
          body: "Lenses refract light to form real or virtual images. A converging (convex) lens brings parallel rays together at a focal point, whereas a diverging (concave) lens spreads rays outwards.",
          groups: [
            {
              subTitle: "Converging Lens Ray Diagrams",
              bullets: [
                "**Principal axis**: central horizontal line through the optical center of the lens",
                "**Principal focus ($F$) / Focal point**: point on principal axis where rays parallel to axis converge",
                "**Focal length ($f$)**: distance between optical center and principal focus",
                "**Ray 1**: parallel to principal axis $\\to$ refracts through principal focus $F$",
                "**Ray 2**: passes through the optical center undeflected",
                "**Ray 3**: passes through focus before lens $\\to$ emerges parallel to principal axis",
                "**Magnifying glass**: object placed closer than $f$ ($u < f$) produces a **virtual, upright, and magnified** image on the same side of the lens",
                "**Linear Magnification**: $M = \\frac{\\text{image height}}{\\text{object height}} = \\frac{\\text{image distance } v}{\\text{object distance } u}$"
              ]
            },
            {
              subTitle: "Dispersion of Light",
              bullets: [
                "White light is composed of a continuous spectrum of seven colours: Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV)",
                "When passing through a glass prism, violet light refracts (bends) the most because it has the shortest wavelength and lowest speed in glass",
                "Red light refracts the least because it has the longest wavelength and highest speed in glass $\\to$ light splits into a visible spectrum"
              ]
            }
          ]
        },
        {
          title: "The Electromagnetic (EM) Spectrum",
          body: "The electromagnetic spectrum is a family of continuous transverse waves that all travel at the speed of light in a vacuum ($c = 3.0 \\times 10^8\\text{ m/s}$) and transfer energy from source to absorber.",
          groups: [
            {
              subTitle: "Spectrum Order (Increasing Frequency / Decreasing Wavelength)",
              bullets: [
                "**Radio waves** (longest $\lambda$, lowest $f$) $\\to$ **Microwaves** $\\to$ **Infrared** $\\to$ **Visible Light** $\\to$ **Ultraviolet** $\\to$ **X-rays** $\\to$ **Gamma rays** (shortest $\lambda$, highest $f$, highest energy)"
              ]
            },
            {
              subTitle: "Uses and Applications",
              bullets: [
                "**Radio waves**: radio and terrestrial television broadcasting, astronomy communications",
                "**Microwaves**: satellite communications, mobile phones, Wi-Fi, radar, microwave ovens (water absorption)",
                "**Infrared (IR)**: remote controls, thermal imaging cameras, night vision, radiant heating, fibre optic cables",
                "**Visible light**: vision, photography, illumination, optical fibre communications",
                "**Ultraviolet (UV)**: security ink detection, fluorescent lamps, sterilising water, vitamin D synthesis",
                "**X-rays**: medical bone imaging, airport baggage scanners, inspecting internal weld integrity",
                "**Gamma rays**: cancer radiotherapy, sterilising surgical instruments, food irradiation"
              ]
            },
            {
              subTitle: "Hazards and Protection",
              bullets: [
                "**Microwaves**: internal heating of body tissue cells; shielded with metal casing and mesh doors",
                "**Infrared**: skin burns; avoid direct contact with high-temperature emitters",
                "**Ultraviolet**: damage to surface cells, premature skin aging, sunburn, blindness, skin cancer; protected by sun cream, sunglasses, UV filters",
                "**X-rays and Gamma rays**: highly ionising radiation causing DNA mutations, cancer, cell destruction; operators use lead shielding, stand behind lead-glass screens, wear dosimeter badges"
              ]
            }
          ]
        },
        {
          title: "Sound Waves",
          body: "Sound is a mechanical longitudinal wave produced by vibrating sources that requires a physical medium (solid, liquid, or gas) to propagate. Sound cannot travel through a vacuum.",
          groups: [
            {
              subTitle: "Properties of Sound",
              bullets: [
                "Propagates as longitudinal compressions (regions of high particle density/pressure) and rarefactions (low density/pressure)",
                "**Speed of sound**: fastest in solids ($\\approx 5000\\text{ m/s}$ in steel), slower in liquids ($\\approx 1500\\text{ m/s}$ in water), slowest in gases ($\\approx 330\\text{–}340\\text{ m/s}$ in air)",
                "**Pitch** is determined by **frequency** (higher frequency = higher pitch)",
                "**Loudness** is determined by **amplitude** (larger amplitude = louder sound; carries more energy)",
                "**Human audible range**: $20\\text{ Hz} \\text{ to } 20,000\\text{ Hz}$ (20 kHz)"
              ]
            },
            {
              subTitle: "Echoes and Ultrasound",
              bullets: [
                "**Echo**: reflection of a sound wave off a hard, flat surface",
                "**Speed of sound experiment**: measure distance $d$ to a wall, clap, measure time $t$ for echo to return: $v = \\frac{2d}{t}$",
                "**Ultrasound**: sound waves with frequencies higher than $20,000\\text{ Hz}$ (above human hearing limit)",
                "**Ultrasound uses**: non-invasive prenatal fetal scanning (partially reflects at tissue boundaries without ionising radiation risk), sonar depth sounding and submarine navigation, non-destructive crack detection in metals"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Electricity and Magnetism",
      intro: "Electricity and magnetism are intrinsically linked phenomena described by electromagnetism. This chapter investigates static electricity, electric currents and potential difference, circuit analysis with Ohm's law, magnetism, and the principles of electric motors, generators, and transformers.",
      subheadings: [
        {
          title: "Simple Magnetism and Magnetic Fields",
          body: "Magnets possess two poles: North (N) and South (S). Like poles repel, and unlike poles attract. Ferromagnetic materials (iron, steel, nickel, cobalt) can be magnetized and experience forces in magnetic fields.",
          groups: [
            {
              subTitle: "Magnetic Materials and Induction",
              bullets: [
                "**Ferromagnetic materials**: iron, steel, nickel, cobalt; can be attracted to magnets",
                "**Hard magnetic materials (e.g. Steel)**: difficult to magnetise, retains magnetism permanently; used in permanent bar magnets, compass needles, loudspeakers",
                "**Soft magnetic materials (e.g. Soft Iron)**: easily magnetised and easily demagnetised; used in electromagnet cores, transformer cores, relays",
                "**Induced magnetism**: an unmagnetised magnetic material becomes temporary magnetized when placed in an external magnetic field (always results in attraction)"
              ]
            },
            {
              subTitle: "Magnetic Field Lines",
              bullets: [
                "**Magnetic field**: region around a magnet where another magnetic pole experiences a magnetic force",
                "Field lines point from **North to South** externally; lines never cross; closer lines indicate a stronger magnetic field",
                "**Uniform magnetic field**: parallel, equally spaced straight lines between opposite flat poles of two magnets",
                "Plotting fields: use iron filings for overall pattern or a small plotting compass to trace continuous field lines"
              ]
            }
          ]
        },
        {
          title: "Electric Charge, Current, Voltage and Resistance",
          body: "Electric charge is a fundamental property of matter. Charges can be positive or negative. Moving charges constitute an electric current, propelled by potential difference and opposed by resistance.",
          groups: [
            {
              subTitle: "Static Electricity and Electric Fields",
              bullets: [
                "Charging by friction: electrons transfer between insulators (e.g. polythene gains electrons $\\to$ negative; perspex/acetate loses electrons $\\to$ positive); like charges repel, unlike charges attract",
                "**Electric field**: region where an electric charge experiences an electrostatic force; field lines point in the direction of force on a positive test charge (away from positive, toward negative)",
                "**Conductors** (e.g. copper, aluminum) contain free mobile electrons; **Insulators** (e.g. rubber, plastic, glass) have tightly bound electrons"
              ]
            },
            {
              subTitle: "Current, EMF and Potential Difference",
              bullets: [
                "**Current ($I$)**: rate of flow of electric charge: $I = \\frac{Q}{t}$ (unit: Ampere (A); $1\\text{ A} = 1\\text{ C/s}$)",
                "**Conventional current**: flow from positive to negative; **Electron flow**: flow of free electrons from negative to positive",
                "**Electromotive Force (e.m.f.)**: energy supplied by a source in driving 1 Coulomb of charge around a complete circuit ($V = \\frac{W}{Q}$)",
                "**Potential Difference (p.d. / Voltage $V$)**: energy transferred per unit charge when charge passes between two points in a circuit ($1\\text{ V} = 1\\text{ J/C}$)",
                "Ammeters are connected in **series** (low resistance); Voltmeters are connected in **parallel** across components (high resistance)"
              ]
            },
            {
              subTitle: "Resistance and Ohm's Law",
              bullets: [
                "**Resistance ($R$)**: ratio of potential difference across a component to current flowing through it: $R = \\frac{V}{I}$ (unit: Ohm $\\Omega$)",
                "**Ohm's Law**: for an ohmic conductor at constant temperature, current is directly proportional to voltage ($I \\propto V$ $\\to$ linear I-V graph through origin)",
                "**Factors affecting wire resistance**: $R \\propto L$ (doubling length doubles resistance), $R \\propto \\frac{1}{A}$ (doubling cross-sectional area halves resistance), material, and temperature",
                "**Filament lamp**: as current increases, filament heats up $\\to$ lattice ions vibrate more $\\to$ resistance increases (I-V curve flattens)",
                "**Diode**: conducts current in forward bias only ($V > 0.6\\text{ V}$); infinite resistance in reverse bias"
              ]
            }
          ]
        },
        {
          title: "Electric Circuits and Electrical Power",
          body: "Components can be arranged in series (single pathway) or parallel (multiple branches). Understanding circuit analysis rules is essential for electrical engineering and power distribution.",
          groups: [
            {
              subTitle: "Series vs Parallel Circuit Rules",
              bullets: [
                "**Series Circuits**: current is identical at all points ($I = I_1 = I_2$); total voltage is shared ($V_{\\text{total}} = V_1 + V_2$); total resistance sums: $R_{\\text{total}} = R_1 + R_2$",
                "**Parallel Circuits**: voltage is identical across every branch ($V = V_1 = V_2$); total current divides into branches ($I_{\\text{total}} = I_1 + I_2$); total resistance: $\\frac{1}{R_{\\text{total}}} = \\frac{1}{R_1} + \\frac{1}{R_2}$ ($R_{\\text{total}} = \\frac{R_1 R_2}{R_1 + R_2}$)",
                "Advantages of parallel circuits: each appliance operates at full mains voltage; turning off one component does not break the circuit for others"
              ]
            },
            {
              subTitle: "Sensors and Potential Dividers",
              bullets: [
                "**Thermistor (NTC)**: temperature increases $\\to$ resistance decreases (TURD: Temperature Up Resistance Down)",
                "**Light-Dependent Resistor (LDR)**: light intensity increases $\\to$ resistance decreases (LURD: Light Up Resistance Down)",
                "**Potential Divider**: divides input voltage across two series resistors: $V_2 = V_{\\text{in}} \\times \\frac{R_2}{R_1 + R_2}$; used with LDRs/thermistors to switch on lights or heating automatically"
              ]
            },
            {
              subTitle: "Electrical Power and Safety",
              bullets: [
                "**Electrical Power**: $P = IV = I^2R = \\frac{V^2}{R}$ (unit: Watt (W))",
                "**Electrical Energy**: $E = Pt = IVt$ (unit: Joule (J) or kilowatt-hour $\\text{kWh}$)",
                "**Safety devices**: **Fuse** contains thin wire that melts if current exceeds rating; must be placed on **live wire**",
                "**Earth wire**: provides a safe, low-resistance path to ground if the live wire touches the metal casing, drawing high current to blow the fuse",
                "**Double insulation**: appliances with plastic casings (marked with double-square symbol) do not require an earth wire"
              ]
            }
          ]
        },
        {
          title: "Electromagnetic Effects: Motors, Generators and Transformers",
          body: "Electric currents produce magnetic fields (electromagnetism), and changing magnetic fields induce voltages (electromagnetic induction). These principles drive electric motors, generators, and transformers.",
          groups: [
            {
              subTitle: "The Motor Effect and DC Motors",
              bullets: [
                "A current-carrying conductor in a perpendicular magnetic field experiences a mechanical force",
                "**Fleming's Left-Hand Rule**: **F**irst finger = **F**ield (N $\\to$ S), se**C**ond finger = **C**urrent (+ $\\to$ -), **T**humb = **T**hrust / Motion force",
                "**DC Electric Motor**: a coil in a magnetic field experiences opposite forces on either side, creating a turning torque; a **split-ring commutator** reverses current direction every half-turn ($180^\\circ$) to maintain continuous rotation in one direction"
              ]
            },
            {
              subTitle: "Electromagnetic Induction and AC Generators",
              bullets: [
                "When a wire cuts magnetic field lines (or when magnetic flux through a coil changes), an **electromotive force (e.m.f.) is induced**",
                "**Faraday's Law**: induced e.m.f. is directly proportional to rate of cutting magnetic field lines (increased by faster rotation, stronger magnets, more coil turns)",
                "**Lenz's Law**: direction of induced current always opposes the change that created it",
                "**AC Alternator / Generator**: uses rotating coil and **slip rings with carbon brushes** to produce a continuous alternating current output"
              ]
            },
            {
              subTitle: "Transformers and Grid Transmission",
              bullets: [
                "Consists of primary coil, soft iron core, and secondary coil; operates only with alternating current (AC) because changing primary current creates changing magnetic flux in the core",
                "**Transformer Equation**: $\\frac{V_p}{V_s} = \\frac{N_p}{N_s}$ (Step-up: $N_s > N_p, V_s > V_p$; Step-down: $N_s < N_p, V_s < V_p$)",
                "**100% Efficient Transformer**: $P_{\\text{in}} = P_{\\text{out}} \\to V_p I_p = V_s I_s$",
                "**National Grid Power Transmission**: electricity is stepped up to extremely high voltages (e.g. 400 kV) for long-distance cables $\\to$ current is reduced $\\to$ power loss as heat ($P_{\\text{loss}} = I^2R$) is dramatically minimized"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Nuclear Physics",
      intro: "Nuclear physics explores the core of the atom. It investigates atomic structure, alpha scattering, the nature and characteristics of radioactive emissions, radioactive decay and half-life, and the immense energy released through nuclear fission and fusion.",
      subheadings: [
        {
          title: "The Nuclear Model of the Atom",
          body: "Atoms consist of a dense, positively charged central nucleus surrounded by orbiting electrons. The modern nuclear model was established through Rutherford's alpha particle scattering experiment.",
          groups: [
            {
              subTitle: "Rutherford Alpha Particle Scattering Experiment",
              bullets: [
                "Alpha particles ($\alpha$, positive helium nuclei) fired at a very thin sheet of gold foil in a vacuum",
                "**Observation 1**: Most $\alpha$-particles passed straight through undeflected $\\to$ **Conclusion**: the atom is mostly empty space",
                "**Observation 2**: A small fraction deflected through large angles $\\to$ **Conclusion**: the nucleus carries a concentrated positive charge",
                "**Observation 3**: Very few ($1 \\text{ in } 8000$) bounced directly backwards $\\to$ **Conclusion**: the nucleus is extremely small and contains almost all the mass of the atom"
              ]
            },
            {
              subTitle: "Atomic Composition and Nuclide Notation",
              bullets: [
                "**Proton**: mass 1 u, charge $+1 e$, in nucleus",
                "**Neutron**: mass 1 u, charge $0$, in nucleus",
                "**Electron**: mass $\\approx \\frac{1}{1840}$ u, charge $-1 e$, orbiting in electron shells",
                "**Nuclide notation**: $^{A}_{Z}\\text{X}$, where $A$ is the nucleon (mass) number (protons + neutrons), and $Z$ is the proton (atomic) number",
                "**Isotopes**: atoms of the same chemical element with the **same number of protons ($Z$)** but **different numbers of neutrons ($A - Z$)**; identical chemical properties, different physical nuclear stability"
              ]
            }
          ]
        },
        {
          title: "Radioactivity: Types, Properties and Decay Equations",
          body: "Unstable nuclei randomly decay by emitting ionising radiation to achieve a more stable nuclear configuration. The three primary types of nuclear radiation are alpha, beta, and gamma.",
          groups: [
            {
              subTitle: "Comparison of Alpha, Beta and Gamma Radiation",
              bullets: [
                "**Alpha ($\alpha$ or $^{4}_{2}\\text{He}$)** — helium-4 nucleus (2 protons, 2 neutrons); charge $+2$; high mass; **strongly ionising**; **weakly penetrating** (stopped by a sheet of paper or a few cm of air)",
                "**Beta ($\\beta^-$ or $^{0}_{-1}\\text{e}$)** — fast-moving high-energy electron emitted from nucleus when a neutron converts to a proton; charge $-1$; low mass; **moderately ionising**; **moderately penetrating** (stopped by a few mm of aluminum)",
                "**Gamma ($\gamma$)** — high-frequency electromagnetic wave; charge $0$; mass $0$; **weakly ionising**; **highly penetrating** (attenuated by several cm of lead or thick concrete)"
              ]
            },
            {
              subTitle: "Deflection in Fields and Background Radiation",
              bullets: [
                "**Magnetic and Electric fields**: $\alpha$ curves towards negative plate (slight deflection due to large mass); $\beta^-$ curves towards positive plate (large deflection due to tiny mass); $\gamma$ is uncharged and passes completely straight undeflected",
                "**Background radiation**: ubiquitous ionizing radiation from natural (radon gas from rocks, cosmic rays, food/carbon-14) and artificial (medical X-rays, nuclear weapons tests) sources",
                "Always subtract background count rate from measured readings to determine the true source activity"
              ]
            },
            {
              subTitle: "Nuclear Decay Equations",
              bullets: [
                "**Alpha decay**: mass number decreases by 4, atomic number decreases by 2: $^{A}_{Z}\\text{X} \\to ^{A-4}_{Z-2}\\text{Y} + ^{4}_{2}\\text{He}$",
                "**Beta decay**: mass number unchanged, atomic number increases by 1: $^{A}_{Z}\\text{X} \\to ^{A}_{Z+1}\\text{Y} + ^{0}_{-1}\\text{e}$",
                "**Gamma decay**: nuclear de-excitation with no change in mass or atomic number: $^{A}_{Z}\\text{X}^* \\to ^{A}_{Z}\\text{X} + \gamma$"
              ]
            }
          ]
        },
        {
          title: "Radioactive Half-Life and Practical Applications",
          body: "Radioactive decay is spontaneous and completely random. The activity of a sample is measured in Becquerels (Bq, decays per second) and halves consistently over fixed intervals.",
          groups: [
            {
              subTitle: "Half-Life Calculations",
              bullets: [
                "**Half-life ($t_{1/2}$)**: the time required for half the unstable nuclei in a sample to decay (or the time for the activity of a source to halve)",
                "Decay pattern: $100\\% \\to 50\\% \\to 25\\% \\to 12.5\\% \\to 6.25\\%$ after 1, 2, 3, 4 half-lives",
                "**Example calculation**: a sample with initial activity 800 Bq and half-life 6 hours will have an activity of $800 \\times (\\frac{1}{2})^3 = 100\\text{ Bq}$ after 18 hours (3 half-lives)"
              ]
            },
            {
              subTitle: "Applications and Safety Precautions",
              bullets: [
                "**Smoke detectors**: Americium-241 (alpha source) ionises air to produce a steady current; smoke particles block alpha particles $\\to$ current drops $\\to$ alarm triggers",
                "**Thickness monitoring**: Beta emitter placed above sheet paper/foil with GM tube below; if sheet is too thick, count rate drops $\\to$ automated rollers adjust pressure",
                "**Medical tracers**: short-lived gamma emitters (e.g. Technetium-99m, $t_{1/2} = 6\\text{ h}$) injected into body; detected externally without severe tissue ionization",
                "**Archaeological Carbon-14 dating**: ratio of radioactive C-14 to stable C-12 in organic matter decreases after death with $t_{1/2} = 5730\\text{ years}$",
                "**Safety**: minimize exposure time, maximize distance (tongs/remote handling), lead shielding, wear radiation film dosimeter badges, store in thick lead-lined containers"
              ]
            }
          ]
        },
        {
          title: "Nuclear Fission and Fusion",
          body: "Nuclear reactions convert minute quantities of mass into vast quantities of kinetic energy according to Einstein's mass-energy equivalence ($E = mc^2$).",
          groups: [
            {
              subTitle: "Nuclear Fission",
              bullets: [
                "Splitting of a large, unstable heavy nucleus into two smaller daughter nuclei, 2–3 neutrons, and kinetic energy",
                "**Induced fission**: a slow-moving thermal neutron is absorbed by a Uranium-235 nucleus $\\to$ $^{235}_{92}\\text{U} + ^{1}_{0}\\text{n} \\to ^{141}_{56}\\text{Ba} + ^{92}_{36}\\text{Kr} + 3^{1}_{0}\\text{n} + \\text{energy}$",
                "**Chain Reaction**: released neutrons can trigger fission in neighbouring U-235 nuclei; controlled in reactors using **boron control rods** (absorb excess neutrons) and **graphite/water moderator** (slows down fast neutrons to thermal speeds)"
              ]
            },
            {
              subTitle: "Nuclear Fusion",
              bullets: [
                "Joining together of two light atomic nuclei (e.g. Hydrogen isotopes deuterium $^{2}_{1}\\text{H}$ and tritium $^{3}_{1}\\text{H}$) to form a heavier nucleus ($^{4}_{2}\\text{He} + ^{1}_{0}\\text{n}$) with the release of massive energy",
                "**Energy source of stars**: nuclear fusion powers the Sun and all main sequence stars",
                "**Technical challenge on Earth**: nuclei are positively charged and repel via strong electrostatic forces; fusion requires extreme temperatures ($>10^7\\text{ K}$) and high pressures to overcome repulsion and force nuclei close enough for the strong nuclear force to bind them"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Space Physics",
      intro: "Space physics investigates astronomical bodies, the mechanics of planetary orbits, the life cycle of stars, and the origin and ongoing expansion of the Universe. It connects gravitational mechanics with modern cosmological discoveries such as redshift, the Hubble constant, and the Big Bang.",
      subheadings: [
        {
          title: "The Solar System and Planetary Motion",
          body: "The Solar System comprises the Sun, eight planets, dwarf planets, natural satellites (moons), asteroids, and comets, all gravitationally bound in orbital motion.",
          groups: [
            {
              subTitle: "Planetary Arrangement and Characteristics",
              bullets: [
                "**Order of planets from the Sun**: **M**ercury, **V**enus, **E**arth, **M**ars (terrestrial rocky inner planets), **J**upiter, **S**aturn, **U**ranus, **N**eptune (gas giants and ice giants) — mnemonic: *My Very Educated Mother Just Served Us Noodles*",
                "**Asteroids**: rocky objects orbiting mainly in the **Asteroid Belt** between Mars and Jupiter",
                "**Comets**: bodies of ice, dust, and rock with highly elongated, eccentric elliptical orbits; speed is highest when closest to the Sun (perihelion) due to strongest gravitational pull",
                "**Dwarf planets**: nearly spherical bodies that have not cleared their orbital neighbourhood (e.g. Pluto, Ceres, Eris)"
              ]
            },
            {
              subTitle: "Gravitational Field Strength and Orbital Mechanics",
              bullets: [
                "Gravitational field strength $g$ on a planet's surface depends on its mass ($g \\propto M$) and radius ($g \\propto \\frac{1}{r^2}$); Jupiter has highest $g$, Mercury the lowest among major planets",
                "**Orbital speed formula**: $v = \\frac{2\\pi r}{T}$ (where $r$ is orbital radius and $T$ is orbital period)",
                "Planets further from the Sun have larger orbital radii, experience weaker gravitational attraction, travel at lower orbital speeds, and take significantly longer to complete one orbit ($T^2 \\propto r^3$)"
              ]
            }
          ]
        },
        {
          title: "Stars and Stellar Evolution",
          body: "Stars form from interstellar clouds of gas and dust. A star's ultimate fate and lifespan are determined entirely by its initial mass.",
          groups: [
            {
              subTitle: "Life Cycle of Low-Mass Stars (Similar to our Sun)",
              bullets: [
                "1. **Nebula**: giant cloud of interstellar hydrogen gas and dust collapses under gravity",
                "2. **Protostar**: gravitational potential energy converts to thermal energy; temperature and pressure rise until nuclear fusion begins",
                "3. **Main Sequence Star**: stable phase where outward radiation pressure from nuclear fusion ($4\\text{H} \\to \\text{He}$) precisely balances inward gravitational force",
                "4. **Red Giant**: hydrogen in core depletes; core contracts and heats; outer layers expand and cool; helium fuses into carbon and oxygen",
                "5. **Planetary Nebula & White Dwarf**: outer layers are expelled into space; hot, dense carbon core remains as a white dwarf",
                "6. **Black Dwarf**: white dwarf cools and fades over billions of years"
              ]
            },
            {
              subTitle: "Life Cycle of Massive Stars (High Mass)",
              bullets: [
                "Nebula $\\to$ Protostar $\\to$ Massive Main Sequence Star $\\to$ **Red Supergiant** (fuses elements up to iron in concentric shells)",
                "**Supernova**: core collapses catastrophically when iron fusion consumes energy; outer layers explode violently into space, synthesizing and dispersing all heavy elements ($Z > 26$) into the cosmos",
                "**Core Remnant**: leaves behind an ultra-dense **Neutron Star** (for high mass) or collapses infinitely into a **Black Hole** with gravitational pull so strong that even light cannot escape"
              ]
            },
            {
              subTitle: "Astronomical Distances",
              bullets: [
                "**Light-year (ly)**: the distance that light travels through a vacuum in one Earth year: $1\\text{ ly} = c \\times 1\\text{ year} = (3.0 \\times 10^8\\text{ m/s}) \\times (365.25 \\times 24 \\times 3600\\text{ s}) \\approx 9.5 \\times 10^{15}\\text{ m} = 9.5 \\times 10^{12}\\text{ km}$",
                "The Sun is part of the **Milky Way galaxy**, a spiral galaxy containing billions of stars spanning approximately $100,000\\text{ light-years}$ across"
              ]
            }
          ]
        },
        {
          title: "Cosmology and the Expanding Universe",
          body: "Observational astrophysics demonstrates that distant galaxies are receding from us. Redshift of galactic spectra and Cosmic Microwave Background Radiation provide compelling evidence for the Big Bang.",
          groups: [
            {
              subTitle: "Redshift and Doppler Effect",
              bullets: [
                "**Doppler Effect**: when a wave source moves relative to an observer, observed wavelength and frequency shift",
                "**Redshift**: light from distant galaxies shows absorption lines shifted towards the longer-wavelength (red) end of the spectrum",
                "**Interpretation**: the space between galaxies is stretching $\\to$ distant galaxies are moving away from us",
                "The further away a galaxy is from Earth, the greater its redshift $\\to$ the faster it is receding"
              ]
            },
            {
              subTitle: "Hubble's Law and the Age of the Universe",
              bullets: [
                "**Hubble's Law**: the recessional velocity ($v$) of a distant galaxy is directly proportional to its distance ($d$) from Earth: $v = H_0 d$",
                "**Hubble Constant ($H_0$)**: estimated at approximately $H_0 \\approx 2.2 \\times 10^{-18}\\text{ s}^{-1}$ (or $\\approx 70\\text{ km/s/Mpc}$)",
                "**Age of the Universe ($t$)**: since time = distance / velocity, $t = \\frac{d}{v} = \\frac{1}{H_0} \\approx \\frac{1}{2.2 \\times 10^{-18}\\text{ s}^{-1}} \\approx 4.5 \\times 10^{17}\\text{ s} \\approx 13.8\\text{ billion years}$"
              ]
            },
            {
              subTitle: "The Big Bang Theory and CMBR",
              bullets: [
                "**The Big Bang Theory**: the Universe originated from an extremely hot, infinitely dense single point (singularity) approximately 13.8 billion years ago and has been expanding and cooling ever since",
                "**Cosmic Microwave Background Radiation (CMBR)**: ubiquitous microwave radiation detected uniformly from all directions in space",
                "**Origin of CMBR**: thermal radiation produced in the early hot Big Bang; as the Universe expanded, the radiation stretched to microwave wavelengths (temperature $\\approx 2.7\\text{ K}$)",
                "CMBR and universal redshift together provide decisive evidence confirming the Big Bang cosmological model"
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const SYLLABUS_NOTES: SubjectNotes[] = [BIOLOGY, CHEMISTRY, PHYSICS];
// Available: Biology (0610) — 21 chapters | Chemistry (0620) — 12 chapters | Physics (0625) — 6 chapters

