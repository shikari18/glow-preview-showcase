import type { SubjectNotes } from "./types";

export const ADDITIONAL_MATHEMATICS: SubjectNotes = {
  id: "additional-mathematics",
  name: "Additional Mathematics",
  code: "0606",
  color: "bg-violet-600",
  chapters: [
    {
      number: 1,
      title: "Functions",
      intro: "Functions define mathematical relations between domain inputs and range outputs. This chapter covers domain and range, one-to-one and many-to-one functions, condition for inverse functions, composite functions, and graphing and solving modulus functions $|f(x)|$.",
      subheadings: [
        {
          title: "Domain, Range and Function Types",
          body: "A function $f$ is a rule that assigns to each element $x$ in a domain set $X$ exactly one element $y$ in a range set $Y$.",
          groups: [
            {
              subTitle: "Function Classifications",
              bullets: [
                "**Domain**: The set of all valid input values for which $f(x)$ is mathematically defined.",
                "**Range**: The set of all output values produced by $f(x)$ across its domain.",
                "**One-to-One Function**: Every distinct input maps to a unique output ($x_1 \\ne x_2 \\implies f(x_1) \\ne f(x_2)$); passes the **Horizontal Line Test**.",
                "**Many-to-One Function**: Multiple different inputs map to the same output (e.g. $f(x) = x^2$ for $x \\in \\mathbb{R}$).",
                "**One-to-Many**: Not a function (a single input cannot produce multiple distinct outputs)."
              ]
            }
          ]
        },
        {
          title: "Composite and Inverse Functions",
          body: "Forming composite operations $fg(x)$ and finding algebraic inverse functions $f^{-1}(x)$.",
          groups: [
            {
              subTitle: "Composite Functions",
              bullets: [
                "**Definition**: $fg(x) = f(g(x))$ — the function $g$ is evaluated first, and its output becomes the input to $f$.",
                "**Condition for Existence**: The composite function $fg(x)$ exists if and only if the **range of $g$** is a subset of the **domain of $f$** ($\\text{Range}(g) \\subseteq \\text{Domain}(f)$)."
              ]
            },
            {
              subTitle: "Inverse Functions",
              bullets: [
                "**Condition for Inverse**: A function $f(x)$ has an inverse $f^{-1}(x)$ if and only if $f$ is a **one-to-one** function over its specified domain.",
                "**Algebraic Method**: Set $y = f(x)$, rearrange algebraically to make $x$ the subject in terms of $y$, and replace $y$ with $x$ to write $f^{-1}(x)$.",
                "**Domain and Range Inversion**: $\\text{Domain}(f^{-1}) = \\text{Range}(f)$ and $\\text{Range}(f^{-1}) = \\text{Domain}(f)$.",
                "**Geometric Property**: The graph of $y = f^{-1}(x)$ is the **reflection** of $y = f(x)$ in the line $y = x$."
              ]
            }
          ]
        },
        {
          title: "Modulus Functions and Equations",
          body: "The modulus (absolute value) function returns the non-negative magnitude of a real quantity.",
          groups: [
            {
              subTitle: "Graphing and Solving",
              bullets: [
                "**Definition**: $|x| = x$ if $x \\ge 0$, and $|x| = -x$ if $x < 0$.",
                "**Graph of $y = |f(x)|$**: Sketch $y = f(x)$, then reflect all parts of the graph below the x-axis ($y < 0$) into the upper half-plane ($y > 0$).",
                "**Solving $|ax + b| = c$**: Split into two linear cases: $ax + b = c$ or $ax + b = -c$ (provided $c \\ge 0$).",
                "**Solving $|ax + b| = cx + d$**: Solve $ax + b = cx + d$ and $ax + b = -(cx + d)$, then test all candidate solutions to discard extraneous roots.",
                "**Solving $|f(x)| < g(x)$**: Solve by squaring both sides when both are positive, or sketch graphs to identify intersection intervals."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Quadratic Functions",
      intro: "Quadratic functions of the form $f(x) = ax^2 + bx + c$ produce parabolic curves. This chapter explores vertex form, maximum and minimum values, the discriminant $\\Delta = b^2 - 4ac$, line-curve intersections, and quadratic inequalities.",
      subheadings: [
        {
          title: "Vertex Form and Graph Features",
          body: "Expressing quadratic functions in completed-square form reveals axis of symmetry and extrema.",
          groups: [
            {
              bullets: [
                "**Standard Form**: $y = ax^2 + bx + c$. If $a > 0$, parabola opens upwards (minimum vertex); if $a < 0$, parabola opens downwards (maximum vertex).",
                "**Vertex (Completed Square) Form**: $y = a(x - h)^2 + k$.",
                "**Extremum and Symmetry**: Vertex coordinates are $(h, k) = \\left(-\\frac{b}{2a}, c - \\frac{b^2}{4a}\\right)$; Line of symmetry is the vertical line $x = h = -\\frac{b}{2a}$."
              ]
            }
          ]
        },
        {
          title: "The Discriminant and Nature of Roots",
          body: "The discriminant determines the number of real roots of quadratic equations and intersections with lines.",
          groups: [
            {
              subTitle: "Roots of $ax^2 + bx + c = 0$",
              bullets: [
                "**Discriminant**: $\\Delta = b^2 - 4ac$.",
                "**$\\Delta > 0$**: Two distinct real roots (curve intersects x-axis at two distinct points).",
                "**$\\Delta = 0$**: Two equal real roots (repeated root; curve touches x-axis as a tangent).",
                "**$\\Delta < 0$**: No real roots (curve does not cross or touch the x-axis; strictly positive if $a > 0$ or strictly negative if $a < 0$)."
              ]
            },
            {
              subTitle: "Intersection of Line and Quadratic Curve",
              bullets: [
                "**Method**: Equate $mx + c = ax^2 + bx + d \\implies ax^2 + (b - m)x + (d - c) = 0$.",
                "**Two Intersections**: Discriminant $\\Delta > 0$ (line is a secant).",
                "**One Intersection (Tangent)**: Discriminant $\\Delta = 0$ (line is tangent to curve).",
                "**No Intersection**: Discriminant $\\Delta < 0$ (line does not meet curve)."
              ]
            }
          ]
        },
        {
          title: "Quadratic Inequalities",
          body: "Solving inequalities involving quadratic expressions using critical values and sketch graphs.",
          groups: [
            {
              bullets: [
                "**Solving $a(x - x_1)(x - x_2) > 0$ ($a > 0, x_1 < x_2$)**: The solution set is outside the roots: $x < x_1$ or $x > x_2$.",
                "**Solving $a(x - x_1)(x - x_2) < 0$ ($a > 0, x_1 < x_2$)**: The solution set is between the roots: $x_1 < x < x_2$."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Factors of Polynomials",
      intro: "Polynomial algebra extends quadratic concepts to cubic and higher degree polynomials. This chapter covers polynomial long division, the Remainder Theorem, the Factor Theorem, complete factorisation of cubic expressions, and solving polynomial equations.",
      subheadings: [
        {
          title: "Polynomial Operations and Long Division",
          body: "Dividing a polynomial $P(x)$ by a divisor $D(x)$ produces a quotient $Q(x)$ and remainder $R(x)$ such that $P(x) = D(x)Q(x) + R(x)$.",
          groups: [
            {
              bullets: [
                "**Polynomial Degree**: The highest power of $x$ appearing with a non-zero coefficient.",
                "**Polynomial Long Division**: Systematic algebraic division algorithm to divide $P(x)$ by a linear divisor $(ax + b)$ until the remainder is a constant.",
                "**Identity**: $\\frac{P(x)}{ax + b} = Q(x) + \\frac{R}{ax + b} \\iff P(x) = (ax + b)Q(x) + R$."
              ]
            }
          ]
        },
        {
          title: "The Remainder and Factor Theorems",
          body: "Fundamental algebraic theorems providing rapid methods to evaluate polynomial remainders and identify linear factors without full division.",
          groups: [
            {
              subTitle: "The Remainder Theorem",
              bullets: [
                "**Theorem Statement**: When a polynomial $P(x)$ is divided by a linear factor $(ax - b)$, the remainder is $R = P\\left(\\frac{b}{a}\\right)$.",
                "**Example**: Remainder when $P(x) = 2x^3 - 3x^2 + 4$ is divided by $(x - 2)$ is $P(2) = 2(8) - 3(4) + 4 = 16 - 12 + 4 = 8$."
              ]
            },
            {
              subTitle: "The Factor Theorem",
              bullets: [
                "**Theorem Statement**: The linear binomial $(ax - b)$ is a factor of $P(x)$ if and only if $P\\left(\\frac{b}{a}\\right) = 0$.",
                "**Factorising a Cubic $P(x)$**: (1) Test integer factors of the constant term using the Factor Theorem until $P(k) = 0 \\implies (x - k)$ is a factor; (2) Use polynomial division or coefficient comparison to find the remaining quadratic factor $Q(x)$; (3) Factorise $Q(x)$ into linear factors if possible."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Equations, Inequalities and Graphs",
      intro: "This chapter develops skills in graph sketching of polynomials and rational functions, solving cubic inequalities, solving absolute value equations graphically, and understanding transformations of curves.",
      subheadings: [
        {
          title: "Graph Sketching of Polynomials",
          body: "Techniques for sketching cubic and higher-order curves by identifying axis intercepts, end behaviour, and turning points.",
          groups: [
            {
              bullets: [
                "**Roots and X-Intercepts**: Set $P(x) = 0$. Distinct roots $(x - a)$ cross the x-axis; repeated roots $(x - a)^2$ touch the x-axis as turning points; $(x - a)^3$ cross with a stationary point of inflexion.",
                "**Y-Intercept**: Evaluate $P(0)$ (the constant term).",
                "**End Behaviour**: For $y = ax^3$, if $a > 0$, as $x \\to +\\infty, y \\to +\\infty$ and as $x \\to -\\infty, y \\to -\\infty$."
              ]
            }
          ]
        },
        {
          title: "Solving Non-Linear Inequalities",
          body: "Using sign diagrams and sketch graphs to determine solution intervals for polynomial and rational inequalities.",
          groups: [
            {
              bullets: [
                "**Sign Diagram Method**: Find all real roots (critical points), plot on a number line, and test the sign of the expression in each interval.",
                "**Rational Inequalities**: To solve $\\frac{P(x)}{Q(x)} > 0$, multiply by $[Q(x)]^2 > 0$ (never multiply by $Q(x)$ directly as its sign is unknown) to obtain $P(x)Q(x) > 0$ with $Q(x) \\ne 0$."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Simultaneous Equations",
      intro: "Simultaneous systems require finding coordinates $(x, y)$ that simultaneously satisfy two or more algebraic equations. This chapter focuses on solving systems involving one linear and one non-linear equation by algebraic substitution and interpreting results geometrically as intersections or tangencies.",
      subheadings: [
        {
          title: "Algebraic Solution by Substitution",
          body: "The substitution method provides the universal technique for solving linear and non-linear simultaneous pairs.",
          groups: [
            {
              subTitle: "Step-by-Step Procedure",
              bullets: [
                "**Step 1**: From the linear equation $ax + by = c$, rearrange to express one variable in terms of the other (e.g. $y = \\frac{c - ax}{b}$).",
                "**Step 2**: Substitute this expression for $y$ into the non-linear equation (e.g. $x^2 + y^2 = r^2$ or $y = px^2 + qx + r$).",
                "**Step 3**: Expand and simplify to form a single quadratic equation in $x$: $Ax^2 + Bx + C = 0$.",
                "**Step 4**: Solve for $x$ using factorisation or the quadratic formula.",
                "**Step 5**: Substitute each $x$-value back into the **linear** equation to find the corresponding $y$-values, writing solutions as coordinate pairs $(x_1, y_1)$ and $(x_2, y_2)$."
              ]
            },
            {
              subTitle: "Geometric Interpretation",
              bullets: [
                "**Two Distinct Solutions**: The line intersects the curve at two distinct points (secant line).",
                "**One Repeated Solution**: The line touches the curve at exactly one point (tangent line).",
                "**No Real Solutions**: The line does not meet the curve."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Logarithmic and Exponential Functions",
      intro: "Logarithmic and exponential functions model continuous growth, decay, and power relationships across mathematics and science. This chapter covers the laws of logarithms, natural logarithms $\\ln x$, change of base formula, solving exponential equations, and modeling exponential phenomena.",
      subheadings: [
        {
          title: "Laws of Logarithms and Natural Logarithms",
          body: "Logarithms are the mathematical inverses of exponential functions: $y = a^x \\iff x = \\log_a y$ ($a > 0, a \\ne 1, y > 0$).",
          groups: [
            {
              subTitle: "The Laws of Logarithms",
              bullets: [
                "**Product Law**: $\\log_a(xy) = \\log_a x + \\log_a y$",
                "**Quotient Law**: $\\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y$",
                "**Power Law**: $\\log_a(x^k) = k \\log_a x$",
                "**Special Values**: $\\log_a 1 = 0$ and $\\log_a a = 1$",
                "**Change of Base Formula**: $\\log_b x = \\frac{\\log_a x}{\\log_a b}$ (commonly using base 10 or natural base $e$: $\\log_b x = \\frac{\\ln x}{\\ln b}$)",
                "**Natural Logarithms**: $\\ln x = \\log_e x$ where $e \\approx 2.71828$; $e^{\\ln x} = x$ and $\\ln(e^x) = x$."
              ]
            }
          ]
        },
        {
          title: "Solving Exponential and Logarithmic Equations",
          body: "Methods for solving equations where the unknown variable appears in the exponent or inside a logarithm.",
          groups: [
            {
              subTitle: "Equation Types",
              bullets: [
                "**Simple Exponential ($a^x = b$)**: Take natural logs of both sides: $\\ln(a^x) = \\ln b \\implies x \\ln a = \\ln b \\implies x = \\frac{\\ln b}{\\ln a}$.",
                "**Hidden Quadratics ($a^{2x} + p a^x + q = 0$)**: Substitute $u = a^x$ to form $u^2 + pu + q = 0$, solve for $u$, then solve $a^x = u$ (rejecting $u \\le 0$).",
                "**Logarithmic Equations**: Combine terms using log laws into $\\log_a(f(x)) = \\log_a(g(x)) \\implies f(x) = g(x)$, checking solutions against domain constraints ($f(x) > 0$)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 7,
      title: "Straight-Line Graphs",
      intro: "Many scientific and economic relationships are non-linear. By applying logarithms or algebraic substitution, non-linear laws can be transformed into the linear form $Y = mX + c$, allowing unknown constants to be determined from experimental straight-line graphs.",
      subheadings: [
        {
          title: "Transforming Non-Linear Relationships to Linear Form",
          body: "Converting non-linear equations into the linear form $Y = mX + c$ where $Y$ and $X$ are expressions in $x$ and $y$.",
          groups: [
            {
              subTitle: "Power Law: $y = ax^n$",
              bullets: [
                "**Linear Transformation**: Take logs: $\\ln y = \\ln(ax^n) = \\ln a + n \\ln x \\implies \\ln y = n(\\ln x) + \\ln a$.",
                "**Graph Plot**: Plot $Y = \\ln y$ against $X = \\ln x$.",
                "**Parameters**: Gradient $m = n$; Y-intercept $c = \\ln a \\implies a = e^c$."
              ]
            },
            {
              subTitle: "Exponential Law: $y = Ab^x$",
              bullets: [
                "**Linear Transformation**: Take logs: $\\ln y = \\ln(Ab^x) = \\ln A + x \\ln b \\implies \\ln y = (\\ln b)x + \\ln A$.",
                "**Graph Plot**: Plot $Y = \\ln y$ against $X = x$.",
                "**Parameters**: Gradient $m = \\ln b \\implies b = e^m$; Y-intercept $c = \\ln A \\implies A = e^c$."
              ]
            },
            {
              subTitle: "Other Algebraic Forms",
              bullets: [
                "**$y = \\frac{a}{x} + b$**: Plot $y$ against $\\frac{1}{x}$; Gradient $= a$, Y-intercept $= b$.",
                "**$xy = ax + b$**: Divide by $x$: $y = a + \\frac{b}{x}$; Plot $y$ against $\\frac{1}{x}$; Gradient $= b$, Y-intercept $= a$.",
                "**$y = ax^2 + bx$**: Divide by $x$: $\\frac{y}{x} = ax + b$; Plot $\\frac{y}{x}$ against $x$; Gradient $= a$, Y-intercept $= b$."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 8,
      title: "Coordinate Geometry of the Circle",
      intro: "This chapter develops the analytic geometry of circles on the Cartesian plane, deriving circle equations in standard and general forms, finding equations of tangents and normals, and analyzing chords and intersections.",
      subheadings: [
        {
          title: "Equations of Circles",
          body: "A circle is the locus of all points $(x, y)$ equidistant from a fixed centre point.",
          groups: [
            {
              subTitle: "Standard and General Forms",
              bullets: [
                "**Standard Form (Centre $(a, b)$, Radius $r$)**: $(x - a)^2 + (y - b)^2 = r^2$.",
                "**Circle Centred at Origin**: $x^2 + y^2 = r^2$.",
                "**General Form**: $x^2 + y^2 + 2gx + 2fy + c = 0$.",
                "**Finding Centre and Radius from General Form**: Complete the square: $\\text{Centre} = (-g, -f)$ and $\\text{Radius} = r = \\sqrt{g^2 + f^2 - c}$ (valid if $g^2 + f^2 - c > 0$)."
              ]
            }
          ]
        },
        {
          title: "Tangents, Normals and Chords",
          body: "Applying coordinate geometry to determine tangent lines, normal lines, and chord properties.",
          groups: [
            {
              bullets: [
                "**Tangent at Point $P(x_1, y_1)$ on Circle**: (1) Find gradient of radius $m_{\\text{rad}} = \\frac{y_1 - b}{x_1 - a}$; (2) Tangent gradient is perpendicular: $m_{\\text{tan}} = -\\frac{1}{m_{\\text{rad}}}$; (3) Tangent equation: $y - y_1 = m_{\\text{tan}}(x - x_1)$.",
                "**Normal to Circle at $P(x_1, y_1)$**: The normal is the line passing through $P$ and the centre $(a, b)$, with gradient $m_{\\text{rad}}$.",
                "**Perpendicular Bisector of a Chord**: The perpendicular bisector of any chord passes through the centre of the circle."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 9,
      title: "Circular Measure",
      intro: "Circular measure utilizes the radian as the natural unit of angle measurement. This chapter establishes radian-degree conversions and exact formulas for arc length, sector area, and segment area.",
      subheadings: [
        {
          title: "Radian Measure and Conversions",
          body: "One radian is the angle subtended at the centre of a circle by an arc equal in length to the radius.",
          groups: [
            {
              bullets: [
                "**Fundamental Identity**: $\\pi \\text{ radians} = 180^\\circ \\iff 1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.3^\\circ$.",
                "**Degrees to Radians**: Multiply by $\\frac{\\pi}{180^\\circ}$ (e.g. $60^\\circ = 60 \\times \\frac{\\pi}{180} = \\frac{\\pi}{3} \\text{ rad}$).",
                "**Radians to Degrees**: Multiply by $\\frac{180^\\circ}{\\pi}$ (e.g. $\\frac{3\\pi}{4} \\text{ rad} = \\frac{3\\pi}{4} \\times \\frac{180}{\\pi} = 135^\\circ$)."
              ]
            }
          ]
        },
        {
          title: "Arc Length, Sector Area and Segment Area",
          body: "Direct formulas for circular geometric measurements when angle $\\theta$ is in radians.",
          groups: [
            {
              subTitle: "Formulas ($\\theta$ in radians)",
              bullets: [
                "**Arc Length ($s$)**: $s = r\\theta$.",
                "**Sector Area ($A$)**: $A_{\\text{sector}} = \\frac{1}{2}r^2\\theta$.",
                "**Area of a Segment**: $\\text{Area of Segment} = \\text{Area of Sector} - \\text{Area of Triangle} = \\frac{1}{2}r^2\\theta - \\frac{1}{2}r^2\\sin\\theta = \\frac{1}{2}r^2(\\theta - \\sin\\theta)$.",
                "**Perimeter of a Segment**: $\\text{Perimeter} = s + \\text{chord length} = r\\theta + 2r\\sin\\left(\\frac{\\theta}{2}\\right)$."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 10,
      title: "Trigonometry",
      intro: "Trigonometry in Additional Mathematics extends to angles of any magnitude, reciprocal trigonometric functions (secant, cosecant, cotangent), Pythagorean trigonometric identities, harmonic waveforms $y = a\\sin(bx) + c$, and solving general trigonometric equations.",
      subheadings: [
        {
          title: "Trigonometric Functions of General Angles and the CAST Rule",
          body: "Defining trigonometric ratios on the unit circle across all four quadrants.",
          groups: [
            {
              subTitle: "The CAST Diagram",
              bullets: [
                "**Quadrant 1 ($0 < \\theta < 90^\\circ$)**: **All** ratios positive ($\sin, \cos, \tan > 0$).",
                "**Quadrant 2 ($90^\\circ < \\theta < 180^\\circ$)**: **Sine** positive; $\sin(180^\\circ - \\theta) = \\sin \\theta$, $\\cos(180^\\circ - \\theta) = -\\cos \\theta$, $\\tan(180^\\circ - \\theta) = -\\tan \\theta$.",
                "**Quadrant 3 ($180^\\circ < \\theta < 270^\\circ$)**: **Tangent** positive; $\sin(180^\\circ + \\theta) = -\\sin \\theta$, $\\cos(180^\\circ + \\theta) = -\\cos \\theta$, $\\tan(180^\\circ + \\theta) = \\tan \\theta$.",
                "**Quadrant 4 ($270^\\circ < \\theta < 360^\\circ$)**: **Cosine** positive; $\sin(360^\\circ - \\theta) = -\\sin \\theta$, $\\cos(360^\\circ - \\theta) = \\cos \\theta$, $\\tan(360^\\circ - \\theta) = -\\tan \\theta$."
              ]
            }
          ]
        },
        {
          title: "Reciprocal Functions and Fundamental Identities",
          body: "Definitions of reciprocal ratios and the Pythagorean identities.",
          groups: [
            {
              subTitle: "Reciprocal Functions",
              bullets: [
                "**Secant**: $\\sec \\theta = \\frac{1}{\\cos \\theta}$",
                "**Cosecant**: $\\csc \\theta = \\frac{1}{\\sin \\theta}$",
                "**Cotangent**: $\\cot \\theta = \\frac{1}{\\tan \\theta} = \\frac{\\cos \\theta}{\\sin \\theta}$"
              ]
            },
            {
              subTitle: "Trigonometric Identities",
              bullets: [
                "**Primary Pythagorean Identity**: $\\sin^2 \\theta + \\cos^2 \\theta = 1$",
                "**Secant-Tangent Identity**: $1 + \\tan^2 \\theta = \\sec^2 \\theta$ (divide primary identity by $\\cos^2 \\theta$)",
                "**Cosecant-Cotangent Identity**: $1 + \\cot^2 \\theta = \\csc^2 \\theta$ (divide primary identity by $\\sin^2 \\theta$)"
              ]
            }
          ]
        },
        {
          title: "Trigonometric Graphs and Equations",
          body: "Analyzing amplitude, period, and phase, and systematically solving trigonometric equations.",
          groups: [
            {
              subTitle: "Waveform Characteristics: $y = a\\sin(bx) + c$",
              bullets: [
                "**Amplitude**: $|a| = \\frac{\\text{Max} - \\text{Min}}{2}$",
                "**Period**: $\\text{Period} = \\frac{360^\\circ}{b}$ (or $\\frac{2\\pi}{b}$ radians)",
                "**Vertical Shift (Principal Axis)**: $y = c = \\frac{\\text{Max} + \\text{Min}}{2}$"
              ]
            },
            {
              subTitle: "Solving Trigonometric Equations",
              bullets: [
                "**Step 1**: Isolate the trig ratio (e.g. $\\sin(2x - \\pi/4) = 0.5$).",
                "**Step 2**: Determine the principal basic acute angle $\\alpha = \\arcsin|0.5| = \\pi/6$.",
                "**Step 3**: Identify the correct quadrants using CAST according to the sign of the ratio.",
                "**Step 4**: Adjust domain interval for the compound angle ($2x - \\pi/4$) and solve for $x$."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 11,
      title: "Permutations and Combinations",
      intro: "Combinatorics is the branch of mathematics dealing with counting arrangements and selections. This chapter covers the multiplication principle, factorial notation, permutations (where order matters), combinations (where order does not matter), and problem-solving with constraints.",
      subheadings: [
        {
          title: "The Multiplication Principle and Factorials",
          body: "Fundamental counting rules for independent sequential choices.",
          groups: [
            {
              bullets: [
                "**Multiplication Principle**: If a task consists of $k$ consecutive steps where step 1 has $n_1$ choices, step 2 has $n_2$ choices, $\\dots$, total ways $= n_1 \\times n_2 \\times \\dots \\times n_k$.",
                "**Factorial Notation**: $n! = n \\times (n - 1) \\times (n - 2) \\times \\dots \\times 2 \\times 1$; by definition, $0! = 1$."
              ]
            }
          ]
        },
        {
          title: "Permutations (Arrangements Where Order Matters)",
          body: "Calculating ordered arrangements of $r$ objects chosen from $n$ distinct items.",
          groups: [
            {
              subTitle: "Permutation Formulas",
              bullets: [
                "**Arranging $n$ Distinct Objects**: $n!$ ways.",
                "**Arranging $r$ Objects from $n$ Distinct Objects**: $^n\\text{P}_r = \\frac{n!}{(n - r)!}$.",
                "**Arrangements with Repetition**: If there are $p$ identical items of one type, $q$ of another: $\\text{Total Ways} = \\frac{n!}{p! \\, q! \\, r!}$."
              ]
            },
            {
              subTitle: "Common Constraint Strategies",
              bullets: [
                "**Items Must Be Together ('Block/Glue Method')**: Treat grouped items as a single unit, arrange the units, then multiply by internal permutations of the group.",
                "**Items Must Be Separated ('Gap Method')**: Arrange unconstrained items first, then place constrained items into the available spaces (gaps) between them.",
                "**Complement Rule**: $\\text{Favorable Arrangements} = \\text{Total Unrestricted} - \\text{Unfavorable Arrangements}$."
              ]
            }
          ]
        },
        {
          title: "Combinations (Selections Where Order Does NOT Matter)",
          body: "Calculating unordered subsets of $r$ objects chosen from $n$ distinct items.",
          groups: [
            {
              subTitle: "Combination Formula",
              bullets: [
                "**Selection Formula**: $^n\\text{C}_r = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}$.",
                "**Symmetry Property**: $\\binom{n}{r} = \\binom{n}{n - r}$.",
                "**Committee & Team Selections**: Multiply independent combination selections (e.g. choosing 3 men from 7 AND 2 women from 5: $\\binom{7}{3} \\times \\binom{5}{2} = 35 \\times 10 = 350$)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 12,
      title: "Series",
      intro: "A series is the sum of terms in a sequence. This chapter covers the Binomial Theorem for positive integer indices $(a + b)^n$, Arithmetic Progressions (AP), Geometric Progressions (GP), and the sum to infinity of convergent geometric series.",
      subheadings: [
        {
          title: "The Binomial Theorem",
          body: "Expanding algebraic binomial powers $(a + b)^n$ for positive integer $n \\in \\mathbb{Z}^+$.",
          groups: [
            {
              subTitle: "Expansion Formulas",
              bullets: [
                "**Binomial Theorem**: $(a + b)^n = \\sum_{r=0}^n \\binom{n}{r} a^{n-r} b^r = a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\dots + b^n$.",
                "**Expansion of $(1 + x)^n$**: $(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\dots + x^n$.",
                "**General $(r+1)$th Term ($T_{r+1}$)**: $T_{r+1} = \\binom{n}{r} a^{n-r} b^r$."
              ]
            }
          ]
        },
        {
          title: "Arithmetic Progressions (AP)",
          body: "Sequences with a constant common difference $d$ between successive terms.",
          groups: [
            {
              subTitle: "AP Formulas",
              bullets: [
                "**$n$th Term ($T_n$)**: $T_n = a + (n - 1)d$ where $a$ is the first term and $d = T_{k+1} - T_k$.",
                "**Sum of First $n$ Terms ($S_n$)**: $S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)$ where $l = T_n$ is the last term."
              ]
            }
          ]
        },
        {
          title: "Geometric Progressions (GP)",
          body: "Sequences with a constant common ratio $r$ between successive terms.",
          groups: [
            {
              subTitle: "GP Formulas",
              bullets: [
                "**$n$th Term ($T_n$)**: $T_n = a r^{n-1}$ where $a$ is the first term and $r = \\frac{T_{k+1}}{T_k}$.",
                "**Sum of First $n$ Terms ($S_n$)**: $S_n = \\frac{a(1 - r^n)}{1 - r} = \\frac{a(r^n - 1)}{r - 1}$ ($r \\ne 1$).",
                "**Sum to Infinity ($S_\\infty$)**: Exists if and only if the series is **convergent** ($|r| < 1 \\iff -1 < r < 1$): $S_\\infty = \\frac{a}{1 - r}$."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 13,
      title: "Vectors in Two Dimensions",
      intro: "Vectors represent geometric quantities possessing magnitude and direction. This chapter covers unit vectors $\\mathbf{i}$ and $\\mathbf{j}$, vector addition and scalar multiplication, position vectors, collinearity proofs, and relative velocity.",
      subheadings: [
        {
          title: "Vector Notation, Magnitude and Unit Vectors",
          body: "Representing 2D vectors in Cartesian component form.",
          groups: [
            {
              bullets: [
                "**Component Form**: $\\mathbf{r} = x\\mathbf{i} + y\\mathbf{j} = \\begin{pmatrix} x \\\\ y \\end{pmatrix}$ where $\\mathbf{i} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ and $\\mathbf{j} = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$.",
                "**Magnitude (Length)**: $|\\mathbf{r}| = \\sqrt{x^2 + y^2}$.",
                "**Unit Vector**: A vector of magnitude 1 in the direction of $\\mathbf{r}$: $\\hat{\\mathbf{r}} = \\frac{\\mathbf{r}}{|\\mathbf{r}|} = \\frac{1}{\\sqrt{x^2 + y^2}}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$."
              ]
            }
          ]
        },
        {
          title: "Position Vectors, Geometric Proofs and Relative Velocity",
          body: "Using vector algebra for displacement, collinearity, and relative motion.",
          groups: [
            {
              subTitle: "Position Vectors and Collinearity",
              bullets: [
                "**Displacement Vector**: $\\vec{AB} = \\vec{OB} - \\vec{OA} = \\mathbf{b} - \\mathbf{a}$.",
                "**Collinearity Condition**: Three distinct points $A, B, C$ are collinear if $\\vec{AB} = k \\vec{BC}$ ($k$ is a scalar) and they share point $B$."
              ]
            },
            {
              subTitle: "Relative Velocity",
              bullets: [
                "**Definition**: Velocity of body $A$ relative to body $B$ is $\\mathbf{v}_{A/B} = \\mathbf{v}_A - \\mathbf{v}_B$.",
                "**Interception & Closest Approach**: If body $A$ with initial position $\\mathbf{r}_A$ moves at velocity $\\mathbf{v}_A$, position at time $t$ is $\\mathbf{r}(t) = \\mathbf{r}_A + t\\mathbf{v}_A$."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 14,
      title: "Calculus",
      intro: "Calculus is the mathematical study of continuous change. Differential calculus finds instantaneous rates of change, gradients of tangents and normals, turning points, and rates of change. Integral calculus reverses differentiation to determine total accumulated quantities, areas under curves, and kinematic displacement from velocity.",
      subheadings: [
        {
          title: "Differentiation Rules and Techniques",
          body: "Methods for calculating derivatives of algebraic, exponential, logarithmic, and trigonometric functions.",
          groups: [
            {
              subTitle: "Standard Derivatives",
              bullets: [
                "**Power Rule**: $\\frac{d}{dx}(x^n) = n x^{n-1}$",
                "**Exponential**: $\\frac{d}{dx}(e^{ax+b}) = a e^{ax+b}$",
                "**Logarithm**: $\\frac{d}{dx}(\\ln(ax+b)) = \\frac{a}{ax+b}$",
                "**Trigonometric**: $\\frac{d}{dx}(\\sin(ax+b)) = a\\cos(ax+b)$; $\\frac{d}{dx}(\\cos(ax+b)) = -a\\sin(ax+b)$; $\\frac{d}{dx}(\\tan(ax+b)) = a\\sec^2(ax+b)$"
              ]
            },
            {
              subTitle: "Product, Quotient and Chain Rules",
              bullets: [
                "**Chain Rule**: $\\frac{dy}{dx} = \\frac{dy}{du} \\times \\frac{du}{dx}$ (e.g. $\\frac{d}{dx}[f(x)]^n = n[f(x)]^{n-1} f'(x)$).",
                "**Product Rule**: $\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx}$.",
                "**Quotient Rule**: $\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}$."
              ]
            }
          ]
        },
        {
          title: "Applications of Differentiation",
          body: "Using derivatives to calculate tangents, normals, maximum and minimum values, and connected rates of change.",
          groups: [
            {
              subTitle: "Tangents and Normals",
              bullets: [
                "**Gradient of Tangent**: $m_{\\text{tan}} = \\left.\\frac{dy}{dx}\\right|_{x = x_1}$; Tangent line: $y - y_1 = m_{\\text{tan}}(x - x_1)$.",
                "**Gradient of Normal**: $m_{\\text{norm}} = -\\frac{1}{m_{\\text{tan}}}$; Normal line: $y - y_1 = m_{\\text{norm}}(x - x_1)$."
              ]
            },
            {
              subTitle: "Stationary Points and Nature",
              bullets: [
                "**Stationary Point Condition**: Set $\\frac{dy}{dx} = 0$ and solve for $x$.",
                "**Second Derivative Test**: If $\\frac{d^2y}{dx^2} > 0 \\implies$ **Local Minimum**; If $\\frac{d^2y}{dx^2} < 0 \\implies$ **Local Maximum**; If $\\frac{d^2y}{dx^2} = 0$, test sign of $\\frac{dy}{dx}$ on either side (inflexion point)."
              ]
            },
            {
              subTitle: "Connected Rates of Change",
              bullets: [
                "**Formula**: $\\frac{dy}{dt} = \\frac{dy}{dx} \\times \\frac{dx}{dt}$."
              ]
            }
          ]
        },
        {
          title: "Integration and Applications",
          body: "Indefinite and definite integration, area under a curve, and kinematics.",
          groups: [
            {
              subTitle: "Standard Integrals",
              bullets: [
                "**Power Rule**: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + c$ ($n \\ne -1$)",
                "**Reciprocal**: $\\int \\frac{1}{ax+b} dx = \\frac{1}{a}\\ln|ax+b| + c$",
                "**Exponential**: $\\int e^{ax+b} dx = \\frac{1}{a}e^{ax+b} + c$",
                "**Trigonometric**: $\\int \\sin(ax+b) dx = -\\frac{1}{a}\\cos(ax+b) + c$; $\\int \\cos(ax+b) dx = \\frac{1}{a}\\sin(ax+b) + c$; $\\int \\sec^2(ax+b) dx = \\frac{1}{a}\\tan(ax+b) + c$"
              ]
            },
            {
              subTitle: "Area Under a Curve & Kinematics",
              bullets: [
                "**Area Under Curve Between $x = a$ and $x = b$**: $\\text{Area} = \\int_a^b y \\, dx$.",
                "**Area Between Two Curves**: $\\text{Area} = \\int_a^b (y_{\\text{upper}} - y_{\\text{lower}}) \\, dx$.",
                "**Kinematics Connections**: Displacement $s(t)$, Velocity $v(t) = \\frac{ds}{dt}$, Acceleration $a(t) = \\frac{dv}{dt}$; $v = \\int a \\, dt$ and $s = \\int v \\, dt$."
              ]
            }
          ]
        }
      ]
    }
  ]
};
