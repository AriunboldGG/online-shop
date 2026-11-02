import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Хүргэлт — Online Shop",
};

export default function ShippingPage() {
  return (
    <InfoPage
      stop="shipping"
      title="Хүргэлт"
      lead="info Хүргэлтийн нөхцөл удахгүй тодорхой болно."
      sections={[
        { title: "Хаана хүргэх вэ", pending: true },
        { title: "Хэд хоног болох вэ", pending: true },
        { title: "Хүргэлтийн төлбөр", pending: true },
        {
          title: "Очиж авах",
          pending: true,
          body: <p>Захиалгын үед очиж авахыг сонгож болно. Хаяг, цагийн хуваарь тодорхой болмогц энд нэмнэ.</p>,
        },
      ]}
    />
  );
}
