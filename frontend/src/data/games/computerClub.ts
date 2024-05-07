import type { Game } from "../games";

export default <Game>{
  title: "Computer Club",
  board: [
    {
      heading: "Hardware",
      questions: [
        [
          "The component that powers a desktop computer.",
          "What is a power supply?",
        ],
        [
          "An element used in transistors because of its semiconductive properties.",
          "What is silicon?",
        ],
        [
          "A type of switch that completely phased out the use of vacuum tubes.",
          "What is a transistor?",
        ],
        [
          "A connector that rigorously inserts into its female counterpart.",
          "What is a male connector?",
        ],
        [
          "The full name of the motherboard interface used to connect GPUs to a desktop PC.",
          "What is Peripheral Component Interconnect Express?",
        ],
      ],
    },
    {
      heading: "My Computer",
      questions: [
        [
          "Command-C and Command-V",
          "What are the keyboard shortcuts to copy and paste on macOS?",
        ],
        [
          "A technology that can wirelessly transfer files exclusively between Apple devices.",
          "What is AirDrop?",
        ],
        [
          "A reversible connector used in phones and computers that can carry power.",
          "What is USB-C?",
        ],
        [
          "Ctrl+Shift+Esc",
          "What is the keyboard shortcut to open Windows Task Manager?",
        ],
        [
          "The user-specific folder for program data after Windows Vista.",
          "What is AppData?",
        ],
      ],
    },
    {
      heading: "History",
      questions: [
        [
          "The woman often credited as the first computer programmer.",
          "Who was Ada Lovelace?",
        ],
        [
          "The best-selling video game home console, released in 2000.",
          "What is the PlayStation 2?",
        ],
        [
          "A man who devised a famous test as to whether machines could think.",
          "Who was Alan Turing?",
        ],
        ["The earliest known tool for computation.", "What is the abacus?"],
        [
          "The first Intel microprocessor, released in 1971.",
          "What was the Intel 4004?",
        ],
      ],
    },
    {
      heading: "Programming",
      questions: [
        [
          "The keyword used in nearly all programming languages to represent a conditional.",
          "What is if?",
        ],
        [
          "A programming language known for requiring indents to represent code blocks.",
          "What is Python?",
        ],
        [
          "A tool used to translate source code from a higher to a lower level.",
          "What is a compiler?",
        ],
        [
          "A function that might not have a name or identifier.",
          "What is an anonymous/lambda function?",
        ],
        [
          "A method of boolean comparison that may not evaluate the second argument.",
          "What is short-circuit evaluation?",
        ],
      ],
    },
    {
      heading: "Worldwide Systems",
      questions: [
        [
          "A machine used in WWII by the Germans to encode secret messages.",
          "What was Enigma?",
        ],
        [
          "The Soviet spacecraft series used to carry humans into space.",
          "What is Soyuz?",
        ],
        [
          "The world's largest particle accelerator, designed to study elementary particles.",
          "What is the Large Hadron Collider?",
        ],
        [
          "The dominant software platform for computer communication over a network.",
          "What is the World Wide Web?",
        ],
        [
          "The Chinese satellite navigation system comparable to GPS.",
          "What is BeiDou?",
        ],
      ],
    },
  ],
};
