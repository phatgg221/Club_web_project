import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/router';


const NewSampleForm = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        sampleName: '',
        sampleContents:'',
        sampleAuthor: '',
        sampleLink: '',
    });

    const [isEditMode, setIsEditMode]= useState(false);

    useEffect(() =>{
        if(id){
            const fetchData= async() =>{
                try{
                    setIsEditMode(true);
                    const response= await fetch(`/api/sample_api?id=${id}`);
                    const data= await response.json();
                    // console.log(JSON.stringify(data.data.sampleData) + "aksdjhasdkjashdkasdahsdmv,navkadljj");
                    if(data && data.error === false && data.statusCode === 200 && data.data && data.data.sampleData && data.data.sampleData.data){
                        setFormData(data.data.sampleData.data);
                    }else{
                        console.error('Data structure is not as expected: ', data);

                    }
                }catch(error){
                    console.error('Error fetching data: ', error);
                }
            };
            fetchData();
        }
    },[id]);

    const handleInputChange= (event) =>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const hanldeReturn=() => {
        window.location.href='/admin/sample/view';
    }

    const hanldeSubmit= async(event) =>{
        event.preventDefault();

        fetch('/api/sample_api',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response =>{
            if(!response.ok){
                throw new Error ('Network reponse was not ok');
            }

            window.location.href= '/admin/sample/view';

            return response.json();
        })
        .then(data=> console.log('Success: ', data))
        .catch(error => console.error('Error', error));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch(`/api/sample_api?id=${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            window.location.href = '/admin/sample/view';
        }catch(error){
            console.error('Error:', error);
        }
    }
    return(
        <form onSubmit={hanldeSubmit}>
            <label>
                Sample name:
                <input required={true} type='text' name="sampleName" placeholder={isEditMode?formData.sampleName:''} value={formData.sampleName} onChange={handleInputChange} />
            </label>
            <label>
                Contents:
                <input required= {true} type='text' name="sampleContents" placeholder={isEditMode? formData.sampleContents : ''} value={formData.sampleContents} onChange={handleInputChange} />
            </label>
            <label>
                Author:
                <input required= {true} type='text' name="sampleAuthor" placeholder={isEditMode? formData.sampleAuthor : ''} value={formData.sampleAuthor} onChange={handleInputChange} /> 
            </label>
            <label>
                Link:
                <input required= {true} type='text' name="sampleLink" placeholder={isEditMode? formData.sampleLink : ''} value={formData.sampleLink} onChange={handleInputChange} />
            </label>
            <button type= "submit" onClick={isEditMode ? handleUpdate : hanldeSubmit}>{isEditMode? 'Update' : 'Create'}</button>
            <button type= "button" onClick={hanldeReturn}> Return </button>
        </form>
    )
}


NewSampleForm.hideLayout= true;
export default NewSampleForm;