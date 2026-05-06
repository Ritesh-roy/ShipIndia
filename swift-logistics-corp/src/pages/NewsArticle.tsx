import { Link, useParams } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { posts } from "./News";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";

const NewsArticle = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center container-pro">
        <h1 className="font-display text-3xl text-primary">Article not found</h1>
        <Link to="/news" className="btn-outline-navy mt-6">Back to News</Link>
      </div>
    );
  }

  const related = posts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title}>
        <div className="flex flex-wrap items-center gap-5 text-white/80 text-sm">
          <span className="flex items-center gap-2"><User className="w-4 h-4 text-accent" /> {post.author}</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {post.date}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> {post.read}</span>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-pro max-w-3xl">
          <img src={post.img} alt={post.title} className="rounded-xl shadow-xl w-full h-[420px] object-cover mb-12" />

          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-foreground/90 leading-relaxed font-medium">{post.excerpt}</p>

            <h2 className="font-display text-3xl text-primary mt-12 mb-4">A shifting global landscape</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              The logistics industry has never moved faster. Geopolitical realignments, evolving customs frameworks, and rising customer expectations are reshaping how cargo flows around the world. For shippers, the difference between thriving and merely surviving comes down to choosing the right partners and the right technology.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              At LEO, we believe the next decade will reward operators who combine deep regional expertise with modern, transparent platforms. Our work with thousands of clients across 65 countries has shown us that visibility, accountability, and adaptability are the three pillars of resilient supply chains.
            </p>

            <h2 className="font-display text-3xl text-primary mt-12 mb-4">What this means for shippers</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Forward-looking shippers are taking three concrete actions: diversifying their carrier base, investing in real-time visibility, and partnering with brokers who understand both the macro trends and the micro details of every trade lane.
            </p>
            <ul className="text-muted-foreground space-y-2 mb-5 list-disc pl-6">
              <li>Build redundancy into critical lanes</li>
              <li>Demand transparency at every milestone</li>
              <li>Treat customs as a strategic — not tactical — function</li>
              <li>Use data to drive continuous improvement</li>
            </ul>

            <blockquote className="border-l-4 border-accent pl-6 my-10 italic text-xl text-primary font-display">
              "The best logistics isn't just about moving boxes — it's about moving certainty."
            </blockquote>

            <h2 className="font-display text-3xl text-primary mt-12 mb-4">Looking ahead</h2>
            <p className="text-muted-foreground leading-relaxed">
              We'll continue to share insights, frameworks, and case studies from our work around the world. If you'd like to discuss how these trends affect your supply chain, our team is always happy to talk.
            </p>
          </article>

          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <Link to="/news" className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-accent">
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <Link to="/contact" className="btn-gold">Talk to us <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container-pro">
          <h2 className="font-display text-3xl text-primary mb-10">Related articles</h2>
          <div className="grid md:grid-cols-3 gap-7">
            {related.map(p => (
              <Link key={p.slug} to={`/news/${p.slug}`} className="group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="overflow-hidden aspect-[16/10]">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold">{p.category}</div>
                  <h3 className="font-display text-lg text-primary mt-2 group-hover:text-secondary">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsArticle;
