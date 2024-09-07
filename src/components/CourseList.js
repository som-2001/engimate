import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const courses = {
  CSE: [
    {
      title: "MERN Stack",
      image: "/images/MERN.jpg",
      price: 5000,
      video: "video.mp4",
      description:
        "Full stack development with MongoDB, Express, React, and Node.js.",
        card_description:
        "MERN Full Stack Web development React projects & Web Application with React JS, NodeJS, Express JS, Mongodb: Mern Stack For IT & Computer science Engineers",
      learn: [
        "MERN Full Stack Web Application with React & Web Development",
        "Learn components, props, states and component life cycle methods in React JS.",
        "Create reusable React Components for Web development and Mern stack project",
        "The best testing framework for NodeJS",
        "Learn how to build powerful and fully functional social media website using MERN.",
        "Frameworks provide an opinionated approach to building an entire application.",
        "Learn how to create Single Page Web Application with React JS",
        "User Inputs, Forms and Events in React with Redux, hooks and context",
        "Learn the key concepts of the NodeJS",
        "Learn how to build backend API using node and express",
        "Learn about Redux (Best state management tool)"
      ],
      course_description: [
        {
          "title": "Course Description",
          "content": "Embark on a comprehensive journey into the world of Full Stack Development with our MERN (MongoDB, Express.js, React, Node.js) stack course. This hands-on program is designed to equip you with the skills and knowledge needed to create dynamic and scalable web applications. MERN is a free and open-source JavaScript software stack for building dynamic websites and web applications. Because all components of the MERN stack support programs that are written in JavaScript, MERN applications can be written in one language for both server-side and client-side execution environments."
        },
        {
          "title": "Course Objective",
          "content": "The main objective of this course is to provide comprehensive knowledge on MongoDB, Express.js, React, and Node.js. This includes gaining a solid understanding of HTML, CSS, and JavaScript to build a strong foundation for web development, backend development proficiency, frontend development mastery, and integration and full stack connectivity. By the end of this course, participants will emerge as proficient Full Stack Developers, equipped with the skills and knowledge necessary to tackle the challenges of modern web development using the MERN stack."
        },
        {
          "title": "Roles in Industry",
          "content": [
            "Full Stack Developer",
            "Frontend Developer",
            "Backend Developer",
            "JavaScript Developer",
            "MERN Stack Developer",
            "UI/UX Developer",
            "DevOps Engineer",
            "Technical Lead",
            "Entrepreneur/Startup Developer",
            "Freelance Developer"
          ]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Introduction to Hyper Text Markup Language (HTML5)",
            "Introduction to Cascading Style Sheets (CSS), Bootstrap, JavaScript, jQuery, JSON",
            "MongoDB",
            "Express JS",
            "React JS",
            "Node JS"
          ]
        }
      ]
      
    },
    {
      title: "UI/UX",
      image: "/images/ui.jpg",
      description: "Designing intuitive user interfaces and experiences.",
    },
    {
      title: "ReactJS",
      image: "/images/reactjs.jpg",
      description: "Build powerful user interfaces with ReactJS.",
    },
  ],
  EE: [
    {
      title: "AutoCAD Electrical",
      price: 5000,
      video: "video.mp4",
      image: "/images/autocad_electrical.jpg",
      description: "Electrical design with AutoCAD software.",
      card_description:
        "Become proficient in AutoCAD Electrical quickly and showcase your skills For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "AutoCAD basics and navigation skills.",
        "Comfort with AutoCAD's interface and environment.",
        "Creating Electrical CAD projects effectively.",
        "Drawing accurate electrical schematic diagrams.",
        "Efficient use of component and wire tools.",
        "Designing PLC layout modules precisely.",
        "Connecting devices using Point-to-Point wiring.",
        "Crafting organized and safe panel layouts.",
        "Generating reports and using Ladder Tools.",
        "Customizing symbols and circuits with builders.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "AutoCAD Electrical is a specialist control panel of Autodesk.",
            "Purpose-built to create and modify electrical control systems.",
            "The comprehensive symbols libraries and tools help boost productivity by automating control engineering tasks.",
            "With AutoCAD Electrical, you can efficiently create, modify, and document electrical control systems with an industry-specific toolset for electrical design.",
            "AutoCAD Electrical features include Electrical documentation, Electrical Schematic design, and Electrical control design."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "The AutoCAD Electrical course will focus on the overview of AutoCAD Electrical with emphasis on naming conventions;",
            "The use of symbols and their libraries, generation, and insertion of PLC layout modules, and organization of PLC database files.",
            "The course will also teach students about generating a bill of materials reporting, creating PLC I/O drawings from spreadsheets, wire numbering, and component tagging."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Designing electrical symbols",
            "Draw ordering lists",
            "Place relay coils and contractors",
            "Drawing required schematic diagrams"
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "Controls Design using standards-based drafting and PLC I/O tools",
            "Automation of report generation and organization of files and projects",
            "Schematic symbol libraries",
            "Real-time error checking",
            "Automated wire numbering",
            "Schematic design tools",
            "Compelling visuals and presentations of Panel Layout module",
            "Project management to allow the designers to collaborate and work with team members and other personnel"
          ]
        }
      ]
    },
    {
      title: "PLC",
      price: 5000,
      video: "video.mp4",
      image: "/images/plc.jpg",
      description: "Learn Programmable Logic Controllers.",
      card_description:
        "PLC Programming of Siemens using PLC Controller.For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "Connecting and configuring input/output devices.",
        "Understanding the architecture and operation of PLCs.",
        "Working with various field devices and sensors.",
        "Creating PLC programs using ladder logic.",
        "Establishing communication between PLC and PC.",
        "To Learn Ladder Logic Programming.",
        "Implementing timers, counters, jumps, and multi-interlocking.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "PLC or Programmable Logic Controller is an industrial digital computer and its course makes you ready for the mechanical automation process in manufacturing units and construction buildings.",
            "You can use your expertise for dynamic development, subsequent control, counters and timers, programming ease, and control.",
            "PLC is generally used in industries which helps to eliminate the hard wiring compared with standard relay control circuits, improving productivity.",
            "PLC is a robust industrial computer which is essentially a designed task of reading field tools and controlling actuators."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "To understand the generic architecture and constituent components of a Programmable Logic Controller.",
            "To develop a software program using modern engineering tools and techniques for PLC and SCADA.",
            "To apply knowledge gained about PLCs and SCADA systems to real-life industrial applications."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Automotive industries",
            "Automatic storage and retrieval systems",
            "Power distribution plants",
            "Nuclear energy plants",
            "Automatic parking systems",
            "Robotics & automation industries",
            "Bottle filling plants"
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "Pad Designer",
            "Package Symbol & Package symbol wizard",
            "Netlist creation",
            "Component and board placement",
            "Mechanical symbol placement",
            "Manual and Automatic routing",
            "Constraint Manager and Xsection",
            "Blind, Buried and through-hole VIA",
            "Copper shaping",
            "Artwork/Gerber file creation",
            "Plot Generation",
            "PCB Fabrication Process"
          ]
        }
      ]
    },
    {
      title: "SCADA",
      price: 5000,
      video: "video.mp4",
      image: "/images/scada.jpg",
      description: "Supervisory Control and Data Acquisition systems.",
      card_description:
        "PLC Programming of Siemens using PLC Controller.For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "Learning the architecture and components of SCADA systems.",
        "Creating SCADA windows for monitoring and control.",
        "Applying knowledge to design and implement an industrial SCADA project.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "SCADA or Supervisory Control and Data Acquisition are used for high-level process supervisory management.",
            "It is the control system that manages computers, networked data communications, and graphical user interfaces.",
            "It benefits real-time detection of faults in machinery and decreases the number of defects in the end result.",
            "The course on SCADA will help you to understand Hardware, Software, and Services.",
            "SCADA is essentially a piece of software installed on a PC/Computer which acts as a Human Machine Interface."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "To understand the generic architecture and constituent components of a Programmable Logic Controller.",
            "To develop a software program using modern engineering tools and techniques for PLC and SCADA.",
            "To apply knowledge gained about PLCs and SCADA systems to real-life industrial applications."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Automotive industries",
            "Automatic storage and retrieval systems",
            "Power distribution plants",
            "Nuclear energy plants",
            "Automatic parking systems",
            "Robotics & automation industries",
            "Bottle filling plants"
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "Pad Designer",
            "Package Symbol & Package symbol wizard",
            "Netlist creation",
            "Component and board placement",
            "Mechanical symbol placement",
            "Manual and Automatic routing",
            "Constraint Manager and Xsection",
            "Blind, Buried and through-hole VIA",
            "Copper shaping",
            "Artwork/Gerber file creation",
            "Plot Generation",
            "PCB Fabrication Process"
          ]
        }
      ]
    },
    {
      title: "MATLAB Electrical",
      image: "/images/matlab.jpg",
      price: 5000,
      video: "video.mp4",
      description: "MATLAB for electrical system simulations.",
      card_description:
        "Learn basics of MATLAB Simulink to simulate different electric components & Control system in MATLAB Simulink for electrical engineering For Electrical Engineers",
      learn: [
        "Creating 2D and 3D plots in MATLAB",
        "MATLAB fundamentals for electrical engineering",
        "Knowledge of command window & workspace window",
        "MATLAB built-in function proficiency.",
        "Simulink modeling and simulation",
        "Editing Lookup Tables and setting breakpoints",
        "Stateflow modeling for control systems",
        "Managing events within state machines",
        "Truth tables and State transition table usage",
        "Building Simscape models",
      ],
      course_description: [
        {
          title: "Course Description",
          content:
            "The course focuses on how to implement complex decision flows and finite-state machines using Stateflow and provides a general understanding of how to accelerate the design process for closed-loop control systems using MATLAB. Also it offers the good understanding of modelling and analyzing electrical systems.",
        },
        {
          title: "Course Objectives",
          content:
            "This course gives guidance on key features of widely used toolboxes in simulink, help transform concepts to a complete model, verify and evaluate the system behaviour in different user environments. It allows the attendees to explore the more advanced features of MATLAB in a unified manner and help learners 'future-proof' themselves and remain relevant for the rapidly evolving technology from industry perspective.",
        },
        {
          title: "Roles in Industry",
          content:
            "Matlab is a widely used tool in electrical engineering. It can be used to enhance and accelerate some processes. such as magnetic field measurements,model based development, Auto code generation through model based development and m scripts. Tool creation for testing and development through m scripts.",
        },
        {
          title: "Course Highlights",
          content:
            "Simulink modelling,Model Based Designing,Masks and Subsystems,Component and board placement,Lookup table editor and breakpoints,Stateflow modelling,Hierarchical state machines,Blind, Parallel state machines,Events in state machines,Functions in state machines,Truth tables and State transition tables,Control systems stability analysis,Controller implementation – P, PI, PID,Frequency response estimation",
        },
      ],
    },
    {
      title: "Microcontroller",
      price: 5000,
      video: "video.mp4",
      image: "/images/microcontroller.jpg",
      description: "Programming and application of microcontrollers.",
      card_description:
        "Next-generation Cross Platform Embedded Systems IDE that will save you time and effort to build next project fast For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "Understand embedded systems and 8051 microcontroller basics.",
        "Familiarize with KEIL IDE and C programming.",
        "Learn about timers, interrupts, and serial communication.",
        "Master external hardware interfacing for LEDs and displays.",
        "Gain proficiency in LCD interfacing and keypad input.",
        "Acquire skills in motor interfacing with various types.",
        "Explore advanced LED and UART interfacing.",
        "Discover Bluetooth and Analog to Digital Conversion.",
        "Introduce PIC16F877A microcontroller fundamentals.",
        "Utilize MPLAB IDE and High Tech-C Compiler.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "The microcontroller plays a revolutionary role in the embedded industry, after the invention of Intel 8051.",
            "The steady and progressive research in this field gave the industry more efficient, high-performance, and low-power consumption microcontrollers.",
            "The AVR, PIC, and ARM are prime examples of this.",
            "The new age microcontrollers are getting smarter and richer by including the latest communication protocols like USB, I2C, SPI, Ethernet, CAN, etc.",
            "At the end of the course, students will be able to work as System design engineers and embedded engineers with good knowledge of Microcontroller based design."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "The course is designed to provide in-depth knowledge of the Advanced microcontrollers in the field of embedded systems.",
            "The course gives equal emphasis to hardware and software, enabling us to face challenges in the design and development of state-of-the-art embedded systems.",
            "The training program enables the aspirants to work on the Architecture, Pin diagram, Input/Output interfacing, Exposure to embedded C programming and also to set up & customize a microcontroller development environment."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Various Sectors in which you will get Microcontroller Jobs are Medical Electronics, Aerospace, Automobiles, Defence, Toys, Consumer Electronics, Food industry, Telecommunication, Industrial machines, Space, Agriculture And Construction."
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "Interfacing PIC18F4550 with LCD, Keypad, ADC, UART communication",
            "ARM 7TDMI-S Architecture & ARM Operating modes",
            "Introduction to LPC21xx and GPIO registers",
            "Timers and Phase Locked loop (PLL) configuration, Vectored Interrupt Controller (VIC) and serial Communication",
            "Interfacing LPC21xx with LCD, Keypad, ADC, UART",
            "Interfacing Wireless protocols - GSM, GPS, Bluetooth, RFID, Zigbee with LPC21xx",
            "Hands-on development boards",
            "PWM generation in PIC18F4550"
          ]
        }
      ]
    },
    {
      title: "PCB Designing using ORCAD",
      price: 5000,
      video: "video.mp4",
      image: "/images/pcb_design.jpg",
      description: "Printed Circuit Board design using ORCAD.",
      card_description:
        "Go from schematic to printed circuit board (PCB) using Cadence OrCAD Capture, PSPICE and PCB Editor v17.2 For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "Schematic design using Orcad and Capture.",
        "Simulate circuits with PSpice software.",
        "Component selection and placement techniques.",
        "PCB layout and routing fundamentals.",
        "Signal integrity and EMI considerations.",
        "Hands-on experience with Orcad tools.",
        "Troubleshooting and debugging electronic circuits.",
        "Designing for manufacturability and assembly.",
        "Circuit optimization for performance and cost.",
        "Real-world application of electrical engineering skills.",
      ],
      course_description: [
        {
          title: "Course Description",
          content:
            "It incudes the OrCAD Capture, OrCAD PSpice and OrCAD PCB Editor. Virtually every electronic product is constructed with one or more printed-circuit boards (PCBs). The PCBs hold the ICs and other components and implement the interconnections between them.The ideal PCB design starts with the discovery that a PCB is needed and continues through the final production boards. OrCAD Capture is the industry standard solution for designing and developing PCBs because of its intuitive schematic editing, project management, extensive compatibility, and cost-effectiveness.PSpice is a SPICE analog circuit and digital logic simulation program. PSpice processes circuits and executes simulation. PSpice creates an output file to store the simulation results. PSpice supports the following types of analyses: DC Analysis - for circuits with time-invariant sources.OrCAD PCB Editor contains a full-featured PCB editor based on Allegro technology. Its extensive feature set addresses a wide range of today's design challenges and manufacturability concerns such as intelligent placement and routing, constraint management, creating dynamic shapes, and design reuse.",
        },
        {
          title: "Course Objectives",
          content:
            "To do PCB design and its simulation. PCB (Printed Circuit Board) designing is an integral part of each electronics product and this program is designed to make students capable to design their own projects PCB up to industrial grade.",
        },
        {
          title: "Roles in Industry",
          content:
            "A PCB designer is primarily in charge of designing and developing Printed Circuit Boards (PCBs).Design and develop Printed Circuit Boards Prepare documents for PCB assembly, schematics, and fabrications using CAD software Design layouts to develop high-speed and reliable circuitsDevelop digital or analog designs Work on the routing layout Analyze and resolve any design-related issue Provide support to PCB engineering and manufacturing teams Provide revisions based on the specifications of customers and engineers",
        },
        {
          title: "Course Highlights",
          content:
            "Schematic Modification for PCB Design,Design Rule Check,Pad Designer,Package Symbol & Package symbol wizard,Netlist creation,Component and board placement,Mechanical symbol placement,Manual and Automatic routing, Constraint Manager and X section,Blind, Buried, and through-hole VIA,Artwork/Gerber file creation,Plot Generation,PCB Fabrication Process",
        },
      ],
    },
    {
      title: "MATLAB Electronics",
      price: 5000,
      video: "video.mp4",
      image: "/images/matlab.jpg",
      description: "MATLAB for electronics system simulations.",
      card_description:
        "Become an expert in MATLAB Programming and Scientific Computing. Advance your career in Computer vision/ Digital image processing- Script & simulink etc For Electronics & Instrumentation Engineers",
      learn: [
        "Introduction to MATLAB's working environment and functions.",
        "Array operations, arithmetic, and statistical functions.",
        "Creating 2D and 3D plots, graphs, and charts.",
        "Exploring Simulink libraries and blocks.",
        "Understanding Stateflow modeling and control flow.",
        "Array creation, concatenation, sorting, and reshaping.",
        "Decision making, loops, and user-defined functions.",
        "Introduction to Simulink and its interface.",
        "Working with GUI components and building applications.",
        "State actions, temporal logic, and truth tables.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "The course focuses on how to implement complex, finite-state machines using Stateflow and creating a model-based design using Simulink.",
            "The course gives an understanding of the operation performed on different images and signals using image processing and signal processing toolbox.",
            "The course also provides information on how to create, train, visualize and simulate neural networks as well as design and simulate fuzzy logic systems.",
            "Real-time applications play a very important role.",
            "This course gives exposure to the students to work on different hardware like Arduino, Raspberry Pi, Android sensors, UART, and IoT-based applications."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "This course gives guidance on the key features of widely used toolboxes in Simulink, helps to transform concepts into a complete model and verifies and evaluates the system behavior in different user environments.",
            "It also allows the attendees to explore the more advanced features of MATLAB like Simulink modeling, Internet of Things (IoT), HDL coder, and Various hardware interfacing with MATLAB in a unified manner.",
            "Helps learners 'future-proof' themselves and remain relevant for the rapidly evolving technology from an industrial perspective."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Signal processing",
            "MATLAB Developer",
            "Power system modeling and simulation"
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "Computer Vision / Digital Image Processing – Script and Simulink",
            "Algorithms such as object detection/recognition/segmentation/tracking/classification",
            "Digital Signal Processing – Script and Simulink",
            "Developing applications using GUI environment",
            "Fuzzy Logic Toolbox",
            "Neural Networks Toolbox",
            "Interfacing Arduino with MATLAB - Script and Simulink"
          ]
        }
      ]
    },
    {
      title: "Advanced Microcontroller",
      price: 5000,
      video: "video.mp4",
      image: "/images/advanced_microcontroller.jpg",
      description: "Advanced programming of microcontrollers.",
      card_description:
        "Learn Microcontroller Programming (8-bit AVR) to use Peripherals like GPIO, Timer, Interrupt, PWM, ADC, Serial UART etc.For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "Learn serial communication protocols: I2C, SPI, CAN.",
        "Explore AVR ATmega16 hardware and memories.",
        "Master timers, interrupts, and ATmega16 communication.",
        "Interface ATmega16 with LCD, Motors, Keypad, ADC.",
        "Interface PIC18F4550 with LCD, Keypad, ADC, UART.",
        "Study ARM 7TDMI-S architecture and modes.",
        "Introduction to LPC21xx and GPIO registers.",
        "Learn about wireless protocols and development boards.",
        "Gain expertise in PIC18F4550 timers and interrupts.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "The microcontroller plays a revolutionary role in the embedded industry, after the invention of Intel 8051.",
            "The steady and progressive research in this field gave the industry more efficient, high-performance, and low-power consumption microcontrollers.",
            "The AVR, PIC, and ARM are prime examples of this.",
            "The new age microcontrollers are getting smarter and richer by including the latest communication protocols like USB, I2C, SPI, Ethernet, CAN, etc.",
            "At the end of the course, students will be able to work as System design engineers and embedded engineers with good knowledge of Microcontroller based design."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "The course is designed to provide in-depth knowledge of the Advanced microcontrollers in the field of embedded systems.",
            "The course gives equal emphasis to hardware and software, enabling us to face challenges in the design and development of state-of-the-art embedded systems.",
            "The training program enables the aspirants to work on the Architecture, Pin diagram, Input/Output interfacing, Exposure to embedded C programming and also to set up & customize a microcontroller development environment."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Various Sectors in which you will get Microcontroller Jobs are:",
            "Medical Electronics",
            "Aerospace",
            "Automobiles",
            "Defence",
            "Toys",
            "Consumer Electronics",
            "Food industry",
            "Telecommunication",
            "Industrial machines",
            "Space",
            "Agriculture",
            "Construction"
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "Interfacing PIC18F4550 with LCD, Keypad, ADC, UART communication",
            "ARM 7TDMI-S Architecture & ARM Operating modes",
            "Introduction to LPC21xx and GPIO registers",
            "Timers and Phase Locked Loop (PLL) configuration",
            "Vectored Interrupt Controller (VIC) and serial Communication",
            "Interfacing LPC21xx with LCD, Keypad, ADC, UART",
            "Interfacing Wireless protocols - GSM, GPS, Bluetooth, RFID, Zigbee with LPC21xx",
            "Hands-on development boards",
            "PWM generation in PIC18F4550"
          ]
        }
      ]
    },
    {
      title: "Industrial Automation Concepts",
      price: 5000,
      video: "video.mp4",
      image: "/images/industrial_automation.png",
      description: "Concepts in industrial automation and control.",
      card_description:
        "Discover the foundations for a Career in Industrial Automation.For Electrical / Electronics",
      learn: [
        "Understand the concept of Industrial Automation.",
        "Exploring the Diverse Landscape of Automation",
        "understand the programming languages for Automation",
        "To know the tools of Industrial Automation & their applications",
        "Learn about Industrial Automation components",
        "Understand the Industrial Automation Technologies",
        "Understand the communication protocols of modern Automation",
        "Learn about system Integration",
        "Learn about Interlocking",
        
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "The 'Industrial Automation Concepts' course provides a comprehensive overview of automation systems used in industrial settings.",
            "Starting with the fundamentals, it explores the definition, history, and application of automation, highlighting its critical role in modern industries.",
            "The course delves into the architectural elements, including sensors, controllers, and actuators, and examines both input and output field devices such as switches, relays, and motors.",
            "It covers safety mechanisms and the evolution of control systems, with a focus on key technologies like PLCs, SCADA, HMI, VFDs, and DCS.",
            "Students will learn about communication protocols, data integration, and the strategic implementation of automation technologies.",
            "Practical case studies, system integration strategies, and safety compliance are discussed, along with insights into the future of automation, emerging technologies, and career pathways in automation engineering.",
            "The course also includes practical applications using AutoCAD Electrical for designing automation projects."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "The course on Industrial Automation Concepts aims to provide a comprehensive understanding of the fundamentals and advanced aspects of automation in industrial settings.",
            "It begins with an introduction to automation, exploring its role, history, and types, followed by a detailed study of the architectural elements like sensors, controllers, and actuators.",
            "The course covers various input and output field devices, safety mechanisms, and the evolution of control systems, including key technologies like PLCs, SCADA, HMI, VFDs, and DCS.",
            "It delves into practical aspects like PLC memory mapping, communication protocols, and the integration of technologies like IoT in industrial automation.",
            "Additionally, the course addresses system integration strategies, safety standards, and the future of automation, with a focus on emerging technologies, sustainable practices, and career pathways in the field."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Industrial automation is used to enhance operational efficiency, improve product quality, and reduce costs by minimizing human intervention.",
            "It allows for precise control and monitoring of processes, leading to increased production rates and consistency.",
            "Automation also enhances safety by reducing the risk of human error and ensures compliance with stringent quality and safety standards.",
            "Additionally, it helps in optimizing resource utilization and reducing downtime through predictive maintenance and real-time data analysis."
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "Basics and need for automation",
            "Automation system components overview",
            "Key sensors and actuators",
            "PLC programming and applications",
            "SCADA system fundamentals",
            "Introduction to HMIs",
            "VFD configuration and uses",
            "DCS basics and differences",
            "Communication protocols and IoT",
            "Integration and safety practices"
          ]
        }
      ]
    },
    {
      title: "Automotive Embedded Systems",
      price: 5000,
      video: "video.mp4",
      image: "/images/automotive_embedded.jpg",
      description: "Embedded systems for automotive applications.",
      card_description:
        "With hands on coding using C Programming and assembly on ARM Cortex M Processor based Microcontroller For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "Fundamentals of automotive embedded systems architecture.",
        "Embedded software development using C/C++.",
        "Sensor integration for vehicle data acquisition.",
        "Safety standards and regulations in automotive.",
        "Vehicle control algorithms and integration.",
        "Real-time operating systems (RTOS) for automotive applications.",
        "Automotive communication protocols like CAN and LIN.",
        "Diagnostics and fault-tolerant system design.",
        "Automotive electronics hardware components.",
        "Embedded systems testing and validation techniques.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "Automotive embedded systems are crucial in modern vehicles to enhance efficiency, safety (e.g., brake systems, airbag systems, electronic stability programs), and driver assistance (e.g., navigation, night vision, blind-spot detection). They also help in complying with legal necessities, such as reducing pollutant emissions through intelligent engine control.",
            "As modern cars become increasingly complex, the demands on diagnostics, maintenance, and repair grow. There is a noticeable shortage of qualified automotive technicians with advanced skills. The need for skilled technicians will continue to rise as vehicles become more sophisticated.",
            "This course offers practical training in automotive electronics with a focus on embedded systems in vehicles, addressing the growing need for expertise in this field."
          ]
        },
        {
          title: "Course Objectives",
          content: [
            "The automotive industry is one of the largest economies globally, producing around 70 million cars annually and contributing significantly to government revenues worldwide.",
            "The primary objective of this course is to provide a comprehensive understanding of the technology necessary for designing and implementing embedded systems in automotive applications using appropriate hardware and software tools.",
            "As the industry increasingly relies on electronics, electrical, electronics, and computer engineers are in high demand. These engineers work on electronics, controls, safety systems, infotainment systems, and vehicle-to-vehicle communication.",
            "The course covers a range of topics relevant to the industry, preparing participants for various roles in the automotive sector."
          ]
        },
        {
          title: "Roles in Industry",
          content: [
            "Technological advancements in electronics and telecommunications have led to the development of advanced automotive systems. Automotive embedded systems are typically microcontroller-based with real-time computational capabilities.",
            "Applications include infotainment and telematics, Advanced Driver Assistance Systems (ADAS), airbags, head-up displays, electronic brake systems, power steering, and active suspension.",
            "Some of the job roles include: Embedded Test Engineer (System Testing), Embedded Software System Designer (Automotive Powertrain), Embedded Hardware Engineer (R&D)."
          ]
        },
        {
          title: "Course Highlights",
          content: [
            "GPIO Programming with LPC2148 Microcontroller",
            "External hardware interfacing with LPC2148",
            "Serial communication protocol with LPC2148",
            "Universal Asynchronous Receiver and Transmitter (UART)",
            "Serial Peripheral Interface (SPI)",
            "Inter-Integrated Circuit (I2C)",
            "Interfacing wireless protocols with LPC2148 – GSM, GPS, RFID, Zigbee, Bluetooth",
            "Introduction to Automotive Embedded System",
            "Controller Area Network (CAN)",
            "Local Interconnect Network (LIN)",
            "FlexRay",
            "Introduction to Diagnostic",
            "Unified Diagnostic Service (UDS) protocol"
          ]
        }
      ],
    },
  ],
  Mechanical: [
    {
      title: "AutoCAD Mechanical",
      image: "/images/autocad_mechanical.jpg",
      price: 5000,
      video: "video.mp4",
      description: "Mechanical design with AutoCAD software.",
      card_description:
        "AutoCAD 2021 Mechanical Engineering course to learn design, drawing and drafting in 2D and 3D For Mechanical, Automobile Engineers",
      learn: [
        "Effective layer management.",
        "Drafting basic geometric shapes in AutoCAD & Modifying drawings in AutoCAD.",
        "Proficiency in dimensioning and tolerancing.",
        "Familiarity with object linking and embedding (OLE) concepts.",
        "Ability to plot and publish AutoCAD drawings.",
        "Competency in using blocks and attributes.",
        "Mastery of AutoCAD Mechanical.",
        "Introduction to engineering drawings and AutoCAD.",
        "Proficiency in 3D modeling..",
        "Creation of isometric drawings.",
      ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["Learn how to produce 2D drawings using AutoCAD software. In this course, you will be introduced to AutoCAD’s layout and user interface, commands, system variables, initial settings, and basic techniques for creating, editing, organizing, and printing drawings."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Understand AutoCAD’s workspace and user interface",
            "Execute commands in AutoCAD to open, view, navigate, edit, print, and save a drawing",
            "Create drawing, editing, and viewing tools to create an object",
            "Organize drawing objects on layers",
            "Use reusable symbols (Blocks)",
            "Create perspective drawings",
            "Prepare a layout for printing or plotting",
            "Add and edit text, hatching, and dimensions"
          ]
        },
        {
          "title": "Roles in Industry",
          "content": ["It is used to design and develop civil engineering drawings.",
             "It gathers information to prepare and present reports on the projects. It also manages and directs staff at the project sites."]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Drawing theory",
            "Constructing and editing 2D geometry",
            "Drawing objects, correcting errors, object verification, measurement, and controlling graphic display",
            "Using grids, text, layers, and object symbology"
          ]
        }
      ]
      
    },
    {
      title: "Creo Parametric",
      image: "/images/creo.jpg",
      description: "3D CAD software for product design.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "This comprehensive course elevates your knowledge and skills on the process of product development by utilizing PTC CREO PARAMETRIC as a virtual CAD tool. With a help of an interesting project, the instructor guides you the process of converting a conceptual product into a functional assembly. During this process, you learn and understand how engineering companies are tackling the product development journey. After understanding the information and gaining the engineering skills from this course, you can apply them confidently on other products. Develop them and show them as your Portfolio.For Mechnaical, Automobile Engineers",
      learn:  [
        "Introduction to CREO and Mouse Control",
        "Understanding Views and File Commands",
        "Sketcher: Visualization and Sketch Tools",
        "Profile and Constraints in Sketching",
        "Part Design: Features, Datums, and Operations",
        "Reference Elements and Sweeping Techniques",
        "Boolean Operations and Drafting",
        "Creating Patterns and Applying Materials",
        "Assembly: Theory, Constraints, and Exploded Views",
        "Surface Design, Generative Sheet Metal, and Drafting"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["With Creo training, Design Engine will empower manufacturers, engineers, and designers to gain a different perspective by presenting new ways to think about and explore design iterations."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Develop a product design virtually using Creo",
            "Utilize Creo’s capabilities for sketching, modeling, validation of design, and visualization of product design"
          ]
        },
        {
          "title": "Roles in Industry",
          "content": ["Creo is a versatile 3D modeling application suitable for a range of industry needs, from advanced design to manufacturing and virtual prototyping.", 
            "It offers basic features for efficient product design, faster time to market, quality assurance, minimal errors, maximum efficiency, and reduced rework."]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Creo’s 2D Solutions: Creo’s Sketch, Layout, and Schematics products for quick sketching, complex system diagramming, and detailed engineering concept drawings",
            "Creo’s 3D Solutions: Creo’s Parametric, Direct, and Options Modular for creating 3D models by both advanced and casual CAD users",
            "Assembly: Creo’s assembly environment for managing large assemblies with ease",
            "Visualization: Creo’s visualization module for visualizing product data in various media formats"
          ]
        }
      ]
      
    },
    {
      title: "CATIA",
      image: "/images/catia.jpg",
      description: "3D product design and engineering software.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "A comprehensive program on Automotive Design using CATIA-V5 through a variety of practical examples.For Mechanical and Automobile Engineers",
      learn: [
        "Exploring view manipulation and standard toolbar",
        "Getting started with sketching in CATIA",
        "Introduction to CATIA and its design principles",
        "Understanding the CATIA interface components",
        "Part design techniques and features",
        "Assembly design, constraints, and structure",
        "Sheet metal design and manufacturing preparation",
        "Wireframe and surface design concepts",
        "Drafting, drawing creation, and annotations",
        "Real-time rendering and project hints"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["CATIA stands for Computer Aided Three-dimensional Interactive Application. It is one of the leading 3D software solutions used across multiple industries, including aerospace, automotive, and consumer products. Developed by Dassault Systèmes, CATIA is a multi-platform 3D software suite that encompasses CAD, CAM, and CAE capabilities."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Learn the implementation of solid modeling using CATIA",
            "Gain hands-on experience with real-world projects",
            "Cover topics including part design, assembly, drafting, wireframe & surface design, and Generative Sheetmetal Design workbenches"
          ]
        },
        {
          "title": "Roles in Industry",
          "content": ["CATIA is widely used in the automotive and aerospace industries for product and tool designing.", "Its comprehensive process coverage and inherent associativity among its applications help shorten the time to market.", "CATIA's integrated analysis, simulation, synthesis, and optimization applications support product engineering validation, ensuring product quality and market acceptance."]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Assembly Modeling",
            "Mechanical Designing",
            "Shape Designing",
            "Analysis and Simulation",
            "AEC (Architecture, Engineering, and Construction) PLANT",
            "Machining",
            "Digital Mockup",
            "Machining Simulation",
            "Ergonomics Design and Analysis"
          ]
        }
      ]
      
    },
    {
      title: "SolidWorks",
      image: "/images/solidworks.jpg",
      description: "3D CAD design and engineering solutions.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "Dassault Systèmes SOLIDWORKS Corp. develops and markets 3D CAD design software, analysis software, and product data management software.For Mechanical and Automobile Engineers",
      learn: [
        "Sketcher basics in SolidWorks",
        "3D sketching techniques & Part modeling using SolidWorks",
        "Creating reference geometries for accurate designs",
        "Utilizing advanced modeling tools for complex shapes",
        "Configuration management for design variations",
        "Proficiency in surface modeling",
        "Bottom-up assembly design techniques & Top-down assembly design and management",
        "Bill of Materials (BOM) and balloon tools usage",
        "Sheet metal design principles and applications & Weldment design for structural projects"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["SOLIDWORKS teaches you how to use SOLIDWORKS mechanical design automation software to build parametric models of parts and assemblies, and how to create drawings of those parts and assemblies. The course covers Part Modeling and Assembly Modeling to complete your knowledge of solid modeling tools and techniques. For designs requiring complex or organic shapes, Advanced Surfacing Modeling introduces surface modeling techniques."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Equip students and professionals with the essentials needed to become a certified SOLIDWORKS associate",
            "Help individuals use the software confidently to design and draft innovative projects"
          ]
        },
        {
          "title": "Roles in Industry",
          "content": ["SOLIDWORKS is used internationally by millions of companies.", "It provides designers the ability to import data, store it securely while maintaining flexibility and accessibility.", "Designers and engineers consider SOLIDWORKS as an innovative solution to meet project challenges."]
        },
        {
          "title": "Course Highlights",
          "content": [
            "CAD Modeling and Animation – Develop 3D animated models of product designs",
            "Assembly Design – Design parts and assemble them",
            "Sheet Metal Design – Design parts to be fabricated from sheet metal",
            "Costing – Evaluate the design against manufacturing costs",
            "Product Data Management – Manage design data securely and efficiently",
            "Weldment Design – Model welded structures with standard structural members",
            "Tolerance Analysis – Analyze the tolerance level of individual parts and their collective operation",
            "CAD Library – Enhance productivity using a CAD library",
            "Interference Check – Ensure all parts fit and operate according to requirements"
          ]
        }
      ]
      
    },
    {
      title: "NX CAD",
      image: "/images/nxcad.jpg",
      description: "Advanced CAD/CAM/CAE software from Siemens.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "Siemens NX software is a flexible and powerful integrated solution that helps you deliver better products faster and more efficiently.For Mechanical and Automobile Engineers",
      learn: [
        "Introduction to Unigraphics NX and its interface",
        "File management and template usage",
        "Creating and editing sketches",
        "Applying geometric and dimensional constraints",
        "Feature modeling concepts and basics",
        "Creating extrude features with various options",
        "Revolve feature creation",
        "Datum features and their types",
        "Sweep features and blend techniques",
        "Assembly modeling and constraints"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["The NX CAD Designers course provides professional instruction in product model design, detailing, assembly modeling, and the basics of the master model concept. Unigraphics NX, owned by Siemens PLM Software, offers integrated and advanced CAD, CAE, and CAM solutions."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Introduce assembly modeling in a real-life context, including both student-modeled and pre-created part models",
            "Reinforce understanding of the flexibility of solid modeling and assembly tools in product development collaboration"
          ]
        },
        {
          "title": "Roles in Industry",
          "content": [
            "Seamless integration with other CAD systems",
            "Ability to handle complex products",
            "Visual analytics enhance decision-making",
            "Reduces development time by over 30%",
            "Increases annual production of new products"
          ]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Open and examine NX models",
            "Create and edit basic assembly structures",
            "Create and edit drawings",
            "Use synchronous modeling",
            "Create component patterns",
            "Define revision identifiers",
            "Apply top-down assembly modeling",
            "Manage assembly arrangements"
          ]
        }
      ]
      
    },
    {
      title: "HyperMesh",
      image: "/images/hypermesh.jpg",
      description:
        "Finite element pre-processor for high-performance analysis.",
        price: 5000,
      video: "video.mp4",
      card_description:
        "Learn the practical skills & techniques required to create a Modern Home with Sketchup.For Mechanical and Automobile Engineers",
      learn:[
        "Introduction to FEM concepts",
        "Basics of meshing techniques",
        "Geometry preparation for meshing",
        "Line and solid geometry editing",
        "CAD import and repair",
        "Midsurfaces and geometry simplification",
        "Shell meshing and surface-based meshing",
        "Tetra and hex-penta mesh creation",
        "Hypermesh user interface navigation",
        "File handling and panel usage"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["Hypermesh software is a leading multi-disciplinary finite element pre-processor, used for managing the generation of large and complex models, from CAD geometry import to solver file preparation. Developed by Altair Engineering, it is a standard tool for creating innovative products more efficiently."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Work with CAE (Computer Aided Engineering) simulation software for creating finite element models.",
            "Generate high-quality meshes efficiently.",
            "Utilize geometry editing tools for CAD model design and meshing processes."
          ]
        },
        {
          "title": "Roles in Industry",
          "content": [
            "Perform 2D and 3D shape optimization, and 1D and 2D size optimization.",
            "Prepare models for analysis and geometry for meshing.",
            "Achieve high accuracy results."
          ]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Introduction to FEM",
            "Brief on Meshing",
            "Basic interaction with HyperMesh",
            "Preparing geometry for meshing",
            "Shell meshing",
            "Tetra meshing",
            "Mesh quality check",
            "Shrink wrap mesh",
            "Assemblies: welding and swapping parts",
            "Analysis Setup",
            "Hypermesh Solver Interfaces",
            "Post process setup",
            "Review, Test and Project Discussion"
          ]
        }
      ]
      
    },
    {
      title: "GD&T",
      image: "/images/gdt.jpg",
      description: "Geometric Dimensioning and Tolerancing in manufacturing.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "Geometric Dimensioning and Tolerancing is a system for defining and communicating engineering tolerances and relationships.Geometric Dimensions and Tolerancing",
      learn: [
        "Ways of expressing tolerance",
        "Dimensions and drawings & Tolerance dimensioning",
        "IT grades",
        "Introduction to 'ASME Y14.5M-1994' standards",
        "GD & T rules and principles",
        "Understanding Maximum Material Condition (MMC) of a feature of size",
        "Understanding Least Material Condition (LMC) of a feature of size",
        "Concept of virtual condition & Concept of bonus tolerance",
        "Planar datums and their significance",
        "Modifiers and symbols used in GD & T"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["Geometric Dimensioning and Tolerancing (GD&T) is a symbolic language used to define the geometry of mechanical parts. It includes dimensions, symbols, definitions, rules, and conventions that illustrate the functional requirements of design features. GD&T enables clear communication among mechanical engineers, fabricators, and designers regarding the design model."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Understand the fundamentals of the GD&T language.",
            "Comprehend Geometric Tolerancing.",
            "Assist in becoming a certified GD&T associate."
          ]
        },
        {
          "title": "Roles in Industry",
          "content": [
            "GD&T is an international language providing precise specification and interpretation for global design models.",
            "Datum features in GD&T offer additional tolerance.",
            "Facilitates and simplifies gaging requirements.",
            "Allows for critical-to-function features of mechanical parts."
          ]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Differences between ASME and ISO Standards",
            "Practical problem solving with real-world examples",
            "Gauging Methods and Implications",
            "Explanation and Implication of using GD&T symbols",
            "Basic and Advanced GD&T Training",
            "Comprehensive Study-Material"
          ]
        }
      ]
      
    },
    {
      title: "ANSYS Workbench",
      image: "/images/ansys_workbench.jpg",
      description: "Engineering simulation software for mechanical design.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "The Ansys Workbench platform lets you integrate data across engineering simulations to create more accurate models more efficiently.For Mechanical and Automobile Engineers",
      learn:[
        "Introduction to CAE and ANSYS Workbench",
        "Understanding system requirements and project creation",
        "Units and sketching in ANSYS Design Modeler",
        "Solid modeling techniques like extrusion and sweep",
        "Mesh generation, refinement, and settings",
        "Material properties and static structural analysis",
        "Examples of cantilever beams and pressure vessels",
        "Natural frequency analysis and mode shapes",
        "Buckling loads and various column types",
        "Thermal analysis, stress, and heat transfer applications"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["ANSYS Mechanical is a finite element analysis tool used to analyze and solve complex mechanical problems. It predicts the behavior of components in manufacturing and real-world environments. ANSYS supports global engineering simulation by delivering high-quality products developed faster through an information-based process."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Explain the basics of ANSYS, Finite Element Modeling (FEM), and Finite Element Analysis (FEA).",
            "Elevate learning through stages including pre-processor, solution, and post-processor.",
            "Conduct advanced structural analysis through hands-on sessions."
          ]
        },
        {
          "title": "Roles in Industry",
          "content": [
            "Used across various industries to analyze performance parameters like signal integrity, electromagnetic interference, thermal issues, and mechanical failure."
          ]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Validate product performance from manufacturing units.",
            "Simulate structural aspects including linear static analysis of single parts and complex assemblies.",
            "Perform fluid flow analysis to assess the impact on products during manufacturing and in real-world applications.",
            "Contribute to product success, integrity, smart product design, and reduced time-to-market."
          ]
        }
      ]
      
    },
    {
      title: "NX CAM",
      image: "/images/nxcam.jpg",
      description: "Computer-aided manufacturing software.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "NX CAM provides comprehensive and integrated NC programming capabilities in a single system.For Mechanical and Automobile Engineers",
      learn: [
        "Introduction to manufacturing and machining types",
        "Overview of milling operations",
        "Benefits of Computer-Aided Manufacturing (CAM)",
        "Introduction to NX CAM software",
        "Overview of milling machines and cutters",
        "Operation Navigator and editing operations",
        "Geometry and tool groups in CAM",
        "Visualizing and analyzing tool paths",
        "Various machining operations and techniques"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["NX CAM provides a comprehensive set of NC programming capabilities within a single CAM system and an integrated suite of manufacturing applications. These applications support part modeling, tool design, and inspection programming, all leveraging proven NX technology."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Perform 2, 3, and 5-axis milling and additive manufacturing such as 3D printing.",
            "Quickly program parts with complex geometries using the shortest tools to save time and reduce errors.",
            "Utilize mold, die, and electrode machining to produce high-quality products and decrease time to market."
          ]
        },
        {
          "title": "Roles in Industry",
          "content": [
            "NX CAM is utilized across various industries including aerospace, automotive, medical devices, mold and die, and machinery.",
            "It caters to both small machine shops and large teams of manufacturing engineers.",
            "Siemens software solutions are trusted by leading organizations globally."
          ]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Tool and machining data libraries",
            "Accessing manufacturing wizards",
            "Shop documentation",
            "Feature-based manufacturing",
            "Templates",
            "Integrated verification and simulation",
            "Tool path optimization",
            "Automated NC code generation"
          ]
        }
      ]
    },
    {
      title: "Mastercam",
      image: "/images/mastercam.jpg",
      description: "Software for manufacturing precision parts.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "Learn Mastercam in a Professional way. Become an expert in CAD CAM, CNC Programming, 3D modeling, plans...For Mechanical, Automobile Engineers",
      learn:[
        "Mastercam interface and navigation basics",
        "Creating 2D sketches and geometry",
        "Proficiency in 2D toolpath generation",
        "3D modeling techniques in Mastercam",
        "Simulation and verification of machining processes",
        "Post-processing and generating G-code",
        "Multiaxis machining and indexing",
        "Mastercam customization and automation",
        "Problem-solving and troubleshooting skills",
        "Advanced toolpath strategies and optimization"
    ],
      course_description: [
        {
          "title": "Course Description",
          "content": ["Mastercam is a computer-aided manufacturing (CAM) software program used by manufacturing professionals, including machinists and CNC programmers. This software assists users in producing mechanical drawings of machine parts, operating CNC lathes and mills, and creating 3D wireframe models. The course covers MasterCAM 2018 and 2019, designed for both beginners and seasoned users. Beginners can start from scratch with lecture one, while advanced users can focus on specific topics without revisiting basic concepts."]
        },
        {
          "title": "Course Objectives",
          "content": [
            "Mastercam offers both CAD and CAM functionality to drive CNC machines efficiently, enhancing productivity.",
            "CAM involves using software and computer-controlled machinery to automate the manufacturing process.",
            "The course provides training in generating toolpaths, a critical component for CAM systems to function effectively."
          ]
        },
        {
          "title": "Roles in Industry",
          "content": [
            "Mastercam is a Windows-based CAD/CAM solution used for 2 through 5-axis milling/routing, turning, mill-turn, 2 & 4 axis wire EDM, and 2D and 3D design.",
            "It serves various industries including aerospace, automotive, energy, medical, die/mold, composites, and consumer products.",
            "CAM software is essential for developing programs for CNC machines such as milling and turning machines, as well as for cutting-edge machining and additive manufacturing."
          ]
        },
        {
          "title": "Course Highlights",
          "content": [
            "Manufacturing Process",
            "Fundamentals of Mastercam",
            "Creating 3D Models",
            "Milling 3D"
          ]
        }
      ]
      
     
      
    },
  ],
  Civil: [
    {
      title: "AutoCAD Civil 3D",
      image: "/images/autocad_civil.jpg",
      description: "Design and draft civil infrastructure projects.",
    },
    {
      title: "STAAD Pro",
      image: "/images/staadpro.jpg",
      description: "Structural analysis and design software.",
    },
    {
      title: "Revit Architecture",
      image: "/images/revit_architecture.jpg",
      description:
        "BIM software for architecture, engineering, and construction.",
    },
    {
      title: "SketchUp",
      image: "/images/sketchup.jpg",
      description: "3D modeling software for design and architecture.",
    },
    {
      title: "ETABS",
      image: "/images/etabs.jpg",
      description: "Integrated software for building analysis and design.",
    },
    {
      title: "Lumion",
      image: "/images/lumion.jpg",
      description: "Real-time 3D rendering software for architects.",
    },
    {
      title: "Advanced Rendering with V-Ray",
      image: "/images/vray.jpg",
      description: "High-quality rendering software for 3D visuals.",
    },
    {
      title: "ANSYS Civil",
      image: "/images/ansys_civil.jpg",
      description: "Engineering simulation software for civil applications.",
    },
    {
      title: "3ds Max for Engineering & Architecture",
      image: "/images/3dsmax.jpg",
      description: "3D modeling, animation, and rendering software.",
    },
    {
      title: "Revit Structure",
      image: "/images/revit_structure.jpg",
      description: "BIM software for structural engineering.",
    },
    {
      title: "AutoCAD Civil 3D",
      image: "/images/autocad_civil3d.jpg",
      description: "Civil engineering design and documentation software.",
    },
    {
      title: "MxRoad",
      image: "/images/mxroad.jpg",
      description: "Advanced road design software.",
    },
    {
      title: "BIM Concepts",
      image: "/images/bim.jpg",
      description: "Building Information Modeling concepts for construction.",
    },
  ],
};
const CourseList = () => {
  const { category } = useParams();
  const selectedCourses = courses[category];
  const navigate = useNavigate();

  const handleCardClick = (course) => {
    navigate("/course-detail", { state: { course } });
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/courses.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "2vw",
          paddingBottom: "15vw",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Overlay with opacity
            zIndex: 1,
          },
        }}
      >
        <Grid
          container
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            padding: { xs: "20px", sm: "20px", md: "50px" },
          }}
        >
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.4rem",
                  md: "2.6rem",
                  lg: "2.6rem",
                },
                marginTop: { xs: "20px", md: "50px" },
                fontWeight: "bold",
                color: "white",
              }}
            >
              Our Courses
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.2rem",
                },
                marginTop: "10px",
                fontWeight: "500",
                padding: { xs: "10px", sm: "10px", md: "0px" },
                color: "white",
              }}
            >
              Discover our expertly crafted courses designed to equip you with
              the skills needed to excel in today's competitive job market.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "10px", }}
          >
            Our Courses
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              margin: "auto",
              fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
            }}
          >
            Explore All Industry-Leading IT & Industrial Automation Courses by
            Engimate and Get Placed! Skill up with new IT & Industrial
            Automation courses training or improve your technical knowledge with
            the best courses. Industry-leading courses developed with expertise
            and experience to help learners stay ahead in technological
            innovation.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {selectedCourses?.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginBottom: "30px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
                onClick={() => handleCardClick(course)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                  sx={{
                    objectFit: "cover",
                    filter: "brightness(0.85)",
                    transition: "filter 0.4s",
                    "&:hover": {
                      filter: "brightness(1.0)",
                    },
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: "#fff",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {course?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "10px", color: "#666" }}
                  >
                    {course?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CourseList;
