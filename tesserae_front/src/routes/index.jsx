import { Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";

const Navigator = clientOnly(() => import("~/components/navigator"));
const Highlights = clientOnly(() => import("~/components/stories-highlights"));

export default function Home() {
  return (
    <main>
      <Title>Tesserae - Home</Title>
      <Navigator />
      <div>
        <Highlights />
      </div>
    </main>
  );
}
