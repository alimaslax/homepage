import React, { useEffect, useMemo, useRef, useState } from "react";

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

interface ProjectStory {
  title: string;
  paragraphs: string[];
  highlights?: { label: string; value: string }[];
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
  story?: ProjectStory;
}

interface ProjectGroup {
  id: string;
  title: string;
  projects: Project[];
}

interface ProjectsProps {
  groups: ProjectGroup[];
}

export default function Projects({ groups }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(true);
  const [openGroupIds, setOpenGroupIds] = useState<string[]>(() =>
    groups.map((group) => group.id)
  );
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const projects = useMemo(() => groups.flatMap((group) => group.projects), [groups]);

  const scrollToProject = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroupIds((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const readingLine = window.scrollY + window.innerHeight * 0.38;
      let current = 0;
      sectionRefs.current.forEach((ref, index) => {
        if (ref && ref.offsetTop <= readingLine) current = index;
      });
      setActiveIndex(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="projects" className="projects-workspace">
      <aside className="projects-index" aria-label="Project navigation">
        <div className="projects-index-top">
          <span className="projects-index-kicker">Portfolio index</span>
          <span className="projects-index-count">{String(projects.length).padStart(2, "0")} entries</span>
        </div>

        <button
          className="projects-index-toggle"
          onClick={() => setIsProjectMenuOpen((open) => !open)}
          aria-expanded={isProjectMenuOpen}
          aria-controls="project-navigation-groups"
        >
          <span>Project folders</span>
          <span aria-hidden="true">{isProjectMenuOpen ? "−" : "+"}</span>
        </button>

        {isProjectMenuOpen && (
          <div className="projects-index-folders" id="project-navigation-groups">
            {groups.map((group) => (
              <section className="projects-index-group" key={group.id}>
                <button
                  className="projects-index-group-title"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={openGroupIds.includes(group.id)}
                  aria-controls={`project-group-${group.id}`}
                >
                  <span>{group.title}</span>
                  <span aria-hidden="true">{openGroupIds.includes(group.id) ? "⌄" : "›"}</span>
                </button>
                <div id={`project-group-${group.id}`} hidden={!openGroupIds.includes(group.id)}>
                  {group.projects.map((project) => {
                    const index = projects.findIndex((item) => item.id === project.id);
                    return (
                      <button
                        key={project.id}
                        className={`projects-index-item ${index === activeIndex ? "is-active" : ""}`}
                        onClick={() => scrollToProject(index)}
                        aria-current={index === activeIndex ? "true" : undefined}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{project.title}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="projects-index-footer">
          <span className="projects-index-pulse" />
          Updating in public
        </div>
      </aside>

      <div className="projects-ledger">
        <header className="projects-hero">
          <div>
            <span className="eyebrow">Selected work · 2024—now</span>
            <h1>Projects, collected<br /><em>in one working ledger.</em></h1>
          </div>
          <p>
            A practical index of things I’ve designed, shipped, and kept improving—
            from native applications to speech systems.
          </p>
        </header>

        {groups.map((group) => (
          <section className="project-folder" key={group.id} aria-labelledby={`heading-${group.id}`}>
            <div className="project-folder-heading">
              <span className="project-folder-mark">/{group.id}</span>
              <h2 id={`heading-${group.id}`}>{group.title}</h2>
              <span>{String(group.projects.length).padStart(2, "0")} projects</span>
            </div>

            <div className="project-panel-list">
              {group.projects.map((project) => {
                const index = projects.findIndex((item) => item.id === project.id);
                return (
                  <article
                    key={project.id}
                    ref={(element) => { sectionRefs.current[index] = element; }}
                    className="project-panel"
                    id={`project-${project.id}`}
                  >
                    <div className="project-panel-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="project-panel-body">
                      <header className="project-panel-header">
                        <div>
                          <span className="project-date">{project.date}</span>
                          <h3>{project.title}</h3>
                          <p className="project-subtitle">{project.subtitle}</p>
                        </div>
                        <span className="project-panel-state">Case study</span>
                      </header>

                      <p className="project-tagline">{project.tagline}</p>

                      <div className="project-tags" aria-label="Technologies used">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>

                      <section className="project-notes" aria-label={`${project.title} notes`}>
                        <span className="panel-label">Build notes</span>
                        <ul>
                          {project.description.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </section>

                      {project.story && (
                        <section className="project-story">
                          <span className="panel-label">Research note</span>
                          <h4>{project.story.title}</h4>
                          {project.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                          {project.story.highlights && (
                            <div className="project-story-highlights">
                              {project.story.highlights.map((highlight) => (
                                <div key={highlight.label}>
                                  <strong>{highlight.value}</strong>
                                  <small>{highlight.label}</small>
                                </div>
                              ))}
                            </div>
                          )}
                        </section>
                      )}

                      {project.images && project.images.length > 0 && (
                        <section className="project-media" aria-label={`${project.title} gallery`}>
                          <span className="panel-label">Interface captures</span>
                          <div>
                            {project.images.map((src, imageIndex) => (
                              <img key={src} src={src} alt={`${project.title} screenshot ${imageIndex + 1}`} loading="lazy" />
                            ))}
                          </div>
                        </section>
                      )}

                      {project.architecture && (
                        <section className="project-architecture">
                          <div className="project-architecture-heading">
                            <span className="panel-label">System map</span>
                            <h4>{project.architecture.title}</h4>
                            <p>{project.architecture.summary}</p>
                          </div>
                          <ol>
                            {project.architecture.layers.map((layer) => (
                              <li key={layer.name}>
                                <strong>{layer.name}</strong>
                                <p>{layer.detail}</p>
                              </li>
                            ))}
                          </ol>
                          <div className="architecture-flow">
                            <span>Data flow</span>
                            <p>{project.architecture.dataFlow}</p>
                          </div>
                        </section>
                      )}

                      {(project.github || project.website) && (
                        <footer className="project-actions">
                          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><i className="fa fa-github" /> Source / access <span>↗</span></a>}
                          {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link" /> Open project <span>↗</span></a>}
                        </footer>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
