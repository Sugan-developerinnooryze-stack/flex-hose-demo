/* =========================================================
   Flex-Hose Co. — LeadRyze AI Chatbot Demo
   script.js
   Sections:
   1. Product database        6. Explorer render + search
   2. Filter taxonomy         7. Product modal
   3. Projects database       8. Quote / Contact forms + CRM sim
   4. Static content (certs, docs, FAQ, stock cities, category tiles)
   5. Hero slider              9. Navigation / mobile / misc UI
                               10. Page router (client-side "separate pages")
   ========================================================= */

/* ---------------------------------------------------------
   1. PRODUCT DATABASE (27 real Flex-Hose products)
   Product Type / Sub Category / Certification IDs match the
   real flexhose.com filter taxonomy (field_main_category_target_id,
   field_sub_category_target_id_selective, field_certifications_target_id_selective).
   --------------------------------------------------------- */
const TYPE = {
  HOSE: 'Flexible Metal Hoses',
  PENETRATION: 'Floor/Wall Pipe Penetrations',
  AIRSEP: 'In-Line Air Separator & Other',
  METAL_JOINT: 'Metal Expansion Joints',
  METAL_LOOP: 'Metal Expansion Loops / Seismic Connectors',
  RUBBER_JOINT: 'Rubber Expansion Joints',
  FIRE: 'UL/FM-Listed Solutions for Fire Sprinkler Systems',
};

let idCounter = 1;
function P(p) {
  return {
    id: 'p' + idCounter++,
    subs: [],
    certs: [],
    connection: 'Flanged',
    sizeRange: '2" – 24"',
    material: 'Stainless / Carbon Steel',
    documentation: true,
    ...p,
  };
}

