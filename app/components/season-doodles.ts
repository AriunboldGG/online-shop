import type { SeasonId } from "@/lib/catalog";
import {
  DoodleAcorn,
  DoodleBlossom,
  DoodleBreath,
  DoodleLeaf,
  DoodleMitten,
  DoodlePopsicle,
  DoodleRain,
  DoodleSnowflake,
  DoodleSprout,
  DoodleSun,
  DoodleWave,
  DoodleWind,
} from "./doodles";

type Doodle = typeof DoodleSun;

// Each line owns its marks outright: a signature plus two companions, none shared between seasons.
export const seasonDoodles: Record<SeasonId, { signature: Doodle; companions: [Doodle, Doodle] }> = {
  spring: { signature: DoodleBlossom, companions: [DoodleSprout, DoodleRain] },
  summer: { signature: DoodleSun, companions: [DoodleWave, DoodlePopsicle] },
  autumn: { signature: DoodleLeaf, companions: [DoodleAcorn, DoodleWind] },
  winter: { signature: DoodleSnowflake, companions: [DoodleMitten, DoodleBreath] },
};
