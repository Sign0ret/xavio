export default function QuizClaseLayout({
    children,
  }: {
    children: React.ReactNode,
    params: { 
        course: string,
        topic: string,
    }
  }) {
    return (
      <div className="h-screen w-full pt-20 bg-zinc-900 overflow-y-hidden ">
        {children}
      </div>
    )
}