const PRODUCTS = [
  P({ name: 'AssureFlex® FireSeal Bellows', img: 'img/products/assureflex-fireseal-bellows-FH-001.png', type: TYPE.FIRE, subs: ['Fire Protection'], certs: ['UL Listed'], connection: 'Sleeve / Through-Penetration', description: 'Maintains a fire seal around piping that passes through floors, walls, or ceilings while accommodating axial pipe movement caused by thermal expansion and contraction. The flexible metal bellows allows the piping to move without relying on traditional firestop packing that can crack, separate, or drop out as the pipe moves. U.S. Patent No. 11,221,075 B2.' }),
  P({ name: 'AssureFlex® Connectors for Fire Protection - UL Listed', img: 'img/products/assureflex-connectors-fire-protection-FH-002.jpg', type: TYPE.FIRE, subs: ['Fire Protection'], certs: ['UL Listed'], connection: 'Flanged / Grooved', description: 'An optimal solution for challenging pipe-offset connection applications in commercial and industrial fire protection systems. Manufactured in the U.S.A. for consistent, reliable, and cost-effective sourcing.' }),
  P({ name: 'AssureFlex® Seismic / Expansion Loops for Fire Protection - UL/FM Listed', img: 'img/products/assureflex-seismic-expansion-loops-FH-003.jpg', type: TYPE.FIRE, subs: ['Fire Protection'], certs: ['Dual UL/FM'], connection: 'Flanged / Grooved', description: 'Dual-listed by UL and FM, an optimal solution for challenging piping connection applications in commercial and industrial fire protection systems — including seismic building joints and efforts to minimize or compensate for thermal pipe expansion. Manufactured in the U.S.A.' }),
  P({ name: 'Pumpsaver®', img: 'img/products/pumpsaver-FH-004.jpg', type: TYPE.RUBBER_JOINT, subs: ['Pump Connectors', 'Single and Double Sphere'], connection: 'Flanged', description: 'Used to prevent damage to pumps caused by piping stress. Pumpsaver® connectors also absorb vibration, accommodate misalignment, and reduce noise in pump installations.' }),
  P({ name: 'Industrial Metal Hose', img: 'img/products/industrial-metal-hose-FH-005.jpg', type: TYPE.HOSE, subs: ['Custom Metal Hose'], connection: 'Threaded / Braided Hose', description: 'Applications include absorbing vibration, compensating for misalignment, and accommodating offset motion at equipment connections.' }),
  P({ name: 'UltraFuelFlex™', img: 'img/products/ultrafuelflex-FH-006.jpg', type: TYPE.HOSE, subs: ['Custom Metal Hose'], connection: 'Braided Hose', description: 'A flexible metal hose assembly engineered for fuel-handling connections where flexibility, sealing integrity, and resistance to hydrocarbon exposure are critical.' }),
  P({ name: 'Q-Press™', img: 'img/products/q-press-FH-007.jpg', type: TYPE.HOSE, subs: ['Accessories'], connection: 'Press-Fit', description: 'A press-fit metal hose connection system that speeds installation without welding or brazing — reducing labor time on flexible connector assemblies.' }),
  P({ name: 'Tri-Flex Loop®', img: 'img/products/tri-flex-loop-FH-008.jpg', type: TYPE.METAL_LOOP, subs: ['3 Leg Style Loop'], sizeRange: '2" – 24" (up to 24" of movement)', description: 'The safest and most reliable means of absorbing up to 24" of movement resulting from thermal changes, random seismic shifts, and misalignment in a piping system. It also dampens vibration and reduces the transmission of noise. Pressure tested to 1.5x maximum rated working pressure with a 4:1 safety factor — eliminating the need for costly anchoring, thrust blocks, or traditional long pipe loops.' }),
  P({ name: 'Tri-Loop®', img: 'img/products/tri-loop-FH-009.jpg', type: TYPE.METAL_LOOP, subs: ['3 Leg Style Loop'], sizeRange: '2" – 24" (up to 24" of movement)', description: 'The patented, space-saving Tri-Loop® multi-plane movement compensator absorbs up to 24" of movement from thermal changes, random seismic shifts, and misalignment, while dampening vibration and reducing noise. Same 4:1 safety factor and no added thrust loads on the piping system as the Tri-Flex Loop®.' }),
  P({ name: 'U Style Loop', img: 'img/products/u-style-loop-FH-010.jpg', type: TYPE.METAL_LOOP, subs: ['2 Leg Style'], sizeRange: '2" – 24" (up to 24" of movement)', description: 'A 2-leg U-style loop that absorbs up to 24" of movement resulting from thermal changes and misalignment while dampening vibration and reducing noise. Pressure tested to 1.5x maximum rated working pressure with a 4:1 safety factor.' }),
  P({ name: 'V Style Loop', img: 'img/products/v-style-loop-FH-011.jpg', type: TYPE.METAL_LOOP, subs: ['2 Leg Style'], sizeRange: '2" – 24" (up to 24" of movement)', description: 'A 2-leg V-style loop that absorbs up to 24" of movement resulting from thermal changes and misalignment while dampening vibration and reducing noise — the same compact, no-added-thrust-load design as the U Style Loop.' }),
  P({ name: 'Hanger Assembly Kit', img: 'img/products/hanger-assembly-kit-FH-012.jpg', type: TYPE.METAL_LOOP, subs: ['Accessories'], certs: ['UL Listed'], connection: 'Seismic Cable', description: 'The UL Listed seismic rope/cable used in our hanger assemblies conforms to ASCE (American Society of Civil Engineers) guidelines for structural applications of wire rope — pre-stretched cable with permanent end fittings maintaining a safety factor of two.' }),
  P({ name: 'FlexZorber®', img: 'img/products/flexzorber-FH-013.jpg', type: TYPE.HOSE, subs: ['Custom Metal Hose'], connection: 'Braided Hose', description: 'An easy and economical way to control piping movement, vibration, and noise transmission.' }),
  P({ name: 'StopLink™', img: 'img/products/stoplink-FH-014.jpg', type: TYPE.RUBBER_JOINT, subs: ['Control Units'], description: 'Simplifies the installation of NNS and NND style rubber expansion joints — factory designed and assembled with no loose parts or field adjustments. Simply bolt to mating flanges. A fraction of the weight of conventional control-rod assemblies, and the dampening properties of the cable prevent transmission of vibration and noise from rotating equipment or media flow.' }),
  P({ name: 'FlexPress™', img: 'img/products/flexpress-FH-015.jpg', type: TYPE.METAL_JOINT, subs: ['Externally Pressurized'], description: 'A totally enclosed, externally pressurized multi-ply stainless steel bellows protected from external damage by an external cover — designed for full line pressure in the unlikely event of a bellows failure. The carbon steel pipe integral liner prevents bellows impingement or fatigue from flow-induced vibration.' }),
  P({ name: 'BellowsXhaust™', img: 'img/products/bellowsxhaust-FH-016.jpg', type: TYPE.METAL_JOINT, subs: ['Internally Pressurized'], description: 'A metal bellows expansion joint engineered for exhaust and high-temperature piping applications, absorbing thermal growth and vibration in internally pressurized systems.' }),
  P({ name: 'BellowsFlex™', img: 'img/products/bellowsflex-FH-017.jpg', type: TYPE.METAL_JOINT, subs: ['Internally Pressurized'], description: "Flex-Hose Co.'s BellowsFlex™ metal bellows type expansion joints are designed for a wide range of applications and service conditions." }),
  P({ name: 'PumpFlex™', img: 'img/products/pumpflex-FH-018.jpg', type: TYPE.RUBBER_JOINT, subs: ['Pump Connectors'], description: 'Ideal for applications requiring vibration control and noise reduction as well as stress relief, misalignment, and thermal growth at pump connections.' }),
  P({ name: 'FlexComp™', img: 'img/products/flexcomp-FH-019.jpg', type: TYPE.METAL_JOINT, subs: ['Expansion Compensators'], sizeRange: '1/2" – 6"', description: "Flex-Hose Co.'s FlexComp™ expansion compensators are designed to absorb thermal growth in HVAC small-diameter piping systems — eliminating the need and expense of pipe loops, or the maintenance associated with packed slip joints." }),
  P({ name: 'Guideline™', img: 'img/products/guideline-pipe-alignment-FH-020.jpg', type: TYPE.METAL_JOINT, subs: ['Pipe Guides'], connection: 'Weld / Bolt-On', description: "Flex-Hose Co.'s Guideline™ pipe alignment guides are designed to maintain the longitudinal position of the pipe centerline without causing axial restraint." }),
  P({ name: 'PurgAir™', img: 'img/products/purgair-FH-021.jpg', type: TYPE.AIRSEP, subs: ['Accessories'], connection: 'Flanged / Weld / Groove', sizeRange: '150 psi standard rating', description: "PurgAir™ inline air separator saves valuable space — its internal diverter design is a cost-effective means for separation of air in a hydronic system. Fitted with air vent tapping and drain connection tapping, rugged enough for pipe-line mounting. Available with 150 lb. plate steel flanges, butt weld ends, and groove ends. Every PurgAir™ is 100% pressure tested." }),
  P({ name: 'UltraJoint', img: 'img/products/ultrajoint-FH-022.jpg', type: TYPE.METAL_JOINT, subs: ['Pipe Guides'], sizeRange: '2" – 24" I.D.', description: 'Eliminates the installation of two pipe guides for every metal bellows joint, significantly reducing installation cost. Built-in travel limit assembly protects against over-travel; absorbs axial pipe movement up to 3.25"; encapsulated pipe-guide shroud protects from external impact and functions as a safety shield. Standard working pressure to 300 psi. U.S. Patent No. 8,033,576 B2.' }),
  P({ name: 'Control Units', img: 'img/products/control-units-FH-023.jpg', type: TYPE.RUBBER_JOINT, subs: ['Control Units'], description: "2-Rod Control Units — Flex-Hose Co.'s control units are used in place of most rubber expansion joints and connectors where necessary anchoring is not practical." }),
  P({ name: 'Spool Type', img: 'img/products/spool-type-expansion-joint-FH-024.jpg', type: TYPE.RUBBER_JOINT, subs: ['Spool Type'], description: "Flex-Hose Co.'s spool type expansion joints are used to compensate for movement, absorb vibration, and reduce noise in piping systems." }),
  P({ name: 'Chemical Hose', img: 'img/products/chemical-hose-FH-025.jpg', type: TYPE.HOSE, subs: ['Custom Metal Hose'], connection: 'Braided Hose', description: 'Flexibility accommodates reciprocating equipment, tank unloading, and fill-station applications.' }),
  P({ name: 'Air Handling Hose / Duct', img: 'img/products/air-handling-hose-duct-FH-026.jpg', type: TYPE.HOSE, subs: ['Custom Metal Hose'], connection: 'Flexible Duct', description: 'Accommodates clean air, vapor control, and dust/particulate removal where flexibility is key.' }),
  P({ name: 'Material Transfer Hose', img: 'img/products/material-transfer-hose-FH-027.jpg', type: TYPE.HOSE, subs: ['Custom Metal Hose'], connection: 'Braided Hose', description: 'Hose flexibility simplifies rail car unloading, bulk material transfer, in-plant pneumatic conveying systems, and liquid/slurry transfer.' }),
];

