import { createSignal } from "solid-js";


export default function Highlights() {
    const [posts, setPosts] = createSignal([]);



    return (
    <section className="w-screen h-screen
    flex">
        <div className="bg-gray-100 w-[50%]"></div>
        <div className="w-[50%]">
            <For each={posts()}>
                {post => 
                <li>
                    {post.title}
                    {post.description}      
                </li>}
            </For>
        </div>
    </section>
    );
}