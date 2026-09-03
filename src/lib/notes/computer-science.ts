import type { SubjectNotes } from "./types";

export const COMPUTER_SCIENCE: SubjectNotes = {
  id: "computer-science",
  name: "Computer Science",
  code: "0478",
  color: "bg-sky-600",
  chapters: [
    {
      number: 1,
      title: "Data Representation",
      intro:
        "Computers store and process all information — numbers, text, images, sound, and video — as binary digits (bits). Understanding how data is encoded in binary and how to convert between number bases is fundamental to Computer Science. Efficient compression techniques reduce file sizes while preserving acceptable quality.",
      subheadings: [
        {
          title: "Number Systems: Binary, Decimal and Hexadecimal",
          body: "All data inside a computer is stored in binary (base 2) using only the digits 0 and 1. Hexadecimal (base 16) provides a compact, human-readable representation of binary values and is widely used in programming and memory addressing.",
          groups: [
            {
              subTitle: "Binary and Denary Conversion",
              bullets: [
                "**Binary (base 2)** uses only digits 0 and 1; each digit position represents a power of 2 (e.g. 128, 64, 32, 16, 8, 4, 2, 1 for an 8-bit byte).",
                "**Denary to binary**: repeatedly divide the denary number by 2, recording remainders bottom-to-top — e.g. 45 → 101101₂.",
                "**Binary to denary**: multiply each bit by its positional power of 2 and sum all results — e.g. 10110₂ = 16+4+2 = 22.",
                "**Bit**: a single binary digit (0 or 1); a **nibble** = 4 bits; a **byte** = 8 bits; a **kilobyte (KB)** = 1024 bytes.",
                "**Most Significant Bit (MSB)** is the leftmost (highest value) bit; **Least Significant Bit (LSB)** is the rightmost bit."
              ]
            },
            {
              subTitle: "Hexadecimal (Base 16)",
              bullets: [
                "**Hexadecimal digits** are 0–9 and A–F, where A=10, B=11, C=12, D=13, E=14, F=15.",
                "**Binary to hex**: group bits into nibbles from the right, then convert each nibble to its hex digit — e.g. 10111010₂ → 1011 1010 → B A → BA₁₆.",
                "**Hex to binary**: expand each hex digit to its 4-bit nibble equivalent in sequence.",
                "**Hex to denary**: multiply each digit by its power of 16 and sum — e.g. 2F₁₆ = (2×16) + (15×1) = 47.",
                "Hexadecimal is used to represent **memory addresses**, **colour codes (RGB)**, **error codes**, and **MAC addresses** because it is far more compact than long binary strings."
              ]
            }
          ]
        },
        {
          title: "Binary Arithmetic and Two's Complement",
          body: "Binary addition follows the same carry rules as denary addition but in base 2. Negative numbers are represented using two's complement, allowing a single set of addition circuits to handle both positive and negative arithmetic.",
          groups: [
            {
              subTitle: "Binary Addition and Overflow",
              bullets: [
                "**Binary addition rules**: 0+0=0; 0+1=1; 1+0=1; 1+1=0 carry 1; 1+1+1=1 carry 1.",
                "**Overflow** occurs when the result of an arithmetic operation produces more bits than the register can store — e.g. adding two 8-bit numbers whose sum exceeds 255 (11111111₂).",
                "Overflow causes the result to wrap around incorrectly; **carry-out of the MSB** is the overflow indicator in unsigned arithmetic.",
                "In signed arithmetic, overflow occurs when two positives sum to a negative or two negatives sum to a positive.",
                "**Worked example**: 01101101 + 01010110 = 11000011 (no overflow since result still fits in 8 bits with MSB=1 indicating a large positive value)."
              ]
            },
            {
              subTitle: "Two's Complement for Negative Numbers",
              bullets: [
                "**Two's complement** is the standard method computers use to represent signed (positive and negative) integers in binary.",
                "To negate a number: **invert all bits** (one's complement) then **add 1** — e.g. +5 = 00000101 → invert → 11111010 → +1 → 11111011 = −5.",
                "The **MSB acts as a sign bit**: 0 = positive, 1 = negative. An 8-bit two's complement range is −128 to +127.",
                "**Converting negative two's complement to denary**: the MSB has a value of −128 (for 8-bit); sum that with remaining positive bit values.",
                "Two's complement allows **subtraction using addition**: A − B is computed as A + (two's complement of B), simplifying CPU hardware."
              ]
            }
          ]
        },
        {
          title: "Character, Image and Sound Representation",
          body: "Text, images, and sound are all encoded as binary numbers. Understanding their data structures, quality factors, and file size calculations is essential for IGCSE Computer Science.",
          groups: [
            {
              subTitle: "Character Sets: ASCII and Unicode",
              bullets: [
                "**ASCII (American Standard Code for Information Interchange)** uses 7 bits to represent 128 characters including uppercase/lowercase letters, digits 0–9, punctuation, and control characters.",
                "**Extended ASCII** uses 8 bits (1 byte), supporting 256 characters including accented Western European letters.",
                "**Unicode** was developed to support all world languages and scripts; **UTF-8** encodes characters using 1–4 bytes, **UTF-16** uses 2 or 4 bytes, and **UTF-32** always uses 4 bytes.",
                "Unicode is backward-compatible with ASCII for the first 128 code points (U+0000 to U+007F).",
                "**File size for text** = number of characters × bits per character; e.g. 1000 ASCII characters = 1000 × 8 bits = 8000 bits = 1000 bytes = ~1 KB."
              ]
            },
            {
              subTitle: "Image Representation",
              bullets: [
                "A **bitmap image** stores colour data for every individual **pixel** (picture element); **resolution** = number of pixels per unit area (e.g. pixels per inch, PPI).",
                "**Colour depth (bit depth)** = number of bits used to represent one pixel's colour — e.g. 1-bit (monochrome), 8-bit (256 colours), 24-bit (16.7 million colours / True Colour).",
                "**File size formula**: Width (px) × Height (px) × Colour depth (bits) = total bits; divide by 8 for bytes.",
                "Higher resolution and greater colour depth produce better quality images but significantly increase file size.",
                "**Metadata** stored in an image file includes image width, height, colour depth, file format, and creation date; it does not contain actual pixel data."
              ]
            },
            {
              subTitle: "Sound Representation and Compression",
              bullets: [
                "**Analogue sound** is a continuous wave; **sampling** measures the amplitude of the sound wave at regular intervals and stores each measurement as a binary value.",
                "**Sample rate** (measured in Hz or kHz) = number of samples taken per second; higher sample rate → more accurate reproduction — CD audio uses 44,100 Hz.",
                "**Bit depth** (bits per sample) determines the precision of each amplitude measurement; 16-bit gives 65,536 possible amplitude levels.",
                "**Audio file size** = sample rate (Hz) × bit depth (bits) × duration (seconds) × number of channels.",
                "**Lossy compression** (e.g. MP3, JPEG) permanently removes data considered imperceptible to human senses, reducing file size significantly but irreversibly.",
                "**Lossless compression** (e.g. PNG, FLAC, ZIP) uses algorithms like run-length encoding to reduce file size while allowing perfect reconstruction of the original data.",
                "**Video** is a sequence of image frames combined with audio; video files are typically very large and require both spatial compression (within frames) and temporal compression (between frames)."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 2,
      title: "Data Transmission",
      intro:
        "Data transmission covers how binary data is sent between devices locally and across the internet. Key concepts include the physical methods of transmission, protocols that govern communication, techniques for detecting errors, and the hardware that forms networks.",
      subheadings: [
        {
          title: "Methods of Data Transmission",
          body: `Data can be transmitted bit-by-bit or in groups, and communication can be one-way or bidirectional. Understanding these distinctions is important for evaluating network performance and reliability.

\`\`\`diagram
┌────────────────────────────────────────────────────────┐
│               SERIAL vs PARALLEL TRANSMISSION          │
│                                                        │
│  SERIAL (Single wire):                                 │
│  Sender  ──[ 1 ]──[ 0 ]──[ 1 ]──[ 1 ]──► Receiver      │
│  (Reliable, zero skew, used in USB & Internet)         │
│                                                        │
│  PARALLEL (Multiple synchronized wires):               │
│  Sender  ─── Wire 1: [ 1 ] ────────────► Receiver      │
│          ─── Wire 2: [ 0 ] ────────────►               │
│          ─── Wire 3: [ 1 ] ────────────►               │
│  (Fast over short distances, risk of data skew)        │
└────────────────────────────────────────────────────────┘
\`\`\``,
          groups: [
            {
              subTitle: "Serial vs Parallel Transmission",
              bullets: [
                "**Serial transmission** sends bits one at a time along a single wire/channel; slower but more reliable over long distances due to no cross-talk interference.",
                "**Parallel transmission** sends multiple bits simultaneously along multiple wires; faster over short distances but suffers from **skew** (bits arriving out of sync) over longer distances.",
                "Modern long-distance data communication (USB, internet) uses serial because reliability outweighs the theoretical speed advantage of parallel.",
                "**Baud rate** is the number of signal changes per second; **bit rate** = baud rate × bits per signal.",
                "**Bandwidth** is the maximum data transfer rate of a channel, typically measured in Mbps or Gbps; higher bandwidth supports more data or more users simultaneously."
              ]
            },
            {
              subTitle: "Simplex, Half-Duplex and Full-Duplex",
              bullets: [
                "**Simplex**: Data flows in one direction only — e.g. a TV broadcast transmitter sending to a receiver.",
                "**Half-duplex**: Data can flow in both directions, but only one direction at a time — e.g. a walkie-talkie where you must say 'over' before the other party speaks.",
                "**Full-duplex**: Data flows in both directions simultaneously — e.g. a telephone call or a modern Ethernet network connection.",
                "Full-duplex effectively doubles the usable bandwidth compared to half-duplex by allowing simultaneous send and receive.",
                "**Unicast** sends data to one recipient; **multicast** to a group; **broadcast** to all devices on a network segment."
              ]
            }
          ]
        },
        {
          title: "Packet Switching and Protocols",
          body: "The internet uses packet switching to efficiently route data across interconnected networks. Standardised protocols ensure that devices from different manufacturers can communicate reliably.",
          groups: [
            {
              subTitle: "Packet Switching",
              bullets: [
                "**Packet switching** divides data into small **packets** before transmission; each packet travels independently through the network and may take different routes.",
                "Each packet contains a **header** (source IP, destination IP, packet number, total packets), the **payload** (actual data), and sometimes a **trailer** (error-checking data).",
                "Packets are reassembled in the correct order at the destination using their sequence numbers.",
                "**Advantages**: network resources are shared efficiently, failed nodes can be routed around, and large files don't monopolise the entire network path.",
                "**Routers** read packet headers to determine the best onward path using routing tables and algorithms."
              ]
            },
            {
              subTitle: "Key Protocols: TCP/IP, HTTP, FTP, SMTP",
              bullets: [
                "**TCP/IP (Transmission Control Protocol / Internet Protocol)** is the foundational protocol suite of the internet; TCP ensures reliable, ordered delivery with error checking; IP handles addressing and routing.",
                "**HTTP (HyperText Transfer Protocol)** governs the transfer of web pages between a web server and browser; operates over TCP port 80.",
                "**HTTPS** is HTTP secured with **TLS/SSL encryption**, protecting data from eavesdropping; uses port 443 and is essential for login pages and online payments.",
                "**FTP (File Transfer Protocol)** is used for uploading and downloading files between a client and server; uses ports 20 and 21.",
                "**SMTP (Simple Mail Transfer Protocol)** handles the sending of email messages between mail servers; **IMAP** and **POP3** are used to retrieve emails from a server to a client."
              ]
            }
          ]
        },
        {
          title: "Error Detection, Network Hardware and Topologies",
          body: "Transmission errors are common in real networks due to electrical interference. Several methods exist to detect (and sometimes correct) errors. The physical and logical layout of a network — its topology — also significantly affects performance and resilience.",
          groups: [
            {
              subTitle: "Error Detection Methods",
              bullets: [
                "**Parity bit**: an extra bit is added to each byte to make the total number of 1-bits either even (even parity) or odd (odd parity); the receiver checks parity after each byte.",
                "**Checksum**: the sending device calculates a numerical value from all the data bits and sends it alongside the data; the receiver recalculates and compares — a mismatch indicates an error.",
                "**Echo checking**: the receiver sends received data back to the sender for comparison; any discrepancy indicates a transmission error.",
                "Parity checking detects single-bit errors only; **checksums** can detect multiple-bit errors but cannot identify which bits are wrong.",
                "**ARQ (Automatic Repeat reQuest)** is an error-correction protocol where the receiver requests retransmission of any corrupted packets detected via checksums."
              ]
            },
            {
              subTitle: "Network Hardware",
              bullets: [
                "**NIC (Network Interface Card)**: hardware component installed in a device that gives it a unique **MAC address** and the ability to connect to a network.",
                "**Hub**: broadcasts all received data to every connected device; creates a single collision domain; largely obsolete.",
                "**Switch**: learns MAC addresses and forwards data only to the specific port connected to the destination device; more efficient than a hub.",
                "**Router**: connects different networks (e.g. home network to the internet); reads IP addresses to route packets between networks; assigns local IP addresses via DHCP.",
                "**WAP (Wireless Access Point)**: provides Wi-Fi connectivity; devices connect wirelessly using the IEEE 802.11 standard."
              ]
            },
            {
              subTitle: "Network Topologies",
              bullets: [
                "**Bus topology**: all devices connect to a single shared backbone cable; simple and cheap but a break in the cable disables the entire network; data collisions are common.",
                "**Star topology**: all devices connect to a central switch or hub; a single device or cable failure only affects that device; the central switch is a single point of failure for the whole network.",
                "**Ring topology**: devices connect in a closed loop; data travels in one direction; a single break in the ring can disrupt the entire network unless a dual-ring is used.",
                "**Mesh topology**: every device connects to every other device (full mesh) or to multiple devices (partial mesh); highly resilient with multiple redundant paths but expensive to cable.",
                "**Wi-Fi (wireless)** uses radio waves; convenient but susceptible to interference, weaker security without encryption, and signal degrades with distance and physical obstacles."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 3,
      title: "Hardware",
      intro:
        "Hardware refers to the physical components of a computer system. The Central Processing Unit (CPU) is the brain of the computer, executing instructions from programs. Understanding the CPU's internal architecture, how it fetches and executes instructions, and the different types of storage and I/O devices is core to IGCSE Computer Science.",
      subheadings: [
        {
          title: "CPU Architecture and the Fetch-Execute Cycle",
          body: "The CPU contains specialised components that work together to carry out program instructions in a continuous cycle. The Von Neumann architecture stores both program instructions and data in main memory.",
          groups: [
            {
              subTitle: "Core CPU Components",
              bullets: [
                "**ALU (Arithmetic Logic Unit)**: performs all arithmetic operations (+, −, ×, ÷) and logical operations (AND, OR, NOT, comparisons) on binary data.",
                "**CU (Control Unit)**: directs and coordinates all CPU operations; fetches instructions from memory, decodes them, and issues control signals to other components.",
                "**Registers**: extremely fast, tiny memory locations inside the CPU — key ones include the **PC (Program Counter)** holding the address of the next instruction, **MAR (Memory Address Register)**, **MDR (Memory Data Register)**, and **ACC (Accumulator)** holding calculation results.",
                "**Cache memory**: small, ultra-fast SRAM memory inside or very close to the CPU that stores frequently-used instructions and data to reduce access time to slower RAM.",
                "**Buses**: shared communication pathways connecting CPU, memory and I/O — the **Address Bus** (carries memory addresses, unidirectional), **Data Bus** (carries data, bidirectional), and **Control Bus** (carries timing and control signals)."
              ]
            },
            {
              subTitle: "The Fetch-Execute Cycle",
              bullets: [
                "**Fetch**: the address in the PC is copied to the MAR; the CU sends a read signal via the Control Bus; the instruction at that memory address is retrieved via the Data Bus into the MDR; the PC is incremented to point to the next instruction.",
                "**Decode**: the CU decodes the instruction held in the MDR (or CIR, Current Instruction Register), identifying the operation code (opcode) and operand.",
                "**Execute**: the CU sends signals to the appropriate component (ALU, memory, I/O) to carry out the decoded instruction.",
                "This cycle repeats billions of times per second for every instruction in a program.",
                "**Interrupts** can pause the cycle to handle high-priority events (keyboard input, timer signals); the CPU saves its current state, handles the interrupt via an **ISR (Interrupt Service Routine)**, then resumes."
              ]
            }
          ]
        },
        {
          title: "CPU Performance and Primary Storage",
          body: "Several hardware factors determine how quickly a CPU can process instructions. Primary storage (main memory) is directly accessible by the CPU and stores currently running programs and data.",
          groups: [
            {
              subTitle: "Factors Affecting CPU Performance",
              bullets: [
                "**Clock speed** (measured in GHz): determines how many fetch-execute cycles occur per second; a higher clock speed generally means faster processing but generates more heat.",
                "**Number of cores**: a dual-core or quad-core CPU can run multiple instruction streams simultaneously (**multi-threading**), improving performance on parallelisable tasks.",
                "**Cache size**: a larger cache stores more frequently-used data close to the CPU, reducing the number of slow RAM accesses and thereby reducing latency.",
                "**Word size**: the number of bits the CPU can process in a single operation (e.g. 32-bit or 64-bit); wider word sizes allow more data to be processed per cycle.",
                "**Bus width**: a wider data bus transfers more bits per cycle between CPU and RAM, increasing throughput."
              ]
            },
            {
              subTitle: "RAM and ROM",
              bullets: [
                "**RAM (Random Access Memory)**: volatile (loses data when powered off); stores the OS, currently running applications, and working data; directly read and written by the CPU.",
                "**ROM (Read-Only Memory)**: non-volatile (retains data without power); typically stores the **BIOS/UEFI** firmware used to boot the computer; cannot normally be modified.",
                "**DRAM (Dynamic RAM)**: stores each bit as a charge in a capacitor that must be refreshed thousands of times per second; used for main system RAM; slower but cheaper and denser.",
                "**SRAM (Static RAM)**: stores bits using flip-flop circuits; no refresh needed; much faster than DRAM but more expensive and physically larger per bit; used for CPU cache.",
                "**Virtual memory**: when RAM is full, the OS uses a portion of the hard drive as extra virtual RAM, though this is significantly slower than real RAM."
              ]
            }
          ]
        },
        {
          title: "Secondary Storage, I/O Devices and Embedded Systems",
          body: "Secondary storage provides permanent, non-volatile data storage for the long term. Input and output devices allow humans to interact with computers. Embedded systems are specialised computers built into everyday devices.",
          groups: [
            {
              subTitle: "Secondary Storage Types",
              bullets: [
                "**HDD (Hard Disk Drive)**: uses spinning magnetic platters and read/write heads; large capacity at low cost but slower due to mechanical parts and susceptible to physical shock.",
                "**SSD (Solid State Drive)**: uses flash memory (NAND) with no moving parts; much faster read/write speeds, more durable, silent, and lighter than HDD but more expensive per GB.",
                "**Optical storage** (CD, DVD, Blu-ray): uses a laser to read/write data encoded as pits and lands on a reflective disc; portable but low capacity and slow write speeds.",
                "**Magnetic tape**: sequential access medium used for large-scale data archiving and backup; very high capacity at low cost but extremely slow for random access.",
                "**Cloud storage**: data stored on remote servers accessed via the internet; accessible from anywhere and automatically backed up, but depends on internet connectivity and raises security/privacy concerns."
              ]
            },
            {
              subTitle: "Input and Output Devices",
              bullets: [
                "**Input devices** send data into the CPU: keyboard, mouse, touchscreen, microphone, scanner, barcode reader, camera, RFID reader, sensors (temperature, light, pressure).",
                "**Output devices** present processed results: monitor (LCD, OLED), printer (inkjet, laser), speakers, actuators (motors, solenoids in control systems).",
                "**Touchscreens** function as both input and output; they use capacitive or resistive technology to detect touch.",
                "**Actuators** convert electrical signals into physical movement and are used in embedded control systems (e.g. robot arms, automated doors).",
                "Choice of I/O device depends on the environment, required accuracy, speed, and whether interaction needs to be human or automated."
              ]
            },
            {
              subTitle: "Embedded Systems",
              bullets: [
                "An **embedded system** is a dedicated computer with hardware and software designed to perform a specific, fixed function within a larger device.",
                "Examples include: washing machine controller, car ABS braking system, smart thermostat, pacemaker, microwave oven, and traffic light controller.",
                "Embedded systems typically use a **microcontroller** (combined CPU, RAM, ROM, and I/O on one chip) rather than a general-purpose CPU.",
                "They run **firmware** stored in ROM — a permanent, specialised program that rarely or never changes.",
                "Key characteristics: real-time operation, low power consumption, small physical footprint, and highly reliable since they run a single dedicated task."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 4,
      title: "Software",
      intro:
        "Software encompasses all programs and operating data that tell a computer what to do. This chapter covers the role of operating systems, types of software, and the languages and tools programmers use to write and translate programs.",
      subheadings: [
        {
          title: "Operating System Functions",
          body: "The operating system (OS) is system software that manages hardware resources and provides a platform for application programs to run. Without an OS, users and applications cannot interact with hardware.",
          groups: [
            {
              subTitle: "Core OS Functions",
              bullets: [
                "**Memory management**: allocates RAM to running processes, ensures processes don't access each other's memory, and manages virtual memory (swap space) when RAM is full.",
                "**Process management**: creates, schedules, and terminates processes; uses scheduling algorithms (round-robin, priority-based) to share CPU time among multiple processes.",
                "**File management**: organises files and directories on storage devices; manages file creation, deletion, renaming, access permissions, and disk space allocation.",
                "**Device management**: communicates with hardware peripherals via **device drivers** (software translators between the OS and specific hardware); manages I/O queues.",
                "**Security management**: enforces user authentication (login), manages access permissions, and provides a firewall between the OS and external threats."
              ]
            },
            {
              subTitle: "Types of Operating System",
              bullets: [
                "**Multi-tasking OS**: allows multiple processes to run seemingly simultaneously by rapidly switching CPU time between them; used in personal computers (Windows, macOS, Linux).",
                "**Multi-user OS**: supports multiple simultaneous users (often via a network), each with their own processes and file space; used in servers and mainframes.",
                "**Real-time OS (RTOS)**: guarantees response to inputs within strict time constraints; used in safety-critical embedded systems like aircraft autopilot, medical monitors, and industrial robots.",
                "**Distributed OS**: manages a network of computers as if they were a single system, distributing processing load across multiple machines.",
                "**Utility software**: specialised programs that maintain, optimise, or protect the computer system — e.g. **antivirus**, **disk defragmenter**, **file compression**, **backup software**, **disk formatter**."
              ]
            }
          ]
        },
        {
          title: "Programming Languages and Translation",
          body: "Programmers write code in high-level or low-level languages. Translator programs convert source code into machine code (binary) that the CPU can execute. The choice of language depends on the task, performance requirements, and portability needs.",
          groups: [
            {
              subTitle: "High-Level vs Low-Level Languages",
              bullets: [
                "**High-level languages** (Python, Java, C++, Visual Basic) use English-like syntax and are abstracted from the hardware; one statement may produce many machine code instructions.",
                "Advantages of high-level: easier to read and write, portable across different hardware/OS, faster development, and easier to debug.",
                "**Low-level languages** — **machine code** (pure binary) and **assembly language** (uses mnemonics like MOV, ADD, JMP) — are hardware-specific and very close to CPU operations.",
                "Low-level languages give programmers direct control over hardware registers and memory addresses; used for device drivers, firmware, and performance-critical code.",
                "**Assembly language** uses a one-to-one mapping with machine code instructions; an **assembler** converts it to machine code."
              ]
            },
            {
              subTitle: "Compilers, Interpreters and Assemblers",
              bullets: [
                "**Compiler**: translates an entire high-level source program into machine code **in one pass** before execution; the resulting executable runs without the compiler present; fast execution but errors only reported after full compilation.",
                "**Interpreter**: translates and executes source code **line by line** at runtime; no separate executable file is created; easier for debugging (errors reported immediately) but slower execution.",
                "**Assembler**: translates assembly language mnemonics into machine code; produces a direct, one-to-one translation.",
                "Compiled programs run faster because translation overhead is done once; interpreted programs are more portable and easier to test interactively.",
                "**Just-in-Time (JIT) compilation** (used by Java, Python's PyPy) compiles code at runtime the first time it runs, combining aspects of both interpretation and compilation."
              ]
            }
          ]
        },
        {
          title: "Integrated Development Environments (IDEs)",
          body: "An IDE is a software application providing a comprehensive environment for writing, testing, and debugging programs, combining multiple developer tools into a single interface.",
          groups: [
            {
              bullets: [
                "**Code editor**: provides syntax highlighting (colour-codes keywords, strings, comments) and **auto-completion** (IntelliSense) to reduce typing errors and speed up development.",
                "**Debugger**: allows step-by-step execution of code, setting **breakpoints** (pausing execution at a specific line) and inspecting the values of variables at runtime to find logical errors.",
                "**Run/Compile button**: executes or compiles the program directly from the IDE without needing separate command-line tools.",
                "**Error highlighting**: the IDE underlines syntax errors in real time as the programmer types, before the code is even run.",
                "**Version control integration**: links the IDE to systems like Git, enabling code changes to be tracked, compared, and rolled back; essential for team software development."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 5,
      title: "Security and Ethics",
      intro:
        "As computers hold increasing amounts of personal and organisational data, cybersecurity and ethics are critical concerns. This chapter covers the types of threats facing computer systems, the methods used to protect them, and the broader social, legal, and ethical implications of computing technology.",
      subheadings: [
        {
          title: "Cybersecurity Threats and Malware",
          body: "Malicious software (malware) is designed to disrupt, damage, or gain unauthorised access to computer systems. Social engineering exploits human psychology rather than technical vulnerabilities.",
          groups: [
            {
              subTitle: "Types of Malware",
              bullets: [
                "**Virus**: a self-replicating program that attaches itself to legitimate files and spreads to other files or computers when the infected file is executed; requires user action to propagate.",
                "**Worm**: self-replicates and spreads automatically across networks without needing to attach to a host file or require user intervention; can cause massive network congestion.",
                "**Trojan horse**: disguises itself as legitimate, useful software but secretly performs malicious actions (e.g. opening a backdoor, stealing passwords) when installed.",
                "**Ransomware**: encrypts the victim's files and demands a ransom payment (often in cryptocurrency) in exchange for the decryption key; highly destructive and financially damaging.",
                "**Spyware**: secretly monitors user activity, logging keystrokes (**keylogger**), capturing screenshots, or recording browsing history and sending this data to a third party."
              ]
            },
            {
              subTitle: "Social Engineering Attacks",
              bullets: [
                "**Phishing**: fraudulent emails or messages that appear to come from trusted sources (banks, tech companies) to trick users into revealing passwords, credit card numbers, or other sensitive information.",
                "**Pharming**: redirects users from a legitimate website to a fake clone without their knowledge, typically by corrupting DNS records or modifying the hosts file on a victim's computer.",
                "**Spear phishing**: a targeted phishing attack aimed at a specific individual or organisation, using personalised details to appear more convincing.",
                "**Shoulder surfing**: physically observing someone entering a PIN, password, or sensitive data in a public place.",
                "**Baiting**: leaving a malware-infected USB drive in a public place, hoping a curious person will plug it into their computer."
              ]
            }
          ]
        },
        {
          title: "Network Security Methods and Data Protection",
          body: "Organisations employ multiple layers of security to protect networks and data. Legal frameworks and data protection principles establish the rights of individuals regarding their personal data.",
          groups: [
            {
              subTitle: "Security Technologies",
              bullets: [
                "**Firewall**: hardware or software that monitors and filters incoming and outgoing network traffic based on predefined security rules; blocks unauthorised connections while allowing legitimate traffic.",
                "**Encryption**: transforms readable plaintext data into unreadable ciphertext using an encryption key; only authorised parties with the correct key can decrypt it. **Symmetric** encryption uses the same key for encrypt/decrypt; **asymmetric** (public/private key) is used for HTTPS.",
                "**Authentication**: verifying the identity of a user — methods include **passwords**, **biometrics** (fingerprint, facial recognition, retina scan), **smart cards**, and **security tokens**.",
                "**Two-Factor Authentication (2FA)**: requires two separate verification methods (e.g. password + SMS code), making unauthorised access significantly harder even if a password is stolen.",
                "**VPN (Virtual Private Network)**: creates an encrypted tunnel for data transmitted over the internet, protecting sensitive communications on public Wi-Fi networks."
              ]
            },
            {
              subTitle: "Privacy, Copyright and Intellectual Property",
              bullets: [
                "**Data protection principles** require that personal data is collected fairly, stored securely, kept accurate and up-to-date, used only for its stated purpose, and not retained longer than necessary.",
                "**Privacy** is the right of individuals to control information about themselves; organisations must obtain consent before collecting personal data and must protect it from breaches.",
                "**Intellectual property (IP)** refers to creations of the mind (software, music, text, images); it is legally protected by **copyright**, **patents**, and **trademarks**.",
                "**Copyright** grants the creator exclusive rights to copy, distribute, and modify their work; software and digital content are protected by copyright by default from creation.",
                "**Open source software** releases the source code publicly under licences (e.g. GPL, MIT) that allow anyone to use, modify, and distribute it; **proprietary software** keeps source code private and requires a licence to use."
              ]
            }
          ]
        },
        {
          title: "Ethical Issues and the Impact of Computing",
          body: "The widespread adoption of computers and AI raises significant ethical questions about employment, privacy, fairness, and societal impact that go beyond technical considerations.",
          groups: [
            {
              subTitle: "Impact on Society and Employment",
              bullets: [
                "Automation and AI are replacing repetitive manual and cognitive jobs (manufacturing, data entry, customer service) while creating new roles in software development, data science, and AI engineering.",
                "**Digital divide**: unequal access to technology (by wealth, geography, or age) creates social and economic inequality between those who can and cannot use digital resources.",
                "Remote working, enabled by internet connectivity and collaboration tools, changes work-life balance, reduces commuting, but can blur the boundary between work and personal life.",
                "Over-reliance on technology creates vulnerabilities: system failures, cyberattacks, or loss of internet connectivity can paralyse businesses and essential services.",
                "Increased screen time and always-on connectivity raise concerns about mental health, social isolation, and the impact of addictive algorithm-driven social media platforms."
              ]
            },
            {
              subTitle: "Ethical Issues in AI and Computing",
              bullets: [
                "**Algorithmic bias**: AI systems trained on biased historical data can produce discriminatory outcomes in hiring, loan approvals, facial recognition, and criminal sentencing.",
                "**Surveillance and privacy**: widespread CCTV, facial recognition, and data collection by governments and corporations raise concerns about mass surveillance and erosion of civil liberties.",
                "**Autonomous weapons**: the development of AI-controlled military systems raises profound ethical questions about accountability, the laws of war, and the risk of unintended escalation.",
                "**Environmental impact**: large-scale data centres and cryptocurrency mining consume enormous amounts of electrical energy and water for cooling, contributing to carbon emissions.",
                "**Transparency and accountability**: AI decision-making systems (black-box models) are often opaque; when AI makes consequential decisions (medical diagnosis, credit scoring), explainability and human oversight are ethically essential."
              ]
            }
          ]
        }
      ]
    },
    {
      number: 6,
      title: "Problem Solving and Programming",
      intro:
        "Computational thinking is the foundation of programming: breaking problems down, identifying patterns, abstracting away unnecessary detail, and designing algorithms. This chapter covers the core tools and techniques used to design, write, test, and debug programs.",
      subheadings: [
        {
          title: "Computational Thinking: Decomposition and Abstraction",
          body: "Before writing a single line of code, a good programmer analyses and understands the problem. Computational thinking provides a structured approach to problem-solving that applies across all programming languages.",
          groups: [
            {
              subTitle: "Decomposition and Pattern Recognition",
              bullets: [
                "**Decomposition**: breaking a complex problem into smaller, more manageable sub-problems, each of which can be solved independently — e.g. building a game decomposes into: display, player input, game logic, scoring, and audio.",
                "**Pattern recognition**: identifying similarities, repetitions, or regularities in problems or data that can be exploited to create a more general solution.",
                "**Abstraction**: removing irrelevant detail and focusing only on the information essential to solve the problem — e.g. a map is an abstraction of a real landscape.",
                "**Algorithm design**: creating a step-by-step solution to a problem before coding; good algorithm design is independent of programming language.",
                "These four pillars of computational thinking (**decomposition, pattern recognition, abstraction, algorithm design**) are fundamental skills assessed throughout the IGCSE exam."
              ]
            },
            {
              subTitle: "Flowcharts and Pseudocode",
              bullets: [
                "**Flowcharts** use standardised symbols: **oval** (start/end/terminator), **rectangle** (process/instruction), **diamond** (decision — yes/no branch), **parallelogram** (input/output), **arrow** (flow of control).",
                "**Pseudocode** is structured English-like notation describing an algorithm without the strict syntax of a real programming language; Cambridge uses specific pseudocode conventions in IGCSE exams.",
                "Pseudocode keywords: `INPUT`, `OUTPUT`, `IF...THEN...ELSE...ENDIF`, `WHILE...DO...ENDWHILE`, `FOR...TO...NEXT`, `REPEAT...UNTIL`.",
                "Both flowcharts and pseudocode allow algorithms to be communicated clearly before implementation and help identify logical errors early.",
                "An algorithm must be **unambiguous** (each step has exactly one meaning), **finite** (terminates after a definite number of steps), and **effective** (each step is a feasible operation)."
              ]
            }
          ]
        },
        {
          title: "Programming Constructs and Data Structures",
          body: "All programs are built from three fundamental control structures. Data structures organise related data efficiently, enabling powerful algorithms to process collections of values.",
          groups: [
            {
              subTitle: "Sequence, Selection and Iteration",
              bullets: [
                "**Sequence**: instructions executed in the order they are written, one after another — the default flow of a program.",
                "**Selection** (conditional branching): `IF...THEN...ELSE...ENDIF` executes different code blocks depending on whether a condition is true or false; `CASE...OF` selects from multiple options.",
                "**Count-controlled iteration** (`FOR` loop): repeats a block of code a fixed, predetermined number of times — ideal when the number of repetitions is known in advance.",
                "**Pre-condition iteration** (`WHILE` loop): checks the condition **before** each iteration; the loop body may never execute if the condition is false from the start.",
                "**Post-condition iteration** (`REPEAT...UNTIL`): checks the condition **after** each iteration; the loop body always executes **at least once**."
              ]
            },
            {
              subTitle: "Arrays and Common Data Structures",
              bullets: [
                "An **array** is a data structure that stores multiple values of the **same data type** under a single identifier, accessed via an **index** (e.g. `scores[0]`, `scores[1]`).",
                "**1D arrays** store a list of values; **2D arrays** store values in a grid (rows and columns), useful for representing matrices or game boards.",
                "Arrays allow **iteration** over all stored values using a FOR loop with the index variable — essential for implementing searching and sorting algorithms.",
                "**Stacks** (LIFO — Last In First Out) and **queues** (FIFO — First In First Out) are abstract data structures used in operating system scheduling and algorithm design.",
                "**Records** (or structs) group related data of different types under one identifier — e.g. a student record might store name (STRING), age (INTEGER), and score (REAL)."
              ]
            }
          ]
        },
        {
          title: "Algorithms: Searching, Sorting and Testing",
          body: "Classic algorithms for searching and sorting are fundamental to computer science. Testing and debugging are essential stages of the software development process to verify correctness.",
          groups: [
            {
              subTitle: "Searching Algorithms",
              bullets: [
                "**Linear search**: checks every element in a list from the beginning until the target is found or the list is exhausted; works on **unsorted** and sorted lists; O(n) time complexity.",
                "**Binary search**: only works on a **sorted** list; compares the target to the **middle element** — if equal, found; if target is smaller, search the lower half; if larger, search the upper half; repeat until found or not present; O(log n) — far faster than linear search for large datasets.",
                "Binary search requires the list to be sorted first, which adds an initial overhead; for very small lists, linear search may be faster in practice.",
                "For a list of n items, binary search requires at most **log₂(n)** comparisons — e.g. a list of 1024 items needs at most 10 comparisons.",
                "**Worked binary search example**: search for 47 in [12, 23, 35, 47, 58, 72, 84] — mid=47 found on the first comparison."
              ]
            },
            {
              subTitle: "Sorting Algorithms",
              bullets: [
                "**Bubble sort**: repeatedly compares adjacent pairs and swaps them if out of order; the largest value 'bubbles' to the end each pass; simple but O(n²) — inefficient for large datasets.",
                "**Insertion sort**: builds a sorted portion of the list one element at a time by inserting each new element into its correct position; efficient for small or nearly-sorted lists; O(n²) worst case.",
                "**Merge sort**: a **divide-and-conquer** algorithm; recursively splits the list in half, sorts each half, then merges the sorted halves; O(n log n) — far more efficient than bubble or insertion sort for large datasets.",
                "Bubble and insertion sort are **in-place** (require no extra memory); merge sort requires additional memory for the temporary merged arrays.",
                "**Trace tables** are used to manually track the values of variables and array elements through each step of an algorithm to verify its correctness or find logical errors."
              ]
            },
            {
              subTitle: "Functions, Testing and Validation",
              bullets: [
                "**Functions/procedures** (sub-programs) are named, reusable blocks of code that perform a specific task; **procedures** do not return a value; **functions** return a value to the caller.",
                "Parameters pass data into functions; **local variables** exist only within the function; **global variables** are accessible throughout the entire program.",
                "**Program testing**: **white-box testing** checks internal code logic (tests every path); **black-box testing** tests inputs and outputs without knowledge of internal code.",
                "**Test data types**: **normal** (typical valid inputs), **boundary** (values at the edge of valid range, e.g. min and max), and **erroneous/invalid** (data that should be rejected, e.g. letters in a numeric field).",
                "**Validation** checks that data is reasonable and meets defined rules (presence check, range check, length check, type check, format check) before processing; **verification** checks that data has been entered correctly (double-entry, visual check)."
              ]
            }
          ]
        }
      ]
    }
  ]
};
