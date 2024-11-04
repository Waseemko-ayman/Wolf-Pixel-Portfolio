// ================ Optimize Images in JavaScript ================ //

// document.addEventListener("DOMContentLoaded", async () => {
//   const imagesAll = document.querySelectorAll("img");

//   for (let img of imagesAll) {
//     const file = await fetch(img.src).then(res => res.blob()); // تحويل الصورة إلى Blob
//     const options = {
//       maxSizeMB: 1, // الحد الأقصى للحجم بالميغا بايت
//       maxWidthOrHeight: 1024, // الحد الأقصى للعرض أو الارتفاع
//       useWebWorker: true, // استخدام Web Worker لأداء أفضل
//     };

//     try {
//       // Compress the image using Image Compression
//       const compressedFile = await imageCompression(file, options);
//       // Create a URL for the compressed image.
//       const compressedUrl = URL.createObjectURL(compressedFile);

//       // Update the original image source to point to the compressed version.
//       img.src = compressedUrl;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// });

// ========================== Loading Page ======================= //

window.addEventListener("load", function () {
  let loader = document.querySelector(".loading");
  setTimeout(() => {
    loader.style.display = "none";
  }, 900);
})

// ========================== Function URL ========================== //

function move(url) { window.location = url }

// ========================== Floating Button ======================= //

let floatBtn = document.getElementById("floating_btn");
let header = document.querySelector("header");

window.onscroll = function () {
  if (window.scrollY > 600) {
    floatBtn.style.display = "block";
  } else {
    floatBtn.style.display = "none";
  };
};

floatBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};

// ======================== Header - NavBar ========================= //

let navBar = document.querySelector("nav");
let menuWrapper = document.querySelector(".menu-wrapper");
let menuIcon = document.getElementById("menu");

menuWrapper.addEventListener('click', () => {
  menuIcon.classList.toggle('close-active');
  navBar.classList.toggle('menu-active');
});

// ======================= Home Page - Offerings Section ======================== //

let offeringsCards = document.querySelector(".offerings_cards");

let offeringsInfoArr = [
  {
    id: "userExperience",
    imgSrc: "image-5",
    imgOrder: "-1",
    iconSrc: "ux-icon",
    title: "User Experience Design",
    priefDesc: "Crafting seamless and intuitive user joumeys to enhance engagement and satisfaction.",
    description: "At Wolf Pixel, we consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad.Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae. Itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum molestiae temporibus pariatur and reiciendis. Lorem ipsum dolor sit amet consectetur.",
    dataAos: "fade-right",
    iconAlt: "ux-experience design",
  },
  {
    id: "userInterface",
    imgSrc: "image-7",
    imgOrder: "1",
    iconSrc: "ui-icon",
    title: "User Interface Design",
    priefDesc: "Creating visually appending interfaces that combine aesthetics with functionality.",
    description: "At Wolf Pixel, we consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad.Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae. Itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum molestiae temporibus pariatur and reiciendis. Lorem ipsum dolor sit amet consectetur.",
    dataAos: "fade-up",
    iconAlt: "user interface design",
  },
  {
    id: "productPrototyping",
    imgSrc: "image-5",
    imgOrder: "-1",
    iconSrc: "product-prototype-icon",
    title: "Product Prototyping",
    priefDesc: "ransforming concepts into tangible prototypes to valiedate ideas and iterate quickly.",
    description: "At Wolf Pixel, we consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad.Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae. Itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum molestiae temporibus pariatur and reiciendis. Lorem ipsum dolor sit amet consectetur.",
    dataAos: "fade-left",
    iconAlt: "product prototype",
  },
  {
    id: "wireframing",
    imgSrc: "image-7",
    imgOrder: "1",
    iconSrc: "wireframe-icon",
    title: "Wireframing & Mockups",
    priefDesc: "Developing detaild wireframes and high-fidelity mockups to visualize design effectively.",
    description: "At Wolf Pixel, we consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad.Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae. Itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum molestiae temporibus pariatur and reiciendis. Lorem ipsum dolor sit amet consectetur.",
    dataAos: "fade-right",
    iconAlt: "wireframing & mockup",
  },
  {
    id: "responsiveWebDesign",
    imgSrc: "image-5",
    imgOrder: "-1",
    iconSrc: "responsive-icon",
    title: "Responsive Web Design",
    priefDesc: "Designing adaptable and responsive website that a consistent user experience devices.",
    description: "At Wolf Pixel, we consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad.Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae. Itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum molestiae temporibus pariatur and reiciendis. Lorem ipsum dolor sit amet consectetur.",
    dataAos: "fade-up",
    iconAlt: "responsive design",
  },
  {
    id: "mobileApp",
    imgSrc: "image-7",
    imgOrder: "1",
    iconSrc: "mobile-icon",
    title: "Mobile App Design",
    priefDesc: "Designing intuitive and user-friendly mobile applicationsfor iOS and Android platforms.",
    description: "At Wolf Pixel, we consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad.Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae. Itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum molestiae temporibus pariatur and reiciendis. Lorem ipsum dolor sit amet consectetur.",
    dataAos: "fade-left",
    iconAlt: "mobile app design",
  },
];

