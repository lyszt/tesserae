import { getUser, getAuthenticatedNetwork } from "/src/utils/api.js";
import { createSignal, createEffect, onCleanup } from "solid-js"
import { Button } from "@/components/ui/button";


export default function Profile() {
  const userData = getUser();
  const userId = userData?.id;
  const username = userData?.username;
  let [hasLoaded, setHasLoaded] = createSignal(true);
  let [profile, setProfile] = createSignal({});
  let [fullName, setFullName] = createSignal("");


  // console.log(userData);

  // Get profile data 
  createEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const network = getAuthenticatedNetwork();
        const response = await network.get("profile", {
          params: { userId },
          signal: controller.signal
        });

        if (response.status === 200) {
          setProfile(response.body.profile);
          setFullName(profile().fullname);
          // console.log(response.body);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log(error);
          setHasLoaded(false);
        }
      }
    })();

    onCleanup(() => controller.abort());
  });


  return (
    <section>
      <div className="pt-[6%]"> </div>
      {hasLoaded() ?

        <div className="w-full h-[10%] flex justify-start 
      items-center p-10 bg-gray-100 gap-5">
          <div className="bg-gray-200 rounded-full h-[3vw] w-[3vw] "> </div>
          {fullName()}
        </div>
        : <span>Failed to load profile. </span>

      }

    </section>
  );
}
