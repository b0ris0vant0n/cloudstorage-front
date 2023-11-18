import { fetchFilesSuccess, fetchFilesFailure } from './reducers';

export const fetchFiles = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
  
        const response = await fetch('http://127.0.0.1:8000/api/files/get-files/', {
          headers: {
            'Authorization': token,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching files: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data)
        dispatch(fetchFilesSuccess(data));
      } catch (error) {
        dispatch(fetchFilesFailure(error));
      }
    };
  };


export const uploadFile = (formData) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
  
        const response = await fetch('http://127.0.0.1:8000/api/files/upload/', {
          method: 'POST',
          headers: {
            'Authorization': token,
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Error uploading file: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        dispatch(fetchFiles());
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    };
  };
  
  export const downloadFile = (fileId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
        const response = await fetch(`http://127.0.0.1:8000/api/files/download/${fileId}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error downloading file: ${response.statusText}`);
        }
  
        const blob = await response.blob();
  
        const contentDispositionHeader = response.headers.get('Content-Disposition');
        let filename;
        const base64Encoded = 'YXR0YWNobWVudDsgZmlsZW5hbWU9ItCa0L3QuNCz0LAxLnhsc3gi';
        const decoded = atob(base64Encoded);
        console.log(decoded);
        
  
        if (contentDispositionHeader) {
          filename = contentDispositionHeader.split(';')[1].trim().replace('filename=', '');
        } else {
          filename = 'fallback_filename.txt';
          console.warn('Content-Disposition header is missing. Using fallback filename.');
        }
  
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
      } catch (error) {
        console.error('Error downloading file:', error.message);
      }
    };
  };
  