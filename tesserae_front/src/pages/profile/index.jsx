export default function Profile({ username }) {
  return (
    <section>
      <div className="w-full h-[10%] flex justify-start 
      items-center p-10 bg-gray-100 gap-5 mt-[10%]">
        <div className="bg-gray-200 rounded-full h-[3vw] w-[3vw] "> </div>
        {username}
      </div>
    </section>
  );
}
