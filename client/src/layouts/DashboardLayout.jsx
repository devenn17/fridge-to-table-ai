import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import MobileNav from "../components/layout/MobileNav";

export default function DashboardLayout({ title, subtitle, actions, children }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#EEF2EA" }}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-5 md:p-8 pb-24 md:pb-8">
          <div className="bg-white rounded-2xl border border-[#E4E9E0] shadow-sm min-h-[calc(100vh-150px)] p-5 md:p-8">
            {(title || subtitle || actions) && (
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  {title && (
                    <h2
                      className="text-2xl font-semibold text-[#1C2620] tracking-tight"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {title}
                    </h2>
                  )}
                  {subtitle && <p className="text-[#5B6B60] mt-1.5 text-sm">{subtitle}</p>}
                </div>
                {actions && <div className="flex items-center gap-3">{actions}</div>}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
