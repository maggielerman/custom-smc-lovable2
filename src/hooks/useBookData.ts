import { useState } from "react";

const initialBookData = {
  title: "",
  familyStructure: "",
  familyMembers: [],
  childName: "",
  childAge: "",
  childGender: "",
  selectedIllustrations: {},
  dedication: "",
};

export function useBookData(initial?: any) {
  const [bookData, setBookData] = useState(initial || initialBookData);

  const updateField = (field: string, value: any) => {
    setBookData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { bookData, setBookData, updateField };
} 