for (let i = 0; i < offeringsInfoArr.length; i++) {
  if (offeringsCards) {
    offeringsCards.innerHTML += `
      <div class="card" id="${offeringsInfoArr[i].id}" data-aos="${offeringsInfoArr[i].dataAos}">
        <div class="image flexCenter">
          <img src="../../assets/${offeringsInfoArr[i].iconSrc}.png" alt="${offeringsInfoArr[i].iconAlt}" loading="lazy">
        </div>
        <div class="info">
          <h3>${offeringsInfoArr[i].title}</h3>
          <p>${offeringsInfoArr[i].priefDesc}</p>
        </div>
      </div>
    `;

    let offeringsCard = document.querySelectorAll(".offerings_cards .card");

    // Open Offerings Card in Services Page Based On Section (Current Target Id)
    offeringsCard.forEach((offCard) => {
      offCard.addEventListener("click", function (e) {
        location.href = `/html/Pages/services.html#${e.currentTarget.id}`;
      })
    })
  }
};

// ================ Home Page - Experiences Section ================ //

let experiencesCards = document.querySelector(".experiences .details");

let experienceDtls = [
  {
    profession: "Creative Minds",
    address: "New York City, USA",
    date: "February 2022 - Present",
    desc: "Innvoated designs, New York, Senior Product Designer",
    skills: ["UXUI", "Branding"],
    imgShow: true,
  },
  {
    profession: "Innovative Designs Inc",
    address: "USA",
    date: "January 2020 - February 2022",
    desc: "Led UXUI, San Francisco. Crafting tomorrow's experiences",
    skills: ["UXUI", "Branding"],
    imgShow: false,
  },
  {
    profession: "Visionary Creations Ltd",
    address: "London, UK",
    date: "January 2020 - September 2021",
    desc: "Directed designs, London, Design Director, January 2020",
    skills: ["UXUI", "Branding"],
    imgShow: false,
  },
  {
    profession: "FutureTech Berlin",
    address: "Germany",
    date: "January 2020 - August 2021",
    desc: "Principal Designer, Berlin, Crafting tomorrow's experiences",
    skills: ["UXUI", "Branding"],
    imgShow: false,
  },
];

