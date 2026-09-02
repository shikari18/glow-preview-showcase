import type { SubjectNotes } from "./types";

export const ACCOUNTING: SubjectNotes = {
  id: "accounting",
  name: "Accounting",
  code: "0452",
  color: "bg-orange-500",
  chapters: [
    {
      number: 1,
      title: "The Fundamentals of Accounting",
      intro: "Accounting is the systematic process of identifying, measuring, recording, classifying, summarizing, and communicating financial information to enable informed economic decision-making. This chapter establishes the distinction between bookkeeping and accounting, the role of financial records, and the fundamental accounting equation.",
      subheadings: [
        {
          title: "Book-keeping vs Accounting and the Role of Financial Information",
          body: "Book-keeping is the detailed routine recording of financial transactions, while accounting involves the analysis, interpretation, and presentation of financial statements for stakeholders.",
          groups: [
            {
              subTitle: "Key Roles and Stakeholders",
              bullets: [
                "**Book-keeping**: The clerical recording of day-to-day transactions in books of prime entry and ledgers.",
                "**Accounting**: The preparation, analysis, and interpretation of financial statements to measure business performance, profitability, and solvency.",
                "**Users of Financial Statements**: **Owners/Shareholders** (evaluate profitability and return on investment), **Managers** (planning and cost control), **Lenders/Banks** (assess creditworthiness and ability to repay loans), **Trade Payables/Suppliers** (check liquidity before granting credit), **Tax Authorities** (calculate corporate tax liability), **Employees** (assess job security and wage negotiations)."
              ]
            }
          ]
        },
        {
          title: "The Accounting Equation and Basic Terminology",
          body: "Every business transaction affects the financial balance represented by the dual-aspect accounting equation.",
          groups: [
            {
              subTitle: "The Accounting Equation",
              bullets: [
                "**Fundamental Equation**: $\\text{Assets} = \\text{Capital (Owner's Equity)} + \\text{Liabilities}$",
                "**Expanded Equation**: $\\text{Assets} = \\text{Capital} + (\\text{Revenue} - \\text{Expenses}) - \\text{Drawings} + \\text{Liabilities}$"
              ]
            },
            {
              subTitle: "Core Classifications",
              bullets: [
                "**Non-Current Assets**: Resources owned for long-term use in operations for $>1$ year (e.g. premises, machinery, fixtures, motor vehicles).",
                "**Current Assets**: Short-term assets held for conversion into cash within 1 year (e.g. inventory, trade receivables, bank balance, cash in hand).",
                "**Non-Current Liabilities**: Long-term debts repayable after $>1$ year (e.g. bank loans, mortgages, debentures).",
                "**Current Liabilities**: Short-term debts payable within 1 year (e.g. trade payables, bank overdrafts, short-term accruals).",
                "**Capital (Equity)**: Funds introduced into the business by the owner, plus accumulated retained profits, less drawings."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Sources and Recording of Data",
      intro: "Financial transactions originate from source documents, are recorded sequentially in books of prime entry (journals), and are posted into specialized ledgers using the double-entry bookkeeping system where every debit entry has an equal and opposite credit entry.",
      subheadings: [
        {
          title: "Business Documents and Books of Prime Entry",
          body: "Source documents provide verifiable audit trails that are summarized in specialized journals.",
          groups: [
            {
              subTitle: "Business Source Documents",
              bullets: [
                "**Sales Invoice**: Issued by seller to customer for goods sold on credit (source for Sales Journal).",
                "**Purchases Invoice**: Received from supplier for goods bought on credit (source for Purchases Journal).",
                "**Credit Note**: Issued to a customer for goods returned or overcharges (source for Sales Returns Journal).",
                "**Debit Note**: Sent to a supplier requesting a credit note for damaged or returned goods (source for Purchases Returns Journal).",
                "**Paying-in Slip / Cheque Counterfoil**: Proof of banking cash or issuing cheques (Cash Book source).",
                "**Receipt / Till Roll**: Proof of cash sales or payments."
              ]
            },
            {
              subTitle: "The Books of Prime Entry (Journals)",
              bullets: [
                "**Sales Journal**: Records credit sales of inventory.",
                "**Purchases Journal**: Records credit purchases of inventory.",
                "**Sales Returns (Returns Inwards) Journal**: Records returns of inventory from credit customers.",
                "**Purchases Returns (Returns Outwards) Journal**: Records returns of inventory to credit suppliers.",
                "**Cash Book**: Two-column or three-column book combining the cash account, bank account, and discounts.",
                "**Petty Cash Book**: Maintains small cash disbursements using the **imprest system** where the cashier is refunded the exact amount spent to restore the float.",
                "**General Journal**: Records non-routine transactions (purchase/sale of non-current assets on credit, opening entries, correction of errors)."
              ]
            }
          ]
        },
        {
          title: "Double-Entry Bookkeeping and Ledger Division",
          body: "The rules of debit and credit applied across specialized ledgers.",
          groups: [
            {
              subTitle: "Rules of Double Entry (DEAD CLIC)",
              bullets: [
                "**DEBIT (Increases)**: **D**ebit increases **E**xpenses, **A**ssets, **D**rawings.",
                "**CREDIT (Increases)**: **C**redit increases **L**iabilities, **I**ncome (Revenue), **C**apital.",
                "**Rule Summary**: To increase an Asset or Expense $\\to$ Debit; To decrease an Asset or Expense $\\to$ Credit; To increase a Liability, Capital, or Revenue $\\to$ Credit; To decrease a Liability, Capital, or Revenue $\\to$ Debit."
              ]
            },
            {
              subTitle: "Division of the Ledger",
              bullets: [
                "**Sales Ledger (Debtors Ledger)**: Contains personal accounts of individual credit customers (trade receivables).",
                "**Purchases Ledger (Creditors Ledger)**: Contains personal accounts of individual credit suppliers (trade payables).",
                "**General (Nominal) Ledger**: Contains all impersonal accounts (assets, liabilities, capital, expenses, revenue)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Verification of Accounting Records",
      intro: "Accounting accuracy is verified using Trial Balances, Bank Reconciliation Statements, Sales/Purchases Ledger Control Accounts, and Suspense Accounts to correct bookkeeping errors.",
      subheadings: [
        {
          title: "The Trial Balance and Errors",
          body: "A Trial Balance lists all debit and credit ledger balances to verify mathematical equality.",
          groups: [
            {
              subTitle: "Errors that DO NOT Affect Trial Balance Agreement",
              bullets: [
                "**Error of Omission**: A transaction is completely omitted from both debit and credit records.",
                "**Error of Commission**: Entry posted to correct side of ledger but in wrong personal account (e.g. debiting J. Smith instead of J. Smyth).",
                "**Error of Principle**: Entry posted to correct side but in wrong class of account violating accounting principles (e.g. debiting vehicle repairs expense instead of vehicle asset account).",
                "**Error of Original Entry**: Incorrect figure recorded in source document and posted to both accounts (e.g. \\$54 entered as \\$45 on both sides).",
                "**Error of Reversal**: Debit and credit entries are reversed (e.g. debiting Sales and crediting Bank for cash sales).",
                "**Compensating Errors**: Two independent errors of equal amount cancel each other out."
              ]
            },
            {
              subTitle: "Suspense Account",
              bullets: [
                "**Function**: Opened temporarily when debit and credit totals of a trial balance do not agree, holding the discrepancy until errors (single entry, unequal amounts, casting errors) are identified and corrected via journal entries."
              ]
            }
          ]
        },
        {
          title: "Bank Reconciliation Statements and Control Accounts",
          body: "Reconciling internal cash book records with external bank statements and verifying total debtor/creditor balances.",
          groups: [
            {
              subTitle: "Bank Reconciliation Steps",
              bullets: [
                "**Step 1 — Update Cash Book**: Record items appearing on bank statement but missing from cash book (bank charges, interest received, direct debits, standing orders, credit transfers, dishonoured cheques).",
                "**Step 2 — Bank Reconciliation Statement**: Reconcile updated cash book balance with bank statement balance by adjusting for **Uncredited Deposits** (lodgements in transit) and **Unpresented Cheques** (cheques issued but not yet presented at bank)."
              ]
            },
            {
              subTitle: "Control Accounts",
              bullets: [
                "**Sales Ledger Control Account (Total Trade Receivables)**: Summary of all credit customer transactions; verifies arithmetic accuracy of sales ledger and provides total trade receivables figure for financial statements.",
                "**Purchases Ledger Control Account (Total Trade Payables)**: Summary of all credit supplier transactions; checks accuracy of purchases ledger."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Accounting Procedures and Period-End Adjustments",
      intro: "Period-end adjustments ensure that financial statements comply with accrual and matching concepts. This chapter covers capital vs revenue expenditure, depreciation methods and asset disposals, accruals and prepayments, irrecoverable debts, and inventory valuation.",
      subheadings: [
        {
          title: "Capital and Revenue Expenditure",
          body: "Distinguishing between asset acquisition costs and operational running costs.",
          groups: [
            {
              bullets: [
                "**Capital Expenditure**: Spending on acquiring, expanding, or improving non-current assets to increase their revenue-generating capacity (e.g. purchasing a delivery van, delivery/installation costs, building an extension); recorded on Statement of Financial Position.",
                "**Revenue Expenditure**: Routine running expenses incurred in operating the business day-to-day and maintaining existing assets (e.g. van petrol, insurance, machine servicing); recorded in the Income Statement.",
                "**Capital Receipts**: Proceeds from selling non-current assets or introducing new capital.",
                "**Revenue Receipts**: Income from regular trading activities (sales revenue, rent receivable)."
              ]
            }
          ]
        },
        {
          title: "Depreciation of Non-Current Assets",
          body: "Allocating the depreciable cost of an asset systematically across its useful economic life.",
          groups: [
            {
              subTitle: "Depreciation Methods",
              bullets: [
                "**Straight-Line Method**: Fixed annual charge: $\\text{Annual Depreciation} = \\frac{\\text{Cost} - \\text{Residual Value}}{\\text{Useful Life in Years}}$.",
                "**Reducing (Diminishing) Balance Method**: Fixed percentage applied to the **Net Book Value (NBV)** ($Cost - \\text{Accumulated Depreciation}$) each year; higher depreciation in early years.",
                "**Revaluation Method**: Used for small, low-value assets (e.g. hand tools, loose equipment): $\\text{Depreciation} = \\text{Opening Value} + \\text{Additions} - \\text{Closing Revaluation}$."
              ]
            },
            {
              subTitle: "Disposal of Non-Current Assets",
              bullets: [
                "**Disposal Account**: (1) Transfer asset cost from Asset Account to Disposal Account (Credit Asset, Debit Disposal); (2) Transfer accumulated depreciation to Disposal Account (Debit Provision, Credit Disposal); (3) Record sale proceeds (Debit Bank, Credit Disposal); (4) Balance represents **Profit on Disposal** (if proceeds $>$ NBV $\\to$ credit Income Statement) or **Loss on Disposal** (if proceeds $<$ NBV $\\to$ debit Income Statement)."
              ]
            }
          ]
        },
        {
          title: "Accruals, Prepayments, Bad Debts and Inventory Valuation",
          body: "Applying matching and prudence principles to period-end balances.",
          groups: [
            {
              subTitle: "Accruals and Prepayments",
              bullets: [
                "**Accrued Expense**: Expense incurred but not yet paid $\\implies$ **Add to expense** in Income Statement; record as **Current Liability** in Statement of Financial Position.",
                "**Prepaid Expense**: Expense paid in advance for next period $\\implies$ **Deduct from expense** in Income Statement; record as **Current Asset** in Statement of Financial Position.",
                "**Accrued / Prepaid Income**: Accrued income is a Current Asset; Prepaid income received in advance is a Current Liability."
              ]
            },
            {
              subTitle: "Irrecoverable Debts and Provision for Doubtful Debts",
              bullets: [
                "**Irrecoverable (Bad) Debt Written Off**: When a debtor cannot pay $\\implies$ Debit Irrecoverable Debts Expense, Credit Customer's Account.",
                "**Provision for Doubtful Debts**: Estimated percentage of remaining trade receivables that may default (Prudence Concept); $\\text{Provision} = \\% \\times (\\text{Trade Receivables} - \\text{New Bad Debts})$; **Increase in provision** is debited as an expense; **Decrease in provision** is credited as income; Net trade receivables ($Receivables - Provision$) is shown on Statement of Financial Position.",
                "**Inventory Valuation**: Valued at the **lower of cost and net realisable value (NRV)** (where $\\text{NRV} = \\text{Estimated Selling Price} - \\text{Cost of Completion/Selling}$).",
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Preparation of Financial Statements",
      intro: "Financial statements synthesize financial data into Income Statements (calculating gross and net profit) and Statements of Financial Position (summarizing assets, liabilities, and equity). This chapter covers statements for sole traders, partnerships, limited liability companies, manufacturing firms, and incomplete records.",
      subheadings: [
        {
          title: "Sole Trader Financial Statements",
          body: "Structure of Income Statement (Trading and Profit & Loss sections) and Statement of Financial Position.",
          groups: [
            {
              subTitle: "Income Statement Format",
              bullets: [
                "**Revenue (Sales)** minus **Sales Returns (Returns Inwards)** = **Net Revenue**.",
                "**Cost of Sales**: $\\text{Opening Inventory} + \\text{Purchases} - \\text{Purchases Returns} + \\text{Carriage Inwards} - \\text{Closing Inventory}$.",
                "**Gross Profit**: $\\text{Net Revenue} - \\text{Cost of Sales}$.",
                "**Profit for the Year (Net Profit)**: $\\text{Gross Profit} + \\text{Other Income (rent received, discount received)} - \\text{Operating Expenses (wages, rent, depreciation, carriage outwards, bad debts, loan interest)}$.",
              ]
            },
            {
              subTitle: "Statement of Financial Position Format",
              bullets: [
                "**Assets**: **Non-Current Assets** (Cost, Accumulated Depreciation, NBV) $+$ **Current Assets** (Inventory, Trade Receivables less Provision, Prepayments, Bank, Cash).",
                "**Capital & Liabilities**: **Owner's Capital** ($Opening Capital + Profit for the Year - Drawings$) $+$ **Non-Current Liabilities** (Bank Loan) $+$ **Current Liabilities** (Trade Payables, Accruals, Bank Overdraft). Total Assets MUST equal Total Capital & Liabilities."
              ]
            }
          ]
        },
        {
          title: "Partnerships and Limited Companies",
          body: "Financial structures for multi-owner commercial enterprises.",
          groups: [
            {
              subTitle: "Partnership Accounts",
              bullets: [
                "**Partnership Agreement**: Defines profit/loss sharing ratio, interest on capital, interest on drawings, and partner salaries.",
                "**Appropriation Account**: $\\text{Profit for the Year} + \\text{Interest on Drawings} - \\text{Interest on Capital} - \\text{Partner Salaries} = \\text{Residual Profit shared among partners}$.",
                "**Capital vs Current Accounts**: Fixed Capital Accounts store original capital; fluctuating Current Accounts record interest, salary, share of profit, and drawings."
              ]
            },
            {
              subTitle: "Limited Company Accounts",
              bullets: [
                "**Share Capital**: **Ordinary Shares** (equity owners, variable dividends, voting rights) and **Preference Shares** (fixed dividend rate, priority over ordinary shares).",
                "**Equity Section**: Share Capital $+$ Share Premium $+$ General Reserve $+$ Retained Earnings."
              ]
            }
          ]
        },
        {
          title: "Manufacturing Accounts and Incomplete Records",
          body: "Cost accounting for manufacturing businesses and single-entry reconstruction.",
          groups: [
            {
              subTitle: "Manufacturing Account Format",
              bullets: [
                "**Prime Cost**: $\\text{Direct Raw Materials} (Opening + Purchases + Carriage In - Closing) + \\text{Direct Factory Wages} + \\text{Direct Expenses}$.",
                "**Factory Overhead Cost**: Indirect factory costs (factory rent, machine depreciation, supervisor salary).",
                "**Cost of Production**: $\\text{Prime Cost} + \\text{Factory Overheads} + \\text{Opening Work-in-Progress} - \\text{Closing Work-in-Progress}$.",
                "Cost of Production is transferred to the Income Statement as the 'purchases' figure for finished goods."
              ]
            },
            {
              subTitle: "Incomplete Records (Single Entry)",
              bullets: [
                "**Statement of Affairs**: Balance sheet used to determine opening or closing capital: $\\text{Capital} = \\text{Assets} - \\text{Liabilities}$.",
                "**Profit Calculation**: $\\text{Profit} = \\text{Closing Capital} + \\text{Drawings} - \\text{Capital Introduced} - \\text{Opening Capital}$.",
                "**Total Debtors/Creditors Accounts**: Used to reconstruct missing credit sales or credit purchases figures."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Analysis and Interpretation",
      intro: "Financial ratio analysis evaluates an enterprise's profitability, liquidity, and operational efficiency, allowing managers, investors, and creditors to compare performance over time and benchmark against industry competitors.",
      subheadings: [
        {
          title: "Profitability and Liquidity Ratios",
          body: "Key financial metrics measuring earnings power and cash solvency.",
          groups: [
            {
              subTitle: "Profitability Ratios",
              bullets: [
                "**Gross Profit Margin**: $\\frac{\\text{Gross Profit}}{\\text{Revenue}} \\times 100\\%$",
                "**Mark-up on Cost**: $\\frac{\\text{Gross Profit}}{\\text{Cost of Sales}} \\times 100\\%$",
                "**Profit for the Year Margin (Net Profit Margin)**: $\\frac{\\text{Profit for the Year}}{\\text{Revenue}} \\times 100\\%$",
                "**Return on Capital Employed (ROCE)**: $\\frac{\\text{Operating Profit}}{\\text{Capital Employed}} \\times 100\\%$ (where $\\text{Capital Employed} = \\text{Total Equity} + \\text{Non-Current Liabilities}$)."
              ]
            },
            {
              subTitle: "Liquidity Ratios",
              bullets: [
                "**Current (Working Capital) Ratio**: $\\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$ (ideal benchmark $\\approx 1.5:1$ to $2:1$).",
                "**Liquid (Quick / Acid-Test) Ratio**: $\\frac{\\text{Current Assets} - \\text{Inventory}}{\\text{Current Liabilities}}$ (ideal benchmark $\\approx 1:1$; excludes inventory as it cannot be converted to cash immediately)."
              ]
            }
          ]
        },
        {
          title: "Efficiency Ratios and Limitations of Ratios",
          body: "Assessing working capital management and understanding the constraints of financial analysis.",
          groups: [
            {
              subTitle: "Efficiency Ratios",
              bullets: [
                "**Rate of Inventory Turnover**: $\\frac{\\text{Cost of Sales}}{\\text{Average Inventory}}$ (times per year), or $\\frac{\\text{Average Inventory}}{\\text{Cost of Sales}} \\times 365$ (days).",
                "**Trade Receivables Collection Period**: $\\frac{\\text{Trade Receivables}}{\\text{Credit Sales}} \\times 365$ days.",
                "**Trade Payables Payment Period**: $\\frac{\\text{Trade Payables}}{\\text{Credit Purchases}} \\times 365$ days."
              ]
            },
            {
              subTitle: "Limitations of Ratio Analysis",
              bullets: [
                "**Historical Data**: Ratios reflect past performance, which may not predict future performance.",
                "**Inflation Distortion**: Comparisons over time are distorted by rising price levels.",
                "**Non-Financial Factors**: Ignores staff morale, product quality, brand reputation, and environmental compliance.",
                "**Different Accounting Policies**: Comparing different firms is distorted by differing depreciation methods or inventory valuation techniques."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 7,
      title: "Accounting Principles and Policies",
      intro: "Accounting rules and standards ensure financial consistency, transparency, and comparability across international financial markets.",
      subheadings: [
        {
          title: "Fundamental Accounting Concepts",
          body: "The core governing principles applied when preparing financial statements.",
          groups: [
            {
              bullets: [
                "**Prudence (Conservatism)**: Profits must not be anticipated; all potential losses must be provided for immediately (e.g. creating provisions for doubtful debts, valuing inventory at lower of cost and NRV).",
                "**Matching / Accruals**: Revenues and expenses must be matched to the accounting period in which they are earned or incurred, regardless of when cash is received or paid.",
                "**Consistency**: The same accounting methods and policies (e.g. depreciation method) must be applied consistently from one financial year to the next.",
                "**Going Concern**: Assumption that the business will continue trading for the foreseeable future with no intention of liquidation.",
                "**Business Entity**: The business is treated as a separate legal and financial entity distinct from its owners.",
                "**Historic Cost**: All assets and transactions are recorded at their original purchase cost, not estimated market value.",
                "**Materiality**: Only items of significant monetary value that could influence economic decisions need strict adherence to accounting standards; trivial items (e.g. staplers) are written off as immediate expenses.",
                "**Money Measurement**: Only transactions expressible in monetary terms are recorded in the accounts.",
                "**Duality (Dual Aspect)**: Every transaction has a twofold effect, maintaining the accounting equation ($Assets = Capital + Liabilities$)."
              ]
            }
          ]
        }
      ]
    }
  ]
};
