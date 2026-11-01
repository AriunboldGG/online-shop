import type { Metadata } from "next";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = {
  title: "Захиалга — Online Shop",
  description: "Холбоо барих мэдээлэл, хүргэлтийн хаяг, хүргэлтийн аргаа нэг хуудсанд оруулна.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
