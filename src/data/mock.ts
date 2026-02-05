// ============================================================
// Wello P2P Demo — Mock Data
// ============================================================

export interface User {
  id: string
  role: 'lender' | 'borrower'
  name: string
  company?: string
  email: string
  walletBalances: { NGN: number; USDT: number; USDC: number; U: number }
  creditScore?: number
  creditLevel?: number
  totalLimit?: number
  usedLimit?: number
}

export interface LoanOrder {
  id: string
  type: 'lend' | 'borrow'
  userId: string
  amount: number
  currency: string
  interestRate: number
  term: number
  repaymentMethod: 'bullet' | 'equal_installment' | 'interest_first' | 'equal_principal'
  collateralRequired: boolean
  collateralRate?: number
  status: 'pending' | 'matched' | 'active' | 'completed' | 'overdue' | 'cancelled'
  counterpartyId?: string
  counterpartyName?: string
  matchScore?: number
  createdAt: string
  expiresAt: string
  minCreditScore?: number
}

export interface RepaymentSchedule {
  loanId: string
  installments: {
    number: number
    dueDate: string
    principal: number
    interest: number
    total: number
    status: 'paid' | 'pending' | 'overdue'
    paidAt?: string
  }[]
}

export interface BorrowerProfile {
  id: string
  companyName: string
  registrationNumber: string
  country: string
  industry: string
  foundedYear: number
  kybStatus: { item: string; verified: boolean }[]
  fundUsage: string
  totalLoans: number
  totalAmount: number
  onTimeRate: number
  avgTerm: number
  monthlyCashFlow: number[]
  businessScale: string
  employees: number
  creditScoreBreakdown: { category: string; score: number; weight: number }[]
}

export interface MatchResult {
  id: string
  matchScore: number
  counterpartyId: string
  counterpartyName: string
  amount: number
  currency: string
  interestRate: number
  term: number
  creditScore: number
  repaymentMethod: string
  collateral: boolean
  highlights: string[]
  differences: string[]
}

// ─── Current Users ───
export const lenderUser: User = {
  id: 'L001',
  role: 'lender',
  name: '张伟',
  company: 'Horizon Capital Ltd.',
  email: 'zhang.wei@horizon.com',
  walletBalances: { NGN: 2500000, USDT: 45000, USDC: 32000, U: 18500 },
}

export const borrowerUser: User = {
  id: 'B001',
  role: 'borrower',
  name: '李明',
  company: 'Sahel Trade Co.',
  email: 'liming@saheltrade.ng',
  walletBalances: { NGN: 850000, USDT: 5200, USDC: 3100, U: 1200 },
  creditScore: 78,
  creditLevel: 3,
  totalLimit: 100000,
  usedLimit: 35000,
}

