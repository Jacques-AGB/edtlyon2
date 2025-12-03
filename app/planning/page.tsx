"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { format, isSameDay, startOfWeek, addDays, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { MOCK_COURSES } from "../../lib/scheduleData";
import type { Course as CourseType } from "../../lib/types";

type ViewMode = "Jour" | "Semaine" | "Mois";

// Interface locale pour adapter CourseType au format utilisé dans le composant
interface Course {
  id: string;
  title: string;
  fullTitle?: string;
  tdGroup?: string;
  teacher: string;
  room: string;
  startTime: string; // Format HH:MM pour l'affichage
  endTime: string; // Format HH:MM pour l'affichage
  date: Date; // Date réelle
  color: string; // Classe Tailwind complète avec border
  colorTailwind: string; // Classe Tailwind de base (bg-*)
  moodleLink?: string;
  courseRef?: string;
  homework?: {
    task: string;
    isDone: boolean;
    deadline: string | null;
  }[];
}

interface WeekCourse {
  day: string;
  date: string;
  courses: {
    startTime: string;
    endTime: string;
    color: string;
  }[];
}

// Constantes de la grille
const PIXEL_PER_HOUR = 60; // 60px pour chaque heure (échelle)
const HOURS = Array.from({ length: 12 }, (_, i) => 8 + i); // 08h00 à 19h00
const INITIAL_DATE = new Date("2025-11-14T00:00:00"); // Vendredi 14 Novembre 2025

// Définir les objets Date pour les jours de la semaine à afficher (Lundi 10 au Vendredi 14)
const DAYS_OF_WEEK = [
  new Date("2025-11-10T00:00:00"), // Lundi
  new Date("2025-11-11T00:00:00"), // Mardi
  new Date("2025-11-12T00:00:00"), // Mercredi
  new Date("2025-11-13T00:00:00"), // Jeudi
  new Date("2025-11-14T00:00:00"), // Vendredi
];

// Fonction utilitaire pour comparer les dates
const isSameDayDate = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

// Générer les dates de la semaine (Lundi à Vendredi)
const getWeekDates = (date: Date): Date[] => {
  const monday = startOfWeek(date, { weekStartsOn: 1 }); // Lundi comme premier jour
  return Array.from({ length: 5 }, (_, i) => addDays(monday, i));
};

// Convertir MOCK_COURSES en format Course utilisé par le composant
const convertCourseToLocalFormat = (course: CourseType): Course => {
  const startDate = parseISO(course.startTime);
  const endDate = parseISO(course.endTime);
  
  // Extraire l'heure au format HH:MM
  const startTime = format(startDate, "HH:mm");
  const endTime = format(endDate, "HH:mm");
  
  // Créer la classe color complète avec border
  // Mapper les couleurs Tailwind aux classes de bordure correspondantes
  const colorMap: Record<string, string> = {
    "bg-lime-100": "bg-lime-100 border-lime-200",
    "bg-orange-100": "bg-orange-100 border-orange-200",
    "bg-yellow-100": "bg-yellow-100 border-yellow-200",
    "bg-red-100": "bg-red-100 border-red-200",
    "bg-blue-100": "bg-blue-100 border-blue-200",
    "bg-purple-100": "bg-purple-100 border-purple-200",
  };
  
  const colorClass = colorMap[course.colorTailwind] || `${course.colorTailwind} border-gray-200`;
  
  return {
    id: course.id,
    title: course.title,
    tdGroup: course.tdGroup,
    teacher: course.professor,
    room: course.room,
    startTime,
    endTime,
    date: startDate,
    color: colorClass,
    colorTailwind: course.colorTailwind, // Conserver la couleur de base
    moodleLink: course.moodleUrl,
    homework: course.homework,
  };
};

// Convertir tous les cours MOCK_COURSES
const allCoursesData: Course[] = MOCK_COURSES.map(convertCourseToLocalFormat);

