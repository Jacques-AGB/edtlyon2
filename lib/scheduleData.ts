import { Course } from "./types";

export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Introduction à la programmation",
    professor: "Prof. Dr. Dubois",
    room: "A.301",
    startTime: "2025-12-10T08:00:00",
    endTime: "2025-12-10T11:00:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=101",
    homework: [
      {
        task: "Exercices de base sur les variables",
        isDone: true,
        deadline: "2025-12-12T23:59:59",
      },
      {
        task: "Projet de calculatrice simple",
        isDone: false,
        deadline: "2025-12-17T23:59:59",
      },
    ],
  },
  {
    id: "course-2",
    title: "Design d'interaction",
    professor: "Prof. Mme Le Goff",
    room: "E.108",
    startTime: "2025-12-10T13:00:00",
    endTime: "2025-12-10T16:00:00",
    colorTailwind: "bg-orange-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=102",
    homework: [
      {
        task: "Analyse d'une interface utilisateur",
        isDone: false,
        deadline: "2025-12-15T23:59:59",
      },
    ],
  },

  // Mardi 11 novembre 2025
  {
    id: "course-3",
    title: "Bases de données avancées",
    professor: "Prof. Dr. Pierre Lefebvre",
    room: "B.205",
    startTime: "2025-12-11T13:00:00",
    endTime: "2025-12-11T16:00:00",
    colorTailwind: "bg-yellow-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=103",
    homework: [
      {
        task: "Modélisation d'une base de données",
        isDone: true,
        deadline: "2025-12-10T23:59:59",
      },
      {
        task: "Requêtes SQL complexes",
        isDone: false,
        deadline: "2025-12-18T23:59:59",
      },
    ],
  },

  // Mercredi 12 novembre 2025
  {
    id: "course-4",
    title: "Réseaux et Sécurité",
    professor: "Prof. M. Thomas Roux",
    room: "C.412",
    startTime: "2025-12-12T09:00:00",
    endTime: "2025-12-12T12:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=104",
    homework: [
      {
        task: "Configuration d'un réseau local",
        isDone: false,
        deadline: "2025-12-19T23:59:59",
      },
    ],
  },
  {
    id: "course-5",
    title: "Systèmes d'exploitation",
    professor: "Prof. M. Antoine Martin",
    room: "D.309",
    startTime: "2025-12-12T13:00:00",
    endTime: "2025-12-12T16:00:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=105",
    homework: [
      {
        task: "Étude des processus et threads",
        isDone: true,
        deadline: "2025-12-11T23:59:59",
      },
      {
        task: "Gestion de la mémoire",
        isDone: false,
        deadline: "2025-12-20T23:59:59",
      },
    ],
  },

  // Décembre 2025
  {
    id: "course-10",
    title: "Séminaire de recherche",
    professor: "Prof. Dr. Dubois",
    room: "A.501",
    startTime: "2025-12-03T13:00:00",
    endTime: "2025-12-03T16:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "SEM001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=110",
    homework: [
      {
        task: "Lecture des articles de recherche",
        isDone: false,
        deadline: "2025-12-02T23:59:59",
      },
      {
        task: "Synthèse bibliographique",
        isDone: false,
        deadline: "2025-12-10T23:59:59",
      },
    ],
  },

  // Dimanche 1 d‚cembre 2025
  {
    id: "course-11",
    title: "Introduction … la programmation",
    professor: "Prof. Dr. Dubois",
    room: "A.301",
    startTime: "2025-12-01T09:00:00",
    endTime: "2025-12-01T12:00:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=201",
    homework: [
      {
        task: "Exercices de base sur les variables",
        isDone: true,
        deadline: "2025-12-03T23:59:59",
      },
      {
        task: "Projet de calculatrice simple",
        isDone: false,
        deadline: "2025-12-08T23:59:59",
      },
    ],
  },

  // Lundi 2 d‚cembre 2025
  {
    id: "course-12",
    title: "Design d'interaction",
    professor: "Prof. Mme Le Goff",
    room: "E.108",
    startTime: "2025-12-02T10:00:00",
    endTime: "2025-12-02T13:00:00",
    colorTailwind: "bg-orange-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=202",
    homework: [
      {
        task: "Analyse d'une interface utilisateur",
        isDone: false,
        deadline: "2025-12-06T23:59:59",
      },
    ],
  },

  // Jeudi 4 d‚cembre 2025
  {
    id: "course-13",
    title: "Bases de donnes avances",
    professor: "Prof. Dr. Pierre Lefebvre",
    room: "B.205",
    startTime: "2025-12-04T08:30:00",
    endTime: "2025-12-04T11:30:00",
    colorTailwind: "bg-yellow-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=203",
    homework: [
      {
        task: "Mod‚lisation d'une base de donn‚es",
        isDone: true,
        deadline: "2025-12-05T23:59:59",
      },
      {
        task: "Requˆtes SQL complexes",
        isDone: false,
        deadline: "2025-12-12T23:59:59",
      },
    ],
  },

  // Vendredi 5 d‚cembre 2025
  {
    id: "course-14",
    title: "Reseaux et Securite",
    professor: "Prof. M. Thomas Roux",
    room: "C.412",
    startTime: "2025-12-05T09:00:00",
    endTime: "2025-12-05T12:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=204",
    homework: [
      {
        task: "Configuration d'un reseau local",
        isDone: false,
        deadline: "2025-12-09T23:59:59",
      },
    ],
  },

  // Lundi 8 d‚cembre 2025
  {
    id: "course-17",
    title: "Projet Multimedia",
    professor: "Prof. Mme Duval",
    room: "F.201",
    startTime: "2025-12-08T13:00:00",
    endTime: "2025-12-08T17:00:00",
    colorTailwind: "bg-purple-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=207",
    homework: [
      {
        task: "Maquette du projet",
        isDone: true,
        deadline: "2025-12-07T23:59:59",
      },
      {
        task: "Prototype interactif",
        isDone: false,
        deadline: "2025-12-15T23:59:59",
      },
    ],
  },

  // Mardi 9 d‚cembre 2025
  {
    id: "course-18",
    title: "Gestion des situations orales",
    professor: "Prof. M. Fontana",
    room: "D.413",
    startTime: "2025-12-09T09:00:00",
    endTime: "2025-12-09T12:00:00",
    colorTailwind: "bg-blue-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=208",
    homework: [
      {
        task: "Pr‚paration de la pr‚sentation",
        isDone: false,
        deadline: "2025-12-13T23:59:59",
      },
    ],
  },

  // Lundi 15 d‚cembre 2025
  {
    id: "course-19",
    title: "Seminaire de recherche",
    professor: "Prof. Dr. Dubois",
    room: "A.501",
    startTime: "2025-12-15T10:00:00",
    endTime: "2025-12-15T13:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "SEM001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=209",
    homework: [
      {
        task: "Lecture des articles de recherche",
        isDone: false,
        deadline: "2025-12-14T23:59:59",
      },
      {
        task: "SynthŠse bibliographique",
        isDone: false,
        deadline: "2025-12-22T23:59:59",
      },
    ],
  },

  // Mardi 16 d‚cembre 2025
  {
    id: "course-20",
    title: "Introduction … la programmation",
    professor: "Prof. Dr. Dubois",
    room: "A.301",
    startTime: "2025-12-16T14:00:00",
    endTime: "2025-12-16T17:00:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=210",
    homework: [
      {
        task: "Exercices de base sur les variables",
        isDone: true,
        deadline: "2025-12-18T23:59:59",
      },
      {
        task: "Projet de calculatrice simple",
        isDone: false,
        deadline: "2025-12-23T23:59:59",
      },
    ],
  },

  // Mercredi 17 d‚cembre 2025
  {
    id: "course-21",
    title: "Design d'interaction",
    professor: "Prof. Mme Le Goff",
    room: "E.108",
    startTime: "2025-12-17T08:30:00",
    endTime: "2025-12-17T11:30:00",
    colorTailwind: "bg-orange-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=211",
    homework: [
      {
        task: "Analyse d'une interface utilisateur",
        isDone: false,
        deadline: "2025-12-21T23:59:59",
      },
    ],
  },

  // Jeudi 18 d‚cembre 2025
  {
    id: "course-22",
    title: "Bases de donnes avances",
    professor: "Prof. Dr. Pierre Lefebvre",
    room: "B.205",
    startTime: "2025-12-18T13:00:00",
    endTime: "2025-12-18T16:00:00",
    colorTailwind: "bg-yellow-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=212",
    homework: [
      {
        task: "Mod‚lisation d'une base de donn‚es",
        isDone: true,
        deadline: "2025-12-17T23:59:59",
      },
      {
        task: "Requˆtes SQL complexes",
        isDone: false,
        deadline: "2025-12-24T23:59:59",
      },
    ],
  },

  // Vendredi 19 d‚cembre 2025
  {
    id: "course-23",
    title: "Reseaux et S‚curit‚",
    professor: "Prof. M. Thomas Roux",
    room: "C.412",
    startTime: "2025-12-19T09:00:00",
    endTime: "2025-12-19T12:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=213",
    homework: [
      {
        task: "Configuration d'un reseau local",
        isDone: false,
        deadline: "2025-12-23T23:59:59",
      },
    ],
  },

  // Lundi 22 d‚cembre 2025
  {
    id: "course-26",
    title: "Projet Multimedia",
    professor: "Prof. Mme Duval",
    room: "F.201",
    startTime: "2025-12-22T14:00:00",
    endTime: "2025-12-22T17:00:00",
    colorTailwind: "bg-purple-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=216",
    homework: [
      {
        task: "Maquette du projet",
        isDone: true,
        deadline: "2025-12-21T23:59:59",
      },
      {
        task: "Prototype interactif",
        isDone: false,
        deadline: "2025-12-29T23:59:59",
      },
    ],
  },

  // Mardi 23 d‚cembre 2025
  {
    id: "course-27",
    title: "Gestion des situations orales",
    professor: "Prof. M. Fontana",
    room: "D.413",
    startTime: "2025-12-23T09:00:00",
    endTime: "2025-12-23T12:00:00",
    colorTailwind: "bg-blue-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=217",
    homework: [
      {
        task: "Pr‚paration de la pr‚sentation",
        isDone: false,
        deadline: "2025-12-27T23:59:59",
      },
    ],
  },

  // Mercredi 24 d‚cembre 2025
  {
    id: "course-28",
    title: "Seminaire de recherche",
    professor: "Prof. Dr. Dubois",
    room: "A.501",
    startTime: "2025-12-24T13:00:00",
    endTime: "2025-12-24T16:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "SEM001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=218",
    homework: [
      {
        task: "Lecture des articles de recherche",
        isDone: false,
        deadline: "2025-12-23T23:59:59",
      },
      {
        task: "SynthŠse bibliographique",
        isDone: false,
        deadline: "2025-12-30T23:59:59",
      },
    ],
  },

  // Jeudi 25 d‚cembre 2025
  {
    id: "course-29",
    title: "Introduction … la programmation",
    professor: "Prof. Dr. Dubois",
    room: "A.301",
    startTime: "2025-12-25T10:00:00",
    endTime: "2025-12-25T13:00:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=219",
    homework: [
      {
        task: "Exercices de base sur les variables",
        isDone: true,
        deadline: "2025-12-27T23:59:59",
      },
      {
        task: "Projet de calculatrice simple",
        isDone: false,
        deadline: "2026-01-02T23:59:59",
      },
    ],
  },

  // Vendredi 26 d‚cembre 2025
  {
    id: "course-30",
    title: "Design d'interaction",
    professor: "Prof. Mme Le Goff",
    room: "E.108",
    startTime: "2025-12-26T08:00:00",
    endTime: "2025-12-26T11:00:00",
    colorTailwind: "bg-orange-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=220",
    homework: [
      {
        task: "Analyse d'une interface utilisateur",
        isDone: false,
        deadline: "2025-12-30T23:59:59",
      },
    ],
  },

  // Lundi 29 d‚cembre 2025
  {
    id: "course-33",
    title: "Systemes d'exploitation",
    professor: "Prof. M. Antoine Martin",
    room: "D.309",
    startTime: "2025-12-29T08:30:00",
    endTime: "2025-12-29T11:30:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=223",
    homework: [
      {
        task: "tude des processus et threads",
        isDone: true,
        deadline: "2025-12-28T23:59:59",
      },
      {
        task: "Gestion de la m‚moire",
        isDone: false,
        deadline: "2026-01-05T23:59:59",
      },
    ],
  },

  // Mardi 30 d‚cembre 2025
  {
    id: "course-34",
    title: "Ergonomie et Navigation",
    professor: "Prof. Bertrand Cochet",
    room: "D.413",
    startTime: "2025-12-30T13:00:00",
    endTime: "2025-12-30T16:00:00",
    colorTailwind: "bg-yellow-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=224",
    homework: [
      {
        task: "Analyse ergonomique d'un site web",
        isDone: false,
        deadline: "2026-01-03T23:59:59",
      },
    ],
  },

  // Mercredi 31 d‚cembre 2025
  {
    id: "course-35",
    title: "Projet Multimedia",
    professor: "Prof. Mme Duval",
    room: "F.201",
    startTime: "2025-12-31T09:00:00",
    endTime: "2025-12-31T13:00:00",
    colorTailwind: "bg-purple-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=225",
    homework: [
      {
        task: "Maquette du projet",
        isDone: true,
        deadline: "2025-12-30T23:59:59",
      },
      {
        task: "Prototype interactif",
        isDone: false,
        deadline: "2026-01-07T23:59:59",
      },
    ],
  },
];

