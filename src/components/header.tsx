import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export function Header() {
  return (
    <div>
      <Image
        src={"/Open-Mic_Text_Color-Logo.png"}
        width={2800}
        height={374}
        alt="Open Mic"
      />
      <div className="mb-8 flex justify-center">
        <Link
          href={"/info"}
          className="text-2xl border-2 border-slate-700 rounded-xl p-2"
        >
          Details about OpenMic signup & policies
        </Link>
      </div>
      <div className="flex flex-col gap-2 mx-12">
        <p className="font-semibold text-lg">OpenMic: MONDAYS 6pm-11</p>
        <p className="text-md">
          (Signup via text on SUNDAYS at NOON: (651-334-3433){" "}
        </p>
        <p className="font-semibold text-lg">
          Artist Showcase: TUESDAYS 7pm-9:30
        </p>
        <p className="text-md">
          Both events weekly at Sociable Cider in NE MPLS
        </p>
      </div>
    </div>
  );
}

export function HeaderSlim() {
  return (
    <div>
      <Image
        src={"/Open-Mic_Text_Color-Logo.png"}
        width={2800}
        height={374}
        alt="Open Mic"
      />
    </div>
  );
}
