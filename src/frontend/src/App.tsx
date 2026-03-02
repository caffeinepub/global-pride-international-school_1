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
      <div className="admission-banner py-2.5 px-4 text-center text-white font-display font-bold text-sm md:text-base tracking-wide shadow-lg relative z-50">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Star className="w-4 h-4 fill-current animate-pulse" />🎓 Admissions
          Open 2026–2027 &nbsp;|&nbsp; Enroll Now – Hurry Up! Limited Seats
          Available
          <Star className="w-4 h-4 fill-current animate-pulse" />
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
              src="/assets/uploads/image-1-1.png"
              alt="Global Pride International School Logo"
              className="w-12 h-12 object-contain rounded-none"
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
        className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-school-dark via-[oklch(0.22_0.06_155)] to-[oklch(0.18_0.04_200)]"
      >
        {/* Decorative background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-school-green/20 blur-[100px]" />
          <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-school-gold/15 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full bg-school-green/10 blur-[80px]" />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 dot-pattern opacity-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-school-gold/20 border border-school-gold/40 text-school-gold rounded-full px-4 py-1.5 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4" />
                CBSE (Nursery–Gr.5) · SSC (Gr.6–Gr.10) · Est. 2018+
              </div>

              <h1 className="hero-title font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
                Global Pride
                <br />
                <span className="text-school-gold">International</span> School
              </h1>

              <p className="hero-subtitle font-body text-white/85 text-lg md:text-xl leading-relaxed mb-6">
                Excellence in Education with Moral Values — Nurturing future
                leaders through modern academics, Islamic values, and holistic
                development.
              </p>

              {/* Quick highlights */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "1500+ Students",
                  "70+ Faculty",
                  "CBSE & SSC",
                  "Hifz Program",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/90 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 text-school-gold" />
                    {tag}
                  </span>
                ))}
              </div>

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

            {/* Right: Featured student photo - square template */}
            <div className="flex justify-center lg:justify-end hero-img-card">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-school-gold/50 via-school-green/40 to-school-gold/30 blur-2xl" />
                {/* Double border frame effect */}
                <div className="relative p-1.5 rounded-[2rem] bg-gradient-to-br from-school-gold via-school-green to-school-gold shadow-2xl w-[320px] md:w-[400px] lg:w-[440px]">
                  <div
                    className="rounded-[1.6rem] overflow-hidden"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <img
                      src="/assets/uploads/image-1-1.png"
                      alt="Global Pride International School"
                      className="w-full h-full object-contain object-center bg-white"
                    />
                  </div>
                  {/* Overlay badge at bottom */}
                  <div className="absolute bottom-0 left-1.5 right-1.5 rounded-b-[1.6rem] bg-gradient-to-t from-school-dark/90 via-school-dark/60 to-transparent p-5 pt-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-school-gold animate-pulse" />
                      <span className="text-white font-semibold text-sm">
                        Activity-Based Learning
                      </span>
                    </div>
                    <p className="text-white/70 text-xs mt-1">
                      Hands-on education that sparks curiosity
                    </p>
                  </div>
                </div>
                {/* Floating badge top-right */}
                <div className="absolute -top-4 -right-4 bg-school-gold text-school-dark rounded-2xl px-3 py-2 shadow-golden text-center z-10">
                  <div className="font-display font-bold text-lg leading-none">
                    6+
                  </div>
                  <div className="text-[10px] font-semibold leading-none mt-0.5">
                    Years
                  </div>
                </div>
                {/* Floating badge bottom-left */}
                <div className="absolute -bottom-4 -left-4 bg-school-green text-white rounded-2xl px-3 py-2 shadow-card text-center z-10">
                  <div className="font-display font-bold text-lg leading-none">
                    1500+
                  </div>
                  <div className="text-[10px] font-semibold leading-none mt-0.5">
                    Students
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Wave divider between hero and stats */}
      <div
        className="wave-separator bg-school-green"
        style={{ marginTop: "-2px" }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            fill="oklch(0.97 0.02 90)"
          />
        </svg>
      </div>

      {/* Stats Row */}
      <div
        className="bg-school-green text-white py-8 relative overflow-hidden"
        style={{ marginTop: "-60px", paddingTop: "0" }}
      >
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "1500+", label: "Students", icon: Users },
              { value: "70+", label: "Faculty & Staff", icon: GraduationCap },
              { value: "6+", label: "Years of Excellence", icon: Star },
              { value: "CBSE+SSC", label: "Curriculum", icon: Award },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-4 px-3 rounded-2xl hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-school-gold/20 rounded-full flex items-center justify-center mb-2 border border-school-gold/30">
                  <Icon className="w-6 h-6 text-school-gold" />
                </div>
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
                label: "CBSE & SSC",
                color: "text-emerald-600",
                bg: "bg-emerald-50 group-hover:bg-emerald-100",
              },
              {
                icon: Heart,
                label: "Islamic Education",
                color: "text-rose-500",
                bg: "bg-rose-50 group-hover:bg-rose-100",
              },
              {
                icon: Star,
                label: "Hifz Program",
                color: "text-amber-500",
                bg: "bg-amber-50 group-hover:bg-amber-100",
              },
              {
                icon: FlaskConical,
                label: "IIT/NEET Foundation",
                color: "text-blue-600",
                bg: "bg-blue-50 group-hover:bg-blue-100",
              },
              {
                icon: Bus,
                label: "Transport",
                color: "text-orange-500",
                bg: "bg-orange-50 group-hover:bg-orange-100",
              },
              {
                icon: Camera,
                label: "CCTV Secured",
                color: "text-purple-600",
                bg: "bg-purple-50 group-hover:bg-purple-100",
              },
            ].map(({ icon: Icon, label, color, bg }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-xs hover:shadow-card transition-all duration-300 text-center hover:-translate-y-1 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center transition-colors duration-300`}
                >
                  <Icon
                    className={`w-6 h-6 ${color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <span className="font-body font-semibold text-xs text-foreground/80 leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Marquee Trust Strip */}
      <div className="bg-school-dark text-white py-3 overflow-hidden relative">
        <div className="marquee-track">
          {(["a", "b"] as const).map((outerIdx) => (
            <div key={outerIdx} className="flex items-center gap-0 shrink-0">
              {[
                { icon: BookOpen, text: "CBSE Curriculum (Nursery–Gr.5)" },
                { icon: GraduationCap, text: "SSC Board (Gr.6–Gr.10)" },
                { icon: Users, text: "1500+ Students" },
                { icon: Award, text: "6+ Years of Excellence" },
                { icon: Star, text: "Intensive Hifz Program" },
                { icon: FlaskConical, text: "IIT & NEET Foundation" },
                { icon: Shield, text: "CCTV Secured Campus" },
                { icon: Bus, text: "Safe Transport Facility" },
                { icon: GraduationCap, text: "70+ Qualified Faculty" },
                { icon: Heart, text: "Islamic Values" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 px-6 text-sm font-semibold whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 text-school-gold flex-shrink-0" />
                  <span className="text-white/90">{text}</span>
                  <span className="text-school-gold/40 ml-4">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 2: About ────────────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-60" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-green/10 text-school-green rounded-full px-4 py-1.5 text-sm font-semibold mb-4 border border-school-green/20">
              <BookOpen className="w-4 h-4" />
              About Us
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Shaping Bright Futures with{" "}
              <span className="gradient-text-gold">Purpose & Pride</span>
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
                  potential. From <strong>Nursery to Grade 5</strong>, we follow
                  the <strong>CBSE curriculum</strong>; from{" "}
                  <strong>Grade 6 to Grade 10</strong>, students are guided
                  through the <strong>SSC board</strong> — both enriched with
                  activity-based learning, smart technology, and dedicated
                  mentoring.
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
                    "CBSE (Nursery–Gr.5)",
                    "SSC (Gr.6–Gr.10)",
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
                  To provide quality education through CBSE (Nursery–Grade 5)
                  and SSC (Grade 6–10) curricula blended with Islamic values,
                  fostering critical thinking, creativity, and character
                  development through innovative teaching methods, experienced
                  faculty, and a safe, nurturing campus environment.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 3: Programs ─────────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        id="programs"
        className="py-20 bg-school-cream relative overflow-hidden"
      >
        <div className="absolute inset-0 dot-pattern-gold pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-gold/20 text-school-gold-dark border border-school-gold/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              Academic Programs
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Programs Designed for{" "}
              <span className="gradient-text-green">Every Learner</span>
            </h2>
            <p className="font-body text-foreground/70 max-w-2xl mx-auto">
              From foundational early learning to advanced IIT/NEET preparation
              — we have a path for every student.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                title: "CBSE Curriculum",
                subtitle: "Nursery – Grade 5",
                desc: "CBSE-aligned curriculum building strong foundations in language, mathematics, science, and values through activity-based learning.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.55-AM-2--9.jpeg",
                icon: BookOpen,
                badge: "bg-emerald-100 text-emerald-700",
                topBar: "from-emerald-400 to-emerald-600",
              },
              {
                title: "SSC Curriculum",
                subtitle: "Grade 6 – Grade 10",
                desc: "Rigorous SSC-board preparation for Grades 6–10 with conceptual clarity, analytical thinking, and state board exam excellence.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.53-AM-12.jpeg",
                icon: GraduationCap,
                badge: "bg-teal-100 text-teal-700",
                topBar: "from-teal-400 to-teal-600",
              },
              {
                title: "Intensive Hifz",
                subtitle: "Quran Memorisation",
                desc: "Dedicated Quran memorisation under qualified Huffaz, balancing academic excellence with deep spiritual growth.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-9.02.11-PM-1.jpeg",
                icon: Star,
                badge: "bg-amber-100 text-amber-700",
                topBar: "from-amber-400 to-amber-600",
              },
              {
                title: "IIT & NEET Foundation",
                subtitle: "Competitive Coaching",
                desc: "Concept-driven coaching in Physics, Chemistry, Mathematics, and Biology for Grades 8–10 targeting IIT and NEET.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.56-AM-2--10.jpeg",
                icon: FlaskConical,
                badge: "bg-blue-100 text-blue-700",
                topBar: "from-blue-400 to-blue-600",
              },
              {
                title: "Activity-Based Learning",
                subtitle: "Experiential Education",
                desc: "Hands-on projects, science experiments, art & craft, and experiential activities that make education engaging.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.57-AM-2--8.jpeg",
                icon: Music,
                badge: "bg-rose-100 text-rose-700",
                topBar: "from-rose-400 to-rose-600",
              },
              {
                title: "Interactive Classrooms",
                subtitle: "Smart Technology",
                desc: "Smart boards, multimedia tools, and digital resources making every lesson dynamic and tech-enabled.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.55-AM-2--9.jpeg",
                icon: Monitor,
                badge: "bg-violet-100 text-violet-700",
                topBar: "from-violet-400 to-violet-600",
              },
              {
                title: "Computer Lab",
                subtitle: "Digital Skills",
                desc: "Well-equipped computer laboratories with modern hardware and software for practical IT education from early grades.",
                img: "/assets/uploads/WhatsApp-Image-2026-03-01-at-6.56.49-AM-3.jpeg",
                icon: Cpu,
                badge: "bg-orange-100 text-orange-700",
                topBar: "from-orange-400 to-orange-600",
              },
            ].map(
              (
                { title, subtitle, desc, img, icon: Icon, badge, topBar },
                i,
              ) => (
                <FadeIn key={title} delay={i * 70}>
                  <div className="program-card bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 h-full flex flex-col group">
                    <div className={`h-1.5 bg-gradient-to-r ${topBar}`} />
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        style={{ transformOrigin: "center" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div
                          className={`inline-flex items-center gap-1.5 ${badge} rounded-full px-2.5 py-0.5 text-xs font-bold backdrop-blur-sm`}
                        >
                          <Icon className="w-3 h-3" />
                          {subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-school-dark text-sm mb-2 leading-snug">
                        {title}
                      </h3>
                      <p className="font-body text-foreground/65 text-xs leading-relaxed flex-1">
                        {desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Wave divider before Facilities */}
      <div className="wave-separator bg-school-cream">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 C480,50 960,0 1440,30 L1440,50 L0,50 Z" fill="white" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Section 4: Facilities ───────────────────────── */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        id="facilities"
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-school-gold/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-school-green/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-school-green/10 text-school-green rounded-full px-4 py-1.5 text-sm font-semibold mb-4 border border-school-green/20">
              <Shield className="w-4 h-4" />
              World-Class Facilities
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              A Safe &{" "}
              <span className="gradient-text-gold">Inspiring Campus</span>
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
                desc: "Safe and reliable transport services covering major areas. GPS-tracked vehicles with trained drivers ensure your child's safety on the road.",
                bg: "bg-gradient-to-br from-orange-50 to-orange-100",
                iconBg: "bg-orange-500 text-white",
                border: "border-orange-100",
              },
              {
                icon: Camera,
                title: "CCTV Surveillance",
                desc: "24/7 CCTV monitoring across the entire campus including classrooms and entry points to maintain a completely secure environment.",
                bg: "bg-gradient-to-br from-purple-50 to-purple-100",
                iconBg: "bg-purple-500 text-white",
                border: "border-purple-100",
              },
              {
                icon: Monitor,
                title: "Smart Classrooms",
                desc: "Every classroom is equipped with interactive smart boards, projectors, and digital learning tools that make lessons engaging and effective.",
                bg: "bg-gradient-to-br from-blue-50 to-blue-100",
                iconBg: "bg-blue-500 text-white",
                border: "border-blue-100",
              },
              {
                icon: Shield,
                title: "Safe Campus",
                desc: "Secured entry gates, regular safety drills, and a dedicated security team ensure our campus is a worry-free zone for everyone.",
                bg: "bg-gradient-to-br from-green-50 to-emerald-100",
                iconBg: "bg-emerald-500 text-white",
                border: "border-green-100",
              },
              {
                icon: GraduationCap,
                title: "Qualified Faculty",
                desc: "Over 70 highly qualified, experienced, and dedicated teachers committed to nurturing each student's academic and personal growth.",
                bg: "bg-gradient-to-br from-amber-50 to-amber-100",
                iconBg: "bg-amber-500 text-white",
                border: "border-amber-100",
              },
              {
                icon: FlaskConical,
                title: "Science & Computer Labs",
                desc: "Fully equipped laboratories providing hands-on experimental learning and practical technology education from early grades.",
                bg: "bg-gradient-to-br from-rose-50 to-rose-100",
                iconBg: "bg-rose-500 text-white",
                border: "border-rose-100",
              },
            ].map(({ icon: Icon, title, desc, bg, iconBg, border }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <div
                  className={`facility-card ${bg} rounded-2xl p-6 h-full border ${border} shadow-xs hover:shadow-card`}
                >
                  <div
                    className={`facility-icon w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-5 shadow-md`}
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
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-40" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 shine-effect bg-gradient-to-r from-school-green via-emerald-600 to-school-green text-white rounded-full px-6 py-2.5 text-sm font-bold mb-6 shadow-golden">
              <Star className="w-4 h-4 text-school-gold fill-current animate-pulse" />
              🎓 Admissions Open 2026–2027 — Limited Seats!
              <Star className="w-4 h-4 text-school-gold fill-current animate-pulse" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-school-dark mb-4">
              Begin Your Child's{" "}
              <span className="gradient-text-gold">Journey Here</span>
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
                      "CBSE (Nursery–Gr.5) & SSC (Gr.6–Gr.10) curriculum",
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
      <section
        id="contact"
        className="py-20 bg-school-cream relative overflow-hidden"
      >
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
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
              <div className="bg-white rounded-2xl shadow-card border border-school-green/10 h-full overflow-hidden">
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src="/assets/uploads/new-Building.jpg-2.jpeg"
                    alt="Main Branch Building - Rakshapuram"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
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
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white rounded-2xl shadow-card border border-school-gold/20 h-full overflow-hidden">
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src="/assets/uploads/New-Branch.jpg-1.jpeg"
                    alt="Second Branch Building - Naseeb Nagar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
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
            <div className="rounded-3xl overflow-hidden shadow-card-hover border border-school-green/15">
              {/* Map header */}
              <div className="bg-school-green px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white font-bold">
                  <MapPin className="w-4 h-4 text-school-gold" />
                  Our Locations — Global Pride International School
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/40" />
                </div>
              </div>
              {/* Polished map area */}
              <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 h-72 overflow-hidden">
                {/* Decorative map-like grid */}
                <div className="absolute inset-0 grid-pattern opacity-40" />
                {/* Simulated road lines */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full opacity-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="40%"
                    x2="100%"
                    y2="40%"
                    stroke="oklch(0.3 0.12 160)"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="60%"
                    x2="100%"
                    y2="60%"
                    stroke="oklch(0.3 0.12 160)"
                    strokeWidth="1"
                    strokeDasharray="8,6"
                  />
                  <line
                    x1="35%"
                    y1="0"
                    x2="35%"
                    y2="100%"
                    stroke="oklch(0.3 0.12 160)"
                    strokeWidth="2"
                  />
                  <line
                    x1="65%"
                    y1="0"
                    x2="65%"
                    y2="100%"
                    stroke="oklch(0.3 0.12 160)"
                    strokeWidth="1"
                    strokeDasharray="8,6"
                  />
                  <rect
                    x="30%"
                    y="20%"
                    width="15%"
                    height="20%"
                    rx="4"
                    fill="oklch(0.3 0.12 160)"
                    fillOpacity="0.07"
                  />
                  <rect
                    x="55%"
                    y="45%"
                    width="20%"
                    height="18%"
                    rx="4"
                    fill="oklch(0.78 0.16 80)"
                    fillOpacity="0.07"
                  />
                </svg>
                {/* Location pins */}
                <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="w-14 h-14 bg-school-green rounded-full flex items-center justify-center mx-auto float-anim shadow-golden border-4 border-white">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="mt-2 bg-white rounded-xl shadow-card px-3 py-1.5 text-center whitespace-nowrap border border-school-green/10">
                    <div className="font-display font-bold text-school-dark text-xs">
                      Main Branch
                    </div>
                    <div className="text-school-green font-semibold text-[10px]">
                      Rakshapuram
                    </div>
                  </div>
                </div>
                <div className="absolute top-[45%] left-[65%] -translate-x-1/2 -translate-y-1/2 text-center">
                  <div
                    className="w-12 h-12 bg-school-gold rounded-full flex items-center justify-center mx-auto shadow-golden border-4 border-white"
                    style={{ animation: "float 3s ease-in-out 1.5s infinite" }}
                  >
                    <MapPin className="w-6 h-6 text-school-dark" />
                  </div>
                  <div className="mt-2 bg-white rounded-xl shadow-card px-3 py-1.5 text-center whitespace-nowrap border border-school-gold/10">
                    <div className="font-display font-bold text-school-dark text-xs">
                      Second Branch
                    </div>
                    <div className="text-school-gold-dark font-semibold text-[10px]">
                      Naseeb Nagar
                    </div>
                  </div>
                </div>
                {/* CTA buttons */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
                  <a
                    href="https://maps.google.com?q=Rakshapuram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-school-green text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-school-green/90 transition-all shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Get Directions — Main
                  </a>
                  <a
                    href="https://maps.google.com?q=Naseeb+Nagar+Phool+Bagh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-school-gold text-school-dark text-xs font-bold px-5 py-2.5 rounded-full hover:bg-school-gold/90 transition-all shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Get Directions — Branch
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Floating Call Button ──────────────────────────── */}
      <a
        href="tel:9866058320"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-school-green text-white font-display font-bold text-sm px-5 py-3.5 rounded-full pulse-call shadow-card-hover hover:bg-school-green/90 hover:scale-105 transition-all duration-300"
        aria-label="Call Main Branch: 9866058320"
      >
        <Phone className="w-5 h-5 text-school-gold" />
        <span>Call Now</span>
      </a>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="bg-school-dark text-white py-14 footer-gradient-border">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/uploads/image-1-1.png"
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
                Excellence in Education with Moral Values. CBSE (Nursery–Gr.5)
                &amp; SSC (Gr.6–Gr.10) school with 1500+ students and 70+
                dedicated staff.
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
