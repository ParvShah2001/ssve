/**
 * ==============================================================================
 * CENTRAL CONFIGURATION & CONTENT FILE
 * Shri Siddhivinayak Engineering Classes & 3D Printing Service
 * ==============================================================================
 * 
 * Edit business details, courses, 3D printing materials, pricing formulas,
 * testimonials, and FAQs directly in this file. Changes will automatically reflect
 * across all pages of the website.
 */

export const siteConfig = {
  // Brand & Business Details
  brand: {
    shortName: "SS",
    brandName: "Shri Siddhivinayak",
    classesName: "Shri Siddhivinayak Engineering Classes",
    printingName: "Shri Siddhivinayak 3D Printing Service",
    tagline: "Learn Engineering. Create in 3D.",
    description:
      "Empowering aspiring engineers with conceptual mastery, exam success, and turning design ideas into precision physical prototypes with cutting-edge 3D printing.",
    establishedYear: "2018",
  },

  // Contact Information
  contact: {
    classesPhone: "+91 9773529009",
    classesPhoneRaw: "919773529009",
    printingPhone: "+91 9773842944",
    printingPhoneRaw: "919773842944",
    phone: "+91 9773529009",
    phoneRaw: "919773529009",
    whatsappNumber: "919773529009",
    printingWhatsapp: "919773842944",
    email: "info@ssve.cc",
    supportEmail: "info@ssve.cc",
    address: {
      line1: "Shop no.23, Jimmy Tower, inside Balaji Optics",
      line2: "Near Gyan Vikas Road, Sector 18",
      landmark: "Inside Balaji Optics",
      city: "Kopar Khairane, Navi Mumbai",
      state: "Maharashtra",
      pincode: "400709",
      country: "India",
      full: "Shop no.23, Jimmy Tower, inside Balaji Optics, near Gyan Vikas Road, Sector 18, Kopar Khairane, Navi Mumbai, Maharashtra 400709, India",
    },
    workingHours: {
      weekdays: "Monday - Saturday: 8:00 AM - 8:30 PM",
      weekends: "Sunday: 9:00 AM - 4:00 PM (Consultations & Enquiries)",
    },
    coordinates: {
      lat: 19.10355429206156,
      lng: 73.00095410386118,
      string: "19.10355429206156, 73.00095410386118",
    },
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=19.10355429206156,73.00095410386118&t=&z=18&ie=UTF8&iwloc=&output=embed",
    googleMapsNavUrl:
      "https://www.google.com/maps/dir/?api=1&destination=19.10355429206156,73.00095410386118",
    social: {
      whatsapp: "https://wa.me/919773529009",
      instagram: "https://instagram.com/placeholder",
      youtube: "https://youtube.com/placeholder",
      linkedin: "https://linkedin.com/company/placeholder",
    },
  },

  // Key Statistics
  stats: [
    { value: "1,800+", label: "Students Coached", icon: "GraduationCap" },
    { value: "3,500+", label: "3D Parts Printed", icon: "Printer" },
    { value: "100%", label: "Course Pass Rate", icon: "Award" },
    { value: "0.3 mm", label: "Print Precision", icon: "Target" },
  ],

  // Why Choose Us Points
  whyChooseUs: [
    {
      id: "expert-faculty",
      title: "Expert Faculty Guidance",
      description:
        "Learn from seasoned M.Tech & industry-experienced mentors who break complex engineering concepts into intuitive, easy-to-understand lessons.",
      icon: "UserCheck",
      category: "Classes",
    },
    {
      id: "practical-learning",
      title: "Practical & Concept-Oriented",
      description:
        "We move beyond rote memorization. Students benefit from real-life CAD modeling, physical 3D demonstrations, and hands-on lab sessions.",
      icon: "Cpu",
      category: "Classes",
    },
    {
      id: "industrial-grade-printing",
      title: "High-Precision 3D Printing",
      description:
        "Equipped with calibrated FDM and SLA Resin 3D printers producing tight tolerances, smooth surface finishes, and strong functional assemblies.",
      icon: "Layers",
      category: "3D Printing",
    },
    {
      id: "rapid-turnaround",
      title: "Fast Turnaround & Express Mode",
      description:
        "Same-day evaluation and 24 to 48-hour express dispatch for urgent college submissions, prototype iterations, and competitions.",
      icon: "Zap",
      category: "3D Printing",
    },
    {
      id: "affordable-pricing",
      title: "Affordable Student & Maker Rates",
      description:
        "Transparent, volume-based pricing designed to be pocket-friendly for students, startups, hobbyists, and local manufacturers.",
      icon: "Coins",
      category: "Both",
    },
    {
      id: "dedicated-support",
      title: "Direct One-on-One Support",
      description:
        "Personalized doubt clearing for academic students, plus complimentary CAD printability reviews and slicing advice for makers.",
      icon: "HeartHandshake",
      category: "Both",
    },
  ],

  // ============================================================================
  // ENGINEERING CLASSES DATA
  // ============================================================================
  classes: {
    heroBadge: "Admissions Open for New Batches",
    headline: "Master Engineering Fundamentals & Score Top Grades",
    subheadline:
      "Comprehensive coaching for Diploma (Polytechnic), Degree (B.E. / B.Tech), Applied Sciences, CAD software, and Competitive Technical Exams.",
    teachingApproach: [
      {
        title: "Conceptual Clarity First",
        description:
          "Every theoretical law is explained with physical intuition, numerical derivations, and real-world engineering applications.",
      },
      {
        title: "Exam-Oriented Problem Solving",
        description:
          "Targeted question banks, previous 10-year university question paper solutions, and step-by-step marking scheme training.",
      },
      {
        title: "Small Batch Sizes",
        description:
          "Strict limit of 20 to 25 students per batch ensures personal attention, tailored pace, and individual doubt clearance.",
      },
      {
        title: "Subject-wise Mock Exams",
        description:
          "Regular subject-wise mock exams simulated under university conditions with detailed written answer appraisals and step-by-step marking scheme training.",
      },
    ],
    facilities: [
      { title: "Air-Conditioned Modern Classrooms", icon: "Sparkles" },
      { title: "Dedicated Doubt-Solving & Study Hall", icon: "BookOpen" },
      { title: "Physical 3D Demonstration Models", icon: "Box" },
      { title: "Comprehensive Printed Study Material", icon: "BookOpen" },
      { title: "Digital Doubt Solving & WhatsApp Support", icon: "MessageSquare" },
      { title: "Recorded Revision Lectures Backup", icon: "Video" },
    ],
    faculty: [
      {
        name: "Prof. Jatin Shah",
        qualification: "B.E. in Mechanical Engineering",
        experience: "24+ Years of Teaching Experience",
        specialization:
          "Expertise in All Subjects: Applied Mathematics (M1 to M4), Engineering Mechanics, Strength of Materials (SOM), Theory of Machines (TOM), Thermodynamics, Fluid Mechanics, Machine Design",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      },
    ],
    courses: [
      {
        id: "diploma-coaching",
        title: "Diploma (Polytechnic) Coaching",
        badge: "Most Popular",
        targetAudience: "First, Second & Third Year Diploma Students (MSBTE & Equivalent)",
        description:
          "Specialized subject-wise and semester coaching covering all foundational and core branch subjects with simplified notes and guaranteed results.",
        subjects: [
          "Applied Mathematics (Basic & Advanced)",
          "Applied Mechanics & Strength of Materials",
          "Basic Electrical & Electronics",
          "Thermal Engineering & Fluid Mechanics",
          "Theory of Machines & Elements of Machine Design",
          "Civil Surveying & Concrete Technology",
        ],
        duration: "Full Semester (4 - 5 Months)",
      },
      {
        id: "degree-engineering",
        title: "Degree (B.E. / B.Tech) Coaching",
        badge: "High Scoring",
        targetAudience: "FE (First Year) to TE/BE Mechanical, Civil, Computer, IT, ENTC",
        description:
          "In-depth subject guidance strictly aligned to Mumbai University (MU) and Pune University (SPPU) syllabi and paper patterns.",
        subjects: [
          "Engineering Mathematics (M-1, M-2, M-3)",
          "Engineering Mechanics & Graphics",
          "Strength of Materials / Mechanics of Solids",
          "Thermodynamics & Heat Transfer",
          "Data Structures & Algorithms Basics",
          "Control Systems & Network Theory",
        ],
        duration: "Semester-wise / Subject-wise",
      },
      {
        id: "applied-maths",
        title: "Applied Mathematics & Sciences",
        badge: "Core Mastery",
        targetAudience: "Students needing strong foundation in M1, M2, M3, M4",
        description:
          "Clear your fear of calculus, linear algebra, differential equations, Fourier transforms, and numerical methods with step-by-step guidance.",
        subjects: [
          "Differential & Integral Calculus",
          "Linear Algebra & Matrix Operations",
          "Differential Equations & Laplace Transforms",
          "Complex Variables & Probability Distributions",
          "Numerical Techniques & Statistical Methods",
        ],
        duration: "3 Months Intensive",
      },
      {
        id: "competitive-exams",
        title: "Competitive Exam Preparation",
        badge: "Career Focused",
        targetAudience: "GATE Aspirants, Mahatransco, WRD, PWD, Technical PSC Exams",
        description:
          "Structured syllabus coverage, formula quick-reference sheets, numerical trick workshops, and timed mock tests to secure high ranks.",
        subjects: [
          "Core Technical Subjects (Mechanical / Civil)",
          "Engineering Mathematics & General Aptitude",
          "Previous Year Questions (PYQ) Speed Drills",
          "Mock Test Series with All-India Rank Benchmark",
        ],
        duration: "6 - 12 Months",
      },
    ],
  },

  // ============================================================================
  // 3D PRINTING SERVICE DATA
  // ============================================================================
  printing: {
    heroBadge: "Precision Additive Manufacturing",
    headline: "Turn Your 3D CAD Models into High-Quality Physical Reality",
    subheadline:
      "Rapid prototyping, engineering final-year projects, architectural models, custom enclosures, replacement parts, and low-volume batch production.",
    capabilities: [
      {
        title: "Rapid Prototyping",
        description: "Test form, fit, and ergonomic design within 24 hours before expensive tooling or production.",
        icon: "Cpu",
      },
      {
        title: "Student & College Projects",
        description: "Special discounted rates for engineering capstone projects, robotics mechanisms, and scale models.",
        icon: "GraduationCap",
      },
      {
        title: "Functional Mechanical Parts",
        description: "Gears, pulleys, brackets, jigs, and fixtures printed with durable PETG, ABS, and Carbon Fiber PLA.",
        icon: "Settings",
      },
      {
        title: "Custom Enclosures & Casings",
        description: "Tailored PCB housings, IoT device boxes, sensor brackets, and drone components with exact snap-fits.",
        icon: "Box",
      },
      {
        title: "Architectural & Scale Models",
        description: "High-precision miniature models for architects, interior designers, civil projects, and presentations.",
        icon: "Building",
      },
      {
        title: "Low-Volume Batch Production",
        description: "Produce 10 to 500 units affordably without requiring injection molds or tooling setup charges.",
        icon: "Layers",
      },
    ],
    techSpecs: {
      maxBuildVolume: "300 × 300 × 400 mm (Larger parts assembled seamlessly)",
      minLayerResolution: "0.05 mm (50 microns SLA) / 0.12 mm (FDM)",
      dimensionalAccuracy: "± 0.2 mm or 0.2%",
      supportedFileFormats: ".STL (Preferred), .OBJ, .STEP, .3MF",
      standardTurnaround: "3 - 5 Working Days",
      expressTurnaround: "24 - 48 Hours",
    },
    qualityPresets: [
      {
        id: "draft",
        name: "Draft (0.28 mm)",
        layerHeight: "0.28 mm",
        speed: "Fastest",
        description: "Ideal for initial concept checks, sizing tests, and non-cosmetic prototypes where speed is priority.",
        multiplier: 0.85,
      },
      {
        id: "standard",
        name: "Standard (0.20 mm)",
        layerHeight: "0.20 mm",
        speed: "Balanced",
        description: "Optimal balance of clean visual surface finish, strength, and affordable cost. Recommended for most projects.",
        multiplier: 1.0,
      },
      {
        id: "high",
        name: "High Detail (0.12 mm)",
        layerHeight: "0.12 mm",
        speed: "Fine Quality",
        description: "Smooth layer lines, crisp edges, and excellent mechanical mating for display models and customer presentations.",
        multiplier: 1.35,
      },
    ],
    materials: [
      {
        id: "pla",
        name: "PLA (Polylactic Acid)",
        type: "FDM Thermoplastic",
        finish: "Smooth Satin",
        ratePerCm3: 6.0,
        density: 1.24,
        tensileStrength: "55 MPa",
        heatResistance: "55°C",
        printTemp: "190 - 220°C",
        bestFor: "School science models, college presentation prototypes, hobbyist project enclosures, display figurines, fit-check test parts.",
        colorOptions: ["White", "Black", "Yellow", "Orange", "Red"],
        description: "Easy-to-print, biodegradable polymer offering sharp dimensional accuracy and vibrant surface finish for non-high-heat models.",
      },
      {
        id: "petg",
        name: "PETG (Polyethylene Terephthalate)",
        type: "FDM Tough Thermoplastic",
        finish: "Glossy & Impact Tough",
        ratePerCm3: 8.0,
        density: 1.27,
        tensileStrength: "48 MPa",
        heatResistance: "75°C",
        printTemp: "230 - 250°C",
        bestFor: "Functional mechanical brackets, robotics mechanism parts, RC drone arm mounts, snap-fit project boxes, college engineering models.",
        colorOptions: ["White", "Black", "Yellow", "Orange", "Red"],
        description: "Combines the ease of PLA with high impact resistance, chemical resistance, and weather durability for functional parts.",
      },
      {
        id: "tpu",
        name: "TPU 95A (Thermoplastic Polyurethane)",
        type: "Flexible Elastomer",
        finish: "Textured Flexible Rubber",
        ratePerCm3: 12.0,
        density: 1.21,
        tensileStrength: "35 MPa (~450% Elongation)",
        heatResistance: "65°C",
        printTemp: "210 - 230°C",
        bestFor: "Flexible phone covers, drone bumper feet, shock-absorbing motor gaskets, protective caps, flexible grips & vibration dampers.",
        colorOptions: ["White", "Black", "Yellow", "Orange", "Red"],
        description: "Rubber-like flexibility and extraordinary tear strength, allowing parts to bend, compress, and withstand repeated impact.",
      },
      {
        id: "pva",
        name: "PVA (Polyvinyl Alcohol)",
        type: "Water-Soluble Support",
        finish: "Water-Soluble Support",
        ratePerCm3: 15.0,
        density: 1.22,
        tensileStrength: "28 MPa",
        heatResistance: "55°C",
        printTemp: "190 - 215°C",
        bestFor: "Water-soluble support material for complex overhangs, internal cavities, and intricate college engineering mechanisms.",
        colorOptions: ["Natural White"],
        description: "Specialized filament that completely dissolves in water, leaving ultra-clean overhangs and hollow structures without scar marks.",
      },
    ],
    gallery: [
      {
        id: "gal-1",
        title: "Planetary Gearbox Mechanism",
        category: "Mechanical",
        material: "PETG / PLA",
        description: "Fully working dual-stage planetary gear system printed in one assembly for a robotics student project.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "gal-2",
        title: "Custom IoT Weather Station Enclosure",
        category: "Enclosures",
        material: "ABS Black",
        description: "Weather-resistant custom casing with o-ring groove and snap-lock battery lid.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "gal-3",
        title: "Architectural Multi-Storey Model",
        category: "Architecture",
        material: "PLA White & Grey",
        description: "1:150 scale architectural building model demonstrating floor layouts for a builder presentation.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "gal-4",
        title: "Drone Quadcopter Airframe",
        category: "Robotics",
        material: "Carbon Fiber PLA",
        description: "Lightweight, ultra-rigid chassis designed for aerodynamic flight tests in college competitions.",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "gal-5",
        title: "High-Detail Character Miniature",
        category: "Art & Miniatures",
        material: "SLA UV Resin",
        description: "50-micron layer height resin print with flawless facial micro-details and clean overhangs.",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "gal-6",
        title: "Vibration Isolator & Damper Feet",
        category: "Industrial",
        material: "TPU 95A Flexible",
        description: "Custom shock absorption grommets designed for laboratory testing equipment.",
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600",
      },
    ],
  },

  // ============================================================================
  // QUOTATION CALCULATION LOGIC & CONSTANTS
  // ============================================================================
  pricingEngine: {
    baseSetupFee: 100, // Fixed setup & printer preparation fee in INR
    minOrderCharge: 150, // Minimum order charge
    ratePerCm3: 6.0,
    infillMultipliers: {
      "10": 0.75,
      "20": 0.90,
      "40": 1.10,
      "60": 1.30,
      "80": 1.55,
      "100": 1.80,
    },
    infillMultiplier: {
      "10": 0.75,
      "20": 0.90,
      "40": 1.10,
      "60": 1.30,
      "80": 1.55,
      "100": 1.80,
    },
    qualityMultiplier: {
      draft: 0.85,
      standard: 1.0,
      high: 1.35,
    },
    turnaroundDays: {
      standard: "2 to 4 business days",
    },
    disclaimer:
      "Estimated Quote — final price will be confirmed by our lab based on geometry verification and support needs.",
  },

  // ============================================================================
  // TESTIMONIALS
  // ============================================================================
  testimonials: [
    {
      id: "test-1",
      name: "Rohan Patil",
      role: "Mechanical Engineering Student (B.E.)",
      type: "Classes & 3D Print",
      content:
        "The coaching for Engineering Mechanics and Strength of Materials at Shri Siddhivinayak transformed my score from struggling to an 'A' grade. Plus, we got our entire final-year robotic gripper 3D printed here with rapid turnaround. Highly recommended!",
      rating: 5,
    },
    {
      id: "test-2",
      name: "Sneha Kulkarni",
      role: "Diploma in Civil Engineering",
      type: "Classes",
      content:
        "Applied Mathematics used to be my biggest hurdle. Prof. Joshi's clear step-by-step shortcuts and practice problem banks made it super easy to understand. Best coaching institute in the area!",
      rating: 5,
    },
    {
      id: "test-3",
      name: "Vikramaditya Shinde",
      role: "Hardware Startup Founder & Maker",
      type: "3D Printing Service",
      content:
        "We needed 15 custom PETG sensor housings in 48 hours for a client demo. The team inspected our CAD file, pointed out an orientation tip to save support material, and delivered the prints on time with stellar accuracy.",
      rating: 5,
    },
    {
      id: "test-4",
      name: "Pooja Deshpande",
      role: "Architecture Student",
      type: "3D Printing Service",
      content:
        "The 3D printed scale model for my design dissertation was breathtaking. Every balcony, pillar, and intricate roof lattice was captured precisely. Very reasonable rates for students.",
      rating: 5,
    },
  ],

  // ============================================================================
  // ABOUT US INFORMATION
  // ============================================================================
  about: {
    mission:
      "To empower every engineering student with rock-solid conceptual mastery and provide creators, students, and engineers with accessible, industrial-standard 3D printing fabrication.",
    vision:
      "To be the premier regional hub where academic excellence meets modern digital manufacturing, turning theoretical knowledge into tangible physical innovation.",
    values: [
      {
        title: "Excellence in Learning",
        description: "We prioritize conceptual depth over surface-level memorization, creating lifelong engineering intuition.",
        icon: "BookOpen",
      },
      {
        title: "Engineering Precision",
        description: "From mathematical proofs to micron-accurate 3D printer calibration, quality is non-negotiable.",
        icon: "Target",
      },
      {
        title: "Student-First Affordability",
        description: "Making premium coaching and modern additive manufacturing accessible to every student and aspiring maker.",
        icon: "BadgePercent",
      },
      {
        title: "Innovation & Practicality",
        description: "Fostering hands-on curiosity by letting students witness their digital CAD blueprints physically built.",
        icon: "Lightbulb",
      },
      {
        title: "Transparent & Friendly Support",
        description: "Genuine mentorship, honest printability feedback, and dedicated assistance before and after class/orders.",
        icon: "ShieldCheck",
      },
    ],
  },

  // Frequently Asked Questions
  faqs: [
    {
      q: "How does the combination of Engineering Classes and 3D Printing help students?",
      a: "Students learning CAD and machine design can physically touch and inspect the parts they model. Seeing tolerances, fits, and structural strengths in 3D prints bridges the gap between textbook equations and actual manufacturing.",
    },
    {
      q: "What 3D file formats do you accept for quotation?",
      a: "Our automatic quotation engine currently accepts .STL files. For special inquiries, you can also send .OBJ, .STEP, or .3MF files via our quotation form or directly over WhatsApp.",
    },
    {
      q: "Are demo classes available before enrolling in courses?",
      a: "Yes! We offer 2 free trial/demo lectures for all diploma, degree, and mathematics batches so students can experience our teaching methodology firsthand.",
    },
    {
      q: "What is your typical turnaround time for 3D printing?",
      a: "Standard turnaround is 3 to 5 business days. We also offer an Express service with 24 to 48-hour delivery for urgent college submissions and prototype deadlines.",
    },
    {
      q: "Can I get assistance if my 3D CAD model has errors or fails slicing?",
      a: "Absolutely. Our in-house CAD experts inspect every file for non-manifold edges, thin walls, and unsupported overhangs, and provide advice or minor repairs before printing.",
    },
    {
      q: "Where are you located and how do I reach you?",
      a: "We are centrally located opposite the Engineering Campus on Station Road, Pune. Full address and interactive map directions are available on our Contact page.",
    },
  ],
};
