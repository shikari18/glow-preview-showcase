import type { SubjectNotes } from "./types";

export const BIOLOGY: SubjectNotes = {
  "id": "biology",
  "name": "Biology",
  "code": "0610",
  "color": "bg-emerald-500",
  "chapters": [
    {
      "number": 1,
      "title": "Characteristics and Classification of Living Organisms",
      "intro": "All living organisms share seven fundamental life processes, remembered by the acronym MRSGREN. Biologists classify organisms hierarchically based on evolutionary ancestry, morphological features, and modern DNA base sequence similarities. Organisms are designated using the standardized binomial nomenclature system.",
      "subheadings": [
        {
          "title": "The Seven Life Processes (MRSGREN)",
          "body": "Every living organism carries out all seven life processes. In contrast, non-living structures (including viruses, which lack metabolic cellular machinery and ribosomes) cannot carry out these processes independently.",
          "groups": [
            {
              "bullets": [
                "**Movement**: An action by an organism or part of an organism causing a change of position or of place (e.g. phototropism in plants, muscular locomotion in animals).",
                "**Respiration**: The chemical reactions in cells that break down nutrient molecules (such as glucose) and release energy for metabolism.",
                "**Sensitivity**: The ability to detect or sense stimuli in the internal or external environment and to make appropriate responses.",
                "**Growth**: A permanent increase in size and dry mass by an increase in cell number, cell size, or both.",
                "**Reproduction**: The biological processes that make more of the same kind of organism (sexual involving gamete fusion, or asexual producing clones).",
                "**Excretion**: The removal from organisms of the waste products of metabolism (chemical reactions in cells including respiration), toxic substances, and substances in excess of requirements.",
                "**Nutrition**: The taking in of materials for energy, growth, and development (autotrophic via photosynthesis in plants; heterotrophic via ingestion in animals)."
              ]
            }
          ]
        },
        {
          "title": "Classification System, Domains and Kingdoms",
          "body": "Taxonomy organizes biodiversity into a nested hierarchy: Kingdom \u2192 Phylum \u2192 Class \u2192 Order \u2192 Family \u2192 Genus \u2192 Species. Modern taxonomy relies heavily on DNA base sequencing and amino acid sequences of proteins (e.g. haemoglobin, cytochrome c) to establish evolutionary relationships.",
          "groups": [
            {
              "subTitle": "Binomial System",
              "bullets": [
                "**Format**: Two-part scientific Latin name consisting of Genus (capitalised) followed by species (lowercase), written in italics (*Homo sapiens*) or underlined when handwritten."
              ]
            },
            {
              "subTitle": "The Five Kingdoms of Life",
              "bullets": [
                "**Animals (Animalia)**: Multicellular eukaryotes, cells lack cell walls and chloroplasts; heterotrophic nutrition by ingestion; possess nervous coordination.",
                "**Plants (Plantae)**: Multicellular eukaryotes, cells have cellulose cell walls and chloroplasts containing chlorophyll; autotrophic nutrition by photosynthesis; store carbohydrates as starch.",
                "**Fungi**: Eukaryotic (mostly multicellular with hyphae forming a mycelium; yeasts are unicellular); cell walls made of **chitin**; saprotrophic nutrition (secrete extracellular enzymes to digest organic matter and absorb nutrients); store glycogen.",
                "**Protoctists**: Eukaryotes (mostly unicellular or simple multicellular); protozoa (animal-like, e.g. *Amoeba*, *Plasmodium*) and algae (plant-like with chloroplasts, e.g. *Chlorella*, *Spirogyra*).",
                "**Prokaryotes (Bacteria)**: Microscopic unicellular organisms lacking a true nucleus or membrane-bound organelles; circular DNA loop (nucleoid) and accessory plasmids; cell walls of **peptidoglycan** (murein)."
              ]
            },
            {
              "subTitle": "Vertebrate Classes",
              "bullets": [
                "**Fish**: Ectothermic (cold-blooded), wet scales, streamlined body, breathe with gills, lay unshelled soft eggs in water, lateral line sensory organ.",
                "**Amphibians**: Ectothermic, moist permeable skin for gas exchange, aquatic larvae with gills, terrestrial adults with simple lungs, lay jelly-covered eggs in water.",
                "**Reptiles**: Ectothermic, dry tough scaly skin to prevent dehydration, lungs for respiration, lay leathery-shelled eggs on land.",
                "**Birds (Aves)**: Endothermic (warm-blooded), feathers, forelimbs modified into wings, toothless keratin beak, lay hard calcium carbonate-shelled eggs.",
                "**Mammals**: Endothermic, hair or fur, mammary glands producing milk for young, give birth to live young (viviparous), internal diaphragm, specialized heterodont teeth."
              ]
            },
            {
              "subTitle": "Arthropod Groups",
              "bullets": [
                "**Insects**: 3 body segments (head, thorax, abdomen), 3 pairs of jointed legs, 1 pair of antennae, compound eyes, usually 1 or 2 pairs of wings.",
                "**Arachnids**: 2 body segments (cephalothorax and abdomen), 4 pairs of legs, no antennae, chelicerae with venom/fangs (spiders, scorpions).",
                "**Crustaceans**: Cephalothorax and abdomen, 5 or more pairs of legs (chalky hard exoskeleton impregnated with calcium salts), 2 pairs of antennae (crabs, lobsters, woodlice).",
                "**Myriapods**: Elongated segmented body, 1 pair of antennae, simple eyes; centipedes (1 pair of legs per segment, carnivorous) vs millipedes (2 pairs of legs per segment, herbivorous)."
              ]
            }
          ]
        },
        {
          "title": "Dichotomous Keys and Plant Classification",
          "body": "Dichotomous identification keys provide paired contrasting choices based on clear, observable morphological features. Plant taxonomy distinguishes flowering plants (Angiosperms) into monocotyledons and dicotyledons.",
          "groups": [
            {
              "subTitle": "Monocotyledons vs Dicotyledons",
              "bullets": [
                "**Monocots**: 1 seed cotyledon, parallel leaf venation, fibrous root system, scattered vascular bundles in stem, flower parts in multiples of 3 (e.g. grasses, maize, wheat).",
                "**Dicots (Eudicots)**: 2 seed cotyledons, reticulate (net-like) leaf venation, taproot system, ring-arranged vascular bundles in stem, flower parts in multiples of 4 or 5 (e.g. beans, oak trees)."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 2,
      "title": "Organisation of the Organism",
      "intro": "The cell is the basic structural and functional unit of all living organisms. Multicellular organisms exhibit a hierarchy of structural organisation: specialized cells form tissues, tissues form organs, organs form organ systems, and organ systems cooperate to sustain the multicellular organism.",
      "subheadings": [
        {
          "title": "Cell Ultrastructure and Organelles",
          "body": `Cells contain specialized subcellular structures (organelles) suspended within the cytoplasm, each performing specific biochemical functions.

![Ultrastructure Comparison: Animal Cell vs. Plant Cell](/diagrams/cell-structure.svg)`,
          "groups": [
            {
              "subTitle": "Universal Organelles in Plant and Animal Cells",
              "bullets": [
                "**Cell Membrane (Plasma Membrane)**: Phospholipid bilayer containing transport proteins; partially permeable barrier regulating substance movement into and out of the cell.",
                "**Cytoplasm**: Aqueous gel containing dissolved enzymes, sugars, and mineral ions; site of cellular metabolic reactions and glycolysis.",
                "**Nucleus**: Double-membrane nuclear envelope with nuclear pores enclosing chromatin (DNA wrapped around histone proteins); controls gene expression and cell division.",
                "**Mitochondria**: Double-membraned organelle with folded inner cristae; site of aerobic cellular respiration producing ATP.",
                "**Ribosomes (80S)**: Small ribonucleoprotein complexes (free in cytoplasm or bound to rough endoplasmic reticulum); site of polypeptide protein synthesis."
              ]
            },
            {
              "subTitle": "Organelles Found ONLY in Plant Cells",
              "bullets": [
                "**Cellulose Cell Wall**: Fully permeable rigid meshwork of cellulose microfibrils; provides structural tensile strength and prevents cell lysis under turgor pressure.",
                "**Chloroplasts**: Double-membrane organelles containing thylakoid membranes with chlorophyll; capture light photons for photosynthesis.",
                "**Large Permanent Central Vacuole**: Fluid-filled membrane-bound compartment (tonoplast) storing cell sap (water, mineral ions, sugars); maintains hydrostatic turgor pressure."
              ]
            },
            {
              "subTitle": "Bacterial Cell Ultrastructure",
              "bullets": [
                "**Structures**: Peptidoglycan cell wall, circular chromosomal DNA loop (no nuclear membrane), 70S ribosomes, plasmids (small circular DNA vectors carrying antibiotic resistance genes), and flagella for motility."
              ]
            }
          ]
        },
        {
          "title": "Levels of Organisation and Specialised Cells",
          "body": "Cellular differentiation enables cells to develop specialised structural adaptations to carry out specific functions efficiently.",
          "groups": [
            {
              "subTitle": "Hierarchy",
              "bullets": [
                "**Cell**: Basic living unit (e.g. muscle cell, palisade cell).",
                "**Tissue**: Group of similar cells with shared structure working together to perform a shared function (e.g. ciliated epithelium, xylem tissue).",
                "**Organ**: Structure made of different tissues working together to perform a specific physiological task (e.g. heart, stomach, leaf).",
                "**Organ System**: Group of coordinated organs with related functions (e.g. digestive system, circulatory system)."
              ]
            },
            {
              "subTitle": "Specialised Cell Adaptations",
              "bullets": [
                "**Ciliated Epithelial Cells**: Rhythmic beating cilia sweep mucus and trapped pathogens out of the respiratory trachea and bronchi.",
                "**Root Hair Cells**: Elongated tubular extension greatly increases surface area to volume ratio for rapid osmosis and active transport of mineral ions.",
                "**Xylem Vessel Elements**: Hollow continuous dead tubes with thick walls lignified with lignin rings/spirals for water transport under tension and mechanical stem support.",
                "**Red Blood Cells (Erythrocytes)**: Biconcave disc shape increases surface area for $O_2$ diffusion; devoid of nucleus to maximize haemoglobin storage.",
                "**Spermatozoa**: Flagellum for propulsion; concentrated mitochondria in midpiece producing ATP; acrosome containing digestive enzymes to penetrate the egg's zona pellucida."
              ]
            }
          ]
        },
        {
          "title": "Magnification Calculations",
          "body": "Calculating actual sizes and magnifications of biological specimens using the standard triangle formula.",
          "groups": [
            {
              "bullets": [
                "**The Formula**: $\\text{Magnification} = \\frac{\\text{Image Size (I)}}{\\text{Actual Size (A)}} \\iff A = \\frac{I}{M} \\iff I = A \\times M$.",
                "**Unit Conversions**: $1\\text{ metre} = 1000\\text{ mm}$; $1\\text{ mm} = 1000\\text{ }\\mu\\text{m}$ (micrometres).",
                "**Rule**: Always convert Image size and Actual size to the identical unit (usually micrometres $\\mu\\text{m}$ or millimetres $\\text{mm}$) before performing division."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 3,
      "title": "Movement into and out of Cells",
      "intro": "Molecules and ions move across cell membranes and within tissues through passive physical processes (diffusion and osmosis) and active cellular processes (active transport). These transport mechanisms control nutrient uptake, gas exchange, excretion, and the maintenance of internal water potential in all living cells.",
      "subheadings": [
        {
          "title": "Diffusion and Factors Affecting Rate",
          "body": "Diffusion is the net movement of particles from a region of their higher concentration to a region of their lower concentration down a concentration gradient, as a result of their random kinetic motion.",
          "groups": [
            {
              "subTitle": "Key Factors Influencing Diffusion Rate",
              "bullets": [
                "**Concentration Gradient**: Steeper concentration difference $\\implies$ faster net diffusion rate.",
                "**Temperature**: Higher temperature increases particle kinetic energy $\\implies$ faster movement and collision rate.",
                "**Surface Area**: Larger surface area (e.g. folded microvilli, alveolar capillaries) $\\implies$ more area for particles to cross simultaneously.",
                "**Diffusion Distance**: Thinner membrane barriers (e.g. single-cell capillary and alveolar walls $\\approx 1\\,\\mu\\text{m}$) $\\implies$ shorter travel distance and much faster diffusion."
              ]
            }
          ]
        },
        {
          "title": "Osmosis and Water Potential",
          "body": "Osmosis is the net movement of water molecules from a region of higher water potential (dilute solution) to a region of lower water potential (concentrated solution), through a partially permeable membrane.",
          "groups": [
            {
              "subTitle": "Water Potential in Plant Cells",
              "bullets": [
                "**Pure Water**: Has the highest water potential ($\\Psi = 0\\text{ kPa}$); adding solutes lowers water potential to negative values.",
                "**Hypotonic (High $\\Psi$) Environment**: Water enters by osmosis $\\to$ protoplast expands $\\to$ cell becomes **turgid** as internal hydrostatic pressure pushes firmly against the strong cellulose cell wall.",
                "**Hypertonic (Low $\\Psi$) Environment**: Water leaves by osmosis $\\to$ cytoplasm shrinks away from the cell wall $\\to$ cell becomes **plasmolysed** (flaccid, leading to plant wilting)."
              ]
            },
            {
              "subTitle": "Water Potential in Animal Cells",
              "bullets": [
                "**Hypotonic Solution**: Water rushes in; lacking a cell wall, the animal cell swells and bursts (**lysis** / haemolysis in red blood cells).",
                "**Hypertonic Solution**: Water rushes out; cell shrivels and shrinks (**crenation**)."
              ]
            }
          ]
        },
        {
          "title": "Active Transport",
          "body": "Active transport is the movement of particles through a cell membrane from a region of lower concentration to a region of higher concentration (against a concentration gradient), using energy released from respiration.",
          "groups": [
            {
              "bullets": [
                "**Carrier Proteins**: Specific transmembrane carrier proteins in the phospholipid membrane bind target molecules and change conformation using ATP energy.",
                "**Examples in Biology**: Mineral ion uptake by plant root hair cells from dilute soil solutions; glucose and amino acid reabsorption in the proximal convoluted tubules of human kidneys; glucose absorption across small intestinal villi into blood."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 4,
      "title": "Biological Molecules",
      "intro": "Living matter is constructed from organic macromolecules comprising carbon, hydrogen, oxygen, nitrogen, and phosphorus. The three primary classes of biological molecules are carbohydrates, lipids, and proteins. Nucleic acids (DNA) store genetic code. Standard biochemical reagent tests are used to identify these macromolecules in laboratory investigations.",
      "subheadings": [
        {
          "title": "Carbohydrates, Lipids and Proteins",
          "body": "Structure, monomers, and biological functions of the major classes of biochemical molecules.",
          "groups": [
            {
              "subTitle": "Carbohydrates ($C, H, O$)",
              "bullets": [
                "**Monosaccharides**: Simple single-unit reducing sugars ($C_6H_{12}O_6$) \u2014 **Glucose**, **Fructose**, **Galactose**.",
                "**Disaccharides**: Two monosaccharides joined by glycosidic bonds \u2014 **Maltose** (glucose + glucose), **Sucrose** (glucose + fructose), **Lactose** (glucose + galactose).",
                "**Polysaccharides**: Long polymer chains of glucose \u2014 **Starch** (insoluble energy storage in plants), **Glycogen** (insoluble energy storage in animal liver and muscle cells), **Cellulose** (straight chains forming rigid plant cell walls)."
              ]
            },
            {
              "subTitle": "Lipids (Fats and Oils) ($C, H, O$)",
              "bullets": [
                "**Structure**: One **Glycerol** molecule esterified with three **Fatty Acid** chains (triglycerides).",
                "**Functions**: Long-term energy storage ($38\\text{ kJ/g}$, double the energy density of carbohydrates), thermal insulation (subcutaneous adipose layer), physical shock protection around organs, and components of cell membranes (phospholipids)."
              ]
            },
            {
              "subTitle": "Proteins ($C, H, O, N$ and some $S$)",
              "bullets": [
                "**Structure**: Long linear chains of **Amino Acids** folded into precise three-dimensional conformations determined by sequence.",
                "**Functions**: Enzymes, structural tissues (keratin, collagen), carrier proteins, hormones (insulin), and antibodies (immunoglobulins)."
              ]
            },
            {
              "subTitle": "DNA Structure ($C, H, O, N, P$)",
              "bullets": [
                "**Double Helix**: Two anti-parallel polynucleotide strands linked by hydrogen bonds between complementary base pairs.",
                "**Base Pairing**: **Adenine (A)** pairs with **Thymine (T)** ($2$ hydrogen bonds); **Cytosine (C)** pairs with **Guanine (G)** ($3$ hydrogen bonds)."
              ]
            }
          ]
        },
        {
          "title": "Laboratory Food Tests",
          "body": "Standard qualitative and semi-quantitative biochemical reagents used to identify nutrient classes.",
          "groups": [
            {
              "bullets": [
                "**Reducing Sugars (Benedict's Test)**: Add Benedict's reagent and heat in a boiling water bath at $80-100^\\circ\\text{C}$ for 5 minutes. Blue $\\to$ Green $\\to$ Yellow $\\to$ Orange $\\to$ **Brick-red precipitate**.",
                "**Starch (Iodine Test)**: Add a few drops of iodine in potassium iodide solution. Yellow-brown $\\to$ **Blue-black**.",
                "**Proteins (Biuret Test)**: Add Biuret reagent (potassium hydroxide + copper sulfate). Blue $\\to$ **Purple / Violet**.",
                "**Lipids (Ethanol Emulsion Test)**: Dissolve sample in pure ethanol, decant liquid into a tube of cold water. Clear $\\to$ **Milky white cloudy emulsion**.",
                "**Vitamin C (DCPIP Test)**: Add sample dropwise into blue DCPIP dye. Blue $\\to$ **Decolourised / Colourless**."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 5,
      "title": "Enzymes",
      "intro": "Enzymes are biological catalysts made of protein that increase the rate of specific chemical reactions without being consumed in the process. Enzyme activity depends upon the shape of their active site and is strongly influenced by temperature, pH, and substrate concentration.",
      "subheadings": [
        {
          "title": "Mechanism of Enzyme Action (Lock and Key Model)",
          "body": "Enzymes possess a specific three-dimensional active site complementary in shape to their specific substrate molecules.",
          "groups": [
            {
              "bullets": [
                "**Catalytic Action**: Lower the activation energy required for chemical reactions to proceed at body temperatures ($37^\\circ\\text{C}$).",
                "**Lock and Key Hypothesis**: The enzyme's active site acts as a rigid lock, and the complementary substrate acts as the key. They collide to form an **Enzyme-Substrate Complex (ESC)**, converting substrates into products before the unchanged enzyme is released to catalyze another cycle."
              ]
            }
          ]
        },
        {
          "title": "Factors Affecting Enzyme Activity",
          "body": "Enzyme reaction kinetics vary systematically with temperature and pH changes.",
          "groups": [
            {
              "subTitle": "Effect of Temperature",
              "bullets": [
                "**Low Temperature**: Molecules have low kinetic energy; few collisions $\\implies$ slow reaction rate.",
                "**Increasing Temperature**: Increases particle kinetic energy $\\implies$ higher collision frequency and formation of ESCs.",
                "**Optimum Temperature**: The temperature at which the enzyme functions at its maximum catalytic velocity ($V_{\\max}$, $\\approx 37-40^\\circ\\text{C}$ in humans).",
                "**Denaturation ($>45-50^\\circ\\text{C}$)**: High thermal kinetic vibration breaks hydrogen and ionic bonds stabilizing tertiary protein structure; active site changes shape permanently, substrate can no longer bind, reaction ceases irreversibly."
              ]
            },
            {
              "subTitle": "Effect of pH",
              "bullets": [
                "**Optimum pH**: Enzymes operate most efficiently at a characteristic pH (e.g. **Pepsin** in stomach at pH 2; **Salivary Amylase** at pH 7; **Trypsin** in small intestine at pH 8).",
                "**Extreme pH**: Excess $H^+$ (acid) or $OH^-$ (alkali) ions alter active site ionic charges and tertiary bonds, leading to denaturation."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 6,
      "title": "Plant Nutrition",
      "intro": "Plants are photoautotrophic organisms that synthesize organic glucose from carbon dioxide and water using light energy absorbed by chlorophyll. Leaves are specialized photosynthetic organs adapted for light interception and gas exchange.",
      "subheadings": [
        {
          "title": "Photosynthesis Equations and Chemistry",
          "body": "Photosynthesis converts solar radiant energy into chemical potential energy stored in the covalent bonds of carbohydrate molecules.",
          "groups": [
            {
              "bullets": [
                "**Word Equation**: $\\text{Carbon dioxide} + \\text{Water} \\xrightarrow{\\text{Light + Chlorophyll}} \\text{Glucose} + \\text{Oxygen}$",
                "**Balanced Chemical Equation**: $6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{Light + Chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$",
                "**Fates of Glucose**: Respiration for ATP; polymerized into insoluble **starch** for storage; converted to **sucrose** for phloem translocation; polymerized into **cellulose** for cell walls; combined with nitrates to form **amino acids/proteins**; converted to **lipids/oils** in seeds."
              ]
            }
          ]
        },
        {
          "title": "Leaf Anatomy and Adaptations",
          "body": "Internal tissue layers of a dorsiventral dicotyledonous leaf optimized for maximum photosynthetic yield.",
          "groups": [
            {
              "bullets": [
                "**Waxy Cuticle**: Waterproof lipid layer preventing excessive water loss by evaporation.",
                "**Upper Epidermis**: Transparent single cell layer permitting maximum light penetration to photosynthetic layers beneath.",
                "**Palisade Mesophyll**: Columnar cells packed vertically near upper surface, densely packed with chloroplasts to maximize light interception.",
                "**Spongy Mesophyll**: Loosely packed spherical cells with extensive air spaces providing a high surface area for rapid gas diffusion ($CO_2, O_2, H_2O$ vapor).",
                "**Vascular Bundle (Vein)**: **Xylem** supplying water and mineral ions; **Phloem** translocating synthesized sucrose and amino acids.",
                "**Stomata & Guard Cells**: Microscopic pores in lower epidermis; turgid guard cells curve open during daytime for $CO_2$ uptake; flaccid guard cells close at night to prevent transpiration."
              ]
            }
          ]
        },
        {
          "title": "Limiting Factors and Mineral Requirements",
          "body": "Photosynthetic rate is governed by the principle of limiting factors and requires essential mineral ions from soil.",
          "groups": [
            {
              "subTitle": "Limiting Factors",
              "bullets": [
                "**Definition**: A factor present in the shortest supply that directly restricts the rate of a physiological process.",
                "**Primary Limiting Factors**: **Light Intensity**, **Carbon Dioxide Concentration**, and **Temperature**.",
                "**Glasshouse Optimization**: Commercial growers burn natural gas to elevate $CO_2$ (to $\\sim 0.1\\%$), install high-intensity grow lights, and maintain thermostatic heating ($25^\\circ\\text{C}$) to maximize crop yields."
              ]
            },
            {
              "subTitle": "Essential Mineral Ions",
              "bullets": [
                "**Nitrate Ions ($NO_3^-$)**: Essential for synthesizing amino acids and proteins; deficiency causes **stunted plant growth** and yellowing of older leaves.",
                "**Magnesium Ions ($Mg^{2+}$)**: Central mineral ion in chlorophyll molecule; deficiency causes **chlorosis** (yellow leaves due to lack of chlorophyll)."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 7,
      "title": "Human Nutrition",
      "intro": "Humans require a balanced diet providing seven nutrient classes for energy, growth, tissue repair, and health. The digestive system breaks down large insoluble food macromolecules into small soluble molecules that are absorbed into the bloodstream across the intestinal epithelium.",
      "subheadings": [
        {
          "title": "A Balanced Diet and Malnutrition",
          "body": "A balanced diet provides carbohydrates, fats, proteins, vitamins, minerals, dietary fiber (roughage), and water in appropriate proportions.",
          "groups": [
            {
              "subTitle": "Nutrient Functions and Deficiencies",
              "bullets": [
                "**Carbohydrates & Fats**: Primary energy source and long-term energy storage.",
                "**Proteins**: Tissue growth, maintenance, repair, and enzyme synthesis; severe deficiency causes **Kwashiorkor** (swollen abdomen) and **Marasmus**.",
                "**Vitamin C (Ascorbic Acid)**: Collagen synthesis and skin/gum maintenance (citrus fruits); deficiency causes **Scurvy** (bleeding gums, non-healing wounds).",
                "**Vitamin D**: Promotes calcium absorption in bones and teeth (sunlight, dairy, fish liver oils); deficiency causes **Rickets** (soft, deformed leg bones).",
                "**Calcium ($Ca^{2+}$)**: Mineral for strong bones and teeth; deficiency causes rickets and osteoporosis.",
                "**Iron ($Fe^{2+}$)**: Essential component of haemoglobin for oxygen transport (red meat, spinach); deficiency causes **Anaemia** (fatigue, paleness).",
                "**Dietary Fibre**: Indigestible plant cellulose providing bulk for peristalsis, preventing constipation and bowel disease."
              ]
            }
          ]
        },
        {
          "title": "The Human Alimentary Canal and Mechanical Digestion",
          "body": "The digestive tract carries out ingestion, mechanical digestion, chemical digestion, absorption, assimilation, and egestion.",
          "groups": [
            {
              "subTitle": "Definitions of Digestive Processes",
              "bullets": [
                "**Ingestion**: Taking of substances (food and drink) into the body through the mouth.",
                "**Mechanical Digestion**: Breakdown of food into smaller pieces without chemical modification (chewing by heterodont teeth, churning in stomach, emulsification of lipids by bile).",
                "**Chemical Digestion**: Breakdown of large, insoluble molecules into small, soluble molecules by enzymatic hydrolysis.",
                "**Absorption**: Movement of small nutrient molecules and ions through the intestinal wall into the blood or lymph.",
                "**Assimilation**: Movement of digested food molecules into cells where they are used, becoming part of the cells.",
                "**Egestion**: Passing out of food that has not been digested or absorbed, as faeces, through the anus."
              ]
            },
            {
              "subTitle": "Peristalsis & Teeth Types",
              "bullets": [
                "**Peristalsis**: Wave-like contractions of circular muscles (contracting behind food bolus) and longitudinal muscles (contracting ahead) propelling food along the oesophagus and intestines.",
                "**Human Dentition**: **Incisors** (biting/cutting), **Canines** (tearing), **Premolars** & **Molars** (grinding/crushing)."
              ]
            }
          ]
        },
        {
          "title": "Chemical Digestion, Bile and Absorption",
          "body": "Enzymatic breakdown in the mouth, stomach, and small intestine, followed by absorption across villi.",
          "groups": [
            {
              "subTitle": "Digestive Enzymes",
              "bullets": [
                "**Carbohydrases**: **Salivary & Pancreatic Amylase** break down starch into **maltose**; **Maltase** (on small intestine membrane) breaks down maltose into **glucose**.",
                "**Proteases**: **Pepsin** (in stomach, requires acidic pH 2 $HCl$) breaks proteins into **polypeptides**; **Trypsin** (in pancreatic juice, alkaline pH 8) breaks polypeptides into **peptides**; **Peptidases** yield **amino acids**.",
                "**Lipases**: Pancreatic lipase breaks emulsified fats into **glycerol** and **3 fatty acids**."
              ]
            },
            {
              "subTitle": "Role of Bile & Intestinal Villi",
              "bullets": [
                "**Bile**: Produced by liver, stored in gall bladder; alkaline fluid neutralizing stomach $HCl$ and **emulsifying fats** into microscopic droplets to dramatically increase surface area for lipase.",
                "**Villi Adaptations**: Millions of finger-like projections with microvilli (huge surface area), single-layer epithelial cells (short diffusion distance), dense blood capillary network (rapid absorption of glucose, amino acids, minerals into hepatic portal vein), and central **lacteals** (absorb fatty acids and glycerol into lymphatic system)."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 8,
      "title": "Transport in Plants",
      "intro": "Vascular plants have evolved continuous transport systems to distribute water, mineral ions, and organic assimilates throughout stems, roots, and leaves. The xylem conducts water and dissolved mineral ions upward under negative tension, while the phloem translocates sucrose and amino acids between source and sink tissues.",
      "subheadings": [
        {
          "title": "Xylem and Water Transport",
          "body": "Structure and function of xylem vessel elements in the transpiration stream.",
          "groups": [
            {
              "bullets": [
                "**Xylem Adaptations**: Long, continuous non-living tubes with no end cell walls; hollow lumen reducing resistance; thickened cell walls lignified with **lignin** to withstand extreme negative hydrostatic tension without collapsing.",
                "**Water Uptake**: Soil water enters root hair cells by osmosis (down water potential gradient) $\\to$ crosses root cortex (via apoplast cell wall pathway and symplast cytoplasm pathway) $\\to$ enters root xylem vessels."
              ]
            }
          ]
        },
        {
          "title": "Transpiration and Transpiration Pull",
          "body": "Transpiration is the loss of water vapour from plant leaves by evaporation of water at the surfaces of the mesophyll cells followed by diffusion of water vapour through the stomata.",
          "groups": [
            {
              "subTitle": "The Transpiration Stream Mechanism",
              "bullets": [
                "**Transpiration Pull**: Evaporation creates a tension (suction pressure) that draws water up xylem vessels.",
                "**Cohesion & Adhesion**: **Cohesion** (hydrogen bonding between polar water molecules forming an unbroken continuous column) and **Adhesion** (attraction between water molecules and hydrophilic xylem walls preventing column breakage)."
              ]
            },
            {
              "subTitle": "Environmental Factors Influencing Transpiration Rate",
              "bullets": [
                "**Temperature**: Higher temperature increases kinetic energy and water evaporation rate $\\implies$ **increases** transpiration.",
                "**Wind Speed (Air Movement)**: Air flow removes humid water vapor shell outside stomata, maintaining steep water potential gradient $\\implies$ **increases** transpiration.",
                "**Light Intensity**: Triggers stomata to open for photosynthesis $\\implies$ **increases** transpiration.",
                "**Humidity**: High external atmospheric humidity decreases the water potential gradient between leaf interior and air $\\implies$ **decreases** transpiration."
              ]
            }
          ]
        },
        {
          "title": "Phloem and Translocation",
          "body": "Translocation is the movement of sucrose and amino acids in phloem from regions of production (sources) to regions of storage or utilization (sinks).",
          "groups": [
            {
              "subTitle": "Sources vs Sinks",
              "bullets": [
                "**Source**: A tissue that produces sucrose (e.g. mature photosynthesizing leaves in summer; germinating seed storage cotyledons in spring).",
                "**Sink**: A tissue that consumes or stores sucrose (e.g. growing root tips, apical buds, developing flowers, fruits, storage tubers).",
                "**Bidirectional Transport**: Unlike unidirectional xylem flow, phloem sap can travel upwards or downwards simultaneously to meet metabolic demand."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 9,
      "title": "Transport in Animals",
      "intro": "Mammals possess a closed, double circulatory system driven by a four-chambered muscular heart. Blood transports oxygen, carbon dioxide, nutrients, urea, hormones, and heat throughout the body while maintaining blood pressure across separate pulmonary and systemic vascular circuits.",
      "subheadings": [
        {
          "title": "The Circulatory System and Cardiac Anatomy",
          "body": "Structure and mechanics of the human double circulatory system and four-chambered heart.",
          "groups": [
            {
              "subTitle": "Double Circulation",
              "bullets": [
                "**Pulmonary Circuit**: Deoxygenated blood pumped from Right Ventricle $\\to$ Pulmonary Artery $\\to$ Lungs (oxygenated) $\\to$ Pulmonary Vein $\\to$ Left Atrium.",
                "**Systemic Circuit**: Oxygenated blood pumped at high pressure from Left Ventricle $\\to$ Aorta $\\to$ Body tissues $\\to$ Vena Cava $\\to$ Right Atrium.",
                "**Advantage**: Blood is repressurized after passing through the delicate pulmonary capillaries, enabling rapid systemic delivery of oxygen and glucose to tissues."
              ]
            },
            {
              "subTitle": "Cardiac Chambers and Valves",
              "bullets": [
                "**Left Ventricle Wall**: Has a substantially thicker muscular wall (myocardium) than the right ventricle because it must generate high pressure to pump blood around the entire systemic body circuit against peripheral resistance.",
                "**Atrioventricular Valves**: **Tricuspid valve** (right side) and **Bicuspid / Mitral valve** (left side) prevent backflow of blood from ventricles into atria during ventricular systole.",
                "**Semilunar Valves**: Located at base of Aorta and Pulmonary Artery; prevent backflow into ventricles during ventricular diastole."
              ]
            }
          ]
        },
        {
          "title": "Blood Vessels: Arteries, Veins and Capillaries",
          "body": "Structural adaptations of the three primary categories of vascular blood vessels.",
          "groups": [
            {
              "bullets": [
                "**Arteries**: Transport blood away from heart under high surging pressure; thick muscular and elastic walls that stretch during systole and recoil during diastole to smooth blood flow; narrow lumen.",
                "**Veins**: Transport blood back to heart under low pressure; thin muscular walls; wide lumen minimizing friction; possess **pocket semilunar valves** preventing backflow.",
                "**Capillaries**: Microscopic vessels connecting arterioles and venules; single-cell thick endothelium ($~1\\,\\mu\\text{m}$) providing minimal diffusion distance for exchange of gases, glucose, and waste metabolites."
              ]
            }
          ]
        },
        {
          "title": "Blood Composition and Coronary Heart Disease (CHD)",
          "body": "Components of blood and the etiology of coronary arterial occlusions.",
          "groups": [
            {
              "subTitle": "Blood Components",
              "bullets": [
                "**Plasma**: Pale yellow liquid ($55\\%$ of blood) transporting dissolved glucose, amino acids, urea, hormones, $CO_2$ as hydrogencarbonate ($HCO_3^-$), and heat.",
                "**Red Blood Cells (Erythrocytes)**: Transport oxygen bound to iron-containing haemoglobin ($Hb + 4O_2 \\rightleftharpoons Hb(O_2)_4$ oxyhaemoglobin).",
                "**White Blood Cells (Leucocytes)**: **Phagocytes** (engulf and digest pathogens via phagocytosis) and **Lymphocytes** (secrete specific antibodies and antitoxins).",
                "**Platelets (Thrombocytes)**: Cell fragments initiating the blood clotting cascade (converting soluble **fibrinogen** into insoluble **fibrin mesh** to seal wounds and prevent pathogen entry)."
              ]
            },
            {
              "subTitle": "Coronary Heart Disease (CHD)",
              "bullets": [
                "**Atherosclerosis**: Accumulation of fatty cholesterol plaques (atheromas) in coronary artery walls, narrowing the lumen and restricting oxygenated blood delivery to cardiac muscle.",
                "**Risk Factors**: High dietary saturated fat/cholesterol, smoking (nicotine, carbon monoxide), hypertension, obesity, sedentary lifestyle, genetic predisposition, and stress.",
                "**Treatment**: Statins (cholesterol-lowering drugs), coronary angioplasty and stenting, and coronary artery bypass graft (CABG) surgery."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 10,
      "title": "Diseases and Immunity",
      "intro": "Pathogens\u2014including viruses, bacteria, fungi, and protoctists\u2014cause infectious transmissible diseases. The human immune system provides non-specific physical and chemical barriers, active cellular phagocytosis, and specific humoral antibody responses. Vaccination confers active artificial immunity to protect individuals and communities.",
      "subheadings": [
        {
          "title": "Pathogens, Transmission and Body Defences",
          "body": "Infectious disease transmission routes and the body's multi-layered defense systems.",
          "groups": [
            {
              "subTitle": "Pathogen Transmission Modes",
              "bullets": [
                "**Direct Contact**: Blood, bodily fluids (e.g. HIV transmitted via unsterilized needles or sexual intercourse).",
                "**Airborne Droplets**: Inhalation of sneeze/cough droplets (e.g. influenza virus, tuberculosis bacteria).",
                "**Contaminated Food / Water**: Ingestion of contaminated fecal matter (e.g. *Vibrio cholerae* causing cholera).",
                "**Animal Vectors**: Disease vectors transmitting pathogens (e.g. female *Anopheles* mosquito transmitting *Plasmodium* malaria parasite)."
              ]
            },
            {
              "subTitle": "Non-Specific Mechanical & Chemical Barriers",
              "bullets": [
                "**Mechanical Barriers**: Intact keratinized epidermis of the skin; nasal hairs trapping dust.",
                "**Chemical Barriers**: Hydrochloric acid in stomach juice (pH 2 killing ingested microorganisms); lysozyme antibacterial enzymes in tears and saliva; sticky mucus in respiratory tract."
              ]
            }
          ]
        },
        {
          "title": "The Immune Response and Vaccination",
          "body": "Specific adaptive immunity mediated by lymphocytes and memory cells.",
          "groups": [
            {
              "subTitle": "Antibody Production and Phagocytosis",
              "bullets": [
                "**Antigens**: Specific surface marker proteins or glycoproteins on the outer surface of pathogens recognized as 'non-self'.",
                "**Lymphocytes**: Recognize specific foreign antigens and clone to produce large quantities of complementary **antibodies** (which bind, immobilize, agglutinate pathogens, or mark them for destruction) and **antitoxins**.",
                "**Phagocytes**: Chemotactically migrate to pathogens, engulf them into phagosomes, and fuse with lysosomes containing digestive enzymes to destroy them."
              ]
            },
            {
              "subTitle": "Active vs Passive Immunity",
              "bullets": [
                "**Active Immunity**: Defence against a pathogen by antibody production in the body; acquired through natural infection or **vaccination** (injected dead/attenuated pathogen or antigen); generates long-lived **memory cells** providing long-term immunity.",
                "**Passive Immunity**: Short-term defence acquired by receiving antibodies from another individual (e.g. maternal antibodies across placenta or in breast milk colostrum; antivenom injections); no memory cells formed."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 11,
      "title": "Gas Exchange in Humans",
      "intro": "Gas exchange occurs in the alveoli of the lungs, where oxygen diffuses into the bloodstream and carbon dioxide diffuses out. Ventilation of the lungs maintains steep concentration gradients across the respiratory surface through coordinated movements of the diaphragm and intercostal muscles.",
      "subheadings": [
        {
          "title": "The Respiratory System and Alveolar Adaptations",
          "body": "Structural adaptations of the human pulmonary tract for efficient gas diffusion.",
          "groups": [
            {
              "subTitle": "Alveoli Adaptations for Gas Exchange",
              "bullets": [
                "**Enormous Total Surface Area**: Millions of microscopic spherical alveoli provide a total surface area of over $70\\text{ m}^2$.",
                "**Extremely Thin Diffusion Pathway**: Alveolar wall (type I pneumocytes) and capillary wall each consist of a single layer of flattened squamous epithelial cells (diffusion distance $<1\\,\\mu\\text{m}$).",
                "**Moist Lining**: Dissolves gases before they diffuse across the membrane.",
                "**Dense Capillary Perfusion & Ventilation**: Continuous blood flow and rhythmic breathing maintain steep $O_2$ and $CO_2$ partial pressure gradients."
              ]
            }
          ]
        },
        {
          "title": "The Mechanism of Ventilation",
          "body": "The biomechanical mechanism of inspiration and expiration involving muscle antagonism.",
          "groups": [
            {
              "subTitle": "Inspiration (Breathing In)",
              "bullets": [
                "**External intercostal muscles** contract; **Internal intercostal muscles** relax $\\to$ ribs pulled upwards and outwards.",
                "**Diaphragm** contracts and flattens downwards.",
                "**Thoracic cavity volume increases** $\\to$ internal pulmonary pressure drops below atmospheric pressure $\\to$ air is drawn into lungs."
              ]
            },
            {
              "subTitle": "Expiration (Breathing Out)",
              "bullets": [
                "**External intercostal muscles** relax; **Internal intercostal muscles** contract (during forced expiration) $\\to$ ribs move downwards and inwards.",
                "**Diaphragm** relaxes and domes upwards.",
                "**Thoracic cavity volume decreases** $\\to$ internal pulmonary pressure rises above atmospheric pressure $\\to$ air is forced out of lungs."
              ]
            },
            {
              "subTitle": "Differences in Inhaled vs Exhaled Air",
              "bullets": [
                "**Oxygen ($O_2$)**: Inhaled $\\approx 21\\%$, Exhaled $\\approx 16\\%$ (absorbed for cellular respiration).",
                "**Carbon Dioxide ($CO_2$)**: Inhaled $\\approx 0.04\\%$, Exhaled $\\approx 4\\%$ (metabolic waste product).",
                "**Water Vapour**: Inhaled variable/lower, Exhaled saturated ($100\\%$ humidity)."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 12,
      "title": "Respiration",
      "intro": "Respiration is the biochemical process in all living cells that releases energy from food molecules (such as glucose). Aerobic respiration requires oxygen and produces carbon dioxide, water, and large amounts of ATP. Anaerobic respiration occurs without oxygen, releasing less energy and generating lactic acid in mammals or ethanol and carbon dioxide in yeast.",
      "subheadings": [
        {
          "title": "Aerobic Respiration",
          "body": "The complete enzymatic breakdown of glucose in the presence of oxygen.",
          "groups": [
            {
              "bullets": [
                "**Definition**: The chemical reactions in cells that use oxygen to break down nutrient molecules to release energy.",
                "**Word Equation**: $\\text{Glucose} + \\text{Oxygen} \\to \\text{Carbon dioxide} + \\text{Water} + \\text{Energy (ATP)}$",
                "**Balanced Symbol Equation**: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O}$",
                "**Site**: Glycolysis in cytoplasm followed by aerobic stages in mitochondria."
              ]
            }
          ]
        },
        {
          "title": "Anaerobic Respiration and Oxygen Debt",
          "body": "Incomplete breakdown of glucose in the absence of oxygen.",
          "groups": [
            {
              "subTitle": "Anaerobic Respiration in Human Muscles",
              "bullets": [
                "**Word Equation**: $\\text{Glucose} \\to \\text{Lactic acid} + \\text{Energy (small yield)}$",
                "**Balanced Equation**: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\to 2\\text{C}_3\\text{H}_6\\text{O}_3$",
                "**Oxygen Debt**: During vigorous exercise, anaerobic respiration builds up toxic lactic acid in muscles, causing muscle fatigue and cramps. After exercise, heavy breathing continues to supply oxygen to the liver to oxidize lactic acid back into glucose or carbon dioxide and water."
              ]
            },
            {
              "subTitle": "Anaerobic Respiration in Yeast (Alcoholic Fermentation)",
              "bullets": [
                "**Word Equation**: $\\text{Glucose} \\to \\text{Ethanol} + \\text{Carbon dioxide} + \\text{Energy}$",
                "**Balanced Equation**: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\to 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2$",
                "**Applications**: $CO_2$ gas bubbles cause bread dough to rise in baking; ethanol is utilized in brewing alcoholic beverages."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 13,
      "title": "Excretion in Humans",
      "intro": "Excretion is the removal from organisms of the waste products of metabolism, toxic substances, and substances in excess of requirements. The kidneys filter the blood to remove urea, excess water, and mineral salts, and regulate the blood's osmotic concentration under the control of antidiuretic hormone (ADH).",
      "subheadings": [
        {
          "title": "Metabolic Waste Products and Urea Formation",
          "body": "Deamination of excess amino acids in the liver produces urea.",
          "groups": [
            {
              "bullets": [
                "**Primary Excretory Organs**: **Kidneys** (excrete urea, excess salts, and water as urine), **Lungs** (excrete $CO_2$ and water vapor), **Skin** (excretes sweat containing water, mineral salts, and traces of urea).",
                "**Deamination**: Excess dietary amino acids cannot be stored in the body. In the liver, the nitrogen-containing amino group ($-NH_2$) is removed from the amino acid and converted into toxic ammonia ($NH_3$), which is rapidly converted into less toxic **urea** for renal excretion."
              ]
            }
          ]
        },
        {
          "title": "Kidney Function, Nephron Anatomy and ADH Osmoregulation",
          "body": "Renal ultrafiltration, selective reabsorption, and homeostatic osmoregulation.",
          "groups": [
            {
              "subTitle": "Nephron Filtration & Reabsorption",
              "bullets": [
                "**Ultrafiltration (Bowman's Capsule & Glomerulus)**: High hydrostatic blood pressure forces water, glucose, urea, and mineral salts through the basement membrane into the nephron lumen (forming glomerular filtrate); blood cells and large plasma proteins are retained in capillaries.",
                "**Selective Reabsorption (Proximal Convoluted Tubule)**: All glucose is actively transported back into blood capillaries; necessary water is reabsorbed by osmosis; needed mineral ions are actively reabsorbed."
              ]
            },
            {
              "subTitle": "Osmoregulation and ADH",
              "bullets": [
                "**Dehydrated State (Low Blood $\\Psi$)**: Hypothalamus osmoreceptors detect low water potential $\\to$ pituitary gland secretes **more ADH** $\\to$ collecting ducts become **more permeable** to water $\\to$ more water is reabsorbed into blood $\\to$ **small volume of concentrated, dark urine** is produced.",
                "**Hydrated State (High Blood $\\Psi$)**: Pituitary gland secretes **less ADH** $\\to$ collecting ducts become **less permeable** $\\to$ **large volume of dilute, pale urine** is excreted."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 14,
      "title": "Coordination and Response",
      "intro": "Organisms detect environmental changes (stimuli) and coordinate rapid responses through the nervous system and endocrine (hormonal) system. Plants coordinate directional growth responses through plant hormones called auxins.",
      "subheadings": [
        {
          "title": "The Nervous System and Reflex Arcs",
          "body": "Rapid electrochemical communication through specialized neurones and synapses.",
          "groups": [
            {
              "subTitle": "Neurones and Reflex Pathway",
              "bullets": [
                "**Central Nervous System (CNS)**: Brain and spinal cord.",
                "**Reflex Arc Pathway**: $\\text{Stimulus} \\to \\text{Receptor} \\to \\text{Sensory Neurone} \\to \\text{Relay Neurone (in spinal cord)} \\to \\text{Motor Neurone} \\to \\text{Effector (muscle/gland)} \\to \\text{Response}$.",
                "**Synapse**: The microscopic junction between two neurones. Electrical impulse arrives at presynaptic terminal $\\to$ stimulates vesicles to release **neurotransmitter chemicals** $\\to$ neurotransmitters diffuse across the synaptic gap $\\to$ bind to complementary receptors on the postsynaptic membrane $\\to$ trigger a new electrical impulse (ensures unidirectional signal transmission)."
              ]
            },
            {
              "subTitle": "The Human Eye: Accommodation and Pupil Reflex",
              "bullets": [
                "**Focusing on Near Objects**: Ciliary muscles **contract**, suspensory ligaments **slacken**, lens becomes **fat and more convex** (greater refraction).",
                "**Focusing on Distant Objects**: Ciliary muscles **relax**, suspensory ligaments **pull tight**, lens is pulled **thin and less convex** (less refraction).",
                "**Pupil Light Reflex**: In bright light, circular iris muscles contract and radial muscles relax $\\to$ pupil constricts (protects retina); in dim light, radial muscles contract and circular muscles relax $\\to$ pupil dilates."
              ]
            }
          ]
        },
        {
          "title": "The Endocrine System and Homeostasis",
          "body": "Chemical messaging by blood-borne hormones and the maintenance of a constant internal environment.",
          "groups": [
            {
              "subTitle": "Hormones",
              "bullets": [
                "**Definition**: A chemical substance, produced by an endocrine gland and carried by the blood, which alters the activity of one or more specific target organs.",
                "**Adrenaline (Adrenal Gland)**: 'Fight or flight' hormone; increases heart rate, breathing rate, dilates pupils, and stimulates liver glycogenolysis to increase blood glucose.",
                "**Insulin (Pancreas $\\beta$-cells)**: Lowers blood glucose by stimulating liver and muscle cells to take up glucose and convert it to stored glycogen.",
                "**Glucagon (Pancreas $\\alpha$-cells)**: Raises blood glucose by stimulating liver cells to break down stored glycogen into glucose."
              ]
            },
            {
              "subTitle": "Thermoregulation (Skin Adaptations)",
              "bullets": [
                "**When Too Hot**: **Vasodilation** (arterioles supplying skin surface capillaries dilate, increasing radiative heat loss); **Sweating** (evaporation of sweat absorbs latent heat from skin).",
                "**When Too Cold**: **Vasoconstriction** (arterioles constrict, diverting blood to deeper core); **Shivering** (rapid involuntary muscle contractions generate metabolic heat); **Piloerection** (erector muscles raise hairs to trap an insulating layer of still air)."
              ]
            }
          ]
        },
        {
          "title": "Tropic Responses in Plants (Auxins)",
          "body": "Plant growth responses directed towards or away from directional stimuli controlled by auxin distribution.",
          "groups": [
            {
              "bullets": [
                "**Auxin**: Growth hormone synthesized in shoot and root tips that regulates cell elongation.",
                "**Phototropism in Shoots**: Auxin diffuses down from shoot tip and accumulates on the **shaded side**; high auxin concentration **stimulates cell elongation** on the dark side $\\implies$ shoot bends towards light (**positive phototropism**).",
                "**Gravitropism in Roots**: Auxin settles on the **lower side** of a horizontal root due to gravity; in roots, high auxin concentration **inhibits cell elongation** $\\implies$ upper cells elongate faster $\\implies$ root bends downwards into soil (**positive gravitropism**)."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 15,
      "title": "Drugs",
      "intro": "A drug is any substance taken into the body that modifies or affects chemical reactions in the body. Medicinal drugs (including antibiotics) cure or relieve symptoms of disease, while misuse of drugs (alcohol, tobacco, narcotics) causes physiological damage, addiction, and social harm.",
      "subheadings": [
        {
          "title": "Antibiotics and Antibiotic Resistance",
          "body": "Antibiotics are chemical substances that kill or inhibit the growth of bacteria.",
          "groups": [
            {
              "bullets": [
                "**Mechanism**: Antibiotics (e.g. penicillin) disrupt bacterial cell wall synthesis or bacterial protein synthesis, causing bacterial cell lysis.",
                "**Ineffectiveness on Viruses**: Viruses lack cell walls, cell membranes, and independent metabolic enzymes, replicating inside host cells; antibiotics have zero effect on viruses (e.g. cold, flu, HIV).",
                "**Evolution of Resistance (MRSA)**: Random genetic mutation provides resistance $\\to$ antibiotic over-prescription or incomplete treatment course creates selective pressure $\\to$ non-resistant bacteria die while resistant mutants survive and multiply $\\to$ entire population becomes resistant."
              ]
            }
          ]
        },
        {
          "title": "Misuse of Drugs: Tobacco and Alcohol",
          "body": "Physiological consequences of chronic alcohol consumption and tobacco smoke inhalation.",
          "groups": [
            {
              "bullets": [
                "**Tobacco Smoke Components**: **Nicotine** (addictive stimulant that constricts arterioles, increases blood pressure and platelet stickiness), **Carbon Monoxide** (binds irreversibly to haemoglobin, reducing $O_2$ transport), **Tar** (carcinogen triggering oncogenic lung cancer mutations; paralyzes respiratory cilia, leading to chronic bronchitis and emphysema).",
                "**Alcohol (Ethanol)**: Central nervous system depressant; slows synaptic transmission and reaction times; chronic abuse leads to liver cirrhosis, addiction, and fetal alcohol syndrome."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 16,
      "title": "Reproduction",
      "intro": "Reproduction is the biological process by which organisms generate offspring. Asexual reproduction involves a single parent producing genetically identical clones through mitosis. Sexual reproduction involves the fusion of two haploid gamete nuclei (fertilisation) to form a diploid zygote, creating genetic variation among offspring.",
      "subheadings": [
        {
          "title": "Asexual and Sexual Reproduction",
          "body": "Comparison of reproductive strategies in biological organisms.",
          "groups": [
            {
              "subTitle": "Asexual Reproduction",
              "bullets": [
                "**Characteristics**: 1 parent, no gametes, no fertilisation; all offspring are genetically identical **clones** produced by mitosis.",
                "**Advantages**: Rapid population growth, colonizes favorable environments quickly, requires no mate.",
                "**Disadvantages**: Zero genetic variation; entire population is vulnerable to a single new pathogen or environmental change."
              ]
            },
            {
              "subTitle": "Sexual Reproduction",
              "bullets": [
                "**Characteristics**: 2 parents; involves meiosis to produce haploid gametes ($n$) that fuse during **fertilisation** to restore the diploid chromosome number ($2n$) in the zygote.",
                "**Advantages**: Produces genetic diversity in offspring, providing evolutionary adaptability and disease resilience in changing environments.",
                "**Disadvantages**: Slower process; requires substantial energy expenditure to find a mate or produce pollen/flowers."
              ]
            }
          ]
        },
        {
          "title": "Sexual Reproduction in Flowering Plants",
          "body": "Floral anatomy, pollination mechanisms, fertilisation, and seed structure in angiosperms.",
          "groups": [
            {
              "subTitle": "Floral Structure and Pollination",
              "bullets": [
                "**Anatomy**: **Stamen (Male)** = Anther (produces pollen grains) + Filament; **Carpel/Pistil (Female)** = Stigma (receives pollen) + Style + Ovary (contains ovules with egg cells).",
                "**Insect-Pollinated Flowers**: Large brightly colored petals, sweet nectar, scented, sticky spiky pollen grains, enclosed stamens and sticky stigma.",
                "**Wind-Pollinated Flowers**: Small dull green petals, no nectar, feathery large stigmas hanging outside the flower to trap airborne pollen, long dangling filaments with smooth lightweight pollen."
              ]
            },
            {
              "subTitle": "Fertilisation and Seed Germination",
              "bullets": [
                "**Pollen Tube Growth**: Pollen grain lands on receptive stigma $\\to$ germinates and grows a pollen tube down through style $\\to$ enters ovule micropyle $\\to$ male nucleus fuses with female egg nucleus to form a diploid zygote.",
                "**Seed Development**: Ovule becomes the seed containing the embryo (**radicle** root and **plumule** shoot) and food store (**cotyledon**); ovary wall develops into the fruit.",
                "**Environmental Conditions for Germination (WOW)**: **Water** (activates enzymes and swells seed coat), **Oxygen** (for aerobic respiration releasing ATP), **Warmth** (optimum temperature for metabolic enzyme activity)."
              ]
            }
          ]
        },
        {
          "title": "Sexual Reproduction in Humans",
          "body": "Anatomy of human reproductive systems, the female menstrual cycle, and pregnancy.",
          "groups": [
            {
              "subTitle": "The Menstrual Cycle Hormones",
              "bullets": [
                "**FSH (Follicle-Stimulating Hormone)**: Secreted by pituitary gland; stimulates egg maturation in ovary follicle and stimulates ovary to secrete oestrogen.",
                "**Oestrogen**: Secreted by ovary follicle; stimulates thickening and vascularisation of the uterine endometrium; inhibits FSH and stimulates LH release.",
                "**LH (Luteinising Hormone)**: Secreted by pituitary gland; surges at Day 14 to trigger **ovulation** (release of mature egg from ovary) and forms the corpus luteum.",
                "**Progesterone**: Secreted by corpus luteum; maintains thick spongy uterine lining for implantation; inhibits FSH and LH."
              ]
            },
            {
              "subTitle": "Fertilisation and Placenta",
              "bullets": [
                "**Fertilisation**: Fusion of sperm and egg nuclei in the oviduct (fallopian tube) forming a zygote that divides by mitosis to form a blastocyst.",
                "**Placenta**: Organ of exchange between maternal and fetal blood; delivers oxygen, glucose, amino acids, antibodies; removes urea and $CO_2$; secretes progesterone to maintain pregnancy; maternal and fetal blood never mix directly to prevent damage from high maternal blood pressure."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 17,
      "title": "Inheritance",
      "intro": "Inheritance is the transmission of genetic information from generation to generation. Genetic information is stored in DNA molecules within chromosomes. Genes code for specific proteins, and alleles represent alternative forms of a gene that produce phenotypic variations.",
      "subheadings": [
        {
          "title": "Chromosomes, Genes and DNA Structure",
          "body": "The molecular basis of inheritance and protein synthesis.",
          "groups": [
            {
              "bullets": [
                "**Chromosome**: A thread-like structure of DNA, carrying genetic information in the form of genes; human somatic cells have 46 chromosomes (23 homologous pairs).",
                "**Gene**: A length of DNA that codes for a specific protein.",
                "**Allele**: An alternative version of a gene (e.g. $B$ for brown eyes, $b$ for blue eyes).",
                "**Haploid Nucleus ($n$)**: Contains a single set of unpaired chromosomes (23 in human gametes).",
                "**Diploid Nucleus ($2n$)**: Contains two complete sets of homologous chromosomes (46 in human somatic cells)."
              ]
            }
          ]
        },
        {
          "title": "Mitosis and Meiosis",
          "body": "Comparison of nuclear division processes in somatic growth and gametogenesis.",
          "groups": [
            {
              "subTitle": "Mitosis (Equation Division)",
              "bullets": [
                "**Definition**: Nuclear division giving rise to **genetically identical** cells in which chromosome number is maintained ($2n \\to 2n$).",
                "**Roles**: Growth, tissue repair, replacement of damaged cells, and asexual reproduction."
              ]
            },
            {
              "subTitle": "Meiosis (Reduction Division)",
              "bullets": [
                "**Definition**: Reduction division in which chromosome number is halved from diploid to haploid ($2n \\to n$), producing **genetically non-identical gametes**.",
                "**Roles**: Formation of gametes (sperm and ova) and introducing genetic variation through random assortment and crossing over."
              ]
            }
          ]
        },
        {
          "title": "Monohybrid Crosses, Codominance and Sex Linkage",
          "body": "Genetic ratios, Punnett squares, and inheritance patterns.",
          "groups": [
            {
              "subTitle": "Monohybrid Inheritance Terminology",
              "bullets": [
                "**Genotype**: The genetic makeup of an organism in terms of the alleles present (e.g. $BB, Bb, bb$).",
                "**Phenotype**: The observable features of an organism resulting from genotype and environmental interaction.",
                "**Homozygous**: Having two identical alleles of a particular gene ($BB$ or $bb$).",
                "**Heterozygous**: Having two different alleles of a particular gene ($Bb$).",
                "**Dominant Allele**: An allele that is expressed if it is present in homozygous or heterozygous condition.",
                "**Recessive Allele**: An allele that is only expressed when homozygous recessive."
              ]
            },
            {
              "subTitle": "Codominance and ABO Blood Groups",
              "bullets": [
                "**Codominance**: Both alleles in a heterozygote contribute to the phenotype (e.g. $I^A$ and $I^B$ alleles are codominant).",
                "**ABO Genotypes**: Blood Group A ($I^A I^A$ or $I^A I^o$), Blood Group B ($I^B I^B$ or $I^B I^o$), Blood Group AB ($I^A I^B$), Blood Group O ($I^o I^o$)."
              ]
            },
            {
              "subTitle": "Sex-Linked Inheritance",
              "bullets": [
                "**Sex Linkage**: A characteristic where the gene responsible is located on a sex chromosome (usually the non-homologous region of the $X$ chromosome).",
                "**Examples**: Red-green colour blindness and Haemophilia ($X^H$ normal, $X^h$ recessive disease allele; males $X^h Y$ express the condition because they lack a second protective $X$ chromosome)."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 18,
      "title": "Variation and Selection",
      "intro": "Variation describes the phenotypic differences between individuals of the same species. Natural selection acts upon phenotypic variation, driving evolutionary adaptation. Humans exploit artificial selection (selective breeding) to propagate economically desirable traits in livestock and crops.",
      "subheadings": [
        {
          "title": "Continuous and Discontinuous Variation",
          "body": "Classification of variation patterns in populations.",
          "groups": [
            {
              "bullets": [
                "**Discontinuous Variation**: Distinct qualitative phenotypic categories with no intermediate values; determined solely by single genes with no environmental influence (e.g. ABO blood groups, tongue rolling, human biological sex); plotted as bar charts.",
                "**Continuous Variation**: A quantitative range of phenotypes showing a continuous spectrum from one extreme to another; polygenic (controlled by many genes) and heavily influenced by environmental factors (e.g. human height, body mass, milk yield in cows); plotted as smooth bell-shaped normal distribution curves."
              ]
            }
          ]
        },
        {
          "title": "Mutation and Natural Selection",
          "body": "The evolutionary mechanism driving adaptation through differential reproductive success.",
          "groups": [
            {
              "subTitle": "Mutation",
              "bullets": [
                "**Definition**: A spontaneous random change in the DNA base sequence of a gene or in chromosome structure/number.",
                "**Mutagenic Agents**: Ionising radiation (UV rays, X-rays, gamma radiation) and carcinogenic chemical mutagens (benzene, mustard gas)."
              ]
            },
            {
              "subTitle": "Mechanism of Natural Selection (Darwinian Evolution)",
              "bullets": [
                "**Overproduction**: Organisms produce more offspring than the environment's resources can support.",
                "**Competition (Struggle for Existence)**: Offspring compete for limited resources (food, water, territory, mates).",
                "**Variation**: Genetic variation within the population produces phenotypic differences.",
                "**Differential Survival**: Individuals possessing advantageous phenotypic adaptations are better adapted to survive environmental pressures.",
                "**Reproduction & Inheritance**: Surviving individuals reproduce and pass their advantageous alleles to their offspring.",
                "**Allele Frequency Increase**: Over successive generations, the frequency of the beneficial allele increases in the population gene pool."
              ]
            }
          ]
        },
        {
          "title": "Selective Breeding (Artificial Selection)",
          "body": "Human selection of individuals with desirable traits to produce enhanced domesticated varieties.",
          "groups": [
            {
              "bullets": [
                "**Procedure**: (1) Identify individuals showing desirable traits from a mixed population; (2) Breed them together; (3) Select the best offspring displaying the trait from the next generation and breed them; (4) Repeat over many generations until the trait is stable.",
                "**Examples**: High milk yield in dairy cattle, disease resistance in wheat, docility in domestic dogs."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 19,
      "title": "Organisms and their Environment",
      "intro": "Ecology investigates the interactions between living organisms and their non-living environment. Solar radiant energy flows unidirectionally through food chains and trophic levels, while nutrient elements (carbon, nitrogen, water) are perpetually recycled through biogeochemical cycles.",
      "subheadings": [
        {
          "title": "Ecosystem Terminology and Energy Flow",
          "body": "Fundamental ecological concepts and thermodynamic energy transfer.",
          "groups": [
            {
              "subTitle": "Definitions",
              "bullets": [
                "**Population**: A group of organisms of one species, living in the same area at the same time.",
                "**Community**: All of the populations of different species in an ecosystem.",
                "**Ecosystem**: A unit containing the community of organisms and their environment, interacting together.",
                "**Trophic Level**: The position of an organism in a food chain, food web, or ecological pyramid."
              ]
            },
            {
              "subTitle": "Energy Loss in Food Chains",
              "bullets": [
                "**10% Efficiency Rule**: Only approximately $10\\%$ of energy is transferred to the next trophic level; $\\sim 90\\%$ of energy is lost as heat through cellular respiration, kinetic movement, excretion of metabolic wastes, and unconsumed parts (bones, roots).",
                "**Food Chain Length**: Due to progressive energy dissipation, food chains rarely exceed $4-5$ trophic levels."
              ]
            }
          ]
        },
        {
          "title": "The Carbon and Nitrogen Cycles",
          "body": "Biogeochemical mechanisms cycling essential carbon and nitrogen atoms through the biosphere.",
          "groups": [
            {
              "subTitle": "The Carbon Cycle",
              "bullets": [
                "**Carbon Fixation**: Photosynthesis removes atmospheric $CO_2$ and incorporates carbon into organic glucose and starch.",
                "**Carbon Release**: Cellular respiration (plants, animals, decomposers), combustion of fossil fuels, and volcanic outgassing return $CO_2$ to the atmosphere."
              ]
            },
            {
              "subTitle": "The Nitrogen Cycle",
              "bullets": [
                "**Nitrogen-Fixing Bacteria (*Rhizobium*)**: Located in root nodules of leguminous plants (peas, clover); convert inert atmospheric $N_2$ gas into ammonium ions ($NH_4^+$).",
                "**Nitrifying Bacteria**: *Nitrosomonas* oxidize $NH_4^+$ into nitrites ($NO_2^-$), and *Nitrobacter* oxidize nitrites into absorbable nitrates ($NO_3^-$).",
                "**Denitrifying Bacteria (*Pseudomonas*)**: Anaerobic bacteria in waterlogged soils that convert soil nitrates back into atmospheric $N_2$ gas."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 20,
      "title": "Human Influences on Ecosystems",
      "intro": "The expansion of human population and industrial activity exerts profound environmental pressures on ecosystems. Deforestation, agrochemical pollution, greenhouse gas emissions, and habitat fragmentation threaten biodiversity. Sustainable development requires conservation reserves, recycling, and sustainable resource management.",
      "subheadings": [
        {
          "title": "Deforestation and Habitat Loss",
          "body": "Ecological and atmospheric impacts of large-scale forest clearance for cattle ranching and agriculture.",
          "groups": [
            {
              "bullets": [
                "**Species Extinction**: Loss of complex canopy and understory habitats drives biodiversity decline and fragmented gene pools.",
                "**Soil Erosion**: Tree root systems binding topsoil are removed; torrential rains wash topsoil into rivers, causing siltation and desertification.",
                "**Disruption of Water Cycle**: Reduced vegetative transpiration decreases cloud formation and local precipitation, promoting drought.",
                "**Global Climate Change**: Burning trees releases sequestered $CO_2$, and loss of forest sinks reduces global photosynthetic carbon sequestration."
              ]
            }
          ]
        },
        {
          "title": "Pollution: Eutrophication and Plastic Waste",
          "body": "Water and land contamination from agricultural runoff and non-biodegradable synthetic polymers.",
          "groups": [
            {
              "subTitle": "Step-by-Step Mechanism of Eutrophication",
              "bullets": [
                "**1. Leaching**: Inorganic nitrate and phosphate fertilizers are washed by rain from farmland into rivers and lakes.",
                "**2. Algal Bloom**: Excess nutrients cause explosive rapid growth of surface algae, forming a thick green algal bloom.",
                "**3. Light Blockage**: Dense algal mats block sunlight from penetrating to submerged aquatic plants, causing them to die.",
                "**4. Decomposer Explosion**: Aerobic saprotrophic bacteria multiply rapidly as they decompose the dead plant and algal biomass.",
                "**5. Dissolved Oxygen Depletion**: Bacterial aerobic cellular respiration consumes dissolved oxygen in the water (high Biochemical Oxygen Demand).",
                "**6. Anoxia & Aquatic Death**: Fish and other aquatic fauna die from suffocation due to severe hypoxia."
              ]
            },
            {
              "subTitle": "Plastics and Biomagnification",
              "bullets": [
                "**Plastics**: Non-biodegradable synthetic polymers persist for centuries; discarded plastics cause marine animal entanglement, ingestive gastrointestinal blockages, and degrade into microplastics.",
                "**Bioaccumulation**: Non-biodegradable toxins (DDT, heavy metals, microplastics) accumulate in fatty tissues over an individual's lifetime.",
                "**Biomagnification**: Toxin concentration increases progressively at each higher trophic level in the food chain, reaching lethal concentrations in apex predators."
              ]
            }
          ]
        },
        {
          "title": "Conservation and Sustainable Resource Management",
          "body": "Strategies to preserve endangered species, protect critical habitats, and sustainably manage natural resources.",
          "groups": [
            {
              "bullets": [
                "**Conservation Strategies**: National parks and nature reserves, ex-situ captive breeding in zoos with studbooks to maintain genetic diversity, cryopreserved seed banks (Svalbard), and legal protection via CITES.",
                "**Sustainable Resource Use**: Quotas and closed seasons in fisheries, selective logging with mandatory replanting (afforestation), and circular economy recycling."
              ]
            }
          ]
        }
      ]
    },
    {
      "number": 21,
      "title": "Biotechnology and Genetic Modification",
      "intro": "Biotechnology harnesses living microorganisms (bacteria, yeast) and biological processes to produce valuable commercial foods, pharmaceuticals, and fuels. Genetic modification involves altering the genetic material of an organism by inserting genes from another species using recombinant DNA technology.",
      "subheadings": [
        {
          "title": "Industrial Fermenters and Microbial Products",
          "body": "Large-scale culturing of microorganisms in automated bioreactors.",
          "groups": [
            {
              "subTitle": "Industrial Fermenter Conditions",
              "bullets": [
                "**Steam Sterilisation**: Eliminates contaminating wild bacteria and prevents competitive contamination.",
                "**Water Jacket**: Circulates cold water to remove excess metabolic heat generated by microbial respiration, maintaining optimum temperature ($35-37^\\circ\\text{C}$).",
                "**Motorized Stirrer / Impeller Paddles**: Keeps microorganisms suspended in continuous contact with nutrients and ensures uniform temperature and oxygenation.",
                "**Sterile Air Inlet**: Supplies sterile filtered oxygen for aerobic cellular respiration.",
                "**pH and Temperature Probes**: Automated sensors adding acids/bases and adjusting cooling jackets to maintain optimal enzymatic conditions."
              ]
            },
            {
              "subTitle": "Microbial Applications",
              "bullets": [
                "**Pectinase**: Enzyme extracted from fungi used in commercial fruit juice manufacturing to break down pectin cell walls, clarifying juice and increasing juice yield.",
                "**Biological Washing Powders**: Formulated with thermostable proteases, lipases, and amylases that break down protein and fat stains at lower wash temperatures ($30-40^\\circ\\text{C}$), saving electrical heating energy.",
                "**Lactase**: Enzyme used to produce lactose-free milk by hydrolyzing lactose into glucose and galactose for lactose-intolerant consumers."
              ]
            }
          ]
        },
        {
          "title": "Genetic Engineering: Producing Recombinant Human Insulin",
          "body": "The molecular process of transferring genes between species using bacterial plasmids.",
          "groups": [
            {
              "subTitle": "Step-by-Step Recombinant DNA Technology",
              "bullets": [
                "**1. Gene Isolation**: The human gene coding for insulin is identified and cut out from human pancreatic chromosome DNA using a specific **Restriction Endonuclease Enzyme**, leaving complementary single-stranded **sticky ends**.",
                "**2. Vector Preparation**: Bacterial circular **plasmids** (vectors) are extracted from *Escherichia coli* and cut open with the **same restriction enzyme**, creating matching complementary sticky ends.",
                "**3. Ligation**: The isolated human insulin gene and cut plasmid vector are mixed with **DNA Ligase Enzyme**, which seals the phosphate-sugar backbone by forming phosphodiester bonds to produce a **Recombinant Plasmid**.",
                "**4. Transformation**: The recombinant plasmids are introduced into host *E. coli* bacteria.",
                "**5. Fermentation & Purification**: Transformed recombinant bacteria are cultured in large-scale industrial fermenters, where they transcribe and translate the human gene, producing identical human insulin that is extracted, purified, and packaged for diabetic therapy."
              ]
            },
            {
              "subTitle": "Genetically Modified (GM) Crops",
              "bullets": [
                "**Bt Crops (Insect Resistance)**: Engineered with a gene from the bacterium *Bacillus thuringiensis* producing an endotoxin lethal to insect pests (corn borers), reducing synthetic insecticide spraying.",
                "**Herbicide-Resistant Crops**: Engineered with resistance to broad-spectrum herbicides (e.g. glyphosate), allowing fields to be sprayed to kill weeds without harming the crop.",
                "**Golden Rice (Nutritional Enhancement)**: Genetically modified to produce $\\beta$-carotene (precursor to Vitamin A) in the edible endosperm, preventing blindness and dietary deficiency in developing countries."
              ]
            }
          ]
        }
      ]
    }
  ]
};
