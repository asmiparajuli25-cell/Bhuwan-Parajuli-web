import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Trash2, Printer, Download, Save, History, FileText, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface SavedInvoice {
  id: string;
  date: string;
  clientName: string;
  total: number;
  data: InvoiceData;
}

interface InvoiceData {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  items: InvoiceItem[];
  taxRate: number;
}

interface InvoiceGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceGeneratorModal({ isOpen, onClose }: InvoiceGeneratorModalProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'history'>('editor');
  const [savedInvoices, setSavedInvoices] = useState<SavedInvoice[]>([]);
  
  // Form State
  const [data, setData] = useState<InvoiceData>({
    businessName: 'BiNTech',
    businessAddress: '',
    businessEmail: '',
    businessPhone: '',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    items: [{ id: Date.now().toString(), description: '', quantity: 1, price: 0 }],
    taxRate: 13,
  });

  const invoiceRef = useRef<HTMLDivElement>(null);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Load saved invoices from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bintech_saved_invoices');
      if (stored) {
        setSavedInvoices(JSON.parse(stored));
      }
    } catch(e) {
      console.error(e);
    }
  }, []);


  const saveInvoicesToStorage = (invoices: SavedInvoice[]) => {
    localStorage.setItem('bintech_saved_invoices', JSON.stringify(invoices));
    setSavedInvoices(invoices);
  };

  const handleDataChange = (field: keyof InvoiceData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), description: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (id: string) => {
    if (data.items.length === 1) return;
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * data.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSave = () => {
    if (!data.clientName) {
      alert("Please enter a client name before saving.");
      return;
    }
    const newInvoice: SavedInvoice = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      clientName: data.clientName,
      total: calculateTotal(),
      data: { ...data }
    };
    const updated = [newInvoice, ...savedInvoices];
    saveInvoicesToStorage(updated);
    alert("Invoice saved successfully!");
  };

  const handleLoad = (invoiceData: InvoiceData) => {
    setData(invoiceData);
    setActiveTab('editor');
  };

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${data.clientName || 'Draft'}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    if (!invoiceRef.current) return;
    const content = invoiceRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=800,width=800');
    if (!printWindow) return;
    
    // Injecting Tailwind basic styles to keep it clean during printing
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; color: #1e3a8a; }
            .print-container { padding: 40px; max-width: 800px; margin: 0 auto; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; text-align: left; }
            th { border-bottom: 2px solid #bfdbfe; padding: 12px 8px; color: #1e40af; }
            td { border-bottom: 1px solid #e5e7eb; padding: 12px 8px; }
            .header-flex { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .text-right { text-align: right; }
            .text-xl { font-size: 1.25rem; font-weight: bold; }
            .text-3xl { font-size: 1.875rem; font-weight: bold; color: #1e3a8a; }
            .text-blue-600 { color: #2563eb; }
            .text-gray-500 { color: #6b7280; }
            .font-bold { font-weight: bold; }
            .totals-container { margin-top: 30px; display: flex; justify-content: flex-end; }
            .totals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 300px; }
            .text-lg { font-size: 1.125rem; }
            .bg-blue-50 { background-color: #eff6ff; padding: 20px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${content}
          </div>
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-50 w-full max-w-7xl h-[95vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-blue-100"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 sm:p-6 flex justify-between items-center shrink-0 shadow-md relative z-10">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm">
                  <FileText size={28} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">BiNTech</h2>
                  <p className="text-blue-100 text-sm font-medium tracking-wide">Business Accounting System</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:flex bg-blue-700 rounded-lg p-1">
                  <button 
                    onClick={() => setActiveTab('editor')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'editor' ? 'bg-white text-blue-600 shadow' : 'text-blue-100 hover:text-white'}`}
                  >
                    Editor
                  </button>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-white text-blue-600 shadow' : 'text-blue-100 hover:text-white'}`}
                  >
                    <History size={16} /> Saved
                  </button>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Mobile Tab Swticher */}
            <div className="sm:hidden flex bg-white border-b border-blue-100 shrink-0">
               <button 
                  onClick={() => setActiveTab('editor')}
                  className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'editor' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
                >
                  Editor
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-3 text-sm font-bold border-b-2 flex justify-center items-center gap-2 ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
                >
                  <History size={16} /> Saved
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-slate-50">
              
              {activeTab === 'history' ? (
                <div className="w-full h-full p-6 overflow-y-auto">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">Saved Invoices</h3>
                    {savedInvoices.length === 0 ? (
                      <div className="text-center py-20 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <History size={48} className="mx-auto text-blue-200 mb-4" />
                        <p className="text-blue-400 font-medium text-lg">No saved invoices yet.</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {savedInvoices.map((inv) => (
                          <div key={inv.id} className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                            <div>
                              <p className="font-bold text-blue-900 text-lg">{inv.clientName}</p>
                              <div className="text-sm text-slate-500 flex gap-4 mt-1">
                                <span>Date: {inv.date}</span>
                                <span>Total: Rs. {inv.total.toLocaleString()}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleLoad(inv.data)}
                              className="px-5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors border border-blue-100 hover:border-blue-600 w-full sm:w-auto"
                            >
                              Load Invoice
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Left Panel: Controls */}
                  <div className="w-full lg:w-[400px] xl:w-[450px] border-r border-blue-100 bg-white overflow-y-auto shrink-0 flex flex-col">
                    <div className="p-6 space-y-8 flex-1">
                      
                      {/* Business Details */}
                      <section>
                        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                          Business Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Business Name</label>
                            <input value={data.businessName} onChange={(e) => handleDataChange('businessName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-blue-900 font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Address</label>
                            <input value={data.businessAddress} onChange={(e) => handleDataChange('businessAddress', e.target.value)} placeholder="123 Main St..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 outline-none" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                              <input value={data.businessEmail} onChange={(e) => handleDataChange('businessEmail', e.target.value)} placeholder="contact@..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 outline-none" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
                              <input value={data.businessPhone} onChange={(e) => handleDataChange('businessPhone', e.target.value)} placeholder="+977..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 outline-none" />
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Client Details */}
                      <section>
                         <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                          Client Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Client / Company Name</label>
                            <input value={data.clientName} onChange={(e) => handleDataChange('clientName', e.target.value)} placeholder="Acme Corp" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-blue-900 font-medium focus:border-blue-500 focus:ring-1 outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Client Address</label>
                            <input value={data.clientAddress} onChange={(e) => handleDataChange('clientAddress', e.target.value)} placeholder="456 Market St..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Client Email</label>
                            <input value={data.clientEmail} onChange={(e) => handleDataChange('clientEmail', e.target.value)} placeholder="client@..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 outline-none" />
                          </div>
                        </div>
                      </section>

                      {/* Services & Items */}
                      <section>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
                            Services & Items
                          </h3>
                          <button onClick={addItem} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-2 py-1 rounded">
                            <Plus size={16} /> Add
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {data.items.map((item, index) => (
                            <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group transition-colors hover:border-blue-300">
                              <button onClick={() => removeItem(item.id)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow hover:bg-red-600 hover:text-white">
                                <Trash2 size={14} />
                              </button>
                              <div className="space-y-3">
                                <div>
                                  <input 
                                    value={item.description} 
                                    onChange={(e) => updateItem(item.id, 'description', e.target.value)} 
                                    placeholder="Service description..." 
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-blue-900 focus:border-blue-500 outline-none" 
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Quantity</label>
                                    <input 
                                      type="number" min="1"
                                      value={item.quantity} 
                                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} 
                                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-blue-900 focus:border-blue-500 outline-none" 
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Price (Rs.)</label>
                                    <input 
                                      type="number" min="0" step="100"
                                      value={item.price} 
                                      onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))} 
                                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-blue-900 focus:border-blue-500 outline-none" 
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
                          <label className="text-sm font-bold text-blue-900">Tax Rate (%)</label>
                          <input 
                            type="number" min="0" max="100"
                            value={data.taxRate} 
                            onChange={(e) => handleDataChange('taxRate', Number(e.target.value))} 
                            className="w-24 bg-white border border-blue-200 rounded-lg px-3 py-2 text-blue-900 font-bold focus:border-blue-500 outline-none text-right" 
                          />
                        </div>
                      </section>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 bg-white border-t border-blue-100 grid grid-cols-3 gap-2 shrink-0">
                      <button onClick={handleSave} className="flex flex-col items-center justify-center py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-xs">
                        <Save size={20} className="mb-1" />
                        Save
                      </button>
                      <button onClick={handleDownloadPdf} disabled={isGeneratingPdf} className={`flex flex-col items-center justify-center py-2 text-white rounded-lg transition-colors font-medium text-xs shadow-md ${isGeneratingPdf ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}`}>
                        <Download size={20} className={`mb-1 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
                        {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
                      </button>
                      <button onClick={handlePrint} className="flex flex-col items-center justify-center py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-xs">
                        <Printer size={20} className="mb-1" />
                        Print
                      </button>
                    </div>
                  </div>

                  {/* Right Panel: Live Preview */}
                  <div className="flex-1 overflow-y-auto bg-slate-200/50 p-4 sm:p-8 flex items-start justify-center">
                    <div 
                      ref={invoiceRef} 
                      className="bg-white w-full max-w-[800px] min-h-[1056px] shadow-lg rounded-sm overflow-hidden flex flex-col p-8 sm:p-12 border border-slate-200"
                      style={{ aspectRatio: '1 / 1.414' }} // A4 aspect ratio approximation
                    >
                      {/* Invoice Document Structure to be printed/PDFed */}
                      <div className="flex justify-between items-start mb-12">
                        <div>
                          <h1 className="text-4xl font-extrabold text-[#1e3a8a] mb-1">{data.businessName || 'Business Name'}</h1>
                          <p className="text-blue-600 font-semibold tracking-wide text-sm mb-4">Business Accounting System</p>
                          <div className="space-y-1 text-sm text-slate-600">
                            {data.businessAddress && <p>{data.businessAddress}</p>}
                            {data.businessEmail && <p>{data.businessEmail}</p>}
                            {data.businessPhone && <p>{data.businessPhone}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <h2 className="text-3xl font-light text-slate-400 mb-2 uppercase tracking-widest">Invoice</h2>
                          <p className="text-sm text-slate-500 font-medium">Date: {new Date().toLocaleDateString()}</p>
                          <p className="text-sm text-slate-500 font-medium mt-1">Invoice No: {Math.floor(Math.random() * 90000) + 10000}</p>
                        </div>
                      </div>

                      <div className="mb-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Billed To</h3>
                        <p className="text-xl font-bold text-[#1e3a8a]">{data.clientName || 'Client Name'}</p>
                        <div className="space-y-1 mt-2 text-sm text-slate-700">
                          {data.clientAddress && <p>{data.clientAddress}</p>}
                          {data.clientEmail && <p>{data.clientEmail}</p>}
                        </div>
                      </div>

                      <div className="flex-1">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr>
                              <th className="py-3 px-4 bg-white border-b-2 border-blue-200 text-xs font-bold text-blue-900 uppercase tracking-widest">Description</th>
                              <th className="py-3 px-4 bg-white border-b-2 border-blue-200 text-xs font-bold text-blue-900 uppercase tracking-widest text-center w-24">QTY</th>
                              <th className="py-3 px-4 bg-white border-b-2 border-blue-200 text-xs font-bold text-blue-900 uppercase tracking-widest text-right w-32">Price</th>
                              <th className="py-3 px-4 bg-white border-b-2 border-blue-200 text-xs font-bold text-blue-900 uppercase tracking-widest text-right w-32">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.items.map((item, index) => (
                              <tr key={index} className="border-b border-slate-100">
                                <td className="py-4 px-4 text-slate-800 font-medium">{item.description || '-'}</td>
                                <td className="py-4 px-4 text-slate-600 text-center">{item.quantity}</td>
                                <td className="py-4 px-4 text-slate-600 text-right">Rs. {Number(item.price).toLocaleString()}</td>
                                <td className="py-4 px-4 text-slate-800 font-bold text-right">Rs. {(item.quantity * item.price).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <div className="w-72 space-y-3">
                          <div className="flex justify-between text-slate-500 font-medium">
                            <span>Subtotal</span>
                            <span>Rs. {calculateSubtotal().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-slate-500 font-medium">
                            <span>Tax ({data.taxRate}%)</span>
                            <span>Rs. {calculateTax().toLocaleString()}</span>
                          </div>
                          <div className="pt-3 border-t-2 border-blue-100 flex justify-between text-xl font-bold text-[#1e3a8a]">
                            <span>Total</span>
                            <span>Rs. {calculateTotal().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-20 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
                        <p>Thank you for your business!</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
