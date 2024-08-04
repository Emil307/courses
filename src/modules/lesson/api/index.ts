import axios from "axios";

const API = "https://aso-course.big-nose.ru";

export const getLessons = async (blockId: number) => {
  const res = await axios({
    url: `${API}/api/course/block/lessons?block_id=${blockId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
    },
  });

  return res;
};

export const getLessonById = async (lessonId: number) => {
  const res = await axios({
    url: `${API}/api/course/block/lesson?lesson_id=${lessonId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
    },
  });

  return res;
};