/* ---------------------------------------------------------
   2. FILTER TAXONOMY (labels exactly as on flexhose.com)
   --------------------------------------------------------- */
const TYPES = Object.values(TYPE);
const SUBCATS = ['2 Leg Style', '3 Leg Style Loop', 'Accessories', 'Control Units', 'Custom Metal Hose', 'Expansion Compensators', 'Externally Pressurized', 'Fire Protection', 'Internally Pressurized', 'Pipe Guides', 'Pump Connectors', 'Single and Double Sphere', 'Spool Type'];
const CERTS = ['CSA', 'Dual UL/FM', 'FM Approved', 'Lead Free', 'NSF/ANSI 61', 'UL Listed'];

/* ---------------------------------------------------------
   3. PROJECTS DATABASE (72 real Flex-Hose projects)
   --------------------------------------------------------- */
const PROJECTS_WITH_IMAGE = [
  ['VA-Long Beach Medical Center', 'Long Beach, California, USA', 'img/projects/long_beach_medical_ctr_-_va_-_for_fh.png'],
  ['John Wayne Airport', 'Orange County, California, USA', 'img/projects/plane-7013022_640.jpg'],
  ['UC San Diego', 'San Diego, California, USA', 'img/projects/uc_san_diego_1.png'],
  ['Yale University', 'New Haven, Connecticut, USA', 'img/projects/yale_university.png'],
  ['University of Connecticut', 'Storrs, Connecticut, USA', 'img/projects/u-conn.png'],
  ['Daytona Motor Speedway', 'Daytona, Florida, USA', 'img/projects/daytona_motor_speedway.png'],
  ['Project Morgan (APPLE)', 'Iowa, USA', 'img/projects/flexhose_-_pic_for_project_morgan_-_apple.png'],
  ['Dana Farber Cancer Institute', 'Boston, Massachusetts, USA', 'img/projects/flexhose_-_pic_for_cancer_institute.png'],
  ['Harvard University', 'Boston, Massachusetts, USA', 'img/projects/harvard_university.png'],
  ['Genzyme Pharmaceuticals', 'Framingham, Massachusetts, USA', 'img/projects/flexhose_-_pharma.jpg'],
  ['The Sphere', 'Las Vegas, Nevada, USA', 'img/projects/sphere_in_las_vegas.png'],
  ['Ft. Drum-10th Mountain Division (Several Buildings)', 'Ft. Drum, New York, USA', 'img/projects/army_base_-_for_fh_fort_drum.jpg'],
  ['JFK-Airport', 'New York, New York, USA', 'img/projects/flexhose_-_jfk.jpg'],
  ['Marriott Marquis', 'New York, New York, USA', 'img/projects/marriott_for_fh.png'],
  ['NY Port Authority Transportation Hub', 'New York, New York, USA', 'img/projects/nyc_port_authority_-_for_fh.png'],
  ['US Supreme Courthouse-Manhattan', 'New York, New York, USA', 'img/projects/court_bldg_for_fh.png'],
  ['Empire State Building', 'New York City, New York, USA', 'img/projects/empire_state_building.png'],
  ['Xerox Inc. (Several Buildings)', 'Rochester, New York, USA', 'img/projects/xerox_tower_-_for_fh.png'],
  ['Destiny USA', 'Syracuse, New York, USA', 'img/projects/flexhose_-_pic_for_destinyusa.jpg'],
  ['Lemoyne College', 'Syracuse, New York, USA', 'img/projects/college_-_for_fh_lemyone.jpg'],
  ['Syracuse University', 'Syracuse, New York, USA', 'img/projects/syracuse_university.png'],
  ['Willard Detention Center', 'Willard, New York, USA', 'img/projects/willard_drug_treatment_facility_-_for_fh.jpg'],
  ['Penn State', 'Centre, Pennsylvania, USA', 'img/projects/penn_state.png'],
  ['RHINO Health', 'Texas, USA', 'img/projects/flexhose_-_pic_for_rhino_health.png'],
  ['Boeing', 'Seattle, Washington, USA', 'img/projects/flexhose_-_boeing.jpg'],
  ['Ft Meade', 'Washington DC, USA', 'img/projects/flexhose_-_ft_meade.jpg'],
  ['United States Pentagon', 'Washington DC, USA', 'img/projects/flexhose_-_pentagon.jpg'],
  ['Casino Niagara', 'Niagra Falls, Ontario, Canada', 'img/projects/flexhose_-_casino.jpg'],
  ['Niagra Falls Casino', 'Niagra Falls, Ontario, Canada', 'img/projects/niagara_falls_casino.png'],
  ['Doha Airport', 'Qatar', 'img/projects/doha_airport_saudi_arabia.png'],
  ['Holy Haram Mataf Expansion', 'Saudi Arabia', 'img/projects/pexels-shams-alam-ansari.jpg'],
];
const PROJECTS_TEXT_ONLY = [
  ['University of Alabama-Science & Engineering Complex', 'Tuscaloosa, Alabama, USA'],
  ['Disneyland-California', 'Anaheim, California, USA'],
  ['UC Santa Cruz-TI Building', 'Santa Cruz, California, USA'],
  ['DIA Hotel', 'Denver, Colorado, USA'],
  ['Waterbury Enlightenment', 'Waterbury, Connecticut, USA'],
  ['Athens Regional Medical Center', 'Athens, Georgia, USA'],
  ['Meadows regional Medical Center', 'Vidalia, Georgia, USA'],
  ['Facebook (x3)', 'Iowa, USA'],
  ['Maine Medical Center', 'Portland, Maine, USA'],
  ['Mass. General Hospital', 'Boston, Massachusetts, USA'],
  ['Clark Institute', 'Williamstown, Massachusetts, USA'],
  ['Ameristar', 'Kansas City, Missouri, USA'],
  ['Las Vegas Downtown Civic Center', 'Las Vegas, Nevada, USA'],
  ['American Dream', 'East Rutherford, New Jersey, USA'],
  ['New World Trade Center', 'New York, New York, USA'],
  ['UNC-Charlotte-Co Gen.', 'Charlotte, North Carolina, USA'],
  ['Torpharm / Apotex', 'Toronto, Ontario, USA'],
  ['SCI Fayette Correctional', 'LaBelle, Pennsylvania, USA'],
  ['Boeing', 'Philadelphia, Pennsylvania, USA'],
  ['Arm & Hammer', 'York, Pennsylvania, USA'],
  ['Tennessee State University', 'Nashville, Tennessee, USA'],
  ['Laredo Medical Center', 'Laredo, Texas, USA'],
  ['Ft. Sam Houston', 'San Antonio, Texas, USA'],
  ['United States-NCE-NSA Facility', 'Ft. Belvoir, Virginia, USA'],
  ['FBI Headquarters', 'Langley, Virginia, USA'],
  ['National Geospacial Intelligence Agency', 'Springfield, Virginia, USA'],
  ['Good Samaritan Hospital', 'Seattle, Washington, USA'],
  ['Howard Hughes Medical Research Facility', 'Washington DC, USA'],
  ['Hamilton General Hospital', 'Hamilton, Ontario, Canada'],
  ['Peterborough Hospital', 'Peterborough, Ontario, Canada'],
  ['Sault Area Hospital', 'Sault St. Marie, Ontario, Canada'],
  ['GO-Transit', 'Streetsville, Ontario, Canada'],
  ['Credit Valley Hospital', 'Toronto, Ontario, Canada'],
  ['McMaster University-Engineering Building', 'Toronto, Ontario, Canada'],
  ['McMaster University-Sports Complex', 'Toronto, Ontario, Canada'],
  ['Toronto Blood Services', 'Toronto, Ontario, Canada'],
  ['Woodward WWTP', 'Toronto, Ontario, Canada'],
  ['CHUM Hospital', 'Montreal, Quebec, Canada'],
  ['Jalmudha Pumping Station', 'Saudi Arabia'],
  ['King Abdul Aziz Road Development Project', 'Saudi Arabia'],
  ['Project of The Custodian of Two Holy Mosques', 'Saudi Arabia'],
];

