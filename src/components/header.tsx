import Image from "next/image";

export function Header() {
  return (
    <div>
      <Image
        src={"/Open-Mic_Text_Color-Logo.png"}
        width={2800}
        height={374}
        alt="Open Mic"
      />
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