for (let i = 0; i < experienceDtls.length; i++) {
  if (experiencesCards) {
    experiencesCards.innerHTML += `
      <div class="card">
        <div class="card-info gridFrFr">
          <div class="address" data-aos="fade-right">
            <h4><span>${experienceDtls[i].profession},</span> ${experienceDtls[i].address}</h4>
            <div class="date flexAlignCenter">
              <i class="fa-solid fa-dot-circle"></i>
              <p>${experienceDtls[i].date}</p>
            </div>
          </div>
          <div class="experience flexBetween" data-aos="fade-left">
            <p>${experienceDtls[i].desc}</p>
            <div class="skills flexAlignStart">
              <span class="flexCenter">UIUX</span>
              <span class="flexCenter">Branding</span>
            </div>
          </div>
        </div>
        ${experienceDtls[i].imgShow === true ? `<img src="../../assets/image-1.jpg" alt="phone" title="phone" data-aos="fade-up" loading="lazy" />` : ""}
      </div>
    `;
  }
};

// ================== Home Page - My Work Section ================== //

let workCards = document.querySelector(".my_work .work_cards");

let workDetailsArr = [
  {
    id: 1,
    profession: "Creative Minds",
    address: "New York",
    date: "February 2022 - Present",
    dataAos: "fade-right",
  },
  {
    id: 2,
    profession: "Innovative Designs Inc",
    address: "USA",
    date: "January 2020 - February 2022",
    dataAos: "fade-left",
  },
  {
    id: 3,
    profession: "Visionary Ltd",
    address: "London, UK",
    date: "January 2020 - September 2021",
    dataAos: "fade-right",
  },
  {
    id: 4,
    profession: "FutureTech Berlin",
    address: "Germany",
    date: "January 2020 - August 2021",
    dataAos: "fade-left",
  },
];

for (let i = 0; i < workDetailsArr.length; i++) {
  if (workCards) {
    workCards.innerHTML += `
      <div class="card flexCenterBetween" id="${workDetailsArr[i].id}" data-aos="${workDetailsArr[i].dataAos}">
        <span>0${workDetailsArr[i].id}</span>
        <div class="work">
          <h4>${workDetailsArr[i].profession}, ${workDetailsArr[i].address}</h4>
          <div class="date flexAlignCenter">
            <i class="fa-solid fa-dot-circle"></i>
            <p>${workDetailsArr[i].date}</p>
          </div>
        </div>
        <i class="fa-solid fa-angle-right"></i>
      </div>
    `;
  }

  let workCard = document.querySelectorAll(".work_cards .card");

  // [2]
  if (window.localStorage.getItem("workId")) {
    workCard.forEach((card) => {
      // Remove Class active From All Cards
      card.classList.remove("active");
      card.lastElementChild.classList.remove("iconRotate");
    });

    let currentElId = document.querySelector(`[id="${window.localStorage.getItem("workId")}"]`)?.classList.add("active");

    if (currentElId?.classList.contains("active")) {
      // Add Class iconRotate to Icon In Current Target By Id
      currentElId?.lastElementChild?.classList.add("iconRotate");
    };
  };

  // [1]
  workCard.forEach((card) => {
    card.addEventListener("click", function (e) {

      workCard.forEach((card) => {
        // Remove Class active From All Cards
        card.classList.remove("active");
        card.lastElementChild.classList.remove("iconRotate");
      });

      // Add Class active to Current Target
      card.classList.add("active");

      // Add Class iconRotate to Icon In Current Target
      e.currentTarget.lastElementChild.classList.add("iconRotate");

      window.localStorage.setItem("workId", e.currentTarget.id);

      // Test
      // console.log(e.currentTarget.id);
    });
  });
};

// ==================== Services Page ==================== //

let servicesCards = document.querySelector(".services .services-cards");