/* ---------------------------------------------------------
   4. STATIC CONTENT
   --------------------------------------------------------- */
const CATEGORY_TILES = [
  { label: 'Metal Expansion Loops / Seismic Connectors', img: 'img/site/prodx1.png', type: TYPE.METAL_LOOP },
  { label: 'UL/FM-Listed Solutions for Fire Sprinkler Systems', img: 'img/site/prodx2.png', type: TYPE.FIRE },
  { label: 'Flexible Metal Hoses', img: 'img/site/prod1.png', type: TYPE.HOSE },
  { label: 'Rubber Expansion Joints', img: 'img/site/prod2.png', type: TYPE.RUBBER_JOINT },
  { label: 'Metal Expansion Joints', img: 'img/site/prod3.png', type: TYPE.METAL_JOINT },
  { label: 'In-Line Air Separator & Other', img: 'img/site/purgair.jpg', type: TYPE.AIRSEP },
];

const CERT_BADGES = [
  { label: 'CSA', img: 'img/badges/sa.png' },
  { label: 'FM Approved', img: 'img/badges/fm-approved-fire.png' },
  { label: 'NSF/ANSI 61', img: 'img/badges/nsf-ansi.png' },
  { label: 'UL Listed', img: 'img/badges/ul.png' },
  { label: 'Lead Free', img: 'img/badges/lead-free-trans.png' },
];

const STOCK_CITIES = ['Baltimore, MD', 'Chicago, IL', 'Cincinnati, OH', 'Cleveland, OH', 'Dallas, TX', 'Denver, CO', 'Houston, TX', 'Kansas City, MO', 'Liverpool, NY', 'Los Angeles, CA', 'Margate, FL', 'Orlando, FL', 'St. Louis, MO', 'Vancouver, WA'];

const DC_FEATURED_NAMES = ['AssureFlex® Connectors for Fire Protection - UL Listed', 'AssureFlex® Seismic / Expansion Loops for Fire Protection - UL/FM Listed', 'Pumpsaver®'];

const FAQS = [
  { q: 'What is axial motion?', a: 'Axial motion is the motion created by the pipe expanding or contracting. The pipe gets longer as it heats up and expands. The pipe gets shorter as it cools down and contracts.' },
  { q: 'What is lateral motion?', a: 'Lateral motion occurs in any of the take offs where pipe changes direction 90°. This could be a simple change in direction or a take-off from the mainline that is at an angle (often 90°) to the main pipe line that is growing or contracting.' },
  { q: 'What is angular rotation?', a: 'Angular rotation is motion that occurs when the take-off or the direction change is something other than 90°.' },
  { q: 'Where does vibration occur?', a: 'Vibration is commonly seen in piping systems at the pump and at rotating equipment.' },
  { q: 'What is torsion?', a: 'Torsion is motion that occurs around the centerline of an assembly.' },
  { q: 'What are braided flexible hose assemblies?', a: 'Braided hose assemblies absorb vibration, lateral offset, and angular rotation. The flexible hose length determines motion capacity. They cannot handle axial motion since compression is not allowed — the outer braid must remain taut under system internal pressure to contain the hose.' },
  { q: 'What are braided, flexible hose loops (aka: expansion loops)?', a: 'These handle motion across multiple planes and axes. They are able to take large amounts of motion axially and laterally, using braided metal hose sections joined by elbows or return bends.' },
  { q: 'What are rubber expansion joints?', a: 'Rubber joints excel at noise absorption and handle vibration, lateral, axial, and angular motion. However, rubber is a maintenance item; it will dry out and crack over time, requiring replacement.' },
  { q: 'What are metal expansion joints?', a: 'Metal joints come in multiple designs handling various motions. All metal joints require the piping system to be properly anchored and guided.' },
];

/* ---------------------------------------------------------
   5. HOME HERO SLIDER
   --------------------------------------------------------- */
let heroIndex = 0;
let heroTimer = null;
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  dotsWrap.innerHTML = slides.length ? Array.from(slides).map((_, i) => `<button type="button" class="hero-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></button>`).join('') : '';
  dotsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.hero-dot');
    if (btn) goToSlide(+btn.dataset.idx);
  });
  document.getElementById('heroPrev').addEventListener('click', () => goToSlide((heroIndex - 1 + slides.length) % slides.length));
  document.getElementById('heroNext').addEventListener('click', () => goToSlide((heroIndex + 1) % slides.length));
  restartHeroTimer();
}
function goToSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  slides[heroIndex].classList.remove('active');
  document.querySelectorAll('.hero-dot')[heroIndex]?.classList.remove('active');
  heroIndex = idx;
  slides[heroIndex].classList.add('active');
  document.querySelectorAll('.hero-dot')[heroIndex]?.classList.add('active');
  restartHeroTimer();
}
function restartHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    const slides = document.querySelectorAll('.hero-slide');
    goToSlideAuto((heroIndex + 1) % slides.length);
  }, 6000);
}
function goToSlideAuto(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  slides[heroIndex].classList.remove('active');
  document.querySelectorAll('.hero-dot')[heroIndex]?.classList.remove('active');
  heroIndex = idx;
  slides[heroIndex].classList.add('active');
  document.querySelectorAll('.hero-dot')[heroIndex]?.classList.add('active');
}

