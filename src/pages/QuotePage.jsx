import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Calculator,
  RefreshCw,
  Send,
  MessageSquare,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Box,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { parseSTL, generateSampleCubeSTL } from '../utils/stlParser';
import STLViewer from '../components/STLViewer';
import { siteConfig } from '../data/siteConfig';

/**
 * Custom 3D Printer Vector Icon
 */
function Printer3DIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <path d="M10 6h4v3l-2 2-2-2V6z" fill="currentColor" fillOpacity="0.25" />
      <line x1="12" y1="11" x2="12" y2="13" />
      <path d="M9.5 18v-2.8l2.5-1.4 2.5 1.4v2.8" />
      <path d="M9.5 15.2l2.5 1.4 2.5-1.4" />
    </svg>
  );
}

export default function QuotePage() {
  // File & Mesh State
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [meshData, setMeshData] = useState(null);
  const [parsingError, setParsingError] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Form Configuration State
  const [materialId, setMaterialId] = useState('pla');
  const [color, setColor] = useState('White');
  const [quality, setQuality] = useState('standard');
  const [infill, setInfill] = useState('20');
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Customer Contact State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteReferenceId, setQuoteReferenceId] = useState('');
  const [validationError, setValidationError] = useState('');

  const fileInputRef = useRef(null);

  const materials = siteConfig.printing?.materials || [];
  const currentMaterial =
    materials.find((m) => m.id === materialId) ||
    materials[0] || {
      id: 'pla',
      name: 'PLA (Polylactic Acid)',
      ratePerCm3: 6.0,
      density: 1.24,
      colorOptions: ['White', 'Black', 'Yellow', 'Orange', 'Red'],
    };

  // Sync color options when material changes
  useEffect(() => {
    if (currentMaterial?.colorOptions && !currentMaterial.colorOptions.includes(color)) {
      setColor(currentMaterial.colorOptions[0] || 'White');
    }
  }, [materialId, currentMaterial]);

  // Load sample STL model
  const loadSampleModel = () => {
    setIsParsing(true);
    setParsingError(null);
    try {
      const buffer = generateSampleCubeSTL(28); // 28mm cube
      const parsed = parseSTL(buffer);
      setMeshData(parsed);
      setFile(new Blob([buffer], { type: 'application/sla' }));
      setFileName('sample_calibration_cube_28mm.stl');
      setFileSize(buffer.byteLength);
    } catch (err) {
      setParsingError('Failed to load sample model: ' + err.message);
    } finally {
      setIsParsing(false);
    }
  };

  // Process uploaded STL file
  const processSTLFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith('.stl')) {
      setParsingError('Please select a valid .STL file format.');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileSize(selectedFile.size);
    setParsingError(null);
    setIsParsing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target.result;
        const parsed = parseSTL(buffer);
        setMeshData(parsed);
      } catch (err) {
        setParsingError(
          'Unable to parse STL file geometry. The file may be corrupted or non-standard.'
        );
        setMeshData(null);
      } finally {
        setIsParsing(false);
      }
    };

    reader.onerror = () => {
      setParsingError('Error reading file from disk.');
      setIsParsing(false);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processSTLFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSTLFile(e.dataTransfer.files[0]);
    }
  };

  // Robust Price Calculation Engine (No Express Dispatch)
  const calculateQuote = () => {
    const baseSetupFee = 100;
    const minOrderCharge = 150;
    const infillMultipliers = {
      '10': 0.75,
      '15': 0.85,
      '20': 0.90,
      '40': 1.10,
      '60': 1.30,
      '80': 1.55,
      '100': 1.80,
    };
    const qualityMultipliers = {
      draft: 0.85,
      standard: 1.0,
      high: 1.35,
    };

    // Effective volume (cm³)
    const baseVolume = meshData?.volumeCm3 || 22;
    const effectiveVolume = Math.max(1, Math.round(baseVolume * 10) / 10);

    const infillFactor = infillMultipliers[infill] || 1.0;
    const qualFactor = qualityMultipliers[quality] || 1.0;
    const materialCostPerCm3 = currentMaterial?.ratePerCm3 || 6.0;

    // Single item print cost
    const volumeCost = Math.round(effectiveVolume * materialCostPerCm3 * infillFactor * qualFactor);
    const singleItemCost = baseSetupFee + volumeCost;
    const subtotal = singleItemCost * Math.max(1, quantity);
    const total = Math.max(minOrderCharge, Math.round(subtotal));

    // Estimated filament weight in grams
    const density = currentMaterial?.density || 1.24;
    const estimatedWeightGrams = Math.round(
      effectiveVolume * density * (parseInt(infill, 10) / 100 + 0.25)
    );

    return {
      volumeCm3: effectiveVolume,
      weightGrams: estimatedWeightGrams,
      unitPrice: singleItemCost,
      baseSetupFee,
      volumeCost,
      rushFee: 0,
      totalPrice: total,
      leadTime: '2 to 4 Working Days',
    };
  };

  const quote = calculateQuote();

  const printingPhone = siteConfig.contact.printingPhone || '+91 9773842944';
  const printingWhatsapp = siteConfig.contact.printingWhatsapp || '919773842944';

  // Handle Form Submission
  const handleSubmitQuoteRequest = async (e) => {
    e.preventDefault();

    if (!file) {
      setValidationError('Please upload an STL file or click "Try Sample 3D Model".');
      return;
    }
    if (!customerName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setValidationError('Please enter a valid phone number (at least 10 digits).');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);
    const randomRef = 'SSVE-Q-' + Math.floor(10000 + Math.random() * 90000);
    setQuoteReferenceId(randomRef);

    // Transmit complete quote details, infill, parameters, price breakup, turnaround time & STL file to info@ssve.cc
    try {
      const formData = new FormData();
      formData.append(
        '_subject',
        `New 3D Print Quote Request [${randomRef}]: ${customerName.trim()} - ₹${quote.totalPrice}`
      );
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      // 1. Customer Contact Details
      formData.append('Reference ID', randomRef);
      formData.append('Customer Name', customerName.trim());
      formData.append('Contact Phone', customerPhone.trim());
      formData.append('Contact Email', customerEmail.trim());
      formData.append('Special Instructions', specialInstructions.trim() || 'None');

      // 2. 3D Print Parameters & Slicing Specifications
      formData.append('File Name', fileName || 'Uploaded_Model.stl');
      formData.append('File Size', `${(fileSize / 1024).toFixed(1)} KB`);
      formData.append(
        'Model Dimensions (X × Y × Z)',
        meshData
          ? `${meshData.dimensions.x} × ${meshData.dimensions.y} × ${meshData.dimensions.z} mm`
          : 'N/A'
      );
      formData.append('Calculated Volume', `${quote.volumeCm3} cm³`);
      formData.append('Estimated Filament Weight', `~${quote.weightGrams} grams`);
      formData.append('Material Selected', currentMaterial.name);
      formData.append('Filament Color', color);
      formData.append(
        'Print Quality (Layer Height)',
        quality === 'draft'
          ? 'Draft (0.28 mm)'
          : quality === 'high'
          ? 'High Detail (0.12 mm)'
          : 'Standard (0.20 mm)'
      );
      formData.append('Infill Density', `${infill}%`);
      formData.append('Quantity Ordered', `${quantity} unit(s)`);

      // 3. Pricing Breakup
      formData.append('Base Machine Setup Fee', `₹${quote.baseSetupFee}`);
      formData.append('Material & Volume Cost', `₹${quote.volumeCost}`);
      formData.append('Single Unit Price', `₹${quote.unitPrice}`);
      formData.append('Subtotal (Unit × Qty)', `₹${quote.unitPrice * quantity}`);
      formData.append('Total Estimated Price', `₹${quote.totalPrice}`);

      // 4. Estimated Turnaround Time
      formData.append('Estimated Turnaround Time', quote.leadTime);

      // 5. Uploaded STL File Attachment
      if (file) {
        formData.append('attachment', file, fileName || 'model.stl');
      }

      await fetch('https://formsubmit.co/ajax/info@ssve.cc', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    } catch (err) {
      console.warn('Quote email dispatch notice:', err);
      // Fallback: still show submission screen so customer has reference ID and can confirm via WhatsApp
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build WhatsApp message URL with comprehensive details
  const getWhatsAppUrl = () => {
    const qualityLabel =
      quality === 'draft'
        ? 'Draft (0.28 mm)'
        : quality === 'high'
        ? 'High Detail (0.12 mm)'
        : 'Standard (0.20 mm)';

    const text =
      `*3D Printing Quotation Request [${quoteReferenceId || 'NEW'}]*\n\n` +
      `👤 *Customer:* ${customerName || 'Customer'}\n` +
      `📞 *Phone:* ${customerPhone || 'Not provided'}\n` +
      `✉️ *Email:* ${customerEmail || 'Not provided'}\n\n` +
      `📁 *File:* ${fileName || 'STL Model'} (${(fileSize / 1024).toFixed(1)} KB)\n` +
      `📏 *Dimensions:* ${
        meshData
          ? `${meshData.dimensions.x} × ${meshData.dimensions.y} × ${meshData.dimensions.z} mm`
          : 'Standard'
      }\n` +
      `📦 *Calculated Volume:* ~${quote.volumeCm3} cm³\n` +
      `⚖️ *Approx. Filament Weight:* ~${quote.weightGrams} g\n` +
      `🧵 *Material:* ${currentMaterial.name}\n` +
      `🎨 *Color:* ${color}\n` +
      `⚙️ *Layer Height:* ${qualityLabel}\n` +
      `🧱 *Infill Density:* ${infill}%\n` +
      `🔢 *Quantity:* ${quantity} pcs\n` +
      `⏱️ *Turnaround Time:* ${quote.leadTime}\n\n` +
      `💵 *Pricing Breakup:*\n` +
      ` • Setup Fee: ₹${quote.baseSetupFee}\n` +
      ` • Material Cost: ₹${quote.volumeCost}\n` +
      ` • Unit Price: ₹${quote.unitPrice}\n` +
      `💰 *Estimated Total:* ₹${quote.totalPrice}\n\n` +
      `💬 *Special Notes:* ${specialInstructions || 'None'}`;

    return `https://wa.me/${printingWhatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#0c0806] text-slate-100 selection:bg-orange-500 selection:text-white relative overflow-hidden pb-16">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 relative z-10 space-y-8">
        {/* Page Title Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Calculator className="w-4 h-4 text-orange-400" />
            <span>Instant Slicing Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Instant 3D STL Quotation Calculator
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
            Upload your STL CAD file for automated 3D geometry analysis, volume calculation, and transparent pricing.
          </p>
        </div>

        {/* If Order Submitted Successfully */}
        {isSubmitted ? (
          <div className="bg-[#180f0a]/90 border border-orange-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-5 shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Quotation Request Dispatched
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Thank You, {customerName}!
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Your uploaded <strong>STL 3D model</strong>, slicing parameters, infill density, pricing breakup, and turnaround estimate have been sent to <strong className="text-orange-300">info@ssve.cc</strong>.
              </p>
              <div className="inline-block px-4 py-1.5 rounded-xl bg-orange-950/80 border border-orange-500/40 text-orange-300 font-mono text-sm font-bold mt-2">
                Reference ID: {quoteReferenceId}
              </div>
            </div>

            <div className="bg-[#24150e] rounded-2xl p-4 sm:p-5 border border-orange-900/60 text-left space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between border-b border-orange-950/80 pb-2">
                <span className="text-slate-400">STL Model File:</span>
                <span className="font-semibold text-white font-mono">{fileName} ({(fileSize / 1024).toFixed(1)} KB)</span>
              </div>
              <div className="flex justify-between border-b border-orange-950/80 pb-2">
                <span className="text-slate-400">Print Material & Infill:</span>
                <span className="font-semibold text-white font-mono">{currentMaterial.name} • {infill}% Infill</span>
              </div>
              <div className="flex justify-between border-b border-orange-950/80 pb-2">
                <span className="text-slate-400">Layer Quality & Color:</span>
                <span className="font-semibold text-white font-mono">
                  {quality === 'draft' ? 'Draft 0.28mm' : quality === 'high' ? 'High Detail 0.12mm' : 'Standard 0.20mm'} • {color}
                </span>
              </div>
              <div className="flex justify-between border-b border-orange-950/80 pb-2">
                <span className="text-slate-400">Model Dimensions:</span>
                <span className="font-semibold text-white font-mono">
                  {meshData ? `${meshData.dimensions.x} × ${meshData.dimensions.y} × ${meshData.dimensions.z} mm` : 'Standard'}
                </span>
              </div>
              <div className="flex justify-between border-b border-orange-950/80 pb-2">
                <span className="text-slate-400">Estimated Turnaround:</span>
                <span className="font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {quote.leadTime}
                </span>
              </div>
              <div className="flex justify-between border-b border-orange-950/80 pb-2">
                <span className="text-slate-400">Pricing Breakup:</span>
                <span className="font-semibold text-slate-200 font-mono">
                  ₹{quote.baseSetupFee} Setup + ₹{quote.volumeCost} Material = ₹{quote.unitPrice}/pc
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-bold text-white text-sm">Estimated Total ({quantity} {quantity === 1 ? 'unit' : 'units'}):</span>
                <span className="font-extrabold text-amber-400 text-base">₹{quote.totalPrice}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp: {printingPhone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFile(null);
                  setMeshData(null);
                  setFileName('');
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-sm transition"
              >
                Quote Another Model
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* COLUMN 1 (7 COLS): UPLOAD & PARAMETERS */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* File Upload Zone */}
              <div className="bg-[#180f0a]/90 rounded-3xl p-6 sm:p-8 border border-orange-500/20 shadow-xl space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg font-heading flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-orange-400" />
                    <span>Upload 3D STL File</span>
                  </h3>
                  <button
                    type="button"
                    onClick={loadSampleModel}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 underline underline-offset-4 flex items-center gap-1"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Try Sample 3D Model</span>
                  </button>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-orange-500 bg-orange-950/40 scale-[1.01]'
                      : file
                      ? 'border-emerald-500/60 bg-emerald-950/20'
                      : 'border-orange-900/60 hover:border-orange-500/50 bg-[#24150e]/50'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept=".stl"
                    className="hidden"
                  />

                  {file ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-white text-sm">{fileName}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        {(fileSize / 1024).toFixed(1)} KB • Click to replace file
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-orange-950/80 text-orange-400 border border-orange-500/40 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-white text-sm">
                        Click or drag & drop your STL file here
                      </div>
                      <div className="text-xs text-slate-400">
                        Supports standard binary and ASCII .STL files (Max 50MB)
                      </div>
                    </div>
                  )}
                </div>

                {/* Loading Indicator */}
                {isParsing && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-orange-950/60 border border-orange-500/30 text-orange-200 text-xs font-medium animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
                    <span>Analyzing STL geometry and computing surface volume...</span>
                  </div>
                )}

                {/* Error Banner */}
                {parsingError && (
                  <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>{parsingError}</div>
                  </div>
                )}

                {/* 3D Viewport */}
                {meshData && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-orange-300 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-orange-400" />
                        Interactive 3D Geometry Preview:
                      </span>
                      <span className="text-slate-400 font-mono">
                        {meshData.triangleCount?.toLocaleString()} Triangles
                      </span>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-orange-900/80 shadow-lg bg-[#120a06]">
                      <STLViewer meshData={meshData} color={color} />
                    </div>
                  </div>
                )}
              </div>

              {/* Manufacturing Options Form */}
              <div className="bg-[#180f0a]/90 rounded-3xl p-6 sm:p-8 border border-orange-500/20 shadow-xl space-y-5 backdrop-blur-md">
                <h3 className="font-bold text-white text-lg font-heading flex items-center gap-2 border-b border-orange-950/80 pb-3">
                  <Printer3DIcon className="w-5 h-5 text-orange-400" />
                  Print Parameters & Infill
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Material Selection (4 materials) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">
                      Filament Material <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={materialId}
                      onChange={(e) => setMaterialId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {materials.map((mat) => (
                        <option key={mat.id} value={mat.id}>
                          {mat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Color Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">
                      Color <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {currentMaterial?.colorOptions?.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Quality Tier */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">
                      Layer Quality <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="draft">Draft (0.28mm - Fast)</option>
                      <option value="standard">Standard (0.20mm)</option>
                      <option value="high">High Detail (0.12mm)</option>
                    </select>
                  </div>

                  {/* Infill Percentage */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">
                      Infill Density <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={infill}
                      onChange={(e) => setInfill(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="15">15% (Aesthetic / Display)</option>
                      <option value="20">20% (Standard Functional)</option>
                      <option value="40">40% (High Strength)</option>
                      <option value="60">60% (Heavy Duty Load)</option>
                      <option value="100">100% (Solid Structural)</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">
                      Quantity <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Customer Contact Fields */}
                <div className="space-y-3 pt-3 border-t border-orange-950/80">
                  <label className="text-xs font-bold text-white block">
                    Contact Details (For Quotation Confirmation)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Name *"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-500"
                    />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Phone / WhatsApp *"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-500"
                    />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#24150e] border border-orange-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2 (5 COLS): LIVE QUOTATION BREAKDOWN */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="bg-[#180f0a]/90 rounded-3xl p-6 sm:p-7 border border-orange-500/30 shadow-2xl relative overflow-hidden space-y-5 backdrop-blur-md">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-orange-950/80">
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest block">
                      Live Slicing Calculation
                    </span>
                    <h3 className="text-xl font-extrabold text-white font-heading">
                      Estimated Quotation
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-500/40 text-orange-400 flex items-center justify-center shadow-md">
                    <Calculator className="w-5 h-5" />
                  </div>
                </div>

                {/* Model & Geometry Metrics */}
                <div className="bg-[#24150e] rounded-2xl p-4 border border-orange-900/60 space-y-2 text-xs">
                  <div className="font-bold text-slate-300 mb-1 flex items-center justify-between">
                    <span>Model Specifications</span>
                    <span className="text-orange-400 font-medium">
                      {meshData ? 'Analyzed from STL' : 'Default / Estimation'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-orange-950/80">
                    <span className="text-slate-400">Bounding Dimensions:</span>
                    <span className="font-semibold text-white font-mono">
                      {meshData
                        ? `${meshData.dimensions.x} × ${meshData.dimensions.y} × ${meshData.dimensions.z} mm`
                        : '—'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-orange-950/80">
                    <span className="text-slate-400">Estimated Volume:</span>
                    <span className="font-semibold text-white font-mono">
                      ~{quote.volumeCm3} cm³
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-orange-950/80">
                    <span className="text-slate-400">Approx. Filament Weight:</span>
                    <span className="font-semibold text-white font-mono">
                      ~{quote.weightGrams} grams
                    </span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Estimated Turnaround:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {quote.leadTime}
                    </span>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 text-xs border-t border-orange-950/80 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Base Setup & Printer Preparation:</span>
                    <span className="font-medium text-white">₹{quote.baseSetupFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Material Slicing ({currentMaterial.name}):
                    </span>
                    <span className="font-medium text-white">₹{quote.volumeCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quantity Multiplier:</span>
                    <span className="font-medium text-white">× {quantity} units</span>
                  </div>
                </div>

                {/* Total Grand Highlight */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/80 to-amber-950/60 border border-orange-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-orange-300 uppercase tracking-wider block">
                      Estimated Total Price
                    </span>
                    <span className="text-xs text-slate-400">Taxes & packaging included</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white font-heading">
                      ₹{quote.totalPrice}
                    </span>
                  </div>
                </div>

                {/* Error Banner */}
                {validationError && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
                    {validationError}
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitQuoteRequest}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-orange-500/40 flex items-center justify-center gap-2 transition"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Uploading STL & Transmitting Quote...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Request for Confirmation</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp ({printingPhone})</span>
                  </a>
                </div>

                <div className="text-[11px] text-slate-400 text-center leading-relaxed">
                  * Estimated quote will be verified by our print lab before dispatch.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