for (let i = 0; i < offeringsInfoArr.length; i++) {
  if (servicesCards) {
    servicesCards.innerHTML += `
      <div class="info" id="${offeringsInfoArr[i].id}">
        <img
          src="../../assets/${offeringsInfoArr[i].imgSrc}.jpg"
          alt="person"
          title="person"
          data-aos="fade-right"
          loading="lazy"
          style="order: ${offeringsInfoArr[i].imgOrder};"
        />
        <div class="infos_text" data-aos="fade-left">
          <h2>${offeringsInfoArr[i].title}</h2>
          <p>${offeringsInfoArr[i].description}</p>
          <div class="links flexAlignCenter">
            <a href="#" class="btn style_btn">
              Let's Talk
              <i class="fa-solid fa-angle-right"></i>
            </a>
            <a href="#" class="btn">View Works</a>
          </div>
        </div>
      </div>
    `;
  }
};

// ================================ Portfolio Page ================================= //

let blogs = [
  {
    id: 1,
    src: "image-5",
    title: "Blogs with Compelling Mobile App that will Inspire You",
    priveTitle: "Parking App Casestudy",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "June 27, 2022",
    category: "mobile",
    dataAos: "right",
  },
  {
    id: 2,
    src: "image-6",
    title: "Blogs with Compelling Website that will Inspire You",
    priveTitle: "Agency Website Design",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Aug 17, 2023",
    category: "web",
    dataAos: "up",
  },
  {
    id: 3,
    src: "image-7",
    title: "Blogs with Compelling UI Design that will Inspire You",
    priveTitle: "Creative Saas Design",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Sep 5, 2024",
    category: "design",
    dataAos: "left",
  },
  {
    id: 4,
    src: "image-7",
    title: "Blogs with Compelling Mobile App that will Inspire You",
    priveTitle: "Parking App Casestudy",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Oct 2, 2019",
    category: "mobile",
    dataAos: "right",
  },
  {
    id: 5,
    src: "image-6",
    title: "Blogs with Compelling Website that will Inspire You",
    priveTitle: "Real Estate Website Design",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "May 20, 2015",
    category: "web",
    dataAos: "up",
  },
  {
    id: 6,
    src: "image-6",
    title: "Blogs with Compelling UI Design that will Inspire You",
    priveTitle: "UI/UX Design for App",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Sep 5, 2024",
    category: "design",
    dataAos: "left",
  },
  {
    id: 7,
    src: "image-5",
    title: "Blogs with Compelling Mobile App that will Inspire You",
    priveTitle: "Parking App Casestudy",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Nov 14, 2020",
    category: "mobile",
    dataAos: "right",
  },
  {
    id: 8,
    src: "image-6",
    title: "Blogs with Compelling Website that will Inspire You",
    priveTitle: "Website Design: Landing Page",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Dec 10, 2022",
    category: "web",
    dataAos: "up",
  },
  {
    id: 9,
    src: "image-7",
    title: "Blogs with Compelling UI Design that will Inspire You",
    priveTitle: "UI/UX Design for App",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Sep 5, 2024",
    category: "design",
    dataAos: "left",
  },
  {
    id: 10,
    src: "image-5",
    title: "Blogs with Compelling Mobile App that will Inspire You",
    priveTitle: "Parking App Casestudy",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "June 27, 2022",
    category: "mobile",
    dataAos: "right",
  },
  {
    id: 11,
    src: "image-6",
    title: "Blogs with Compelling Website that will Inspire You",
    priveTitle: "Website Design: Landing Page",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Aug 17, 2023",
    category: "web",
    dataAos: "up",
  },
  {
    id: 12,
    src: "image-7",
    title: "Blogs with Compelling Brand that will Inspire You",
    priveTitle: "Creative Design Agency (Brand)",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "June 27, 2022",
    category: "brand",
    dataAos: "right",
  },
  {
    id: 13,
    src: "image-5",
    title: "Blogs with Compelling WebFlow that will Inspire You",
    priveTitle: "WebFlow Project",
    description: "Consectetur adipisicing elit. Recusandae at itaque repudiandae? Facilis, commodi ad. Praesentium fuga perspiciatis, facilis magnam unde porro eaque atque facere doloribus soluta nemo in beatae nam ut similique, itaque ea suscipit iusto fugiat officiis illum. Asperiores perspiciatis animi corporis voluptates dolorum",
    postDate: "Aug 17, 2023",
    category: "webflow",
    dataAos: "up",
  },
];

