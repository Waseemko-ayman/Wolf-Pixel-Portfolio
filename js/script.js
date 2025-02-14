document.addEventListener("DOMContentLoaded", function () {
  // Ensure that the header is fully loaded before searching for links and button
  const headerLoadedInterval = setInterval(function () {
    const navLinks = document.querySelectorAll("nav a");
    const talkButton = document.querySelector("header button"); // Select the button in the header
    // If links and button are found in the page
    if (navLinks.length > 0 && talkButton) {
      clearInterval(headerLoadedInterval); // Stop the interval once elements are found
      // Get the current page name from the URL
      const currentPage = window.location.pathname.split("/").pop(); // Example: "index.html"
      // Add or remove the 'page_active' class for links based on the open page
      navLinks.forEach(link => {
        const targetPage = link.getAttribute("onclick").match(/move\('(.*?)'\)/);
        if (targetPage && targetPage[1] === currentPage) {
          link.classList.add("page_active"); // Add the class for the open page
        } else {
          link.classList.remove("page_active"); // Remove the class from other pages
        }
      });
      // Add 'style_btn' class to the button if the "letsStartTalk.html" page is open
      if (currentPage === "letsStartTalk.html") {
        talkButton.classList.add("style_btn");
      } else {
        talkButton.classList.remove("style_btn");
      }
    }
  }, 100);
});
// ============================================================== //
/*
  - I have defined the result variable outside the loadContent function 
  so that the data loaded from the data() function is stored only once. 
  This means that the data will not be loaded every time when loadContent is called.
*/
let result = null;
// Function to update content
async function loadContent() {
  try {
    // Load loading content first
    const loadingResponse = await fetch('partials/loading.html');
    if (!loadingResponse.ok) throw new Error('Failed to load loading page');
    const loadingData = await loadingResponse.text();
    let loadingPlaceholder = document.getElementById('loading-placeholder');
    if (loadingPlaceholder) loadingPlaceholder.innerHTML = loadingData;

    // Show the loader initially
    let loader = document.querySelector(".loading");
    document.body.style.overflow = "hidden";
    loader.style.display = "block";  // Show loader

    // Load header content
    const headerResponse = await fetch('partials/header.html');
    if (!headerResponse.ok) throw new Error('Failed to load header');
    const headerData = await headerResponse.text();
    let headerPlaceholder = document.getElementById('header-placeholder');
    headerPlaceholder.innerHTML = headerData;

    // Load footer content
    const footerResponse = await fetch('partials/footer.html');
    if (!footerResponse.ok) throw new Error('Failed to load footer');
    const footerData = await footerResponse.text();
    let footerPlaceholder = document.getElementById('footer-placeholder');
    footerPlaceholder.innerHTML = footerData;

    // Load MyWork section content
    const myWorkResponse = await fetch('partials/myWork.html');
    if (!myWorkResponse.ok) throw new Error('Failed to load footer');
    const myWorkData = await myWorkResponse.text();
    let myWorkPlaceholder = document.getElementById('my-work-placeholder');
    if (myWorkPlaceholder) myWorkPlaceholder.innerHTML = myWorkData;

    // Load Floating Button content
    const floatBtnResponse = await fetch('partials/floatingBtn.html');
    if (!floatBtnResponse.ok) throw new Error('Failed to load floating Button');
    const floatBtnData = await floatBtnResponse.text();
    let floatBtnPlaceholder = document.getElementById('floating-btn-placeholder');
    if (floatBtnPlaceholder) floatBtnPlaceholder.innerHTML = floatBtnData;

    // Load Main Blog Cards content
    const mainBlogsResponse = await fetch('partials/mainBlogCards.html');
    if (!mainBlogsResponse.ok) throw new Error('Failed to main blog cards');
    const mainBlogsData = await mainBlogsResponse.text();
    let mainBlogsPlaceholder = document.getElementById('main-blogs-placeholder');
    if (mainBlogsPlaceholder) mainBlogsPlaceholder.innerHTML = mainBlogsData;

    // After content is loaded, hide the loader
    setTimeout(() => {
      loader.style.display = "none";
      document.body.style.overflow = "auto";  // Allow scrolling again
    }, 900); // Timeout duration for loader display

    // If the data has not been loaded before, we call the data() function to load it.
    if (!result) {
      result = await data(); // Data is loaded only once here.
    }
    // Load page-specific content based on the current page
    loadPageSpecificContent(result);

    initializeMenu();
    initializefooter();
    initializeFloatingBtn();
    initializeThemeSettings();
  } catch (error) {
    console.error('Error loading content:', error);
  }
}
loadContent();