// ─── Yield Data (30 days) ───
export const yieldData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  date: `2024-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
  yield: +(4.2 + Math.random() * 0.8).toFixed(2),
  cumulative: +(820 + i * 28 + Math.random() * 15).toFixed(2),
}))

// ─── Lender Active Loans ───
export const lenderLoans: LoanOrder[] = [
  {
    id: 'TXN-2024-001',
    type: 'lend',
    userId: 'L001',
    amount: 15000,
    currency: 'USDT',
    interestRate: 18.5,
    term: 90,
    repaymentMethod: 'equal_installment',
    collateralRequired: true,
    collateralRate: 120,
    status: 'active',
    counterpartyId: 'B002',
    counterpartyName: 'Kano Agri Ltd.',
    matchScore: 94,
    createdAt: '2024-10-15',
    expiresAt: '2025-01-13',
  },
  {
    id: 'TXN-2024-002',
    type: 'lend',
    userId: 'L001',
    amount: 8000,
    currency: 'USDC',
    interestRate: 22,
    term: 60,
    repaymentMethod: 'interest_first',
    collateralRequired: false,
    status: 'active',
    counterpartyId: 'B003',
    counterpartyName: 'Lagos Digital',
    matchScore: 87,
    createdAt: '2024-11-01',
    expiresAt: '2024-12-31',
  },
  {
    id: 'TXN-2024-003',
    type: 'lend',
    userId: 'L001',
    amount: 25000,
    currency: 'USDT',
    interestRate: 15,
    term: 180,
    repaymentMethod: 'equal_principal',
    collateralRequired: true,
    collateralRate: 150,
    status: 'completed',
    counterpartyId: 'B004',
    counterpartyName: 'Abuja Motors',
    matchScore: 91,
    createdAt: '2024-06-01',
    expiresAt: '2024-11-28',
  },
  {
    id: 'TXN-2024-004',
    type: 'lend',
    userId: 'L001',
    amount: 5000,
    currency: 'USDC',
    interestRate: 25,
    term: 30,
    repaymentMethod: 'bullet',
    collateralRequired: false,
    status: 'overdue',
    counterpartyId: 'B005',
    counterpartyName: 'Ogun Textiles',
    matchScore: 72,
    createdAt: '2024-11-10',
    expiresAt: '2024-12-10',
  },
]

// ─── Borrower Active Loans ───
export const borrowerLoans: LoanOrder[] = [
  {
    id: 'TXN-2024-010',
    type: 'borrow',
    userId: 'B001',
    amount: 20000,
    currency: 'USDT',
    interestRate: 19.5,
    term: 90,
    repaymentMethod: 'equal_installment',
    collateralRequired: true,
    collateralRate: 130,
    status: 'active',
    counterpartyId: 'L002',
    counterpartyName: 'L-****8832',
    matchScore: 92,
    createdAt: '2024-10-20',
    expiresAt: '2025-01-18',
  },
  {
    id: 'TXN-2024-011',
    type: 'borrow',
    userId: 'B001',
    amount: 15000,
    currency: 'USDC',
    interestRate: 16,
    term: 60,
    repaymentMethod: 'interest_first',
    collateralRequired: false,
    status: 'active',
    counterpartyId: 'L003',
    counterpartyName: 'L-****4591',
    matchScore: 88,
    createdAt: '2024-11-05',
    expiresAt: '2025-01-04',
  },
  {
    id: 'TXN-2024-012',
    type: 'borrow',
    userId: 'B001',
    amount: 10000,
    currency: 'USDT',
    interestRate: 20,
    term: 30,
    repaymentMethod: 'bullet',
    collateralRequired: false,
    status: 'completed',
    counterpartyId: 'L004',
    counterpartyName: 'L-****7723',
    matchScore: 85,
    createdAt: '2024-09-15',
    expiresAt: '2024-10-15',
  },
]

// ─── Repayment Schedules ───
export const repaymentSchedules: RepaymentSchedule[] = [
  {
    loanId: 'TXN-2024-010',
    installments: [
      { number: 1, dueDate: '2024-11-20', principal: 6500, interest: 1300, total: 7800, status: 'paid', paidAt: '2024-11-19' },
      { number: 2, dueDate: '2024-12-20', principal: 6700, interest: 1100, total: 7800, status: 'pending' },
      { number: 3, dueDate: '2025-01-18', principal: 6800, interest: 700, total: 7500, status: 'pending' },
    ],
  },
  {
    loanId: 'TXN-2024-011',
    installments: [
      { number: 1, dueDate: '2024-12-05', principal: 0, interest: 800, total: 800, status: 'paid', paidAt: '2024-12-04' },
      { number: 2, dueDate: '2025-01-04', principal: 15000, interest: 800, total: 15800, status: 'pending' },
    ],
  },
]

// ─── Credit Score Breakdown ───
export const creditScoreBreakdown = [
  { category: '还款历史', score: 85, weight: 40 },
  { category: '交易频率', score: 72, weight: 20 },
  { category: '运营稳定性', score: 68, weight: 20 },
  { category: '信息完整度', score: 90, weight: 20 },
]

// ─── Agent Recommendations ───
export const agentRecommendations = [
  {
    id: 'REC-001',
    matchScore: 95,
    amount: 12000,
    currency: 'USDT',
    interestRate: 20,
    term: 60,
    borrowerCredit: 82,
    borrowerName: 'Sahel Trade Co.',
    industry: '跨境贸易',
    reason: '信用评分高，还款历史优秀，行业匹配度高',
  },
  {
    id: 'REC-002',
    matchScore: 88,
    amount: 8500,
    currency: 'USDC',
    interestRate: 22,
    term: 90,
    borrowerCredit: 75,
    borrowerName: 'Abuja Logistics',
    industry: '物流运输',
    reason: '期限灵活，利率优于市场平均，质押物充足',
  },
  {
    id: 'REC-003',
    matchScore: 81,
    amount: 20000,
    currency: 'USDT',
    interestRate: 17,
    term: 180,
    borrowerCredit: 85,
    borrowerName: 'Lagos Energy',
    industry: '新能源',
    reason: '大额稳定需求，优质企业，政府背书项目',
  },
]

// ─── Market Orders ───
export const marketOrders: LoanOrder[] = [
  { id: 'MKT-001', type: 'lend', userId: 'L010', amount: 10000, currency: 'USDT', interestRate: 18, term: 60, repaymentMethod: 'equal_installment', collateralRequired: true, collateralRate: 120, status: 'pending', createdAt: '2024-12-14T10:30:00', expiresAt: '2024-12-21', minCreditScore: 70 },
  { id: 'MKT-002', type: 'lend', userId: 'L011', amount: 25000, currency: 'USDC', interestRate: 15, term: 180, repaymentMethod: 'equal_principal', collateralRequired: true, collateralRate: 150, status: 'pending', createdAt: '2024-12-14T09:15:00', expiresAt: '2024-12-28', minCreditScore: 80 },
  { id: 'MKT-003', type: 'lend', userId: 'L012', amount: 5000, currency: 'USDT', interestRate: 25, term: 30, repaymentMethod: 'bullet', collateralRequired: false, status: 'pending', createdAt: '2024-12-14T08:00:00', expiresAt: '2024-12-21' },
  { id: 'MKT-004', type: 'lend', userId: 'L013', amount: 50000, currency: 'USDT', interestRate: 12, term: 365, repaymentMethod: 'equal_installment', collateralRequired: true, collateralRate: 200, status: 'pending', createdAt: '2024-12-13T16:45:00', expiresAt: '2024-12-27', minCreditScore: 85 },
  { id: 'MKT-005', type: 'lend', userId: 'L014', amount: 8000, currency: 'USDC', interestRate: 20, term: 90, repaymentMethod: 'interest_first', collateralRequired: false, status: 'pending', createdAt: '2024-12-13T14:20:00', expiresAt: '2024-12-20' },
  { id: 'MKT-006', type: 'lend', userId: 'L015', amount: 15000, currency: 'USDT', interestRate: 16, term: 120, repaymentMethod: 'equal_installment', collateralRequired: true, collateralRate: 130, status: 'pending', createdAt: '2024-12-13T11:00:00', expiresAt: '2024-12-27', minCreditScore: 75 },
  { id: 'MKT-007', type: 'lend', userId: 'L016', amount: 3000, currency: 'USDC', interestRate: 28, term: 14, repaymentMethod: 'bullet', collateralRequired: false, status: 'pending', createdAt: '2024-12-12T20:30:00', expiresAt: '2024-12-19' },
  { id: 'MKT-008', type: 'borrow', userId: 'B010', amount: 12000, currency: 'USDT', interestRate: 22, term: 60, repaymentMethod: 'equal_installment', collateralRequired: false, status: 'pending', counterpartyName: 'Sahel Import Co.', createdAt: '2024-12-14T11:00:00', expiresAt: '2024-12-21', minCreditScore: 76 },
  { id: 'MKT-009', type: 'borrow', userId: 'B011', amount: 30000, currency: 'USDT', interestRate: 18, term: 90, repaymentMethod: 'equal_principal', collateralRequired: true, collateralRate: 140, status: 'pending', counterpartyName: 'Kano Logistics', createdAt: '2024-12-14T09:45:00', expiresAt: '2024-12-28', minCreditScore: 82 },
  { id: 'MKT-010', type: 'borrow', userId: 'B012', amount: 7500, currency: 'USDC', interestRate: 25, term: 30, repaymentMethod: 'bullet', collateralRequired: false, status: 'pending', counterpartyName: 'Abuja Tech', createdAt: '2024-12-14T08:30:00', expiresAt: '2024-12-21', minCreditScore: 68 },
  { id: 'MKT-011', type: 'borrow', userId: 'B013', amount: 45000, currency: 'USDT', interestRate: 15, term: 180, repaymentMethod: 'equal_installment', collateralRequired: true, collateralRate: 160, status: 'pending', counterpartyName: 'Lagos Energy', createdAt: '2024-12-13T17:00:00', expiresAt: '2024-12-27', minCreditScore: 85 },
  { id: 'MKT-012', type: 'borrow', userId: 'B014', amount: 5000, currency: 'USDC', interestRate: 30, term: 14, repaymentMethod: 'bullet', collateralRequired: false, status: 'pending', counterpartyName: 'Ogun Retail', createdAt: '2024-12-13T15:15:00', expiresAt: '2024-12-20', minCreditScore: 60 },
  { id: 'MKT-013', type: 'borrow', userId: 'B015', amount: 20000, currency: 'USDT', interestRate: 19, term: 120, repaymentMethod: 'interest_first', collateralRequired: true, collateralRate: 120, status: 'pending', counterpartyName: 'Ibadan Pharma', createdAt: '2024-12-13T12:00:00', expiresAt: '2024-12-27', minCreditScore: 78 },
  { id: 'MKT-014', type: 'borrow', userId: 'B016', amount: 8800, currency: 'USDT', interestRate: 24, term: 45, repaymentMethod: 'equal_installment', collateralRequired: false, status: 'pending', counterpartyName: 'Delta Agri', createdAt: '2024-12-12T19:00:00', expiresAt: '2024-12-26', minCreditScore: 70 },
]

// ─── Match Results ───
export const matchResults: MatchResult[] = [
  {
    id: 'MATCH-001',
    matchScore: 95,
    counterpartyId: 'B002',
    counterpartyName: 'Sahel Trade Co.',
    amount: 12000,
    currency: 'USDT',
    interestRate: 20,
    term: 60,
    creditScore: 82,
    repaymentMethod: '等额本息',
    collateral: true,
    highlights: ['信用评分 82 分（优秀）', '按时还款率 96%', '行业匹配：跨境贸易', '质押率 130%'],
    differences: [],
  },
  {
    id: 'MATCH-002',
    matchScore: 88,
    counterpartyId: 'B003',
    counterpartyName: 'Kano Agri Ltd.',
    amount: 10000,
    currency: 'USDT',
    interestRate: 22,
    term: 90,
    creditScore: 75,
    repaymentMethod: '先息后本',
    collateral: false,
    highlights: ['利率高于市场均值', '交易次数 12 笔'],
    differences: ['金额差异：-2,000 USDT', '无质押'],
  },
  {
    id: 'MATCH-003',
    matchScore: 79,
    counterpartyId: 'B004',
    counterpartyName: 'Lagos Digital',
    amount: 15000,
    currency: 'USDT',
    interestRate: 18,
    term: 60,
    creditScore: 71,
    repaymentMethod: '等额本息',
    collateral: true,
    highlights: ['大额需求', '政府合作项目'],
    differences: ['利率低于期望 -2%', '信用评分一般'],
  },
  {
    id: 'MATCH-004',
    matchScore: 72,
    counterpartyId: 'B005',
    counterpartyName: 'Abuja Motors',
    amount: 8000,
    currency: 'USDC',
    interestRate: 25,
    term: 30,
    creditScore: 65,
    repaymentMethod: '到期还本付息',
    collateral: false,
    highlights: ['短期高利率'],
    differences: ['信用评分偏低', '无质押', '新用户，交易次数少'],
  },
]

// ─── Borrower Profile ───
export const borrowerProfile: BorrowerProfile = {
  id: 'B002',
  companyName: 'Sahel Trade Co.',
  registrationNumber: 'RC-2019-0458723',
  country: '尼日利亚',
  industry: '跨境贸易',
  foundedYear: 2019,
  kybStatus: [
    { item: '营业执照', verified: true },
    { item: '法人身份证', verified: true },
    { item: '银行开户证明', verified: true },
    { item: '税务登记', verified: true },
    { item: '运营数据审计', verified: true },
    { item: '实地走访', verified: false },
  ],
  fundUsage: '采购季节性农产品（可可豆、腰果），通过拉各斯港口出口至欧洲市场。预计采购周期60天，销售回款后偿还借款。',
  totalLoans: 8,
  totalAmount: 95000,
  onTimeRate: 96,
  avgTerm: 72,
  monthlyCashFlow: [42000, 38000, 55000, 48000, 62000, 58000, 71000, 65000, 78000, 72000, 85000, 80000],
  businessScale: '中型企业',
  employees: 45,
  creditScoreBreakdown: [
    { category: '还款历史', score: 88, weight: 40 },
    { category: '交易频率', score: 76, weight: 20 },
    { category: '运营稳定性', score: 72, weight: 20 },
    { category: '信息完整度', score: 92, weight: 20 },
  ],
}

// ─── Transaction Detail (for /transaction/[id]) ───
export const transactionDetail = {
  id: 'TXN-2024-001',
  status: 'active' as const,
  type: 'lend' as const,
  amount: 15000,
  currency: 'USDT',
  interestRate: 18.5,
  term: 90,
  repaymentMethod: '等额本息',
  createdAt: '2024-10-15',
  expiresAt: '2025-01-13',
  counterparty: {
    id: 'B002',
    name: 'Sahel Trade Co.',
    creditScore: 82,
    totalTransactions: 8,
    overdueRate: 4,
  },
  repayments: [
    { number: 1, dueDate: '2024-11-15', principal: 4800, interest: 925, total: 5725, status: 'paid' as const, paidAt: '2024-11-14' },
    { number: 2, dueDate: '2024-12-15', principal: 5050, interest: 675, total: 5725, status: 'paid' as const, paidAt: '2024-12-14' },
    { number: 3, dueDate: '2025-01-13', principal: 5150, interest: 400, total: 5550, status: 'pending' as const },
  ],
}

// ─── Risk Control 8-Layer System ───
export const riskLayers = [
  { id: 1, name: 'KYC/KYB 身份验证', description: '多维度身份认证，企业资质审核，反欺诈筛查', icon: 'Shield', color: '#22c55e' },
  { id: 2, name: 'AI 信用评估', description: '基于机器学习模型的信用评分，多维数据交叉验证', icon: 'Brain', color: '#3b82f6' },
  { id: 3, name: '渐进式额度管理', description: '从小额开始，根据还款表现逐步提升额度', icon: 'TrendingUp', color: '#8b5cf6' },
  { id: 4, name: '智能定价引擎', description: '基于风险等级的差异化利率，平衡收益与风险', icon: 'Calculator', color: '#f59e0b' },
  { id: 5, name: '质押物管理', description: 'Crypto 质押自动清算，第三方保证金托管', icon: 'Lock', color: '#ef4444' },
  { id: 6, name: '实时监控预警', description: '还款行为实时监控，异常交易即时告警', icon: 'Eye', color: '#06b6d4' },
  { id: 7, name: '多级催收体系', description: 'AI 催收 → 人工催收 → 法务催收 → 资产处置', icon: 'AlertTriangle', color: '#f97316' },
  { id: 8, name: '风险隔离机制', description: '单笔/单用户风险敞口限制，系统性风险防火墙', icon: 'ShieldCheck', color: '#10b981' },
]

export const creditLevels = [
  { level: 1, name: '新手', limit: 5000, requirements: '完成注册和KYB验证', color: '#94a3b8' },
  { level: 2, name: '初级', limit: 20000, requirements: '完成3笔借款，按时还款率>90%', color: '#22c55e' },
  { level: 3, name: '中级', limit: 50000, requirements: '完成8笔借款，按时还款率>95%，运营满1年', color: '#3b82f6' },
  { level: 4, name: '高级', limit: 150000, requirements: '完成15笔借款，按时还款率>98%，实地走访通过', color: '#8b5cf6' },
  { level: 5, name: '钻石', limit: 500000, requirements: '完成30笔借款，按时还款率100%，战略合作伙伴', color: '#f59e0b' },
]

// ─── Landing Page Stats ───
export const platformStats = {
  totalVolume: 12800000,
  activeUsers: 3842,
  avgAPY: 18.5,
  matchRate: 94.2,
}

// ─── FAQ Items ───
export const faqItems = [
  { q: '如何保障出借方的资金安全？', a: '平台采用八重风控体系，包括严格的KYB企业验证、AI信用评估、质押物管理、实时监控预警等多层防护。同时设有风险隔离机制，限制单笔和单用户的风险敞口。' },
  { q: '借款审批需要多长时间？', a: 'AI Agent可以在几秒内完成初步匹配。完整的KYB验证通常在24-48小时内完成。审核通过后即可获得初始额度。' },
  { q: '支持哪些还款方式？', a: '支持到期还本付息、等额本息、先息后本、等额本金四种还款方式。借贷双方可在发布需求时自由选择。' },
  { q: '逾期了怎么办？', a: '平台设有多级催收体系：首先AI自动提醒 → 人工客服沟通 → 法务介入 → 必要时处置质押物。逾期将影响信用评分和未来额度。' },
  { q: '$U是什么？', a: '$U是平台的收益型存款产品。将资金转换为$U后可获得基础年化收益（当前约4.5%），同时$U可直接用于平台内的借贷操作。' },
]
