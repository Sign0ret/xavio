"use client";
import React, { useState, useEffect } from "react";
import { SearchBar } from "@/components/components/searchbar";
import { Card } from "@/components/components/card";
import { TypewriterEffectSmoothDemo } from "@/components/components/typperdemo";
import WelcomeText from "@/components/components/welcome-text";
import Footer from "@/components/components/landing_footer";
import { BackgroundBeams } from "@/components/ui/background-gradient-animation";
import { TCourse } from "@/models/Course";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Home() {
  const user = useCurrentUser(); // Get user from a client component 
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/ai`; // not authenticated user 
      if (user && user.id) {
        url = `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/${user.id}/ai`; // authenticated user 

      }
      let res = await fetch(url);
      let data = await res.json();
      console.log(data.length)
      if(!data.length){
        console.log("User without courses")
        url = `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/ai`; // authenticated user without courses 
        res = await fetch(url);
        data = await res.json(); 
      }
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

  const handleSubscribe = async (courseId: string) => {
    if(!user){
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${courseId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ member: user.id })
      });
  
      if (!res.ok) {
        throw new Error('Subscription failed');
      }
  
      // Update the courses state to reflect the subscription
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === courseId
            ? {
                ...course,
                members: [
                  ...course.members,
                  { _id: user.id, member: user.id, admin: false } // Added _id field here
                ]
              }
            : course
        )
      );
    } catch (error) {
      setError("Error subscribing to course");
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
          <Card courses={courses} onSubscribe={handleSubscribe} userId={user ? user.id : null} />
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
