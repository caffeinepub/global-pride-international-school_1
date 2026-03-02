import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BookOpen,
  Bus,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  FlaskConical,
  GraduationCap,
  Heart,
  Loader2,
  MapPin,
  Menu,
  Monitor,
  Music,
  Phone,
  Shield,
  Star,
  Users,
  X,
  ZoomIn,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { useActor } from "./hooks/useActor";

/* ── Image arrays ─────────────────────────────────────── */
const ALL_IMAGES = [
  { src: "/assets/uploads/image-1.png", alt: "School Building" },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-1--2.jpeg",
    alt: "Student Activity",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.49-AM-3.jpeg",
    alt: "Computer Lab Girls",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.58-AM-2--4.jpeg",
    alt: "Student with Plane Model",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.58.39-AM-5.jpeg",
    alt: "Principal / Director",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-6.jpeg",
    alt: "Computer Lab Boys",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.58-AM-1--7.jpeg",
    alt: "Pilot Costume Kid",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-2--8.jpeg",
    alt: "Art & Painting Activity",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.55-AM-2--9.jpeg",
    alt: "Classroom Reading",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-2--10.jpeg",
    alt: "Science Lab Girls",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.55-AM-1--11.jpeg",
    alt: "Toddler with Blocks",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.53-AM-12.jpeg",
    alt: "Classroom Students",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.51-AM-13.jpeg",
    alt: "Young Student with Books",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.47-AM-14.jpeg",
    alt: "Science Experiment Boy",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.54-AM-3--15.jpeg",
    alt: "Toddler Painting",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.58.30-AM-16.jpeg",
    alt: "Staff Group Photo",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-17.jpeg",
    alt: "Investiture Ceremony",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.54-AM-2--18.jpeg",
    alt: "Student with Mic – Republic Day",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-1--19.jpeg",
    alt: "Director with Students",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.54-AM-1--20.jpeg",
    alt: "Republic Day Celebration Dance",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-1-1-21.jpeg",
    alt: "Student Activity",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.54-AM-22.jpeg",
    alt: "Cultural Dance Performance",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.49-AM-1-23.jpeg",
    alt: "Computer Lab",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.58-AM-2-1-24.jpeg",
    alt: "Student with Plane Model",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.58-AM-1-1-25.jpeg",
    alt: "Pilot Costume",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.58.39-AM-1-26.jpeg",
    alt: "Principal",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-2-1-27.jpeg",
    alt: "Art Activity",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.55-AM-1-1-28.jpeg",
    alt: "Toddler with Blocks",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-2-1-29.jpeg",
    alt: "Science Lab",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-1-30.jpeg",
    alt: "Student Activity",
  },
];

/* ── Intersection Observer Hook ──────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ── FadeIn Wrapper ───────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`section-fade ${inView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Lightbox ─────────────────────────────────────────── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <button
        type="button"
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
      <button
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div
        className="max-w-5xl max-h-[90vh] w-full mx-8"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-contain max-h-[85vh] rounded-lg shadow-2xl"
        />
        <p className="text-white/70 text-center mt-3 text-sm">
          {images[currentIndex].alt} — {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

/* ── Admin Router ─────────────────────────────────────── */
function AdminRouter({ onGoHome }: { onGoHome: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("gpis_admin_auth") === "true",
  );

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={() => setIsAuthenticated(true)}
        onGoHome={onGoHome}
      />
    );
  }
  return (
    <AdminDashboard
      onLogout={() => {
        setIsAuthenticated(false);
      }}
      onGoHome={onGoHome}
    />
  );
}

