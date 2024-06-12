"use client"
import React, { useState, useEffect } from "react";
import { SearchBar } from "@/components/components/searchbar";
import { Card } from "@/components/components/card";
import { TypewriterEffectSmoothDemo } from "@/components/components/typperdemo";
import WelcomeText from "@/components/components/welcome-text";
import Footer from "@/components/components/landing_footer";
import { BackgroundBeams } from "@/components/ui/background-gradient-animation";
import { currentUser2 } from "@/lib/auth";
import { TCourse } from "@/models/Course";

export default function Home() {
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchCourses = async () => {
    const user =  await currentUser2(); // Assuming currentUser is a function that retrieves the current user
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/ai`;
      if (user && user.id) {
        url = `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/${user.id}/ai`;
      }
      const res = await fetch(url);
      const data = await res.json();
      console.log("Courses: ",data)
      setCourses(data);
    } catch (error) {
      setError("Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/search/${query}`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      setError("Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <TypewriterEffectSmoothDemo />
      <div className="flex max-w-[300px] mx-auto justify-center items-center">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mx-auto w-full sm:w-full md:w-[95%] lg:w-[90%] mt-16">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Card courses={courses} />
        )}
      </div>
      <BackgroundBeams />
      <div className="mx-auto w-full sm:w-full md:w-[100%] lg:w-[100%] ">
        <WelcomeText />
        <Footer />
      </div>
  </div>
  );
}