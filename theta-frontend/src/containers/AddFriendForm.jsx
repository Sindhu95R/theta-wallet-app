import { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { Label } from "../components/Typograph";
import useForm from "../utils/Hooks/useForm";

const FromField = styled.div`
  margin-bottom: 1.5rem;
`;

const AddFriendForm = ({ onClose, onSubmit }) => {
  const { values, errors, onInputChange, onChange } = useForm();
  const [members, setMembers] = useState([{ name: "", address: "" }]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addMember = () => {
    setMembers([...members, { name: "", address: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numberOfMembers = members.length + 1; // including the user
    const amountPerMember = totalAmount / numberOfMembers;

    const results = members.map(member => ({
      ...member,
      amount: amountPerMember
    }));

    // Include the user
    results.push({
      name: 'You',
      amount: -amountPerMember
    });

    onSubmit(results);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FromField>
        <Label htmlFor="totalAmount">Total Amount</Label>
        <Input
          id="totalAmount"
          type="number"
          placeholder="Enter total amount"
          name="totalAmount"
          required
          onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
        />
      </FromField>

      {members.map((member, index) => (
        <div key={index}>
          <FromField>
            <Label htmlFor={`name-${index}`}>Name</Label>
            <Input
              id={`name-${index}`}
              type="text"
              placeholder="Enter name"
              name={`name-${index}`}
              value={member.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
          </FromField>
          <FromField>
            <Label htmlFor={`address-${index}`}>Address</Label>
            <Input
              id={`address-${index}`}
              type="text"
              placeholder="Enter address"
              name={`address-${index}`}
              value={member.address}
              onChange={(e) => handleChange(index, 'address', e.target.value)}
            />
          </FromField>
        </div>
      ))}

      <Button type="button" onClick={addMember}>
        Add More Members
      </Button>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddFriendForm;
