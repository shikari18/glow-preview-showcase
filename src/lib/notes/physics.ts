import type { SubjectNotes } from "./types";

export const PHYSICS: SubjectNotes = {
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
          body: `Kinematics describes the motion of bodies without considering the forces that cause them. Speed is the rate of change of distance, while velocity is speed in a given direction. Acceleration is the rate of change of velocity with time.

\`\`\`diagram
   Velocity (v) ▲
                │         Constant Acceleration: Gradient = a = (v - u) / t
              v ├─── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─●
                │                           / │
                │                         /   │
                │                       /     │
              u ├─── ─ ─ ─ ─ ─ ─ ─ ─ ─●       │
                │                     │   ▲   │
                │       Area 1        │ Area 2│
                │    (u × t rect)     │(½(v-u)t)
              0 └─────────────────────┴───────┴──────► Time (t)
                0                     t₁      t₂
                ◄── Total Distance = Area Under Graph ──►
\`\`\``,
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
