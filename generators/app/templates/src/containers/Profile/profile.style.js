import styled from 'styled-components';

export const ProfileWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 60px 0;
`;
export const ProfileContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url('/img/pattern-geo.png'),
    linear-gradient(135deg, #7c4dff 0%, #18a9e6 50%, #01c9ea 100%);
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;

  .edit-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    color: white;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 1rem;
  }
`;

export const WebId = styled.div`
  padding: 20px 40px 0px 40px;
  position: relative;
  &:after {
    background-color: #d8d8d8;
    display: block;
    content: '';
    height: 1px;
    width: 100%;
    margin: 25px 0 0 0;
  }
  a {
    display: inline-block;
    word-break: break-all;
    margin-left: 10px;
  }
`;

export const AutoSaveNotification = styled.section`
  margin-bottom: 0px !important;
`;

export const FormRenderContainer = styled.div`
  border: 1px solid #dae0e6;
  min-height: 40px;
  padding: 5px;

  .inrupt-form-group {
    border: 1px solid #c0c0c0;
    background-color: #f9f9f9;
    margin: 15px 0;
  }

  .input-wrap {
    margin: 0;
  }

  input {
    margin-left: 0;
  }
`;
