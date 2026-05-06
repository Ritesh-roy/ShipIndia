import PageHero from "@/components/PageHero";
import { Target, Eye, Heart, Award, Globe2, Users } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const values = [
  { icon: Target, t: "Mission", d: "To enable global commerce by delivering logistics solutions that are reliable, transparent, and sustainable." },
  { icon: Eye, t: "Vision", d: "To be the most trusted logistics partner for ambitious businesses operating across borders." },
  { icon: Heart, t: "Values", d: "Integrity, accountability, customer obsession, and a relentless drive to do things better." },
];

const milestones = [
  { y: "1998", t: "Founded in Singapore", d: "Started as a regional freight forwarder serving Southeast Asia." },
  { y: "2006", t: "Expansion into Europe", d: "Opened our Rotterdam hub, unlocking the Asia–Europe corridor." },
  { y: "2014", t: "Americas Network", d: "Established offices across North and South America." },
  { y: "2020", t: "Digital Transformation", d: "Launched the LEO visibility and tracking platform." },
  { y: "2025", t: "65 Countries", d: "Now operating across six continents with 1,200+ specialists." },
];

const About = () => (
  <>
    <PageHero eyebrow="About LEO" title="Three decades of moving the world's most important cargo." subtitle="From a single Singapore office to a network spanning six continents, our story is one of trust, technology, and tireless service." />
    <section className="section">
      <div className="container-pro grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="eyebrow mb-5">Our Story</div>
          <h2 className="font-display text-4xl md:text-5xl text-primary font-bold text-balance">Built by logisticians, for logisticians.</h2>
          <div className="gold-bar my-6" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            LEO was founded in 1998 by a small team of freight veterans who believed shippers deserved better — better visibility, better service, and better outcomes. Twenty-seven years later, that belief still drives every decision we make.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4">
            Today, our 1,200+ specialists in 65 countries deliver complex, multimodal logistics solutions for industry leaders in manufacturing, retail, energy, and beyond. We combine deep operational expertise with proprietary technology to keep your supply chain moving, no matter what the world throws at it.
          </p>
        </div>
        <img src={aboutTeam} alt="LEO operations team" loading="lazy" className="rounded-xl shadow-xl w-full h-[520px] object-cover" />
      </div>
    </section>

    <section className="section bg-muted">
      <div className="container-pro grid md:grid-cols-3 gap-6">
        {values.map(({ icon: Icon, t, d }) => (
          <div key={t} className="card-pro">
            <div className="w-14 h-14 rounded-md bg-gradient-gold flex items-center justify-center text-primary mb-5">
              <Icon className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl text-primary">{t}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="section">
      <div className="container-pro">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow justify-center inline-flex mb-5">Our Journey</div>
          <h2 className="font-display text-4xl md:text-5xl text-primary font-bold text-balance">Milestones that shaped us.</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {milestones.map((m, i) => (
            <div key={m.y} className={`relative flex md:items-center mb-12 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 pl-12 md:pl-0 md:px-10">
                <div className="card-pro">
                  <div className="font-display text-3xl text-accent">{m.y}</div>
                  <h3 className="font-display text-xl text-primary mt-1">{m.t}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{m.d}</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-gold ring-4 ring-background" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section bg-gradient-navy text-primary-foreground">
      <div className="container-pro grid md:grid-cols-3 gap-10 text-center">
        {[{ i: Users, v: "1,200+", l: "Specialists" }, { i: Globe2, v: "65", l: "Countries" }, { i: Award, v: "27", l: "Years of Excellence" }].map(({ i: Icon, v, l }) => (
          <div key={l}>
            <Icon className="w-10 h-10 text-accent mx-auto" />
            <div className="font-display text-5xl mt-4 text-accent">{v}</div>
            <div className="uppercase text-sm tracking-widest text-white/70 mt-2">{l}</div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default About;
