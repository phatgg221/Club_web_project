import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NewTipForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contentCount, setContentCount] = useState(1);
  const [contents, setContents] = useState([{ name: '', contents: '', tipImage: '' }]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    tipName: '',
    tipsLink: '',
    realContent: [],
  });

  useEffect(() => {
    setFormData(prevState => ({ ...prevState, realContent: contents }));
  }, [contents]);
  
  const handleInputChange = (index, event) => {
    const newContents = [...contents];
    newContents[index][event.target.name] = event.target.value;
    setContents(newContents);
  };

  const handleAddContent = () => {
    setContentCount(contentCount + 1);
    setContents([...contents, { name: '', content: '' , tipImage: ''}]);
  };
  
  const handleDelete= (index) =>{
    const newContents = [...contents];
    newContents.splice(index, 1);
    setContents(newContents);
  }
  const hanldeSubmit = async (event) => {
    event.preventDefault();
  
    // Update formData with the latest contents
    setFormData(prevState => ({ ...prevState, realContent: contents }));
    
    // Log the updated formData
    // console.log("Updated formData: ", formData);
  
    // Send fetch request
    fetch('/api/tip_api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.href= '/admin/tips/tips';
        return response.json();
      })
      .then((data) => console.log('Success: ', data))
      .catch((error) => console.error('Error', error));
  };
  
  
  

  return (
    <form onSubmit={hanldeSubmit}>
      <label>
        Tip Name:
        <input
          required={true}
          type='text'
          name='tipName'
          placeholder={isEditMode ? formData.tipName : ''}
          onChange={(e) => setFormData({ ...formData, tipName: e.target.value })}
        />
      </label>
      <label>
        Tip Link:
        <input
          required={true}
          type='text'
          name='tipsLink'
          placeholder={isEditMode ? formData.tipsLink : ''}
          onChange={(e) => setFormData({ ...formData, tipsLink: e.target.value })}
        />
      </label>

      {contents.map((content, index) => (
        <div key={index}>
          <label>
            Content Name:
            <input
              type='text'
              name='name'
              value={content.name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <label>
            Content:
            <input
              type='text'
              name= 'contents'
              value={content.contents}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <label>
            Image Link:
            <input
              type='text'
              name= 'tipImage'
              value={content.tipImage}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
          <button type='button' onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}

      <button type='button' onClick={handleAddContent}>
        Add more tip content
      </button>

      <button type='submit'>Submit</button>
    </form>
  );
};

NewTipForm.hideLayout = true;
export default NewTipForm;
