import { Card } from "@/components/components/card";
import Footer from "@/components/components/landing_footer";
import { BackgroundGradientDemo1 } from "@/components/components/searchbar";
import { TypewriterEffectSmoothDemo } from "@/components/components/typperdemo";
import WelcomeText from "@/components/components/welcome-text";
import { BackgroundBeams } from "@/components/ui/background-gradient-animation";
import { currentUser } from "@/lib/auth";
import { TCourse } from "@/models/Course";

import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})
 


export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return;
  }
  try {
    const fetchCourses = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/${user.id}/ai`);
      const courses = await res.json();
      console.log(courses)
      return courses;
    }
    const courses: TCourse[] = await fetchCourses();
    console.log({courses})
    if (!courses) {
      return (
        <div>ERROR FETCHING THE COURSES</div>
      )
    }
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <TypewriterEffectSmoothDemo/>
        <div className="flex max-w-[300px] mx-auto justify-center items-center">
          <BackgroundGradientDemo1/>  
        </div>
        <div className="mx-auto w-full sm:w-full md:w-[95%] lg:w-[90%] mt-16">
          <Card courses={courses}/>
        </div>
        <div >
            {user?.id ? (
              <>
               <BackgroundBeams/>
               <div  className="mx-auto w-full sm:w-full md:w-[100%] lg:w-[100%] ">
                  <Footer/>
               </div>
              </>
            ) : (
              <>
                <BackgroundBeams/>
               <div  className="mx-auto w-full sm:w-full md:w-[100%] lg:w-[100%] ">
                  <WelcomeText/>
                  <Footer/>
               </div>
              </>
            )}
          </div>
      </div>
    );
  } catch(err:any) {
    return (
      <div>
        Error Fetching Quiz {user.id}
      </div>
    )
  }
  
}