// Cours pour la vue Semaine (structure existante)
const weekCourses: WeekCourse[] = [
  {
    day: "L",
    date: "10",
    courses: [
      { startTime: "08:00", endTime: "11:00", color: "bg-green-300" },
      { startTime: "13:00", endTime: "16:00", color: "bg-orange-300" },
    ],
  },
  {
    day: "M",
    date: "11",
    courses: [
      { startTime: "13:00", endTime: "17:00", color: "bg-yellow-300" },
    ],
  },
  {
    day: "M",
    date: "12",
    courses: [
      { startTime: "09:00", endTime: "12:00", color: "bg-pink-300" },
      { startTime: "13:00", endTime: "16:00", color: "bg-green-300" },
    ],
  },
  {
    day: "J",
    date: "13",
    courses: [
      { startTime: "08:30", endTime: "12:00", color: "bg-yellow-200" },
      { startTime: "13:00", endTime: "16:30", color: "bg-yellow-200" },
    ],
  },
  {
    day: "V",
    date: "14",
    courses: [
      { startTime: "09:00", endTime: "12:00", color: "bg-pink-300" },
      { startTime: "13:00", endTime: "16:00", color: "bg-indigo-300" },
    ],
  },
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

// Heures principales pour la vue Semaine (sans minutes)
const weekTimeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

// Résultats de recherche - utiliser MOCK_COURSES convertis
const searchResults: Course[] = allCoursesData;

export default function PlanningPage() {
  const [mode, setMode] = useState<ViewMode>("Jour");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11, 1)); // Décembre 2024
  const [selectedDay, setSelectedDay] = useState("05");
  const [selectedDate, setSelectedDate] = useState<Date>(INITIAL_DATE);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fonction utilitaire pour comparer deux dates en ignorant l'heure
  const isSameDayUtil = (date1: Date, date2: Date): boolean => {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() === d2.getTime();
  };

  // Filtrer les cours selon le mode et la date sélectionnée
  const filterCourses = (
    mode: ViewMode,
    allCourses: Course[],
    selectedDate: Date
  ): Course[] => {
    if (mode === "Jour") {
      return allCourses.filter((course) => {
        return isSameDayUtil(course.date, selectedDate);
      });
    } else if (mode === "Semaine") {
      // Obtenir les dates de la semaine à partir de selectedDate
      const weekDates = getWeekDates(selectedDate);
      return allCourses.filter((course) => {
        return weekDates.some((day) => isSameDayUtil(course.date, day));
      });
    } else if (mode === "Mois") {
      // Filtrer les cours du mois de selectedDate
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();
      return allCourses.filter((course) => {
        const courseMonth = course.date.getMonth();
        const courseYear = course.date.getFullYear();
        return courseMonth === selectedMonth && courseYear === selectedYear;
      });
    }
    return [];
  };

  // Obtenir les cours filtrés de manière dynamique avec useMemo
  const filteredCourses = useMemo(
    () => filterCourses(mode, allCoursesData, selectedDate),
    [mode, selectedDate]
  );

  // Obtenir les cours du jour sélectionné (pour DayView)
  const dayCourses = useMemo(
    () => filterCourses("Jour", allCoursesData, selectedDate),
    [selectedDate]
  );

  // Obtenir les cours de la semaine (pour WeekView) - basé sur selectedDate
  const weekCoursesData = useMemo(() => {
    const weekDates = getWeekDates(selectedDate);
    return allCoursesData.filter((course) => {
      return weekDates.some((day) => isSameDayUtil(course.date, day));
    });
  }, [selectedDate]);

  // Obtenir l'index du jour de la semaine pour un cours (basé sur selectedDate)
  const getDayIndex = (courseDate: Date): number => {
    const weekDates = getWeekDates(selectedDate);
    return weekDates.findIndex((day) => isSameDayUtil(courseDate, day));
  };

  // Liste de tous les cours pour la navigation
  const getAllCourses = (): Course[] => {
    return allCoursesData;
  };

  // Convertir une heure HH:MM en minutes depuis minuit
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Calculer la position et la hauteur d'un cours en pixels
  const getCoursePosition = (startTime: string, endTime: string) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const dayStartMinutes = timeToMinutes("08:00"); // 8h00 = 480 minutes
    
    // Calculer la position top en pixels
    // top = (startHour - 8) * PIXEL_PER_HOUR + (startMinutes / 60) * PIXEL_PER_HOUR
    const startHour = Math.floor(startMinutes / 60);
    const startMin = startMinutes % 60;
    const topPixels = (startHour - 8) * PIXEL_PER_HOUR + (startMin / 60) * PIXEL_PER_HOUR;
    
    // Calculer la hauteur en pixels
    // height = (durationInMinutes / 60) * PIXEL_PER_HOUR
    const durationInMinutes = endMinutes - startMinutes;
    const heightPixels = (durationInMinutes / 60) * PIXEL_PER_HOUR;

    return { 
      top: `${topPixels}px`, 
      height: `${heightPixels}px`
    };
  };

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
    setIsDropdownOpen(false);
  };

  // Générer le calendrier mensuel (5 semaines, 5 jours par semaine)
  const generateMonthCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Dimanche, 1 = Lundi, etc.

    // Ajuster pour que Lundi = 0
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const weeks: (string | null)[][] = [];
    let currentWeek: (string | null)[] = [];

    // Remplir les jours vides du début
    for (let i = 0; i < adjustedStartingDay; i++) {
      currentWeek.push(null);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day.toString().padStart(2, "0"));
      if (currentWeek.length === 5) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Remplir les jours vides de la fin pour compléter la dernière semaine
    while (currentWeek.length < 5 && currentWeek.length > 0) {
      currentWeek.push(null);
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    // S'assurer d'avoir exactement 5 semaines
    while (weeks.length < 5) {
      weeks.push([null, null, null, null, null]);
    }

    return weeks.slice(0, 5); // Limiter à 5 semaines
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getMonthName = () => {
    return format(currentMonth, "MMMM", { locale: fr });
  };

  // Fonction pour extraire la couleur de fond Tailwind
  const getBackgroundColor = (colorClass: string): string => {
    const match = colorClass.match(/bg-[\w-]+/);
    return match ? match[0] : "bg-pink-50";
  };

  // Fonctions pour gérer le Bottom Sheet
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsBottomSheetOpen(true);
    setIsSheetExpanded(false); // Initialiser en mode compact
    setCurrentY(0);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedCourse(null);
    setIsSheetExpanded(false);
    setCurrentY(0);
  };

  const handleToggleExpand = () => {
    setIsSheetExpanded(!isSheetExpanded);
  };

  // Navigation entre les cours
  const navigateCourse = (direction: "prev" | "next") => {
    const allCourses = getAllCourses();
    if (!selectedCourse) return;
    
    const currentIndex = allCourses.findIndex((c) => c.id === selectedCourse.id);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allCourses.length - 1;
    } else {
      newIndex = currentIndex < allCourses.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedCourse(allCourses[newIndex]);
  };

  // Gestion du glissement pour expansion/contraction et fermeture
  const handleTouchStart = (e: React.TouchEvent) => {
    if (bottomSheetRef.current) {
      const touch = e.touches[0];
      setDragStartY(touch.clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && bottomSheetRef.current) {
      const touch = e.touches[0];
      const deltaY = touch.clientY - dragStartY;
      
      if (isSheetExpanded) {
        // Si étendu, on peut glisser vers le bas pour réduire ou fermer
        if (deltaY > 0) {
          setCurrentY(deltaY);
        }
      } else {
        // Si compact, on peut glisser vers le haut pour agrandir ou vers le bas pour fermer
        if (deltaY < -50) {
          // Glissement vers le haut : agrandir
          setIsSheetExpanded(true);
          setIsDragging(false);
          setCurrentY(0);
        } else if (deltaY > 0) {
          // Glissement vers le bas : fermer
          setCurrentY(deltaY);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      if (isSheetExpanded) {
        // Si étendu et glissé vers le bas de plus de 100px, réduire
        if (currentY > 100) {
          setIsSheetExpanded(false);
          setCurrentY(0);
        } else {
          // Sinon, revenir à la position étendue
          setCurrentY(0);
        }
      } else {
        // Si compact et glissé vers le bas de plus de 100px, fermer
        if (currentY > 100) {
          handleCloseBottomSheet();
        } else {
          // Sinon, revenir à la position initiale
          setCurrentY(0);
        }
      }
      setIsDragging(false);
    }
  };

  // Formatage de l'heure pour l'affichage
  const formatTime = (time: string) => {
    return time.replace(":00", "h");
  };

  // Fonction de filtrage des résultats de recherche
  const getFilteredResults = (): Course[] => {
    if (!searchQuery.trim()) {
      return [];
    }
    const query = searchQuery.toLowerCase().trim();
    return searchResults.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        (course.fullTitle && course.fullTitle.toLowerCase().includes(query)) ||
        course.teacher.toLowerCase().includes(query)
    );
  };

  // Obtenir les dates de la semaine pour le DateNavigator
  const weekDates = getWeekDates(selectedDate);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focuser le champ de recherche quand on entre en mode recherche
  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  return (
    <div className="min-h-screen bg-white">
      {/* App Bar / Header - Fixé en haut */}
      {!isSearching && (
        <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Menu Hamburger - Gauche */}
            <button className="p-2" aria-label="Menu">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            {/* Logo - Centre */}
            <div className="flex-1 flex justify-center">
              <div className="text-[10px] font-semibold text-gray-800 tracking-tight">
                Université Lumière Lyon 2
              </div>
            </div>

            {/* Icônes Recherche et Notification - Droite */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSearching(true);
                  setSearchQuery("");
                }}
                className="p-2"
                aria-label="Recherche"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <button className="p-2" aria-label="Notifications">
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Vue de Recherche */}
      {isSearching && (
        <div className="min-h-screen bg-white">
          {/* En-tête de Recherche */}
          <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-200">
            <div className="flex items-center px-4 py-3">
              {/* Icône de Retour */}
              <button
                onClick={() => {
                  setIsSearching(false);
                  setSearchQuery("");
                }}
                className="p-2 mr-2"
                aria-label="Retour"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>

              {/* Champ de Saisie */}
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un cours"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                autoFocus
              />
            </div>
          </header>

          {/* Contenu Principal - Résultats de recherche */}
          <div className="pt-20 min-h-screen bg-white">
            {searchQuery.trim() ? (
              <div className="px-4 py-4">
                {getFilteredResults().length > 0 ? (
                  <div className="space-y-3">
                    {getFilteredResults().map((course) => (
                      <div
                        key={course.id}
                        onClick={() => {
                          handleCourseClick(course);
                          setIsSearching(false);
                          setSearchQuery("");
                        }}
                        className={`${course.colorTailwind} border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow active:scale-95`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          {/* Date/Mois à gauche */}
                          <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {format(course.date, "d MMM", { locale: fr })}
                          </div>
                          {/* Titre du cours au centre */}
                          <div className="flex-1 text-center px-2">
                            <h3 className="font-bold text-base text-gray-900">
                              {course.title}
                            </h3>
                          </div>
                          {/* Plage horaire à droite */}
                          <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {formatTime(course.startTime)} - {formatTime(course.endTime)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucun résultat trouvé</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-4 py-4">
                {/* Zone vide - en attente de saisie */}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contenu principal avec padding-top pour compenser le header fixe */}
      {!isSearching && (
        <div className="pt-16">
          {/* Ligne de Contrôle - Change selon le mode */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            {/* Gauche : Icône calendrier + Date */}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="font-bold text-gray-900">
                {mode === "Jour"
                  ? format(selectedDate, "EEEE d MMMM", { locale: fr })
                  : mode === "Semaine"
                  ? `${format(weekDates[0], "d", { locale: fr })} - ${format(weekDates[4], "d MMMM", { locale: fr })}`
                  : getMonthName()}
              </span>
            </div>

            {/* Droite : Menu déroulant de sélection de mode */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 rounded-md transition-colors"
              >
                <span className="text-sm font-medium text-pink-700">{mode}</span>
                <svg
                  className={`w-4 h-4 text-pink-700 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Menu déroulant */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleModeChange("Jour")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-pink-50 transition-colors ${
                        mode === "Jour"
                          ? "bg-pink-100 text-pink-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      Jour
                    </button>
                    <button
                      onClick={() => handleModeChange("Semaine")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-pink-50 transition-colors ${
                        mode === "Semaine"
                          ? "bg-pink-100 text-pink-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      Semaine
                    </button>
                    <button
                      onClick={() => handleModeChange("Mois")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-pink-50 transition-colors ${
                        mode === "Mois"
                          ? "bg-pink-100 text-pink-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      Mois
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DateNavigator - Sélecteur de Jour/Date */}
          <div className="flex items-center justify-around px-4 py-3 bg-white border-b border-gray-200">
            {weekDates.map((date, index) => {
              const isActive = isSameDayDate(date, selectedDate);
              // Le surlignage rouge ne s'applique que en mode "Jour"
              const shouldHighlight = isActive && mode === "Jour";
              const dayLabel = format(date, "EEEEE", { locale: fr }); // L, M, M, J, V
              const dayNumber = format(date, "d", { locale: fr });
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center ${
                    shouldHighlight ? "bg-red-500 text-white" : "text-gray-500"
                  } rounded-lg px-3 py-2 min-w-[40px] transition-colors`}
                >
                  <span
                    className={`text-sm font-medium ${
                      shouldHighlight ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {dayLabel}
                  </span>
                  <span
                    className={`text-xs mt-1 ${
                      shouldHighlight ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {dayNumber}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Corps Principal - Trois vues différentes */}
          {mode === "Jour" && (
            /* Vue 'Jour' - Grille horaire verticale avec blocs dimensionnés dynamiquement */
            <div className="relative bg-white">
              <div className="flex">
                {/* Colonne des heures */}
                <div className="w-16 flex-shrink-0 border-r border-gray-200">
                  {HOURS.map((hour) => (
                    <div 
                      key={hour} 
                      className="flex items-start justify-end pr-2 pt-1"
                      style={{ height: `${PIXEL_PER_HOUR}px` }}
                    >
                      <span className="text-xs text-gray-600">
                        {hour.toString().padStart(2, "0")}.00
                      </span>
                    </div>
                  ))}
                </div>

                {/* Zone des cours - Positionnement absolu */}
                <div 
                  className="flex-1 relative" 
                  style={{ minHeight: `${HOURS.length * PIXEL_PER_HOUR}px` }}
                >
                  {/* Lignes horaires */}
                  {HOURS.map((hour) => {
                    const topPixels = (hour - 8) * PIXEL_PER_HOUR;
                    return (
                      <div
                        key={hour}
                        className="absolute left-0 right-0 border-b border-gray-100"
                        style={{ 
                          top: `${topPixels}px`, 
                          height: `${PIXEL_PER_HOUR}px` 
                        }}
                      ></div>
                    );
                  })}

                  {/* Ligne de séparation de midi à 12:30 - Positionnée à 4.5 * PIXEL_PER_HOUR depuis 8h00 */}
                  <div
                    className="absolute left-0 right-0 h-8 bg-red-500 flex items-center justify-center z-10"
                    style={{ top: `${4.5 * PIXEL_PER_HOUR}px` }}
                  >
                    <span className="text-xs font-medium text-white">12:30</span>
                  </div>

                  {/* Blocs de cours avec détails - Positionnement dynamique */}
                  {dayCourses.map((course) => {
                    const position = getCoursePosition(
                      course.startTime,
                      course.endTime
                    );
                    return (
                      <div
                        key={course.id}
                        onClick={() => handleCourseClick(course)}
                        className={`absolute left-2 right-2 ${course.colorTailwind} border rounded-xl shadow-xl cursor-pointer hover:shadow-2xl transition-all`}
                        style={{
                          top: position.top,
                          height: position.height,
                          minHeight: "60px",
                        }}
                      >
                        <div className="flex flex-col h-full p-3">
                          <div className="font-bold text-base text-gray-900 mb-1">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-700 mb-1">
                            {course.teacher}
                          </div>
                          <div className="text-xs text-gray-600 mb-auto">
                            {course.startTime.replace(":", ".")} -{" "}
                            {course.endTime.replace(":", ".")}
                          </div>
                          <div className="text-xs text-gray-600 mt-auto text-right font-medium">
                            {course.room}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {mode === "Semaine" && (
            /* Vue 'Semaine' - Grille horaire hebdomadaire compacte */
            <div className="relative bg-white">
              <div className="flex">
                {/* Colonne des heures */}
                <div className="w-12 flex-shrink-0 border-r border-gray-200">
                  {/* Heures - Format compact (8h, 9h, etc.) */}
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="flex items-start justify-end pr-2 pt-1"
                      style={{ height: `${PIXEL_PER_HOUR}px` }}
                    >
                      <span className="text-xs text-gray-600">{hour}h</span>
                    </div>
                  ))}
                </div>

                {/* Zone de grille principale */}
                <div className="flex-1 relative" style={{ height: "720px" }}>
                  {/* Grille des jours - 5 colonnes */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex">
                    {weekDates.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="flex-1 relative border-r border-gray-200 last:border-r-0"
                        style={{ height: "100%" }}
                      >
                        {/* Lignes horaires */}
                        {HOURS.map((hour) => {
                          const topPixels = (hour - 8) * PIXEL_PER_HOUR;
                          return (
                            <div
                              key={hour}
                              className="absolute left-0 right-0 border-b border-gray-100"
                              style={{
                                top: `${topPixels}px`,
                                height: `${PIXEL_PER_HOUR}px`,
                              }}
                            ></div>
                          );
                        })}

                        {/* Blocs de cours pour ce jour spécifique */}
                        {weekCoursesData
                          .filter((course) => {
                            const courseDayIndex = getDayIndex(course.date);
                            return courseDayIndex === dayIndex;
                          })
                          .map((course) => {
                            const position = getCoursePosition(
                              course.startTime,
                              course.endTime
                            );
                            const topPixels = parseFloat(
                              position.top.replace("px", "")
                            );

                            return (
                              <div
                                key={course.id}
                                onClick={() => handleCourseClick(course)}
                                className={`absolute left-1 right-1 ${course.colorTailwind} rounded cursor-pointer hover:opacity-80 transition-opacity z-20`}
                                style={{
                                  top: `${topPixels}px`,
                                  height: position.height,
                                  minHeight: "20px",
                                }}
                              ></div>
                            );
                          })}
                      </div>
                    ))}
                  </div>

                  {/* Ligne de séparation de midi à 12:30 - Horizontalement sur toute la largeur */}
                  <div
                    className="absolute left-0 right-0 h-8 bg-red-500 flex items-center justify-center z-10"
                    style={{ top: `${4.5 * PIXEL_PER_HOUR}px` }}
                  >
                    <span className="text-xs font-medium text-white">12:30</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {mode === "Mois" && (
            /* Vue 'Mois' */
            <div className="bg-white">
              {/* Grille de calendrier */}
              <div className="px-4 py-4">
                {/* En-têtes des jours */}
                <div className="grid grid-cols-5 gap-1 mb-2">
                  {["L", "M", "M", "J", "V"].map((day, index) => (
                    <div
                      key={index}
                      className="text-center text-sm font-semibold text-gray-700 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Grille des dates */}
                <div className="grid grid-cols-5 gap-1">
                  {generateMonthCalendar().map((week, weekIndex) =>
                    week.map((date, dayIndex) => {
                      if (date === null) {
                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className="aspect-square"
                          ></div>
                        );
                      }
                      const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), parseInt(date));
                      const isSelected = isSameDayDate(dateObj, selectedDate);
                      return (
                        <button
                          key={`${weekIndex}-${dayIndex}`}
                          onClick={() => setSelectedDate(dateObj)}
                          className={`aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                            isSelected
                              ? "bg-red-500 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {date}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Liste des cours du jour sélectionné */}
              {dayCourses.length > 0 && (
                <div className="px-4 py-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {format(selectedDate, "EEEE d MMMM", { locale: fr })}
                  </h3>
                  <div className="space-y-3">
                    {dayCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => handleCourseClick(course)}
                        className={`${course.colorTailwind} border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
                      >
                        <div className="flex flex-col">
                          <div className="font-bold text-base text-gray-900 mb-1">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-700 mb-1">
                            {course.teacher}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">
                              {course.startTime.replace(":", ".")} -{" "}
                              {course.endTime.replace(":", ".")}
                            </span>
                            <span className="text-xs text-gray-600 font-medium">
                              {course.room}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation mois précédent/suivant */}
              <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200 bg-white">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Mois précédent"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <span className="text-sm font-medium text-gray-700">
                  {getMonthName()}
                </span>
                <button
                  onClick={() => navigateMonth("next")}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Mois suivant"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Sheet */}
      {isBottomSheetOpen && selectedCourse && (
        <div
          ref={bottomSheetRef}
          className={`fixed bottom-0 left-0 right-0 ${getBackgroundColor(selectedCourse.colorTailwind)} rounded-t-2xl shadow-2xl z-50 ${isSheetExpanded ? "h-[90vh]" : "h-[45vh]"}`}
          style={{
            transform: `translateY(${currentY}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out, height 0.3s ease-out",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Poignée de glissement */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
          </div>

          {/* En-tête avec bouton fermer */}
          <div className="flex justify-end px-6 pt-2 pb-4">
            <button
              onClick={handleCloseBottomSheet}
              className="p-2 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <svg
                className="w-6 h-6 text-slate-900"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Contenu scrollable */}
          <div className={`px-6 overflow-y-auto ${isSheetExpanded ? "pb-24 h-full" : "pb-4"}`}>
            {/* Titre du cours avec salle */}
            <div className="flex items-start justify-between mb-4 gap-3">
              <h2 className="text-3xl font-bold text-slate-900 flex-1">
                {selectedCourse.title}
                {selectedCourse.tdGroup && ` - ${selectedCourse.tdGroup}`}
              </h2>
              <span className="rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-slate-800 whitespace-nowrap">
                {selectedCourse.room}
              </span>
            </div>

            {/* Heure/Date */}
            <div className="mb-4">
              <p className="text-xl font-semibold text-slate-900">
                {formatTime(selectedCourse.startTime)} - {formatTime(selectedCourse.endTime)}
                {` ${format(selectedCourse.date, "d MMM yyyy", { locale: fr })}`}
              </p>
            </div>

            {/* Professeur et Bouton Contacter */}
            <div className="mb-4">
              <p className="text-base text-slate-800 mb-4">{selectedCourse.teacher}</p>
              <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Contacter
              </button>
            </div>

            {/* Mode Compact : Bouton "Voir plus" */}
            {!isSheetExpanded && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleToggleExpand}
                  className="flex flex-col items-center text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <span className="text-sm font-medium mb-1">Voir plus</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
            )}

            {/* Mode Étendu : Sections supplémentaires */}
            {isSheetExpanded && (
              <>
                {/* Section Devoirs - Carte blanche */}
                <div className="bg-white p-4 rounded-xl shadow-md mb-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Devoirs pour cette séance :
                  </h3>
                  <div className="space-y-3">
                    {selectedCourse.homework && selectedCourse.homework.length > 0 ? (
                      selectedCourse.homework.map((homework, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={homework.isDone}
                              readOnly
                              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              {homework.task}
                            </label>
                          </div>
                          {homework.deadline && !homework.isDone && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                              {format(parseISO(homework.deadline), "d MMM", { locale: fr })}
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Aucun devoir pour cette séance</p>
                    )}
                  </div>
                </div>

                {/* Section Accès Moodle - Carte blanche */}
                <div className="bg-white p-4 rounded-xl shadow-md mb-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Accès au cours sur Moodle
                  </h3>
                  {selectedCourse.moodleLink ? (
                    <a
                      href={selectedCourse.moodleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline hover:text-blue-800 break-words"
                    >
                      {selectedCourse.moodleLink}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">Aucun lien Moodle disponible</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Navigation entre les cours - en bas (visible seulement en mode étendu) */}
          {isSheetExpanded && (
            <div className={`absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-4 ${getBackgroundColor(selectedCourse.colorTailwind)} border-t border-black/10`}>
              <button
                onClick={() => navigateCourse("prev")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 transition-colors"
                aria-label="Cours précédent"
              >
                <svg
                  className="w-5 h-5 text-slate-900"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <span className="text-sm font-medium text-slate-900">
                {(() => {
                  const allCourses = getAllCourses();
                  const currentIndex = allCourses.findIndex((c) => c.id === selectedCourse.id);
                  return `${currentIndex + 1} / ${allCourses.length}`;
                })()}
              </span>
              <button
                onClick={() => navigateCourse("next")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 transition-colors"
                aria-label="Cours suivant"
              >
                <svg
                  className="w-5 h-5 text-slate-900"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
