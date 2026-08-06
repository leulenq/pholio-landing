"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD = "#C9A55A";

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  image: string;
  frame: "portrait" | "wide";
}

const TEAM: TeamMember[] = [
  {
    id: "leul",
    firstName: "Leul",
    lastName: "Enquanhone",
    role: "Co-founder, Engineering",
    bio: "Architects the platform that makes verification, portfolios, and agency workflows feel like one system.",
    image: "/about/team-leul.jpg",
    frame: "portrait",
  },
  {
    id: "natan",
    firstName: "Natan",
    lastName: "Getahun",
    role: "Co-founder, Business",
    bio: "Drives the partnerships and product strategy that connect Pholio's standard to the industry.",
    image: "/about/team-natan.jpg",
    frame: "portrait",
  },
  {
    id: "alex",
    firstName: "Alex",
    lastName: "Rieder",
    role: "Industry Lead, Fashion Week Brooklyn Co-Producer",
    bio: "Opens the doors that let Pholio launch with the people who shape fashion.",
    image: "/about/team-alex.jpg",
    frame: "wide",
  },
];

function Portrait({ member }: { member: TeamMember }) {
  return (
    <motion.article
      className="group"
      initial={useReducedMotion() ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div
        className="relative overflow-hidden bg-[#0a0a0a]"
        style={{ aspectRatio: member.frame === "portrait" ? "4/5" : "16/9" }}
      >
        <Image
          src={member.image}
          alt={`Portrait of ${member.firstName} ${member.lastName}`}
          fill
          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          sizes={member.frame === "portrait" ? "(max-width: 768px) 100vw, 50vw" : "100vw"}
        />
        {/* Hairline frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-[rgba(250,247,242,0.08)]"
        />
      </div>
      <div className="mt-6">
        <p
          className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: GOLD }}
        >
          {member.role}
        </p>
        <h3
          className="font-editorial mb-3"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1,
            color: "#FAF7F2",
          }}
        >
          {member.firstName}{" "}
          <span className="font-editorial-italic" style={{ color: GOLD }}>
            {member.lastName}
          </span>
        </h3>
        <p
          className="max-w-sm font-sans font-light leading-relaxed"
          style={{ color: "rgba(250,247,242,0.5)" }}
        >
          {member.bio}
        </p>
      </div>
    </motion.article>
  );
}

export function TeamSection() {
  const reduceMotion = useReducedMotion();
  const cofounders = TEAM.filter((m) => m.frame === "portrait");
  const leader = TEAM.find((m) => m.frame === "wide");

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-16 max-w-2xl md:mb-24"
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <h2
            className="font-editorial text-[#FAF7F2]"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              lineHeight: 1.05,
            }}
          >
            The people behind the{" "}
            <span className="font-editorial-italic" style={{ color: GOLD }}>
              standard
            </span>
            .
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          {cofounders.map((member) => (
            <Portrait key={member.id} member={member} />
          ))}
        </div>

        {leader && (
          <div className="mt-16 md:mt-24">
            <Portrait member={leader} />
          </div>
        )}
      </div>
    </section>
  );
}
