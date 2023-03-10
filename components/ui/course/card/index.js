import Image from "next/image";
import Link from "next/link";

export default function Card({ course }) {
  return (
    <div
      key={course.id}
      className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div className="flex w-full">
        <div className="flex w-full">
          <Image
            className="object-cover"
            src={course.coverImage}
            width="300"
            height="300"
            alt={course.title}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            rel="noreferrer"
          >
            {course.title}
          </Link>
          <p className="mt-2 text-gray-500">{course.description}</p>
        </div>
      </div>
    </div>
  );
}
