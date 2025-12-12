import {getUser} from "/src/utils/api.js";

export default function Profile({ username }) {
    const userData = getUser();
    console.log(userData);

  return (
    <section>
        {/* Empty div to amount for navigator coverage */}
        <div className="pt-[6%]"> </div>
      <div className="w-full h-[10%] flex justify-start 
      items-center p-10 bg-gray-100 gap-5">
        <div className="bg-gray-200 rounded-full h-[3vw] w-[3vw] "> </div>
        {username}
      </div>
    </section>
  );
}
