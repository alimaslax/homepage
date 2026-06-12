import React, { useState, useEffect, useRef } from "react";

interface ArchitectureLayer {
  name: string;
  detail: string;
}

interface Architecture {
  title: string;
  summary: string;
  layers: ArchitectureLayer[];
  dataFlow: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tagline: string;
  tags: string[];
  github: string | null;
  website?: string | null;
  images?: string[];
  description: string[];
  architecture: Architecture | null;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToProject = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + window.innerHeight / 3;
      let current = 0;
      sectionRefs.current.forEach((ref, i) => {
        if (ref && ref.offsetTop <= scrollTop) {
          current = i;
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="projects" ref={containerRef}>
      {/* Left stepper nav */}
      <nav className="projects-stepper" aria-label="Project navigation">
        <span className="stepper-title">Projects</span>
        <div className="stepper-track">
          {projects.map((project, i) => (
            <button
              key={project.id}
              className={`stepper-item ${i === activeIndex ? "active" : ""}`}
              onClick={() => scrollToProject(i)}
              aria-label={`Navigate to ${project.title}`}
              title={project.title}
            >
              <span className="stepper-dot" />
              <span className="stepper-label">{project.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <div className="projects-content">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="project-section"
            id={`project-${project.id}`}
          >
            <div className="project-section-inner">
              <div className="project-section-header">
                <span className="project-section-date">{project.date}</span>
                <h2 className="project-section-title">{project.title}</h2>
                <p className="project-section-subtitle">{project.subtitle}</p>
              </div>

              <p className="project-section-tagline">{project.tagline}</p>

              <div className="project-section-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>

              <ul className="project-section-description">
                {project.description.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>

              {/* Images */}
              {project.images && project.images.length > 0 && (
                <div className="project-section-images">
                  {project.images.map((src, j) => (
                    <img
                      key={j}
                      src={src}
                      alt={`${project.title} screenshot ${j + 1}`}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}

              {/* Architecture */}
              {project.architecture && (
                <div className="project-section-architecture">
                  <h3>{project.architecture.title}</h3>
                  <p className="architecture-summary">
                    {project.architecture.summary}
                  </p>

                  <div className="architecture-layers">
                    {project.architecture.layers.map((layer, j) => (
                      <div key={j} className="architecture-layer">
                        <div className="layer-connector">
                          <div className="layer-dot" />
                          {j < project.architecture!.layers.length - 1 && (
                            <div className="layer-line" />
                          )}
                        </div>
                        <div className="layer-content">
                          <h4>{layer.name}</h4>
                          <p>{layer.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="architecture-flow">
                    <h4>Data Flow</h4>
                    <p>{project.architecture.dataFlow}</p>
                  </div>
                </div>
              )}

              {/* GitHub link */}
              {project.github && (
                <div className="project-section-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github-btn"
                  >
                    <i className="fa fa-github" />
                    Request Access
                  </a>
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github-btn"
                      style={{ marginLeft: "12px" }}
                    >
                      <i className="fa fa-external-link" />
                      View App
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
