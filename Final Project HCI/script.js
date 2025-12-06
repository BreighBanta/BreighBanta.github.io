

const container = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
    <div class="project-title">${project.title}</div>
    <div class="project-details">
      <div class="project-desc">${project.description}</div>
      <a class="project-link" href="${project.link}" target="_blank">View Project</a>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("expanded");
  });

  container.appendChild(card);
});