// ============= Portfolio Page - Select tabs and blogs elements ============== //
let tabs = document.querySelectorAll(".tabs button");
let portfolioCards = document.querySelector(".portfolio .portfolio_cards");

// ================ Trigger Get Blog From localStorage Fucntion =============== //
getBlogsTabFromLocalStorage();

if (window.localStorage.getItem("tabId")) {
  tabs.forEach((tab) => {
    tab.classList.remove("checked");
  });
  document.querySelector(`[id="${window.localStorage.getItem("tabId")}"]`)?.classList.add("checked");
};

tabs.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    // Remove Checked Class From All Tabs
    tabs.forEach((tab) => { tab.classList.remove("checked") });
    // Add Checked Class To The Clicked Tab
    tab.classList.add("checked");

    // Add Id To Current Tab To LocalStorage
    window.localStorage.setItem("tabId", e.currentTarget.id);

    // Add Current Category To LocalStorage
    window.localStorage.setItem("category", e.currentTarget.dataset.category);

    // Get Category From LocalStorage
    const category = window.localStorage.getItem("category");

    // Filtering Array of Blogs Related To Category From LocalStorage
    const filteredBlogs = blogs.filter((blog) => blog.category === category);

    // Add Blogs To LocalStorage
    addBlogsTabToLocalStorage(filteredBlogs);

    // Display Blogs Related To The Selected Tab
    displayBlogsTab(filteredBlogs);
  });
});

// =================== Add Tab Blogs To LocalStorage =================== //
function addBlogsTabToLocalStorage(filteredBlogs) { window.localStorage.setItem("blogs", JSON.stringify(filteredBlogs)); };

// ================== Get Tab Blogs From LocalStorage ================== //
function getBlogsTabFromLocalStorage() {
  let data = window.localStorage.getItem("blogs");
  if (data) {
    let blogs = JSON.parse(data); // blogs => The Array that Contains All Blogs
    displayBlogsTab(blogs);
  };
};

// =================== Display Tab Blogs In The Page =================== //
function displayBlogsTab(filteredBlogs) {
  if (portfolioCards) {
    // Clear Existing Blogs
    portfolioCards.innerHTML = "";

    for (let i = 0; i < filteredBlogs.length; i++) {
      portfolioCards.innerHTML += `
        <div class="card">
          <img src="../../assets/${filteredBlogs[i].src}.jpg" alt="${filteredBlogs[i].priveTitle}" title="${filteredBlogs[i].title}" loading="lazy" />
          <div class="project_title">
            <div class="skills flex">
              <span class="flexCenter">Branding</span>
              <span class="flexCenter">UIUX</span>
            </div>
            <h3>${filteredBlogs[i].priveTitle}</h3>
          </div>
        </div>
      `;
    };
  }
};

// ========================= Blog Section ========================== //
let mainBlogCards = document.querySelector(".main_blogs");
let searchBlogCards = document.querySelector(".search_results");

// =================== Blog Page - Blog Id Page ==================== //
if (window.localStorage.getItem("blogId")) {
  let blogData = JSON.parse(window.localStorage.getItem("blogId"));

  let exploreBlogInfo = document.querySelector(".explore_blogs .info");

  if (exploreBlogInfo) {
    exploreBlogInfo.innerHTML = `
      <div class="card">
        <div class="image">
          <img
            src="../../assets/${blogData.src}.jpg"
            alt="phone"
            title="phone"
            loading="lazy"
          />
        </div>
      </div>
      <div class="infos_text">
        <h2>${blogData.title}</h2>
        <p>${blogData.description}</p>
        <a href="#" class="btn style_btn">
          Read More
          <i class="fa-solid fa-angle-right"></i>
        </a>
        <div class="posted">
          <p>Posted on</p>
          <div class="date flexAlignCenter">
            <span class="flexAlignCenter">
            <i class="fa-solid fa-dot-circle"></i>For ${blogData.category}</span>
            <span>${blogData.postDate}</span>
          </div>
        </div>
      </div>
    `;
  }
}

