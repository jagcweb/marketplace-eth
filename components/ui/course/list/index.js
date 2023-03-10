import Image from "next/image";
import Link from "next/link";
import CourseCard from "@components/ui/course/card";

export default function List({courses}) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  );
}
