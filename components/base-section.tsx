

export default function BaseSection() {
  return (
    <section className=" pb-20 w-full min-h-screen bg-[--background-primary-color] flex flex-col md:flex-row items-center justify-center gap-8"
    >
        <div className="w-full min-h-screen mx-auto flex items-center justify-between px-4 md:px-6 py-20"
        style={{ backgroundImage: "url('/main-no-logo.png')" , backgroundSize: 'cover', backgroundPosition: 'center' }}>

        </div>
      
     
    </section>
  );
}