// ================== Blog Page - Show Search Blog ================= //
let searchInput = document.getElementById("search");
let search = document.getElementById("searchBtn");
let pagintion = document.getElementById("pagintion");
// ====================== Errors ====================== //
let searchError = document.querySelector(".error");
// ===================== Not Found ==================== //
let notFound = document.querySelector(".not-found");

// ============== Blog Page - Display Blogs Search ============== //
function searchOperation() {
  if (searchInput.value !== "") {
    // Filtering Array of Blogs Related To Category From LocalStorage
    let filteredBlogs = blogs.filter(item => item.category === searchInput.value.toLowerCase());

    if (filteredBlogs.length > 0) {
      // Add Blogs To LocalStorage
      addBlogsSearchToLocalStorage(filteredBlogs);

      // Display Blogs Related To The Selected Tab
      renderBlogs(filteredBlogs, searchBlogCards);

      // Show Pagination
      pagintion.style.display = "inline-block";

      // Hide Not found Message
      notFound.style.display = "none";
    } else {
      // Show Pagination
      pagintion.style.display = "none";

      // Show Not found Message
      notFound.style.display = "block";
    }
  } else {
    errorsStyling(searchInput, searchError, "var(--error-color)", "block", "Please enter a search query.");
  }
}

if (search) { search.addEventListener("click", function () { searchOperation(); }); }

// ============= Blog Page - Add Blogs Search To LocalStorage ============= //
function addBlogsSearchToLocalStorage(filteredBlogs) { window.localStorage.setItem("blogs search", JSON.stringify(filteredBlogs)); }

// ============ Blog Page - Get Blogs Search From LocalStorage ============ //
function getBlogsFromLocalStorage() {
  let data = window.localStorage.getItem("blogs search");
  if (data) {
    let blogs = JSON.parse(data);
    renderBlogs(blogs, searchBlogCards);
  }
}
// Trigger Get Blog Search From localStorage Fucntion
getBlogsFromLocalStorage();

// =================== Render Blogs Function =================== //
function renderBlogs(blogArray, targetContainer, limit = blogArray.length) {
  // Clear Existing Blogs
  if (targetContainer) {
    targetContainer.innerHTML = "";

    for (let i = 0; i < limit; i++) {
      targetContainer.innerHTML += `
        <div class="card" id="${i}" data-aos="fade-${blogArray[i].dataAos}">
          <img src="../../assets/${blogArray[i].src}.jpg" alt="phone" title="phone" loading="lazy" />
          <button class="arrow flexCenter">
          <i class="fa-solid fa-angle-up flexCenter"></i>
          </button>
        </div>
      `;
    }
  }
  setupCardListeners(targetContainer, blogArray);
}

// =================== Move To Blog Page Based On Blog Id  =================== //
function setupCardListeners(targetContainer, blogArray) {
  if (targetContainer) {
    let arrowBtns = targetContainer.querySelectorAll("button");
    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        move("blog.html");
        let blogId = JSON.stringify(blogArray[e.currentTarget.parentElement.id]);
        window.localStorage.setItem("blogId", blogId);
      });
    });
  }
}

renderBlogs(blogs, mainBlogCards, 3);

// ======================= Footer - Email Validation ======================= //

let footerForm = document.getElementById("footer_form");
let footerEmail = document.querySelector("[name='email']");
let submit = document.getElementById("submit");
let popUp = document.querySelector(".connected-popup");
let popUpText = document.querySelector(".connected-popup h2");
let popUpClose = document.getElementById("popup-close");
// let progress = document.querySelector(".connected-popup .progress");
// ====================== Errors ====================== //
let footerEmailError = document.getElementById("email-error");

