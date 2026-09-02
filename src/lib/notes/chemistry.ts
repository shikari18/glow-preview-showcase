import type { SubjectNotes } from "./types";

export const CHEMISTRY: SubjectNotes = {
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

// ── Physics 0625 ───────────────────────────────────────────────────────────────;
