export class Sessions {
  id: number;
  date: Date;
  start: string;
  finish: string;
  customerName: string;
  photographerName: string;
  price: number;
  hours: number;
  deposit: number;
  depositPaid: boolean;
  pricePaid: boolean;
  caseClosed: boolean;
  canceled: boolean;
  packType: string;
  payType: string;
  depositAnswer: string;
  priceAnswer: string;
  packName: string;
  payName: string;
  userId: string;
}

export enum PackTypesRu {
  Simple = 'Обычный',
  PhotoDay = 'Дневное Фото',
  PhotoTest = 'Тестовое Фото',
}

export enum PayTypesRu {
  Bank = 'Банк',
  Cash = 'Наличные',
}
