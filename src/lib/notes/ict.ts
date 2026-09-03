// ICT — full document-style notes matching the Cambridge IGCSE ICT (0417) 2023–2025 syllabus content overview
// One chapter per syllabus topic: 21 chapters covering Sections 1–21 of the content overview.

import type { SubjectNotes } from "./types";

export const ICT: SubjectNotes = {
  id: "ict",
  name: "Information and Communication Technology",
  code: "0417",
  color: "bg-cyan-600",
  chapters: [
    {
      number: 1,
      title: "Types and components of computer systems",
      intro:
        "A computer system is a combination of hardware and software that works together to input, process, output and store data. Understanding the roles of the main internal components, the difference between hardware and software, and the range of computer types available is the foundation of the whole ICT course.",
      subheadings: [
        {
          title: "Hardware and Software",
          body: "Hardware is any physical part of a computer system that you can see and touch, while software is the set of programs (instructions) that tell the hardware what to do. Neither is useful on its own — software controls hardware and hardware runs software.",
          groups: [
            {
              subTitle: "Hardware",
              bullets: [
                "**Hardware** includes the internal components (motherboard, processor, memory, hard disk) and the external devices connected to the computer, called **peripherals**.",
                "**Internal hardware** lives inside the system unit — for example the **CPU**, **RAM**, **ROM**, **GPU (graphics card)**, **motherboard** and the **power supply**.",
                "**External hardware** is connected to the computer by cables or wirelessly, for example the keyboard, mouse, monitor, printer and speakers.",
                "Hardware is further classified by its job: **input devices** (send data in), **output devices** (present data out), **storage devices** (keep data permanently) and the **processor** (processes data).",
                "**Peripheral devices** are any hardware items that are not essential to the computer's core operation but extend its capability, such as a scanner or webcam."
              ]
            },
            {
              subTitle: "Software",
              bullets: [
                "**System software** manages the computer itself. The most important example is the **operating system (OS)**, which controls the CPU, memory, files, peripherals and provides the user interface; **utility programs** (antivirus, disk defragmenter, backup tools, file compression) are also system software.",
                "**Application software** lets the user complete tasks such as writing a letter, manipulating data in a spreadsheet, editing a photo or browsing the web — examples include word processors, spreadsheets, databases, presentation packages and web browsers.",
                "Applications can be **generic (general purpose)** — useful for many tasks (e.g. a word processor) — or **special-purpose (bespoke)** — written for one specific task or organisation (e.g. a school's registration system, a hospital patient-management system).",
                "**Firmware** is software stored permanently on ROM or flash memory inside a device (e.g. the code inside a smart TV or router) that controls that device's basic operation.",
                "System software and application software depend on each other: applications send requests to the OS, and the OS translates them into instructions for the hardware."
              ]
            }
          ]
        },
        {
          title: "The Main Components Inside a Computer System",
          body: "Every general-purpose computer contains the same essential hardware: a processor that carries out instructions, main memory that holds data and instructions while work is happening, and buses that connect the components together on the motherboard.",
          groups: [
            {
              subTitle: "The Central Processing Unit (CPU)",
              bullets: [
                "The **CPU** is the 'brain' of the computer — it **fetches** instructions from memory, **decodes** them and then **executes** them. This repeated process is called the **fetch–decode–execute cycle**.",
                "The CPU contains the **Arithmetic Logic Unit (ALU)**, which performs calculations (+, −, ×, ÷) and logic comparisons (AND, OR, NOT); the **Control Unit (CU)**, which coordinates and controls the whole system by sending control signals; and **registers**, which are tiny, very fast temporary storage locations inside the CPU.",
                "**Cache memory** is small, high-speed memory inside or next to the CPU that stores frequently used instructions and data, so the CPU does not have to wait for the slower main memory.",
                "CPU performance is affected by its **clock speed** (measured in GHz — how many instructions it can process per second), the **number of cores** (each core can process instructions independently) and the **size of the cache**.",
                "The **motherboard** is the main circuit board that physically connects the CPU, memory and all other internal components together using **buses** (data paths that carry data, addresses and control signals)."
              ]
            },
            {
              subTitle: "Main Memory: RAM and ROM",
              bullets: [
                "**RAM (Random Access Memory)** is the computer's working memory. It holds the operating system, application programs and data currently in use. RAM is **volatile** — its contents are lost when the power is switched off.",
                "The amount of RAM limits how many programs can run at once and how smoothly they run; too little RAM causes the computer to use **virtual memory** (a section of the hard disk used as if it were RAM), which is much slower.",
                "**ROM (Read-Only Memory)** is **non-volatile** — it keeps its contents when the power is off. It stores the **BIOS/UEFI** start-up instructions that the computer runs first when it is switched on (**booting**).",
                "ROM is read-only: normal programs cannot write to it, which protects the start-up instructions from accidental deletion or viruses.",
                "The computer's **start-up sequence**: power is switched on → the processor runs the start-up program stored in ROM → the operating system is loaded from secondary storage (e.g. the hard disk or SSD) into RAM → the user can then run applications."
              ]
            }
          ]
        },
        {
          title: "Types of Computer and Their Uses",
          body: "Computers range from tiny embedded microprocessors hidden inside everyday machines to powerful supercomputers used for scientific research. Choosing the right type of computer depends on portability, processing power, cost and the task to be performed.",
          groups: [
            {
              subTitle: "General-Purpose Computers",
              bullets: [
                "**Desktop computers** are powerful, easy to upgrade and cheap for their performance, but they are not portable — suitable for offices, homes and schools.",
                "**Laptops and notebooks** combine the power of a desktop with portability; they run on rechargeable batteries, but they are more expensive and harder to repair or upgrade.",
                "**Tablets and smartphones** are highly portable, touchscreen devices with built-in cameras, microphones and wireless connections; they use low-power processors and apps, but have less processing power and storage than desktops.",
                "**Servers** are powerful computers that provide services (web pages, files, email, databases) to many client computers over a network; they run continuously and are designed for reliability.",
                "**Supercomputers** contain thousands of processors and are used for extremely demanding tasks such as weather forecasting, scientific simulations and cryptography."
              ]
            },
            {
              subTitle: "Embedded Systems",
              bullets: [
                "An **embedded system** is a computer system built into another device to control one specific function — for example the electronics inside a washing machine, microwave oven, car engine-management system, digital camera, smart thermostat or traffic light.",
                "Embedded systems have a **processor and memory** but usually run a single fixed program stored in ROM or flash memory, with no user-installed software.",
                "**Advantages of embedded systems**: they are cheap to produce in bulk, small, use very little power, start instantly and are very reliable because they only ever run one program.",
                "**Disadvantages**: they cannot be reprogrammed by the user for other tasks and they are difficult to upgrade or repair.",
                "Modern examples include **smart devices (IoT)** such as smart TVs, smart watches, smart speakers and internet-connected appliances, which contain embedded systems that can also connect to a network."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Input and output devices",
      intro:
        "Input devices send data and instructions into a computer; output devices present the results of processing to the user. For any real-world task the correct device must be chosen by matching its speed, accuracy, cost and suitability to the situation — a key skill examined in both theory and practical papers.",
      subheadings: [
        {
          title: "Input Devices",
          body: "Input devices can be grouped into manual devices (operated by a person) and automatic/direct data-entry devices (which capture data with little or no human typing). Each device suits particular situations, and questions commonly ask you to justify the choice of a device for a given application.",
          groups: [
            {
              subTitle: "Manual Input Devices",
              bullets: [
                "**Keyboard**: entering text and numbers — used for word processing, data entry and commands. Fast for text but slow and error-prone for large volumes of data, and unsuitable for illiterate or disabled users.",
                "**Mouse / touchpad / trackerball**: controlling a pointer on screen. A mouse is accurate for selecting and dragging; a **trackerball** (a ball on top, rolled by the fingers) needs no desk space, making it ideal where space is limited or for users with limited movement.",
                "**Touchscreen**: the user touches icons on screen; intuitive and no extra hardware needed, used in smartphones, ATMs, ticket machines and self-service checkouts. **Advantages**: fast for choosing options, no keyboard skills needed; **disadvantages**: fingerprints, less precise for detailed work, can be tiring.",
                "**Graphics tablet (digitising tablet)**: a flat board drawn on with a stylus; used by designers and artists because it gives very precise control, and by people doing photo editing or CAD.",
                "**Digital camera / webcam**: captures photographs or video; webcams are used for video calls and streaming. **Microphone**: converts sound into digital data for voice calls, voice recognition and recording.",
                "**Joystick / games controller / steering wheel**: used for playing computer games and for controlling simulations such as flight simulators; also found in some industrial machinery controls."
              ]
            },
            {
              subTitle: "Direct Data Entry and Automatic Input Devices",
              bullets: [
                "**Barcode reader (scanner)**: reads the pattern of parallel black lines on products at supermarket checkouts and in warehouse stock control — very fast, accurate data entry with no typing. Barcodes also speed up stock taking and reordering.",
                "**QR (Quick Response) code reader**: reads two-dimensional square codes using a phone camera; QR codes store far more data than a barcode (URLs, payment details, tickets) and can be read from any angle.",
                "**OMR (Optical Mark Recognition)**: detects pencil marks in predefined positions on forms — used for multiple-choice answer sheets and lottery tickets. Fast and cheap to process, but only recognises marks, not handwriting.",
                "**OCR (Optical Character Recognition)**: scans printed text and converts it into editable digital text — used to digitise printed documents, read passports and number plates. It can misread unusual fonts or damaged print.",
                "**MICR (Magnetic Ink Character Recognition)**: reads characters printed in special magnetic ink, mainly on bank cheques — very secure against forgery and readable even when stamped over, but the special ink is expensive.",
                "**Magnetic stripe reader / chip-and-PIN reader**: reads data stored on the magnetic stripe or chip of a bank card at ATMs and payment terminals.",
                "**Sensors**: devices that measure physical quantities — temperature, light, pressure, humidity, motion, infrared, sound — and send the readings to a computer (see data logging in Chapter 6). RFID readers scan tags wirelessly for stock tracking and contactless travel cards."
              ]
            }
          ]
        },
        {
          title: "Output Devices",
          body: "Output devices present processed data. Hard-copy output (printers and plotters) is permanent and portable; soft-copy output (monitors and speakers) is displayed electronically. Selection depends on output quality, speed, running cost and whether a permanent copy is needed.",
          groups: [
            {
              subTitle: "Printers (Hard Copy)",
              bullets: [
                "**Inkjet printer**: sprays tiny droplets of liquid ink onto paper. **Advantages**: cheap to buy, high-quality colour, quiet, good for small print runs and photographs; **disadvantages**: slow for large volumes, ink cartridges are expensive and can dry out.",
                "**Laser printer**: uses a laser beam and toner powder fused onto the paper. **Advantages**: very fast, low running cost per page, crisp text, ideal for high-volume office printing; **disadvantages**: more expensive to buy, colour models are costly, and it is not the best choice for glossy photo printing.",
                "**Dot-matrix printer**: a hammer strikes an ink ribbon to form characters from dots. It is slow and noisy with low quality, but it can print through multi-part (carbon-copy) forms — used for till receipts, invoices and in noisy industrial settings.",
                "**3D printer**: builds solid three-dimensional objects layer by layer from a digital design — used for prototypes, models, prosthetics and manufacturing small parts.",
                "**Plotter**: draws continuous lines using pens, allowing very large, accurate prints such as engineering drawings, maps and architects' plans."
              ]
            },
            {
              subTitle: "Screens and Other Soft-Copy Output",
              bullets: [
                "**LCD/LED monitors**: thin, energy-efficient flat screens using liquid crystals (with LED backlighting); used for computers, laptops and TVs. **OLED** screens give deeper blacks and better contrast because each pixel produces its own light.",
                "**CRT monitors** are the older, bulky cathode-ray-tube screens — now largely obsolete because they are heavy and consume more power.",
                "**Touchscreen displays** act as both input and output, used in phones, kiosks and interactive whiteboards.",
                "**Projectors**: display a computer's output onto a large screen or wall, used for presentations, teaching and home cinema; **interactive whiteboards** combine a projector with a touch-sensitive board for classrooms.",
                "**Speakers and headphones**: output sound from music, video and voice calls; **actuators** are output devices used in control systems to produce physical movement (e.g. opening a window, moving a robot arm)."
              ]
            }
          ]
        },
        {
          title: "Choosing Devices for Applications",
          body: "Exam questions often describe a scenario and ask which input and output devices are most suitable and why. Always match the device to the task, the environment and the user, and mention a clear advantage and disadvantage of your choice.",
          groups: [
            {
              subTitle: "Typical Applications",
              bullets: [
                "**Supermarket checkout**: barcode reader for fast product identification, touchscreen or keypad for payment, chip-and-PIN reader for card payments, and a screen or receipt printer as output.",
                "**School attendance and exams**: OMR for multiple-choice answer sheets; barcode or RFID for tracking registers and library books.",
                "**Banking**: MICR for reading cheques, magnetic stripe/chip readers at ATMs, card readers for online banking security, sensors to count cash.",
                "**Medicine**: sensors to monitor patients' temperature and heart rate, digital cameras for scans, microphones for dictation, laser printers for prescriptions and labels.",
                "**Home/office use**: keyboard and mouse for input, monitor and inkjet/laser printer for output, microphone and webcam for video conferencing."
              ]
            },
            {
              subTitle: "Selection Factors",
              bullets: [
                "**Accuracy**: which device gives the fewest errors (e.g. barcode vs keyboard entry)?",
                "**Speed and volume**: how much data must be processed, and how quickly (laser printer for a busy office, inkjet for home use)?",
                "**Cost**: initial purchase price AND running cost per page/use must both be considered.",
                "**Output quality needed**: photo-quality colour (inkjet) vs fast crisp text (laser) vs large continuous lines (plotter).",
                "**Environment and users**: touchscreens suit public kiosks; trackerballs suit limited desk space; braille keyboards/screen readers support users with disabilities."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Storage devices and media",
      intro:
        "Storage is used to keep data, programs and files when the computer is switched off. Storage can be primary (inside the computer, fast but temporary), secondary (permanent, inside the computer) or offline/removable (portable media). Choosing the right storage medium means comparing capacity, speed, portability, durability and cost against the task.",
      subheadings: [
        {
          title: "Primary, Secondary and Offline Storage",
          body: "The three levels of storage differ in speed, capacity, volatility and whether they are built into the computer or removable. Understanding where data lives at each moment — running (RAM), saved (secondary), archived or transported (offline) — is essential.",
          groups: [
            {
              subTitle: "Primary Storage",
              bullets: [
                "**Primary storage** is directly accessed by the CPU and includes **RAM**, **ROM** and **cache**. It is extremely fast but RAM and cache are **volatile** (contents lost when power is off).",
                "Primary storage holds the data and instructions that the CPU is currently using — it does NOT store files permanently.",
                "**Virtual memory** is a technique where part of the secondary storage is used as an extension of RAM when RAM is full; the computer slows down because disk access is far slower than RAM."
              ]
            },
            {
              subTitle: "Secondary Storage (Internal)",
              bullets: [
                "**Secondary storage** stores data permanently inside the computer — the operating system, applications and user files. Examples: **HDD** (magnetic), **SSD** (solid state) and some hybrid drives.",
                "**Hard Disk Drive (HDD)** stores data magnetically on spinning metal platters read by a moving read/write head.",
                "**Solid State Drive (SSD)** stores data in flash memory chips with no moving parts, making it faster, quieter, more shock-resistant and more energy-efficient than an HDD — but more expensive per gigabyte.",
                "Choosing HDD vs SSD: use an **SSD** where speed, silence and durability matter (laptops, gaming, OS drive); use an **HDD** where large capacity at low cost matters (bulk backups, media archives, servers)."
              ]
            },
            {
              subTitle: "Offline (Removable) Storage",
              bullets: [
                "**Offline storage** is removable media not permanently inside the computer — used to transport data, make backups and share files.",
                "**Optical media**: **CD** (≈700 MB), **DVD** (≈4.7 GB, dual layer ≈8.5 GB) and **Blu-ray** (25–128 GB). CDs suit music and small software, DVDs suit films and larger data, Blu-ray suits high-definition video and large backups.",
                "**Solid-state removable media**: **memory sticks / USB flash drives** and **memory cards** (SD, microSD used in cameras and phones) — small, portable, rewritable and durable with no moving parts.",
                "**Magnetic tape**: very cheap per gigabyte with huge capacity (terabytes), used mainly for large-scale backups and archiving because access is sequential (slow to find one file) but writing whole backups is fast.",
                "**Cloud storage** is not a physical medium — files are stored on internet servers, which acts like an always-available, remote backup accessible from any device (see Chapter 4)."
              ]
            }
          ]
        },
        {
          title: "Units of Storage and File Sizes",
          body: "Data is measured in bits and bytes. Being able to convert between units and estimate file sizes is a common exam skill, along with knowing why files are compressed.",
          groups: [
            {
              subTitle: "Units",
              bullets: [
                "**Bit** = one binary digit (0 or 1); **nibble** = 4 bits; **byte** = 8 bits (enough to store one character such as 'A').",
                "**1 KB (Kilobyte)** = 1024 bytes; **1 MB (Megabyte)** = 1024 KB; **1 GB (Gigabyte)** = 1024 MB; **1 TB (Terabyte)** = 1024 GB; **1 PB (Petabyte)** = 1024 TB.",
                "Text file size ≈ number of characters × 1 byte per character (e.g. a 10,000-character document ≈ 10 KB).",
                "Image file size ≈ width (px) × height (px) × colour depth (bits); sound file size ≈ sample rate × bit depth × duration × channels.",
                "Storage capacity is often quoted in decimal (1 GB = 1,000,000,000 bytes) which is why a '1 TB' drive appears to hold slightly less than 1024 GB."
              ]
            },
            {
              subTitle: "Compression",
              bullets: [
                "**File compression** reduces the number of bits used to store a file, saving storage space and making files faster to transfer (e.g. email, upload, download).",
                "**Lossy compression** permanently removes data the human eye/ear cannot easily notice — used for JPEG images and MP3 audio; small files but quality is lost and cannot be restored.",
                "**Lossless compression** (e.g. PNG, ZIP, FLAC) reduces size by removing redundancy without losing any data — the original can be perfectly rebuilt, ideal for documents, spreadsheets and text.",
                "Compressed archive files such as **.zip** combine and compress many files into one for easy transfer and storage."
              ]
            }
          ]
        },
        {
          title: "Selecting Storage for a Purpose",
          body: "Backups, archives, portability and day-to-day use each demand different storage. Justify choices by comparing the properties of the media with the needs of the situation.",
          groups: [
            {
              subTitle: "Comparison Properties",
              bullets: [
                "**Capacity**: how much data the medium can hold (compare in GB/TB).",
                "**Speed**: how quickly data can be read and written (SSD > HDD > optical > tape for random access).",
                "**Portability**: how easily the medium can be carried between locations.",
                "**Durability/robustness**: resistance to scratches, drops, heat, magnetic fields and wear (solid state is most robust; optical discs scratch easily).",
                "**Cost per gigabyte**: tape and HDD are cheapest per GB; SSD and memory cards are more expensive."
              ]
            },
            {
              subTitle: "Common Scenarios",
              bullets: [
                "**Storing the operating system and programs** → internal SSD for fast loading.",
                "**Backing up a whole office server nightly** → magnetic tape or large external HDD for cheap, high-capacity sequential backup.",
                "**Transporting a presentation between home and school** → memory stick (small, portable, rewritable).",
                "**Distributing software or films to customers** → optical discs (Blu-ray/DVD) as cheap physical media.",
                "**Accessing files from any device anywhere** → cloud storage, which also provides off-site backup against theft, fire or hardware failure."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Networks and the effects of using them",
      intro:
        "A network is two or more computers connected together so they can share data, software and hardware. Networks range from a few devices in one room (LAN) to global connections (the internet). This chapter covers network types, hardware, the benefits and drawbacks of networking, and how networks have changed communication and working practices.",
      subheadings: [
        {
          title: "Types of Network",
          body: "Networks are classified by their geographical size and by how they are managed. The internet itself is a worldwide network of networks, while companies also use private networks (intranets) and controlled external networks (extranets).",
          groups: [
            {
              subTitle: "By Size and Scope",
              bullets: [
                "**PAN (Personal Area Network)** — a very small network around one person, e.g. a phone connected by Bluetooth to wireless earbuds or a smartwatch.",
                "**LAN (Local Area Network)** — computers connected within a limited area such as a school, office or home, usually owned by one organisation. LANS are typically fast and use Wi-Fi or Ethernet cables.",
                "**WAN (Wide Area Network)** — spans a large geographical area (a country or the world), connecting LANs together, usually through leased telephone lines or fibre-optic cables. The **internet** is the largest WAN.",
                "**VPN (Virtual Private Network)** — a secure, encrypted connection built over a public network (the internet) so remote workers appear to be on their company's private LAN; it protects data in transit.",
                "**Intranet** — a private network inside an organisation using internet technologies (web pages, email) but accessible only to its members. An **extranet** extends part of an intranet to chosen outsiders such as suppliers or customers."
              ]
            },
            {
              subTitle: "By Management: Client–Server and Peer-to-Peer",
              bullets: [
                "In a **client–server network**, one or more powerful central computers (**servers**) store files, run applications, manage email and control access, while **clients** (workstations) request these services.",
                "**Advantages of client–server**: centralised security, backup and software updates; user access rights are easily controlled; resources are shared efficiently. **Disadvantages**: a server failure can stop the whole network; specialist staff and more expensive hardware are needed.",
                "In a **peer-to-peer network**, every computer is equal — each can share its own files and resources with the others, with no central server.",
                "**Advantages of peer-to-peer**: cheap to set up, no specialist server or administrator needed. **Disadvantages**: no central control of security or backups, files can be hard to find, performance suffers as users grow — best for small networks (homes, small offices)."
              ]
            }
          ]
        },
        {
          title: "Network Hardware and Media",
          body: "Devices on a network are connected by cables or wirelessly and communicate using agreed rules (protocols). The hardware chosen affects speed, reliability and cost.",
          groups: [
            {
              subTitle: "Connecting Devices",
              bullets: [
                "**NIC (Network Interface Card)** — built into each device, giving it a unique **MAC address** and allowing it to connect to the network (wired Ethernet port or wireless antenna).",
                "**Switch** — connects multiple devices on a LAN and sends data only to the device it is addressed to, keeping the network efficient.",
                "**Router** — connects different networks together (e.g. the home LAN to the internet); it reads IP addresses and forwards data packets along the best path. Most home routers also include a switch and a wireless access point.",
                "**Wireless Access Point (WAP)** — lets wireless devices join a wired network; **repeaters/extenders** boost the Wi-Fi signal to cover larger areas.",
                "**Modem** — converts digital signals from a computer into analogue signals for telephone/cable lines and back again; a **fibre modem/ONT** does the same for fibre-optic connections. The ISP (Internet Service Provider) supplies the connection to the internet."
              ]
            },
            {
              subTitle: "Transmission Media and Speed",
              bullets: [
                "**UTP (Ethernet) cable** — cheap, reliable copper cable used for LANs; **fibre-optic cable** — transmits data as light pulses; very fast, secure against interference and able to carry huge amounts of data over long distances (used for WAN backbones).",
                "**Wi-Fi** — wireless networking using radio waves; convenient and no cables, but slower, less secure and more affected by walls and interference than cable.",
                "**Bluetooth** — short-range wireless technology (up to ~10 m) used to connect peripherals: headsets, keyboards, speakers, and for transferring small files between phones.",
                "**Bandwidth** — the maximum amount of data that can travel along a connection per second, measured in **Mbps/Gbps** (megabits/gigabits per second). Higher bandwidth = faster transfer and smoother streaming.",
                "Data transfer rate is how much data is actually sent per second; a file of 8 megabits takes about 1 second on a 8 Mbps connection. Note: bytes (B) vs bits (b) — 8 bits = 1 byte."
              ]
            }
          ]
        },
        {
          title: "Benefits, Drawbacks and Effects of Networking",
          body: "Networks bring huge benefits to organisations and individuals, but they also introduce risks and costs. Networks have also changed the way people communicate and work, enabling new styles such as remote and mobile working.",
          groups: [
            {
              subTitle: "Advantages and Disadvantages",
              bullets: [
                "**Advantages of networks**: files, software and hardware (printers, scanners) can be **shared**; one internet connection serves everyone; centralised **backups** and **security**; email and instant messaging speed up communication; software can be updated centrally; users can access their files from any computer on the network.",
                "**Disadvantages of networks**: initial setup costs (servers, cabling, switches, routers); if the server or connection fails, users may lose access to files and the internet; networks are vulnerable to **viruses and hacking** (one infected computer can threaten the whole network); specialist staff are needed to manage them; data can be intercepted if security is weak."
              ]
            },
            {
              subTitle: "Effects on Communication and Working",
              bullets: [
                "**Communication effects**: email replaces paper memos and letters; instant messaging and voice/video calls (VoIP) cut phone bills; video conferencing allows face-to-face meetings between offices and countries; social media and collaboration tools (shared documents, wikis) let teams work on the same files at the same time.",
                "**Remote working**: employees can work from home (**teleworking**), connected to the office by VPN — saving travel time, reducing office costs and allowing flexible hours; drawbacks include isolation and the need for a reliable home connection.",
                "**Mobile working**: sales staff, engineers and doctors can access email, calendars, customer records and the internet from laptops, tablets and smartphones anywhere with Wi-Fi or mobile data.",
                "**Cloud computing** delivers software and storage over the internet (Google Drive, Microsoft 365, iCloud): users can access the latest versions of files from any device, companies avoid buying their own servers, and providers handle backups and updates — but a reliable internet connection is required and data is held by a third party.",
                "**Effects on individuals**: streaming music and video, online gaming, e-learning, online shopping and banking all depend on networks; concerns include screen time, cyberbullying, privacy and the 'digital divide' between those with and without good internet access."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "The effects of using IT",
      intro:
        "Information technology has transformed employment, industry, commerce, medicine, education and daily life. This chapter examines both the positive effects and the negative consequences of IT in different sectors, including the health risks of prolonged computer use and how they can be reduced.",
      subheadings: [
        {
          title: "Effects on Employment and Working Patterns",
          body: "Automation and computers change the number and nature of jobs: some jobs disappear, new ones are created, and many existing jobs change how they are done. Working patterns have also become far more flexible.",
          groups: [
            {
              subTitle: "Jobs and Automation",
              bullets: [
                "**Jobs lost/reduced**: repetitive tasks are automated — bank cashiers (ATMs, online banking), checkout operators (self-checkouts), filing clerks, switchboard operators and some factory assembly workers.",
                "**Jobs created**: programmers, network engineers, web designers, cybersecurity specialists, data analysts, IT support staff, social-media managers and robotics engineers.",
                "**Jobs changed**: most jobs now involve IT — teachers use virtual learning environments, mechanics use diagnostic computers, farmers use GPS-guided machinery, and sales staff use tablets to record orders.",
                "**Retraining** is essential: organisations provide training so existing staff can learn the new skills that automated systems require."
              ]
            },
            {
              subTitle: "New Working Patterns",
              bullets: [
                "**Teleworking/remote working**: working from home using a computer and internet connection — saves commuting time and cost, reduces company office space, allows flexible hours and can reduce traffic pollution; drawbacks include lack of social contact, difficulty separating work and home life, and the need for self-discipline and a good connection.",
                "**Mobile working**: working while travelling or at client sites using laptops and smartphones.",
                "**Hot-desking**: workers share desks and book them as needed, saving office space for companies that have many remote workers.",
                "**Video conferencing** replaces business travel, saving time and money and reducing carbon emissions."
              ]
            }
          ]
        },
        {
          title: "Effects on Different Sectors",
          body: "IT has reshaped whole industries. Being able to describe the effects on banking, retail, medicine, education, manufacturing, transport and libraries is a core exam topic — always give named examples.",
          groups: [
            {
              subTitle: "Banking, Retail and Commerce",
              bullets: [
                "**Banking**: **online banking** lets customers check balances, transfer money and pay bills 24/7 from any device; **ATMs** dispense cash and accept deposits without staff; **chip-and-PIN** and contactless payments speed up transactions; banks need fewer branches and cashiers but must invest heavily in **security** against fraud and hacking.",
                "**Retail**: **e-commerce** allows shopping online with home delivery; **EPOS (Electronic Point of Sale)** tills update stock levels automatically when items are scanned; **self-checkout** machines reduce staff; **loyalty cards** record buying habits so shops can target advertising; stock control systems automatically reorder goods when levels are low.",
                "**Advertising and marketing**: digital advertising targets specific audiences using data about browsing and buying habits."
              ]
            },
            {
              subTitle: "Medicine, Education and Transport",
              bullets: [
                "**Medicine**: computers store patient records (easier to share between hospitals), monitor vital signs, control life-support machines, assist surgeons (keyhole and robotic surgery), scan bodies (MRI, CT, ultrasound) and support diagnosis through **expert systems**; **telemedicine** lets doctors consult patients remotely. Risks: data must be kept secure and confidential, and equipment failure can be critical.",
                "**Education**: **e-learning** and **VLEs** (Virtual Learning Environments) deliver lessons, homework and tests online; interactive whiteboards and tablets make lessons engaging; students can research using the internet. Drawbacks include distractions, over-reliance on technology and unequal access at home.",
                "**Transport**: traffic-light computers control junctions, **satellite navigation (GPS)** gives drivers turn-by-turn directions, autopilot systems fly aircraft, congestion charging reduces city traffic, and smart ticketing speeds up rail travel."
              ]
            },
            {
              subTitle: "Manufacturing, Libraries and the Environment",
              bullets: [
                "**Manufacturing**: **CAD (Computer-Aided Design)** designs products on screen; **CAM (Computer-Aided Manufacture)** controls the machines that make them; **robots** do dangerous, repetitive or precise assembly work 24 hours a day — increasing speed, consistency and safety while reducing labour costs (but replacing some workers).",
                "**Libraries**: **OPAC (Online Public Access Catalogue)** lets users search for books from anywhere; barcode systems speed up borrowing and returns and automatically track overdue items.",
                "**Environment**: IT can reduce paper use (electronic documents), cut travel (video conferencing) and improve energy efficiency (smart meters, smart buildings); but manufacturing and powering billions of devices consumes energy, and **e-waste** (discarded electronics) is a growing disposal problem."
              ]
            }
          ]
        },
        {
          title: "Health Effects and Their Prevention",
          body: "Using computers for long periods can harm health. Candidates must be able to name the main risks (RSI, eye strain, back problems) and describe practical precautions for each.",
          groups: [
            {
              subTitle: "Common Health Risks",
              bullets: [
                "**Repetitive Strain Injury (RSI)** — pain in the hands, wrists and arms caused by repeated movements such as typing and clicking; can lead to conditions like carpal tunnel syndrome.",
                "**Eye strain / headaches** — caused by staring at a screen for long periods, poor lighting, glare or an incorrectly positioned screen.",
                "**Back and neck pain** — caused by poor posture, unsuitable chairs or badly positioned screens and keyboards.",
                "**Other effects**: sedentary working can contribute to obesity and circulation problems; stress can increase with information overload or tight deadlines."
              ]
            },
            {
              subTitle: "Preventative Measures",
              bullets: [
                "**Ergonomic furniture**: an adjustable chair supporting the lower back, with feet flat on the floor; a desk at the correct height.",
                "**Screen position**: the top of the screen roughly at eye level, about an arm's length away, tilted to avoid glare; use a screen filter or adjust lighting to prevent reflections.",
                "**Breaks and exercises**: take regular short breaks (e.g. every 20–30 minutes), look away into the distance to relax the eyes, and stretch hands and wrists.",
                "**Input devices**: use an ergonomic keyboard and mouse, and wrist rests, to reduce strain.",
                "**Work environment**: good ventilation, suitable humidity, and anti-glare screens; employers should carry out workstation assessments and provide eye tests where required by law.",
                "**Health and safety law** (e.g. Display Screen Equipment regulations) requires employers to assess workstations, provide training and arrange eye tests for regular users."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "ICT applications",
      intro:
        "ICT is applied across almost every area of life. This chapter surveys the main application areas in the syllabus: communication applications, data-handling applications, measurement and control, modelling and simulation, applications in banking/retail/medicine, expert systems and geographic information systems (GIS). For each, learn the purpose, the key components or features, and at least one real example.",
      subheadings: [
        {
          title: "Communication Applications",
          body: "Communication applications allow people to exchange messages, files and live audio/video over networks. Choosing the right tool depends on whether the communication is one-to-one, one-to-many or many-to-many, and whether it must be instant or can be stored.",
          groups: [
            {
              subTitle: "Email and Messaging",
              bullets: [
                "**Email** allows messages with attached files to be sent to one person or a group (using cc/bcc); messages are stored on a mail server until the recipient reads them. **Advantages**: instant worldwide delivery, cheap, copies easily kept; **disadvantages**: spam, viruses in attachments, phishing and the need for internet access.",
                "**Instant messaging (IM)** and **chat** give real-time text conversations; **VoIP** (Voice over Internet Protocol, e.g. Skype, WhatsApp calls) sends voice calls over the internet, cutting telephone costs.",
                "**Video conferencing** (Zoom, Teams, Meet) lets people in different places see and hear each other live, share screens and hold meetings without travelling.",
                "**Webinars** are one-to-many live online seminars — the presenter speaks while a large audience watches and asks questions by chat."
              ]
            },
            {
              subTitle: "Social and Collaborative Media",
              bullets: [
                "**Social networking sites** (Facebook, Instagram, X, TikTok) let users share text, photos and videos, follow news, and communicate with friends or the public — used by individuals, businesses for marketing, and organisations for announcements.",
                "**Blogs** are online journals or opinion pages, usually written by one author and updated regularly; **microblogs** (e.g. X posts) are very short updates.",
                "**Wikis** are websites that multiple users can edit collaboratively (e.g. Wikipedia) — useful for building shared knowledge bases.",
                "**Forums** are discussion boards where users post questions and replies on specific topics, creating searchable archives of help.",
                "**Collaboration tools** (shared documents, cloud drives, project boards) allow several people to work on the same file at the same time from different locations."
              ]
            }
          ]
        },
        {
          title: "Data-Handling and Batch Processing Applications",
          body: "Data-handling systems store, process and report on large volumes of structured data. Batch processing collects transactions and processes them together at a scheduled time, which is efficient for regular, non-urgent work.",
          groups: [
            {
              subTitle: "Typical Data-Handling Systems",
              bullets: [
                "**School records**: student personal details, attendance, grades and timetables stored in a database; reports are produced automatically.",
                "**Payroll**: each employee's hours, rate and deductions are processed to calculate wages and print payslips.",
                "**Stock control**: each sale reduces the stock count automatically; when an item falls below its reorder level the system generates a reorder (see also EPOS in Chapter 5).",
                "**Utility billing**: meter readings are processed monthly to produce water/electricity bills for thousands of customers."
              ]
            },
            {
              subTitle: "Batch Processing",
              bullets: [
                "In **batch processing**, data is collected over a period, then processed all together later with no user interaction — for example printing all bills at the end of the month or processing all exam marks overnight.",
                "**Advantages**: efficient use of computer time (runs when the system is otherwise idle), consistent processing, suitable for very large volumes of routine data.",
                "**Disadvantages**: results are not up to date between runs — unsuitable when an immediate response is needed (e.g. booking a seat or checking a balance)."
              ]
            }
          ]
        },
        {
          title: "Measurement, Control and Modelling Applications",
          body: "Computers monitor the physical world through sensors (data logging) and can act on it through actuators (control systems). Modelling and simulation let us experiment safely with systems that are dangerous, expensive or impossible to build in reality.",
          groups: [
            {
              subTitle: "Data Logging and Process Control",
              bullets: [
                "**Data logging**: sensors connected to a computer automatically measure and record physical data over time — temperature, light, pressure, pH, motion, sound. Loggers work unattended, day and night, and record data more frequently and accurately than a human could.",
                "**Examples of data logging**: weather stations recording temperature and rainfall; monitoring conditions in a greenhouse, science experiment or hospital ward; tracking the temperature of food during transport.",
                "**Control systems** use a feedback loop: sensors measure a value → the computer compares it with a desired (preset) value → if different, the computer sends a signal to an **actuator** to make a change → the sensors check again.",
                "**Examples of process control**: a central-heating system (thermostat sensor switches the boiler on/off), a greenhouse (vents and sprinklers open automatically when temperature or moisture passes set levels), traffic lights, and automatic washing machines.",
                "**Robots** are controlled by computers to do repetitive, precise or dangerous jobs — welding car bodies, painting, exploring disaster sites, defusing bombs."
              ]
            },
            {
              subTitle: "Modelling and Simulation",
              bullets: [
                "**Modelling** uses a computer program (often a spreadsheet) to represent a real situation with variables and formulas, so that changing an input shows the effect on the outcome — e.g. a **what-if model** for a company budget, or a mortgage calculator.",
                "**Simulations** imitate real systems: **flight simulators** train pilots safely on the ground, **driving simulators** teach learners without risk, and simulations model **weather forecasting**, **population growth**, **chemical reactions** and **nuclear tests**.",
                "**Advantages of simulation**: cheaper and safer than using real equipment, can be repeated as many times as needed, time can be sped up (years of climate change in minutes), and nothing is damaged by mistakes.",
                "**Disadvantages**: the simulation is only as accurate as the model and data behind it — it may not include every real-world factor."
              ]
            }
          ]
        },
        {
          title: "Banking, Retail, Medicine, Expert Systems and GIS",
          body: "These application areas combine databases, networks and artificial-intelligence-style rules to provide services that would be impossible or very slow without ICT.",
          groups: [
            {
              subTitle: "Banking and Retail Applications",
              bullets: [
                "**Banking**: ATM networks, online banking, mobile banking apps, chip-and-PIN and contactless card payments, electronic fund transfers (EFT), standing orders and direct debits, and fraud-detection systems that flag unusual transactions.",
                "**Retail**: EPOS tills with barcode scanning, automatic stock control and reordering, online shopping sites with electronic payment, delivery tracking, and loyalty schemes that analyse customer data."
              ]
            },
            {
              subTitle: "Medicine Applications",
              bullets: [
                "**Hospital administration**: patient records, appointments, prescriptions and bed management stored and shared on computer systems.",
                "**Diagnosis and treatment**: scanners (MRI, CT, ultrasound) produce images for doctors, expert systems help diagnose illnesses from symptoms, computers control life-support machines and surgical robots, and telemedicine connects patients with remote specialists."
              ]
            },
            {
              subTitle: "Expert Systems",
              bullets: [
                "An **expert system** is a computer program that imitates the decision-making of a human expert in a specific field. Users answer questions and the system reaches a conclusion with reasons.",
                "**Components**: the **knowledge base** (facts about the subject), the **rule base** (IF…THEN rules), the **inference engine** (applies the rules to the facts to reach conclusions), and the **user interface** (asks questions and displays results and explanations).",
                "**Examples**: medical diagnosis (suggesting illnesses from symptoms), mineral/soil analysis for farming, car engine fault diagnosis, chess programs, and loan-approval systems in banks.",
                "**Advantages**: available 24/7, never forgets, consistent decisions, can combine the knowledge of many experts; **disadvantages**: no common sense or creativity, expensive to build and update, and it can only answer within its programmed field."
              ]
            },
            {
              subTitle: "GIS (Geographic Information Systems)",
              bullets: [
                "A **GIS** captures, stores, analyses and displays data linked to locations, shown as layered digital maps.",
                "**Uses**: finding the best site for a new shop or school, routing emergency vehicles, planning delivery routes, tracking disease outbreaks, environmental planning and navigation apps.",
                "A GIS combines map layers (roads, rivers, buildings, population, flood risk) so users can ask questions such as 'how many customers live within 5 km of this store?'"
              ]
            }
          ]
        }
      ]
    },
    {
      number: 7,
      title: "The systems life cycle",
      intro:
        "The systems life cycle describes the stages through which a new computer system passes, from the moment a problem is recognised to the final maintenance of the finished system. The stages are: analysis, design, development and testing, implementation, documentation, and evaluation and maintenance — each with specific tasks and methods.",
      subheadings: [
        {
          title: "Analysis and Fact-Finding",
          body: "In the analysis stage the analyst finds out exactly what the current system does and what the new system must achieve. A feasibility study checks whether the project is practical in terms of cost, time and technology.",
          groups: [
            {
              subTitle: "Fact-Finding Methods",
              bullets: [
                "**Interviews** — the analyst asks questions face to face. **Advantages**: detailed answers, follow-up questions possible, body language observed; **disadvantages**: time-consuming and expensive, and interviewees may feel nervous.",
                "**Questionnaires** — printed or online forms completed by many users. **Advantages**: cheap to reach a large number of people, quick to analyse if closed questions are used; **disadvantages**: poor response rates, answers can be vague or incomplete, no chance to clarify.",
                "**Observation** — the analyst watches staff doing the current job. **Advantages**: sees exactly what happens, including problems users do not mention; **disadvantages**: people may work differently when watched, and it takes time.",
                "**Examining documents** — studying existing forms, invoices, reports and files. **Advantages**: shows the real data inputs and outputs; **disadvantages**: documents may be out of date or not represent the whole process.",
                "The analyst then produces a **requirements specification**: a clear statement of what the new system must do, agreed with the client."
              ]
            }
          ]
        },
        {
          title: "Design, Development and Testing",
          body: "The design stage specifies exactly what the new system will look like and how it will work. The system is then built (developed) and tested thoroughly with carefully chosen test data before users ever see it.",
          groups: [
            {
              subTitle: "Design",
              bullets: [
                "Design covers the **inputs** (screen layouts, data-capture forms, input devices), the **outputs** (report and screen layouts, output devices), the **processing** (calculations and rules) and the **data storage** (database structure, file formats).",
                "Designs are often shown to users as **prototypes** or mock-ups so that errors are found before programming starts — changes are far cheaper at design stage than after the system is built.",
                "**Validation** checks that data entered is reasonable and in the correct format (range checks, type checks, length checks, presence checks, format checks, check digits) — it cannot stop every mistake but catches impossible values.",
                "**Verification** checks that data has been entered correctly (double entry and comparison, or visually checking the screen against the source document)."
              ]
            },
            {
              subTitle: "Development and Testing",
              bullets: [
                "During **development** the system is written (programmed or configured) and the database, screens and reports are created.",
                "A **test plan** is written listing every test: the test data, the expected result and the actual result.",
                "**Normal data** — valid everyday values (e.g. a mark of 65); **boundary/extreme data** — values at the limits of what is allowed (e.g. 0 and 100 for a mark); **abnormal (invalid) data** — values that should be rejected (e.g. 150 or 'abc' for a mark).",
                "**Alpha testing** is done by the developers themselves; **beta testing** is done by a small group of real users in real conditions before the full launch.",
                "Any errors found (bugs) are corrected and the tests are repeated until the system meets the requirements."
              ]
            }
          ]
        },
        {
          title: "Implementation, Documentation, Evaluation and Maintenance",
          body: "Once tested, the new system replaces the old one, users must be shown how to use it, and the system is then reviewed and kept up to date for the rest of its working life.",
          groups: [
            {
              subTitle: "Implementation (Changeover Methods)",
              bullets: [
                "**Direct changeover**: the old system is switched off and the new one switched on at once. Cheapest and quickest, but very risky — if the new system fails there is no fallback.",
                "**Parallel running**: old and new systems run together for a while and results are compared. Safest method, but expensive because both systems and double staff time are needed.",
                "**Phased implementation**: the new system is introduced one part at a time (e.g. payroll first, then stock control) — risk is spread, but it takes longer.",
                "**Pilot running**: the new system is used by only one branch/department first; when it works well it is rolled out to the rest of the organisation.",
                "**Training** is provided for users during implementation — either formal courses or on-the-job support."
              ]
            },
            {
              subTitle: "Documentation",
              bullets: [
                "**User documentation** is written for the people who use the system: how to start and stop it, step-by-step instructions with screenshots, how to enter data, error messages explained, and a troubleshooting/FAQ section.",
                "**Technical documentation** is written for programmers and IT staff who maintain the system: system overview, hardware and software requirements, file and database structures, program listings/code, and testing details."
              ]
            },
            {
              subTitle: "Evaluation and Maintenance",
              bullets: [
                "**Evaluation** checks whether the new system meets the requirements specification: Is it fast enough? Easy to use? Reliable? Did it stay within budget? Users' feedback is collected and compared against the original objectives.",
                "**Corrective maintenance** — fixing errors (bugs) that appear after the system is in use.",
                "**Adaptive maintenance** — changing the system because the environment changed (new law, new hardware, new operating system).",
                "**Perfective maintenance** — improving the system by adding new features or making it faster/easier to use.",
                  "**Preventative maintenance** — routine work to stop future problems, such as cleaning data and applying security updates."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 8,
      title: "Safety and security",
      intro:
        "Using ICT safely means protecting people from physical harm and protecting data from loss, damage or theft. This chapter covers physical safety in the workplace, the main threats to data and systems (malware, hacking, phishing), the security measures used against them (passwords, biometrics, encryption, firewalls, backups) and the laws that govern computer use and personal data.",
      subheadings: [
        {
          title: "Physical Safety",
          body: "Computers and their peripherals are electrical equipment that can cause injury if used carelessly. Employers and users must follow simple precautions to create a safe working environment.",
          groups: [
            {
              subTitle: "Safe Working Practices",
              bullets: [
                "**Electrical safety**: equipment should be regularly checked (PAT tested), not overloaded with adapters, and repaired only by qualified people; damaged cables and plugs must be replaced immediately.",
                "**Cable management**: cables should be secured or tucked away so nobody trips over them, and kept clear of heat sources and water.",
                "**Furniture and posture**: adjustable chairs, correct desk height and screen position reduce back, neck and wrist injuries (see Chapter 5 health effects).",
                "**Environment**: rooms should be well lit (without screen glare), ventilated and kept at a comfortable temperature; food and drink must be kept away from equipment.",
                "**Fire safety**: electrical equipment should be switched off when not in use, and extinguishers suitable for electrical fires must be available."
              ]
            }
          ]
        },
        {
          title: "Threats to Data and Systems",
          body: "Data can be lost accidentally (hardware failure, human error) or stolen/damaged deliberately. Knowing how each threat works is the first step to protecting against it.",
          groups: [
            {
              subTitle: "Malware and Online Threats",
              bullets: [
                "**Viruses** — self-replicating programs that attach themselves to files and spread when the file is shared; they can delete files, slow the computer or send spam. **Worms** spread across networks without needing a host file. **Trojan horses** disguise themselves as useful software but carry a hidden harmful payload.",
                "**Spyware** secretly records what a user does (websites visited, keystrokes) and sends the information to a third party; **keyloggers** record every keystroke to steal passwords and card numbers.",
                "**Phishing** — fake emails or messages that pretend to be from a trusted organisation (bank, delivery company) to trick users into revealing passwords or card details, often via a link to a fake website. **Pharming** redirects users to fake websites without them knowing.",
                "**Hacking** — gaining unauthorised access to a computer system or network, often to steal, change or delete data. **Denial-of-service (DoS)** attacks flood a server with traffic so genuine users cannot access it.",
                "**Spam** — unsolicited bulk email, which wastes time and bandwidth and is often used to deliver malware or phishing links.",
                "**Data interception/theft**: data sent across networks (especially unencrypted Wi-Fi) can be intercepted ('eavesdropped') while in transit."
              ]
            },
            {
              subTitle: "Other Risks to Data",
              bullets: [
                "**Hardware failure** — a hard disk or server can fail at any time, destroying all files that have no backup.",
                "**Human error** — files deleted by mistake, overwritten, or sent to the wrong person; users choosing weak passwords.",
                "**Physical theft** — laptops, phones and storage media can be stolen, taking confidential data with them.",
                "**Accidental damage** — fire, flood, power surges and spilled drinks can destroy equipment and data."
              ]
            }
          ]
        },
        {
          title: "Security Measures",
          body: "A layered approach protects data: restrict who can reach it (access control), scramble it if intercepted (encryption), defend the network boundary (firewalls, antivirus), and keep copies in case of disaster (backups).",
          groups: [
            {
              subTitle: "Access Control and Authentication",
              bullets: [
                "**Passwords** — secret words or phrases; strong passwords are long, mix letters/numbers/symbols, are changed regularly and never shared. **Advantages**: simple and cheap; **disadvantages**: can be guessed, forgotten or stolen by keyloggers/phishing.",
                "**Biometrics** identify a person from unique body features: **fingerprint**, **iris/retina scan**, **facial recognition**, **voice recognition** and **signature dynamics**. **Advantages**: cannot easily be forgotten, lost or shared; **disadvantages**: expensive hardware, and some methods are affected by illness, dirt or lighting.",
                "**Two-factor authentication (2FA)** combines something you know (password) with something you have (phone code) or are (fingerprint) for much stronger security.",
                "**Access rights**: users are given different permission levels (read-only, edit, admin) so they can only reach the data their job requires; user accounts are removed when staff leave.",
                "**PINs and chip security** protect bank cards; contactless limits and card verification protect payments."
              ]
            },
            {
              subTitle: "Software and Network Defences",
              bullets: [
                "**Antivirus software** scans files and email for known malware, quarantines or deletes it, and must be kept updated with the latest virus definitions.",
                "**Firewalls** monitor traffic between the computer/network and the internet, blocking unauthorised incoming and outgoing connections according to rules.",
                "**Encryption** scrambles data using a key so that it is unreadable if intercepted — used for data in transit (HTTPS, VPNs, Wi-Fi passwords) and data at rest (encrypted files and disks).",
                "**Automatic updates** patch security holes in the operating system and applications as soon as fixes are released.",
                "**Spam filters** and pop-up blockers reduce the chance of users meeting malicious content; **proxy servers** sit between the network and the internet and can filter content and hide internal addresses.",
                "**Education**: users should be trained not to open suspicious attachments, not to click unknown links, and to report phishing attempts."
              ]
            },
            {
              subTitle: "Backups and Secure Disposal",
              bullets: [
                "**Backups** are copies of data kept separately (another disk, tape, or the cloud) so data can be restored after loss. The **3-2-1 rule**: keep at least three copies, on two different media, with one copy off-site.",
                "Backups should be made **regularly** (daily/weekly) and tested by restoring files; a backup is only useful if the restore actually works.",
                "When storage devices are disposed of, data must be **securely deleted** (overwritten, degaussed or physically destroyed) so it cannot be recovered — simply deleting files or formatting is not enough.",
                "Paper documents containing personal data should be **shredded** before disposal."
              ]
            }
          ]
        },
        {
          title: "Legal and Ethical Issues",
          body: "Laws protect personal data, computer systems and creative work. ICT users must understand the main principles of data protection, computer misuse and copyright, and the penalties for breaking them.",
          groups: [
            {
              subTitle: "Data Protection and Computer Misuse Law",
              bullets: [
                "**Data protection legislation** (e.g. the UK Data Protection Act 2018 / GDPR) controls how personal data is collected and used. Its principles include: data must be processed **fairly and lawfully**, collected for **specified purposes**, **adequate and not excessive**, **accurate and up to date**, kept **no longer than necessary**, processed **securely**, and individuals have rights (to see their data, correct it, and have it deleted).",
                "The rules apply to **data controllers** (organisations that decide how data is used) and give **data subjects** (the people the data is about) rights over their information.",
                "**Computer misuse law** (e.g. the Computer Misuse Act 1990) makes it an offence to access a computer system without permission, to access it with intent to commit further offences, and to modify data or spread malware.",
                "**Penalties** for breaking these laws can include large fines and imprisonment."
              ]
            },
            {
              subTitle: "Copyright, Plagiarism and Ethics",
              bullets: [
                "**Copyright law** protects the creator of original work (text, music, images, software). Copying or using copyrighted material without permission is an offence — you must obtain permission or use licensed/creative-commons material and **credit the source**.",
                "**Plagiarism** is presenting someone else's work or ideas as your own; in schools it is punished as cheating, and in professional life it can destroy reputations and lead to legal action.",
                "Downloading or sharing pirated software, music or films breaks copyright law and may also introduce malware.",
                "**Ethical use of ICT** also includes respecting others' privacy online, not cyberbullying, not spreading false information, and considering the environmental impact of technology."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 9,
      title: "Audience",
      intro:
        "Every document or presentation is created for a specific audience and purpose. The audience — their age, knowledge, culture and relationship to the sender — determines the content, language (register), layout, images and format chosen. In the practical paper you must set up documents with the correct audience in mind.",
      subheadings: [
        {
          title: "Identifying Audience and Purpose",
          body: "Before creating any document you must identify who will read or view it (the audience) and why it is being created (the purpose). These two decisions drive every other choice.",
          groups: [
            {
              subTitle: "Audience and Purpose Defined",
              bullets: [
                "The **audience** is the person or group the communication is aimed at: a manager, a customer, students, the general public, an examiner, a young child, experts, etc.",
                "The **purpose** is what the communication must achieve: to inform, instruct, persuade, advertise, entertain, record or request something.",
                "Audience and purpose are usually stated in the task (e.g. 'a newsletter for parents informing them about the school fair').",
                "A document may have more than one audience — for example an annual report is read by shareholders, employees and the press — so it must work for all of them."
              ]
            },
            {
              subTitle: "How the Audience Affects the Document",
              bullets: [
                "**Content**: what information is included, how much detail, and which facts are relevant to THAT audience (a technical report for engineers vs a summary for the public).",
                "**Language and register**: **formal** language for business letters and reports; **informal** for friends; **technical** jargon only when the audience understands it — for children or the general public use simple words.",
                "**Layout and design**: formal documents use plain, consistent layouts; posters and adverts aimed at young people use bright colours, large text and images.",
                "**Images and colour**: pictures of products attract customers; charts help managers understand data; colour is used for impact but kept consistent with a house style.",
                "**Format**: the same message takes different forms for different audiences — a memo to staff, a press release to journalists, a poster to the public, a presentation to a board."
              ]
            }
          ]
        },
        {
          title: "Common Document Types and Their Audiences",
          body: "Certain document types are linked to particular audiences and conventions. Matching the right type to the audience is a standard exam task.",
          groups: [
            {
              subTitle: "Matching Documents to Audiences",
              bullets: [
                "**Memorandum (memo)** — short internal message to staff within an organisation (To/From/Date/Subject).",
                "**Business letter** — formal external communication to customers, suppliers or officials, with letterhead and formal layout.",
                "**Report** — formal findings and recommendations for managers or committees.",
                "**Newsletter / bulletin** — regular updates for members, parents, employees or subscribers.",
                "**Flyer / poster / leaflet** — eye-catching publicity for the general public or specific groups (advertising an event, product or service).",
                "**Press release** — information sent to journalists for publication in the media.",
                "**Presentation slides** — supporting a talk for an audience such as a class, a board meeting or a conference.",
                "**Web page / social media post** — public content designed for browsers, search engines and sharers, usually informal and visual."
              ]
            },
            {
              subTitle: "Considering Audience Needs",
              bullets: [
                "**Age**: large text, bright images and simple words for children; clear, dignified design for the elderly.",
                "**Knowledge level**: avoid unexplained jargon for non-specialists; include technical depth for experts.",
                "**Accessibility**: consider font size, colour contrast, and formats that screen readers can handle for users with visual impairments; provide text alternatives for images.",
                "**Cultural awareness**: colours, symbols and humour can mean different things in different cultures — choose neutral, respectful design.",
                "**Context**: where and how will the audience consume it? A poster seen from a distance needs huge text; a report read at a desk can carry dense detail; a mobile web page must be short and fast-loading."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 10,
      title: "Communication",
      intro:
        "Communication documents are produced to a set of recognised conventions so that readers immediately understand their purpose. This chapter covers the structure and layout of the main formal documents — memoranda, business letters, reports, agendas, minutes, press releases and advertising material — and when each should be used.",
      subheadings: [
        {
          title: "The Memorandum and the Business Letter",
          body: "The memo and the letter are the two most common formal written communications. Their conventions differ: memos are internal and brief; letters are external, formal and follow a fixed layout.",
          groups: [
            {
              subTitle: "Memorandum (Memo)",
              bullets: [
                "A **memo** is a short internal message passed between people within the same organisation; it is not sent through the post.",
                "**Conventions**: a heading with **TO** (recipient), **FROM** (sender), **DATE** and **SUBJECT** (in capital letters, a brief summary of the topic), followed by a short message body.",
                "Memos are direct and to the point — no salutation ('Dear…') or complimentary close ('Yours sincerely…') is used.",
                "Memos can be printed or sent by email; they are used for instructions, announcements, requests and short updates between colleagues."
              ]
            },
            {
              subTitle: "Business Letter",
              bullets: [
                "A **business letter** is formal external communication sent to customers, suppliers, officials or other organisations.",
                "**Conventions**: **letterhead** (company name, address, logo, contact details) at the top; the **date**; the **recipient's address**; a **salutation** ('Dear Sir/Madam' if no name is known, 'Dear Mr Smith' if it is); the **subject line**; the **body**; the **complimentary close** ('Yours faithfully' for Dear Sir/Madam, 'Yours sincerely' for a named recipient); a **signature** with the sender's printed name and job title.",
                "The tone is polite and formal, paragraphs are short and clear, and the layout should be consistent (e.g. fully blocked style with open punctuation).",
                "Letters are used when a permanent, formal record is needed — confirming an order, making a complaint, applying for a job, or official correspondence."
              ]
            }
          ]
        },
        {
          title: "Reports and Meetings Documents",
          body: "Reports present findings and recommendations formally; agendas and minutes keep meetings organised and record what was agreed.",
          groups: [
            {
              subTitle: "Formal Report",
              bullets: [
                "A **report** is a formal document that presents information, analysis and recommendations to a specific reader (usually a manager or committee).",
                "**Structure**: **title**; **terms of reference** (why the report was written and who requested it); **procedure** (how the information was gathered); **findings** (the facts, often in numbered sections with headings); **conclusions** (what the findings mean); **recommendations** (what should be done next); and the writer's **signature and date**.",
                "Reports are written in formal language, third person, and use headings, numbered paragraphs and sometimes tables/charts for clarity.",
                "A **press release** is a short report-style document sent to the media announcing news (a product launch, an award, an event) — written so journalists can publish it almost unchanged, with a headline, date, contact details and 'ends' marker."
              ]
            },
            {
              subTitle: "Agenda and Minutes",
              bullets: [
                "An **agenda** is the list of items to be discussed at a meeting, sent to members in advance so they can prepare. Items are numbered, and it usually includes apologies, minutes of the last meeting, matters arising, new business and the date of the next meeting.",
                "**Minutes** are the official record of a meeting: who attended, what was discussed under each agenda item, decisions taken and actions agreed (with who will do them and by when).",
                "Minutes are formal, written in the past tense and third person, and are distributed to members after the meeting as the agreed record."
              ]
            }
          ]
        },
        {
          title: "Advertising and Publicity Material",
          body: "Advertising documents aim to attract attention, inform and persuade. Their design follows the needs of the target audience more than the strict conventions of letters and reports.",
          groups: [
            {
              subTitle: "Adverts, Flyers and Leaflets",
              bullets: [
                "**Advertisements** (print or digital) use a strong **headline**, persuasive language, images of the product, key selling points, price and clear **call to action** (visit the shop, call the number, scan the QR code).",
                "**Flyers and leaflets** publicise events, services or special offers — bright, eye-catching, with contact details and essential information (date, time, venue) prominently shown.",
                "**Newsletters** combine information, articles and images for a regular audience (parents, staff, club members) and follow a consistent masthead and layout.",
                "**Social media posts and banners** use short persuasive text, hashtags and images sized for the platform.",
                "Whatever the medium, the **target audience** controls the design: bold and playful for young people, calm and trustworthy for professional services, large print and clear contrast for older readers."
              ]
            },
            {
              subTitle: "Choosing the Right Communication Method",
              bullets: [
                "**Email** — quick, cheap, good for sending documents to named people; not suitable for formal legal correspondence or for people without internet.",
                "**Letter** — formal, permanent, appropriate for contracts, complaints and official notices.",
                "**Memo** — internal short messages only.",
                "**Phone call / instant message** — immediate two-way conversation; no permanent record unless noted.",
                "**Video call / meeting** — complex discussions and relationship building.",
                "**Poster / public notice** — reaching a wide public audience in a specific place.",
                "Consider **security and privacy** too: personal data must not be sent by an insecure method, and confidential documents should be encrypted or password-protected."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 11,
      title: "File management",
      intro:
        "File management is the skill of organising, naming, storing and retrieving computer files efficiently. A logical folder structure, sensible file names and knowledge of common file formats make it easy to find work, share files and keep data safe — and they are directly examined in the practical paper.",
      subheadings: [
        {
          title: "Files, Folders and Directory Structures",
          body: "Files are stored inside folders (directories), which can contain subfolders, creating a tree structure. Good organisation means any file can be found quickly by someone who has never seen the computer before.",
          groups: [
            {
              subTitle: "The Folder Tree",
              bullets: [
                "A **file** is a named collection of data (a document, image, spreadsheet, program).",
                "A **folder (directory)** is a container for files; folders can hold **subfolders**, giving a **hierarchical structure** like the branches of a tree, starting from the **root** of the drive.",
                "A file's **path** describes where it lives, e.g. `$Documents/ICT/Coursework/essay.docx$`.",
                "**Examples of good structures**: by subject then topic (`ICT/Chapter 4/notes.docx`), by year then month (`2025/September/receipts/`), or by project and version.",
                "An organised structure makes **backups**, **sharing** and **finding** files much easier; disorganised files get lost, duplicated and accidentally deleted."
              ]
            },
            {
              subTitle: "File Operations",
              bullets: [
                "**Create** new files and folders; **open** and **save** (choosing location, name and format); **save as** to make a copy under a new name/format.",
                "**Rename**, **move** (to another folder), **copy** (leaving the original), and **delete** files; deleted files usually go to a Recycle Bin/Trash until emptied.",
                "**Select multiple** files to move, copy, delete or compress them together.",
                "**Search** for files by name, type or date when you cannot remember where they are; **sort** folder contents by name, date, size or type.",
                "**Properties** show a file's size, type, location and dates; **tags and metadata** (author, keywords) help searching.",
                "**Compress** files into a `.zip` archive to reduce size or combine many files for emailing."
              ]
            }
          ]
        },
        {
          title: "File Naming and File Types",
          body: "File names should be meaningful and follow the rules of the operating system; the file extension tells the computer which program opens it and signals the file format to other users.",
          groups: [
            {
              subTitle: "Naming Files Correctly",
              bullets: [
                "A file name has two parts: the **name** and the **extension** separated by a full stop, e.g. `report.docx`.",
                "Names should be **meaningful** (`biology-revision-notes.docx`, not `doc1.docx`) so the content is obvious without opening the file.",
                "Use letters, numbers, hyphens and underscores; **avoid characters** such as `* ? : \" < > | / \\` which are not allowed or cause problems, and avoid very long names.",
                "Decide on a **consistent convention** (e.g. `subject-topic-version`: `ict-ch4-notes-v2.docx`) and stick to it; date-stamp versions (`report-2025-09-01.docx`) to avoid confusion.",
                "File names may be **case-sensitive** on some systems, and two files in the same folder cannot share the exact same name and extension."
              ]
            },
            {
              subTitle: "Common File Formats",
              bullets: [
                "**Documents**: `.docx` (Word), `.odt`, `.rtf`, `.txt` (plain text), `.pdf` (fixed layout, cannot easily be edited — ideal for sharing final documents).",
                "**Data/spreadsheets**: `.xlsx` (Excel), `.ods`, `.csv` (comma-separated plain-text table, used to transfer data between programs).",
                "**Presentations**: `.pptx` (PowerPoint), `.odp`, `.pdf`.",
                "**Images**: `.jpg/.jpeg` (photographs, small size, lossy), `.png` (lossless, supports transparency), `.gif` (animations, 256 colours), `.bmp` (uncompressed, large), `.svg` (vector, scales without losing quality).",
                "**Audio**: `.mp3` (compressed), `.wav` (uncompressed), `.aac/.m4a`; **video**: `.mp4`, `.avi`, `.mov`, `.mkv`.",
                "**Compressed**: `.zip`, `.rar`, `.7z`; **web**: `.html`, `.css`, `.js`.",
                "Choose formats by purpose: `.pdf` to share a finished document, `.docx` to let others edit it, `.csv` to move data between applications, `.jpg` for web photos, `.png` for logos with transparency."
              ]
            }
          ]
        },
        {
          title: "Managing Files for a Purpose",
          body: "Real-world file management involves keeping files safe (backups), keeping versions under control, and importing/exporting between formats without losing data.",
          groups: [
            {
              subTitle: "Organisation, Backup and Version Control",
              bullets: [
                "Keep **master files** in clearly named project folders and put working copies in subfolders such as `drafts/` and `final/`.",
                "**Back up** important folders regularly to another drive or the cloud so hardware failure or accidental deletion is not a disaster (see Chapter 8).",
                "Use **version numbers or dates** in names (`v1`, `v2`) rather than 'final-final' files; keep the newest version clearly identifiable.",
                "**Clean up**: archive or delete old and unwanted files to save space and reduce confusion.",
                "When **sharing**, consider file size — compress images or zip folders before emailing, and check the recipient can open the format you send."
              ]
            },
            {
              subTitle: "Importing and Exporting",
              bullets: [
                "**Import** brings data in from another source — e.g. a CSV file of customer names into a database or spreadsheet, or photos from a camera/phone.",
                "**Export** saves data in a different format for another program — e.g. exporting a spreadsheet as CSV for a database, or a document as PDF for printing/sharing.",
                "When converting formats, check that **nothing is lost**: fonts, formulas, formatting or special characters can change between formats.",
                "**File size implications**: high-resolution images and videos are huge — resize or compress them for email and web use; uncompressed audio (`.wav`) is far larger than `.mp3`."
              ]
            }
          ]
        }
      ]
    },
  ]
};
