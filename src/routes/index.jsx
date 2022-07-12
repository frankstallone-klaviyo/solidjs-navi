import { Link } from "solid-app-router";
export default function Home() {
  return (
    <>
        <p class="mt-8">
          Visit{" "}
          <Link
            href="https://solidjs.com"
            target="_blank"
            class="text-sky-600 hover:underline"
          >
            solidjs.com
          </Link>{" "}
          to learn how to build Solid apps.
        </p>
        <p class="my-4">
          <span>Home</span>
          {" - "}
          <Link href="/about" class="text-sky-600 hover:underline">
            About Page
          </Link>{" "}
        </p>
    </>
  );
}
