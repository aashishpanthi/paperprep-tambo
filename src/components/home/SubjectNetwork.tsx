"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { subjects } from "@/data/questions";
import { BookOpen, Calculator, Atom, FlaskConical, Code, HardDrive, Network, Languages } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: BookOpen,
  mathematics: Calculator,
  "visual-programming": Code,
  "operating-system": HardDrive,
  "computer-network": Network,
  english: Languages,
};

interface SubjectNode {
  id: string;
  name: string;
  description: string;
  icon: typeof Atom;
  progress: number; // Progress along path (0-1)
}

export function SubjectNetwork() {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [highlightedSubject, setHighlightedSubject] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [subjectPositions, setSubjectPositions] = useState<{ [key: string]: { x: number; y: number; angle: number; pathLength: number } }>({});
  const currentProgressRef = useRef<number>(0);

  // Define subjects with their progress along the path
  const nodes: SubjectNode[] = [
    {
      id: "physics",
      name: "Physics",
      description: "Study of matter, motion, and energy",
      icon: Atom,
      progress: 0.01,
    },
    {
      id: "visual-programming",
      name: "Visual Programming",
      description: "Programming with visual elements",
      icon: Code,
      progress: 0.2,
    },
    {
      id: "chemistry",
      name: "Chemistry",
      description: "Study of matter and its transformations",
      icon: FlaskConical,
      progress: 0.44,
    },
    {
      id: "operating-system",
      name: "Operating System",
      description: "System software management",
      icon: HardDrive,
      progress: 0.63,
    },
    {
      id: "mathematics",
      name: "Mathematics",
      description: "Study of numbers and patterns",
      icon: Calculator,
      progress: 0.78,
    },
    {
      id: "biology",
      name: "Biology",
      description: "Study of living organisms",
      icon: BookOpen,
      progress: 1,
    },
  ];

  // Use the path from the provided SVG
  const pathData = "M36.4996 18.9999L429.5 253C449.666 265 479 299.9 435 343.5C391 387.1 151 495.333 36.4996 544C12.1662 560.167 -21.9004 602.7 36.4996 643.5C94.8996 684.3 326.5 791.167 435 839.5";
  
  // Car path from the provided code (changed color to primary blue)
  const carPath = "M45.5126 32.8551L52.6609 27.8605C52.8849 27.7015 53.0143 27.5011 53.0633 27.281L68.7632 27.281C71.7233 27.281 74.1201 25.6064 74.1201 23.5405V10.4414C74.1201 8.37307 71.7233 6.69838 68.7632 6.69838L53.0633 6.69838C53.0143 6.4808 52.8849 6.27788 52.6609 6.11897L45.5126 1.12674C44.8442 0.659786 43.6511 0.740459 42.8393 1.3052C42.0311 1.87239 41.9156 2.70852 42.5804 3.17547L47.6259 6.69838L32.9163 6.69838C29.9596 6.69838 27.5593 8.37307 27.5593 10.4414L27.5593 23.5405C27.5593 25.6064 29.9596 27.281 32.9163 27.281L47.6259 27.281L42.5804 30.8088C41.9156 31.2734 42.0311 32.107 42.8393 32.6742C43.6511 33.239 44.8442 33.3196 45.5126 32.8551ZM53.8296 10.3485V11.4388L41.7337 11.4388V10.3485L53.8296 10.3485ZM33.6545 10.3485L38.6546 11.4388L38.6546 22.5406L33.6545 23.6334L33.6545 10.3485ZM41.7337 23.6334V22.5406L53.8296 22.5406L53.8296 23.6334L41.7337 23.6334ZM56.8632 22.5406V11.4388L61.8632 10.3485L61.8632 23.6334L56.8632 22.5406Z";

  // Calculate positions along the path for each subject
  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    const positions: { [key: string]: { x: number; y: number; angle: number; pathLength: number } } = {};

    nodes.forEach((node) => {
      const subjectPathLength = pathLength * node.progress;
      const point = path.getPointAtLength(subjectPathLength);
      const pointBefore = path.getPointAtLength(Math.max(0, subjectPathLength - 1));
      const angle = Math.atan2(point.y - pointBefore.y, point.x - pointBefore.x) * (180 / Math.PI);
      
      positions[node.id] = {
        x: point.x,
        y: point.y,
        angle: angle,
        pathLength: subjectPathLength, // Store the actual path length for this subject
      };
    });

    setSubjectPositions(positions);
  }, []);

  // Initialize car position - match the provided code
  useEffect(() => {
    if (carRef.current) {
      gsap.set(carRef.current, {
        yPercent: 0,
        xPercent: 20,
        rotate: 30,
      });
    }
  }, []);

  // GSAP animation
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
          start: "top center",
          end: "bottom center",
        },
      });

      // Use onUpdate to check when car is near each subject
      if (carRef.current && pathRef.current) {
        tl.to(carRef.current, {
          motionPath: {
            path: pathRef.current || "",
            align: pathRef.current || "",
            alignOrigin: [0.2, 0.5],
            autoRotate: true,
            start: 0,
            end: 1,
          },
          ease: "power1.inOut",
          onUpdate: () => {
            const progress = tl.progress();
            currentProgressRef.current = progress;
            
            if (!pathRef.current) return;
            
            // Calculate car's actual position along the path
            const pathLength = pathRef.current.getTotalLength();
            const carPathLength = pathLength * progress;
            const carPoint = pathRef.current.getPointAtLength(carPathLength);
            
            // Find the closest subject to the car's current visual position (x,y coordinates)
            let closestNode: SubjectNode | null = null;
            let minDistance = Infinity;
            const threshold = 30; // Highlight when within 30 pixels visually

            for (const node of nodes) {
              const subjectPosition = subjectPositions[node.id];
              if (!subjectPosition) continue;
              
              // Calculate visual distance using x,y coordinates
              const dx = carPoint.x - subjectPosition.x;
              const dy = carPoint.y - subjectPosition.y;
              const visualDistance = Math.sqrt(dx * dx + dy * dy);
              
              // Highlight when car is visually close to the subject
              if (visualDistance < minDistance && visualDistance < threshold) {
                minDistance = visualDistance;
                closestNode = node;
              }
            }

            // Highlight the closest subject
            if (closestNode) {
              // Only update if it's different from current
              if (closestNode.id !== highlightedSubject) {
                // Reset previously highlighted subject
                if (highlightedSubject) {
                  const prevEl = cardRefs.current[highlightedSubject];
                  if (prevEl && hoveredSubject !== highlightedSubject) {
                    gsap.to(prevEl, { scale: 1, duration: 0.2 });
                  }
                }
                
                // Highlight new subject
                setHighlightedSubject(closestNode.id);
                const el = cardRefs.current[closestNode.id];
                if (el && hoveredSubject !== closestNode.id) {
                  gsap.to(el, { scale: 1.05, duration: 0.3, ease: "elastic.out(1, 0.5)" });
                }
              }
            } else {
              // Reset highlighted subject when car moves away
              if (highlightedSubject) {
                const el = cardRefs.current[highlightedSubject];
                if (el && hoveredSubject !== highlightedSubject) {
                  gsap.to(el, { scale: 1, duration: 0.2 });
                }
                setHighlightedSubject(null);
              }
            }
          },
        });
      }

      return tl;
    },
    {
      scope: containerRef,
    }
  );

  const SubjectCards = () => {
    if (Object.keys(subjectPositions).length === 0) return null;

    return (
      <>
        {nodes.map((node) => {
          const Icon = node.icon;
          const position = subjectPositions[node.id];
          if (!position) return null;

          const isHovered = hoveredSubject === node.id;
          const isHighlighted = highlightedSubject === node.id;

          return (
            <Link
              key={node.id}
              href={`/${node.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{
                left: `${(position.x / 462) * 100}%`,
                top: `${(position.y / 844) * 100}%`,
              }}
              onMouseEnter={() => {
                setHoveredSubject(node.id);
                const el = cardRefs.current[node.id];
                if (el && !isHighlighted) {
                  gsap.to(el, { scale: 1.1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
                }
              }}
              onMouseLeave={() => {
                setHoveredSubject(null);
                const el = cardRefs.current[node.id];
                if (el && !isHighlighted) {
                  gsap.to(el, { scale: 1, duration: 0.2 });
                }
              }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[node.id] = el;
                }}
                className={cn(
                  "w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-3xl border-2 flex flex-col items-center justify-center p-4 md:p-5 transition-all duration-200 shadow-md",
                  isHovered || isHighlighted
                    ? "bg-primary border-primary shadow-xl"
                    : "bg-white border-muted-foreground/30 hover:border-primary/50 hover:shadow-lg"
                )}
              >
                <Icon
                  className={cn(
                    "w-[48px] h-[48px] md:w-[56px] md:h-[56px] mb-2 md:mb-3 transition-colors duration-200",
                    isHovered || isHighlighted ? "text-white" : "text-primary"
                  )}
                />
                <h3
                  className={cn(
                    "text-sm md:text-base font-semibold text-center leading-tight transition-colors duration-200",
                    isHovered || isHighlighted ? "text-white" : "text-foreground"
                  )}
                >
                  {node.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div
      className="max-w-[1250px] w-full mx-auto relative mt-16 mb-20"
      ref={sectionRef}
    >
      <div className="relative w-full" style={{ aspectRatio: "462/844" }}>
        <svg
          width="462"
          height="844"
          viewBox="0 0 462 844"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          ref={containerRef}
        >
          {/* Path */}
          <path
            ref={pathRef}
            d={pathData}
            stroke="#196CD9"
            strokeWidth="8"
            className="card-path"
          />

          {/* Car icon that follows the path */}
          <path
            ref={carRef}
            d={carPath}
            fill="#196CD9"
          />
        </svg>

        <SubjectCards />
      </div>
    </div>
  );
}
