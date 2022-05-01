import type { FinalQuestion } from "../types";

const games = [
  {
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
  },
  {
    title: "History Paper 2 - China and Spain",
    board: [
      {
        heading: "Women",
        questions: [
          [
            "Women were not allowed to own this after the Spanish Civil War.",
            "What is property?",
          ],
          [
            "Even during this event, women were only given service roles while men controlled technical jobs.",
            "What is the Great Leap Forward?",
          ],
          [
            "The new Spanish government forbade women working these job(s) afterward.",
            "What are doctors / judges / government workers?",
          ],
          [
            "A collective unit that provided support for women in childcare, clothes-mending, cleaning, and dwelling upkeep.",
            "What are communes?",
          ],
          [
            "An organisation established in 1949 to promote gender equality, but shut down in 1968 as antirevolutionary.",
            "What was the All-China Woman’s Federation?",
          ],
        ],
      },
      {
        heading: "Guerilla Warfare",
        questions: [
          [
            "Conditions the USSR took advantage of in guerilla warfare after their defeat in conventional warfare.",
            "What was winter / marshy/forested terrain?",
          ],
          [
            "The CCP received foreign aid from this country in their transition to conventional warfare.",
            "What is the USSR?",
          ],
          [
            "Four battles in which Mao “avoided losing” through guerilla warfare against the GMD.",
            "What were the Encirclement Campaigns?",
          ],
          [
            "This Soviet organisation prevented collaboration between the local population and the German army by burning villages and executing families.",
            "Who were the Soviet partisans?",
          ],
          [
            "One example of the disruption of German logistics from guerilla warfare.",
            "(At the discretion of the host)",
          ],
        ],
      },
      {
        heading: "H/E Mobilisation",
        questions: [
          [
            "During this event, CCP membership increased from 40 000 to 1 000 000+.",
            "What was the Long March?",
          ],
          [
            "A “grasping, bigoted, ungrateful rattlesnake” according to American general Stillwell.",
            "Who was Chiang Kai-Shek / Jiang Jieshi?",
          ],
          [
            "This faction held less than ⅓ of army officers and no military academies, leaving them directionless.",
            "Who were the Republicans?",
          ],
          [
            "A group that supported the Nationalists with 700 million in credit from US banks and controlled main food producing areas.",
            "Who were businessmen / business communities?",
          ],
          [
            "The rate of soldier desertion per month and soldier starvation per month in the GMD, respectively.",
            "What are 6% and 20%?",
          ],
        ],
      },
      {
        heading: "Technology",
        questions: [
          [
            "A form of warfare that rendered the GMD’s better weapons and technology ineffective.",
            "What is guerilla warfare?",
          ],
          [
            "A German model fighter plane provided to the Nationalists that gave them air superiority.",
            "What was the Messerschmidt fighter plane?",
          ],
          [
            "This class could not use the 800k rifles, 14k machine guns, and 700 tanks given by the USSR to the CCP.",
            "Who are uneducated peasants?",
          ],
          [
            "A strategy employed by the Nationalists in 1938 with their air superiority and faster panzer tanks.",
            "What is blitzkrieg?",
          ],
          [
            "One technology that enabled the Republicans to get early wins against the Nationalists.",
            "What are tanks / propeller planes?",
          ],
        ],
      },
      {
        heading: "Causes of Civil War",
        questions: [
          [
            "The last President of China before the civil war, whose death created a power vacuum and led to the rise of warlordism.",
            "Who was Yuan Shikai?",
          ],
          [
            "Two conflicts that turned the Chinese people against the government prior to the civil war.",
            "What were the Opium Wars / Boxer Rebellion?",
          ],
          [
            "A Spanish left-wing coalition created to project unity that died to infighting.",
            "What was the Popular Front?",
          ],
          [
            "Although Republicans controlled this power base, they lacked raw resources from peasants.",
            "What are cities / urban centres?",
          ],
          [
            "Two economic reasons that led to political instability in Spain.",
            "What were famines / food shortages / a large population increase / 45% of the economy built on agriculture?",
          ],
        ],
      },
    ],
  },
  {
    title: "test",
    board: [
      {
        heading: "Hardware",
        questions: [
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
        ],
      },
      {
        heading: "Computer",
        questions: [
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
        ],
      },
      {
        heading: "Systems",
        questions: [
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
        ],
      },
      {
        heading: "babies",
        questions: [
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
        ],
      },
      {
        heading: "joey",
        questions: [
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
          ["2", "what is a 2"],
        ],
      },
    ],
  },
];

export const finalQuestion: FinalQuestion = {
  question:
    "The distinctive colour used in computer club materials, aside from black. (literally our brand)",
  answer: "What is magenta?",
  category: "Computer Club",
};

export default games;
