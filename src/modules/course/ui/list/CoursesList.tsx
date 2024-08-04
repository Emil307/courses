import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CourseCard, useCourseStore, getCourses } from "@/modules/course";
import { ICourse } from "@/shared";

export const CoursesList: React.FC = () => {
  const courses = useCourseStore((state) => state.courses);
  const setCourses = useCourseStore((state) => state.setCourses);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetCourses();
  }, []);

  function handleGetCourses() {
    setIsLoading(true);
    getCourses()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((e) => {
        toast.error(
          e.response.data.detail.msg ||
            "Упс... кажется, что-то сломалось :( Мы уже работаем над этим"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 w-fit mx-auto">
      {isLoading && <></>}
      {courses &&
        courses.map((course: ICourse) => (
          <CourseCard course={course} key={course.id} />
        ))}
    </div>
  );
};
