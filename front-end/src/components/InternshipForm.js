import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`  height: 100%;`;
const Form = styled.form`  height: 100%;`;

const TextArea = styled.textarea`
  width: 100%;  height: 10%;
`;

const InternshipForm = props => {
  // set the default state of the form
  const [values, setValue] = useState({ content: props.content || '' });
  // update the state when a user types in the form  
  const onChange = event => {
    setValue({      
        ...values,      
        [event.target.name]:  event.target.value
        }); 
    }; 
 return (    
    <Wrapper>      
        <Form        
            onSubmit={e => {
                e.preventDefault();            
                props.action({            
                    variables: {
                        ...values            
                    }          
                });   
                
            }}     
         >
        <label htmlFor="username">Organization Name:</label>&nbsp;
        <input
          required
          type="text"
          id="organization"
          name="organization"
          placeholder="Organization Name"
          onChange={onChange}
          />&nbsp;
          <label htmlFor="username">Position Name:</label>&nbsp;
        <input
          required
          type="text"
          id="position_name"
          name="position_name"
          placeholder="Position Name"
          onChange={onChange}
          />&nbsp;
           <label htmlFor="username">Candidates for Position:</label>&nbsp;
          <input
          
          type="text"
          id="position_number"
          name="position_number"
          placeholder="Candidates for Position"
          onChange={onChange}
          />&nbsp;
          <label htmlFor="username">Duration:</label>&nbsp;
          <input
          required
          type="text"
          id="duration"
          name="duration"
          placeholder="Duration"
          onChange={onChange}
          />&nbsp;
          <label htmlFor="username">Responsibility:</label>&nbsp;
          <TextArea
          required
          type="text"
          id="responsibility"
          name="responsibility"
          placeholder="Responsibility"
          onChange={onChange}
          />&nbsp;
          <label htmlFor="username">Qualifications:</label>&nbsp;
          <TextArea
          required
          type="text"
          id="qualifications"
          name="qualifications"
          placeholder="Qualifications"
          values={values.qualifications}
          onChange={onChange}
          />&nbsp;
          <label htmlFor="username">How to Apply:</label>&nbsp;
          <TextArea
          required
          type="text"
          id="application_info"
          name="application_info"
          placeholder="How to Apply"
          values={values.application_info}
          onChange={onChange}
          />&nbsp;
        <label htmlFor="username">Image Poster:</label>&nbsp;
        <input         
                      
            type="file"          
            name="content"
            placeholder="Note content" 
          onChange={onChange}        
          />&nbsp;
        <button className="btn btn-info" type="submit">Save</button>      
        </Form>    
    </Wrapper>  
    );
};
export default InternshipForm;