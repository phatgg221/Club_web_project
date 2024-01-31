import React, { useState } from 'react';

const NewCardForm = ({ initialCard = {} }) => {
    const [formData, setFormData] = useState({
        organizer: '',
        logoURL:'/RMIT-logo.png',
        competitionName: '',
        location: '',
        linkToWeb: '',
        imageURL: '',
    });
    const [isEditMode, setIsEditMode] = useState(!!initialCard._id);

    console.log("id "+ initialCard._id);
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleReturn=() =>{
        window.location.href = '/admin/Card/view';

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        fetch('/api/card_api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            window.location.href = '/admin/Card/view';

            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Organizer:
                <input required= {true} type="text" name="organizer" onChange={handleInputChange} />
            </label>
            <label>
                Competition Name:
                <input required= {true} type="text" name="competitionName" onChange={handleInputChange} />
            </label>
            <label>
                Location:
                <input required= {true} type="text" name="location" onChange={handleInputChange} />
            </label>
            <label>
                Link to Web:
                <input type="text" name="linkToWeb" onChange={handleInputChange} />
            </label>
            <label>
                Image URL:
                <input type="text" name="imageURL" onChange={handleInputChange} placeholder="Enter image URL" />
            </label>

            <button type="submit" onClick={handleSubmit}>{isEditMode?'Update': 'Create'}</button>
            <button onClick={
                handleReturn
            }>Return</button>
        </form>
    );
};

export default NewCardForm;