/* ---------------------------------------------------------
   6. STATIC CONTENT RENDER
   --------------------------------------------------------- */
function renderStaticContent() {
  document.getElementById('categoryGrid').innerHTML = CATEGORY_TILES.map((c) => `
    <div class="category-card" data-type="${c.type}">
      <img src="${c.img}" alt="${c.label}" loading="lazy" />
      <div class="category-card-overlay"><span>${c.label}</span></div>
    </div>`).join('');
  document.getElementById('categoryGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.category-card');
    if (!card) return;
    jumpToExplorer({ type: card.dataset.type });
  });

  document.getElementById('certRow').innerHTML = CERT_BADGES.map((c) => `
    <div class="cert-item" data-cert="${c.label}"><img src="${c.img}" alt="${c.label}" loading="lazy" /><span>${c.label}</span></div>`).join('');
  document.getElementById('certRow').addEventListener('click', (e) => {
    const item = e.target.closest('.cert-item');
    if (!item) return;
    jumpToExplorer({ cert: item.dataset.cert });
  });

  document.getElementById('stockCities').innerHTML = STOCK_CITIES.map((c) => `<span>📍 ${c}</span>`).join('');

  document.getElementById('dcFeatured').innerHTML = DC_FEATURED_NAMES.map((n) => {
    const p = PRODUCTS.find((x) => x.name === n);
    if (!p) return '';
    return `<div class="mini-card" data-view-product="${p.name}"><img src="${p.img}" alt="${p.name}" loading="lazy" /><span>${p.name}</span></div>`;
  }).join('');
  document.getElementById('dcFeatured').addEventListener('click', (e) => {
    const card = e.target.closest('[data-view-product]');
    if (card) openProductModal(findProductByName(card.dataset.viewProduct));
  });

  document.getElementById('docsTable').innerHTML = PRODUCTS.map((p) => `
    <div class="docs-row">
      <span class="docs-row-name">${p.name}</span>
      <a href="#" data-view-product="${p.name}">Product Page</a>
      <a href="#" onclick="return false;">Documents &amp; Submittals</a>
    </div>`).join('');
  document.getElementById('docsTable').addEventListener('click', (e) => {
    const link = e.target.closest('[data-view-product]');
    if (link) { e.preventDefault(); openProductModal(findProductByName(link.dataset.viewProduct)); }
  });

  document.getElementById('faqList').innerHTML = FAQS.map((f, i) => `
    <div class="faq-item${i === 0 ? ' open' : ''}">
      <button type="button" class="faq-q"><span>${f.q}</span><span class="plus">+</span></button>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>`).join('');
  document.getElementById('faqList').addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    q.parentElement.classList.toggle('open');
  });

  document.getElementById('projectsGrid').innerHTML = PROJECTS_WITH_IMAGE.map(([name, loc, img]) => `
    <div class="project-card">
      <div class="project-card-media"><img src="${img}" alt="${name}" loading="lazy" /></div>
      <div class="project-card-body"><h4>${name}</h4><span>${loc}</span></div>
    </div>`).join('');

  document.getElementById('projectsList').innerHTML = PROJECTS_TEXT_ONLY.map(([name, loc]) => `
    <div class="projects-list-item"><h5>${name}</h5><span>${loc}</span></div>`).join('');
}

function jumpToExplorer({ type, cert }) {
  if (type) { filters.types.clear(); filters.types.add(type); }
  if (cert) { filters.certs.clear(); filters.certs.add(cert); }
  syncFilterCheckboxes();
  applyFilters();
  showPage('products');
}

/* ---------------------------------------------------------
   7. EXPLORER: FILTER STATE + RENDER
   --------------------------------------------------------- */
const filters = { types: new Set(), subs: new Set(), certs: new Set(), search: '' };

function checkboxGroup(containerId, values, filterSet, onChange) {
  const el = document.getElementById(containerId);
  el.innerHTML = values.map((v) => `
    <label class="check-row"><input type="checkbox" value="${v}" /> ${v}</label>`).join('');
  el.addEventListener('change', (e) => {
    if (e.target.type !== 'checkbox') return;
    if (e.target.checked) filterSet.add(e.target.value); else filterSet.delete(e.target.value);
    onChange();
  });
}

function syncFilterCheckboxes() {
  document.querySelectorAll('#filterType input').forEach((cb) => { cb.checked = filters.types.has(cb.value); });
  document.querySelectorAll('#filterSub input').forEach((cb) => { cb.checked = filters.subs.has(cb.value); });
  document.querySelectorAll('#filterCert input').forEach((cb) => { cb.checked = filters.certs.has(cb.value); });
}

function initFilters() {
  checkboxGroup('filterType', TYPES, filters.types, applyFilters);
  checkboxGroup('filterSub', SUBCATS, filters.subs, applyFilters);
  checkboxGroup('filterCert', CERTS, filters.certs, applyFilters);
  document.getElementById('explorerSearch').addEventListener('input', (e) => {
    filters.search = e.target.value.trim().toLowerCase();
    applyFilters();
  });
  document.getElementById('clearFiltersBtn').addEventListener('click', resetFilters);
  document.getElementById('emptyResetBtn').addEventListener('click', resetFilters);
}

function resetFilters() {
  filters.types.clear(); filters.subs.clear(); filters.certs.clear(); filters.search = '';
  document.getElementById('explorerSearch').value = '';
  syncFilterCheckboxes();
  applyFilters();
}

function matchesFilters(p) {
  if (filters.types.size && !filters.types.has(p.type)) return false;
  if (filters.subs.size && !p.subs.some((s) => filters.subs.has(s))) return false;
  if (filters.certs.size && !p.certs.some((c) => filters.certs.has(c))) return false;
  if (filters.search) {
    const hay = [p.name, p.type, ...p.subs, ...p.certs, p.description].join(' ').toLowerCase();
    if (!hay.includes(filters.search)) return false;
  }
  return true;
}