function checkFooterEmail(e) {
  const emailReg = /^[^\s]+@[^\s]+\.[a-z]{2,3}$/ig;

  if (footerEmail.value !== "") {
    if (sessionStorage.getItem("connectedEmail")) {
      if (footerEmail.value === sessionStorage.getItem("connectedEmail")) {
        e.preventDefault();
        connected();
      } else if (emailReg.test(footerEmail.value)) {
        emailValueValidTest();
      } else {
        errorsStyling(footerForm, footerEmailError, "var(--error-color)", "block", "Please enter a valid email: you@example.com");
      }
    } else if (emailReg.test(footerEmail.value)) {
      emailValueValidTest();
    } else {
      errorsStyling(footerForm, footerEmailError, "var(--error-color)", "block", "Please enter a valid email: you@example.com");
    }
  } else {
    e.preventDefault();
    errorsStyling(footerForm, footerEmailError, "var(--error-color)", "block", "Please enter a your email.");
    footerEmailError.style.color = "var(--error-color)";
  }

  footerEmail.oninput = function () { errorsStyling(footerForm, footerEmailError, "var(--light-gray-color)", "none"); }
}

// ======================== Errors Styling  ======================== //
function errorsStyling(inputType, errorType, borderColor, errorDisplay, errorMsg) {
  inputType.style.borderColor = borderColor;
  errorType.style.display = errorDisplay;
  errorType.innerHTML = errorMsg;
};

// ===================== Email Value Valid Test ==================== //
function emailValueValidTest() {
  window.sessionStorage.setItem("connectedEmail", footerEmail.value);

  // ======================== Footer - Popup ======================== //
  // Show Popup
  popUp.style.display = "block";
  // Hide Popup
  popUpClose.addEventListener("click", () => popUp.style.display = "none");

  errorsStyling(footerForm, footerEmailError, "var(--valid-color)", "block", "Send Done.");
  footerEmailError.style.color = "var(--valid-color)";
  footerEmail.value = "";

  setTimeout(() => {
    errorsStyling(footerForm, footerEmailError, "var(--light-gray-color)", "none");
    footerEmailError.style.color = "var(--error-color)";
  }, 2000);
}

// ======================== Connected Msg ======================== //
function connected() {
  errorsStyling(footerForm, footerEmailError, "var(--valid-color)", "block", "Your Are Connected.");
  footerEmailError.style.color = "var(--valid-color)";
  footerEmail.value = "";

  setTimeout(() => {
    errorsStyling(footerForm, footerEmailError, "var(--light-gray-color)", "none");
    footerEmailError.style.color = "var(--error-color)";
  }, 2000);
};

// ================ Calling Function on From Submit =============== //
submit.addEventListener("click", function (e) { checkFooterEmail(e); });

footerEmail.onblur = () => { errorsStyling(footerForm, footerEmailError, "#ccc", "none"); }

// ========================== let's Talk Page - Inputs Validation ========================== //

let startTalkForm = document.getElementById("talk_form");
let allInputs = document.querySelectorAll(".talk_wrapper input");
let nameInputs = document.querySelectorAll(".talk_wrapper .name input");
let fNameInput = document.querySelector(".talk_wrapper [name='first-name']");
let lNameInput = document.querySelector(".talk_wrapper [name='last-name']");
let emailInput = document.querySelector(".talk_wrapper [name='email']");
let phoneInput = document.querySelector(".talk_wrapper [name='phone']");
let msgTextArea = document.querySelector(".talk_wrapper [name='message']");
// ============================ Errors ============================ //
let emailError = document.querySelector(".talk_wrapper .email_error");
let phoneError = document.querySelector(".talk_wrapper .phone_error");
let messageError = document.querySelector(".talk_wrapper .message_error");

