export type Region = "ub" | "countryside";
export type MethodId = "ub-courier" | "countryside-post" | "pickup";

export const districts = [
  "Багануур",
  "Багахангай",
  "Баянгол",
  "Баянзүрх",
  "Налайх",
  "Сонгинохайрхан",
  "Сүхбаатар",
  "Хан-Уул",
  "Чингэлтэй",
];

export const aimags = [
  "Архангай",
  "Баян-Өлгий",
  "Баянхонгор",
  "Булган",
  "Говь-Алтай",
  "Говьсүмбэр",
  "Дархан-Уул",
  "Дорноговь",
  "Дорнод",
  "Дундговь",
  "Завхан",
  "Орхон",
  "Өвөрхангай",
  "Өмнөговь",
  "Сүхбаатар",
  "Сэлэнгэ",
  "Төв",
  "Увс",
  "Ховд",
  "Хөвсгөл",
  "Хэнтий",
];

// Example delivery terms only. The shop has not set real methods, fees or times yet.
export const deliveryMethods: {
  id: MethodId;
  name: string;
  detail: string;
  fee: number;
  regions: Region[];
}[] = [
  { id: "ub-courier", name: "Улаанбаатар хотод хүргэх", detail: "Хаягаар хүргэнэ", fee: 5000, regions: ["ub"] },
  { id: "countryside-post", name: "Орон нутаг руу илгээх", detail: "Аймгийн төв рүү илгээнэ", fee: 15000, regions: ["countryside"] },
  { id: "pickup", name: "Очиж авах", detail: "Авах цэгийн хаяг тодорхойгүй", fee: 0, regions: ["ub", "countryside"] },
];

export const lowestDeliveryFee = Math.min(...deliveryMethods.filter((m) => m.fee > 0).map((m) => m.fee));