function applyFilters() {
  renderProductGrid(PRODUCTS.filter(matchesFilters));
}

function productCardHTML(p) {
  const badges = p.certs.map((c) => `<span class="b-cert">${c}</span>`).join('');
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-card-media"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
      <div class="product-card-body">
        <h4>${p.name}</h4>
        <p class="desc">${p.description}</p>
        <div class="spec-mini"><strong>${p.connection}</strong> · ${p.sizeRange}</div>
        ${badges ? `<div class="badge-row">${badges}</div>` : ''}
        <div class="product-card-actions">
          <button type="button" class="btn btn-outline" data-view="${p.id}">View Details</button>
          <button type="button" class="btn btn-primary" data-quote="${p.id}">Quote</button>
        </div>
      </div>
    </div>`;
}

function renderProductGrid(list) {
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultsCount');
  count.textContent = list.length === PRODUCTS.length ? `Showing all ${list.length} products` : `Showing ${list.length} of ${PRODUCTS.length} products`;
  if (!list.length) { grid.innerHTML = ''; empty.hidden = false; return; }
  empty.hidden = true;
  grid.innerHTML = list.map(productCardHTML).join('');
}

document.getElementById('productGrid').addEventListener('click', (e) => {
  const viewId = e.target.closest('[data-view]')?.dataset.view;
  const quoteId = e.target.closest('[data-quote]')?.dataset.quote;
  if (viewId) openProductModal(findProductById(viewId));
  if (quoteId) openQuoteModal(findProductById(quoteId));
});

function findProductById(id) { return PRODUCTS.find((p) => p.id === id); }
function findProductByName(name) { return PRODUCTS.find((p) => p.name === name); }

/* Global clicks: hero/nav "View Products" links that pre-filter, any
   [data-view-product] trigger, and — last, so the more specific handlers
   above get first refusal — any plain internal page link (nav, footer,
   logo, hero CTAs, "Contact Us Today", etc.), routed through the page
   switcher in Section 10 instead of the browser's normal hash-scroll. */
document.addEventListener('click', (e) => {
  const viewBtn = e.target.closest('[data-view-product]');
  if (viewBtn && !viewBtn.closest('#docsTable, #dcFeatured')) {
    e.preventDefault();
    openProductModal(findProductByName(viewBtn.dataset.viewProduct));
    return;
  }
  const familyLink = e.target.closest('a[data-family]');
  if (familyLink) {
    e.preventDefault();
    jumpToExplorer({ type: familyLink.dataset.family });
    return;
  }
  const pageLink = e.target.closest('a[href^="#"]');
  if (pageLink) {
    const hash = pageLink.getAttribute('href').slice(1);
    if (hash === 'top' || PAGE_IDS.includes(hash)) {
      e.preventDefault();
      showPage(hash === 'top' ? 'home' : hash);
    }
    // Bare "#" placeholders (social icons, Terms and Conditions) fall through untouched.
  }
});

/* ---------------------------------------------------------
   8. PRODUCT DETAIL MODAL
   --------------------------------------------------------- */
function openModal(id) { document.getElementById(id).classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow = ''; }
function closeAllModals() {
  document.querySelectorAll('.modal-overlay.open').forEach((m) => m.classList.remove('open'));
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close-modal]')) closeAllModals();
  if (e.target.classList.contains('modal-overlay')) closeAllModals();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });

function openProductModal(p) {
  if (!p) return;
  const certBadges = p.certs.map((c) => `<span class="b-cert">${c}</span>`).join('');
  document.getElementById('productModalBody').innerHTML = `
    <span class="eyebrow">${p.type}</span>
    <h3 id="productModalTitle">${p.name}</h3>
    <div class="modal-product-media" id="productModalMedia">
      <img src="${p.img}" alt="${p.name}" />
      <button type="button" class="zoom-trigger" id="productModalZoomBtn">
        <svg viewBox="0 0 24 24" width="15" height="15"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Zoom
      </button>
    </div>
    <p>${p.description}</p>
    ${certBadges ? `<div class="badge-row" style="margin-bottom:8px;">${certBadges}</div>` : ''}
    <table class="spec-table">
      <tr><td>Connection</td><td>${p.connection}</td></tr>
      <tr><td>Size Range</td><td>${p.sizeRange}</td></tr>
      <tr><td>Material</td><td>${p.material}</td></tr>
      <tr><td>Sub Category</td><td>${p.subs.join(', ') || '—'}</td></tr>
      <tr><td>Certifications</td><td>${p.certs.join(', ') || 'See specification sheet'}</td></tr>
      <tr><td>Documentation</td><td>${p.documentation ? 'Spec sheet &amp; submittal package available' : '—'}</td></tr>
    </table>
    <div class="product-card-actions" style="margin-top:10px;">
      <button type="button" class="btn btn-primary" id="modalQuoteBtn">Request a Quote</button>
    </div>
  `;
  document.getElementById('modalQuoteBtn').onclick = () => { closeAllModals(); openQuoteModal(p); };
  const openZoom = () => openImageZoom(p.img, p.name);
  document.getElementById('productModalZoomBtn').addEventListener('click', (e) => { e.stopPropagation(); openZoom(); });
  document.getElementById('productModalMedia').addEventListener('click', openZoom);
  openModal('productModalOverlay');
}

/* ---------------------------------------------------------
   8b. IMAGE ZOOM LIGHTBOX (scroll/pinch to zoom, drag to pan)
   --------------------------------------------------------- */
const zoomState = { scale: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0, pinchDist: 0 };
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.5;

function zoomEls() {
  return {
    overlay: document.getElementById('zoomOverlay'),
    stage: document.getElementById('zoomStage'),
    img: document.getElementById('zoomImg'),
    title: document.getElementById('zoomTitle'),
    level: document.getElementById('zoomLevel'),
    hint: document.getElementById('zoomHint'),
    inBtn: document.getElementById('zoomInBtn'),
    outBtn: document.getElementById('zoomOutBtn'),
  };
}

function applyZoomTransform() {
  const { img, level, outBtn, inBtn } = zoomEls();
  img.style.transform = `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.scale})`;
  level.textContent = Math.round(zoomState.scale * 100) + '%';
  outBtn.disabled = zoomState.scale <= ZOOM_MIN;
  inBtn.disabled = zoomState.scale >= ZOOM_MAX;
}

function clampPan() {
  // Keeps the image reasonably on-stage instead of letting it drift off-screen at high zoom.
  const { stage, img } = zoomEls();
  const stageRect = stage.getBoundingClientRect();
  const maxX = (stageRect.width * (zoomState.scale - 1)) / 2 + 60;
  const maxY = (stageRect.height * (zoomState.scale - 1)) / 2 + 60;
  zoomState.x = Math.max(-maxX, Math.min(maxX, zoomState.x));
  zoomState.y = Math.max(-maxY, Math.min(maxY, zoomState.y));
}

function setZoomScale(next) {
  zoomState.scale = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, next));
  if (zoomState.scale === ZOOM_MIN) { zoomState.x = 0; zoomState.y = 0; }
  clampPan();
  applyZoomTransform();
}

function resetZoom() {
  zoomState.scale = 1; zoomState.x = 0; zoomState.y = 0;
  applyZoomTransform();
}

function openImageZoom(src, title) {
  const { overlay, img, title: titleEl, hint, stage } = zoomEls();
  img.src = src;
  img.alt = title || '';
  titleEl.textContent = title || 'Product Image';
  resetZoom();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hint.classList.add('show');
  setTimeout(() => hint.classList.remove('show'), 2600);
  stage.focus?.();
}
function closeImageZoom() {
  zoomEls().overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initImageZoom() {
  const { overlay, stage, img, inBtn, outBtn, level } = zoomEls();
  document.getElementById('zoomCloseBtn').addEventListener('click', closeImageZoom);
  stage.addEventListener('click', (e) => { if (e.target === stage) closeImageZoom(); });
  document.getElementById('zoomInBtn').addEventListener('click', () => setZoomScale(zoomState.scale + ZOOM_STEP));
  document.getElementById('zoomOutBtn').addEventListener('click', () => setZoomScale(zoomState.scale - ZOOM_STEP));
  document.getElementById('zoomResetBtn').addEventListener('click', resetZoom);
  level.addEventListener('click', resetZoom);

  // Scroll wheel to zoom, centered roughly where the cursor is.
  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoomScale(zoomState.scale + delta);
  }, { passive: false });

  // Double-click to toggle between 1x and 2.5x.
  img.addEventListener('dblclick', () => setZoomScale(zoomState.scale > 1 ? 1 : 2.5));

  // Drag to pan once zoomed in.
  stage.addEventListener('mousedown', (e) => {
    if (zoomState.scale <= 1) return;
    zoomState.dragging = true;
    zoomState.startX = e.clientX - zoomState.x;
    zoomState.startY = e.clientY - zoomState.y;
    stage.classList.add('grabbing');
  });
  window.addEventListener('mousemove', (e) => {
    if (!zoomState.dragging) return;
    zoomState.x = e.clientX - zoomState.startX;
    zoomState.y = e.clientY - zoomState.startY;
    clampPan();
    applyZoomTransform();
  });
  window.addEventListener('mouseup', () => { zoomState.dragging = false; stage.classList.remove('grabbing'); });

  // Basic touch support: one-finger drag to pan when zoomed, two-finger pinch to zoom, double-tap to toggle.
  let lastTap = 0;
  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      const [a, b] = e.touches;
      zoomState.pinchDist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTap < 320) { setZoomScale(zoomState.scale > 1 ? 1 : 2.5); }
      lastTap = now;
      if (zoomState.scale > 1) {
        zoomState.dragging = true;
        zoomState.startX = e.touches[0].clientX - zoomState.x;
        zoomState.startY = e.touches[0].clientY - zoomState.y;
      }
    }
  }, { passive: true });
  stage.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      const [a, b] = e.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (zoomState.pinchDist) setZoomScale(zoomState.scale * (dist / zoomState.pinchDist));
      zoomState.pinchDist = dist;
    } else if (e.touches.length === 1 && zoomState.dragging) {
      zoomState.x = e.touches[0].clientX - zoomState.startX;
      zoomState.y = e.touches[0].clientY - zoomState.startY;
      clampPan();
      applyZoomTransform();
    }
  }, { passive: true });
  stage.addEventListener('touchend', () => { zoomState.dragging = false; zoomState.pinchDist = 0; });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeImageZoom();
    if (e.key === '+' || e.key === '=') setZoomScale(zoomState.scale + ZOOM_STEP);
    if (e.key === '-') setZoomScale(zoomState.scale - ZOOM_STEP);
    if (e.key === '0') resetZoom();
  });
}

/* ---------------------------------------------------------
   9. QUOTE MODAL + CONTACT FORM + CRM SIMULATION
   --------------------------------------------------------- */
function populateSelect(el, values, placeholder) {
  el.innerHTML = `<option value="">${placeholder}</option>` + values.map((v) => `<option value="${v}">${v}</option>`).join('');
}

function initQuoteModal() {
  populateSelect(document.getElementById('quoteType'), TYPES, 'Select…');
  document.getElementById('quoteType').addEventListener('change', (e) => {
    const opts = PRODUCTS.filter((p) => p.type === e.target.value);
    populateSelect(document.getElementById('quoteProduct'), opts.map((p) => p.name), 'Select…');
  });
  document.getElementById('quoteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      product: fd.get('product') || fd.get('type') || null,
      quantity: fd.get('quantity') || null,
      company: fd.get('company') || null,
      contactName: `${fd.get('firstName') || ''} ${fd.get('lastName') || ''}`.trim() || null,
      email: fd.get('email') || null,
      phone: fd.get('phone') || null,
      location: fd.get('location') || null,
    };
    e.target.hidden = true;
    const successEl = document.getElementById('quoteSuccess');
    successEl.hidden = false;
    runCrmSimulation(data, successEl);
    showToast('Quote request submitted');
  });
}
function openQuoteModal(product) {
  document.getElementById('quoteForm').hidden = false;
  document.getElementById('quoteForm').reset();
  document.getElementById('quoteSuccess').hidden = true;
  document.getElementById('quoteSuccess').innerHTML = '';
  if (product) {
    document.getElementById('quoteType').value = product.type;
    document.getElementById('quoteType').dispatchEvent(new Event('change'));
    document.getElementById('quoteProduct').value = product.name;
  }
  openModal('quoteModalOverlay');
}
document.getElementById('openQuoteBtn').addEventListener('click', () => openQuoteModal(null));
document.getElementById('aiStoryTryBtn').addEventListener('click', () => {
  showToast('In production this opens the live LeadRyze AI chat widget');
});
document.getElementById('videoPlayBtn').addEventListener('click', () => {
  showToast('Company overview video would play here in production');
});

function initContactForm() {
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      product: fd.get('inquiry') || null,
      company: fd.get('organization') || null,
      contactName: `${fd.get('firstName') || ''} ${fd.get('lastName') || ''}`.trim() || null,
      email: fd.get('email') || null,
      phone: fd.get('phone') || null,
    };
    e.target.hidden = true;
    const successEl = document.getElementById('contactSuccess');
    successEl.hidden = false;
    runCrmSimulation(data, successEl);
    showToast('Message sent');
  });
}

function calculateLeadScore(data) {
  let score = 15;
  if (data.product) score += 15;
  if (data.quantity) score += 10;
  if (data.company) score += 20;
  if (data.email) score += 15;
  if (data.phone) score += 10;
  if (data.location) score += 10;
  return Math.min(score, 100);
}

function runCrmSimulation(data, container) {
  const steps = ['Inquiry captured', 'Customer information captured', 'Quote request created', 'Lead created in LeadRyze', 'Sales follow-up task created'];
  const wrap = document.createElement('div');
  wrap.innerHTML = '<p><strong>Thank you — your request has been captured.</strong></p><p style="font-size:0.85rem;color:var(--gray-500);">LeadRyze CRM Demo</p>';
  const ul = document.createElement('ul');
  ul.className = 'crm-check-list';
  ul.style.cssText = 'list-style:none;padding:0;margin:14px 0;';
  wrap.appendChild(ul);
  container.innerHTML = '';
  container.appendChild(wrap);
  steps.forEach((s, i) => {
    setTimeout(() => {
      const li = document.createElement('li');
      li.style.cssText = 'padding:6px 0;font-size:0.9rem;color:var(--gray-700);';
      li.innerHTML = `<span style="color:var(--success);font-weight:800;">✓</span> ${s}`;
      ul.appendChild(li);
      if (i === steps.length - 1) setTimeout(() => renderLeadCard(data, container), 400);
    }, i * 380);
  });
}

function renderLeadCard(data, container) {
  const score = calculateLeadScore(data);
  const bucket = score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'low';
  const bucketColor = bucket === 'hot' ? '#c0392b' : bucket === 'warm' ? '#b28c0a' : '#6b7280';
  const leadId = `FH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  const card = document.createElement('div');
  card.style.cssText = 'background:var(--gray-50);border:1px solid var(--gray-200);border-radius:10px;padding:18px;margin-top:14px;';
  card.innerHTML = `
    <h4 style="margin-top:0;">✅ Lead Created in LeadRyze</h4>
    <table class="spec-table" style="margin:0;">
      <tr><td>Lead ID</td><td>${leadId}</td></tr>
      <tr><td>Status</td><td>New</td></tr>
      <tr><td>Source</td><td>Flex-Hose Website</td></tr>
      <tr><td>Score</td><td><strong style="color:${bucketColor};">${bucket.toUpperCase()} · ${score}</strong></td></tr>
      <tr><td>Interest</td><td>${data.product || '—'}</td></tr>
      <tr><td>Next Action</td><td>Sales follow-up</td></tr>
    </table>`;
  container.appendChild(card);
}

