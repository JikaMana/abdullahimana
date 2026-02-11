gsap.registerPlugin(ScrollTrigger);

// Animations
window.addEventListener("load", () => {
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
  heroTl.to(".hero-anim", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.1,
  });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 92%",
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
});

const projectsData = [
  {
    id: 1,
    title: "Bilma Scents Ecommerce",
    cat: "E-Commerce Store",
    img: "https://bilma-scents.vercel.app/assets/hero.jpg",
    stack: "React.js, Tailwind CSS, Firebase",
    desc: "A comprehensive online perfume store designed for seamless browsing and purchasing. Features include secure user authentication, product search, cart and wishlist functionality, and responsive layouts that ensure an optimized experience across all devices. The platform prioritizes discoverability, user retention, and smooth checkout flow, enabling customers to make purchases efficiently while providing store administrators with an easy-to-manage backend for inventory, orders, and customer interactions.",
  },
  {
    id: 2,
    title: "Recyclo (Waste Management App)",
    cat: "Mobile App / Full-Stack",
    img: "https://yahayaabdullahimana.vercel.app/assets/recyclo.jpg",
    stack: "React Native, Expo, Express.js, MongoDB",
    desc: "A community-focused recycling mobile application that allows users to schedule waste pickups, track collection requests, and monitor collection history in real-time. Integrated with MongoDB for efficient data management and Express.js for scalable API handling, Recyclo improves community engagement, reduces missed collections, and promotes environmental awareness. The app offers a clean, intuitive interface, push notifications for pickup reminders, and real-time status updates for better user experience and operational efficiency.",
  },
  {
    id: 3,
    title: "UniResolve (University Grievance Platform)",
    cat: "SaaS / University Management",
    img: "https://yahayaabdullahimana.vercel.app/assets/uniresolve.jpg",
    stack:
      "React.js, Tailwind CSS, Express.js, MongoDB, Cloudinary, NextAuth.js",
    desc: "UniResolve is a cloud-based, multi-tenant SaaS platform designed to streamline infrastructure and academic grievance reporting across tertiary institutions. Each university operates within its own private dashboard ensuring data isolation. Students can submit detailed reports with images (via Cloudinary), geo-tagged locations, and optional anonymous reporting. Reports follow a structured resolution lifecycle (Pending, In-Progress, Resolved), while administrators can track, manage, and resolve issues efficiently. The platform also features a data analytics dashboard providing metrics such as average resolution time and campus hotspots, enabling universities to make data-driven decisions and improve operational efficiency. UniResolve is built to be scalable, allowing new institutions to onboard seamlessly without separate codebases.",
  },
  {
    id: 4,
    title: "MSSN ABUAD Website",
    cat: "Web App / Student Org",
    img: "https://mssnabuad.org/assets/hero.jpg",
    stack: "React.js, Tailwind CSS, Firebase",
    desc: "The official web platform for the Muslim Students’ Society of Nigeria at ABUAD, designed to facilitate communication, engagement, and event management for students. Features include blogs, forums, and event listings, alongside responsive layouts to ensure access on both mobile and desktop. The website enhances student participation, provides a centralized hub for society updates, and improves content accessibility. Backend powered by Firebase ensures smooth authentication, real-time updates, and secure data storage.",
  },
  {
    id: 5,
    title: "Triple R Recycling Website",
    cat: "Company Website / Recycling",
    img: "https://triplerrecyclingltd.com/assets/hero.jpg",
    stack: "React.js, Tailwind CSS, Firebase",
    desc: "The corporate website for Triple R Recycling, built to promote the company’s recycling services while providing a functional booking system for PET bottle pickups. The site showcases the company’s mission, services, and social impact initiatives. Integrated forms allow users to schedule pickups and track their submissions, enhancing community participation and operational transparency. The platform features responsive design, fast loading times, and clear navigation to ensure visitors can quickly access information and schedule recycling services efficiently.",
  },
];

function openProject(id) {
  const p = projectsData.find((x) => x.id === id);
  const modal = document.getElementById("projectModal");
  document.getElementById("modalContent").innerHTML = `
                <div class="grid md:grid-cols-2">
                    <div class="h-64 md:h-auto bg-cover bg-center" style="background-image: url('${p.img}')"></div>
                    <div class="p-8 md:p-12">
                        <span class="font-mono text-xs text-accent uppercase tracking-widest mb-2 block">${p.cat}</span>
                        <h2 class="text-3xl font-bold mb-6">${p.title}</h2>
                        <div class="space-y-6 text-secondary leading-relaxed">
                            <p>${p.desc}</p>
                            <div>
                                <h4 class="text-white text-sm font-bold mb-3">Project Tech</h4>
                                <div class="flex flex-wrap gap-2 text-xs font-mono">
                                    ${p.stack
                                      .split(",")
                                      .map(
                                        (s) =>
                                          `<span class="bg-white/5 px-3 py-1 rounded border border-white/5">${s.trim()}</span>`,
                                      )
                                      .join("")}
                                </div>
                            </div>
                            <div class="pt-6 border-t border-white/10">
                                <button onclick="closeModal()" class="text-sm font-bold text-white hover:text-accent transition-colors">Close Case Study</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("projectModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Gemini Planner Logic
const apiKey = "";
async function generateProjectArchitecture() {
  const input = document.getElementById("aiInput").value;
  if (!input) return;

  const btn = document.getElementById("aiBtn");
  const outputContainer = document.getElementById("aiOutputContainer");
  const loading = document.getElementById("aiLoading");
  const resultDiv = document.getElementById("aiResult");

  btn.disabled = true;
  outputContainer.classList.remove("hidden");
  loading.classList.remove("hidden");
  resultDiv.innerHTML = "";

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: input }] }],
      systemInstruction: {
        parts: [
          {
            text: "You are a Senior Full Stack Architect. Provide a structured roadmap for the following project brief. Include: 1. Frontend Architecture. 2. Backend & Database Strategy. 3. Key API Endpoints. 4. Dev Complexity. Use professional, technical language.",
          },
        ],
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Strategy generation failed.";
    resultDiv.innerHTML = text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
  } catch (err) {
    resultDiv.innerHTML =
      "Consultation service is offline. Please reach out via email.";
  } finally {
    loading.classList.add("hidden");
    btn.disabled = false;
  }
}
