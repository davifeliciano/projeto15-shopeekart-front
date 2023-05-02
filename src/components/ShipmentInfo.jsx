import styled from "styled-components";

const ShipmentInfo = ({ shipmentInfo }) => {
  return (
    <>
      <Container>
        <ShipInfoRow>
          <span className="title">To: </span>
          <span>{`${shipmentInfo.firstName} ${shipmentInfo.lastName}`}</span>
        </ShipInfoRow>
        <ShipInfoRow>
          <span className="title">CPF: </span>
          <span>{shipmentInfo.cpf}</span>
        </ShipInfoRow>
        <ShipInfoRow>
          <span className="title">Phone: </span>
          <span>{shipmentInfo.phone}</span>
        </ShipInfoRow>
        <ShipInfoRow>
          <span className="title">Address: </span>
          <span>{shipmentInfo.address}</span>
        </ShipInfoRow>
        <ShipInfoRow>
          <span className="title">City: </span>
          <span>{shipmentInfo.city}</span>
        </ShipInfoRow>
        <ShipInfoRow>
          <span className="title">UF: </span>
          <span>{shipmentInfo.uf}</span>
        </ShipInfoRow>
        <ShipInfoRow>
          <span className="title">Country: </span>
          <span>{shipmentInfo.country}</span>
        </ShipInfoRow>
        <ShipInfoRow>
          <span className="title">Postal Code: </span>
          <span>{shipmentInfo.postalCode}</span>
        </ShipInfoRow>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: white;
  border-radius: 3px;
  line-height: 1.5;
`;

const ShipInfoRow = styled.div`
  line-height: 1.5;

  & span.title {
    font-weight: 500;
  }
`;

export default ShipmentInfo;
