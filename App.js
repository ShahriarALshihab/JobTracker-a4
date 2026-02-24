const jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 – $175,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "none"
  },
  {
    id: 2,
    company: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 – $120,000",
    description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "none"
  },
  {
    id: 3,
    company: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 – $165,000",
    description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "none"
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 – $190,000",
    description: "Design and maintain scalable cloud infrastructure using AWS and Node.js. Experience with microservices architecture required.",
    status: "none"
  },
  {
    id: 5,
    company: "FinTech Ventures",
    position: "Frontend Engineer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 – $160,000",
    description: "Build responsive, accessible user interfaces for financial applications. Strong TypeScript and React skills needed.",
    status: "none"
  },
  {
    id: 6,
    company: "EduTech Labs",
    position: "Full Stack Developer",
    location: "Austin, TX",
    type: "Remote",
    salary: "$95,000 – $130,000",
    description: "Develop and maintain an online learning platform used by over 500,000 students. Experience with Python and Vue.js preferred.",
    status: "none"
  },
  {
    id: 7,
    company: "Greenway Logistics",
    position: "DevOps Engineer",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$110,000 – $145,000",
    description: "Automate deployment pipelines and maintain Kubernetes clusters. Solid experience with CI/CD tools and Linux required.",
    status: "none"
  },
  {
    id: 8,
    company: "Nova Creative Studio",
    position: "UI/UX Developer",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$90,000 – $125,000",
    description: "Collaborate with designers to bring high-fidelity prototypes to life. Proficiency in Figma and Tailwind CSS is a big plus.",
    status: "none"
  }
];

let currentTab="all"; 

function getFilteredJobs(){
    if(currentTab === 'all') return jobs.filter(j=>!j.deleted); 
    return jobs.filter(j=> !j.deleted && j.status === currentTab); 
}

function renderJobs(){
 const container = document.getElementById("jobs-container"); 
 const filtered=getFilteredJobs(); 

 const countLabel=document.getElementById("visible-count"); 
 countLabel.textContent = filtered.length + " job" + (filtered.length !== 1 ? "s" : "");
 if(filtered.length === 0){
    container.innerHTML =emptyStateHTML();  
    return; 
 }
 container.innerHTML = filtered.map(job=> cardHTML(job)).join(""); 
}

function emptyStateHTML(){
return`
<div class="empty-state">
 <h3 class="text-slate-600 font-semibold text-base mb-1">No jobs available</h3>
</div>
`
}

function cardHTML(job){
    const statusLabel= job.status === "none"? "not Applied" : job.status.toUpperCase(); 

const statusClass = job.status === "none" ? "status-none" : job.status === "interview" ? "status-interview" : "status-rejected";
  const interviewSelected = job.status === "interview" ? "selected" : "";
  const rejectedSelected  = job.status === "rejected"  ? "selected" : "";

  return `
    <div class="job-card rounded-xl p-4 md:p-5 mx-1 my-1" id="card-${job.id}">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-bold text-slate-800 text-base leading-tight">${job.company}</h3>
          <p class="text-slate-500 text-sm">${job.position}</p>
        </div>
        <button class="delete-btn flex-shrink-0" onclick="deleteJob(${job.id})" title="Remove job">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>

      <p class="text-xs text-slate-400 mt-2">
      <span>${job.location}</span>
      <span class="mx-1">•</span>
       <span>${job.type}</span>
        <span class="mx-1">•</span>
        <span>${job.salary}</span>
        </p>

        <span class="status-badge ${statusClass} inline-block mt-3">${statusLabel}</span>

        <p class="text-sm text-slate-500 mt-2 leading-relaxed">${job.description}</p>

        <div class="flex gap-2 mt-3">
        <button class="btn-interview ${interviewSelected}" onclick="setStatus(${job.id}, 'interview')">INTERVIEW</button>
        <button class="btn-rejected ${rejectedSelected}" onclick="setStatus(${job.id}, 'rejected')">REJECTED</button>
      </div>
    </div>

  `
}

function switchTab(tab){
    currentTab=tab; 
    document.querySelectorAll(".tab-btn").forEach(btn=>{
        btn.classList.remove("active"); 
        btn.classList.add("border-slate-200", "text-slate-500"); 
        btn.classList.remove("border-transparent"); 
    }); 

    const active= document.querySelector(`[data-tab="${tab}"]`); 
    active.classList.add("active"); 
    active.classList.remove("border-slate-200", "text-slate-500"); 
    active.classList.add("border-transparent"); 
    renderJobs(); 
}


function setStatus(id, newStatus){
    const job= jobs.find(j => j.id === id); 
    if(!job)return; 

    if(job.status === newStatus){
        job.status="none"; 
    }else{
        job.status=newStatus; 
    }

    updateDashboard(); 
    renderJobs(); 
}

function deleteJob(id){
    const job= jobs.find(j=> j.id===id); 
    if(!job)return; 
    job.deleted= true; 
    updateDashboard(); 
    renderJobs(); 
}

function updateDashboard(){
    const active= jobs.filter(j=> !j.deleted); 
    document.getElementById("count-total").textContent = active.length; 
    document.getElementById("count-interview").textContent= active.filter(j=> j.status === "interview").length; 
  
document.getElementById("count-rejected").textContent = active.filter(j => j.status === "rejected").length;
}

renderJobs(); 