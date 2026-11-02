"use client";

import Image from "next/image";
import Link from "next/link";
import { getSeason, type SeasonId } from "@/lib/catalog";
import { DoodleLoop, DoodleSpark, DoodleStar } from "./doodles";
import { WireLine } from "./drop-line";
import { Clip, Wire } from "./hanging-product";
import { LineBadge, Sample } from "./signage";

type Frame = { title: string; season: SeasonId; images: [string, string]; Doodle: typeof DoodleSpark };

const frames: Frame[] = [
  { title: "Намрын амралтын өдөр", season: "autumn", images: ["/products/photos/knit-sweater.jpg", "/products/photos/lounge-chair.jpg"], Doodle: DoodleSpark },
  { title: "Өвлийн өглөө", season: "winter", images: ["/products/photos/puffer-jacket.jpg", "/products/photos/ankle-boots.jpg"], Doodle: DoodleStar },
  { title: "Гэрийн дулаан орой", season: "winter", images: ["/products/photos/mug-set.jpg", "/products/photos/house-slippers.jpg"], Doodle: DoodleLoop },
  { title: "Хаврын алхалт", season: "spring", images: ["/products/photos/light-jacket.jpg", "/products/photos/canvas-sneakers.jpg"], Doodle: DoodleSpark },
  { title: "Зуны тагт", season: "summer", images: ["/products/photos/side-table.jpg", "/products/photos/floor-lamp.jpg"], Doodle: DoodleStar },
  { title: "Намрын ном унших булан", season: "autumn", images: ["/products/photos/floor-lamp.jpg", "/products/photos/wool-blanket.jpg"], Doodle: DoodleLoop },
];

// Each look is a wide print held on the line by two pegs: the pair of pieces on the season's soft
// tone, the look's name written on the print's bottom strip. The print opens that season.
function HangingLook({ frame, index }: { frame: Frame; index: number }) {
  const { title, season, images, Doodle } = frame;
  const s = getSeason(season);
  return (
    <figure className="hang group relative w-full px-3 sm:px-5">
      <Wire clips={2} />
      <div className="hang-swing relative origin-top">
        <Clip className="left-[18%]" />
        <Clip className="left-[82%]" />
        <div className="hang-print relative mt-4 rounded-md border-[3px] border-ink bg-paper p-2 sm:p-2.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]" style={{ background: s.soft }}>
            <div aria-hidden="true" className="absolute inset-x-0 bottom-[20%] h-3" style={{ background: s.color }} />
            <Image
              src={images[0]}
              alt=""
              width={400}
              height={400}
              unoptimized
              draggable={false}
              className="absolute left-[7%] top-[9%] aspect-square w-[60%] rounded-xl border-[3px] border-ink object-cover"
              style={{ rotate: index % 2 ? "-5deg" : "4deg" }}
            />
            <Image
              src={images[1]}
              alt=""
              width={400}
              height={400}
              unoptimized
              draggable={false}
              className="absolute bottom-[7%] right-[6%] aspect-square w-[48%] rounded-xl border-[3px] border-ink object-cover"
              style={{ rotate: index % 2 ? "3deg" : "-2deg" }}
            />
            <Doodle className="absolute bottom-7 left-5 w-12" />
            <Sample className="absolute left-3 top-3 bg-paper">Жишээ зураг</Sample>
          </div>
          <figcaption className="flex min-h-14 items-center gap-2.5 px-1 pt-2.5 pb-1">
            <LineBadge season={season} size={26} />
            <Link
              href={`/season/${season}`}
              className="min-w-0 font-display text-base font-bold leading-tight no-underline after:absolute after:inset-0 hover:underline"
            >
              {title}
            </Link>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

export function Lookbook() {
  return (
    <section aria-labelledby="lookbook-title" className="overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="lookbook-title" className="font-display text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
          Хосломол
        </h2>
        <p className="mt-2 max-w-[52ch] text-ink-soft lg:mt-3 lg:text-lg">Улирал бүрийн хослолыг чирж, гүйлгэж үзээрэй.</p>
      </div>

      <div className="mt-10 lg:mt-14">
        <WireLine
          label="Хослолууд"
          itemClassName="w-[80vw] max-w-[22rem] md:w-80"
          prevLabel="Өмнөх хослол"
          nextLabel="Дараагийн хослол"
        >
          {frames.map((frame, i) => (
            <HangingLook key={frame.title} frame={frame} index={i} />
          ))}
        </WireLine>
      </div>
    </section>
  );
}