/* ---------------------------------------------------------
   9. NAVIGATION / MOBILE / MISC UI
   --------------------------------------------------------- */
function initNav() {
  document.getElementById('searchToggle').addEventListener('click', () => {
    document.getElementById('searchFlyout').classList.toggle('open');
    document.getElementById('searchInput').focus();
  });
  document.getElementById('searchInput').addEventListener('input', (e) => {
    if (e.target.value.trim().length < 2) return;
    filters.search = e.target.value.trim().toLowerCase();
    document.getElementById('explorerSearch').value = e.target.value;
  });
  document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyFilters();
      document.getElementById('searchFlyout').classList.remove('open');
      showPage('products');
    }
  });

  const mobileNav = document.getElementById('mobileNav');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const hamburger = document.getElementById('hamburgerBtn');
  function openMobileNav() { mobileNav.classList.add('open'); mobileBackdrop.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
  function closeMobileNav() { mobileNav.classList.remove('open'); mobileBackdrop.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  hamburger.addEventListener('click', () => mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav());
  mobileBackdrop.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMobileNav));

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => { backToTop.classList.toggle('show', window.scrollY > 600); });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------
   10. PAGE ROUTER
   Every nav destination is a .page-section (see styles.css); this shows
   exactly one at a time and keeps it in sync with location.hash, so the
   browser's back/forward buttons and direct/bookmarked links to e.g.
   #projects work the same way they would with real separate HTML pages —
   without actually splitting the site into separate files.
   --------------------------------------------------------- */
