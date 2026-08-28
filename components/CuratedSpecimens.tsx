"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Star, TreePine, Ruler, Eye, ChevronRight } from "lucide-react";
import { useRef } from "react";

const specimens = [
  {
    id: "monstera-albo",
    name: "Monstera Deliciosa",
    botanicalName: "Albo Variegata",
    description:
      "Exceptional variegation patterns — each leaf a unique marble of white and green. Sourced from heritage Thai nurseries.",
    age: "12 years",
    height: "2.4m",
    price: "€8,900",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
    isRare: true,
    certificate: true,
    careLevel: "moderate",
  },
  {
    id: "spiritus-sancti",
    name: "Philodendron",
    botanicalName: "Spiritus Sancti",
    description:
      "The holy grail of aroids. Extremely rare, with elongated lanceolate leaves of deep emerald. Fewer than 500 in cultivation worldwide.",
    age: "8 years",
    height: "1.8m",
    price: "€14,500",
    image:
      "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&q=80",
    isRare: true,
    certificate: true,
    careLevel: "expert",
  },
  {
    id: "ficus-lyrata",
    name: "Ficus Lyrata",
    botanicalName: "Giant Specimen",
    description:
      "A monumental floor-to-ceiling statement. This mature fiddle-leaf fig has been cultivated for over a decade in controlled conditions.",
    age: "15 years",
    height: "3.8m",
    price: "€6,200",
    image:
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80",
    isRare: false,
    certificate: true,
    careLevel: "moderate",
  },
  {
    id: "anthurium-warocqueanum",
    name: "Anthurium",
    botanicalName: "Warocqueanum",
    description:
      "The Queen Anthurium with velvety, elongated leaves reaching extraordinary dimensions. A centerpiece for any serious collection.",
    age: "6 years",
    height: "1.5m",
    price: "€4,800",
    image:
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&q=80",
    isRare: true,
    certificate: true,
    careLevel: "expert",
  },
  {
    id: "rhapidophora",
    name: "Rhaphidophora",
    botanicalName: "Tetrasperma",
    description:
      "Mini Monstera with fenestrated leaves. Elegant trailing habit perfect for elevated positions in contemporary interiors.",
    age: "4 years",
    height: "1.2m",
    price: "€2,100",
    image:
      "https://images.unsplash.com/photo-1620803366004-119b57f54cd6?w=800&q=80",
    isRare: false,
    certificate: true,
    careLevel: "low",
  },
  {
    id: "alocasia-azlanii",
    name: "Alocasia",
    botanicalName: "Azlanii",
    description:
      "The Red Mambo — iridescent leaves that shimmer between purple, green, and copper under changing light angles.",
    age: "3 years",
    height: "0.8m",
    price: "€3,400",
    image:
      "https://images.unsplash.com/photo-1616690248363-21d3fb0ea5c7?w=800&q=80",
    isRare: true,
    certificate: true,
    careLevel: "expert",
  },
];

export default function CuratedSpecimens() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // The drum effect: translate the entire card track horizontally
  // based on vertical scroll progress
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((specimens.length - 3) / specimens.length) * 100}%`]
  );

  // Opacity and scale for the section header
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [0, -40]);

  // Individual card transforms for depth/drum effect
  const rotateY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const perspective = 1200;

  return (
    <section
      id="specimens"
      ref={sectionRef}
      className="relative bg-alabaster-50"
      style={{ height: `${specimens.length * 85}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Section Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-12 px-6 text-center lg:px-16"
        >
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brass-500">
            The Collection
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light text-forest-900 md:text-6xl">
            Curated Specimens
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm font-light leading-relaxed text-forest-600/70">
            Each botanical specimen is hand-selected for its exceptional form,
            rare variegation, or monumental scale. Scroll to explore the
            collection.
          </p>
        </motion.div>

        {/* Horizontal Drum Carousel */}
        <div className="relative w-full overflow-visible">
          {/* Drum track */}
          <motion.div
            style={{ x }}
            className="flex gap-8 px-6 lg:px-16"
          >
            {specimens.map((specimen, index) => {
              // Each card gets a subtle parallax depth based on its position
              const cardProgress = useTransform(
                scrollYProgress,
                [
                  Math.max(0, (index - 1) / specimens.length),
                  Math.min(1, (index + 2) / specimens.length),
                ],
                [0, 1]
              );
              const cardScale = useTransform(cardProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
              const cardOpacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
              const cardRotate = useTransform(
                scrollYProgress,
                [0, 1],
                [8 + index * 2, -8 - index * 2]
              );

              return (
                <motion.article
                  key={specimen.id}
                  style={{
                    scale: cardScale,
                    opacity: cardOpacity,
                    rotateY: cardRotate,
                    perspective,
                    transformPerspective: perspective,
                    minWidth: "380px",
                    maxWidth: "420px",
                    flexShrink: 0,
                  }}
                  className="group relative flex-shrink-0 bg-alabaster-50 shadow-xl shadow-forest-900/5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-forest-100">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                      <div
                        className="h-full w-full bg-cover bg-center transition-all duration-700"
                        style={{
                          backgroundImage: `url('${specimen.image}')`,
                        }}
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Badges */}
                    <div className="absolute left-4 top-4 flex flex-col gap-2">
                      {specimen.isRare && (
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.08 }}
                          className="flex items-center gap-1.5 bg-brass-500 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-forest-950"
                        >
                          <Star className="h-3 w-3" />
                          Rare
                        </motion.span>
                      )}
                      {specimen.certificate && (
                        <span className="flex items-center gap-1.5 bg-alabaster-50/90 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-forest-800 backdrop-blur-sm">
                          <Award className="h-3 w-3" />
                          Certified
                        </span>
                      )}
                    </div>

                    {/* Eye overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-alabaster-50/40 bg-alabaster-50/10 backdrop-blur-sm">
                        <Eye className="h-5 w-5 text-alabaster-50" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-light text-forest-900">
                          {specimen.name}
                        </h3>
                        <p className="mt-1 font-sans text-sm italic text-forest-600/70">
                          {specimen.botanicalName}
                        </p>
                      </div>
                      <p className="font-serif text-xl font-semibold text-brass-600">
                        {specimen.price}
                      </p>
                    </div>

                    <p className="mt-4 font-sans text-sm leading-relaxed text-forest-700/70 line-clamp-2">
                      {specimen.description}
                    </p>

                    {/* Meta Tags */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 border border-forest-200 px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-wider text-forest-600">
                        <TreePine className="h-3 w-3" />
                        {specimen.age}
                      </span>
                      <span className="flex items-center gap-1.5 border border-forest-200 px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-wider text-forest-600">
                        <Ruler className="h-3 w-3" />
                        {specimen.height}
                      </span>
                      <span className="border border-forest-200 px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-wider text-forest-600">
                        {specimen.careLevel}
                      </span>
                    </div>

                    {/* CTA */}
                    <motion.a
                      href="#"
                      className="mt-6 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-brass-600 transition-colors duration-300 hover:text-brass-700"
                      whileHover={{ x: 4 }}
                    >
                      Request Private Viewing
                      <ChevronRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-alabaster-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-alabaster-50 to-transparent" />
        </div>

        {/* Scroll progress indicator */}
        <div className="mt-10 flex justify-center">
          <div className="h-[2px] w-48 overflow-hidden bg-forest-200">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left bg-brass-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
