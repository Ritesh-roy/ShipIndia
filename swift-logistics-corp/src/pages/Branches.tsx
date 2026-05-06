import PageHero from "@/components/PageHero";
import { MapPin, Phone, Mail, Search } from "lucide-react";
import { useMemo, useState } from "react";

const branches = [
  { city: "Singapore", region: "Asia Pacific", country: "Singapore", addr: "200 Harbor Drive, Singapore 018956", phone: "+65 6500 1234", email: "sg@leologistics.com", hq: true },
  { city: "Hong Kong", region: "Asia Pacific", country: "China SAR", addr: "Suite 4801, ICC, 1 Austin Road West, Kowloon", phone: "+852 2890 6677", email: "hk@leologistics.com" },
  { city: "Shanghai", region: "Asia Pacific", country: "China", addr: "Tower B, Lujiazui Financial District, Pudong", phone: "+86 21 6080 9900", email: "sh@leologistics.com" },
  { city: "Tokyo", region: "Asia Pacific", country: "Japan", addr: "Shiodome City Center, Minato-ku, Tokyo", phone: "+81 3 6253 4400", email: "tk@leologistics.com" },
  { city: "Mumbai", region: "Asia Pacific", country: "India", addr: "BKC One, Bandra Kurla Complex, Mumbai 400051", phone: "+91 22 6133 8800", email: "mb@leologistics.com" },
  { city: "Rotterdam", region: "Europe", country: "Netherlands", addr: "Maasboulevard 100, 3063 NS Rotterdam", phone: "+31 10 200 3456", email: "rt@leologistics.com" },
  { city: "Hamburg", region: "Europe", country: "Germany", addr: "HafenCity, Am Sandtorkai 50, 20457 Hamburg", phone: "+49 40 3299 6600", email: "hh@leologistics.com" },
  { city: "London", region: "Europe", country: "United Kingdom", addr: "1 Canada Square, Canary Wharf, London E14 5AB", phone: "+44 20 7946 1100", email: "ln@leologistics.com" },
  { city: "Dubai", region: "Middle East", country: "UAE", addr: "Jebel Ali Free Zone, Gate 4, Dubai", phone: "+971 4 555 7788", email: "db@leologistics.com" },
  { city: "Los Angeles", region: "Americas", country: "USA", addr: "1500 S Wilmington Ave, Long Beach, CA 90810", phone: "+1 213 555 4400", email: "la@leologistics.com" },
  { city: "New York", region: "Americas", country: "USA", addr: "200 Liberty Street, 23rd Floor, New York, NY 10281", phone: "+1 212 555 9988", email: "ny@leologistics.com" },
  { city: "São Paulo", region: "Americas", country: "Brazil", addr: "Av. Paulista 1374, Bela Vista, São Paulo", phone: "+55 11 3043 7700", email: "sp@leologistics.com" },
];

const regions = ["All", "Asia Pacific", "Europe", "Middle East", "Americas"];

const Branches = () => {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => branches.filter(b =>
    (region === "All" || b.region === region) &&
    (b.city.toLowerCase().includes(q.toLowerCase()) || b.country.toLowerCase().includes(q.toLowerCase()))
  ), [q, region]);

  return (
    <>
      <PageHero eyebrow="Branch Locator" title="65 countries. One LEO." subtitle="Find a branch near you and connect directly with our local logistics specialists.">
        <div className="bg-card rounded-xl p-3 flex items-center gap-2 max-w-xl shadow-elegant">
          <Search className="w-5 h-5 text-muted-foreground ml-3" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search by city or country..."
            className="flex-1 bg-transparent text-foreground py-2.5 focus:outline-none"
          />
        </div>
      </PageHero>

      <section className="section">
        <div className="container-pro">
          <div className="flex flex-wrap gap-2 mb-10">
            {regions.map(r => (
              <button key={r} onClick={() => setRegion(r)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  region === r ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-foreground/70 hover:bg-border"
                }`}>
                {r}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(b => (
              <div key={b.city} className="card-pro relative">
                {b.hq && <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase bg-gradient-gold text-primary px-2.5 py-1 rounded">HQ</span>}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-md bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-primary">{b.city}</h3>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{b.country} • {b.region}</div>
                  </div>
                </div>
                <div className="mt-5 space-y-2.5 text-sm">
                  <p className="text-foreground/80 leading-relaxed">{b.addr}</p>
                  <a href={`tel:${b.phone}`} className="flex items-center gap-2 text-foreground/80 hover:text-accent"><Phone className="w-4 h-4 text-accent" /> {b.phone}</a>
                  <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-foreground/80 hover:text-accent"><Mail className="w-4 h-4 text-accent" /> {b.email}</a>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No branches match your search.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Branches;