// ============================================================== //
// Close WebSocket connection before page unload to avoid bfcache issues
window.addEventListener('beforeunload', () => {
  if (webSocket && webSocket.readyState === WebSocket.OPEN) {
    webSocket.close();
  }
});
// ========================== Function URL ========================== //
// function move(url) { window.location = url }
function move(page) { window.location.href = page; }
// ========================== Floating Button ======================= //
function initializeFloatingBtn() {
  let floatBtn = document.getElementById("floating_btn");
  window.onscroll = function () {
    if (window.scrollY > 600) {
      floatBtn.classList.add("show");
    } else {
      floatBtn.classList.remove("show");
    };
  };
  floatBtn.onclick = function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
}
// ======================== Theme Settings ========================== //
function initializeThemeSettings() {
  const themeToggle = document.querySelector('.dark-mode-toggle');
  const themeIcons = themeToggle.querySelectorAll('i');
  // Apply stored theme settings if available
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    // Set theme-color for dark mode
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#121212');
    // Hide moon, show sun
    themeIcons[0].style.cssText = 'opacity: 0; transform: scale(0);';
    themeIcons[1].style.cssText = 'opacity: 1; transform: scale(1);';
  } else {
    // Set theme-color for light mode
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1a80b6');
    // Show moon, hide sun
    themeIcons[0].style.cssText = 'opacity: 1; transform: scale(1);';
    themeIcons[1].style.cssText = 'opacity: 0; transform: scale(0);';
  }
  // Toggle dark mode
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains("dark-mode")) {
      // Dark mode: show sun, hide moon
      localStorage.setItem("darkMode", "enabled");
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#121212');
      themeIcons[0].style.cssText = 'opacity: 0; transform: scale(0);';
      themeIcons[1].style.cssText = 'opacity: 1; transform: scale(1);';
    } else {
      // Light mode: show moon, hide sun
      localStorage.setItem("darkMode", "disabled");
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1a80b6');
      themeIcons[0].style.cssText = 'opacity: 1; transform: scale(1);';
      themeIcons[1].style.cssText = 'opacity: 0; transform: scale(0);';
    }
  });
}
// ============================= Header ============================= //
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  let scrollTop = window.scrollY;

  if (scrollTop > lastScrollTop) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollTop = scrollTop;
});
// ======================== Header - NavBar ========================= //
function initializeMenu() {
  const menuWrapper = document.querySelector(".menu-wrapper");
  const navBar = document.querySelector("nav");
  const menuIcon = document.getElementById("menu");

  if (menuWrapper && navBar && menuIcon) {
    menuWrapper.addEventListener("click", () => {
      menuIcon.classList.toggle("close-active");
      navBar.classList.toggle("menu-active");
    });
  }
}
// =========================== Fetch Data =========================== //
/*
  - Loading the content of the page:
  - After loading the data in result, I used the loadPageSpecificContent 
  function to determine which content to load based on this data. 
  
  For example:
  - If we have a blog section on the page, we display only 3 blogs 
  using the renderBlogs function.
  - If we have a services section, we pass the services data to the 
  services function to display it.
  - Avoid repetition:
  - The data is loaded only once at the beginning of loadContent, 
  and then used in all the sections that need it.

  Result:
  - Repetition is reduced and the data is loaded only once on the page. The code is also organized so that sections are called only when they are needed.
*/
// Load page-specific content based on the current page
function loadPageSpecificContent(result) {
  // Load blogs only for the page that requires it (example: home page with blogs)
  const mainBlogCards = document.querySelector(".main_blogs.blog_cards");
  if (mainBlogCards) {
    renderBlogs(result.blogs, mainBlogCards, 3);
  }
}
// =========================== Fetch Data =========================== //
async function data() {
  try {
    let data = await fetch("/json/data.json");
    let result = await data.json();
    // My Offerings Logic
    offerings(result.myOfferings);
    // Services Logic
    services(result.myOfferings);
    // My Works Experiences Logic
    experienceCardsLogic(result.worksExperiences);
    // My Works Experiences Logic
    worksExperiences(result.worksExperiences);
    // Display Blogs Data
    blogsData(result.blogs);
    // Search Button Event
    if (searchBtn) {
      searchBtn.addEventListener("click", () => { searchOperation(result.blogs); });
    }
    // Render Blogs Function
    // renderBlogs(result.blogs, mainBlogCards, 3);
    return result;
  } catch (error) {
    console.log(error);
  }
}
// data();
// ======================= Home Page - Offerings Section ======================== //
let offeringsCards = document.querySelector(".offerings_cards");
// My Offerings Logic
function offerings(myOfferings) {
  if (!offeringsCards) return;
  for (let i = 0; i < myOfferings.length; i++) {
    // Build Offerings Cards Layout
    offeringsCardsLayout(offeringsCards, myOfferings[i]);
  };
  let offeringsCard = document.querySelectorAll(".offerings_cards .card");
  // Open Offerings Card in Services Page Based On Section (Current Target Id)
  offeringsCard.forEach((offCard) => {
    offCard.addEventListener("click", function (e) {
      location.href = `services.html#${e.currentTarget.id}`;
    })
  })
}
// Build Offerings Cards Layout
function offeringsCardsLayout(offeringsCards, myOfferings) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.id = `${myOfferings.id}`;
  card.setAttribute("data-aos", `fade-${myOfferings.cardDataAos}`);

  let iconWrapper = document.createElement("div");
  iconWrapper.classList.add("icon-wrapper", "flexCenter");

  let cardIcon = document.createElement("i");
  cardIcon.classList.add("fas", `${myOfferings.iconSrc}`);

  let cardInfo = document.createElement("div");
  cardInfo.classList.add("info");

  let cardH3 = document.createElement("h3");
  cardH3.textContent = `${myOfferings.title}`;

  let cardPara = document.createElement("p");
  cardPara.textContent = `${myOfferings.priefDesc}`;

  // Add H3 To Card Info
  cardInfo.appendChild(cardH3);
  // Add Para To Card Info
  cardInfo.appendChild(cardPara);
  // Add Card Icon to Icon Wrapper
  iconWrapper.appendChild(cardIcon);
  // Add Icon Wrapper To Card
  card.appendChild(iconWrapper);
  // Add Card Info To Card
  card.appendChild(cardInfo);
  // Add Card To offerings Cards Parent Div
  offeringsCards.appendChild(card);
}
// ================ Home Page - Experiences Section ================ //
let experiencesCards = document.querySelector(".experiences .details");
function experienceCardsLogic(worksExp) {
  for (let i = 0; i < worksExp.length; i++) {
    if (experiencesCards) {
      experiencesCardsLayout(experiencesCards, worksExp[i])
    }
  };
}
// Build Experiences Cards Layout
function experiencesCardsLayout(experiencesCards, worksExp) {
  let card = document.createElement("div");
  card.classList.add("card");

  let cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info", "gridFrFr");

  let address = document.createElement("address");
  address.classList.add("address");
  address.setAttribute("data-aos", "fade-right");

  let h4 = document.createElement("h4");
  h4.textContent = `${worksExp.address}`;
  let span = document.createElement("span");
  span.textContent = `${worksExp.profession}, `;

  h4.prepend(span);

  let dateDiv = document.createElement("div");
  dateDiv.classList.add("date", "flexAlignCenter");

  let dateIcon = document.createElement("i");
  dateIcon.classList.add("fa-solid", "fa-dot-circle");

  let datePara = document.createElement("p");
  datePara.textContent = `${worksExp.date}`;

  // Experience Div
  let experience = document.createElement("div");
  experience.classList.add("experience", "flexBetween");
  experience.setAttribute("data-aos", "fade-left");

  let expPara = document.createElement("p");
  expPara.textContent = `${worksExp.desc}`;

  let skillsDiv = document.createElement("div");
  skillsDiv.classList.add("skills", "flexAlignStart");

  // Display Skills
  for (let j = 0; j < worksExp.skills.length; j++) {
    let span = document.createElement("span");
    span.classList.add("flexCenter");
    span.textContent = `${worksExp.skills[j]}`;
    // Add spans To Skills Div
    skillsDiv.appendChild(span);
  }
  let cardImg = document.createElement("img");
  cardImg.src = "../../assets/image-1.webp";
  cardImg.alt = "phone paper";
  cardImg.title = "phone paper";
  cardImg.setAttribute("data-aos", "fade-up");
  cardImg.setAttribute("loading", "lazy");

  // Add Experience Para To Experience Div
  experience.appendChild(expPara);
  // Add Skills To Experience Div
  experience.appendChild(skillsDiv);
  // Add Date Icon To Date Div
  dateDiv.appendChild(dateIcon);
  // Add Date Para To Date Div
  dateDiv.appendChild(datePara);
  // Add h4 To Address Div
  address.appendChild(h4);
  // Add Date Div To Address
  address.appendChild(dateDiv);
  // Add Address To Card Information Div
  cardInfo.appendChild(address);
  // Add Experience To Card Information Div
  cardInfo.appendChild(experience);
  // Add Card Information To Card
  card.appendChild(cardInfo);
  // Add Or Not Image
  if (worksExp.imgShow) { card.appendChild(cardImg); }
  // Add Card To Experiences Cards
  experiencesCards.appendChild(card);
}
// ================== Home Page - My Work Section ================== //
// My Works Experiences Logic
function worksExperiences(worksExp) {
  let workCards = document.querySelector(".my_work .work_cards");
  for (let i = 0; i < worksExp.length; i++) {
    if (workCards) {
      // Build My Works Cards Layout
      myWorksCardsLayout(workCards, worksExp[i]);
    }
  };
  let workCard = document.querySelectorAll(".work_cards .card");
  // [2] Check for saved ID in localStorage
  const storedWorkId = window.localStorage.getItem("workSection_workId");
  if (storedWorkId) {
    workCard.forEach((card) => {
      // Remove Class active From All Cards
      card.classList.remove("active");
      card.lastElementChild.classList.remove("iconRotate");
    });
    // Find the stored card and apply active class
    let currentElId = document.querySelector(`[id="${storedWorkId}"]`);
    let arrowRight = document.querySelector(`[id="${storedWorkId}"] .arrow-right`);
    currentElId?.classList.add("active");
    if (currentElId?.classList.contains("active")) {
      // Add Class iconRotate to Icon In Current Target By Id
      arrowRight?.classList.add("iconRotate");
    }
  }
  // [1] Add click event listener to each card
  workCard.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Remove Class active From All Cards and reset iconRotate
      workCard.forEach((card) => {
        card.classList.remove("active");
        card.lastElementChild.classList.remove("iconRotate");
      });
      // Add Class active to Current Target
      card.classList.add("active");
      // Find the icon in the clicked card
      let eTargetArrow = card.querySelector(".arrow-right");
      if (eTargetArrow) {
        // Add Class iconRotate to Icon in Current Target
        eTargetArrow.classList.add("iconRotate");
      }
      // Save the current clicked card's ID to localStorage
      window.localStorage.setItem("workSection_workId", e.currentTarget.id);
    });
  });
}
// Build My Works Cards Layout
function myWorksCardsLayout(workCards, worksExp) {
  let card = document.createElement("div");
  card.classList.add("card", "flexCenterBetween");
  card.setAttribute("data-aos", `fade-${worksExp.dataAos}`);
  card.id = `${worksExp.id}`;

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("info-div", "flexAlignCenter");
  infoDiv.style.gap = "20px";

  let spanId = document.createElement("span");
  spanId.textContent = `0${worksExp.id}`;

  let work = document.createElement("div");
  work.classList.add("work");
  work.style.marginLeft = "200px";

  let h4 = document.createElement("h4");
  h4.textContent = `${worksExp.profession}, ${worksExp.address}`;

  let dateDiv = document.createElement("div");
  dateDiv.classList.add("date", "flexAlignCenter");

  let dateIcon = document.createElement("i");
  dateIcon.classList.add("fa-solid", "fa-dot-circle");

  let datePara = document.createElement("p");
  datePara.textContent = `${worksExp.date}`;
  // Card Icon (Angle Right)
  let cardIcon = document.createElement("i");
  cardIcon.classList.add("fa-solid", "fa-angle-right", "arrow-right");
  // Add Date Icon To Date Div
  dateDiv.appendChild(dateIcon);
  // Add Para To Date Div
  dateDiv.appendChild(datePara);
  // Add h4 To Work Div
  work.appendChild(h4);
  // Add Date Div To Work Div
  work.appendChild(dateDiv);
  // Add Span Id To Info Card
  infoDiv.appendChild(spanId);
  // Add Work Div To Info Card
  infoDiv.appendChild(work);
  // Add Info Carrd To Card
  card.appendChild(infoDiv);
  // Add Card Icon (Angle Right) To Card
  card.appendChild(cardIcon);
  // Add Card To my Works Div
  workCards.appendChild(card);
}
// ==================== Services Page ==================== //
let servicesCards = document.querySelector(".services .services-cards");
// Services Logic
function services(myOfferings) {
  if (!servicesCards) return;
  for (let i = 0; i < myOfferings.length; i++) {
    // Build Services Cards Layout
    servicesCardsLayout(servicesCards, myOfferings[i]);
  };
}
// Build Services Cards Layout
function servicesCardsLayout(servicesCards, myOfferings) {
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("info");
  infoDiv.id = `${myOfferings.id}`;

  let servicesImg = document.createElement("img");
  servicesImg.src = `../../assets/${myOfferings.imgSrc}.webp`;
  servicesImg.alt = `${myOfferings.title}`;
  servicesImg.title = `${myOfferings.title}`;
  servicesImg.setAttribute("loading", "lazy");
  servicesImg.setAttribute("data-aos", `fade-${myOfferings.infoDataAos}`);
  servicesImg.style.order = `${myOfferings.imgOrder}`;

  let infosText = document.createElement("div");
  infosText.classList.add("infos_text");
  infosText.setAttribute("data-aos", `fade-${myOfferings.cardDataAos}`);

  let h2 = document.createElement("h2");
  h2.textContent = `${myOfferings.title}`;

  let p = document.createElement("p");
  p.textContent = `${myOfferings.description}`;

  let links = document.createElement("div");
  links.classList.add("links", "flexAlignCenter");

  let talkLink = document.createElement("button");
  talkLink.classList.add("btn", "style_btn");
  talkLink.onclick = function () { move('letsStartTalk.html'); };
  talkLink.href = "#";
  talkLink.textContent = "Let's Talk";

  let talkLinkIcon = document.createElement("i");
  talkLinkIcon.classList.add("fa-solid", "fa-angle-right");

  let viewWorks = document.createElement("button");
  viewWorks.classList.add("btn");
  viewWorks.href = "#";
  viewWorks.textContent = "View Works";

  // Add Talk Link Icon To Talk Link
  talkLink.appendChild(talkLinkIcon);
  // Add Talk link To Links Div
  links.appendChild(talkLink);
  // Add View Works link To Links Div
  links.appendChild(viewWorks);
  // Add Services h2 To Information Card
  infosText.appendChild(h2);
  // Add Services Para To Information Card
  infosText.appendChild(p);
  // Add Services Links To Information Card
  infosText.appendChild(links);
  // Add Services Image To Information Card
  infoDiv.appendChild(servicesImg);
  // Add informations Text To Information Card
  infoDiv.appendChild(infosText);
  // Add Information Div To Services Cards
  servicesCards.appendChild(infoDiv);
}
// ================================ Portfolio Page ================================= //
// ============= Portfolio Page - Select tabs and blogs elements ============== //
let tabs = document.querySelectorAll(".tabs button");
let portfolioCards = document.querySelector(".portfolio .portfolio_cards");
// ================ Trigger Get Blog From localStorage Fucntion =============== //
getBlogsTabFromLocalStorage();
function blogsData(blogs) {
  const storedTabId = window.localStorage.getItem("portfolioTab_tabId");
  if (storedTabId) {
    tabs.forEach((tab) => { tab.classList.remove("checked"); });
    document.querySelector(`[id="${storedTabId}"]`)?.classList.add("checked");
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      // Remove Checked Class From All Tabs
      tabs.forEach((tab) => { tab.classList.remove("checked") });
      // Add Checked Class To The Clicked Tab
      tab.classList.add("checked");
      // Add Id To Current Tab To LocalStorage
      window.localStorage.setItem("portfolioTab_tabId", e.currentTarget.id);
      // Add Current Category To LocalStorage
      window.localStorage.setItem("portfolioTab_category", e.currentTarget.dataset.category);
      // Get Category From LocalStorage
      const category = window.localStorage.getItem("portfolioTab_category");
      // Filtering Array of Blogs Related To Category From LocalStorage
      const filteredBlogs = blogs.filter((blog) => blog.category === category);
      // Add Blogs To LocalStorage
      addBlogsTabToLocalStorage(filteredBlogs);
      // Display Blogs Related To The Selected Tab
      displayBlogsTab(filteredBlogs);
    });
  });
}
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
    // Build Create Portfolio Tabs Cards Layout
    createPortfolioTabsCardsLayout(filteredBlogs, portfolioCards);
  }
};
// Build Create Portfolio Tabs Cards Layout
function createPortfolioTabsCardsLayout(filteredBlogs, portfolioCards) {
  for (let i = 0; i < filteredBlogs.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");

    let cardImg = document.createElement("img");
    cardImg.src = `../../assets/${filteredBlogs[i].src}.webp`;
    cardImg.alt = `${filteredBlogs[i].title}`;
    cardImg.title = `${filteredBlogs[i].priveTitle}`;
    cardImg.setAttribute("loading", "lazy");

    let projectTitle = document.createElement("div");
    card.classList.add("project_title");

    let skillsDiv = document.createElement("div");
    skillsDiv.classList.add("skills", "flex");
    // Display Skills
    for (let j = 0; j < filteredBlogs[i].skills.length; j++) {
      let span = document.createElement("span");
      span.classList.add("flexCenter");
      span.textContent = `${filteredBlogs[i].skills[j]}`;
      // Add spans To Skills Div
      skillsDiv.appendChild(span);
    }
    let priveTitle = document.createElement("h3");
    priveTitle.textContent = `${filteredBlogs[i].priveTitle}`;
    projectTitle.appendChild(skillsDiv);
    projectTitle.appendChild(priveTitle);
    // Add Card Image To Card
    card.appendChild(cardImg);
    card.appendChild(projectTitle);
    portfolioCards.appendChild(card);
  }
}
// ========================= Blog Section ========================== //
let mainBlogCards = document.querySelector(".main_blogs");
let searchBlogCards = document.querySelector(".search_results");
// =================== Blog Page - Blog Id Page ==================== //
if (window.localStorage.getItem("blogId")) {
  let blogData = JSON.parse(window.localStorage.getItem("blogId"));
  let exploreBlogInfo = document.querySelector(".explore_blogs .info");
  exploreBlogCardLayout(blogData, exploreBlogInfo);
}
function exploreBlogCardLayout(blogData, exploreBlogInfo) {
  if (exploreBlogInfo) {
    let card = document.createElement("div");
    card.classList.add("card");

    let imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image");

    let cardImg = document.createElement("img");
    cardImg.src = `../../assets/${blogData.src}.webp`;
    cardImg.title = `${blogData.title}`;
    cardImg.alt = `${blogData.priveTitle}`;
    cardImg.setAttribute("loading", "lazy");
    cardImg.setAttribute("data-aos", "fade-right");
    // Add Image To Image Wrapper
    imageWrapper.appendChild(cardImg);
    // Add Image Wrapper To Card
    card.appendChild(imageWrapper);

    let infosText = document.createElement("infos_text");
    infosText.classList.add("infos_text");
    infosText.setAttribute("data-aos", "fade-left");

    let infosHeading = document.createElement("h2");
    infosHeading.textContent = `${blogData.title}`;

    let infosPara = document.createElement("p");
    infosPara.textContent = `${blogData.description}`;

    let infosBtn = document.createElement("button");
    infosBtn.href = "#";
    infosBtn.classList.add("btn", "style_btn")
    infosBtn.textContent = "Read More";

    let linkIcon = document.createElement("i");
    linkIcon.classList.add("fa-solid", "fa-angle-right");
    // Add Link Icon To Link
    infosBtn.appendChild(linkIcon);

    let posted = document.createElement("div");
    posted.classList.add("posted");

    let postedPara = document.createElement("p");
    postedPara.textContent = "Posted on";

    let dateDiv = document.createElement("p");
    dateDiv.classList.add("date", "flexAlignCenter");

    let spanCategory = document.createElement("span");
    spanCategory.classList.add("flexAlignCenter");
    spanCategory.textContent = `For ${blogData.category}`;

    let circleIcon = document.createElement("i");
    circleIcon.classList.add("fa-solid", "fa-dot-circle");
    // Add Circle Icon To Span Category
    spanCategory.prepend(circleIcon);

    let spanPosteDate = document.createElement("span");
    spanPosteDate.textContent = `${blogData.postDate}`;
    // Add Span For-Category To Data Div
    dateDiv.appendChild(spanCategory);
    // Add Span For-Category To Data Div
    dateDiv.appendChild(spanPosteDate);
    // Add P To Posted Div
    posted.appendChild(postedPara);
    // Add Data Div To Posted Div
    posted.appendChild(dateDiv);
    // Add h2 To informations Text
    infosText.appendChild(infosHeading);
    // Add P To informations Text
    infosText.appendChild(infosPara);
    // Add link (a tag) To informations Text
    infosText.appendChild(infosBtn);
    // Add Posted Div To informations Text
    infosText.appendChild(posted);
    // Add Cart To Parent Div (Info Div)
    exploreBlogInfo.appendChild(card);
    // Add informations Text To Parent Div (Info Div)
    exploreBlogInfo.appendChild(infosText);
  };
};
// ================== Blog Page - Show Search Blog ================= //
let searchInput = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
// ====================== Errors ====================== //
let searchError = document.getElementById("search-error");
// ===================== Not Found ==================== //
let notFound = document.querySelector(".not-found");
// ============== Blog Page - Display Blogs Search ============== //
function searchOperation(blogs) {
  if (searchInput && searchInput.value !== "") {
    // searchError.style.display = "none";
    errorsStyling(searchInput, searchError, "var(--light-gray-color)", "none");
    // Filtering Array of Blogs Related To Category From LocalStorage
    let filteredBlogs = blogs.filter(item => item.category === searchInput.value.trim().toLowerCase());
    if (filteredBlogs.length > 0) {
      // Add Blogs To LocalStorage
      addBlogsSearchToLocalStorage(filteredBlogs);
      // Display Blogs Related To The Selected Tab
      renderBlogs(filteredBlogs, searchBlogCards);
      // Hide Not found Message
      notFound.style.display = "none";
    } else {
      searchBlogCards.innerHTML = "";
      // Show Not found Message
      notFound.style.display = "block";
      errorsStyling(searchInput, searchError, "var(--error-color)", "block", "Please enter a search query: [Web, Mobile, Brand, Design]");
    };
  } else {
    errorsStyling(searchInput, searchError, "var(--error-color)", "block", "Please enter a search query: [Web, Mobile, Brand, Design]");
  };
};
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
    // Build Blog Card Layout
    blogCardLayout(blogArray, targetContainer, limit);
  }
  setupCardListeners(targetContainer, blogArray);
}
// Build Blog Card Layout
function blogCardLayout(blogArray, targetContainer, limit) {
  for (let i = 0; i < limit; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.id = `${i}`;
    card.setAttribute("data-aos", `fade-${blogArray[i].dataAos}`);

    let cardImg = document.createElement("img");
    cardImg.src = `../../assets/${blogArray[i].src}.webp`;
    cardImg.alt = `${blogArray[i].title}`;
    cardImg.title = `${blogArray[i].priveTitle}`;
    cardImg.setAttribute("loading", "lazy");

    let arrowBtn = document.createElement("button");
    arrowBtn.classList.add("arrow", "flexCenter");

    let arrowIcon = document.createElement("i");
    arrowIcon.classList.add("fa-solid", "fa-angle-up", "flexCenter");
    // Add Arrow Icon To Arrow button
    arrowBtn.appendChild(arrowIcon);
    // Add Card Image To Card
    card.appendChild(cardImg);
    // Add Arrow Button To Card
    card.appendChild(arrowBtn);
    // Add Card To Target Container
    targetContainer.appendChild(card);
  };
};
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
  };
};
// ======================= Footer - Email Validation ======================= //
function initializefooter() {
  let footerForm = document.getElementById("footer_form");
  let footerEmail = document.querySelector("[name='email']");
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
          emailValueValidTest(e);
        } else {
          errorsStyling(footerForm, footerEmailError, "var(--error-color)", "block", "Please enter a valid email: you@example.com");
          e.preventDefault();
        };
      } else if (emailReg.test(footerEmail.value)) {
        emailValueValidTest(e);
      } else {
        errorsStyling(footerForm, footerEmailError, "var(--error-color)", "block", "Please enter a valid email: you@example.com");
        e.preventDefault();
      };
    } else {
      e.preventDefault();
      errorsStyling(footerForm, footerEmailError, "var(--error-color)", "block", "Please enter your email.");
      footerEmailError.style.color = "var(--error-color)";
    };
    footerEmail.oninput = function () { errorsStyling(footerForm, footerEmailError, "var(--light-gray-color)", "none"); }
  };
  // ===================== Email Value Valid Test ==================== //
  function emailValueValidTest(e) {
    window.sessionStorage.setItem("connectedEmail", footerEmail.value);
    // Allow the form to submit
    footerForm.submit();  // This sends the form data to Formspree if validation passes.
    errorsStyling(footerForm, footerEmailError, "var(--valid-color)", "block", "Send Done.");
    footerEmailError.style.color = "var(--valid-color)";
    footerEmail.value = "";
    setTimeout(() => {
      errorsStyling(footerForm, footerEmailError, "var(--light-gray-color)", "none");
      footerEmailError.style.color = "var(--error-color)";
    }, 2000);
  };
  // ======================== Connected Msg ======================== //
  function connected() {
    errorsStyling(footerForm, footerEmailError, "var(--valid-color)", "block", "You Are Connected.");
    footerEmailError.style.color = "var(--valid-color)";
    footerEmail.value = "";
    setTimeout(() => {
      errorsStyling(footerForm, footerEmailError, "var(--light-gray-color)", "none");
      footerEmailError.style.color = "var(--error-color)";
    }, 2000);
  };
  // ================ Calling Function on Form Submit =============== //
  if (footerForm) {
    footerForm.addEventListener("submit", function (e) {
      checkFooterEmail(e);
      if (footerEmailError.style.display === "block") {
        e.preventDefault(); // Prevent the form from submitting if there's an error
      }
    });
  }
  if (footerEmail) { footerEmail.onblur = () => { errorsStyling(footerForm, footerEmailError, "#ccc", "none"); } }
}
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
let userData = [];
// ======================== Name Validation ======================== //
function checkTalkName() {
  const nameReg = /^[a-zA-Z\s]+$/;
  // Regular expression to validate names:
  // - Allows only letters (a-z, A-Z) and spaces.
  // - Ensures the entire input matches the pattern (no extra characters).
  // - At least one character is required (no empty names).
  nameInputs.forEach((nameInput) => {
    if (nameInput.value.trim() !== "") {
      if (nameReg.test(nameInput.value)) {
        errorsStyling(nameInput, nameInput.nextElementSibling, "#ccc", "none");
      } else {
        errorsStyling(nameInput, nameInput.nextElementSibling, "var(--error-color)", "block", "Please enter valid name.");
      };
    } else {
      errorsStyling(nameInput, nameInput.nextElementSibling, "var(--error-color)", "block", "Please enter your name.");
    };
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
    };
  } else {
    errorsStyling(emailInput, emailError, "var(--error-color)", "block", "Please enter a your email.");
  };
};
// ======================= Phone Validation ======================= //
function checkTalkPhone() {
  const phoneReg = /^(00|\+)?\d{10,15}$/;
  if (phoneInput.value !== "") {
    if (phoneReg.test(phoneInput.value)) {
      errorsStyling(phoneInput, phoneError, "#ccc", "none");
    } else {
      errorsStyling(phoneInput, phoneError, "var(--error-color)", "block", "Please enter a valid phone number (10 to 15 digits).");
    };
  } else {
    errorsStyling(phoneInput, phoneError, "var(--error-color)", "block", "Please enter your phone number.");
  };
};
// ====================== Password Validation ====================== //
function checkMsg() {
  if (msgTextArea.value !== "") {
    if (msgTextArea.value.length >= 20) {
      errorsStyling(msgTextArea, messageError, "#ccc", "none");
    } else {
      errorsStyling(msgTextArea, messageError, "var(--error-color)", "block", "Please enter at least 20 character");
    };
  } else {
    errorsStyling(msgTextArea, messageError, "var(--error-color)", "block", "Please enter a your password.");
  };
};
// ============= Storage The User Data (Token) To Array ============= //
function storageUserDataInArray() {
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
};
// =================== Add Tokens To LocalStorage =================== //
function addTokensToLocalStorage(userData) { window.localStorage.setItem("token", JSON.stringify(userData)); }
// ================ Calling Function on From Submit ================ //
if (startTalkForm) {
  startTalkForm.addEventListener("submit", function (e) {
    let hasError = false;

    allInputs.forEach((input) => {
      if (input.value === "") {
        hasError = true;
        e.preventDefault();
      }
    });
    if (msgTextArea.value === "" || msgTextArea.value.length < 20) {
      hasError = true;
      e.preventDefault();
    }
    // Storage The User Data (Token) To Array
    if (!hasError) { storageUserDataInArray(); }
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
// ======================== Errors Styling  ======================== //
function errorsStyling(inputType, errorType, borderColor, errorDisplay, errorMsg) {
  if (inputType) { inputType.style.borderColor = borderColor; };
  if (errorType) {
    errorType.style.display = errorDisplay;
    errorType.innerHTML = errorMsg;
  };
};