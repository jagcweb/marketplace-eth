import { Modal } from "@components/ui/common";
import {
  CourseHero,
  CourseKeypoints,
  CourseCurriculum,
} from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useRouter } from "next/router";

export default function Course() {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = getAllCourses();
  const currentCourse = data.find((course) => course.slug === slug);

  return (
    <>
      {currentCourse ? (
        <>
          <div className="py-4">
            <CourseHero course={currentCourse} />
          </div>
          <CourseKeypoints course={currentCourse} />
          <CourseCurriculum course={currentCourse} />
          <Modal />
        </>
      ) : (
        "error 404"
      )}
    </>
  );
}

Course.Layout = BaseLayout;
