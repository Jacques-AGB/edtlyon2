import { Course } from "./types";

export const MOCK_COURSES: Course[] = [
  // Lundi 10 novembre 2025
  {
    id: "course-1",
    title: "Introduction à la programmation",
    professor: "Prof. Dr. Dubois",
    room: "A.301",
    startTime: "2025-11-10T08:00:00",
    endTime: "2025-11-10T11:00:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=101",
    homework: [
      {
        task: "Exercices de base sur les variables",
        isDone: true,
        deadline: "2025-11-12T23:59:59",
      },
      {
        task: "Projet de calculatrice simple",
        isDone: false,
        deadline: "2025-11-17T23:59:59",
      },
    ],
  },
  {
    id: "course-2",
    title: "Design d'interaction",
    professor: "Prof. Mme Le Goff",
    room: "E.108",
    startTime: "2025-11-10T13:00:00",
    endTime: "2025-11-10T16:00:00",
    colorTailwind: "bg-orange-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=102",
    homework: [
      {
        task: "Analyse d'une interface utilisateur",
        isDone: false,
        deadline: "2025-11-15T23:59:59",
      },
    ],
  },

  // Mardi 11 novembre 2025
  {
    id: "course-3",
    title: "Bases de données avancées",
    professor: "Prof. Dr. Pierre Lefebvre",
    room: "B.205",
    startTime: "2025-11-11T13:00:00",
    endTime: "2025-11-11T16:00:00",
    colorTailwind: "bg-yellow-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=103",
    homework: [
      {
        task: "Modélisation d'une base de données",
        isDone: true,
        deadline: "2025-11-10T23:59:59",
      },
      {
        task: "Requêtes SQL complexes",
        isDone: false,
        deadline: "2025-11-18T23:59:59",
      },
    ],
  },

  // Mercredi 12 novembre 2025
  {
    id: "course-4",
    title: "Réseaux et Sécurité",
    professor: "Prof. M. Thomas Roux",
    room: "C.412",
    startTime: "2025-11-12T09:00:00",
    endTime: "2025-11-12T12:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=104",
    homework: [
      {
        task: "Configuration d'un réseau local",
        isDone: false,
        deadline: "2025-11-19T23:59:59",
      },
    ],
  },
  {
    id: "course-5",
    title: "Systèmes d'exploitation",
    professor: "Prof. M. Antoine Martin",
    room: "D.309",
    startTime: "2025-11-12T13:00:00",
    endTime: "2025-11-12T16:00:00",
    colorTailwind: "bg-lime-100",
    tdGroup: "TD002",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=105",
    homework: [
      {
        task: "Étude des processus et threads",
        isDone: true,
        deadline: "2025-11-11T23:59:59",
      },
      {
        task: "Gestion de la mémoire",
        isDone: false,
        deadline: "2025-11-20T23:59:59",
      },
    ],
  },

  // Jeudi 13 novembre 2025
  {
    id: "course-6",
    title: "Ergonomie et Navigation",
    professor: "Prof. Bertrand Cochet",
    room: "D.413",
    startTime: "2025-11-13T08:30:00",
    endTime: "2025-11-13T11:30:00",
    colorTailwind: "bg-yellow-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=106",
    homework: [
      {
        task: "Analyse ergonomique d'un site web",
        isDone: false,
        deadline: "2025-11-16T23:59:59",
      },
    ],
  },
  {
    id: "course-7",
    title: "Projet Multimédia",
    professor: "Prof. Mme Duval",
    room: "F.201",
    startTime: "2025-11-13T13:00:00",
    endTime: "2025-11-13T17:00:00",
    colorTailwind: "bg-purple-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=107",
    homework: [
      {
        task: "Maquette du projet",
        isDone: true,
        deadline: "2025-11-12T23:59:59",
      },
      {
        task: "Prototype interactif",
        isDone: false,
        deadline: "2025-11-21T23:59:59",
      },
    ],
  },

  // Vendredi 14 novembre 2025
  {
    id: "course-8",
    title: "Ergonomie et Navigation - TD001",
    professor: "Prof. Bertrand Cochet",
    room: "D.413",
    startTime: "2025-11-14T09:00:00",
    endTime: "2025-11-14T12:00:00",
    colorTailwind: "bg-red-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=108",
    homework: [
      {
        task: "Faire la maquette",
        isDone: true,
        deadline: "2025-11-13T23:59:59",
      },
      {
        task: "Prototype",
        isDone: false,
        deadline: "2025-11-20T23:59:59",
      },
    ],
  },
  {
    id: "course-9",
    title: "Gestion des situations orales",
    professor: "Prof. M. Fontana",
    room: "D.413",
    startTime: "2025-11-14T13:00:00",
    endTime: "2025-11-14T16:00:00",
    colorTailwind: "bg-blue-100",
    tdGroup: "TD001",
    moodleUrl: "https://moodle.univ-lyon2.fr/course/view.php?id=109",
    homework: [
      {
        task: "Préparation de la présentation",
        isDone: false,
        deadline: "2025-11-18T23:59:59",
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
];

