import { getUser, getAuthenticatedNetwork, checkUsernameOwnership } from "/src/utils/api.js";
import { createSignal, createEffect, onCleanup, Show, onMount } from "solid-js"
import { Button } from "@/components/ui/button";
import ProfileNotFound from "./ProfileNotFound";


export default function Profile({ username }) {
  let [hasLoaded, setHasLoaded] = createSignal(true);
  let [profile, setProfile] = createSignal({});
  let [fullName, setFullName] = createSignal("");
  let [isOwner, setisOwner] = createSignal(false);
  let [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    setIsClient(true);
  });

  // Get profile data 
  createEffect(() => {
    if (!isClient()) return;
    
    const controller = new AbortController();

    (async () => {
      try {
        const network = getAuthenticatedNetwork();
        const response = await network.get("profile", {
          params: { username },
          signal: controller.signal
        });

        if (response.status === 200) {
          setProfile(response.body.profile);
          setFullName(profile().fullname);
          const isOwner = await checkUsernameOwnership(username);
          setisOwner(isOwner);
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
      <Show when={hasLoaded()} fallback={<ProfileNotFound/>}>
        <div className="w-full h-[10%] flex flex-col justify-start 
      items-start p-10 bg-gray-100 gap-5">
          <div className="bg-gray-200 rounded-full h-[3vw] w-[3vw] "> </div>
          {fullName()}
          <Show when={isOwner()}>
            <div className="flex w-full flex-col">
              <Button className="pl-[2%] pr-[2%] w-[8%]">Edit profile</Button>
            </div>
          </Show>
        </div>
      </Show>
    </section>
  );
}