/* ── Main App ─────────────────────────────────────────── */
export default function App() {
  // Admin panel route check — supports both /admin path and #admin hash
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") return "main";
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.startsWith("/admin") || hash === "#admin") return "admin";
    return "main";
  });

  // Listen for hash changes
  useEffect(() => {
    const handler = () => {
      if (window.location.hash === "#admin") {
        setRoute("admin");
      } else if (
        window.location.hash === "#main" ||
        window.location.hash === ""
      ) {
        setRoute("main");
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (route === "admin") {
    return (
      <>
        <Toaster position="top-right" />
        <AdminRouter
          onGoHome={() => {
            window.location.hash = "";
            setRoute("main");
          }}
        />
      </>
    );
  }

  return <MainWebsite />;
}

/* ── Main Website ─────────────────────────────────────── */
function MainWebsite() {
  const { actor, isFetching: actorLoading } = useActor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    contactNumber: "",
    gradeApplying: "",
    message: "",
  });

  // Scroll spy
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "programs",
      "facilities",
      "gallery",
      "admissions",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gradeApplying) {
      toast.error("Please select a grade");
      return;
    }
    if (!actor) {
      toast.error(
        "Connection to server failed. Please refresh the page and try again.",
      );
      return;
    }
    setSubmitting(true);
    try {
      await actor.submitEnquiry(
        formData.studentName,
        formData.parentName,
        formData.contactNumber,
        formData.gradeApplying,
        formData.message,
      );
      setSubmitted(true);
      toast.success("Enquiry submitted successfully! We'll contact you soon.");
      setFormData({
        studentName: "",
        parentName: "",
        contactNumber: "",
        gradeApplying: "",
        message: "",
      });
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "programs", label: "Programs" },
    { id: "facilities", label: "Facilities" },
    { id: "gallery", label: "Gallery" },
    { id: "admissions", label: "Admissions" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="font-body min-h-screen">
      <Toaster position="top-right" />

      {/* ── Admission Banner ──────────────────────────────── */}
      <div className="admission-banner py-2 px-4 text-center text-school-dark font-display font-bold text-sm md:text-base tracking-wide shadow-md relative z-50">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Star className="w-4 h-4 fill-current" />🎓 Admissions Open 2026–2027
          &nbsp;|&nbsp; Enroll Now – Hurry Up! Limited Seats Available
          <Star className="w-4 h-4 fill-current" />
        </span>
      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-school-green/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + Name */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group"
            aria-label="Go to Home"
          >
            <img
              src="/assets/uploads/image-1.png"
              alt="Global Pride International School Logo"
              className="w-10 h-10 object-contain rounded-full border-2 border-school-gold shadow-sm"
            />
            <div className="text-left">
              <div className="font-display font-bold text-school-green text-sm md:text-base leading-tight">
                Global Pride
              </div>
              <div className="font-display font-semibold text-school-gold text-[10px] md:text-xs leading-tight tracking-wide uppercase">
                International School
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`nav-link font-body font-semibold text-sm transition-colors ${
                    activeSection === link.id
                      ? "text-school-green active"
                      : "text-foreground/70 hover:text-school-green"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => scrollTo("admissions")}
              className="hidden md:inline-flex bg-school-green hover:bg-school-green/90 text-white font-display font-bold text-sm px-4 py-2 rounded-full shadow-card transition-all hover:shadow-card-hover"
            >
              Apply Now
            </Button>
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg bg-school-green/10 text-school-green"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-school-green/10 shadow-lg">
            <ul className="py-3 px-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                      activeSection === link.id
                        ? "bg-school-green text-white"
                        : "text-foreground/70 hover:bg-school-green/10 hover:text-school-green"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  onClick={() => scrollTo("admissions")}
                  className="w-full bg-school-green hover:bg-school-green/90 text-white font-bold rounded-full"
                >
                  Apply for Admission
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 1: Home / Hero ──────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/uploads/image-1.png"
            alt="Global Pride International School"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-school-dark/90 via-school-dark/70 to-school-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-school-dark/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-school-gold/20 border border-school-gold/40 text-school-gold rounded-full px-4 py-1.5 text-sm font-semibold mb-6 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              CBSE Affiliated · Est. 2018+
            </div>

            <h1 className="hero-title font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
              Global Pride
              <br />
              <span className="text-school-gold">International</span> School
            </h1>

            <p className="hero-subtitle font-body text-white/85 text-lg md:text-xl leading-relaxed mb-8">
              Excellence in Education with Moral Values — Nurturing future
              leaders through modern academics, Islamic values, and holistic
              development.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo("admissions")}
                className="pulse-btn bg-school-gold hover:bg-school-gold/90 text-school-dark font-display font-bold text-base px-8 py-3 rounded-full shadow-golden transition-all"
                size="lg"
              >
                Apply for Admission
              </Button>
              <Button
                onClick={() => scrollTo("about")}
                variant="outline"
                className="border-white/40 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full backdrop-blur-sm"
                size="lg"
              >
                Discover More
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Stats Row */}
      <div className="bg-school-green text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "1500+", label: "Students", icon: Users },
              { value: "70+", label: "Faculty & Staff", icon: GraduationCap },
              { value: "6+", label: "Years of Excellence", icon: Star },
              { value: "CBSE", label: "Certified", icon: Award },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-2"
              >
                <Icon className="w-5 h-5 text-school-gold mb-1" />
                <div className="font-display font-bold text-2xl md:text-3xl text-school-gold">
                  {value}
                </div>
                <div className="font-body text-white/80 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-school-cream py-8 border-y border-school-green/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              {
                icon: BookOpen,
                label: "CBSE Curriculum",
                color: "text-emerald-600",
              },
              {
                icon: Heart,
                label: "Islamic Education",
                color: "text-rose-500",
              },
              { icon: Star, label: "Hifz Program", color: "text-amber-500" },
              {
                icon: FlaskConical,
                label: "IIT/NEET Foundation",
                color: "text-blue-600",
              },
              { icon: Bus, label: "Transport", color: "text-orange-500" },
              { icon: Camera, label: "CCTV Secured", color: "text-purple-600" },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-xs hover:shadow-card transition-shadow text-center"
              >
                <Icon className={`w-7 h-7 ${color}`} />
                <span className="font-body font-semibold text-xs text-foreground/80 leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 2: About ────────────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-green/10 text-school-green rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              About Us
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Shaping Bright Futures with{" "}
              <span className="text-school-gold">Purpose & Pride</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-2xl mx-auto text-base leading-relaxed">
              Global Pride International School is a CBSE-affiliated institution
              committed to combining modern education with timeless moral
              values, nurturing well-rounded individuals who excel in academics,
              character, and community.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <FadeIn delay={100}>
              <div className="space-y-5">
                <p className="font-body text-foreground/80 leading-relaxed">
                  Founded with a vision to bridge academic excellence with
                  Islamic moral values, our school provides an environment where
                  every student is encouraged to discover their unique
                  potential. Our CBSE curriculum is enriched with activity-based
                  learning, smart technology, and dedicated mentoring by highly
                  qualified faculty.
                </p>
                <p className="font-body text-foreground/80 leading-relaxed">
                  With over <strong>1500 students</strong>,{" "}
                  <strong>70+ staff members</strong>, and{" "}
                  <strong>6+ years of excellence</strong>, we have become one of
                  the most trusted educational institutions in the region,
                  offering programs from Nursery through Grade 10.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    "CBSE Affiliated",
                    "Modern Education",
                    "Islamic Values",
                    "Holistic Development",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-school-green/10 text-school-green font-semibold text-xs px-3 py-1.5 rounded-full border border-school-green/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-01-at-6.58.39-AM-5.jpeg"
                  alt="Principal / Director"
                  className="w-full h-48 object-cover rounded-2xl shadow-card col-span-1"
                />
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-01-at-6.58.30-AM-16.jpeg"
                  alt="Staff Group at Global Pride International School"
                  className="w-full h-48 object-cover rounded-2xl shadow-card col-span-1"
                />
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-1--19.jpeg"
                  alt="Director with Students"
                  className="w-full h-40 object-cover rounded-2xl shadow-card col-span-2"
                />
              </div>
            </FadeIn>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="bg-school-green rounded-2xl p-8 text-white h-full">
                <div className="w-12 h-12 bg-school-gold rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-school-dark" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  Our Vision
                </h3>
                <p className="font-body text-white/85 leading-relaxed">
                  To be a centre of excellence that cultivates intellectual
                  curiosity, moral integrity, and global citizenship —
                  empowering every student to contribute positively to society
                  while staying firmly rooted in their values.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="bg-school-gold rounded-2xl p-8 text-school-dark h-full">
                <div className="w-12 h-12 bg-school-green rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  Our Mission
                </h3>
                <p className="font-body text-school-dark/85 leading-relaxed">
                  To provide quality education blending CBSE academics with
                  Islamic values, fostering critical thinking, creativity, and
                  character development through innovative teaching methods,
                  experienced faculty, and a safe, nurturing campus environment.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 3: Programs ─────────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="programs" className="py-20 bg-school-cream">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-gold/20 text-school-gold-dark border border-school-gold/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              Academic Programs
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Programs Designed for{" "}
              <span className="text-school-green">Every Learner</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-2xl mx-auto">
              From foundational early learning to advanced IIT/NEET preparation
              — we have a path for every student.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "CBSE Academic Program",
                desc: "A comprehensive CBSE-aligned curriculum from Nursery to Grade 10, focused on conceptual clarity, analytical thinking, and board exam excellence.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.55-AM-2--9.jpeg",
                icon: BookOpen,
                color: "bg-emerald-50 text-emerald-700",
              },
              {
                title: "Intensive Hifz Program",
                desc: "Dedicated Quran memorisation under qualified Huffaz teachers, with a structured schedule that balances academic studies and spiritual growth.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.51-AM-13.jpeg",
                icon: Star,
                color: "bg-amber-50 text-amber-700",
              },
              {
                title: "IIT & NEET Foundation",
                desc: "Early competitive exam preparation with concept-driven coaching in Physics, Chemistry, Mathematics, and Biology for Grades 8–10.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-2--10.jpeg",
                icon: FlaskConical,
                color: "bg-blue-50 text-blue-700",
              },
              {
                title: "Activity-Based Learning",
                desc: "Hands-on projects, science experiments, art & craft, and experiential learning activities that make education engaging and memorable.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-2--8.jpeg",
                icon: Music,
                color: "bg-rose-50 text-rose-700",
              },
              {
                title: "Interactive Classrooms",
                desc: "Smart boards, multimedia learning tools, and digital resources integrated into every classroom to create dynamic, tech-enabled lessons.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.53-AM-12.jpeg",
                icon: Monitor,
                color: "bg-violet-50 text-violet-700",
              },
              {
                title: "Computer Lab Facilities",
                desc: "Well-equipped computer laboratories with modern hardware and software, offering practical IT education from early grades.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.49-AM-3.jpeg",
                icon: Cpu,
                color: "bg-orange-50 text-orange-700",
              },
            ].map(({ title, desc, img, icon: Icon, color }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div
                      className={`inline-flex items-center gap-2 ${color} rounded-full px-3 py-1 text-xs font-semibold mb-3 w-fit`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {title}
                    </div>
                    <p className="font-body text-foreground/70 text-sm leading-relaxed flex-1">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 4: Facilities ───────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="facilities" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-green/10 text-school-green rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              World-Class Facilities
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              A Safe &{" "}
              <span className="text-school-gold">Inspiring Campus</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-2xl mx-auto">
              Every facility is thoughtfully designed to ensure safety, comfort,
              and the best learning experience for your child.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Bus,
                title: "Transport Facilities",
                desc: "Safe and reliable transport services covering major areas. GPS-tracked vehicles with trained drivers and attendants ensure your child's safety on the road.",
                bg: "bg-orange-50",
                iconBg: "bg-orange-100 text-orange-600",
              },
              {
                icon: Camera,
                title: "CCTV Surveillance",
                desc: "24/7 CCTV monitoring across the entire campus including classrooms, corridors, and entry points to maintain a completely secure environment.",
                bg: "bg-purple-50",
                iconBg: "bg-purple-100 text-purple-600",
              },
              {
                icon: Monitor,
                title: "Smart Classrooms",
                desc: "Every classroom is equipped with interactive smart boards, projectors, and digital learning tools that make lessons engaging and effective.",
                bg: "bg-blue-50",
                iconBg: "bg-blue-100 text-blue-600",
              },
              {
                icon: Shield,
                title: "Safe Campus Environment",
                desc: "Secured entry gates, regular safety drills, and a dedicated security team ensure our campus is a worry-free zone for students and parents alike.",
                bg: "bg-green-50",
                iconBg: "bg-green-100 text-green-600",
              },
              {
                icon: GraduationCap,
                title: "Qualified Faculty Support",
                desc: "Over 70 highly qualified, experienced, and dedicated teachers and staff who are committed to nurturing each student's academic and personal growth.",
                bg: "bg-amber-50",
                iconBg: "bg-amber-100 text-amber-600",
              },
              {
                icon: FlaskConical,
                title: "Science & Computer Labs",
                desc: "Fully equipped science and computer laboratories providing hands-on experimental learning and practical technology education from early grades.",
                bg: "bg-rose-50",
                iconBg: "bg-rose-100 text-rose-600",
              },
            ].map(({ icon: Icon, title, desc, bg, iconBg }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div
                  className={`${bg} rounded-2xl p-6 hover:shadow-card transition-all duration-300 h-full`}
                >
                  <div
                    className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-base text-school-dark mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-foreground/70 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Facility images row */}
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
              {[
                {
                  src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.47-AM-14.jpeg",
                  label: "Science experiment",
                },
                {
                  src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-6.jpeg",
                  label: "Computer lab",
                },
                {
                  src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-17.jpeg",
                  label: "Investiture ceremony",
                },
                {
                  src: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.58-AM-2--4.jpeg",
                  label: "Creative learning",
                },
              ].map(({ src, label }) => (
                <div key={src} className="overflow-hidden rounded-xl">
                  <img
                    src={src}
                    alt={label}
                    className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 5: Gallery ──────────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-20 bg-school-cream">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-gold/20 text-school-gold-dark border border-school-gold/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <ZoomIn className="w-4 h-4" />
              Photo Gallery
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Life at <span className="text-school-green">Global Pride</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-2xl mx-auto">
              A glimpse into the vibrant, joyful world inside our campus —
              learning, celebrating, and growing together.
            </p>
          </FadeIn>

          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
            {ALL_IMAGES.map((image, i) => (
              <FadeIn
                key={image.src}
                delay={i * 30}
                className="break-inside-avoid gallery-img"
              >
                <button
                  type="button"
                  className="w-full overflow-hidden rounded-xl shadow-xs hover:shadow-card transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-school-gold"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View ${image.alt}`}
                >
                  <div className="relative group overflow-hidden rounded-xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-school-dark/0 group-hover:bg-school-dark/30 transition-all duration-300 flex items-center justify-center rounded-xl">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={ALL_IMAGES}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) =>
              i === null ? 0 : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length,
            )
          }
          onNext={() =>
            setLightboxIndex((i) =>
              i === null ? 0 : (i + 1) % ALL_IMAGES.length,
            )
          }
        />
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 6: Admissions ───────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        id="admissions"
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-school-green/5 via-transparent to-school-gold/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-green text-white rounded-full px-5 py-2 text-sm font-bold mb-4 shadow-card">
              <Star className="w-4 h-4 text-school-gold fill-current" />
              Admissions Open 2026–2027
              <Star className="w-4 h-4 text-school-gold fill-current" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Begin Your Child's{" "}
              <span className="text-school-gold">Journey Here</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-2xl mx-auto text-base leading-relaxed">
              Give your child the gift of quality education in a caring,
              values-driven environment. Seats are limited — submit your enquiry
              today to secure your child's future at Global Pride International
              School.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Info side */}
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="bg-school-green rounded-2xl p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-4 text-school-gold">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "CBSE Curriculum with activity-based learning",
                      "Intensive Hifz Program with academic balance",
                      "IIT & NEET Foundation coaching",
                      "Interactive smart classrooms",
                      "Safe, CCTV-monitored campus",
                      "Reliable student transport",
                      "70+ highly qualified faculty",
                      "Holistic character development",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-white/90"
                      >
                        <CheckCircle2 className="w-4 h-4 text-school-gold mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-school-gold/15 border border-school-gold/30 rounded-2xl p-5">
                  <h3 className="font-display font-bold text-school-dark mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-school-green" />
                    School Timings
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { grade: "Nursery", time: "8:45 AM – 12:30 PM" },
                      { grade: "PP1 & PP2", time: "8:45 AM – 2:30 PM" },
                      {
                        grade: "Grade 1 – Grade 10",
                        time: "8:45 AM – 4:00 PM",
                      },
                    ].map(({ grade, time }) => (
                      <div
                        key={grade}
                        className="flex justify-between items-center py-2 border-b border-school-gold/20 last:border-0"
                      >
                        <span className="font-semibold text-school-dark">
                          {grade}
                        </span>
                        <span className="text-school-green font-bold">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.58-AM-1--7.jpeg"
                    alt="Student"
                    className="rounded-xl h-32 w-full object-cover shadow-card"
                  />
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.55-AM-1--11.jpeg"
                    alt="Early Learner"
                    className="rounded-xl h-32 w-full object-cover shadow-card"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Form side */}
            <FadeIn delay={200}>
              {submitted ? (
                <div className="bg-school-green/10 border border-school-green/20 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-school-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-school-green mb-3">
                    Enquiry Submitted!
                  </h3>
                  <p className="font-body text-foreground/70 mb-6">
                    Thank you for your interest! Our admissions team will
                    contact you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-school-green hover:bg-school-green/90 text-white font-bold rounded-full"
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-border rounded-2xl shadow-card p-8 space-y-5"
                >
                  <h3 className="font-display font-bold text-xl text-school-dark mb-1">
                    Admission Enquiry Form
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4">
                    Fill in the details below and we'll get back to you shortly.
                  </p>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="studentName"
                      className="font-semibold text-school-dark text-sm"
                    >
                      Student Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="studentName"
                      placeholder="Enter student's full name"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          studentName: e.target.value,
                        }))
                      }
                      required
                      className="border-border focus:border-school-green focus:ring-school-green/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="parentName"
                      className="font-semibold text-school-dark text-sm"
                    >
                      Parent / Guardian Name{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="parentName"
                      placeholder="Enter parent's full name"
                      value={formData.parentName}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          parentName: e.target.value,
                        }))
                      }
                      required
                      className="border-border focus:border-school-green focus:ring-school-green/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contactNumber"
                      className="font-semibold text-school-dark text-sm"
                    >
                      Contact Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          contactNumber: e.target.value,
                        }))
                      }
                      required
                      className="border-border focus:border-school-green focus:ring-school-green/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="font-semibold text-school-dark text-sm">
                      Grade Applying For{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.gradeApplying}
                      onValueChange={(val) =>
                        setFormData((p) => ({ ...p, gradeApplying: val }))
                      }
                    >
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Nursery",
                          "PP1",
                          "PP2",
                          "Grade 1",
                          "Grade 2",
                          "Grade 3",
                          "Grade 4",
                          "Grade 5",
                          "Grade 6",
                          "Grade 7",
                          "Grade 8",
                          "Grade 9",
                          "Grade 10",
                        ].map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="font-semibold text-school-dark text-sm"
                    >
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Any additional information or questions..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      className="border-border focus:border-school-green resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting || (actorLoading && !actor)}
                    className="w-full bg-school-green hover:bg-school-green/90 text-white font-display font-bold text-base py-3 rounded-full shadow-card transition-all"
                    size="lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : actorLoading && !actor ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </Button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 7: Contact ──────────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 bg-school-cream">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-green/10 text-school-green rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4" />
              Contact & Location
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Visit <span className="text-school-gold">Our Branches</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-xl mx-auto">
              We'd love to show you around. Visit us or call to schedule a
              campus tour.
            </p>
          </FadeIn>

          {/* Branch Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <FadeIn delay={100}>
              <div className="bg-white rounded-2xl shadow-card p-8 border border-school-green/10 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-school-green rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-school-dark text-lg">
                      Main Branch
                    </div>
                    <div className="text-school-green text-sm font-semibold">
                      Rakshapuram
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <MapPin className="w-4 h-4 text-school-gold flex-shrink-0" />
                    <span className="font-body text-sm">
                      Rakshapuram, Telangana
                    </span>
                  </div>
                  <a
                    href="tel:9866058320"
                    className="flex items-center gap-3 text-school-green hover:text-school-green/80 transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-school-gold flex-shrink-0" />
                    <span className="font-display font-bold text-base group-hover:underline">
                      +91 9866058320
                    </span>
                  </a>
                </div>
                <Button
                  asChild
                  className="mt-5 w-full bg-school-green hover:bg-school-green/90 text-white font-bold rounded-full"
                >
                  <a href="tel:9866058320">Call Main Branch</a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white rounded-2xl shadow-card p-8 border border-school-gold/20 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-school-gold rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-school-dark" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-school-dark text-lg">
                      Second Branch
                    </div>
                    <div className="text-school-gold-dark text-sm font-semibold">
                      Naseeb Nagar, Phool Bagh
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <MapPin className="w-4 h-4 text-school-green flex-shrink-0" />
                    <span className="font-body text-sm">
                      Naseeb Nagar, Phool Bagh, Telangana
                    </span>
                  </div>
                  <a
                    href="tel:9346716575"
                    className="flex items-center gap-3 text-school-green hover:text-school-green/80 transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-school-green flex-shrink-0" />
                    <span className="font-display font-bold text-base group-hover:underline">
                      +91 9346716575
                    </span>
                  </a>
                </div>
                <Button
                  asChild
                  className="mt-5 w-full bg-school-gold hover:bg-school-gold/90 text-school-dark font-bold rounded-full"
                >
                  <a href="tel:9346716575">Call Second Branch</a>
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* School Timings Table */}
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-card p-8 mb-10 max-w-2xl mx-auto">
              <h3 className="font-display font-bold text-xl text-school-dark mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-school-green" />
                School Timings
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-school-green text-white rounded-lg">
                      <th className="text-left px-4 py-3 font-display font-bold rounded-l-lg">
                        Class
                      </th>
                      <th className="text-left px-4 py-3 font-display font-bold">
                        Entry Time
                      </th>
                      <th className="text-left px-4 py-3 font-display font-bold rounded-r-lg">
                        Dismissal Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cls: "Nursery", entry: "8:45 AM", dismiss: "12:30 PM" },
                      {
                        cls: "PP1 & PP2",
                        entry: "8:45 AM",
                        dismiss: "2:30 PM",
                      },
                      {
                        cls: "Grade 1 – Grade 5",
                        entry: "8:45 AM",
                        dismiss: "4:00 PM",
                      },
                      {
                        cls: "Grade 6 – Grade 10",
                        entry: "8:45 AM",
                        dismiss: "4:00 PM",
                      },
                    ].map(({ cls, entry, dismiss }, i) => (
                      <tr
                        key={cls}
                        className={
                          i % 2 === 0 ? "bg-school-cream/50" : "bg-white"
                        }
                      >
                        <td className="px-4 py-3 font-semibold text-school-dark">
                          {cls}
                        </td>
                        <td className="px-4 py-3 text-foreground/70">
                          {entry}
                        </td>
                        <td className="px-4 py-3 font-bold text-school-green">
                          {dismiss}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Map placeholder */}
          <FadeIn>
            <div className="rounded-2xl overflow-hidden shadow-card border border-border">
              <div className="bg-school-green/10 h-10 flex items-center px-6 border-b border-school-green/10">
                <div className="flex items-center gap-2 text-sm text-school-green font-semibold">
                  <MapPin className="w-4 h-4" />
                  Map Location — Rakshapuram (Main Branch)
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-school-green/5 to-school-gold/5 h-64 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-school-green rounded-full flex items-center justify-center mx-auto float-anim shadow-golden">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-display font-bold text-school-dark">
                    Global Pride International School
                  </div>
                  <div className="text-sm text-foreground/60">
                    Rakshapuram · Naseeb Nagar, Phool Bagh
                  </div>
                  <div className="flex gap-3 justify-center">
                    <a
                      href="https://maps.google.com?q=Rakshapuram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-school-green text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-school-green/90 transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      Main Branch Map
                    </a>
                    <a
                      href="https://maps.google.com?q=Naseeb+Nagar+Phool+Bagh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-school-gold text-school-dark text-xs font-bold px-4 py-2 rounded-full hover:bg-school-gold/90 transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      Second Branch Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="bg-school-dark text-white py-14">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/uploads/image-1.png"
                  alt="Logo"
                  className="w-12 h-12 object-contain rounded-full border-2 border-school-gold"
                />
                <div>
                  <div className="font-display font-bold text-white leading-tight">
                    Global Pride
                  </div>
                  <div className="font-display font-semibold text-school-gold text-xs uppercase tracking-wide">
                    International School
                  </div>
                </div>
              </div>
              <p className="font-body text-white/60 text-sm leading-relaxed">
                Excellence in Education with Moral Values. CBSE Affiliated
                school with 1500+ students and 70+ dedicated staff.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-school-gold mb-4 text-sm uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="font-body text-white/60 hover:text-school-gold text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Branch */}
            <div>
              <h4 className="font-display font-bold text-school-gold mb-4 text-sm uppercase tracking-wide">
                Main Branch
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-school-gold mt-0.5 flex-shrink-0" />
                  <span>Rakshapuram, Telangana</span>
                </div>
                <a
                  href="tel:9866058320"
                  className="flex items-center gap-2 text-white/60 hover:text-school-gold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-school-gold flex-shrink-0" />
                  +91 9866058320
                </a>
              </div>
            </div>

            {/* Second Branch */}
            <div>
              <h4 className="font-display font-bold text-school-gold mb-4 text-sm uppercase tracking-wide">
                Second Branch
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-school-gold mt-0.5 flex-shrink-0" />
                  <span>Naseeb Nagar, Phool Bagh, Telangana</span>
                </div>
                <a
                  href="tel:9346716575"
                  className="flex items-center gap-2 text-white/60 hover:text-school-gold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-school-gold flex-shrink-0" />
                  +91 9346716575
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>
              © {new Date().getFullYear()} Global Pride International School.
              All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  window.location.hash = "admin";
                }}
                className="text-white/20 hover:text-white/40 text-xs transition-colors"
                aria-label="Admin"
              >
                Admin
              </button>
              <p>
                Built with{" "}
                <Heart className="inline w-3.5 h-3.5 text-rose-400 fill-current" />{" "}
                using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-school-gold transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
