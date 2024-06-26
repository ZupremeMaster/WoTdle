import { Show, createMemo } from "solid-js";
import { HintPanel } from "./HintPanel";
import { usePersistedData } from "@/stores/wotdlePersistedDataStore";
import * as m from "@/paraglide/messages.js";
import { splitInto2Lines } from "@/utils/splitInto2Lines";
import { twMerge } from "tailwind-merge";

const PromptPanel = () => {
  const [data] = usePersistedData();
  const title = createMemo(() => {
    const data = splitInto2Lines(m.prompt_title(), 50);
    if (data.length === 1) return <h3>{data.at(0)}</h3>;
    else
      return (
        <>
          <h3 class="-my-1 pt-1">{data.at(0)}</h3>
          <h3>{data.at(1)}</h3>
        </>
      );
  });

  return (
    <div class="w-full sm:w-[450px] px-4 grid items-center bg-neutral-900 rounded border-neutral-600 border p-4 ">
      <div class="text-xl text-center">{title()}</div>
      <Show
        when={data.dailyVehicleGuesses.length > 0}
        fallback={
          <span class="text-center pt-2 font-thin text-neutral-200">
            {m.prompt_content()}
          </span>
        }
      >
        <HintPanel />
      </Show>
    </div>
  );
};

export default PromptPanel;
