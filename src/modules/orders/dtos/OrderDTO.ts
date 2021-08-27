export default interface OrderDTO {
  id: string;
  name: string;
  room: string;
  unimedProtocol: string;
  unimedCard: string;
  typeOfHospitalization: string;
  sex: string;
  requesterId: string;
  authorizer_id?: string;
}
