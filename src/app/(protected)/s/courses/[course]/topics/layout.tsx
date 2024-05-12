export default function TopicsCourseLayout({
  children,
  params, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: {
    course: string;
  };
}) {
  return (
    <div className="h-screen w-full">
        <div>
          {children}
        </div>
    </div>
  );
}
