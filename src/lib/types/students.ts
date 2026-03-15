// Student Types
export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  nic: string;
  dob: string;
  address: string;
  phone_number: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface StudentCourse {
  id: string;
  student_id: string;
  course_id: string;
  payment_status: string;
  course_status: string;
  created_at?: string;
  updated_at?: string;
}
