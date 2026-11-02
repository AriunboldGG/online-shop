import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Буцаалт — Online Shop",
};

export default function ReturnsPage() {
  return (
    <InfoPage
      stop="returns"
      title="Буцаалт"
      lead="Буцаалт, солилтын нөхцөлийг дэлгүүр одоогоор тогтоож байна."
      sections={[
        { title: "Хэдэн хоногийн дотор буцаах вэ", pending: true },
        { title: "Ямар бараа буцаах боломжтой вэ", pending: true },
        { title: "Хэмжээ солих", pending: true },
        { title: "Мөнгө хэрхэн буцаах вэ", pending: true },
      ]}
    />
  );
}
