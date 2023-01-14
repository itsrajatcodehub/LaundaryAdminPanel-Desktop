
type address = {
  addressLineOne:string;
  addressLineTwo:string;
  city:string;
  state:string;
  zipCode:string;
  locality:string;
}

export type Bookings = {
  id?: string;
  userId?: string;
  altPhone?: string;
  address: address; 
  created?: any;
  total?: number;
  noOfKgs?: number;
  deliveryUserId?: string;
  items?:DeliveryItem[];
  services?:('wash'|'wash&Iron'|'dryClean'|'Iron')[];
  deliveryTime?:any;
  pickupTime?:any;
  estimatedDeliveryTime?:any;
  otp?:number;
  status?:'pending'|'accepted'|'pickedUp'|'delivered'|'cancelled';
  billingSummary?:BillingSummary;
};

export type DeliveryItem = {
  itemId:string;
  itemName:string;
  itemPrice:number;
  itemQuantity:number;
  service:'wash'|'wash&Iron'|'dryClean'|'Iron';

}

export type BillingSummary = {
  total:number;
  discount:number;
  tax:number;
  grandTotal:number;
  paymentMode:'cash'|'card'|'wallet'|'upi'|'paytm'|'phonePe'|'googlePay'|'other';
  transactionId:string;
}