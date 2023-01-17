import courses from "./index.json";

export const getAllCourses = () => {
    const courseMap = courses.reduce((acc, course, i) => {
        acc[course.id] = course;
        acc[course.id].index = i;
        return acc;
    }, {})
    return {
        data: courses,
        courseMap,
    }
}