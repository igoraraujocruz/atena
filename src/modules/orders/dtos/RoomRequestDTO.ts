export default interface RoomRequestDTO {
  id: string;
  room: string;
  order_id: string;
  isClean: boolean;
  hotel_management_user_id?: string;
  user_id: string;
  message?: string;
}
