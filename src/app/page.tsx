import Register from "./register/page";

export default function Home() {

  return (
    <main>
      <section
        className={` text-black  bg-[url('/register.webp')] bg-cover bg-no-repeat`}
      >

        <Register />
      </section>
    </main>
  );
}