const PAGE_IDS = ['about', 'products', 'documents', 'projects', 'data-centers', 'software', 'faq', 'contact'];

function pageElement(id) { return id === 'home' ? document.getElementById('page-home') : document.getElementById(id); }

function setActiveNav(id) {
  document.querySelectorAll('.main-nav a[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === id));
}

// updateHash defaults to true for real navigation (nav clicks, buttons); the
// popstate listener below passes false since the browser has already moved
// the URL back/forward itself — pushing again there would break the history
// stack. history.pushState() (used here, not location.hash =) never fires
// its own 'hashchange'/'popstate', so there is no re-entrant loop to guard.
function showPage(id, updateHash = true) {
  if (id !== 'home' && !PAGE_IDS.includes(id)) id = 'home';

  document.querySelectorAll('.page-section').forEach((sec) => sec.classList.remove('active'));
  (pageElement(id) || pageElement('home')).classList.add('active');

  setActiveNav(id);
  window.scrollTo({ top: 0, behavior: 'auto' });

  if (updateHash) {
    const nextHash = id === 'home' ? '#top' : `#${id}`;
    if (location.hash !== nextHash) history.pushState(null, '', nextHash);
  }
}

function initRouter() {
  const startHash = location.hash.replace('#', '');
  showPage(startHash && PAGE_IDS.includes(startHash) ? startHash : 'home', false);

  // Covers the browser's Back/Forward buttons, which move location.hash
  // without going through showPage()'s own history.pushState() call.
  window.addEventListener('popstate', () => {
    const hash = location.hash.replace('#', '');
    showPage(hash === 'top' || !hash ? 'home' : hash, false);
  });
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

/* ---------------------------------------------------------
   INIT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderStaticContent();
  initHeroSlider();
  initFilters();
  applyFilters();
  initQuoteModal();
  initContactForm();
  initNav();
  initImageZoom();
  initRouter();
});
