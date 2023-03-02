import dayjs from 'dayjs';

export interface CredentialsType {
  email: string;
  password: string;
}

export interface UserType {
  id?: string;
  name: string;
  idNumber?: string;
  password?: string;
  passwordHash?: string;
  createTime?: number[];
  updateTime?: number[];
  available?: boolean;
}

export interface Administrator extends UserType {
  email: string;
}

export interface OrganizationType {
  id: string;
  name: string;
  createTime?: number[];
  updateTime?: number[];
}

export interface ExaminationType {
  id?: string;
  title: string;
  beginTime: string | dayjs.Dayjs;
  endTime: string | dayjs.Dayjs;
  teacherId?: string;
  uncoiling: boolean;
  createTime?: number[];
  updateTime?: number[];
  paper?: PaperType;
  group?: GroupType;
  available?: boolean;
  duration: number;
  visible: boolean;
  extend?: ExaminationExtendType[];
  grades?: GradeType[];
}

export interface ExaminationExtendType {
  id: string;
  studentId: string;
  number: number;
  answer: number[];
  examinationId: string;
  createTime: number[];
  updateTime: number[];
}

export interface GradeType {
  id: string;
  student: StudentType;
  score: number;
  createTime: number[];
  updateTime: number[];
  examinationId: string;
}

export interface GroupType {
  id?: string;
  title: string;
  createTime?: number[];
  updateTime?: number[];
  available?: boolean;
  teacherId?: string;
  students?: StudentType[];
}

export interface PaperType {
  id?: string;
  title: string;
  teacher?: TeacherType;
  openness: boolean;
  createTime?: number[];
  updateTime?: number[];
  available?: boolean;
  extend?: PaperExtendType[];
}

export interface PaperExtendType {
  id: string;
  paperId: string;
  number: number;
  question: QuestionType;
  score: number;
}

export interface QuestionType {
  id?: string;
  title: string;
  questionType: QType;
  answer: number[];
  teacher?: TeacherType;
  createTime?: number[];
  updateTime?: number[];
  openness: boolean;
  available?: boolean;
}

export type QType = 'Single' | 'Multiple' | 'Judgment';

export interface StudentType extends UserType {
  universityId: string;
  academyId: string;
  majorId: string;
  enrollYear: number;
  number: string;
  groups: GroupType[];
}

export interface TeacherType extends UserType {
  universityId?: string;
  academyId?: string;
  email: string;
  number: string;
  audit?: boolean;
}

export interface QuestionTitleType {
  title: string;
  options: OptionType[];
}

export interface OptionType {
  index: number;
  option: string;
}