// ======================== Name Validation ======================== //
function checkTalkName() {
  const nameReg = /[a-zA-Z]/ig;

  nameInputs.forEach((nameInput) => {
    if (nameInput.value !== "") {
      if (nameReg.test(nameInput.value)) {
        errorsStyling(nameInput, nameInput.nextElementSibling, "#ccc", "none");
      } else {
        errorsStyling(nameInput, nameInput.nextElementSibling, "var(--error-color)", "block", "Please enter valid name.");
      }
    } else {
      errorsStyling(nameInput, nameInput.nextElementSibling, "var(--error-color)", "block", "Please enter your name.");
    }
  });
};

// ======================= Email Validation ======================= //
function checkTalkEmail() {
  const emailReg = /^[^\s]+@[^\s]+\.[a-z]{2,3}$/ig;

  if (emailInput.value !== "") {
    if (emailReg.test(emailInput.value)) {
      errorsStyling(emailInput, emailError, "#ccc", "none");
    } else {
      errorsStyling(emailInput, emailError, "var(--error-color)", "block", "Please enter a valid email: you@example.com");
    }
  } else {
    errorsStyling(emailInput, emailError, "var(--error-color)", "block", "Please enter a your email.");
  }
};

// ======================= Phone Validation ======================= //
function checkTalkPhone() {
  const phoneReg = /00\(\d{1,3}\)\s\d{4,}-\d{4,}/g; // 00(972) 59216-4680

  if (phoneInput.value !== "") {
    if (phoneReg.test(phoneInput.value)) {
      errorsStyling(phoneInput, phoneError, "#ccc", "none");
    } else {
      errorsStyling(phoneInput, phoneError, "var(--error-color)", "block", "Please enter a valid Phone: 00(123) 45678-9101");
    }
  } else {
    errorsStyling(phoneInput, phoneError, "var(--error-color)", "block", "Please enter a your phone.");
  }
};

// ====================== Password Validation ====================== //
function checkMsg() {
  if (msgTextArea.value !== "") {
    if (msgTextArea.value.length >= 20) {
      errorsStyling(msgTextArea, messageError, "#ccc", "none");
    } else {
      errorsStyling(msgTextArea, messageError, "var(--error-color)", "block", "Please enter at least 20 character");
    }
  } else {
    errorsStyling(msgTextArea, messageError, "var(--error-color)", "block", "Please enter a your password.");
  }
};

// ============= Storage The User Data (Token) To Array ============= //
function storageUserDataInArray() {
  // userData = [];
  const userToken = {
    fullName: `${fNameInput.value} ${lNameInput.value}`,
    email: emailInput.value,
    phone: phoneInput.value,
    message: message.value,
  };

  // Add Token To user Data Array
  userData.push(userToken);
  // Add Tokens To LocalStorage
  addTokensToLocalStorage(userData);
}

// =================== Add Tokens To LocalStorage =================== //
let userData = [];
function addTokensToLocalStorage(userData) { window.localStorage.setItem("token", JSON.stringify(userData)); }

// ================ Calling Function on From Submit ================ //
if (startTalkForm) {
  startTalkForm.addEventListener("submit", function (e) {
    allInputs.forEach((input) => {
      if (input.value === "" && msgTextArea.value === "") { e.preventDefault(); }
    });

    if (fNameInput.value !== "" && lNameInput.value !== "" && emailInput.value !== "" && phoneInput.value !== "" && msgTextArea.value !== "") {
      // Storage The User Data (Token) To Array
      storageUserDataInArray();
    }

    checkTalkName();
    checkTalkEmail();
    checkTalkPhone();
    checkMsg();
  });

  nameInputs.forEach((nameInput) => { nameInput.addEventListener("keyup", checkTalkName); });
  emailInput.addEventListener("keyup", checkTalkEmail);
  phoneInput.addEventListener("keyup", checkTalkPhone);
  msgTextArea.addEventListener("keyup", checkMsg);
}
