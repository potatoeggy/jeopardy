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
    title: "History Paper 3 - Nazi Germany",
    board: [
      {
        heading: "Consolidation of Power",
        questions: [
          [
            "Legislation that allowed the Chancellor of Germany to pass laws without Reichstag involvement.",
            "What was the Enabling Act?",
          ],
          [
            "The event in which many of Hitler’s political opponents were murdered by the SS and the Gestapo.",
            "What was the Night of Long Knives?",
          ],
          [
            "Two political parties outlawed by Hitler by 1933, with 100k and 300k members sent to conc. camps.",
            "Who were the SPD and the KPD?",
          ],
          [
            "Two results of Hitler’s use of force in Nazi Germany.",
            "What are eliminating rivals / instilling fear / repressing opposition?",
          ],
          [
            "One example of Hitler’s use of propaganda and/or charisma and its goal.",
            "Discretion of host",
          ],
        ],
      },
      {
        heading: "Domestic Policies",
        questions: [
          [
            "One policy enacted by the Nazis from their traditional values that affected only women.",
            "What is birth control / abortion?",
          ],
          [
            "A compulsory but hated Nazi organisation intended to remove the influence of parents and churches.",
            "Who were the Hitler Youth?",
          ],
          [
            "Two groups of people that were no longer considered part of the workforce by 1934, reducing unemployment figures.",
            "Who are Jews and women?",
          ],
          [
            "Two initiatives by the Nazi government to give the illusion of a boosted economy in the short-term.",
            "What were: Mefo bills / the Four Year Plans / the manipulation of currency markets / Public Works Schemes?",
          ],
          [
            "Two examples of Hitler’s successful political changes in Nazi Germany and their effect.",
            "Discretion of host",
          ],
        ],
      },
      {
        heading: "Nature of the State",
        questions: [
          [
            "The school of thought that paints Hitler as indecisive and a weak dictator.",
            "What is revisionism?",
          ],
          [
            "The school of thought that states that while Hitler’s will was implemented by others, he never made the decisions himself.",
            "What is post-revisionism?",
          ],
          [
            "One of several organisations that opposed some Nazi policies but normally unified under a traditionalist dictator.",
            "What was the Confessional Church / Catholic Church / universities / the military?",
          ],
          [
            "One of the several roles that all claimed to represent Hitler, resulting in internal disagreements.",
            "Who was the Presidential Chancellor / Deputy Fuhrer / Chancellor of the Fuhrer / Reich Chancellor?",
          ],
          [
            "One example of a Nazi extreme policy adopted by Hitler from one of his subordinates.",
            "What was the Holocaust / the Night of Broken Glass / euthanasia?",
          ],
        ],
      },
      {
        heading: "Extent of Resistance",
        questions: [
          [
            "One political party that resisted Hitler, forming a government-in-exile in Prague.",
            "What was the SPD?",
          ],
          [
            "This institution was the only one that had a rival ideology to the Nazis.",
            "What was the Catholic Church?",
          ],
          [
            "Resistance against Hitler attempted to remove him from power six times this way.",
            "What is assassination?",
          ],
          [
            "Two fields in which Hitler found success after 1934 leading to popular support for him.",
            "What were foreign policy / economics / propaganda?",
          ],
          [
            "One reason why active violent resistance against Hitler failed.",
            "What was private resistance / limited coordination / public support / fear of the Gestapo / ideological differences?",
          ],
        ],
      },
      {
        heading: "Surprise Me!",
        questions: [
          [
            "The Nazis blamed the KPD for this event, arresting thousands.",
            "What was the Reichstag Fire?",
          ],
          [
            "The President of the Reichstag, who ordered police to help the SA and SS and officially sanctioned violence.",
            "Who was Hermann Göring?",
          ],
          [
            "A planned coup d’etat by top military officials failed after this event.",
            "What was the Munich Agreement?",
          ],
          [
            "Two propaganda symbols commonly used by the Nazis.",
            "What were the swastika / the Roman salute / the Goose Step?",
          ],
          [
            "Hitler’s unusual daily schedule.",
            "What was waking up from 12-14, napping, and sleeping at 2:30?",
          ],
        ],
      },
    ],
  },
  {
    title: "Chemistry - Semester 1",
    board: [
      {
        heading: "Stoichiometry",
        questions: [
          ["The empirical formula of hydrogen peroxide.", "What is HO?"],
          [
            "273 K and 101.3 kPa.",
            "What is SATP (standard atmospheric temperature & pressure?)",
          ],
          [
            "The number of moles of carbon in 6.0 g of graphite.",
            "What is 0.5?",
          ],
          [
            "The limiting reactant in the combustion of methane given 3 mol of methane and 7 mol of oxygen gas.",
            "What is methane?",
          ],
          [
            "One condition in which real gases deviate from ideal gas behaviour.",
            "What is high pressure / low temperature?",
          ],
        ],
      },
      {
        heading: "Atoms",
        questions: [
          [
            "Atoms of the same element but with different masses.",
            "What is an isotope?",
          ],
          [
            "The number of half-lifes for a sample to decay to 25% of its original size.",
            "What is 2?",
          ],
          [
            "The definition of electron affinity.",
            "What is the energy required to add an electron to a gaseous atom?",
          ],
          [
            "The property of an element’s isotopes that affects their contribution to that element’s relative atomic mass.",
            "What is natural abundance?",
          ],
          [
            "The unbalanced equation of an alkali metal reaction with water.",
            "What is A + H₂O → AOH + H₂ ?",
          ],
        ],
      },
      {
        heading: "Periodicity",
        questions: [
          [
            "A diatomic halogen that is solid at room temperature.",
            "What is iodine?",
          ],
          [
            "One unbalanced reaction of a period 3 oxide with water.",
            "Discretion of host",
          ],
          [
            "Why electron affinity decreases going down a group.",
            "What is increased shielding and greater distance from the nucleus, resulting in weaker attraction?",
          ],
          [
            "A series of experimental tests that would identify a network solid.",
            "Discretion of host",
          ],
          [
            "How ionic radius changes going across a period and the two reasons why.",
            "What is decreasing then sharply increasing halfway then decreasing, because of greater effective nuclear charge and unchanged shielding?",
          ],
        ],
      },
      {
        heading: "Electrons",
        questions: [
          [
            "Two properties of p orbitals.",
            "What is dumbbell-shaped / centred on the nucleus / each 90° from each other?",
          ],
          [
            "Two substances with isoelectronic configurations.",
            "Discretion of host",
          ],
          [
            "The type of radiation emitted when electrons move down to n=1, n=2, and n=3, respectively.",
            "What is ultraviolet, visible, and infrared light?",
          ],
          [
            "The condensed electron configuration of copper.",
            "What is [Ar] 4s¹ 3d¹⁰ ?",
          ],
          [
            "Evidence of energy levels for hydrogen in its line spectra and the distance between them.",
            "Discretion of host",
          ],
        ],
      },
      {
        heading: "Transition Metals",
        questions: [
          [
            "The property of a ligand that allows it to form a dative bond to a transition element.",
            "What is a lone pair?",
          ],
          [
            "The shape of a complex ion with a coordination number of 6.",
            "What is octahedral?",
          ],
          [
            "Each possible oxidation state of iron.",
            "What is +2, +3, +4, +5, +6?",
          ],
          [
            "The number of d orbitals in each subdivision of a tetrahedral complex ion.",
            "What is 3 in higher, 2 in lower?",
          ],
          [
            "Two changes that would change the colour of a complex ion.",
            "What is changing ligands / changing geometry / changing central ion / changing oxidation state of central ion?",
          ],
        ],
      },
    ],
  },
  {
    title: "CWC Writeathon 2022",
    board: [
      {
        heading: "Types of Works",
        questions: [
          [
            "A work that uses meaning, sound, and rhythm to create an emotional response.",
            "What is poetry?",
          ],
          [
            "A prose narrative with a plot explored typically through a connected sequence of events.",
            "What is a novel?",
          ],
          [
            "A typically non-fictional work that argues a thesis.",
            "What is an essay?",
          ],
          [
            "A derivative work of a pre-existing work, building on its world or characters.",
            "What is fanfiction?",
          ],
          [
            "A type of script that also contains camera directions.",
            "What is a screenplay?",
          ],
        ],
      },
      {
        heading: "Classic Quotes",
        questions: [
          [
            "“He huffed and he puffed and he blew the house down!”",
            "What is The Three Little Pigs?",
          ],
          ["“To be or not to be, that is the question.”", "What is Hamlet?"],
          ["“Call me Ishmael.”", "What is Moby Dick?"],
          [
            "“Look, I didn’t want to be a half-blood.”",
            "What is Percy Jackson / The Lightning Thief?",
          ],
          [
            "“I like the night. Without the dark, we'd never see the stars.” ",
            "What is Twilight?",
          ],
        ],
      },
      {
        heading: "English Class",
        questions: [
          [
            "A type of word that describes an action word.",
            "What are adverbs?",
          ],
          [
            "A word named by the sound it represents.",
            "What are onomatopoeias?",
          ],
          [
            "Words that are contradictory when alone together.",
            "What are oxymorons?",
          ],
          ["A common meter with ten syllables.", "What is iambic pentameter?"],
          [
            "A double negative making a positive, not unlike this sentence.",
            "What are litotes?",
          ],
        ],
      },
      {
        heading: "Complete the Couplet",
        questions: [
          ["Roses are red, violets are blue /", ""],
          ["Once upon a time / ", ""],
          ["One fish, two fish, three fish, four fish /", ""],
          ["There once was a carriage of beige /", ""],
          ["What could possibly rhyme with orange /", ""],
        ],
      },
      {
        heading: "Surprise Me!",
        questions: [
          ["There once was a goose /", ""],
          [
            "A brief narrative that aims to set a certain mood instead of a plot.",
            "What are short stories?",
          ],
          [
            "“Mr and Mrs Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.”",
            "What is Harry Potter and the Philosopher's Stone?",
          ],
          [
            "A character typically played by an actor talking to themselves in a dramatic work.",
            "What are soliloquies?",
          ],
          [
            "When you have millions of ideas in your head but you just CAN’T get them down and it’s incredibly frustrating because you WANT to write but CAN’T —",
            "What is writer's block?",
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
    "If aqueous ammonia is added to an aqueous copper (II) sulfate solution (light blue), the ammonia molecules will replace the water molecules. The light seen will change from light blue to _____.",
  answer: "What is dark blue / purple",
  category: "Colour of Complex Ions",
};

export default games;
