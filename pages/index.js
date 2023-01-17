import { useWeb3 } from "@components/providers";
import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Home({courses}) {
  const { web3, isLoading, } = useWeb3();
  return (
    <>
      { isLoading ? "Loading web3..." : web3 ? "Web3 Ready!" : "Please install Metamask"}
      <Hero />

      <CourseList courses={courses} />
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data
    },
  };
}

Home.Layout = BaseLayout;