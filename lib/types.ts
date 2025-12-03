export interface Course {
  id: string;
  title: string;
  professor: string;
  room: string;
  startTime: string; // Format ISO AAAA-MM-JJTHH:MM:SS
  endTime: string; // Format ISO AAAA-MM-JJTHH:MM:SS
  colorTailwind: string; // Classe Tailwind pour la couleur du bloc
  tdGroup: string;
  moodleUrl: string;
  homework: {
    task: string;
    isDone: boolean;
    deadline: string | null;
  }[];
}

