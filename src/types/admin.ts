
export type User = {
  id: number;
  name: string;
  email: string;
  farmSize: string;
  location: string;
  status: string;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  youtubePlaylistUrl?: string;
};

export type Analytic = {
  id: number;
  metric: string;
  value: number;
  period: string;
  trend: string;
};

export type NewUser = Partial<User>;
export type NewCourse = Partial<Course>;
export type NewAnalytic = Partial<Analytic>;
