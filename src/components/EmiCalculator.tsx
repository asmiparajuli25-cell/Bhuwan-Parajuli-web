import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, PieChart as PieChartIcon, Info, RefreshCw, Table as TableIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<number | string>(1000000); // 10 Lakhs
  const [rate, setRate] = useState<number | string>(10.5); // 10.5%
  const [tenure, setTenure] = useState<number | string>(5); // 5 Years
  const [tenureType, setTenureType] = useState<'yr' | 'mo'>('yr');

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  
  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    calculateEmi();
  }, [principal, rate, tenure, tenureType]);

  const calculateEmi = () => {
    const p = parseFloat(principal.toString());
    const r = parseFloat(rate.toString());
    const t = parseFloat(tenure.toString());

    if (p > 0 && r > 0 && t > 0) {
      const ratePerMonth = r / 12 / 100;
      const totalMonths = tenureType === 'yr' ? t * 12 : t;
      
      const emiValue = (p * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths)) / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
      
      const totalAmount = emiValue * totalMonths;
      const totalInt = totalAmount - p;

      setEmi(Math.round(emiValue));
      setTotalPayment(Math.round(totalAmount));
      setTotalInterest(Math.round(totalInt));
      
      // Calculate Amortization Schedule
      let balance = p;
      let scheduleData: AmortizationRow[] = [];
      for (let i = 1; i <= totalMonths; i++) {
         const interestForMonth = balance * ratePerMonth;
         const principalForMonth = emiValue - interestForMonth;
         balance -= principalForMonth;
         scheduleData.push({
           month: i,
           principal: principalForMonth,
           interest: interestForMonth,
           balance: balance > 0 ? balance : 0
         });
      }
      setSchedule(scheduleData);
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setSchedule([]);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = [
    { name: 'Principal Amount', value: parseFloat(principal.toString()) || 0, color: '#3b82f6' },
    { name: 'Total Interest', value: totalInterest, color: '#f59e0b' },
  ];

  const handleReset = () => {
    setPrincipal(1000000);
    setRate(10.5);
    setTenure(5);
    setTenureType('yr');
    setShowSchedule(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4"
        >
          <Calculator size={18} />
          BiNTech EMI System
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Calculate Your EMI</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Fast and accurate Equated Monthly Installment (EMI) calculator in Nepali Currency (NPR) with advanced amortization records.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-bold text-slate-800">Loan Details</h3>
               <button 
                 onClick={handleReset}
                 className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
               >
                 <RefreshCw size={16} /> Reset
               </button>
            </div>

            <div className="space-y-8">
              {/* Principal Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-slate-700">Principal Amount</label>
                  <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-md">
                    {formatCurrency(parseFloat(principal.toString()) || 0)}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rs.</span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-lg font-medium"
                    placeholder="Enter loan amount"
                  />
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="50000000" 
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                  <span>Rs. 10K</span>
                  <span>Rs. 5 Crore</span>
                </div>
              </div>

              {/* Interest Rate Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-slate-700">Interest Rate</label>
                  <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-md">
                    {rate}% p.a.
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-lg font-medium"
                    placeholder="Enter interest rate"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Tenure Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-slate-700">Loan Tenure</label>
                  <div className="flex bg-slate-200 rounded-lg p-1">
                    <button 
                      className={`px-4 py-1 text-sm font-semibold rounded-md transition-all ${tenureType === 'yr' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                      onClick={() => setTenureType('yr')}
                    >
                      Years
                    </button>
                    <button 
                      className={`px-4 py-1 text-sm font-semibold rounded-md transition-all ${tenureType === 'mo' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
                      onClick={() => setTenureType('mo')}
                    >
                      Months
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full pr-16 pl-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-lg font-medium"
                    placeholder="Enter loan tenure"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                     {tenureType === 'yr' ? 'Years' : 'Months'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max={tenureType === 'yr' ? 30 : 360} 
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                  <span>1 {tenureType === 'yr' ? 'Yr' : 'Mo'}</span>
                  <span>{tenureType === 'yr' ? 30 : 360} {tenureType === 'yr' ? 'Yrs' : 'Mos'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Chart Section */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center bg-white">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <PieChartIcon size={20} className="text-blue-600" />
              EMI Details
            </h3>

            <div className="text-center mb-8">
              <p className="text-slate-500 font-medium mb-1">Monthly EMI</p>
              <h4 className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
                {formatCurrency(emi)}
              </h4>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> Principal
                </span>
                <span className="font-bold text-slate-800">{formatCurrency(parseFloat(principal.toString()) || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span> Total Interest
                </span>
                <span className="font-bold text-slate-800">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-blue-800 font-semibold">Total Payable</span>
                <span className="font-extrabold text-blue-800">{formatCurrency(totalPayment)}</span>
              </div>
            </div>

            <div className="h-[250px] w-full flex items-center justify-center">
              {totalPayment > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 gap-2 font-medium">
                  <Info size={20} />
                  Enter amount to view chart
                </div>
              )}
            </div>
            {totalPayment > 0 && (
              <div className="flex justify-center gap-6 mt-4 opacity-80">
                <div className="flex items-center gap-2 text-sm font-medium"><div className="w-3 h-3 bg-blue-500 rounded-full"></div>Principal</div>
                <div className="flex items-center gap-2 text-sm font-medium"><div className="w-3 h-3 bg-amber-500 rounded-full"></div>Interest</div>
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Amortization Schedule Feature */}
      {schedule.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div 
             className="p-6 sm:p-8 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
             onClick={() => setShowSchedule(!showSchedule)}
          >
             <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                   <TableIcon size={20} className="text-blue-600" />
                   Amortization Schedule
                </h3>
                <p className="text-slate-500 text-sm mt-1">Detailed month-wise representation of your loan repayment.</p>
             </div>
             <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center transition-transform duration-300">
               {showSchedule ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
             </button>
          </div>
          
          <AnimatePresence>
            {showSchedule && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 transition={{ duration: 0.3 }}
                 className="border-t border-slate-100"
               >
                 <div className="p-4 sm:p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-sm text-left">
                       <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 rounded-lg">
                          <tr>
                             <th scope="col" className="px-4 py-3 font-semibold rounded-l-lg">Month</th>
                             <th scope="col" className="px-4 py-3 font-semibold text-right">Principal</th>
                             <th scope="col" className="px-4 py-3 font-semibold text-right">Interest</th>
                             <th scope="col" className="px-4 py-3 font-semibold text-right text-blue-600">Total EMI</th>
                             <th scope="col" className="px-4 py-3 font-semibold text-right rounded-r-lg">Balance</th>
                          </tr>
                       </thead>
                       <tbody>
                          {schedule.map((row) => (
                             <tr key={row.month} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-slate-700">{row.month}</td>
                                <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(row.principal)}</td>
                                <td className="px-4 py-3 text-right text-amber-600">{formatCurrency(row.interest)}</td>
                                <td className="px-4 py-3 text-right font-bold text-blue-600">{formatCurrency(emi)}</td>
                                <td className="px-4 py-3 text-right font-semibold text-slate-700">{formatCurrency(row.balance)}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
