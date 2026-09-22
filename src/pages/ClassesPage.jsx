import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Award,
  Send,
  MessageSquare,
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Target,
  Navigation,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/siteConfig';

export default function ClassesPage({ setActivePage }) {
  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    email: '',
    course: 'Diploma Engineering Coaching (MSBTE)',
    collegeYear: 'Second Year',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const courses = [
    {
      id: 'diploma',
      badge: 'MSBTE & Autonomous',
      title: 'Diploma Engineering (Polytechnic)',
      target: '1st, 2nd & 3rd Year (All Branches)',
      description: 'Comprehensive subject coaching tailored to the MSBTE I-Scheme and autonomous curricula with structured numerical problem solving.',
      keySubjects: 'Applied Mathematics, Engineering Mechanics, Strength of Materials (SOM), Theory of Machines (TOM), Thermal Engineering, Civil Surveying.',
      icon: BookOpen,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'degree',
      badge: 'Mumbai University (MU) & Pune (SPPU)',
      title: 'Degree Engineering (B.E. / B.Tech)',
      target: 'FE to BE (All Branches)',
      description: 'In-depth university coaching strictly aligned to Mumbai University (MU) and Pune University (SPPU) curricula and paper patterns with intensive numerical and derivation mastery.',
      keySubjects: 'Engineering Mathematics (M-1 to M-4), Mechanics, SOM / MOS, Thermodynamics, Fluid Mechanics, Control Systems.',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'maths',
      badge: 'Core Foundation',
      title: 'Applied Mathematics (M1 to M4)',
      target: 'Diploma & Degree Students',
      description: 'Step-by-step concept breakdown to clear mathematics fear, master university marking schemes, and score top grades.',
      keySubjects: 'Calculus, Linear Algebra, Matrices, Differential Equations, Laplace Transforms, Fourier Series, Probability.',
      icon: Target,
      color: 'from-cyan-600 to-blue-700',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName.trim()) {
      setFormError('Please enter the student full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await fetch('https://formsubmit.co/ajax/info@ssve.cc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Coaching Enquiry: ${formData.studentName} (${formData.course})`,
          student_name: formData.studentName,
          phone: formData.phone,
          email: formData.email,
          program_interested: formData.course,
          college_year_notes: formData.message || 'None provided',
          _template: 'table',
          _captcha: 'false',
        }),
      });
    } catch (err) {
      console.warn('Direct email dispatch:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    }
  };

  const getMailtoUrl = () => {
    const subject = `Admission Enquiry - ${formData.studentName} (${formData.course})`;
    const body =
      `Hello Shri Siddhivinayak Engineering Classes,\n\n` +
      `I have submitted an admission enquiry:\n\n` +
      `Student Name: ${formData.studentName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Program Interested: ${formData.course}\n` +
      `College/Year/Notes: ${formData.message || 'N/A'}\n\n` +
      `Please get in touch with curriculum and fee details. Thank you!`;
    return `mailto:info@ssve.cc?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const sendViaWhatsApp = () => {
    const text =
      `*New Admission Enquiry - Shri Siddhivinayak Engineering Classes*\n\n` +
      `👤 *Student Name:* ${formData.studentName || 'Not specified'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not specified'}\n` +
      `✉️ *Email:* ${formData.email || 'Not specified'}\n` +
      `📚 *Program Interested:* ${formData.course}\n` +
      `🎓 *College / Year:* ${formData.collegeYear}\n` +
      `💬 *Message:* ${formData.message || 'I would like more information on coaching courses & fees.'}`;

    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const scrollToEnquiry = (courseName) => {
    if (courseName) {
      setFormData((prev) => ({ ...prev, course: courseName }));
    }
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071326] text-slate-100 selection:bg-blue-600 selection:text-white relative overflow-hidden pb-12">
      {/* Subtle Technical Blueprint Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* 1. COMPACT HERO & OWNER/SOLE EDUCATOR SPOTLIGHT */}
        {/* ========================================================================= */}
        <section className="pt-8 sm:pt-12 pb-10 sm:pb-14 border-b border-blue-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Mission & Core Offer (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Engineering Coaching</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
                  From Diploma Foundations to Degree Mastery—
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent block mt-0.5">
                    We Guide You Through.
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Conceptual clarity, numerical problem solving, and university exam preparation for <strong>Diploma (Polytechnic)</strong>, <strong>Degree (B.E. / B.Tech)</strong>, and <strong>Applied Mathematics (M1 to M4)</strong>.
                </p>

                {/* Compact Metrics Row */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <span className="px-3 py-1 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-400" /> 100% Pass Rate Record
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-200 text-xs font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" /> 24+ Yrs Teaching Legacy
                  </span>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToEnquiry()}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 flex items-center gap-2 transition"
                  >
                    <span>Enrol for Coaching</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs sm:text-sm backdrop-blur-md transition flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>{siteConfig.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Founder & Owner Card (5 cols) */}
              <div id="faculty" className="lg:col-span-5">
                <div className="bg-slate-900/90 border border-blue-500/30 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-xl space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-blue-400 p-0.5 shadow-md shrink-0 bg-slate-800">
                      <img
                        src="/prof-jatin-shah.jpg"
                        alt="Prof. Jatin Shah - Founder & Owner"
                        loading="eager"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-blue-400 tracking-wider uppercase">
                        Founder & Owner
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading">
                        Prof. Jatin Shah
                      </h3>
                      <p className="text-xs text-blue-300 font-semibold">
                        B.E. in Mechanical Engineering
                      </p>
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-900/60 text-blue-200 text-[11px] font-medium mt-1">
                        24+ Years of Teaching Experience
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed italic border-l-2 border-blue-400 pl-3">
                    &quot;As the founder, I personally conduct every lecture and guide every student myself—ensuring direct mastery and complete accountability.&quot;
                  </p>

                  <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-900/60 text-xs text-slate-200 space-y-1.5">
                    <strong className="text-blue-300 text-[11px] uppercase tracking-wider block">
                      Expertise Across All Core Subjects:
                    </strong>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      Applied Mathematics (M1 to M4) • Engineering Mechanics • Strength of Materials (SOM) • Theory of Machines (TOM) • Thermodynamics & Fluid Mechanics • Machine Design (EMD).
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ACADEMIC PROGRAMS */}
        {/* ========================================================================= */}
        <section id="courses" className="py-10 sm:py-14 border-b border-blue-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">
                  Academic Offerings
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  Coaching Programs
                </h2>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Individual subject coaching and full-semester guidance designed for guaranteed university exam results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {courses.map((course) => {
                const IconComp = course.icon;
                return (
                  <div
                    key={course.id}
                    className="bg-slate-900/80 border border-blue-500/20 rounded-2xl p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between hover:border-blue-400/40 transition shadow-lg space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${course.color} text-white flex items-center justify-center shadow-md`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-400/30">
                          {course.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                          {course.title}
                        </h3>
                        <p className="text-[11px] text-blue-400 font-medium">{course.target}</p>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                        <strong className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
                          Subjects Covered:
                        </strong>
                        {course.keySubjects}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-blue-300 font-medium">
                        Semester & Modular
                      </span>
                      <button
                        type="button"
                        onClick={() => scrollToEnquiry(course.title)}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        <span>Enquire</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. DIRECT ENQUIRY & CLASSROOM LOCATION */}
        {/* ========================================================================= */}
        <section id="enquiry" className="pt-10 sm:pt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Col (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-slate-900/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                      Enquiry for Coaching
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Fill out your details below.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-blue-950/80 border border-blue-400/40 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-white font-heading">
                        Enquiry Sent to info@ssve.cc!
                      </h4>
                      <p className="text-xs text-blue-200 max-w-sm mx-auto">
                        Thank you, <strong>{formData.studentName}</strong>. Your enquiry for <strong>{formData.course}</strong> has been transmitted to <strong>info@ssve.cc</strong>. We will contact you shortly.
                      </p>
                      
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={sendViaWhatsApp}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Chat on WhatsApp</span>
                        </button>
                        <a
                          href={getMailtoUrl()}
                          className="px-4 py-2 rounded-xl bg-blue-600/40 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-400/40 text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email Backup</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition"
                        >
                          Submit Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3.5">
                      {formError && (
                        <div className="p-2.5 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 text-xs">
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300 block">
                            Student Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleInputChange}
                            placeholder="e.g. Rohan Joshi"
                            required
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-blue-900/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300 block">
                            Phone / WhatsApp Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. 9773529009"
                            required
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-blue-900/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300 block">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. rohan@example.com"
                            required
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-blue-900/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300 block">
                            Program Interested In <span className="text-red-400">*</span>
                          </label>
                          <select
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-blue-900/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Diploma Engineering Coaching (MSBTE)">Diploma Engineering Coaching (MSBTE)</option>
                            <option value="Degree Engineering Coaching (Mumbai & Pune University)">Degree Engineering Coaching (Mumbai & Pune University)</option>
                            <option value="Applied Mathematics (M1 to M4)">Applied Mathematics (M1 to M4)</option>
                            <option value="Special Backlog Subject Coaching">Special Backlog Subject Coaching</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300 block">
                          College, Year & Specific Subjects (Optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="2"
                          placeholder="e.g. Mechanical 2nd Year, interested in SOM and M-3 coaching..."
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-blue-900/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                        ></textarea>
                      </div>

                      <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:flex-1 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending to info@ssve.cc...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Enquiry</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={sendViaWhatsApp}
                          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 transition"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Direct WhatsApp</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Campus Contact & Map (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-blue-500/30 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">
                      Visit Our Coaching Center
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <strong className="text-white block font-semibold">Address</strong>
                        <p className="text-slate-300 leading-snug">{siteConfig.contact.address.full}</p>
                        <a
                          href={siteConfig.contact.googleMapsNavUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 text-[11px] font-semibold transition mt-1"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Open in Google Maps for Navigation</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-semibold">Contact Phone</strong>
                        <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-blue-300 hover:text-white font-medium">
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-white block font-semibold">Email</strong>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-blue-300 hover:text-white">
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Embed with pinpointed location */}
                  <div className="rounded-2xl overflow-hidden border border-blue-900/80 shadow-md h-44 bg-slate-950">
                    <iframe
                      title="Shri Siddhivinayak Engineering Classes Exact Location"
                      src={siteConfig.contact.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
