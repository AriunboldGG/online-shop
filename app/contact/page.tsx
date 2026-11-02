import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Холбоо барих — Online Shop",
};

export default function ContactPage() {
  return (
    <InfoPage
      stop="contact"
      title="Холбоо барих"
      lead="Утас, имэйл, хаягийн мэдээллийг дэлгүүр удахгүй нэмнэ."
      sections={[
        { title: "Утас", pending: true },
        { title: "Имэйл", pending: true },
        { title: "Хаяг ба цагийн хуваарь", pending: true },
        { title: "Сошиал хуудас", pending: true },
      ]}
    />
  );
}
