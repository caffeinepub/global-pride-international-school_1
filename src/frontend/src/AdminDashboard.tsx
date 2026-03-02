import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  ClipboardList,
  Download,
  GraduationCap,
  LogOut,
  Phone,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useActor } from "./hooks/useActor";

interface AdminDashboardProps {
  onLogout: () => void;
  onGoHome?: () => void;
}

function formatTimestamp(timestamp: bigint): string {
  // Motoko timestamps are in nanoseconds — convert to ms
  const ms = Number(timestamp / 1_000_000n);
  if (ms === 0 || Number.isNaN(ms)) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(ms));
}

export default function AdminDashboard({
  onLogout,
  onGoHome,
}: AdminDashboardProps) {
  const { actor, isFetching: actorFetching } = useActor();
  const [search, setSearch] = useState("");

  const {
    data: enquiries = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnquiries();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });

  const filtered = enquiries.filter((e) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      e.studentName.toLowerCase().includes(q) ||
      e.parentName.toLowerCase().includes(q) ||
      e.contactNumber.includes(q) ||
      e.gradeApplying.toLowerCase().includes(q)
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("gpis_admin_auth");
    onLogout();
  };

  const downloadCSV = () => {
    const headers = [
      "ID",
      "Student Name",
      "Parent Name",
      "Contact Number",
      "Grade Applying",
      "Message",
      "Date & Time",
    ];
    const rows = enquiries.map((e) => [
      String(e.id),
      e.studentName,
      e.parentName,
      e.contactNumber,
      e.gradeApplying,
      e.message.replace(/,/g, ";"),
      formatTimestamp(e.timestamp),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gpis-enquiries-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-school-cream flex flex-col">
      {/* Admissions Banner */}
      <div className="admission-banner py-2.5 px-4 text-center text-school-dark font-display font-bold text-sm tracking-wide">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Star className="w-4 h-4 fill-current" />🎓 Admissions Open 2026–2027
          · Enroll Now — Limited Seats Available!
          <Star className="w-4 h-4 fill-current" />
        </span>
      </div>

      {/* Header */}
      <header className="bg-school-green text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/assets/uploads/image-1-1.png"
              alt="GPIS Logo"
              className="w-9 h-9 object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="font-display font-bold text-sm md:text-base leading-tight truncate">
                Global Pride International School
              </div>
              <div className="text-school-gold text-xs font-semibold tracking-wide hidden sm:block">
                Admin Panel — Admissions 2026-2027
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={
                onGoHome ??
                (() => {
                  window.location.hash = "";
                })
              }
              className="hidden md:inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              View Website
            </button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-white/30 bg-white/10 hover:bg-white/20 text-white hover:text-white font-semibold gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 col-span-2 sm:col-span-1">
            <div className="w-12 h-12 bg-school-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-school-green" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-school-dark">
                {isLoading ? (
                  <span className="inline-block w-8 h-6 bg-muted rounded animate-pulse" />
                ) : (
                  enquiries.length
                )}
              </div>
              <div className="text-sm text-foreground/60 font-medium">
                Total Enquiries
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-school-gold/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-school-gold-dark" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-school-dark">
                2026–27
              </div>
              <div className="text-sm text-foreground/60 font-medium">
                Academic Year
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-school-dark">
                {isLoading ? (
                  <span className="inline-block w-8 h-6 bg-muted rounded animate-pulse" />
                ) : (
                  filtered.length
                )}
              </div>
              <div className="text-sm text-foreground/60 font-medium">
                {search ? "Filtered Results" : "All Records"}
              </div>
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-border">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-school-dark">
                Admission Enquiries
              </h2>
              <p className="text-sm text-foreground/50">
                All enquiries submitted via the website
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search by name, grade..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 pl-3 pr-9 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green w-48 md:w-56"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="gap-1.5 border-border text-foreground/70 hover:text-school-green hover:border-school-green"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              {enquiries.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCSV}
                  className="gap-1.5 border-border text-foreground/70 hover:text-school-green hover:border-school-green"
                  title="Download CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-12 text-center">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-3 border-school-green/20 border-t-school-green rounded-full animate-spin" />
                <p className="text-foreground/50 text-sm font-medium">
                  Loading enquiries...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="p-12 text-center">
              <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClipboardList className="w-7 h-7 text-destructive/60" />
              </div>
              <p className="font-semibold text-foreground/70 mb-1">
                Failed to load enquiries
              </p>
              <p className="text-sm text-foreground/50 mb-4">
                Check your connection and try again.
              </p>
              <Button
                onClick={() => refetch()}
                size="sm"
                className="bg-school-green hover:bg-school-green/90 text-white"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-14 h-14 bg-school-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClipboardList className="w-7 h-7 text-school-green/60" />
              </div>
              {search ? (
                <>
                  <p className="font-semibold text-foreground/70 mb-1">
                    No results found
                  </p>
                  <p className="text-sm text-foreground/50">
                    No enquiries match &ldquo;{search}&rdquo;.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-foreground/70 mb-1">
                    No enquiries yet
                  </p>
                  <p className="text-sm text-foreground/50">
                    Submitted enquiries will appear here once parents fill in
                    the admissions form.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-school-cream/60 hover:bg-school-cream/60">
                    <TableHead className="font-display font-bold text-school-dark w-12">
                      #
                    </TableHead>
                    <TableHead className="font-display font-bold text-school-dark min-w-[140px]">
                      Student Name
                    </TableHead>
                    <TableHead className="font-display font-bold text-school-dark min-w-[140px]">
                      Parent Name
                    </TableHead>
                    <TableHead className="font-display font-bold text-school-dark min-w-[130px]">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        Contact
                      </span>
                    </TableHead>
                    <TableHead className="font-display font-bold text-school-dark min-w-[120px]">
                      Grade
                    </TableHead>
                    <TableHead className="font-display font-bold text-school-dark min-w-[200px]">
                      Message
                    </TableHead>
                    <TableHead className="font-display font-bold text-school-dark min-w-[160px]">
                      Date & Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((enquiry, index) => (
                    <TableRow
                      key={String(enquiry.id)}
                      className="hover:bg-school-green/5 transition-colors"
                    >
                      <TableCell className="font-semibold text-foreground/40 text-sm">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-semibold text-school-dark">
                        {enquiry.studentName}
                      </TableCell>
                      <TableCell className="text-foreground/80">
                        {enquiry.parentName}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`tel:${enquiry.contactNumber}`}
                          className="text-school-green hover:text-school-green/80 font-semibold transition-colors inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {enquiry.contactNumber}
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 bg-school-gold/15 text-school-gold-dark text-xs font-bold px-2.5 py-1 rounded-full border border-school-gold/20">
                          <GraduationCap className="w-3 h-3" />
                          {enquiry.gradeApplying}
                        </span>
                      </TableCell>
                      <TableCell className="text-foreground/60 text-sm max-w-[200px]">
                        <span
                          className="line-clamp-2"
                          title={enquiry.message || "—"}
                        >
                          {enquiry.message || (
                            <span className="text-foreground/30 italic">
                              No message
                            </span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-foreground/50 text-sm whitespace-nowrap">
                        {formatTimestamp(enquiry.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Table Footer */}
          {!isLoading && filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-border text-sm text-foreground/50 flex items-center justify-between">
              <span>
                Showing {filtered.length} of {enquiries.length} enquiries
              </span>
              <span className="text-xs">
                Last updated: {new Date().toLocaleTimeString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 text-sm text-foreground/40 border-t border-border bg-white/50">
        <p>
          Global Pride International School — Admin Panel &copy;{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
