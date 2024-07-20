import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Componentss/Button";
import Input from "../../Componentss/Input";
import { Label } from "../../Componentss/Typography";
import useForm from "../../utils/Hooks/useForm";
import { connect } from "react-redux";
import { addFriend } from "../../redux/actions/friend";

const FormField = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HalfWidthInput = styled(Input)`
  flex: 1;
  min-width: 45%;
`;

const AddFriendForm = ({ loading, addFriend, onClose }) => {
  const [members, setMembers] = useState([{ name: "", address: "" }]);
  const { values, errors, onInputChange } = useForm();

  const handleMemberChange = (index, e) => {
    const updatedMembers = members.map((member, i) =>
      i === index ? { ...member, [e.target.name]: e.target.value } : member
    );
    setMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, { name: "", address: "" }]);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length < 1 && values.amount) {
      const memberNames = members.map((member) => member.name);
      const memberAddresses = members.map((member) => member.address);
      const amountPerMember = values.amount / members.length;
      
      await addFriend({ members: memberNames, addresses: memberAddresses, amount: amountPerMember });
      onClose();
    }
  };

  return (
    <form onSubmit={onSubmitForm} id={"addContactForm"}>
      {members.map((member, index) => (
        <React.Fragment key={index}>
          <FormField>
            <div>
              <Label htmlFor={`name-${index}`}>Name</Label>
              <HalfWidthInput
                id={`name-${index}`}
                type={"text"}
                placeholder={"Enter Name"}
                name="name"
                value={member.name}
                required
                onChange={(e) => handleMemberChange(index, e)}
              />
            </div>
            <div>
              <Label htmlFor={`address-${index}`}>Address</Label>
              <HalfWidthInput
                id={`address-${index}`}
                type={"text"}
                placeholder={"Enter Address"}
                name="address"
                value={member.address}
                required
                onChange={(e) => handleMemberChange(index, e)}
              />
            </div>
          </FormField>
        </React.Fragment>
      ))}
      <Button type="button" onClick={handleAddMember}>
        Add More
      </Button>
      <FormField>
        <div>
          <Label htmlFor="amount">Amount to be Split</Label>
          <Input
            id="amount"
            type={"number"}
            placeholder={"Enter Amount"}
            name="amount"
            required
            onChange={onInputChange}
          />
          {errors.amount && <Label $error>{errors.amount}</Label>}
        </div>
      </FormField>
      <Button
        type="submit"
        disabled={Boolean(Object.keys(errors).length) || loading}
      >
        {loading ? "Loading, Please wait" : "Submit"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  loading: state.friends.loading,
});

export default connect(mapStateToProps, { addFriend })(AddFriendForm);
