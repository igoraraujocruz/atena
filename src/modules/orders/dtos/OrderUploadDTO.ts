export default interface OrderUploadDTO {
  id: string;
  file?: string;
  name: string;
  order_id: string;
  user_id: string;
  url: string;
  message?: string;
}
