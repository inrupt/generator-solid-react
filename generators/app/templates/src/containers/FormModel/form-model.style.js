import styled from 'styled-components';

export const FormModelContainer = styled.section`
  display: flex;
  justify-content: center;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  box-sizing: border-box;
  padding: 25px;
  flex: 0 1 auto;
  width: 100%;
`;

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-repeat: repeat;
  flex: 0 1 900px;
  box-sizing: border-box;
  justify-items: center;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;

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
export const Form = styled.form`
  box-sizing: border-box;
  & > h3 {
    margin: 0;
  }
`;

export const Input = styled.input`
  margin: 10px 0;
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
    pointer-events: all;
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  &.active {
    color: #fff;
  }
`;

export const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 1 auto;
  padding: 8px 0;
  & > div {
    display: flex;
    width: auto;
    justify-content: space-around;
    & > button {
      box-sizing: border-box;
      font-weight: 700;
      font-height: 1.5rem;
      padding: 8px 16px;
      margin: 0 12px;
      border: solid 1px #5361fd;
      text-transform: uppercase;
      color: #5361fd;
      align-self: flex-end;
    }
  }
  & > h4 {
    margin: 0;
    padding: 8px 0;
  }
`;

export const Result = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  & > textarea {
    border: 1px solid #dae0e6;
    box-sizing: border-box;
    padding: 20px;
    overflow: auto;
    resize: none;
    flex: 1 1 auto;
  }
`;

export const ConverterInput = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  label,
  select,
  input {
    display: flex;
  }
  select {
    margin: 10px 0;
    min-width: 100px;
  }

  label {
    min-width: 120px;
    margin-top: 16px;
  }
`;

export const FormRenderContainer = styled.div`
  border: 1px solid #dae0e6;
  min-height: 40px;
  padding: 5px;
`;
