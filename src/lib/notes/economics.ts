import type { SubjectNotes } from "./types";

export const ECONOMICS: SubjectNotes = {
  id: "economics",
  name: "Economics",
  code: "0455",
  color: "bg-teal-600",
  chapters: [
    {
      number: 1,
      title: "The Basic Economic Problem",
      intro: "Economics is the social science that studies how individuals, firms, and governments make decisions about allocating scarce resources to satisfy unlimited human wants. The fundamental economic problem — scarcity — means that choices must be made, and every choice carries an opportunity cost. This chapter introduces the concepts of needs versus wants, the four factors of production, opportunity cost, and the production possibility curve.",
      subheadings: [
        {
          title: "Scarcity, Needs and Wants",
          body: "The central problem of economics arises because human wants are unlimited but the resources available to satisfy them are finite. This forces every economic agent — individuals, businesses, and governments — to make choices about what to produce, how to produce it, and for whom it is produced.",
          groups: [
            {
              subTitle: "Needs vs Wants",
              bullets: [
                "**Needs**: Goods and services essential for survival and basic human functioning — food, clean water, shelter, clothing, and basic healthcare.",
                "**Wants**: Desires for goods and services beyond basic survival needs — luxuries, entertainment, branded goods, travel. Wants are effectively limitless and can never be fully satisfied.",
                "**Scarcity**: The universal condition where resources are insufficient to satisfy all human wants. Every economy — rich or poor — faces scarcity and must make allocation decisions.",
                "**Economic Goods**: Goods that are scarce and therefore command a price (food, cars, smartphones).",
                "**Free Goods**: Goods available in unlimited supply at zero cost — historically air and sunlight, though clean water is increasingly no longer free."
              ]
            },
            {
              subTitle: "The Three Fundamental Economic Questions",
              bullets: [
                "**What to produce?** — Which goods and services should be produced, and in what quantities, given finite resources?",
                "**How to produce?** — Which combination of land, labour, and capital should be used? Labour-intensive or capital-intensive methods?",
                "**For whom to produce?** — How should the output of the economy be distributed among the population? Who gets the most goods and services?"
              ]
            }
          ]
        },
        {
          title: "Factors of Production",
          body: "Economists group all productive resources into four categories called factors of production. Each factor earns a different type of income as a reward for its use in production.",
          groups: [
            {
              subTitle: "The Four Factors and Their Rewards",
              bullets: [
                "**Land**: All natural resources used in production — agricultural land, forests, minerals, oil, water, and the sea. The reward for land is **rent**.",
                "**Labour**: The physical and mental human effort applied to production. Measured in terms of quantity (number of workers) and quality (education, skills, productivity). The reward for labour is **wages**.",
                "**Capital**: Man-made resources used to produce other goods and services — machinery, factories, roads, computers, and equipment. Capital is distinct from money (financial capital). The reward for capital is **interest**.",
                "**Enterprise**: The willingness to combine land, labour, and capital in the production process, bear risk, and take initiative to create a business. The entrepreneur organises the other factors. The reward for enterprise is **profit**.",
                "**Human Capital**: The skills, knowledge, and experience of the workforce acquired through education and training — a key determinant of labour productivity."
              ]
            },
            {
              subTitle: "Factor Mobility",
              bullets: [
                "**Occupational Mobility**: The ease with which a factor can move between different uses or industries — e.g. a factory worker retraining as an IT technician.",
                "**Geographical Mobility**: The ease with which a factor can move between different locations — e.g. a worker migrating from one city to another for employment.",
                "**Immobility of Land**: Land is completely geographically immobile — it cannot physically move. However, its use can change (farmland converted to housing).",
                "**Capital Specificity**: Some capital (e.g. specialised machinery) is highly occupationally immobile — it can only be used for its intended purpose and has little alternative use."
              ]
            }
          ]
        },
        {
          title: "Opportunity Cost and Economic Decision-Making",
          body: "Every time a scarce resource is used in one way, it cannot simultaneously be used in another. The opportunity cost is the value of the next best alternative that must be sacrificed when a choice is made. This concept applies at every level of the economy.",
          groups: [
            {
              subTitle: "Opportunity Cost at Different Levels",
              bullets: [
                "**Individual Level**: A student spending time studying Economics cannot simultaneously use that time to work a part-time job. The opportunity cost is the income foregone.",
                "**Business Level**: A firm that invests retained profit in new machinery gives up the opportunity to distribute that profit as dividends to shareholders.",
                "**Government Level**: A government that spends $5 billion on a new motorway cannot simultaneously use that money for hospital construction. The opportunity cost is the healthcare improvements forgone.",
                "**Resource Allocation**: Opportunity cost is central to all resource allocation decisions — it explains why 'there is no such thing as a free lunch' in economics."
              ]
            },
            {
              subTitle: "Production Possibility Curves (PPC)",
              bullets: [
                "**Definition**: A production possibility curve (also called production possibility frontier, PPF) shows the maximum combination of two goods or services an economy can produce when all its resources are fully and efficiently employed.",
                "**Points on the PPC**: Represent **productive efficiency** — all resources are fully utilised.",
                "**Points inside the PPC**: Represent **productive inefficiency** — some resources are idle (e.g. unemployment, unused machinery).",
                "**Points outside the PPC**: Currently **unattainable** given existing resource constraints.",
                "**Shape**: The PPC is typically concave (bowed outward) because resources are not equally suited to producing all goods — as more of one good is produced, increasing amounts of the other must be sacrificed (rising opportunity cost).",
                "**Outward shift of PPC**: Represents **economic growth** — caused by an increase in the quantity or quality of resources (more labour, better technology, improved education), or improvements in productivity.",
                "**Inward shift of PPC**: Represents a reduction in productive capacity — caused by natural disasters, war, disease, or emigration of skilled workers.",
                "**Movement along the PPC**: Represents a reallocation of existing resources — producing more of one good means producing less of the other, illustrating opportunity cost directly."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "The Allocation of Resources",
      intro: "Markets are the mechanism through which buyers and sellers interact to determine prices and quantities of goods and services. This chapter examines how demand and supply forces operate in competitive markets, how markets reach equilibrium, the concept of elasticity, and the circumstances in which markets fail to allocate resources efficiently.",
      subheadings: [
        {
          title: "Demand",
          body: "Demand refers to the quantity of a good or service that consumers are willing and able to purchase at various prices over a given time period. The law of demand states that there is an inverse relationship between price and quantity demanded, ceteris paribus (all other things being equal).",
          groups: [
            {
              subTitle: "The Law of Demand and the Demand Curve",
              bullets: [
                "**Law of Demand**: As the price of a good rises, the quantity demanded falls; as the price falls, the quantity demanded rises — ceteris paribus.",
                "**Demand Curve**: A downward-sloping graph showing the inverse relationship between price (vertical axis) and quantity demanded (horizontal axis).",
                "**Movement Along the Demand Curve**: Caused only by a change in the **price** of the good itself — a rise in price causes contraction of demand; a fall in price causes extension of demand.",
                "**Shift of the Demand Curve**: Caused by changes in factors other than the good's own price — shifts the entire curve left (decrease) or right (increase)."
              ]
            },
            {
              subTitle: "Factors Causing a Shift in Demand (Conditions of Demand)",
              bullets: [
                "**Income**: A rise in real income increases demand for **normal goods** (shifting the demand curve right) but decreases demand for **inferior goods** (shifting the demand curve left). Examples of inferior goods include cheap own-brand food or budget bus travel.",
                "**Price of Substitutes**: Goods that can be used instead of each other (e.g. butter and margarine, Coca-Cola and Pepsi). If the price of a substitute rises, demand for the original good increases.",
                "**Price of Complements**: Goods consumed together (e.g. cars and petrol, printers and ink cartridges). If the price of a complement rises, demand for the original good falls.",
                "**Tastes and Fashion**: Changes in consumer preferences, influenced by advertising, social trends, celebrity endorsements, or cultural shifts.",
                "**Population Size and Structure**: An increase in total population increases overall market demand. Changes in age structure shift demand toward goods favoured by growing demographic groups.",
                "**Expectations of Future Prices**: If consumers expect prices to rise in future, they may buy more now (increasing current demand).",
                "**Advertising and Marketing**: Successful advertising campaigns shift the demand curve rightward by persuading more consumers to buy the product."
              ]
            }
          ]
        },
        {
          title: "Supply",
          body: "Supply refers to the quantity of a good or service that producers are willing and able to offer for sale at various prices over a given time period. The law of supply states that there is a positive relationship between price and quantity supplied, ceteris paribus.",
          groups: [
            {
              subTitle: "The Law of Supply and the Supply Curve",
              bullets: [
                "**Law of Supply**: As the price of a good rises, the quantity supplied increases; as the price falls, the quantity supplied falls — ceteris paribus. Higher prices make production more profitable, attracting more suppliers.",
                "**Supply Curve**: An upward-sloping graph showing the positive relationship between price and quantity supplied.",
                "**Movement Along the Supply Curve**: Caused only by a change in the price of the good — a rise in price causes extension of supply; a fall in price causes contraction of supply.",
                "**Shift of the Supply Curve**: Caused by changes in factors other than the good's own price."
              ]
            },
            {
              subTitle: "Factors Causing a Shift in Supply (Conditions of Supply)",
              bullets: [
                "**Costs of Production**: A fall in costs of production (cheaper raw materials, lower wages, reduced energy costs) increases supply — shifting the supply curve rightward. A rise in costs decreases supply — shifting it leftward.",
                "**Technology**: Improved technology reduces production costs and increases efficiency — shifting the supply curve rightward (e.g. automation, robotics, better software).",
                "**Government Subsidies**: Financial assistance given to producers by the government reduces their production costs and increases supply — shifting the supply curve right.",
                "**Indirect Taxes**: Taxes imposed on the production or sale of a good (VAT, excise duty) increase effective production costs and decrease supply — shifting the supply curve left.",
                "**Weather and Natural Conditions**: Particularly relevant for agricultural goods — good weather increases crop yields and supply; droughts or floods reduce supply.",
                "**Number of Firms in the Market**: An increase in the number of producers increases total market supply.",
                "**Prices of Other Goods**: If the price of an alternative product rises, producers may switch resources to produce the more profitable good, decreasing supply of the original."
              ]
            }
          ]
        },
        {
          title: "Market Equilibrium and Price Determination",
          body: "The market equilibrium is the price at which the quantity demanded by consumers exactly equals the quantity supplied by producers. At equilibrium, the market clears — there are no surpluses or shortages.",
          groups: [
            {
              subTitle: "Equilibrium, Surplus and Shortage",
              bullets: [
                "**Equilibrium Price**: The price at which Qd = Qs. The market is in balance — all goods produced are purchased and all demand is satisfied at that price.",
                "**Surplus (Excess Supply)**: When the market price is above equilibrium, Qs > Qd. Unsold stocks accumulate, putting downward pressure on price until equilibrium is restored.",
                "**Shortage (Excess Demand)**: When the market price is below equilibrium, Qd > Qs. Consumers compete for limited goods, putting upward pressure on price until equilibrium is restored.",
                "**Price Mechanism**: The automatic process by which prices adjust to clear markets — surpluses drive prices down; shortages drive prices up."
              ]
            },
            {
              subTitle: "Changes in Equilibrium — Demand and Supply Shifts",
              bullets: [
                "**Increase in Demand** (rightward shift): Equilibrium price rises and equilibrium quantity rises.",
                "**Decrease in Demand** (leftward shift): Equilibrium price falls and equilibrium quantity falls.",
                "**Increase in Supply** (rightward shift): Equilibrium price falls and equilibrium quantity rises.",
                "**Decrease in Supply** (leftward shift): Equilibrium price rises and equilibrium quantity falls.",
                "**Simultaneous Shifts**: When both demand and supply shift at the same time, the effect on price or quantity may be indeterminate — depending on the relative magnitude of each shift."
              ]
            }
          ]
        },
        {
          title: "Elasticity of Demand and Supply",
          body: "Elasticity measures the responsiveness of one economic variable to a change in another. It is a crucial concept for businesses setting prices and for governments designing tax policies.",
          groups: [
            {
              subTitle: "Price Elasticity of Demand (PED)",
              bullets: [
                "**Formula**: PED = % change in quantity demanded ÷ % change in price.",
                "**Elastic Demand (PED > 1)**: A given % change in price leads to a larger % change in quantity demanded. Total revenue falls when price rises. Goods with many close substitutes tend to have elastic demand.",
                "**Inelastic Demand (PED < 1)**: A given % change in price leads to a smaller % change in quantity demanded. Total revenue rises when price rises. Necessities, addictive goods, and goods with few substitutes tend to have inelastic demand.",
                "**Unit Elastic (PED = 1)**: % change in price = % change in quantity demanded. Total revenue stays constant when price changes.",
                "**Perfectly Inelastic (PED = 0)**: Quantity demanded does not change at all when price changes — vertical demand curve.",
                "**Perfectly Elastic (PED = ∞)**: Any rise in price causes demand to fall to zero — horizontal demand curve.",
                "**Determinants of PED**: Number and closeness of substitutes (most important); whether the good is a necessity or luxury; proportion of income spent on the good; time period (demand becomes more elastic over time as consumers find alternatives)."
              ]
            },
            {
              subTitle: "Price Elasticity of Supply (PES)",
              bullets: [
                "**Formula**: PES = % change in quantity supplied ÷ % change in price.",
                "**Elastic Supply (PES > 1)**: Producers can respond significantly to a price change — easily increase output.",
                "**Inelastic Supply (PES < 1)**: Producers cannot easily increase output in response to higher prices.",
                "**Determinants of PES**: Time period (supply is more elastic in the long run); availability of spare production capacity; ease of storing the good; mobility of factors of production; length of production process (agricultural goods have inelastic short-run supply)."
              ]
            },
            {
              subTitle: "Income Elasticity of Demand (YED)",
              bullets: [
                "**Formula**: YED = % change in quantity demanded ÷ % change in income.",
                "**Normal Goods (YED > 0)**: Demand rises as income rises — positive YED. Luxury goods have YED > 1 (income elastic); necessities have YED between 0 and 1.",
                "**Inferior Goods (YED < 0)**: Demand falls as income rises — negative YED. As consumers become richer, they switch away from these goods."
              ]
            }
          ]
        },
        {
          title: "Market Failure and Government Intervention",
          body: "Markets do not always allocate resources efficiently or fairly. Market failure occurs when the free market leads to an outcome that is socially sub-optimal — either too much or too little of a good is produced and consumed.",
          groups: [
            {
              subTitle: "Types of Market Failure",
              bullets: [
                "**Externalities**: Costs or benefits that fall on third parties not involved in the transaction. **Negative externalities** (e.g. pollution, noise) cause overproduction; **Positive externalities** (e.g. education, vaccination) cause underproduction.",
                "**Public Goods**: Goods that are **non-excludable** (cannot prevent non-payers from consuming) and **non-rival** (consumption by one person does not reduce availability to others) — e.g. national defence, street lighting. The free market underprovides public goods because of the **free-rider problem**.",
                "**Information Failure**: When buyers or sellers do not have full information to make optimal decisions (e.g. consumers underestimating health risks of smoking).",
                "**Monopoly Power**: When a single firm dominates a market and restricts output while raising prices above competitive levels."
              ]
            },
            {
              subTitle: "Government Interventions to Correct Market Failure",
              bullets: [
                "**Maximum Price (Price Ceiling)**: Set below equilibrium to keep prices affordable (e.g. rent controls, food price caps). Creates a shortage — Qd > Qs at the maximum price.",
                "**Minimum Price (Price Floor)**: Set above equilibrium to guarantee producers a minimum income (e.g. minimum wage, EU agricultural price supports). Creates a surplus — Qs > Qd at the minimum price.",
                "**Indirect Taxes**: Taxes on goods with negative externalities (e.g. tobacco tax, carbon tax) raise the price and reduce consumption — shift supply curve left.",
                "**Subsidies**: Payments to producers of goods with positive externalities (e.g. renewable energy subsidies, education grants) reduce price and increase consumption — shift supply curve right.",
                "**Regulation**: Laws and rules to control behaviour (e.g. pollution limits, compulsory education, food safety standards).",
                "**Direct Provision**: Government directly produces public goods and merit goods (national defence, state healthcare, public education)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Microeconomic Decision Makers",
      intro: "Microeconomics examines the behaviour of individual economic agents — households, workers, firms, banks, and trade unions. This chapter analyses how these decision makers respond to incentives and constraints, how labour markets function, how banks operate within the financial system, and the role of trade unions in wage determination.",
      subheadings: [
        {
          title: "Money and Banking",
          body: "Money plays a crucial role in enabling complex economic exchange. Without money, economies would be restricted to inefficient barter. Banks are the key financial intermediaries that channel savings into productive investment.",
          groups: [
            {
              subTitle: "Functions and Characteristics of Money",
              bullets: [
                "**Medium of Exchange**: Money eliminates the need for the double coincidence of wants required in barter — any seller will accept money in exchange for goods.",
                "**Store of Value**: Money retains purchasing power over time, allowing people to save income earned today for future spending.",
                "**Unit of Account**: Money provides a common measure for the value of all goods and services, enabling price comparisons.",
                "**Standard of Deferred Payment**: Money allows contracts involving future payments — credit, loans, and hire purchase agreements.",
                "**Characteristics of Good Money**: Widely accepted, durable (does not deteriorate), portable (easy to carry), divisible (can be broken into smaller units), scarce (limited supply to maintain value), uniform (all units identical)."
              ]
            },
            {
              subTitle: "Commercial Banks and Central Banks",
              bullets: [
                "**Commercial Banks**: Private financial institutions that accept deposits from customers and extend loans at interest. They create credit by lending out a proportion of deposits (fractional reserve banking).",
                "**Functions of Commercial Banks**: Accepting deposits, providing loans and overdrafts, operating payment systems (cards, transfers), offering foreign exchange services, providing financial advice.",
                "**Central Bank**: The government's bank, responsible for monetary policy. Examples include the Bank of England, Federal Reserve, and European Central Bank.",
                "**Functions of Central Bank**: Issuing banknotes, acting as lender of last resort to commercial banks, managing the country's foreign exchange reserves, supervising and regulating the banking system, implementing monetary policy (controlling money supply and interest rates).",
                "**Interest Rate**: The price of borrowing money, expressed as a percentage of the loan per year. A rise in interest rates increases the cost of borrowing and rewards saving — reducing household consumption and business investment."
              ]
            }
          ]
        },
        {
          title: "Households as Consumers and Savers",
          body: "Households are the ultimate owners of all factors of production and the primary consumers in an economy. Their spending decisions drive aggregate demand, while their saving decisions determine the funds available for investment.",
          groups: [
            {
              subTitle: "Factors Influencing Consumer Spending",
              bullets: [
                "**Real Income**: The purchasing power of income after accounting for inflation. Higher real income generally leads to higher consumer spending.",
                "**Interest Rates**: Higher interest rates increase the reward for saving and the cost of borrowing — reducing consumption. Lower rates encourage spending and borrowing.",
                "**Credit Availability**: When banks loosen lending criteria, consumers can borrow more easily — boosting spending on houses, cars, and durables.",
                "**Consumer Confidence**: When households are optimistic about the economic future, they spend more freely. Pessimism about job security leads to precautionary saving.",
                "**Wealth Effects**: A rise in asset prices (houses, shares) increases household wealth, encouraging greater spending — even without a rise in current income.",
                "**Income Distribution**: More equal income distribution tends to increase overall consumption as lower-income households have a higher marginal propensity to consume."
              ]
            }
          ]
        },
        {
          title: "Workers, Wages and Labour Markets",
          body: "The labour market is where the demand for labour (from firms) and the supply of labour (from workers) interact to determine wages and employment levels. Unlike other markets, the labour market has unique features due to the human nature of the commodity being bought and sold.",
          groups: [
            {
              subTitle: "Demand for Labour",
              bullets: [
                "**Derived Demand**: Firms demand labour not for its own sake but because it is needed to produce goods and services demanded by consumers. When demand for the final product rises, the demand for the labour that produces it also rises.",
                "**Factors Affecting Demand for Labour**: The level of demand for the firm's output; the productivity (output per worker) of labour; the cost of labour relative to capital; advances in technology that may substitute for labour."
              ]
            },
            {
              subTitle: "Supply of Labour",
              bullets: [
                "**Total Supply**: Determined by the size of the working-age population, participation rates (proportion willing to work), hours worked, and immigration flows.",
                "**Wage Rate**: Higher wages attract more workers into a labour market — the supply of labour to a specific occupation is upward sloping.",
                "**Non-Monetary Factors**: Job satisfaction, working conditions, status, location, holiday entitlement, and career prospects all influence occupational labour supply.",
                "**Wage Differentials**: Differences in wages between occupations explained by differences in demand (scarce high-skilled workers command higher wages), differences in supply (unpleasant, dangerous, or unskilled occupations attract premiums or face surpluses), non-monetary differences, and discrimination."
              ]
            },
            {
              subTitle: "Trade Unions",
              bullets: [
                "**Trade Union**: An organisation of workers that collectively bargains with employers on behalf of its members over wages, hours, and working conditions.",
                "**Collective Bargaining**: The process by which trade union representatives negotiate with management — a more powerful position than individual workers negotiating alone.",
                "**Methods of Industrial Action**: Strikes (withdrawal of labour), work-to-rule (doing only minimum required duties), overtime bans, go-slows, picketing.",
                "**Effects of Strong Trade Unions**: May push wages above the competitive equilibrium level — benefiting employed members but potentially causing unemployment if labour becomes too expensive.",
                "**Employers' Associations**: Groups of firms that collectively negotiate with trade unions — counterbalancing union bargaining power."
              ]
            }
          ]
        },
        {
          title: "Firms — Costs, Revenue and Profit",
          body: "Firms combine factors of production to create goods and services. Understanding costs and revenues is essential for analysing business decision-making and market behaviour.",
          groups: [
            {
              subTitle: "Costs of Production",
              bullets: [
                "**Fixed Costs**: Costs that do not change with the level of output in the short run — rent, insurance, loan repayments, management salaries.",
                "**Variable Costs**: Costs that rise as output increases — raw materials, direct labour, energy consumed in production, packaging.",
                "**Total Costs = Fixed Costs + Variable Costs**.",
                "**Average Cost (AC)**: Total cost divided by output. Also called unit cost. Firms aim to minimise average cost.",
                "**Economies of Scale**: As a firm grows and produces more output, its average costs fall. Sources include: purchasing economies (bulk buying discounts), technical economies (specialised machinery), managerial economies (specialist managers), financial economies (cheaper borrowing), marketing economies (spreading advertising costs).",
                "**Diseconomies of Scale**: Above a certain size, average costs begin to rise — caused by coordination problems, communication breakdowns, poor motivation in very large organisations, and bureaucratic inefficiency."
              ]
            },
            {
              subTitle: "Revenue and Profit",
              bullets: [
                "**Total Revenue (TR)**: Price × Quantity sold.",
                "**Average Revenue (AR)**: Total Revenue ÷ Quantity = Price per unit.",
                "**Profit**: Total Revenue minus Total Costs.",
                "**Normal Profit**: The minimum level of profit needed to keep the entrepreneur in the industry in the long run — it is included in the firm's costs.",
                "**Supernormal (Abnormal) Profit**: Profit above the normal level — earned when TR > TC including normal profit. Attracts new firms into the market.",
                "**Loss**: When TC > TR — may force firms to exit the market in the long run.",
                "**Aims of Firms**: Profit maximisation is the traditional assumption, but firms may also pursue revenue maximisation, market share growth, sales volume maximisation, or social and environmental objectives."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Government and the Macroeconomy",
      intro: "Macroeconomics studies the economy as a whole — analysing national output, employment, inflation, and the balance of payments. Governments pursue four main macroeconomic objectives and use fiscal, monetary, and supply-side policies to achieve them. This chapter examines these objectives, how they are measured, and the policy tools available to governments.",
      subheadings: [
        {
          title: "Macroeconomic Objectives",
          body: "Most governments aim to achieve four key macroeconomic objectives simultaneously, though conflicts often arise between them. Success in achieving these goals determines living standards and economic stability.",
          groups: [
            {
              subTitle: "The Four Main Macroeconomic Objectives",
              bullets: [
                "**Economic Growth**: A sustained rise in real Gross Domestic Product (GDP) over time. Growth increases living standards, creates jobs, and generates tax revenue. Typically measured as the annual % change in real GDP.",
                "**Low Unemployment**: Keeping the unemployment rate at a low and stable level. Most governments target full employment — typically 3–5% unemployment to allow for frictional movement between jobs.",
                "**Low and Stable Inflation**: Most central banks target around 2% annual inflation. Moderate inflation is considered healthy — it is very high (hyperinflation) or negative (deflation) rates that are damaging.",
                "**Balance of Payments Stability**: Ensuring that the country's international trade and financial flows remain broadly in balance over time — avoiding persistent, large deficits."
              ]
            },
            {
              subTitle: "Conflicts Between Macroeconomic Objectives",
              bullets: [
                "**Growth vs Inflation**: Rapid economic growth tends to increase demand and cause inflationary pressure (demand-pull inflation). Policies to control inflation often slow growth.",
                "**Growth vs Balance of Payments**: Fast growth increases incomes, which boosts import spending — potentially worsening the current account deficit.",
                "**Low Unemployment vs Low Inflation (Phillips Curve)**: Historically, lower unemployment was associated with higher inflation as workers demanded higher wages in a tight labour market. Modern central banks try to break this trade-off through credible inflation targeting.",
                "**Short-term vs Long-term**: Expansionary policies may achieve short-term growth and employment gains but cause long-term inflation or debt problems."
              ]
            }
          ]
        },
        {
          title: "Measuring Economic Performance",
          body: "Economists use several key indicators to measure and compare economic performance both over time and across countries.",
          groups: [
            {
              subTitle: "Gross Domestic Product (GDP)",
              bullets: [
                "**GDP Definition**: The total monetary value of all final goods and services produced within a country's borders during a given time period (usually one year).",
                "**Real vs Nominal GDP**: Nominal GDP is measured in current prices; Real GDP adjusts for inflation — it is the preferred measure of economic growth as it reflects actual changes in output volume.",
                "**GDP per Capita**: Total GDP divided by the population — provides a measure of average living standards and allows comparison between countries of different sizes.",
                "**Limitations of GDP as a Welfare Measure**: GDP ignores income distribution (inequality); does not capture unpaid work (household labour, volunteering); excludes environmental degradation; ignores non-material aspects of wellbeing (health, freedom, security); does not account for differences in the cost of living between countries.",
                "**Human Development Index (HDI)**: A composite measure of development that combines GDP per capita (income), life expectancy at birth (health), and mean years of schooling (education). Provides a broader view of human wellbeing than GDP alone."
              ]
            },
            {
              subTitle: "Unemployment — Types and Measurement",
              bullets: [
                "**Definition**: Unemployment occurs when people who are willing and able to work cannot find employment at the current wage rate.",
                "**Unemployment Rate**: (Number of unemployed ÷ Labour force) × 100.",
                "**Frictional Unemployment**: Short-term unemployment caused by workers moving between jobs — inevitable in a dynamic economy and generally not a serious problem.",
                "**Structural Unemployment**: Long-term unemployment caused by a fundamental mismatch between the skills workers have and the skills employers need — often caused by deindustrialisation or technological change.",
                "**Cyclical (Demand-Deficient) Unemployment**: Unemployment caused by insufficient aggregate demand during a recession — the most widespread type during economic downturns.",
                "**Seasonal Unemployment**: Unemployment caused by predictable seasonal fluctuations in demand (e.g. agricultural workers, ski resort staff).",
                "**Costs of Unemployment**: Lost output (below potential GDP); reduced tax revenue and higher government welfare spending; social costs (poverty, mental health issues, crime); skills erosion among long-term unemployed."
              ]
            },
            {
              subTitle: "Inflation — Causes, Measurement and Effects",
              bullets: [
                "**Definition**: A sustained and general rise in the average price level over time — reducing the purchasing power of money.",
                "**Consumer Price Index (CPI)**: The main measure of inflation — tracks the average price change of a representative basket of goods and services purchased by a typical household.",
                "**Demand-Pull Inflation**: Caused by excess aggregate demand in the economy — 'too much money chasing too few goods.' Often associated with rapid economic growth, high employment, or loose fiscal/monetary policy.",
                "**Cost-Push Inflation**: Caused by rising production costs (higher wages, energy prices, raw material costs) that firms pass on to consumers through higher prices.",
                "**Hyperinflation**: Extremely rapid inflation (hundreds or thousands of percent per year) that destroys the value of money and severely disrupts economic activity (examples: Zimbabwe 2008, Germany 1923, Venezuela 2018).",
                "**Deflation**: A sustained fall in the general price level. Sounds beneficial but is dangerous — consumers delay purchases expecting further price falls, reducing demand, causing recession and unemployment.",
                "**Costs of Inflation**: Erodes purchasing power of money; creates uncertainty that discourages investment; harms those on fixed incomes (pensioners); causes menu costs (businesses must constantly update prices); shoe-leather costs (time wasted managing money); redistributes wealth from creditors to debtors."
              ]
            }
          ]
        },
        {
          title: "Fiscal Policy",
          body: "Fiscal policy involves government decisions about taxation and public expenditure to influence aggregate demand, income distribution, and resource allocation in the economy.",
          groups: [
            {
              subTitle: "Government Revenue — Taxation",
              bullets: [
                "**Direct Taxes**: Levied directly on income and wealth — paid directly to the government by the earner. Examples: Income tax, corporation tax, inheritance tax.",
                "**Indirect Taxes**: Taxes on spending — paid to the government indirectly through businesses collecting the tax when goods are sold. Examples: Value Added Tax (VAT), excise duties on alcohol, tobacco, and fuel.",
                "**Progressive Taxation**: Those with higher incomes pay a higher percentage of their income in tax — reduces income inequality (e.g. income tax with rising marginal rates).",
                "**Regressive Taxation**: Those with lower incomes pay a higher percentage of their income in tax — increases inequality (e.g. VAT takes a larger share of a poor person's income).",
                "**Proportional (Flat) Taxation**: Everyone pays the same percentage of income regardless of earnings.",
                "**Canons of Taxation (Adam Smith)**: Good taxes should be equitable (fair), certain (clear rules), convenient to pay, and economical to collect."
              ]
            },
            {
              subTitle: "Government Expenditure and Budget Positions",
              bullets: [
                "**Government Spending Categories**: Current expenditure (day-to-day running costs — public sector wages, welfare benefits); Capital expenditure (investment in infrastructure — roads, hospitals, schools); Transfer payments (income redistribution — pensions, unemployment benefits, housing subsidies).",
                "**Budget Deficit**: When government spending exceeds tax revenue — the difference must be financed by borrowing (government debt increases).",
                "**Budget Surplus**: When tax revenue exceeds government spending — the surplus can be used to repay debt.",
                "**National Debt**: The total accumulated stock of government borrowing over time.",
                "**Expansionary Fiscal Policy**: Increasing government spending and/or cutting taxes to boost aggregate demand — appropriate during a recession. Risks include higher inflation and rising national debt.",
                "**Contractionary (Austerity) Fiscal Policy**: Cutting government spending and/or raising taxes to reduce aggregate demand — appropriate when inflation is too high. Risks include reduced growth and higher unemployment."
              ]
            }
          ]
        },
        {
          title: "Monetary Policy",
          body: "Monetary policy involves controlling the money supply and interest rates to influence inflation, economic growth, and employment. In most countries it is conducted by an independent central bank.",
          groups: [
            {
              subTitle: "Interest Rates as the Main Monetary Tool",
              bullets: [
                "**Raising Interest Rates**: Increases the cost of borrowing for households (mortgages, personal loans) and firms (business investment loans). Increases reward for saving. Reduces consumer spending and business investment — **contracts aggregate demand — reduces inflationary pressure**.",
                "**Lowering Interest Rates**: Reduces cost of borrowing — stimulates household spending on credit and business investment. Reduces reward for saving. **Expands aggregate demand — stimulates economic growth and employment**.",
                "**Transmission Mechanism**: The process by which a change in the central bank's interest rate works through the economy to affect inflation and output.",
                "**Quantitative Easing (QE)**: When interest rates are already near zero, central banks can create new money electronically and use it to buy government bonds from financial institutions — injecting liquidity into the economy to stimulate lending and spending."
              ]
            }
          ]
        },
        {
          title: "Supply-Side Policies",
          body: "Supply-side policies aim to increase the productive capacity of the economy — shifting the aggregate supply curve rightward and achieving non-inflationary growth. They address the long-run determinants of economic performance.",
          groups: [
            {
              subTitle: "Types of Supply-Side Policies",
              bullets: [
                "**Education and Training**: Government investment in education systems and vocational training improves the quality of human capital — increasing labour productivity and shifting supply rightward.",
                "**Reducing Income Tax**: Lower marginal income tax rates increase the financial incentive to work longer hours and seek higher-paid employment — increasing labour supply.",
                "**Reducing Unemployment Benefits**: Lower welfare payments reduce the incentive to remain unemployed — increasing labour market participation.",
                "**Privatisation**: Transferring state-owned enterprises to private ownership to increase efficiency through market competition and profit incentives.",
                "**Deregulation**: Removing or simplifying government rules that restrict business activity — reduces costs for firms and encourages new entrants.",
                "**Infrastructure Investment**: Government spending on roads, railways, broadband, and energy networks reduces business costs and improves productivity.",
                "**Research and Development (R&D) Incentives**: Tax breaks for firms investing in innovation — promotes technological progress and productivity growth."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Economic Development",
      intro: "Economic development encompasses not only growth in output but also improvements in living standards, health, education, and the reduction of poverty and inequality. This chapter examines how development is measured, the differences between developed and developing economies, population trends, the causes of poverty and inequality, and policies to promote sustainable development.",
      subheadings: [
        {
          title: "Characteristics of Developed and Developing Economies",
          body: "There is enormous variation in living standards across the world. Economists classify countries as developed, emerging, or developing (low-income) based on income levels, structural features, and human development indicators.",
          groups: [
            {
              subTitle: "Characteristics of Developing Economies (LDCs)",
              bullets: [
                "**Low GDP per capita**: Annual incomes often below $1,000 — insufficient to meet basic needs for a significant proportion of the population.",
                "**High dependence on primary sector**: A large share of the workforce employed in subsistence agriculture; vulnerability to commodity price shocks and adverse weather.",
                "**Low levels of human capital**: Limited access to quality education and healthcare; high illiteracy rates; high infant and child mortality rates.",
                "**Poor infrastructure**: Inadequate roads, unreliable electricity supply, limited telecommunications — raising business costs and restricting trade.",
                "**Political instability and corruption**: Weak governance, conflict, and corruption deter foreign investment and undermine public service delivery.",
                "**High birth rates and rapid population growth**: Young, rapidly growing populations strain education, healthcare, and housing systems.",
                "**High levels of inequality**: Income and wealth concentrated among small elites; limited social mobility."
              ]
            },
            {
              subTitle: "Factors Enabling Development",
              bullets: [
                "**Investment**: Capital accumulation — physical infrastructure, machinery, education — increases productive capacity.",
                "**Human Capital Development**: Improving education, healthcare, and nutrition enhances workforce productivity.",
                "**Foreign Direct Investment (FDI)**: Investment by multinational corporations brings capital, technology, management skills, and export market access.",
                "**Good Governance**: Transparent, accountable institutions reduce corruption, protect property rights, enforce contracts — encouraging productive investment.",
                "**Trade Openness**: Participation in international trade allows specialisation, access to larger markets, and technology transfer.",
                "**Aid**: Foreign financial and technical assistance can supplement domestic resources — though effectiveness depends critically on quality of governance."
              ]
            }
          ]
        },
        {
          title: "Population",
          body: "Population size, growth rate, and structure profoundly affect economic development. The relationship between population and development is complex and depends heavily on the productive capacity of the economy.",
          groups: [
            {
              subTitle: "Demographic Concepts",
              bullets: [
                "**Birth Rate**: The number of live births per 1,000 of the population per year. High in developing economies due to lack of contraception, cultural preferences for large families, high child mortality, and the economic value of children in agricultural societies.",
                "**Death Rate**: The number of deaths per 1,000 of the population per year. Falling globally due to improvements in medicine, sanitation, nutrition, and healthcare.",
                "**Natural Population Growth**: Birth rate minus death rate. Positive in most developing economies; negative in some developed economies (ageing populations).",
                "**Net Migration**: The difference between immigration (people entering) and emigration (people leaving). Brain drain — the emigration of highly educated workers — can significantly harm developing economies.",
                "**Dependency Ratio**: The ratio of economically dependent population (children under 15 and elderly over 65) to the working-age population (15–65). A high dependency ratio strains public finances.",
                "**Demographic Transition**: As countries develop, they typically move from high birth and death rates (pre-industrial) through a transitional phase of high birth rates but falling death rates (rapid population growth) to low birth and death rates (stable population)."
              ]
            },
            {
              subTitle: "Optimum Population and Overpopulation",
              bullets: [
                "**Optimum Population**: The population size that maximises output per head given a country's resource base and level of technology.",
                "**Overpopulation**: When population exceeds the optimum — additional people reduce average living standards by stretching scarce resources.",
                "**Underpopulation**: When population is below the optimum — more people would increase average living standards by providing more labour.",
                "**Ageing Population (Developed Economies)**: Rising proportion of elderly dependants — increasing healthcare and pension costs; potential labour shortages; pressure on public finances."
              ]
            }
          ]
        },
        {
          title: "Living Standards, Poverty and Inequality",
          body: "Economic development ultimately aims to improve human welfare — reducing poverty, narrowing inequality, and improving access to education, healthcare, and other dimensions of wellbeing.",
          groups: [
            {
              subTitle: "Measuring Living Standards",
              bullets: [
                "**GDP per Capita (PPP)**: GDP per person adjusted for purchasing power parity — the most widely used single measure of average material living standards.",
                "**Purchasing Power Parity (PPP)**: An adjustment that accounts for differences in price levels between countries — allowing more meaningful international comparisons of living standards.",
                "**Human Development Index (HDI)**: Combines GDP per capita, life expectancy, and education — captures health, knowledge, and living standards beyond income alone.",
                "**Limitations of Material Indicators**: Ignore income distribution; do not capture environmental quality, personal freedom, security, or subjective wellbeing; may overstate living standards in highly unequal societies."
              ]
            },
            {
              subTitle: "Poverty and Inequality",
              bullets: [
                "**Absolute Poverty**: Having income or consumption below the minimum necessary to meet basic physical needs. The World Bank sets the extreme poverty line at $2.15 per day (2022 prices).",
                "**Relative Poverty**: Having income substantially below the average income of the country — typically defined as earning less than 50–60% of median household income.",
                "**Causes of Poverty**: Low wages, unemployment, lack of education and skills, inadequate social protection, discrimination, disability, conflict, and structural economic factors.",
                "**Gini Coefficient**: A measure of income inequality ranging from 0 (perfect equality — everyone has identical income) to 1 (perfect inequality — one person has all income). Higher values indicate greater inequality.",
                "**Policies to Reduce Inequality and Poverty**: Progressive taxation; higher minimum wages; strengthening social safety nets (unemployment benefits, food assistance); expanding access to quality education and healthcare; land reform; anti-discrimination legislation."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "International Trade and Globalisation",
      intro: "International trade allows countries to specialise in producing goods and services in which they have a comparative advantage — increasing global efficiency and consumer choice. Globalisation has intensified trade and investment flows between countries, bringing both significant benefits and serious challenges. This chapter examines the principles of trade, protectionist policies, exchange rates, the balance of payments, and the role of multinational companies.",
      subheadings: [
        {
          title: "Principles of International Trade",
          body: "Countries trade because they differ in their resource endowments, technologies, and productivity levels. Trade theory explains why voluntary exchange between nations raises total output and living standards.",
          groups: [
            {
              subTitle: "Absolute and Comparative Advantage",
              bullets: [
                "**Absolute Advantage**: A country has an absolute advantage in producing a good when it can produce it using fewer resources (or more efficiently) than another country.",
                "**Comparative Advantage**: A country has a comparative advantage in producing a good when it can produce it at a lower **opportunity cost** than another country — even if it has an absolute advantage in everything. This is the foundation of trade theory (Ricardo, 1817).",
                "**Principle of Comparative Advantage**: Total world output is maximised when each country specialises in producing the goods in which it has the lowest opportunity cost, and trades for others.",
                "**Terms of Trade**: The ratio of a country's export prices to its import prices. An improvement in the terms of trade means a country can buy more imports with the same volume of exports."
              ]
            },
            {
              subTitle: "Benefits and Risks of Specialisation and Trade",
              bullets: [
                "**Benefits of Free Trade**: Greater productive efficiency through specialisation; access to a wider variety of goods at lower prices; economies of scale from larger markets; technology transfer and knowledge spillovers; increased competition driving innovation.",
                "**Risks of Over-Specialisation**: Vulnerability to price fluctuations in a single commodity; loss of strategic industries; structural unemployment when competitive conditions change; dependence on unreliable trade partners.",
                "**Pattern of Trade**: The composition of a country's exports and imports — influenced by resource endowments, technology levels, and trade agreements."
              ]
            }
          ]
        },
        {
          title: "Protectionism",
          body: "Protectionism refers to government policies that restrict imports to protect domestic industries from foreign competition. Although free trade maximises global efficiency, governments often intervene for various economic and political reasons.",
          groups: [
            {
              subTitle: "Methods of Protection",
              bullets: [
                "**Tariffs (Import Duties)**: Taxes imposed on imported goods — raise the domestic price of imports, reducing their competitiveness and protecting domestic producers. Generate government revenue.",
                "**Import Quotas**: Quantitative limits on the volume or value of specific goods that can be imported — directly restricting supply of imports regardless of price.",
                "**Subsidies to Domestic Producers**: Government payments to domestic industries reduce their costs — allowing them to undercut foreign competitors on price without tariffs.",
                "**Embargoes**: Complete bans on trade with specific countries — usually for political or national security reasons (e.g. sanctions).",
                "**Administrative Barriers**: Complex customs procedures, health and safety standards, or labelling requirements that increase costs for foreign exporters."
              ]
            },
            {
              subTitle: "Arguments For and Against Protectionism",
              bullets: [
                "**Infant Industry Argument**: New domestic industries may need temporary protection from established foreign competitors until they achieve economies of scale and become internationally competitive.",
                "**Strategic Industry Argument**: Some industries (defence, food production, energy) are strategically vital — a country should not become entirely dependent on foreign suppliers.",
                "**Protecting Employment**: Tariffs on imports from low-wage countries prevent domestic job losses in manufacturing — though this raises consumer prices and invites retaliation.",
                "**Dumping**: When foreign firms sell exports below cost price to capture market share — tariffs can legitimately counteract predatory dumping.",
                "**Arguments Against Protectionism**: Higher prices for consumers; reduced efficiency from protecting uncompetitive industries; retaliation by trading partners (trade wars); undermines comparative advantage gains; harms developing country exports."
              ]
            }
          ]
        },
        {
          title: "Exchange Rates",
          body: "An exchange rate is the price of one currency expressed in terms of another. Exchange rates influence the competitiveness of exports and imports and affect inflation, economic growth, and the balance of payments.",
          groups: [
            {
              subTitle: "Determination of Exchange Rates",
              bullets: [
                "**Floating Exchange Rate**: The exchange rate is determined purely by market forces of supply and demand for the currency in the foreign exchange market — it rises and falls freely.",
                "**Fixed Exchange Rate**: The government or central bank pegs the currency's value to another currency or a basket — intervening in the foreign exchange market to maintain the peg.",
                "**Managed Float**: The exchange rate is primarily market-determined but the central bank intervenes occasionally to prevent excessive volatility.",
                "**Appreciation**: A rise in the value of a floating currency — it buys more foreign currency. **Exports become more expensive** abroad (reducing export competitiveness); **imports become cheaper** (reducing import prices, helping control inflation).",
                "**Depreciation**: A fall in the value of a floating currency. **Exports become cheaper** abroad (boosting export competitiveness and increasing export revenue); **imports become more expensive** (raising import costs and contributing to cost-push inflation)."
              ]
            },
            {
              subTitle: "Factors Affecting Exchange Rates",
              bullets: [
                "**Interest Rate Differentials**: Higher interest rates in a country attract international capital inflows (hot money) — increasing demand for the currency and causing it to appreciate.",
                "**Inflation Rate Differentials**: Higher domestic inflation makes exports less competitive, reducing demand for the currency — causing depreciation.",
                "**Trade Balance**: A persistent current account surplus increases demand for the currency (foreigners buy it to pay for exports) — appreciating it.",
                "**Speculation**: Large-scale buying or selling of a currency by financial investors based on expectations of future movements — can cause sharp short-term fluctuations."
              ]
            }
          ]
        },
        {
          title: "Balance of Payments",
          body: "The balance of payments is a systematic record of all economic transactions between residents of one country and the rest of the world over a given time period — typically one year.",
          groups: [
            {
              subTitle: "Structure of the Balance of Payments",
              bullets: [
                "**Current Account**: Records trade in goods (visible trade — exports and imports of physical goods) and trade in services (invisible trade — banking, tourism, insurance, education); plus income flows (wages and investment income) and current transfers (foreign aid, migrant remittances).",
                "**Current Account Deficit**: When the value of imports of goods and services exceeds the value of exports — the country is spending more on foreign goods and services than it is earning.",
                "**Current Account Surplus**: When the value of exports exceeds the value of imports — the country is earning more from the rest of the world than it is spending.",
                "**Capital and Financial Account**: Records flows of investment capital between countries — foreign direct investment (FDI), portfolio investment (shares and bonds), and official reserve transactions.",
                "**Overall Balance of Payments**: By accounting convention, the current account and the capital/financial account must sum to zero — a current account deficit must be financed by a capital account surplus (borrowing or selling assets)."
              ]
            },
            {
              subTitle: "Causes and Consequences of Current Account Imbalances",
              bullets: [
                "**Causes of Current Account Deficit**: Relatively high domestic inflation making exports uncompetitive; overvalued exchange rate; low productivity compared to trading partners; strong domestic demand sucking in imports; uncompetitive domestic industries.",
                "**Consequences of Persistent Deficit**: Requires financing through borrowing or asset sales — accumulates foreign debt; may eventually force a painful currency depreciation; limits government economic policy flexibility.",
                "**Policies to Reduce a Current Account Deficit**: Expenditure-switching policies (tariffs, currency depreciation — making imports more expensive and exports cheaper); expenditure-reducing policies (deflationary fiscal or monetary policy — reducing overall demand and import spending); supply-side policies (improving productivity and export competitiveness)."
              ]
            }
          ]
        },
        {
          title: "Globalisation and Multinational Companies",
          body: "Globalisation refers to the increasing economic, political, and cultural integration of countries — driven by falling transport costs, communications technology, trade liberalisation, and the rise of multinational corporations.",
          groups: [
            {
              subTitle: "Features and Drivers of Globalisation",
              bullets: [
                "**Falling Transport Costs**: Containerisation, cheaper air freight, and improvements in logistics have dramatically reduced the cost of moving goods internationally.",
                "**Communications Technology**: The internet, smartphones, and digital platforms have enabled instantaneous global communication, coordination, and commerce.",
                "**Trade Liberalisation**: Multilateral trade agreements through the World Trade Organisation (WTO) and regional agreements (EU, NAFTA/USMCA, ASEAN) have reduced tariff and non-tariff barriers.",
                "**Financial Globalisation**: The removal of capital controls allows money to flow freely between countries in search of the highest return.",
                "**Migration**: The movement of workers across borders transfers skills and labour — connecting labour markets internationally."
              ]
            },
            {
              subTitle: "Multinational Companies (MNCs)",
              bullets: [
                "**Definition**: A company that has its headquarters in one country but owns and operates productive facilities (factories, offices, mines) in several other countries — examples include Apple, Toyota, Shell, Unilever, and Samsung.",
                "**Why MNCs Invest Abroad**: Access to lower-cost labour; proximity to growing consumer markets; to avoid trade barriers (tariff-jumping); access to natural resources; tax advantages.",
                "**Benefits of MNCs to Host Developing Countries**: Foreign direct investment increases capital stock; employment creation and wage payments; transfer of technology, management skills, and working practices; training and development of local workforce; tax revenues for government; integration into global supply chains.",
                "**Costs and Risks of MNCs to Host Countries**: Profits repatriated to home country — limited long-run domestic benefit; may pay very low wages and employ few locals in skilled positions; potential environmental damage and resource depletion; economic and political dominance may threaten sovereignty; tax avoidance through transfer pricing; 'race to the bottom' in labour and environmental standards as countries compete for FDI.",
                "**Benefits of MNCs to Home Countries**: Repatriated profits boost national income; access to cheaper inputs reduces production costs; creates management and specialist employment at headquarters.",
                "**Impact on Developed Host Countries**: MNCs may create quality employment and boost innovation; but may also crowd out domestic competitors or shift jobs from high-wage locations."
              ]
            },
            {
              subTitle: "Free Trade Areas and Trading Blocs",
              bullets: [
                "**Free Trade Area**: Member countries remove tariffs and quotas between themselves but each maintains its own external trade policy with non-members (e.g. NAFTA/USMCA).",
                "**Customs Union**: Members remove internal trade barriers and adopt a common external tariff on imports from non-members (e.g. the EU Customs Union).",
                "**Common Market**: A customs union that additionally allows free movement of factors of production (labour, capital) between member countries (e.g. the EU Single Market).",
                "**WTO**: The World Trade Organisation oversees global trade rules, resolves trade disputes between member governments, and coordinates multilateral trade negotiations aimed at reducing barriers."
              ]
            }
          ]
        }
      ]
    }
  ]
};
