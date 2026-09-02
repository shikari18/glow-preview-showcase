import type { SubjectNotes } from "./types";

export const BUSINESS_STUDIES: SubjectNotes = {
  id: "business-studies",
  name: "Business Studies",
  code: "0450",
  color: "bg-amber-600",
  chapters: [
    {
      number: 1,
      title: "Understanding Business Activity",
      intro: "Business activity combines factors of production (land, labour, capital, and enterprise) to produce goods and services that satisfy human needs and wants, creating economic added value. This chapter explores economic sectors, entrepreneurship, business growth, organizational forms, and stakeholder objectives.",
      subheadings: [
        {
          title: "Purpose of Business and Economic Sectors",
          body: "Businesses solve the economic problem of scarcity (unlimited human wants competing for finite economic resources).",
          groups: [
            {
              subTitle: "Factors of Production & Added Value",
              bullets: [
                "**Land**: All natural physical resources (minerals, agricultural land, forests, water).",
                "**Labour**: The physical and mental human effort devoted to production.",
                "**Capital**: Man-made equipment and finance used to produce other goods (machinery, IT, factories).",
                "**Enterprise**: The risk-taking and decision-making skill of the entrepreneur who combines the other three factors.",
                "**Added Value**: The difference between the selling price of a product and the cost of purchased raw materials (increased through branding, superior quality, unique design, or excellent customer service)."
              ]
            },
            {
              subTitle: "Economic Sectors and Deindustrialisation",
              bullets: [
                "**Primary Sector**: Extraction of natural resources (farming, mining, fishing, forestry).",
                "**Secondary Sector**: Manufacturing and processing raw materials into finished goods (car assembly, food canning, construction).",
                "**Tertiary Sector**: Providing commercial services to consumers and businesses (banking, insurance, retail, tourism, healthcare).",
                "**Deindustrialisation**: The structural shift in developed economies where the relative importance of manufacturing declines as the tertiary service sector expands."
              ]
            }
          ]
        },
        {
          title: "Enterprise, Business Size and Growth",
          body: "The role of entrepreneurs, measuring business size, and methods of business expansion.",
          groups: [
            {
              subTitle: "Measuring Business Size",
              bullets: [
                "**Valid Measures**: Number of employees, Value of capital employed, Value of sales turnover, Market share (never use profit alone as profit fluctuates independently of size).",
                "**Internal (Organic) Growth**: Expanding output using retained profits (opening new branches, launching new products).",
                "**External Growth (Mergers and Takeovers)**: **Horizontal integration** (same industry and stage of production, e.g. two supermarkets merging); **Vertical integration** (Forward integration towards customer or Backward integration towards supplier); **Conglomerate integration** (merging with a firm in a completely different industry to diversify risk)."
              ]
            }
          ]
        },
        {
          title: "Types of Business Organisation and Stakeholders",
          body: "Legal structures of private and public sector business entities and competing stakeholder interests.",
          groups: [
            {
              subTitle: "Business Legal Structures",
              bullets: [
                "**Sole Trader**: 1 owner, full control, retains all profit, but has **unlimited liability** (personal assets at risk) and lacks continuity.",
                "**Partnership**: 2–20 partners, shared capital and workload, Deed of Partnership, but partners share unlimited liability.",
                "**Private Limited Company (Ltd)**: Owned by private shareholders, **limited liability** (shareholders only lose investment value), shares cannot be sold to the general public on the stock exchange.",
                "**Public Limited Company (Plc)**: Large corporation, shares freely traded on the stock exchange, substantial capital raising ability, but vulnerable to hostile takeovers and subject to strict public disclosure regulations.",
                "**Franchise**: Franchisor sells the license to a franchisee to trade under its brand name and business model in exchange for an initial fee and royalty percentage on sales."
              ]
            },
            {
              subTitle: "Stakeholder Objectives and Conflicts",
              bullets: [
                "**Stakeholder**: Any individual or group with a direct interest in the activities and decisions of a business.",
                "**Internal Stakeholders**: Owners/Shareholders (maximize profit/dividends), Managers (status, bonuses), Employees (job security, fair wages, safe working conditions).",
                "**External Stakeholders**: Customers (quality, fair prices), Suppliers (prompt payment, regular orders), Government (tax revenue, legal compliance), Local Community (low pollution, local employment).",
                "**Stakeholder Conflict**: E.g. Shareholders demanding higher short-term profits vs Employees demanding higher wages or Local Community opposing factory expansion."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "People in Business",
      intro: "Human resource management focuses on motivating employees, organizing departmental structures, recruiting and training personnel, and maintaining effective communication across the enterprise.",
      subheadings: [
        {
          title: "Motivation Theories and Reward Systems",
          body: "Understanding the psychological drivers of employee productivity and engagement.",
          groups: [
            {
              subTitle: "Classical Motivation Theories",
              bullets: [
                "**F.W. Taylor (Scientific Management)**: Believed workers are motivated purely by money; advocated specialization, piece-rate pay, and close supervision.",
                "**Abraham Maslow (Hierarchy of Needs)**: Five-tier pyramid of human needs: **Physiological** (basic wage) $\\to$ **Safety** (job security, contract) $\\to$ **Social / Belonging** (teamwork, social events) $\\to$ **Esteem** (recognition, promotion) $\\to$ **Self-Actualisation** (reaching full creative potential).",
                "**Herzberg (Two-Factor Theory)**: **Hygiene Factors** (pay, working conditions, company policy) do not motivate on their own, but cause severe dissatisfaction if inadequate; **Motivators** (achievement, recognition, meaningful responsibility, advancement) directly inspire high performance."
              ]
            },
            {
              subTitle: "Financial vs Non-Financial Rewards",
              bullets: [
                "**Financial**: Wages (time rate / piece rate), Salaries, Commission (percentage of sales made), Performance-related pay (PRP), Profit sharing, Share ownership schemes.",
                "**Non-Financial**: Job rotation (swapping tasks to relieve boredom), Job enlargement (adding tasks of similar complexity), **Job enrichment** (giving higher responsibility and autonomy), Teamworking, Opportunities for promotion."
              ]
            }
          ]
        },
        {
          title: "Organisation Structures and Leadership",
          body: "Hierarchical management frameworks, span of control, chain of command, and leadership styles.",
          groups: [
            {
              subTitle: "Organisational Structures",
              bullets: [
                "**Chain of Command**: The line of authority through which orders are passed down from top management to shopfloor workers.",
                "**Span of Control**: The number of subordinates working directly under a manager.",
                "**Tall Structure**: Long chain of command, narrow span of control; allows close supervision but suffers from slow, distorted communication.",
                "**Flat Structure**: Short chain of command, wide span of control; encourages employee empowerment, delegation, and faster communication.",
                "**Delayering**: Removing intermediate management levels to reduce costs and flatten the hierarchy."
              ]
            },
            {
              subTitle: "Leadership Styles",
              bullets: [
                "**Autocratic**: Manager makes all decisions without consulting staff; fast decisions, ideal during crises, but reduces worker morale.",
                "**Democratic**: Manager consults employees and encourages participation in decision-making; improves motivation and idea generation, but slows decision speed.",
                "**Laissez-faire**: Broad objectives set, leaving workers with complete autonomy; effective for highly skilled creative professionals."
              ]
            }
          ]
        },
        {
          title: "Recruitment, Training and Communication",
          body: "The human resource cycle from job analysis to employee development and effective internal communication.",
          groups: [
            {
              subTitle: "Recruitment and Training",
              bullets: [
                "**Recruitment Process**: Job Analysis $\\to$ **Job Description** (outlines duties and responsibilities) $\\to$ **Person Specification** (outlines required qualifications, skills, and experience) $\\to$ Advertising $\\to$ Shortlisting $\\to$ Interviewing.",
                "**Internal vs External Recruitment**: Internal (cheaper, quick, known candidate, motivates staff) vs External (brings fresh ideas and skills, but expensive advertising and longer induction).",
                "**Training Types**: **Induction training** (introducing new staff to company), **On-the-job training** (learning at the workstation from experienced colleagues), **Off-the-job training** (external courses, specialized workshops)."
              ]
            },
            {
              subTitle: "Effective Communication",
              bullets: [
                "**Barriers to Communication**: Technical jargon, emotional hostility, poor channel choice, excessive information overload, physical noise.",
                "**Methods**: Written (emails, formal reports), Verbal (meetings, video calls), Visual (charts, diagrams, videos)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Marketing",
      intro: "Marketing is the management process responsible for identifying, anticipating, and satisfying customer requirements profitably. This chapter covers market segmentation, primary and secondary market research, the 4 Ps of the marketing mix, e-commerce, and global marketing strategies.",
      subheadings: [
        {
          title: "The Role of Marketing, Mass vs Niche, and Segmentation",
          body: "Understanding customer demand and targeting specific market segments.",
          groups: [
            {
              subTitle: "Market Types",
              bullets: [
                "**Mass Market**: Selling standardized products to a huge target audience (e.g. soap, soft drinks); benefits from massive **economies of scale**, but faces intense price competition.",
                "**Niche Market**: Concentrating on a small, specialized segment of a larger market (e.g. luxury handmade sports cars, vegan gluten-free bakery); charges premium prices and gains loyal customers, but faces limited sales volume and high risk if demand changes."
              ]
            },
            {
              subTitle: "Market Segmentation",
              bullets: [
                "**Definition**: Dividing a total market into distinct subgroups of consumers sharing similar characteristics or needs.",
                "**Bases of Segmentation**: **Demographic** (age, gender, income level, social class), **Geographic** (region, climate, urban/rural), **Psychographic** (lifestyle, values, interests), **Behavioral** (brand loyalty, usage rate)."
              ]
            }
          ]
        },
        {
          title: "Market Research Methods",
          body: "Gathering quantitative data (numerical statistics) and qualitative data (opinions and attitudes).",
          groups: [
            {
              bullets: [
                "**Primary (Field) Research**: Collecting original, first-hand data for a specific business purpose (surveys, questionnaires, focus groups, interviews, consumer panels, observation). Up-to-date and directly relevant, but expensive and time-consuming.",
                "**Secondary (Desk) Research**: Using pre-existing data gathered by others (government census, trade journals, market research reports, internet competitor websites). Cheap and instant, but may be outdated, biased, or not specific to the firm's exact needs.",
                "**Sampling**: **Random sampling** (equal chance of selection) vs **Quota sampling** (selecting fixed numbers matching demographic proportions)."
              ]
            }
          ]
        },
        {
          title: "The Marketing Mix (The 4 Ps)",
          body: "Integrating Product, Price, Place, and Promotion into a coherent commercial strategy.",
          groups: [
            {
              subTitle: "1. Product & Product Life Cycle",
              bullets: [
                "**Product Life Cycle (PLC)**: **Development** (R&D costs, zero sales) $\\to$ **Introduction** (launch, low sales, high promotion expenses) $\\to$ **Growth** (rapid sales growth, rising profit) $\\to$ **Maturity** (peak sales, high cash flow, fierce competition) $\\to$ **Decline** (falling sales and profits).",
                "**Extension Strategies**: Modifying the product, repackaging, finding new target markets, or running new promotional campaigns to extend the maturity phase."
              ]
            },
            {
              subTitle: "2. Price Strategies",
              bullets: [
                "**Cost-Plus Pricing**: Adding a percentage mark-up to total unit cost.",
                "**Price Skimming**: Setting a high initial price for innovative technology to recover R&D costs before lowering it as competitors enter.",
                "**Penetration Pricing**: Setting a low initial price to capture rapid market share from rivals.",
                "**Competitive Pricing**: Setting prices in line with existing market rivals.",
                "**Promotional Pricing**: Short-term discounts (BOGOF) to clear excess inventory."
              ]
            },
            {
              subTitle: "3. Place (Distribution Channels)",
              bullets: [
                "**Direct (Manufacturer $\\to$ Consumer)**: High profit margins and full control, common in e-commerce.",
                "**One-Intermediary (Manufacturer $\\to$ Retailer $\\to$ Consumer)**: Standard for supermarkets and department stores.",
                "**Two-Intermediary (Manufacturer $\\to$ Wholesaler $\\to$ Retailer $\\to$ Consumer)**: Wholesaler breaks bulk for small independent corner shops."
              ]
            },
            {
              subTitle: "4. Promotion Mix",
              bullets: [
                "**Above-the-Line (Advertising)**: Mass media advertising (TV, radio, billboards, social media ads) paying an agency to reach broad audiences.",
                "**Below-the-Line**: Direct sales promotions (coupons, free samples, sponsorships, personal selling, public relations, trade exhibitions)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Operations Management",
      intro: "Operations management oversees the production transformation process that converts inputs (raw materials, labor, machinery) into finished goods and services, ensuring efficiency, high quality, and optimal factory location.",
      subheadings: [
        {
          title: "Production Methods, Productivity and Lean Production",
          body: "Manufacturing techniques and waste-reduction methodologies.",
          groups: [
            {
              subTitle: "Production Methods",
              bullets: [
                "**Job Production**: Manufacturing a single customized unit from start to finish to exact customer specifications (e.g. bespoke wedding dress, bridges); high quality and high price, but high unit cost and labor intensive.",
                "**Batch Production**: Producing a set quantity of identical items before retooling equipment for the next batch (e.g. bakery baking loaves then cakes); flexible, but incurs downtime between batches.",
                "**Flow (Mass) Production**: Continuous movement of identical products along an automated assembly line (e.g. car manufacturing, canned beverages); achieves massive **economies of scale** and low unit costs, but requires massive initial capital and lacks variety."
              ]
            },
            {
              subTitle: "Productivity and Lean Production",
              bullets: [
                "**Labour Productivity**: $\\text{Labour Productivity} = \\frac{\\text{Total Output}}{\\text{Number of Employees}}$.",
                "**Lean Production**: Systematically eliminating all forms of waste (*Muda*) in time, overproduction, transport, inventory, and defects.",
                "**Kaizen (Continuous Improvement)**: Continuous small-scale improvements suggested and implemented by worker quality circles.",
                "**Just-in-Time (JIT)**: Raw materials arrive immediately before production and finished goods are dispatched immediately to customers, eliminating warehousing holding costs."
              ]
            }
          ]
        },
        {
          title: "Costs, Break-Even Analysis and Margin of Safety",
          body: "Financial cost modeling to calculate the minimum output volume required for profitability.",
          groups: [
            {
              subTitle: "Cost Classifications",
              bullets: [
                "**Fixed Costs (Overheads)**: Costs that do not vary with the level of output in the short term (factory rent, insurance, administrative salaries).",
                "**Variable Costs**: Costs that change directly in proportion to output volume (raw materials, direct piece-rate wages).",
                "**Total Cost**: $\\text{Total Cost} = \\text{Fixed Costs} + \\text{Total Variable Costs}$.",
                "**Average (Unit) Cost**: $\\text{Average Cost} = \\frac{\\text{Total Cost}}{\\text{Total Output}}$."
              ]
            },
            {
              subTitle: "Break-Even Formulas",
              bullets: [
                "**Contribution per Unit**: $\\text{Contribution} = \\text{Selling Price per Unit} - \\text{Variable Cost per Unit}$.",
                "**Break-Even Point (Units)**: $\\text{Break-Even Output} = \\frac{\\text{Total Fixed Costs}}{\\text{Contribution per Unit}}$.",
                "**Margin of Safety**: $\\text{Margin of Safety} = \\text{Actual Output} - \\text{Break-Even Output}$ (the buffer volume sales can fall before the business incurs a loss)."
              ]
            }
          ]
        },
        {
          title: "Quality Management and Location Decisions",
          body: "Ensuring defect-free output and selecting optimal business locations.",
          groups: [
            {
              subTitle: "Quality Control vs Quality Assurance",
              bullets: [
                "**Quality Control (QC)**: Inspecting finished products at the end of the production line to detect and discard defective items (reactive).",
                "**Quality Assurance (QA)**: Establishing quality standards at every stage of production from design to delivery to prevent defects from occurring (**Total Quality Management - TQM**, proactive)."
              ]
            },
            {
              subTitle: "Location Factors",
              bullets: [
                "**Manufacturing**: Proximity to raw materials (if weight-losing), transport links (ports, motorways), cheap industrial land, availability of skilled/unskilled labor, government regional grants.",
                "**Services / Retail**: Footfall and customer traffic, competitor presence, parking access, high-speed telecommunications."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Financial Information and Decisions",
      intro: "Financial management involves sourcing capital, managing cash flow, and analyzing financial statements to guarantee corporate liquidity and profitability.",
      subheadings: [
        {
          title: "Sources of Finance and Working Capital",
          body: "Internal and external funding options categorized by time horizon.",
          groups: [
            {
              subTitle: "Internal Sources",
              bullets: [
                "**Retained Profits**: Reinvesting profits generated from trading (no interest or debt repayment).",
                "**Sale of Unwanted Non-Current Assets**: Selling obsolete equipment or surplus land for cash.",
                "**Managing Working Capital**: Reducing excess inventory and chasing trade receivables."
              ]
            },
            {
              subTitle: "External Sources",
              bullets: [
                "**Short-Term**: **Bank Overdraft** (flexible, high interest on balance), **Trade Credit** (delaying payment to suppliers for 30–60 days), **Debt Factoring** (selling unpaid customer invoices to a finance company at a discount for immediate cash).",
                "**Long-Term**: **Bank Loans / Mortgages** (fixed repayment schedule with interest), **Debentures** (long-term corporate loan bonds), **Share Capital (Equity Issue)** (selling new ordinary shares, no debt repayment but dilutes ownership), **Venture Capital** (specialist investors funding high-risk startups in exchange for equity)."
              ]
            }
          ]
        },
        {
          title: "Cash-Flow Forecasting vs Profit",
          body: "The crucial difference between business cash flow and accounting profit.",
          groups: [
            {
              subTitle: "Cash Flow Dynamics",
              bullets: [
                "**Cash Flow**: The continuous movement of actual money into (cash inflows) and out of (cash outflows) a business bank account.",
                "**Net Cash Flow**: $\\text{Net Cash Flow} = \\text{Total Inflows} - \\text{Total Outflows}$.",
                "**Closing Balance**: $\\text{Closing Balance} = \\text{Opening Balance} + \\text{Net Cash Flow}$.",
                "**Insolvency (Cash Crisis)**: A highly profitable firm can still go bankrupt if cash is tied up in slow-moving inventory or unpaid customer credit, leaving insufficient cash to pay immediate wages and bills."
              ]
            }
          ]
        },
        {
          title: "Financial Statements and Ratio Analysis",
          body: "Interpreting Income Statements and Statements of Financial Position.",
          groups: [
            {
              subTitle: "Financial Ratios",
              bullets: [
                "**Gross Profit Margin**: $\\frac{\\text{Gross Profit}}{\\text{Revenue}} \\times 100\\%$",
                "**Net Profit Margin**: $\\frac{\\text{Profit for the Year}}{\\text{Revenue}} \\times 100\\%$",
                "**Return on Capital Employed (ROCE)**: $\\frac{\\text{Operating Profit}}{\\text{Capital Employed}} \\times 100\\%$",
                "**Current Ratio**: $\\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$",
                "**Acid Test (Quick) Ratio**: $\\frac{\\text{Current Assets} - \\text{Inventory}}{\\text{Current Liabilities}}$"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "External Influences on Business Activity",
      intro: "Businesses operate within a dynamic macroeconomic, legal, ethical, and international environment. Changes in government fiscal and monetary policies, exchange rates, environmental legislation, and globalization create both opportunities and threats.",
      subheadings: [
        {
          title: "Government Economic Policies and the Business Cycle",
          body: "Macroeconomic goals and policy instruments affecting business operations.",
          groups: [
            {
              subTitle: "Government Macroeconomic Objectives",
              bullets: [
                "**Economic Growth**: Measured by annual percentage increase in Gross Domestic Product (GDP).",
                "**Low Unemployment**: Ensuring maximum utilization of the national workforce.",
                "**Low and Stable Inflation**: Preventing rapid price rises that erode purchasing power.",
                "**Balance of Payments Equilibrium**: Balancing export revenues with import expenditures."
              ]
            },
            {
              subTitle: "Policy Instruments",
              bullets: [
                "**Fiscal Policy**: Taxes and government spending. Increasing income tax reduces consumer disposable income $\\implies$ reduces consumer demand; increasing corporation tax reduces retained profits.",
                "**Monetary Policy**: Setting central bank interest rates. Higher interest rates increase borrowing costs and loan repayments $\\implies$ dampens consumer spending and business investment.",
                "**Supply-Side Policy**: Investing in education, infrastructure, and deregulation to increase total national productive capacity."
              ]
            }
          ]
        },
        {
          title: "Environmental, Ethical Issues and Globalisation",
          body: "Corporate social responsibility (CSR) and operating in multinational global markets.",
          groups: [
            {
              subTitle: "Environmental & Ethical Influences",
              bullets: [
                "**Externalities**: Private costs/benefits vs **Social Costs** (Private Cost $+$ Negative Externalities like air pollution, traffic congestion, waste dumping).",
                "**Ethical Practices**: Paying fair living wages, banning child labor in supply chains, using sustainable organic materials; improves brand reputation, but may increase operating costs.",
                "**Consumer Pressure Groups**: Organized boycotts and campaigns forcing businesses to adopt environmentally sustainable practices."
              ]
            },
            {
              subTitle: "Globalisation, Exchange Rates and Multinational Companies (MNCs)",
              bullets: [
                "**Multinational Company (MNC)**: A business with headquarters in one country and operational manufacturing/service facilities in multiple countries.",
                "**Benefits of MNCs to Host Countries**: Creates jobs, introduces new technology and skills, pays tax, improves trade balance.",
                "**Drawbacks of MNCs to Host Countries**: Exploits low-wage workers, forces local domestic competitors out of business, repatriates profits to home country, potential environmental degradation.",
                "**Exchange Rate Fluctuations (SPICED)**: **S**trong **P**ound/Currency makes **I**mports **C**heaper and **E**xports **D**earer."
              ]
            }
          ]
        }
      ]
    }
  ]
};
